'use client';

import React, { useState, useEffect } from 'react';
import { Beer, ShoppingCart, MapPin, Calendar, Gift, Search, User, Award, Beer as BeerIcon, Wine, Filter, Star, ChevronRight, CheckCircle2, TruckIcon, Clock, Heart, Share2 } from 'lucide-react';

// Types
interface BeerProduct {
  id: string;
  name: string;
  brewery: string;
  style: string;
  abv: number;
  ibu: number;
  price: number;
  image: string;
  description: string;
  tastingNotes: string[];
  foodPairings: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface Brewery {
  id: string;
  name: string;
  location: string;
  description: string;
  specialty: string;
  image: string;
  beerCount: number;
}

interface PickupLocation {
  id: string;
  name: string;
  address: string;
  hours: string;
  distance: string;
}

interface Subscription {
  id: string;
  name: string;
  price: number;
  beersPerMonth: number;
  description: string;
  features: string[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  price: number;
}

type Page = 'home' | 'shop' | 'breweries' | 'finder' | 'pickup' | 'subscriptions' | 'cart' | 'account' | 'events' | 'contact';

const HoppyTrailsCraftBeer = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<Array<BeerProduct & { quantity: number }>>([]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedBrewery, setSelectedBrewery] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedPickup, setSelectedPickup] = useState<string>('');

  // Sample Data
  const beers: BeerProduct[] = [
    {
      id: '1',
      name: 'Hoppy Trails IPA',
      brewery: 'Mountain Peak Brewing',
      style: 'IPA',
      abv: 6.8,
      ibu: 65,
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=600&fit=crop',
      description: 'Our flagship IPA with bold hop flavors and citrus notes.',
      tastingNotes: ['Citrus', 'Pine', 'Tropical Fruit', 'Slightly Bitter'],
      foodPairings: ['Spicy Wings', 'Burgers', 'Sharp Cheddar', 'Grilled Salmon'],
      rating: 4.8,
      reviews: 342,
      inStock: true
    },
    {
      id: '2',
      name: 'Midnight Stout',
      brewery: 'Dark Horse Brewery',
      style: 'Stout',
      abv: 8.2,
      ibu: 45,
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=600&fit=crop',
      description: 'Rich, creamy stout with notes of coffee and chocolate.',
      tastingNotes: ['Coffee', 'Dark Chocolate', 'Roasted Malt', 'Vanilla'],
      foodPairings: ['Chocolate Desserts', 'BBQ Ribs', 'Blue Cheese', 'Oysters'],
      rating: 4.9,
      reviews: 287,
      inStock: true
    },
    {
      id: '3',
      name: 'Golden Valley Lager',
      brewery: 'Valley View Brewing',
      style: 'Lager',
      abv: 5.2,
      ibu: 28,
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=400&h=600&fit=crop',
      description: 'Crisp, refreshing lager perfect for any occasion.',
      tastingNotes: ['Clean', 'Crisp', 'Light Malt', 'Subtle Hops'],
      foodPairings: ['Pizza', 'Fried Chicken', 'Salads', 'Seafood'],
      rating: 4.6,
      reviews: 198,
      inStock: true
    },
    {
      id: '4',
      name: 'Hazy Days NEIPA',
      brewery: 'Foggy Bottom Brewing',
      style: 'NEIPA',
      abv: 7.4,
      ibu: 55,
      price: 13.99,
      image: 'https://images.unsplash.com/photo-1615332579937-4e7b7c1c8d2e?w=400&h=600&fit=crop',
      description: 'Juicy New England IPA with tropical hop character.',
      tastingNotes: ['Mango', 'Peach', 'Orange', 'Creamy Texture'],
      foodPairings: ['Tacos', 'Thai Food', 'Gouda', 'Grilled Chicken'],
      rating: 4.7,
      reviews: 412,
      inStock: true
    },
    {
      id: '5',
      name: 'Autumn Amber Ale',
      brewery: 'Harvest Moon Brewery',
      style: 'Amber Ale',
      abv: 5.8,
      ibu: 38,
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?w=400&h=600&fit=crop',
      description: 'Balanced amber ale with caramel malt sweetness.',
      tastingNotes: ['Caramel', 'Toffee', 'Nutty', 'Balanced'],
      foodPairings: ['Roasted Chicken', 'Pork Chops', 'Cheddar', 'Apple Pie'],
      rating: 4.5,
      reviews: 156,
      inStock: true
    },
    {
      id: '6',
      name: 'Wheat Field Hefeweizen',
      brewery: 'Golden Grain Brewing',
      style: 'Wheat Beer',
      abv: 5.4,
      ibu: 15,
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1589988292542-3e6c5e6e3fbb?w=400&h=600&fit=crop',
      description: 'Traditional German-style wheat beer with banana and clove notes.',
      tastingNotes: ['Banana', 'Clove', 'Wheat', 'Citrus'],
      foodPairings: ['Bratwurst', 'Pretzels', 'Salads', 'Light Fish'],
      rating: 4.6,
      reviews: 223,
      inStock: true
    },
    {
      id: '7',
      name: 'Imperial Thunder IPA',
      brewery: 'Storm Brewing Co',
      style: 'Imperial IPA',
      abv: 9.2,
      ibu: 95,
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1610693949674-25d7f2e66a65?w=400&h=600&fit=crop',
      description: 'Bold double IPA with intense hop character.',
      tastingNotes: ['Grapefruit', 'Resinous Pine', 'Strong Alcohol', 'Bitter'],
      foodPairings: ['Spicy Curry', 'Blue Cheese', 'Steak', 'Dark Chocolate'],
      rating: 4.8,
      reviews: 298,
      inStock: true
    },
    {
      id: '8',
      name: 'Porter of Call',
      brewery: 'Seaside Brewing',
      style: 'Porter',
      abv: 6.5,
      ibu: 42,
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400&h=600&fit=crop',
      description: 'Smooth porter with chocolate and coffee notes.',
      tastingNotes: ['Chocolate', 'Coffee', 'Caramel', 'Smooth'],
      foodPairings: ['Smoked Meats', 'Chocolate Cake', 'Brie', 'Shellfish'],
      rating: 4.7,
      reviews: 189,
      inStock: true
    }
  ];

