import React from 'react';
import { Award, GraduationCap, Heart, Star, Users } from 'lucide-react';

interface TeamPageProps {
  onNavigate: (page: string) => void;
}

export default function TeamPage({ onNavigate }: TeamPageProps) {
  const dentists = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'DDS, General & Cosmetic Dentistry',
      experience: '15 years',
      image: '👩‍⚕️',
      specialties: ['General Dentistry', 'Cosmetic Procedures', 'Smile Makeovers', 'Veneers'],
      education: [
        'Doctor of Dental Surgery, Harvard School of Dental Medicine',
        'Bachelor of Science in Biology, Stanford University',
        'Advanced Cosmetic Dentistry Certificate, Las Vegas Institute'
      ],
      certifications: [
        'American Dental Association Member',
        'Academy of General Dentistry Fellow',
        'Invisalign Certified Provider'
      ],
      bio: 'Dr. Johnson is passionate about creating beautiful, healthy smiles using the latest cosmetic and restorative techniques. With over 15 years of experience, she has transformed thousands of smiles and is known for her gentle, patient-centered approach. She believes in educating patients about their options and working together to achieve their dream smile.',
      philosophy: 'Every patient deserves to smile with confidence. I combine artistry with science to create results that look natural and last a lifetime.'
    },
    {
      name: 'Dr. Michael Chen',
      title: 'DDS, Cosmetic & Restorative Specialist',
      experience: '12 years',
      image: '👨‍⚕️',
      specialties: ['Dental Implants', 'Full Mouth Reconstruction', 'Porcelain Veneers', 'Teeth Whitening'],
      education: [
        'Doctor of Dental Surgery, UCLA School of Dentistry',
        'Bachelor of Science in Chemistry, UC Berkeley',
        'Advanced Implantology Fellowship, Misch International Implant Institute'
      ],
      certifications: [
        'American Academy of Cosmetic Dentistry Member',
        'International Congress of Oral Implantologists',
        'Board Certified in Prosthodontics'
      ],
      bio: 'Dr. Chen specializes in complex restorative cases and dental implants. His meticulous attention to detail and artistic eye have earned him recognition as one of the area\'s top cosmetic dentists. He stays at the forefront of dental technology, regularly attending continuing education courses to bring the latest techniques to his patients.',
      philosophy: 'Advanced technology meets personalized care. I treat every case as if it were my own family, ensuring the highest quality results.'
    },
    {
      name: 'Dr. Emily Rodriguez',
      title: 'DMD, Pediatric Dentistry',
      experience: '10 years',
      image: '👩‍⚕️',
      specialties: ['Pediatric Dentistry', 'Preventive Care', 'Sedation Dentistry', 'Special Needs Dentistry'],
      education: [
        'Doctor of Dental Medicine, University of Pennsylvania',
        'Pediatric Dentistry Residency, Children\'s Hospital Boston',
        'Bachelor of Arts in Child Development, Brown University'
      ],
      certifications: [
        'American Academy of Pediatric Dentistry Member',
        'Board Certified Pediatric Dentist',
        'Conscious Sedation Permit'
      ],
      bio: 'Dr. Rodriguez has a special gift for working with children, making dental visits fun and stress-free. She creates a warm, welcoming environment where kids feel comfortable and parents feel confident. Her gentle approach and child-friendly techniques help establish positive dental experiences that last a lifetime.',
      philosophy: 'Building healthy habits early creates a lifetime of beautiful smiles. I make dental care fun so kids actually look forward to their visits!'
    }
  ];

  const staff = [
    {
      name: 'Jennifer Martinez',
      role: 'Dental Hygienist',
      experience: '8 years',
      image: '👩',
      description: 'Certified in periodontal therapy and preventive care'
    },
    {
      name: 'Robert Thompson',
      role: 'Office Manager',
      experience: '12 years',
      image: '👨',
      description: 'Expert in insurance coordination and patient care'
    },
    {
      name: 'Lisa Wong',
      role: 'Dental Assistant',
      experience: '6 years',
      image: '👩',
      description: 'Specialized in surgical assistance and patient comfort'
    },
    {
      name: 'David Kim',
      role: 'Dental Hygienist',
      experience: '10 years',
      image: '👨',
      description: 'Advanced training in cosmetic whitening procedures'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            Our experienced, caring team is dedicated to providing you with exceptional dental care
            in a comfortable, welcoming environment.
          </p>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-[#023e8a]/5 rounded-xl p-6">
              <Users className="w-12 h-12 text-[#0077b6] mx-auto mb-3" />
              <div className="text-4xl font-bold text-[#023e8a] mb-2">7</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="bg-[#023e8a]/5 rounded-xl p-6">
              <Award className="w-12 h-12 text-[#0077b6] mx-auto mb-3" />
              <div className="text-4xl font-bold text-[#023e8a] mb-2">37+</div>
              <div className="text-gray-600">Years Combined Experience</div>
            </div>
            <div className="bg-[#023e8a]/5 rounded-xl p-6">
              <GraduationCap className="w-12 h-12 text-[#0077b6] mx-auto mb-3" />
              <div className="text-4xl font-bold text-[#023e8a] mb-2">15+</div>
              <div className="text-gray-600">Certifications</div>
            </div>
            <div className="bg-[#023e8a]/5 rounded-xl p-6">
              <Star className="w-12 h-12 text-[#0077b6] mx-auto mb-3" />
              <div className="text-4xl font-bold text-[#023e8a] mb-2">5,000+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dentists */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Our Dentists</h2>
            <p className="text-xl text-gray-600">Experienced professionals committed to your smile</p>
          </div>

          <div className="space-y-12">
            {dentists.map((dentist, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                  index % 2 === 0 ? '' : ''
                }`}
              >
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                  {/* Profile Section */}
                  <div className="lg:col-span-1">
                    <div className="text-center">
                      <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#48cae4] to-[#0077b6] rounded-full flex items-center justify-center text-8xl mb-6">
                        {dentist.image}
                      </div>
                      <h3 className="text-2xl font-bold text-[#023e8a] mb-2">{dentist.name}</h3>
                      <div className="text-[#0077b6] font-semibold mb-2">{dentist.title}</div>
                      <div className="inline-block bg-[#48cae4]/20 px-4 py-2 rounded-full text-sm font-semibold text-[#023e8a] mb-6">
                        {dentist.experience} of experience
                      </div>

                      <div className="bg-[#023e8a]/5 rounded-xl p-6 mb-6">
                        <h4 className="font-bold text-[#023e8a] mb-3">Specialties</h4>
                        <div className="space-y-2">
                          {dentist.specialties.map((specialty, idx) => (
                            <div key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                              <Star className="w-4 h-4 text-[#48cae4]" />
                              {specialty}
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => onNavigate('booking')}
                        className="w-full bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#023e8a] transition-all"
                      >
                        Book with {dentist.name.split(' ')[1]}
                      </button>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      {/* Philosophy */}
                      <div className="bg-gradient-to-r from-[#48cae4]/10 to-transparent border-l-4 border-[#0077b6] p-6 rounded-r-xl">
                        <div className="flex items-start gap-3">
                          <Heart className="w-6 h-6 text-[#0077b6] flex-shrink-0 mt-1" />
                          <div>
                            <div className="font-bold text-[#023e8a] mb-2">Philosophy</div>
                            <p className="text-gray-700 italic">"{dentist.philosophy}"</p>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <h4 className="font-bold text-[#023e8a] mb-3">About</h4>
                        <p className="text-gray-700 leading-relaxed">{dentist.bio}</p>
                      </div>

                      {/* Education */}
                      <div>
                        <h4 className="font-bold text-[#023e8a] mb-3 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-[#0077b6]" />
                          Education & Training
                        </h4>
                        <ul className="space-y-2">
                          {dentist.education.map((edu, idx) => (
                            <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                              <span className="text-[#48cae4] mt-1">•</span>
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h4 className="font-bold text-[#023e8a] mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-[#0077b6]" />
                          Certifications & Memberships
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {dentist.certifications.map((cert, idx) => (
                            <div
                              key={idx}
                              className="bg-[#023e8a]/5 px-4 py-2 rounded-lg text-sm text-gray-700"
                            >
                              {cert}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Staff */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Our Support Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals ensuring your comfort and care</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#48cae4] to-[#0077b6] rounded-full flex items-center justify-center text-5xl mb-4">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-[#023e8a] mb-1">{member.name}</h3>
                <div className="text-[#0077b6] font-semibold text-sm mb-2">{member.role}</div>
                <div className="text-gray-500 text-xs mb-3">{member.experience} experience</div>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-gradient-to-r from-[#023e8a] to-[#0077b6] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-[#48cae4]" />
          <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl mb-8 text-gray-100">
            We're always looking for talented, caring professionals to join our practice.
            If you're passionate about patient care and excellence in dentistry, we'd love to hear from you.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#48cae4] text-[#023e8a] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all shadow-lg"
          >
            View Career Opportunities
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Ready to Meet Our Team?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule your appointment today and experience the difference personalized, expert care can make.
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="bg-[#023e8a] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#0077b6] transition-all shadow-md"
          >
            Book Your Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
