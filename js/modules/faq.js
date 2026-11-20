/* =========================================================
   MEU PETIT BOLINHO® · FAQ (acordeão)
   Botões .faq-question abrem a resposta seguinte. Usado na home.
   ========================================================= */

(() => {
document.querySelectorAll('.faq-question').forEach((question, i) => {

  const answer = question.nextElementSibling;
  const answerId = `faq-answer-${i + 1}`;

  answer.id = answerId;
  question.setAttribute('aria-controls', answerId);
  question.setAttribute('aria-expanded', 'false');

  question.addEventListener('click', () => {

    const isOpen = question.getAttribute('aria-expanded') === 'true';

    question.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';

  });

});
})();
