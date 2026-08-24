// ==========================================================================
// ticket-modal.js — The two ticket modals: creating an escrow deal (with
// live credit-check feedback) and viewing a deal's detail/progress/express
// tracking. Depends on: dom.js, state.js, utils.js, modal-core.js
// (closeModals), chats.js (handleSearchInput), nav.js (switchScreen).
// ==========================================================================

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
