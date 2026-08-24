// ==========================================================================
// main.js — Entry point. Must load last: calling init() here fires the
// first render, by which point every other module has already registered
// its DOM refs and event listeners.
// ==========================================================================

// App Initialization
function init() {
  applyDarkMode();
  if (currentMode === 'seller' && !sellerLoggedIn) currentMode = 'buyer';
  switchMode(currentMode);
  switchScreen('chats');
}

init();
