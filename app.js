// Mock Sellers Data
const DEFAULT_SELLERS = [
  { id: 'DS-582941', name: 'Fuji Store', handle: '@fujistore', credit: 12500, joined: 'ส.ค. 2026', verified: true, avatar: 'FS' },
  { id: 'DS-104827', name: 'Mellow Market', handle: '@mellowmarket', credit: 2400, joined: 'มิ.ย. 2026', verified: true, avatar: 'MM' },
  { id: 'DS-739205', name: 'Pixel Gear', handle: '@pixelgear', credit: 0, joined: 'ก.ค. 2026', verified: false, avatar: 'PG' }
];

// Mock Chat Threads Data
const DEFAULT_CHAT_THREADS = {
  'DS-582941': [
    { sender: 'buyer', text: 'สวัสดีครับ สนใจสั่งซื้อหูฟังสีดำครับ', time: '19:35' },
    { sender: 'seller', text: 'สวัสดีค่ะ สินค้าพร้อมส่งเลยนะคะ สภาพใหม่แกะกล่องค่ะ', time: '19:37' },
    { sender: 'buyer', text: 'สร้างดีลค้ำประกันผ่านระบบคนกลางนะครับเพื่อความปลอดภัย', time: '19:40' },
    { sender: 'seller', text: 'ได้เลยค่ะ เครดิตค้ำประกันทางร้านเตรียมไว้พร้อมแล้วค่ะ', time: '19:41' },
    { type: 'system', ticketId: 'UH-4821', amount: 3200, stage: 'รอผู้ขายส่งสินค้า', text: 'ดีลสำเร็จ! ระบบทำการล็อกเครดิตค้ำประกัน ฿3,200.00 เรียบร้อย', time: '19:42' }
  ],
  'DS-104827': [
    { sender: 'seller', text: 'สวัสดีค่ะ มีอะไรให้ Mellow Market ช่วยดูแลไหมคะ?', time: 'มิ.ย. 2026' },
    { sender: 'buyer', text: 'สอบถามไซซ์เสื้อแจ็กเก็ตครับ', time: 'มิ.ย. 2026' },
    { sender: 'seller', text: 'ไซซ์ M อก 40 นิ้วค่ะ', time: 'มิ.ย. 2026' },
    { type: 'system', ticketId: 'UH-1938', amount: 890, stage: 'ยกเลิกแล้ว', text: 'ดีล #UH-1938 ถูกยกเลิกโดยระบบเนื่องจากยกเลิกข้อตกลง', time: 'มิ.ย. 2026' }
  ],
  'DS-739205': [
    { sender: 'buyer', text: 'สวัสดีครับ สนใจกล้องถ่ายรูปครับ', time: 'เมื่อวานนี้' },
    { sender: 'seller', text: 'กล้องยังอยู่นะคะ สภาพสวยมากค่ะ', time: 'เมื่อวานนี้' },
    { sender: 'buyer', text: 'มีเครดิตค้ำประกันในระบบไหมครับ', time: 'เมื่อวานนี้' },
    { sender: 'seller', text: 'ตอนนี้เครดิตในระบบของหนูยังเป็น 0 อยู่เลยค่ะ รอก่อนนะคะ', time: 'เมื่อวานนี้' }
  ]
};

// Mock Transaction History List (to match reference screen look)
const DEFAULT_TRANSACTIONS = [
  { id: 'UH-4821', sellerId: 'DS-582941', sellerName: 'Fuji Store', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 3200, note: 'หูฟังสีดำ ส่งแบบ EMS', status: 'active', stage: 'รอผู้ขายส่งสินค้า', created: '23 ส.ค. 2026 · 19:42', updated: 'อัปเดต 8 นาทีที่แล้ว', type: 'orders' },
  { id: 'TX-9921', sellerId: 'DS-582941', sellerName: 'Fuji Store', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 5000, note: 'เติมเครดิตค้ำประกัน Fuji Store', status: 'completed', stage: 'เติมเครดิตสำเร็จ', created: '22 ส.ค. 2026 · 11:20', updated: 'สำเร็จ', type: 'topup' },
  { id: 'UH-2740', sellerId: 'DS-582941', sellerName: 'Fuji Store', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 1250, note: 'คีย์บอร์ด Mechanical', status: 'completed', stage: 'ส่งมอบสำเร็จ', created: '18 ส.ค. 2026 · 14:10', updated: 'สำเร็จ 20 ส.ค. 2026', type: 'orders' },
  { id: 'TX-8830', sellerId: 'DS-582941', sellerName: 'Fuji Store', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 12500, note: 'เติมเครดิตค้ำประกัน Fuji Store', status: 'completed', stage: 'เติมเครดิตสำเร็จ', created: '15 ส.ค. 2026 · 09:12', updated: 'สำเร็จ', type: 'topup' },
  { id: 'UH-1938', sellerId: 'DS-104827', sellerName: 'Mellow Market', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 890, note: 'เสื้อแจ็กเก็ต ไซซ์ M', status: 'cancelled', stage: 'ยกเลิกแล้ว', created: '12 ส.ค. 2026 · 09:25', updated: 'ยกเลิก 12 ส.ค. 2026', type: 'orders' }
];

// Mock Blacklist Database (Seller Signup Screening)
const BLACKLIST_IDS = ['1111111111111'];
const BLACKLIST_NAME_KEYWORDS = ['มิจ'];

// Express Tracking Couriers
const TRACKING_COURIERS = ['Klang Express', 'Flash ยิงตรง', 'J&T ทันใจ'];

function getCourierForTx(tx) {
  const idx = tx.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % TRACKING_COURIERS.length;
  return TRACKING_COURIERS[idx];
}

function getTrackingNumber(tx) {
  return `KL${tx.id.replace('-', '')}TH`;
}

// Assigns each seller/party a stable color from the avatar palette so the
// list reads as lively at a glance instead of one flat neutral tone.
const AVATAR_HUES = ['hue-1', 'hue-2', 'hue-3', 'hue-4', 'hue-5', 'hue-6'];
function getAvatarHueClass(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_HUES[hash % AVATAR_HUES.length];
}

