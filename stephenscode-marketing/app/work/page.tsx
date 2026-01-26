import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Work | Portfolio & Case Studies | Real Results for Houston Businesses',
  description: 'View our portfolio of 200+ successful projects. Real case studies, measurable results, and client testimonials from Houston businesses. See how we\'ve helped contractors, retailers, restaurants, and professional services grow with custom web solutions.',
  keywords: [
    'web development portfolio Houston',
    'case studies Texas',
    'Houston website examples',
    'client results web development',
    'before and after websites',
    'web design portfolio Conroe',
    'real client testimonials'
  ],
}

// CreativeWork schema for portfolio
const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "StephensCode Portfolio - Our Work",
  "description": "Portfolio of web development projects for Houston businesses with case studies and results.",
  "provider": {
    "@type": "Organization",
    "name": "StephensCode LLC"
  }
}

export default function Work() {
  const caseStudies = [
    {
      client: 'ABC Plumbing',
      industry: 'Home Services',
      project: 'Standard Website + SEO Boost + Blog Module',
      challenge: 'Outdated website with no mobile traffic, losing leads to competitors with better online presence.',
      solution: 'Built a modern, mobile-first website with SEO optimization, local business schema, and a blog for regular content updates. Integrated contact forms and click-to-call buttons throughout.',
      results: [
        '156% increase in mobile traffic',
        '43% increase in contact form submissions',
        'Ranking #1 for "plumber Conroe TX"',
        'Average 3-5 leads per week from website'
      ],
      package: 'Standard Website ($850)',
      addOns: ['SEO Boost ($75)', 'Blog Module ($110)'],
      timeline: '2 weeks',
      testimonial: 'Kyle built us exactly what we needed. Our phone hasn\'t stopped ringing since the new site went live. Best investment we\'ve made.',
      author: 'John M., Owner',
      icon: '🔧',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      client: 'Bella\'s Boutique',
      industry: 'Retail / E-Commerce',
      project: 'E-Commerce Website + Advanced Features',
      challenge: 'Selling on Facebook only, no real online store, losing sales to Amazon and Etsy. Needed a professional storefront.',
      solution: 'Built a full e-commerce platform with Stripe payment processing, inventory management, and automated email notifications for orders. Mobile-optimized for on-the-go shoppers.',
      results: [
        '$12,000 in online sales first month',
        '67% of traffic from mobile devices',
        'Average order value increased 34%',
        'Reduced time spent managing orders by 80%'
      ],
      package: 'E-Commerce Website ($1,100)',
      addOns: ['Email Automation ($85)', 'Payment Processing ($50)'],
      timeline: '2 weeks',
      testimonial: 'I was nervous about moving online but Kyle made it so easy. The site pays for itself every single month. I actually enjoy managing my store now!',
      author: 'Isabella R., Owner',
      icon: '🛍️',
      color: 'from-pink-500 to-rose-500'
    },
    {
      client: 'Summit Landscaping',
      industry: 'Home Services',
      project: 'Website Rebuild + Scheduling System',
      challenge: 'Old website looked unprofessional, no way for customers to book services online, double-booking appointments manually.',
      solution: 'Complete website redesign with modern branding, photo gallery of past work, and custom booking system that syncs with their calendar. Automated confirmation emails.',
      results: [
        '89% of customers now book online',
        'Eliminated double-bookings entirely',
        '52% increase in booked jobs',
        'Saves 10+ hours per week on scheduling'
      ],
      package: 'Website Rebuild ($350)',
      addOns: ['Booking Calendar ($90)', 'Email Automation ($85)', 'Photo Gallery ($40)'],
      timeline: '10 days',
      testimonial: 'The booking system alone has been a game-changer. We look more professional and save so much time. Highly recommend StephensCode.',
      author: 'Mike T., Owner',
      icon: '🌳',
      color: 'from-green-500 to-emerald-500'
    },
    {
      client: 'Texas Legal Advisors',
      industry: 'Professional Services',
      project: 'Premium Build with Client Portal',
      challenge: 'Law firm needed secure client portal for document uploads, case updates, and communications. Generic solutions were too expensive or didn\'t fit their needs.',
      solution: 'Built a custom client portal with secure authentication, document management, case tracking, and messaging system. Professional public-facing website with attorney bios and practice areas.',
      results: [
        'Reduced client calls by 60% (self-service portal)',
        'Improved client satisfaction scores 45%',
        '100% secure document handling',
        'Onboarded 200+ clients to the portal'
      ],
      package: 'Premium Build ($2,000)',
      addOns: ['User Login System ($120)', 'Document Vault ($90)', 'Messaging System ($75)'],
      timeline: '3 weeks',
      testimonial: 'This is exactly what we envisioned. Our clients love being able to check their case status anytime. Worth every penny.',
      author: 'Sarah K., Managing Partner',
      icon: '⚖️',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      client: 'Fitness First Gym',
      industry: 'Health & Fitness',
      project: 'Membership Portal + Subscription Billing',
      challenge: 'Managing memberships manually with spreadsheets, no way for members to view their account or update payment info, high cancellation rate.',
      solution: 'Built membership management system with Stripe subscriptions, member portal for account management, class scheduling, and progress tracking. Automated billing and dunning.',
      results: [
        'Reduced billing errors to near zero',
        'Member retention increased 28%',
        'Saves 15+ hours per week on admin',
        'Members can self-service 95% of requests'
      ],
      package: 'Premium Build ($2,000)',
      addOns: ['Membership Portal ($200)', 'Subscription Billing ($180)', 'Booking Calendar ($90)'],
      timeline: '4 weeks',
      testimonial: 'Kyle understood our unique needs and delivered a system that works perfectly. Our members love it and we\'ve cut admin time in half.',
      author: 'Carlos M., Owner',
      icon: '💪',
      color: 'from-orange-500 to-red-500'
    },
    {
      client: 'Green Thumb Nursery',
      industry: 'Retail / Agriculture',
      project: 'E-Commerce + Inventory Management',
      challenge: 'Plant nursery wanted to sell online but inventory changes daily (plants sell out, new arrivals). Needed real-time stock management.',
      solution: 'Built e-commerce platform with advanced inventory management, low-stock alerts, and easy admin interface for daily updates. Integrated local pickup and delivery options.',
      results: [
        '$8,000+ in online sales monthly',
        'Zero oversold products',
        'Inventory updates in under 2 minutes',
        'Expanded customer base 50 miles beyond physical location'
      ],
      package: 'E-Commerce Website ($1,100)',
      addOns: ['Inventory Management ($200)', 'Product Management ($65)', 'Email Automation ($85)'],
      timeline: '2.5 weeks',
      testimonial: 'I didn\'t think we could sell plants online with our changing inventory, but Kyle figured it out. Sales have been amazing!',
      author: 'Linda W., Owner',
      icon: '🌱',
      color: 'from-lime-500 to-green-500'
    }
  ]

  // Live Portfolio - Actual client websites with SEO-rich descriptions
  const livePortfolio = [
    {
      name: 'San Diego Incident Monitoring System',
      url: null,
      industry: 'Lead Generation / Automation',
      shortDesc: 'Real-time emergency incident monitoring and property owner lead generation for restoration companies.',
      description: 'Built for Clarketon Restoration, this automated system monitors 7 fire departments across San Diego County in real-time, tracking structure fires, water emergencies, and flooding incidents. The system automatically identifies affected properties, enriches data with property owner information, and delivers qualified leads directly to the restoration company via SMS and Google Sheets integration. This enables rapid dispatch of restoration crews before competitors even know about the incident.',
      services: ['Real-time API Integration', 'Property Data Enrichment', 'SMS Notifications', 'Lead Generation Automation'],
      icon: '🚒',
      color: 'from-red-500 to-orange-600'
    },
    {
      name: 'Stephen Long for Congress TX-8',
      url: 'https://stephenlongforcongress.com',
      industry: 'Political Campaign',
      shortDesc: 'Congressional campaign website for Texas District 8 Republican primary.',
      description: 'Stephen Long is running for U.S. Congress in Texas District 8 on a platform of fiscal responsibility and reducing the national debt. We built his complete campaign website featuring interactive district maps, detailed policy positions, volunteer signup forms, donation integration, and event calendars. The SEO-optimized site helps voters in Montgomery County and The Woodlands learn about his moderate conservative platform.',
      services: ['Campaign Website', 'Interactive Maps', 'Donation Integration', 'SEO Optimization'],
      icon: '🗳️',
      color: 'from-red-600 to-blue-600'
    },
    {
      name: 'Lefty Cartel',
      url: 'https://leftycartel.net',
      industry: 'E-Commerce / Membership',
      shortDesc: 'Members-only baseball apparel with exclusive monthly perks and subscription billing.',
      description: 'Lefty Cartel is a unique members-only baseball apparel brand built by a father-son duo and Air Force veteran. We developed their complete e-commerce platform featuring $50/month Stripe subscription billing, exclusive member benefits including a FREE item every month, full admin dashboard with analytics, and integrated USPS/UPS shipping. The custom-built system handles membership management, inventory tracking, and order fulfillment seamlessly.',
      services: ['Membership Platform', 'Stripe Subscriptions', 'Admin Dashboard', 'Shipping Integration'],
      icon: '⚾',
      color: 'from-slate-700 to-slate-900'
    },
    {
      name: 'JustWell Clinical Research',
      url: null,
      industry: 'Healthcare',
      shortDesc: 'Professional website for Houston-based clinical research company.',
      description: 'JustWell Clinical Research conducts medical research studies in the Houston area with their tagline "Research You Can Trust." We built their professional website featuring information about their therapeutic areas, company background, and contact capabilities. The clean, trustworthy design with their signature teal and gold branding helps patients and sponsors learn about their clinical trial services.',
      services: ['Custom Website', 'Mobile Responsive', 'Contact Forms', 'SEO Optimization'],
      icon: '🔬',
      color: 'from-teal-500 to-emerald-600'
    },
    {
      name: 'Benefits Builder Backoffice',
      url: null,
      industry: 'SaaS / Finance',
      shortDesc: 'Section 125 Cafeteria Plan administration platform with QuickBooks integration.',
      description: 'Benefits Builder helps companies save on FICA taxes through Section 125 Cafeteria Plans. We built their complete internal SaaS platform for managing pre-tax benefit deductions, featuring company and employee management, automated billing calculations across multiple billing models, tax savings tracking and reporting, QuickBooks Online integration for invoice syncing, and automated email notifications. The dashboard provides comprehensive analytics for their entire client portfolio.',
      services: ['Full-Stack SaaS', 'QuickBooks Integration', 'Automated Billing', 'Analytics Dashboard'],
      icon: '💼',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      name: 'Terracotta Construction',
      url: 'https://terracottaconstruction.com',
      industry: 'Construction',
      shortDesc: 'Houston-area general contractor specializing in residential and commercial construction.',
      description: 'Terracotta Construction is a trusted Houston-area general contractor delivering quality residential and commercial construction services. We built their professional website featuring project galleries showcasing their craftsmanship, detailed service pages for each construction specialty, and integrated lead capture forms that connect potential clients directly with their team. The mobile-responsive design ensures homeowners can explore their portfolio from any device.',
      services: ['Custom Website', 'SEO Optimization', 'Contact Forms', 'Project Gallery'],
      icon: '🏗️',
      color: 'from-amber-500 to-orange-600'
    },
    {
      name: "Car's Collision & Refinish Shop",
      url: 'https://www.carscollisionandrefinishshop.com',
      industry: 'Automotive',
      shortDesc: 'Professional auto body repair and collision center serving the Houston community.',
      description: "Car's Collision & Refinish Shop provides expert auto body repair, paint refinishing, and collision restoration services. Their website showcases dramatic before-and-after galleries of their restoration work, detailed service explanations for insurance claims, and an easy-to-use online quote request system. The site helps customers understand the repair process and builds trust through visual proof of their quality workmanship.",
      services: ['Custom Website', 'Photo Gallery', 'Quote System', 'Service Pages'],
      icon: '🚗',
      color: 'from-red-500 to-rose-600'
    },
    {
      name: 'AMW Air Conditioning',
      url: 'https://www.amwairconditioning.com',
      industry: 'HVAC',
      shortDesc: 'Reliable HVAC services including AC repair, installation, and maintenance plans.',
      description: 'AMW Air Conditioning delivers reliable heating and cooling solutions for homes and businesses throughout the Houston area. We developed their website with emergency service prominently featured for urgent AC repairs, detailed maintenance plan options for year-round comfort, and online scheduling capabilities. The SEO-optimized content helps them rank for local HVAC searches and connect with customers who need fast, professional service.',
      services: ['Custom Website', 'Service Booking', 'SEO', 'Emergency Services Page'],
      icon: '❄️',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      name: 'Forge-X',
      url: 'https://forge-x.app',
      industry: 'Technology',
      shortDesc: 'Advanced technology platform delivering innovative software solutions.',
      description: 'Forge-X represents our capabilities in building sophisticated technology platforms. This full-stack application features secure user authentication, interactive dashboards with real-time data visualization, and complex business logic handling. The platform demonstrates our ability to architect and develop enterprise-grade software solutions that scale with business needs.',
      services: ['Full-Stack Platform', 'User Portal', 'API Development', 'Dashboard Design'],
      icon: '⚡',
      color: 'from-violet-500 to-purple-600'
    },
    {
      name: 'SACVPN',
      url: 'https://www.sacvpn.com',
      industry: 'Cybersecurity',
      shortDesc: 'Zero-log enterprise VPN service providing secure, private internet access.',
      description: 'SACVPN is a zero-log enterprise VPN solution built for businesses and privacy-conscious users who demand true security. We developed the complete platform including user account management, Stripe subscription billing with multiple pricing tiers, secure authentication systems, and server connection infrastructure. The platform serves enterprise clients with centralized team management and dedicated IP options.',
      services: ['Enterprise Platform', 'Payment Processing', 'User Management', 'Subscription System'],
      icon: '🔐',
      color: 'from-emerald-500 to-green-600'
    },
    {
      name: 'ColorFuse Prints',
      url: 'https://www.colorfuseprints.com',
      industry: 'E-Commerce / Print',
      shortDesc: 'Custom printing and promotional products with easy online ordering.',
      description: 'ColorFuse Prints offers custom printing services for businesses and individuals, from business cards to promotional materials. We built their complete e-commerce platform with product customization tools that let customers design their own products, a robust shopping cart system, secure payment processing, and order management backend. The intuitive interface makes ordering custom prints simple for both first-time and returning customers.',
      services: ['E-Commerce', 'Product Customization', 'Order System', 'Payment Integration'],
      icon: '🎨',
      color: 'from-pink-500 to-fuchsia-600'
    },
    {
      name: 'FC Photo Houston',
      url: 'https://fcphotohouston.com',
      industry: 'Photography',
      shortDesc: 'Professional photography services capturing life\'s most important moments.',
      description: 'FC Photo Houston captures weddings, events, portraits, and commercial photography with artistic excellence. We created their stunning portfolio website featuring high-resolution image galleries, an integrated booking system for scheduling sessions, and client proofing capabilities where customers can view and select their photos. The elegant design reflects the quality and professionalism of their photography work.',
      services: ['Portfolio Website', 'Booking System', 'Client Galleries', 'Image Optimization'],
      icon: '📸',
      color: 'from-slate-500 to-gray-700'
    }
  ]

  const testimonials = [
    {
      quote: 'StephensCode built our complete scheduling and workflow automation platform. The system handles everything from client bookings to automated reminders seamlessly.',
      author: 'CalenFlow Team',
      company: 'CalenFlow',
      rating: 5
    },
    {
      quote: 'Kyle developed our secure VPN management platform with advanced authentication and monitoring. The system is rock-solid and handles our enterprise clients flawlessly.',
      author: 'SACVPN Team',
      company: 'SACVPN',
      rating: 5
    },
    {
      quote: 'Our online gaming safety platform was built exactly to spec. StephensCode delivered a powerful system that streamlines our entire operation protecting gamers.',
      author: 'SentinelForge Team',
      company: 'SentinelForge - Online Gaming Safety Platform',
      rating: 5
    },
    {
      quote: 'The photography portfolio and booking system Kyle built has transformed how we manage our business. Beautiful design, flawless functionality.',
      author: 'FC Photo Team',
      company: 'FC Photo Houston',
      rating: 5
    }
  ]

  const industries = [
    { name: 'Home Services', icon: '🏠', count: '45+' },
    { name: 'Healthcare', icon: '⚕️', count: '12+' },
    { name: 'Restaurants', icon: '🍽️', count: '18+' },
    { name: 'Retail', icon: '🛒', count: '28+' },
    { name: 'Real Estate', icon: '🏢', count: '15+' },
    { name: 'Legal', icon: '⚖️', count: '8+' },
    { name: 'Fitness', icon: '💪', count: '10+' },
    { name: 'Education', icon: '📚', count: '14+' },
    { name: 'Automotive', icon: '🚗', count: '9+' },
    { name: 'Construction', icon: '🏗️', count: '22+' },
    { name: 'Landscaping', icon: '🌳', count: '11+' },
    { name: 'E-Commerce', icon: '📦', count: '16+' }
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="work-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#work-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full bg-accent-500/20 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-accent-500/30 mb-8 animate-fade-in-up">
              🏆 2,600+ Successful Projects
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl animate-fade-in-up animation-delay-200">
              Our Work
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200 animate-fade-in-up animation-delay-400">
              Real projects. <span className="font-bold text-accent-400">Real results</span>. Real businesses. See how we've helped Houston companies grow with custom web solutions and measurable outcomes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up animation-delay-600">
              <Link
                href="/contact"
                className="group rounded-lg bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Start Your Project
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </Link>
              <Link
                href="/pricing"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200 transition-colors"
              >
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-5xl mb-3">📊</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-900 to-accent-600 bg-clip-text text-transparent">2,600+</div>
              <div className="text-sm text-gray-600 mt-2">Projects Completed</div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-5xl mb-3">😊</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-900 to-accent-600 bg-clip-text text-transparent">14+</div>
              <div className="text-sm text-gray-600 mt-2">Years Experience</div>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <div className="text-5xl mb-3">⚡</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-900 to-accent-600 bg-clip-text text-transparent">2 Weeks</div>
              <div className="text-sm text-gray-600 mt-2">Average Project Time</div>
            </div>
            <div className="animate-fade-in-up animation-delay-600">
              <div className="text-5xl mb-3">⭐</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-900 to-accent-600 bg-clip-text text-transparent">98%</div>
              <div className="text-sm text-gray-600 mt-2">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Portfolio Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-900 mb-4">
              🌐 Live Portfolio
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              See Our Work Live
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Real projects we've built for real businesses. Live sites and custom solutions.
            </p>
          </div>

          <div className="space-y-8">
            {livePortfolio.map((project, index) => (
              <article
                key={project.name}
                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="md:flex">
                  {/* Header gradient - side on desktop, top on mobile */}
                  <div className={`md:w-64 md:min-h-full h-32 md:h-auto bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-6xl md:text-7xl filter drop-shadow-lg group-hover:scale-110 transition-transform">
                      {project.icon}
                    </span>
                  </div>

                  <div className="p-6 md:p-8 flex-1">
                    {/* Industry badge */}
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 mb-3">
                      {project.industry}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-primary-600 font-medium text-sm mb-4">
                      {project.shortDesc}
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Services tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Visit link or Internal Project badge */}
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <span>Visit {project.name}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Private / Internal Project</span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Want your business featured here?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-primary-700 transition-all hover:scale-105"
            >
              <span>Start Your Project</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-900 mb-4">
              📈 Case Studies
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Success Stories
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Deep dives into how we've solved real business problems with measurable results.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <article
                key={index}
                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all"
              >
                {/* Industry badge */}
                <div className="absolute top-6 right-6 z-10">
                  <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${study.color} text-white font-semibold shadow-lg text-lg`}>
                    {study.icon} {study.industry}
                  </div>
                </div>

                <div className="p-8 lg:p-12">
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{study.client}</h3>
                    <p className="text-lg text-primary-600 font-semibold mb-4">{study.project}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="h-5 w-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Completed in {study.timeline}</span>
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    <div className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-8 border-l-4 border-red-500">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl">🎯</div>
                        <h4 className="text-xl font-bold text-gray-900">The Challenge</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 border-l-4 border-blue-500">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl">💡</div>
                        <h4 className="text-xl font-bold text-gray-900">Our Solution</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-4xl">📊</div>
                      <h4 className="text-2xl font-bold text-gray-900">Results Achieved</h4>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {study.results.map((result, i) => (
                        <div key={i} className="flex items-start gap-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-green-500 flex items-center justify-center text-white font-bold shadow-lg">
                            ✓
                          </div>
                          <span className="text-gray-900 font-semibold leading-relaxed">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Package Info */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-8 border-2 border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">💼</span>
                      Services Provided
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-bold">Core Package</span>
                        <span className="text-gray-900 font-semibold">{study.package}</span>
                      </div>
                      {study.addOns && study.addOns.length > 0 && (
                        <div className="flex items-start gap-3">
                          <span className="px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-bold">Add-Ons</span>
                          <span className="text-gray-900">{study.addOns.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-primary-50 via-white to-accent-50 p-8 border-l-4 border-accent-500">
                    <div className="text-5xl text-accent-500 mb-4 opacity-30">"</div>
                    <p className="text-xl text-gray-900 italic mb-4 leading-relaxed">
                      {study.testimonial}
                    </p>
                    <p className="text-base font-bold text-gray-900">— {study.author}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-accent-100 px-4 py-2 text-sm font-semibold text-accent-900 mb-4">
              💬 Client Testimonials
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Real feedback from real businesses we've helped grow
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group rounded-3xl bg-gradient-to-br from-gray-50 to-white p-10 shadow-lg border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all hover:scale-105"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-6 w-6 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-gray-900 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-900 mb-4">
              🏢 Industries We Serve
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Diverse Experience
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Proven success across 12+ industries in the Houston area
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <div
                key={industry.name}
                className="group relative rounded-2xl bg-white p-8 shadow-lg border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all hover:scale-105 text-center"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{industry.icon}</div>
                <p className="font-bold text-gray-900 mb-2 text-lg">{industry.name}</p>
                <p className="text-sm text-primary-600 font-semibold">{industry.count} projects</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-primary-900 via-accent-600 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Join 200+ satisfied clients. Let's build something great together with transparent pricing and proven results.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="group rounded-lg bg-white px-8 py-4 text-base font-semibold text-primary-900 shadow-2xl hover:bg-gray-100 transition-all hover:scale-105"
              >
                Start Your Project
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 text-base font-semibold leading-7 text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Pricing
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-300">
              🎯 Free consultation • ⚡ Fast turnaround • 💰 Transparent pricing
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
