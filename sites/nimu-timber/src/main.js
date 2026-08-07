const menuToggle = document.querySelector('#menuToggle');
const siteNav = document.querySelector('#siteNav');

if (menuToggle && siteNav) {
  const closeMenu = (shouldRestoreFocus = false) => {
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
    if (shouldRestoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMenu();
      return;
    }
    menuToggle.setAttribute('aria-expanded', 'true');
    siteNav.classList.add('is-open');
  });
  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    closeMenu();
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
}

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = document.querySelector(`#${button.getAttribute('aria-controls')}`);
    const willOpen = button.getAttribute('aria-expanded') !== 'true';
    document.querySelectorAll('.faq-item button').forEach((item) => item.setAttribute('aria-expanded', 'false'));
    document.querySelectorAll('.faq-answer').forEach((item) => item.classList.remove('is-open'));
    button.setAttribute('aria-expanded', String(willOpen));
    if (answer && willOpen) answer.classList.add('is-open');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
