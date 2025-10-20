import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, index }) {
  const formatPrice = (price) => {
    if (!price) return 'Rp 0';
    
    if (String(price).includes('-')) {
      return price; 
    }
    
    const cleanPrice = String(price).replace(/[^\d]/g, '');
    const numericPrice = parseInt(cleanPrice) || 0;
    return `Rp ${numericPrice.toLocaleString('id-ID')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden min-w-[300px] mx-2 flex-shrink-0 border-2 border-transparent hover:border-green-300 transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x200/4ADE80/FFFFFF?text=${encodeURIComponent(product.name)}`;
          }}
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {product.category || 'Makanan'}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-green-700 font-bold text-lg">
              {formatPrice(product.price)}
            </span>
          </div>
          <Link to={`/product/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <span>🛒</span>
              <span>Beli</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}