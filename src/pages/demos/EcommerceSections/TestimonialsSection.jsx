import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Amanda Lee",
    quote: "Absolutely love the quality. My order arrived in perfect condition and on time!",
    stars: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Marcus Wills",
    quote: "This has become my go-to shop. The customer service is just as good as the products.",
    stars: 4,
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    name: "Tina Zhao",
    quote: "Fantastic quality. I got compliments the first day I wore it.",
    stars: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-6 bg-white text-gray-800" id="testimonials">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-orange-600 mb-12"
        >
          What Customers Are Saying
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 rounded-lg shadow-lg p-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <FaStar key={s} size={14} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{t.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
