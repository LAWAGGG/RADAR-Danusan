import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InfiniteScrollProducts from "../components/InfiniteScrollProducts";

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

    // Get unique categories from data
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">

            {/* Header Section */}
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-700 to-green-800 text-white py-20 px-25 flex flex-col items-center justify-center shadow-lg"
            >

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
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                    className="relative z-10 text-center"
                >
                    <motion.div
                        className="absolute top-16 right-20 md:top-6 md:left-154 -rotate-20 md:-rotate-48  text-4xl md:text-6xl"
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

                    <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-lg tracking-wide">
                        kewirausahaan <span className="bg-gradient-to-b from-green-200  to-green-400  text-transparent bg-clip-text">Rohis</span>

                        <motion.span
                            className="absolute hiddenz md:block top-25 md:top-18 left-[32%] md:left-[30%] h-[5px] bg-green-100 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "35%" }}
                            transition={{
                                delay: 2,
                                duration: 0.6,
                                ease: "easeInOut"
                            }}
                        ></motion.span>

                        <motion.span
                            className="absolute block md:hidden top-13 left-[-0%] h-[5px] bg-green-300 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "28%" }}
                            transition={{
                                delay: 1.5,
                                duration: 0.6,
                                ease: "easeInOut"
                            }}
                        ></motion.span>

                        <motion.span
                            className="absolute block md:hidden top-13 left-[70%] h-[5px] bg-green-300 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "28%" }}
                            transition={{
                                delay: 1.8,
                                duration: 0.6,
                                ease: "easeInOut"
                            }}
                        ></motion.span>
                    </motion.h1>


                </motion.div>
            </motion.header>

            {/* Products Section */}
            <section id="produk" className="py-8 px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="container mx-auto"
                >
                    {/* Section Header */}
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

                        {/* Selected Category Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-center mb-6"
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="text-gray-500 text-xl"
                            >
                                Geser kesamping untuk melihat lebih banyak menu ↓
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Infinite Scroll Container */}
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

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-green-800 text-white text-center py-8 mt-12"
            >
                <div className="container mx-auto px-4">
                    <p className="text-lg font-semibold mb-2">&copy; RADAR SMKN10</p>
                </div>
            </motion.footer>
        </div>
    );
}