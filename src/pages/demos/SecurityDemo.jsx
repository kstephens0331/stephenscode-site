import React from "react";
import HeroSection from "./SecuritySections/HeroSection";
import AboutSection from "./SecuritySections/AboutSection";
import ServicesSection from "./SecuritySections/ServicesSection";
import GallerySection from "./SecuritySections/GallerySection";
import QuoteRequestSection from "./SecuritySections/QuoteRequestSection";
import ContactSection from "./SecuritySections/ContactSection";

export default function SecurityDemo() {
  return (
    <div className="font-sans text-gray-800">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <QuoteRequestSection />
      <ContactSection />
    </div>
  );
}
