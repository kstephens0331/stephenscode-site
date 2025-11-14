import React from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import VeterinariansPage from './pages/VeterinariansPage';
import PetCarePage from './pages/PetCarePage';
import NewPatientsPage from './pages/NewPatientsPage';
import EmergencyPage from './pages/EmergencyPage';
import FAQPage from './pages/FAQPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';

interface CustomerViewProps {
  businessInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function CustomerView({ businessInfo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = React.useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} colors={colors} />;
      case 'services':
        return <ServicesPage onNavigate={setCurrentPage} colors={colors} />;
      case 'veterinarians':
        return <VeterinariansPage onNavigate={setCurrentPage} colors={colors} />;
      case 'pet-care':
        return <PetCarePage onNavigate={setCurrentPage} colors={colors} />;
      case 'new-patients':
        return <NewPatientsPage onNavigate={setCurrentPage} colors={colors} />;
      case 'emergency':
        return <EmergencyPage onNavigate={setCurrentPage} colors={colors} />;
      case 'faq':
        return <FAQPage onNavigate={setCurrentPage} colors={colors} />;
      case 'testimonials':
        return <TestimonialsPage onNavigate={setCurrentPage} colors={colors} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} colors={colors} />;
      default:
        return <HomePage onNavigate={setCurrentPage} colors={colors} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      businessInfo={businessInfo}
      colors={colors}
    >
      {renderPage()}
    </Layout>
  );
}
