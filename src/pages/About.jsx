import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
></motion.div>

export default function About() {
  return (
    <>
     <Helmet>
        <title>About StephensCode | Veteran-Owned Web Dev</title>
        <meta name="description" content="StephensCode was founded by Kyle Stephens, a Marine Corps veteran and full-stack developer building powerful tools for real businesses." />
      </Helmet>

    <div className="bg-[#0e0e0e] text-white min-h-screen pt-28 pb-20 px-6">
      {/* Page Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-orange-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About StephensCode
      </motion.h1>

      {/* Founder Intro */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4 text-orange-400">Meet the Founder</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          I'm Kyle Stephens — founder of StephensCode, a full-stack developer, a husband of 12 years, and a dad to five incredible daughters.
          I’m focused on building powerful, custom-made business systems that actually make life easier for real business owners.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed mt-6">
          Before launching StephensCode, I served as a <span className="text-white font-semibold">machine gunner in the United States Marine Corps</span>.
          That experience shaped my approach to everything I do: discipline, clarity, accountability, and getting the job done no matter what.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed mt-6">
          After the military, I saw too many small businesses being underserved — stuck with overpriced template sites or tools that didn’t fit.
          I knew I could build something better: modern, flexible systems that were built around real business needs — not just design trends.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed mt-6">
          When you work with me, you’re not getting an agency runaround. You’re getting a direct partner who listens, builds with care, and delivers systems you own — built for long-term success.
        </p>
      </motion.div>

      {/* What I Build */}
      <motion.div
        className="max-w-4xl mx-auto mt-24 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4 text-orange-400">What I Build</h2>
        <ul className="text-left text-gray-300 list-disc list-inside space-y-2 max-w-2xl mx-auto text-lg">
          <li>Custom websites and landing pages</li>
          <li>Admin portals for internal operations</li>
          <li>Quote builders, product catalogs, and pricing tools</li>
          <li>Secure login systems and customer portals</li>
          <li>Email automation and Stripe billing integrations</li>
          <li>Industry-specific tools (VPN, construction, events, e-commerce, healthcare)</li>
        </ul>
      </motion.div>

      {/* My Approach */}
      <motion.div
        className="max-w-4xl mx-auto mt-24 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4 text-orange-400">How I Work</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          I keep everything lean, honest, and personal — no outsourced teams, no unnecessary upsells, and no surprises.
          Just clean communication, smart development, and powerful tools that actually help.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed mt-6">
          If something won’t help your business, I’ll tell you. If there’s a more efficient or scalable way to do it,
          I’ll build it. That’s how I’d want to be treated — so that’s how I work.
        </p>
      </motion.div>

      {/* What You Can Expect */}
      <motion.div
        className="max-w-4xl mx-auto mt-24 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4 text-orange-400">What You Can Expect</h2>
        <ul className="text-left text-gray-300 list-disc list-inside space-y-2 max-w-2xl mx-auto text-lg">
          <li>Straight answers and fair pricing — no fluff</li>
          <li>Design and functionality tailored to your business goals</li>
          <li>Direct communication — you talk to me, not a support queue</li>
          <li>Systems built to grow and adapt — no boxed-in templates</li>
          <li>Real ownership of what you pay for — no forced monthly fees</li>
        </ul>
      </motion.div>
    </div>
    </>
  );
}
