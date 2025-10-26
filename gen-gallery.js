// Run: node gen-gallery.js
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const GALLERY_DIR = path.join(ROOT, 'assets', 'gallery');
const OUT = path.join(GALLERY_DIR, 'manifest.json');

const IMG = /\.(jpe?g|png|gif|webp|avif)$/i;
const natCmp = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare;

const titleFrom = (slug) => slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

// ⬇⬇ 추가: 폴더명에서 선두 연도 추출
const yearOf = (name) => {
  const m = String(name).match(/^(\d{4})/);
  return m ? parseInt(m[1], 10) : -Infinity; // 연도 없으면 맨 뒤로
};

const albums = fs.readdirSync(GALLERY_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  // ⬇⬇ 변경: 연도 내림차순, 같은 연도는 자연정렬
  .sort((a, b) => {
    const ya = yearOf(a), yb = yearOf(b);
    if (ya !== yb) return yb - ya;      // 큰 연도 먼저
    return natCmp(a, b);                // 같은 연도면 a-z 자연정렬
  })
  .map(slug => {
    const files = fs.readdirSync(path.join(GALLERY_DIR, slug), { withFileTypes: true })
      .filter(f => f.isFile() && IMG.test(f.name))
      .map(f => f.name)
      .sort(natCmp); // 파일은 기존대로 자연정렬(01, 2, 10 순서)

    // cover.*를 맨 앞으로
    const i = files.findIndex(n => /^cover\.(jpe?g|png|webp|gif|avif)$/i.test(n));
    if (i > 0) { const [cv] = files.splice(i, 1); files.unshift(cv); }

    return { slug, title: titleFrom(slug), items: files };
  });

const json = JSON.stringify({ albums }, null, 2);
if (!fs.existsSync(OUT) || fs.readFileSync(OUT, 'utf-8') !== json) {
  fs.writeFileSync(OUT, json);
  console.log(`manifest updated: ${OUT}`);
} else {
  console.log('manifest unchanged');
}
