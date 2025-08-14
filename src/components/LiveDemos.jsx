import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

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

export default function LiveDemos() {
  return (
    <>
      <Helmet>
        <title>Live Demo Previews | StephensCode</title>
        <meta name="description" content="Explore high-end, interactive demo sites built by StephensCode for industries like healthcare, events, construction, e-commerce, and more." />
      </Helmet>

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
    </>
  );
}
