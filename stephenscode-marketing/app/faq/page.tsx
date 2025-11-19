import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions About Web Development',
  description: 'Get answers to common questions about custom website development, pricing, timelines, SEO, hosting, and more. Serving Houston, Conroe, The Woodlands, and surrounding areas.',
  keywords: [
    'web development FAQ',
    'website cost Houston',
    'how long to build website',
    'custom website vs template',
    'SEO questions',
    'website maintenance',
    'e-commerce development questions',
    'Houston web developer FAQ'
  ],
}

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  // Pricing & Cost Questions
  {
    category: 'Pricing & Costs',
    question: 'How much does a custom website cost?',
    answer: 'Our pricing is transparent and flat-rate. A Plug and Play 4-page site starts at $250, Standard 8-12 page websites are $850, Website Rebuilds are $600, and E-Commerce stores are $1,100. Premium custom platforms start at $2,500. No hidden fees, no hourly billing surprises.'
  },
  {
    category: 'Pricing & Costs',
    question: 'Why are your prices so much lower than other agencies?',
    answer: 'We keep overhead low—no fancy office, no sales team, no account managers. Just direct access to the developer building your site. We also use modern tools and AI assistance to work more efficiently without sacrificing quality.'
  },
  {
    category: 'Pricing & Costs',
    question: 'Do you charge monthly fees?',
    answer: 'Unlike template platforms like Wix or Squarespace, we don\'t charge monthly fees for your website. You pay once and own your site forever. The only ongoing costs are hosting ($0-50/month depending on your needs) and domain renewal (~$15/year).'
  },
  {
    category: 'Pricing & Costs',
    question: 'What payment methods do you accept?',
    answer: 'We accept credit cards, debit cards, bank transfers, and cash. For projects over $500, we typically split payment into 50% upfront and 50% on completion.'
  },
  {
    category: 'Pricing & Costs',
    question: 'Do you offer payment plans?',
    answer: 'Yes, for larger projects we can arrange payment plans. Contact us to discuss options that work for your budget.'
  },
  {
    category: 'Pricing & Costs',
    question: 'What\'s included in the price?',
    answer: 'All packages include: custom design, mobile optimization, basic SEO setup, contact forms, Google Analytics integration, and 30 days of post-launch support. E-commerce packages also include payment processing setup and product management training.'
  },

  // Timeline Questions
  {
    category: 'Timeline & Process',
    question: 'How long does it take to build a website?',
    answer: 'Plug and Play sites: 3-5 days. Standard websites: 1-2 weeks. Website rebuilds: 1-2 weeks. E-commerce: 2-3 weeks. Premium platforms: 3-6 weeks. These timelines assume prompt feedback and content delivery from you.'
  },
  {
    category: 'Timeline & Process',
    question: 'What\'s your development process?',
    answer: 'We follow a straightforward process: 1) Discovery call to understand your needs, 2) Proposal and agreement, 3) Design mockups for approval, 4) Development, 5) Review and revisions, 6) Launch and training. You\'re involved at every step.'
  },
  {
    category: 'Timeline & Process',
    question: 'How many revisions do I get?',
    answer: 'All packages include 2 rounds of revisions. Most clients are happy after the first round. Additional revisions are billed at $50/hour if needed, but this is rarely necessary.'
  },
  {
    category: 'Timeline & Process',
    question: 'Do I need to provide content?',
    answer: 'Yes, you\'ll need to provide your business information, service descriptions, photos, and any specific text you want. We provide a content questionnaire to make this easy. If you need help with copywriting, we can recommend services or handle it for an additional fee.'
  },
  {
    category: 'Timeline & Process',
    question: 'What if I need my website faster?',
    answer: 'Rush delivery is available for an additional 25% fee. Contact us to discuss your timeline needs—we\'ll do our best to accommodate urgent projects.'
  },

  // Technical Questions
  {
    category: 'Technical',
    question: 'What platform do you build websites on?',
    answer: 'We primarily use Next.js, a modern React framework that delivers exceptional performance, SEO, and scalability. For simpler sites, we may use other technologies. All sites are custom-coded—no WordPress or page builders.'
  },
  {
    category: 'Technical',
    question: 'Will my website be mobile-friendly?',
    answer: 'Absolutely. All our websites are built mobile-first, meaning we design for phones first, then scale up for tablets and desktops. Over 70% of web traffic comes from mobile devices, so this is non-negotiable.'
  },
  {
    category: 'Technical',
    question: 'How fast will my website load?',
    answer: 'We target under 2 seconds load time on mobile. Our sites typically score 90+ on Google PageSpeed Insights. Fast loading improves user experience and search rankings—slow sites lose customers.'
  },
  {
    category: 'Technical',
    question: 'Do you provide hosting?',
    answer: 'We recommend and can set up hosting for you. For most sites, we use Vercel (free for basic sites) or similar modern hosting. You own the hosting account and can manage it yourself or have us handle it.'
  },
  {
    category: 'Technical',
    question: 'Can I update the website myself?',
    answer: 'Yes! We can integrate a content management system (CMS) so you can update text, images, blog posts, and products without touching code. We provide training on how to use it.'
  },
  {
    category: 'Technical',
    question: 'Is my website secure?',
    answer: 'Yes. All sites include SSL certificates (HTTPS), secure forms, and modern security practices. We don\'t use vulnerable platforms like WordPress that are constantly targeted by hackers.'
  },
  {
    category: 'Technical',
    question: 'Do you handle domain registration?',
    answer: 'We can help you register a domain or transfer an existing one. We recommend registering through Namecheap, Google Domains, or Cloudflare. You own the domain—we just help set it up.'
  },

  // SEO Questions
  {
    category: 'SEO & Marketing',
    question: 'Will my website show up on Google?',
    answer: 'We set up every site with SEO fundamentals: proper meta tags, schema markup, fast loading, mobile optimization, XML sitemaps, and Google Search Console integration. This gives you a strong foundation for ranking.'
  },
  {
    category: 'SEO & Marketing',
    question: 'Do you offer ongoing SEO services?',
    answer: 'Our packages include basic SEO setup. For ongoing SEO—content creation, link building, local citations, keyword research—we can discuss a monthly retainer. Many clients see great results from just the foundational setup.'
  },
  {
    category: 'SEO & Marketing',
    question: 'How do I rank higher than my competitors?',
    answer: 'Local SEO success comes from: optimized Google Business Profile, consistent citations, positive reviews, fast website, quality content, and local keywords. Our sites are built with all technical SEO factors optimized from day one.'
  },
  {
    category: 'SEO & Marketing',
    question: 'Can you help with Google Business Profile?',
    answer: 'Yes! We can optimize your Google Business Profile, which is crucial for local search. This includes proper categories, photos, posts, and ensuring your website and GBP information match.'
  },
  {
    category: 'SEO & Marketing',
    question: 'Do you set up Google Analytics?',
    answer: 'Yes, Google Analytics 4 setup is included with all packages. We also connect Google Search Console so you can monitor your search performance. We\'ll show you how to read the basic reports.'
  },

  // Custom vs Template Questions
  {
    category: 'Custom vs Template',
    question: 'Why should I get a custom website instead of using Wix or Squarespace?',
    answer: 'Template sites are slower, look generic, have SEO limitations, and you don\'t own them—stop paying and your site disappears. Custom sites load faster, rank better, look unique, and you own the code forever. The ROI from better performance usually exceeds the cost difference quickly.'
  },
  {
    category: 'Custom vs Template',
    question: 'Can you rebuild my existing Wix/Squarespace/WordPress site?',
    answer: 'Yes! Our Website Rebuild package ($600) is specifically for this. We\'ll migrate your content to a fast, custom-built site while improving design and SEO. Many clients see immediate ranking improvements after switching.'
  },
  {
    category: 'Custom vs Template',
    question: 'What if I already have a WordPress site?',
    answer: 'WordPress can work well but often has security vulnerabilities and performance issues. We can rebuild it as a modern, fast, secure site—or optimize your existing WordPress if you prefer to keep it.'
  },

  // E-Commerce Questions
  {
    category: 'E-Commerce',
    question: 'Can you build an online store?',
    answer: 'Yes! Our E-Commerce package ($1,100) includes full online store functionality: product catalog, shopping cart, secure checkout, payment processing (Stripe/PayPal), inventory management, and order notifications.'
  },
  {
    category: 'E-Commerce',
    question: 'What payment processors do you integrate?',
    answer: 'We typically integrate Stripe (credit cards) and PayPal. We can also set up Square, Apple Pay, Google Pay, or other processors based on your needs.'
  },
  {
    category: 'E-Commerce',
    question: 'Can I manage products myself?',
    answer: 'Yes, you\'ll have a dashboard to add, edit, and remove products, update prices, manage inventory, and process orders. We provide training so you\'re comfortable managing everything.'
  },
  {
    category: 'E-Commerce',
    question: 'Do you handle shipping integration?',
    answer: 'Yes, we can integrate real-time shipping rates from USPS, UPS, FedEx, or flat-rate shipping options. We\'ll set up whatever makes sense for your products.'
  },

  // Support & Maintenance
  {
    category: 'Support & Maintenance',
    question: 'What happens after my website launches?',
    answer: 'You get 30 days of free support for questions and minor tweaks. After that, you can handle it yourself, hire us for specific updates, or sign up for a monthly maintenance plan ($50-150/month depending on needs).'
  },
  {
    category: 'Support & Maintenance',
    question: 'Do you offer website maintenance?',
    answer: 'Yes! Monthly maintenance plans include security updates, backups, uptime monitoring, content updates, and priority support. Plans start at $50/month for basic maintenance.'
  },
  {
    category: 'Support & Maintenance',
    question: 'What if something breaks on my website?',
    answer: 'During the 30-day support period, we fix issues at no charge. After that, bug fixes for code we wrote are typically free. New features or major changes are quoted separately.'
  },
  {
    category: 'Support & Maintenance',
    question: 'Can another developer work on my site later?',
    answer: 'Yes! You own the code completely. Any competent developer can maintain or modify your site. We use standard technologies and write clean, documented code.'
  },

  // Service Area Questions
  {
    category: 'Service Area',
    question: 'What areas do you serve?',
    answer: 'We\'re based in Conroe, TX and serve all of Greater Houston including The Woodlands, Spring, Tomball, Katy, Sugar Land, Pearland, Cypress, and surrounding areas. We also work with clients nationwide—everything can be done remotely.'
  },
  {
    category: 'Service Area',
    question: 'Do you meet clients in person?',
    answer: 'Yes! We\'re happy to meet in person in the Conroe/Houston area if you prefer face-to-face communication. Many clients prefer video calls for convenience, and that works great too.'
  },
  {
    category: 'Service Area',
    question: 'Do you work with clients outside Texas?',
    answer: 'Absolutely. We work with clients across the US. Video calls, screen sharing, and email work perfectly for remote collaboration.'
  },

  // Getting Started
  {
    category: 'Getting Started',
    question: 'How do I get started?',
    answer: 'Call us at (936) 323-4527 or fill out our contact form. We\'ll schedule a free consultation to discuss your needs, then provide a detailed proposal. No pressure, no sales tactics—just honest advice about what you need.'
  },
  {
    category: 'Getting Started',
    question: 'Do you offer free consultations?',
    answer: 'Yes! The initial consultation is always free. We\'ll discuss your business, goals, and website needs, then recommend the best approach. Even if you don\'t hire us, you\'ll leave with useful information.'
  },
  {
    category: 'Getting Started',
    question: 'What information do you need to provide a quote?',
    answer: 'Tell us about your business, what you want the website to accomplish, how many pages you need, any specific features (booking, e-commerce, etc.), and your timeline. We\'ll ask clarifying questions during the consultation.'
  },
  {
    category: 'Getting Started',
    question: 'Why should I choose StephensCode over other developers?',
    answer: 'We offer transparent flat-rate pricing (no hourly billing surprises), fast turnaround, direct communication with your developer (no account managers), veteran-owned integrity, and modern technology that actually performs. We\'ve been doing this for 14+ years.'
  },
]

