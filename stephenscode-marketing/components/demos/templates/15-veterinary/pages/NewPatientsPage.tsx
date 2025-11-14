import React from 'react';
import { ClipboardCheck, FileText, CreditCard, Clock, MapPin, Phone, Mail, Download, CheckCircle, Heart } from 'lucide-react';

interface NewPatientsPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function NewPatientsPage({ onNavigate, colors }: NewPatientsPageProps) {
  const steps = [
    {
      number: '1',
      title: 'Complete Forms',
      icon: FileText,
      description: 'Fill out our new patient registration forms online or in-office before your first visit.',
      details: [
        'Patient information form',
        'Medical history questionnaire',
        'Previous veterinary records release',
        'Consent forms'
      ]
    },
    {
      number: '2',
      title: 'Schedule Appointment',
      icon: Clock,
      description: 'Call or use our online booking to schedule your pet\'s first wellness exam.',
      details: [
        'Choose convenient date and time',
        'Select preferred veterinarian',
        'Discuss any immediate concerns',
        'Get directions to our clinic'
      ]
    },
    {
      number: '3',
      title: 'Gather Records',
      icon: ClipboardCheck,
      description: 'Bring any previous medical records, vaccination history, and current medications.',
      details: [
        'Previous vet records',
        'Vaccination certificates',
        'Current medication list',
        'Microchip information if applicable'
      ]
    },
    {
      number: '4',
      title: 'Visit Day',
      icon: Heart,
      description: 'Arrive 10 minutes early for your first visit to complete any remaining paperwork.',
      details: [
        'Bring your pet on leash or in carrier',
        'Have payment method ready',
        'List any questions or concerns',
        'Enjoy meeting your vet team!'
      ]
    }
  ];

  const whatToBring = [
    { icon: FileText, item: 'Previous medical records', description: 'Vaccination history and past health issues' },
    { icon: CreditCard, item: 'Payment method', description: 'Cash, credit, or pet insurance information' },
    { icon: ClipboardCheck, item: 'List of current medications', description: 'Including dosages and schedules' },
    { icon: Mail, item: 'Questions and concerns', description: 'Write them down so you don\'t forget!' },
  ];

  const firstVisitExpectations = [
    {
      title: 'Comprehensive Physical Exam',
      description: 'Head-to-tail examination including eyes, ears, teeth, heart, lungs, abdomen, skin, and joints.',
      duration: '30-45 minutes'
    },
    {
      title: 'Health History Discussion',
      description: 'Detailed conversation about diet, behavior, lifestyle, and any concerns you may have.',
      duration: '10-15 minutes'
    },
    {
      title: 'Preventive Care Planning',
      description: 'Personalized recommendations for vaccinations, parasite prevention, and wellness care.',
      duration: '10 minutes'
    },
    {
      title: 'Questions & Education',
      description: 'Time for you to ask questions and learn about keeping your pet healthy.',
      duration: '10 minutes'
    }
  ];

  const forms = [
    { name: 'New Patient Registration Form', required: true, type: 'PDF Download' },
    { name: 'Medical History Questionnaire', required: true, type: 'PDF Download' },
    { name: 'Records Release Authorization', required: false, type: 'PDF Download' },
    { name: 'Payment & Insurance Information', required: true, type: 'PDF Download' },
    { name: 'Boarding & Emergency Contact', required: false, type: 'PDF Download' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section style={{ backgroundColor: colors.primary }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">Welcome New Patients!</h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              We're excited to meet you and your pet! Here's everything you need to know to prepare for your first visit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Call to Schedule</h3>
              <p className="text-teal-100 mb-4">Monday - Friday, 8am - 7pm</p>
              <a href="tel:555-123-4567" className="text-2xl font-bold hover:underline">
                (555) 123-4567
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Visit Our Clinic</h3>
              <p className="text-teal-100">
                123 Veterinary Lane<br />
                Anytown, ST 12345
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-teal-100 mb-4">Questions? We're here to help!</p>
              <a href="mailto:info@pawsandcare.com" className="font-bold hover:underline">
                info@pawsandcare.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Getting Started is Easy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to become a Paws & Care patient
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-b from-teal-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-8 h-8" style={{ color: colors.primary }} />
                        <h3 className="text-2xl font-bold" style={{ color: colors.primary }}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              What to Bring to Your First Visit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Come prepared to make the most of your appointment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToBring.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center"
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: colors.accent + '30' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: colors.primary }}>
                    {item.item}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* First Visit Expectations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              What to Expect During Your First Visit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your first appointment typically takes 60-90 minutes
            </p>
          </div>

          <div className="space-y-6">
            {firstVisitExpectations.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-teal-50 to-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: colors.secondary, color: 'white' }}
                    >
                      {item.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-2xl p-8 text-center">
            <Clock className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Total Visit Time: 60-90 Minutes
            </h3>
            <p className="text-teal-100 leading-relaxed max-w-2xl mx-auto">
              We take our time to ensure thorough care and to answer all your questions. Please arrive 10 minutes early to complete any remaining paperwork.
            </p>
          </div>
        </div>
      </section>

      {/* Forms Download Section */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <Download className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                Download New Patient Forms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Save time by completing these forms before your visit. You can also fill them out when you arrive.
              </p>
            </div>

            <div className="space-y-4">
              {forms.map((form, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:shadow-md transition-all border-2"
                  style={{ borderColor: colors.accent + '30', backgroundColor: colors.accent + '10' }}
                >
                  <div className="flex items-center gap-4">
                    <FileText className="w-6 h-6" style={{ color: colors.primary }} />
                    <div>
                      <h4 className="font-bold" style={{ color: colors.primary }}>
                        {form.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {form.required ? 'Required' : 'Optional'} • {form.type}
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: colors.accent + '20' }}>
              <p className="text-center text-gray-700 leading-relaxed">
                <strong>Prefer to fill out forms online?</strong> Call us at (555) 123-4567 and we'll email you secure online forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment & Insurance */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-b from-teal-50 to-white rounded-2xl p-8 shadow-lg">
              <CreditCard className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                Payment Information
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Payment is due at the time of service. We want to keep our fees affordable while providing excellent care.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.secondary }} />
                  Cash and checks accepted
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.secondary }} />
                  All major credit cards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.secondary }} />
                  CareCredit financing available
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.secondary }} />
                  Scratchpay payment plans
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-b from-teal-50 to-white rounded-2xl p-8 shadow-lg">
              <Heart className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                Pet Insurance
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We accept all pet insurance providers and can help you understand your coverage.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.secondary }} />
                  Detailed invoices for claims
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.secondary }} />
                  Direct submission assistance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.secondary }} />
                  Help choosing the right plan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.secondary }} />
                  Pre-approval verification
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Schedule Your First Visit?
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            We can't wait to meet you and your pet! Book your appointment today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              Schedule Appointment
            </button>
            <a
              href="tel:555-123-4567"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