function getTrackingSteps(tx) {
  const steps = [
    { label: 'ยืนยันคำสั่งซื้อ' },
    { label: 'ผู้ขายเตรียมพัสดุ' },
    { label: 'พัสดุออกจากศูนย์คัดแยก' },
    { label: 'กำลังนำส่งด่วน' },
    { label: 'จัดส่งสำเร็จ' }
  ];
  let doneCount;
  if (tx.status === 'completed') doneCount = 5;
  else if (tx.status === 'cancelled') doneCount = 1;
  else doneCount = 2; // active: order confirmed + seller preparing parcel
  return steps.map((s, i) => ({ ...s, done: i < doneCount, current: i === doneCount }));
}

// App State Management
let sellers = JSON.parse(localStorage.getItem('ut_sellers')) || DEFAULT_SELLERS;
let chatThreads = JSON.parse(localStorage.getItem('ut_chats')) || DEFAULT_CHAT_THREADS;
let transactions = JSON.parse(localStorage.getItem('ut_txs')) || DEFAULT_TRANSACTIONS;
let currentMode = localStorage.getItem('ut_mode') || 'buyer'; // 'buyer' or 'seller'
let currentScreen = 'chats'; // 'chats', 'chat-detail', 'transactions', 'wallet'
let txFilter = 'active'; // 'active' or 'history'
let activeChatSellerId = null;
let activeTicketId = null;
let walletMode = 'topup'; // 'topup' or 'withdraw'
let sellerLoggedIn = JSON.parse(localStorage.getItem('ut_seller_logged_in')) || false;
let darkMode = JSON.parse(localStorage.getItem('ut_dark_mode')) || false;
let sellerAuthTab = 'login'; // 'login' or 'signup'

// Helpers
const currencyFormatter = new Intl.NumberFormat('th-TH');

// DOM Elements
const bodyEl = document.body;
const modeBuyerBtn = document.getElementById('mode-buyer');
const modeSellerBtn = document.getElementById('mode-seller');
const btnHelpTrigger = document.getElementById('btn-help-trigger');

const screens = {
  'chats': document.getElementById('screen-chats'),
  'chat-detail': document.getElementById('screen-chat-detail'),
  'transactions': document.getElementById('screen-transactions'),
  'wallet': document.getElementById('screen-wallet'),
  'settings': document.getElementById('screen-settings')
};

const navItems = document.querySelectorAll('.floating-nav-bar .nav-item');

// Search elements
const chatSearchInput = document.getElementById('chat-search-input');
const btnClearSearch = document.getElementById('btn-clear-search');
const searchResultsPanel = document.getElementById('search-results-panel');
const searchResultsBadge = document.getElementById('search-results-badge');
const searchResultsList = document.getElementById('search-results-list');
const recentChatsPanel = document.getElementById('recent-chats-panel');
const chatListContainer = document.getElementById('chat-list-container');
const buyerSearchHints = document.getElementById('buyer-search-hints');

// Active Chat View elements
const btnChatBack = document.getElementById('btn-chat-back');
const activeChatAvatar = document.getElementById('active-chat-avatar');
const activeChatName = document.getElementById('active-chat-name');
const activeChatVerified = document.getElementById('active-chat-verified');
const chatMessagesFeed = document.getElementById('chat-messages-feed');
const chatMessageInput = document.getElementById('chat-message-input');
const btnSendMessage = document.getElementById('btn-send-message');
const btnCreateDealHeader = document.getElementById('btn-create-deal-header');

// Transactions elements
const filterTxActive = document.getElementById('filter-tx-active');
const filterTxHistory = document.getElementById('filter-tx-history');
const transactionListContainer = document.getElementById('transaction-list-container');

// Wallet elements
const walletCreditAmount = document.getElementById('wallet-credit-amount');
const btnWalletTopupShortcut = document.getElementById('btn-wallet-topup-shortcut');
const btnWalletDeposit = document.getElementById('btn-wallet-deposit');
const btnWalletWithdraw = document.getElementById('btn-wallet-withdraw');
const walletHistoryList = document.getElementById('wallet-history-list');

// Modals
const modalCreateTicket = document.getElementById('modal-create-ticket');
const modalTicketDetail = document.getElementById('modal-ticket-detail');
const modalWallet = document.getElementById('modal-wallet');
const modalHelp = document.getElementById('modal-help');
const modalSellerSignup = document.getElementById('modal-seller-signup');
const closeButtons = document.querySelectorAll('.modal-close-btn, .modal-cancel-btn');

// Express Tracking elements
const expressTrackingPanel = document.getElementById('express-tracking-panel');
const trackingCourierEl = document.getElementById('tracking-courier');
const trackingNumberEl = document.getElementById('tracking-number');
const trackingTimelineEl = document.getElementById('tracking-timeline');

// PromptPay top-up elements
const promptpayStep = document.getElementById('promptpay-step');
const promptpayAmountEl = document.getElementById('promptpay-amount');
const promptpayQrSvg = document.getElementById('promptpay-qr-svg');
const btnPromptpayBack = document.getElementById('btn-promptpay-back');
const btnPromptpayConfirm = document.getElementById('btn-promptpay-confirm');
let pendingTopupAmount = 0;

// Seller Signup / Blacklist elements
const btnSellerSignupTrigger = document.getElementById('btn-seller-signup-trigger');
const sellerSignupForm = document.getElementById('seller-signup-form');
const signupShopName = document.getElementById('signup-shop-name');
const signupIdNumber = document.getElementById('signup-id-number');
const signupPhone = document.getElementById('signup-phone');
const blacklistScanning = document.getElementById('blacklist-scanning');
const blacklistResultBlocked = document.getElementById('blacklist-result-blocked');
const blacklistBlockedReason = document.getElementById('blacklist-blocked-reason');
const blacklistResultPassed = document.getElementById('blacklist-result-passed');
const btnBlacklistBlockedClose = document.getElementById('btn-blacklist-blocked-close');
const btnBlacklistPassedClose = document.getElementById('btn-blacklist-passed-close');

// Seller Auth: login/signup tab switch + login form
const sellerAuthTitle = document.getElementById('seller-auth-title');
const sellerAuthTabs = document.getElementById('seller-auth-tabs');
const sellerLoginForm = document.getElementById('seller-login-form');
const loginPhoneInput = document.getElementById('login-phone');
const loginPasswordInput = document.getElementById('login-password');

