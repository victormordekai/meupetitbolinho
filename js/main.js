const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {

  question.addEventListener('click', () => {

    const answer = question.nextElementSibling;

    if(answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

  });

});

/* ========================================= */
/* HERO CAROUSEL                             */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  const heroImages = document.querySelectorAll('.hero-image');

  if (!heroImages.length) return;

  let currentHero = 0;

  /*
    Garante estado inicial
  */
  heroImages[currentHero].classList.add('active');

  function showNextHeroImage() {

    heroImages[currentHero].classList.remove('active');

    currentHero++;

    if (currentHero >= heroImages.length) {
      currentHero = 0;
    }

    heroImages[currentHero].classList.add('active');

  }

  /*
    Troca automática
  */
  if (heroImages.length > 1) {

    setInterval(showNextHeroImage, 6000);

  }

});

/* ========================================= */
/* NAVBAR RESPONSIVE                         */
/* ========================================= */

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();

  navMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) &&
      !menuToggle.contains(e.target)) {

    navMenu.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  navMenu.classList.remove('active');
});

document.querySelectorAll('.nav-menu a')
  .forEach(link => {

    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });

});