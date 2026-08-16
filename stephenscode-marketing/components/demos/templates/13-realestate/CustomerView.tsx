import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ListingsPage, { ListingsSearchFilters } from './pages/ListingsPage';
import AgentsPage from './pages/AgentsPage';
import BuyerResourcesPage from './pages/BuyerResourcesPage';
import SellerResourcesPage from './pages/SellerResourcesPage';
import MarketTrendsPage from './pages/MarketTrendsPage';
import AboutPage from './pages/AboutPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';

const CustomerView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [listingsFilters, setListingsFilters] = useState<ListingsSearchFilters | null>(null);

  const handleNavigate = (page: string) => {
    if (page === 'listings') {
      // Plain navigation clears any search carried over from the home page
      setListingsFilters(null);
    }
    setCurrentPage(page);
  };

  const handleSearch = (filters: ListingsSearchFilters) => {
    setListingsFilters(filters);
    setCurrentPage('listings');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onSearch={handleSearch} />;
      case 'listings':
        return <ListingsPage initialFilters={listingsFilters} />;
      case 'agents':
        return <AgentsPage />;
      case 'buyer-resources':
        return <BuyerResourcesPage />;
      case 'seller-resources':
        return <SellerResourcesPage onNavigate={handleNavigate} />;
      case 'market-trends':
        return <MarketTrendsPage />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'testimonials':
        return <TestimonialsPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onSearch={handleSearch} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
};

export default CustomerView;
