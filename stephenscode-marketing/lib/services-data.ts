export type ServiceCategory = 'core' | 'premium' | 'addon-basic' | 'addon-advanced'

export interface Service {
  id: string
  name: string
  slug: string
  category: ServiceCategory
  price: number
  priceLabel: string
  pricingUrl?: string
  /** Slug of a matching /demos/[slug] interactive example, if one exists for this tier. */
  demoSlug?: string
  shortDescription: string
  longDescription: string
  features: string[]
  benefits: string[]
  useCases: string[]
  deliverables: string[]
  timeline: string
  seoKeywords: string[]
  metaTitle: string
  metaDescription: string
  faqs?: { question: string; answer: string }[]
}

export const corePackages: Service[] = [
  {
    id: 'plug-and-play',
    name: 'Plug and Play',
    slug: 'plug-and-play',
    category: 'core',
    price: 250,
    priceLabel: '$250',
    shortDescription: 'Professional design for WIX, GoDaddy, or similar platforms',
    longDescription: `Transform your existing website builder into a professional online presence. Perfect for businesses using platforms like WIX, GoDaddy, Squarespace, or Weebly who want a custom design without the complexity of a full rebuild. Our Plug and Play service delivers a professionally designed website that works seamlessly with your existing platform, combining the ease of use you love with the polished look your business deserves.`,
    features: [
      'Custom design on your existing platform',
      'Up to 5 pages (Home, About, Services, Contact, etc.)',
      'Mobile-responsive layout',
      'Basic SEO setup and optimization',
      'Contact form integration',
      'Social media links',
      'Google Analytics setup',
      'Image optimization',
      'One round of revisions',
    ],
    benefits: [
      'Keep using the platform you\'re familiar with',
      'Professional design without platform migration',
      'Quick turnaround time (1 week)',
      'Affordable entry point for small businesses',
      'No ongoing development costs',
      'Easy for you to update and maintain',
    ],
    useCases: [
      'Small businesses with existing WIX or GoDaddy sites',
      'Startups needing professional presence quickly',
      'Local service businesses (HVAC, plumbing, landscaping)',
      'Freelancers and consultants',
      'Businesses happy with their platform but not their design',
    ],
    deliverables: [
      'Professionally designed website',
      'Mobile-optimized layout',
      'SEO-ready structure',
      'Training on how to update content',
      '1 week of post-launch support',
    ],
    timeline: '1 week',
    seoKeywords: ['WIX website design', 'GoDaddy website redesign', 'affordable website design Houston', 'small business website Conroe'],
    metaTitle: 'Wix & GoDaddy Redesign From $250 | Keep Your Platform',
    metaDescription: 'Get a professional custom design on your existing Wix, GoDaddy, or Squarespace site -- no rebuild, no new platform to learn. Flat $250, live in a week. Veteran-owned, Houston, Conroe & The Woodlands.',
  faqs: [
    {
      "question": "What is the Plug and Play package, and does it replace my current website builder?",
      "answer": "No -- Plug and Play keeps you on the platform you already use (WIX, GoDaddy, Squarespace, or Weebly) and gives it a professional custom design instead of migrating you to a new system. It's built for businesses who like their current builder but not their current look."
    },
    {
      "question": "How much does it cost and how long does it take?",
      "answer": "Plug and Play is a flat $250 with a typical turnaround of about 1 week. That includes design, up to 5 pages, and one round of revisions before launch."
    },
    {
      "question": "What's included for $250?",
      "answer": "You get a custom design across up to 5 pages (Home, About, Services, Contact, etc.), a mobile-responsive layout, basic SEO setup, contact form integration, social media links, Google Analytics setup, image optimization, and one round of revisions. You'll also get a quick training walkthrough on updating content yourself."
    },
    {
      "question": "Who is this package best suited for?",
      "answer": "It's aimed at small businesses, startups, local service providers (HVAC, plumbing, landscaping), and freelancers who already have a WIX or GoDaddy-style site and just need it to look and function like a professional build without the cost or complexity of a full custom rebuild."
    }
  ],
  },
  {
    id: 'website-rebuild',
    name: 'Website Rebuild',
    slug: 'website-rebuild',
    category: 'core',
    price: 350,
    priceLabel: '$350',
    shortDescription: 'Complete website refresh or rebuild on existing platform',
    longDescription: `Breathe new life into your outdated website with a complete rebuild. Perfect for businesses whose websites look dated, perform poorly, or don't reflect their current brand. Our Website Rebuild service takes your existing content and transforms it into a modern, mobile-friendly, SEO-optimized website that converts visitors into customers. Whether you're on WordPress, WIX, or another platform, we'll give you a fresh start without starting from scratch.`,
    features: [
      'Complete website redesign',
      'Content migration and reorganization',
      'Modern, mobile-first layout',
      'Speed optimization',
      'SEO improvements',
      'Broken link fixes',
      'Image optimization',
      'Contact form updates',
      'Security updates (if applicable)',
      'Two rounds of revisions',
    ],
    benefits: [
      'Modernize your online presence',
      'Improve search engine rankings',
      'Better mobile experience for visitors',
      'Faster page load times',
      'Keep your existing domain and content',
      'Professional brand consistency',
    ],
    useCases: [
      'Businesses with outdated websites (5+ years old)',
      'Companies rebranding or pivoting',
      'Websites with poor mobile experience',
      'Sites with declining traffic or conversions',
      'Businesses expanding their services',
    ],
    deliverables: [
      'Fully redesigned website',
      'All content migrated and optimized',
      'Mobile-responsive design',
      'Speed and SEO improvements',
      'Training documentation',
      '2 weeks of post-launch support',
    ],
    timeline: '2 weeks',
    seoKeywords: ['website rebuild Houston', 'website redesign Conroe', 'modernize website Texas', 'website refresh services'],
    metaTitle: 'Website Rebuild, Same Content, New Look | $350',
    metaDescription: 'Complete website rebuild service. Modernize your outdated site with mobile-responsive design and SEO optimization. $350 flat rate. Houston & Conroe.',
  faqs: [
    {
      "question": "What does the $350 Website Rebuild actually include?",
      "answer": "For a flat $350 you get a complete redesign of your existing site: your current content migrated and reorganized, a modern mobile-first layout, speed and SEO improvements, broken link fixes, image optimization, and updated contact forms. Two rounds of revisions and 2 weeks of post-launch support are included, and you get training documentation so you know how to manage the new site."
    },
    {
      "question": "Do I need to give you a new domain or start over with content?",
      "answer": "No. This service is built for businesses that already have a website and just need it modernized -- your existing domain and content carry over. We migrate and reorganize what you already have rather than writing everything from scratch, which is what keeps the price and timeline down compared to a full custom build."
    },
    {
      "question": "How long does a rebuild take, and is this different from the Plug and Play package?",
      "answer": "A Website Rebuild typically takes about 2 weeks from start to finish. It's a step up from the Plug and Play tier -- rather than a quick platform refresh, it's a full redesign with content migration, speed optimization, and SEO work, plus a longer 2-week support window after launch."
    },
    {
      "question": "Is my site a good fit for a rebuild versus a brand-new custom site?",
      "answer": "If your current site is 5+ years old, performs poorly on mobile, has declining traffic, or just no longer matches your brand, a rebuild is usually the right call since it reuses your existing platform and content. If you're outgrowing your platform entirely or need custom functionality beyond a redesign, one of our higher core or premium tiers would be a better fit."
    }
  ],
  },
  {
    id: 'standard-website',
    name: 'Standard Website',
    slug: 'standard-website',
    category: 'core',
    price: 950,
    priceLabel: '$950',
    shortDescription: 'Custom-built website with Home, About, Services, Contact pages',
    longDescription: `Get a fully custom-built website designed specifically for your business. Our Standard Website package is perfect for small to medium-sized businesses that need a professional online presence without the complexity of a full enterprise platform. Built with modern technologies like React and Next.js, your website will be fast, secure, SEO-optimized, and built to convert visitors into customers. Unlike template-based sites, every element is crafted to match your brand and serve your business goals.`,
    features: [
      'Custom design and development',
      'Up to 6 pages (Home, About, Services, Portfolio, Contact, etc.)',
      'Modern tech stack (React/Next.js)',
      'Fully responsive mobile design',
      'Contact forms with email notifications',
      'Google Analytics integration',
      'Advanced SEO optimization',
      'Fast page load times (optimized for Core Web Vitals)',
      'SSL certificate setup',
      'Free hosting setup assistance',
      'Three rounds of revisions',
    ],
    benefits: [
      'Custom-built, not template-based',
      'Better Google rankings (SEO optimized)',
      'Faster load times than WordPress',
      'Modern, professional design',
      'Scalable for future growth',
      'Full ownership of code',
      'Ongoing support available',
    ],
    useCases: [
      'Small businesses establishing online presence',
      'Service businesses (contractors, consultants, agencies)',
      'Professional services (lawyers, doctors, accountants)',
      'Local businesses targeting Houston/Conroe markets',
      'Companies migrating from outdated platforms',
    ],
    deliverables: [
      'Fully custom website (up to 6 pages)',
      'Mobile-responsive design',
      'SEO-optimized structure',
      'Contact form with email notifications',
      'Google Analytics dashboard',
      'Source code and documentation',
      '90 days of post-launch support',
    ],
    timeline: '3-4 weeks',
    seoKeywords: ['custom website development Houston', 'small business website Conroe', 'professional website design Texas', 'Next.js website development'],
    metaTitle: 'Custom-Built Website, No Templates | $950 Flat',
    metaDescription: 'Custom website development for small businesses. Fully responsive, SEO-optimized, modern tech stack. $950 flat rate. Houston, Conroe & The Woodlands.',
  faqs: [
    {
      "question": "What's included in the $950 Standard Website package?",
      "answer": "You get a fully custom-built site of up to 6 pages (Home, About, Services, Portfolio, Contact, etc.), built on a modern React/Next.js stack rather than a template. It includes responsive mobile design, a contact form with email notifications, Google Analytics integration, SSL setup, advanced SEO optimization, and three rounds of revisions."
    },
    {
      "question": "How long does the Standard Website take to build?",
      "answer": "The typical timeline is 3-4 weeks from kickoff to launch. Because it's flat-rate and custom-coded (not assembled from a page builder), the timeline covers real design and development work rather than just configuring a template."
    },
    {
      "question": "Do I own the code, and what happens after launch?",
      "answer": "Yes, you receive the full source code and documentation with no platform lock-in. It also includes 90 days of post-launch support, so if something needs adjusting after you go live, that's covered as part of the flat $950 rate, not billed hourly."
    },
    {
      "question": "How is this different from the E-Commerce Website package?",
      "answer": "The Standard Website is built for businesses that need a strong informational presence, not online sales. If you need to actually sell products or services online, the E-Commerce Website tier ($1,100) builds on this same foundation and adds Stripe payment processing, a product catalog, and shopping cart functionality."
    }
  ],
  },
  {
    id: 'ecommerce-website',
    name: 'E-Commerce Website',
    slug: 'ecommerce-website',
    category: 'core',
    price: 1100,
    priceLabel: '$1,100',
    demoSlug: 'peak-performance-supplements',
    shortDescription: 'All Standard features + online store, payment gateway, and inventory sync',
    longDescription: `Launch your online store with a complete e-commerce solution built for growth. Our E-Commerce Website package includes everything from the Standard Website plus full online shopping functionality with Stripe payment processing, inventory management, and order tracking. Perfect for businesses ready to sell products or services online, this package gives you a professional online store without the monthly fees of platforms like Shopify or WooCommerce plugins.`,
    features: [
      'All Standard Website features',
      'Stripe payment gateway integration',
      'Product catalog (up to 50 products initially)',
      'Shopping cart functionality',
      'Secure checkout process',
      'Order management system',
      'Basic inventory tracking',
      'Vendor/supplier sync capabilities',
      'Customer accounts (optional)',
      'Email receipts and confirmations',
      'Sales tax calculation',
      'Shipping calculator',
      'Mobile-optimized checkout',
    ],
    benefits: [
      'No monthly platform fees (like Shopify)',
      'Accept credit cards securely',
      'Full control over your store',
      'Scalable as your business grows',
      'Integrated with your business systems',
      'Better SEO than marketplace platforms',
      'Lower transaction fees than Shopify',
    ],
    useCases: [
      'Retailers selling physical products',
      'Service businesses selling packages',
      'B2B companies with product catalogs',
      'Local businesses expanding online',
      'Wholesale suppliers with online ordering',
    ],
    deliverables: [
      'Complete e-commerce website',
      'Stripe payment integration',
      'Product management system',
      'Order tracking dashboard',
      'Customer email notifications',
      'Sales reporting',
      'Training on managing products and orders',
      '60 days of post-launch support',
    ],
    timeline: '4-6 weeks',
    seoKeywords: ['e-commerce website development Houston', 'online store development Texas', 'Stripe integration Conroe', 'custom shopping cart development'],
    metaTitle: 'E-Commerce Website, No Monthly Fees | $1,100 Flat',
    metaDescription: 'Own your online store outright -- Stripe checkout, inventory tracking, and order management included, zero Shopify-style monthly fees. $1,100 flat rate. Veteran-owned, Houston & Conroe.',
  faqs: [
    {
      "question": "What exactly do I get for the $1,100 flat rate?",
      "answer": "The E-Commerce Website package includes everything in the Standard Website tier plus a full online store: Stripe payment gateway integration, a product catalog for up to 50 products initially, shopping cart and secure checkout, order management, basic inventory tracking, sales tax calculation, and a shipping calculator. It's a one-time flat fee, not a monthly subscription."
    },
    {
      "question": "How long does it take to launch an online store?",
      "answer": "Typical turnaround is 4-6 weeks, which is longer than the Standard Website timeline because of the added Stripe integration, product catalog setup, and checkout/order testing involved in a working store."
    },
    {
      "question": "What if I have more than 50 products?",
      "answer": "The base package is scoped for an initial catalog of up to 50 products, which covers most small retailers and service businesses launching their first online store. Larger catalogs can be scoped as a custom add-on since product volume affects setup and testing time."
    },
    {
      "question": "How is this different from just using Shopify or a WooCommerce plugin?",
      "answer": "You get a fully custom-built store with no recurring monthly platform fees and typically lower transaction costs than Shopify, plus full ownership of the code and design. It also comes with 60 days of post-launch support and training on managing your products and orders after handoff."
    }
  ],
  },
]

