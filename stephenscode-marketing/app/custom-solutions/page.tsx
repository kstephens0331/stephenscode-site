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
    title: 'Custom Solutions - SaaS, Web Apps, Scrapers & More | StephensCode',
    description: 'Need a custom software solution? We build SaaS platforms, web applications, data scrapers, and bespoke tools tailored to your business.',
    type: 'website',
  },
};

export default function CustomSolutionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <CustomSolutionsHero />
      <SolutionsGrid />
      <ProcessTimeline />
      <PricingApproach />
      <SuccessStories />
      <CustomSolutionsForm />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-12 border border-slate-600/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Whether you need a SaaS platform, custom web app, or specialized tool, we're here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Request a Quote
              </a>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold rounded-xl border border-slate-600/50 hover:border-slate-500 transition-all"
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
