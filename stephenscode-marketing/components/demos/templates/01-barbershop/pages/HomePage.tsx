'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface HomePageProps {
  colors: ColorPalette
  onNavigate: (page: 'home' | 'services' | 'about' | 'contact') => void
  onBookingOpen: () => void
}

export default function HomePage({ colors, onNavigate, onBookingOpen }: HomePageProps) {
  return (
    <div>
      {/* SEO Meta Tags would go in head - shown as comment for demo */}
      {/*
      <title>Classic Cuts Barbershop - Premium Men's Haircuts in Downtown Houston</title>
      <meta name="description" content="Experience traditional barbering at its finest. Expert haircuts, beard trims, and hot towel shaves in downtown Houston. Book your appointment today!" />
      <meta name="keywords" content="barbershop, men's haircuts, beard trim, hot shave, Houston barber, downtown Houston" />
      */}

      {/* Hero Section */}
      <section style={{ backgroundColor: '#1a1a1a', backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }} className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div style={{ color: '#d4af37' }} className="text-sm font-bold uppercase tracking-widest mb-4">
              Premium Barbering Since 2010
            </div>
            <h1 style={{ color: '#ffffff' }} className="text-6xl md:text-7xl font-black leading-tight mb-6">
              Where Tradition<br />Meets Precision
            </h1>
            <p style={{ color: '#c4a962' }} className="text-xl leading-relaxed mb-10">
              Experience the art of classic barbering in downtown Houston. Expert cuts, traditional hot towel shaves,
              and modern styling from master barbers who take pride in their craft. We're not just a barbershop—we're
              a destination for the modern gentleman who values quality, tradition, and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookingOpen}
                style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Book Your Appointment
              </button>
              <button
                onClick={() => onNavigate('services')}
                style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #d4af37' }}
                className="px-10 py-4 font-bold text-lg hover:opacity-80 text-center transition"
              >
                View Services & Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div style={{ color: '#d4af37' }} className="text-sm font-bold uppercase tracking-widest mb-3">
              Why Classic Cuts
            </div>
            <h2 style={{ color: '#1a1a1a' }} className="text-5xl font-black mb-4">
              The Classic Cuts Difference
            </h2>
            <p style={{ color: '#666666' }} className="text-lg max-w-2xl mx-auto">
              We're committed to delivering an exceptional grooming experience that goes beyond just a haircut
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">✂️</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-3">Master Craftsmanship</h3>
              <p style={{ color: '#666666' }} className="leading-relaxed">
                Our barbers have over 38 years of combined experience. Each cut is tailored to your unique face shape,
                hair texture, and lifestyle. We don't rush—we perfect.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="text-6xl mb-4">🏆</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-3">Premium Experience</h3>
              <p style={{ color: '#666666' }} className="leading-relaxed">
                Every service includes complimentary beverages, hot towel treatments, and expert consultations.
                Relax in our comfortable chairs and enjoy the classic barbershop atmosphere.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="text-6xl mb-4">🎯</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-3">Traditional Techniques</h3>
              <p style={{ color: '#666666' }} className="leading-relaxed">
                We honor the timeless art of barbering with straight razor shaves, precision fades, and classic cuts.
                Modern trends meet old-school expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="py-24" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div style={{ color: '#d4af37' }} className="text-sm font-bold uppercase tracking-widest mb-3">
              Our Most Popular Services
            </div>
            <h2 style={{ color: '#1a1a1a' }} className="text-5xl font-black mb-4">
              Signature Grooming Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Signature Haircut */}
            <div style={{ backgroundColor: '#ffffff', border: '3px solid #d4af37' }} className="p-8 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black">Signature Haircut</h3>
                <div style={{ color: '#d4af37' }} className="text-3xl font-black">$45</div>
              </div>
              <div style={{ color: '#999999' }} className="text-sm mb-4">⏱ 45 minutes</div>
              <p style={{ color: '#666666' }} className="leading-relaxed mb-6">
                Our most requested service. Precision cut tailored to your face shape and lifestyle. Includes expert consultation,
                wash, cut, style, and hot towel finish. Walk out looking sharp and feeling confident.
              </p>
              <button
                onClick={onBookingOpen}
                style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                className="w-full py-3 font-bold hover:opacity-80 transition"
              >
                Book This Service
              </button>
            </div>

            {/* The Executive */}
            <div style={{ backgroundColor: '#ffffff', border: '3px solid #d4af37' }} className="p-8 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black">The Executive</h3>
                <div style={{ color: '#d4af37' }} className="text-3xl font-black">$75</div>
              </div>
              <div style={{ color: '#999999' }} className="text-sm mb-4">⏱ 75 minutes</div>
              <p style={{ color: '#666666' }} className="leading-relaxed mb-6">
                The ultimate grooming experience. Complete haircut, beard trim, hot towel shave, relaxing scalp massage,
                and premium styling products. Perfect for special occasions or when you want to treat yourself.
              </p>
              <button
                onClick={onBookingOpen}
                style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                className="w-full py-3 font-bold hover:opacity-80 transition"
              >
                Book This Service
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              style={{ color: '#1a1a1a', border: '2px solid #1a1a1a' }}
              className="px-8 py-3 font-bold hover:bg-gray-900 hover:text-white transition"
            >
              View All Services & Pricing →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div style={{ color: '#d4af37' }} className="text-sm font-bold uppercase tracking-widest mb-3">
              Client Testimonials
            </div>
            <h2 style={{ color: '#1a1a1a' }} className="text-5xl font-black mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5' }} className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#d4af37' }} className="text-xl">★</span>
                ))}
              </div>
              <p style={{ color: '#1a1a1a' }} className="text-lg leading-relaxed mb-6 font-medium">
                "Best haircut I've had in 10 years. Marcus took his time, listened to what I wanted, and delivered perfection.
                This is what a real barbershop should be."
              </p>
              <div>
                <div style={{ color: '#1a1a1a' }} className="font-bold">Robert Chen</div>
                <div style={{ color: '#999999' }} className="text-sm">Regular Client Since 2019</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5' }} className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#d4af37' }} className="text-xl">★</span>
                ))}
              </div>
              <p style={{ color: '#1a1a1a' }} className="text-lg leading-relaxed mb-6 font-medium">
                "The Executive package is worth every penny. 75 minutes of pure relaxation and I walked out looking like a million bucks.
                Tony is an artist."
              </p>
              <div>
                <div style={{ color: '#1a1a1a' }} className="font-bold">David Martinez</div>
                <div style={{ color: '#999999' }} className="text-sm">Monthly Executive Client</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5' }} className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#d4af37' }} className="text-xl">★</span>
                ))}
              </div>
              <p style={{ color: '#1a1a1a' }} className="text-lg leading-relaxed mb-6 font-medium">
                "Brought my 7-year-old son for his first real haircut. James was patient, made him feel comfortable, and did an amazing job.
                We'll be back!"
              </p>
              <div>
                <div style={{ color: '#1a1a1a' }} className="font-bold">Michael Stevens</div>
                <div style={{ color: '#999999' }} className="text-sm">Father & Son Regulars</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 style={{ color: '#ffffff' }} className="text-5xl font-black mb-6">
            Ready for the Classic Cuts Experience?
          </h2>
          <p style={{ color: '#c4a962' }} className="text-xl mb-10">
            Book your appointment online or walk in during business hours. We look forward to serving you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBookingOpen}
              style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
              className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
            >
              Book Appointment Online
            </button>
            <button
              onClick={() => onNavigate('contact')}
              style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #d4af37' }}
              className="px-10 py-4 font-bold text-lg hover:opacity-80 transition"
            >
              View Hours & Location
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
