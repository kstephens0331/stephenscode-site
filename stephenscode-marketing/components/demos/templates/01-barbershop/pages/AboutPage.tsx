'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface AboutPageProps {
  colors: ColorPalette
  onBookingOpen: () => void
}

export default function AboutPage({ colors, onBookingOpen }: AboutPageProps) {
  const barbers = [
    {
      name: 'Marcus "The Blade" Thompson',
      title: 'Master Barber & Owner',
      experience: '18 years',
      specialty: 'Classic cuts, straight razor shaves',
      bio: 'Trained in traditional Italian and British barbering techniques. Known for precision fades and old-school craftsmanship.',
      story: 'Marcus opened Classic Cuts in 2010 after apprenticing under legendary barber Antonio Russo in Brooklyn. His passion for the craft and commitment to excellence has made Classic Cuts a Houston institution.',
      image: '👨🏾‍🦱'
    },
    {
      name: 'Tony Moretti',
      title: 'Senior Barber',
      experience: '12 years',
      specialty: 'Modern styles, beard design',
      bio: 'Blends contemporary trends with timeless technique. Specializes in textured cuts and creative beard sculpting.',
      story: 'Tony joined the Classic Cuts team in 2015, bringing fresh energy and modern styling expertise. His Instagram-worthy cuts have earned him a loyal following of young professionals.',
      image: '👨🏻'
    },
    {
      name: 'James Park',
      title: 'Barber Stylist',
      experience: '8 years',
      specialty: 'Asian hair, fades, lineup specialist',
      bio: 'Expert in working with all hair textures. Precision-focused with an eye for clean lines and sharp details.',
      story: 'James brings technical precision and an artist\'s eye to every cut. He\'s particularly skilled at working with diverse hair types and creating sharp, clean fades.',
      image: '👨🏻‍🦰'
    }
  ]

  return (
    <div>
      {/* SEO Meta Tags */}
      {/*
      <title>About Us - Classic Cuts Barbershop | Meet Our Master Barbers</title>
      <meta name="description" content="Meet our team of master barbers with over 38 years of combined experience. Learn about our story, values, and commitment to traditional barbering excellence." />
      */}

      {/* Hero */}
      <section style={{ backgroundColor: '#1a1a1a' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div style={{ color: '#d4af37' }} className="text-sm font-bold uppercase tracking-widest mb-4">
            Our Story
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            About Classic Cuts
          </h1>
          <p style={{ color: '#c4a962' }} className="text-xl max-w-3xl mx-auto">
            A Houston barbershop built on tradition, expertise, and genuine care for our clients
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg">
            <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-6">Our Story</h2>

            <div style={{ color: '#666666' }} className="space-y-6 text-lg leading-relaxed">
              <p>
                Classic Cuts Barbershop opened its doors in downtown Houston in 2010 with a simple mission:
                to bring back the art of traditional barbering while serving the modern gentleman.
              </p>

              <p>
                Founded by master barber Marcus Thompson, we started as a single-chair operation with big dreams.
                Marcus had spent years apprenticing under some of the best barbers in Brooklyn and Italy,
                learning techniques that have been passed down for generations.
              </p>

              <p>
                Today, Classic Cuts is a thriving three-chair barbershop that serves hundreds of satisfied clients
                each week. We've built our reputation on three pillars: exceptional skill, genuine hospitality,
                and unwavering attention to detail.
              </p>

              <p>
                What sets us apart isn't just our technical ability—it's our commitment to the experience.
                When you sit in our chair, you're not just getting a haircut. You're part of a tradition that
                goes back centuries. You're taking time for yourself in our comfortable, welcoming space.
                You're building a relationship with a barber who genuinely cares about how you look and feel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-4">
              What We Stand For
            </h2>
            <p style={{ color: '#666666' }} className="text-lg max-w-2xl mx-auto">
              The values that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div style={{ backgroundColor: '#ffffff' }} className="p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-4">Excellence</h3>
              <p style={{ color: '#666666' }} className="leading-relaxed">
                We never settle. Every cut is an opportunity to demonstrate our mastery and exceed expectations.
                Continuous learning and refinement of our craft.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff' }} className="p-8 text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-4">Integrity</h3>
              <p style={{ color: '#666666' }} className="leading-relaxed">
                Honest advice, transparent pricing, and genuine care. We treat every client like family
                and stand behind our work 100%.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff' }} className="p-8 text-center">
              <div className="text-5xl mb-4">🏛️</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-4">Tradition</h3>
              <p style={{ color: '#666666' }} className="leading-relaxed">
                We honor the timeless techniques of master barbers while embracing modern innovation.
                The best of both worlds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div style={{ color: '#d4af37' }} className="text-sm font-bold uppercase tracking-widest mb-3">
              Our Team
            </div>
            <h2 style={{ color: '#1a1a1a' }} className="text-5xl font-black mb-4">
              Meet Our Master Barbers
            </h2>
            <p style={{ color: '#666666' }} className="text-lg max-w-2xl mx-auto">
              38+ years of combined experience. Every cut, every client, every time.
            </p>
          </div>

          <div className="space-y-12">
            {barbers.map((barber, index) => (
              <div
                key={barber.name}
                style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5' }}
                className="p-8 md:p-12"
              >
                <div className={`grid md:grid-cols-${index % 2 === 0 ? '3' : '3'} gap-8 items-center`}>
                  {index % 2 === 0 ? (
                    <>
                      <div className="text-center">
                        <div className="text-9xl mb-4">{barber.image}</div>
                        <div style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }} className="inline-block px-4 py-2 text-sm font-bold">
                          {barber.experience} Experience
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h3 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-2">{barber.name}</h3>
                        <div style={{ color: '#d4af37' }} className="text-xl font-bold mb-4">{barber.title}</div>
                        <div style={{ color: '#666666' }} className="mb-4">
                          <span className="font-bold">Specialty: </span>{barber.specialty}
                        </div>
                        <p style={{ color: '#666666' }} className="text-lg leading-relaxed mb-4">{barber.bio}</p>
                        <p style={{ color: '#666666' }} className="leading-relaxed">{barber.story}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-2">
                        <h3 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-2">{barber.name}</h3>
                        <div style={{ color: '#d4af37' }} className="text-xl font-bold mb-4">{barber.title}</div>
                        <div style={{ color: '#666666' }} className="mb-4">
                          <span className="font-bold">Specialty: </span>{barber.specialty}
                        </div>
                        <p style={{ color: '#666666' }} className="text-lg leading-relaxed mb-4">{barber.bio}</p>
                        <p style={{ color: '#666666' }} className="leading-relaxed">{barber.story}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-9xl mb-4">{barber.image}</div>
                        <div style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }} className="inline-block px-4 py-2 text-sm font-bold">
                          {barber.experience} Experience
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 style={{ color: '#ffffff' }} className="text-4xl font-black mb-6">
              Why Clients Choose Classic Cuts
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div style={{ backgroundColor: '#2d2d2d' }} className="p-6">
              <h3 style={{ color: '#d4af37' }} className="text-xl font-bold mb-3">✓ No Appointments Required</h3>
              <p style={{ color: '#999999' }}>Walk-ins welcome, but we recommend booking for guaranteed service</p>
            </div>

            <div style={{ backgroundColor: '#2d2d2d' }} className="p-6">
              <h3 style={{ color: '#d4af37' }} className="text-xl font-bold mb-3">✓ Transparent Pricing</h3>
              <p style={{ color: '#999999' }}>What you see is what you pay. No hidden fees or surprises</p>
            </div>

            <div style={{ backgroundColor: '#2d2d2d' }} className="p-6">
              <h3 style={{ color: '#d4af37' }} className="text-xl font-bold mb-3">✓ Premium Products</h3>
              <p style={{ color: '#999999' }}>We use only the best shampoos, oils, and styling products</p>
            </div>

            <div style={{ backgroundColor: '#2d2d2d' }} className="p-6">
              <h3 style={{ color: '#d4af37' }} className="text-xl font-bold mb-3">✓ Clean & Safe</h3>
              <p style={{ color: '#999999' }}>Strict sanitation standards and sterilized tools every time</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={onBookingOpen}
              style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
              className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
            >
              Experience the Difference - Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
