const menuToggle = document.querySelector('#menuToggle');
const siteNav = document.querySelector('#siteNav');
const collapsedNav = window.matchMedia('(max-width: 960px)');

if (menuToggle && siteNav) {
  const setMenu = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    siteNav.classList.toggle('is-open', isOpen);
  };

  const closeMenu = (shouldRestoreFocus = false) => {
    setMenu(false);
    if (shouldRestoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    closeMenu();
  }));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });

  window.addEventListener('resize', () => {
    if (!collapsedNav.matches && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu();
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
