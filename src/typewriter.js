// ==========================================================================
// typewriter.js — Cycles .typewriter headline phrases: types one out, pauses,
// deletes it, then moves to the next. The blinking caret itself is
// pure CSS (see css/search.css). No dependencies; safe to load anywhere
// after the DOM is parsed.
// ==========================================================================
const TYPEWRITER_TYPE_SPEED = 130;
const TYPEWRITER_DELETE_SPEED = 70;
const TYPEWRITER_HOLD_MS = 1800;
const TYPEWRITER_RESTART_DELAY_MS = 500;

function runTypewriterLoop(el, phrases) {
  let i = 0;
  let phraseIndex = 0;

  function currentPhrase() {
    return phrases[phraseIndex];
  }

  function typeStep() {
    i += 1;
    el.textContent = currentPhrase().slice(0, i);
    if (i < currentPhrase().length) {
      setTimeout(typeStep, TYPEWRITER_TYPE_SPEED);
    } else {
      setTimeout(deleteStep, TYPEWRITER_HOLD_MS);
    }
  }

  function deleteStep() {
    i -= 1;
    el.textContent = currentPhrase().slice(0, i);
    if (i > 0) {
      setTimeout(deleteStep, TYPEWRITER_DELETE_SPEED);
    } else {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeStep, TYPEWRITER_RESTART_DELAY_MS);
    }
  }

  typeStep();
}

document.querySelectorAll('.typewriter').forEach((el) => {
  const phrases = (el.dataset.phrases || el.textContent)
    .split('|')
    .map((phrase) => phrase.trim())
    .filter(Boolean);

  if (!phrases.length) return;
  el.textContent = '';
  runTypewriterLoop(el, phrases);
});
