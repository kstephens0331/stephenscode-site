'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomSolutionsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    timeline: '',
    budget: '',
    description: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xwpklgpl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Custom Solutions Quote Request from ${formData.name}`,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          timeline: '',
          budget: '',
          description: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Get Your Free Quote
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Tell us about your project and we'll provide a detailed flat-rate quote within 24 hours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-3xl p-8 md:p-12 border border-slate-600/50"
        >
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Request Received!</h3>
              <p className="text-lg text-slate-300 mb-8">
                Thank you for your interest. We'll review your project details and send you a detailed quote within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone and Company */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-slate-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="Your Company LLC"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-sm font-semibold text-slate-300 mb-2">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                >
                  <option value="">Select a project type...</option>
                  <option value="SaaS Platform">SaaS Platform</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Data Scraper">Data Scraper / Automation</option>
                  <option value="Business Tool">Business Tool</option>
                  <option value="Progressive Web App">Progressive Web App</option>
                  <option value="API Development">API Development</option>
                  <option value="Other">Other / Not Sure</option>
                </select>
              </div>

              {/* Timeline and Budget */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="timeline" className="block text-sm font-semibold text-slate-300 mb-2">
                    Desired Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  >
                    <option value="">Select timeline...</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="3+ months">3+ months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-slate-300 mb-2">
                    Estimated Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  >
                    <option value="">Select budget range...</option>
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                    <option value="Not sure">Not sure yet</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                  placeholder="Tell us about your project. What problem are you trying to solve? What features do you need? The more detail you provide, the more accurate our quote will be."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Free Quote
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </motion.button>

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again or email us directly at contact@stephenscode.dev
                  </p>
                </div>
              )}

              <p className="text-slate-400 text-sm text-center">
                We'll respond within 24 hours with a detailed quote. No obligation, no pressure.
              </p>
            </form>
          )}
        </motion.div>

        {/* Pricing reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl"
        >
          <p className="text-sm text-slate-400 leading-relaxed text-center">
            <strong className="text-slate-300">Pricing Transparency:</strong> Our quotes are based on an hourly rate of $50/hour, but you'll receive a flat-rate price for your entire project. Once approved, that's your final cost—no hourly billing, no surprise charges, no matter how long it takes us to complete.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
