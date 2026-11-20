/* =========================================================
   MEU PETIT BOLINHO® · manifesto / depoimentos
   Rotação de frases sobre o carrossel do final. Preencha `depoimentos`
   com falas reais de clientes (com autorização) para substituir o manifesto.
   ========================================================= */

(() => {

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
})();
