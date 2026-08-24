// ==========================================================================
// seller-auth.js — Seller login/signup modal: tab switching, the mock
// login form, and signup screened against the mock blacklist. Depends on:
// dom.js, state.js, data.js (BLACKLIST_IDS, BLACKLIST_NAME_KEYWORDS),
// modal-core.js (closeModals), nav.js (switchMode), settings.js
// (renderSettingsScreen).
// ==========================================================================

// ==================== SELLER AUTH: LOGIN / SIGNUP + BLACKLIST SCREENING ====================
function setSellerAuthTab(tab) {
  sellerAuthTab = tab;

  const tabButtons = sellerAuthTabs.querySelectorAll('.pill-btn');
  tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-auth-tab') === tab);
  });

  sellerLoginForm.style.display = tab === 'login' ? 'block' : 'none';
  sellerSignupForm.style.display = tab === 'signup' ? 'block' : 'none';
  sellerAuthTitle.textContent = tab === 'login' ? 'เข้าสู่ระบบผู้ขาย' : 'เปิดร้านค้ากับคนกลาง';

  blacklistScanning.style.display = 'none';
  blacklistResultBlocked.style.display = 'none';
  blacklistResultPassed.style.display = 'none';
}

function resetSellerAuthModal(defaultTab) {
  sellerLoginForm.reset();
  sellerSignupForm.reset();
  setSellerAuthTab(defaultTab);
}

function openSellerAuthModal(defaultTab) {
  resetSellerAuthModal(defaultTab || 'login');
  modalSellerSignup.style.display = 'flex';
  bodyEl.style.overflow = 'hidden';
}

sellerAuthTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('.pill-btn');
  if (!btn) return;
  setSellerAuthTab(btn.getAttribute('data-auth-tab'));
});

// 🏪 header icon is specifically the "become a seller" shortcut
btnSellerSignupTrigger.addEventListener('click', () => openSellerAuthModal('signup'));

// LOGIN: mock auth — any non-empty credentials sign in to the demo Fuji Store account
sellerLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!loginPhoneInput.value.trim() || !loginPasswordInput.value.trim()) return;

  sellerLoggedIn = true;
  saveState();
  closeModals();
  switchMode('seller');
  if (currentScreen === 'settings') renderSettingsScreen();
  showToast('เข้าสู่ระบบผู้ขายสำเร็จ ยินดีต้อนรับกลับ Fuji Store');
});

// SIGNUP: screened against the mock blacklist before an account is created
sellerSignupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const shopName = signupShopName.value.trim();
  const idNumber = signupIdNumber.value.trim();

  sellerSignupForm.style.display = 'none';
  blacklistScanning.style.display = 'flex';

  setTimeout(() => {
    blacklistScanning.style.display = 'none';

    const idMatch = BLACKLIST_IDS.includes(idNumber);
    const nameMatch = BLACKLIST_NAME_KEYWORDS.some(k => shopName.includes(k));

    if (idMatch || nameMatch) {
      blacklistBlockedReason.textContent = idMatch
        ? `เลขบัตรประชาชน ${idNumber} ตรงกับรายชื่อผู้ขายที่ถูกระงับในระบบ Blacklist`
        : `ชื่อร้าน "${shopName}" ตรงกับรูปแบบชื่อผู้ขายที่ถูกระงับในระบบ Blacklist`;
      blacklistResultBlocked.style.display = 'flex';
    } else {
      blacklistResultPassed.style.display = 'flex';
    }
  }, 1600);
});

btnBlacklistBlockedClose.addEventListener('click', () => {
  closeModals();
});

btnBlacklistPassedClose.addEventListener('click', () => {
  sellerLoggedIn = true;
  saveState();
  closeModals();
  switchMode('seller');
  if (currentScreen === 'settings') renderSettingsScreen();
  showToast('สมัครร้านค้าสำเร็จ ยินดีต้อนรับเข้าสู่ระบบคนกลาง');
});