// Settings / Account elements
const btnToggleDarkMode = document.getElementById('toggle-dark-mode');
const sellerAccountGuest = document.getElementById('seller-account-guest');
const sellerAccountActive = document.getElementById('seller-account-active');
const sellerAccountName = document.getElementById('seller-account-name');
const sellerAccountId = document.getElementById('seller-account-id');
const btnSettingsSellerLogin = document.getElementById('btn-settings-seller-login');
const btnSettingsSellerSignup = document.getElementById('btn-settings-seller-signup');
const btnSellerLogout = document.getElementById('btn-seller-logout');
const btnSettingsHelp = document.getElementById('btn-settings-help');

// Modal Forms
const createTicketForm = document.getElementById('create-ticket-form');
const ticketPriceInput = document.getElementById('ticket-price');
const ticketNoteInput = document.getElementById('ticket-note');
const creditStatusIndicator = document.getElementById('credit-status-indicator');
const creditStatusTitle = document.getElementById('credit-status-title');
const creditStatusDesc = document.getElementById('credit-status-desc');
const btnSubmitTicket = document.getElementById('btn-submit-ticket');

const walletForm = document.getElementById('wallet-form');
const walletAmountInput = document.getElementById('wallet-amount');
const walletModalTitle = document.getElementById('wallet-modal-title');
const walletModalDesc = document.getElementById('wallet-modal-desc');
const walletQuickAmounts = document.getElementById('wallet-quick-amounts');
const walletSpecialBtn = document.getElementById('wallet-special-btn');
const walletErrorMsg = document.getElementById('wallet-error-msg');
const btnWalletSubmit = document.getElementById('btn-wallet-submit');

const detailTicketId = document.getElementById('detail-ticket-id');
const detailTicketStage = document.getElementById('detail-ticket-stage');
const detailBuyerName = document.getElementById('detail-buyer-name');
const detailSellerName = document.getElementById('detail-seller-name');
const detailAmount = document.getElementById('detail-amount');
const detailDate = document.getElementById('detail-date');
const detailNote = document.getElementById('detail-note');
const btnSellerCompleteDeal = document.getElementById('btn-seller-complete-deal');

// Toast
const toastEl = document.getElementById('toast');
const toastMessageText = document.getElementById('toast-message-text');

// State Persistence
function saveState() {
  localStorage.setItem('ut_sellers', JSON.stringify(sellers));
  localStorage.setItem('ut_chats', JSON.stringify(chatThreads));
  localStorage.setItem('ut_txs', JSON.stringify(transactions));
  localStorage.setItem('ut_mode', currentMode);
  localStorage.setItem('ut_seller_logged_in', JSON.stringify(sellerLoggedIn));
  localStorage.setItem('ut_dark_mode', JSON.stringify(darkMode));
}

// Toast Function
let toastTimeout;
function showToast(message) {
  toastMessageText.textContent = message;
  toastEl.style.display = 'flex';
  
  if (toastTimeout) clearTimeout(toastTimeout);
  
  toastTimeout = setTimeout(() => {
    toastEl.style.display = 'none';
  }, 3200);
}

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

// ==================== SCREEN 1: CHATS LIST & DUAL SEARCH LOGIC ====================
function handleSearchInput() {
  const query = chatSearchInput.value.trim().toLowerCase();
  
  if (query === '') {
    btnClearSearch.style.display = 'none';
    searchResultsPanel.style.display = 'none';
    recentChatsPanel.style.display = 'block';
    renderRecentChats();
  } else {
    btnClearSearch.style.display = 'inline-block';
    performDualSearch(query);
  }
}

function renderRecentChats() {
  // Lists active messages/conversations
  let listSellers = sellers;
  if (currentMode === 'seller') {
    // Seller only manages their own store (Fuji Store) chats. We show the thread with 'บัญชีผู้ซื้อของฉัน'
    listSellers = sellers.filter(s => s.id === 'DS-582941');
  }

  chatListContainer.innerHTML = '';

  listSellers.forEach(seller => {
    const thread = chatThreads[seller.id] || [];
    const lastMsg = thread[thread.length - 1];
    
    let snippet = 'ไม่มีข้อความการสนทนา';
    let time = '';
    if (lastMsg) {
      if (lastMsg.type === 'system') {
        snippet = `⚙️ ${lastMsg.text}`;
      } else {
        snippet = lastMsg.text;
      }
      time = lastMsg.time;
    }

    const item = document.createElement('div');
    item.className = 'chat-item';
    item.setAttribute('onclick', `openChatDetail('${seller.id}')`);
    
    const avatarHTML = `<div class="avatar ${getAvatarHueClass(seller.id)}">${seller.avatar}</div>`;
    
    // If Fuji store in buyer mode, or Fuji store in seller mode has active tickets, show badge green dot
    const hasActive = transactions.some(t => t.sellerId === seller.id && t.status === 'active');
    const badgeHTML = hasActive ? `<div class="chat-item-badge"></div>` : '';

    const mainHTML = `
      <div class="chat-item-main">
        <div class="chat-item-name-row">
          <span class="chat-item-name">${currentMode === 'buyer' ? seller.name : 'บัญชีผู้ซื้อของฉัน'}</span>
          <span class="chat-item-time">${time}</span>
        </div>
        <div class="chat-item-snippet-row">
          <span class="chat-item-snippet">${snippet}</span>
          ${badgeHTML}
        </div>
      </div>
    `;

    item.innerHTML = avatarHTML + mainHTML;
    chatListContainer.appendChild(item);
  });
}

