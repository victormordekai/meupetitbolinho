/* =========================================================
   MEU PETIT BOLINHO® · configuração da marca
   Fonte única de contatos, regras comerciais e mapa do site.
   Componentes (composer/) e páginas (js/pages/) leem daqui.

   Carregar ANTES de composer/*.js e js/pages/*.js.
   ========================================================= */

window.MPB = window.MPB || {};

/* Raiz do site, calculada a partir deste arquivo (js/core/config.js → ../../).
   Funciona igual em index.html, em page/*.html, no GitHub Pages e abrindo
   o arquivo direto no computador. */
MPB.ROOT = new URL('../../', document.currentScript.src);

/* Caminho a partir da raiz → endereço absoluto. Ex.: MPB.url('page/cardapio.html') */
MPB.url = caminho => new URL(caminho, MPB.ROOT).href;

MPB.SITE = Object.freeze({
  nome: 'Meu Petit Bolinho®',
  /* Versão exibida no footer: V<maior><ordem>.<menor>.<correção> <ano>.<mês>
     Atualize a cada publicação; o footer de todas as páginas lê daqui. */
  versao: 'V002.1.1 26.11',
  copy: '© Meu Petit Bolinho® — Todos os direitos reservados',
  cidade: 'Curitiba • PR',
  logo: 'assets/logos/logo-light.png',
  icone: 'assets/logos/logo-icone.png'
});

MPB.CONTATO = Object.freeze({
  whatsapp: '5541987862994',           // (41) 98786-2994
  whatsappLabel: '(41) 98786-2994',
  instagram: 'https://instagram.com/meupetitbolinho',
  instagramLabel: '@meupetitbolinho',
  facebook: 'https://www.facebook.com/meupetitbolinho'
});

/* Páginas (um só lugar para renomear ou mover) */
MPB.PAGES = Object.freeze({
  home: 'index.html',
  cardapio: 'page/cardapio.html'
});

/* Navbar: mesma disposição em todas as páginas.
   href relativo à raiz; '#id' fica na página atual. */
MPB.NAV = Object.freeze([
  { label: 'Início',   href: 'index.html' },
  { label: 'Cardápio', href: 'page/cardapio.html' },
  { label: 'Sobre',    href: 'index.html#sobre' },
  { label: 'Linhas',   href: 'index.html#produtos' },
  { label: 'FAQ',      href: 'index.html#faq' },
  { label: 'Contato',  href: '#contato' }
]);

/* Regras do cardápio 2026 (página "Informações gerais") */
MPB.REGRAS = Object.freeze({
  antecedenciaDias: 5,
  sinalPercentual: 50,
  pagamento: ['Cartão de crédito ou débito', 'Dinheiro', 'Pix']
});

/* wa.me com mensagem pronta */
MPB.whatsappCom = texto =>
  `https://wa.me/${MPB.CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;

/* Mensagem de primeiro contato: usada por todos os botões de WhatsApp
   fora da encomenda do cardápio (CTA de atendimento e footer).
   A encomenda do cardápio monta a própria mensagem com os itens. */
MPB.SAUDACAO = 'Olá, vi sua página de confeitaria e gostaria de saber mais sobre a doceria Meu Petit Bolinho!';
MPB.whatsappSaudacao = () => MPB.whatsappCom(MPB.SAUDACAO);

/* R$ 1.234,50 */
MPB.brl = valor =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: valor % 1 ? 2 : 0 });

/* Escapa texto para HTML */
MPB.esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* Link → href final + se é a página atual */
MPB.link = href => {
  if (href.startsWith('#')) return { href, atual: false };
  const abs = MPB.url(href);
  const sem = u => new URL(u).pathname.replace(/index\.html$/, '');
  const atual = !abs.includes('#') && sem(abs) === sem(location.href);
  return { href: abs, atual };
};
