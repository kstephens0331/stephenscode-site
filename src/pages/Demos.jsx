import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaTools,
  FaUserShield,
  FaHospital,
  FaCalendarCheck,
  FaShieldAlt,
  FaWarehouse,
  FaShoppingCart,
} from "react-icons/fa";
import Lightbox from "../components/Lightbox";
import { useState } from "react";
import { Helmet } from "react-helmet";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
></motion.div>

export default function Demos() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState("");

  const portalDemos = [
    {
      title: "Admin Portal Demo",
      icon: FaTools,
      image: "/src/assets/logo.png",
      link: "/demos/admin-portal",
    },
    {
      title: "Customer Portal Demo",
      icon: FaUserShield,
      image: "/src/assets/logo.png",
      link: "/demos/customer-portal"
    },
  ];

  const categoryDemos = [
  {
    title: "Demo Healthcare",
    icon: FaHospital,
    image: "/src/assets/logo.png",
    link: "/demos/healthcare",
  },
  {
    title: "Demo Event Coordination",
    icon: FaCalendarCheck,
    image: "/src/assets/logo.png",
    link: "/demos/event",
  },
  {
    title: "Demo Security",
    icon: FaShieldAlt,
    image: "/src/assets/logo.png",
    link: "/demos/security",
  },
  {
    title: "Demo Construction",
    icon: FaWarehouse,
    image: "/src/assets/logo.png",
    link: "/demos/construction",
  },
  {
    title: "Demo E-Commerce",
    icon: FaShoppingCart,
    image: "/src/assets/logo.png",
    link: "/demos/ecommerce",
  },
];


  const DemoGrid = ({ demos, cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" }) => (
    <div className={`max-w-6xl mx-auto grid ${cols} gap-8 justify-items-center`}>
      {demos.map((demo, index) => {
        const Icon = demo.icon;
        return (
          <motion.div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-lg group border border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <motion.div
              className="absolute top-4 left-4 bg-orange-500 text-white p-2 rounded-full shadow-lg z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
            >
              <Icon className="text-xl" />
            </motion.div>

            {/* Image */}
            <img
              src={demo.image}
              alt={demo.title}
              className="w-full h-60 object-cover group-hover:scale-105 transition duration-500 cursor-pointer"
              onClick={() => {
                setLightboxImage(demo.image);
                setLightboxTitle(demo.title);
                setLightboxOpen(true);
              }}
            />

            {/* Hover CTA */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
              <Link
                to={demo.link}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded text-sm font-medium"
              >
                View Demo
              </Link>
            </div>

            {/* Title */}
            <div className="bg-[#1a1a1a] py-4 px-6">
              <h3 className="text-lg font-semibold">{demo.title}</h3>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <>

    <Helmet>
  <title>Live Demo Previews | StephensCode</title>
  <meta
    name="description"
    content="Explore demo websites, customer portals, and admin dashboards built from scratch. See what StephensCode can build for your business."
  />
</Helmet>

    <div className="bg-[#0e0e0e] text-white min-h-screen pt-28 pb-20 px-6">
      {/* Admin & Customer Demos */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-orange-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Back-Office & Customer Portal
      </motion.h1>

      <motion.p
        className="text-center text-lg text-gray-300 max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        These previews show what your admin team and customers would experience.
        Data is temporary and cleared after the session ends.
      </motion.p>

      {/* Admin/Customer Demos - 2 column max */}
      <DemoGrid demos={portalDemos} cols="grid-cols-1 sm:grid-cols-2" />

      {/* Industry Demos */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mt-24 mb-12 text-orange-400"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Industry Demo Previews
      </motion.h2>

      <DemoGrid demos={categoryDemos} />

      {/* Lightbox Image Viewer */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={lightboxImage}
        title={lightboxTitle}
      />
    </div>
    </>
  );
}
