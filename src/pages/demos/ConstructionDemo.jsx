import React from "react";
import HeroSection from "./ConstructionSections/HeroSection";
import ServicesSection from "./ConstructionSections/ServicesSection";
import AboutSection from "./ConstructionSections/AboutSection";
import TestimonialsSection from "./ConstructionSections/TestimonialsSection"; // new section to build credibility
import QuoteRequestSection from "./ConstructionSections/QuoteRequestSection";
import ContactSection from "./ConstructionSections/ContactSection";

export default function ConstructionDemo() {
  return (
    <div className="font-sans text-gray-800">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <QuoteRequestSection />
      <ContactSection />
    </div>
  );
}