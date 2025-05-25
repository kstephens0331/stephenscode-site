// src/pages/Packages.jsx
import { motion } from "framer-motion";
import CorePackages from "../components/CorePackages";
import AddOnsGrid from "../components/AddOnsGrid";
import PremiumPackages from "../components/PremiumPackages";
import ComparisonTable from "../components/ComparisonTable";
import { Helmet } from "react-helmet-async";


<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
></motion.div>

export default function Packages() {
  return (
    <>
    <Helmet>
  <title>Website & Admin System Packages | StephensCode</title>
  <meta name="description" content="Explore flat-rate packages for websites, dashboards, and admin tools. No hidden fees, no templates — just powerful custom builds." />
</Helmet>

    <div className="bg-[#0e0e0e] text-white min-h-screen pt-28 pb-20 px-6">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-orange-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Website & System Packages
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <CorePackages />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <PremiumPackages />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <AddOnsGrid />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ComparisonTable />
      </motion.div>
    </div>
    </>
  );
}
