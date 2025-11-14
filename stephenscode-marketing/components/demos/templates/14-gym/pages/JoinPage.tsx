'use client';

import { CheckCircle2, Shield, Clock, Gift, User, Mail, Phone, CreditCard, Calendar } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface JoinPageProps {
  basePath: string;
}

export default function JoinPage({ basePath }: JoinPageProps) {
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  const plans = [
    {
      name: 'Basic',
      price: 39,
      period: 'month',
      features: ['Gym floor access', 'Cardio & weights', 'Standard hours (6am-10pm)', 'Locker room access'],
    },
    {
      name: 'Premium',
      price: 69,
      period: 'month',
      popular: true,
      features: ['Everything in Basic', 'Unlimited classes', '24/7 access', 'Guest privileges', 'Sauna & steam room'],
    },
    {
      name: 'Elite',
      price: 99,
      period: 'month',
      features: ['Everything in Premium', 'Personal training discount', 'Nutrition consultation', 'Massage therapy', 'Free gear'],
    },
  ];

  const benefits = [
    {
      icon: Gift,
      title: '7-Day Free Trial',
      description: 'Test drive our facilities with no commitment',
    },
    {
      icon: Clock,
      title: 'No Contracts',
      description: 'Month-to-month membership, cancel anytime',
    },
    {
      icon: Shield,
      title: 'Money-Back Guarantee',
      description: '30-day satisfaction guarantee',
    },
    {
      icon: CheckCircle2,
      title: 'Instant Access',
      description: 'Start working out immediately after signup',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#780000]/20 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[#c1121f]/10 border border-[#c1121f]/20 rounded-full px-4 py-2 mb-6">
              <Gift className="h-4 w-4 text-[#c1121f]" />
              <span className="text-sm font-medium text-[#c1121f]">7 Days Free - No Credit Card Required</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-zinc-50 mb-6">
              Join Iron Temple &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                Start Today
              </span>
            </h1>

            <p className="text-xl text-zinc-400">
              Begin your transformation with 7 days FREE. No commitment, no credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-12 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] p-2 rounded-lg flex-shrink-0">
                    <Icon className="h-5 w-5 text-[#fdf0d5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-50 text-sm mb-1">{benefit.title}</h3>
                    <p className="text-xs text-zinc-400">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h2 className="text-3xl font-black text-zinc-50 mb-8">Complete Your Registration</h2>

                <form className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-bold text-zinc-50 mb-4 flex items-center">
                      <User className="h-5 w-5 text-[#c1121f] mr-2" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#c1121f]"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#c1121f]"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-zinc-50 mb-4 flex items-center">
                      <Mail className="h-5 w-5 text-[#c1121f] mr-2" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#c1121f]"
                          placeholder="john.doe@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#c1121f]"
                          placeholder="(555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plan Selection */}
                  <div>
                    <h3 className="text-lg font-bold text-zinc-50 mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 text-[#c1121f] mr-2" />
                      Select Your Plan
                    </h3>
                    <div className="space-y-3">
                      {plans.map((plan, index) => (
                        <label
                          key={index}
                          className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedPlan === plan.name
                              ? 'border-[#c1121f] bg-[#c1121f]/5'
                              : 'border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <input
                                type="radio"
                                name="plan"
                                value={plan.name}
                                checked={selectedPlan === plan.name}
                                onChange={(e) => setSelectedPlan(e.target.value)}
                                className="w-4 h-4 text-[#c1121f]"
                              />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-zinc-50">{plan.name}</span>
                                  {plan.popular && (
                                    <span className="px-2 py-0.5 bg-[#c1121f] text-zinc-50 rounded text-xs font-bold">
                                      POPULAR
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-zinc-400 mt-1">
                                  {plan.features.slice(0, 2).join(' • ')}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black text-zinc-50">${plan.price}</div>
                              <div className="text-xs text-zinc-500">per month</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <h3 className="text-lg font-bold text-zinc-50 mb-4 flex items-center">
                      <Phone className="h-5 w-5 text-[#c1121f] mr-2" />
                      Emergency Contact (Optional)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#c1121f]"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#c1121f]"
                          placeholder="(555) 987-6543"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="pt-6 border-t border-zinc-800">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-[#c1121f] rounded"
                        required
                      />
                      <span className="text-sm text-zinc-400">
                        I agree to the{' '}
                        <a href="#" className="text-[#c1121f] hover:underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-[#c1121f] hover:underline">
                          Privacy Policy
                        </a>
                        . I understand that I can cancel anytime during the free trial without charge.
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all hover:scale-105"
                  >
                    Start Your 7-Day Free Trial
                  </button>

                  <p className="text-center text-sm text-zinc-500">
                    No credit card required. Full access to all facilities during trial.
                  </p>
                </form>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-black text-zinc-50 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-zinc-50">{selectedPlan} Membership</div>
                      <div className="text-sm text-zinc-400">Monthly subscription</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-zinc-50">
                        ${plans.find(p => p.name === selectedPlan)?.price}
                      </div>
                      <div className="text-xs text-zinc-500">/month</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">First 7 days</span>
                      <span className="font-semibold text-[#c1121f]">FREE</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-zinc-400">After trial</span>
                      <span className="text-zinc-300">
                        ${plans.find(p => p.name === selectedPlan)?.price}/mo
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-50">Due Today</span>
                      <span className="text-2xl font-black text-[#c1121f]">$0</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3 mb-3">
                    <Calendar className="h-5 w-5 text-[#c1121f] flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-zinc-400">
                      Your trial starts today and ends in 7 days. Cancel anytime before then at no charge.
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-zinc-50 text-sm mb-3">What's Included:</h4>
                  {plans.find(p => p.name === selectedPlan)?.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[#c1121f] flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-zinc-50 mb-12">Why Join Iron Temple?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '5,000+', label: 'Happy Members' },
              { number: '4.9/5', label: 'Average Rating' },
              { number: '15+', label: 'Years in Business' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5] mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-zinc-50 mb-4">Questions?</h2>
            <p className="text-zinc-400">Here are some common questions about joining</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What happens after my free trial?',
                a: 'After 7 days, your selected membership will automatically start. You can cancel anytime during the trial at no charge.',
              },
              {
                q: 'Can I change my plan later?',
                a: 'Absolutely! You can upgrade or downgrade your plan at any time from your account settings.',
              },
              {
                q: 'Is there a cancellation fee?',
                a: 'No cancellation fees ever. We operate on month-to-month memberships with no long-term contracts.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <h3 className="font-bold text-zinc-50 mb-2">{faq.q}</h3>
                <p className="text-zinc-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-zinc-400 mb-4">Still have questions?</p>
            <Link
              href={`${basePath}`}
              className="text-[#c1121f] font-semibold hover:underline"
            >
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
