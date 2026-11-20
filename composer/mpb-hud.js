/* =========================================================
   <mpb-hud> · atalhos flutuantes (canto inferior esquerdo)
   1. Instagram
   2. Cardápio — ícone da logo, "tremendo" a cada poucos
      segundos para chamar atenção. Some na própria página
      do cardápio.

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
  }
}

customElements.define('mpb-hud', MpbHud);
