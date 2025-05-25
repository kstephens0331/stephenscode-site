import React from "react";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 border-l-4 border-orange-500 pl-4">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-orange-600">
            Who We Are
          </h2>
        </div>
        <div className="md:w-3/4">
          <p className="text-lg mb-4">
            With a legacy of craftsmanship and an eye for precision, we create structures that stand the test of time. Our work is more than concrete and steel—it’s about shaping communities and leaving a mark of excellence.
          </p>
          <p className="text-lg text-gray-600">
            From custom fencing to large-scale builds, our team is driven by a passion for delivering on your vision—no shortcuts, no compromises. Let’s build something extraordinary together.
          </p>
        </div>
      </div>
    </section>
  );
}
