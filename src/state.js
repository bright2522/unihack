// ==========================================================================
// state.js — Single source of truth for mutable app state, seeded from
// data.js defaults or localStorage. Every screen/modal module reads and
// reassigns these globals directly (classic scripts share one scope).
// Depends on: data.js (DEFAULT_SELLERS, DEFAULT_CHAT_THREADS, DEFAULT_TRANSACTIONS).
// ==========================================================================

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
let pendingTopupAmount = 0;

// State Persistence
function saveState() {
  localStorage.setItem('ut_sellers', JSON.stringify(sellers));
  localStorage.setItem('ut_chats', JSON.stringify(chatThreads));
  localStorage.setItem('ut_txs', JSON.stringify(transactions));
  localStorage.setItem('ut_mode', currentMode);
  localStorage.setItem('ut_seller_logged_in', JSON.stringify(sellerLoggedIn));
  localStorage.setItem('ut_dark_mode', JSON.stringify(darkMode));
}
