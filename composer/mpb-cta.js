/* =========================================================
   <mpb-cta> · chamada de atendimento (seção #contato)

   Uso:
     <mpb-cta titulo="Prefere conversar antes?"
              texto="WhatsApp (41) 98786-2994…"
              botao="Chamar no WhatsApp"></mpb-cta>

   Todos os atributos são opcionais.
   Estilo: css/components/cta.css
   ========================================================= */

class MpbCta extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';

    const { CONTATO, esc } = MPB;
    const titulo = this.getAttribute('titulo') || 'Cada celebração merece intenção, cuidado e memória.';
    const texto = this.getAttribute('texto');
    const botao = this.getAttribute('botao') || 'Solicitar Atendimento';

    this.innerHTML = `
      <section class="cta-section" id="contato">
        <div class="container cta-box">
          <div>
            <span class="section-tag light">Atendimento</span>
            <h2>${esc(titulo)}</h2>
            ${texto ? `<p class="cta-sub">${esc(texto)}</p>` : ''}
          </div>
          <a href="https://wa.me/${CONTATO.whatsapp}" target="_blank" rel="noopener noreferrer" class="btn-light">${esc(botao)}</a>
        </div>
      </section>`;
  }
}

customElements.define('mpb-cta', MpbCta);
