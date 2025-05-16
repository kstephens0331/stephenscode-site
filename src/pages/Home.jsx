// src/pages/Home.jsx
import HeroSection from '../components/HeroSection';
import CorePackages from '../components/CorePackages';
import AddOnsGrid from '../components/AddOnsGrid';
import IndustryBlock from '../components/IndustryBlock';
import PremiumPackages from '../components/PremiumPackages';
import ComparisonTable from '../components/ComparisonTable';
import FounderMessage from '../components/FounderMessage';
import WhyChoose from '../components/WhyChoose';
import LiveDemos from '../components/LiveDemos';
import { motion } from 'framer-motion';

export default function Home() {
  return (
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
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >

        <CorePackages />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <AddOnsGrid />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <IndustryBlock />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <PremiumPackages />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ComparisonTable />
      </motion.div>
    </motion.div>
  );
}