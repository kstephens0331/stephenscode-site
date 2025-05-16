import { motion } from "framer-motion";

const demoSites = [
  {
    title: "Demo Healthcare",
    image: "/src/assets/previews/demo-healthcare.png",
    link: "#",
  },
  {
    title: "Demo Event Coordination",
    image: "/src/assets/previews/demo-events.png",
    link: "#",
  },
  {
    title: "Demo Security",
    image: "/src/assets/previews/demo-security.png",
    link: "#",
  },
  {
    title: "Demo Construction",
    image: "/src/assets/previews/demo-construction.png",
    link: "#",
  },
  {
    title: "Demo E-Commerce",
    image: "/src/assets/previews/demo-ecommerce.png",
    link: "#",
  },
];

export default function LiveDemos() {
  return (
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
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            {/* Background Preview */}
            <img
              src={site.image}
              alt={site.title}
              className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
              <a
                href={site.link}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded text-sm font-medium"
              >
                View Demo
              </a>
            </div>

            {/* Title */}
            <div className="bg-[#1a1a1a] py-4 px-6">
              <h3 className="text-lg font-semibold">{site.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}