  const breweries: Brewery[] = [
    {
      id: '1',
      name: 'Mountain Peak Brewing',
      location: 'Denver, CO',
      description: 'Crafting bold IPAs and innovative brews since 2015.',
      specialty: 'IPA & Pale Ales',
      image: 'https://images.unsplash.com/photo-1595855759920-86e541b5a436?w=600&h=400&fit=crop',
      beerCount: 12
    },
    {
      id: '2',
      name: 'Dark Horse Brewery',
      location: 'Portland, OR',
      description: 'Masters of dark beers and barrel-aged specialties.',
      specialty: 'Stouts & Porters',
      image: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=600&h=400&fit=crop',
      beerCount: 8
    },
    {
      id: '3',
      name: 'Valley View Brewing',
      location: 'San Diego, CA',
      description: 'Traditional brewing methods meet modern innovation.',
      specialty: 'Lagers & Pilsners',
      image: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=600&h=400&fit=crop',
      beerCount: 10
    },
    {
      id: '4',
      name: 'Foggy Bottom Brewing',
      location: 'Seattle, WA',
      description: 'Pioneers of the hazy IPA movement.',
      specialty: 'NEIPAs',
      image: 'https://images.unsplash.com/photo-1603007803634-c7c5d83e4b3f?w=600&h=400&fit=crop',
      beerCount: 15
    }
  ];

  const pickupLocations: PickupLocation[] = [
    {
      id: '1',
      name: 'Downtown Store',
      address: '123 Main Street, Denver, CO 80202',
      hours: 'Mon-Sat: 10am-8pm, Sun: 12pm-6pm',
      distance: '2.3 miles'
    },
    {
      id: '2',
      name: 'Westside Location',
      address: '456 West Ave, Denver, CO 80204',
      hours: 'Mon-Sat: 11am-9pm, Sun: 12pm-7pm',
      distance: '4.7 miles'
    },
    {
      id: '3',
      name: 'Brewery District',
      address: '789 Brew Lane, Denver, CO 80205',
      hours: 'Mon-Sun: 10am-10pm',
      distance: '6.1 miles'
    }
  ];

