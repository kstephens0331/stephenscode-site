import React from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SubjectsPage from './pages/SubjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function CustomerView() {
  const [currentPage, setCurrentPage] = React.useState<'home' | 'subjects' | 'about' | 'contact'>('home');

  const getPageTitle = () => {
    const titles = {
      home: 'Smart Start Tutoring - Expert Academic Tutoring Services',
      subjects: 'Our Subjects & Services - Smart Start Tutoring',
      about: 'About Us - Smart Start Tutoring',
      contact: 'Contact Us - Smart Start Tutoring',
    };
    return titles[currentPage];
  };

  const getPageDescription = () => {
    const descriptions = {
      home: 'Expert tutoring in Math, Science, English, and Test Prep. Personalized attention that transforms struggling students into confident learners. Free consultation available.',
      subjects: 'Comprehensive tutoring services across Math, Science, English, Test Prep, Languages, and Computer Science. All grade levels K-12 through college.',
      about: 'Meet our team of certified, experienced tutors dedicated to helping students reach their full academic potential through personalized instruction.',
      contact: 'Get in touch with Smart Start Tutoring. Schedule your free consultation today and discover how we can help your student succeed.',
    };
    return descriptions[currentPage];
  };

  const getPageKeywords = () => {
    const keywords = {
      home: 'tutoring, academic tutoring, math tutor, science tutor, SAT prep, ACT prep, homework help, private tutoring',
      subjects: 'math tutoring, science tutoring, english tutoring, test prep, SAT tutoring, ACT tutoring, AP exam prep, tutoring subjects',
      about: 'certified tutors, experienced teachers, academic support, tutoring team, education specialists',
      contact: 'schedule tutoring, free consultation, contact tutor, tutoring appointment, academic help',
    };
    return keywords[currentPage];
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'subjects' && <SubjectsPage onNavigate={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage onNavigate={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage onNavigate={setCurrentPage} />}
      </Layout>
  );
}
