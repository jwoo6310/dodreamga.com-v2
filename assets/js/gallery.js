document.addEventListener('DOMContentLoaded', () => {
    const PUBLIC_BASE = '../assets/gallery';
    const MANIFEST_URL = `${PUBLIC_BASE}/manifest.json`;

    // DOM refs
    const grid = document.getElementById('album-grid');
    const modal = document.getElementById('album-modal');
    const overlay = document.getElementById('album-overlay');
    const modalCloseBtn = document.getElementById('album-modal-close');
    const modalTitleEl = document.getElementById('album-modal-title');
    const heroImg = document.getElementById('album-hero');
    const thumbsWrap = document.getElementById('album-thumbs');
    const prevBtn = document.getElementById('album-prev');
    const nextBtn = document.getElementById('album-next');

    // state
    let currentAlbum = null; // { slug, title, items }
    let currentIndex = 0;

    const enc = s => encodeURIComponent(s).replace(/%2F/g, '/');
    const pretty = s => s.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    const coverOf = (album) => {
        if (!album.items || !album.items.length) return null;
        const cover = album.items.find(n => /^cover\.(jpe?g|png|webp|gif|avif)$/i.test(n));
        return cover || album.items[0];
    };

    const albumCard = (album) => {
        const title = album.title || pretty(album.slug);
        const cover = coverOf(album);
        const src = cover ? `${PUBLIC_BASE}/${enc(album.slug)}/${enc(cover)}` : '';
        const count = album.items?.length || 0;

        const card = document.createElement('button');
        card.className = 'text-left bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-500';
        card.innerHTML = `
      <img src="${src}" alt="${title} cover" class="w-full h-52 object-cover">
      <div class="p-4">
        <h4 class="text-lg font-semibold text-gray-900">${title}</h4>
        <p class="text-sm text-gray-500">${count} photo${count===1?'':'s'}</p>
      </div>
    `;
        card.addEventListener('click', () => openAlbum(album));
        return card;
    };

    const openAlbum = (album) => {
        currentAlbum = album;
        currentIndex = 0;
        modalTitleEl.textContent = album.title || pretty(album.slug);
        renderThumbs();
        showImage(0);
        modal.classList.remove('hidden');
    };

    const closeAlbum = () => {
        modal.classList.add('hidden');
        currentAlbum = null;
        currentIndex = 0;
        heroImg.src = '';
        thumbsWrap.innerHTML = '';
    };

    const showImage = (idx) => {
        if (!currentAlbum) return;
        const total = currentAlbum.items.length;
        currentIndex = (idx + total) % total;
        const file = currentAlbum.items[currentIndex];
        const src = `${PUBLIC_BASE}/${enc(currentAlbum.slug)}/${enc(file)}`;
        heroImg.src = src;
        heroImg.alt = `${currentAlbum.title || pretty(currentAlbum.slug)} - ${file}`;
        highlightThumb(currentIndex);
    };

    const renderThumbs = () => {
        thumbsWrap.innerHTML = '';
        (currentAlbum.items || []).forEach((file, i) => {
            const src = `${PUBLIC_BASE}/${enc(currentAlbum.slug)}/${enc(file)}`;
            const btn = document.createElement('button');
            btn.className = 'shrink-0 border-2 border-transparent rounded overflow-hidden hover:border-brand-500';
            btn.innerHTML = `<img src="${src}" alt="${file}" class="h-20 w-28 object-cover block">`;
            btn.addEventListener('click', () => showImage(i));
            thumbsWrap.appendChild(btn);
        });
    };

    const highlightThumb = (i) => {
        [...thumbsWrap.children].forEach((el, idx) => {
            el.classList.toggle('border-brand-500', idx === i);
        });
        const active = thumbsWrap.children[i];
        if (active) active.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        });
    };

    // nav
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    modalCloseBtn.addEventListener('click', closeAlbum);
    overlay.addEventListener('click', closeAlbum);
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeAlbum();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    // load manifest & render album cards
    grid.innerHTML = `<div class="text-gray-600">Loading gallery…</div>`;
    fetch(MANIFEST_URL, {
            cache: 'no-store'
        })
        .then(r => {
            if (!r.ok) throw new Error(r.status);
            return r.json();
        })
        .then(({
            albums
        }) => {
            grid.innerHTML = '';
            (albums || []).forEach(a => grid.appendChild(albumCard(a)));
            if (!albums || !albums.length) {
                grid.innerHTML = `<div class="text-gray-500">No albums yet.</div>`;
            }
        })
        .catch(err => {
            console.error('[gallery]', err);
            grid.innerHTML = `<div class="bg-red-50 border border-red-200 text-red-600 rounded-md p-4">
        Failed to load gallery. (Check <code>${MANIFEST_URL}</code>)
      </div>`;
        });
});