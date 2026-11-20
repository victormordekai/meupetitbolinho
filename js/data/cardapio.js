/* =========================================================
   MEU PETIT BOLINHO® · Cardápio 2026 (dados)
   Transcrito do cardápio oficial no Canva.
   Para mudar preço, sabor ou foto: edite só este arquivo.

   foto: caminho em assets/shop/ (ou null → ilustração da linha)
   precos: por tamanho (PP, P, M, G) ou preco único (unidade/pacote)
   tags: usadas nos filtros de preferência
   ========================================================= */

window.MPB = window.MPB || {};

MPB.TAMANHOS = Object.freeze([
  { id: 'PP', cm: 13, fatias: 'até 7 fatias',  peso: 'aprox. 1 kg' },
  { id: 'P',  cm: 15, fatias: 'até 15 fatias', peso: 'aprox. 1,6 kg' },
  { id: 'M',  cm: 20, fatias: 'até 25 fatias', peso: 'entre 2,5 e 3 kg' },
  { id: 'G',  cm: 25, fatias: 'até 35 fatias', peso: 'entre 3,5 e 4 kg' }
]);

MPB.LINHAS = Object.freeze([
  { id: 'favoritos',   nome: 'Favoritos da Família', frase: 'Os mais escolhidos para aniversários familiares', cor: '#dee6e8', guia: 'Busca tradição e conforto?' },
  { id: 'leves',       nome: 'Leves e Frutados',     frase: 'Para quem ama bolos leves, frescos e equilibrados', cor: '#d2ddbd', guia: 'Prefere sabores frescos e leves?' },
  { id: 'tradicionais',nome: 'Tradicionais',         frase: 'Para quem ama um leite condensado',               cor: '#ffdac7', guia: 'Não abre mão do leite condensado?' },
  { id: 'chocolat',    nome: 'Chocolat',             frase: 'Para aniversários especiais e presentes marcantes', cor: '#fbe2b9', guia: 'Ama chocolate intenso ou sem exagero?' },
  { id: 'carinho',     nome: 'Carinho',              frase: 'Bolos individuais de 9 cm, para presentear',     cor: '#f6dcd3', guia: 'Quer impressionar em um presente?' },
  { id: 'especiais',   nome: 'Especiais',            frase: 'Pâtisserie para mesas e momentos menores',       cor: '#f3e6cc', guia: null }
]);

const FAVORITOS = { PP: 185, P: 250, M: 295, G: 385 };
const PISTACHE  = { PP: 220, P: 265, M: 335, G: 420 };
const TRADICIONAIS = { PP: 150, P: 220, M: 285, G: 350 };
const CHOCOLAT  = { PP: 210, P: 260, M: 350, G: 390 };
const NUTELLA   = { PP: 250, P: 320, M: 405 };
const INTENSE   = { PP: 240, P: 295, M: 397 };

const COB_BUTTER_NATA = 'Buttercream (para bolo decorado) ou nata.';

