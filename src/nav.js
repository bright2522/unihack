// ==========================================================================
// nav.js — Screen switching (tab bar / side rail) and buyer/seller mode
// switching, including the seller-login gate. Depends on: dom.js, state.js,
// and calls render*() functions defined in the screen modules loaded after
// this file (fine — they're only invoked later, inside event handlers).
// ==========================================================================

// Switch Navigation Screen
function switchScreen(screenId) {
  currentScreen = screenId;
  
  // Hide all screens, show current
  Object.keys(screens).forEach(key => {
    screens[key].classList.remove('active');
  });
  screens[screenId].classList.add('active');
  
  // Update Bottom Nav UI
  navItems.forEach(item => {
    if (item.getAttribute('data-screen') === screenId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Load screen data
  if (screenId === 'chats') {
    handleSearchInput();
  } else if (screenId === 'transactions') {
    renderTransactionsList();
  } else if (screenId === 'wallet') {
    renderWalletScreen();
  } else if (screenId === 'settings') {
    renderSettingsScreen();
  }
}

// Navigation bottom bar click handler
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const screen = item.getAttribute('data-screen');
    if (screen) switchScreen(screen);
  });
});

// Mode Switching (Buyer / Seller)
function switchMode(mode) {
  currentMode = mode;
  saveState();
  
  if (mode === 'buyer') {
    modeBuyerBtn.classList.add('active');
    modeSellerBtn.classList.remove('active');
    buyerSearchHints.style.display = 'flex';
    document.getElementById('chats-list-title').textContent = 'ข้อความล่าสุด';
  } else {
    modeBuyerBtn.classList.remove('active');
    modeSellerBtn.classList.add('active');
    buyerSearchHints.style.display = 'none';
    document.getElementById('chats-list-title').textContent = 'ดีลค้ำประกันของร้าน';
  }
  
  // Re-load list
  handleSearchInput();
  if (currentScreen === 'transactions') {
    renderTransactionsList();
  }
}

modeBuyerBtn.addEventListener('click', () => switchMode('buyer'));
modeSellerBtn.addEventListener('click', () => {
  // Seller mode requires a logged-in seller account — gate it behind the auth modal
  if (!sellerLoggedIn) {
    openSellerAuthModal('login');
    return;
  }
  switchMode('seller');
});
