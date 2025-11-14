import React from 'react';
import { Shield, Award, Users, Clock, CheckCircle, Star, ThumbsUp, Heart, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function AboutPage({ onNavigate, colors }: AboutPageProps) {
  const credentials = [
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Fully licensed contractors with comprehensive liability and workers compensation insurance. Your home and property are fully protected.',
    },
    {
      icon: Award,
      title: 'Certified Professionals',
      description: 'Our team holds certifications in electrical, plumbing, and general contracting. Continuous training keeps us updated on latest techniques.',
    },
    {
      icon: Users,
      title: 'Background Checked',
      description: 'Every team member undergoes thorough background checks and drug screening. We take your safety and security seriously.',
    },
    {
      icon: Clock,
      title: '15+ Years Experience',
      description: 'Over a decade of serving homeowners with quality repairs and improvements. Thousands of satisfied customers trust us.',
    },
  ];

  const values = [
    {
      icon: ThumbsUp,
      title: 'Quality Workmanship',
      description: 'We take pride in every job, no matter how small. Our reputation is built on doing things right the first time.',
    },
    {
      icon: Clock,
      title: 'Reliability',
      description: 'We show up on time, every time. Your time is valuable, and we respect that with punctual, efficient service.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen to your needs and deliver solutions that exceed expectations.',
    },
    {
      icon: Star,
      title: 'Integrity',
      description: 'Honest assessments, transparent pricing, and ethical practices. We treat your home like it\'s our own.',
    },
  ];

  const teamMembers = [
    {
      name: 'Mike Johnson',
      role: 'Owner & Master Handyman',
      experience: '20+ years experience',
      specialties: 'General repairs, carpentry, project management',
    },
    {
      name: 'David Chen',
      role: 'Licensed Electrician',
      experience: '15+ years experience',
      specialties: 'Electrical work, lighting, smart home installations',
    },
    {
      name: 'Tom Rodriguez',
      role: 'Master Plumber',
      experience: '18+ years experience',
      specialties: 'Plumbing repairs, fixture installation, water systems',
    },
    {
      name: 'Sarah Williams',
      role: 'Project Coordinator',
      experience: '10+ years experience',
      specialties: 'Customer service, scheduling, quality assurance',
    },
  ];

  const testimonials = [
    {
      name: 'Jennifer M.',
      location: 'Downtown',
      rating: 5,
      text: 'Mike and his team transformed our outdated kitchen with new lighting and hardware. The attention to detail was incredible. Highly recommend!',
    },
    {
      name: 'Robert K.',
      location: 'Westside',
      rating: 5,
      text: 'Called for an emergency plumbing issue on a Sunday. David arrived within 2 hours and fixed everything perfectly. True professionals.',
    },
    {
      name: 'Lisa P.',
      location: 'North Hills',
      rating: 5,
      text: 'We\'ve used Fix-It Fast for multiple projects over the years. Always reliable, always quality work. They\'re our go-to for any home repair.',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="text-white py-16" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Fix-It Fast</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Your trusted partner for home repairs and improvements since 2009
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Fix-It Fast Handyman Services was founded in 2009 by Mike Johnson, a skilled craftsman with a passion for helping homeowners. What started as a one-man operation has grown into a trusted team of licensed professionals serving thousands of satisfied customers.
                </p>
                <p>
                  We built our reputation on a simple philosophy: treat every home like it's our own. From minor repairs to major renovations, we approach each project with the same dedication to quality and customer satisfaction.
                </p>
                <p>
                  Today, our team of certified professionals brings decades of combined experience to every job. We're not just handymen—we're your neighbors, committed to keeping our community's homes safe, functional, and beautiful.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2" style={{ color: colors.accent }}>15+</div>
                  <div className="text-gray-600">Years in Business</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2" style={{ color: colors.accent }}>10K+</div>
                  <div className="text-gray-600">Jobs Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2" style={{ color: colors.accent }}>500+</div>
                  <div className="text-gray-600">5-Star Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2" style={{ color: colors.accent }}>98%</div>
                  <div className="text-gray-600">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20" style={{ backgroundColor: colors.secondary + '10' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Licensed, Certified & Trusted
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We meet and exceed industry standards for safety, quality, and professionalism
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {credentials.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                  style={{ backgroundColor: colors.accent + '20' }}
                >
                  <item.icon className="h-10 w-10" style={{ color: colors.accent }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every project and customer interaction
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ backgroundColor: colors.secondary + '30' }}
                >
                  <value.icon className="h-8 w-8" style={{ color: colors.primary }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20" style={{ backgroundColor: colors.secondary + '10' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your home's care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  className="h-48 flex items-center justify-center text-white text-4xl font-bold"
                  style={{ backgroundColor: colors.primary }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1" style={{ color: colors.primary }}>
                    {member.name}
                  </h3>
                  <p className="font-semibold mb-2" style={{ color: colors.accent }}>
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{member.experience}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Specialties:</strong> {member.specialties}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real reviews from real homeowners we've helped
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: colors.accent }} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold" style={{ color: colors.primary }}>{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Read all 500+ verified reviews on Google, Yelp, and Angie's List
            </p>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Guarantee to You</h2>
            <p className="text-xl opacity-90">
              We stand behind our work with industry-leading guarantees
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: colors.secondary }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                100% Satisfaction
              </h3>
              <p className="text-gray-600">
                If you're not completely satisfied, we'll make it right at no additional charge.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: colors.secondary }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                Workmanship Warranty
              </h3>
              <p className="text-gray-600">
                All repairs backed by our 1-year workmanship warranty for your peace of mind.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: colors.secondary }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                On-Time Promise
              </h3>
              <p className="text-gray-600">
                We arrive on time, or we'll discount your service. Your time matters to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>
            Ready to Experience the Fix-It Fast Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied homeowners who trust us with their home repairs
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-lg text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
            style={{ backgroundColor: colors.accent }}
          >
            Get Your Free Quote
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
