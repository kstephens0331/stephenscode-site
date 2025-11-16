import React from "react";

export default function ContactSection() {
  return (
    <section className="py-16 bg-gray-50 text-gray-800" id="contact">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold uppercase text-orange-600 mb-4">
          Get in Touch
        </h2>
        <p className="text-lg mb-8 text-gray-600">
          We’re here to bring your vision to life. Let’s start the conversation—reach out today!
        </p>
        <form className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition"
          />
          <textarea
            placeholder="Your Message"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-600 text-white font-semibold px-6 py-3 rounded hover:bg-orange-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
