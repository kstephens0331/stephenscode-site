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
          className="text-4xl font-bold text-center text-orange-600 mb-10"
        >
          Request a Free Quote
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
                placeholder="John Doe"
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Service Needed</label>
            <select className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="">Select a service...</option>
              <option value="fencing">Fencing & Gates</option>
              <option value="landscaping">Landscaping</option>
              <option value="metal">Metal Buildings</option>
              <option value="handyman">Handyman Services</option>
              <option value="emergency">Emergency Repair</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Project Details</label>
            <textarea
              rows="4"
              placeholder="Tell us about your project..."
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white py-3 px-6 rounded text-center text-lg font-semibold hover:bg-orange-700 transition"
          >
            Submit Request
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default QuoteRequestSection;