export const premiumBuilds: Service[] = [
  {
    id: 'premium-build',
    name: 'Premium Build',
    slug: 'premium-build',
    category: 'premium',
    price: 2000,
    priceLabel: '$2,000',
    shortDescription: 'Custom full-stack site with admin portal and KPI dashboard. Up to 15 pages plus CMS.',
    longDescription: `Elevate your business with a premium full-stack web application. Our $2,000 Premium Build is designed for businesses that need more than a website. You need a complete business system. This package includes up to 15 pages, a custom admin portal, analytics dashboard, user management, and advanced features tailored to your specific workflow. Built with enterprise-grade technologies, your premium build will scale with your business and give you competitive advantages in your market.`,
    features: [
      'Up to 15 pages included',
      'Advanced full-stack development',
      'Custom admin portal',
      'Analytics dashboard with real-time data',
      'User role management',
      'Database design and optimization',
      'API development (if needed)',
      'Advanced authentication system',
      'Email automation',
      'File upload and management',
      'Advanced SEO and performance optimization',
      'Custom integrations (CRM, accounting, etc.)',
      'Unlimited revisions during development',
    ],
    benefits: [
      'Streamline business operations',
      'Data-driven decision making',
      'Competitive advantage in your market',
      'Scalable infrastructure',
      'Reduced manual work through automation',
      'Professional enterprise-level system',
    ],
    useCases: [
      'Growing businesses with complex workflows',
      'Companies managing multiple users/roles',
      'Businesses with custom data needs',
      'Service companies with client portals',
      'Organizations needing custom CRM',
    ],
    deliverables: [
      'Full-stack web application (up to 15 pages)',
      'Admin dashboard',
      'Analytics and reporting tools',
      'User management system',
      'Database architecture',
      'API documentation (if applicable)',
      'Training and documentation',
      '90 days of post-launch support',
    ],
    timeline: '6-8 weeks',
    seoKeywords: ['custom web application Houston', 'full-stack development Texas', 'admin portal development Conroe', 'business dashboard development'],
    metaTitle: 'Custom Web App With Admin Portal | $2,000 Flat',
    metaDescription: 'Full-stack custom platform with your own admin dashboard, live analytics, and up to 15 pages -- built once, no subscriptions. $2,000 flat rate. Veteran-owned, Houston & Conroe.',
  faqs: [
    {
      "question": "What exactly do I get for the $2,000 Premium Build price?",
      "answer": "For a flat $2,000 you get a custom full-stack web application of up to 15 pages, including a custom admin portal, a real-time analytics dashboard, user role management, and database design and optimization. It also covers advanced authentication, email automation, file upload/management, and custom integrations like CRM or accounting software if your workflow needs them. There is no hourly billing and revisions are unlimited during the development phase."
    },
    {
      "question": "How is the Premium Build different from a standard website package?",
      "answer": "A standard site build gets you pages and content, while the Premium Build adds the business systems layer on top: a custom admin portal, a KPI/analytics dashboard with real-time data, and role-based user management. It is built for businesses that need more than a marketing site, such as an internal tool, client portal, or a system with its own data workflows. API development is included if your project requires one."
    },
    {
      "question": "How long does a Premium Build take to launch?",
      "answer": "The typical timeline is 6-8 weeks from kickoff to launch. Because it includes custom admin portal and dashboard work, database design, and any needed API development, it takes longer than a standard site build, but you get unlimited revisions during that development window so the final system matches your actual workflow."
    },
    {
      "question": "What kind of support do I get after launch?",
      "answer": "Every Premium Build includes 90 days of post-launch support, plus training and documentation so your team can operate the admin portal, dashboard, and user management system confidently. This covers fixing issues that surface after go-live, not ongoing feature work, so businesses that expect frequent future changes often pair it with one of our maintenance add-ons."
    }
  ],
  },
  {
    id: 'custom-business-platform',
    name: '$5,000 Custom Business Platform',
    slug: 'custom-business-platform',
    category: 'premium',
    price: 5000,
    priceLabel: '$5,000',
    demoSlug: 'premier-staffing-solutions',
    shortDescription: 'Complete business system (up to 25 pages): CRM, client portals, APIs',
    longDescription: `Build a complete custom business platform tailored to your exact needs. The $5,000 Custom Business Platform package is perfect for businesses that need a unified system to manage everything in one place. This package includes up to 25 pages and we build you a custom platform that includes CRM, client portals, project management, invoicing, and all the integrations you need, owned entirely by you. Stop paying monthly SaaS fees and get full control of your business operations with a system built specifically for how you work.`,
    features: [
      'Up to 25 pages included',
      'Complete CRM system',
      'Client portal with login system',
      'Project/job management',
      'Invoicing and payments',
      'Email automation and templates',
      'Document management',
      'API integrations (accounting, email, etc.)',
      'Mobile-responsive design',
      'Multi-user access with roles',
      'Advanced reporting and analytics',
      'Automated workflows',
      'Notification system',
      'Custom features for your industry',
    ],
    benefits: [
      'Stop paying monthly SaaS fees',
      'All systems in one platform',
      'Full data ownership and control',
      'Customized to your exact workflow',
      'Scalable infrastructure',
      'Long-term cost savings',
      'Competitive advantage',
    ],
    useCases: [
      'Agencies managing client projects',
      'Service businesses with complex workflows',
      'Companies tired of expensive SaaS tools',
      'Businesses with custom processes',
      'Growing companies needing scalability',
    ],
    deliverables: [
      'Complete business management system (up to 25 pages)',
      'CRM and client portal',
      'Project management tools',
      'Invoicing and payment processing',
      'API integrations',
      'Mobile-responsive design',
      'Comprehensive training',
      '6 months of support and updates',
    ],
    timeline: '10-12 weeks',
    seoKeywords: ['custom CRM development Houston', 'business management system Texas', 'custom business platform Conroe', 'client portal development'],
    metaTitle: 'Replace Your SaaS Stack, Own It | $5,000 Flat',
    metaDescription: 'Build a complete custom business platform with CRM, client portals, project management, and integrations. Up to 25 pages. $5,000 flat rate. Houston & Conroe.',
  faqs: [
    {
      "question": "What exactly do we get for the $5,000 flat rate?",
      "answer": "Up to 25 pages plus a full custom business platform: a CRM, a client portal with its own login system, project/job management, invoicing and payments, email automation, document management, and API integrations (accounting, email, etc.). Multi-user access with roles, advanced reporting, automated workflows, and a notification system are all included, and you own the entire system outright rather than renting it."
    },
    {
      "question": "How long does a build like this take, and what support comes after launch?",
      "answer": "Typical timeline is 10-12 weeks given the number of connected modules (CRM, portal, invoicing, integrations, etc.) that have to be built and tested together. This package includes comprehensive training plus 6 months of support and updates after launch, longer than the standard 90-day window on other tiers."
    },
    {
      "question": "How is this different from just paying for CRM/project-management SaaS tools?",
      "answer": "Instead of stacking monthly subscriptions for a CRM, client portal, invoicing tool, and project manager separately, this consolidates all of it into one platform built specifically around your workflow. You get full data ownership and control, and the flat $5,000 replaces ongoing SaaS fees with a one-time build cost."
    },
    {
      "question": "Who is this package the right fit for?",
      "answer": "It's built for agencies managing multiple client projects, service businesses with complex operational workflows, and growing companies that are tired of juggling several disconnected SaaS tools. If your business needs custom processes or is outgrowing off-the-shelf software, this tier is designed to scale with you."
    }
  ],
  },
  {
    id: 'enterprise-platform',
    name: '$7,500 Enterprise Platform',
    slug: 'enterprise-platform',
    category: 'premium',
    price: 7500,
    priceLabel: '$7,500',
    shortDescription: 'Large-scale platform (up to 40 pages): admin system, staff roles, automation',
    longDescription: `Build an enterprise-grade platform that powers your entire organization. The $7,500 Enterprise Platform is designed for established businesses and organizations that need sophisticated systems with advanced automation, reporting, and multi-location support. This package includes up to 40 pages with everything from staff management and role-based access to automated workflows, advanced analytics, and integrations with your existing business tools.`,
    features: [
      'Up to 40 pages included',
      'Enterprise-grade architecture',
      'Advanced admin system',
      'Complex staff role management',
      'Multi-location/multi-tenant support',
      'Advanced workflow automation',
      'Comprehensive reporting suite',
      'Mobile-responsive design',
      'Advanced API integrations',
      'Real-time data synchronization',
      'Advanced security features',
      'Scalable cloud infrastructure',
      'White-label capabilities',
      'Advanced analytics and BI',
    ],
    benefits: [
      'Enterprise-level capabilities at fraction of cost',
      'Complete organizational automation',
      'Data-driven insights and reporting',
      'Multi-location management',
      'Competitive enterprise advantages',
      'Long-term scalability',
      'Full customization to your needs',
    ],
    useCases: [
      'Medium-sized organizations with complex needs',
      'Multi-location businesses',
      'Companies with advanced automation requirements',
      'Organizations replacing legacy systems',
      'Businesses needing robust reporting',
    ],
    deliverables: [
      'Complete enterprise platform (up to 40 pages)',
      'Admin and staff portals',
      'Automation engine',
      'Reporting and analytics suite',
      'API integrations',
      'Mobile-responsive design',
      'Documentation and training',
      '1 year of support and maintenance',
    ],
    timeline: '12-16 weeks',
    seoKeywords: ['enterprise web development Houston', 'custom enterprise platform Texas', 'business automation platform Conroe', 'enterprise software development'],
    metaTitle: 'Multi-Location Enterprise Platform | $7,500 Flat',
    metaDescription: 'Enterprise-grade platform with admin systems, workflow automation, and advanced analytics -- up to 40 pages. $7,500 flat rate. Houston & Conroe.',
  faqs: [
    {
      "question": "What exactly do we get for $7,500, and how is it different from the other premium tiers?",
      "answer": "The Enterprise Platform is the top premium tier: up to 40 pages with an advanced admin system, complex staff role management, multi-location/multi-tenant support, and workflow automation baked in. It goes further than the $2,000, $5,000, and $7,500-adjacent lower tiers by adding a comprehensive reporting suite, advanced BI/analytics, and white-label capabilities for organizations running more than one brand or location."
    },
    {
      "question": "How long does a project like this take?",
      "answer": "Enterprise Platform builds run 12 to 16 weeks. That longer timeline reflects the scope: staff role architecture, multi-location logic, automated workflows, and API integrations with your existing business tools all need to be designed and tested, not just styled."
    },
    {
      "question": "Do we need multiple locations or a lot of staff to justify this tier?",
      "answer": "It is built for that use case, but the core driver is complexity, not headcount. It fits established organizations that need multi-location or multi-tenant support, layered staff permissions, and automated reporting -- if you only need a single admin login and basic CRM, the $5,000 tier is likely a better fit and lower cost."
    },
    {
      "question": "Does this include ongoing support after launch, or is that separate?",
      "answer": "As a premium tier build, it includes the standard 90 days of post-launch support at no extra charge for fixes and adjustments. Ongoing maintenance, hosting, and any further custom development beyond that window are handled as separate flat-rate add-ons, never hourly billing."
    }
  ],
  },
  {
    id: 'enterprise-custom',
    name: 'Enterprise Custom',
    slug: 'enterprise-custom',
    category: 'premium',
    price: 0,
    priceLabel: 'Custom Quote',
    shortDescription: 'Large-scale enterprise solutions: mobile apps, 40+ pages, complex integrations',
    longDescription: `For organizations requiring large-scale enterprise solutions that exceed our standard packages, we offer custom enterprise development with personalized quotes. This includes projects requiring mobile applications (iOS/Android), 40+ pages, complex multi-system integrations, AI/ML features, or city/government-scale platforms. These projects typically start at $15,000+ and are scoped individually based on your exact requirements.`,
    features: [
      'Unlimited pages and features',
      'Native mobile applications (iOS/Android)',
      'Custom AI/ML integrations',
      'Complex multi-system integrations',
      'Government/municipality-grade security',
      'Multi-tenant SaaS architecture',
      'Advanced data warehousing',
      'Custom reporting and BI dashboards',
      'Legacy system migration',
      'Dedicated project management',
      'Extended support agreements',
      'SLA and uptime guarantees',
      'Compliance (HIPAA, SOC2, etc.)',
      'On-premise or hybrid deployment',
    ],
    benefits: [
      'Tailored solution for complex requirements',
      'Enterprise-grade security and compliance',
      'Dedicated development team',
      'Flexible engagement models',
      'Long-term partnership approach',
      'Full ownership of all code and IP',
      'Scalable to millions of users',
    ],
    useCases: [
      'City and municipal government websites',
      'Large corporations and enterprises',
      'Healthcare organizations requiring HIPAA compliance',
      'Financial institutions',
      'Multi-national organizations',
      'SaaS product development',
      'Projects requiring native mobile apps',
    ],
    deliverables: [
      'Comprehensive project scoping document',
      'Custom development timeline',
      'Dedicated project manager',
      'All custom features and integrations',
      'Complete documentation',
      'Training programs',
      'Custom support and maintenance agreements',
      'Source code and full IP ownership',
    ],
    timeline: 'Varies by project',
    seoKeywords: ['enterprise software development Houston', 'custom enterprise solutions Texas', 'government website development', 'large scale web development'],
    metaTitle: 'Custom Enterprise Apps & Platforms | From $15,000',
    metaDescription: 'Large-scale enterprise solutions with mobile apps, 40+ pages, and government-grade security. Custom quotes from $15,000. Houston & Conroe.',
  faqs: [
    {
      "question": "How much does an Enterprise Custom project cost?",
      "answer": "There's no flat rate for Enterprise Custom because scope varies too much project to project. These builds typically start at $15,000+ and are quoted individually once we understand your exact requirements, whether that's mobile apps, complex integrations, or compliance needs."
    },
    {
      "question": "How long does an Enterprise Custom build take?",
      "answer": "Timeline is scoped per project rather than fixed, since a native mobile app or a multi-tenant SaaS platform takes very different amounts of time to build. As part of the engagement you get a comprehensive scoping document with a custom development timeline before work starts."
    },
    {
      "question": "When do I need Enterprise Custom instead of the standard Enterprise Platform package?",
      "answer": "If your project needs more than 40 pages, native iOS/Android apps, custom AI/ML features, multi-tenant SaaS architecture, or government/HIPAA/SOC2-grade compliance, it exceeds what the standard Enterprise Platform tier covers. Enterprise Custom is built for city/municipal sites, large corporations, healthcare organizations, financial institutions, and SaaS products with these advanced requirements."
    },
    {
      "question": "Do I own the code, and is ongoing support included?",
      "answer": "Yes -- you get full ownership of all code and IP, delivered with complete documentation and training. Custom support and maintenance agreements, including SLA and uptime guarantees where needed, are built into the scope alongside a dedicated project manager for the engagement."
    }
  ],
  },
]

// Add-ons will be in a separate file due to length
// addon-basic.ts and addon-advanced.ts
