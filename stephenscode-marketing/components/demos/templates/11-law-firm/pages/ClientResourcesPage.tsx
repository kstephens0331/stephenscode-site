import React from 'react';
import { FileText, Download, Book, Video, HelpCircle, Phone, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ClientResourcesPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function ClientResourcesPage({ onNavigate, accentColor = '#c9a227' }: ClientResourcesPageProps) {
  const guides = [
    {
      title: 'What to Do After a Car Accident',
      category: 'Personal Injury',
      icon: FileText,
      description: 'Step-by-step guide on protecting your rights and documenting your accident.',
    },
    {
      title: 'Understanding Your Rights When Arrested',
      category: 'Criminal Defense',
      icon: Book,
      description: 'Know your constitutional rights and what to say (or not say) to police.',
    },
    {
      title: 'Divorce Process: A Complete Guide',
      category: 'Family Law',
      icon: FileText,
      description: 'Navigate the divorce process with confidence and understand your options.',
    },
    {
      title: 'Estate Planning Essentials',
      category: 'Estate Planning',
      icon: Book,
      description: 'Learn why estate planning is crucial and what documents you need.',
    },
    {
      title: 'Starting a Business: Legal Checklist',
      category: 'Business Law',
      icon: FileText,
      description: 'Essential legal steps for starting and protecting your business.',
    },
    {
      title: 'Immigration Application Guide',
      category: 'Immigration',
      icon: Book,
      description: 'Understanding the immigration process and common visa types.',
    },
  ];

  const videoResources = [
    {
      title: 'Know Your Rights: Police Encounters',
      duration: '8:45',
      category: 'Criminal Defense',
    },
    {
      title: 'Personal Injury Claims Explained',
      duration: '12:30',
      category: 'Personal Injury',
    },
    {
      title: 'Estate Planning 101',
      duration: '15:20',
      category: 'Estate Planning',
    },
    {
      title: 'Workplace Rights and Discrimination',
      duration: '10:15',
      category: 'Employment Law',
    },
  ];

  const forms = [
    'New Client Intake Form',
    'Authorization to Release Medical Records',
    'Contingency Fee Agreement',
    'Client Questionnaire - Personal Injury',
    'Document Checklist - Family Law',
    'Business Formation Questionnaire',
  ];

  const steps = [
    {
      number: 1,
      title: 'Initial Consultation',
      description: 'Schedule a free consultation to discuss your case with an experienced attorney.',
    },
    {
      number: 2,
      title: 'Case Evaluation',
      description: 'We review all relevant documents and evidence to build your case strategy.',
    },
    {
      number: 3,
      title: 'Agreement & Retainer',
      description: 'Sign the representation agreement and we begin working on your case immediately.',
    },
    {
      number: 4,
      title: 'Investigation & Discovery',
      description: 'We gather evidence, interview witnesses, and build a strong case on your behalf.',
    },
    {
      number: 5,
      title: 'Negotiation or Trial',
      description: 'We pursue the best outcome through settlement negotiations or courtroom litigation.',
    },
    {
      number: 6,
      title: 'Resolution',
      description: 'Achieve a successful resolution and receive your compensation or favorable verdict.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Client Resources</h1>
          <p className="text-xl text-gray-300">
            Access helpful guides, forms, and information to help you understand your legal rights
            and navigate the legal process with confidence.
          </p>
        </div>
      </section>

      {/* Legal Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Free Legal Guides
            </h2>
            <p className="text-xl text-gray-600">
              Download our comprehensive guides to understand your legal situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
                  style={{ borderTop: `4px solid ${accentColor}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <Download className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    {guide.category}
                  </div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: '#1a1a2e' }}>
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                  <button
                    className="w-full py-2 rounded-lg font-medium text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: accentColor, color: '#16213e' }}
                  >
                    Download Guide
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Resources */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Educational Videos
            </h2>
            <p className="text-xl text-gray-600">
              Watch our attorneys explain important legal topics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoResources.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <Video className="w-16 h-16" style={{ color: accentColor }} />
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    {video.category}
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#1a1a2e' }}>
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-600">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              What to Expect When Working With Us
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the legal process helps reduce stress and uncertainty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg"
                    style={{ backgroundColor: accentColor, color: '#16213e' }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute left-6 top-14 w-0.5 h-full"
                    style={{ backgroundColor: `${accentColor}40` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms & Documents */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Forms & Documents
            </h2>
            <p className="text-xl text-gray-600">
              Download and complete necessary forms before your consultation
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {forms.map((form, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                  style={{ border: `1px solid ${accentColor}40` }}
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5" style={{ color: accentColor }} />
                    <span className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                      {form}
                    </span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Common Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to frequently asked questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                question: 'How much does it cost?',
                answer: 'Many cases are handled on contingency - you pay nothing unless we win.',
              },
              {
                question: 'How long will my case take?',
                answer: 'Timeline varies by case complexity, typically 6-18 months for settlements.',
              },
              {
                question: 'Do I need to come to your office?',
                answer: 'We offer flexible meetings including office, home visits, and virtual consultations.',
              },
              {
                question: 'What should I bring to consultation?',
                answer: 'Any relevant documents, photos, medical records, and a list of questions.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-lg"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <HelpCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: accentColor }} />
                  <h3 className="font-bold" style={{ color: '#1a1a2e' }}>
                    {faq.question}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('faq')}
              className="px-8 py-3 rounded-lg font-bold transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: '#16213e' }}
            >
              View All FAQs
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section
        className="py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-6">
            <AlertTriangle className="w-12 h-12 flex-shrink-0" style={{ color: accentColor }} />
            <div>
              <h2 className="text-3xl font-bold mb-4">Need Immediate Legal Help?</h2>
              <p className="text-xl mb-6 text-gray-300">
                If you're facing an urgent legal situation, contact us immediately. We're available
                24/7 for emergency consultations.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: '#16213e' }}
                >
                  Contact Us Now
                </button>
                <a
                  href="tel:5551234567"
                  className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all hover:bg-white hover:text-gray-900 flex items-center space-x-2"
                  style={{ borderColor: accentColor, color: '#ffffff' }}
                >
                  <Phone className="w-5 h-5" />
                  <span>(555) 123-4567</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
