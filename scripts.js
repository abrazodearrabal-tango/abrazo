/* scripts.js
   Lang switch next to hamburger + mobile nav + reveals + simple form
   Files: EN -> index.html, ES -> es.html, DE -> de.html
*/
'use strict';

/* ===== Language switcher (EN ES DE) ===== */
(function () {
  const MAP = { en: 'index.html', es: 'es.html', de: 'de.html' };

  // Find existing lang host from the header markup
  const langHost = document.querySelector('.lang');
  if (!langHost) return;

  const currentLang = (document.documentElement.getAttribute('lang') || 'en')
    .slice(0, 2)
    .toLowerCase();

  // Build buttons
  langHost.setAttribute('role', 'group');
  langHost.setAttribute('aria-label', 'Language');
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
    window.location.href = `${basePath}${file}${qs}${hash}`;
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

  // Move lang next to the hamburger inside a right-side wrapper
  const headerBar = document.querySelector('.container.nav');
  const hambEl = document.getElementById('hamb');
  if (headerBar && hambEl) {
    let actions = headerBar.querySelector('.top-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'top-actions';
      headerBar.appendChild(actions);
    }
    actions.appendChild(langHost); // move existing node
    actions.appendChild(hambEl);   // place hamburger to the right of the lang
  }
})();

/* ===== Mobile nav toggle ===== */
(function () {
  const hamb = document.getElementById('hamb');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamb || !mobileMenu) return;

  hamb.setAttribute('aria-expanded', 'false');

  function toggleMenu() {
    const open = mobileMenu.style.display === 'block';
    const next = open ? 'none' : 'block';
    mobileMenu.style.display = next;
    hamb.setAttribute('aria-expanded', next === 'block' ? 'true' : 'false');
  }

  hamb.addEventListener('click', toggleMenu);

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
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
  } else {
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