import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ResidentialPage from './pages/ResidentialPage';
import CommercialPage from './pages/CommercialPage';
import EmergencyPage from './pages/EmergencyPage';
import CouponsPage from './pages/CouponsPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import ContactPage from './pages/ContactPage';

const CustomerView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'residential':
        return <ResidentialPage onNavigate={handleNavigate} />;
      case 'commercial':
        return <CommercialPage onNavigate={handleNavigate} />;
      case 'emergency':
        return <EmergencyPage onNavigate={handleNavigate} />;
      case 'coupons':
        return <CouponsPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'reviews':
        return <ReviewsPage onNavigate={handleNavigate} />;
      case 'service-areas':
        return <ServiceAreasPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
};

export default CustomerView;