// Perform Dual Search (Seller ID and Tracking ID)
function performDualSearch(query) {
  searchResultsPanel.style.display = 'block';
  recentChatsPanel.style.display = 'none';
  searchResultsList.innerHTML = '';

  let totalMatches = 0;

  // 1. Search Sellers
  const matchedSellers = sellers.filter(s => 
    s.id.toLowerCase().includes(query) || 
    s.name.toLowerCase().includes(query) || 
    s.handle.toLowerCase().includes(query)
  );

  // 2. Search Tickets / Transactions (Tracking Number)
  const matchedTickets = transactions.filter(t => 
    t.id.toLowerCase().includes(query) || 
    t.note.toLowerCase().includes(query) || 
    t.sellerName.toLowerCase().includes(query)
  );

  totalMatches = matchedSellers.length + matchedTickets.length;
  searchResultsBadge.textContent = `${totalMatches} รายการ`;

  if (totalMatches > 0) {
    // Render Matched Sellers
    matchedSellers.forEach(seller => {
      const item = document.createElement('div');
      item.className = 'chat-item';
      item.setAttribute('onclick', `openChatDetail('${seller.id}')`);

      const avatarHTML = `<div class="avatar ${getAvatarHueClass(seller.id)}">${seller.avatar}</div>`;
      const mainHTML = `
        <div class="chat-item-main">
          <div class="chat-item-name-row">
            <span class="chat-item-name">${seller.name} <strong style="font-size:10px; color:var(--primary); font-weight:normal;">(ผู้ขาย)</strong></span>
            <span class="chat-item-time">Joined ${seller.joined}</span>
          </div>
          <div class="chat-item-snippet-row">
            <span class="chat-item-snippet">${seller.handle} · วงเงินค้ำประกัน ฿${currencyFormatter.format(seller.credit)}</span>
            <span style="font-size:11px; font-weight:700; color:var(--text-main);">แชทคุย 💬</span>
          </div>
        </div>
      `;
      item.innerHTML = avatarHTML + mainHTML;
      searchResultsList.appendChild(item);
    });

    // Render Matched Tickets (Tracking cards)
    matchedTickets.forEach(tx => {
      const card = document.createElement('div');
      card.className = 'search-ticket-card';
      card.setAttribute('onclick', `openTicketDetailModal('${tx.id}')`);

      let iconClass = tx.status;
      let iconSymbol = '↗';
      if (tx.status === 'completed') iconSymbol = '✓';
      if (tx.status === 'cancelled') iconSymbol = '×';

      const iconHTML = `
        <div class="search-ticket-icon ${iconClass}">
          ${iconSymbol}
        </div>
      `;

      const mainHTML = `
        <div class="search-ticket-main">
          <div class="search-ticket-title-row">
            <span class="search-ticket-id">#${tx.id} <strong style="font-size:10px; color:var(--blue); font-weight:normal;">(เลขพัสดุ/ดีล)</strong></span>
            <span class="search-ticket-badge ${tx.status}">
              ${tx.status === 'active' ? tx.stage : (tx.status === 'completed' ? 'สำเร็จ' : 'ยกเลิก')}
            </span>
          </div>
          <div class="search-ticket-note">
            ${tx.note} · ${tx.sellerName}
          </div>
        </div>
      `;

      const amountHTML = `
        <div class="search-ticket-amount">
          <strong>฿${currencyFormatter.format(tx.amount)}</strong>
          <small>${tx.updated}</small>
        </div>
      `;

      card.innerHTML = iconHTML + mainHTML + amountHTML;
      searchResultsList.appendChild(card);
    });

  } else {
    searchResultsList.innerHTML = `
      <div class="ticket-empty">
        <span>⌕</span>
        <h2>ไม่พบผลการค้นหา</h2>
        <p>ไม่พบ Seller ID หรือเลขพัสดุ/ดีลนี้ในระบบจำลอง</p>
      </div>
    `;
  }
}

// Clear Search Input
btnClearSearch.addEventListener('click', () => {
  chatSearchInput.value = '';
  handleSearchInput();
});

// Search input keydown/input hooks
chatSearchInput.addEventListener('input', handleSearchInput);

// Hint chips click
const chatHintChips = document.querySelectorAll('.chat-hint-chip');
chatHintChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const value = chip.getAttribute('data-id');
    chatSearchInput.value = value;
    handleSearchInput();
  });
});

// ==================== SCREEN 2: ACTIVE CHAT SCREEN LOGIC ====================
window.openChatDetail = function(sellerId) {
  activeChatSellerId = sellerId;
  const seller = sellers.find(s => s.id === sellerId);
  if (!seller) return;

  // Set header details
  activeChatAvatar.textContent = seller.avatar;
  activeChatAvatar.className = `avatar header-avatar ${getAvatarHueClass(seller.id)}`;
  activeChatName.textContent = currentMode === 'buyer' ? seller.name : 'บัญชีผู้ซื้อของฉัน';
  activeChatVerified.style.display = seller.verified ? 'inline-flex' : 'none';
  
  // Show header create deal button in buyer mode only
  btnCreateDealHeader.style.display = currentMode === 'buyer' ? 'flex' : 'none';

  switchScreen('chat-detail');
  renderChatMessages();
};

btnChatBack.addEventListener('click', () => {
  switchScreen('chats');
  activeChatSellerId = null;
});

function renderChatMessages() {
  if (!activeChatSellerId) return;

  const messages = chatThreads[activeChatSellerId] || [];
  chatMessagesFeed.innerHTML = '';

  let lastTime = '';

  messages.forEach(msg => {
    // Group time header
    if (msg.time && msg.time !== lastTime && !msg.time.includes('เมื่อสักครู่')) {
      const timeHeader = document.createElement('div');
      timeHeader.className = 'msg-time-label';
      timeHeader.textContent = msg.time;
      chatMessagesFeed.appendChild(timeHeader);
      lastTime = msg.time;
    }

    const row = document.createElement('div');
    row.className = 'msg-row';

    if (msg.type === 'system') {
      row.classList.add('system');
      
      const isCompleted = msg.stage === 'สำเร็จ' || msg.stage === 'ส่งมอบสำเร็จ';
      const isCancelled = msg.stage === 'ยกเลิกแล้ว';
      const statusClass = isCompleted ? 'completed' : (isCancelled ? 'cancelled' : 'active');
      const statusText = isCompleted ? 'สำเร็จ' : (isCancelled ? 'ยกเลิก' : msg.stage);

      row.innerHTML = `
        <div class="system-deal-card">
          <div class="deal-card-header">
            <span>TICKET ดีลค้ำประกัน #${msg.ticketId}</span>
            <span class="deal-card-status ${statusClass}">${statusText}</span>
          </div>
          <div class="deal-card-main">
            <span class="deal-card-amount">฿${currencyFormatter.format(msg.amount)}</span>
            <button class="deal-card-btn" onclick="openTicketDetailModal('${msg.ticketId}')">ดูรายละเอียดดีล</button>
          </div>
          <div class="deal-card-desc">
            ${msg.text}
          </div>
        </div>
      `;
    } else {
      // Message bubble
      const isOutgoing = (currentMode === 'buyer' && msg.sender === 'buyer') || (currentMode === 'seller' && msg.sender === 'seller');
      row.classList.add(isOutgoing ? 'outgoing' : 'incoming');

      row.innerHTML = `
        <div class="msg-bubble">
          ${msg.text}
        </div>
      `;
    }

    chatMessagesFeed.appendChild(row);
  });

  // Simulated car listing attachment display in Fuji Store chat thread
  if (activeChatSellerId === 'DS-582941' && messages.length <= 6) {
    const imgRow = document.createElement('div');
    imgRow.className = 'msg-row incoming';
    imgRow.innerHTML = `
      <div class="images-cards-wrapper">
        <div class="chat-image-card">
          <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=150" alt="BMW 1">
        </div>
        <div class="chat-image-card">
          <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=150" alt="BMW 2">
        </div>
        <div class="chat-image-card">
          <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=150" alt="BMW 3">
        </div>
      </div>
    `;
    chatMessagesFeed.appendChild(imgRow);
  }

  // Scroll to bottom
  chatMessagesFeed.scrollTop = chatMessagesFeed.scrollHeight;
}

