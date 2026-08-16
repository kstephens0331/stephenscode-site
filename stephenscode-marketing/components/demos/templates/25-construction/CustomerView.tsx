'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import Layout from './components/Layout'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

const initialQuoteData = {
  projectType: '',
  sqft: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  details: ''
}

const initialContactData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
}

interface PortfolioProject {
  title: string
  type: string
  sqft: string
  value: string
  image: string
  duration: string
  completed: string
  quoteType: string
  summary: string
  scope: string[]
}

const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Modern Farmhouse, Austin, TX',
    type: 'Custom Home',
    sqft: '3,200 sqft',
    value: '$1.2M',
    image: '🏡',
    duration: '11 months',
    completed: '2024',
    quoteType: 'custom-home',
    summary: 'A ground-up custom build blending farmhouse character with modern efficiency. The clients wanted open living space for a family of five plus a dedicated home office wing.',
    scope: ['4 bed / 3.5 bath open floor plan', 'Vaulted great room with exposed beams', 'Chef kitchen with quartz island', 'Energy-efficient spray foam insulation', 'Covered outdoor living with fireplace', 'Smart home wiring throughout']
  },
  {
    title: 'Downtown Office Renovation',
    type: 'Commercial',
    sqft: '12,000 sqft',
    value: '$850K',
    image: '🏢',
    duration: '7 months',
    completed: '2024',
    quoteType: 'commercial',
    summary: 'Full interior renovation of a three-story office building while the ground floor stayed open for business. Phased scheduling kept tenant disruption to a minimum.',
    scope: ['Open-concept workspace conversion', 'New HVAC and electrical service', 'Glass-wall conference rooms', 'ADA-compliant restrooms and elevator lobby', 'Polished concrete and acoustic ceilings', 'Fire suppression system upgrade']
  },
  {
    title: 'Luxury Kitchen Remodel',
    type: 'Remodeling',
    sqft: '450 sqft',
    value: '$95K',
    image: '🔪',
    duration: '9 weeks',
    completed: '2023',
    quoteType: 'remodel',
    summary: 'A dated galley kitchen opened into the adjacent dining room to create a single entertaining space with a 10-foot waterfall island.',
    scope: ['Load-bearing wall removal with steel beam', 'Custom inset cabinetry to the ceiling', 'Quartzite counters and full-height backsplash', 'Panel-ready appliance package', 'Under-cabinet and toe-kick lighting', 'Wide-plank white oak flooring']
  },
  {
    title: 'Master Suite Addition',
    type: 'Addition',
    sqft: '800 sqft',
    value: '$275K',
    image: '🛏️',
    duration: '5 months',
    completed: '2023',
    quoteType: 'addition',
    summary: 'A single-story addition off the back of a 1970s ranch, giving the owners a private suite with a spa bathroom and walk-in closet.',
    scope: ['Foundation and framing matched to existing', 'Cathedral ceiling with clerestory windows', 'Spa bath with curbless walk-in shower', 'Heated tile flooring', 'Custom walk-in closet system', 'Seamless roofline and siding match']
  },
  {
    title: 'Craftsman Restoration',
    type: 'Remodeling',
    sqft: '2,800 sqft',
    value: '$425K',
    image: '🏠',
    duration: '10 months',
    completed: '2023',
    quoteType: 'remodel',
    summary: 'A 1921 craftsman brought back to its original character with fully modern systems behind the walls. Original millwork was restored piece by piece.',
    scope: ['Complete electrical and plumbing replacement', 'Original trim and built-in restoration', 'Period-correct windows with modern glazing', 'Kitchen and both bathrooms rebuilt', 'Foundation reinforcement', 'New cedar shake roof']
  },
  {
    title: 'Retail Buildout',
    type: 'Commercial',
    sqft: '5,500 sqft',
    value: '$380K',
    image: '🏬',
    duration: '4 months',
    completed: '2024',
    quoteType: 'commercial',
    summary: 'White-box to grand opening in 16 weeks for a flagship retail tenant, including storefront glazing, custom fixtures, and a full mechanical package.',
    scope: ['Storefront glass and entry system', 'Custom millwork display fixtures', 'Commercial kitchen prep area', 'New rooftop HVAC units', 'Decorative lighting package', 'Permit and inspection management']
  }
]

const portalDocuments = [
  {
    name: 'Blueprints - Final Version.pdf',
    updated: 'Updated Jan 12',
    pages: '24 pages',
    summary: 'Stamped construction drawings for the full project, including floor plans, elevations, and structural details.',
    contents: ['Sheet A-1: Site plan and setbacks', 'Sheet A-2: Foundation plan', 'Sheets A-3 to A-6: Floor plans and elevations', 'Sheet S-1: Structural framing details', 'Sheet E-1: Electrical layout', 'Sheet M-1: HVAC and mechanical layout']
  },
  {
    name: 'Building Permits - Approved.pdf',
    updated: 'Updated Jan 8',
    pages: '6 pages',
    summary: 'All approved permits issued by the city building department for this project.',
    contents: ['General building permit #B-2024-1187', 'Electrical permit #E-2024-0442', 'Plumbing permit #P-2024-0391', 'Mechanical permit #M-2024-0218', 'Inspection schedule and contact sheet']
  },
  {
    name: 'Material Selections.pdf',
    updated: 'Updated Jan 15',
    pages: '12 pages',
    summary: 'Every finish selection approved to date, with product numbers, colors, and room-by-room placement.',
    contents: ['Flooring: engineered white oak, natural finish', 'Kitchen counters: quartz, Calacatta pattern', 'Cabinet color: painted linen white', 'Tile: 3x12 ceramic subway, matte', 'Interior paint schedule by room', 'Exterior: board-and-batten, iron ore accent']
  },
  {
    name: 'Change Order #2 - Approved.pdf',
    updated: 'Updated Jan 10',
    pages: '3 pages',
    summary: 'Approved change adding a covered patio extension and upgraded patio door.',
    contents: ['Scope: extend covered patio 8 feet', 'Upgrade to 12-foot sliding glass door', 'Cost adjustment: +$14,250', 'Schedule impact: +6 working days', 'Signed by owner and project manager']
  },
  {
    name: 'Invoice #3 - Paid.pdf',
    updated: 'Updated Jan 5',
    pages: '2 pages',
    summary: 'Third progress payment covering framing completion and rough-in start.',
    contents: ['Milestone: framing complete', 'Amount: $87,500 - PAID', 'Payment received Jan 5', 'Running total paid: $262,500 of $850,000', 'Next invoice due at drywall completion']
  }
]

