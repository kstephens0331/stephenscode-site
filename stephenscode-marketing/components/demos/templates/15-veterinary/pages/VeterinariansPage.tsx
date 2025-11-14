import React from 'react';
import { Award, GraduationCap, Heart, Star, Stethoscope } from 'lucide-react';

interface VeterinariansPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function VeterinariansPage({ onNavigate, colors }: VeterinariansPageProps) {
  const veterinarians = [
    {
      name: 'Dr. Sarah Martinez, DVM',
      title: 'Chief Veterinarian & Medical Director',
      image: '👩‍⚕️',
      specialties: ['Emergency Medicine', 'Surgery', 'Internal Medicine'],
      education: [
        'DVM, Cornell University College of Veterinary Medicine',
        'Surgery Residency, University of Pennsylvania',
        'Board Certified in Small Animal Surgery'
      ],
      experience: '15+ years',
      bio: 'Dr. Martinez founded Paws & Care with a vision to provide compassionate, cutting-edge veterinary care. She specializes in emergency medicine and complex surgical procedures. Her gentle approach and dedication to continuing education ensure your pet receives the best possible care.',
      interests: 'Outside the clinic, Dr. Martinez enjoys hiking with her two rescue dogs, Luna and Max, and volunteering at local animal shelters.'
    },
    {
      name: 'Dr. Michael Chen, DVM',
      title: 'Associate Veterinarian',
      image: '👨‍⚕️',
      specialties: ['Dental Care', 'Geriatric Medicine', 'Preventive Care'],
      education: [
        'DVM, University of California, Davis',
        'Advanced Veterinary Dentistry Certification',
        'Geriatric Pet Care Specialist'
      ],
      experience: '12+ years',
      bio: 'Dr. Chen brings expertise in dental health and senior pet care. He believes preventive medicine is the key to long, healthy lives for our pets. His thorough examinations and patient education help pet parents make informed decisions about their companions\' health.',
      interests: 'Dr. Chen is passionate about pet nutrition and dental health education. He shares his home with three cats and enjoys photography in his free time.'
    },
    {
      name: 'Dr. Emily Rodriguez, DVM',
      title: 'Associate Veterinarian',
      image: '👩‍⚕️',
      specialties: ['Dermatology', 'Exotic Pets', 'Behavioral Medicine'],
      education: [
        'DVM, Texas A&M University',
        'Veterinary Dermatology Certificate',
        'Exotic Animal Medicine Training'
      ],
      experience: '8+ years',
      bio: 'Dr. Rodriguez has a special interest in skin conditions and exotic pet care. She takes a holistic approach to veterinary medicine, considering the physical and emotional wellbeing of every pet. Her calming presence helps even the most anxious pets feel at ease.',
      interests: 'Dr. Rodriguez cares for several exotic pets at home including a parrot and bearded dragon. She enjoys teaching pet owners about proper animal husbandry.'
    },
    {
      name: 'Dr. James Thompson, DVM',
      title: 'Emergency Veterinarian',
      image: '👨‍⚕️',
      specialties: ['Emergency Care', 'Critical Care', 'Trauma Medicine'],
      education: [
        'DVM, Ohio State University',
        'Emergency & Critical Care Residency',
        'Board Certified in Veterinary Emergency Medicine'
      ],
      experience: '10+ years',
      bio: 'Dr. Thompson leads our 24/7 emergency services with extensive experience in critical care and trauma medicine. His quick thinking and steady hands have saved countless lives. He ensures every emergency case receives immediate attention and expert treatment.',
      interests: 'When not on call, Dr. Thompson trains for triathlons and volunteers with search and rescue dog teams. He has two Golden Retrievers, Bailey and Cooper.'
    },
    {
      name: 'Dr. Amanda Foster, DVM',
      title: 'Associate Veterinarian',
      image: '👩‍⚕️',
      specialties: ['Wellness Care', 'Vaccinations', 'Puppy & Kitten Care'],
      education: [
        'DVM, North Carolina State University',
        'Low-Stress Handling Certification',
        'Puppy & Kitten Development Specialist'
      ],
      experience: '6+ years',
      bio: 'Dr. Foster specializes in preventive care and early life medicine. She\'s passionate about giving puppies and kittens the best start in life and helping young pets grow into healthy adults. Her gentle handling techniques create positive veterinary experiences.',
      interests: 'Dr. Foster fosters kittens for local rescues and enjoys creating educational content about pet care on social media. She has a rescued Labrador named Charlie.'
    },
    {
      name: 'Dr. Robert Kim, DVM',
      title: 'Associate Veterinarian',
      image: '👨‍⚕️',
      specialties: ['Orthopedics', 'Sports Medicine', 'Rehabilitation'],
      education: [
        'DVM, University of Wisconsin-Madison',
        'Veterinary Orthopedic Certificate',
        'Canine Rehabilitation Practitioner'
      ],
      experience: '9+ years',
      bio: 'Dr. Kim focuses on musculoskeletal health and rehabilitation. He helps pets recover from injuries and manages chronic conditions like arthritis. His integrative approach combines traditional medicine with rehabilitation therapy for optimal outcomes.',
      interests: 'An avid runner, Dr. Kim participates in agility competitions with his Border Collie, Dash. He advocates for maintaining active lifestyles for both pets and owners.'
    },
  ];

