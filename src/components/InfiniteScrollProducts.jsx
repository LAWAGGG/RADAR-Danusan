// InfiniteScrollProducts.jsx
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function InfiniteScrollProducts({ products }) {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId;
    let speed = 1.2;
    let direction = 1;

    if (window.innerWidth > 768) {
      const autoScroll = () => {
        if (!container || isDragging) return;

        container.scrollLeft += speed * direction;

        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
          direction = -1;
        }

        if (container.scrollLeft <= 0) {
          direction = 1;
        }

        animationId = requestAnimationFrame(autoScroll);
      };

      animationId = requestAnimationFrame(autoScroll);

      const handleMouseDown = () => setIsDragging(true);
      const handleMouseUp = () => setIsDragging(false);

      const stopScroll = () => {
        setIsDragging(true);
        cancelAnimationFrame(animationId);
      };

      const resumeScroll = () => {
        setIsDragging(false);
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(autoScroll);
      };

      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseenter", stopScroll);
      container.addEventListener("mouseleave", resumeScroll);

      return () => {
        cancelAnimationFrame(animationId);
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseenter", stopScroll);
        container.removeEventListener("mouseleave", resumeScroll);
      };
    } else {
      container.style.overflowX = "scroll";
    }
  }, [products, isDragging]);

  return (
    <div className="relative w-full group">
      <div
        ref={scrollContainerRef}
        className="
          flex gap-8 py-12 overflow-x-auto
          scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-emerald-100/50
          scrollbar-thumb-rounded-full scrollbar-track-rounded-full
          hover:scrollbar-thumb-emerald-500 transition-all duration-300
          px-8
          snap-x snap-mandatory
          scroll-snap-stop-always
          touch-pan-x
          cursor-grab active:cursor-grabbing
          pb-16
        "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#34D399 #D1FAE5",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        {products.map((product, idx) => (
          <div key={idx} className="snap-center flex-shrink-0 first:pl-4 last:pr-4">
            <ProductCard product={product} index={idx} />
          </div>
        ))}
      </div>

      {/* Subtle scroll hint */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-emerald-600 pointer-events-none"
      >
        <span className="text-sm">←</span>
        <span className="text">Geser Kesamping</span>
        <span className="text-sm">→</span>
      </motion.div>
    </div>
  );
}