import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import AgentsPage from './pages/AgentsPage';
import BuyerResourcesPage from './pages/BuyerResourcesPage';
import SellerResourcesPage from './pages/SellerResourcesPage';
import MarketTrendsPage from './pages/MarketTrendsPage';
import AboutPage from './pages/AboutPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';

const CustomerView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'listings':
        return <ListingsPage />;
      case 'agents':
        return <AgentsPage />;
      case 'buyer-resources':
        return <BuyerResourcesPage />;
      case 'seller-resources':
        return <SellerResourcesPage />;
      case 'market-trends':
        return <MarketTrendsPage />;
      case 'about':
        return <AboutPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default CustomerView;
