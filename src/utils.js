// ==========================================================================
// utils.js — Pure helper functions: express-tracking display data, avatar
// color hashing, currency formatting, and the mock PromptPay QR renderer.
// No dependencies, no DOM lookups; safe to load early.
// ==========================================================================

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

const currencyFormatter = new Intl.NumberFormat('th-TH');

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
