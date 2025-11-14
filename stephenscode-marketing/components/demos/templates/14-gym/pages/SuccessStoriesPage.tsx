'use client';

import { TrendingDown, TrendingUp, Award, Target, Calendar, Quote } from 'lucide-react';
import Link from 'next/link';

interface SuccessStoriesPageProps {
  basePath: string;
}

export default function SuccessStoriesPage({ basePath }: SuccessStoriesPageProps) {
  const transformations = [
    {
      name: 'Michael Rodriguez',
      age: 34,
      timeframe: '6 months',
      weightLost: 52,
      program: 'HIIT & Strength Training',
      story: 'After years of struggling with weight and low energy, I joined Iron Temple and committed to the HIIT program. The trainers created a personalized plan that fit my busy schedule. Not only did I lose 52 pounds, but I gained incredible strength and confidence. I can now keep up with my kids and feel better than I did in my 20s!',
      stats: [
        { label: 'Weight Lost', value: '52 lbs', icon: TrendingDown },
        { label: 'Body Fat', value: '-15%', icon: TrendingDown },
        { label: 'Muscle Gained', value: '12 lbs', icon: TrendingUp },
      ],
    },
    {
      name: 'Jessica Thompson',
      age: 29,
      timeframe: '9 months',
      weightLost: 38,
      program: 'Personal Training & Yoga',
      story: 'I was preparing for my wedding and wanted to feel my absolute best. My trainer Sarah designed a program combining strength training with yoga for flexibility. The results exceeded my expectations! I lost 38 pounds, gained definition I never thought possible, and felt amazing on my wedding day. Best investment I ever made!',
      stats: [
        { label: 'Weight Lost', value: '38 lbs', icon: TrendingDown },
        { label: 'Dress Sizes', value: '-3', icon: TrendingDown },
        { label: 'Energy Levels', value: '+200%', icon: TrendingUp },
      ],
    },
    {
      name: 'David Chen',
      age: 42,
      timeframe: '12 months',
      weightLost: 65,
      program: 'CrossFit & Nutrition Coaching',
      story: 'At 42, I thought my best years were behind me. I was overweight, pre-diabetic, and constantly tired. Iron Temple\'s comprehensive approach changed everything. The CrossFit classes pushed me beyond my limits, and the nutrition coaching taught me how to fuel my body properly. I\'m now in the best shape of my life and completely reversed my pre-diabetes!',
      stats: [
        { label: 'Weight Lost', value: '65 lbs', icon: TrendingDown },
        { label: 'A1C Levels', value: 'Normalized', icon: Award },
        { label: 'CrossFit PRs', value: '15+', icon: TrendingUp },
      ],
    },
    {
      name: 'Sarah Williams',
      age: 26,
      timeframe: '8 months',
      weightLost: 30,
      program: 'Bootcamp & Boxing',
      story: 'I wanted to get stronger and more athletic, not just skinnier. The bootcamp and boxing classes at Iron Temple delivered exactly that. I lost 30 pounds of fat while building serious muscle and learning self-defense. The community here is incredible—everyone supports and motivates each other. I\'ve never felt more powerful and confident!',
      stats: [
        { label: 'Fat Lost', value: '30 lbs', icon: TrendingDown },
        { label: 'Lean Muscle', value: '+8 lbs', icon: TrendingUp },
        { label: 'Boxing Belts', value: '2 Earned', icon: Award },
      ],
    },
    {
      name: 'Robert Martinez',
      age: 51,
      timeframe: '10 months',
      weightLost: 45,
      program: 'Personal Training & Strength',
      story: 'After a health scare at 50, my doctor recommended I get serious about fitness. I was intimidated at first, but the trainers at Iron Temple made me feel welcome and created a safe, effective program for my age and fitness level. Ten months later, I\'m 45 pounds lighter, stronger than I\'ve been in decades, and my doctor is amazed at my transformation!',
      stats: [
        { label: 'Weight Lost', value: '45 lbs', icon: TrendingDown },
        { label: 'Blood Pressure', value: 'Improved', icon: Award },
        { label: 'Strength Gains', value: '+85%', icon: TrendingUp },
      ],
    },
    {
      name: 'Amanda Foster',
      age: 35,
      timeframe: '7 months',
      weightLost: 42,
      program: 'HIIT & Pilates',
      story: 'As a busy mom of three, I thought I didn\'t have time for myself. Iron Temple\'s flexible schedule and efficient HIIT classes proved me wrong. In just 7 months, I lost 42 pounds and rediscovered my confidence. The Pilates classes helped me strengthen my core after pregnancies. I\'m now a role model for my kids, showing them the importance of health and self-care!',
      stats: [
        { label: 'Weight Lost', value: '42 lbs', icon: TrendingDown },
        { label: 'Core Strength', value: '+120%', icon: TrendingUp },
        { label: 'Energy', value: 'Through the roof', icon: Award },
      ],
    },
  ];

  const testimonials = [
    {
      quote: 'Iron Temple didn\'t just change my body—it changed my entire life. I wake up energized, I\'m more productive at work, and I\'m setting an example for my family.',
      author: 'Tom Richardson',
      result: 'Lost 55 lbs',
    },
    {
      quote: 'The trainers here genuinely care about your success. They celebrate every victory with you and push you when you need it most.',
      author: 'Lisa Chang',
      result: 'Lost 35 lbs',
    },
    {
      quote: 'I\'ve tried every gym in town. Iron Temple is different—the community, the equipment, the programs. Everything is designed to help you succeed.',
      author: 'Marcus Johnson',
      result: 'Lost 48 lbs',
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
              <Award className="h-4 w-4 text-[#c1121f]" />
              <span className="text-sm font-medium text-[#c1121f]">Real Results, Real People</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-zinc-50 mb-6">
              Success Stories &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                Transformations
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8">
              Meet our members who have achieved incredible transformations through dedication,
              expert guidance, and the Iron Temple community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-gradient-to-r from-[#c1121f] to-[#780000]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '5,000+', label: 'Lives Transformed' },
              { number: '150,000+', label: 'Pounds Lost' },
              { number: '98%', label: 'Success Rate' },
              { number: '4.9/5', label: 'Average Rating' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl sm:text-5xl font-black text-[#fdf0d5] mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Stories */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-zinc-50 mb-4">Incredible Transformations</h2>
            <p className="text-xl text-zinc-400">These members prove that anything is possible with the right support</p>
          </div>

          <div className="space-y-12">
            {transformations.map((story, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#c1121f]/50 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Before/After Images Placeholder */}
                  <div className="bg-gradient-to-br from-[#c1121f]/20 to-[#780000]/20 p-8 lg:p-12 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-[#c1121f] to-[#780000] rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Award className="h-16 w-16 text-[#fdf0d5]" />
                      </div>
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5] mb-2">
                        -{story.weightLost}
                      </div>
                      <div className="text-zinc-400 font-semibold">pounds lost</div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="lg:col-span-2 p-8 lg:p-12">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-black text-zinc-50 mb-2">{story.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-zinc-400">
                          <span>Age {story.age}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {story.timeframe}
                          </div>
                          <span>•</span>
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-1" />
                            {story.program}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Quote className="h-8 w-8 text-[#c1121f]/30 mb-4" />
                    <p className="text-zinc-300 leading-relaxed mb-6 text-lg">
                      {story.story}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800">
                      {story.stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                          <div key={idx} className="text-center">
                            <Icon className="h-5 w-5 text-[#c1121f] mx-auto mb-2" />
                            <div className="text-2xl font-black text-zinc-50 mb-1">{stat.value}</div>
                            <div className="text-xs text-zinc-500">{stat.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Testimonials */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-zinc-50 mb-4">What Our Members Say</h2>
            <p className="text-xl text-zinc-400">Join thousands of satisfied members</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-xl p-8">
                <Quote className="h-10 w-10 text-[#c1121f]/30 mb-4" />
                <p className="text-zinc-300 leading-relaxed mb-6">"{testimonial.quote}"</p>
                <div className="pt-4 border-t border-zinc-800">
                  <div className="font-bold text-zinc-50 mb-1">{testimonial.author}</div>
                  <div className="text-sm text-[#c1121f] font-semibold">{testimonial.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Goals */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-zinc-50 mb-4">Common Success Stories</h2>
            <p className="text-xl text-zinc-400">Whatever your goal, we've helped members achieve it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { goal: 'Weight Loss', members: '2,500+', avg: '35 lbs lost' },
              { goal: 'Muscle Building', members: '1,800+', avg: '15 lbs gained' },
              { goal: 'Marathon Training', members: '500+', avg: '4 races/year' },
              { goal: 'Injury Recovery', members: '800+', avg: '90% recovered' },
              { goal: 'Senior Fitness', members: '600+', avg: '60% stronger' },
              { goal: 'Youth Athletics', members: '400+', avg: '3x performance' },
            ].map((item, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:border-[#c1121f]/50 transition-all">
                <h3 className="text-xl font-bold text-zinc-50 mb-3">{item.goal}</h3>
                <div className="text-3xl font-black text-[#c1121f] mb-2">{item.members}</div>
                <div className="text-sm text-zinc-400">members transformed</div>
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <div className="text-sm text-zinc-500">Average Result</div>
                  <div className="font-bold text-zinc-300">{item.avg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-900 via-[#780000]/20 to-zinc-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-zinc-50 mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join Iron Temple today and become our next transformation success story!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${basePath}/join`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all hover:scale-105"
            >
              Start Your Journey
            </Link>
            <Link
              href={`${basePath}/training`}
              className="inline-flex items-center justify-center px-8 py-4 bg-zinc-800 text-zinc-50 rounded-lg font-bold text-lg hover:bg-zinc-700 transition-colors"
            >
              Personal Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
