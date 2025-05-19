import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Modern Canvas Jacket",
    price: "$120",
    image: "https://source.unsplash.com/800x800/?jacket,fashion",
    rating: 5,
  },
  {
    id: 2,
    name: "Minimalist Sneakers",
    price: "$95",
    image: "https://source.unsplash.com/800x800/?sneakers,shoes",
    rating: 4,
  },
  {
    id: 3,
    name: "Essential Hoodie",
    price: "$68",
    image: "https://source.unsplash.com/800x800/?hoodie,clothing",
    rating: 4,
  },
  {
    id: 4,
    name: "Performance Duffel",
    price: "$145",
    image: "https://source.unsplash.com/800x800/?duffel,bag",
    rating: 5,
  },
];

const FeaturedProductsSection = () => {
  return (
    <section className="py-20 px-6 bg-white text-gray-800" id="products">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-orange-600 mb-10"
        >
          Featured Products
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.price}</p>
              <div className="flex items-center justify-center mt-2 text-yellow-500">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded text-sm font-medium transition">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