const portalPhotos = [
  { icon: '🏗️', caption: 'Framing complete on the second floor', date: 'Jan 14' },
  { icon: '🔨', caption: 'Interior wall blocking and backing', date: 'Jan 13' },
  { icon: '🪜', caption: 'Stair stringers set and secured', date: 'Jan 12' },
  { icon: '🎨', caption: 'Exterior color samples on site', date: 'Jan 11' },
  { icon: '💡', caption: 'Electrical rough-in, kitchen circuit run', date: 'Jan 10' },
  { icon: '🚪', caption: 'Interior doors delivered and staged', date: 'Jan 9' },
  { icon: '🪟', caption: 'Windows installed, south elevation', date: 'Jan 8' },
  { icon: '🛠️', caption: 'Plumbing top-out in master bath', date: 'Jan 7' }
]

const trackingProjects = [
  {
    id: 'anderson',
    label: 'Anderson Custom Home',
    detail: 'PRJ-2024-042 • 13-week framing-to-finish schedule',
    phases: [
      { phase: 'Planning & Permits', status: 'Completed', progress: 100, date: 'Week 1-2' },
      { phase: 'Foundation & Framing', status: 'Completed', progress: 100, date: 'Week 3-5' },
      { phase: 'Electrical & Plumbing', status: 'In Progress', progress: 75, date: 'Week 6-7' },
      { phase: 'Drywall & Insulation', status: 'Scheduled', progress: 0, date: 'Week 8-9' },
      { phase: 'Finishes & Fixtures', status: 'Upcoming', progress: 0, date: 'Week 10-12' },
      { phase: 'Final Inspection', status: 'Upcoming', progress: 0, date: 'Week 13' }
    ]
  },
  {
    id: 'thompson',
    label: 'Thompson Kitchen Remodel',
    detail: 'PRJ-2024-051 • 9-week remodel schedule',
    phases: [
      { phase: 'Design & Selections', status: 'Completed', progress: 100, date: 'Week 1-2' },
      { phase: 'Demolition', status: 'Completed', progress: 100, date: 'Week 3' },
      { phase: 'Structural & Rough-In', status: 'Completed', progress: 100, date: 'Week 4-5' },
      { phase: 'Cabinets & Counters', status: 'In Progress', progress: 60, date: 'Week 6-7' },
      { phase: 'Tile & Finishes', status: 'Scheduled', progress: 0, date: 'Week 8' },
      { phase: 'Punch List & Reveal', status: 'Upcoming', progress: 0, date: 'Week 9' }
    ]
  }
]

const testimonials = [
  { name: 'The Anderson Family', project: 'Custom Home', location: 'Austin, TX', rating: '5.0', quote: 'BuildRight walked us through every decision from lot prep to final walkthrough. The weekly photo updates in the client portal meant we always knew exactly where things stood.' },
  { name: 'Martinez Corp', project: 'Commercial Renovation', location: 'Downtown', rating: '4.9', quote: 'They renovated three floors while our ground-floor tenants stayed open. The phasing plan they built saved us months of lost rent. True professionals.' },
  { name: 'Rachel Thompson', project: 'Kitchen Remodel', location: 'Cedar Park, TX', rating: '5.0', quote: 'On budget, one week ahead of schedule, and the crew left the site cleaner than they found it every single day. Our kitchen is the heart of the house now.' },
  { name: 'The Davis Family', project: 'Home Addition', location: 'Round Rock, TX', rating: '4.8', quote: 'You genuinely cannot tell where the original house ends and the addition begins. The roofline match is perfect. Worth every penny.' },
  { name: 'Sarah Williams', project: 'Bathroom Renovation', location: 'Georgetown, TX', rating: '5.0', quote: 'From the 3D design preview to the heated floors, everything was exactly as promised. Communication was constant and honest.' },
  { name: 'Mike Johnson', project: 'Basement Finish', location: 'Leander, TX', rating: '4.9', quote: 'They caught a moisture issue the other bidders missed and fixed it properly before finishing. That is the kind of contractor you want.' }
]

