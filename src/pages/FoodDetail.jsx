import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://docs.google.com/spreadsheets/d/1UInGlaN35dfSFGEwD3d5KC0eJmbFyMXXRbzpmXuflbw/gviz/tq?tqx=out:json";

    fetch(url)
      .then(res => res.text())
      .then(text => {
        const jsonText = text
          .replace(/^[^\(]*\(/, "")
          .replace(/\);?$/, "");
        const json = JSON.parse(jsonText);

        const cols = json.table.cols.map(col => col.label);

        const rows = json.table.rows.map((row, index) => {
          const obj = {};
          row.c.forEach((cell, i) => {
            obj[cols[i]] = cell ? cell.v : null;
          });
          obj.id = index;
          return obj;
        });

        const foundProduct = rows.find(item => item.id === parseInt(id));
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetch spreadsheet:", err);
        setLoading(false);
      });
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return 0;
    
    const cleanPrice = String(price).replace(/[^\d]/g, '');
    return parseInt(cleanPrice) || 0;
  };

  const handleOrder = () => {
    if (!product) return;

    const productPrice = formatPrice(product.price);
    const totalPrice = productPrice * quantity;
    
    const message = `Assalamu'alaikum, saya ingin memesan:\n\n📦 *${product.name}*\n📦 Jumlah: ${quantity}\n💵 Total: Rp ${totalPrice.toLocaleString('id-ID')}\n\nTerima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full mb-4 z-10"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-700 text-lg font-semibold z-10"
        >
          Memuat detail produk...
        </motion.p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative overflow-hidden">       <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            😔
          </motion.div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Produk tidak ditemukan</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
          >
            Kembali ke Beranda
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const productPrice = formatPrice(product.price);
  const totalPrice = productPrice * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">      
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-green-100 text-green-700 hover:text-green-800 font-semibold transition-all duration-200"
        >
          <motion.svg 
            className="w-5 h-5"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{ x: -3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </motion.svg>
          Kembali ke Menu
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto border border-white/50"
        >
          <div className="lg:flex">
            <div className="lg:w-1/2 relative">
              <img 
                src={product.image_url || '/api/placeholder/600/600'} 
                alt={product.name}
                className="w-full h-80 lg:h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x600/4ade80/ffffff?text=${encodeURIComponent(product.name)}`;
                }}
              />
              
              {/* Category Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-4"
              >
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {product.category || 'Makanan'}
                </span>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 p-8 lg:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl lg:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-6 leading-relaxed text-lg"
                >
                  {product.description || 'Deskripsi produk sedang tidak tersedia.'}
                </motion.p>
                
                {/* Price Display */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6"
                >
                  <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Rp {productPrice.toLocaleString('id-ID')}
                  </span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-8"
                >
                  <label className="block text-gray-700 mb-3 font-semibold text-lg">Jumlah Pesanan:</label>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 flex items-center justify-center hover:from-green-200 hover:to-emerald-200 transition-all duration-200 shadow-md border border-green-200"
                    >
                      <span className="text-xl font-bold">-</span>
                    </motion.button>
                    
                    <motion.span 
                      key={quantity}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold w-12 text-center bg-green-50 py-2 rounded-lg border border-green-200"
                    >
                      {quantity}
                    </motion.span>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 flex items-center justify-center hover:from-green-200 hover:to-emerald-200 transition-all duration-200 shadow-md border border-green-200"
                    >
                      <span className="text-xl font-bold">+</span>
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-inner"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold text-lg">Total Harga:</span>
                    <motion.span 
                      key={totalPrice}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-lg font-bold text-green-700"
                    >
                      Rp {totalPrice.toLocaleString('id-ID')}
                    </motion.span>
                  </div>
                </motion.div>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOrder}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center transition-all duration-300 shadow-2xl"
                >
                  Pesan Sekarang!
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}