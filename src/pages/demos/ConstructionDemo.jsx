import React from "react";
import HeroSection from "./ConstructionSections/HeroSection";
import AboutSection from "./ConstructionSections/AboutSection";
import ServicesSection from "./ConstructionSections/ServicesSection";
import ProjectGallerySection from "./ConstructionSections/ProjectGallerySection";
import QuoteRequestSection from "./ConstructionSections/QuoteRequestSection";
import ContactSection from "./ConstructionSections/ContactSection";

export default function ConstructionDemo() {
  return (
    <div className="font-sans text-gray-800">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectGallerySection />
      <QuoteRequestSection />
      <ContactSection />
    </div>
  );
}