// Group FAQs by category
const groupedFaqs = faqs.reduce((acc, faq) => {
  if (!acc[faq.category]) {
    acc[faq.category] = []
  }
  acc[faq.category].push(faq)
  return acc
}, {} as Record<string, FAQItem[]>)

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Everything you need to know about custom website development, pricing, timelines, and working with StephensCode.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center gap-4">
            {Object.keys(groupedFaqs).map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
              >
                {category}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                {category}
              </h2>
              <dl className="space-y-8">
                {categoryFaqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <dt className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </dt>
                    <dd className="text-gray-600 leading-7">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Still Have Questions?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're here to help. Get in touch for a free consultation and honest answers about your project.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Contact Us
              </Link>
              <a
                href="tel:9363234527"
                className="text-base font-semibold leading-7 text-gray-900 hover:text-primary-600"
              >
                Call (936) 323-4527 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="bg-white py-16 sm:py-24 border-t">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Link
              href="/blog/why-houston-businesses-need-custom-websites-2025"
              className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Why Custom Websites Matter
              </h3>
              <p className="text-sm text-gray-600">
                Learn why template sites are holding your business back and how custom development drives growth.
              </p>
            </Link>
            <Link
              href="/blog/website-speed-conversion-rates-guide"
              className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Website Speed Guide
              </h3>
              <p className="text-sm text-gray-600">
                Understand how website speed impacts conversions and what you can do to improve it.
              </p>
            </Link>
            <Link
              href="/blog/local-seo-guide-houston-businesses"
              className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Local SEO Guide
              </h3>
              <p className="text-sm text-gray-600">
                Complete guide to dominating local search results in Houston and surrounding areas.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
