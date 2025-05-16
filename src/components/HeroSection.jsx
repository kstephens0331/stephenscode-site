import { motion } from "framer-motion";
import {
  SiReact,
  SiTailwindcss,
  SiFirebase,
  SiPostgresql,
  SiStripe,
  SiFastapi,
} from "react-icons/si";

const techStack = [
  { icon: SiReact, label: "React" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiFirebase, label: "Firebase" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiStripe, label: "Stripe" },
  { icon: SiFastapi, label: "FastAPI" },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-black via-[#111] to-[#1a1a1a] text-white">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Custom-Built. Fully Yours.
        <br />
        <span className="text-orange-400">Shockingly Affordable.</span>
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        We build professional websites and back-end systems for real businesses — starting at just <strong>$350</strong>.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <a
          href="#pricing"
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
        >
          View Packages
        </a>
        <a
          href="#demos"
          className="px-6 py-3 border border-gray-400 text-white hover:bg-white hover:text-black rounded-md transition"
        >
          See Live Demos
        </a>
      </motion.div>

      {/* Tech stack icons with tooltips */}
      <motion.div
        className="absolute bottom-10 flex gap-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {techStack.map(({ icon: Icon, label }, index) => (
          <div key={index} className="relative group">
            <Icon className="text-3xl text-gray-400 hover:text-white transition duration-300" />
            <div className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
              {label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
