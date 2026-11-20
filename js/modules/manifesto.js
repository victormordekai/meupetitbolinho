/* =========================================================
   MEU PETIT BOLINHO® · manifesto / depoimentos (V002.1)

   Fundo: mosaico de fotos reais do cardápio, em três faixas
   que deslizam em sentidos alternados (fonte: js/data/cardapio.js).
   Frente: frases do manifesto (ou depoimentos reais), trocando
   a cada 6 s, com indicadores clicáveis. Pausa ao passar o mouse,
   ao focar e quando a aba não está visível.

   Para usar depoimentos reais, preencha `depoimentos` abaixo
   (com autorização das clientes).
   ========================================================= */

(() => {
  const secao = document.querySelector('.testimonial-section');
  if (!secao) return;

  /* ---------- conteúdo ---------- */

  /* Exemplo: { text: 'A festa ficou inesquecível.', author: 'Ana P. — aniversário de 1 ano' } */
  const depoimentos = [];

  const manifesto = [
    'A experiência vai além do produto. Existe cuidado em cada detalhe.',
    'Sabores pensados para transformar a festa em memória.',
    'Delicadeza da apresentação ao atendimento.',
    'Carinho colocado em cada etapa, do pedido à entrega.',
    'Uma confeitaria feita para transformar momentos em lembranças.'
  ].map(text => ({ text, author: 'Meu Petit Bolinho®' }));

  const frases = depoimentos.length ? depoimentos : manifesto;

  /* ---------- mosaico de fotos ---------- */

  const mosaico = secao.querySelector('[data-mosaic]');
  const fotos = [...new Set((window.MPB?.PRODUTOS || []).flatMap(p => p.fotos || (p.foto ? [p.foto] : [])))];

  if (mosaico && fotos.length) {
    const terco = Math.ceil(fotos.length / 3);
    const faixa = (lista, reversa) => {
      /* a lista vai duplicada: a animação anda 50% e recomeça sem emenda */
      const imgs = [...lista, ...lista].map(f =>
        `<img src="${MPB.url(`assets/shop/${f}.jpg`)}" alt="" loading="lazy" decoding="async">`).join('');
      return `<div class="mosaic__row${reversa ? ' mosaic__row--reverse' : ''}">${imgs}</div>`;
    };
    mosaico.innerHTML =
      faixa(fotos.slice(0, terco), false) +
      faixa(fotos.slice(terco, terco * 2), true) +
      faixa(fotos.slice(terco * 2), false);
  }

  /* ---------- frases ---------- */

  const texto = document.getElementById('testimonialText');
  const autor = document.getElementById('testimonialAuthor');
  const dotsEl = secao.querySelector('[data-manifesto-dots]');
  const caixa = secao.querySelector('.testimonial-box');
  if (!texto || !autor) return;

  const INTERVALO = 6000;
  let atual = 0;
  let timer = null;

  if (dotsEl && frases.length > 1) {
    dotsEl.innerHTML = frases.map((_, i) =>
      `<button type="button" data-i="${i}" aria-label="Frase ${i + 1} de ${frases.length}"></button>`).join('');
  }
  const dots = dotsEl ? [...dotsEl.children] : [];

  function marcar() {
    dots.forEach((d, i) => d.setAttribute('aria-current', i === atual ? 'true' : 'false'));
  }

  function mostrar(i) {
    if (i === atual) return;
    atual = i;
    caixa.classList.add('is-trocando');
    setTimeout(() => {
      texto.textContent = frases[atual].text;
      autor.textContent = frases[atual].author;
      caixa.classList.remove('is-trocando');
    }, 380);
    marcar();
  }

  const parar = () => { clearInterval(timer); timer = null; };
  const iniciar = () => {
    parar();
    if (frases.length > 1) timer = setInterval(() => mostrar((atual + 1) % frases.length), INTERVALO);
  };

  dotsEl?.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (b) { mostrar(Number(b.dataset.i)); iniciar(); }
  });

  caixa.addEventListener('mouseenter', parar);
  caixa.addEventListener('mouseleave', iniciar);
  caixa.addEventListener('focusin', parar);
  caixa.addEventListener('focusout', iniciar);
  document.addEventListener('visibilitychange', () => (document.hidden ? parar() : iniciar()));

  texto.textContent = frases[0].text;
  autor.textContent = frases[0].author;
  marcar();
  iniciar();
})();
