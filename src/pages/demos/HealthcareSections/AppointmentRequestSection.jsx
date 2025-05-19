import React from "react";
import { motion } from "framer-motion";

const AppointmentRequestSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 text-gray-800" id="appointment">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-teal-600 mb-10"
        >
          Book an Appointment
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
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="jane@example.com"
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Reason for Visit</label>
            <textarea
              rows="4"
              placeholder="Describe symptoms or request"
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Preferred Date</label>
              <input
                type="date"
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Preferred Time</label>
              <input
                type="time"
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-600 text-white py-3 px-6 rounded text-center text-lg font-semibold hover:bg-teal-700 transition"
          >
            Submit Request
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default AppointmentRequestSection;
