// ==========================================================================
// settings.js — Account & settings screen: seller login status display,
// dark mode toggle, and logout. Depends on: dom.js, state.js,
// seller-auth.js (openSellerAuthModal), nav.js (switchMode).
// ==========================================================================

// ==================== ACCOUNT & SETTINGS SCREEN LOGIC ====================
function renderSettingsScreen() {
  if (sellerLoggedIn) {
    const fujiStore = sellers.find(s => s.id === 'DS-582941');
    sellerAccountGuest.style.display = 'none';
    sellerAccountActive.style.display = 'block';
    if (fujiStore) {
      sellerAccountName.textContent = fujiStore.name;
      sellerAccountId.textContent = `${fujiStore.id} · เข้าสู่ระบบแล้ว`;
    }
  } else {
    sellerAccountGuest.style.display = 'block';
    sellerAccountActive.style.display = 'none';
  }

  btnToggleDarkMode.classList.toggle('on', darkMode);
  btnToggleDarkMode.setAttribute('aria-checked', String(darkMode));
}

function applyDarkMode() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
}

btnToggleDarkMode.addEventListener('click', () => {
  darkMode = !darkMode;
  saveState();
  applyDarkMode();
  renderSettingsScreen();
});

btnSettingsSellerLogin.addEventListener('click', () => openSellerAuthModal('login'));
btnSettingsSellerSignup.addEventListener('click', () => openSellerAuthModal('signup'));

btnSellerLogout.addEventListener('click', () => {
  sellerLoggedIn = false;
  saveState();
  if (currentMode === 'seller') switchMode('buyer');
  renderSettingsScreen();
  showToast('ออกจากระบบผู้ขายแล้ว');
});

btnSettingsHelp.addEventListener('click', () => {
  modalHelp.style.display = 'flex';
  bodyEl.style.overflow = 'hidden';
});
