'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface HomePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
  onOrderOpen: () => void
}

export default function HomePage({ colors, onNavigate, onOrderOpen }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(rgba(155, 34, 38, 0.9), rgba(26, 26, 26, 0.95))',
          minHeight: '600px'
        }}
        className="py-32"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-4">
              Authentic Italian Cuisine Since 2008
            </div>
            <h1 style={{ color: '#ffffff' }} className="text-6xl md:text-7xl font-black leading-tight mb-6">
              Where Every Meal<br />Is a Celebration
            </h1>
            <p style={{ color: '#f5f5f5' }} className="text-xl leading-relaxed mb-10">
              Experience the art of Italian cooking with locally-sourced ingredients, traditional recipes passed down
              through generations, and a passion for creating unforgettable dining moments. From intimate dinners
              to grand celebrations, Gourmet Kitchen brings authentic flavors to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOrderOpen}
                style={{ backgroundColor: '#ee9b00', color: '#1a1a1a' }}
                className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Order Online Now
              </button>
              <button
                onClick={() => onNavigate('reservations')}
                style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #ee9b00' }}
                className="px-10 py-4 font-bold text-lg hover:opacity-80 transition"
              >
                Reserve Your Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div style={{ color: '#9b2226' }} className="text-sm font-bold uppercase tracking-widest mb-3">
              Signature Dishes
            </div>
            <h2 style={{ color: '#1a1a1a' }} className="text-5xl font-black mb-4">
              Chef's Specialties
            </h2>
            <p style={{ color: '#666666' }} className="text-lg max-w-2xl mx-auto">
              Handcrafted daily using the finest ingredients from local farms and Italian importers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div style={{ backgroundColor: '#f5f5f5' }} className="overflow-hidden hover:shadow-xl transition">
              <div style={{ backgroundColor: '#9b2226', height: '250px' }} className="flex items-center justify-center text-8xl">
                🍝
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black">Truffle Carbonara</h3>
                  <div style={{ color: '#9b2226' }} className="text-2xl font-bold">$32</div>
                </div>
                <p style={{ color: '#666666' }} className="leading-relaxed mb-4">
                  House-made fettuccine with crispy pancetta, farm-fresh eggs, aged Parmigiano-Reggiano,
                  and shaved black truffles. Our most requested dish.
                </p>
                <button
                  onClick={onOrderOpen}
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="w-full py-3 font-bold hover:opacity-90 transition"
                >
                  Order This Dish
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: '#f5f5f5' }} className="overflow-hidden hover:shadow-xl transition">
              <div style={{ backgroundColor: '#ae2012', height: '250px' }} className="flex items-center justify-center text-8xl">
                🥩
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black">Osso Buco Milanese</h3>
                  <div style={{ color: '#9b2226' }} className="text-2xl font-bold">$48</div>
                </div>
                <p style={{ color: '#666666' }} className="leading-relaxed mb-4">
                  Slow-braised veal shanks in white wine and vegetables, served with saffron risotto
                  and gremolata. A traditional Milanese masterpiece.
                </p>
                <button
                  onClick={onOrderOpen}
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="w-full py-3 font-bold hover:opacity-90 transition"
                >
                  Order This Dish
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: '#f5f5f5' }} className="overflow-hidden hover:shadow-xl transition">
              <div style={{ backgroundColor: '#ee9b00', height: '250px' }} className="flex items-center justify-center text-8xl">
                🍰
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black">Tiramisu Classico</h3>
                  <div style={{ color: '#9b2226' }} className="text-2xl font-bold">$12</div>
                </div>
                <p style={{ color: '#666666' }} className="leading-relaxed mb-4">
                  Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with premium cocoa.
                  Made fresh daily by our pastry chef.
                </p>
                <button
                  onClick={onOrderOpen}
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="w-full py-3 font-bold hover:opacity-90 transition"
                >
                  Order This Dish
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('menu')}
              style={{ color: '#9b2226', border: '2px solid #9b2226' }}
              className="px-8 py-3 font-bold hover:bg-red-900 hover:text-white transition"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div style={{ color: '#9b2226' }} className="text-sm font-bold uppercase tracking-widest mb-3">
              The Gourmet Kitchen Difference
            </div>
            <h2 style={{ color: '#1a1a1a' }} className="text-5xl font-black mb-4">
              Why Diners Love Us
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">👨‍🍳</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-3">Master Chefs</h3>
              <p style={{ color: '#666666' }}>
                Trained in Rome and Milan, bringing authentic Italian techniques to every dish
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🌿</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-3">Fresh Ingredients</h3>
              <p style={{ color: '#666666' }}>
                Locally-sourced produce and imported Italian specialties delivered daily
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🍷</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-3">Award-Winning Wine List</h3>
              <p style={{ color: '#666666' }}>
                Over 200 selections from Italy's finest vineyards, curated by our sommelier
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">⭐</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-3">Michelin Recommended</h3>
              <p style={{ color: '#666666' }}>
                Recognized for excellence in both cuisine and service since 2015
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div style={{ color: '#9b2226' }} className="text-sm font-bold uppercase tracking-widest mb-3">
              Guest Reviews
            </div>
            <h2 style={{ color: '#1a1a1a' }} className="text-5xl font-black mb-4">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div style={{ backgroundColor: '#f5f5f5', border: '2px solid #ee9b00' }} className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#ee9b00' }} className="text-2xl">★</span>
                ))}
              </div>
              <p style={{ color: '#1a1a1a' }} className="text-lg leading-relaxed mb-6 font-medium">
                "The best Italian food I've had outside of Italy. The truffle carbonara is absolutely divine.
                Exceptional service and gorgeous atmosphere. Worth every penny!"
              </p>
              <div>
                <div style={{ color: '#1a1a1a' }} className="font-bold">Sarah Mitchell</div>
                <div style={{ color: '#999999' }} className="text-sm">Food Critic, Chicago Tribune</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f5f5f5', border: '2px solid #ee9b00' }} className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#ee9b00' }} className="text-2xl">★</span>
                ))}
              </div>
              <p style={{ color: '#1a1a1a' }} className="text-lg leading-relaxed mb-6 font-medium">
                "Celebrated our anniversary here and it was perfect. Chef Antonio came out personally to discuss
                the tasting menu. Every course was a masterpiece. We'll be back!"
              </p>
              <div>
                <div style={{ color: '#1a1a1a' }} className="font-bold">Marcus & Jennifer Lee</div>
                <div style={{ color: '#999999' }} className="text-sm">Anniversary Dinner Guests</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f5f5f5', border: '2px solid #ee9b00' }} className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#ee9b00' }} className="text-2xl">★</span>
                ))}
              </div>
              <p style={{ color: '#1a1a1a' }} className="text-lg leading-relaxed mb-6 font-medium">
                "Our company has used their catering for 3 events now. Professional, delicious, and always
                on time. The online ordering system makes it so easy."
              </p>
              <div>
                <div style={{ color: '#1a1a1a' }} className="font-bold">David Park</div>
                <div style={{ color: '#999999' }} className="text-sm">Corporate Event Manager</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: '#9b2226' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 style={{ color: '#ffffff' }} className="text-5xl font-black mb-6">
            Experience Fine Dining Tonight
          </h2>
          <p style={{ color: '#f5f5f5' }} className="text-xl mb-10">
            Reserve your table now or order online for pickup and delivery. Join our loyalty program
            and earn points with every order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('reservations')}
              style={{ backgroundColor: '#ee9b00', color: '#1a1a1a' }}
              className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
            >
              Make a Reservation
            </button>
            <button
              onClick={onOrderOpen}
              style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #ffffff' }}
              className="px-10 py-4 font-bold text-lg hover:bg-white hover:text-black transition"
            >
              Order Online
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
