import React from "react";
import HeroSection from "./HealthcareSections/HeroSection";
import AboutSection from "./HealthcareSections/AboutSection";
import ServicesSection from "./HealthcareSections/ServicesSection";
import GallerySection from "./HealthcareSections/GallerySection";
import AppointmentRequestSection from "./HealthcareSections/AppointmentRequestSection";
import ContactSection from "./HealthcareSections/ContactSection";

export default function HealthcareDemo() {
  return (
    <div className="font-sans text-gray-800">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <AppointmentRequestSection />
      <ContactSection />
    </div>
  );
}
