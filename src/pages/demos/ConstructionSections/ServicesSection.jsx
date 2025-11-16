import React from "react";

const services = [
  {
    title: "Fencing & Gates",
    description: "Durable, secure, and built to last with a focus on both function and style.",
    icon: "🔨",
  },
  {
    title: "Landscaping",
    description: "Transform your outdoor space with our comprehensive landscaping solutions.",
    icon: "🌳",
  },
  {
    title: "Handyman Services",
    description: "Expert repairs, maintenance, and installations to keep your property in top shape.",
    icon: "🛠️",
  },
  {
    title: "Emergency Services",
    description: "24/7 response for urgent repairs and critical needs—reliable help when you need it most.",
    icon: "🚨",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 uppercase tracking-wide text-orange-600">
          Our Services
        </h2>
        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              } items-center gap-8 p-6 bg-gray-50 rounded shadow`}
            >
              <div className="flex-shrink-0 text-5xl text-orange-500">{service.icon}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
