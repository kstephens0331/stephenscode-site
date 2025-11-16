import React from "react";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white text-gray-700 font-serif">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold uppercase text-pink-600 mb-4 tracking-wider">
          Our Story
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          With a passion for curating unforgettable experiences, our team brings creativity, precision, and a touch of magic to every event.
        </p>
        <p className="text-lg text-gray-500">
          We believe in the power of connection—whether it’s an intimate soirée or a grand celebration, we’re dedicated to making your vision come to life.
        </p>
      </div>
    </section>
  );
}
