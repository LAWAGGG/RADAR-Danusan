import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          obj.id = index + 1;
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

  // Get all available images for the product
  const getProductImages = () => {
    if (!product) return [];
    
    const images = [];
    if (product.image_url) images.push(product.image_url);
    if (product.image_url_2) images.push(product.image_url_2);
    if (product.image_url_3) images.push(product.image_url_3);
    
    return images.length > 0 ? images : [
      `https://via.placeholder.com/600x600/4ADE80/FFFFFF?text=${encodeURIComponent(product.name)}`
    ];
  };

  const productImages = getProductImages();

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const formatPrice = (price) => {
    if (!price) return 0;

    if (String(price).includes('-')) {
      const prices = String(price).match(/\d+/g);
      return prices ? parseInt(prices[0]) * 1000 : 0;
    }

    const cleanPrice = String(price).replace(/[^\d]/g, '');
    return parseInt(cleanPrice) || 0;
  };

  const displayPrice = (price) => {
    if (!price) return 'Rp 0';
    return price;
  };

  const handleOrder = () => {
    if (!product) return;

    const productPrice = formatPrice(product.price);
    const totalPrice = productPrice * quantity;

    const message = `Assalamu'alaikum, saya \nnama:\nkelas:\n\n ingin memesan:\n\n🍗 *${product.name}*\n💰 Harga: ${displayPrice(product.price)}\n📦 Jumlah: ${quantity}\n💵 Total: Rp ${totalPrice.toLocaleString('id-ID')}\n\nTerima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285814567851?text=${encodedMessage}`;

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative overflow-hidden">
        <motion.div
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
    <div className="min-h-screen relative overflow-hidden">
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
            {/* Image Gallery Section */}
            <div className="lg:w-1/2 relative">
              <div className="relative lg:h-150 h-80 overflow-hidden">
                {/* Main Image */}
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <img
                    src={productImages[currentImageIndex]}
                    alt={`${product.name} - Gambar ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/600x600/4ADE80/FFFFFF?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                </motion.div>

                {/* Navigation Arrows - Show only if multiple images */}
                {productImages.length > 1 && (
                  <>
                    {/* Left Arrow */}
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-green-200 text-green-700 hover:bg-white hover:text-green-800 transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>

                    {/* Right Arrow */}
                    <motion.button
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-green-200 text-green-700 hover:bg-white hover:text-green-800 transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </>
                )}

                {/* Image Indicators/Dots */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Image Counter */}
                {productImages.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {currentImageIndex + 1} / {productImages.length}
                  </div>
                )}

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

              {/* Thumbnail Gallery - Show only if multiple images */}
              {productImages.length > 1 && (
                <div className="hidden lg:flex p-4 space-x-2 justify-center bg-green-50/50">
                  {productImages.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToImage(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'border-green-500 scale-105' 
                          : 'border-transparent hover:border-green-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/100x100/4ADE80/FFFFFF?text=${encodeURIComponent(product.name)}`;
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="lg:w-1/2 p-8 lg:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {product.name}
                </h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6"
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {displayPrice(product.price)}
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-6 leading-relaxed text-lg"
                >
                  {product.description || 'Deskripsi produk sedang tidak tersedia.'}
                </motion.p>

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

                {!String(product.price).includes('-') && (
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
                        className="text-xl font-bold text-green-700"
                      >
                        Rp {totalPrice.toLocaleString('id-ID')}
                      </motion.span>
                    </div>
                  </motion.div>
                )}

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
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg flex gap-2 items-center justify-center transition-all duration-300 shadow-2xl"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Pesan via WhatsApp
                </motion.button>

                {String(product.price).includes('-') && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="text-center text-gray-500 mt-4 text-sm"
                  >
                    *Harga bervariasi, silakan konfirmasi via WhatsApp
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer></Footer>
    </div>
  );
}