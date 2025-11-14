'use client';

import React, { useState } from 'react';
import { Coffee, ShoppingCart, Gift, Package, BookOpen, Users, User, Star, Search, Heart, CheckCircle2, TruckIcon, Award, ThermometerSun, Droplets, Clock, Phone, MapPin, ChevronRight } from 'lucide-react';

// Types
interface CoffeeProduct {
  id: string;
  name: string;
  origin: string;
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  price: number;
  pricePerLb: number;
  image: string;
  description: string;
  tastingNotes: string[];
  process: string;
  altitude: string;
  variety: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  bestseller?: boolean;
}

interface GrindOption {
  id: string;
  name: string;
  description: string;
  brewMethods: string[];
}

interface Subscription {
  id: string;
  name: string;
  price: number;
  bagsPerMonth: number;
  description: string;
  features: string[];
}

interface BrewGuide {
  id: string;
  title: string;
  method: string;
  image: string;
  difficulty: string;
  time: string;
  description: string;
}

type Page = 'home' | 'shop' | 'subscriptions' | 'wholesale' | 'brewing' | 'story' | 'cart' | 'account' | 'blog' | 'contact';

const RoastedPerfectionCoffee = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<Array<CoffeeProduct & { quantity: number; grind: string }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');

  // Sample Data
  const coffees: CoffeeProduct[] = [
    {
      id: '1',
      name: 'Ethiopian Yirgacheffe',
      origin: 'Ethiopia',
      roastLevel: 'Light',
      price: 18.99,
      pricePerLb: 18.99,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=600&fit=crop',
      description: 'Bright, floral coffee with notes of bergamot and honey.',
      tastingNotes: ['Bergamot', 'Honey', 'Jasmine', 'Citrus'],
      process: 'Washed',
      altitude: '1,800-2,200m',
      variety: 'Heirloom',
      rating: 4.9,
      reviews: 412,
      inStock: true,
      bestseller: true
    },
    {
      id: '2',
      name: 'Colombian Supremo',
      origin: 'Colombia',
      roastLevel: 'Medium',
      price: 16.99,
      pricePerLb: 16.99,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=600&fit=crop',
      description: 'Balanced, sweet coffee with caramel and nut notes.',
      tastingNotes: ['Caramel', 'Hazelnut', 'Brown Sugar', 'Cocoa'],
      process: 'Washed',
      altitude: '1,200-1,800m',
      variety: 'Caturra, Castillo',
      rating: 4.7,
      reviews: 356,
      inStock: true
    },
    {
      id: '3',
      name: 'Sumatra Mandheling',
      origin: 'Indonesia',
      roastLevel: 'Dark',
      price: 17.99,
      pricePerLb: 17.99,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=600&fit=crop',
      description: 'Full-bodied with earthy, herbal complexity.',
      tastingNotes: ['Dark Chocolate', 'Cedar', 'Tobacco', 'Earthy'],
      process: 'Wet-hulled',
      altitude: '1,000-1,500m',
      variety: 'Typica, Catimor',
      rating: 4.6,
      reviews: 289,
      inStock: true
    },
    {
      id: '4',
      name: 'Costa Rica Tarrazu',
      origin: 'Costa Rica',
      roastLevel: 'Medium',
      price: 19.99,
      pricePerLb: 19.99,
      image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=600&fit=crop',
      description: 'Clean, crisp coffee with bright acidity.',
      tastingNotes: ['Apple', 'Honey', 'Almond', 'Lemon'],
      process: 'Honey processed',
      altitude: '1,200-1,700m',
      variety: 'Caturra, Catuai',
      rating: 4.8,
      reviews: 324,
      inStock: true,
      bestseller: true
    },
    {
      id: '5',
      name: 'Guatemala Antigua',
      origin: 'Guatemala',
      roastLevel: 'Medium-Dark',
      price: 17.99,
      pricePerLb: 17.99,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop',
      description: 'Rich, chocolatey coffee with smoky undertones.',
      tastingNotes: ['Dark Chocolate', 'Smoke', 'Spice', 'Caramel'],
      process: 'Washed',
      altitude: '1,500-2,000m',
      variety: 'Bourbon, Typica',
      rating: 4.7,
      reviews: 267,
      inStock: true
    },
    {
      id: '6',
      name: 'Brazil Santos',
      origin: 'Brazil',
      roastLevel: 'Medium',
      price: 15.99,
      pricePerLb: 15.99,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=600&fit=crop',
      description: 'Smooth, nutty coffee perfect for espresso.',
      tastingNotes: ['Peanut', 'Cocoa', 'Brown Sugar', 'Cream'],
      process: 'Natural',
      altitude: '800-1,200m',
      variety: 'Bourbon, Mundo Novo',
      rating: 4.5,
      reviews: 298,
      inStock: true
    },
    {
      id: '7',
      name: 'Kenya AA',
      origin: 'Kenya',
      roastLevel: 'Light',
      price: 21.99,
      pricePerLb: 21.99,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=600&fit=crop',
      description: 'Vibrant, wine-like acidity with berry notes.',
      tastingNotes: ['Blackcurrant', 'Tomato', 'Wine', 'Grapefruit'],
      process: 'Washed',
      altitude: '1,400-2,000m',
      variety: 'SL28, SL34',
      rating: 4.9,
      reviews: 387,
      inStock: true,
      bestseller: true
    },
    {
      id: '8',
      name: 'French Roast Blend',
      origin: 'Blend',
      roastLevel: 'Dark',
      price: 14.99,
      pricePerLb: 14.99,
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=600&fit=crop',
      description: 'Bold, smoky blend perfect for dark roast lovers.',
      tastingNotes: ['Smoke', 'Dark Chocolate', 'Roasted Nuts', 'Molasses'],
      process: 'Various',
      altitude: 'Various',
      variety: 'Blend',
      rating: 4.6,
      reviews: 423,
      inStock: true
    }
  ];

  const grindOptions: GrindOption[] = [
    { id: 'whole', name: 'Whole Bean', description: 'Freshest option', brewMethods: ['All Methods'] },
    { id: 'coarse', name: 'Coarse Grind', description: 'For French Press, Cold Brew', brewMethods: ['French Press', 'Cold Brew'] },
    { id: 'medium', name: 'Medium Grind', description: 'For Drip Coffee Makers', brewMethods: ['Drip', 'Pour Over'] },
    { id: 'fine', name: 'Fine Grind', description: 'For Espresso Machines', brewMethods: ['Espresso', 'Moka Pot'] },
    { id: 'extra-fine', name: 'Extra Fine', description: 'For Turkish Coffee', brewMethods: ['Turkish', 'Ibrik'] }
  ];

  const subscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Coffee Explorer',
      price: 24.99,
      bagsPerMonth: 1,
      description: 'Perfect for casual coffee drinkers',
      features: ['1 bag (12oz) monthly', 'Rotating single origins', 'Free shipping', 'Grind preference', 'Cancel anytime']
    },
    {
      id: '2',
      name: 'Coffee Enthusiast',
      price: 44.99,
      bagsPerMonth: 2,
      description: 'For serious coffee lovers',
      features: ['2 bags (12oz) monthly', 'Mix of origins & roasts', 'Free shipping', 'Tasting notes card', 'Exclusive releases', '10% off extras']
    },
    {
      id: '3',
      name: 'Coffee Connoisseur',
      price: 69.99,
      bagsPerMonth: 3,
      description: 'Ultimate coffee experience',
      features: ['3 premium bags monthly', 'Rare micro-lots', 'Priority shipping', 'Detailed origin stories', 'Video brew guides', '15% off everything']
    }
  ];

  const brewGuides: BrewGuide[] = [
    {
      id: '1',
      title: 'Pour Over Coffee',
      method: 'Pour Over',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
      difficulty: 'Intermediate',
      time: '4-5 minutes',
      description: 'Clean, bright cup highlighting coffee complexity'
    },
    {
      id: '2',
      title: 'French Press',
      method: 'Immersion',
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&h=400&fit=crop',
      difficulty: 'Beginner',
      time: '4 minutes',
      description: 'Full-bodied, rich coffee with oils and sediment'
    },
    {
      id: '3',
      title: 'Espresso Mastery',
      method: 'Espresso',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&h=400&fit=crop',
      difficulty: 'Advanced',
      time: '25-30 seconds',
      description: 'Concentrated, intense coffee shot with crema'
    }
  ];

  const roastLevels = ['All', 'Light', 'Medium', 'Medium-Dark', 'Dark'];
  const origins = ['All', 'Ethiopia', 'Colombia', 'Indonesia', 'Costa Rica', 'Guatemala', 'Brazil', 'Kenya', 'Blend'];

  // Cart functions
  const addToCart = (coffee: CoffeeProduct, grind: string = 'Whole Bean') => {
    const existing = cart.find(item => item.id === coffee.id && item.grind === grind);
    if (existing) {
      setCart(cart.map(item =>
        item.id === coffee.id && item.grind === grind ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...coffee, quantity: 1, grind }]);
    }
  };

  const removeFromCart = (id: string, grind: string) => {
    setCart(cart.filter(item => !(item.id === id && item.grind === grind)));
  };

  const updateQuantity = (id: string, grind: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id, grind);
    } else {
      setCart(cart.map(item =>
        item.id === id && item.grind === grind ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (coffeeId: string) => {
    if (wishlist.includes(coffeeId)) {
      setWishlist(wishlist.filter(id => id !== coffeeId));
    } else {
      setWishlist([...wishlist, coffeeId]);
    }
  };

  // Filter coffees
  const filteredCoffees = coffees.filter(coffee => {
    const matchesSearch = coffee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coffee.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoast = selectedRoast === 'All' || coffee.roastLevel === selectedRoast;
    const matchesOrigin = selectedOrigin === 'All' || coffee.origin === selectedOrigin;
    return matchesSearch && matchesRoast && matchesOrigin;
  });

  // Sort coffees
  const sortedCoffees = [...filteredCoffees].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'rating': return b.rating - a.rating;
      default: return b.reviews - a.reviews; // popular
    }
  });

  // Navigation
  const Navigation = () => (
    <nav className="bg-[#3e2723] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Coffee className="w-8 h-8 text-[#8d6e63]" />
            <div>
              <h1 className="text-2xl font-bold">Roasted Perfection</h1>
              <p className="text-xs text-[#8d6e63]">Artisan Coffee Roasters</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-[#8d6e63] transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="hover:text-[#8d6e63] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative hover:text-[#8d6e63] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#8d6e63] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { page: 'home' as Page, label: 'Home', icon: Coffee },
            { page: 'shop' as Page, label: 'Shop Coffee', icon: ShoppingCart },
            { page: 'subscriptions' as Page, label: 'Subscriptions', icon: Gift },
            { page: 'wholesale' as Page, label: 'Wholesale', icon: Package },
            { page: 'brewing' as Page, label: 'Brewing Guides', icon: BookOpen },
            { page: 'story' as Page, label: 'Our Story', icon: Users },
            { page: 'blog' as Page, label: 'Blog', icon: BookOpen },
            { page: 'contact' as Page, label: 'Contact', icon: Phone }
          ].map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                currentPage === page ? 'bg-[#8d6e63] text-white' : 'bg-[#5d4037] hover:bg-[#8d6e63]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  // Page: Home
  const HomePage = () => (
    <div>
      {/* Hero */}
      <div className="relative h-[500px] bg-gradient-to-r from-[#3e2723] to-[#5d4037] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Roasted to Perfection</h1>
            <p className="text-xl mb-6">Discover exceptional single-origin and artisan blends</p>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="bg-[#8d6e63] px-8 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
              >
                Shop Coffee
              </button>
              <button
                onClick={() => setCurrentPage('subscriptions')}
                className="bg-white text-[#3e2723] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe & Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Coffee, title: 'Freshly Roasted', desc: 'Roasted to order weekly' },
              { icon: TruckIcon, title: 'Free Shipping', desc: 'On orders over $40' },
              { icon: Award, title: 'Quality Sourced', desc: 'Direct trade partnerships' },
              { icon: Gift, title: 'Subscriptions', desc: 'Never run out' }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <Icon className="w-12 h-12 text-[#3e2723] mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Coffees */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#3e2723] mb-8">Featured Coffees</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {coffees.filter(c => c.bestseller).slice(0, 4).map(coffee => (
              <div key={coffee.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleWishlist(coffee.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(coffee.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  {coffee.bestseller && (
                    <div className="absolute top-3 left-3 bg-[#3e2723] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Bestseller
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{coffee.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{coffee.origin}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(coffee.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({coffee.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#3e2723]">${coffee.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(coffee)}
                      className="bg-[#3e2723] text-white px-4 py-2 rounded-lg hover:bg-[#5d4037] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription CTA */}
      <div className="py-16 bg-[#3e2723] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Gift className="w-16 h-16 mx-auto mb-4 text-[#8d6e63]" />
          <h2 className="text-3xl font-bold mb-4">Coffee Subscriptions</h2>
          <p className="text-lg mb-6">Get freshly roasted coffee delivered on your schedule. Never run out again.</p>
          <button
            onClick={() => setCurrentPage('subscriptions')}
            className="bg-[#8d6e63] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
          >
            Explore Plans
          </button>
        </div>
      </div>
    </div>
  );

  // Page: Shop Coffee - Similar structure to previous demos, abbreviated for space
  const ShopPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-8">Shop Coffee</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search coffees..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Roast Level</label>
            <select
              value={selectedRoast}
              onChange={(e) => setSelectedRoast(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
            >
              {roastLevels.map(roast => (
                <option key={roast} value={roast}>{roast}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Origin</label>
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
            >
              {origins.map(origin => (
                <option key={origin} value={origin}>{origin}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-6">Showing {sortedCoffees.length} coffees</p>

      {/* Coffee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedCoffees.map(coffee => (
          <div key={coffee.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
              <button
                onClick={() => toggleWishlist(coffee.id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(coffee.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              <div className="absolute top-3 left-3 bg-[#3e2723] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {coffee.roastLevel}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{coffee.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{coffee.origin}</p>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(coffee.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({coffee.reviews})</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {coffee.tastingNotes.slice(0, 3).join(', ')}
              </p>
              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Grind</label>
                <select
                  className="w-full text-sm px-2 py-1 border border-gray-300 rounded"
                  onChange={(e) => setSelectedGrind(e.target.value)}
                >
                  {grindOptions.map(grind => (
                    <option key={grind.id} value={grind.name}>{grind.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#3e2723]">${coffee.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(coffee, selectedGrind)}
                  className="bg-[#3e2723] text-white px-4 py-2 rounded-lg hover:bg-[#5d4037] transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Abbreviated pages for space - following same pattern as full demos
  const SubscriptionsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Gift className="w-16 h-16 text-[#3e2723] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-[#3e2723] mb-4">Coffee Subscriptions</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Get freshly roasted coffee delivered on your schedule. Flexible plans, cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subscriptions.map((sub, index) => (
          <div key={sub.id} className={`bg-white rounded-lg shadow-lg overflow-hidden ${index === 1 ? 'ring-4 ring-[#3e2723] transform scale-105' : ''}`}>
            {index === 1 && (
              <div className="bg-[#3e2723] text-white text-center py-2 font-bold">MOST POPULAR</div>
            )}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#3e2723] mb-2">{sub.name}</h3>
              <p className="text-gray-600 mb-6">{sub.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#3e2723]">${sub.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {sub.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-[#3e2723] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const WholesalePage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-4">Wholesale Coffee</h1>
      <p className="text-gray-600 mb-8">Partner with us to serve exceptional coffee at your business</p>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Wholesale Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Award, title: 'Volume Discounts', desc: 'Competitive pricing for bulk orders' },
            { icon: TruckIcon, title: 'Free Delivery', desc: 'Free shipping on wholesale orders' },
            { icon: Coffee, title: 'Custom Blends', desc: 'Create your signature blend' },
            { icon: Users, title: 'Training Support', desc: 'Barista training available' }
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <Icon className="w-12 h-12 text-[#3e2723] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#3e2723] text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Become a Wholesale Partner</h2>
        <p className="mb-6">Contact our wholesale team to discuss pricing and options for your business.</p>
        <button className="bg-[#8d6e63] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors">
          Request Wholesale Info
        </button>
      </div>
    </div>
  );

  const BrewingPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-4">Brewing Guides</h1>
      <p className="text-gray-600 mb-8">Master the art of brewing perfect coffee at home</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {brewGuides.map(guide => (
          <div key={guide.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48">
              <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-[#8d6e63] text-white rounded-full text-sm font-semibold">
                  {guide.difficulty}
                </span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {guide.time}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#3e2723] mb-2">{guide.title}</h3>
              <p className="text-gray-700 mb-4">{guide.description}</p>
              <button className="text-[#3e2723] font-semibold hover:text-[#5d4037] transition-colors">
                View Guide →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const OurStoryPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-8">Our Story</h1>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#3e2723] mb-4">Passion for Coffee</h2>
        <p className="text-gray-700 mb-4">
          Founded in 2015, Roasted Perfection began with a simple mission: to bring exceptional coffee to every cup. Our founders traveled to coffee origins worldwide, building relationships with farmers and learning the art of roasting.
        </p>
        <p className="text-gray-700">
          Today, we roast small batches weekly, ensuring freshness and quality in every bag. We're committed to direct trade, sustainability, and sharing our passion for coffee with you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Award, title: 'Direct Trade', desc: 'Working directly with farmers' },
          { icon: Coffee, title: 'Small Batch', desc: 'Roasted fresh weekly' },
          { icon: Users, title: 'Community', desc: 'Supporting coffee culture' }
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Icon className="w-12 h-12 text-[#3e2723] mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#3e2723] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${item.grind}-${idx}`} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.origin} • {item.roastLevel}</p>
                  <p className="text-sm text-gray-600 mb-3">Grind: {item.grind}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.grind, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.grind, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xl font-bold text-[#3e2723]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.grind)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{cartTotal >= 40 ? 'FREE' : '$6.99'}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-[#3e2723]">
                    ${(cartTotal >= 40 ? cartTotal : cartTotal + 6.99).toFixed(2)}
                  </span>
                </div>
              </div>
              <button className="w-full bg-[#3e2723] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#5d4037] transition-colors mb-3">
                Checkout
              </button>
              <button
                onClick={() => setCurrentPage('shop')}
                className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AccountPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-8">My Account</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#3e2723] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#3e2723]">Coffee Lover</h2>
          <p className="text-gray-600">coffee@example.com</p>
        </div>
      </div>
    </div>
  );

  const BlogPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-4">Coffee Blog</h1>
      <p className="text-gray-600 mb-8">Tips, recipes, and stories from the world of coffee</p>
    </div>
  );

  const ContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-8">Contact Us</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Get In Touch</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723]"></textarea>
          </div>
          <button className="w-full bg-[#3e2723] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-[#3e2723] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-8 h-8 text-[#8d6e63]" />
              <span className="text-xl font-bold">Roasted Perfection</span>
            </div>
            <p className="text-gray-300 text-sm">Artisan coffee roasted to perfection.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">All Coffee</button></li>
              <li><button onClick={() => setCurrentPage('subscriptions')} className="hover:text-white">Subscriptions</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Learn</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('brewing')} className="hover:text-white">Brewing Guides</button></li>
              <li><button onClick={() => setCurrentPage('blog')} className="hover:text-white">Blog</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('story')} className="hover:text-white">Our Story</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#5d4037] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Roasted Perfection Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'subscriptions' && <SubscriptionsPage />}
        {currentPage === 'wholesale' && <WholesalePage />}
        {currentPage === 'brewing' && <BrewingPage />}
        {currentPage === 'story' && <OurStoryPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'blog' && <BlogPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default RoastedPerfectionCoffee;
