import React from "react";
import HeroSection from "./EcommerceSections/HeroSection";
import FeaturedProductsSection from "./EcommerceSections/FeaturedProductsSection";
import CategoriesSection from "./EcommerceSections/CategoriesSection";
import TestimonialsSection from "./EcommerceSections/TestimonialsSection";
import QuoteRequestSection from "./EcommerceSections/QuoteRequestSection";
import ContactSection from "./EcommerceSections/ContactSection";

export default function ECommerceDemo() {
  return (
    <div className="font-sans text-gray-800">
      <HeroSection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <QuoteRequestSection />
      <ContactSection />
    </div>
  );
}