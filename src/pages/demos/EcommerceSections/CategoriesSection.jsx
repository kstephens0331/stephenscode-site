import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Apparel",
    image: "https://source.unsplash.com/600x400/?clothing,apparel",
  },
  {
    title: "Accessories",
    image: "https://source.unsplash.com/600x400/?accessories,watch",
  },
  {
    title: "Footwear",
    image: "https://source.unsplash.com/600x400/?footwear,shoes",
  },
  {
    title: "Tech Gear",
    image: "https://source.unsplash.com/600x400/?headphones,gadget",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 text-gray-800" id="categories">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-orange-600 mb-10"
        >
          Shop by Category
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="overflow-hidden rounded-lg shadow group hover:shadow-lg transition"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="bg-white p-4">
                <h3 className="text-lg font-semibold">{cat.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
