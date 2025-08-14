import HeroSection from '../components/HeroSection';
import FounderMessage from '../components/FounderMessage';
import WhyChoose from '../components/WhyChoose';
import LiveDemos from '../components/LiveDemos';
import IndustryBlock from '../components/IndustryBlock'; // optional
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async";

const demoSites = [
  {
    title: "Demo Healthcare",
    image: "/src/assets/logo.png",
    link: "/demos/healthcare",
  },
  {
    title: "Demo Event Coordination",
    image: "/src/assets/logo.png",
    link: "/demos/event",
  },
  {
    title: "Demo Security",
    image: "/src/assets/logo.png",
    link: "/demos/security",
  },
  {
    title: "Demo Construction",
    image: "/src/assets/logo.png",
    link: "/demos/construction",
  },
  {
    title: "Demo E-Commerce",
    image: "/src/assets/logo.png",
    link: "/demos/ecommerce",
  },
  {
    title: "Demo Admin Portal",
    image: "/src/assets/logo.png",
    link: "/demos/admin-portal",
  },
  {
    title: "Demo Customer Portal",
    image: "/src/assets/logo.png",
    link: "/demos/customer-portal",
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>StephensCode | Custom Websites & Business Systems</title>
        <meta
          name="description"
          content="Veteran-owned dev agency specializing in flat-rate custom websites, admin dashboards, portals, and automation tools for growing businesses."
        />
      </Helmet>

      <motion.div
        className="overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
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

        {/* Optional: IndustryBlock for variety */}
      <section className="bg-[#111] text-white py-20 px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Live Demos
        </motion.h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {demoSites.map((site, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg group border border-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              {/* Background Preview */}
              <img
                src={site.image}
                alt={site.title}
                className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 space-x-4">
                <a
                  href={site.link}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded text-sm font-medium"
                >
                  View Demo
                </a>
                <button
                  onClick={() => alert("Lightbox preview coming soon")} // Replace with real preview modal
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded text-sm"
                >
                  Preview
                </button>
              </div>

              {/* Title */}
              <div className="bg-[#1a1a1a] py-4 px-6">
                <h3 className="text-lg font-semibold">{site.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      </motion.div>
    </>
  );
}
