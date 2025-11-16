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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-600">
            Our Mission
          </h2>
          <p className="text-lg mb-4">
            We believe in providing accessible, comprehensive healthcare to every patient — from routine checkups to urgent needs.
          </p>
          <p className="text-gray-600">
            With a compassionate team of physicians and modern facilities, we make high-quality care simple and personal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            { stat: "25K+", label: "Patients Treated" },
            { stat: "4.9★", label: "Average Rating" },
            { stat: "20+", label: "Certified Providers" },
            { stat: "15 yrs", label: "Serving Our Community" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="text-3xl font-bold text-teal-600">{item.stat}</p>
              <p className="text-sm mt-2 text-gray-700">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
