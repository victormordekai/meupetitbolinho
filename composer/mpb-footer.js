/* =========================================================
   <mpb-footer> · footer comum a todas as páginas
   Marca, mapa do site, encomendas, atendimento, regras de
   pedido, copy e versão — tudo lido de js/core/config.js.

   Uso:  <mpb-footer></mpb-footer>
   Estilo: css/components/footer.css
   ========================================================= */

const MPB_ICONES = {
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" class="fill"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5V7c0-.8.5-1.2 1.2-1.2H17V3h-2.6C11.9 3 11 4.6 11 6.8v1.7H9v3h2V21h3v-9.5h2.4l.5-3H14z" class="fill"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 19.5l1.1-3.9A8 8 0 1 1 8.6 18.4z"/><path d="M9.2 8.6c.2-.5.6-.5.9-.5h.4c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.6l-.5.6c-.1.1-.1.3 0 .5.5.9 1.3 1.7 2.3 2.2.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.4c0 .3-.1.7-.5.9-.5.3-1.2.4-1.9.2-1.5-.4-3.5-2-4.4-3.7-.4-.8-.6-1.6-.3-2.4z" class="fill"/></svg>',
  topo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14l6-6 6 6"/></svg>'
};

class MpbFooter extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';

    const { SITE, CONTATO, NAV, REGRAS, PAGES, url, link, esc } = MPB;
    const ext = 'target="_blank" rel="noopener noreferrer"';

    const item = (label, href) => {
      const l = link(href);
      return `<li><a href="${l.href}"${l.atual ? ' aria-current="page"' : ''}>${esc(label)}</a></li>`;
    };

    const cardapio = url(PAGES.cardapio);

    this.innerHTML = `
      <footer class="site-footer">

        <div class="container site-footer__grid">

          <div class="site-footer__brand">
            <a href="${url(PAGES.home)}" class="site-footer__logo" aria-label="${esc(SITE.nome)} — início">
              <img src="${url(SITE.logo)}" alt="" width="150">
            </a>
            <p>
              Confeitaria autoral contemporânea. Celebrações, descobertas e memórias
              afetivas construídas com delicadeza, presença e sabor.
            </p>
            <ul class="site-footer__social" aria-label="Redes sociais">
              <li><a href="${CONTATO.instagram}" ${ext} aria-label="Instagram">${MPB_ICONES.instagram}</a></li>
              <li><a href="${CONTATO.facebook}" ${ext} aria-label="Facebook">${MPB_ICONES.facebook}</a></li>
              <li><a href="https://wa.me/${CONTATO.whatsapp}" ${ext} aria-label="WhatsApp">${MPB_ICONES.whatsapp}</a></li>
            </ul>
          </div>

          <nav class="site-footer__col" aria-label="Mapa do site">
            <span class="site-footer__title">Navegação</span>
            <ul>${NAV.filter(n => !n.href.startsWith('#')).map(n => item(n.label, n.href)).join('')}</ul>
          </nav>

          <div class="site-footer__col">
            <span class="site-footer__title">Encomendas</span>
            <ul>
              <li><a href="${cardapio}">Cardápio completo</a></li>
              <li><a href="${cardapio}#tamanhos">Tamanhos e fatias</a></li>
              <li><a href="${cardapio}#como-encomendar">Como encomendar</a></li>
              <li><a href="${url('index.html#faq')}">Perguntas frequentes</a></li>
            </ul>
          </div>

          <div class="site-footer__col">
            <span class="site-footer__title">Atendimento</span>
            <ul class="site-footer__contato">
              <li><a href="https://wa.me/${CONTATO.whatsapp}" ${ext}>WhatsApp<br><b>${esc(CONTATO.whatsappLabel)}</b></a></li>
              <li><a href="${CONTATO.instagram}" ${ext}>Instagram<br><b>${esc(CONTATO.instagramLabel)}</b></a></li>
              <li>Atendimento em<br><b>${esc(SITE.cidade)}</b></li>
            </ul>
          </div>

        </div>

        <div class="container">
          <ul class="site-footer__regras" aria-label="Regras de encomenda">
            <li><b>${REGRAS.antecedenciaDias} dias</b> de antecedência mínima</li>
            <li><b>Sinal de ${REGRAS.sinalPercentual}%</b> para confirmar</li>
            <li><b>Cartão, dinheiro ou Pix</b></li>
            <li><b>Produção limitada</b>, sob encomenda</li>
          </ul>
        </div>

        <div class="container site-footer__bottom">
          <p>${esc(SITE.copy)} — <span class="site-footer__versao">${esc(SITE.versao)}</span></p>
          <a href="#top" class="site-footer__topo" data-topo>Voltar ao topo ${MPB_ICONES.topo}</a>
        </div>

      </footer>`;

    this.querySelector('[data-topo]').addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

customElements.define('mpb-footer', MpbFooter);