const resourceGuides = [
  {
    title: 'How to Budget a Custom Home',
    description: 'What actually drives cost per square foot and where owners overspend.',
    contents: [
      'Land and site work typically run 15-25% of total budget. Sloped lots, poor soil, and long utility runs add cost fast.',
      'The structure itself (foundation, framing, roof) is the most stable cost. Finishes are where budgets swing: the same 3,000 sqft home can vary $200k+ on finishes alone.',
      'Carry a 10-15% contingency. On custom builds, most of it gets used on owner-driven upgrades, not surprises.',
      'Lock selections early. Late changes to cabinets, tile, or windows are the #1 cause of budget overruns.',
      'Ask every bidder for an itemized allowance schedule so you are comparing identical scopes.'
    ]
  },
  {
    title: 'Permits 101: What Needs One',
    description: 'A plain-language guide to when a permit is required and who pulls it.',
    contents: [
      'Structural changes, additions, new electrical circuits, plumbing relocation, and HVAC replacement virtually always require permits.',
      'Cosmetic work (paint, flooring, cabinet swaps in place) usually does not.',
      'Your contractor should pull the permits, not you. If a contractor asks you to pull an owner permit, that is a red flag about their license status.',
      'Unpermitted work surfaces at resale. Buyers\' inspectors and lenders both check, and retroactive permits cost more than doing it right.',
      'Typical inspection sequence: foundation, framing, rough-in (electrical/plumbing/mechanical), insulation, final.'
    ]
  },
  {
    title: 'Remodel vs. Move: The Real Math',
    description: 'How to compare renovating your current home against buying the next one.',
    contents: [
      'Start with the gap: what does the home you want cost minus what yours sells for? Compare that to the remodel bid, not to zero.',
      'Add transaction costs to the move side: agent fees, closing costs, and moving typically total 8-10% of the sale price.',
      'A remodel you will enjoy for 10+ years usually beats moving on pure cost. A remodel to fix a fundamentally wrong layout or location usually does not.',
      'Kitchens and primary bathrooms return the most value at resale. Highly personalized spaces return the least.',
      'Get a real bid before deciding. Guessing remodel costs from TV shows is how people make the wrong call.'
    ]
  },
  {
    title: 'Questions to Ask Any Contractor',
    description: 'The vetting checklist we encourage every client to use, including on us.',
    contents: [
      'Are you licensed and insured, and can I see current certificates? (Ours: License CTR-12345, $2M liability.)',
      'Who runs my job day to day, and how often will I get updates?',
      'What is your payment schedule? Progress payments tied to milestones are standard. Large upfront deposits are not.',
      'How do you handle change orders? Everything should be priced and signed before work proceeds.',
      'Can I speak to a client from a project like mine that finished over a year ago?',
      'What is your workmanship warranty? Ours is 2 years, in writing.'
    ]
  }
]

