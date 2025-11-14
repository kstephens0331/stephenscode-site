import React from 'react';
import { Star, Quote, Heart, ThumbsUp, Award, TrendingUp } from 'lucide-react';

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function TestimonialsPage({ onNavigate, colors }: TestimonialsPageProps) {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      pet: 'Max (Golden Retriever, 8 years)',
      image: '🐕',
      rating: 5,
      date: 'November 2024',
      review: 'Dr. Martinez and her team saved Max\'s life during a bloat emergency at 2am. They responded immediately, performed emergency surgery, and kept us updated throughout the entire process. Max made a full recovery thanks to their expertise and compassionate care. We cannot thank them enough!',
      service: 'Emergency Surgery'
    },
    {
      name: 'Michael Chen',
      pet: 'Whiskers (Cat, 12 years)',
      image: '🐱',
      rating: 5,
      date: 'October 2024',
      review: 'Whiskers has severe anxiety at vet visits, but the team at Paws & Care makes every visit stress-free. Dr. Chen takes his time, never rushes, and uses gentle handling techniques. They even let me stay in the room during everything. The low-stress approach has made such a difference for Whiskers.',
      service: 'Senior Wellness Care'
    },
    {
      name: 'Emily Rodriguez',
      pet: 'Luna (Beagle, 5 years)',
      image: '🐶',
      rating: 5,
      date: 'October 2024',
      review: 'Luna needed extensive dental work, and I was nervous about the anesthesia. The team explained every step of the process, did thorough pre-surgical bloodwork, and called me with updates during and after the procedure. Luna\'s teeth look amazing, and she\'s so much more comfortable now. Worth every penny!',
      service: 'Dental Surgery'
    },
    {
      name: 'David Thompson',
      pet: 'Buddy (Labrador Mix, 3 years)',
      image: '🦮',
      rating: 5,
      date: 'September 2024',
      review: 'We adopted Buddy from a shelter with some health issues and behavioral problems. Dr. Foster created a comprehensive treatment plan and connected us with a trainer. Six months later, Buddy is healthy, happy, and thriving! The entire team celebrates his progress with us at every visit.',
      service: 'Wellness & Behavioral Support'
    },
    {
      name: 'Jennifer Martinez',
      pet: 'Coco (Poodle, 10 years)',
      image: '🐩',
      rating: 5,
      date: 'September 2024',
      review: 'Coco has diabetes, and managing it was overwhelming at first. Dr. Thompson taught us how to check her blood sugar and administer insulin. They\'re always available when I have questions, and they\'ve helped us keep Coco\'s diabetes well-controlled. She\'s doing great!',
      service: 'Chronic Disease Management'
    },
    {
      name: 'Robert Kim',
      pet: 'Shadow (German Shepherd, 7 years)',
      image: '🐕‍🦺',
      rating: 5,
      date: 'August 2024',
      review: 'Shadow tore his ACL, and Dr. Kim performed the surgery. The orthopedic care and rehabilitation plan were exceptional. They checked on him multiple times during recovery, and now he\'s back to running and playing. Dr. Kim\'s expertise in orthopedics is outstanding.',
      service: 'Orthopedic Surgery'
    },
    {
      name: 'Amanda Foster',
      pet: 'Mittens (Cat, 14 years)',
      image: '🐈',
      rating: 5,
      date: 'August 2024',
      review: 'Mittens is a senior cat with kidney disease, arthritis, and hyperthyroidism. The team created a comprehensive care plan that addresses all her conditions. They\'re so patient and gentle with her, and they truly care about her quality of life. We\'re so grateful for their expertise in senior pet care.',
      service: 'Senior Pet Care'
    },
    {
      name: 'Lisa Anderson',
      pet: 'Charlie (Yorkie, 2 years)',
      image: '🐕',
      rating: 5,
      date: 'July 2024',
      review: 'Charlie ate a sock (of course), and needed emergency surgery to remove it. The team was incredible - they got us in right away, explained all the options, and worked with our pet insurance. Charlie recovered perfectly, and they even called to check on him several times after surgery.',
      service: 'Emergency Foreign Body Removal'
    },
    {
      name: 'Thomas Wright',
      pet: 'Stella (Mixed Breed, 9 years)',
      image: '🐶',
      rating: 5,
      date: 'July 2024',
      review: 'Stella had a mysterious skin condition that other vets couldn\'t diagnose. Dr. Rodriguez ran specialized tests, identified the allergen, and created a treatment plan. Stella\'s skin is finally healthy after months of suffering. Dr. Rodriguez\'s dermatology expertise made all the difference.',
      service: 'Dermatology'
    },
    {
      name: 'Maria Garcia',
      pet: 'Pepper (Chihuahua, 6 years)',
      image: '🐕',
      rating: 5,
      date: 'June 2024',
      review: 'As a first-time dog owner, I had so many questions. The team has been incredibly patient and educational. They never make me feel silly for asking questions, and they always take time to explain things thoroughly. Pepper gets excellent care, and I\'ve learned so much!',
      service: 'Preventive Care & Education'
    },
    {
      name: 'James Wilson',
      pet: 'Milo (Tabby Cat, 4 years)',
      image: '🐈',
      rating: 5,
      date: 'June 2024',
      review: 'Milo blocked (couldn\'t urinate) on a Sunday evening - a true emergency. I called the emergency line, and Dr. Martinez met us at the clinic within 20 minutes. She unblocked him, got him stabilized, and he stayed for monitoring. The 24/7 emergency service literally saved his life.',
      service: '24/7 Emergency Care'
    },
    {
      name: 'Patricia Brown',
      pet: 'Rocky (Bulldog, 5 years)',
      image: '🐕',
      rating: 5,
      date: 'May 2024',
      review: 'Rocky has breathing issues common in bulldogs. Dr. Chen monitors him closely and has helped us manage his condition with medications and lifestyle changes. They\'re always careful about anesthesia for his dental cleanings and take extra precautions. We trust them completely with Rocky\'s specialized needs.',
      service: 'Breed-Specific Care'
    },
  ];

  const stats = [
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '500+', label: 'Five-Star Reviews', icon: Award },
    { number: '98%', label: 'Client Satisfaction', icon: ThumbsUp },
    { number: '2000+', label: 'Happy Pet Families', icon: Heart },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section style={{ backgroundColor: colors.primary }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">What Pet Parents Are Saying</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Real reviews from real families who trust us with their beloved pets
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.accent + '30' }}>
                    <Icon className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <p className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
                    {stat.number}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="p-6 border-b-4" style={{ borderBottomColor: colors.accent }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{testimonial.image}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1" style={{ color: colors.primary }}>
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{testimonial.pet}</p>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.accent }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: colors.secondary, color: 'white' }}>
                    {testimonial.service}
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <Quote className="w-8 h-8 mb-3 opacity-20" style={{ color: colors.primary }} />
                  <p className="text-gray-700 leading-relaxed mb-4 flex-1">
                    {testimonial.review}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Why Families Choose Paws & Care
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These themes appear consistently in our reviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Compassionate Care',
                description: 'Gentle, loving treatment that puts anxious pets at ease',
                icon: Heart
              },
              {
                title: 'Expert Veterinarians',
                description: 'Board-certified doctors with advanced training and specialties',
                icon: Award
              },
              {
                title: 'Clear Communication',
                description: 'Thorough explanations and patience with all questions',
                icon: TrendingUp
              },
              {
                title: '24/7 Availability',
                description: 'Emergency services when pets need us most, day or night',
                icon: Star
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl text-center hover:shadow-lg transition-all"
                  style={{ backgroundColor: colors.accent + '20' }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.secondary }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Testimonial Placeholder */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
              See What Our Clients Say
            </h2>

            <div className="aspect-video bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl mb-6 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-2"></div>
                </div>
                <p className="text-xl font-semibold">Video Testimonials</p>
                <p className="text-teal-100">Coming Soon</p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Want to share your experience? We'd love to hear from you! Contact us to submit a testimonial or video review.
            </p>
          </div>
        </div>
      </section>

      {/* Review Platforms */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
            Find Us On Review Platforms
          </h2>
          <p className="text-gray-600 mb-8">
            Read more reviews and share your experience on these platforms
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Google Reviews', rating: '4.9/5', reviews: '250+ reviews' },
              { name: 'Yelp', rating: '5/5', reviews: '150+ reviews' },
              { name: 'Facebook', rating: '4.9/5', reviews: '200+ reviews' }
            ].map((platform, index) => (
              <div
                key={index}
                className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: colors.accent + '20' }}
              >
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" style={{ color: colors.accent }} />
                  ))}
                </div>
                <h3 className="font-bold text-xl mb-2" style={{ color: colors.primary }}>
                  {platform.name}
                </h3>
                <p className="text-2xl font-bold mb-1" style={{ color: colors.secondary }}>
                  {platform.rating}
                </p>
                <p className="text-sm text-gray-600">{platform.reviews}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Experience the Paws & Care Difference
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Join hundreds of happy pet families who trust us with their beloved companions
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your First Visit
            </button>
            <button
              onClick={() => onNavigate('new-patients')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all"
            >
              New Patient Info
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-teal-400">
            <p className="text-teal-100 mb-4">Have a great experience? We'd love to hear about it!</p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full font-medium hover:bg-white/30 transition-all"
            >
              Leave a Review
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
