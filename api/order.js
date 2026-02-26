  // ===== TESTING LANGSUNG =====
  const TOKEN = '8730264514:AAELbvBhOJbRxilqoPrSvKissWM7ZQyBM_o';
  const OWNER_ID = '8521019587';
  // ============================

  export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { produk, harga, idGame, game, noDana, image } = req.body;

  try {
    const caption = `Order baru!\nGame: ${game}\nID: ${idGame}\nProduk: ${produk}\nHarga: ${harga}`;

    if (image) {
      await fetch(`https://api.telegram.org/bot${tokenBot}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: ownerID, photo: `data:image/png;base64,${image}`, caption })
      });
    } else {
      await fetch(`https://api.telegram.org/bot${tokenBot}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: ownerID, text: caption })
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}