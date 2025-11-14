import React, { useState } from 'react';
import { Award, Star, Calendar, Instagram, Heart } from 'lucide-react';

interface StylistsPageProps {
  onNavigate: (page: string) => void;
}

export default function StylistsPage({ onNavigate }: StylistsPageProps) {
  const [selectedStylist, setSelectedStylist] = useState<number | null>(null);

  const stylists = [
    {
      name: 'Jessica Ramirez',
      title: 'Master Colorist & Creative Director',
      experience: '12 years',
      image: '👩‍🦰',
      specialties: ['Balayage', 'Color Correction', 'Fashion Colors', 'Highlights'],
      certifications: ['Redken Certified Colorist', 'Balayage Specialist', 'Olaplex Certified'],
      bio: 'Jessica is our lead colorist with a passion for creating stunning, dimensional color. She has trained with top colorists in NYC and specializes in natural-looking balayage and bold fashion colors. Her color corrections are legendary.',
      achievements: [
        'Best Colorist 2023 - City Beauty Awards',
        'Featured in Vogue Beauty',
        'International Balayage Certification',
      ],
      rating: 5.0,
      reviews: 247,
      instagram: '@jessicacolors',
    },
    {
      name: 'Ashley Kim',
      title: 'Extension & Styling Specialist',
      experience: '8 years',
      image: '👱‍♀️',
      specialties: ['Hair Extensions', 'Updos', 'Blowouts', 'Special Events'],
      certifications: ['Great Lengths Certified', 'Tape-in Extension Expert', 'Bridal Hair Specialist'],
      bio: 'Ashley is renowned for her flawless extension installations and stunning special occasion styles. She works with brides, celebrities, and fashion shows, creating gorgeous looks that last all day and night.',
      achievements: [
        'Top Extension Artist 2023',
        'Celebrity Stylist for Fashion Week',
        '500+ Successful Bridal Styles',
      ],
      rating: 5.0,
      reviews: 189,
      instagram: '@ashleyhairart',
    },
    {
      name: 'Maria Santos',
      title: 'Bridal & Special Events Expert',
      experience: '10 years',
      image: '👰‍♀️',
      specialties: ['Bridal Hair & Makeup', 'Special Events', 'Airbrush Makeup', 'Vintage Styles'],
      certifications: ['Certified Makeup Artist', 'Bridal Beauty Specialist', 'Airbrush Certified'],
      bio: 'Maria has made hundreds of brides look absolutely stunning on their special day. She specializes in creating timeless, elegant looks that photograph beautifully and last throughout the entire celebration.',
      achievements: [
        'WeddingWire Couples Choice Award 2023',
        'Featured Bridal Artist in Wedding Magazine',
        '300+ Flawless Wedding Days',
      ],
      rating: 5.0,
      reviews: 312,
      instagram: '@mariabridal',
    },
    {
      name: 'Taylor Johnson',
      title: 'Master Nail Artist',
      experience: '7 years',
      image: '💅',
      specialties: ['Nail Art', 'Gel Extensions', 'Acrylics', 'Custom Designs'],
      certifications: ['OPI Certified Technician', 'Gel-X Specialist', 'Nail Art Master'],
      bio: 'Taylor is our nail art virtuoso, creating intricate designs and flawless manicures. Her attention to detail and creativity make her one of the most sought-after nail artists in the city.',
      achievements: [
        'Best Nail Artist 2023 - Beauty Excellence Awards',
        'Instagram Nail Artist with 50K+ followers',
        'Featured in Nailpro Magazine',
      ],
      rating: 5.0,
      reviews: 203,
      instagram: '@taylornails',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Meet Our Expert Stylists</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Award-winning professionals dedicated to bringing your beauty vision to life
          </p>
        </div>
      </section>

      {/* Stylists Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stylists.map((stylist, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Stylist Header */}
                <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-6xl">{stylist.image}</div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{stylist.name}</h3>
                        <p className="text-white/90 mb-2">{stylist.title}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="bg-white/20 px-3 py-1 rounded-full">
                            {stylist.experience} experience
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-white mr-1" />
                            <span>{stylist.rating}</span>
                            <span className="ml-1 text-white/80">({stylist.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stylist Content */}
                <div className="p-6">
                  {/* Bio */}
                  <p className="text-gray-700 mb-6">{stylist.bio}</p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3 flex items-center">
                      <Heart className="w-5 h-5 text-[#d00000] mr-2" />
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stylist.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3 flex items-center">
                      <Award className="w-5 h-5 text-[#d00000] mr-2" />
                      Certifications
                    </h4>
                    <ul className="space-y-2">
                      {stylist.certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-[#d00000] mr-2">✓</span>
                          <span className="text-gray-700 text-sm">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3">Notable Achievements</h4>
                    <ul className="space-y-2">
                      {stylist.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-[#d00000] mr-2">★</span>
                          <span className="text-gray-700 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Social & Actions */}
                  <div className="flex items-center justify-between pt-6 border-t">
                    <a
                      href="#"
                      className="flex items-center text-[#d00000] hover:text-[#dc2f02] transition-colors"
                    >
                      <Instagram className="w-5 h-5 mr-2" />
                      <span className="font-medium">{stylist.instagram}</span>
                    </a>
                    <button
                      onClick={() => onNavigate('booking')}
                      className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Book {stylist.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#d00000] via-[#dc2f02] to-[#e85d04] bg-clip-text text-transparent">
                Our Philosophy
              </h2>
              <p className="text-xl text-gray-600">
                Excellence through expertise, passion, and continuous education
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-gradient-to-br from-[#d00000] to-[#e85d04] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Training</h3>
                <p className="text-gray-600">
                  Our team regularly attends workshops and certifications to stay ahead of industry trends
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-gradient-to-br from-[#d00000] to-[#e85d04] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Care</h3>
                <p className="text-gray-600">
                  Every client receives a custom consultation to achieve their perfect look
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-gradient-to-br from-[#d00000] to-[#e85d04] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                <p className="text-gray-600">
                  We use only premium, professional-grade products for exceptional results
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials by Stylist */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-xl text-gray-600">Real reviews from real clients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d00000] text-[#d00000]" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;Jessica completely transformed my hair! The balayage is absolutely perfect. I&apos;ve never felt more confident!&quot;
              </p>
              <p className="font-bold">Sarah M.</p>
              <p className="text-sm text-gray-500">for Jessica Ramirez</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d00000] text-[#d00000]" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;Ashley&apos;s extension work is flawless. You can&apos;t even tell where my hair ends and the extensions begin!&quot;
              </p>
              <p className="font-bold">Emma L.</p>
              <p className="text-sm text-gray-500">for Ashley Kim</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d00000] text-[#d00000]" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;Maria made me feel like a princess on my wedding day. My hair and makeup were absolutely perfect!&quot;
              </p>
              <p className="font-bold">Jennifer K.</p>
              <p className="text-sm text-gray-500">for Maria Santos</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d00000] text-[#d00000]" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;Taylor&apos;s nail art is incredible! She created the exact design I envisioned. Pure artistry!&quot;
              </p>
              <p className="font-bold">Rachel T.</p>
              <p className="text-sm text-gray-500">for Taylor Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Book with Your Favorite Stylist</h2>
          <p className="text-xl text-white/90 mb-8">
            Choose your preferred stylist and service - appointments available now
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="bg-white text-[#d00000] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Book Your Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
