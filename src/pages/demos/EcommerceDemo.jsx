import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaLock, FaStar, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function EcommerceDemoPage() {
  const categories = [
    {
      title: "Home Essentials",
      products: [
        { name: "Modern Desk Lamp", desc: "Illuminate your workspace in style.", price: "$89.99", salePrice: "$69.99", image: "https://source.unsplash.com/600x600/?lamp" },
        { name: "Eco Water Bottle", desc: "Stay hydrated wherever you go.", price: "$29.99", image: "https://source.unsplash.com/600x600/?water-bottle" },
        { name: "Desk Plant", desc: "Bring life to your workspace.", price: "$19.99", image: "https://source.unsplash.com/600x600/?plant" },
      ],
    },
    {
      title: "Electronics",
      products: [
        { name: "Wireless Headphones", desc: "Exceptional audio, no wires.", price: "$199.99", image: "https://source.unsplash.com/600x600/?headphones" },
        { name: "Mechanical Keyboard", desc: "Type with precision and comfort.", price: "$149.99", salePrice: "$119.99", image: "https://source.unsplash.com/600x600/?keyboard" },
        { name: "Smart Watch", desc: "Stay connected on the go.", price: "$249.99", image: "https://source.unsplash.com/600x600/?smartwatch" },
      ],
    },
    {
      title: "Lifestyle",
      products: [
        { name: "Yoga Mat", desc: "Balance and wellness wherever you are.", price: "$59.99", image: "https://source.unsplash.com/600x600/?yoga-mat" },
        { name: "Artisan Coffee", desc: "Fuel your day with premium blends.", price: "$24.99", salePrice: "$19.99", image: "https://source.unsplash.com/600x600/?coffee" },
        { name: "Leather Journal", desc: "Capture your thoughts in style.", price: "$39.99", image: "https://source.unsplash.com/600x600/?journal" },
      ],
    },
  ];

  const topSellers = [
    { name: "Classic Watch", desc: "Timeless elegance for any occasion.", price: "$299.99", image: "https://source.unsplash.com/600x600/?watch" },
    { name: "Urban Backpack", desc: "Carry your essentials with style.", price: "$129.99", image: "https://source.unsplash.com/600x600/?backpack" },
  ];

  return (
    <div
      className="font-sans text-gray-800 min-h-screen"
      style={{
        background: `
          linear-gradient(135deg, rgba(245, 245, 245, 1) 0%, rgba(255, 255, 255, 1) 100%)
        `,
      }}
    >
      {/* Hero */}
      <div className="relative h-[50vh] flex flex-col justify-center items-center text-center">
        <img
          src="https://source.unsplash.com/1600x900/?shopping,store"
          alt="Ecommerce Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Elevate Your Everyday
          </h1>
          <p className="text-gray-700 mb-6">
            Curated products to make your life brighter, easier, and more stylish.
          </p>
          <a
            href="#products"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition uppercase tracking-wider"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* About */}
      <section className="py-16 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-gray-900 mb-4">
          Our Story
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          From carefully crafted goods to mindful packaging, we’re passionate about delivering exceptional quality that aligns with your lifestyle. Explore our thoughtfully curated collection today.
        </p>
      </section>

      {/* Why Shop With Us */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-gray-800">Why Shop With Us</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          <div className="flex-1 min-w-[200px] p-4 border-t-4 border-blue-600">
            <h3 className="font-bold uppercase text-gray-800 mb-2 flex items-center justify-center gap-2">
              <FaShippingFast /> Free Shipping
            </h3>
            <p className="text-sm text-gray-600">On all orders over $50</p>
          </div>
          <div className="flex-1 min-w-[200px] p-4 border-t-4 border-blue-600">
            <h3 className="font-bold uppercase text-gray-800 mb-2 flex items-center justify-center gap-2">
              <FaLock /> Secure Checkout
            </h3>
            <p className="text-sm text-gray-600">Protected by SSL encryption</p>
          </div>
          <div className="flex-1 min-w-[200px] p-4 border-t-4 border-blue-600">
            <h3 className="font-bold uppercase text-gray-800 mb-2 flex items-center justify-center gap-2">
              <FaStar /> Top Quality
            </h3>
            <p className="text-sm text-gray-600">Handpicked, premium products</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold uppercase text-center mb-12 tracking-widest text-gray-900">
          Our Products
        </h2>

        {/* Top Sellers */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold uppercase text-gray-800 mb-4">Top Sellers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {topSellers.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
                <div className="p-4 text-center">
                  <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{product.desc}</p>
                  <p className="text-blue-600 font-semibold">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other categories */}
        {categories.map((category, cIdx) => (
          <div key={cIdx} className="mb-12">
            <h3 className="text-2xl font-bold uppercase text-gray-800 mb-4">{category.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {category.products.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
                  <div className="p-4 text-center">
                    <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{product.desc}</p>
                    {product.salePrice ? (
                      <div className="flex justify-center items-center gap-2">
                        <p className="text-red-600 line-through">{product.price}</p>
                        <p className="text-green-600 font-semibold">{product.salePrice}</p>
                      </div>
                    ) : (
                      <p className="text-blue-600 font-semibold">{product.price}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Contact */}
      <section id="contact" className="bg-blue-600 text-white py-16 text-center flex flex-col items-center">
        <h2 className="text-3xl font-extrabold uppercase tracking-widest mb-4">Connect With Us</h2>
        <p className="max-w-md text-blue-100 mb-6">Have questions or need help? Get in touch with us today.</p>
        <div className="flex flex-col gap-2 text-sm">
          <p className="flex items-center justify-center gap-2">
            <FaPhoneAlt /> (555) 789-0123
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaEnvelope /> support@ecommercedemo.com
          </p>
        </div>
      </section>

      <footer className="text-center text-xs text-gray-500 py-4">
        &copy; {new Date().getFullYear()} EcommerceDemo Co. All rights reserved.
      </footer>
    </div>
  );
}
