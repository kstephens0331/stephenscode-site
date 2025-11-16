import React from "react";
import { motion } from "framer-motion";

const QuoteRequestSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 text-gray-800" id="quote">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-pink-600 mb-10"
        >
          Let's Plan Your Event
        </motion.h2>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg p-8 grid gap-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="jane@example.com"
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Event Type</label>
              <select className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400">
                <option>Select type...</option>
                <option>Wedding</option>
                <option>Baby Shower</option>
                <option>Corporate Event</option>
                <option>Birthday/Private Party</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Guest Count</label>
              <input
                type="number"
                placeholder="150"
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Event Date</label>
            <input
              type="date"
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Vision / Notes</label>
            <textarea
              rows="4"
              placeholder="Describe your ideal event..."
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 text-white py-3 px-6 rounded text-center text-lg font-semibold hover:bg-pink-700 transition"
          >
            Submit Request
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default QuoteRequestSection;
