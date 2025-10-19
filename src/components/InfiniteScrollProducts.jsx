import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

export default function InfiniteScrollProducts({ products }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId;
    let speed = 0.8;
    let direction = 1;

    // Hanya aktifkan auto-scroll di desktop
    if (window.innerWidth > 768) {
      const autoScroll = () => {
        if (!container) return;

        // Geser perlahan
        container.scrollLeft += speed * direction;

        // Kalau sudah sampai ujung kanan → balik arah
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
          direction = -1;
        }

        // Kalau sudah di ujung kiri → balik arah
        if (container.scrollLeft <= 0) {
          direction = 1;
        }

        animationId = requestAnimationFrame(autoScroll);
      };

      // Jalankan animasi
      animationId = requestAnimationFrame(autoScroll);

      // Pause saat mouse di atas
      const stopScroll = () => cancelAnimationFrame(animationId);

      // Lanjutkan lagi setelah keluar
      const resumeScroll = () => {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(autoScroll);
      };

      container.addEventListener("mouseenter", stopScroll);
      container.addEventListener("mouseleave", resumeScroll);

      // Bersihkan event listener
      return () => {
        cancelAnimationFrame(animationId);
        container.removeEventListener("mouseenter", stopScroll);
        container.removeEventListener("mouseleave", resumeScroll);
      };
    } else {
      // Di mobile, pastikan scroll natural
      container.style.scrollBehavior = "auto";
      container.style.overflowX = "scroll";
    }
  }, [products]);

  return (
    <div className="relative w-full">
      <div
        ref={scrollContainerRef}
        className="
          flex gap-6 py-8 overflow-x-auto
          scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100
          scrollbar-thumb-rounded-full scrollbar-track-rounded-full
          hover:scrollbar-thumb-green-500 transition-all
          px-6
          snap-x snap-mandatory
          scroll-snap-stop-always
          touch-pan-x
        "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#4ADE80 #DCFCE7",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        {products.map((product, idx) => (
          <div key={idx} className="snap-center flex-shrink-0">
            <ProductCard product={product} index={idx} />
          </div>
        ))}
      </div>

      {/* Efek fade di sisi kiri dan kanan */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-emerald-50 to-transparent pointer-events-none hidden md:block" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-emerald-50 to-transparent pointer-events-none hidden md:block" />
    </div>
  );
}
