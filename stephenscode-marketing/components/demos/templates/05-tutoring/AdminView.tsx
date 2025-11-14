import React from 'react';
import { Monitor, Palette, CheckCircle, Globe, Calculator, Beaker, FileText, Target, Code, Users, TrendingUp, Award, GraduationCap, Mail, Phone, MapPin, DollarSign } from 'lucide-react';

export default function AdminView() {
  const features = [
    { icon: CheckCircle, label: 'Multi-page Architecture', status: 'Implemented' },
    { icon: Palette, label: 'Custom Color Scheme', status: 'Deep Purple & Burgundy' },
    { icon: Globe, label: 'Full SEO Metadata', status: 'All Pages' },
    { icon: Mail, label: 'Lead Capture Integration', status: '/api/demo-lead' },
    { icon: Monitor, label: 'Responsive Design', status: 'Mobile-First' },
    { icon: Users, label: 'Professional Layout', status: 'Educational Theme' },
  ];

  const pages = [
    {
      name: 'Home',
      path: '/',
      sections: [
        'Hero with Free Consultation CTA',
        'Key Statistics (500+ Students, 98% Success)',
        'Subjects Preview Grid',
        'Why Choose Us - Benefits',
        'Student Testimonials',
        'Final CTA Section',
        'Free Consultation Modal',
      ],
    },
    {
      name: 'Subjects',
      path: '/subjects',
      sections: [
        'All 6 Subject Areas Detailed',
        'Topic Coverage Lists',
        'Pricing by Subject',
        'Package Deals (3 tiers)',
        'Study Skills & Test Strategies',
        'Flexible Scheduling Options',
        'Money-Back Guarantee',
      ],
    },
    {
      name: 'About',
      path: '/about',
      sections: [
        'Company Story & Mission',
        'Core Values (4 pillars)',
        'Teaching Approach (4 steps)',
        'Meet 4 Expert Tutors',
        'Student Success Stories',
        'Company Timeline',
        'Join Us CTA',
      ],
    },
    {
      name: 'Contact',
      path: '/contact',
      sections: [
        'Contact Information Cards',
        'Full Contact Form',
        'Lead Capture Integration',
        'Office Hours Display',
        'FAQ Section (6 questions)',
        'Quick Action CTAs',
      ],
    },
  ];

  const subjects = [
    { icon: Calculator, name: 'Mathematics', grades: 'K-12, College' },
    { icon: Beaker, name: 'Science', grades: '6th-12th, AP' },
    { icon: FileText, name: 'English & Writing', grades: 'K-12, College' },
    { icon: Target, name: 'Test Preparation', grades: 'SAT/ACT/AP' },
    { icon: Globe, name: 'Foreign Languages', grades: 'Spanish & French' },
    { icon: Code, name: 'Computer Science', grades: '6th-12th, College' },
  ];

  const tutors = [
    { name: 'Sarah Martinez', specialty: 'Mathematics', experience: '15 years' },
    { name: 'Dr. James Chen', specialty: 'Science', experience: '10 years' },
    { name: 'Emily Rodriguez', specialty: 'English & Writing', experience: '12 years' },
    { name: 'Michael Thompson', specialty: 'Test Prep', experience: '8 years' },
  ];

  const pricing = [
    { type: 'One-on-One', price: '$60/hour', icon: Users },
    { type: 'Small Group (2-3)', price: '$40/hour per student', icon: Users },
    { type: 'Test Prep Package', price: '$500 (10 sessions)', icon: Target },
    { type: 'Subject Mastery', price: '$800 (15 sessions)', icon: Award },
  ];

  const designElements = [
    'Academic & Professional Feel',
    'Subject Cards with Grade Levels',
    'Tutor Profile Cards with Credentials',
    'Student Success Stories',
    'Progress Tracking Promises',
    'Free Consultation CTAs',
    'Test Prep Specialties Highlighted',
    'Flexible Scheduling Options',
    'Certification Badges',
    'Money-Back Guarantee Display',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-[#5f0f40] to-[#9a031e] p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Smart Start Tutoring - Admin View</h1>
              <p className="text-purple-300">Demo Template #05 - Educational Services</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Overview */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
            <Monitor className="h-8 w-8 text-[#fb8b24]" />
            <span>Template Overview</span>
          </h2>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#fb8b24]">Business Type</h3>
                <p className="text-purple-200 mb-4">Educational tutoring service offering personalized academic support across multiple subjects and grade levels.</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>K-12 & College Tutoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Test Prep Specialization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>In-Home & Online Options</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#fb8b24]">Color Scheme</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-[#5f0f40] border-2 border-white/20"></div>
                    <div>
                      <p className="font-semibold">#5f0f40</p>
                      <p className="text-sm text-purple-300">Deep Purple (Primary)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-[#9a031e] border-2 border-white/20"></div>
                    <div>
                      <p className="font-semibold">#9a031e</p>
                      <p className="text-sm text-purple-300">Burgundy (Secondary)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-[#fb8b24] border-2 border-white/20"></div>
                    <div>
                      <p className="font-semibold">#fb8b24</p>
                      <p className="text-sm text-purple-300">Orange (Accent)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-[#fb8b24]/50 transition-colors">
                  <Icon className="h-8 w-8 text-[#fb8b24] mb-3" />
                  <h3 className="font-bold text-lg mb-2">{feature.label}</h3>
                  <p className="text-purple-300 text-sm">{feature.status}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pages Structure */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Pages & Sections</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {pages.map((page, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{page.name}</h3>
                  <span className="px-3 py-1 bg-[#fb8b24]/20 text-[#fb8b24] rounded-full text-sm font-semibold">
                    {page.path}
                  </span>
                </div>
                <ul className="space-y-2">
                  {page.sections.map((section, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-purple-200 text-sm">{section}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Subjects Offered */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Subjects Offered</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-[#5f0f40]/20 to-[#9a031e]/20 rounded-xl p-6 border border-white/10">
                  <Icon className="h-10 w-10 text-[#fb8b24] mb-3" />
                  <h3 className="font-bold text-lg mb-1">{subject.name}</h3>
                  <p className="text-purple-300 text-sm">{subject.grades}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tutors */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Featured Tutors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutors.map((tutor, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5f0f40] to-[#9a031e] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  👨‍🏫
                </div>
                <h3 className="font-bold mb-1">{tutor.name}</h3>
                <p className="text-purple-300 text-sm mb-1">{tutor.specialty}</p>
                <p className="text-[#fb8b24] text-sm font-semibold">{tutor.experience}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Pricing Structure</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pricing.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-[#5f0f40]/20 to-[#9a031e]/20 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-8 w-8 text-[#fb8b24]" />
                      <div>
                        <h3 className="font-bold text-lg">{item.type}</h3>
                        <p className="text-2xl font-bold text-[#fb8b24]">{item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Design Elements */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Unique Design Elements</h2>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-4">
              {designElements.map((element, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-purple-200">{element}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Technical Implementation</h2>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#fb8b24]">Architecture</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-200">Multi-page SPA with state management</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-200">Shared Layout component</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-200">React Helmet for dynamic SEO</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-200">Form validation & error handling</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#fb8b24]">Integrations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-200">Lead capture API integration</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-200">Multiple lead capture points</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-200">Mobile-responsive navigation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-200">Accessibility features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Template Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-400/20 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">4</div>
              <div className="text-purple-300">Pages</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-400/20 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">6</div>
              <div className="text-purple-300">Subject Areas</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-400/20 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">4</div>
              <div className="text-purple-300">Featured Tutors</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-6 border border-orange-400/20 text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">3</div>
              <div className="text-purple-300">Lead Capture Forms</div>
            </div>
          </div>
        </section>

        {/* File Structure */}
        <section>
          <h2 className="text-3xl font-bold mb-6">File Structure</h2>
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 font-mono text-sm">
            <pre className="text-green-400">
{`05-tutoring/
├── index.tsx
├── CustomerView.tsx
├── AdminView.tsx
├── components/
│   └── Layout.tsx
└── pages/
    ├── HomePage.tsx
    ├── SubjectsPage.tsx
    ├── AboutPage.tsx
    └── ContactPage.tsx`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
