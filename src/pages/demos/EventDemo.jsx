import React from "react";
import HeroSection from "./EventSections/HeroSection";
import AboutSection from "./EventSections/AboutSection";
import ServicesSection from "./EventSections/ServicesSection";
import GallerySection from "./EventSections/GallerySection";
import QuoteRequestSection from "./EventSections/QuoteRequestSection";
import ContactSection from "./EventSections/ContactSection";

export default function EventDemo() {
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
