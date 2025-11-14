import React from 'react';
import { Award, Users, Target, Heart, TrendingUp, Star, CheckCircle, GraduationCap, BookOpen, Clock, Trophy, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'subjects' | 'about' | 'contact') => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const tutors = [
    {
      name: 'Sarah Martinez',
      role: 'Mathematics Specialist',
      image: '👩‍🏫',
      experience: '15 years',
      credentials: 'M.Ed. Mathematics Education',
      specialties: ['Algebra', 'Calculus', 'SAT/ACT Math', 'AP Statistics'],
      bio: 'Sarah has helped over 200 students improve their math grades and test scores. Her patient approach makes complex concepts accessible to all learners.',
      achievements: [
        'Former high school math teacher',
        'National Board Certified',
        'Perfect score SAT Math instructor',
      ],
      rating: 5,
    },
    {
      name: 'Dr. James Chen',
      role: 'Science Expert',
      image: '👨‍🔬',
      experience: '10 years',
      credentials: 'PhD in Biology',
      specialties: ['Biology', 'Chemistry', 'Physics', 'AP Sciences'],
      bio: 'Dr. Chen brings university-level expertise to high school science education. His research background makes him exceptional at teaching scientific thinking.',
      achievements: [
        'Published researcher',
        'AP Biology exam grader',
        '95% AP exam pass rate',
      ],
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'English & Writing Coach',
      image: '👩‍💼',
      experience: '12 years',
      credentials: 'M.A. English Literature',
      specialties: ['Writing', 'Literature', 'College Essays', 'AP English'],
      bio: 'Emily specializes in developing strong writers and critical thinkers. Her students consistently score high on standardized writing assessments.',
      achievements: [
        'Published author',
        'College essay specialist',
        'Former AP English teacher',
      ],
      rating: 5,
    },
    {
      name: 'Michael Thompson',
      role: 'Test Prep Expert',
      image: '👨‍💻',
      experience: '8 years',
      credentials: 'M.S. Educational Psychology',
      specialties: ['SAT Prep', 'ACT Prep', 'Test Strategy', 'Time Management'],
      bio: 'Michael has a proven track record of helping students achieve significant score improvements through strategic test preparation.',
      achievements: [
        '250+ point avg SAT increase',
        'Test anxiety specialist',
        'National Merit Scholar',
      ],
      rating: 5,
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Student-Centered',
      description: 'Every lesson is tailored to the individual needs and learning style of each student.',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'We set clear, measurable goals and create actionable plans to achieve them.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in tutoring quality and educational expertise.',
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We work closely with parents and teachers to ensure comprehensive support.',
    },
  ];

  const milestones = [
    { year: '2010', event: 'Founded by passionate educators', icon: GraduationCap },
    { year: '2015', event: 'Expanded to online tutoring platform', icon: BookOpen },
    { year: '2020', event: 'Reached 500+ students tutored', icon: Users },
    { year: '2024', event: 'Recognized as top tutoring service', icon: Trophy },
  ];

  const successStories = [
    {
      student: 'Alex M.',
      achievement: 'SAT Score Increase',
      before: '1150',
      after: '1450',
      improvement: '+300 points',
      story: 'Went from struggling with math to confidently tackling advanced problems. Now attending dream university!',
      subject: 'SAT Prep',
    },
    {
      student: 'Jessica L.',
      achievement: 'Grade Improvement',
      before: 'C average',
      after: 'A- average',
      improvement: '2.5 grades',
      story: 'Chemistry made sense for the first time. Now considering a career in science!',
      subject: 'Chemistry',
    },
    {
      student: 'Marcus T.',
      achievement: 'AP Exam Success',
      before: 'Nervous & Struggling',
      after: '5 on AP Calc AB',
      improvement: 'Perfect Score',
      story: 'From thinking of dropping AP Calc to scoring a 5. Completely transformed my confidence!',
      subject: 'AP Calculus',
    },
  ];

  const approach = [
    {
      step: '1',
      title: 'Assessment',
      description: 'We identify strengths, weaknesses, and learning style',
      icon: Target,
    },
    {
      step: '2',
      title: 'Plan',
      description: 'Create a customized learning roadmap with clear goals',
      icon: BookOpen,
    },
    {
      step: '3',
      title: 'Execute',
      description: 'Engaging lessons with practice and real-time feedback',
      icon: Sparkles,
    },
    {
      step: '4',
      title: 'Track',
      description: 'Monitor progress and adjust strategies as needed',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#5f0f40] via-[#7a1050] to-[#9a031e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About Smart Start
            </h1>
            <p className="text-xl text-purple-100 leading-relaxed">
              Empowering students to reach their full potential through personalized,
              expert tutoring and genuine care for academic success.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Smart Start Tutoring was founded in 2010 by a group of passionate educators who
                  believed that every student deserves access to high-quality, personalized academic
                  support.
                </p>
                <p>
                  What started as a small team of three tutors has grown into a thriving educational
                  community serving over 500 students annually. Our success stems from our unwavering
                  commitment to understanding each student's unique needs and tailoring our approach
                  to help them succeed.
                </p>
                <p>
                  Today, we're proud to offer comprehensive tutoring services across all major subjects,
                  with a team of certified, experienced educators who are passionate about making a
                  difference in students' lives.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                To provide exceptional, personalized tutoring that builds confidence, fosters academic
                excellence, and instills a lifelong love of learning in every student we serve.
              </p>

              <div className="space-y-4">
                {[
                  'Individual attention tailored to each student',
                  'Proven teaching methods backed by research',
                  'Supportive environment that encourages growth',
                  'Regular communication with parents',
                  'Measurable results and progress tracking',
                ].map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#5f0f40] to-[#9a031e] rounded-2xl mb-4 shadow-lg group-hover:shadow-2xl transition-shadow">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600">
              A proven four-step process for academic success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#5f0f40] to-[#9a031e] rounded-xl text-white font-bold text-xl">
                      {step.step}
                    </div>
                    <Icon className="h-8 w-8 text-[#fb8b24]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Tutors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Expert Tutors
            </h2>
            <p className="text-xl text-gray-600">
              Certified educators with proven track records of student success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tutors.map((tutor, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-[#5f0f40] to-[#9a031e] p-6 text-white">
                  <div className="flex items-start space-x-4">
                    <div className="text-6xl">{tutor.image}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">{tutor.name}</h3>
                      <p className="text-purple-200 font-medium mb-2">{tutor.role}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        {[...Array(tutor.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-[#fb8b24] fill-current" />
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{tutor.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Credentials</p>
                    <p className="text-gray-900 font-medium">{tutor.credentials}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-[#5f0f40] rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-2">Achievements</p>
                    <ul className="space-y-2">
                      {tutor.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real transformations from real students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-[#fb8b24] to-orange-600 p-6 text-white text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full mb-4">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{story.student}</h3>
                  <p className="text-white/90 font-medium">{story.subject}</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">{story.achievement}</p>
                    <div className="flex items-center justify-center space-x-4 mb-2">
                      <span className="text-2xl font-bold text-gray-400">{story.before}</span>
                      <span className="text-3xl text-[#5f0f40]">→</span>
                      <span className="text-2xl font-bold text-[#5f0f40]">{story.after}</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">{story.improvement}</p>
                  </div>

                  <p className="text-gray-700 leading-relaxed italic">"{story.story}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in our growth
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div key={index} className="flex items-center space-x-6 group">
                  <div className="flex-shrink-0 w-32 text-right">
                    <span className="text-3xl font-bold text-[#5f0f40]">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#5f0f40] to-[#9a031e] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-purple-50 to-transparent rounded-xl p-6 group-hover:shadow-md transition-shadow">
                    <p className="text-xl font-bold text-gray-900">{milestone.event}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#5f0f40] via-[#7a1050] to-[#9a031e] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join Our Success Stories
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Experience the Smart Start difference. Schedule your free consultation and discover
            how we can help your student achieve their academic goals.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center space-x-2 px-10 py-5 bg-[#fb8b24] text-white rounded-xl font-bold text-lg hover:bg-[#e57a1a] transition-all duration-200 shadow-2xl hover:shadow-3xl"
          >
            <span>Get Started Today</span>
            <GraduationCap className="h-6 w-6" />
          </button>
        </div>
      </section>
    </div>
  );
}
