import React from "react";
import { motion } from "framer-motion";
import {
  FaGlassCheers,
  FaBaby,
  FaBriefcase,
  FaHeart,
  FaCouch,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function WhimsicalEventDemo() {
  const services = [
    { title: "Weddings", icon: <FaHeart /> },
    { title: "Baby Showers", icon: <FaBaby /> },
    { title: "Corporate Events", icon: <FaBriefcase /> },
    { title: "Private Parties", icon: <FaGlassCheers /> },
    { title: "Event Rentals", icon: <FaCouch /> },
    { title: "Day-Of Coordination", icon: <FaCalendarAlt /> },
  ];

  return (
    <div
      className="relative font-sans text-gray-800 min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.4) 10%, transparent 10%),
          radial-gradient(circle at 80% 80%, rgba(144, 238, 144, 0.4) 10%, transparent 10%),
          radial-gradient(circle at 50% 50%, rgba(255, 192, 203, 0.3) 10%, transparent 10%),
          radial-gradient(circle at 70% 30%, rgba(144, 238, 144, 0.3) 10%, transparent 10%),
          linear-gradient(to bottom right, #ffe4e6, #d1fae5, #ffffff)
        `,
        backgroundSize:
          "100px 100px, 150px 150px, 120px 120px, 180px 180px, cover",
      }}
    >
      {/* Hero */}
      <section className="py-20 text-center font-[cursive]">
        <div className="max-w-3xl mx-auto px-4 bg-white/80 backdrop-blur rounded-xl shadow">
          <h1 className="text-5xl font-extrabold text-pink-600 mb-4 leading-tight">
            Let’s Make Magic Together!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Whimsical, wonderful events designed with heart and sprinkled with a touch of magic.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-pink-500 text-white font-semibold rounded-full shadow hover:bg-pink-600 transition"
          >
            Start Your Journey
          </a>
        </div>
      </section>

      {/* About */}
      <section className="py-16 flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto px-4">
        <div className="md:w-1/2 bg-white/80 backdrop-blur rounded-xl shadow p-6 text-center md:text-left">
          <h2 className="text-3xl font-bold uppercase text-pink-600 mb-4 tracking-wider">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            With a passion for curating unforgettable experiences, our team brings creativity, precision, and a touch of magic to every event.
          </p>
          <p className="text-lg text-gray-600">
            From intimate soirées to grand celebrations, we believe in connection and authenticity.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="bg-pink-200 rounded-full w-48 h-48 flex items-center justify-center text-pink-600 font-extrabold text-2xl shadow-inner">
            Dream Big
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-pink-600 mb-10 text-center"
        >
          Our Services
        </motion.h2>

        <div className="space-y-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex flex-col md:flex-row ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              } items-center gap-8 bg-white/80 backdrop-blur rounded-xl shadow p-6`}
            >
              <div className="text-4xl text-pink-500 flex-shrink-0">{service.icon}</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 text-sm">
                  Planning and coordination with a sprinkle of magic, tailored to your vision.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer
        id="contact"
        className="py-16 px-6 max-w-4xl mx-auto text-center bg-white/80 backdrop-blur rounded-xl shadow"
      >
        <h3 className="text-2xl font-bold text-pink-600 mb-4">Connect With Us</h3>
        <p className="flex items-center justify-center gap-2 mb-3">
          <FaPhoneAlt className="text-pink-500" /> (555) 456-7890
        </p>
        <p className="flex items-center justify-center gap-2 mb-3">
          <FaEnvelope className="text-pink-500" /> events@coordination-demo.com
        </p>
        <p className="flex items-center justify-center gap-2">
          <FaMapMarkerAlt className="text-pink-500" />
          202 Celebration Lane, Suite 100, Blossom City, NY 10002
        </p>
        <div className="text-center mt-12 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EventDemo Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
