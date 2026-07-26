import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Web Development Portfolio | Custom Websites Houston | Case Studies',
  description: 'Conroe web developer portfolio. Custom website Houston examples, small business website Texas case studies. Veteran owned web developer with 200+ projects.',
  keywords: [
    'Conroe web developer portfolio',
    'Houston web development',
    'custom website Houston',
    'small business website Texas',
    'veteran owned web developer',
    'affordable web design Houston',
    'The Woodlands web developer'
  ],
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Web Development Portfolio | Custom Websites Houston | Case Studies',
    description: 'Conroe web developer portfolio. Custom website Houston examples, small business website Texas case studies. Veteran owned web developer with 200+ projects.',
    url: 'https://www.stephenscode.dev/work',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Portfolio | Custom Websites Houston | Case Studies',
    description: 'Conroe web developer portfolio. Custom website Houston examples, small business website Texas case studies. Veteran owned web developer with 200+ projects.',
    images: ['/twitter-image'],
  },
  alternates: {
    canonical: 'https://www.stephenscode.dev/work',
  },
}

// CreativeWork schema for portfolio
const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "StephensCode Portfolio: Our Work",
  "description": "Portfolio of web development projects for Houston businesses with case studies and results.",
  "provider": {
    "@type": "Organization",
    "name": "StephensCode LLC"
  }
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Work() {
  const caseStudies = [
    {
      client: 'Lefty Cartel',
      industry: 'E-Commerce / Membership',
      project: 'Complete E-Commerce & Membership Platform',
      challenge: 'Lefty Cartel launched as a brand-new business with no existing website and no infrastructure to process the recurring memberships their entire model depends on.',
      solution: 'We built their complete e-commerce and membership platform from scratch -- Stripe-powered subscription billing, a full admin dashboard with analytics, and integrated USPS/UPS shipping -- so they had everything they needed to launch and start signing up members on day one.',
      results: [
        'Started generating revenue within 30 days of launch'
      ],
      services: ['Membership Platform', 'Stripe Subscriptions', 'Admin Dashboard', 'Shipping Integration'],
      color: 'from-surface-elevated to-surface'
    },
    {
      client: 'AMW Air Conditioning',
      industry: 'HVAC',
      project: 'Website Rebuild + SEO, GEO & Paid Search Growth',
      challenge: "AMW Air Conditioning had been in business for about a year but didn't have the online presence or lead flow to support the growth they wanted.",
      solution: 'We rebuilt their website and layered on SEO and GEO (local) marketing, then launched Google Ads and Local Services Ads campaigns to drive qualified HVAC leads.',
      results: [
        '76 Google reviews within their first two years in business',
        'Hired 2 new employees to keep up with the increase in service demand'
      ],
      services: ['Website Rebuild', 'SEO', 'GEO / Local Marketing', 'Google Ads', 'Local Services Ads'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      client: 'Benefits Builder',
      industry: 'SaaS / Finance',
      project: 'Public Website + Full Operating Platform with Automation',
      challenge: 'Benefits Builder was two years into a new company generating about $1,000 in monthly recurring revenue, with manual processes limiting how much their small team could take on.',
      solution: 'We built their public website and their entire internal operating platform, automating the workflows needed to run the business day-to-day so the team could grow revenue without growing headcount at the same rate.',
      results: [
        'Grew from roughly $1,000 MRR to $52,000 MRR',
        '60% decrease in admin work',
        'Entire company now runs on a team of 3'
      ],
      services: ['Full-Stack SaaS', 'QuickBooks Integration', 'Automated Billing', 'Analytics Dashboard'],
      color: 'from-primary-600 to-primary-800'
    }
  ]

  // Live Portfolio - Actual client websites with SEO-rich descriptions
  const livePortfolio = [
    {
      name: 'San Diego Incident Monitoring System',
      url: null,
      screenshot: null,
      industry: 'Lead Generation / Automation',
      shortDesc: 'Real-time emergency incident monitoring and property owner lead generation for restoration companies.',
      description: 'Built for Clarketon Restoration, this automated system monitors 7 fire departments across San Diego County in real-time, tracking structure fires, water emergencies, and flooding incidents. The system automatically identifies affected properties, enriches data with property owner information, and delivers qualified leads directly to the restoration company via SMS and Google Sheets integration. This enables rapid dispatch of restoration crews before competitors even know about the incident.',
      services: ['Real-time API Integration', 'Property Data Enrichment', 'SMS Notifications', 'Lead Generation Automation'],
      color: 'from-red-500 to-orange-600'
    },
    {
      name: 'Stephen Long for Congress TX-8',
      url: 'https://stephenlongforcongress.com',
      screenshot: '/images/portfolio/stephen-long-congress.png',
      industry: 'Political Campaign',
      shortDesc: 'Congressional campaign website for Texas District 8 Republican primary.',
      description: 'Stephen Long is running for U.S. Congress in Texas District 8 on a platform of fiscal responsibility and reducing the national debt. We built his complete campaign website featuring interactive district maps, detailed policy positions, volunteer signup forms, donation integration, and event calendars. The SEO-optimized site helps voters in Montgomery County and The Woodlands learn about his moderate conservative platform.',
      services: ['Campaign Website', 'Interactive Maps', 'Donation Integration', 'SEO Optimization'],
      color: 'from-red-600 to-blue-600'
    },
    {
      name: 'Lefty Cartel',
      url: 'https://leftycartel.net',
      screenshot: '/images/portfolio/lefty-cartel.png',
      industry: 'E-Commerce / Membership',
      shortDesc: 'Members-only baseball apparel with exclusive monthly perks and subscription billing.',
      description: 'Lefty Cartel is a unique members-only baseball apparel brand built by a father-son duo and Air Force veteran. We developed their complete e-commerce platform featuring $50/month Stripe subscription billing, exclusive member benefits including a FREE item every month, full admin dashboard with analytics, and integrated USPS/UPS shipping. The custom-built system handles membership management, inventory tracking, and order fulfillment seamlessly.',
      services: ['Membership Platform', 'Stripe Subscriptions', 'Admin Dashboard', 'Shipping Integration'],
      color: 'from-surface-elevated to-surface'
    },
    {
      name: 'JustWell Clinical Research',
      url: 'https://www.justwellclinical.org',
      screenshot: '/images/portfolio/justwell-clinical.png',
      industry: 'Healthcare',
      shortDesc: 'Professional website for Houston-based clinical research company.',
      description: 'JustWell Clinical Research conducts medical research studies in the Houston area with their tagline "Research You Can Trust." We built their professional website featuring information about their therapeutic areas, company background, and contact capabilities. The clean, trustworthy design with their signature teal and gold branding helps patients and sponsors learn about their clinical trial services.',
      services: ['Custom Website', 'Mobile Responsive', 'Contact Forms', 'SEO Optimization'],
      color: 'from-teal-500 to-emerald-600'
    },
    {
      name: 'Benefits Builder Backoffice',
      url: null,
      screenshot: null,
      industry: 'SaaS / Finance',
      shortDesc: 'Section 125 Cafeteria Plan administration platform with QuickBooks integration.',
      description: 'Benefits Builder helps companies save on FICA taxes through Section 125 Cafeteria Plans. We built their complete internal SaaS platform for managing pre-tax benefit deductions, featuring company and employee management, automated billing calculations across multiple billing models, tax savings tracking and reporting, QuickBooks Online integration for invoice syncing, and automated email notifications. The dashboard provides comprehensive analytics for their entire client portfolio.',
      services: ['Full-Stack SaaS', 'QuickBooks Integration', 'Automated Billing', 'Analytics Dashboard'],
      color: 'from-primary-600 to-primary-800'
    },
    {
      name: 'CalenFlow',
      url: null,
      screenshot: null,
      industry: 'SaaS / Scheduling',
      shortDesc: 'Multi-tenant scheduling SaaS platform with payments and automated notifications.',
      description: 'CalenFlow is a complete scheduling and workflow automation platform built for service businesses. The system features multi-tenant business management, Google OAuth authentication, customizable service catalogs, staff scheduling and availability management, branded booking widgets, Stripe payment processing, and automated email/SMS notifications. The admin dashboard provides full visibility into bookings, revenue, and client management.',
      services: ['Full-Stack SaaS', 'Stripe Payments', 'Booking System', 'SMS/Email Automation'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      name: 'SentinelForge',
      url: null,
      screenshot: null,
      industry: 'Gaming / Security',
      shortDesc: 'Online gaming safety platform protecting players from cheaters and toxic behavior.',
      description: 'SentinelForge is a powerful online gaming safety platform designed to protect gaming communities. The system features automated player behavior monitoring, cheat detection algorithms, toxicity analysis, and community moderation tools. Built with a scalable architecture to handle high-volume gaming data, it helps game developers and server administrators maintain fair, enjoyable gaming environments.',
      services: ['Platform Development', 'Data Analytics', 'Automation', 'Admin Dashboard'],
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      name: 'Project Ironclad',
      url: null,
      screenshot: null,
      industry: 'Cloud Infrastructure',
      shortDesc: 'Custom cloud platform replacing GitHub, Vercel, Railway, and Supabase. Built from scratch.',
      description: 'Project Ironclad is an ambitious 100% custom cloud platform built entirely from scratch with no third-party frameworks. It replaces GitHub, Vercel, Railway, Supabase, and Cloudflare with custom implementations including AES-256-GCM encryption, custom database query builders, S3-compatible object storage, distributed ledger technology, and container orchestration. Currently at Phase 36 with complete cryptography, database, storage, and compute modules.',
      services: ['Cloud Platform', 'Custom Infrastructure', 'Encryption', 'Container Orchestration'],
      color: 'from-surface-elevated to-surface'
    },
    {
      name: 'AeonForge',
      url: null,
      screenshot: null,
      industry: 'AI / Machine Learning',
      shortDesc: 'Intelligent LLM routing system with multi-provider support and automatic failover.',
      description: 'AeonForge is an intelligent AI routing system that manages multiple LLM providers including Anthropic Claude, Google Gemini, and Together.ai. The system automatically selects the best provider based on task type (general, coding, thinking, longform, multilingual), monitors provider availability, and implements automatic failover to ensure responses are always delivered. Built for reliability and cost optimization across AI workloads.',
      services: ['AI Integration', 'Multi-Provider Routing', 'API Development', 'Failover Systems'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      name: 'BotOpsHQ',
      url: null,
      screenshot: null,
      industry: 'Automation / DevOps',
      shortDesc: 'Bot operations platform for managing automated workflows and integrations.',
      description: 'BotOpsHQ is a centralized platform for managing bots, automated workflows, and system integrations. The hub architecture allows teams to deploy, monitor, and maintain multiple automation bots from a single dashboard. Features include workflow templates, real-time monitoring, error handling, and integration management across various services and APIs.',
      services: ['Automation Platform', 'Workflow Management', 'Bot Development', 'Integration Hub'],
      color: 'from-orange-500 to-amber-600'
    },
    {
      name: 'Autopilot System',
      url: null,
      screenshot: null,
      industry: 'Business Automation',
      shortDesc: '24/7 autonomous web agency operations with AI-powered lead generation and client management.',
      description: 'The Autopilot System is a comprehensive microservices architecture that automates web agency operations around the clock. It includes Prospector for lead generation, Sentinel for review monitoring, ChainLink for client outreach sequences, Pulse for ticket handling, Scribe for quote generation, Foundry for automated site building, and Dispatch for reporting. The Nexus orchestrator coordinates all services via cron scheduling and event routing.',
      services: ['Microservices Architecture', 'AI Lead Generation', 'Automated Outreach', 'Quote Generation'],
      color: 'from-indigo-500 to-purple-600'
    },
    {
      name: 'Lead Generation Engine',
      url: null,
      screenshot: null,
      industry: 'Sales Automation',
      shortDesc: 'AI-powered lead machine finding businesses with poor websites and nurturing them to close.',
      description: 'An intelligent lead generation system that scrapes Google Maps daily for 20-30 businesses with website issues, analyzes and grades their sites, calculates fixed-price quotes from 50+ services, sends AI-written personalized outreach emails, manages 7-touch follow-up sequences over 90 days, analyzes reply sentiment, and alerts when leads are ready to close. Expected results: 500-700 leads/month with 3-10 hot leads monthly.',
      services: ['Lead Scraping', 'AI Email Writing', 'Automated Follow-ups', 'Sentiment Analysis'],
      color: 'from-green-500 to-teal-600'
    },
    {
      name: 'GradeStack',
      url: null,
      screenshot: null,
      industry: 'SEO / Analytics',
      shortDesc: 'Self-hosted 125-point SEO audit platform with actionable fix instructions.',
      description: 'GradeStack is a self-hosted SEO health check system that runs 125 meaningful checks on websites. Unlike competitors that show inflated issues to upsell services, GradeStack provides accurate, actionable analysis with step-by-step fix instructions, transparent documented scoring, and real data from Google APIs. Built for agencies and businesses who want honest SEO insights.',
      services: ['SEO Auditing', 'Google API Integration', 'Automated Reporting', 'Fix Instructions'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'ThinkSync',
      url: null,
      screenshot: null,
      industry: 'Family / Productivity',
      shortDesc: 'Family command center app designed for neurodivergent families.',
      description: 'ThinkSync is a custom-built family management application specifically designed for neurodivergent families. Features include task assignment and tracking, shared family calendars, a needs tracker for shopping items, and comprehensive kid profiles for tracking important information. Role-based dashboards provide different views for parents and children with a flexible family structure system.',
      services: ['Custom App Development', 'Task Management', 'Family Scheduling', 'User Profiles'],
      color: 'from-pink-500 to-rose-600'
    },
    {
      name: 'Homeschool Management System',
      url: null,
      screenshot: null,
      industry: 'Education',
      shortDesc: 'Comprehensive homeschool platform with adaptive learning and OMR scanning.',
      description: 'A full-featured homeschool management system with AI-powered adaptive learning that generates custom educational packets based on student mastery levels. Features include Optical Mark Recognition (OMR) scanning for answer sheets, multi-guardian support, parent-controlled online mode with travel overrides, automatic quarter coverage tracking, PDF report cards with mastery tracking, real-time notifications, and portfolio management for work exemplars.',
      services: ['Adaptive Learning AI', 'OMR Scanning', 'Report Generation', 'Curriculum Tracking'],
      color: 'from-primary-500 to-primary-700'
    },
    {
      name: 'MedSim',
      url: null,
      screenshot: null,
      industry: 'Healthcare / Education',
      shortDesc: 'Full-fidelity medical simulation platform for hands-on clinical training.',
      description: 'MedSim is a web-based medical simulator that trains healthcare professionals through realistic hands-on interaction rather than menu clicks. Learners manipulate realistic tools with pressure, angle, and depth sensitivity, manage patient physiology, and administer medications with real pharmacokinetic and pharmacodynamic consequences. Built with a deterministic simulation engine running in Web Workers for consistent training scenarios.',
      services: ['Medical Simulation', '3D Interaction', 'PK/PD Modeling', 'Training Platform'],
      color: 'from-red-500 to-pink-600'
    },
    {
      name: 'Terracotta Construction',
      url: 'https://terracottaconstruction.com',
      screenshot: '/images/portfolio/terracotta-construction.png',
      industry: 'Construction',
      shortDesc: 'Houston-area general contractor specializing in residential and commercial construction.',
      description: 'Terracotta Construction is a trusted Houston-area general contractor delivering quality residential and commercial construction services. We built their professional website featuring project galleries showcasing their craftsmanship, detailed service pages for each construction specialty, and integrated lead capture forms that connect potential clients directly with their team. The mobile-responsive design ensures homeowners can explore their portfolio from any device.',
      services: ['Custom Website', 'SEO Optimization', 'Contact Forms', 'Project Gallery'],
      color: 'from-amber-500 to-orange-600'
    },
    {
      name: "Car's Collision & Refinish Shop",
      url: 'https://www.carscollisionandrefinishshop.com',
      screenshot: '/images/portfolio/cars-collision.png',
      industry: 'Automotive',
      shortDesc: 'Professional auto body repair and collision center serving the Houston community.',
      description: "Car's Collision & Refinish Shop provides expert auto body repair, paint refinishing, and collision restoration services. Their website showcases dramatic before-and-after galleries of their restoration work, detailed service explanations for insurance claims, and an easy-to-use online quote request system. The site helps customers understand the repair process and builds trust through visual proof of their quality workmanship.",
      services: ['Custom Website', 'Photo Gallery', 'Quote System', 'Service Pages'],
      color: 'from-red-500 to-rose-600'
    },
    {
      name: 'AMW Air Conditioning',
      url: 'https://www.amwairconditioning.com',
      screenshot: '/images/portfolio/amw-air-conditioning.png',
      industry: 'HVAC',
      shortDesc: 'Reliable HVAC services including AC repair, installation, and maintenance plans.',
      description: 'AMW Air Conditioning delivers reliable heating and cooling solutions for homes and businesses throughout the Houston area. We rebuilt their website with emergency service prominently featured for urgent AC repairs, detailed maintenance plan options, and online scheduling, then added SEO, GEO (local) marketing, Google Ads, and Local Services Ads to drive qualified leads. See the full case study below.',
      services: ['Website Rebuild', 'SEO', 'GEO / Local Marketing', 'Google Ads', 'Local Services Ads'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      name: 'Forge-X',
      url: 'https://forge-x.app',
      screenshot: '/images/portfolio/forge-x.png',
      industry: 'Technology',
      shortDesc: 'Advanced technology platform delivering innovative software solutions.',
      description: 'Forge-X represents our capabilities in building sophisticated technology platforms. This full-stack application features secure user authentication, interactive dashboards with real-time data visualization, and complex business logic handling. The platform demonstrates our ability to architect and develop enterprise-grade software solutions that scale with business needs.',
      services: ['Full-Stack Platform', 'User Portal', 'API Development', 'Dashboard Design'],
      color: 'from-violet-500 to-purple-600'
    },
    {
      name: 'SACVPN',
      url: 'https://www.sacvpn.com',
      screenshot: '/images/portfolio/sacvpn.png',
      industry: 'Cybersecurity',
      shortDesc: 'Zero-log enterprise VPN service providing secure, private internet access.',
      description: 'SACVPN is a zero-log enterprise VPN solution built for businesses and privacy-conscious users who demand true security. We developed the complete platform including user account management, Stripe subscription billing with multiple pricing tiers, secure authentication systems, and server connection infrastructure. The platform serves enterprise clients with centralized team management and dedicated IP options.',
      services: ['Enterprise Platform', 'Payment Processing', 'User Management', 'Subscription System'],
      color: 'from-emerald-500 to-green-600'
    },
    {
      name: 'ColorFuse Prints',
      url: 'https://www.colorfuseprints.com',
      screenshot: '/images/portfolio/colorfuse-prints.png',
      industry: 'E-Commerce / Print',
      shortDesc: 'Custom printing and promotional products with easy online ordering.',
      description: 'ColorFuse Prints offers custom printing services for businesses and individuals, from business cards to promotional materials. We built their complete e-commerce platform with product customization tools that let customers design their own products, a robust shopping cart system, secure payment processing, and order management backend. The intuitive interface makes ordering custom prints simple for both first-time and returning customers.',
      services: ['E-Commerce', 'Product Customization', 'Order System', 'Payment Integration'],
      color: 'from-pink-500 to-fuchsia-600'
    },
    {
      name: 'FC Photo Houston',
      url: 'https://fcphotohouston.com',
      screenshot: '/images/portfolio/fc-photo-houston.png',
      industry: 'Photography',
      shortDesc: 'Professional photography services capturing life\'s most important moments.',
      description: 'FC Photo Houston captures weddings, events, portraits, and commercial photography with artistic excellence. We created their stunning portfolio website featuring high-resolution image galleries, an integrated booking system for scheduling sessions, and client proofing capabilities where customers can view and select their photos. The elegant design reflects the quality and professionalism of their photography work.',
      services: ['Portfolio Website', 'Booking System', 'Client Galleries', 'Image Optimization'],
      color: 'from-surface-elevated to-surface-card'
    }
  ]

  const liveSites = livePortfolio.filter((project) => project.screenshot)
  const internalTools = livePortfolio.filter((project) => !project.screenshot)

  const testimonials = [
    {
      quote: 'The photography portfolio and booking system Kyle built has transformed how we manage our business. Beautiful design, flawless functionality.',
      author: 'FC Photo Team',
      company: 'FC Photo Houston',
      rating: 5
    }
  ]

  const industries = [
    { name: 'Home Services' },
    { name: 'Healthcare' },
    { name: 'Restaurants' },
    { name: 'Retail' },
    { name: 'Real Estate' },
    { name: 'Legal' },
    { name: 'Fitness' },
    { name: 'Education' },
    { name: 'Automotive' },
    { name: 'Construction' },
    { name: 'Landscaping' },
    { name: 'E-Commerce' }
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-surface to-surface-card text-white overflow-hidden">
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
              200+ Projects Completed
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
                className="group rounded-lg bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-accent-600 transition-all"
              >
                Get a Flat Quote
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
          <svg className="w-full h-16 fill-surface" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface py-16 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">200+</div>
              <div className="text-sm text-gray-400 mt-2">Projects Completed</div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">14+</div>
              <div className="text-sm text-gray-400 mt-2">Years Experience</div>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">2 Weeks</div>
              <div className="text-sm text-gray-400 mt-2">Average Project Time</div>
            </div>
            <div className="animate-fade-in-up animation-delay-600">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">0%</div>
              <div className="text-sm text-gray-400 mt-2">Hidden Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Portfolio Section */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-6">
            <div className="inline-flex items-center rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400 mb-4">
              Live Portfolio
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              See Our Work Live
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Real projects we've built for real businesses. Live sites and custom solutions.
            </p>
          </div>

          <p className="mx-auto max-w-2xl text-center text-sm text-gray-500 mb-16">
            This is a selection of recent projects, not a complete list of everything we've
            built.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {liveSites.map((project) => (
              <article
                key={project.name}
                className="group relative bg-surface-card rounded-3xl shadow-xl shadow-black/20 overflow-hidden border-2 border-surface-border hover:border-primary-300 transition-all flex flex-col"
              >
                {/* Homepage screenshot - full width, matches the captured 1440x900 ratio so nothing gets cropped */}
                <a
                  href={project.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full aspect-[8/5] bg-surface-elevated overflow-hidden"
                >
                  <Image
                    src={project.screenshot!}
                    alt={`${project.name} homepage screenshot`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </a>

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  {/* Industry badge */}
                  <div className="inline-flex items-center self-start rounded-full bg-surface-elevated px-3 py-1 text-xs font-semibold text-gray-300 mb-3">
                    {project.industry}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-primary-600 font-medium text-sm mb-4">
                    {project.shortDesc}
                  </p>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Services tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm font-medium rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <span>Visit {project.name}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Want your business featured here?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-primary-700 transition-all"
            >
              <span>Get a Flat Quote</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Tools & Systems Section (projects without a public URL/screenshot) */}
      <section className="bg-surface-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-400 mb-4">
              Tools &amp; Systems We've Built
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Behind the Scenes
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Private and internal platforms we've built that don't have a public homepage to
              show. A selection of recent work, not a complete list.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internalTools.map((project) => (
              <div
                key={project.name}
                className="group relative bg-surface rounded-2xl p-6 shadow-lg shadow-black/20 border-2 border-surface-border hover:border-primary-300 transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 flex-shrink-0 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {getInitials(project.name)}
                  </div>
                  <div className="inline-flex items-center rounded-full bg-surface-elevated px-3 py-1 text-xs font-semibold text-gray-300">
                    {project.industry}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
                <p className="text-primary-600 font-medium text-sm mb-3">{project.shortDesc}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="px-2.5 py-1 bg-primary-500/10 text-primary-400 text-xs font-medium rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-400 mb-4">
              Case Studies
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Success Stories
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Deep dives into how we've solved real business problems with measurable results.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <article
                key={index}
                className="group relative bg-surface-card rounded-3xl shadow-xl shadow-black/20 overflow-hidden border-2 border-surface-border hover:border-primary-300 transition-all"
              >
                {/* Industry badge */}
                <div className="absolute top-6 right-6 z-10">
                  <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${study.color} text-white font-semibold shadow-lg text-lg`}>
                    {study.industry}
                  </div>
                </div>

                <div className="p-8 lg:p-12">
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-white mb-3">{study.client}</h3>
                    <p className="text-lg text-primary-600 font-semibold">{study.project}</p>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    <div className="rounded-2xl bg-red-500/10 p-8 border-l-4 border-red-500">
                      <h4 className="text-xl font-bold text-white mb-4">The Challenge</h4>
                      <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="rounded-2xl bg-blue-500/10 p-8 border-l-4 border-blue-500">
                      <h4 className="text-xl font-bold text-white mb-4">Our Solution</h4>
                      <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-10">
                    <h4 className="text-2xl font-bold text-white mb-6">Results</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {study.results.map((result, i) => (
                        <div key={i} className="flex items-start gap-4 bg-green-500/10 rounded-xl p-6 border border-surface-border">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-green-500 flex items-center justify-center text-white shadow-lg">
                            <CheckIcon />
                          </div>
                          <span className="text-white font-semibold leading-relaxed">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Services Provided */}
                  <div className="bg-surface-elevated/70 rounded-2xl p-8 border-2 border-surface-border">
                    <h4 className="text-lg font-bold text-white mb-4">Services Provided</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm font-medium rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-accent-500/10 px-4 py-2 text-sm font-semibold text-accent-400 mb-4">
              Client Testimonials
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Real feedback from real businesses we've helped grow
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group rounded-3xl bg-surface-card p-10 shadow-lg shadow-black/20 border-2 border-surface-border hover:border-primary-300 transition-all"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-6 w-6 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-white italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-surface-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400 mb-4">
              Industries We Serve
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Diverse Experience
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Proven success across 12+ industries in the Houston area
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="group relative rounded-2xl bg-surface p-8 shadow-lg shadow-black/20 border-2 border-surface-border hover:border-primary-300 transition-all text-center"
              >
                <p className="font-bold text-white text-lg">{industry.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 text-white overflow-hidden">
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
              200+ projects completed. Let's build something great together with transparent pricing and proven results.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="group rounded-lg bg-surface-card px-8 py-4 text-base font-semibold text-white shadow-2xl hover:bg-surface-elevated transition-all"
              >
                Get a Flat Quote
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
              Free consultation &bull; Fast turnaround &bull; Transparent pricing
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
