import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
></motion.div>

export default function Thanks() {
  return (
    <>

    <Helmet>
  <title>Message Received | StephensCode</title>
  <meta name="description" content="Thank you for contacting StephensCode. We'll be in touch shortly." />
</Helmet>

    <div className="bg-[#0e0e0e] text-white min-h-screen pt-28 pb-20 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-6">
          Thank You!
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          I appreciate you reaching out — I’ll personally review your message and respond as soon as possible.
          In the meantime, feel free to explore the rest of the site or check out live demos.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-white font-semibold transition"
          >
            Back to Home
          </Link>
          <Link
            to="/demos"
            className="border border-orange-500 px-6 py-3 rounded text-orange-400 hover:bg-orange-500 hover:text-white font-semibold transition"
          >
            View Live Demos
          </Link>
        </div>
      </motion.div>
    </div>
    </>
  );
}
