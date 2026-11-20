/* =========================================================
   <mpb-header> · navbar comum a todas as páginas
   Logo, links (MPB.NAV), botão de encomenda e menu mobile.

   Navbar recolhível (V002.1):
   - no topo da página: barra completa e fixa;
   - rolando para baixo: a barra some e o logo e o botão de
     menu viram HUDs circulares, deslizando para as laterais;
   - rolando para cima: a barra volta e os HUDs retornam ao lugar.
   No desktop, clicar no HUD de menu reabre a barra.

   Uso:  <mpb-header></mpb-header>
   Estilo: css/components/header.css
   ========================================================= */

class MpbHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';

    const { SITE, NAV, PAGES, url, link, esc } = MPB;

    const links = NAV.map(({ label, href }) => {
      const l = link(href);
      return `<a href="${l.href}"${l.atual ? ' aria-current="page"' : ''}>• ${esc(label)}</a>`;
    }).join('\n            ');

    /* Botão de encomenda: leva ao cardápio; dentro do cardápio, rola até o catálogo */
    const noCardapio = link(PAGES.cardapio).atual;
    const cta = noCardapio
      ? { href: '#catalogo', longo: 'Escolher meu bolo', curto: 'Escolher' }
      : { href: url(PAGES.cardapio), longo: 'Fazer encomenda', curto: 'Encomendar' };

    this.innerHTML = `
      <header class="header">
        <div class="container nav-wrapper">

          <a href="${url(PAGES.home)}" class="navbar-brand" aria-label="${esc(SITE.nome)} — início">
            <img class="brand-logo" src="${url(SITE.logo)}" alt="">
            <img class="brand-icon" src="${url(SITE.icone)}" alt="">
          </a>

          <nav class="nav-menu" id="navMenu" aria-label="Principal">
            ${links}
          </nav>

          <a href="${cta.href}" class="btn-primary desktop-cta">
            <span class="cta-longo">${cta.longo}</span><span class="cta-curto">${cta.curto}</span>
          </a>

          <button class="menu-toggle" id="menuToggle" type="button"
                  aria-controls="navMenu" aria-expanded="false" aria-label="Abrir menu">︙</button>

        </div>
      </header>`;

    this.header = this.querySelector('.header');
    this.#menu();
    this.#recolher();
  }

  /* Menu mobile: abre no botão; fecha com clique fora, Esc ou ao escolher um link */
  #menu() {
    const toggle = this.querySelector('.menu-toggle');
    const nav = this.querySelector('.nav-menu');
    const desktop = window.matchMedia('(min-width: 1025px)');

    this.setMenu = aberto => {
      nav.classList.toggle('active', aberto);
      toggle.setAttribute('aria-expanded', String(aberto));
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    };

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      /* No desktop recolhido, o HUD de menu traz a barra de volta */
      if (desktop.matches && this.header.classList.contains('is-collapsed')) {
        this.setRecolhido(false);
        return;
      }
      this.setMenu(!nav.classList.contains('active'));
    });

    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) this.setMenu(false);
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') this.setMenu(false); });
    nav.addEventListener('click', e => { if (e.target.closest('a')) this.setMenu(false); });
  }

  /* Recolhe ao rolar para baixo; volta ao rolar para cima ou no topo */
  #recolher() {
    const TOPO = 80;        // px: abaixo disso a barra fica sempre aberta
    const LIMIAR = 8;       // px: ignora tremidas pequenas de rolagem
    let ultimoY = window.scrollY;
    let pendente = false;

    this.setRecolhido = recolhido => {
      if (this.header.classList.contains('is-collapsed') === recolhido) return;
      this.header.classList.toggle('is-collapsed', recolhido);
      if (recolhido) this.setMenu(false);
    };

    const avaliar = () => {
      pendente = false;
      const y = window.scrollY;
      if (y <= TOPO) this.setRecolhido(false);
      else if (y > ultimoY + LIMIAR) this.setRecolhido(true);
      else if (y < ultimoY - LIMIAR) this.setRecolhido(false);
      else return;            // movimento pequeno: mantém referência
      ultimoY = y;
    };

    window.addEventListener('scroll', () => {
      if (!pendente) { pendente = true; requestAnimationFrame(avaliar); }
    }, { passive: true });

    avaliar();
  }
}

customElements.define('mpb-header', MpbHeader);
