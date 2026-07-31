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
