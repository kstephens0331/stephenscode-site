import React from 'react';
import CustomerView from './CustomerView';
import AdminView from './AdminView';

interface SmartStartTutoringProps {
  view?: 'customer' | 'admin';
}

export default function SmartStartTutoring({ view = 'customer' }: SmartStartTutoringProps) {
  return view === 'admin' ? <AdminView /> : <CustomerView />;
}

export const demoConfig = {
  id: 'smart-start-tutoring',
  slug: 'smart-start-tutoring',
  name: 'Smart Start Tutoring',
  category: 'Education',
  description: 'Professional tutoring service offering personalized academic support in Math, Science, English, Test Prep, Languages, and Computer Science.',
  features: [
    'Multi-page architecture (4 pages)',
    'Comprehensive subject coverage',
    'Expert tutor profiles',
    'Flexible pricing packages',
    'Free consultation offers',
    'Lead capture integration',
    'Student success stories',
    'Test prep specialization',
    'Full SEO metadata',
    'Mobile-responsive design',
  ],
  colors: {
    primary: '#5f0f40',
    secondary: '#9a031e',
    accent: '#fb8b24',
  },
  pages: ['Home', 'Subjects', 'About', 'Contact'],
  lastUpdated: '2025-01-13',
};