// Send Message Handler
function handleSendMessage() {
  const text = chatMessageInput.value.trim();
  if (!text || !activeChatSellerId) return;

  const newMsg = {
    sender: currentMode === 'buyer' ? 'buyer' : 'seller',
    text: text,
    time: 'เมื่อสักครู่'
  };

  chatThreads[activeChatSellerId].push(newMsg);
  saveState();
  chatMessageInput.value = '';
  renderChatMessages();

  // Simulated auto response from seller
  simulateAutoReply();
}

btnSendMessage.addEventListener('click', handleSendMessage);
chatMessageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSendMessage();
});

const REPLY_TEMPLATES = {
  'DS-582941': 'ขอบคุณค่ะ ยินดีบริการนะคะ สามารถเช็กเครดิตค้ำประกันของทางร้านได้เลยค่ะ',
  'DS-104827': 'สนใจขนาดเท่าไร สอบถามเพิ่มเติมทางแชทนี้ได้ตลอดเลยนะคะ',
  'DS-739205': 'ถ้าหนูเติมเครดิตค้ำประกันเข้าระบบแล้ว จะส่งข้อความแจ้งนะคะ ขอบคุณค่ะ'
};

function simulateAutoReply() {
  const sellerId = activeChatSellerId;
  setTimeout(() => {
    if (activeChatSellerId !== sellerId) return; // user exited thread
    
    const replyText = REPLY_TEMPLATES[sellerId] || 'ได้รับข้อความเรียบร้อยแล้วค่ะ';
    
    const replyMsg = {
      sender: 'seller', // incoming
      text: replyText,
      time: 'เมื่อสักครู่'
    };

    chatThreads[sellerId].push(replyMsg);
    saveState();
    renderChatMessages();
    showToast('มีข้อความใหม่ตอบกลับ');
  }, 1800);
}

// Click header profile card to open wallet details if it's fuji store
document.getElementById('chat-header-profile-btn').addEventListener('click', () => {
  if (activeChatSellerId === 'DS-582941' && currentMode === 'seller') {
    switchScreen('wallet');
  }
});

// Click header deal button
btnCreateDealHeader.addEventListener('click', () => {
  if (activeChatSellerId) {
    openCreateTicketModal(activeChatSellerId);
  }
});

// ==================== SCREEN 3: TRANSACTION HISTORY LOGIC ====================
function renderTransactionsList() {
  let filtered = [];
  if (currentMode === 'buyer') {
    filtered = transactions;
  } else {
    // Fuji Store is active seller
    const fujiStoreId = 'DS-582941';
    filtered = transactions.filter(t => t.sellerId === fujiStoreId);
  }


  // Filter based on tab toggle
  if (txFilter === 'active') {
    filtered = filtered.filter(t => t.status === 'active');
  } else {
    filtered = filtered.filter(t => t.status !== 'active');
  }

  transactionListContainer.innerHTML = '';

  if (filtered.length > 0) {
    filtered.forEach(tx => {
      const row = document.createElement('button');
      row.className = 'tx-row';
      row.setAttribute('onclick', `openTicketDetailModal('${tx.id}')`);

      let iconInitial = 'UH';
      let typeLabel = 'Orders';
      let arrowSymbol = '↗';
      let typeClass = 'orders';

      if (tx.type === 'topup') {
        iconInitial = 'TX';
        typeLabel = 'Top Up';
        arrowSymbol = '↓';
        typeClass = 'topup';
      } else if (tx.type === 'withdraw') {
        iconInitial = 'TX';
        typeLabel = 'Withdraw';
        arrowSymbol = '↑';
        typeClass = 'withdraw';
      } else {
        // Orders
        iconInitial = tx.sellerId === 'DS-582941' ? 'FS' : (tx.sellerId === 'DS-104827' ? 'MM' : 'PG');
      }

      const iconHTML = `<div class="tx-icon-circle">${iconInitial}</div>`;
      
      const detailsHTML = `
        <div class="tx-details">
          <div class="tx-name">${tx.note}</div>
          <div class="tx-date">${tx.created}</div>
        </div>
      `;

      let sign = tx.type === 'topup' ? '+' : '';
      if (tx.type === 'withdraw') sign = '-';
      
      const amountHTML = `
        <div class="tx-amount-col">
          <span class="tx-amount">${sign}฿${currencyFormatter.format(tx.amount)}</span>
          <span class="tx-type-badge ${typeClass}">
            <span class="tx-arrow-icon">${arrowSymbol}</span>
            <span>${typeLabel}</span>
          </span>
        </div>
      `;

      row.innerHTML = iconHTML + detailsHTML + amountHTML;
      transactionListContainer.appendChild(row);
    });
  } else {
    const emptyMsg = txFilter === 'active' ? 'ไม่มีดีลค้ำประกันที่ดำเนินการอยู่' : 'ไม่มีประวัติรายการธุรกรรม';
    transactionListContainer.innerHTML = `
      <div class="ticket-empty">
        <span>✓</span>
        <h2>${emptyMsg}</h2>
        <p>รายการที่ได้รับการยืนยันหรือตรวจสอบจะอัปเดตตรงนี้</p>
      </div>
    `;
  }
}

