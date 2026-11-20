/* =========================================================
   MEU PETIT BOLINHO® · cardapio.html
   Catálogo com filtros (linha, tamanho, faixa de preço,
   preferências, busca e ordem), ficha do produto e
   seleção enviada pelo WhatsApp.
   Depende de: js/config.js, js/data/cardapio.js
   ========================================================= */

(() => {
  const { PRODUTOS, LINHAS, TAMANHOS, ADICIONAIS, PREFERENCIAS, REGRAS, brl, whatsappCom } = MPB;

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const LINHA = Object.fromEntries(LINHAS.map(l => [l.id, l]));
  const TAM = Object.fromEntries(TAMANHOS.map(t => [t.id, t]));
  const BY_ID = Object.fromEntries(PRODUTOS.map(p => [p.id, p]));
  const fotoSrc = nome => `assets/shop/${nome}.jpg`;

  /* ---------------- preço ---------------- */

  const porTamanho = p => Boolean(p.precos);
  const precoDe = (p, tam) => porTamanho(p) ? p.precos[tam] : p.preco;
  const tamanhosDe = p => porTamanho(p) ? TAMANHOS.filter(t => p.precos[t.id]) : [];

  function precoTexto(p, tam) {
    if (!porTamanho(p)) return `${p.aPartirDe ? 'a partir de ' : ''}${brl(p.preco)}<small> · ${esc(p.unidade)}</small>`;
    const v = p.precos[tam];
    if (!v) return `<span class="price-off">Sem tamanho ${tam} · até ${esc(tamanhosDe(p).at(-1).id)}</span>`;
    return `${brl(v)}<small> · ${tam} ${TAM[tam].cm} cm</small>`;
  }

  /* ---------------- filtros ---------------- */

  const FAIXAS = [
    { id: 'todas', nome: 'Todas', test: () => true },
    { id: 'ate-150', nome: 'Até R$ 150', test: v => v <= 150 },
    { id: '150-250', nome: 'R$ 150 a 250', test: v => v > 150 && v <= 250 },
    { id: '250-350', nome: 'R$ 250 a 350', test: v => v > 250 && v <= 350 },
    { id: 'acima-350', nome: 'Acima de R$ 350', test: v => v > 350 }
  ];

  const ORDENS = {
    cardapio: null,
    menor: (a, b) => (precoDe(a, state.tamanho) ?? Infinity) - (precoDe(b, state.tamanho) ?? Infinity),
    maior: (a, b) => (precoDe(b, state.tamanho) ?? -Infinity) - (precoDe(a, state.tamanho) ?? -Infinity),
    nome: (a, b) => a.nome.localeCompare(b.nome, 'pt-BR')
  };

  const PADRAO = Object.freeze({ linha: 'todas', tamanho: 'P', faixa: 'todas', prefs: [], busca: '', ordem: 'cardapio' });
  const state = { ...PADRAO, prefs: [] };

  const temPref = (p, pref) => pref === 'mais-pedido' ? p.selo === 'Mais pedido' : (p.tags || []).includes(pref);
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const passa = (p, ignorar) =>
    (ignorar === 'linha' || state.linha === 'todas' || p.linha === state.linha) &&
    (ignorar === 'faixa' || (() => { const v = precoDe(p, state.tamanho); return state.faixa === 'todas' || (v != null && FAIXAS.find(f => f.id === state.faixa).test(v)); })()) &&
    state.prefs.every(pref => temPref(p, pref)) &&
    (!state.busca || norm(`${p.nome} ${p.descricao} ${p.cobertura || ''}`).includes(norm(state.busca)));

  /* ---------------- elementos ---------------- */

  const el = {
    grid: $('[data-catalog]'),
    linhas: $('[data-linhas]'),
    tamanhos: $('[data-tamanhos]'),
    faixas: $('[data-faixas]'),
    prefs: $('[data-prefs]'),
    busca: $('[data-busca]'),
    ordem: $('[data-ordem]'),
    reset: $('[data-reset]'),
    count: $('[data-count]'),
    empty: $('[data-empty]'),
    guia: $('[data-guia]'),
    tamanhoInfo: $('[data-tamanho-info]')
  };

  const chip = (attr, value, label, n, pressed, extra = '') =>
    `<button type="button" class="chip" ${attr}="${esc(value)}" aria-pressed="${pressed}"${n === 0 ? ' disabled' : ''}${extra}>${label}${n != null ? ` <span>${n}</span>` : ''}</button>`;

  function renderFiltros() {
    const semLinha = PRODUTOS.filter(p => passa(p, 'linha'));
    el.linhas.innerHTML =
      chip('data-linha', 'todas', 'Todas', semLinha.length, state.linha === 'todas') +
      LINHAS.map(l => chip('data-linha', l.id, `<i style="--dot:${l.cor}"></i>${esc(l.nome)}`, semLinha.filter(p => p.linha === l.id).length, state.linha === l.id)).join('');

    el.tamanhos.innerHTML = TAMANHOS.map(t =>
      `<button type="button" class="size" data-tamanho="${t.id}" aria-pressed="${state.tamanho === t.id}">
         <b>${t.id}</b><span>${t.cm} cm</span>
       </button>`).join('');
    const t = TAM[state.tamanho];
    el.tamanhoInfo.textContent = `${t.id} · ${t.cm} cm · ${t.fatias} · ${t.peso}`;

    const semFaixa = PRODUTOS.filter(p => passa(p, 'faixa'));
    el.faixas.innerHTML = FAIXAS.map(f =>
      chip('data-faixa', f.id, f.nome, semFaixa.filter(p => { const v = precoDe(p, state.tamanho); return v != null && f.test(v); }).length, state.faixa === f.id)).join('');

    el.prefs.innerHTML = PREFERENCIAS.map(pr =>
      chip('data-pref', pr.id, esc(pr.nome), null, state.prefs.includes(pr.id))).join('');
  }

  /* ---------------- cards ---------------- */

  function ilustracao(linha) {
    return `<svg class="card-illus" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M24 70h72v26a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6z" fill="#fff" stroke="currentColor" stroke-width="2.4"/>
      <path d="M24 70c6 7 12 7 18 0s12-7 18 0 12 7 18 0 12-7 18 0" fill="none" stroke="currentColor" stroke-width="2.4"/>
      <path d="M30 54h60v16H30z" fill="${LINHA[linha].cor}" stroke="currentColor" stroke-width="2.4"/>
      <path d="M18 106h84" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="52" cy="44" r="6" fill="#e9a7a0" stroke="currentColor" stroke-width="2"/>
      <circle cx="68" cy="44" r="6" fill="#e9a7a0" stroke="currentColor" stroke-width="2"/>
      <path d="M60 40c0-8 6-12 10-14" fill="none" stroke="#7fa35b" stroke-width="2.4" stroke-linecap="round"/>
    </svg>`;
  }

  function midia(p) {
    return p.foto
      ? `<img src="${fotoSrc(p.foto)}" alt="${esc(p.nome)}" loading="lazy" decoding="async">`
      : `<div class="card-placeholder">${ilustracao(p.linha)}<span>foto em breve</span></div>`;
  }

  function cardHtml(p) {
    const l = LINHA[p.linha];
    const v = precoDe(p, state.tamanho);
    const sel = Selecao.tem(p.id, porTamanho(p) ? state.tamanho : null);
    return `
      <article class="mpb-card" style="--linha:${l.cor}">
        <a class="mpb-card__media" href="#p=${p.id}" data-abrir="${p.id}">
          ${midia(p)}
          ${p.selo ? `<span class="mpb-card__selo">${esc(p.selo)}</span>` : ''}
        </a>
        <div class="mpb-card__body">
          <span class="mpb-card__linha">${esc(l.nome)}</span>
          <h3><a href="#p=${p.id}" data-abrir="${p.id}">${esc(p.nome)}</a></h3>
          <p>${esc(p.descricao)}</p>
          <div class="mpb-card__foot">
            <span class="mpb-card__price">${precoTexto(p, state.tamanho)}</span>
            <button type="button" class="mpb-add" data-add="${p.id}" ${v == null ? 'disabled' : ''}
              aria-pressed="${sel}" aria-label="${sel ? 'Remover' : 'Adicionar'} ${esc(p.nome)} ${porTamanho(p) ? 'tamanho ' + state.tamanho : ''} ${sel ? 'da' : 'à'} seleção">${sel ? '✓' : '+'}</button>
          </div>
        </div>
      </article>`;
  }

  function renderCatalogo() {
    const itens = PRODUTOS.filter(p => passa(p));
    if (ORDENS[state.ordem]) itens.sort(ORDENS[state.ordem]);
    el.grid.innerHTML = itens.map(cardHtml).join('');
    el.count.textContent = `${itens.length} ${itens.length === 1 ? 'opção' : 'opções'}`;
    el.empty.hidden = itens.length > 0;
    el.reset.hidden = state.linha === 'todas' && state.faixa === 'todas' && !state.prefs.length && !state.busca && state.ordem === 'cardapio';
    el.ordem.value = state.ordem;
  }

  function atualizar(mudanca = {}) {
    Object.assign(state, mudanca);
    renderFiltros();
    renderCatalogo();
  }

  /* ---------------- guia "como escolher" ---------------- */

  el.guia.innerHTML = LINHAS.filter(l => l.guia).map(l => `
    <button type="button" class="guia-item" data-guia-linha="${l.id}" style="--linha:${l.cor}">
      <span>${esc(l.guia)}</span>
      <b>→ ${esc(l.nome)}</b>
    </button>`).join('');

  /* ---------------- ficha do produto ---------------- */

  const ficha = $('[data-ficha]');
  const fichaBody = $('[data-ficha-body]', ficha);

  function fichaHtml(p) {
    const l = LINHA[p.linha];
    const fotos = p.fotos || (p.foto ? [p.foto] : []);
    const linhasTam = porTamanho(p)
      ? `<table class="ficha-tamanhos">
          <thead><tr><th>Tamanho</th><th>Serve</th><th>Valor</th><th></th></tr></thead>
          <tbody>${TAMANHOS.map(t => {
            const v = p.precos[t.id];
            const sel = Selecao.tem(p.id, t.id);
            return `<tr${v ? '' : ' class="off"'}>
              <td><b>${t.id}</b> · ${t.cm} cm</td>
              <td>${t.fatias}<small>${t.peso}</small></td>
              <td>${v ? brl(v) : '—'}</td>
              <td>${v ? `<button type="button" class="mpb-add" data-add="${p.id}" data-tam="${t.id}" aria-pressed="${sel}" aria-label="${sel ? 'Remover' : 'Adicionar'} tamanho ${t.id}">${sel ? '✓' : '+'}</button>` : ''}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
        <p class="ficha-obs">Bolos feitos com 3 camadas de massa e 2 de recheio.</p>`
      : `<div class="ficha-unico">
          <span class="mpb-card__price">${precoTexto(p)}</span>
          <button type="button" class="btn-primary" data-add="${p.id}" aria-pressed="${Selecao.tem(p.id, null)}">${Selecao.tem(p.id, null) ? '✓ Na seleção' : '+ Adicionar à seleção'}</button>
        </div>`;

    return `
      <div class="ficha-media" style="--linha:${l.cor}">
        ${fotos.length ? fotos.map((f, i) => `<img src="${fotoSrc(f)}" alt="${esc(p.nome)}${fotos.length > 1 ? ` (${i + 1})` : ''}">`).join('') : `<div class="card-placeholder">${ilustracao(p.linha)}<span>foto em breve</span></div>`}
      </div>
      <div class="ficha-info">
        <span class="mpb-card__linha">${esc(l.nome)}${p.selo ? ` · <em>${esc(p.selo)}</em>` : ''}</span>
        <h2 id="ficha-titulo">${esc(p.nome)}</h2>
        ${p.subtitulo ? `<p class="ficha-sub">${esc(p.subtitulo)}</p>` : ''}
        <p>${esc(p.descricao)}</p>
        ${p.cobertura ? `<p><b>Cobertura:</b> ${esc(p.cobertura)}</p>` : ''}
        ${p.nota ? `<p class="ficha-nota">${esc(p.nota)}</p>` : ''}
        ${linhasTam}
        <p class="ficha-obs">Encomendas com no mínimo ${REGRAS.antecedenciaDias} dias de antecedência e sinal de ${REGRAS.sinalPercentual}%.</p>
      </div>`;
  }

  function abrirFicha(id) {
    const p = BY_ID[id];
    if (!p) return;
    fichaBody.innerHTML = fichaHtml(p);
    if (!ficha.open) ficha.showModal();
    ficha.scrollTop = 0;
  }

  function fecharFicha() {
    if (ficha.open) ficha.close();
  }

  ficha.addEventListener('close', () => {
    if (location.hash.startsWith('#p=')) history.replaceState(null, '', location.pathname + location.search);
  });
  ficha.addEventListener('click', e => {
    if (e.target === ficha || e.target.closest('[data-ficha-fechar]')) fecharFicha();
  });

  /* ---------------- eventos ---------------- */

  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) {
      const p = BY_ID[add.dataset.add];
      const tam = porTamanho(p) ? (add.dataset.tam || state.tamanho) : null;
      Selecao.alternar(p.id, tam);
      return;
    }
    const abrir = e.target.closest('[data-abrir]');
    if (abrir && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      history.pushState(null, '', `#p=${abrir.dataset.abrir}`);
      abrirFicha(abrir.dataset.abrir);
      return;
    }
    const g = e.target.closest('[data-guia-linha]');
    if (g) {
      atualizar({ linha: g.dataset.guiaLinha });
      $('#catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });

  el.linhas.addEventListener('click', e => { const b = e.target.closest('[data-linha]'); if (b) atualizar({ linha: b.dataset.linha }); });
  el.tamanhos.addEventListener('click', e => { const b = e.target.closest('[data-tamanho]'); if (b) atualizar({ tamanho: b.dataset.tamanho }); });
  el.faixas.addEventListener('click', e => { const b = e.target.closest('[data-faixa]'); if (b) atualizar({ faixa: b.dataset.faixa }); });
  el.prefs.addEventListener('click', e => {
    const b = e.target.closest('[data-pref]');
    if (!b) return;
    const id = b.dataset.pref;
    atualizar({ prefs: state.prefs.includes(id) ? state.prefs.filter(x => x !== id) : [...state.prefs, id] });
  });
  el.busca.addEventListener('input', () => atualizar({ busca: el.busca.value.trim() }));
  el.ordem.addEventListener('change', () => atualizar({ ordem: el.ordem.value }));
  el.reset.addEventListener('click', () => { el.busca.value = ''; atualizar({ ...PADRAO, prefs: [], tamanho: state.tamanho }); });

  /* links: cardapio.html#linha=leves · cardapio.html#p=primavera */
  function lerHash() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h.startsWith('linha=') && LINHA[h.slice(6)]) { atualizar({ linha: h.slice(6) }); fecharFicha(); }
    else if (h.startsWith('p=') && BY_ID[h.slice(2)]) abrirFicha(h.slice(2));
    else fecharFicha();
  }
  window.addEventListener('popstate', lerHash);

  /* =========================================================
     SELEÇÃO → WHATSAPP
     ========================================================= */

  const Selecao = (() => {
    const KEY = 'mpb.selecao.v1';
    const itens = new Map();          // "id|tam" → qtd
    const avulsos = new Map();        // id → qtd
    const extras = new Set();         // decoração / ingredientes
    const chave = (id, tam) => `${id}|${tam || '-'}`;

    try {
      const s = JSON.parse(localStorage.getItem(KEY) || '{}');
      for (const [k, q] of Object.entries(s.itens || {})) { const [id] = k.split('|'); if (BY_ID[id] && q > 0) itens.set(k, Math.min(q, 99)); }
      for (const [k, q] of Object.entries(s.avulsos || {})) if (q > 0) avulsos.set(k, Math.min(q, 999));
      (s.extras || []).forEach(x => extras.add(x));
    } catch { /* navegação privada: segue em memória */ }

    const salvar = () => {
      try { localStorage.setItem(KEY, JSON.stringify({ itens: Object.fromEntries(itens), avulsos: Object.fromEntries(avulsos), extras: [...extras] })); } catch { }
    };

    const linhas = () => [...itens].map(([k, q]) => { const [id, t] = k.split('|'); return { p: BY_ID[id], tam: t === '-' ? null : t, q, k }; });
    const preco = l => precoDe(l.p, l.tam);
    const total = () =>
      linhas().reduce((s, l) => s + preco(l) * l.q, 0) +
      ADICIONAIS.avulsos.reduce((s, a) => s + a.preco * (avulsos.get(a.id) || 0), 0);
    const aPartirDe = () => linhas().some(l => l.p.aPartirDe);
    const quantidade = () => [...itens.values()].reduce((a, b) => a + b, 0);

    /* ---------- painel ---------- */
    const root = document.createElement('div');
    root.innerHTML = `
      <button type="button" class="sel-fab" data-sel-abrir aria-haspopup="dialog">
        <span>Minha encomenda</span><strong data-sel-count>0</strong>
      </button>
      <dialog class="sel" aria-labelledby="sel-titulo">
        <div class="sel__panel">
          <header class="sel__head">
            <div><span class="script">sua</span><h2 id="sel-titulo">Encomenda</h2></div>
            <button type="button" class="sel__close" data-sel-fechar aria-label="Fechar">✕</button>
          </header>
          <ul class="sel__list" data-sel-list></ul>
          <p class="sel__empty" data-sel-empty>Nenhum item ainda. Use o <b>+</b> nos cards do cardápio.</p>

          <div class="sel__form" data-sel-form>
            <fieldset class="sel__group">
              <legend>Adicionais avulsos</legend>
              ${ADICIONAIS.avulsos.map(a => `
                <div class="sel__avulso">
                  <span>${esc(a.nome)} <small>${brl(a.preco)} ${esc(a.unidade)}</small></span>
                  <div class="qty" role="group" aria-label="Quantidade de ${esc(a.nome)}">
                    <button type="button" data-avulso="${a.id}" data-passo="-1" aria-label="Diminuir">−</button>
                    <output data-avulso-q="${a.id}">0</output>
                    <button type="button" data-avulso="${a.id}" data-passo="1" aria-label="Aumentar">+</button>
                  </div>
                </div>`).join('')}
            </fieldset>

            <details class="sel__group">
              <summary>Personalização <small>(valores sob consulta)</small></summary>
              <div class="sel__extras">
                ${[...ADICIONAIS.decoracao, ...ADICIONAIS.ingredientes].map(x => `
                  <label><input type="checkbox" data-extra value="${esc(x)}"> ${esc(x)}</label>`).join('')}
              </div>
            </details>

            <label class="sel__field">Data da celebração
              <input type="date" data-sel-data required>
              <small data-sel-data-info></small>
            </label>
            <label class="sel__field">Seu nome
              <input type="text" data-sel-nome maxlength="60" autocomplete="name">
            </label>
            <label class="sel__field">Observações
              <textarea rows="3" maxlength="500" data-sel-obs placeholder="Tema da festa, cores, cobertura (buttercream ou nata), retirada…"></textarea>
            </label>

            <div class="sel__total">
              <p><span>Estimativa</span><strong data-sel-total></strong></p>
              <p><span>Sinal de ${REGRAS.sinalPercentual}%</span><strong data-sel-sinal></strong></p>
              <small>Valores confirmados no atendimento. Pagamento: ${REGRAS.pagamento.join(', ').replace(/, ([^,]*)$/, ' ou $1')}.</small>
            </div>

            <a class="btn-primary sel__send" data-sel-enviar target="_blank" rel="noopener noreferrer">Enviar encomenda pelo WhatsApp</a>
            <button type="button" class="sel__clear" data-sel-limpar>Limpar encomenda</button>
          </div>
        </div>
      </dialog>`;
    document.body.append(root);

    const dlg = $('dialog.sel', root);
    const q = sel => $(sel, root);
    const dataInput = q('[data-sel-data]');

    /* data mínima = hoje + antecedência */
    const minData = new Date();
    minData.setDate(minData.getDate() + REGRAS.antecedenciaDias);
    const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    dataInput.min = iso(minData);
    q('[data-sel-data-info]').textContent = `A partir de ${minData.toLocaleDateString('pt-BR')} (mínimo de ${REGRAS.antecedenciaDias} dias).`;

    function linhaHtml(l) {
      const t = l.tam ? TAM[l.tam] : null;
      return `<li class="sel__item">
        ${l.p.foto ? `<img src="${fotoSrc(l.p.foto)}" alt="">` : `<div class="sel__thumb" style="--linha:${LINHA[l.p.linha].cor}"></div>`}
        <div>
          <b>${esc(l.p.nome)}</b>
          <small>${t ? `${t.id} · ${t.cm} cm · ${t.fatias}` : esc(l.p.unidade)}</small>
          <span>${l.p.aPartirDe ? 'a partir de ' : ''}${brl(preco(l))}</span>
        </div>
        <div class="qty" role="group" aria-label="Quantidade">
          <button type="button" data-item="${l.k}" data-passo="-1" aria-label="Diminuir">−</button>
          <output>${l.q}</output>
          <button type="button" data-item="${l.k}" data-passo="1" aria-label="Aumentar">+</button>
        </div>
      </li>`;
    }

    function mensagem() {
      const L = ['Olá, Manoella! Gostaria de fazer uma encomenda pelo site:', ''];
      for (const l of linhas()) {
        const t = l.tam ? TAM[l.tam] : null;
        L.push(`• ${l.q}× ${l.p.nome}${t ? ` — tamanho ${t.id} (${t.cm} cm, ${t.fatias})` : ` — ${l.p.unidade}`} — ${l.p.aPartirDe ? 'a partir de ' : ''}${brl(preco(l))}${l.q > 1 ? ' cada' : ''}`);
      }
      const av = ADICIONAIS.avulsos.filter(a => avulsos.get(a.id));
      if (av.length) L.push('', 'Adicionais: ' + av.map(a => `${avulsos.get(a.id)}× ${a.nome}`).join(', '));
      if (extras.size) L.push('', 'Personalização de interesse: ' + [...extras].join('; '));
      if (dataInput.value) L.push('', `Data da celebração: ${new Date(dataInput.value + 'T12:00').toLocaleDateString('pt-BR')}`);
      const tot = total();
      if (tot) L.push(`Estimativa: ${aPartirDe() ? 'a partir de ' : ''}${brl(tot)} (sinal de ${REGRAS.sinalPercentual}%: ${brl(tot * REGRAS.sinalPercentual / 100)})`);
      const nome = q('[data-sel-nome]').value.trim();
      const obs = q('[data-sel-obs]').value.trim();
      if (nome) L.push('', `Nome: ${nome}`);
      if (obs) L.push(`Observações: ${obs}`);
      return L.join('\n');
    }

    function render() {
      const n = quantidade();
      q('[data-sel-count]').textContent = n;
      q('.sel-fab').classList.toggle('has-items', n > 0);
      q('.sel-fab').setAttribute('aria-label', `Abrir encomenda (${n} ${n === 1 ? 'item' : 'itens'})`);
      q('[data-sel-list]').innerHTML = linhas().map(linhaHtml).join('');
      q('[data-sel-empty]').hidden = n > 0;
      q('[data-sel-form]').hidden = n === 0;
      ADICIONAIS.avulsos.forEach(a => { q(`[data-avulso-q="${a.id}"]`).textContent = avulsos.get(a.id) || 0; });
      root.querySelectorAll('[data-extra]').forEach(c => { c.checked = extras.has(c.value); });
      const tot = total();
      q('[data-sel-total]').textContent = `${aPartirDe() ? 'a partir de ' : ''}${brl(tot)}`;
      q('[data-sel-sinal]').textContent = brl(tot * REGRAS.sinalPercentual / 100);
      atualizarEnvio();
      sincronizarBotoes();
    }

    function atualizarEnvio() {
      const ok = dataInput.value && dataInput.value >= dataInput.min;
      const a = q('[data-sel-enviar]');
      a.href = whatsappCom(mensagem());
      a.toggleAttribute('aria-disabled', !ok);
      a.classList.toggle('is-disabled', !ok);
    }

    function sincronizarBotoes() {
      document.querySelectorAll('[data-add]').forEach(b => {
        const p = BY_ID[b.dataset.add];
        const tam = porTamanho(p) ? (b.dataset.tam || state.tamanho) : null;
        const on = itens.has(chave(p.id, tam));
        b.setAttribute('aria-pressed', String(on));
        if (b.classList.contains('btn-primary')) b.textContent = on ? '✓ Na seleção' : '+ Adicionar à seleção';
        else b.textContent = on ? '✓' : '+';
      });
    }

    function set(k, qtd) {
      if (qtd > 0) itens.set(k, Math.min(qtd, 99)); else itens.delete(k);
      salvar(); render();
    }

    root.addEventListener('click', e => {
      const it = e.target.closest('[data-item]');
      if (it) return set(it.dataset.item, (itens.get(it.dataset.item) || 0) + Number(it.dataset.passo));
      const av = e.target.closest('[data-avulso]');
      if (av) {
        const v = Math.max(0, (avulsos.get(av.dataset.avulso) || 0) + Number(av.dataset.passo));
        v ? avulsos.set(av.dataset.avulso, v) : avulsos.delete(av.dataset.avulso);
        salvar(); return render();
      }
      if (e.target.closest('[data-sel-abrir]')) return dlg.showModal();
      if (e.target.closest('[data-sel-fechar]') || e.target === dlg) return dlg.close();
      if (e.target.closest('[data-sel-limpar]')) { itens.clear(); avulsos.clear(); extras.clear(); salvar(); render(); return; }
      const env = e.target.closest('[data-sel-enviar]');
      if (env && env.classList.contains('is-disabled')) {
        e.preventDefault();
        dataInput.reportValidity();
        dataInput.focus();
      }
    });
    root.addEventListener('change', e => {
      if (e.target.matches('[data-extra]')) { e.target.checked ? extras.add(e.target.value) : extras.delete(e.target.value); salvar(); atualizarEnvio(); }
    });
    root.addEventListener('input', atualizarEnvio);

    render();

    return {
      tem: (id, tam) => itens.has(chave(id, tam)),
      alternar(id, tam) {
        const k = chave(id, tam);
        set(k, itens.has(k) ? 0 : 1);
        const fab = q('.sel-fab');
        fab.classList.remove('pulse'); void fab.offsetWidth; fab.classList.add('pulse');
      },
      sincronizar: sincronizarBotoes
    };
  })();

  /* ---------------- início ---------------- */
  atualizar();
  lerHash();
})();
