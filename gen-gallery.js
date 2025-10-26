// Run: node gen-gallery.js
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const GALLERY_DIR = path.join(ROOT, 'assets', 'gallery');
const OUT = path.join(GALLERY_DIR, 'manifest.json');

const IMG = /\.(jpe?g|png|gif|webp|avif)$/i;
const natCmp = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
}).compare;

const titleFrom = (slug) => slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const yearOf = (name) => {
    const m = String(name).match(/^(\d{4})/);
    return m ? parseInt(m[1], 10) : -Infinity;
};
const albums = fs.readdirSync(GALLERY_DIR, {
        withFileTypes: true
    })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort((a, b) => {
        const ya = yearOf(a),
            yb = yearOf(b);
        if (ya !== yb) return yb - ya;
        return natCmp(a, b);
    })
    .map(slug => {
        const files = fs.readdirSync(path.join(GALLERY_DIR, slug), {
                withFileTypes: true
            })
            .filter(f => f.isFile() && IMG.test(f.name))
            .map(f => f.name)
            .sort(natCmp);
        const i = files.findIndex(n => /^cover\.(jpe?g|png|webp|gif|avif)$/i.test(n));
        if (i > 0) {
            const [cv] = files.splice(i, 1);
            files.unshift(cv);
        }

        return {
            slug,
            title: titleFrom(slug),
            items: files
        };
    });

const json = JSON.stringify({
    albums
}, null, 2);
if (!fs.existsSync(OUT) || fs.readFileSync(OUT, 'utf-8') !== json) {
    fs.writeFileSync(OUT, json);
    console.log(`manifest updated: ${OUT}`);
} else {
    console.log('manifest unchanged');
}