// Toggle filters
filterTxActive.addEventListener('click', () => {
  filterTxActive.classList.add('active');
  filterTxHistory.classList.remove('active');
  txFilter = 'active';
  renderTransactionsList();
});

filterTxHistory.addEventListener('click', () => {
  filterTxActive.classList.remove('active');
  filterTxHistory.classList.add('active');
  txFilter = 'history';
  renderTransactionsList();
});

// ==================== SCREEN 4: WALLET / SELLER ACCOUNT LOGIC ====================
function renderWalletScreen() {
  const fujiStore = sellers.find(s => s.id === 'DS-582941');
  if (fujiStore) {
    walletCreditAmount.textContent = currencyFormatter.format(fujiStore.credit);
    const walletAvatarEl = document.querySelector('#wallet-seller-profile .avatar');
    if (walletAvatarEl) walletAvatarEl.className = `avatar small ${getAvatarHueClass(fujiStore.id)}`;
  }

  // Display recent transactions related to wallet and Fuji store
  const fujiStoreId = 'DS-582941';
  const walletTxs = transactions.filter(t => t.sellerId === fujiStoreId && (t.type === 'topup' || t.type === 'withdraw'));

  walletHistoryList.innerHTML = '';
  if (walletTxs.length > 0) {
    walletTxs.forEach(tx => {
      const row = document.createElement('div');
      row.className = 'tx-row';
      
      const iconInitial = 'TX';
      let typeLabel = tx.type === 'topup' ? 'Top Up' : 'Withdraw';
      let arrowSymbol = tx.type === 'topup' ? '↓' : '↑';
      let typeClass = tx.type === 'topup' ? 'topup' : 'withdraw';
      let sign = tx.type === 'topup' ? '+' : '-';

      const iconHTML = `<div class="tx-icon-circle">${iconInitial}</div>`;
      
      const detailsHTML = `
        <div class="tx-details">
          <div class="tx-name">${tx.note}</div>
          <div class="tx-date">${tx.created}</div>
        </div>
      `;

      const amountHTML = `
        <div class="tx-amount-col">
          <span class="tx-amount">${sign}฿${currencyFormatter.format(tx.amount)}</span>
          <span class="tx-type-badge ${typeClass}">
            <span class="tx-arrow-icon">${arrowSymbol}</span>
            <span>${typeLabel}</span>
          </span>
        </div>
      `;

      row.innerHTML = iconHTML + detailsHTML + amountHTML;
      walletHistoryList.appendChild(row);
    });
  } else {
    walletHistoryList.innerHTML = `
      <p class="shared-indicator" style="padding: 10px 0;">ไม่มีรายการธุรกรรมเครดิตล่าสุด</p>
    `;
  }
}

// Top Up Shortcut button
btnWalletTopupShortcut.addEventListener('click', () => openWalletModal('topup'));
btnWalletDeposit.addEventListener('click', () => openWalletModal('topup'));
btnWalletWithdraw.addEventListener('click', () => openWalletModal('withdraw'));

// ==================== TICKET CREATE MODAL LOGIC ====================
window.openCreateTicketModal = function(sellerId) {
  const seller = sellers.find(s => s.id === sellerId);
  if (!seller) return;

  activeChatSellerId = seller.id;

  // Fill UI
  const createModalAvatarEl = document.getElementById('create-modal-seller-avatar');
  createModalAvatarEl.textContent = seller.avatar;
  createModalAvatarEl.className = `avatar small ${getAvatarHueClass(seller.id)}`;
  document.getElementById('create-modal-seller-name').textContent = seller.name;
  document.getElementById('create-modal-seller-id').textContent = seller.id;
  
  ticketPriceInput.value = '';
  ticketNoteInput.value = '';
  
  checkCreditStatus(0);

  modalCreateTicket.style.display = 'flex';
  bodyEl.style.overflow = 'hidden';
};

ticketPriceInput.addEventListener('input', () => {
  const val = Number(ticketPriceInput.value) || 0;
  checkCreditStatus(val);
});

function checkCreditStatus(price) {
  const seller = sellers.find(s => s.id === activeChatSellerId);
  if (!seller) return;

  const hasCredit = seller.credit >= price;

  if (price <= 0) {
    creditStatusIndicator.className = 'credit-check-box success';
    creditStatusTitle.textContent = 'ระบุจำนวนเงิน';
    creditStatusDesc.textContent = `ยอดเครดิตค้ำประกันของผู้ขาย: ฿${currencyFormatter.format(seller.credit)}`;
    btnSubmitTicket.disabled = true;
  } else if (hasCredit) {
    creditStatusIndicator.className = 'credit-check-box success';
    creditStatusTitle.textContent = 'เครดิตค้ำประกันผู้ขายพร้อม';
    creditStatusDesc.textContent = `สร้างดีลได้สูงสุด: ฿${currencyFormatter.format(seller.credit)}`;
    btnSubmitTicket.disabled = false;
  } else {
    creditStatusIndicator.className = 'credit-check-box danger';
    creditStatusTitle.textContent = 'เครดิตผู้ขายไม่เพียงพอ';
    creditStatusDesc.textContent = `เครดิตค้ำประกันมีเพียง ฿${currencyFormatter.format(seller.credit)} (ขาดอีก ฿${currencyFormatter.format(price - seller.credit)})`;
    btnSubmitTicket.disabled = true;
  }
}

