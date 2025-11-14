import React from 'react';
import { ShoppingCart, Clock, Award, Truck, ChevronRight, Star, Calendar, Gift } from 'lucide-react';

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Classic Chocolate Cake",
      description: "Rich chocolate layers with buttercream frosting",
      price: 45.00,
      image: "🍰",
      rating: 4.9,
      reviews: 127,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Artisan Sourdough Bread",
      description: "Hand-crafted with 48-hour fermentation",
      price: 8.50,
      image: "🍞",
      rating: 4.8,
      reviews: 89,
      badge: "Fresh Daily"
    },
    {
      id: 3,
      name: "Assorted Macarons",
      description: "12 French macarons in seasonal flavors",
      price: 24.00,
      image: "🧁",
      rating: 5.0,
      reviews: 156,
      badge: "Customer Favorite"
    },
    {
      id: 4,
      name: "Croissant Box",
      description: "6 butter croissants, baked fresh each morning",
      price: 18.00,
      image: "🥐",
      rating: 4.9,
      reviews: 203,
      badge: "Morning Special"
    }
  ];

  const dailySpecials = [
    { name: "Lemon Meringue Tart", discount: "20% OFF", price: "$19.99", original: "$24.99" },
    { name: "Cinnamon Rolls (6-pack)", discount: "Buy 2 Get 1", price: "$15.00" },
    { name: "Fresh Fruit Danish", discount: "15% OFF", price: "$4.25", original: "$5.00" }
  ];

  const categories = [
    { name: "Custom Cakes", icon: "🎂", items: "50+ designs", link: "/custom-cakes" },
    { name: "Fresh Bread", icon: "🥖", items: "Daily baked", link: "/menu?category=bread" },
    { name: "Pastries", icon: "🥮", items: "25+ varieties", link: "/menu?category=pastries" },
    { name: "Cookies", icon: "🍪", items: "15+ flavors", link: "/menu?category=cookies" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🧁</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Sweet Dreams Bakery
                </h1>
                <p className="text-sm" style={{ color: '#f77f00' }}>Baked Fresh Daily Since 1985</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="font-semibold" style={{ color: '#d62828' }}>Home</a>
              <a href="/menu" className="text-gray-700 hover:text-gray-900">Menu</a>
              <a href="/custom-cakes" className="text-gray-700 hover:text-gray-900">Custom Cakes</a>
              <a href="/catering" className="text-gray-700 hover:text-gray-900">Catering</a>
              <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="/account" className="text-gray-700 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
              <a href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6" style={{ color: '#d62828' }} />
                <span className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: '#d62828' }}>
                  3
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ backgroundColor: '#fcbf49' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: '#d62828', color: 'white' }}>
                Free Delivery on Orders Over $50
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Handcrafted Delights, Delivered Fresh
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                From custom celebration cakes to daily fresh bread, every item is made with love using the finest ingredients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/order" className="px-8 py-4 rounded-lg font-semibold text-white text-center transition-transform hover:scale-105" style={{ backgroundColor: '#d62828' }}>
                  Order Online Now
                </a>
                <a href="/custom-cakes" className="px-8 py-4 border-2 rounded-lg font-semibold text-center transition-transform hover:scale-105" style={{ borderColor: '#d62828', color: '#d62828' }}>
                  Design Custom Cake
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="text-9xl text-center transform rotate-6">🎂🥐🍰</div>
              <div className="absolute top-0 right-0 bg-white rounded-lg shadow-lg p-4 transform translate-x-4 -translate-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 fill-current" style={{ color: '#fcbf49' }} />
                  <span className="font-bold">4.9/5.0</span>
                </div>
                <p className="text-sm text-gray-600">2,500+ Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8" style={{ color: '#d62828' }} />
              <div>
                <div className="font-semibold text-gray-900">Fresh Daily</div>
                <div className="text-sm text-gray-600">Baked every morning</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8" style={{ color: '#f77f00' }} />
              <div>
                <div className="font-semibold text-gray-900">Same-Day Delivery</div>
                <div className="text-sm text-gray-600">Order by 2pm</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8" style={{ color: '#fcbf49' }} />
              <div>
                <div className="font-semibold text-gray-900">Award Winning</div>
                <div className="text-sm text-gray-600">5-star rated</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8" style={{ color: '#d62828' }} />
              <div>
                <div className="font-semibold text-gray-900">Gift Options</div>
                <div className="text-sm text-gray-600">Beautiful packaging</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Today's Special Offers
            </h2>
            <p className="text-xl text-gray-600">Limited time deals on our most popular items</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {dailySpecials.map((special, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 hover:shadow-xl transition-shadow" style={{ borderColor: '#fcbf49' }}>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white mb-4" style={{ backgroundColor: '#d62828' }}>
                    {special.discount}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{special.name}</h3>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold" style={{ color: '#d62828' }}>{special.price}</span>
                    {special.original && (
                      <span className="text-lg text-gray-400 line-through">{special.original}</span>
                    )}
                  </div>
                  <button className="w-full py-3 rounded-lg font-semibold text-white transition-colors" style={{ backgroundColor: '#f77f00' }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Shop by Category
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.link}
                className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.items}</p>
                <div className="flex items-center justify-center gap-2" style={{ color: '#d62828' }}>
                  <span className="font-semibold">Browse</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Customer Favorites
            </h2>
            <p className="text-xl text-gray-600">Our most loved treats, made fresh daily</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="text-8xl text-center py-8 bg-gradient-to-br from-orange-50 to-yellow-50">
                    {product.image}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#d62828' }}>
                    {product.badge}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#fcbf49' }} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold" style={{ color: '#d62828' }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="px-4 py-2 rounded-lg font-semibold text-white" style={{ backgroundColor: '#f77f00' }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/menu" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-transform hover:scale-105" style={{ backgroundColor: '#d62828' }}>
              View Full Menu
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Custom Cakes CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: '#d62828' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-7xl mb-6">🎂</div>
          <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Design Your Dream Cake
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Use our interactive cake builder to create a custom masterpiece for your special occasion. Choose flavors, fillings, designs, and more!
          </p>
          <a href="/custom-cakes" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105" style={{ backgroundColor: '#fcbf49', color: '#d62828' }}>
            Start Designing
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Catering Services */}
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Catering for Every Occasion
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                From intimate gatherings to grand celebrations, our catering packages bring bakery-fresh delights to your event. We handle everything from delivery to setup.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 mt-1" style={{ color: '#d62828' }} />
                  <div>
                    <div className="font-semibold text-gray-900">Flexible Scheduling</div>
                    <div className="text-gray-600">Book events up to 6 months in advance</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-6 h-6 mt-1" style={{ color: '#f77f00' }} />
                  <div>
                    <div className="font-semibold text-gray-900">Custom Packages</div>
                    <div className="text-gray-600">Tailored to your guest count and preferences</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Truck className="w-6 h-6 mt-1" style={{ color: '#fcbf49' }} />
                  <div>
                    <div className="font-semibold text-gray-900">Full Service</div>
                    <div className="text-gray-600">Delivery, setup, and pickup included</div>
                  </div>
                </li>
              </ul>
              <a href="/catering" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white" style={{ backgroundColor: '#f77f00' }}>
                Explore Catering Options
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
            <div className="text-9xl text-center">
              🎉🍰🥐<br/>🧁🥖🍪
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🧁</span>
                <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Sweet Dreams Bakery</span>
              </div>
              <p className="text-gray-400">
                Crafting sweet memories since 1985
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4" style={{ color: '#fcbf49' }}>Shop</h3>
              <ul className="space-y-2">
                <li><a href="/menu" className="text-gray-400 hover:text-white">Menu</a></li>
                <li><a href="/custom-cakes" className="text-gray-400 hover:text-white">Custom Cakes</a></li>
                <li><a href="/order" className="text-gray-400 hover:text-white">Order Online</a></li>
                <li><a href="/catering" className="text-gray-400 hover:text-white">Catering</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4" style={{ color: '#fcbf49' }}>Support</h3>
              <ul className="space-y-2">
                <li><a href="/delivery" className="text-gray-400 hover:text-white">Delivery Info</a></li>
                <li><a href="/account" className="text-gray-400 hover:text-white">My Account</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4" style={{ color: '#fcbf49' }}>Hours</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Friday: 7am - 7pm</li>
                <li>Saturday: 8am - 8pm</li>
                <li>Sunday: 8am - 6pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sweet Dreams Bakery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
