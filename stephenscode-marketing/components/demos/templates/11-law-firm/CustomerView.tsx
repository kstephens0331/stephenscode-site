import React from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import AttorneysPage from './pages/AttorneysPage';
import CaseResultsPage from './pages/CaseResultsPage';
import ClientResourcesPage from './pages/ClientResourcesPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

interface CustomerViewProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function CustomerView({
  primaryColor = '#1a1a2e',
  secondaryColor = '#16213e',
  accentColor = '#c9a227',
}: CustomerViewProps) {
  const [currentPage, setCurrentPage] = React.useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} accentColor={accentColor} />;
      case 'practice-areas':
        return <PracticeAreasPage onNavigate={setCurrentPage} accentColor={accentColor} />;
      case 'attorneys':
        return <AttorneysPage onNavigate={setCurrentPage} accentColor={accentColor} />;
      case 'case-results':
        return <CaseResultsPage onNavigate={setCurrentPage} accentColor={accentColor} />;
      case 'client-resources':
        return <ClientResourcesPage onNavigate={setCurrentPage} accentColor={accentColor} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} accentColor={accentColor} />;
      case 'faq':
        return <FAQPage onNavigate={setCurrentPage} accentColor={accentColor} />;
      case 'blog':
        return <BlogPage onNavigate={setCurrentPage} accentColor={accentColor} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} accentColor={accentColor} />;
      default:
        return <HomePage onNavigate={setCurrentPage} accentColor={accentColor} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      accentColor={accentColor}
    >
      {renderPage()}
    </Layout>
  );
}
