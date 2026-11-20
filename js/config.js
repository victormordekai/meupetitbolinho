/* =========================================================
   MEU PETIT BOLINHO® · configuração da marca
   Fonte única de contatos e regras comerciais.
   Páginas e scripts leem daqui (window.MPB).
   ========================================================= */

window.MPB = window.MPB || {};

MPB.SITE = Object.freeze({
  nome: 'Meu Petit Bolinho®',
  versao: '2026.11',
  cidade: 'Curitiba • PR'
});

MPB.CONTATO = Object.freeze({
  whatsapp: '5541987862994',           // (41) 98786-2994
  whatsappLabel: '(41) 98786-2994',
  instagram: 'https://instagram.com/meupetitbolinho',
  instagramLabel: '@meupetitbolinho',
  facebook: 'https://www.facebook.com/meupetitbolinho'
});

/* Regras do cardápio 2026 (página "Informações gerais") */
MPB.REGRAS = Object.freeze({
  antecedenciaDias: 5,
  sinalPercentual: 50,
  pagamento: ['Cartão de crédito ou débito', 'Dinheiro', 'Pix']
});

/* wa.me com mensagem pronta */
MPB.whatsappCom = texto =>
  `https://wa.me/${MPB.CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;

/* R$ 1.234,50 */
MPB.brl = valor =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: valor % 1 ? 2 : 0 });
