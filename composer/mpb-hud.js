/* =========================================================
   <mpb-hud> · atalhos flutuantes (canto inferior esquerdo)
   1. Instagram
   2. Cardápio — ícone da logo, "tremendo" a cada poucos
      segundos para chamar atenção. Some na própria página
      do cardápio.
   Rótulos: aparecem ao passar o mouse e, no celular, ao tocar.
   Entram depois que a página rola 40% da tela.

   Uso:  <mpb-hud></mpb-hud>
   Estilo: css/components/hud.css
   ========================================================= */

class MpbHud extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';

    const { SITE, CONTATO, PAGES, url, link } = MPB;
    const naCardapio = link(PAGES.cardapio).atual;

    this.innerHTML = `
      <nav class="hud" aria-label="Atalhos">

        <a class="hud__btn hud__btn--insta" href="${CONTATO.instagram}" target="_blank" rel="noopener noreferrer"
           aria-label="Instagram ${CONTATO.instagramLabel}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/>
            <circle cx="17.4" cy="6.6" r="1.1" class="fill"/>
          </svg>
          <span class="hud__label">Instagram</span>
        </a>

        ${naCardapio ? '' : `
        <a class="hud__btn hud__btn--cardapio" href="${url(PAGES.cardapio)}" aria-label="Abrir o cardápio">
          <img src="${url(SITE.icone)}" alt="" width="40" height="40">
          <span class="hud__label">Cardápio</span>
        </a>`}

      </nav>`;

    this.#rotuloNoToque();
    this.#aparecerAoRolar();
  }

  /* Some no começo da página (para não cobrir a abertura e seus botões)
     e entra quando o visitante rola 40% da altura da tela. */
  #aparecerAoRolar() {
    const hud = this.querySelector('.hud');
    let pendente = false;
    const avaliar = () => {
      pendente = false;
      hud.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener('scroll', () => {
      if (!pendente) { pendente = true; requestAnimationFrame(avaliar); }
    }, { passive: true });
    avaliar();
  }

  /* No celular não existe "passar o mouse": o rótulo aparece ao encostar o dedo
     e some sozinho depois de alguns instantes. */
  #rotuloNoToque() {
    const timers = new WeakMap();
    this.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse') return;
      const btn = e.target.closest('.hud__btn');
      if (!btn) return;
      this.querySelectorAll('.hud__btn.show-label').forEach(b => b !== btn && b.classList.remove('show-label'));
      btn.classList.add('show-label');
      clearTimeout(timers.get(btn));
      timers.set(btn, setTimeout(() => btn.classList.remove('show-label'), 1800));
    });
  }
}

customElements.define('mpb-hud', MpbHud);
