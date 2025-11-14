'use client';

import { Check, X, Dumbbell, Users, Crown, Zap, Clock, MapPin, Gift } from 'lucide-react';
import Link from 'next/link';

interface MembershipPageProps {
  basePath: string;
}

export default function MembershipPage({ basePath }: MembershipPageProps) {
  const plans = [
    {
      name: 'Basic',
      price: 39,
      period: 'month',
      description: 'Perfect for getting started',
      icon: Dumbbell,
      color: 'from-zinc-700 to-zinc-800',
      features: [
        { name: 'Access to gym floor', included: true },
        { name: 'Cardio equipment', included: true },
        { name: 'Free weights & machines', included: true },
        { name: 'Locker room access', included: true },
        { name: 'Standard hours (6am-10pm)', included: true },
        { name: 'Group fitness classes', included: false },
        { name: '24/7 access', included: false },
        { name: 'Guest privileges', included: false },
        { name: 'Personal training discount', included: false },
      ],
    },
    {
      name: 'Premium',
      price: 69,
      period: 'month',
      description: 'Most popular choice',
      icon: Users,
      color: 'from-[#c1121f] to-[#780000]',
      popular: true,
      features: [
        { name: 'Everything in Basic', included: true },
        { name: 'Unlimited group classes', included: true },
        { name: '24/7 facility access', included: true },
        { name: 'Guest privileges (2/month)', included: true },
        { name: '10% personal training discount', included: true },
        { name: 'Sauna & steam room', included: true },
        { name: 'Nutrition consultation', included: false },
        { name: 'Massage therapy discount', included: false },
        { name: 'Free gear & swag', included: false },
      ],
    },
    {
      name: 'Elite',
      price: 99,
      period: 'month',
      description: 'Ultimate fitness experience',
      icon: Crown,
      color: 'from-amber-600 to-orange-700',
      features: [
        { name: 'Everything in Premium', included: true },
        { name: 'Unlimited guest privileges', included: true },
        { name: '20% personal training discount', included: true },
        { name: 'Monthly nutrition consultation', included: true },
        { name: 'Massage therapy (2 sessions/month)', included: true },
        { name: 'Free Iron Temple gear', included: true },
        { name: 'Priority class booking', included: true },
        { name: 'Towel service', included: true },
        { name: 'Supplement discounts', included: true },
      ],
    },
  ];

  const addOns = [
    {
      name: 'Personal Training',
      price: 'From $49/session',
      description: '1-on-1 coaching with certified trainers',
      icon: Dumbbell,
    },
    {
      name: 'Nutrition Coaching',
      price: '$99/month',
      description: 'Customized meal plans and guidance',
      icon: Zap,
    },
    {
      name: 'Massage Therapy',
      price: '$79/session',
      description: 'Sports massage for recovery',
      icon: Gift,
    },
  ];

  const faqs = [
    {
      question: 'Can I cancel my membership anytime?',
      answer: 'Yes! All memberships are month-to-month with no long-term contracts. Cancel anytime with 30 days notice.',
    },
    {
      question: 'Is there a signup fee?',
      answer: 'We occasionally waive the $49 signup fee during promotions. First-time members get 7 days free!',
    },
    {
      question: 'Can I freeze my membership?',
      answer: 'Yes, you can freeze your membership for up to 3 months per year for a small administrative fee.',
    },
    {
      question: 'Do you offer student or senior discounts?',
      answer: 'Yes! We offer 15% off for students with valid ID and seniors 65+.',
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
              <span className="text-sm font-medium text-[#c1121f]">7 Days Free Trial</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-zinc-50 mb-6">
              Choose Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                Membership Plan
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8">
              Flexible plans designed to fit your lifestyle and fitness goals.
              No long-term contracts, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div
                  key={index}
                  className={`relative bg-zinc-900 rounded-2xl border-2 ${
                    plan.popular ? 'border-[#c1121f] shadow-xl shadow-[#c1121f]/20' : 'border-zinc-800'
                  } overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#c1121f] to-[#780000] text-center py-2">
                      <span className="text-sm font-bold text-zinc-50">MOST POPULAR</span>
                    </div>
                  )}

                  <div className={`pt-${plan.popular ? '12' : '8'} pb-8 px-8`}>
                    {/* Header */}
                    <div className={`bg-gradient-to-br ${plan.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className="h-8 w-8 text-zinc-50" strokeWidth={2.5} />
                    </div>

                    <h3 className="text-2xl font-black text-zinc-50 mb-2">{plan.name}</h3>
                    <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>

                    <div className="mb-8">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-black text-zinc-50">${plan.price}</span>
                        <span className="text-zinc-500 ml-2">/{plan.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-[#c1121f] mr-3 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-zinc-600 mr-3 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href={`${basePath}/join`}
                      className={`block w-full py-4 rounded-lg font-bold text-center transition-all ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 hover:shadow-lg hover:shadow-[#c1121f]/30 hover:scale-105'
                          : 'bg-zinc-800 text-zinc-50 hover:bg-zinc-700'
                      }`}
                    >
                      Start Free Trial
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-[#c1121f] mr-2" />
              No Contracts
            </div>
            <div className="flex items-center">
              <Gift className="h-5 w-5 text-[#c1121f] mr-2" />
              7-Day Free Trial
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-[#c1121f] mr-2" />
              Cancel Anytime
            </div>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-zinc-50 mb-4">Enhance Your Membership</h2>
            <p className="text-xl text-zinc-400">Optional add-ons to accelerate your results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-center hover:border-[#c1121f]/50 transition-all">
                  <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-[#fdf0d5]" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-50 mb-2">{addon.name}</h3>
                  <div className="text-[#c1121f] font-bold mb-3">{addon.price}</div>
                  <p className="text-zinc-400 text-sm">{addon.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-zinc-50 mb-4">Compare All Plans</h2>
            <p className="text-xl text-zinc-400">See what's included in each membership</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-zinc-900 border border-zinc-800 rounded-xl">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-6 text-zinc-50 font-bold">Features</th>
                  <th className="text-center py-4 px-6 text-zinc-50 font-bold">Basic</th>
                  <th className="text-center py-4 px-6 bg-[#c1121f]/10">
                    <div className="text-zinc-50 font-bold">Premium</div>
                    <div className="text-[#c1121f] text-xs font-semibold">POPULAR</div>
                  </th>
                  <th className="text-center py-4 px-6 text-zinc-50 font-bold">Elite</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  'Gym floor access',
                  'Cardio equipment',
                  'Free weights & machines',
                  'Group fitness classes',
                  '24/7 access',
                  'Guest privileges',
                  'Personal training discount',
                  'Sauna & steam room',
                  'Nutrition consultation',
                  'Massage therapy',
                ].map((feature, index) => (
                  <tr key={index} className="border-b border-zinc-800 last:border-0">
                    <td className="py-4 px-6 text-zinc-300">{feature}</td>
                    <td className="py-4 px-6 text-center">
                      {index < 5 ? (
                        <Check className="h-5 w-5 text-[#c1121f] mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-zinc-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-[#c1121f]/5">
                      {index < 8 ? (
                        <Check className="h-5 w-5 text-[#c1121f] mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-zinc-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-[#c1121f] mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-zinc-50 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-zinc-400">Everything you need to know</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-zinc-50 mb-3">{faq.question}</h3>
                <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-950 via-[#780000]/20 to-zinc-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-zinc-50 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join Iron Temple Fitness today and get 7 days completely FREE!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${basePath}/join`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              href={`${basePath}/schedule`}
              className="inline-flex items-center justify-center px-8 py-4 bg-zinc-800 text-zinc-50 rounded-lg font-bold text-lg hover:bg-zinc-700 transition-colors"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
