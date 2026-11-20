/* =========================================================
   MEU PETIT BOLINHO® · carrossel de abertura
   Comportamento original preservado: troca a cada 6 s e carrega cada
   imagem (data-bg) uma rodada antes de aparecer.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const heroImages = document.querySelectorAll('.hero-image');

  if (!heroImages.length) return;

  let currentHero = 0;

  function loadHeroImage(index) {
    const el = heroImages[index];

    if (el && el.dataset.bg) {
      el.style.backgroundImage = `url('${el.dataset.bg}')`;
      el.removeAttribute('data-bg');
    }
  }

  function nextIndex(index) {
    return (index + 1) % heroImages.length;
  }

  loadHeroImage(currentHero);
  heroImages[currentHero].classList.add('active');

  if (heroImages.length < 2) return;

  /* pré-carrega a próxima depois que a página terminar de abrir */
  window.addEventListener('load', () => loadHeroImage(nextIndex(currentHero)));

  setInterval(() => {

    heroImages[currentHero].classList.remove('active');

    currentHero = nextIndex(currentHero);
    loadHeroImage(currentHero);
    heroImages[currentHero].classList.add('active');

    loadHeroImage(nextIndex(currentHero));

  }, 6000);

});