// Submit Create Ticket
createTicketForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const price = Number(ticketPriceInput.value) || 0;
  const note = ticketNoteInput.value.trim() || 'ไม่มีโน้ตดีลสินค้า';

  const seller = sellers.find(s => s.id === activeChatSellerId);
  if (!seller || price <= 0 || seller.credit < price) return;

  const ticketId = `UH-${Math.floor(1000 + Math.random() * 9000)}`;

  // Create Ticket Object
  const newTx = {
    id: ticketId,
    sellerId: seller.id,
    sellerName: seller.name,
    buyerName: 'บัญชีผู้ซื้อของฉัน',
    amount: price,
    note: note,
    status: 'active',
    stage: 'รอผู้ขายส่งสินค้า',
    created: '23 ส.ค. 2026 · เมื่อสักครู่',
    updated: 'สร้างเมื่อสักครู่',
    type: 'orders'
  };

  transactions.unshift(newTx);
  
  // Insert System message in Chat thread
  const systemMsg = {
    type: 'system',
    ticketId: ticketId,
    amount: price,
    stage: 'รอผู้ขายส่งสินค้า',
    text: `สร้างดีลค้ำประกันสำเร็จ! บันทึกข้อตกลงดีล: "${note}"`,
    time: 'เมื่อสักครู่'
  };
  chatThreads[seller.id].push(systemMsg);

  saveState();
  closeModals();
  
  // Reset search box to show the new ticket
  chatSearchInput.value = '';
  handleSearchInput();
  
  // Navigate to chats screen where the update has been posted
  switchScreen('chats');
  
  showToast(`เปิด Ticket ดีล #${ticketId} สำเร็จ`);
});

// ==================== TICKET DETAILS MODAL LOGIC ====================
window.openTicketDetailModal = function(ticketId) {
  const tx = transactions.find(t => t.id === ticketId);
  if (!tx) return;

  activeTicketId = tx.id;

  // Fill details UI
  detailTicketId.textContent = `TICKET #${tx.id}`;
  detailTicketStage.textContent = tx.status === 'active' ? tx.stage : (tx.status === 'completed' ? 'ดีลสำเร็จเรียบร้อย' : 'ยกเลิกดีลนี้แล้ว');
  detailBuyerName.textContent = tx.buyerName;
  detailSellerName.textContent = tx.sellerName;
  detailAmount.textContent = `฿${currencyFormatter.format(tx.amount)}`;
  detailDate.textContent = tx.created;
  detailNote.textContent = tx.note;

  // Render stepper progress
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  const step4 = document.getElementById('step-4');
  
  const line1 = document.getElementById('line-1');
  const line2 = document.getElementById('line-2');
  const line3 = document.getElementById('line-3');

  [step1, step2, step3, step4].forEach(s => s.className = 'step-item');
  [line1, line2, line3].forEach(l => l.className = 'step-line');

  if (tx.status === 'active') {
    step1.classList.add('done');
    line1.classList.add('done');
    step2.classList.add('active');
  } else if (tx.status === 'completed') {
    [step1, step2, step3, step4].forEach(s => s.classList.add('done'));
    [line1, line2, line3].forEach(l => l.classList.add('done'));
  } else {
    step1.classList.add('done'); // Cancelled
  }

  // Show "Complete Deal" button if active and in Seller mode
  if (tx.status === 'active' && currentMode === 'seller') {
    btnSellerCompleteDeal.style.display = 'block';
  } else {
    btnSellerCompleteDeal.style.display = 'none';
  }

  // Render Express Tracking (only for physical order tickets, not top-up/withdraw logs)
  if (tx.type === 'orders' || !tx.type) {
    expressTrackingPanel.style.display = 'flex';
    trackingCourierEl.textContent = getCourierForTx(tx);
    trackingNumberEl.textContent = getTrackingNumber(tx);

    const steps = getTrackingSteps(tx);
    trackingTimelineEl.innerHTML = steps.map(s => `
      <div class="tracking-step ${s.done ? 'done' : ''} ${(!s.done && s.current) ? 'current' : ''}">
        <div class="tracking-step-dot"></div>
        <span>${s.label}</span>
      </div>
    `).join('');
  } else {
    expressTrackingPanel.style.display = 'none';
  }

  modalTicketDetail.style.display = 'flex';
  bodyEl.style.overflow = 'hidden';
};

// Seller Complete Deal
btnSellerCompleteDeal.addEventListener('click', () => {
  if (!activeTicketId) return;

  transactions = transactions.map(t => {
    if (t.id === activeTicketId) {
      return {
        ...t,
        status: 'completed',
        stage: 'ส่งมอบสำเร็จ',
        updated: 'สำเร็จเมื่อสักครู่'
      };
    }
    return t;
  });

  // Also update corresponding system message inside fuji store chat thread
  const fujiStoreId = 'DS-582941';
  chatThreads[fujiStoreId] = chatThreads[fujiStoreId].map(msg => {
    if (msg.type === 'system' && msg.ticketId === activeTicketId) {
      return {
        ...msg,
        stage: 'ส่งมอบสำเร็จ',
        text: 'การซื้อขายปลอดภัยเสร็จสิ้นอย่างสมบูรณ์แบบ!'
      };
    }
    return msg;
  });

  saveState();
  closeModals();

  if (currentScreen === 'chat-detail') {
    renderChatMessages();
  } else if (currentScreen === 'transactions') {
    renderTransactionsList();
  }
  handleSearchInput();

  showToast(`ปิดดีลค้ำประกัน #${activeTicketId} สำเร็จ`);
});

// ==================== WALLET MODAL LOGIC ====================
function openWalletModal(mode) {
  walletMode = mode;
  const fujiStore = sellers.find(s => s.id === 'DS-582941');
  if (!fujiStore) return;

  walletAmountInput.value = '';
  walletErrorMsg.style.display = 'none';
  btnWalletSubmit.disabled = true;

  // Reset to amount-entry form (hide any leftover PromptPay QR step)
  walletForm.style.display = 'block';
  promptpayStep.style.display = 'none';

  if (mode === 'topup') {
    walletModalTitle.textContent = 'เติมเครดิตค้ำประกัน';
    walletModalDesc.textContent = 'ระบุจำนวนเงินที่ต้องการทดลองฝากเข้ากองกลางค้ำประกันธุรกรรม';
    walletSpecialBtn.textContent = '+฿5,000';
    walletSpecialBtn.setAttribute('data-value', '5000');
  } else {
    walletModalTitle.textContent = 'ถอนเครดิตค้ำประกัน';
    walletModalDesc.textContent = `ยอดเครดิตที่ใช้ถอนได้สูงสุดในระบบจำลอง: ฿${currencyFormatter.format(fujiStore.credit)}`;
    walletSpecialBtn.textContent = 'ถอนทั้งหมด';
    walletSpecialBtn.setAttribute('data-value', fujiStore.credit);
  }

  modalWallet.style.display = 'flex';
  bodyEl.style.overflow = 'hidden';
}

