// ==========================================================================
// data.js — Static mock data: seed content for sellers, chat history,
// transactions, seller-signup blacklist, and canned auto-reply text.
// No dependencies. Must load before state.js (which seeds itself from here).
// ==========================================================================

// Mock Sellers Data
const DEFAULT_SELLERS = [
  { id: 'DS-582941', name: 'Fuji Store', handle: '@fujistore', credit: 12500, joined: 'ส.ค. 2026', verified: true, avatar: 'FS' },
  { id: 'DS-104827', name: 'Mellow Market', handle: '@mellowmarket', credit: 2400, joined: 'มิ.ย. 2026', verified: true, avatar: 'MM' },
  { id: 'DS-739205', name: 'Pixel Gear', handle: '@pixelgear', credit: 0, joined: 'ก.ค. 2026', verified: false, avatar: 'PG' }
];

// Mock Chat Threads Data
const DEFAULT_CHAT_THREADS = {
  'DS-582941': [
    { sender: 'buyer', text: 'สวัสดีครับ สนใจสั่งซื้อหูฟังสีดำครับ', time: '19:35' },
    { sender: 'seller', text: 'สวัสดีค่ะ สินค้าพร้อมส่งเลยนะคะ สภาพใหม่แกะกล่องค่ะ', time: '19:37' },
    { sender: 'buyer', text: 'สร้างดีลค้ำประกันผ่านระบบคนกลางนะครับเพื่อความปลอดภัย', time: '19:40' },
    { sender: 'seller', text: 'ได้เลยค่ะ เครดิตค้ำประกันทางร้านเตรียมไว้พร้อมแล้วค่ะ', time: '19:41' },
    { type: 'system', ticketId: 'UH-4821', amount: 3200, stage: 'รอผู้ขายส่งสินค้า', text: 'ดีลสำเร็จ! ระบบทำการล็อกเครดิตค้ำประกัน ฿3,200.00 เรียบร้อย', time: '19:42' }
  ],
  'DS-104827': [
    { sender: 'seller', text: 'สวัสดีค่ะ มีอะไรให้ Mellow Market ช่วยดูแลไหมคะ?', time: 'มิ.ย. 2026' },
    { sender: 'buyer', text: 'สอบถามไซซ์เสื้อแจ็กเก็ตครับ', time: 'มิ.ย. 2026' },
    { sender: 'seller', text: 'ไซซ์ M อก 40 นิ้วค่ะ', time: 'มิ.ย. 2026' },
    { type: 'system', ticketId: 'UH-1938', amount: 890, stage: 'ยกเลิกแล้ว', text: 'ดีล #UH-1938 ถูกยกเลิกโดยระบบเนื่องจากยกเลิกข้อตกลง', time: 'มิ.ย. 2026' }
  ],
  'DS-739205': [
    { sender: 'buyer', text: 'สวัสดีครับ สนใจกล้องถ่ายรูปครับ', time: 'เมื่อวานนี้' },
    { sender: 'seller', text: 'กล้องยังอยู่นะคะ สภาพสวยมากค่ะ', time: 'เมื่อวานนี้' },
    { sender: 'buyer', text: 'มีเครดิตค้ำประกันในระบบไหมครับ', time: 'เมื่อวานนี้' },
    { sender: 'seller', text: 'ตอนนี้เครดิตในระบบของหนูยังเป็น 0 อยู่เลยค่ะ รอก่อนนะคะ', time: 'เมื่อวานนี้' }
  ]
};

// Mock Transaction History List (to match reference screen look)
const DEFAULT_TRANSACTIONS = [
  { id: 'UH-4821', sellerId: 'DS-582941', sellerName: 'Fuji Store', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 3200, note: 'หูฟังสีดำ ส่งแบบ EMS', status: 'active', stage: 'รอผู้ขายส่งสินค้า', created: '23 ส.ค. 2026 · 19:42', updated: 'อัปเดต 8 นาทีที่แล้ว', type: 'orders' },
  { id: 'TX-9921', sellerId: 'DS-582941', sellerName: 'Fuji Store', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 5000, note: 'เติมเครดิตค้ำประกัน Fuji Store', status: 'completed', stage: 'เติมเครดิตสำเร็จ', created: '22 ส.ค. 2026 · 11:20', updated: 'สำเร็จ', type: 'topup' },
  { id: 'UH-2740', sellerId: 'DS-582941', sellerName: 'Fuji Store', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 1250, note: 'คีย์บอร์ด Mechanical', status: 'completed', stage: 'ส่งมอบสำเร็จ', created: '18 ส.ค. 2026 · 14:10', updated: 'สำเร็จ 20 ส.ค. 2026', type: 'orders' },
  { id: 'TX-8830', sellerId: 'DS-582941', sellerName: 'Fuji Store', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 12500, note: 'เติมเครดิตค้ำประกัน Fuji Store', status: 'completed', stage: 'เติมเครดิตสำเร็จ', created: '15 ส.ค. 2026 · 09:12', updated: 'สำเร็จ', type: 'topup' },
  { id: 'UH-1938', sellerId: 'DS-104827', sellerName: 'Mellow Market', buyerName: 'บัญชีผู้ซื้อของฉัน', amount: 890, note: 'เสื้อแจ็กเก็ต ไซซ์ M', status: 'cancelled', stage: 'ยกเลิกแล้ว', created: '12 ส.ค. 2026 · 09:25', updated: 'ยกเลิก 12 ส.ค. 2026', type: 'orders' }
];

// Mock Blacklist Database (Seller Signup Screening)
const BLACKLIST_IDS = ['1111111111111'];
const BLACKLIST_NAME_KEYWORDS = ['มิจ'];

// Canned auto-reply text used by the chat-detail simulated seller response
const REPLY_TEMPLATES = {
  'DS-582941': 'ขอบคุณค่ะ ยินดีบริการนะคะ สามารถเช็กเครดิตค้ำประกันของทางร้านได้เลยค่ะ',
  'DS-104827': 'สนใจขนาดเท่าไร สอบถามเพิ่มเติมทางแชทนี้ได้ตลอดเลยนะคะ',
  'DS-739205': 'ถ้าหนูเติมเครดิตค้ำประกันเข้าระบบแล้ว จะส่งข้อความแจ้งนะคะ ขอบคุณค่ะ'
};

