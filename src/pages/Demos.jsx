// src/pages/Demos.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaTools,
  FaUserShield,
  FaHospitalSymbol,
  FaCalendarAlt,
  FaShieldAlt,
  FaWarehouse,
  FaShoppingCart,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

export default function Demos() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState("");

  const portalDemos = [
    {
      title: "Admin Portal Demo",
      icon: FaTools,
      image: "/demo-images/admin-portal.png",
      link: "/demos/admin-portal",
    },
    {
      title: "Customer Portal Demo",
      icon: FaUserShield,
      image: "/demo-images/customer-portal.png",
      link: "/demos/customer-portal",
    },
  ];

  const categoryDemos = [
    {
      title: "Healthcare Demo",
      icon: FaHospitalSymbol,
      image: "/demo-images/healthcare-demo.png",
      link: "/demos/healthcare",
    },
    {
      title: "Event Coordination Demo",
      icon: FaCalendarAlt,
      image: "/demo-images/event-demo.png",
      link: "/demos/event",
    },
    {
      title: "Security Demo",
      icon: FaShieldAlt,
      image: "/demo-images/security-demo.png",
      link: "/demos/security",
    },
    {
      title: "Construction Demo",
      icon: FaWarehouse,
      image: "/demo-images/construction-demo.png",
      link: "/demos/construction",
    },
    {
      title: "E-Commerce Demo",
      icon: FaShoppingCart,
      image: "/demo-images/ecommerce-demo.png",
      link: "/demos/ecommerce",
    },
  ];

  const openLightbox = (image, title) => {
    setLightboxImage(image);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Live Demo Previews | StephensCode</title>
        <meta
          name="description"
          content="Explore demo websites, customer portals, and admin dashboards built from scratch. See what StephensCode can build for your business."
        />
      </Helmet>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {portalDemos.map((demo, index) => (
            <div
              key={index}
              className="bg-[#111] rounded-lg overflow-hidden shadow-lg border border-[#333] hover:scale-105 transition-transform"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => openLightbox(demo.image, demo.title)}
              >
                <img
                  src={demo.image}
                  alt={demo.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-0 left-0 m-2 text-white text-2xl bg-orange-600 rounded-full p-2 shadow">
                  <demo.icon />
                </div>
              </div>
              <div className="p-4 text-center text-white font-semibold">
                <Link to={demo.link} className="hover:underline">
                  {demo.title}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center text-orange-500 mb-8">
          Industry Demo Previews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryDemos.map((demo, index) => (
            <div
              key={index}
              className="bg-[#111] rounded-lg overflow-hidden shadow-lg border border-[#333] hover:scale-105 transition-transform"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => openLightbox(demo.image, demo.title)}
              >
                <img
                  src={demo.image}
                  alt={demo.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-0 left-0 m-2 text-white text-2xl bg-orange-600 rounded-full p-2 shadow">
                  <demo.icon />
                </div>
              </div>
              <div className="p-4 text-center text-white font-semibold">
                <Link to={demo.link} className="hover:underline">
                  {demo.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={lightboxImage}
            alt={lightboxTitle}
            className="max-w-full max-h-full rounded shadow-lg"
          />
        </div>
      )}
    </>
  );
}
