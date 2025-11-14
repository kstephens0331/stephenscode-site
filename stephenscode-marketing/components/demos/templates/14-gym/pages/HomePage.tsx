'use client';

import { Dumbbell, Users, Trophy, Clock, TrendingUp, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface HomePageProps {
  basePath: string;
}

export default function HomePage({ basePath }: HomePageProps) {
  const features = [
    {
      icon: Dumbbell,
      title: 'State-of-the-Art Equipment',
      description: 'Latest fitness technology and premium equipment for optimal results',
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      description: 'Certified professionals dedicated to your fitness journey',
    },
    {
      icon: Trophy,
      title: 'Proven Results',
      description: 'Join thousands who have transformed their lives with us',
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Open early morning to late night, 7 days a week',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Active Members' },
    { number: '50+', label: 'Expert Trainers' },
    { number: '100+', label: 'Classes Weekly' },
    { number: '15+', label: 'Years Experience' },
  ];

  const testimonials = [
    {
      name: 'Mike Johnson',
      role: 'Member since 2022',
      content: 'Iron Temple changed my life. Lost 50 lbs and gained incredible strength. The trainers are phenomenal!',
      rating: 5,
    },
    {
      name: 'Sarah Williams',
      role: 'Member since 2023',
      content: 'Best gym I\'ve ever joined. Amazing community, top-notch equipment, and results that speak for themselves.',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Member since 2021',
      content: 'From complete beginner to competing in CrossFit. The support here is unmatched. Highly recommend!',
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#780000]/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-[#c1121f]/10 border border-[#c1121f]/20 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="h-4 w-4 text-[#c1121f]" />
                <span className="text-sm font-medium text-[#c1121f]">Transform Your Body & Mind</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-50 mb-6 leading-tight">
                FORGE YOUR
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                  STRONGEST SELF
                </span>
              </h1>

              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Join Iron Temple Fitness and experience world-class training, premium equipment,
                and a community that pushes you to achieve greatness every single day.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`${basePath}/join`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href={`${basePath}/classes`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-zinc-800 text-zinc-50 rounded-lg font-bold text-lg hover:bg-zinc-700 transition-colors"
                >
                  View Classes
                </Link>
              </div>

              <div className="mt-8 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c1121f] to-[#780000] border-2 border-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-50">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-zinc-50">5,000+ Active Members</div>
                  <div className="text-zinc-400">Join the Iron Temple community</div>
                </div>
              </div>
            </div>

            <div className="relative lg:ml-8">
              <div className="relative bg-gradient-to-br from-[#c1121f]/20 to-[#780000]/20 rounded-2xl p-8 border border-[#c1121f]/30 backdrop-blur-sm">
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                        <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] p-3 rounded-lg flex-shrink-0">
                          <Icon className="h-6 w-6 text-[#fdf0d5]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-zinc-50 mb-1">{feature.title}</h3>
                          <p className="text-sm text-zinc-400">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#c1121f] to-[#780000] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-[#fdf0d5] mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-zinc-50 mb-4">
              Why Iron Temple Fitness?
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              We're not just a gym—we're a community dedicated to your transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Equipment',
                description: 'Latest cardio machines, free weights, and specialized training equipment',
                icon: Dumbbell,
              },
              {
                title: 'Expert Coaching',
                description: 'Certified trainers with decades of combined experience',
                icon: Users,
              },
              {
                title: 'Diverse Classes',
                description: '100+ weekly classes from CrossFit to Yoga',
                icon: Trophy,
              },
              {
                title: '24/7 Access',
                description: 'Train on your schedule with round-the-clock facility access',
                icon: Clock,
              },
              {
                title: 'Results-Driven',
                description: 'Proven programs designed to help you achieve your goals',
                icon: TrendingUp,
              },
              {
                title: 'Community Support',
                description: 'Join a motivated community that celebrates your wins',
                icon: Star,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-[#c1121f]/50 transition-all hover:shadow-lg hover:shadow-[#c1121f]/10">
                  <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[#fdf0d5]" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-50 mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-zinc-50 mb-4">
              Member Success Stories
            </h2>
            <p className="text-xl text-zinc-400">
              Hear from our members who've achieved incredible transformations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#c1121f] fill-current" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-zinc-50">{testimonial.name}</div>
                  <div className="text-sm text-zinc-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-zinc-900 via-[#780000]/20 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-zinc-50 mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Get 7 days FREE when you join today. No contracts, no hidden fees.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href={`${basePath}/join`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all hover:scale-105"
            >
              Claim Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href={`${basePath}/schedule`}
              className="inline-flex items-center justify-center px-8 py-4 bg-zinc-800 text-zinc-50 rounded-lg font-bold text-lg hover:bg-zinc-700 transition-colors"
            >
              View Schedule
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-[#c1121f] mr-2" />
              No Credit Card Required
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-[#c1121f] mr-2" />
              Cancel Anytime
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-[#c1121f] mr-2" />
              Full Facility Access
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
