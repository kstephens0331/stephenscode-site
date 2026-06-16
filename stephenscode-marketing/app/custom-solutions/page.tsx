import { Metadata } from 'next';
import Link from 'next/link';
import CustomSolutionsHero from '@/components/custom-solutions/CustomSolutionsHero';
import SolutionsGrid from '@/components/custom-solutions/SolutionsGrid';
import ProcessTimeline from '@/components/custom-solutions/ProcessTimeline';
import PricingApproach from '@/components/custom-solutions/PricingApproach';
import CustomSolutionsForm from '@/components/custom-solutions/CustomSolutionsForm';
import SuccessStories from '@/components/custom-solutions/SuccessStories';

export const metadata: Metadata = {
  title: 'Custom Solutions - SaaS, Web Apps, Scrapers & More | StephensCode',
  description: 'Need a custom software solution? We build SaaS platforms, web applications, data scrapers, and bespoke tools tailored to your business. Flat-rate pricing based on $50/hour estimates.',
  openGraph: {
    title: 'Custom Solutions - SaaS, Web Apps, Scrapers & More',
    description: 'We build SaaS platforms, web applications, data scrapers, and bespoke tools tailored to your business. Flat-rate pricing based on $50/hour estimates.',
    type: 'website',
    url: 'https://www.stephenscode.dev/custom-solutions',
    siteName: 'StephensCode',
    images: [
      {
        url: 'https://www.stephenscode.dev/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'StephensCode Custom Solutions - SaaS, Web Apps, Automation',
        type: 'image/svg+xml',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Solutions - SaaS, Web Apps, Scrapers & More',
    description: 'We build SaaS platforms, web applications, data scrapers, and bespoke tools. Flat-rate pricing based on $50/hour estimates.',
    images: ['https://www.stephenscode.dev/og-image.svg'],
  },
};

export default function CustomSolutionsPage() {
  return (
    <main className="min-h-screen bg-surface">
      <CustomSolutionsHero />
      <SolutionsGrid />
      <ProcessTimeline />
      <PricingApproach />
      <SuccessStories />
      <CustomSolutionsForm />

      {/* CTA Section */}
      <section className="bg-surface border-t border-surface-border py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-surface-card rounded-2xl p-12 ring-1 ring-surface-border">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Whether you need a SaaS platform, custom web app, or specialized tool, we're here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contact-form"
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-md transition-colors"
              >
                Request a Quote
              </a>
              <Link
                href="/pricing"
                className="px-6 py-3 text-white font-semibold rounded-md border border-surface-border hover:border-primary-500/60 hover:bg-surface-elevated transition-colors"
              >
                View Standard Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
