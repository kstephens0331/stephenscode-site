import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-20 px-6 bg-white text-gray-800" id="about">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-600">
            Bringing Your Vision to Life
          </h2>
          <p className="text-lg mb-4">
            Every celebration is a story — and we’re here to help you tell it, beautifully.
          </p>
          <p className="text-gray-600">
            From luxury weddings and baby showers to corporate galas and private dinners, we handle every detail with care, creativity, and confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            { stat: "300+", label: "Events Styled" },
            { stat: "12 yrs", label: "Industry Experience" },
            { stat: "5★", label: "Average Client Rating" },
            { stat: "50+", label: "Venue Partners" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="text-3xl font-bold text-pink-600">{item.stat}</p>
              <p className="text-sm mt-2 text-gray-700">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
