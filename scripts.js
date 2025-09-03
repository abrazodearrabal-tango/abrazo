// Mobile nav toggle
const hamb = document.getElementById('hamb');
const mobileMenu = document.getElementById('mobileMenu');
hamb.addEventListener('click', () => {
  mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Simple form handler (no backend). Replace with your endpoint if needed.
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.style.display = 'block';
  form.reset();
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(a => {
  a.addEventListener('click', () => { mobileMenu.style.display = 'none'; });
});