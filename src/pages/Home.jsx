import HeroSection from '../components/HeroSection';
import CorePackages from '../components/CorePackages';
import AddOnsGrid from '../components/AddOnsGrid';
import IndustryBlock from '../components/IndustryBlock';
import PremiumPackages from '../components/PremiumPackages';
import ComparisonTable from '../components/ComparisonTable';
import FounderMessage from '../components/FounderMessage';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CorePackages />
      <AddOnsGrid />
      <IndustryBlock />
      <PremiumPackages />
      <ComparisonTable />
      <FounderMessage />
    </div>
  );
}