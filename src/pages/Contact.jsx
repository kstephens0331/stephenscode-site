import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet";


<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
></motion.div>

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Helmet>
        <title>Contact | Start Your Project with StephensCode</title>
        <meta name="description" content="Have questions or ready to start building? Get in touch with StephensCode — we respond personally within 24 hours." />
      </Helmet>

    <div className="bg-[#0e0e0e] text-white min-h-full pt-28 pb-20 px-6">
      {/* Page Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-orange-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Let’s Build Something Together
      </motion.h1>

      <motion.p
        className="text-center text-lg text-gray-300 max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Whether you’re ready to start or just exploring ideas — reach out. I’d love to hear about your project and how I can help.
      </motion.p>

      {!submitted ? (
        <motion.form
          className="max-w-xl mx-auto bg-[#1a1a1a] p-8 rounded-xl shadow-md space-y-6"
          action="https://formspree.io/f/xjkwlrja"
          method="POST"
          onSubmit={() => setSubmitted(true)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Hidden Fields */}
          <input type="hidden" name="_subject" value="New Contact via StephensCode.com" />
          <input type="hidden" name="_redirect" value="/thanks" />

          {/* What Happens Next */}
          <p className="text-gray-400 text-sm text-center">
            I personally respond to every inquiry within 1 business day — usually much faster.
          </p>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Dropdown */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium mb-1 text-gray-300">
              What are you looking for?
            </label>
            <select
              name="service"
              required
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select an option</option>
              <option value="Website Build">Website Build</option>
              <option value="System Dashboard">System Dashboard</option>
              <option value="Admin Portal">Admin Portal</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Not Sure Yet">Not Sure Yet</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 text-white font-semibold rounded"
          >
            Send Message
          </button>
        </motion.form>
      ) : (
        <motion.div
          className="text-center text-lg text-green-400 font-medium mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ Thank you! Your message has been sent — I’ll be in touch soon.
        </motion.div>
      )}

      {/* Direct Email Fallback */}
      <motion.div
        className="text-center mt-8 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Prefer email? Reach me directly at{" "}
        <a
          href="mailto:info@stephenscode.dev"
          className="text-orange-400 hover:underline"
        >
          info@stephenscode.dev
        </a>
      </motion.div>

      {/* CTA Section */}
       <motion.div
        className="mt-20 text-center max-w-2xl mx-auto pb-0 mb-0"
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         viewport={{ once: true }}
        >
        <h2 className="text-2xl font-bold text-orange-400 mb-3">Need ideas first?</h2>
        <p className="text-gray-300">
          Check out our{" "}
          <a href="/demos" className="text-orange-400 hover:underline">
            Live Demos
          </a>{" "}
          or see what’s included in the{" "}
          <a href="/packages" className="text-orange-400 hover:underline">
            Packages
          </a>{" "}
          page.
        </p>
      </motion.div>
    </div>
    </>
  );
}
