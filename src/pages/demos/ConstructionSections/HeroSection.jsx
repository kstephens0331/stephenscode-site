import React from "react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-orange-50 to-white py-20 flex flex-col items-center text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-wide uppercase">
          Building Your Dreams
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We bring decades of experience to every project—delivering precision, safety, and trust to your construction vision.
        </p>
        <a
          href="#quote"
          className="inline-block px-8 py-3 bg-orange-600 text-white font-semibold rounded shadow hover:bg-orange-700 transition"
        >
          Request a Quote
        </a>
      </div>
      <div className="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full text-white"
        >
          <path
            fill="currentColor"
            d="M0,0 C360,100 1080,0 1440,100 L1440,100 L0,100 Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
