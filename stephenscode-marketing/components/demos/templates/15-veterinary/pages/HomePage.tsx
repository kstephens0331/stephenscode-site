import React from 'react';
import { Heart, Shield, Clock, Award, Stethoscope, Syringe, Scissors, Pill, ChevronRight, Star, Phone } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function HomePage({ onNavigate, colors }: HomePageProps) {
  const services = [
    { icon: Stethoscope, name: 'Wellness Exams', description: 'Comprehensive health checkups' },
    { icon: Syringe, name: 'Vaccinations', description: 'Keep your pet protected' },
    { icon: Shield, name: 'Surgery', description: 'Advanced surgical care' },
    { icon: Scissors, name: 'Dental Care', description: 'Oral health maintenance' },
    { icon: Heart, name: 'Emergency Care', description: 'Available 24/7' },
    { icon: Pill, name: 'Pet Pharmacy', description: 'On-site medications' },
  ];

  const features = [
    { icon: Award, title: 'Experienced Vets', description: 'Board-certified veterinarians with decades of combined experience' },
    { icon: Heart, title: 'Compassionate Care', description: 'We treat every pet like family with gentle, loving attention' },
    { icon: Shield, title: 'Advanced Technology', description: 'State-of-the-art diagnostic and treatment equipment' },
    { icon: Clock, title: '24/7 Emergency', description: 'Round-the-clock emergency services when you need us most' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      pet: 'Max (Golden Retriever)',
      rating: 5,
      text: 'Dr. Martinez and the team saved Max\'s life during an emergency. Their quick response and expertise were incredible!',
      image: '🐕'
    },
    {
      name: 'Michael Chen',
      pet: 'Whiskers (Cat)',
      rating: 5,
      text: 'The best vet clinic we\'ve found! The staff is so caring and patient with Whiskers, who can be quite nervous.',
      image: '🐱'
    },
    {
      name: 'Emily Rodriguez',
      pet: 'Luna (Beagle)',
      rating: 5,
      text: 'From wellness visits to dental care, they provide exceptional service. Luna actually enjoys going to the vet now!',
      image: '🐶'
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🐾</div>
          <div className="absolute bottom-10 right-10 text-9xl">🐾</div>
          <div className="absolute top-1/2 left-1/4 text-7xl">❤️</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Caring for Your Pets Like Family
              </h1>
              <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                Comprehensive veterinary care with compassion and expertise. From routine wellness to emergency services, we're here for you and your beloved pets.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  style={{ backgroundColor: colors.accent }}
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => onNavigate('emergency')}
                  className="px-8 py-4 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Emergency Care
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-8xl mb-4 text-center">🐕🐈</div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-teal-100">
                    <Clock className="w-6 h-6" />
                    <span className="text-lg">Open 7 Days a Week</span>
                  </div>
                  <div className="flex items-center gap-3 text-teal-100">
                    <Heart className="w-6 h-6" />
                    <span className="text-lg">24/7 Emergency Services</span>
                  </div>
                  <div className="flex items-center gap-3 text-teal-100">
                    <Award className="w-6 h-6" />
                    <span className="text-lg">Board-Certified Veterinarians</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Why Choose Paws & Care?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine advanced veterinary medicine with compassionate, personalized care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-b from-teal-50 to-white hover:shadow-xl transition-all transform hover:-translate-y-2 border border-teal-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.secondary }}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Our Veterinary Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete healthcare for your pets at every stage of life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border-l-4"
                style={{ borderLeftColor: colors.primary }}
              >
                <service.icon className="w-12 h-12 mb-4" style={{ color: colors.secondary }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: colors.primary }}
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-4 rounded-full text-white font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: colors.primary }}
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Emergency CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-4">
                Pet Emergency? We're Here 24/7
              </h2>
              <p className="text-xl text-red-100 leading-relaxed">
                Our experienced team is ready to provide immediate care when your pet needs it most. Don't wait - call us right away.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="tel:555-123-4567"
                className="px-8 py-4 bg-white text-red-600 rounded-full font-bold text-xl hover:bg-red-50 transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 justify-center"
              >
                <Phone className="w-6 h-6" />
                Call (555) 123-4567
              </a>
              <button
                onClick={() => onNavigate('emergency')}
                className="px-8 py-4 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all"
              >
                Emergency Care Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              What Pet Parents Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our happy clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-teal-50 to-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4 text-center">{testimonial.image}</div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.accent }} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="text-center">
                  <p className="font-bold" style={{ color: colors.primary }}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.pet}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('testimonials')}
              className="px-8 py-4 rounded-full text-white font-semibold hover:opacity-90 transition-all shadow-lg"
              style={{ backgroundColor: colors.secondary }}
            >
              Read More Reviews
            </button>
          </div>
        </div>
      </section>

      {/* New Patients CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            New to Paws & Care?
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Welcome! We're excited to meet you and your pet. Get started with our simple new patient registration process.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('new-patients')}
              className="px-8 py-4 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-xl hover:shadow-2xl"
              style={{ backgroundColor: colors.accent }}
            >
              New Patient Info
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all"
            >
              Schedule Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