walletAmountInput.addEventListener('input', () => {
  const fujiStore = sellers.find(s => s.id === 'DS-582941');
  if (!fujiStore) return;

  const val = Number(walletAmountInput.value) || 0;

  if (walletMode === 'withdraw' && val > fujiStore.credit) {
    walletErrorMsg.style.display = 'block';
    btnWalletSubmit.disabled = true;
  } else {
    walletErrorMsg.style.display = 'none';
    btnWalletSubmit.disabled = val <= 0;
  }
});

// Quick select buttons
walletQuickAmounts.addEventListener('click', (e) => {
  if (e.target.classList.contains('quick-amt-btn')) {
    const value = e.target.getAttribute('data-value');
    walletAmountInput.value = value;

    // Trigger input event programmatically
    const event = new Event('input', { bubbles: true });
    walletAmountInput.dispatchEvent(event);
  }
});

// Submit Wallet transaction
walletForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = Number(walletAmountInput.value) || 0;
  if (val <= 0) return;

  const fujiStore = sellers.find(s => s.id === 'DS-582941');
  if (!fujiStore) return;

  if (walletMode === 'topup') {
    // Top-up goes through the PromptPay QR mock step instead of completing instantly
    pendingTopupAmount = val;
    promptpayAmountEl.textContent = `฿${currencyFormatter.format(val)}.00`;
    renderFakeQr(promptpayQrSvg, `KHONKLANG|${fujiStore.id}|${val}|${Date.now()}`);
    walletForm.style.display = 'none';
    promptpayStep.style.display = 'block';
    return;
  }

  // Withdraw stays instant (no PromptPay step needed for outgoing credit)
  if (val > fujiStore.credit) return;

  const txId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;

  sellers = sellers.map(s => {
    if (s.id === fujiStore.id) return { ...s, credit: s.credit - val };
    return s;
  });

  transactions.unshift({
    id: txId,
    sellerId: fujiStore.id,
    sellerName: fujiStore.name,
    buyerName: 'บัญชีผู้ซื้อของฉัน',
    amount: val,
    note: 'ถอนเครดิตค้ำประกัน Fuji Store',
    status: 'completed',
    stage: 'ถอนเครดิตสำเร็จ',
    created: '23 ส.ค. 2026 · เมื่อสักครู่',
    updated: 'สำเร็จ',
    type: 'withdraw'
  });

  showToast(`ถอนเครดิตจำลอง ฿${currencyFormatter.format(val)} สำเร็จ`);

  saveState();
  closeModals();
  renderWalletScreen();
  handleSearchInput();
});

// PromptPay: go back to edit amount
btnPromptpayBack.addEventListener('click', () => {
  promptpayStep.style.display = 'none';
  walletForm.style.display = 'block';
});

// PromptPay: mock "I have paid" confirmation completes the top-up
btnPromptpayConfirm.addEventListener('click', () => {
  const fujiStore = sellers.find(s => s.id === 'DS-582941');
  if (!fujiStore || pendingTopupAmount <= 0) return;

  const val = pendingTopupAmount;
  const txId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;

  sellers = sellers.map(s => {
    if (s.id === fujiStore.id) return { ...s, credit: s.credit + val };
    return s;
  });

  transactions.unshift({
    id: txId,
    sellerId: fujiStore.id,
    sellerName: fujiStore.name,
    buyerName: 'บัญชีผู้ซื้อของฉัน',
    amount: val,
    note: 'เติมเครดิตค้ำประกัน Fuji Store ผ่านพร้อมเพย์',
    status: 'completed',
    stage: 'เติมเครดิตสำเร็จ',
    created: '23 ส.ค. 2026 · เมื่อสักครู่',
    updated: 'สำเร็จ',
    type: 'topup'
  });

  pendingTopupAmount = 0;
  saveState();
  closeModals();
  renderWalletScreen();
  handleSearchInput();
  showToast(`ชำระผ่านพร้อมเพย์จำลอง ฿${currencyFormatter.format(val)} สำเร็จ`);
});

// Generates a deterministic fake QR-code-like grid pattern (mock only, not scannable)
function renderFakeQr(svgEl, seedStr) {
  const size = 33;
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  function rand() {
    seed = (seed * 1103515245 + 12345) >>> 0;
    return (seed >>> 8) % 100 / 100;
  }

  const finderZones = [[0, 0], [26, 0], [0, 26]];
  function finderColor(x, y) {
    for (const [zx, zy] of finderZones) {
      const lx = x - zx, ly = y - zy;
      if (lx < 0 || lx > 6 || ly < 0 || ly > 6) continue;
      if (lx === 0 || lx === 6 || ly === 0 || ly === 6) return '#111';
      if (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4) return '#111';
      return '#fff';
    }
    return null;
  }

  let rects = '<rect width="33" height="33" fill="#ffffff"/>';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const finder = finderColor(x, y);
      if (finder) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${finder}"/>`;
      } else if (rand() > 0.55) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="#111"/>`;
      }
    }
  }
  svgEl.innerHTML = rects;
}

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

// ==================== MODAL OVERLAY LOGIC ====================
btnHelpTrigger.addEventListener('click', () => {
  modalHelp.style.display = 'flex';
  bodyEl.style.overflow = 'hidden';
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', closeModals);
});

// Click outside modal content
const backdropModals = document.querySelectorAll('.modal-backdrop');
backdropModals.forEach(m => {
  m.addEventListener('click', (e) => {
    if (e.target === m) {
      closeModals();
    }
  });
});

function closeModals() {
  modalCreateTicket.style.display = 'none';
  modalTicketDetail.style.display = 'none';
  modalWallet.style.display = 'none';
  modalHelp.style.display = 'none';
  modalSellerSignup.style.display = 'none';
  bodyEl.style.overflow = '';

  // Reset transient inner-modal states
  walletForm.style.display = 'block';
  promptpayStep.style.display = 'none';
  pendingTopupAmount = 0;
}

// App Initialization
function init() {
  applyDarkMode();
  if (currentMode === 'seller' && !sellerLoggedIn) currentMode = 'buyer';
  switchMode(currentMode);
  switchScreen('chats');
}

init();
