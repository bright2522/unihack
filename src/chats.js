// ==========================================================================
// chats.js — Chats/home screen: recent chat list, and the dual search that
// matches sellers or ticket tracking numbers. Depends on: dom.js, state.js,
// utils.js (currencyFormatter, getAvatarHueClass).
// ==========================================================================

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

