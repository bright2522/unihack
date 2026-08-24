// ==========================================================================
// chat-detail.js — Full-screen chat thread: opening a conversation,
// rendering messages/system deal cards, sending messages, and the
// simulated seller auto-reply. Depends on: dom.js, state.js, utils.js,
// data.js (REPLY_TEMPLATES), nav.js (switchScreen), ticket-modal.js
// (openCreateTicketModal, called only from within an event handler).
// ==========================================================================

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
