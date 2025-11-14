'use client';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      title: 'Residential Cleaning',
      description: 'Keep your home fresh and clean with our regular residential cleaning services.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      features: [
        'Dusting all surfaces and furniture',
        'Vacuuming and mopping all floors',
        'Kitchen cleaning (counters, sink, appliances)',
        'Bathroom sanitizing and cleaning',
        'Trash removal and fresh liners',
        'Bed making and room tidying',
      ],
      frequencies: ['One-time', 'Weekly', 'Bi-weekly', 'Monthly'],
      startingPrice: '$80',
      popular: true,
    },
    {
      title: 'Deep Cleaning',
      description: 'Comprehensive top-to-bottom cleaning for a completely refreshed space.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      features: [
        'All standard cleaning tasks',
        'Inside oven and refrigerator cleaning',
        'Cabinet fronts and interior wiping',
        'Baseboards and trim cleaning',
        'Window sills and tracks',
        'Light fixture and ceiling fan cleaning',
        'Behind and under furniture',
        'Detailed bathroom grout cleaning',
      ],
      frequencies: ['One-time', 'Quarterly', 'Semi-annual'],
      startingPrice: '$150',
      popular: false,
    },
    {
      title: 'Move In/Move Out Cleaning',
      description: 'Make your space move-in ready or get your security deposit back with our thorough service.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      features: [
        'All deep cleaning services',
        'Inside all cabinets and drawers',
        'Inside all closets',
        'Wall spot cleaning and scuff removal',
        'Switch plates and outlet cleaning',
        'All windows inside and out',
        'Garage or storage area sweeping',
        'Lease-ready guarantee',
      ],
      frequencies: ['One-time'],
      startingPrice: '$200',
      popular: false,
    },
    {
      title: 'Office Cleaning',
      description: 'Professional commercial cleaning for a productive and healthy workplace.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      features: [
        'Workspace and desk cleaning',
        'Breakroom and kitchen cleaning',
        'Restroom sanitizing',
        'Trash removal and recycling',
        'Floor vacuuming and mopping',
        'Common area maintenance',
        'Evening or off-hours scheduling',
        'Customizable service plans',
      ],
      frequencies: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'],
      startingPrice: '$120',
      popular: false,
    },
    {
      title: 'Post-Construction Cleaning',
      description: 'Remove dust, debris, and construction residue after renovation or building projects.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      features: [
        'Construction dust removal',
        'Window cleaning (paint/sticker removal)',
        'Floor cleaning and polish',
        'Fixture and surface sanitizing',
        'Removal of labels and stickers',
        'Cabinet cleaning inside and out',
        'Debris and material removal',
        'Final walkthrough ready',
      ],
      frequencies: ['One-time'],
      startingPrice: '$250',
      popular: false,
    },
    {
      title: 'Carpet Cleaning',
      description: 'Professional deep carpet and upholstery cleaning using eco-friendly methods.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      features: [
        'Hot water extraction cleaning',
        'Stain and spot treatment',
        'Odor removal treatment',
        'Fast-drying technology',
        'Furniture moving included',
        'Upholstery cleaning available',
        'Pet-safe cleaning solutions',
        'Satisfaction guarantee',
      ],
      frequencies: ['One-time', 'Quarterly', 'Semi-annual'],
      startingPrice: '$100',
      popular: false,
    },
    {
      title: 'Window Cleaning',
      description: 'Crystal clear, streak-free windows inside and out for maximum natural light.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: [
        'Interior and exterior cleaning',
        'Screen cleaning and repair check',
        'Track and sill cleaning',
        'Spot-free, streak-free results',
        'Hard water stain removal',
        'High window accessibility',
        'Weather-dependent scheduling',
        'Seasonal packages available',
      ],
      frequencies: ['One-time', 'Quarterly', 'Semi-annual'],
      startingPrice: '$75',
      popular: false,
    },
    {
      title: 'Eco-Friendly Cleaning',
      description: 'All services available with 100% green, non-toxic cleaning products.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        'Non-toxic cleaning products',
        'Biodegradable solutions',
        'Safe for children and pets',
        'Allergy-friendly options',
        'No harsh chemical fumes',
        'Environmentally responsible',
        'Green certification standards',
        'Same cleaning quality',
      ],
      frequencies: ['Available for all services'],
      startingPrice: '+$10',
      popular: true,
    },
  ];

  const addons = [
    { name: 'Inside Refrigerator', price: '$25' },
    { name: 'Inside Oven', price: '$25' },
    { name: 'Inside Windows', price: '$35' },
    { name: 'Laundry (Wash & Fold)', price: '$40' },
    { name: 'Dishes', price: '$20' },
    { name: 'Interior Cabinets', price: '$30' },
  ];

  return (
    <div className="bg-white">
      {/* SEO Meta */}
      <title>Our Services - Sparkle Clean | Residential & Commercial Cleaning in Sparkle City</title>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Our Cleaning Services</h1>
            <p className="text-xl text-blue-100">
              Professional cleaning solutions for every need. All services include eco-friendly products,
              satisfaction guarantee, and flexible scheduling.
            </p>
          </div>
        </div>
      </section>

      {/* Discount Banner */}
      <div className="bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900">Recurring Service Discount</p>
                <p className="text-sm text-gray-700">Save 15% with weekly or 10% with bi-weekly cleaning packages</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('pricing')}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap"
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-md border-2 hover:shadow-xl transition-all ${
                  service.popular ? 'border-[#0077b6]' : 'border-gray-200'
                }`}
              >
                {service.popular && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#0077b6] text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#0077b6] bg-opacity-10 rounded-xl flex items-center justify-center text-[#0077b6] flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#0077b6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Available Frequencies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.frequencies.map((freq, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#0077b6] bg-opacity-10 text-[#0077b6] rounded-full text-sm font-medium">
                        {freq}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Starting at</p>
                    <p className="text-3xl font-bold text-[#0077b6]">{service.startingPrice}</p>
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f8f] transition-colors"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Add-Ons</h2>
            <p className="text-xl text-gray-600">Customize your cleaning service with these popular extras</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {addons.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00b4d8] bg-opacity-10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#00b4d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">{addon.name}</span>
                  </div>
                  <span className="text-lg font-bold text-[#0077b6]">{addon.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Getting your space sparkling clean is easy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0077b6] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Service</h3>
              <p className="text-gray-600">Select the cleaning service that fits your needs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#00b4d8] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Quote</h3>
              <p className="text-gray-600">Receive instant pricing based on your space</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#90e0ef] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book Online</h3>
              <p className="text-gray-600">Schedule your cleaning at a time that works for you</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0077b6] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Relax</h3>
              <p className="text-gray-600">Our team arrives and makes your space sparkle</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your cleaning service today and experience the Sparkle Clean difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#0077b6] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Get Free Quote
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#0077b6] transition-all"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
