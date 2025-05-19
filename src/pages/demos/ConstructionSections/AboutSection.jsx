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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
            About Our Company
          </h2>
          <p className="text-lg mb-4">
            With decades of experience and a passion for excellence, we build more than structures — we build trust.
          </p>
          <p className="text-gray-600">
            Our mission is simple: deliver top-tier construction services while treating every home or site as if it were our own. We specialize in fencing, landscaping, structural builds, and emergency repairs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            { stat: "15+", label: "Years in Business" },
            { stat: "1,200+", label: "Projects Completed" },
            { stat: "24/7", label: "Emergency Response" },
            { stat: "100%", label: "Client Satisfaction" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="text-3xl font-bold text-orange-600">{item.stat}</p>
              <p className="text-sm mt-2 text-gray-700">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;