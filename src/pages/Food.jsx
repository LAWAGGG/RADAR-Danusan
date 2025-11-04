import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Leaf } from 'lucide-react';
import InfiniteScrollProducts from "../components/InfiniteScrollProducts";
import { Footer } from "../components/Footer";

export default function Food() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("Semua");

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

                setData(rows);
                setFilteredData(rows);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetch spreadsheet:", err);
                setLoading(false);
            });
    }, []);

    const categories = ["Semua", ...new Set(data.map(item => item.category).filter(Boolean))];

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        if (category === "Semua") {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item => item.category === category);
            setFilteredData(filtered);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full mb-4"
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-700 text-lg font-semibold"
                >
                    Memuat menu...
                </motion.p>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <section className="relative pt-20 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-green-600 via-emerald-700 to-green-800">
                <div className="absolute inset-0 opacity-15">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hero-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                                <path d="M 60 30 A 20 20 0 1 0 60 70 A 15 15 0 1 1 60 30 Z"
                                    fill="white" opacity="0.8" />

                                <path d="M80 45 L82 50 L87 50 L83 53 L85 58 L80 55 L75 58 L77 53 L73 50 L78 50 Z"
                                    fill="white" opacity="0.9" />

                                <path d="M30 40 L31 43 L34 43 L31.5 45 L32.5 48 L30 46 L27.5 48 L28.5 45 L26 43 L29 43 Z"
                                    fill="white" opacity="0.6" />

                                <path d="M100 80 L101 83 L104 83 L101.5 85 L102.5 88 L100 86 L97.5 88 L98.5 85 L96 83 L99 83 Z"
                                    fill="white" opacity="0.7" />

                                <path d="M40 100 L41 103 L44 103 L41.5 105 L42.5 108 L40 106 L37.5 108 L38.5 105 L36 103 L39 103 Z"
                                    fill="white" opacity="0.5" />

                                <circle cx="90" cy="30" r="1.5" fill="white" opacity="0.6" />
                                <circle cx="50" cy="90" r="1.5" fill="white" opacity="0.5" />
                                <circle cx="110" cy="60" r="1.5" fill="white" opacity="0.6" />
                                <circle cx="20" cy="70" r="1.5" fill="white" opacity="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-pattern)" />
                    </svg>
                </div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(25)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-md"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.6 + 0.3,
                            }}
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}
                </div>
                <motion.div
                    className="absolute top-50 right-23 md:top-8 md:left-245 -rotate-48 md:-rotate-48  text-4xl md:text-6xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    <motion.div
                        animate={{
                            y: [0, -3, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="h-10 w-10 md:h-25 md:w-25"
                    >
                        <img src="./moon.png" alt="" className="h-full w-full object-cover" />
                    </motion.div>
                </motion.div>

                <div className="max-w-7xl mx-auto relative z-10 py-16 sm:py-24">
                    <div className="text-center">
                        <motion.h1 className="text-5xl text-white md:text-6xl font-extrabold mb-3 drop-shadow-lg tracking-wide">
                            kewirausahaan <span className="bg-gradient-to-b from-green-200  to-green-400  text-transparent bg-clip-text">Rohis</span>
                        </motion.h1>
                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            onClick={() => {
                                document.getElementById('products')?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                        >
                            <span>Lihat Produk</span>
                            <motion.svg
                                className="w-5 h-5"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </motion.button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-16 sm:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path
                            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
                            fill="#E2FBED"
                            className="text-green-50"
                        />
                    </svg>
                </div>
            </section>

            <section id="products" className="py-8 px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="container mx-auto"
                >
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md mb-6"
                        >
                            <h2 className="text-3xl font-bold text-green-800">
                                Menu Kami
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-3 mb-8 px-4"
                        >
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleCategoryFilter(category)}
                                    className={`px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-md border-2 ${selectedCategory === category
                                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-700 shadow-lg"
                                        : "bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300"
                                        }`}
                                >
                                    {category === "Semua" ? "🍽️ Semua Menu" :
                                        category === "makanan" ? "🍚 Makanan" :
                                            category === "snack berat" ? "🍱 Snack Berat" :
                                                category === "snack ringan" ? "🍪 Snack Ringan" : category}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>

                    {filteredData.length > 0 ? (
                        <InfiniteScrollProducts products={filteredData} />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-6xl mb-4"
                            >
                                😔
                            </motion.div>
                            <h3 className="text-2xl font-bold text-green-800 mb-2">
                                Tidak ada produk dalam kategori ini
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Coba pilih kategori lain untuk melihat menu yang tersedia
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCategoryFilter("Semua")}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                            >
                                Tampilkan Semua Menu
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl text-green-600 mb-6">
                            Tentang Kami
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Kewirausahaan Rohis adalah kegiatan dari organisasi Rohis sekolah yang bertujuan untuk
                            mengembangkan jiwa kewirausahaan. Kami menyediakan makanan dan
                            minuman halal berkualitas untuk mendukung kegiatan kami sendiri.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Setiap pembelian Anda membantu mendukung kegiatan Rohis.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl text-green-600 mb-6">
                            Hubungi Kami
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Ada pertanyaan atau ingin memesan? Jangan ragu untuk menghubungi kami!
                        </p>
                        <a
                            href="https://wa.me/6285814567851"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Chat via WhatsApp
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer></Footer>
        </div>
    );
}