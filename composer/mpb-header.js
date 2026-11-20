/* =========================================================
   <mpb-header> · navbar comum a todas as páginas
   Logo, links (MPB.NAV), botão mobile e "Fazer Pedido".

   Uso:  <mpb-header></mpb-header>
   Estilo: css/components/header.css
   ========================================================= */

class MpbHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';

    const { SITE, CONTATO, NAV, url, link, esc } = MPB;

    const links = NAV.map(({ label, href }) => {
      const l = link(href);
      return `<a href="${l.href}"${l.atual ? ' aria-current="page"' : ''}>• ${esc(label)}</a>`;
    }).join('\n        ');

    this.innerHTML = `
      <header class="header">
        <div class="container nav-wrapper">

          <a href="${url(MPB.PAGES.home)}" class="navbar-brand">
            <img src="${url(SITE.logo)}" alt="${esc(SITE.nome)} — início">
          </a>

          <nav class="nav-menu" id="navMenu" aria-label="Principal">
            ${links}
          </nav>

          <button class="menu-toggle" id="menuToggle" type="button"
                  aria-controls="navMenu" aria-expanded="false" aria-label="Abrir menu">︙</button>

          <a href="https://wa.me/${CONTATO.whatsapp}" target="_blank" rel="noopener noreferrer"
             class="btn-primary desktop-cta">Fazer Pedido</a>

        </div>
      </header>`;

    this.#menu();
  }

  /* Menu mobile: abre no botão; fecha com clique fora, Esc, rolagem ou ao escolher um link */
  #menu() {
    const toggle = this.querySelector('.menu-toggle');
    const nav = this.querySelector('.nav-menu');

    const set = aberto => {
      nav.classList.toggle('active', aberto);
      toggle.setAttribute('aria-expanded', String(aberto));
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    };

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      set(!nav.classList.contains('active'));
    });

    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) set(false);
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
    window.addEventListener('scroll', () => set(false), { passive: true });
    nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  }
}

customElements.define('mpb-header', MpbHeader);
