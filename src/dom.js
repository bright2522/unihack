// ==========================================================================
// dom.js — Centralized element lookups, the screens map, and the nav item
// list. Every other module reads DOM references from here rather than
// calling document.getElementById directly, so ids only live in one place.
// Depends on: index.html having been parsed (safe — classic scripts at the
// end of <body> run after the DOM is ready).
// ==========================================================================

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
