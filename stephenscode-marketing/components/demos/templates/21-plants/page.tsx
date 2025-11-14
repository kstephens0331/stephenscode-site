'use client';

import React, { useState } from 'react';
import { Leaf, ShoppingCart, BookOpen, HelpCircle, Gift, TruckIcon, User, Star, Search, Filter, Heart, CheckCircle2, Clock, Droplets, Sun, Wind, ThermometerSun, Award, Calendar, Phone } from 'lucide-react';

// Types
interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  price: number;
  image: string;
  description: string;
  light: 'Low' | 'Medium' | 'Bright';
  water: 'Low' | 'Medium' | 'High';
  humidity: 'Low' | 'Medium' | 'High';
  petFriendly: boolean;
  airPurifying: boolean;
  size: string;
  careInstructions: string[];
  benefits: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface CareGuide {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  readTime: string;
  content: string;
}

interface Subscription {
  id: string;
  name: string;
  price: number;
  plantsPerMonth: number;
  description: string;
  features: string[];
}

type Page = 'home' | 'shop' | 'care-guides' | 'quiz' | 'subscriptions' | 'delivery' | 'cart' | 'account' | 'blog' | 'contact';

const UrbanJunglePlantShop = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<Array<Plant & { quantity: number }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  // Sample Data
  const plants: Plant[] = [
    {
      id: '1',
      name: 'Monstera Deliciosa',
      scientificName: 'Monstera deliciosa',
      category: 'Tropical',
      difficulty: 'Easy',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=600&fit=crop',
      description: 'The iconic Swiss Cheese Plant with stunning split leaves.',
      light: 'Bright',
      water: 'Medium',
      humidity: 'High',
      petFriendly: false,
      airPurifying: true,
      size: '12-18 inches',
      careInstructions: ['Water when top 2 inches of soil are dry', 'Provide bright indirect light', 'Mist leaves weekly', 'Fertilize monthly during growing season'],
      benefits: ['Air purifying', 'Fast growing', 'Statement piece', 'Low maintenance'],
      rating: 4.8,
      reviews: 342,
      inStock: true
    },
    {
      id: '2',
      name: 'Snake Plant',
      scientificName: 'Sansevieria trifasciata',
      category: 'Succulent',
      difficulty: 'Easy',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400&h=600&fit=crop',
      description: 'Nearly indestructible plant perfect for beginners.',
      light: 'Low',
      water: 'Low',
      humidity: 'Low',
      petFriendly: false,
      airPurifying: true,
      size: '18-24 inches',
      careInstructions: ['Water every 2-3 weeks', 'Tolerates low light', 'Minimal humidity needed', 'Rarely needs fertilizing'],
      benefits: ['Extremely hardy', 'Converts CO2 at night', 'Drought tolerant', 'Architectural form'],
      rating: 4.9,
      reviews: 567,
      inStock: true
    },
    {
      id: '3',
      name: 'Pothos Golden',
      scientificName: 'Epipremnum aureum',
      category: 'Vining',
      difficulty: 'Easy',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b44?w=400&h=600&fit=crop',
      description: 'Trailing vine with heart-shaped variegated leaves.',
      light: 'Medium',
      water: 'Medium',
      humidity: 'Medium',
      petFriendly: false,
      airPurifying: true,
      size: '6-8 inches (trailing 3-6 ft)',
      careInstructions: ['Water when soil is dry', 'Bright to medium light', 'Prune to encourage bushiness', 'Easy to propagate'],
      benefits: ['Fast growing', 'Air purifying', 'Easy propagation', 'Adapts to various conditions'],
      rating: 4.7,
      reviews: 423,
      inStock: true
    },
    {
      id: '4',
      name: 'Fiddle Leaf Fig',
      scientificName: 'Ficus lyrata',
      category: 'Tree',
      difficulty: 'Moderate',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=600&fit=crop',
      description: 'Stunning tree with large, violin-shaped leaves.',
      light: 'Bright',
      water: 'Medium',
      humidity: 'Medium',
      petFriendly: false,
      airPurifying: true,
      size: '24-36 inches',
      careInstructions: ['Water when top inch is dry', 'Needs bright, indirect light', 'Rotate weekly for even growth', 'Clean leaves monthly'],
      benefits: ['Dramatic statement piece', 'Fast vertical growth', 'Architectural beauty', 'Air purifying'],
      rating: 4.5,
      reviews: 289,
      inStock: true
    },
    {
      id: '5',
      name: 'Peace Lily',
      scientificName: 'Spathiphyllum',
      category: 'Flowering',
      difficulty: 'Easy',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=600&fit=crop',
      description: 'Elegant plant with white blooms and air-purifying qualities.',
      light: 'Low',
      water: 'High',
      humidity: 'High',
      petFriendly: false,
      airPurifying: true,
      size: '16-20 inches',
      careInstructions: ['Keep soil consistently moist', 'Tolerates low light', 'High humidity preferred', 'Remove spent blooms'],
      benefits: ['Beautiful white flowers', 'Excellent air purifier', 'Low light tolerant', 'Tells you when thirsty'],
      rating: 4.6,
      reviews: 398,
      inStock: true
    },
    {
      id: '6',
      name: 'ZZ Plant',
      scientificName: 'Zamioculcas zamiifolia',
      category: 'Tropical',
      difficulty: 'Easy',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&h=600&fit=crop',
      description: 'Glossy, waxy leaves on a virtually indestructible plant.',
      light: 'Low',
      water: 'Low',
      humidity: 'Low',
      petFriendly: false,
      airPurifying: true,
      size: '18-24 inches',
      careInstructions: ['Water every 2-3 weeks', 'Tolerates neglect', 'Low to bright light', 'Minimal care needed'],
      benefits: ['Drought tolerant', 'Low maintenance', 'Glossy appearance', 'Slow growing'],
      rating: 4.8,
      reviews: 456,
      inStock: true
    },
    {
      id: '7',
      name: 'Bird of Paradise',
      scientificName: 'Strelitzia reginae',
      category: 'Tropical',
      difficulty: 'Moderate',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400&h=600&fit=crop',
      description: 'Tropical beauty with large paddle-shaped leaves.',
      light: 'Bright',
      water: 'High',
      humidity: 'High',
      petFriendly: false,
      airPurifying: true,
      size: '36-48 inches',
      careInstructions: ['Water frequently in summer', 'Needs bright, direct light', 'High humidity essential', 'Feed every 2 weeks in growing season'],
      benefits: ['Stunning tropical appearance', 'Can flower indoors', 'Fast growing', 'Makes a statement'],
      rating: 4.7,
      reviews: 234,
      inStock: true
    },
    {
      id: '8',
      name: 'Spider Plant',
      scientificName: 'Chlorophytum comosum',
      category: 'Vining',
      difficulty: 'Easy',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=600&fit=crop',
      description: 'Classic houseplant with arching variegated leaves.',
      light: 'Medium',
      water: 'Medium',
      humidity: 'Medium',
      petFriendly: true,
      airPurifying: true,
      size: '12-15 inches',
      careInstructions: ['Water when top inch is dry', 'Bright indirect light', 'Easy to propagate babies', 'Pet safe'],
      benefits: ['Non-toxic to pets', 'Produces baby plants', 'Air purifying', 'Very forgiving'],
      rating: 4.8,
      reviews: 612,
      inStock: true
    }
  ];

  const careGuides: CareGuide[] = [
    {
      id: '1',
      title: 'Beginners Guide to Indoor Plants',
      category: 'Basics',
      image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=600&h=400&fit=crop',
      excerpt: 'Everything you need to know to start your plant journey.',
      readTime: '8 min',
      content: 'Complete guide for beginners...'
    },
    {
      id: '2',
      title: 'Understanding Light Requirements',
      category: 'Care',
      image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&h=400&fit=crop',
      excerpt: 'Learn how to assess and provide the right light for your plants.',
      readTime: '6 min',
      content: 'Light requirements guide...'
    },
    {
      id: '3',
      title: 'Watering 101: How Much is Too Much?',
      category: 'Care',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      excerpt: 'Master the art of watering and avoid common mistakes.',
      readTime: '7 min',
      content: 'Watering guide...'
    }
  ];

  const subscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Plant Starter',
      price: 29.99,
      plantsPerMonth: 1,
      description: 'Perfect for beginning plant parents',
      features: ['1 curated plant monthly', 'Care guide included', 'Free shipping', 'Cancel anytime', '10% off supplies']
    },
    {
      id: '2',
      name: 'Jungle Builder',
      price: 49.99,
      plantsPerMonth: 2,
      description: 'For growing your indoor jungle',
      features: ['2 curated plants monthly', 'Detailed care guides', 'Free shipping', 'Exclusive varieties', '15% off supplies', 'Monthly care tips']
    },
    {
      id: '3',
      name: 'Plant Collector',
      price: 79.99,
      plantsPerMonth: 3,
      description: 'Ultimate subscription for plant enthusiasts',
      features: ['3 premium plants monthly', 'Rare & exotic varieties', 'Priority shipping', 'Video care tutorials', '20% off all supplies', 'Plant parenthood hotline']
    }
  ];

  const categories = ['All', 'Tropical', 'Succulent', 'Vining', 'Tree', 'Flowering'];
  const difficulties = ['All', 'Easy', 'Moderate', 'Advanced'];

  // Cart functions
  const addToCart = (plant: Plant) => {
    const existing = cart.find(item => item.id === plant.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...plant, quantity: 1 }]);
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

  const toggleWishlist = (plantId: string) => {
    if (wishlist.includes(plantId)) {
      setWishlist(wishlist.filter(id => id !== plantId));
    } else {
      setWishlist([...wishlist, plantId]);
    }
  };

  // Filter plants
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || plant.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Sort plants
  const sortedPlants = [...filteredPlants].sort((a, b) => {
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
    <nav className="bg-[#2d6a4f] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-[#52b788]" />
            <div>
              <h1 className="text-2xl font-bold">Urban Jungle</h1>
              <p className="text-xs text-[#52b788]">Plant Shop & Nursery</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-[#52b788] transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="hover:text-[#52b788] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative hover:text-[#52b788] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#52b788] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { page: 'home' as Page, label: 'Home', icon: Leaf },
            { page: 'shop' as Page, label: 'Shop Plants', icon: ShoppingCart },
            { page: 'care-guides' as Page, label: 'Care Guides', icon: BookOpen },
            { page: 'quiz' as Page, label: 'Plant Quiz', icon: HelpCircle },
            { page: 'subscriptions' as Page, label: 'Subscriptions', icon: Gift },
            { page: 'delivery' as Page, label: 'Delivery', icon: TruckIcon },
            { page: 'blog' as Page, label: 'Blog', icon: BookOpen },
            { page: 'contact' as Page, label: 'Contact', icon: Phone }
          ].map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                currentPage === page ? 'bg-[#52b788] text-white' : 'bg-[#40916c] hover:bg-[#52b788]'
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
      <div className="relative h-[500px] bg-gradient-to-r from-[#2d6a4f] to-[#40916c] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Bring Nature Indoors</h1>
            <p className="text-xl mb-6">Discover beautiful, healthy plants delivered to your door</p>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="bg-[#52b788] px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
              >
                Shop Plants
              </button>
              <button
                onClick={() => setCurrentPage('quiz')}
                className="bg-white text-[#2d6a4f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Take Plant Quiz
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
              { icon: CheckCircle2, title: 'Healthy Plants', desc: 'Greenhouse fresh guarantee' },
              { icon: TruckIcon, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: BookOpen, title: 'Care Guides', desc: 'Expert tips included' },
              { icon: Award, title: 'Plant Guarantee', desc: '30-day health promise' }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <Icon className="w-12 h-12 text-[#2d6a4f] mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Plants */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8">Popular Plants</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {plants.slice(0, 4).map(plant => (
              <div key={plant.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleWishlist(plant.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(plant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  <div className="absolute top-3 left-3 bg-[#2d6a4f] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {plant.difficulty}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{plant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 italic">{plant.scientificName}</p>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <Sun className={`w-4 h-4 ${plant.light === 'Bright' ? 'text-yellow-500' : plant.light === 'Medium' ? 'text-orange-400' : 'text-gray-400'}`} />
                    <Droplets className={`w-4 h-4 ${plant.water === 'High' ? 'text-blue-500' : plant.water === 'Medium' ? 'text-blue-400' : 'text-blue-300'}`} />
                    {plant.petFriendly && <Award className="w-4 h-4 text-green-500" title="Pet Friendly" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#2d6a4f]">${plant.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(plant)}
                      className="bg-[#2d6a4f] text-white px-4 py-2 rounded-lg hover:bg-[#40916c] transition-colors"
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
      <div className="py-16 bg-[#2d6a4f] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Gift className="w-16 h-16 mx-auto mb-4 text-[#52b788]" />
          <h2 className="text-3xl font-bold mb-4">Monthly Plant Subscriptions</h2>
          <p className="text-lg mb-6">Get hand-selected plants delivered every month. Build your jungle effortlessly.</p>
          <button
            onClick={() => setCurrentPage('subscriptions')}
            className="bg-[#52b788] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
          >
            Explore Plans
          </button>
        </div>
      </div>
    </div>
  );

  // Page: Shop Plants
  const ShopPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-8">Shop Plants</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search plants..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
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

      {/* Results */}
      <p className="text-gray-600 mb-6">Showing {sortedPlants.length} plants</p>

      {/* Plant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedPlants.map(plant => (
          <div key={plant.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
              <button
                onClick={() => toggleWishlist(plant.id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(plant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              <div className="absolute top-3 left-3 bg-[#2d6a4f] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {plant.difficulty}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{plant.name}</h3>
              <p className="text-sm text-gray-600 mb-2 italic">{plant.scientificName}</p>
              <div className="flex items-center gap-2 mb-3">
                <Sun className={`w-4 h-4 ${plant.light === 'Bright' ? 'text-yellow-500' : plant.light === 'Medium' ? 'text-orange-400' : 'text-gray-400'}`} />
                <Droplets className={`w-4 h-4 ${plant.water === 'High' ? 'text-blue-500' : plant.water === 'Medium' ? 'text-blue-400' : 'text-blue-300'}`} />
                <Wind className={`w-4 h-4 ${plant.humidity === 'High' ? 'text-cyan-500' : plant.humidity === 'Medium' ? 'text-cyan-400' : 'text-gray-400'}`} />
                {plant.petFriendly && <Award className="w-4 h-4 text-green-500" title="Pet Friendly" />}
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(plant.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({plant.reviews})</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{plant.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#2d6a4f]">${plant.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(plant)}
                  className="bg-[#2d6a4f] text-white px-4 py-2 rounded-lg hover:bg-[#40916c] transition-colors flex items-center gap-2"
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

  // Page: Care Guides
  const CareGuidesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-4">Plant Care Guides</h1>
      <p className="text-gray-600 mb-8">Learn everything you need to keep your plants thriving</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {careGuides.map(guide => (
          <div key={guide.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48">
              <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-[#52b788] text-white rounded-full text-sm font-semibold">
                  {guide.category}
                </span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {guide.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#2d6a4f] mb-2">{guide.title}</h3>
              <p className="text-gray-700 mb-4">{guide.excerpt}</p>
              <button className="text-[#2d6a4f] font-semibold hover:text-[#40916c] transition-colors">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Common Care Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Droplets, title: 'Watering', tip: 'Most plants prefer soil to dry out between waterings' },
            { icon: Sun, title: 'Light', tip: 'Bright indirect light works for most houseplants' },
            { icon: ThermometerSun, title: 'Temperature', tip: 'Keep plants between 65-75°F for best results' },
            { icon: Wind, title: 'Humidity', tip: 'Group plants together or use a humidifier' }
          ].map(({ icon: Icon, title, tip }) => (
            <div key={title} className="flex gap-4">
              <Icon className="w-12 h-12 text-[#2d6a4f] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-gray-600">{tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Page: Plant Quiz
  const QuizPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-4">Find Your Perfect Plant</h1>
      <p className="text-gray-600 mb-8">Answer a few questions to discover plants that match your lifestyle</p>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">How much natural light does your space get?</label>
            <div className="grid grid-cols-3 gap-3">
              {['Low Light', 'Medium Light', 'Bright Light'].map(light => (
                <button key={light} className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white transition-colors">
                  {light}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">What's your experience level?</label>
            <div className="grid grid-cols-3 gap-3">
              {['Beginner', 'Intermediate', 'Expert'].map(level => (
                <button key={level} className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white transition-colors">
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">Do you have pets?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Yes, show me pet-safe plants', 'No pets'].map(option => (
                <button key={option} className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white transition-colors text-left">
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">How often can you water?</label>
            <div className="grid grid-cols-3 gap-3">
              {['Once a week', '2-3 times a week', 'Every few days'].map(freq => (
                <button key={freq} className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white transition-colors">
                  {freq}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">What size plant are you looking for?</label>
            <div className="grid grid-cols-3 gap-3">
              {['Small (desk)', 'Medium (table)', 'Large (floor)'].map(size => (
                <button key={size} className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white transition-colors">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-[#2d6a4f] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#40916c] transition-colors">
            Show My Matches
          </button>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h3 className="text-xl font-bold text-[#2d6a4f] mb-4">Recommended For You</h3>
          <div className="grid grid-cols-2 gap-4">
            {plants.slice(0, 2).map(plant => (
              <div key={plant.id} className="border rounded-lg p-4">
                <img src={plant.image} alt={plant.name} className="w-full h-32 object-cover rounded mb-3" />
                <h4 className="font-bold mb-1">{plant.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{plant.difficulty}</p>
                <button
                  onClick={() => addToCart(plant)}
                  className="w-full bg-[#2d6a4f] text-white px-4 py-2 rounded-lg hover:bg-[#40916c] transition-colors text-sm"
                >
                  Add to Cart - ${plant.price.toFixed(2)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Page: Subscriptions
  const SubscriptionsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Gift className="w-16 h-16 text-[#2d6a4f] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-[#2d6a4f] mb-4">Plant Subscriptions</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Get curated plants delivered monthly. Grow your collection effortlessly with expert selections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {subscriptions.map((sub, index) => (
          <div
            key={sub.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              index === 1 ? 'ring-4 ring-[#2d6a4f] transform scale-105' : ''
            }`}
          >
            {index === 1 && (
              <div className="bg-[#2d6a4f] text-white text-center py-2 font-bold">
                MOST POPULAR
              </div>
            )}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#2d6a4f] mb-2">{sub.name}</h3>
              <p className="text-gray-600 mb-6">{sub.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#2d6a4f]">${sub.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <div className="mb-6">
                <p className="text-gray-700 font-semibold mb-2">{sub.plantsPerMonth} {sub.plantsPerMonth === 1 ? 'Plant' : 'Plants'} Per Month</p>
              </div>
              <ul className="space-y-3 mb-8">
                {sub.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6 text-center">Subscription Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Award, title: 'Expert Curation', desc: 'Hand-picked by botanists' },
            { icon: TruckIcon, title: 'Free Shipping', desc: 'Always included' },
            { icon: BookOpen, title: 'Care Guides', desc: 'Detailed instructions' },
            { icon: Gift, title: 'Exclusive Varieties', desc: 'Rare & unique plants' }
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <Icon className="w-12 h-12 text-[#2d6a4f] mx-auto mb-3" />
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Page: Delivery
  const DeliveryPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-4">Delivery Information</h1>
      <p className="text-gray-600 mb-8">We ensure your plants arrive healthy and happy</p>

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">How We Ship</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#52b788] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mb-3 mx-auto">1</div>
              <h3 className="font-bold text-lg mb-2">Careful Packaging</h3>
              <p className="text-gray-600">Plants secured with custom packaging to prevent damage</p>
            </div>
            <div className="text-center">
              <div className="bg-[#52b788] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mb-3 mx-auto">2</div>
              <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
              <p className="text-gray-600">2-4 business days with tracking included</p>
            </div>
            <div className="text-center">
              <div className="bg-[#52b788] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mb-3 mx-auto">3</div>
              <h3 className="font-bold text-lg mb-2">Unbox & Enjoy</h3>
              <p className="text-gray-600">Care instructions and tips included in every shipment</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Shipping Options</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
              <div>
                <h3 className="font-bold text-lg">Standard Shipping</h3>
                <p className="text-gray-600">4-6 business days</p>
              </div>
              <span className="font-bold text-[#2d6a4f]">$8.99</span>
            </div>
            <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
              <div>
                <h3 className="font-bold text-lg">Express Shipping</h3>
                <p className="text-gray-600">2-3 business days</p>
              </div>
              <span className="font-bold text-[#2d6a4f]">$14.99</span>
            </div>
            <div className="flex items-center justify-between p-4 border-2 border-[#2d6a4f] rounded-lg bg-green-50">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Free Shipping
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </h3>
                <p className="text-gray-600">On orders over $50</p>
              </div>
              <span className="font-bold text-[#2d6a4f]">FREE</span>
            </div>
          </div>
        </div>

        <div className="bg-[#2d6a4f] text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">30-Day Plant Guarantee</h2>
          <p className="text-lg mb-4">
            If your plant arrives damaged or doesn't thrive within 30 days, we'll replace it free of charge.
          </p>
          <p className="text-gray-200">
            Your satisfaction and your plant's health are our top priorities.
          </p>
        </div>
      </div>
    </div>
  );

  // Page: Cart
  const CartPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#2d6a4f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
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
                  <p className="text-gray-600 text-sm mb-2 italic">{item.scientificName}</p>
                  <p className="text-sm text-gray-600 mb-3">{item.difficulty} • {item.size}</p>
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
                    <span className="text-xl font-bold text-[#2d6a4f]">
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
              <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{cartTotal >= 50 ? 'FREE' : '$8.99'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-[#2d6a4f]">
                    ${((cartTotal >= 50 ? cartTotal : cartTotal + 8.99) * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              {cartTotal < 50 && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <button className="w-full bg-[#2d6a4f] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#40916c] transition-colors mb-3">
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
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-[#2d6a4f] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#2d6a4f]">Jane Green</h2>
              <p className="text-gray-600">jane.green@email.com</p>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-[#2d6a4f]">
                Order History
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-[#2d6a4f]">
                Subscriptions
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-[#2d6a4f]">
                Wishlist ({wishlist.length})
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold text-[#2d6a4f]">
                Account Settings
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {[
                { id: '#2024-101', date: 'May 20, 2024', status: 'Delivered', total: 89.97, items: 2 },
                { id: '#2024-102', date: 'May 15, 2024', status: 'In Transit', total: 124.98, items: 3 },
                { id: '#2024-103', date: 'May 8, 2024', status: 'Delivered', total: 45.99, items: 1 }
              ].map(order => (
                <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-[#2d6a4f]">{order.id}</span>
                      <span className="text-gray-600 ml-4">{order.date}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{order.items} plants</span>
                    <span className="font-bold text-[#2d6a4f]">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Active Subscription</h2>
            <div className="border-2 border-[#2d6a4f] rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#2d6a4f]">Jungle Builder</h3>
                  <p className="text-gray-600">2 plants per month</p>
                </div>
                <Gift className="w-8 h-8 text-[#52b788]" />
              </div>
              <p className="text-gray-700 mb-4">Next delivery: June 1, 2024</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-[#2d6a4f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#40916c] transition-colors">
                  Manage Subscription
                </button>
                <button className="px-4 py-2 border-2 border-[#2d6a4f] text-[#2d6a4f] rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Pause
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Wishlist</h2>
            {wishlist.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No plants in your wishlist</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {plants.filter(plant => wishlist.includes(plant.id)).map(plant => (
                  <div key={plant.id} className="border rounded-lg p-4">
                    <img src={plant.image} alt={plant.name} className="w-full h-32 object-cover rounded mb-3" />
                    <h4 className="font-bold mb-1">{plant.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">${plant.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(plant)}
                      className="w-full bg-[#2d6a4f] text-white px-4 py-2 rounded-lg hover:bg-[#40916c] transition-colors text-sm"
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

  // Page: Blog
  const BlogPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-4">Plant Blog</h1>
      <p className="text-gray-600 mb-8">Tips, tricks, and inspiration for plant lovers</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: '10 Easy Plants for Beginners',
            category: 'Getting Started',
            image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=600&h=400&fit=crop',
            excerpt: 'Start your plant journey with these foolproof favorites.',
            date: 'May 25, 2024'
          },
          {
            title: 'Creating a Plant Care Routine',
            category: 'Tips & Tricks',
            image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop',
            excerpt: 'Establish habits that keep your plants thriving all year.',
            date: 'May 20, 2024'
          },
          {
            title: 'The Best Air-Purifying Plants',
            category: 'Plant Benefits',
            image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=400&fit=crop',
            excerpt: 'Breathe easier with these natural air cleaners.',
            date: 'May 15, 2024'
          }
        ].map((post, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-[#52b788] text-white rounded-full text-sm font-semibold">
                  {post.category}
                </span>
                <span className="text-sm text-gray-600">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-[#2d6a4f] mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <button className="text-[#2d6a4f] font-semibold hover:text-[#40916c] transition-colors">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Contact
  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent">
                  <option>General Question</option>
                  <option>Order Support</option>
                  <option>Plant Care Help</option>
                  <option>Subscription Question</option>
                  <option>Partnership Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Get In Touch</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-700 mb-1">Email</p>
                <a href="mailto:hello@urbanjungle.com" className="text-[#2d6a4f] hover:underline">
                  hello@urbanjungle.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">Phone</p>
                <a href="tel:555-PLANTS-1" className="text-[#2d6a4f] hover:underline">
                  (555) PLANTS-1
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">Hours</p>
                <p className="text-gray-600">Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm<br />Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Plant Care Hotline</h2>
            <p className="text-gray-700 mb-4">
              Need urgent plant help? Our expert botanists are available to answer your questions.
            </p>
            <button className="w-full bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors">
              Call Plant Hotline
            </button>
          </div>

          <div className="bg-[#2d6a4f] text-white rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">Visit Our Greenhouse</h3>
            <p className="mb-4">123 Green Street<br />Plant City, PC 12345</p>
            <p className="text-gray-200">Open for in-person shopping and plant consultations</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-[#2d6a4f] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-[#52b788]" />
              <span className="text-xl font-bold">Urban Jungle</span>
            </div>
            <p className="text-gray-300 text-sm">
              Bringing nature into your home, one plant at a time.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">All Plants</button></li>
              <li><button onClick={() => setCurrentPage('subscriptions')} className="hover:text-white">Subscriptions</button></li>
              <li><button onClick={() => setCurrentPage('care-guides')} className="hover:text-white">Care Guides</button></li>
              <li><button onClick={() => setCurrentPage('blog')} className="hover:text-white">Blog</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact Us</button></li>
              <li><button className="hover:text-white">FAQ</button></li>
              <li><button onClick={() => setCurrentPage('delivery')} className="hover:text-white">Shipping Info</button></li>
              <li><button className="hover:text-white">Returns</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button className="hover:text-white">About Us</button></li>
              <li><button className="hover:text-white">Our Mission</button></li>
              <li><button className="hover:text-white">Sustainability</button></li>
              <li><button className="hover:text-white">Careers</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#40916c] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Urban Jungle Plant Shop. All rights reserved.</p>
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
        {currentPage === 'care-guides' && <CareGuidesPage />}
        {currentPage === 'quiz' && <QuizPage />}
        {currentPage === 'subscriptions' && <SubscriptionsPage />}
        {currentPage === 'delivery' && <DeliveryPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'blog' && <BlogPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default UrbanJunglePlantShop;
