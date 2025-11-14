import React from 'react';
import { Calculator, Beaker, FileText, Target, Globe, Code, Clock, CheckCircle, Users, Calendar, Award, BookOpen, Brain, Zap } from 'lucide-react';

interface SubjectsPageProps {
  onNavigate: (page: 'home' | 'subjects' | 'about' | 'contact') => void;
}

export default function SubjectsPage({ onNavigate }: SubjectsPageProps) {
  const subjects = [
    {
      icon: Calculator,
      name: 'Mathematics',
      color: 'from-blue-500 to-blue-600',
      grades: 'K-12, College',
      description: 'Master concepts from basic arithmetic to advanced calculus with our expert math tutors.',
      topics: [
        'Algebra & Geometry',
        'Trigonometry & Pre-Calculus',
        'Calculus (AP & College)',
        'SAT/ACT Math Prep',
        'Statistics & Probability',
        'Math Competition Prep',
      ],
      pricing: {
        oneOnOne: '$60/hour',
        smallGroup: '$40/hour per student',
      },
    },
    {
      icon: Beaker,
      name: 'Science',
      color: 'from-green-500 to-green-600',
      grades: '6th-12th, AP',
      description: 'Explore the wonders of science through engaging lessons and hands-on problem solving.',
      topics: [
        'Biology (General & AP)',
        'Chemistry (General & AP)',
        'Physics (General & AP)',
        'Earth Science',
        'Environmental Science',
        'Lab Report Writing',
      ],
      pricing: {
        oneOnOne: '$60/hour',
        smallGroup: '$40/hour per student',
      },
    },
    {
      icon: FileText,
      name: 'English & Writing',
      color: 'from-purple-500 to-purple-600',
      grades: 'K-12, College',
      description: 'Develop strong reading comprehension, writing skills, and literary analysis abilities.',
      topics: [
        'Reading Comprehension',
        'Essay Writing & Composition',
        'Literature Analysis',
        'Grammar & Vocabulary',
        'Creative Writing',
        'College Essay Editing',
      ],
      pricing: {
        oneOnOne: '$60/hour',
        smallGroup: '$40/hour per student',
      },
    },
    {
      icon: Target,
      name: 'Test Preparation',
      color: 'from-[#9a031e] to-red-600',
      grades: 'High School',
      description: 'Achieve your target scores with proven strategies and comprehensive practice.',
      topics: [
        'SAT Prep (All Sections)',
        'ACT Prep (All Sections)',
        'AP Exam Preparation',
        'PSAT/National Merit',
        'Subject-Specific Tests',
        'Test-Taking Strategies',
      ],
      pricing: {
        oneOnOne: '$70/hour',
        package: '$500 (10 sessions)',
      },
    },
    {
      icon: Globe,
      name: 'Foreign Languages',
      color: 'from-[#fb8b24] to-orange-600',
      grades: 'All Levels',
      description: 'Build fluency and confidence in Spanish or French with our native-speaking tutors.',
      topics: [
        'Spanish (Levels 1-4, AP)',
        'French (Levels 1-4, AP)',
        'Conversation Practice',
        'Grammar & Vocabulary',
        'Cultural Studies',
        'Test & Exam Prep',
      ],
      pricing: {
        oneOnOne: '$60/hour',
        smallGroup: '$40/hour per student',
      },
    },
    {
      icon: Code,
      name: 'Computer Science',
      color: 'from-indigo-500 to-indigo-600',
      grades: '6th-12th, College',
      description: 'Learn coding fundamentals and advanced programming concepts for the digital age.',
      topics: [
        'Python Programming',
        'Java & JavaScript',
        'Web Development (HTML/CSS)',
        'AP Computer Science',
        'Data Structures & Algorithms',
        'Game Development Basics',
      ],
      pricing: {
        oneOnOne: '$65/hour',
        smallGroup: '$45/hour per student',
      },
    },
  ];

  const packages = [
    {
      name: 'Starter Package',
      price: '$300',
      sessions: '5 Sessions',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      features: [
        '5 one-hour sessions',
        'Single subject focus',
        'Flexible scheduling',
        'Progress reports',
        'Email support',
      ],
      popular: false,
    },
    {
      name: 'Test Prep Package',
      price: '$500',
      sessions: '10 Sessions',
      icon: Target,
      color: 'from-[#9a031e] to-red-600',
      features: [
        '10 one-hour sessions',
        'SAT or ACT focused',
        'Practice test analysis',
        'Strategy development',
        'Score improvement guarantee',
      ],
      popular: true,
    },
    {
      name: 'Subject Mastery',
      price: '$800',
      sessions: '15 Sessions',
      icon: Award,
      color: 'from-[#5f0f40] to-[#9a031e]',
      features: [
        '15 one-hour sessions',
        'Multi-subject support',
        'Priority scheduling',
        'Weekly progress reports',
        'Parent consultations',
      ],
      popular: false,
    },
  ];

  const studySkills = [
    { icon: Brain, title: 'Study Skills', description: 'Learn effective note-taking and organization' },
    { icon: Clock, title: 'Time Management', description: 'Master scheduling and productivity techniques' },
    { icon: Zap, title: 'Test Strategies', description: 'Develop anxiety management and exam tactics' },
    { icon: Users, title: 'Group Study', description: 'Collaborative learning sessions available' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#5f0f40] via-[#7a1050] to-[#9a031e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Our Subjects & Services
            </h1>
            <p className="text-xl text-purple-100 leading-relaxed">
              Comprehensive tutoring across all major subjects. Expert instruction tailored to
              your student's unique learning style and academic goals.
            </p>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  <div className={`bg-gradient-to-br ${subject.color} p-6`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{subject.name}</h3>
                          <p className="text-white/90 text-sm font-medium">{subject.grades}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <p className="text-gray-700 leading-relaxed">{subject.description}</p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-[#5f0f40]" />
                        <span>Topics Covered</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {subject.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2">Pricing</h4>
                      <div className="space-y-2">
                        {Object.entries(subject.pricing).map(([key, value], idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="font-bold text-[#5f0f40]">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Popular Packages
            </h2>
            <p className="text-xl text-gray-600">
              Save with our bundled session packages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden ${
                    pkg.popular ? 'border-[#fb8b24] scale-105' : 'border-gray-200'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-[#fb8b24] text-white px-4 py-1 text-sm font-bold rounded-bl-xl">
                      MOST POPULAR
                    </div>
                  )}

                  <div className={`bg-gradient-to-br ${pkg.color} p-6 text-white`}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className="text-white/80">/ {pkg.sessions}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => onNavigate('contact')}
                      className={`w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-[#5f0f40] to-[#9a031e] text-white hover:shadow-lg'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Study Skills Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Beyond Subject Tutoring
            </h2>
            <p className="text-xl text-gray-600">
              Essential skills for academic success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {studySkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5f0f40] to-[#9a031e] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scheduling Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#5f0f40] via-[#7a1050] to-[#9a031e] rounded-3xl p-12 text-white shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Flexible Scheduling Options</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#fb8b24] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-lg">In-Home Tutoring</p>
                      <p className="text-purple-200">Convenient sessions in your home</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#fb8b24] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-lg">Online Tutoring</p>
                      <p className="text-purple-200">Virtual sessions via video call</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#fb8b24] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-lg">Learning Center</p>
                      <p className="text-purple-200">Visit our comfortable tutoring facility</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#fb8b24] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-lg">Flexible Hours</p>
                      <p className="text-purple-200">Weekdays, evenings, and weekends available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Calendar className="h-8 w-8 text-[#fb8b24]" />
                  <h3 className="text-2xl font-bold">Schedule Today</h3>
                </div>
                <p className="text-purple-100 mb-6 leading-relaxed">
                  Get started with a free consultation. We'll assess your student's needs and create
                  a personalized learning plan.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full px-8 py-4 bg-[#fb8b24] text-white rounded-xl font-bold hover:bg-[#e57a1a] transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  Book Free Consultation
                </button>
                <p className="text-center text-sm text-purple-200 mt-4">
                  First session absolutely free - no obligation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#5f0f40] to-[#9a031e] rounded-full mb-6 shadow-xl">
            <Award className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Guarantee
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            We're confident in our tutors' ability to help your student succeed. If you're not
            satisfied after your first paid session, we'll refund your money - no questions asked.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900">Satisfaction Guaranteed</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900">Certified Tutors</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900">Proven Results</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
