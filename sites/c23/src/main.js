const toggle = document.getElementById('navToggle');
const nav = document.getElementById('primaryNav');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const whyTrack = document.querySelector('.why-problems');
const whyPrev = document.querySelector('.why-carousel-prev');
const whyNext = document.querySelector('.why-carousel-next');
if (whyTrack && whyPrev && whyNext) {
  const scrollByCard = (direction) => {
    const card = whyTrack.querySelector('.why-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(whyTrack).gap) || 0;
    whyTrack.scrollBy({ left: (card.offsetWidth + gap) * direction, behavior: 'smooth' });
  };
  whyPrev.addEventListener('click', () => scrollByCard(-1));
  whyNext.addEventListener('click', () => scrollByCard(1));
}

const faqTriggers = document.querySelectorAll('.faq-trigger');
if (faqTriggers.length) {
  const closeAllFaq = () => {
    faqTriggers.forEach((other) => {
      other.setAttribute('aria-expanded', 'false');
      document.getElementById(other.getAttribute('aria-controls'))?.classList.remove('is-open');
    });
  };
  const openFaq = (trigger) => {
    closeAllFaq();
    trigger.setAttribute('aria-expanded', 'true');
    document.getElementById(trigger.getAttribute('aria-controls'))?.classList.add('is-open');
  };

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeAllFaq();
      } else {
        openFaq(trigger);
      }
    });
  });

  // Deep-linking: #faq-question-N should open (not just scroll to) that item,
  // both on initial load and when arriving via an in-page hash change.
  const openFaqFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const trigger = document.getElementById(id);
    if (trigger && trigger.classList.contains('faq-trigger')) {
      openFaq(trigger);
      trigger.scrollIntoView({ block: 'start' });
    }
  };
  if (location.hash) openFaqFromHash();
  window.addEventListener('hashchange', openFaqFromHash);
}

// Nav active-link tracking: marks whichever nav link's section is currently
// in view. Visual only — no destinations or click behaviour change. Only
// wires up when both sides exist, so it's a no-op on apply.html (its nav
// links point to ./index.html#..., not #...).
const spySections = document.querySelectorAll('main section[id]');
const spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (spySections.length && spyLinks.length) {
  const linkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);
  const setActive = (id) => {
    const link = linkFor(id);
    if (!link) return;
    spyLinks.forEach((l) => l.classList.remove('is-active'));
    link.classList.add('is-active');
  };
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );
  spySections.forEach((section) => spyObserver.observe(section));
}
