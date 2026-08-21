import './style.css';

const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const header = document.querySelector('[data-header]');

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menu?.classList.toggle('is-open', !expanded);
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('is-open');
  });
});

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

document.querySelector('[data-year]').textContent = new Date().getFullYear();
