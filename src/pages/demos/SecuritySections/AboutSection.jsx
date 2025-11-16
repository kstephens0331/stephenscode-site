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
            Securing What Matters Most
          </h2>
          <p className="text-lg mb-4">
            We specialize in providing 24/7 monitored security systems for homes, small businesses, and large commercial properties.
          </p>
          <p className="text-gray-600">
            Our certified technicians install the latest surveillance, alarm, and automation tech — all backed by rapid emergency response and mobile control.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            { stat: "20+", label: "Years of Protection" },
            { stat: "99.9%", label: "System Uptime" },
            { stat: "50K+", label: "Alerts Handled" },
            { stat: "100%", label: "Client Trust Rate" },
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
