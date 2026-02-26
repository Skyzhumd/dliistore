// api/order.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { produk, harga, idGame, game } = req.body;

  if (!produk || !harga || !idGame) 
    return res.status(400).json({ success: false, message: 'Data kurang lengkap' });

  // ===== TESTING LANGSUNG =====
  const TOKEN = '8730264514:AAELbvBhOJbRxilqoPrSvKissWM7ZQyBM_o';
  const OWNER_ID = '8521019587';
  // ============================

  const gameName = game === 'ml' ? 'Mobile Legends (MLBB)' : 'Free Fire (FF)';

  const message = `
📥 ORDER BARU MASUK!
🎮 Game   : ${gameName}
🆔 ID     : ${idGame}
💎 Nominal: ${produk}
💰 Harga  : ${harga}
  `;

  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: OWNER_ID,
        text: message
      })
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Gagal kirim ke bot' });
  }
}