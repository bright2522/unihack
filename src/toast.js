// ==========================================================================
// toast.js — Bottom toast notification. Depends on: dom.js (toastEl,
// toastMessageText).
// ==========================================================================

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
