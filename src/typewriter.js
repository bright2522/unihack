// ==========================================================================
// typewriter.js — Loops .typewriter headline text: types it out, pauses,
// deletes it, pauses, and repeats forever. The blinking caret itself is
// pure CSS (see css/search.css). No dependencies; safe to load anywhere
// after the DOM is parsed.
// ==========================================================================
const TYPEWRITER_TYPE_SPEED = 130;
const TYPEWRITER_DELETE_SPEED = 70;
const TYPEWRITER_HOLD_MS = 1800;
const TYPEWRITER_RESTART_DELAY_MS = 500;

function runTypewriterLoop(el, fullText) {
  let i = 0;

  function typeStep() {
    i += 1;
    el.textContent = fullText.slice(0, i);
    if (i < fullText.length) {
      setTimeout(typeStep, TYPEWRITER_TYPE_SPEED);
    } else {
      setTimeout(deleteStep, TYPEWRITER_HOLD_MS);
    }
  }

  function deleteStep() {
    i -= 1;
    el.textContent = fullText.slice(0, i);
    if (i > 0) {
      setTimeout(deleteStep, TYPEWRITER_DELETE_SPEED);
    } else {
      setTimeout(typeStep, TYPEWRITER_RESTART_DELAY_MS);
    }
  }

  typeStep();
}

document.querySelectorAll('.typewriter').forEach((el) => {
  const fullText = el.textContent;
  el.textContent = '';
  runTypewriterLoop(el, fullText);
});
