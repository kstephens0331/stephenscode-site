'use client'

import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import type { CartItem } from '../CustomerView'
import { Coffee, Truck, Award, Heart, ArrowRight, Star, Package } from 'lucide-react'

interface HomePageProps {
  demo: Demo
  colors: ColorPalette
  setCurrentPage: (page: string) => void
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
}

export default function HomePage({ demo, colors, setCurrentPage, addToCart }: HomePageProps) {
  const featuredCoffees = [
    {
      id: 'ethiopian-yirgacheffe',
      name: 'Ethiopian Yirgacheffe',
      origin: 'Ethiopia',
      roast: 'Light',
      flavor: 'Floral, Citrus, Blueberry',
      price: 18.99,
      image: '☕',
      rating: 4.9
    },
    {
      id: 'colombian-supremo',
      name: 'Colombian Supremo',
      origin: 'Colombia',
      roast: 'Medium',
      flavor: 'Caramel, Nutty, Balanced',
      price: 16.99,
      image: '☕',
      rating: 4.8
    },
    {
      id: 'sumatra-mandheling',
      name: 'Sumatra Mandheling',
      origin: 'Indonesia',
      roast: 'Dark',
      flavor: 'Earthy, Chocolate, Bold',
      price: 17.99,
      image: '☕',
      rating: 4.7
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                Fresh Roasted Daily
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Coffee
                <span className="block text-amber-300">Roasted to Perfection</span>
              </h1>
              <p className="text-xl text-amber-100 mb-8 max-w-xl">
                From bean to cup, we source the world's finest coffee and roast it fresh to order. Experience the difference of true artisan coffee.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all flex items-center space-x-2 shadow-lg"
                >
                  <span>Shop Coffee</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage('subscriptions')}
                  className="bg-[var(--color-accent)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center space-x-2"
                >
                  <Package className="w-5 h-5" />
                  <span>Subscribe & Save</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
                <div className="text-8xl text-center mb-4">☕</div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Premium Single-Origin</div>
                  <div className="text-amber-200">Ethically Sourced & Fresh Roasted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Coffee, title: 'Fresh Roasted', desc: 'Roasted to order within 24 hours of shipping' },
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $35 to your doorstep' },
              { icon: Award, title: 'Award Winning', desc: 'Recognized by international coffee associations' },
              { icon: Heart, title: 'Ethically Sourced', desc: 'Direct relationships with coffee farmers' }
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary)] bg-opacity-10 rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[var(--color-primary)]">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Coffees */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-4">Featured Coffees</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked selections from our master roasters. Each bean tells a story of its origin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCoffees.map((coffee) => (
              <div key={coffee.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-8 text-center">
                  <div className="text-7xl mb-2">{coffee.image}</div>
                  <div className="flex items-center justify-center space-x-1 text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(coffee.rating) ? 'fill-current' : ''}`} />
                    ))}
                    <span className="text-white text-sm ml-2">{coffee.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-1">{coffee.origin}</div>
                  <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">{coffee.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Roast Level:</span>
                      <span className="font-semibold text-[var(--color-secondary)]">{coffee.roast}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Flavor Notes:</span>
                      <div className="text-[var(--color-accent)] mt-1">{coffee.flavor}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-2xl font-bold text-[var(--color-primary)]">
                      ${coffee.price}
                    </div>
                    <button
                      onClick={() => addToCart({
                        id: coffee.id,
                        name: coffee.name,
                        price: coffee.price,
                        grindType: 'Whole Bean',
                        image: coffee.image
                      })}
                      className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-secondary)] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Coffee</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="w-16 h-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-4xl font-bold mb-6">Never Run Out of Great Coffee</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Subscribe and save 15% on every order. Choose your delivery frequency and cancel anytime. Fresh coffee, delivered to your door.
            </p>
            <button
              onClick={() => setCurrentPage('subscriptions')}
              className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all inline-flex items-center space-x-2"
            >
              <span>Explore Subscriptions</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Brewing at Home */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-6">Master Your Brew</h2>
              <p className="text-gray-600 text-lg mb-6">
                Great coffee deserves great brewing. Explore our comprehensive guides to unlock the full potential of your beans, from pour-over to espresso.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Step-by-step brewing tutorials',
                  'Coffee-to-water ratio calculators',
                  'Grind size recommendations',
                  'Video demonstrations'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setCurrentPage('guides')}
                className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition-colors inline-flex items-center space-x-2"
              >
                <span>View Brewing Guides</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-12 rounded-3xl">
              <div className="text-9xl text-center mb-4">🏆</div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Award-Winning Coffee</h3>
                <p className="text-gray-600">Recognized for quality and sustainability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[var(--color-primary)] mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Coffee Enthusiast',
                text: 'The Ethiopian Yirgacheffe is absolutely incredible. Floral notes and bright acidity make every morning special.',
                rating: 5
              },
              {
                name: 'David Chen',
                role: 'Home Barista',
                text: 'Subscribe and save is the best decision I made. Fresh coffee every two weeks, perfectly roasted.',
                rating: 5
              },
              {
                name: 'Emily Rodriguez',
                role: 'Café Owner',
                text: 'We switched to Roasted Perfection for our café and our customers noticed immediately. Quality is outstanding.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-1 mb-4 text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-[var(--color-primary)]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
