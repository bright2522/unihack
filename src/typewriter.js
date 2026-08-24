// ==========================================================================
// typewriter.js — Reveals .typewriter headline text one character at a
// time (the blinking caret itself is pure CSS, see css/search.css).
// No dependencies; safe to load anywhere after the DOM is parsed.
// ==========================================================================
document.querySelectorAll('.typewriter').forEach((el) => {
  const fullText = el.textContent;
  el.textContent = '';

  let i = 0;
  const timer = setInterval(() => {
    i += 1;
    el.textContent = fullText.slice(0, i);
    if (i >= fullText.length) clearInterval(timer);
  }, 130);
});
