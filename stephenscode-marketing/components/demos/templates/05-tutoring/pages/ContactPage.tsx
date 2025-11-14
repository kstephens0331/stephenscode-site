import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle, Calendar, Users, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: 'home' | 'subjects' | 'about' | 'contact') => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    gradeLevel: '',
    message: '',
    contactMethod: 'email',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

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
          source: 'contact_page',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          gradeLevel: '',
          message: '',
          contactMethod: 'email',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      detail: '(555) 123-4567',
      link: 'tel:555-123-4567',
      description: 'Mon-Fri 9am-8pm, Sat 10am-6pm',
    },
    {
      icon: Mail,
      title: 'Email',
      detail: 'info@smartstarttutoring.com',
      link: 'mailto:info@smartstarttutoring.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Address',
      detail: '123 Education Lane',
      description: 'Learning City, ST 12345',
      link: '#',
    },
  ];

  const faqs = [
    {
      question: 'What subjects do you tutor?',
      answer: 'We offer comprehensive tutoring in Math, Science, English, Test Prep (SAT/ACT), Foreign Languages (Spanish, French), and Computer Science. We cover all grade levels from K-12 through college.',
    },
    {
      question: 'How much does tutoring cost?',
      answer: 'One-on-one sessions are $60-70/hour depending on subject. Small group sessions (2-3 students) are $40-45/hour per student. We also offer package deals: 5 sessions for $300, 10 sessions for $500, and 15 sessions for $800.',
    },
    {
      question: 'Do you offer online or in-person tutoring?',
      answer: 'We offer both! You can choose in-home tutoring, online tutoring via video call, or sessions at our learning center. We provide flexible options to fit your schedule and preferences.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We require 24 hours notice for cancellations. Sessions cancelled with less than 24 hours notice will be charged. We understand emergencies happen and handle each situation individually.',
    },
    {
      question: 'How do you match students with tutors?',
      answer: 'During your free consultation, we assess your student\'s needs, learning style, and goals. We then match them with a tutor who specializes in their subject area and has experience with their learning style.',
    },
    {
      question: 'Do you offer a free trial session?',
      answer: 'Yes! Your first session is absolutely free with no obligation. This allows you to experience our teaching approach and ensure it\'s the right fit for your student before committing.',
    },
  ];

  const reasons = [
    {
      icon: Calendar,
      title: 'Free Consultation',
      description: 'No-obligation assessment of your student\'s needs',
    },
    {
      icon: Users,
      title: 'Expert Tutors',
      description: 'Certified educators with proven results',
    },
    {
      icon: CheckCircle,
      title: 'Flexible Scheduling',
      description: 'Sessions that fit your busy lifestyle',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#5f0f40] via-[#7a1050] to-[#9a031e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-purple-100 leading-relaxed">
              Ready to get started? Contact us today for a free consultation and discover how
              we can help your student succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.link}
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5f0f40] to-[#9a031e] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 mb-1">{info.title}</p>
                      <p className="text-lg font-bold text-gray-900 mb-1">{info.detail}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">Fill out the form and we'll respond within 24 hours</p>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    We've received your message and will contact you within 24 hours to schedule
                    your free consultation.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-3 bg-gradient-to-r from-[#5f0f40] to-[#9a031e] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Parent/Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Student's Grade Level *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.gradeLevel}
                        onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent transition-all"
                        placeholder="e.g., 9th grade"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject of Interest *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="math">Mathematics</option>
                      <option value="science">Science (Biology, Chemistry, Physics)</option>
                      <option value="english">English & Writing</option>
                      <option value="testprep">Test Prep (SAT/ACT/AP)</option>
                      <option value="languages">Foreign Languages</option>
                      <option value="cs">Computer Science</option>
                      <option value="multiple">Multiple Subjects</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Contact Method *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={formData.contactMethod === 'email'}
                          onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                          className="w-4 h-4 text-[#5f0f40] focus:ring-[#5f0f40]"
                        />
                        <span className="text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="phone"
                          checked={formData.contactMethod === 'phone'}
                          onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                          className="w-4 h-4 text-[#5f0f40] focus:ring-[#5f0f40]"
                        />
                        <span className="text-gray-700">Phone</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="text"
                          checked={formData.contactMethod === 'text'}
                          onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                          className="w-4 h-4 text-[#5f0f40] focus:ring-[#5f0f40]"
                        />
                        <span className="text-gray-700">Text</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f0f40] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your student's needs, goals, or any questions you have..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                      <div className="text-red-600">⚠️</div>
                      <div>
                        <p className="text-red-800 font-semibold">Submission Failed</p>
                        <p className="text-red-600 text-sm">
                          Please try again or call us at (555) 123-4567
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-[#5f0f40] to-[#9a031e] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    By submitting, you agree to receive communication from Smart Start Tutoring
                  </p>
                </form>
              )}
            </div>

            {/* Right Column - Info */}
            <div className="space-y-8">
              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-[#5f0f40] to-[#9a031e] rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageCircle className="h-8 w-8 text-[#fb8b24]" />
                  <h3 className="text-2xl font-bold">Why Contact Us?</h3>
                </div>

                <div className="space-y-4">
                  {reasons.map((reason, index) => {
                    const Icon = reason.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-white mb-1">{reason.title}</p>
                          <p className="text-purple-200 text-sm">{reason.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-purple-100 text-sm mb-4">
                    ✓ First session absolutely free<br />
                    ✓ No credit card required<br />
                    ✓ No long-term commitment<br />
                    ✓ Response within 24 hours
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="h-7 w-7 text-[#5f0f40]" />
                  <h3 className="text-2xl font-bold text-gray-900">Office Hours</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Monday - Friday</span>
                    <span className="text-gray-900 font-semibold">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Saturday</span>
                    <span className="text-gray-900 font-semibold">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Sunday</span>
                    <span className="text-gray-900 font-semibold">12:00 PM - 5:00 PM</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Tutoring sessions available outside office hours by appointment.
                  </p>
                </div>
              </div>

              {/* Quick Action */}
              <div className="bg-gradient-to-br from-[#fb8b24] to-orange-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-white/90 mb-6">
                  Call us now to speak with an education specialist and get your questions answered immediately.
                </p>
                <a
                  href="tel:555-123-4567"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#fb8b24] rounded-xl font-bold hover:shadow-xl transition-all duration-200 w-full justify-center"
                >
                  <Phone className="h-5 w-5" />
                  <span>(555) 123-4567</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <summary className="font-bold text-gray-900 cursor-pointer flex items-center justify-between text-lg">
                  <span>{faq.question}</span>
                  <ArrowRight className="h-5 w-5 text-[#5f0f40] transform group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl p-8 border border-gray-200">
            <p className="text-lg text-gray-700 mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="tel:555-123-4567"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#5f0f40] to-[#9a031e] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                <Phone className="h-5 w-5" />
                <span>Call Us</span>
              </a>
              <a
                href="mailto:info@smartstarttutoring.com"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-[#5f0f40] border-2 border-[#5f0f40] rounded-lg font-semibold hover:bg-[#5f0f40] hover:text-white transition-all duration-200"
              >
                <Mail className="h-5 w-5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
