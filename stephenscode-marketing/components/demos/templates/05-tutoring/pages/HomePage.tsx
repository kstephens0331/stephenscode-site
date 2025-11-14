import React from 'react';
import { GraduationCap, Users, Award, TrendingUp, BookOpen, Calculator, Beaker, FileText, Globe, Code, Clock, CheckCircle, Star, ArrowRight, Calendar, Target } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'subjects' | 'about' | 'contact') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [showConsultForm, setShowConsultForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    gradeLevel: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const subjects = [
    { icon: Calculator, name: 'Mathematics', description: 'K-12, SAT/ACT, Calculus', color: 'from-blue-500 to-blue-600' },
    { icon: Beaker, name: 'Science', description: 'Biology, Chemistry, Physics', color: 'from-green-500 to-green-600' },
    { icon: FileText, name: 'English', description: 'Reading, Writing, Literature', color: 'from-purple-500 to-purple-600' },
    { icon: Target, name: 'Test Prep', description: 'SAT, ACT, AP Exams', color: 'from-[#9a031e] to-red-600' },
    { icon: Globe, name: 'Languages', description: 'Spanish, French', color: 'from-[#fb8b24] to-orange-600' },
    { icon: Code, name: 'Computer Science', description: 'Coding & Programming', color: 'from-indigo-500 to-indigo-600' },
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Students Tutored', color: 'from-[#5f0f40] to-[#9a031e]' },
    { icon: Award, value: '98%', label: 'Success Rate', color: 'from-[#9a031e] to-red-600' },
    { icon: TrendingUp, value: '2.5', label: 'Avg Grade Improvement', color: 'from-[#fb8b24] to-orange-600' },
    { icon: GraduationCap, value: '15+', label: 'Years Experience', color: 'from-purple-600 to-indigo-600' },
  ];

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      role: 'Parent - High School Student',
      text: 'My daughter went from struggling in calculus to getting an A! The personalized attention made all the difference.',
      rating: 5,
      image: '👩‍💼',
    },
    {
      name: 'David Chen',
      role: 'Parent - SAT Student',
      text: 'SAT score improved by 300 points! The test prep strategies were incredibly effective. Highly recommend!',
      rating: 5,
      image: '👨‍💻',
    },
    {
      name: 'Sarah Johnson',
      role: 'Parent - Middle School Student',
      text: 'The tutors are patient, knowledgeable, and genuinely care about student success. Worth every penny!',
      rating: 5,
      image: '👩‍🎓',
    },
  ];

  const benefits = [
    { icon: Users, title: 'Expert Tutors', description: 'Certified educators with proven track records' },
    { icon: Calendar, title: 'Flexible Scheduling', description: 'Sessions that fit your busy lifestyle' },
    { icon: Target, title: 'Personalized Plans', description: 'Custom learning strategies for each student' },
    { icon: TrendingUp, title: 'Progress Tracking', description: 'Regular updates on student improvement' },
    { icon: Award, title: 'Proven Results', description: '98% of students improve grades' },
    { icon: Clock, title: 'Convenient Options', description: 'In-home or online tutoring available' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          business: 'Smart Start Tutoring',
          source: 'free_consultation_form',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', gradeLevel: '' });
        setTimeout(() => setShowConsultForm(false), 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#5f0f40] via-[#7a1050] to-[#9a031e] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-[#fb8b24] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ⭐ Trusted by 500+ Families
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Unlock Your Child's
                <span className="block mt-2 bg-gradient-to-r from-[#fb8b24] to-yellow-300 bg-clip-text text-transparent">
                  Academic Potential
                </span>
              </h1>

              <p className="text-xl text-purple-100 leading-relaxed">
                Expert tutoring in Math, Science, English, and Test Prep. Personalized attention
                that transforms struggling students into confident learners.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowConsultForm(true)}
                  className="group px-8 py-4 bg-[#fb8b24] text-white rounded-xl font-semibold hover:bg-[#e57a1a] transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('subjects')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
                >
                  View All Subjects
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-[#fb8b24]" />
                  <span className="text-sm text-purple-100">No Commitment Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-[#fb8b24]" />
                  <span className="text-sm text-purple-100">First Session Free</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#fb8b24] to-yellow-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-xl">
                    <div className="bg-[#fb8b24] p-3 rounded-lg">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-200">Student Success Rate</p>
                      <p className="text-2xl font-bold">98% Improvement</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-xl">
                    <div className="bg-[#fb8b24] p-3 rounded-lg">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-200">Average Score Increase</p>
                      <p className="text-2xl font-bold">2.5 Letter Grades</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-xl">
                    <div className="bg-[#fb8b24] p-3 rounded-lg">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-200">Expert Tutors</p>
                      <p className="text-2xl font-bold">15+ Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects Preview */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Subjects We Teach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tutoring services across all major subjects and grade levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#5f0f40] cursor-pointer"
                >
                  <div className={`inline-flex p-4 bg-gradient-to-br ${subject.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{subject.name}</h3>
                  <p className="text-gray-600">{subject.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('subjects')}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#5f0f40] to-[#9a031e] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-200"
            >
              <span>View All Subjects & Pricing</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Smart Start?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide more than just tutoring - we build confidence and foster lifelong learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5f0f40] to-[#9a031e] rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Parents Say
            </h2>
            <p className="text-xl text-gray-600">Real results from real families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#fb8b24] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#5f0f40] via-[#7a1050] to-[#9a031e] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to See Results?
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Schedule your free consultation today and discover how personalized tutoring
            can transform your child's academic journey.
          </p>
          <button
            onClick={() => setShowConsultForm(true)}
            className="inline-flex items-center space-x-2 px-10 py-5 bg-[#fb8b24] text-white rounded-xl font-bold text-lg hover:bg-[#e57a1a] transition-all duration-200 shadow-2xl hover:shadow-3xl"
          >
            <span>Get Your Free Consultation</span>
            <ArrowRight className="h-6 w-6" />
          </button>
          <p className="mt-6 text-purple-200 text-sm">
            ✓ No credit card required  ✓ No obligation  ✓ First session absolutely free
          </p>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Consultation</h3>
            <p className="text-gray-600 mb-6">Tell us about your tutoring needs</p>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600">We'll contact you within 24 hours to schedule your free consultation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject Needed *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="testprep">Test Prep</option>
                    <option value="languages">Foreign Languages</option>
                    <option value="cs">Computer Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 9th grade"
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent"
                  />
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm">Failed to submit. Please try again.</p>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowConsultForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5f0f40] to-[#9a031e] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
