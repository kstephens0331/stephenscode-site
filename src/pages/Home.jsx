import HeroSection from '../components/HeroSection';
import FounderMessage from '../components/FounderMessage';
import WhyChoose from '../components/WhyChoose';
import LiveDemos from '../components/LiveDemos';
import IndustryBlock from '../components/IndustryBlock'; // optional
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async";

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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <LiveDemos />
        </motion.div>

        {/* Optional: IndustryBlock for variety */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <IndustryBlock />
        </motion.div>
      </motion.div>
    </>
  );
}
