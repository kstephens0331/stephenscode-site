import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BracketEyebrow from '@/components/BracketEyebrow'
import BrowserFrame from '@/components/BrowserFrame'

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

interface CaseStudy {
  client: string
  industry: string
  project: string
  challenge: string
  solution: string
  results: string[]
  services: string[]
  /** Portfolio screenshot path when the asset exists, otherwise null. */
  screenshot: string | null
  /** Bare display domain for the BrowserFrame URL chip. */
  domain: string | null
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

/** Strips protocol and www for the BrowserFrame URL chip. */
function displayDomain(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function CaseStudyBody({ study, wide = false }: { study: CaseStudy; wide?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
        {study.industry}
      </p>
      <h3 className="mt-3 text-3xl font-bold text-white">{study.client}</h3>
      <p className="mt-2 text-lg font-semibold text-primary-400">{study.project}</p>

      <div className={wide ? 'mt-8 grid gap-8 lg:grid-cols-2' : 'mt-8 space-y-6'}>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
            The Challenge
          </h4>
          <p className="mt-2 leading-7 text-gray-300">{study.challenge}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
            Our Solution
          </h4>
          <p className="mt-2 leading-7 text-gray-300">{study.solution}</p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">Results</h4>
        <ul className={wide ? 'mt-4 grid gap-3 sm:grid-cols-2' : 'mt-4 space-y-3'}>
          {study.results.map((result) => (
            <li key={result} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                <CheckIcon />
              </span>
              <span className="font-semibold leading-6 text-white">{result}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {study.services.map((service) => (
          <span
            key={service}
            className="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-400"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Work() {
  const caseStudies: CaseStudy[] = [
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
      screenshot: '/images/portfolio/lefty-cartel.png',
      domain: 'leftycartel.net'
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
      screenshot: '/images/portfolio/amw-air-conditioning.png',
      domain: 'amwairconditioning.com'
    },
    {
      client: 'Benefit Builder',
      industry: 'SaaS / Finance',
      project: 'Public Website + Full Operating Platform with Automation',
      challenge: 'Benefit Builder was two years into a new company generating about $1,000 in monthly recurring revenue, with manual processes limiting how much their small team could take on.',
      solution: 'We built their public website and their entire internal operating platform, automating the workflows needed to run the business day-to-day so the team could grow revenue without growing headcount at the same rate.',
      results: [
        'Grew from roughly $1,000 MRR to $52,000 MRR',
        '60% decrease in admin work',
        'Entire company now runs on a team of 3'
      ],
      services: ['Full-Stack SaaS', 'QuickBooks Integration', 'Automated Billing', 'Analytics Dashboard'],
      screenshot: null,
      domain: null
    },
    {
      client: 'Sunset Harbor Owners Association',
      industry: 'HOA / Property Management',
      project: 'Full HOA Platform + Resident Portal',
      challenge: 'Sunset Harbor Owners Association needed a way to give residents secure online access to HOA documents, assessments, and notices without taking on the ongoing overhead of managing resident passwords and handling reset requests.',
      solution: 'We built Sunset Harbor a complete monorepo platform -- a public marketing site paired with a resident portal -- backed by a self-hosted PocketBase database, magic-link and JWT authentication, Resend-powered transactional email, and on-demand PDF generation for assessments, notices, and governing documents.',
      results: [
        'Residents get secure, passwordless portal access via magic-link authentication',
        'Eliminated manual password-reset requests for the HOA board',
        'HOA documents -- assessments, notices, governing documents -- available as generated PDFs on demand'
      ],
      services: ['Resident Portal', 'Self-Hosted PocketBase', 'Magic-Link Authentication', 'Transactional Email', 'PDF Generation'],
      screenshot: null,
      domain: null
    },
    {
      client: 'ColorFuse Prints',
      industry: 'E-Commerce / DTF Printing',
      project: 'Live E-Commerce Security Hardening',
      challenge: 'ColorFuse Prints was a live DTF and sublimation transfer store already processing real customer orders in production, but a security review uncovered multiple live vulnerabilities: pricing was calculated in the browser and trusted by the server, admin endpoints had no authentication, order tracking exposed any order to anyone who guessed its ID, and a bug in the PayPal flow could let products oversell.',
      solution: 'We hardened the live store end to end -- moving price calculation fully server-side to close the tampering vulnerability, locking down the exposed admin endpoints, fixing the order-tracking IDOR so orders can only be viewed by their owner, resolving the PayPal oversell bug, correcting inaccurate coupon-usage counting, and fixing a broken contact form that was silently discarding submitted messages.',
      results: [
        'Closed a live price-tampering vulnerability by moving pricing calculation server-side',
        'Removed unauthenticated admin endpoints from the live store',
        'Fixed an order-tracking IDOR that exposed any order to anyone with its ID',
        'Fixed a PayPal oversell bug and inaccurate coupon-usage counting',
        'Fixed a contact form that was silently discarding customer messages'
      ],
      services: ['Security Hardening', 'Server-Side Pricing', 'Vulnerability Remediation', 'E-Commerce Reliability'],
      screenshot: '/images/portfolio/colorfuse-prints.png',
      domain: 'colorfuseprints.com'
    },
    {
      client: 'Terracotta Construction',
      industry: 'Construction',
      project: 'Ground-Up Rebuild to the StephensCode Standard',
      challenge: "Terracotta Construction's previous website scored just 18% on an Ahrefs site health audit, with 17 pages missing entirely -- a broken foundation instead of a working web presence.",
      solution: "We're rebuilding the entire platform from the ground up to the full StephensCode Standard -- a public marketing site, a customer login/portal, an admin dashboard, and a back office -- all self-hosted on our own infrastructure, including a dedicated self-hosted Supabase instance instead of relying on third-party SaaS. Their real brand color, logo, and service/location catalog from the old site carried over as the content foundation for the rebuild.",
      results: [
        'Replacing a previous site with a documented 18% Ahrefs health score and 17 missing pages',
        'Full self-hosted platform covering the public site, customer portal, admin dashboard, and back office',
        'Own dedicated Supabase instance instead of dependence on third-party SaaS'
      ],
      services: ['Website Rebuild', 'Customer Portal', 'Admin Dashboard', 'Self-Hosted Supabase', 'Back Office'],
      screenshot: '/images/portfolio/terracotta-construction.png',
      domain: 'terracottaconstruction.com'
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
      color: 'from-primary-600 to-accent-700'
    },
    {
      name: 'Stephen Long for Congress TX-8',
      url: 'https://stephenlongforcongress.com',
      screenshot: '/images/portfolio/stephen-long-congress.png',
      industry: 'Political Campaign',
      shortDesc: 'Congressional campaign website for Texas District 8 Republican primary.',
      description: 'Stephen Long is running for U.S. Congress in Texas District 8 on a platform of fiscal responsibility and reducing the national debt. We built his complete campaign website featuring interactive district maps, detailed policy positions, volunteer signup forms, donation integration, and event calendars. The SEO-optimized site helps voters in Montgomery County and The Woodlands learn about his moderate conservative platform.',
      services: ['Campaign Website', 'Interactive Maps', 'Donation Integration', 'SEO Optimization'],
      color: 'from-primary-600 to-primary-800'
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
      color: 'from-accent-700 to-accent-800'
    },
    {
      name: 'Benefit Builder Backoffice',
      url: null,
      screenshot: null,
      industry: 'SaaS / Finance',
      shortDesc: 'Section 125 Cafeteria Plan administration platform with QuickBooks integration.',
      description: 'Benefit Builder helps companies save on FICA taxes through Section 125 Cafeteria Plans. We built their complete internal SaaS platform for managing pre-tax benefit deductions, featuring company and employee management, automated billing calculations across multiple billing models, tax savings tracking and reporting, QuickBooks Online integration for invoice syncing, and automated email notifications. The dashboard provides comprehensive analytics for their entire client portfolio.',
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
      color: 'from-accent-700 to-primary-600'
    },
    {
      name: 'SentinelForge',
      url: null,
      screenshot: null,
      industry: 'Gaming / Security',
      shortDesc: 'Online gaming safety platform protecting players from cheaters and toxic behavior.',
      description: 'SentinelForge is a powerful online gaming safety platform designed to protect gaming communities. The system features automated player behavior monitoring, cheat detection algorithms, toxicity analysis, and community moderation tools. Built with a scalable architecture to handle high-volume gaming data, it helps game developers and server administrators maintain fair, enjoyable gaming environments.',
      services: ['Platform Development', 'Data Analytics', 'Automation', 'Admin Dashboard'],
      color: 'from-primary-600 to-primary-700'
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
      color: 'from-primary-600 to-primary-800'
    },
    {
      name: 'BotOpsHQ',
      url: null,
      screenshot: null,
      industry: 'Automation / DevOps',
      shortDesc: 'Bot operations platform for managing automated workflows and integrations.',
      description: 'BotOpsHQ is a centralized platform for managing bots, automated workflows, and system integrations. The hub architecture allows teams to deploy, monitor, and maintain multiple automation bots from a single dashboard. Features include workflow templates, real-time monitoring, error handling, and integration management across various services and APIs.',
      services: ['Automation Platform', 'Workflow Management', 'Bot Development', 'Integration Hub'],
      color: 'from-primary-600 to-primary-700'
    },
    {
      name: 'Autopilot System',
      url: null,
      screenshot: null,
      industry: 'Business Automation',
      shortDesc: '24/7 autonomous web agency operations with AI-powered lead generation and client management.',
      description: 'The Autopilot System is a comprehensive microservices architecture that automates web agency operations around the clock. It includes Prospector for lead generation, Sentinel for review monitoring, ChainLink for client outreach sequences, Pulse for ticket handling, Scribe for quote generation, Foundry for automated site building, and Dispatch for reporting. The Nexus orchestrator coordinates all services via cron scheduling and event routing.',
      services: ['Microservices Architecture', 'AI Lead Generation', 'Automated Outreach', 'Quote Generation'],
      color: 'from-surface-elevated to-surface'
    },
    {
      name: 'Lead Generation Engine',
      url: null,
      screenshot: null,
      industry: 'Sales Automation',
      shortDesc: 'AI-powered lead machine finding businesses with poor websites and nurturing them to close.',
      description: 'An intelligent lead generation system that scrapes Google Maps daily for 20-30 businesses with website issues, analyzes and grades their sites, calculates fixed-price quotes from 50+ services, sends AI-written personalized outreach emails, manages 7-touch follow-up sequences over 90 days, analyzes reply sentiment, and alerts when leads are ready to close. Expected results: 500-700 leads/month with 3-10 hot leads monthly.',
      services: ['Lead Scraping', 'AI Email Writing', 'Automated Follow-ups', 'Sentiment Analysis'],
      color: 'from-primary-600 to-accent-700'
    },
    {
      name: 'GradeStack',
      url: null,
      screenshot: null,
      industry: 'SEO / Analytics',
      shortDesc: 'Self-hosted 125-point SEO audit platform with actionable fix instructions.',
      description: 'GradeStack is a self-hosted SEO health check system that runs 125 meaningful checks on websites. Unlike competitors that show inflated issues to upsell services, GradeStack provides accurate, actionable analysis with step-by-step fix instructions, transparent documented scoring, and real data from Google APIs. Built for agencies and businesses who want honest SEO insights.',
      services: ['SEO Auditing', 'Google API Integration', 'Automated Reporting', 'Fix Instructions'],
      color: 'from-accent-700 to-primary-600'
    },
    {
      name: 'ThinkSync',
      url: null,
      screenshot: null,
      industry: 'Family / Productivity',
      shortDesc: 'Family command center app designed for neurodivergent families.',
      description: 'ThinkSync is a custom-built family management application specifically designed for neurodivergent families. Features include task assignment and tracking, shared family calendars, a needs tracker for shopping items, and comprehensive kid profiles for tracking important information. Role-based dashboards provide different views for parents and children with a flexible family structure system.',
      services: ['Custom App Development', 'Task Management', 'Family Scheduling', 'User Profiles'],
      color: 'from-accent-700 to-accent-800'
    },
    {
      name: 'Homeschool Management System',
      url: null,
      screenshot: null,
      industry: 'Education',
      shortDesc: 'Comprehensive homeschool platform with adaptive learning and OMR scanning.',
      description: 'A full-featured homeschool management system with AI-powered adaptive learning that generates custom educational packets based on student mastery levels. Features include Optical Mark Recognition (OMR) scanning for answer sheets, multi-guardian support, parent-controlled online mode with travel overrides, automatic quarter coverage tracking, PDF report cards with mastery tracking, real-time notifications, and portfolio management for work exemplars.',
      services: ['Adaptive Learning AI', 'OMR Scanning', 'Report Generation', 'Curriculum Tracking'],
      color: 'from-primary-600 to-primary-700'
    },
    {
      name: 'MedSim',
      url: null,
      screenshot: null,
      industry: 'Healthcare / Education',
      shortDesc: 'Full-fidelity medical simulation platform for hands-on clinical training.',
      description: 'MedSim is a web-based medical simulator that trains healthcare professionals through realistic hands-on interaction rather than menu clicks. Learners manipulate realistic tools with pressure, angle, and depth sensitivity, manage patient physiology, and administer medications with real pharmacokinetic and pharmacodynamic consequences. Built with a deterministic simulation engine running in Web Workers for consistent training scenarios.',
      services: ['Medical Simulation', '3D Interaction', 'PK/PD Modeling', 'Training Platform'],
      color: 'from-primary-600 to-primary-800'
    },
    {
      name: 'Terracotta Construction',
      url: 'https://terracottaconstruction.com',
      screenshot: '/images/portfolio/terracotta-construction.png',
      industry: 'Construction',
      shortDesc: 'Houston-area general contractor specializing in residential and commercial construction.',
      description: 'Terracotta Construction is a trusted Houston-area general contractor delivering quality residential and commercial construction services. We built their professional website featuring project galleries showcasing their craftsmanship, detailed service pages for each construction specialty, and integrated lead capture forms that connect potential clients directly with their team. The mobile-responsive design ensures homeowners can explore their portfolio from any device.',
      services: ['Custom Website', 'SEO Optimization', 'Contact Forms', 'Project Gallery'],
      color: 'from-primary-600 to-primary-700'
    },
    {
      name: "Car's Collision & Refinish Shop",
      url: 'https://www.carscollisionandrefinishshop.com',
      screenshot: '/images/portfolio/cars-collision.png',
      industry: 'Automotive',
      shortDesc: 'Professional auto body repair and collision center serving the Houston community.',
      description: "Car's Collision & Refinish Shop provides expert auto body repair, paint refinishing, and collision restoration services. Their website showcases dramatic before-and-after galleries of their restoration work, detailed service explanations for insurance claims, and an easy-to-use online quote request system. The site helps customers understand the repair process and builds trust through visual proof of their quality workmanship.",
      services: ['Custom Website', 'Photo Gallery', 'Quote System', 'Service Pages'],
      color: 'from-primary-600 to-accent-700'
    },
    {
      name: 'AMW Air Conditioning',
      url: 'https://www.amwairconditioning.com',
      screenshot: '/images/portfolio/amw-air-conditioning.png',
      industry: 'HVAC',
      shortDesc: 'Reliable HVAC services including AC repair, installation, and maintenance plans.',
      description: 'AMW Air Conditioning delivers reliable heating and cooling solutions for homes and businesses throughout the Houston area. We rebuilt their website with emergency service prominently featured for urgent AC repairs, detailed maintenance plan options, and online scheduling, then added SEO, GEO (local) marketing, Google Ads, and Local Services Ads to drive qualified leads. See the full case study below.',
      services: ['Website Rebuild', 'SEO', 'GEO / Local Marketing', 'Google Ads', 'Local Services Ads'],
      color: 'from-accent-700 to-accent-800'
    },
    {
      name: 'Forge-X',
      url: 'https://forge-x.app',
      screenshot: '/images/portfolio/forge-x.png',
      industry: 'Technology',
      shortDesc: 'Advanced technology platform delivering innovative software solutions.',
      description: 'Forge-X represents our capabilities in building sophisticated technology platforms. This full-stack application features secure user authentication, interactive dashboards with real-time data visualization, and complex business logic handling. The platform demonstrates our ability to architect and develop enterprise-grade software solutions that scale with business needs.',
      services: ['Full-Stack Platform', 'User Portal', 'API Development', 'Dashboard Design'],
      color: 'from-accent-700 to-primary-600'
    },
    {
      name: 'SACVPN',
      url: 'https://www.sacvpn.com',
      screenshot: '/images/portfolio/sacvpn.png',
      industry: 'Cybersecurity',
      shortDesc: 'Zero-log enterprise VPN service providing secure, private internet access.',
      description: 'SACVPN is a zero-log enterprise VPN solution built for businesses and privacy-conscious users who demand true security. We developed the complete platform including user account management, Stripe subscription billing with multiple pricing tiers, secure authentication systems, and server connection infrastructure. The platform serves enterprise clients with centralized team management and dedicated IP options.',
      services: ['Enterprise Platform', 'Payment Processing', 'User Management', 'Subscription System'],
      color: 'from-surface-elevated to-surface'
    },
    {
      name: 'ColorFuse Prints',
      url: 'https://www.colorfuseprints.com',
      screenshot: '/images/portfolio/colorfuse-prints.png',
      industry: 'E-Commerce / Print',
      shortDesc: 'Custom printing and promotional products with easy online ordering.',
      description: 'ColorFuse Prints offers custom printing services for businesses and individuals, from business cards to promotional materials. We built their complete e-commerce platform with product customization tools that let customers design their own products, a robust shopping cart system, secure payment processing, and order management backend. The intuitive interface makes ordering custom prints simple for both first-time and returning customers.',
      services: ['E-Commerce', 'Product Customization', 'Order System', 'Payment Integration'],
      color: 'from-accent-700 to-primary-600'
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

  // The one real client quote on file -- rendered inside the FC Photo Houston
  // portfolio card, verbatim.
  const fcPhotoQuote = {
    quote: 'The photography portfolio and booking system Kyle built has transformed how we manage our business. Beautiful design, flawless functionality.',
    author: 'FC Photo Team',
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      {/* Hero -- homepage design language: black canvas, bracket eyebrow, hairline trust row */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden texture-grain">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up">
              <BracketEyebrow label="Client Work" />
            </div>
            <h1 className="mt-8 text-4xl sm:text-6xl leading-[1.05] font-display font-bold tracking-tight text-white animate-fade-in-up animation-delay-200">
              Our Work
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 animate-fade-in-up animation-delay-400">
              Real projects. <span className="font-bold text-accent-400">Real results</span>. Real businesses. See how we&apos;ve helped Houston companies grow with custom web solutions and measurable outcomes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up animation-delay-600">
              <Link href="/contact" className="group btn-primary px-6 py-3 text-base">
                Get a Flat Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </Link>
              <Link href="/pricing" className="btn-secondary px-6 py-3 text-base">
                View Pricing
              </Link>
            </div>
          </div>

          {/* Trust row -- facts, plainly stated, separated by hairlines */}
          <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 animate-fade-in-up animation-delay-800">
            <div className="border-l border-primary-500/40 pl-4">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Projects completed</dt>
              <dd className="mt-1.5 text-3xl font-semibold text-white tracking-tight">200+</dd>
            </div>
            <div className="border-l border-primary-500/40 pl-4">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Years experience</dt>
              <dd className="mt-1.5 text-3xl font-semibold text-white tracking-tight">14+</dd>
            </div>
            <div className="border-l border-primary-500/40 pl-4">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Average project time</dt>
              <dd className="mt-1.5 text-3xl font-semibold text-white tracking-tight">2 weeks</dd>
            </div>
            <div className="border-l border-primary-500/40 pl-4">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Hidden fees</dt>
              <dd className="mt-1.5 text-3xl font-semibold text-white tracking-tight">0%</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Case Studies -- the quantified client outcomes lead the page */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <BracketEyebrow label="Case Studies" />
            <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
              Success Stories
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Deep dives into how we&apos;ve solved real business problems with measurable results.
            </p>
          </div>

          <div className="space-y-10">
            {caseStudies.map((study, index) => (
              <article
                key={study.client}
                className="rounded-2xl border border-surface-border bg-surface-card p-8 shadow-card card-lift lg:p-10"
              >
                {study.screenshot ? (
                  <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
                    <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                      <BrowserFrame
                        src={study.screenshot}
                        alt={`${study.client} website screenshot`}
                        url={study.domain ?? undefined}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                      />
                    </div>
                    <CaseStudyBody study={study} />
                  </div>
                ) : (
                  <CaseStudyBody study={study} wide />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Live Portfolio */}
      <section className="bg-surface-card py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <BracketEyebrow label="Live Portfolio" />
            <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
              See Our Work Live
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Real projects we&apos;ve built for real businesses. Live sites and custom solutions.
            </p>
            <p className="mt-3 text-sm text-gray-400">
              This is a selection of recent projects, not a complete list of everything we&apos;ve built.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {liveSites.map((project) => (
              <article
                key={project.name}
                className="group relative flex flex-col rounded-2xl border border-surface-border bg-surface p-5 shadow-card card-lift"
              >
                {/* Browser-framed homepage screenshot, links to the live site */}
                <a
                  href={project.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                >
                  <BrowserFrame
                    src={project.screenshot!}
                    alt={`${project.name} homepage screenshot`}
                    url={project.url ? displayDomain(project.url) : undefined}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </a>

                <div className="flex flex-1 flex-col pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
                    {project.industry}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white transition-colors group-hover:text-primary-400">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-primary-400">
                    {project.shortDesc}
                  </p>

                  <p className="mt-4 leading-relaxed text-gray-300">
                    {project.description}
                  </p>

                  {project.name === 'FC Photo Houston' ? (
                    <figure className="mt-4 border-l-2 border-primary-500/40 pl-4 text-sm italic text-gray-400">
                      <blockquote>&quot;{fcPhotoQuote.quote}&quot;</blockquote>
                      <figcaption className="mt-1 not-italic text-xs text-gray-500">
                        {fcPhotoQuote.author}
                      </figcaption>
                    </figure>
                  ) : null}

                  {/* Services tags */}
                  <div className="mt-4 mb-6 flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-400"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-auto self-start px-5 py-2.5 text-sm"
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
            <Link href="/contact" className="group btn-primary px-6 py-3 text-base">
              Get a Flat Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Tools & Systems (projects without a public URL/screenshot) */}
      <section className="bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <BracketEyebrow label={"Tools & Systems We've Built"} />
            <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
              Behind the Scenes
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Private and internal platforms we&apos;ve built that don&apos;t have a public homepage to
              show. A selection of recent work, not a complete list.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internalTools.map((project) => (
              <div
                key={project.name}
                className="group relative flex flex-col rounded-2xl border border-surface-border bg-surface-card p-6 shadow-card card-lift"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${project.color} text-sm font-bold text-white`}>
                    {getInitials(project.name)}
                  </div>
                  <div className="inline-flex items-center rounded-full bg-surface-elevated px-3 py-1 text-xs font-semibold text-gray-300">
                    {project.industry}
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">{project.name}</h3>
                <p className="mb-3 text-sm font-medium text-primary-400">{project.shortDesc}</p>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-300">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-medium text-primary-400"
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

      {/* Final CTA -- plain, sober, matches the homepage closing band */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            200+ projects completed. Let&apos;s build something great together with transparent pricing and proven results.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="group btn-primary px-6 py-3 text-base">
              Get a Flat Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
            </Link>
            <Link href="/pricing" className="btn-secondary px-6 py-3 text-base">
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Free consultation &bull; Fast turnaround &bull; Transparent pricing
          </p>
        </div>
      </section>
    </>
  )
}