const faqs = [
  { question: 'How do I get a quote?', answer: 'Use the quote builder on this site to tell us about your project. We review every request within one business day, then schedule a site visit to firm up numbers. Detailed written proposals are always free.' },
  { question: 'Are you licensed and insured?', answer: 'Yes. We are fully licensed (License #CTR-12345), bonded, and carry $2M in liability insurance. Certificates are available on request and provided automatically with every contract.' },
  { question: 'How long does a typical project take?', answer: 'Kitchen remodels typically run 8-10 weeks, additions 4-6 months, and custom homes 10-14 months. Every proposal includes a phase-by-phase schedule, and our on-time completion rate is 94%.' },
  { question: 'Do you handle permits and inspections?', answer: 'Always. We pull every required permit, schedule all inspections, and meet the inspector on site. You never deal with the building department yourself.' },
  { question: 'What does the client portal include?', answer: 'Every active client gets portal access with weekly photo updates, all project documents, the live schedule, invoices, and direct messaging with their project manager.' }
]

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState<string>('home')
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false)
  const [showClientPortal, setShowClientPortal] = useState(false)
  const [quoteData, setQuoteData] = useState(initialQuoteData)
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [portfolioFilter, setPortfolioFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [trackingId, setTrackingId] = useState('anderson')
  const [portalDocIndex, setPortalDocIndex] = useState<number | null>(null)
  const [portalPhotoIndex, setPortalPhotoIndex] = useState<number | null>(null)
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [contactData, setContactData] = useState(initialContactData)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const navigate = (page: string) => {
    setCurrentPage(page)
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  const openQuote = (prefillType?: string) => {
    if (prefillType) setQuoteData((prev) => ({ ...prev, projectType: prefillType }))
    setShowQuoteBuilder(true)
  }

  const closeQuoteBuilder = () => {
    setShowQuoteBuilder(false)
    setQuoteSubmitted(false)
    setQuoteData(initialQuoteData)
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const notesParts = [
        quoteData.sqft && `Approximate square footage: ${quoteData.sqft}`,
        quoteData.timeline && `Timeline: ${quoteData.timeline}`,
        quoteData.budget && `Budget range: ${quoteData.budget}`,
        quoteData.details && `Project details: ${quoteData.details}`
      ].filter(Boolean)

      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: demo.name,
          demoPackage: demo.package,
          demoSlug: demo.slug,
          clientName: quoteData.name,
          clientPhone: quoteData.phone,
          clientEmail: quoteData.email,
          service: quoteData.projectType,
          preferredDate: '',
          preferredTime: '',
          notes: notesParts.join(' | ')
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'quote_builder_form', demo_slug: demo.slug })
        trackConversion('leadForm')
        setQuoteSubmitted(true)
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: demo.name,
          demoPackage: demo.package,
          demoSlug: demo.slug,
          clientName: contactData.name,
          clientPhone: contactData.phone,
          clientEmail: contactData.email,
          service: contactData.subject || 'General Inquiry',
          preferredDate: '',
          preferredTime: '',
          notes: contactData.message
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: demo.slug })
        trackConversion('leadForm')
        setContactSubmitted(true)
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  }

  const renderPage = () => {
    if (currentPage === 'home') {
      return (
        <div>
          <section style={{ backgroundColor: '#1a1a1a', minHeight: '600px' }} className="py-32">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl">
                <div style={{ color: '#ffa300' }} className="text-sm font-bold uppercase tracking-widest mb-4">
                  Licensed & Insured • 25+ Years Experience
                </div>
                <h1 style={{ color: '#ffffff' }} className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                  Building Dreams<br />Into Reality
                </h1>
                <p style={{ color: '#cccccc' }} className="text-xl leading-relaxed mb-10">
                  From custom homes to commercial projects, BuildRight Construction delivers exceptional craftsmanship,
                  on-time completion, and transparent pricing. Experience the difference of working with true professionals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => openQuote()}
                    style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                    className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Get Free Quote
                  </button>
                  <button
                    onClick={() => navigate('portfolio')}
                    style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #ff6700' }}
                    className="px-10 py-4 font-bold text-lg hover:opacity-80 transition"
                  >
                    View Our Work
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 style={{ color: '#1a1a1a' }} className="text-5xl font-bold mb-4">Our Services</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { icon: '🏠', title: 'Custom Homes', desc: 'Build your dream home from the ground up' },
                  { icon: '🔨', title: 'Remodeling', desc: 'Transform your existing space' },
                  { icon: '🏢', title: 'Commercial', desc: 'Office and retail construction' },
                  { icon: '➕', title: 'Additions', desc: 'Expand your living space' }
                ].map((service) => (
                  <button
                    key={service.title}
                    onClick={() => navigate('services')}
                    style={{ backgroundColor: '#f8f8f8' }}
                    className="p-8 text-center hover:shadow-xl transition cursor-pointer"
                  >
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p style={{ color: '#666666' }}>{service.desc}</p>
                    <div style={{ color: '#ff6700' }} className="font-bold mt-4">See Pricing →</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24" style={{ backgroundColor: '#ff6700' }}>
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 style={{ color: '#ffffff' }} className="text-5xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-10">
                Get a detailed quote in minutes with our interactive quote builder
              </p>
              <button
                onClick={() => openQuote()}
                style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Build Your Quote Now
              </button>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'services') {
      const services = [
        {
          name: 'Custom Home Construction',
          price: 'Starting at $350/sqft',
          quoteType: 'custom-home',
          features: ['Architectural design collaboration', 'Premium materials selection', 'Energy-efficient construction', 'Smart home integration', '2-year workmanship warranty']
        },
        {
          name: 'Kitchen Remodeling',
          price: '$45,000 - $125,000',
          quoteType: 'remodel',
          features: ['3D design visualization', 'Custom cabinetry', 'High-end appliances', 'Countertop installation', 'Licensed plumbing & electrical']
        },
        {
          name: 'Bathroom Renovation',
          price: '$18,000 - $65,000',
          quoteType: 'remodel',
          features: ['Luxury fixtures & finishes', 'Tile & stonework', 'Custom vanities', 'Walk-in showers', 'Heated flooring options']
        },
        {
          name: 'Home Additions',
          price: '$200 - $450/sqft',
          quoteType: 'addition',
          features: ['Foundation to finish', 'Permits & inspections', 'Match existing architecture', 'HVAC integration', 'Seamless integration']
        }
      ]

      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Our Services</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Comprehensive construction solutions for residential and commercial projects
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="space-y-8">
                {services.map((service) => (
                  <div key={service.name} style={{ backgroundColor: '#f8f8f8', border: '3px solid #ff6700' }} className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 style={{ color: '#1a1a1a' }} className="text-3xl font-bold">{service.name}</h3>
                      <div style={{ color: '#ff6700' }} className="text-2xl font-bold">{service.price}</div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <span style={{ color: '#ff6700' }}>✓</span>
                          <span style={{ color: '#333333' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => openQuote(service.quoteType)}
                      style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                      className="px-8 py-3 font-bold hover:opacity-90 transition"
                    >
                      Get Quote for This Service
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'portfolio') {
      const filterOptions = ['All', 'Custom Home', 'Commercial', 'Remodeling', 'Addition']
      const filteredProjects = portfolioFilter === 'All'
        ? portfolioProjects
        : portfolioProjects.filter((p) => p.type === portfolioFilter)

      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Our Portfolio</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Explore our completed projects and see the BuildRight difference
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-wrap gap-3 mb-10 justify-center">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setPortfolioFilter(option)}
                    style={{
                      backgroundColor: portfolioFilter === option ? '#ff6700' : '#f8f8f8',
                      color: portfolioFilter === option ? '#ffffff' : '#1a1a1a'
                    }}
                    className="px-6 py-2 font-bold hover:opacity-80 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <button
                    key={project.title}
                    onClick={() => setSelectedProject(project)}
                    style={{ backgroundColor: '#f8f8f8' }}
                    className="overflow-hidden hover:shadow-xl transition text-left cursor-pointer"
                  >
                    <div style={{ backgroundColor: '#ff6700', height: '250px' }} className="flex items-center justify-center text-9xl">
                      {project.image}
                    </div>
                    <div className="p-6">
                      <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="inline-block px-3 py-1 text-xs font-bold uppercase mb-3">
                        {project.type}
                      </div>
                      <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-3">{project.title}</h3>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>📏 {project.sqft}</div>
                        <div>💰 Project Value: {project.value}</div>
                      </div>
                      <div style={{ color: '#ff6700' }} className="font-bold mt-4 text-sm">View Project Details →</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'client-portal') {
      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Client Portal</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Access your project documents, photos, and timeline 24/7
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-4xl mx-auto px-4">
              <div style={{ backgroundColor: '#f8f8f8' }} className="p-12">
                <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold text-center mb-8">
                  Client Portal Login
                </h2>
                <form className="space-y-6 max-w-md mx-auto">
                  <div>
                    <label htmlFor="construction-login-email" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email Address</label>
                    <input
                      id="construction-login-email"
                      type="email"
                      style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="construction-login-password" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Password</label>
                    <input
                      id="construction-login-password"
                      type="password"
                      style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => { e.preventDefault(); setShowClientPortal(true); }}
                    style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Access My Projects
                  </button>
                </form>

                <div style={{ backgroundColor: '#ffffff', border: '3px solid #ff6700' }} className="p-8 mt-12">
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-4">Portal Features:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'View project photos & updates',
                      'Access blueprints & documents',
                      'Track project timeline',
                      'Review invoices & payments',
                      'Message your project manager',
                      'Approve change orders',
                      'Schedule site visits',
                      'Download completion certificates'
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <span style={{ color: '#ff6700' }}>✓</span>
                        <span style={{ color: '#333333' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'tracking') {
      const activeTracking = trackingProjects.find((p) => p.id === trackingId) ?? trackingProjects[0]

      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Project Tracking</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Real-time updates on your construction project timeline
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex flex-wrap gap-3 mb-8">
                {trackingProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setTrackingId(project.id)}
                    style={{
                      backgroundColor: trackingId === project.id ? '#ff6700' : '#f8f8f8',
                      color: trackingId === project.id ? '#ffffff' : '#1a1a1a'
                    }}
                    className="px-6 py-3 font-bold hover:opacity-80 transition"
                  >
                    {project.label}
                  </button>
                ))}
              </div>
              <div style={{ backgroundColor: '#f8f8f8' }} className="p-8 mb-8">
                <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-1">{activeTracking.label}</h2>
                <p style={{ color: '#666666' }} className="text-sm font-bold mb-6">{activeTracking.detail}</p>
                <div className="space-y-6">
                  {activeTracking.phases.map((phase) => (
                    <div key={phase.phase}>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span style={{ color: '#1a1a1a' }} className="font-bold text-lg">{phase.phase}</span>
                          <span style={{
                            backgroundColor: phase.status === 'Completed' ? '#22c55e' :
                                          phase.status === 'In Progress' ? '#fbbf24' : '#9ca3af',
                            color: '#ffffff'
                          }} className="ml-3 px-3 py-1 text-xs font-bold uppercase">
                            {phase.status}
                          </span>
                        </div>
                        <span style={{ color: '#666666' }} className="text-sm font-bold">{phase.date}</span>
                      </div>
                      <div style={{ backgroundColor: '#e5e5e5' }} className="h-4 rounded-full overflow-hidden">
                        <div
                          style={{ backgroundColor: '#ff6700', width: `${phase.progress}%` }}
                          className="h-full transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ backgroundColor: '#1a1a1a' }} className="p-8 text-center">
                <h3 style={{ color: '#ffffff' }} className="text-2xl font-bold mb-3">Every BuildRight client gets live tracking</h3>
                <p style={{ color: '#cccccc' }} className="mb-6">Weekly photo updates, phase-by-phase progress, and direct messaging with your project manager.</p>
                <button
                  onClick={() => openQuote()}
                  style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                  className="px-8 py-3 font-bold hover:opacity-90 transition"
                >
                  Start Your Project
                </button>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'testimonials') {
      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Testimonials</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                What our clients say about building with BuildRight
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                  <div key={t.name} style={{ backgroundColor: '#f8f8f8', borderTop: '4px solid #ff6700' }} className="p-8 flex flex-col">
                    <div style={{ color: '#ff6700' }} className="text-2xl font-bold mb-4">{t.rating} / 5.0</div>
                    <p style={{ color: '#333333' }} className="leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                    <div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold">{t.name}</div>
                      <div style={{ color: '#666666' }} className="text-sm">{t.project} • {t.location}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => openQuote()}
                  style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                  className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Join Our Happy Clients
                </button>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'resources') {
      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Resources</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Owner guides and straight answers before you build
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-8">Owner Guides</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {resourceGuides.map((guide, idx) => (
                  <div key={guide.title} style={{ backgroundColor: '#f8f8f8', border: '3px solid #ff6700' }} className="p-8 flex flex-col">
                    <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-3">{guide.title}</h3>
                    <p style={{ color: '#666666' }} className="mb-6 flex-1">{guide.description}</p>
                    <button
                      onClick={() => setSelectedGuide(idx)}
                      style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                      className="px-6 py-3 font-bold hover:opacity-90 transition self-start"
                    >
                      Read Guide
                    </button>
                  </div>
                ))}
              </div>

              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={faq.question} style={{ backgroundColor: '#f8f8f8' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-6 flex justify-between items-center text-left hover:opacity-80 transition"
                    >
                      <span style={{ color: '#1a1a1a' }} className="font-bold text-lg">{faq.question}</span>
                      <span style={{ color: '#ff6700' }} className="text-2xl font-bold">{openFaq === idx ? '−' : '+'}</span>
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-6">
                        <p style={{ color: '#333333' }} className="leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'about') {
      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">About BuildRight</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Building excellence since 1998
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
                <div>
                  <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-6">Our Story</h2>
                  <div style={{ color: '#333333' }} className="space-y-4 leading-relaxed">
                    <p>
                      BuildRight Construction started in 1998 with one truck, two carpenters, and a simple promise:
                      do what you say you will do, when you said you would do it.
                    </p>
                    <p>
                      Twenty-five years later that promise still runs every job site. We have grown into a full-service
                      general contractor handling custom homes, major remodels, additions, and commercial projects,
                      but every client still gets a dedicated project manager, a written schedule, and weekly updates.
                    </p>
                    <p>
                      We self-perform framing, finish carpentry, and concrete, and we hold our trade partners to the
                      same standard we hold our own crews. That is how we keep a 94% on-time completion rate in an
                      industry where finishing on schedule is the exception.
                    </p>
                  </div>
                </div>
                <div style={{ backgroundColor: '#f8f8f8', border: '3px solid #ff6700' }} className="p-8">
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-6">By the Numbers</h3>
                  <div className="space-y-6">
                    {[
                      { value: '25+', label: 'Years in business' },
                      { value: '500+', label: 'Projects completed' },
                      { value: '94%', label: 'On-time completion rate' },
                      { value: '72%', label: 'Of new work comes from referrals' }
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center gap-4">
                        <div style={{ color: '#ff6700' }} className="text-4xl font-bold w-24">{stat.value}</div>
                        <div style={{ color: '#333333' }} className="font-bold">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  { name: 'Frank Delgado', role: 'Founder & General Contractor', bio: 'Master carpenter, 30+ years in residential and commercial construction. Still walks every active job site weekly.' },
                  { name: 'Angela Price', role: 'Director of Operations', bio: 'Runs scheduling, permitting, and trade partner management. The reason our projects finish on time.' },
                  { name: 'Marcus Webb', role: 'Lead Project Manager', bio: 'Your day-to-day contact on site. Certified in construction management with 15 years of field experience.' }
                ].map((member) => (
                  <div key={member.name} style={{ backgroundColor: '#f8f8f8' }} className="p-8 text-center">
                    <div style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-1">{member.name}</h3>
                    <div style={{ color: '#ff6700' }} className="font-bold text-sm mb-3">{member.role}</div>
                    <p style={{ color: '#666666' }} className="text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: '#1a1a1a' }} className="p-10 text-center">
                <h3 style={{ color: '#ffffff' }} className="text-3xl font-bold mb-4">Let&apos;s build something together</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => openQuote()}
                    style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                    className="px-8 py-3 font-bold hover:opacity-90 transition"
                  >
                    Get a Free Quote
                  </button>
                  <button
                    onClick={() => navigate('contact')}
                    style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #ff6700' }}
                    className="px-8 py-3 font-bold hover:opacity-80 transition"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'contact') {
      const subjects = ['General Inquiry', 'New Project Quote', 'Warranty Request', 'Commercial Work', 'Subcontractor Inquiry', 'Other']

      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Contact Us</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Questions about a project? We respond within one business day
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-8">
                    {contactSubmitted ? (
                      <div className="text-center py-12">
                        <div style={{ backgroundColor: '#ffffff', color: '#22c55e' }} className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-5xl">
                          ✓
                        </div>
                        <h3 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-4">Message Sent!</h3>
                        <p style={{ color: '#666666' }} className="text-lg mb-8">
                          Thanks for reaching out. A member of our team will get back to you within one business day.
                        </p>
                        <button
                          onClick={() => { setContactSubmitted(false); setContactData(initialContactData); }}
                          style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                          className="px-8 py-3 font-bold hover:opacity-90 transition"
                        >
                          Send Another Message
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold">Send Us a Message</h2>
                        <div>
                          <label htmlFor="construction-contact-name" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Name *</label>
                          <input
                            id="construction-contact-name"
                            type="text"
                            required
                            value={contactData.name}
                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="construction-contact-email" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                            <input
                              id="construction-contact-email"
                              type="email"
                              required
                              value={contactData.email}
                              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                              style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                              className="w-full px-4 py-3"
                            />
                          </div>
                          <div>
                            <label htmlFor="construction-contact-phone" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone</label>
                            <input
                              id="construction-contact-phone"
                              type="tel"
                              value={contactData.phone}
                              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                              style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                              className="w-full px-4 py-3"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="construction-contact-subject" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Subject *</label>
                          <select
                            id="construction-contact-subject"
                            required
                            value={contactData.subject}
                            onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          >
                            <option value="">Select a subject</option>
                            {subjects.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="construction-contact-message" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Message *</label>
                          <textarea
                            id="construction-contact-message"
                            required
                            value={contactData.message}
                            onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3 h-32"
                            placeholder="Tell us how we can help..."
                          />
                        </div>
                        <button
                          type="submit"
                          style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                          className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                        >
                          Send Message
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div style={{ backgroundColor: '#1a1a1a' }} className="p-8">
                    <h3 style={{ color: '#ff6700' }} className="text-2xl font-bold mb-6">Reach Us Directly</h3>
                    <div style={{ color: '#cccccc' }} className="space-y-4">
                      <div>
                        <div style={{ color: '#ffffff' }} className="font-bold">Phone</div>
                        <div>(555) BUILD-IT</div>
                      </div>
                      <div>
                        <div style={{ color: '#ffffff' }} className="font-bold">Email</div>
                        <div>info@buildright.com</div>
                      </div>
                      <div>
                        <div style={{ color: '#ffffff' }} className="font-bold">Office</div>
                        <div>4200 Commerce Park Drive, Suite 120</div>
                      </div>
                      <div>
                        <div style={{ color: '#ffffff' }} className="font-bold">Hours</div>
                        <div>Mon-Fri: 7AM-6PM • Sat: 8AM-4PM</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#f8f8f8', border: '3px solid #ff6700' }} className="p-8">
                    <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => openQuote()}
                        style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                        className="w-full px-6 py-3 font-bold hover:opacity-90 transition text-left flex justify-between items-center"
                      >
                        <span>Start a Free Quote</span>
                        <span>→</span>
                      </button>
                      <button
                        onClick={() => navigate('portfolio')}
                        style={{ backgroundColor: '#ffffff', color: '#1a1a1a', border: '2px solid #1a1a1a' }}
                        className="w-full px-6 py-3 font-bold hover:opacity-80 transition text-left flex justify-between items-center"
                      >
                        <span>Browse Our Portfolio</span>
                        <span>→</span>
                      </button>
                      <button
                        onClick={() => navigate('client-portal')}
                        style={{ backgroundColor: '#ffffff', color: '#1a1a1a', border: '2px solid #1a1a1a' }}
                        className="w-full px-6 py-3 font-bold hover:opacity-80 transition text-left flex justify-between items-center"
                      >
                        <span>Client Portal Login</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    // Unknown page id -- route back to home content
    return null
  }

  return (
    <Layout
      colors={colors}
      currentPage={currentPage}
      onNavigate={navigate}
      onQuoteOpen={() => openQuote()}
    >
      {renderPage()}

      {/* Interactive Quote Builder Modal */}
      {showQuoteBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-bold">Interactive Quote Builder</h3>
              <button onClick={closeQuoteBuilder} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              {quoteSubmitted ? (
                <div className="text-center py-12">
                  <div style={{ backgroundColor: '#f8f8f8' }} className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-5xl">
                    ✓
                  </div>
                  <h4 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-4">Quote Request Sent!</h4>
                  <p style={{ color: '#666666' }} className="text-lg mb-8">
                    Thanks for reaching out. Our team will review your project details and get back to you within one business day.
                  </p>
                  <button
                    onClick={closeQuoteBuilder}
                    style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                    className="px-8 py-3 font-bold hover:opacity-90 transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
              <>
              <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="p-6 mb-8 text-center">
                <h4 className="text-2xl font-bold mb-2">Get an Instant Estimate</h4>
                <p>Answer a few questions to receive a detailed project quote</p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div>
                  <label htmlFor="construction-quote-project-type" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Project Type *</label>
                  <select
                    id="construction-quote-project-type"
                    required
                    value={quoteData.projectType}
                    onChange={(e) => setQuoteData({ ...quoteData, projectType: e.target.value })}
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  >
                    <option value="">Select project type</option>
                    <option value="custom-home">Custom Home</option>
                    <option value="remodel">Remodeling</option>
                    <option value="addition">Home Addition</option>
                    <option value="commercial">Commercial Build</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="construction-quote-sqft" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Approximate Square Footage</label>
                    <input
                      id="construction-quote-sqft"
                      type="number"
                      value={quoteData.sqft}
                      onChange={(e) => setQuoteData({ ...quoteData, sqft: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                      placeholder="e.g., 2500"
                    />
                  </div>
                  <div>
                    <label htmlFor="construction-quote-timeline" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Timeline</label>
                    <select
                      id="construction-quote-timeline"
                      value={quoteData.timeline}
                      onChange={(e) => setQuoteData({ ...quoteData, timeline: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP (1-3 months)</option>
                      <option value="flexible">Flexible (3-6 months)</option>
                      <option value="planning">Just Planning (6+ months)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="construction-quote-budget" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Budget Range</label>
                  <select
                    id="construction-quote-budget"
                    value={quoteData.budget}
                    onChange={(e) => setQuoteData({ ...quoteData, budget: e.target.value })}
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  >
                    <option value="">Select budget range</option>
                    <option value="50k">$25,000 - $50,000</option>
                    <option value="100k">$50,000 - $100,000</option>
                    <option value="250k">$100,000 - $250,000</option>
                    <option value="500k">$250,000 - $500,000</option>
                    <option value="500k+">$500,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="construction-quote-details" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Project Details</label>
                  <textarea
                    id="construction-quote-details"
                    value={quoteData.details}
                    onChange={(e) => setQuoteData({ ...quoteData, details: e.target.value })}
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 h-32"
                    placeholder="Tell us about your project vision, specific requirements, or questions..."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="construction-quote-name" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Name *</label>
                    <input
                      id="construction-quote-name"
                      type="text"
                      required
                      value={quoteData.name}
                      onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="construction-quote-email" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                    <input
                      id="construction-quote-email"
                      type="email"
                      required
                      value={quoteData.email}
                      onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="construction-quote-phone" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                    <input
                      id="construction-quote-phone"
                      type="tel"
                      required
                      value={quoteData.phone}
                      onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Get My Free Quote
                </button>
              </form>
              </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
              <button onClick={() => setSelectedProject(null)} aria-label="Close" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div style={{ backgroundColor: '#ff6700', height: '200px' }} className="flex items-center justify-center text-9xl">
              {selectedProject.image}
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Type', value: selectedProject.type },
                  { label: 'Size', value: selectedProject.sqft },
                  { label: 'Project Value', value: selectedProject.value },
                  { label: 'Duration', value: selectedProject.duration }
                ].map((stat) => (
                  <div key={stat.label} style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-xs font-bold uppercase mb-1">{stat.label}</div>
                    <div style={{ color: '#1a1a1a' }} className="font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: '#333333' }} className="leading-relaxed mb-8">{selectedProject.summary}</p>
              <h4 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-4">Project Scope</h4>
              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {selectedProject.scope.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span style={{ color: '#ff6700' }}>✓</span>
                    <span style={{ color: '#333333' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ color: '#666666' }} className="text-sm font-bold mb-6">Completed {selectedProject.completed}</div>
              <button
                onClick={() => { setSelectedProject(null); openQuote(selectedProject.quoteType); }}
                style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Start a Project Like This
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Portal Demo Modal */}
      {showClientPortal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-bold">My Projects Dashboard</h3>
              <button onClick={() => setShowClientPortal(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                  <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Project Status</div>
                  <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-1">In Progress</div>
                  <div style={{ color: '#22c55e' }} className="text-sm font-bold">65% Complete</div>
                </div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                  <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Estimated Completion</div>
                  <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-1">Mar 15</div>
                  <div style={{ color: '#ff6700' }} className="text-sm font-bold">On Schedule</div>
                </div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                  <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Recent Updates</div>
                  <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-1">12</div>
                  <div style={{ color: '#666666' }} className="text-sm font-bold">This Week</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8f8f8' }} className="p-8 mb-8">
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-6">Recent Project Photos</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {portalPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPortalPhotoIndex(idx)}
                      style={{ backgroundColor: '#ff6700', height: '150px' }}
                      className="flex items-center justify-center text-6xl hover:opacity-80 transition cursor-pointer"
                      aria-label={photo.caption}
                    >
                      {photo.icon}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: '#f8f8f8' }} className="p-8">
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-6">Project Documents</h3>
                <div className="space-y-3">
                  {portalDocuments.map((doc, idx) => (
                    <div key={doc.name} style={{ backgroundColor: '#ffffff' }} className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <span style={{ color: '#1a1a1a' }} className="font-bold block">{doc.name}</span>
                          <span style={{ color: '#666666' }} className="text-xs font-bold">{doc.pages} • {doc.updated}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setPortalDocIndex(idx)}
                        style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                        className="px-4 py-2 font-bold text-sm hover:opacity-90 transition"
                      >
                        Open
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portal Document Viewer Modal */}
      {portalDocIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60] p-4"
          onClick={() => setPortalDocIndex(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <div>
                <h3 className="text-xl font-bold">{portalDocuments[portalDocIndex].name}</h3>
                <div style={{ color: '#999999' }} className="text-xs font-bold">
                  {portalDocuments[portalDocIndex].pages} • {portalDocuments[portalDocIndex].updated}
                </div>
              </div>
              <button onClick={() => setPortalDocIndex(null)} aria-label="Close" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <p style={{ color: '#333333' }} className="leading-relaxed mb-6">{portalDocuments[portalDocIndex].summary}</p>
              <div style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6 mb-6">
                <h4 style={{ color: '#1a1a1a' }} className="font-bold mb-4 uppercase text-sm">Document Contents</h4>
                <div className="space-y-3">
                  {portalDocuments[portalDocIndex].contents.map((line) => (
                    <div key={line} className="flex items-start gap-2">
                      <span style={{ color: '#ff6700' }}>✓</span>
                      <span style={{ color: '#333333' }} className="text-sm">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setPortalDocIndex(null)}
                style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                className="w-full py-3 font-bold hover:opacity-90 transition"
              >
                Back to Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portal Photo Lightbox */}
      {portalPhotoIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4"
          onClick={() => setPortalPhotoIndex(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#ff6700', height: '320px' }} className="flex items-center justify-center text-9xl">
              {portalPhotos[portalPhotoIndex].icon}
            </div>
            <div className="p-6 flex justify-between items-center gap-4">
              <div>
                <div style={{ color: '#1a1a1a' }} className="font-bold">{portalPhotos[portalPhotoIndex].caption}</div>
                <div style={{ color: '#666666' }} className="text-sm font-bold">Posted {portalPhotos[portalPhotoIndex].date} by your project manager</div>
              </div>
              <button
                onClick={() => setPortalPhotoIndex(null)}
                style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                className="px-6 py-3 font-bold hover:opacity-90 transition flex-shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resource Guide Modal */}
      {selectedGuide !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedGuide(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-bold">{resourceGuides[selectedGuide].title}</h3>
              <button onClick={() => setSelectedGuide(null)} aria-label="Close" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <p style={{ color: '#666666' }} className="font-bold mb-6">{resourceGuides[selectedGuide].description}</p>
              <div className="space-y-4 mb-8">
                {resourceGuides[selectedGuide].contents.map((paragraph, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="w-7 h-7 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p style={{ color: '#333333' }} className="leading-relaxed">{paragraph}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#f8f8f8' }} className="p-6 text-center">
                <p style={{ color: '#1a1a1a' }} className="font-bold mb-4">Have a project in mind? Get real numbers, free.</p>
                <button
                  onClick={() => { setSelectedGuide(null); openQuote(); }}
                  style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                  className="px-8 py-3 font-bold hover:opacity-90 transition"
                >
                  Start Your Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
