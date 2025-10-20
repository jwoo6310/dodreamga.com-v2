function getQueryLang() {
  const m = location.search.match(/[?&]lang=(ko|en)\b/i);
  return m ? m[1].toLowerCase() : null;
}
function getStoredLang() {
  try { return localStorage.getItem('lang'); } catch { return null; }
}
function setStoredLang(lang) {
  try { localStorage.setItem('lang', lang); } catch {}
}

function syncLinksWithLang(lang) {
  document.querySelectorAll('a[href]').forEach(a => {
    let href = a.getAttribute('href') || '';
    if (!href) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (/^https?:\/\//i.test(href) && !href.startsWith(location.origin)) return;
    const [pathPlusQuery, hash = ''] = href.split('#', 2);
    const [path, query = ''] = pathPlusQuery.split('?', 2);
    const params = new URLSearchParams(query);
    params.set('lang', lang);
    const q = params.toString();
    const rebuilt = path + (q ? `?${q}` : '') + (hash ? `#${hash}` : '');
    a.setAttribute('href', rebuilt);
  });
}

function getTranslateTable() {
  if (window.elementsToTranslate) return window.elementsToTranslate;
  try {
    if (typeof elementsToTranslate !== 'undefined') return elementsToTranslate;
  } catch {}
  return {};
}
function applyTranslations(lang) {
  const table = getTranslateTable();
  for (const [id, translations] of Object.entries(table)) {
    const el = document.getElementById(id);
    if (!el) continue;
    const text = translations?.[lang];
    if (text != null) el.innerHTML = text;
  }
  const langBtn = document.getElementById('language-toggle');
  const mLangBtn = document.getElementById('mobile-language-toggle');
  if (langBtn)  langBtn.textContent  = (lang === 'en') ? '한글' : 'ENG';
  if (mLangBtn) mLangBtn.textContent = (lang === 'en') ? '한글' : 'ENG';
}
document.addEventListener('DOMContentLoaded', () => {
  let currentLanguage = getQueryLang() || getStoredLang() || 'en';
  setStoredLang(currentLanguage);

  applyTranslations(currentLanguage);
  syncLinksWithLang(currentLanguage);
  const languageToggle = document.getElementById('language-toggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      currentLanguage = (currentLanguage === 'en') ? 'ko' : 'en';
      setStoredLang(currentLanguage);
      applyTranslations(currentLanguage);
      syncLinksWithLang(currentLanguage);
    });
  }
  const mobileLangToggle = document.getElementById('mobile-language-toggle');
  if (mobileLangToggle) {
    mobileLangToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      currentLanguage = (currentLanguage === 'en') ? 'ko' : 'en';
      setStoredLang(currentLanguage);
      applyTranslations(currentLanguage);
      syncLinksWithLang(currentLanguage);
    });
  }

  const menuCtrlBtn = document.querySelector('[aria-controls="mobile-menu"]');
  if (menuCtrlBtn) {
    menuCtrlBtn.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.toggle('hidden');
    });
  }
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.toggle('hidden');
    });
  }
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    if (!menu || !toggle) return;
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });

  const mobileAccordions = [
    { btn: 'm-about-toggle',    panel: 'm-about-sub' },
    { btn: 'm-community-toggle',panel: 'm-community-sub' },
    { btn: 'm-events-toggle',   panel: 'm-events-sub' },
    { btn: 'm-nextgen-toggle',  panel: 'm-nextgen-sub' },
    { btn: 'm-smd-toggle',      panel: 'm-smd-sub' }
  ];
  const closeOthers = (except) => {
    mobileAccordions.forEach(({ btn, panel }) => {
      if (panel === except) return;
      const b = document.getElementById(btn);
      const p = document.getElementById(panel);
      if (!b || !p) return;
      p.classList.add('hidden');
      b.setAttribute('aria-expanded', 'false');
      const chevWrap = b.querySelector('i[data-feather="chevron-down"]')?.parentElement;
      if (chevWrap) chevWrap.classList.remove('rotate-180');
    });
  };
  mobileAccordions.forEach(({ btn, panel }) => {
    const b = document.getElementById(btn);
    const p = document.getElementById(panel);
    if (!b || !p) return;
    b.setAttribute('aria-controls', panel);
    b.setAttribute('aria-expanded', 'false');
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !p.classList.contains('hidden');
      if (isOpen) {
        p.classList.add('hidden');
        b.setAttribute('aria-expanded', 'false');
        const chevWrap = b.querySelector('i[data-feather="chevron-down"]')?.parentElement;
        if (chevWrap) chevWrap.classList.remove('rotate-180');
      } else {
        closeOthers(panel);
        p.classList.remove('hidden');
        b.setAttribute('aria-expanded', 'true');
        const chevWrap = b.querySelector('i[data-feather="chevron-down"]')?.parentElement;
        if (chevWrap) chevWrap.classList.add('rotate-180');
      }
    });
  });

  if (window.feather && typeof feather.replace === 'function') {
    feather.replace();
  }
  if (window.VANTA && document.querySelector('#vanta-bg')) {
    try {
      VANTA.WAVES({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x4b7bec,
        shininess: 50.00,
        waveHeight: 15.00,
        waveSpeed: 0.50,
        zoom: 0.80
      });
    } catch {}
  }
});
