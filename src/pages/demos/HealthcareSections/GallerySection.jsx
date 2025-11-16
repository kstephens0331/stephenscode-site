import React from "react";
import { motion } from "framer-motion";

const galleryImages = [
  "https://source.unsplash.com/800x600/?clinic,hospital",
  "https://source.unsplash.com/800x601/?doctor,nurse",
  "https://source.unsplash.com/800x602/?healthcare,exam-room",
  "https://source.unsplash.com/800x603/?waiting-room,clinic",
  "https://source.unsplash.com/800x604/?pediatric,healthcare",
  "https://source.unsplash.com/800x605/?doctor,office",
];

const GallerySection = () => {
  return (
    <section className="py-20 px-6 bg-white text-gray-800" id="gallery">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-teal-600 mb-10"
        >
          Inside Our Clinics
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-lg shadow hover:shadow-xl transition"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <img
                src={src}
                alt={`Clinic Image ${i + 1}`}
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
