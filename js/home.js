/* =========================================================
   MEU PETIT BOLINHO® · index.html
   Linhas do cardápio e guia "como escolher", gerados a partir
   de js/data/cardapio.js (mesma fonte do cardapio.html).
   ========================================================= */

(() => {
  const { LINHAS, PRODUTOS, brl } = MPB;
  const linhasEl = document.querySelector('[data-linhas-home]');
  const guiaEl = document.querySelector('[data-guia-home]');
  if (!linhasEl || !guiaEl) return;

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* foto de capa de cada linha: o primeiro produto com foto */
  const capa = id => PRODUTOS.find(p => p.linha === id && p.foto)?.foto;

  /* menor preço da linha (no menor tamanho disponível) */
  const aPartir = id => Math.min(...PRODUTOS.filter(p => p.linha === id)
    .map(p => p.precos ? Math.min(...Object.values(p.precos)) : p.preco));

  linhasEl.innerHTML = LINHAS.map(l => {
    const foto = capa(l.id);
    const n = PRODUTOS.filter(p => p.linha === l.id).length;
    return `
      <a class="linha-card" href="cardapio.html#linha=${l.id}" style="--linha:${l.cor}">
        ${foto
          ? `<img src="assets/shop/${foto}.jpg" alt="" loading="lazy" decoding="async">`
          : `<div class="linha-card__illus" aria-hidden="true">
               <svg viewBox="0 0 120 120"><path d="M24 70h72v26a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6z" fill="#fff" stroke="currentColor" stroke-width="2.4"/><path d="M24 70c6 7 12 7 18 0s12-7 18 0 12 7 18 0 12-7 18 0" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M30 54h60v16H30z" fill="#fff" stroke="currentColor" stroke-width="2.4"/><circle cx="52" cy="44" r="6" fill="#e9a7a0" stroke="currentColor" stroke-width="2"/><circle cx="68" cy="44" r="6" fill="#e9a7a0" stroke="currentColor" stroke-width="2"/></svg>
             </div>`}
        <div class="linha-card__body">
          <h3>${esc(l.nome)}</h3>
          <p>${esc(l.frase)}</p>
          <span class="linha-card__preco">${n} ${n === 1 ? 'opção' : 'opções'} · a partir de ${brl(aPartir(l.id))}</span>
        </div>
      </a>`;
  }).join('');

  guiaEl.innerHTML = LINHAS.filter(l => l.guia).map(l => `
    <a class="guia-item" href="cardapio.html#linha=${l.id}" style="--linha:${l.cor}">
      <span>${esc(l.guia)}</span>
      <b>→ ${esc(l.nome)}</b>
    </a>`).join('');
})();
