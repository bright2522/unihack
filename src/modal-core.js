// ==========================================================================
// modal-core.js — Generic modal plumbing shared by every modal: the header
// help trigger, close/cancel buttons, backdrop-click-to-close, and the
// closeModals() reset used everywhere. Depends on: dom.js.
// ==========================================================================

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
