  // ===== TESTING LANGSUNG =====
  const tokenBot = '8730264514:AAELbvBhOJbRxilqoPrSvKissWM7ZQyBM_o';
  const ownerID = '8521019587';
  // ============================

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({success:false,message:'Method not allowed'});
  const {produk,harga,idGame,game,image,nomorTF} = req.body;

  try{
    const caption = `Order baru!\nGame: ${game}\nID: ${idGame}\nProduk: ${produk}\nHarga: ${harga}`;

    if(image){
      const FormData = require('form-data');
      const form = new FormData();
      form.append('chat_id', ownerID);
      form.append('caption', caption);
      form.append('photo', Buffer.from(image,'base64'), {filename:'bukti.png'});

      const fetchRes = await fetch(`https://api.telegram.org/bot${tokenBot}/sendPhoto`,{method:'POST',body:form});
      const dataPhoto = await fetchRes.json();
      if(!dataPhoto.ok) throw new Error(dataPhoto.description);
    } else {
      await fetch(`https://api.telegram.org/bot${tokenBot}/sendMessage`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({chat_id:ownerID,text:caption})
      });
    }

    res.status(200).json({success:true});
  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
}