  const supportStaff = [
    {
      name: 'Jennifer Martinez, CVT',
      role: 'Lead Veterinary Technician',
      years: '10+ years',
      description: 'Certified Veterinary Technician specializing in anesthesia monitoring and surgical assistance'
    },
    {
      name: 'Marcus Johnson, CVT',
      role: 'Emergency Technician',
      years: '8+ years',
      description: 'Critical care specialist available 24/7 for emergency cases'
    },
    {
      name: 'Lisa Chen',
      role: 'Practice Manager',
      years: '12+ years',
      description: 'Ensures smooth operations and exceptional client experience'
    },
    {
      name: 'Rachel Adams',
      role: 'Client Care Coordinator',
      years: '5+ years',
      description: 'Your first point of contact for scheduling and questions'
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section style={{ backgroundColor: colors.primary }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet Our Veterinary Team</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Experienced, compassionate professionals dedicated to providing exceptional care for your beloved pets
          </p>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.secondary }}>
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                Compassionate Care
              </h3>
              <p className="text-gray-600">
                We treat every pet like family with gentle, loving attention
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.secondary }}>
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                Expert Knowledge
              </h3>
              <p className="text-gray-600">
                Board-certified veterinarians with advanced training and education
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.secondary }}>
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                Proven Excellence
              </h3>
              <p className="text-gray-600">
                Decades of combined experience delivering outstanding results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Veterinarians */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Our Veterinarians
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the skilled doctors who will care for your pet
            </p>
          </div>

          <div className="space-y-12">
            {veterinarians.map((vet, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="md:flex">
                  {/* Image Side */}
                  <div className="md:w-1/3 p-8 flex flex-col items-center justify-center" style={{ backgroundColor: colors.accent + '20' }}>
                    <div className="text-9xl mb-4">{vet.image}</div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-1" style={{ color: colors.primary }}>
                        {vet.name}
                      </h3>
                      <p className="font-semibold mb-4" style={{ color: colors.secondary }}>
                        {vet.title}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm">
                        <Stethoscope className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className="text-sm font-medium text-gray-700">{vet.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="md:w-2/3 p-8">
                    {/* Specialties */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {vet.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 rounded-full text-sm font-medium"
                            style={{ backgroundColor: colors.secondary, color: 'white' }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                        Education & Certifications
                      </h4>
                      <ul className="space-y-2">
                        {vet.education.map((edu, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <GraduationCap className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.secondary }} />
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bio */}
                    <div className="mb-4">
                      <h4 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                        About
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {vet.bio}
                      </p>
                      <p className="text-gray-600 italic leading-relaxed">
                        {vet.interests}
                      </p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Our Support Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals who help make every visit exceptional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {supportStaff.map((staff, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: colors.accent + '20' }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">👤</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1" style={{ color: colors.primary }}>
                      {staff.name}
                    </h3>
                    <p className="font-semibold mb-2" style={{ color: colors.secondary }}>
                      {staff.role}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Experience: {staff.years}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {staff.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuing Education */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <Star className="w-16 h-16 mx-auto mb-6" style={{ color: colors.accent }} />
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
              Committed to Excellence
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our veterinarians participate in ongoing continuing education to stay current with the latest advances in veterinary medicine. We attend conferences, complete advanced training courses, and regularly review the newest research to provide your pet with the most up-to-date care possible.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-4">
                <p className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>100+</p>
                <p className="text-gray-600">Hours of CE Annually</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>6</p>
                <p className="text-gray-600">Board Certifications</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>50+</p>
                <p className="text-gray-600">Years Combined Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Schedule an Appointment Today
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Experience the Paws & Care difference. Our team is ready to provide exceptional care for your pet.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              Book Appointment
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all"
            >
              View Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