  const subscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Hoppy Explorer',
      price: 39.99,
      beersPerMonth: 6,
      description: 'Perfect for casual craft beer enthusiasts',
      features: ['6 unique beers monthly', 'Tasting notes included', 'Free local pickup', 'Cancel anytime']
    },
    {
      id: '2',
      name: 'Craft Connoisseur',
      price: 69.99,
      beersPerMonth: 12,
      description: 'For serious beer lovers who want variety',
      features: ['12 unique beers monthly', 'Detailed tasting guides', 'Exclusive releases', 'Food pairing suggestions', 'Free shipping']
    },
    {
      id: '3',
      name: 'Brewmaster Elite',
      price: 99.99,
      beersPerMonth: 18,
      description: 'Ultimate subscription for true beer aficionados',
      features: ['18 premium beers monthly', 'Rare & limited releases', 'Brewery tour passes', 'Virtual tasting events', 'Free shipping', 'Member merchandise']
    }
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'IPA Festival 2024',
      date: '2024-06-15',
      time: '2:00 PM - 8:00 PM',
      location: 'Downtown Store',
      description: 'Sample over 50 IPAs from local and regional breweries.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      price: 35.00
    },
    {
      id: '2',
      title: 'Stout & Porter Night',
      date: '2024-07-20',
      time: '6:00 PM - 10:00 PM',
      location: 'Brewery District',
      description: 'Dark beer enthusiasts unite for an evening of rich, complex brews.',
      image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&h=400&fit=crop',
      price: 30.00
    },
    {
      id: '3',
      title: 'Beer & Cheese Pairing',
      date: '2024-08-10',
      time: '5:00 PM - 7:00 PM',
      location: 'Westside Location',
      description: 'Learn the art of pairing craft beer with artisan cheeses.',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&h=400&fit=crop',
      price: 45.00
    }
  ];

  const beerStyles = ['All', 'IPA', 'NEIPA', 'Imperial IPA', 'Stout', 'Porter', 'Lager', 'Wheat Beer', 'Amber Ale'];

  // Cart functions
  const addToCart = (beer: BeerProduct) => {
    const existing = cart.find(item => item.id === beer.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === beer.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...beer, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (beerId: string) => {
    if (wishlist.includes(beerId)) {
      setWishlist(wishlist.filter(id => id !== beerId));
    } else {
      setWishlist([...wishlist, beerId]);
    }
  };

  // Filter beers
  const filteredBeers = beers.filter(beer => {
    const matchesSearch = beer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beer.brewery.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beer.style.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = selectedStyle === 'All' || beer.style === selectedStyle;
    const matchesBrewery = selectedBrewery === 'All' || beer.brewery === selectedBrewery;
    return matchesSearch && matchesStyle && matchesBrewery;
  });

  // Sort beers
  const sortedBeers = [...filteredBeers].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'abv-low': return a.abv - b.abv;
      case 'abv-high': return b.abv - a.abv;
      case 'rating': return b.rating - a.rating;
      default: return b.reviews - a.reviews; // popular
    }
  });

  // Age Verification Modal
  const AgeVerificationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <Beer className="w-16 h-16 text-[#582f0e] mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-[#582f0e] mb-4">Age Verification Required</h2>
        <p className="text-gray-700 mb-6">
          You must be 21 years or older to access Hoppy Trails Craft Beer.
        </p>
        <p className="text-sm text-gray-600 mb-8">
          By entering this site, you agree to our Terms of Service and Privacy Policy.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => {
              setIsAgeVerified(true);
              setShowAgeModal(false);
            }}
            className="w-full bg-[#582f0e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
          >
            I am 21 or Older - Enter Site
          </button>
          <button
            onClick={() => window.location.href = 'https://www.responsibility.org/'}
            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            I am Under 21 - Exit
          </button>
        </div>
      </div>
    </div>
  );

  // Navigation
  const Navigation = () => (
    <nav className="bg-[#582f0e] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Beer className="w-8 h-8 text-[#936639]" />
            <div>
              <h1 className="text-2xl font-bold">Hoppy Trails</h1>
              <p className="text-xs text-[#936639]">Craft Beer Marketplace</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-[#936639] transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="hover:text-[#936639] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative hover:text-[#936639] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#936639] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { page: 'home' as Page, label: 'Home', icon: Beer },
            { page: 'shop' as Page, label: 'Shop Beers', icon: ShoppingCart },
            { page: 'breweries' as Page, label: 'Breweries', icon: Award },
            { page: 'finder' as Page, label: 'Beer Finder', icon: Search },
            { page: 'pickup' as Page, label: 'Local Pickup', icon: MapPin },
            { page: 'subscriptions' as Page, label: 'Subscriptions', icon: Gift },
            { page: 'events' as Page, label: 'Events', icon: Calendar },
            { page: 'contact' as Page, label: 'Contact', icon: User }
          ].map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                currentPage === page ? 'bg-[#936639] text-white' : 'bg-[#7f4f24] hover:bg-[#936639]'
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
      <div className="relative h-[500px] bg-gradient-to-r from-[#582f0e] to-[#7f4f24] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to Hoppy Trails</h1>
            <p className="text-xl mb-6">Discover exceptional craft beers from America's finest breweries</p>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="bg-[#936639] px-8 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
              >
                Shop Beers
              </button>
              <button
                onClick={() => setCurrentPage('subscriptions')}
                className="bg-white text-[#582f0e] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
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
              { icon: CheckCircle2, title: 'Age Verified', desc: 'Safe & secure checkout' },
              { icon: TruckIcon, title: 'Local Pickup', desc: 'Multiple locations' },
              { icon: Gift, title: 'Subscriptions', desc: 'Monthly craft boxes' },
              { icon: Award, title: 'Premium Quality', desc: 'Curated selection' }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <Icon className="w-12 h-12 text-[#582f0e] mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Beers */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#582f0e] mb-8">Featured Beers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {beers.slice(0, 4).map(beer => (
              <div key={beer.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img src={beer.image} alt={beer.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleWishlist(beer.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(beer.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{beer.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{beer.brewery}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {beer.rating}
                    </span>
                    <span>{beer.abv}% ABV</span>
                    <span>{beer.ibu} IBU</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#582f0e]">${beer.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(beer)}
                      className="bg-[#582f0e] text-white px-4 py-2 rounded-lg hover:bg-[#7f4f24] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-[#582f0e] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors inline-flex items-center gap-2"
            >
              View All Beers <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Subscription CTA */}
      <div className="py-16 bg-[#582f0e] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Gift className="w-16 h-16 mx-auto mb-4 text-[#936639]" />
          <h2 className="text-3xl font-bold mb-4">Join Our Beer Club</h2>
          <p className="text-lg mb-6">Get hand-selected craft beers delivered monthly. Cancel anytime.</p>
          <button
            onClick={() => setCurrentPage('subscriptions')}
            className="bg-[#936639] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
          >
            Explore Subscriptions
          </button>
        </div>
      </div>
    </div>
  );

  // Page: Shop Beers
  const ShopPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#582f0e] mb-8">Shop Craft Beers</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search beers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Beer Style</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
            >
              {beerStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Brewery</label>
            <select
              value={selectedBrewery}
              onChange={(e) => setSelectedBrewery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
            >
              <option value="All">All Breweries</option>
              {breweries.map(brewery => (
                <option key={brewery.id} value={brewery.name}>{brewery.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="abv-low">ABV: Low to High</option>
              <option value="abv-high">ABV: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-6">Showing {sortedBeers.length} beers</p>

      {/* Beer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBeers.map(beer => (
          <div key={beer.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <img src={beer.image} alt={beer.name} className="w-full h-full object-cover" />
              <button
                onClick={() => toggleWishlist(beer.id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(beer.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              <div className="absolute top-3 left-3 bg-[#582f0e] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {beer.style}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{beer.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{beer.brewery}</p>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(beer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({beer.reviews})</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                <span className="font-semibold">{beer.abv}% ABV</span>
                <span>{beer.ibu} IBU</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{beer.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#582f0e]">${beer.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(beer)}
                  className="bg-[#582f0e] text-white px-4 py-2 rounded-lg hover:bg-[#7f4f24] transition-colors flex items-center gap-2"
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

  // Page: Breweries
  const BreweriesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#582f0e] mb-4">Our Breweries</h1>
      <p className="text-gray-600 mb-8">Discover the talented brewers behind your favorite craft beers</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {breweries.map(brewery => (
          <div key={brewery.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64">
              <img src={brewery.image} alt={brewery.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-[#582f0e] mb-1">{brewery.name}</h2>
                  <p className="text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {brewery.location}
                  </p>
                </div>
                <Award className="w-8 h-8 text-[#936639]" />
              </div>
              <p className="text-gray-700 mb-4">{brewery.description}</p>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Specialty</p>
                  <p className="font-semibold text-[#582f0e]">{brewery.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Beers Available</p>
                  <p className="font-bold text-2xl text-[#582f0e]">{brewery.beerCount}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedBrewery(brewery.name);
                  setCurrentPage('shop');
                }}
                className="w-full mt-4 bg-[#582f0e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
              >
                View Beers
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Beer Finder
  const FinderPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#582f0e] mb-4">Beer Finder</h1>
      <p className="text-gray-600 mb-8">Answer a few questions to find your perfect craft beer</p>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">What flavor profile do you prefer?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Hoppy & Bitter', 'Malty & Sweet', 'Dark & Roasty', 'Light & Crisp'].map(flavor => (
                <button key={flavor} className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#582f0e] hover:bg-[#582f0e] hover:text-white transition-colors text-left">
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">Preferred ABV Range?</label>
            <div className="grid grid-cols-3 gap-3">
              {['Low (4-5%)', 'Medium (5-7%)', 'High (7%+)'].map(abv => (
                <button key={abv} className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#582f0e] hover:bg-[#582f0e] hover:text-white transition-colors">
                  {abv}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">What are you pairing it with?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Spicy Food', 'BBQ & Meat', 'Seafood', 'Cheese & Snacks', 'Dessert', 'Just Drinking'].map(pairing => (
                <button key={pairing} className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#582f0e] hover:bg-[#582f0e] hover:text-white transition-colors text-left">
                  {pairing}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">Bitterness Level?</label>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#582f0e]"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Not Bitter</span>
              <span>Very Bitter</span>
            </div>
          </div>

          <button className="w-full bg-[#582f0e] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#7f4f24] transition-colors">
            Find My Perfect Beer
          </button>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h3 className="text-xl font-bold text-[#582f0e] mb-4">Recommended For You</h3>
          <div className="grid grid-cols-2 gap-4">
            {beers.slice(0, 2).map(beer => (
              <div key={beer.id} className="border rounded-lg p-4">
                <img src={beer.image} alt={beer.name} className="w-full h-32 object-cover rounded mb-3" />
                <h4 className="font-bold mb-1">{beer.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{beer.style}</p>
                <button
                  onClick={() => addToCart(beer)}
                  className="w-full bg-[#582f0e] text-white px-4 py-2 rounded-lg hover:bg-[#7f4f24] transition-colors text-sm"
                >
                  Add to Cart - ${beer.price.toFixed(2)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Page: Local Pickup
  const PickupPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#582f0e] mb-4">Local Pickup Locations</h1>
      <p className="text-gray-600 mb-8">Choose a convenient location to pick up your order</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pickupLocations.map(location => (
          <div
            key={location.id}
            className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all ${
              selectedPickup === location.id ? 'ring-4 ring-[#582f0e]' : 'hover:shadow-xl'
            }`}
            onClick={() => setSelectedPickup(location.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <MapPin className="w-8 h-8 text-[#582f0e]" />
              {selectedPickup === location.id && (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              )}
            </div>
            <h3 className="text-xl font-bold text-[#582f0e] mb-2">{location.name}</h3>
            <p className="text-gray-700 mb-3">{location.address}</p>
            <div className="flex items-start gap-2 text-gray-600 mb-3">
              <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{location.hours}</p>
            </div>
            <div className="flex items-center gap-2 text-[#936639] font-semibold">
              <MapPin className="w-4 h-4" />
              <span>{location.distance} away</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#582f0e] text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">How Pickup Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="bg-[#936639] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div>
            <h3 className="font-bold text-lg mb-2">Place Your Order</h3>
            <p className="text-gray-200">Select your beers and choose local pickup at checkout</p>
          </div>
          <div>
            <div className="bg-[#936639] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div>
            <h3 className="font-bold text-lg mb-2">Get Confirmation</h3>
            <p className="text-gray-200">Receive email/SMS when your order is ready (usually 2 hours)</p>
          </div>
          <div>
            <div className="bg-[#936639] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-3">3</div>
            <h3 className="font-bold text-lg mb-2">Pick Up & Enjoy</h3>
            <p className="text-gray-200">Show your ID and order confirmation to collect your beer</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Page: Subscriptions
  const SubscriptionsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Gift className="w-16 h-16 text-[#582f0e] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-[#582f0e] mb-4">Beer Subscription Boxes</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Get hand-selected craft beers delivered to your doorstep every month. Cancel anytime, no commitment required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {subscriptions.map((sub, index) => (
          <div
            key={sub.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              index === 1 ? 'ring-4 ring-[#582f0e] transform scale-105' : ''
            }`}
          >
            {index === 1 && (
              <div className="bg-[#582f0e] text-white text-center py-2 font-bold">
                MOST POPULAR
              </div>
            )}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#582f0e] mb-2">{sub.name}</h3>
              <p className="text-gray-600 mb-6">{sub.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#582f0e]">${sub.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <div className="mb-6">
                <p className="text-gray-700 font-semibold mb-2">{sub.beersPerMonth} Beers Per Month</p>
              </div>
              <ul className="space-y-3 mb-8">
                {sub.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-[#582f0e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-[#582f0e] mb-6 text-center">Why Subscribe?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Award, title: 'Curated Selection', desc: 'Expert picks monthly' },
            { icon: TruckIcon, title: 'Free Delivery', desc: 'On premium plans' },
            { icon: Gift, title: 'Exclusive Access', desc: 'Limited releases' },
            { icon: CheckCircle2, title: 'Cancel Anytime', desc: 'No commitment' }
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <Icon className="w-12 h-12 text-[#582f0e] mx-auto mb-3" />
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Page: Cart
  const CartPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#582f0e] mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#582f0e] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.brewery}</p>
                  <p className="text-sm text-gray-600 mb-3">{item.style} • {item.abv}% ABV • {item.ibu} IBU</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xl font-bold text-[#582f0e]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-[#582f0e]">
                    ${(cartTotal * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location</label>
                <select
                  value={selectedPickup}
                  onChange={(e) => setSelectedPickup(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e]"
                >
                  <option value="">Select Location</option>
                  {pickupLocations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>

              <button className="w-full bg-[#582f0e] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#7f4f24] transition-colors mb-3">
                Proceed to Checkout
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

  // Page: Account
  const AccountPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#582f0e] mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-[#582f0e] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#582f0e]">John Smith</h2>
              <p className="text-gray-600">john.smith@email.com</p>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-[#582f0e]">
                Order History
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-[#582f0e]">
                Subscriptions
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-[#582f0e]">
                Wishlist ({wishlist.length})
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-[#582f0e]">
                Account Settings
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {[
                { id: '#2024-001', date: 'May 15, 2024', status: 'Delivered', total: 45.97, items: 3 },
                { id: '#2024-002', date: 'May 8, 2024', status: 'Delivered', total: 67.96, items: 5 },
                { id: '#2024-003', date: 'May 1, 2024', status: 'Delivered', total: 38.98, items: 3 }
              ].map(order => (
                <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-[#582f0e]">{order.id}</span>
                      <span className="text-gray-600 ml-4">{order.date}</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{order.items} items</span>
                    <span className="font-bold text-[#582f0e]">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Active Subscription</h2>
            <div className="border-2 border-[#582f0e] rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#582f0e]">Craft Connoisseur</h3>
                  <p className="text-gray-600">12 beers per month</p>
                </div>
                <Gift className="w-8 h-8 text-[#936639]" />
              </div>
              <p className="text-gray-700 mb-4">Next delivery: June 1, 2024</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-[#582f0e] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors">
                  Manage Subscription
                </button>
                <button className="px-4 py-2 border-2 border-[#582f0e] text-[#582f0e] rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Pause
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Wishlist</h2>
            {wishlist.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No items in your wishlist</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {beers.filter(beer => wishlist.includes(beer.id)).map(beer => (
                  <div key={beer.id} className="border rounded-lg p-4">
                    <img src={beer.image} alt={beer.name} className="w-full h-32 object-cover rounded mb-3" />
                    <h4 className="font-bold mb-1">{beer.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">${beer.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(beer)}
                      className="w-full bg-[#582f0e] text-white px-4 py-2 rounded-lg hover:bg-[#7f4f24] transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Page: Events
  const EventsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#582f0e] mb-4">Upcoming Events</h1>
      <p className="text-gray-600 mb-8">Join us for tastings, festivals, and special beer events</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#582f0e] mb-2">{event.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#582f0e]">${event.price.toFixed(2)}</span>
                <button className="bg-[#582f0e] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors">
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#582f0e] text-white rounded-lg p-8">
        <div className="max-w-2xl mx-auto text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-[#936639]" />
          <h2 className="text-3xl font-bold mb-4">Never Miss an Event</h2>
          <p className="text-lg mb-6">Subscribe to our newsletter for updates on upcoming tastings, releases, and events.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-[#936639] px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Page: Contact
  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#582f0e] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Subscription Question</option>
                  <option>Event Information</option>
                  <option>Wholesale/Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#582f0e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Visit Our Stores</h2>
            <div className="space-y-6">
              {pickupLocations.map(location => (
                <div key={location.id} className="pb-6 border-b last:border-b-0 last:pb-0">
                  <h3 className="font-bold text-lg text-[#582f0e] mb-2">{location.name}</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      {location.address}
                    </p>
                    <p className="flex items-start gap-2">
                      <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      {location.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Other Ways to Reach Us</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-700 mb-1">Email</p>
                <a href="mailto:info@hoppytrails.com" className="text-[#582f0e] hover:underline">
                  info@hoppytrails.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">Phone</p>
                <a href="tel:555-BEER-NOW" className="text-[#582f0e] hover:underline">
                  (555) BEER-NOW
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">Hours</p>
                <p className="text-gray-600">Monday - Friday: 9am - 6pm<br />Saturday - Sunday: 10am - 4pm</p>
              </div>
            </div>
          </div>

          <div className="bg-[#582f0e] text-white rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <button className="w-12 h-12 bg-[#936639] rounded-full flex items-center justify-center hover:bg-[#7f4f24] transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 bg-[#936639] rounded-full flex items-center justify-center hover:bg-[#7f4f24] transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 bg-[#936639] rounded-full flex items-center justify-center hover:bg-[#7f4f24] transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-[#582f0e] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Beer className="w-8 h-8 text-[#936639]" />
              <span className="text-xl font-bold">Hoppy Trails</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your premier destination for craft beer from America's finest breweries.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">All Beers</button></li>
              <li><button onClick={() => setCurrentPage('breweries')} className="hover:text-white">Breweries</button></li>
              <li><button onClick={() => setCurrentPage('subscriptions')} className="hover:text-white">Subscriptions</button></li>
              <li><button onClick={() => setCurrentPage('events')} className="hover:text-white">Events</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact Us</button></li>
              <li><button className="hover:text-white">FAQ</button></li>
              <li><button className="hover:text-white">Shipping Info</button></li>
              <li><button className="hover:text-white">Returns</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button className="hover:text-white">Terms of Service</button></li>
              <li><button className="hover:text-white">Privacy Policy</button></li>
              <li><button className="hover:text-white">Age Verification</button></li>
              <li><button className="hover:text-white">Responsible Drinking</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#7f4f24] pt-8 text-center text-gray-300 text-sm">
          <p className="mb-2">Please drink responsibly. Must be 21+ to purchase.</p>
          <p>&copy; 2024 Hoppy Trails Craft Beer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {showAgeModal && !isAgeVerified && <AgeVerificationModal />}
      {isAgeVerified && (
        <>
          <Navigation />
          <main>
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'shop' && <ShopPage />}
            {currentPage === 'breweries' && <BreweriesPage />}
            {currentPage === 'finder' && <FinderPage />}
            {currentPage === 'pickup' && <PickupPage />}
            {currentPage === 'subscriptions' && <SubscriptionsPage />}
            {currentPage === 'cart' && <CartPage />}
            {currentPage === 'account' && <AccountPage />}
            {currentPage === 'events' && <EventsPage />}
            {currentPage === 'contact' && <ContactPage />}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default HoppyTrailsCraftBeer;