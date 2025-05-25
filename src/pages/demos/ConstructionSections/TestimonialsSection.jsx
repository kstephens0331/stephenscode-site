import React from "react";

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-orange-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold uppercase text-orange-600 mb-8 tracking-wide">
          What Our Clients Say
        </h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded shadow">
            <p className="italic text-lg">
              "They turned our blueprints into a masterpiece. Every detail was handled with care and precision."
            </p>
            <p className="mt-2 font-semibold text-gray-700">- John Smith, CEO of BuildPro</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="italic text-lg">
              "The team’s dedication and quality workmanship brought our project to life on time and on budget."
            </p>
            <p className="mt-2 font-semibold text-gray-700">- Sarah Lee, Homeowner</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="italic text-lg">
              "We couldn’t be happier with the results. They delivered beyond our expectations."
            </p>
            <p className="mt-2 font-semibold text-gray-700">- Michael Brown, Architect</p>
          </div>
        </div>
      </div>
    </section>
  );
}
