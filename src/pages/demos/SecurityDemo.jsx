import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaRegStar,
  FaRegClock,
} from "react-icons/fa";

export default function FlagshipSecurityDemo() {
  return (
    <div className="font-sans text-gray-100 min-h-screen bg-gray-900">
      {/* Hero */}
      <div className="relative h-[50vh] flex flex-col justify-center items-center text-center bg-black">
        <img
          src="https://source.unsplash.com/1600x900/?security,guard"
          alt="Armed Security"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest mb-4 text-white">
            Professional Armed Security
          </h1>
          <p className="text-gray-300 mb-4">
            Protecting your property, personnel, and peace of mind with licensed and insured armed security professionals.
          </p>
          <div className="flex justify-center gap-4 mb-4 text-sm text-gray-300">
            <span>10+ Years Experience</span>
            <span>•</span>
            <span>24/7 Service</span>
            <span>•</span>
            <span>Licensed & Insured</span>
          </div>
          <a
            href="#contact"
            className="inline-block px-6 py-2 bg-red-600 text-white font-semibold rounded shadow hover:bg-red-700 transition uppercase tracking-wider"
          >
            Request Assessment
          </a>
          <div className="mt-2">
            <a href="#about" className="text-gray-400 text-sm hover:text-white">
              Learn more &darr;
            </a>
          </div>
        </div>
      </div>

      {/* About */}
      <section id="about" className="py-16 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-white mb-4">
          Our Mission
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-8">
          Since 2012, we’ve delivered armed security solutions that uphold the highest standards of vigilance, integrity, and professionalism. Our mission: provide unmatched protection for your business, events, and personnel—no compromises.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-left">
          <div className="flex gap-3 items-start">
            <FaCheckCircle className="text-red-600 text-2xl" />
            <div>
              <h3 className="font-bold text-white">Fully Licensed & Insured</h3>
              <p className="text-gray-400 text-sm">
                Total peace of mind—no shortcuts.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <FaRegStar className="text-red-600 text-2xl" />
            <div>
              <h3 className="font-bold text-white">Military & Law Enforcement Trained</h3>
              <p className="text-gray-400 text-sm">
                Experience that stands out.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <FaRegClock className="text-red-600 text-2xl" />
            <div>
              <h3 className="font-bold text-white">24/7 Availability</h3>
              <p className="text-gray-400 text-sm">
                Always ready when you need us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-800 py-12 px-4 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-6">
          Why Choose Us
        </h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          <div className="flex-1 min-w-[200px] p-4 border-t-4 border-red-600">
            <h3 className="font-bold uppercase text-white mb-2">Rapid Response</h3>
            <p className="text-sm text-gray-400">
              We’re there when it matters most.
            </p>
          </div>
          <div className="flex-1 min-w-[200px] p-4 border-t-4 border-red-600">
            <h3 className="font-bold uppercase text-white mb-2">Discreet & Professional</h3>
            <p className="text-sm text-gray-400">
              Armed presence without compromise.
            </p>
          </div>
          <div className="flex-1 min-w-[200px] p-4 border-t-4 border-red-600">
            <h3 className="font-bold uppercase text-white mb-2">Fully Customizable</h3>
            <p className="text-sm text-gray-400">
              Tailored security for your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold uppercase text-center mb-12 tracking-widest text-white">
          Our Services
        </h2>
        <div className="space-y-6">
          {[
            { title: "24/7 Armed Patrols", desc: "Vigilant patrols around the clock—your safety is our mission." },
            { title: "Access Control", desc: "Securing entry points with professional armed presence." },
            { title: "Executive Protection", desc: "VIP-level security with unmatched professionalism." },
            { title: "Incident Response", desc: "Trained and ready for any situation, anytime." },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gray-800 p-6 rounded-lg shadow flex flex-col items-center text-center hover:shadow-lg transition transform hover:scale-105"
            >
              <FaShieldAlt className="text-red-600 text-3xl mb-4" />
              <h3 className="text-xl font-bold uppercase mb-2 text-white">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="bg-red-600 text-white py-16 text-center flex flex-col items-center"
      >
        <h2 className="text-3xl font-extrabold uppercase tracking-widest mb-4">Let’s Secure Your Future</h2>
        <p className="max-w-md text-gray-200 mb-6">
          Book your security assessment today and experience the difference of elite armed protection.
        </p>
        <div className="flex flex-col gap-2 text-sm">
          <p className="flex items-center justify-center gap-2">
            <FaPhoneAlt /> (555) 456-7890
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaEnvelope /> armed@securitypro.com
          </p>
        </div>
      </section>

      <footer className="text-center text-xs text-gray-500 py-4 bg-gray-900">
        &copy; {new Date().getFullYear()} Armed Guard Security Co. All rights reserved.
      </footer>
    </div>
  );
}
