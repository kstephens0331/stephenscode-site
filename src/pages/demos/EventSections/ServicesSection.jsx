import React from "react";
import { motion } from "framer-motion";
import {
  FaGlassCheers,
  FaBaby,
  FaBriefcase,
  FaHeart,
  FaCouch,
  FaCalendarAlt,
} from "react-icons/fa";

const services = [
  { title: "Weddings", icon: <FaHeart /> },
  { title: "Baby Showers", icon: <FaBaby /> },
  { title: "Corporate Events", icon: <FaBriefcase /> },
  { title: "Private Parties", icon: <FaGlassCheers /> },
  { title: "Event Rentals", icon: <FaCouch /> },
  { title: "Day-Of Coordination", icon: <FaCalendarAlt /> },
];

const ServicesSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 text-gray-800" id="services">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-pink-600 mb-10"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition text-center"
            >
              <div className="text-4xl text-pink-500 mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
