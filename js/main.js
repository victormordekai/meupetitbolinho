javascript
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

  function showNextHeroImage() {

    heroImages[currentHero].classList.remove('active');

    currentHero++;

    if (currentHero >= heroImages.length) {
      currentHero = 0;
    }

    heroImages[currentHero].classList.add('active');
  }

  if (heroImages.length > 1) {

    setInterval(showNextHeroImage, 6000);

  }

});

/* ========================================= */
/* END HERO CAROUSEL                         */
/* ========================================= */