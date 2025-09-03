/* scripts.js
   Single file interactions: lang switch, mobile nav, reveals, form
   Files: EN -> index.html, ES -> es.html, DE -> de.html
*/

'use strict';

/* ===== Language switcher (EN ES DE) ===== */
(function () {
  const MAP = { en: 'index.html', es: 'es.html', de: 'de.html' };
  const langHost = document.querySelector('.lang');
  if (!langHost) return;

  const currentLang = (document.documentElement.getAttribute('lang') || 'en')
    .slice(0, 2)
    .toLowerCase();

  // Build buttons in desired order
  langHost.innerHTML = `
    <button type="button" data-lang="en" aria-label="English">EN</button>
    <button type="button" data-lang="es" aria-label="Español">ES</button>
    <button type="button" data-lang="de" aria-label="Deutsch">DE</button>
  `;

  const basePath = location.pathname.replace(/[^/]*$/, '');
  const qs = location.search || '';
  const hash = location.hash || '';

  function gotoLang(lang) {
    const file = MAP[lang] || MAP.en;
    const url = `${basePath}${file}${qs}${hash}`;
    window.location.href = url;
  }

  function markActive(root) {
    root.querySelectorAll('button[data-lang]').forEach(btn => {
      const isActive = btn.dataset.lang === currentLang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  langHost.addEventListener('click', e => {
    const btn = e.target.closest('button[data-lang]');
    if (!btn) return;
    gotoLang(btn.dataset.lang);
  });
  markActive(langHost);

  // Mobile replica
  const mobileLinks = document.querySelector('#mobileMenu .container');
  if (mobileLinks && !mobileLinks.querySelector('.lang')) {
    const clone = langHost.cloneNode(true);
    mobileLinks.appendChild(clone);
    clone.addEventListener('click', e => {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      gotoLang(btn.dataset.lang);
    });
    markActive(clone);
  }
})();

/* ===== Mobile nav toggle ===== */
(function () {
  const hamb = document.getElementById('hamb');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamb || !mobileMenu) return;

  hamb.setAttribute('aria-expanded', 'false');

  function toggleMenu(forceOpen) {
    const isOpen = forceOpen != null ? !forceOpen : mobileMenu.style.display === 'block';
    const next = isOpen ? 'none' : 'block';
    mobileMenu.style.display = next;
    hamb.setAttribute('aria-expanded', next === 'block' ? 'true' : 'false');
  }

  hamb.addEventListener('click', () => toggleMenu());

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      hamb.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ===== Reveal on scroll ===== */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
  } else {
    // Fallback
    els.forEach(el => el.classList.add('is-visible'));
  }
})();

/* ===== Simple form handler (no backend) ===== */
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    note.style.display = 'block';
    form.reset();
  });
})();