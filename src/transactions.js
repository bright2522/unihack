// ==========================================================================
// transactions.js — Transaction history screen: the active/history filter
// and rendering ticket + wallet transaction rows. Depends on: dom.js,
// state.js, utils.js (currencyFormatter), ticket-modal.js
// (openTicketDetailModal, called only from a row's onclick).
// ==========================================================================

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
