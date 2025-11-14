import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const colors = {
  primary: '#2c5f2d',
  secondary: '#97bc62',
  accent: '#ff6b35',
};

export default function CustomerView() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // SEO metadata for each page
  const getPageMetadata = () => {
    const baseTitle = 'Fix-It Fast Handyman Services';
    const baseDescription = 'Professional handyman services for all your home repair and improvement needs. Licensed, insured, and available for same-day service.';

    switch (currentPage) {
      case 'home':
        return {
          title: `${baseTitle} - Your Trusted Home Repair Experts`,
          description: baseDescription,
          keywords: 'handyman, home repair, plumbing, electrical, carpentry, painting, emergency service, licensed handyman',
        };
      case 'services':
        return {
          title: `Our Services - ${baseTitle}`,
          description: 'Complete handyman services including general repairs, electrical work, plumbing, carpentry, painting, and more. Upfront pricing and satisfaction guaranteed.',
          keywords: 'handyman services, home repairs, electrical repair, plumbing repair, carpentry, painting services, drywall repair, TV mounting',
        };
      case 'about':
        return {
          title: `About Us - ${baseTitle}`,
          description: 'Meet our team of licensed, insured professionals with 15+ years of experience. Learn why thousands of homeowners trust Fix-It Fast for their home repairs.',
          keywords: 'licensed handyman, insured contractor, experienced handyman, professional home repair, trusted handyman',
        };
      case 'contact':
        return {
          title: `Contact Us - ${baseTitle}`,
          description: 'Get a free quote for your home repair project. Same-day service available. Call (555) 123-4567 or request a quote online.',
          keywords: 'handyman quote, home repair estimate, same day service, emergency handyman, contact handyman',
        };
      default:
        return {
          title: baseTitle,
          description: baseDescription,
          keywords: 'handyman, home repair, professional handyman services',
        };
    }
  };

  const metadata = getPageMetadata();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} colors={colors} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} colors={colors} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} colors={colors} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} colors={colors} />;
      default:
        return <HomePage onNavigate={handleNavigate} colors={colors} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate} colors={colors}>
      {renderPage()}
    </Layout>
  );
}
