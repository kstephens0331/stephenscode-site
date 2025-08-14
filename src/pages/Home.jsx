// src/pages/Demos.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import HeroSection from "../components/HeroSection";
import FounderMessage from "../components/FounderMessage";
import WhyChoose from "../components/WhyChoose";
// import IndustryBlock from "../components/IndustryBlock"; // optional

import {
  FaTools,
  FaUserShield,
  FaHospitalSymbol,
  FaCalendarAlt,
  FaShieldAlt,
  FaWarehouse,
  FaShoppingCart,
} from "react-icons/fa";

// ✅ Import images from /src so Vite handles them correctly
import logo from "../assets/logo.png"; // replace with per-demo thumbnails when available

export default function Demos() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState("");

  // ---------- DEMO DATA ----------
  const portalDemos = [
    {
      title: "Demo Admin Portal",
      image: logo,
      link: "/demos/admin-portal",
      icon: FaUserShield,
    },
    {
      title: "Demo Customer Portal",
      image: logo,
      link: "/demos/customer-portal",
      icon: FaTools,
    },
    {
      title: "Demo E‑Commerce",
      image: logo,
      link: "/demos/ecommerce",
      icon: FaShoppingCart,
    },
  ];

  const categoryDemos = [
    {
      title: "Demo Healthcare",
      image: logo,
      link: "/demos/healthcare",
      icon: FaHospitalSymbol,
    },
    {
      title: "Demo Event Coordination",
      image: logo,
      link: "/demos/event",
      icon: FaCalendarAlt,
    },
    {
      title: "Demo Security",
      image: logo,
      link: "/demos/security",
      icon: FaShieldAlt,
    },
    {
      title: "Demo Construction",
      image: logo,
      link: "/demos/construction",
      icon: FaWarehouse,
    },
  ];
  // --------------------------------

  const openLightbox = (image, title) => {
    setLightboxImage(image);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <>
      <Helmet>
        <title>StephensCode | Live Demos</title>
        <meta
          name="description"
          content="Explore live demo previews for portals and industry solutions from StephensCode."
        />
      </Helmet>

      <motion.div
        className="overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Top sections (optional) */}
        <HeroSection />
        <WhyChoose />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FounderMessage />
        </motion.div>
        {/* <IndustryBlock /> */}

        {/* ---------- DEMO GRIDS ---------- */}
        <motion.section
          className="py-12 px-4 md:px-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            Live Demo Previews
          </h1>

          {/* Portal demos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {portalDemos.map((demo) => (
              <article
                key={demo.link}
                className="bg-[#111] rounded-lg overflow-hidden shadow-lg border border-[#333] hover:scale-[1.02] transition-transform"
              >
                <button
                  type="button"
                  className="relative w-full cursor-pointer"
                  onClick={() => openLightbox(demo.image, demo.title)}
                  aria-label={`Open preview for ${demo.title}`}
                >
                  <div className="aspect-[16/9] w-full bg-black/40 overflow-hidden">
                    <img
                      src={demo.image}
                      alt={demo.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 left-0 m-2 text-white text-2xl bg-orange-600 rounded-full p-2 shadow">
                    <demo.icon />
                  </div>
                </button>

                <div className="p-4 text-center text-white font-semibold">
                  <Link to={demo.link} className="hover:underline">
                    {demo.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-center text-orange-500 mb-8">
            Industry Demo Previews
          </h2>

          {/* Industry demos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryDemos.map((demo) => (
              <article
                key={demo.link}
                className="bg-[#111] rounded-lg overflow-hidden shadow-lg border border-[#333] hover:scale-[1.02] transition-transform"
              >
                <button
                  type="button"
                  className="relative w-full cursor-pointer"
                  onClick={() => openLightbox(demo.image, demo.title)}
                  aria-label={`Open preview for ${demo.title}`}
                >
                  <div className="aspect-[16/9] w-full bg-black/40 overflow-hidden">
                    <img
                      src={demo.image}
                      alt={demo.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 left-0 m-2 text-white text-2xl bg-orange-600 rounded-full p-2 shadow">
                    <demo.icon />
                  </div>
                </button>

                <div className="p-4 text-center text-white font-semibold">
                  <Link to={demo.link} className="hover:underline">
                    {demo.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        {/* ---------- LIGHTBOX ---------- */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxTitle}
          >
            <img
              src={lightboxImage}
              alt={lightboxTitle}
              className="max-w-[95vw] max-h-[85vh] rounded shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </motion.div>
    </>
  );
}
