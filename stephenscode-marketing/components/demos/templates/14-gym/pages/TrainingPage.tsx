'use client';

import { User, Target, TrendingUp, Calendar, Award, CheckCircle2, Star, Zap, X, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TrainingPageProps {
  basePath: string;
}

const SESSIONS_KEY = 'iron-temple-pt-sessions';

const sessionSlots = [
  'Monday 7:00 AM',
  'Monday 5:30 PM',
  'Wednesday 6:00 AM',
  'Wednesday 12:00 PM',
  'Friday 8:00 AM',
  'Saturday 10:00 AM',
];

export default function TrainingPage({ basePath }: TrainingPageProps) {
  const [bookedSessions, setBookedSessions] = useState<Record<string, string>>({});
  const [sessionTrainer, setSessionTrainer] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [sessionConfirmed, setSessionConfirmed] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SESSIONS_KEY);
      if (saved) setBookedSessions(JSON.parse(saved));
    } catch {
      // Ignore unreadable storage -- demo starts with no sessions
    }
  }, []);

  const saveSessions = (next: Record<string, string>) => {
    setBookedSessions(next);
    try {
      window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable -- sessions still work for this session
    }
  };

  const openSessionModal = (trainerName: string) => {
    setSessionTrainer(trainerName);
    setSelectedSlot(bookedSessions[trainerName] || null);
    setSessionConfirmed(false);
  };

  const confirmSession = () => {
    if (!sessionTrainer || !selectedSlot) return;
    saveSessions({ ...bookedSessions, [sessionTrainer]: selectedSlot });
    setSessionConfirmed(true);
  };

  const cancelSession = () => {
    if (!sessionTrainer) return;
    const next = { ...bookedSessions };
    delete next[sessionTrainer];
    saveSessions(next);
    setSessionTrainer(null);
    setSessionConfirmed(false);
  };

  const closeSessionModal = () => {
    setSessionTrainer(null);
    setSelectedSlot(null);
    setSessionConfirmed(false);
  };
  const trainers = [
    {
      name: 'Marcus Steel',
      specialty: 'Strength & Powerlifting',
      experience: '12 years',
      certifications: ['NSCA-CPT', 'CSCS', 'USA Powerlifting'],
      bio: 'Former competitive powerlifter specializing in strength development and athletic performance.',
      rating: 5.0,
      clients: 150,
    },
    {
      name: 'Sarah Chen',
      specialty: 'HIIT & Weight Loss',
      experience: '8 years',
      certifications: ['ACE-CPT', 'Precision Nutrition', 'NASM-PES'],
      bio: 'Expert in high-intensity training and body transformation with proven results.',
      rating: 5.0,
      clients: 200,
    },
    {
      name: 'Jake Morrison',
      specialty: 'CrossFit & Functional',
      experience: '10 years',
      certifications: ['CrossFit Level 3', 'FMS', 'USAW-L1'],
      bio: 'CrossFit coach focused on functional movements and athletic conditioning.',
      rating: 4.9,
      clients: 175,
    },
    {
      name: 'Emily Rodriguez',
      specialty: 'Yoga & Mobility',
      experience: '9 years',
      certifications: ['RYT-500', 'FRC', 'Mobility Specialist'],
      bio: 'Integrating mindful movement with strength training for holistic fitness.',
      rating: 5.0,
      clients: 130,
    },
  ];

  const programs = [
    {
      title: 'Strength & Muscle Building',
      description: 'Progressive resistance training designed to build lean muscle mass and increase strength.',
      sessions: '3-4x per week',
      duration: '12 weeks',
      icon: TrendingUp,
    },
    {
      title: 'Weight Loss & Conditioning',
      description: 'Combine cardio and strength training to maximize fat loss while maintaining muscle.',
      sessions: '4-5x per week',
      duration: '16 weeks',
      icon: Zap,
    },
    {
      title: 'Athletic Performance',
      description: 'Sport-specific training to enhance speed, power, agility, and endurance.',
      sessions: '3-5x per week',
      duration: '12 weeks',
      icon: Award,
    },
    {
      title: 'Injury Recovery & Prevention',
      description: 'Specialized programs to rehabilitate injuries and prevent future issues.',
      sessions: '2-3x per week',
      duration: '8-12 weeks',
      icon: Target,
    },
  ];

  const benefits = [
    {
      title: 'Personalized Plans',
      description: 'Custom workout and nutrition programs tailored to your unique goals and lifestyle',
      icon: Target,
    },
    {
      title: 'Expert Guidance',
      description: 'One-on-one coaching from certified professionals with years of experience',
      icon: User,
    },
    {
      title: 'Accountability',
      description: 'Regular check-ins and progress tracking to keep you on track',
      icon: Calendar,
    },
    {
      title: 'Faster Results',
      description: 'Achieve your goals up to 3x faster with dedicated personal training',
      icon: TrendingUp,
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
              <span className="text-sm font-medium text-[#c1121f]">Elite Personal Training</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-50 mb-6">
              Personal Training &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                1-on-1 Coaching
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8">
              Work with certified trainers who create personalized programs to help you
              reach your goals faster with expert guidance every step of the way.
            </p>

            <Link
              href={`${basePath}/join`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-50 mb-4">Why Personal Training?</h2>
            <p className="text-xl text-zinc-400">Invest in yourself with dedicated coaching</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-[#fdf0d5]" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-50 mb-2">{benefit.title}</h3>
                  <p className="text-zinc-400">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-50 mb-4">Training Programs</h2>
            <p className="text-xl text-zinc-400">Specialized programs for your goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 hover:border-[#c1121f]/50 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] p-3 rounded-lg flex-shrink-0">
                      <Icon className="h-6 w-6 text-[#fdf0d5]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-zinc-50 mb-2">{program.title}</h3>
                      <p className="text-zinc-400 mb-4 leading-relaxed">{program.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-zinc-300">
                          <Calendar className="h-4 w-4 mr-2 text-[#c1121f]" />
                          {program.sessions}
                        </div>
                        <div className="flex items-center text-zinc-300">
                          <Target className="h-4 w-4 mr-2 text-[#c1121f]" />
                          {program.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Trainers */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-50 mb-4">Meet Our Expert Trainers</h2>
            <p className="text-xl text-zinc-400">Certified professionals dedicated to your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#c1121f]/50 transition-all group">
                {/* Avatar */}
                <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] h-48 flex items-center justify-center">
                  <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center border-4 border-[#fdf0d5]">
                    <User className="h-12 w-12 text-zinc-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-zinc-50">{trainer.name}</h3>
                    <div className="flex items-center text-[#c1121f]">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{trainer.rating}</span>
                    </div>
                  </div>

                  <div className="text-[#c1121f] font-semibold text-sm mb-3">{trainer.specialty}</div>

                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{trainer.bio}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-zinc-500">
                      <Award className="h-3 w-3 mr-2" />
                      {trainer.experience} experience
                    </div>
                    <div className="flex items-center text-xs text-zinc-500">
                      <Target className="h-3 w-3 mr-2" />
                      {trainer.clients}+ clients trained
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {trainer.certifications.map((cert, idx) => (
                      <span key={idx} className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openSessionModal(trainer.name)}
                    className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                      bookedSessions[trainer.name]
                        ? 'bg-zinc-800 text-[#fdf0d5] border border-[#c1121f]/50 hover:bg-zinc-700'
                        : 'bg-zinc-800 text-zinc-50 hover:bg-[#c1121f]'
                    }`}
                  >
                    {bookedSessions[trainer.name] ? (
                      <span className="flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Session Booked
                      </span>
                    ) : (
                      'Book Session'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-zinc-50 mb-4">What's Included</h2>
              <p className="text-xl text-zinc-400">Everything you need for success</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Initial fitness assessment & goal setting',
                'Customized workout programs',
                'Nutrition guidance & meal planning',
                'Form correction & technique coaching',
                'Progress tracking & measurements',
                'Weekly accountability check-ins',
                'Access to members-only resources',
                '24/7 trainer support via app',
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-[#c1121f] flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-50 mb-4">Training Packages</h2>
            <p className="text-xl text-zinc-400">Flexible options to fit your schedule</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                sessions: '4 sessions/month',
                price: '$199',
                features: [
                  'Weekly 1-on-1 training',
                  'Custom workout plan',
                  'Nutrition guidance',
                  'Progress tracking',
                ],
              },
              {
                name: 'Accelerator',
                sessions: '8 sessions/month',
                price: '$349',
                popular: true,
                features: [
                  'Bi-weekly 1-on-1 training',
                  'Advanced programming',
                  'Detailed meal plans',
                  'Priority scheduling',
                  'Body composition analysis',
                ],
              },
              {
                name: 'Elite',
                sessions: '12 sessions/month',
                price: '$479',
                features: [
                  '3x weekly 1-on-1 training',
                  'Premium programming',
                  'Full nutrition coaching',
                  'Supplement recommendations',
                  'Monthly assessments',
                  '24/7 trainer access',
                ],
              },
            ].map((plan, index) => (
              <div key={index} className={`bg-zinc-900 rounded-xl p-8 border-2 ${
                plan.popular ? 'border-[#c1121f]' : 'border-zinc-800'
              } relative`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-zinc-50 mb-2">{plan.name}</h3>
                  <div className="text-zinc-400 text-sm mb-4">{plan.sessions}</div>
                  <div className="text-5xl font-bold text-zinc-50 mb-1">{plan.price}</div>
                  <div className="text-zinc-500 text-sm">per month</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-zinc-300">
                      <CheckCircle2 className="h-5 w-5 text-[#c1121f] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`${basePath}/join`}
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 hover:shadow-lg hover:shadow-[#c1121f]/30'
                      : 'bg-zinc-800 text-zinc-50 hover:bg-zinc-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-900 via-[#780000]/20 to-zinc-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-zinc-50 mb-6">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Book a FREE consultation with one of our expert trainers today.
          </p>
          <Link
            href={`${basePath}/join`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>

      {/* Session Booking Modal */}
      {sessionTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" onClick={closeSessionModal}></div>
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-8">
            <button
              onClick={closeSessionModal}
              aria-label="Close session dialog"
              className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {sessionConfirmed ? (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c1121f]/10 rounded-full mb-4">
                  <CheckCircle2 className="h-8 w-8 text-[#c1121f]" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-50 mb-2">Session Booked!</h3>
                <p className="text-zinc-400 mb-6">
                  Your 1-on-1 session with {sessionTrainer} is set for {selectedSlot}. Arrive 10 minutes early to warm up.
                </p>
                <button
                  onClick={closeSessionModal}
                  className="w-full py-3 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold hover:shadow-lg hover:shadow-[#c1121f]/30 transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-zinc-50 mb-1">
                  {bookedSessions[sessionTrainer] ? 'Manage Your Session' : `Book with ${sessionTrainer}`}
                </h3>
                <p className="text-zinc-400 text-sm mb-6">
                  {bookedSessions[sessionTrainer]
                    ? `You have a session with ${sessionTrainer} on ${bookedSessions[sessionTrainer]}. Pick a new time or cancel below.`
                    : 'Choose an available time slot for your 1-on-1 training session.'}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {sessionSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`flex items-center justify-center px-3 py-3 rounded-lg text-sm font-medium border transition-all ${
                        selectedSlot === slot
                          ? 'bg-[#c1121f] border-[#c1121f] text-zinc-50'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-[#c1121f]/50'
                      }`}
                    >
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      {slot}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={confirmSession}
                    disabled={!selectedSlot}
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                      selectedSlot
                        ? 'bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 hover:shadow-lg hover:shadow-[#c1121f]/30'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {bookedSessions[sessionTrainer] ? 'Update Session' : 'Confirm Session'}
                  </button>
                  {bookedSessions[sessionTrainer] && (
                    <button
                      onClick={cancelSession}
                      className="w-full py-3 bg-zinc-800 text-zinc-50 rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
                    >
                      Cancel Session
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