MPB.PRODUTOS = Object.freeze([
  /* ---------- FAVORITOS DA FAMÍLIA ---------- */
  { id: 'douce-rouge', linha: 'favoritos', nome: 'Douce Rouge', selo: 'Mais pedido',
    descricao: 'Massa branca amanteigada, creme de baunilha em favas e geleia artesanal de morangos.',
    cobertura: 'Buttercream (para decorados) ou nata.',
    nota: 'Um dos decorados mais escolhidos para aniversários em família: suave, aromático e nada enjoativo.',
    precos: FAVORITOS, foto: 'douce-rouge', tags: ['frutas', 'decoravel'] },

  { id: 'primavera', linha: 'favoritos', nome: 'Primavera', selo: 'Mais pedido',
    descricao: 'Massa branca amanteigada, creme de baunilha em favas, geleia artesanal de morangos e mirtilos.',
    cobertura: 'Nata, morangos e mirtilos. Opcional: bolo no acetato.',
    nota: 'Nosso bolo mais escolhido para aniversários em família. Leve, equilibrado e elegante.',
    precos: FAVORITOS, foto: 'primavera', tags: ['frutas'] },

  { id: 'petit-martha-rocha', linha: 'favoritos', nome: 'Petit Martha Rocha', selo: 'Mais pedido',
    descricao: 'Massa amanteigada, creme de baunilha em favas, geleias artesanais de damasco e de ameixa, crocante de nozes e suspiro.',
    cobertura: 'Nata e nozes.',
    precos: FAVORITOS, foto: 'martha-rocha', tags: ['frutas', 'castanhas'] },

  { id: 'trufado-de-chocolate', linha: 'favoritos', nome: 'Trufado de Chocolate',
    descricao: 'Massa de cacau 50% e creme trufado de chocolate nobre ao leite.',
    cobertura: 'Nata e splits de chocolate ou buttercream (ideal para decorados).',
    precos: FAVORITOS, foto: 'trufado', tags: ['chocolate', 'decoravel'] },

  { id: 'chococaramel', linha: 'favoritos', nome: 'Chococaramel', selo: 'Recheio mais doce',
    descricao: 'Massa de cacau 50%, trufado de chocolate nobre meio amargo e caramelo (opcional com amendoim).',
    cobertura: 'Nata e splits de chocolate ou buttercream (ideal para decorados).',
    precos: FAVORITOS, foto: 'chococaramel', tags: ['chocolate', 'decoravel'] },

  /* ---------- LEVES E FRUTADOS ---------- */
  { id: 'citron', linha: 'leves', nome: 'Citron', selo: 'Mais pedido',
    descricao: 'Massa branca amanteigada, creme curd de limão siciliano e geleia de frutas vermelhas.',
    cobertura: COB_BUTTER_NATA,
    precos: FAVORITOS, foto: 'citron', tags: ['frutas', 'decoravel'] },

  { id: 'tropicalle', linha: 'leves', nome: 'Tropicalle',
    descricao: 'Massa branca amanteigada, abacaxi caramelizado e creme de baunilha em favas.',
    cobertura: COB_BUTTER_NATA,
    precos: FAVORITOS, foto: null, tags: ['frutas', 'decoravel'] },

  { id: 'creme-com-morango', linha: 'leves', nome: 'Creme com Morango', selo: 'Mais pedido',
    descricao: 'Semi naked de massa branca amanteigada com creme de baunilha e morangos frescos.',
    cobertura: 'Nata e morangos.',
    precos: FAVORITOS, foto: 'creme-com-morango', tags: ['frutas'] },

  { id: 'pistache-rouge', linha: 'leves', nome: 'Pistache Rouge',
    descricao: 'Massa branca amanteigada, creme de pistache com pedaços de pistache e compota de frutas vermelhas.',
    cobertura: 'Buttercream ou nata.',
    precos: PISTACHE, foto: 'pistache-rouge', tags: ['frutas', 'castanhas', 'decoravel'] },

  /* ---------- TRADICIONAIS ---------- */
  { id: 'dois-amores', linha: 'tradicionais', nome: 'Dois Amores',
    descricao: 'Massa de cacau amanteigada, brigadeiro branco e brigadeiro tradicional.',
    cobertura: COB_BUTTER_NATA,
    precos: TRADICIONAIS, foto: null, tags: ['leite-condensado', 'chocolate', 'decoravel'] },

  { id: 'abacaxi', linha: 'tradicionais', nome: 'Abacaxi',
    descricao: 'Massa branca amanteigada, abacaxi caramelizado e brigadeiro branco.',
    cobertura: COB_BUTTER_NATA,
    precos: TRADICIONAIS, foto: null, tags: ['leite-condensado', 'frutas', 'decoravel'] },

  { id: 'brigadeiro', linha: 'tradicionais', nome: 'Brigadeiro',
    descricao: 'Massa branca amanteigada com recheio de brigadeiro tradicional.',
    cobertura: COB_BUTTER_NATA,
    precos: TRADICIONAIS, foto: null, tags: ['leite-condensado', 'chocolate', 'decoravel'] },

  { id: 'amendoim-com-chocolate', linha: 'tradicionais', nome: 'Amendoim com Chocolate',
    descricao: 'Massa branca amanteigada com brigadeiro tradicional e brigadeiro de amendoim.',
    cobertura: COB_BUTTER_NATA,
    precos: TRADICIONAIS, foto: null, tags: ['leite-condensado', 'chocolate', 'castanhas', 'decoravel'] },

  { id: 'ninho-com-morangos', linha: 'tradicionais', nome: 'Ninho com Morangos',
    descricao: 'Massa branca amanteigada com brigadeiro branco de leite Ninho e morangos frescos.',
    cobertura: 'Nata e morangos ou buttercream (para bolo decorado).',
    precos: TRADICIONAIS, foto: null, tags: ['leite-condensado', 'frutas', 'decoravel'] },

  /* ---------- CHOCOLAT ---------- */
  { id: 'chocolat-intense', linha: 'chocolat', nome: 'Chocolat Intense',
    descricao: 'Massa de cacau 50% e trufado de chocolate nobre com pedaços de chocolate.',
    cobertura: 'Buttercream suave de chocolate.',
    precos: CHOCOLAT, foto: 'chocolat-intense', tags: ['chocolate', 'decoravel'] },

  { id: 'coco-noir', linha: 'chocolat', nome: 'Coco Noir', selo: 'Mais pedido',
    descricao: 'Naked cake de massa de cacau 50% com recheio de creme de coco.',
    cobertura: 'Drip de ganache de chocolate nobre.',
    precos: CHOCOLAT, foto: null, tags: ['chocolate'] },

  { id: 'fraise-chocolat', linha: 'chocolat', nome: 'Fraise & Chocolat', selo: 'Mais pedido',
    descricao: 'Naked cake de massa amanteigada, creme de baunilha em fava e geleia de morangos.',
    cobertura: 'Drip de ganache de chocolate nobre, morangos frescos e raspas de chocolate.',
    precos: CHOCOLAT, foto: 'fraise-chocolat', tags: ['chocolate', 'frutas'] },

  { id: 'nutella-ferrero', linha: 'chocolat', nome: 'Nutella e Ferrero Rocher', selo: 'Especial',
    descricao: 'Massa de cacau 50%, pura Nutella e ganache de chocolate nobre com crocante de avelãs.',
    cobertura: 'Ganache de chocolate meio amargo e bombons Ferrero Rocher.',
    precos: NUTELLA, foto: 'nutella-ferrero', fotos: ['nutella-ferrero', 'nutella-ferrero-2'], tags: ['chocolate', 'castanhas'] },

  { id: 'caramelo-e-nozes', linha: 'chocolat', nome: 'Caramelo e Nozes',
    descricao: 'Massa de cacau 50%, ganache de chocolate nobre meio amargo, caramelo salgado e nozes.',
    cobertura: 'Ganache de chocolate nobre e nozes.',
    precos: INTENSE, foto: 'caramelo-nozes', tags: ['chocolate', 'castanhas'] },

  { id: 'intense', linha: 'chocolat', nome: 'Intense',
    descricao: 'Massa de cacau 50% e trufado de chocolate nobre ao leite com pedaços de chocolate.',
    cobertura: 'Ganache de chocolate nobre meio amargo e raspas de chocolate.',
    precos: INTENSE, foto: null, tags: ['chocolate'] },

  /* ---------- CARINHO (individuais 9 cm) ---------- */
  { id: 'carinho', linha: 'carinho', nome: 'Bolinho Carinho', selo: 'Para presentear',
    descricao: 'Nossa linha de bolos pequenos (9 cm), decorados com delicadeza e embalados em caixinhas sofisticadas.',
    preco: 65, aPartirDe: true, unidade: 'unidade',
    foto: 'carinho', fotos: ['carinho', 'carinho-2'], tags: ['presente'] },

  /* ---------- ESPECIAIS ---------- */
  { id: 'mini-eclair', linha: 'especiais', nome: 'Mini Éclair',
    descricao: 'Massa choux com recheio de creme de baunilha e cobertura de chocolate nobre ao leite.',
    preco: 47, unidade: 'caixa com 10', foto: 'mini-eclair', tags: ['chocolate'] },

  { id: 'tarte-de-maca', linha: 'especiais', nome: 'Tarte de Maçã', subtitulo: 'Tarte Normande',
    descricao: 'Torta francesa com base crocante amanteigada (pâte brisée), maçãs caramelizadas e crème prise. 16 cm, serve 4 a 5 pessoas.',
    preco: 69, unidade: '16 cm', foto: 'tarte-maca', tags: ['frutas'] },

  { id: 'cookies', linha: 'especiais', nome: 'Cookies',
    descricao: 'Biscoito artesanal amanteigado, macio por dentro e levemente crocante por fora, com gotas de chocolate. Outros sabores sob consulta.',
    preco: 14, unidade: 'unidade', foto: 'cookies', tags: ['chocolate'] },

  { id: 'choux-cream', linha: 'especiais', nome: 'Choux Cream',
    descricao: 'Massa leve com recheio de baunilha e crosta craquelin crocante (manteiga e açúcar).',
    preco: 19.5, unidade: 'unidade', foto: 'choux-cream', tags: [] }
]);

/* Personalização (página "Personalize") */
MPB.ADICIONAIS = Object.freeze({
  avulsos: [
    { id: 'trufas', nome: 'Trufas', preco: 6.8, unidade: 'unid.' },
    { id: 'macaron', nome: 'Macarons', preco: 9, unidade: 'unid.' }
  ],
  decoracao: ['Flores naturais', 'Frutas frescas', 'Topo de bolo', 'Drip cake', 'Vintage cake', 'Biscoito personalizado', 'Brigadeiros'],
  ingredientes: ['Massa sem glúten', 'Massa integral', 'Recheio extra de frutas, compotas ou geleias', 'Chocolate belga', 'Açúcar mascavo']
});

/* Filtros de preferência (chave = tag) */
MPB.PREFERENCIAS = Object.freeze([
  { id: 'mais-pedido', nome: 'Mais pedidos' },
  { id: 'frutas', nome: 'Com frutas' },
  { id: 'chocolate', nome: 'Chocolate' },
  { id: 'leite-condensado', nome: 'Leite condensado' },
  { id: 'castanhas', nome: 'Castanhas' },
  { id: 'decoravel', nome: 'Aceita decoração em buttercream' }
]);
