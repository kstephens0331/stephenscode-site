'use client';

import { usePathname } from 'next/navigation';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ClassesPage from './pages/ClassesPage';
import TrainingPage from './pages/TrainingPage';
import MembershipPage from './pages/MembershipPage';
import SchedulePage from './pages/SchedulePage';
import AmenitiesPage from './pages/AmenitiesPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import BlogPage from './pages/BlogPage';
import JoinPage from './pages/JoinPage';

interface CustomerViewProps {
  basePath: string;
}

export default function CustomerView({ basePath }: CustomerViewProps) {
  const pathname = usePathname();

  // Determine current page from pathname
  const getCurrentPage = () => {
    if (pathname === basePath) return 'home';
    if (pathname?.includes('/classes')) return 'classes';
    if (pathname?.includes('/training')) return 'training';
    if (pathname?.includes('/membership')) return 'membership';
    if (pathname?.includes('/schedule')) return 'schedule';
    if (pathname?.includes('/amenities')) return 'amenities';
    if (pathname?.includes('/success-stories')) return 'success-stories';
    if (pathname?.includes('/blog')) return 'blog';
    if (pathname?.includes('/join')) return 'join';
    return 'home';
  };

  const currentPage = getCurrentPage();

  const renderPage = () => {
    switch (currentPage) {
      case 'classes':
        return <ClassesPage basePath={basePath} />;
      case 'training':
        return <TrainingPage basePath={basePath} />;
      case 'membership':
        return <MembershipPage basePath={basePath} />;
      case 'schedule':
        return <SchedulePage basePath={basePath} />;
      case 'amenities':
        return <AmenitiesPage basePath={basePath} />;
      case 'success-stories':
        return <SuccessStoriesPage basePath={basePath} />;
      case 'blog':
        return <BlogPage basePath={basePath} />;
      case 'join':
        return <JoinPage basePath={basePath} />;
      default:
        return <HomePage basePath={basePath} />;
    }
  };

  return (
    <Layout currentPage={currentPage} basePath={basePath}>
      {renderPage()}
    </Layout>
  );
}
