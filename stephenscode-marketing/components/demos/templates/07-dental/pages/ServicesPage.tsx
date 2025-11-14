import React from 'react';
import { Check, ArrowRight, Shield, Sparkles, Heart, Baby, AlertCircle, Smile } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      icon: <Shield className="w-12 h-12 text-[#0077b6]" />,
      title: 'General Dentistry',
      description: 'Comprehensive preventive and restorative care for optimal oral health',
      priceRange: '$75 - $300',
      treatments: [
        'Routine Cleanings & Exams',
        'Digital X-Rays',
        'Tooth-Colored Fillings',
        'Root Canal Therapy',
        'Tooth Extractions',
        'Fluoride Treatments',
        'Oral Cancer Screenings',
        'Night Guards for Teeth Grinding'
      ]
    },
    {
      icon: <Sparkles className="w-12 h-12 text-[#0077b6]" />,
      title: 'Cosmetic Dentistry',
      description: 'Transform your smile with advanced aesthetic treatments',
      priceRange: '$300 - $2,500',
      treatments: [
        'Professional Teeth Whitening',
        'Porcelain Veneers',
        'Dental Bonding',
        'Smile Makeovers',
        'Gum Contouring',
        'Enamel Shaping',
        'Before/After Consultations',
        'Digital Smile Design'
      ]
    },
    {
      icon: <Heart className="w-12 h-12 text-[#0077b6]" />,
      title: 'Restorative Dentistry',
      description: 'Restore function and beauty to damaged or missing teeth',
      priceRange: '$800 - $5,000',
      treatments: [
        'Dental Implants',
        'Porcelain Crowns',
        'Dental Bridges',
        'Dentures (Full & Partial)',
        'Implant-Supported Dentures',
        'Same-Day CAD/CAM Crowns',
        'Inlays & Onlays',
        'Full Mouth Reconstruction'
      ]
    },
    {
      icon: <Smile className="w-12 h-12 text-[#0077b6]" />,
      title: 'Orthodontics',
      description: 'Straighten your smile with modern orthodontic solutions',
      priceRange: '$3,000 - $8,000',
      treatments: [
        'Invisalign Clear Aligners',
        'Invisalign Teen',
        'Adult Orthodontics',
        'Retainers',
        'Orthodontic Consultations',
        'Digital Treatment Planning',
        'Progress Monitoring',
        'Complimentary Whitening After Treatment'
      ]
    },
    {
      icon: <AlertCircle className="w-12 h-12 text-[#0077b6]" />,
      title: 'Emergency Dental Care',
      description: 'Immediate care when you need it most - available 24/7',
      priceRange: '$150 - $500',
      treatments: [
        'Severe Toothaches',
        'Knocked-Out Teeth',
        'Broken/Chipped Teeth',
        'Lost Fillings or Crowns',
        'Abscessed Teeth',
        'Soft Tissue Injuries',
        'Same-Day Appointments',
        '24/7 Emergency Hotline'
      ]
    },
    {
      icon: <Baby className="w-12 h-12 text-[#0077b6]" />,
      title: 'Pediatric Dentistry',
      description: 'Gentle, fun dental care for children of all ages',
      priceRange: '$50 - $200',
      treatments: [
        'First Dental Visits',
        'Children\'s Cleanings',
        'Fluoride Treatments',
        'Dental Sealants',
        'Cavity Prevention Education',
        'Gentle Sedation Options',
        'Fun, Kid-Friendly Environment',
        'Parent Education'
      ]
    },
    {
      icon: <Shield className="w-12 h-12 text-[#0077b6]" />,
      title: 'Periodontal Care',
      description: 'Specialized treatment for gum disease and oral health',
      priceRange: '$200 - $1,200',
      treatments: [
        'Deep Cleaning (Scaling & Root Planing)',
        'Gum Disease Treatment',
        'Periodontal Maintenance',
        'Laser Gum Therapy',
        'Gum Grafting',
        'Pocket Reduction Surgery',
        'Bone Grafting',
        'Periodontal Screenings'
      ]
    },
    {
      icon: <Heart className="w-12 h-12 text-[#0077b6]" />,
      title: 'Sedation Dentistry',
      description: 'Comfortable, anxiety-free dental care for nervous patients',
      priceRange: '$100 - $500',
      treatments: [
        'Nitrous Oxide (Laughing Gas)',
        'Oral Conscious Sedation',
        'IV Sedation',
        'Anxiety Management',
        'Comfort Dentistry Options',
        'Safe for All Ages',
        'Personalized Sedation Plans',
        'Post-Care Instructions'
      ]
    }
  ];

  const beforeAfter = [
    {
      title: 'Teeth Whitening',
      result: 'Shade improvement of 6-8 levels',
      duration: 'Single visit'
    },
    {
      title: 'Smile Makeover',
      result: 'Complete transformation',
      duration: '2-3 visits'
    },
    {
      title: 'Dental Implants',
      result: 'Permanent replacement',
      duration: '3-6 months'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Dental Services</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            From routine cleanings to complete smile makeovers, we offer comprehensive dental care
            using the latest technology and techniques.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#48cae4] hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="bg-[#023e8a]/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-[#023e8a] mb-3">{service.title}</h2>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="bg-[#48cae4]/10 border-l-4 border-[#0077b6] p-4 rounded">
                      <div className="text-sm text-gray-600 mb-1">Typical Price Range</div>
                      <div className="text-2xl font-bold text-[#023e8a]">{service.priceRange}</div>
                      <div className="text-xs text-gray-500 mt-1">Per treatment</div>
                    </div>
                  </div>

                  <div className="lg:w-2/3">
                    <h3 className="text-xl font-bold text-[#023e8a] mb-4">Treatments Offered:</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.treatments.map((treatment, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#0077b6] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{treatment}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => onNavigate('booking')}
                        className="bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#023e8a] transition-all flex items-center gap-2"
                      >
                        Schedule Consultation
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Smile Transformations</h2>
            <p className="text-xl text-gray-600">See the amazing results our patients have achieved</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {beforeAfter.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-500 mb-2">Before</div>
                      <div className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center text-4xl">
                        😐
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500 mb-2">After</div>
                      <div className="aspect-square bg-gradient-to-br from-[#48cae4] to-[#0077b6] rounded-lg flex items-center justify-center text-4xl">
                        😁
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#023e8a] mb-2">{item.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Result:</span>
                      <span className="font-semibold">{item.result}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-semibold">{item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Results may vary. Consult with our team for personalized treatment planning.</p>
            <button
              onClick={() => onNavigate('booking')}
              className="bg-[#023e8a] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0077b6] transition-all shadow-md"
            >
              Request Your Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#023e8a] to-[#0077b6] rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Affordable Payment Options</h2>
              <p className="text-xl text-gray-100">
                Don't let cost stand in the way of your perfect smile
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">Insurance</h3>
                <p className="text-gray-100 text-sm">
                  We accept most major dental insurance plans and will maximize your benefits.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">Financing</h3>
                <p className="text-gray-100 text-sm">
                  Flexible payment plans with CareCredit and LendingClub for all budgets.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">Membership</h3>
                <p className="text-gray-100 text-sm">
                  Join our dental savings plan for discounted services without insurance.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => onNavigate('patient-info')}
                className="bg-[#48cae4] text-[#023e8a] px-8 py-3 rounded-lg font-bold hover:bg-white transition-all"
              >
                Learn More About Payment Options
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#48cae4]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule your appointment today and take the first step toward a healthier, more beautiful smile.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('booking')}
              className="bg-[#023e8a] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#0077b6] transition-all shadow-md"
            >
              Book Appointment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#023e8a] border-2 border-[#023e8a] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
