import React from "react";

export default function HeroSection() {
  return (
   <section className="relative py-20 text-center font-[cursive] backdrop-blur-sm bg-white/30 rounded-lg shadow-lg mx-4 mt-4">
  <div className="max-w-3xl mx-auto px-4">
    <h1 className="text-5xl font-extrabold text-pink-600 mb-4">
      Let’s Make Magic Together!
    </h1>
    <p className="text-lg text-gray-600 mb-6">
      Whimsical, wonderful events designed with heart and sprinkled with a touch of magic.
    </p>
    <a
      href="#contact"
      className="inline-block px-8 py-3 bg-pink-500 text-white font-semibold rounded-full shadow hover:bg-pink-600 transition"
    >
      Start Your Journey
    </a>
  </div>
</section>
  );
}
