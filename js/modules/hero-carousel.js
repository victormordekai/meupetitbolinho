/* =========================================================
   MEU PETIT BOLINHO® · carrossel de abertura (V002.1)
   - troca a cada 6 s, com zoom lento (Ken Burns) em cada foto;
   - carrega cada imagem (data-bg) uma rodada antes de aparecer;
   - indicadores clicáveis com barra de progresso;
   - arrastar para o lado troca a foto (celular e mouse);
   - pausa quando a aba não está visível ou com o foco nos indicadores;
   - com prefers-reduced-motion: sem zoom e troca mais lenta.
   ========================================================= */

(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const slides = [...hero.querySelectorAll('.hero-image')];
  const dotsEl = hero.querySelector('[data-hero-dots]');
  if (!slides.length) return;

  const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVALO = calmo ? 9000 : 6000;
  hero.style.setProperty('--hero-intervalo', `${INTERVALO}ms`);

  let atual = slides.findIndex(s => s.classList.contains('active'));
  if (atual < 0) atual = 0;
  let timer = null;

  const carregar = i => {
    const el = slides[i];
    if (el && el.dataset.bg) {
      el.style.backgroundImage = `url('${el.dataset.bg}')`;
      el.removeAttribute('data-bg');
    }
  };
  const proximo = i => (i + 1) % slides.length;

  /* ---------- indicadores ---------- */
  if (dotsEl && slides.length > 1) {
    dotsEl.innerHTML = slides.map((_, i) =>
      `<button type="button" class="hero-dot" data-i="${i}" aria-label="Foto ${i + 1} de ${slides.length}"><i></i></button>`
    ).join('');
  }
  const dots = dotsEl ? [...dotsEl.children] : [];

  function marcarDots() {
    dots.forEach((d, i) => {
      const on = i === atual;
      d.classList.toggle('is-active', on);
      d.setAttribute('aria-current', on ? 'true' : 'false');
    });
    /* reinicia a barra de progresso do indicador ativo */
    const barra = dots[atual]?.querySelector('i');
    if (barra) { barra.style.animation = 'none'; void barra.offsetWidth; barra.style.animation = ''; }
  }

  function mostrar(i) {
    if (i === atual) return;
    carregar(i);
    slides[atual].classList.remove('active');
    slides[i].classList.add('active');
    atual = i;
    carregar(proximo(i));
    marcarDots();
  }

  function parar() {
    clearInterval(timer);
    timer = null;
  }

  function iniciar() {
    parar();
    if (slides.length < 2) return;
    hero.classList.remove('is-paused');
    timer = setInterval(() => mostrar(proximo(atual)), INTERVALO);
  }

  function pausar() {
    parar();
    hero.classList.add('is-paused');
  }

  /* ---------- eventos ---------- */
  dotsEl?.addEventListener('click', e => {
    const b = e.target.closest('.hero-dot');
    if (!b) return;
    mostrar(Number(b.dataset.i));
    marcarDots();
    iniciar();
  });

  dotsEl?.addEventListener('focusin', pausar);
  dotsEl?.addEventListener('focusout', iniciar);

  document.addEventListener('visibilitychange', () => (document.hidden ? pausar() : iniciar()));

  /* arrastar: limiar de 45 px na horizontal, sem atrapalhar a rolagem vertical */
  let x0 = null;
  let y0 = null;
  hero.addEventListener('pointerdown', e => {
    if (e.target.closest('a, button')) return;
    x0 = e.clientX;
    y0 = e.clientY;
  });
  hero.addEventListener('pointerup', e => {
    if (x0 == null) return;
    const dx = e.clientX - x0;
    const dy = e.clientY - y0;
    x0 = y0 = null;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    mostrar(dx < 0 ? proximo(atual) : (atual - 1 + slides.length) % slides.length);
    iniciar();
  });

  /* ---------- início ---------- */
  carregar(atual);
  marcarDots();
  window.addEventListener('load', () => carregar(proximo(atual)));
  iniciar();
})();
