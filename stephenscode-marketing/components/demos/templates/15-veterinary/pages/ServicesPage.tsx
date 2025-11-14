import React from 'react';
import { Stethoscope, Syringe, Heart, Scissors, Shield, Home, Sparkles, Pill, Activity, Scan, Microscope, Bone, ChevronRight } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function ServicesPage({ onNavigate, colors }: ServicesPageProps) {
  const services = [
    {
      icon: Stethoscope,
      name: 'Wellness Exams',
      description: 'Comprehensive physical examinations to keep your pet healthy and detect issues early.',
      features: [
        'Complete physical examination',
        'Weight and vitality assessment',
        'Nutritional counseling',
        'Behavioral evaluation',
        'Preventive care planning'
      ],
      price: 'Starting at $65'
    },
    {
      icon: Syringe,
      name: 'Vaccinations',
      description: 'Protect your pet from preventable diseases with our comprehensive vaccination programs.',
      features: [
        'Core vaccinations (Rabies, Distemper, Parvo)',
        'Lifestyle-based vaccines',
        'Titer testing available',
        'Puppy & kitten series',
        'Senior pet protocols'
      ],
      price: 'From $25 per vaccine'
    },
    {
      icon: Shield,
      name: 'Surgery',
      description: 'Advanced surgical procedures performed with precision, care, and modern techniques.',
      features: [
        'Spay/neuter procedures',
        'Soft tissue surgery',
        'Orthopedic surgery',
        'Tumor removal',
        'Post-operative care'
      ],
      price: 'Contact for quote'
    },
    {
      icon: Scissors,
      name: 'Dental Care',
      description: 'Professional dental services to maintain your pet\'s oral health and overall wellbeing.',
      features: [
        'Dental cleanings & polishing',
        'Digital dental X-rays',
        'Tooth extractions',
        'Periodontal disease treatment',
        'Home dental care education'
      ],
      price: 'Starting at $350'
    },
    {
      icon: Heart,
      name: 'Emergency Care',
      description: '24/7 emergency services for when your pet needs immediate medical attention.',
      features: [
        'Round-the-clock availability',
        'Stabilization & triage',
        'Emergency surgery',
        'Critical care monitoring',
        'Poison control assistance'
      ],
      price: 'Emergency fees apply'
    },
    {
      icon: Home,
      name: 'Boarding',
      description: 'Safe, comfortable accommodations with veterinary supervision while you\'re away.',
      features: [
        'Climate-controlled suites',
        'Individual play time',
        'Medication administration',
        'Veterinary monitoring',
        'Photo updates available'
      ],
      price: '$45 per night'
    },
    {
      icon: Sparkles,
      name: 'Grooming',
      description: 'Professional grooming services to keep your pet looking and feeling their best.',
      features: [
        'Full-service baths',
        'Haircuts & styling',
        'Nail trimming',
        'Ear cleaning',
        'Sanitary trims'
      ],
      price: 'Starting at $55'
    },
    {
      icon: Pill,
      name: 'Pet Pharmacy',
      description: 'On-site pharmacy with prescription and over-the-counter medications for your pet.',
      features: [
        'Prescription medications',
        'Flea & tick prevention',
        'Heartworm prevention',
        'Supplements & vitamins',
        'Prescription diets'
      ],
      price: 'Varies by medication'
    },
    {
      icon: Scan,
      name: 'Diagnostic Imaging',
      description: 'State-of-the-art imaging technology for accurate diagnosis and treatment planning.',
      features: [
        'Digital X-rays',
        'Ultrasound',
        'Same-day results',
        'Board-certified radiologist review',
        'PACS image storage'
      ],
      price: 'Starting at $150'
    },
    {
      icon: Microscope,
      name: 'Laboratory Services',
      description: 'In-house and reference laboratory testing for quick, accurate results.',
      features: [
        'Blood chemistry panels',
        'Complete blood counts',
        'Urinalysis',
        'Fecal testing',
        'Rapid test results'
      ],
      price: 'Starting at $85'
    },
    {
      icon: Activity,
      name: 'Senior Pet Care',
      description: 'Specialized care programs designed for aging pets to maintain quality of life.',
      features: [
        'Geriatric wellness exams',
        'Arthritis management',
        'Senior bloodwork panels',
        'Pain management',
        'Mobility support'
      ],
      price: 'Starting at $95'
    },
    {
      icon: Bone,
      name: 'Nutritional Counseling',
      description: 'Expert guidance on diet and nutrition to optimize your pet\'s health.',
      features: [
        'Weight management programs',
        'Prescription diet recommendations',
        'Food allergy testing',
        'Life stage nutrition',
        'Custom meal planning'
      ],
      price: 'Included with exam'
    },
  ];

  const specialties = [
    { name: 'Exotic Pets', description: 'Birds, reptiles, small mammals' },
    { name: 'Dermatology', description: 'Skin conditions & allergies' },
    { name: 'Cardiology', description: 'Heart health & monitoring' },
    { name: 'Ophthalmology', description: 'Eye care & surgery' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section style={{ backgroundColor: colors.primary }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Veterinary Services</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive care for your pet's complete health and wellbeing - from preventive wellness to advanced medical treatments
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-6 border-b-4" style={{ borderBottomColor: colors.secondary }}>
                  <service.icon className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="p-6 bg-teal-50">
                  <h4 className="font-semibold mb-3" style={{ color: colors.primary }}>
                    What's Included:
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.secondary }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-teal-200">
                    <p className="text-sm font-semibold" style={{ color: colors.primary }}>
                      {service.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Specialty Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced care for specialized health needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="p-6 rounded-xl text-center hover:shadow-lg transition-all"
                style={{ backgroundColor: colors.accent + '20' }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                  {specialty.name}
                </h3>
                <p className="text-gray-600">{specialty.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment & Insurance */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
              Payment & Insurance Information
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>
                  Payment Options
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: colors.primary }} />
                    Cash and checks
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: colors.primary }} />
                    All major credit cards
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: colors.primary }} />
                    CareCredit financing
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: colors.primary }} />
                    Scratchpay payment plans
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>
                  Pet Insurance
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: colors.primary }} />
                    We accept all pet insurance
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: colors.primary }} />
                    Detailed invoices provided
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: colors.primary }} />
                    Direct claim submission available
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: colors.primary }} />
                    Insurance consultation
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: colors.accent + '20' }}>
              <p className="text-gray-700 leading-relaxed">
                <strong>Payment is due at time of service.</strong> We're happy to provide estimates for procedures and work with you to find the best payment solution for your budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Schedule an Appointment?
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Our caring team is here to provide the best care for your pet. Contact us today to book your visit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              Book Appointment
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all"
            >
              View FAQs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
