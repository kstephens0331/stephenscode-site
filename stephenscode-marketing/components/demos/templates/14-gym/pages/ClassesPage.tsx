'use client';

import { Zap, Heart, Bike, Box, Dumbbell, TrendingUp, Users2, Flame, Clock, Award } from 'lucide-react';
import Link from 'next/link';

interface ClassesPageProps {
  basePath: string;
}

export default function ClassesPage({ basePath }: ClassesPageProps) {
  const classes = [
    {
      name: 'CrossFit',
      icon: Dumbbell,
      description: 'High-intensity functional movements for total body conditioning',
      duration: '60 min',
      intensity: 'High',
      level: 'All Levels',
      color: 'from-[#c1121f] to-[#780000]',
      benefits: ['Strength', 'Endurance', 'Power'],
    },
    {
      name: 'HIIT',
      icon: Zap,
      description: 'Explosive intervals that torch calories and boost metabolism',
      duration: '45 min',
      intensity: 'High',
      level: 'Intermediate',
      color: 'from-orange-600 to-red-700',
      benefits: ['Fat Loss', 'Cardio', 'Agility'],
    },
    {
      name: 'Yoga',
      icon: Heart,
      description: 'Build flexibility, balance, and mental clarity',
      duration: '60 min',
      intensity: 'Low',
      level: 'All Levels',
      color: 'from-emerald-600 to-teal-700',
      benefits: ['Flexibility', 'Balance', 'Mindfulness'],
    },
    {
      name: 'Spin',
      icon: Bike,
      description: 'Indoor cycling that builds endurance and burns serious calories',
      duration: '50 min',
      intensity: 'High',
      level: 'All Levels',
      color: 'from-blue-600 to-indigo-700',
      benefits: ['Cardio', 'Endurance', 'Lower Body'],
    },
    {
      name: 'Boxing',
      icon: Box,
      description: 'Combat-inspired training for power, speed, and confidence',
      duration: '55 min',
      intensity: 'High',
      level: 'All Levels',
      color: 'from-amber-600 to-orange-700',
      benefits: ['Power', 'Cardio', 'Coordination'],
    },
    {
      name: 'Strength Training',
      icon: TrendingUp,
      description: 'Progressive resistance training to build muscle and strength',
      duration: '60 min',
      intensity: 'Medium',
      level: 'Intermediate',
      color: 'from-purple-600 to-pink-700',
      benefits: ['Muscle', 'Strength', 'Bone Health'],
    },
    {
      name: 'Bootcamp',
      icon: Flame,
      description: 'Military-style training that pushes your limits',
      duration: '50 min',
      intensity: 'High',
      level: 'Intermediate',
      color: 'from-red-600 to-rose-700',
      benefits: ['Full Body', 'Stamina', 'Mental Toughness'],
    },
    {
      name: 'Pilates',
      icon: Users2,
      description: 'Core-focused movements for strength, stability, and posture',
      duration: '55 min',
      intensity: 'Low-Medium',
      level: 'All Levels',
      color: 'from-cyan-600 to-blue-700',
      benefits: ['Core', 'Posture', 'Flexibility'],
    },
  ];

  const classCategories = [
    { name: 'Cardio', count: 25, icon: Zap },
    { name: 'Strength', count: 30, icon: Dumbbell },
    { name: 'Mind-Body', count: 15, icon: Heart },
    { name: 'Group Training', count: 20, icon: Users2 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#780000]/20 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[#c1121f]/10 border border-[#c1121f]/20 rounded-full px-4 py-2 mb-6">
              <Users2 className="h-4 w-4 text-[#c1121f]" />
              <span className="text-sm font-medium text-[#c1121f]">100+ Weekly Classes</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-zinc-50 mb-6">
              Fitness Classes &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                Group Training
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8">
              From high-intensity workouts to mindful movement, we offer diverse classes
              led by expert instructors to keep you motivated and challenged.
            </p>

            <Link
              href={`${basePath}/schedule`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all hover:scale-105"
            >
              View Full Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Class Categories */}
      <section className="py-12 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {classCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:border-[#c1121f]/50 transition-all">
                  <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-[#fdf0d5]" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-50 mb-1">{category.name}</h3>
                  <p className="text-sm text-zinc-400">{category.count} classes/week</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-zinc-50 mb-4">Our Class Offerings</h2>
            <p className="text-xl text-zinc-400">Find your perfect workout</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((classItem, index) => {
              const Icon = classItem.icon;
              return (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#c1121f]/50 transition-all group">
                  {/* Header */}
                  <div className={`bg-gradient-to-br ${classItem.color} p-6`}>
                    <Icon className="h-10 w-10 text-white mb-3" strokeWidth={2} />
                    <h3 className="text-2xl font-black text-white mb-1">{classItem.name}</h3>
                    <div className="flex items-center space-x-2 text-white/90 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{classItem.duration}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
                      {classItem.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">Intensity</span>
                        <span className={`font-semibold ${
                          classItem.intensity === 'High' ? 'text-[#c1121f]' :
                          classItem.intensity === 'Medium' ? 'text-orange-400' :
                          'text-emerald-400'
                        }`}>{classItem.intensity}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">Level</span>
                        <span className="font-semibold text-zinc-300">{classItem.level}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {classItem.benefits.map((benefit, idx) => (
                        <span key={idx} className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded text-xs font-medium">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6">
                    <Link
                      href={`${basePath}/schedule`}
                      className="block w-full py-3 bg-zinc-800 text-zinc-50 rounded-lg text-center font-semibold hover:bg-[#c1121f] transition-colors"
                    >
                      Book Class
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-zinc-50 mb-4">What to Expect</h2>
            <p className="text-xl text-zinc-400">Your first class experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Arrive Early',
                description: 'Come 10 minutes before class to meet your instructor and get familiar with the space.',
                icon: Clock,
              },
              {
                step: '02',
                title: 'Personalized Guidance',
                description: 'Our instructors will help you modify exercises to match your fitness level.',
                icon: Award,
              },
              {
                step: '03',
                title: 'Community Support',
                description: 'Train alongside motivated members who encourage and inspire each other.',
                icon: Users2,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#c1121f] to-[#780000] rounded-full mb-4">
                    <span className="text-2xl font-black text-[#fdf0d5]">{item.step}</span>
                  </div>
                  <Icon className="h-8 w-8 text-[#c1121f] mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-zinc-50 mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-950 via-[#780000]/20 to-zinc-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-zinc-50 mb-6">
            Ready to Join a Class?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Try your first class FREE with no commitment required.
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
