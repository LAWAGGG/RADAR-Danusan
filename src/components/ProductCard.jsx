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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden min-w-[260px] mx-2 flex-shrink-0 border border-gray-100 hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative w-70">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-65 object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x200/4ADE80/FFFFFF?text=${encodeURIComponent(product.name)}`;
          }}
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2.5 py-0.5 rounded-md text-xs font-medium">
          {product.category || 'Makanan'}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-green-700 font-semibold text-base">
              {formatPrice(product.price)}
            </span>
          </div>
          <Link to={`/product/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150"
            >
              Beli
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}