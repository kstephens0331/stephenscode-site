import { Metadata } from 'next';
import Link from 'next/link';
import CustomSolutionsHero from '@/components/custom-solutions/CustomSolutionsHero';
import SolutionsGrid from '@/components/custom-solutions/SolutionsGrid';
import ProcessTimeline from '@/components/custom-solutions/ProcessTimeline';
import PricingApproach from '@/components/custom-solutions/PricingApproach';
import CustomSolutionsForm from '@/components/custom-solutions/CustomSolutionsForm';
import SuccessStories from '@/components/custom-solutions/SuccessStories';

export const metadata: Metadata = {
  title: 'Custom Solutions: SaaS, Web Apps, Scrapers & More | StephensCode',
  description: 'Need a custom software solution? We build SaaS platforms, web applications, data scrapers, and bespoke tools tailored to your business. Flat-rate pricing based on $50/hour estimates.',
  openGraph: {
    title: 'Custom Solutions: SaaS, Web Apps, Scrapers & More',
    description: 'We build SaaS platforms, web applications, data scrapers, and bespoke tools tailored to your business. Flat-rate pricing based on $50/hour estimates.',
    type: 'website',
    url: 'https://www.stephenscode.dev/custom-solutions',
    siteName: 'StephensCode',
    images: [
      {
        url: 'https://www.stephenscode.dev/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'StephensCode Custom Solutions: SaaS, Web Apps, Automation',
        type: 'image/svg+xml',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Solutions: SaaS, Web Apps, Scrapers & More',
    description: 'We build SaaS platforms, web applications, data scrapers, and bespoke tools. Flat-rate pricing based on $50/hour estimates.',
    images: ['https://www.stephenscode.dev/og-image.svg'],
  },
};

export default function CustomSolutionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-surface to-black">
      <CustomSolutionsHero />
      <SolutionsGrid />
      <ProcessTimeline />
      <PricingApproach />
      <SuccessStories />
      <CustomSolutionsForm />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-surface-card to-surface-elevated rounded-3xl p-12 border border-surface-border/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Whether you need a SaaS platform, custom web app, or specialized tool, we're here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-primary-500/30 transition-all"
              >
                Request a Quote
              </a>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-surface-elevated/70 hover:bg-surface-elevated/70 text-white font-semibold rounded-xl border border-surface-border hover:border-surface-border transition-all"
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
