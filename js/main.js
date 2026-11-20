/* ========================================= */
/* FAQ — ACORDEÃO ACESSÍVEL                  */
/* ========================================= */

document.querySelectorAll('.faq-question').forEach((question, i) => {

  const answer = question.nextElementSibling;
  const answerId = `faq-answer-${i + 1}`;

  answer.id = answerId;
  question.setAttribute('aria-controls', answerId);
  question.setAttribute('aria-expanded', 'false');

  question.addEventListener('click', () => {

    const isOpen = question.getAttribute('aria-expanded') === 'true';

    question.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';

  });

});

/* ========================================= */
/* HERO CAROUSEL                             */
/* Só a 1ª imagem vem no HTML; as demais     */
/* (data-bg) carregam uma rodada antes de    */
/* aparecer.                                 */
/* ========================================= */

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

/* ========================================= */
/* NAVBAR RESPONSIVE                         */
/* ========================================= */

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function setMenu(open) {
  navMenu.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

if (menuToggle && navMenu) {

  menuToggle.setAttribute('aria-controls', 'navMenu');
  menuToggle.setAttribute('aria-expanded', 'false');

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenu(!navMenu.classList.contains('active'));
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('scroll', () => setMenu(false), { passive: true });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

}

/* ========================================= */
/* MANIFESTO / DEPOIMENTOS                   */
/* ========================================= */

/*
  DEPOIMENTOS REAIS
  Preencha somente com falas reais de clientes, com autorização.
  Exemplo: { text: '“…”', author: 'Ana P. — aniversário de 1 ano' }
  Enquanto estiver vazio, a seção exibe o manifesto da marca.
*/
const depoimentos = [];

const manifesto = [
  'A experiência vai além do produto. Existe cuidado em cada detalhe.',
  'Sabores pensados para transformar a festa em memória.',
  'Delicadeza da apresentação ao atendimento.',
  'Carinho colocado em cada etapa, do pedido à entrega.',
  'Uma confeitaria feita para transformar momentos em lembranças.'
].map(text => ({ text, author: 'Meu Petit Bolinho®' }));

const testimonials = depoimentos.length ? depoimentos : manifesto;

const testimonialText = document.getElementById('testimonialText');
const testimonialAuthor = document.getElementById('testimonialAuthor');

let testimonialIndex = 0;

function changeTestimonial() {

  testimonialText.style.opacity = 0;
  testimonialAuthor.style.opacity = 0;

  setTimeout(() => {

    testimonialIndex = (testimonialIndex + 1) % testimonials.length;

    testimonialText.innerText = testimonials[testimonialIndex].text;
    testimonialAuthor.innerText = testimonials[testimonialIndex].author;

    testimonialText.style.opacity = 1;
    testimonialAuthor.style.opacity = 1;

  }, 400);

}

if (testimonialText && testimonialAuthor && testimonials.length > 1) {

  testimonialText.innerText = testimonials[0].text;
  testimonialAuthor.innerText = testimonials[0].author;

  setInterval(changeTestimonial, 5000);

}
