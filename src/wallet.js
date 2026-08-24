// ==========================================================================
// wallet.js — Seller wallet screen plus the deposit/withdraw modal and its
// mock PromptPay QR top-up step. Depends on: dom.js, state.js, utils.js
// (currencyFormatter, getAvatarHueClass, renderFakeQr), modal-core.js
// (closeModals), chats.js (handleSearchInput) — all called only from
// event handlers, so load order relative to those doesn't matter.
// ==========================================================================

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

