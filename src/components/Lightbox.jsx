// src/components/Lightbox.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ isOpen, onClose, image, title }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative max-w-4xl w-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-orange-400 transition"
          >
            &times;
          </button>
          <img
            src={image}
            alt={title}
            className="w-full rounded-lg shadow-lg border border-gray-700"
          />
          <p className="text-center text-white text-lg mt-4">{title}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}