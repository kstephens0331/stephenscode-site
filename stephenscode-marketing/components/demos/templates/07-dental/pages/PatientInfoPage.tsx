import React, { useState } from 'react';
import { FileText, CreditCard, Shield, Clock, Download, CheckCircle, HelpCircle, Phone } from 'lucide-react';

interface PatientInfoPageProps {
  onNavigate: (page: string) => void;
}

export default function PatientInfoPage({ onNavigate }: PatientInfoPageProps) {
  const [activeTab, setActiveTab] = useState<'new-patients' | 'insurance' | 'forms' | 'faq'>('new-patients');

  const insuranceProviders = [
    { name: 'Delta Dental', coverage: 'Preferred Provider' },
    { name: 'Cigna', coverage: 'In-Network' },
    { name: 'Aetna', coverage: 'In-Network' },
    { name: 'MetLife', coverage: 'Preferred Provider' },
    { name: 'United Healthcare', coverage: 'In-Network' },
    { name: 'Blue Cross Blue Shield', coverage: 'In-Network' },
    { name: 'Guardian', coverage: 'Participating Provider' },
    { name: 'Humana', coverage: 'In-Network' },
    { name: 'Ameritas', coverage: 'Preferred Provider' },
    { name: 'Principal', coverage: 'In-Network' }
  ];

  const forms = [
    {
      title: 'New Patient Registration Form',
      description: 'Required for all new patients - includes medical history',
      icon: <FileText className="w-6 h-6 text-[#0077b6]" />,
      required: true
    },
    {
      title: 'Medical History Update',
      description: 'For existing patients to update their medical information',
      icon: <FileText className="w-6 h-6 text-[#0077b6]" />,
      required: false
    },
    {
      title: 'Insurance Information Form',
      description: 'Provide your insurance details for benefits verification',
      icon: <CreditCard className="w-6 h-6 text-[#0077b6]" />,
      required: false
    },
    {
      title: 'HIPAA Privacy Notice',
      description: 'Review our privacy practices and patient rights',
      icon: <Shield className="w-6 h-6 text-[#0077b6]" />,
      required: true
    },
    {
      title: 'Financial Policy Agreement',
      description: 'Payment terms and financial responsibilities',
      icon: <CreditCard className="w-6 h-6 text-[#0077b6]" />,
      required: true
    },
    {
      title: 'Consent for Treatment',
      description: 'Authorization for dental procedures and care',
      icon: <FileText className="w-6 h-6 text-[#0077b6]" />,
      required: true
    }
  ];

  const faqs = [
    {
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring a valid photo ID, your insurance card (if applicable), a list of current medications, and completed new patient forms. If you have recent dental X-rays from another office, we can request those as well.'
    },
    {
      question: 'Do you accept my insurance?',
      answer: 'We accept most major dental insurance plans. Please contact our office with your insurance information, and we\'ll verify your benefits before your appointment. We\'ll also provide a cost estimate for any recommended treatments.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, checks, all major credit cards (Visa, MasterCard, Discover, American Express), CareCredit, and offer flexible payment plans through LendingClub. We also have an in-house dental savings plan for patients without insurance.'
    },
    {
      question: 'How often should I visit the dentist?',
      answer: 'Most patients should visit the dentist every 6 months for routine cleanings and exams. However, your specific needs may vary based on your oral health condition. Our team will recommend a personalized schedule during your visit.'
    },
    {
      question: 'What if I have a dental emergency?',
      answer: 'We offer same-day emergency appointments and have a 24/7 emergency hotline at (555) 911-CARE. Common emergencies include severe toothaches, knocked-out teeth, broken teeth, or lost fillings. Call us immediately and we\'ll provide guidance and schedule urgent care.'
    },
    {
      question: 'Are your dentists accepting new patients?',
      answer: 'Yes! All of our dentists are currently accepting new patients. We welcome patients of all ages and make every effort to accommodate your schedule, including evening and weekend appointments.'
    },
    {
      question: 'Do you offer sedation dentistry?',
      answer: 'Yes, we offer multiple sedation options including nitrous oxide (laughing gas), oral conscious sedation, and IV sedation. These options are perfect for patients with dental anxiety or those undergoing complex procedures.'
    },
    {
      question: 'How do I cancel or reschedule my appointment?',
      answer: 'Please call our office at least 24 hours in advance to cancel or reschedule. This allows us to offer the time slot to another patient. We understand emergencies happen, and we\'ll work with you to find a new appointment time.'
    }
  ];

  const newPatientSteps = [
    {
      step: 1,
      title: 'Complete Forms',
      description: 'Download and fill out our new patient forms, or arrive 15 minutes early to complete them in office.',
      icon: <FileText className="w-8 h-8 text-[#0077b6]" />
    },
    {
      step: 2,
      title: 'Comprehensive Exam',
      description: 'Your dentist will perform a thorough examination, including digital X-rays and oral cancer screening.',
      icon: <CheckCircle className="w-8 h-8 text-[#0077b6]" />
    },
    {
      step: 3,
      title: 'Treatment Plan',
      description: 'We\'ll discuss our findings and create a personalized treatment plan tailored to your needs and goals.',
      icon: <FileText className="w-8 h-8 text-[#0077b6]" />
    },
    {
      step: 4,
      title: 'Professional Cleaning',
      description: 'If time allows and your oral health permits, we\'ll complete your cleaning during the same visit.',
      icon: <CheckCircle className="w-8 h-8 text-[#0077b6]" />
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Patient Information</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            Everything you need to know to make your visit smooth and comfortable
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            <button
              onClick={() => setActiveTab('new-patients')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'new-patients'
                  ? 'bg-[#0077b6] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              New Patients
            </button>
            <button
              onClick={() => setActiveTab('insurance')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'insurance'
                  ? 'bg-[#0077b6] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Insurance & Payment
            </button>
            <button
              onClick={() => setActiveTab('forms')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'forms'
                  ? 'bg-[#0077b6] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Patient Forms
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'faq'
                  ? 'bg-[#0077b6] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>
      </section>

      {/* New Patients Tab */}
      {activeTab === 'new-patients' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Welcome New Patients!</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're excited to welcome you to our dental family. Here's what to expect during your first visit.
              </p>
            </div>

            {/* New Patient Special */}
            <div className="bg-gradient-to-r from-[#48cae4] to-[#0077b6] rounded-2xl p-8 text-white mb-12">
              <div className="text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-4">New Patient Special Offer</h3>
                <p className="text-xl mb-6">Comprehensive Exam + Cleaning + Digital X-Rays</p>
                <div className="text-5xl font-bold mb-6">
                  <span className="line-through opacity-50">$350</span> $99
                </div>
                <p className="text-sm mb-6">*For patients without insurance. Offer valid for new patients only.</p>
                <button
                  onClick={() => onNavigate('booking')}
                  className="bg-white text-[#023e8a] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
                >
                  Claim This Offer
                </button>
              </div>
            </div>

            {/* What to Expect */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-[#023e8a] mb-8 text-center">Your First Visit</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newPatientSteps.map((item) => (
                  <div key={item.step} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="bg-[#023e8a]/5 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <div className="text-sm font-bold text-[#48cae4] mb-2">Step {item.step}</div>
                    <h4 className="text-xl font-bold text-[#023e8a] mb-3">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Bring */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h3 className="text-2xl font-bold text-[#023e8a] mb-6">What to Bring</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#0077b6] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-[#023e8a] mb-1">Valid Photo ID</div>
                    <div className="text-gray-600 text-sm">Driver's license, passport, or state ID</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#0077b6] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-[#023e8a] mb-1">Insurance Card</div>
                    <div className="text-gray-600 text-sm">If you have dental insurance</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#0077b6] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-[#023e8a] mb-1">List of Medications</div>
                    <div className="text-gray-600 text-sm">All current prescriptions and supplements</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#0077b6] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-[#023e8a] mb-1">Completed Forms</div>
                    <div className="text-gray-600 text-sm">Download from our Forms section</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-[#023e8a] mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-[#0077b6]" />
                Office Hours
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-semibold text-[#023e8a]">Monday - Friday</span>
                      <span className="text-gray-700">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-semibold text-[#023e8a]">Saturday</span>
                      <span className="text-gray-700">9:00 AM - 3:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-semibold text-[#023e8a]">Sunday</span>
                      <span className="text-gray-700">Closed</span>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
                  <div className="flex items-start gap-3">
                    <Phone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-red-900 mb-2">Emergency Care Available 24/7</div>
                      <div className="text-red-800 text-sm mb-2">For dental emergencies, call our emergency hotline:</div>
                      <a href="tel:555-911-CARE" className="text-xl font-bold text-red-600 hover:text-red-700">
                        (555) 911-CARE
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Insurance & Payment Tab */}
      {activeTab === 'insurance' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Insurance & Payment Options</h2>
              <p className="text-xl text-gray-600">We make dental care affordable for everyone</p>
            </div>

            {/* Insurance Providers */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h3 className="text-2xl font-bold text-[#023e8a] mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#0077b6]" />
                Accepted Insurance Plans
              </h3>
              <p className="text-gray-600 mb-6">
                We're in-network with most major dental insurance providers. We'll verify your benefits and
                maximize your coverage to minimize out-of-pocket costs.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insuranceProviders.map((provider, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-[#023e8a]">{provider.name}</span>
                    <span className="text-sm text-[#0077b6] bg-[#48cae4]/10 px-3 py-1 rounded-full">
                      {provider.coverage}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Don't see your insurance listed? Contact us - we work with many additional providers!
              </p>
            </div>

            {/* Payment Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <CreditCard className="w-12 h-12 text-[#0077b6] mb-4" />
                <h3 className="text-xl font-bold text-[#023e8a] mb-3">Payment Methods</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0077b6]" />
                    Cash & Checks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0077b6]" />
                    All Major Credit Cards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0077b6]" />
                    Debit Cards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0077b6]" />
                    HSA/FSA Cards
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <FileText className="w-12 h-12 text-[#0077b6] mb-4" />
                <h3 className="text-xl font-bold text-[#023e8a] mb-3">Financing Options</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0077b6]" />
                    CareCredit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0077b6]" />
                    LendingClub
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0077b6]" />
                    0% Interest Options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0077b6]" />
                    Flexible Payment Plans
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#0077b6] to-[#48cae4] rounded-xl p-6 shadow-md text-white">
                <Shield className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-3">Dental Savings Plan</h3>
                <p className="text-sm mb-4">No insurance? Save 20-40% on all services</p>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                  <div className="text-sm">Annual Membership</div>
                  <div className="text-3xl font-bold">$299/year</div>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-white text-[#023e8a] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Financial Policy */}
            <div className="bg-[#023e8a]/5 border-l-4 border-[#0077b6] p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-[#023e8a] mb-3">Our Financial Policy</h3>
              <div className="space-y-2 text-gray-700">
                <p>• Payment is expected at the time of service unless other arrangements have been made in advance.</p>
                <p>• We'll file insurance claims on your behalf and provide estimates of your coverage.</p>
                <p>• Any balance not covered by insurance is the patient's responsibility.</p>
                <p>• We offer interest-free payment plans for treatments over $500.</p>
                <p>• A credit card is required on file for all treatment plans.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Forms Tab */}
      {activeTab === 'forms' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Patient Forms</h2>
              <p className="text-xl text-gray-600">
                Download and complete these forms before your appointment to save time
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <p className="text-gray-700 mb-6">
                Please download and complete all required forms before your appointment. You can either bring
                the completed forms with you or email them to{' '}
                <a href="mailto:forms@brightsmile.com" className="text-[#0077b6] font-semibold hover:underline">
                  forms@brightsmile.com
                </a>
                {' '}at least 24 hours before your visit.
              </p>

              <div className="space-y-4">
                {forms.map((form, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      {form.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-[#023e8a] mb-1 flex items-center gap-2">
                            {form.title}
                            {form.required && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                Required
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-600 text-sm">{form.description}</p>
                        </div>
                        <button className="flex items-center gap-2 bg-[#0077b6] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#023e8a] transition-all whitespace-nowrap">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#48cae4]/10 border border-[#48cae4] rounded-xl p-6">
              <h3 className="font-bold text-[#023e8a] mb-2">Need Help?</h3>
              <p className="text-gray-700 text-sm">
                If you have questions about any of these forms or need assistance completing them,
                please call our office at{' '}
                <a href="tel:555-123-4567" className="text-[#0077b6] font-semibold hover:underline">
                  (555) 123-4567
                </a>
                {' '}and we'll be happy to help.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Find answers to common questions about our practice</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-6 h-6 text-[#0077b6] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-[#023e8a] mb-3">{faq.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-[#0077b6] to-[#48cae4] rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="mb-6">Our friendly team is here to help! Give us a call or send us a message.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="tel:555-123-4567"
                  className="bg-white text-[#023e8a] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
                >
                  Call (555) 123-4567
                </a>
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#023e8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#023e8a]/80 transition-all"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Ready to Schedule Your Visit?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your appointment online or give us a call. We can't wait to welcome you!
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="bg-[#0077b6] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#023e8a] transition-all shadow-md"
          >
            Book Your Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
