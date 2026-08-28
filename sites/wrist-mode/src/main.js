const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const header = document.querySelector('[data-header]');
const progress = document.querySelector('[data-progress]');
const footer = document.querySelector('.site-footer');
const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
const sections = [...document.querySelectorAll('main section[id]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopNavigation = window.matchMedia('(min-width: 56rem)');

const menuLinks = [...(menu?.querySelectorAll('a[href]') ?? [])];

const closeMenu = (restoreFocus = false) => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  if (restoreFocus) menuToggle?.focus();
};

menuToggle?.addEventListener('click', () => {
  const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menu?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }

  if (event.key !== 'Tab' || menuToggle?.getAttribute('aria-expanded') !== 'true' || menuLinks.length === 0) return;

  const firstLink = menuLinks[0];
  const lastLink = menuLinks.at(-1);

  if (event.shiftKey && document.activeElement === menuToggle) {
    event.preventDefault();
    lastLink.focus();
  } else if (!event.shiftKey && document.activeElement === lastLink) {
    event.preventDefault();
    menuToggle.focus();
  }
});

desktopNavigation.addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const updateScrollState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
  if (!progress || reducedMotion.matches) return;
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const value = available > 0 ? Math.min(window.scrollY / available, 1) : 0;
  progress.style.setProperty('--page-progress', value);
};

updateScrollState();
window.addEventListener('scroll', updateScrollState, { passive: true });
reducedMotion.addEventListener('change', updateScrollState);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    sectionLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {
    rootMargin: '-25% 0px -60%',
    threshold: [0.1, 0.35, 0.6],
  });

  sections.forEach((section) => sectionObserver.observe(section));

  if (footer && !reducedMotion.matches) {
    footer.classList.add('footer-motion-ready');

    const footerObserver = new IntersectionObserver((entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      footer.classList.add('is-revealed');
      observer.disconnect();
    }, { threshold: 0.2 });

    footerObserver.observe(footer);
  }
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
