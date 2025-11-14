'use client';

import React, { useState } from 'react';
import { Heart, ShoppingCart, Gift, TruckIcon, Award, User, Star, Search, Filter, CheckCircle2, Clock, Calendar, Phone, MapPin, Package, Bone, Cat, Dog, Bird, Fish, Rabbit } from 'lucide-react';

// Types
interface PetProduct {
  id: string;
  name: string;
  category: string;
  petType: 'Dog' | 'Cat' | 'Bird' | 'Fish' | 'Small Pet' | 'All';
  price: number;
  image: string;
  description: string;
  brand: string;
  size: string;
  ingredients?: string[];
  features: string[];
  vetApproved: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  bestseller?: boolean;
}

interface PetProfile {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
}

interface Subscription {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  savings: string;
}

type Page = 'home' | 'shop' | 'subscriptions' | 'sale' | 'auto-delivery' | 'vet-approved' | 'cart' | 'account' | 'resources' | 'contact';

const HappyPawsPetSupplies = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<Array<PetProduct & { quantity: number }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPetType, setSelectedPetType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [petProfiles, setPetProfiles] = useState<PetProfile[]>([
    { id: '1', name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: 3, weight: 65 }
  ]);

  // Sample Data
  const products: PetProduct[] = [
    {
      id: '1',
      name: 'Premium Grain-Free Dog Food',
      category: 'Food',
      petType: 'Dog',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=600&fit=crop',
      description: 'High-protein, grain-free formula for adult dogs.',
      brand: 'PawPremium',
      size: '30 lbs',
      ingredients: ['Chicken', 'Sweet Potato', 'Peas', 'Blueberries', 'Vitamins'],
      features: ['Grain-free', 'High protein', 'No artificial flavors', 'Made in USA'],
      vetApproved: true,
      rating: 4.8,
      reviews: 542,
      inStock: true,
      bestseller: true
    },
    {
      id: '2',
      name: 'Indoor Cat Formula',
      category: 'Food',
      petType: 'Cat',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=400&h=600&fit=crop',
      description: 'Specially formulated for indoor cats with hairball control.',
      brand: 'FelineFresh',
      size: '15 lbs',
      ingredients: ['Salmon', 'Rice', 'Cranberries', 'Omega-3', 'Taurine'],
      features: ['Hairball control', 'Weight management', 'Indoor formula', 'Rich in omega-3'],
      vetApproved: true,
      rating: 4.7,
      reviews: 423,
      inStock: true,
      bestseller: true
    },
    {
      id: '3',
      name: 'Orthopedic Dog Bed',
      category: 'Beds & Furniture',
      petType: 'Dog',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=600&fit=crop',
      description: 'Memory foam bed for superior joint support.',
      brand: 'ComfyPaws',
      size: 'Large (40x30")',
      features: ['Memory foam', 'Removable cover', 'Machine washable', 'Non-slip bottom'],
      vetApproved: true,
      rating: 4.9,
      reviews: 389,
      inStock: true
    },
    {
      id: '4',
      name: 'Interactive Cat Toy Set',
      category: 'Toys',
      petType: 'Cat',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1545529468-42764ef8c85f?w=400&h=600&fit=crop',
      description: '10-piece variety toy set to keep cats entertained.',
      brand: 'PlayfulPaws',
      size: 'Variety Pack',
      features: ['10 different toys', 'Catnip included', 'Feathers & bells', 'Safe materials'],
      vetApproved: false,
      rating: 4.6,
      reviews: 267,
      inStock: true
    },
    {
      id: '5',
      name: 'Puppy Training Treats',
      category: 'Treats',
      petType: 'Dog',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=600&fit=crop',
      description: 'Soft, low-calorie treats perfect for training.',
      brand: 'TreatTime',
      size: '1 lb bag',
      ingredients: ['Chicken', 'Oats', 'Pumpkin', 'Vitamins'],
      features: ['Low calorie', 'Soft texture', 'All natural', 'No preservatives'],
      vetApproved: true,
      rating: 4.8,
      reviews: 634,
      inStock: true,
      bestseller: true
    },
    {
      id: '6',
      name: 'Automatic Pet Feeder',
      category: 'Feeders & Waterers',
      petType: 'All',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1609897838482-e1f87a00e4c5?w=400&h=600&fit=crop',
      description: 'Programmable feeder with 6-meal capacity.',
      brand: 'SmartFeed',
      size: '6L capacity',
      features: ['6 meal portions', 'Voice recording', 'Battery backup', 'Easy to clean'],
      vetApproved: false,
      rating: 4.5,
      reviews: 312,
      inStock: true
    },
    {
      id: '7',
      name: 'Premium Bird Seed Mix',
      category: 'Food',
      petType: 'Bird',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=600&fit=crop',
      description: 'Nutritious blend for parrots and cockatiels.',
      brand: 'BirdBest',
      size: '5 lbs',
      ingredients: ['Sunflower seeds', 'Millet', 'Dried fruits', 'Nuts'],
      features: ['No fillers', 'Vitamin enriched', 'Fresh ingredients', 'Resealable bag'],
      vetApproved: true,
      rating: 4.7,
      reviews: 198,
      inStock: true
    },
    {
      id: '8',
      name: 'Dental Chew Sticks',
      category: 'Dental Care',
      petType: 'Dog',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=600&fit=crop',
      description: 'Helps reduce tartar and freshen breath.',
      brand: 'DentalPaws',
      size: '30 count',
      features: ['Reduces tartar', 'Freshens breath', 'Digestible', 'Vet recommended'],
      vetApproved: true,
      rating: 4.6,
      reviews: 456,
      inStock: true
    }
  ];

  const subscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Essential Care',
      price: 39.99,
      description: 'Perfect for single pet households',
      features: ['Auto-delivery every 4 weeks', '5% off all orders', 'Free shipping', 'Skip or cancel anytime', 'Flexible delivery schedule'],
      savings: 'Save 5%'
    },
    {
      id: '2',
      name: 'Premium Care',
      price: 69.99,
      description: 'Best for multi-pet families',
      features: ['Auto-delivery every 4 weeks', '10% off all orders', 'Free priority shipping', 'Birthday treats for pets', 'Exclusive member deals', 'Flexible delivery'],
      savings: 'Save 10%'
    },
    {
      id: '3',
      name: 'VIP Care',
      price: 99.99,
      description: 'Ultimate pet care package',
      features: ['Auto-delivery on your schedule', '15% off everything', 'Free express shipping', 'Monthly surprise toy', 'Vet consultation hotline', '24/7 support', 'Pet birthday gifts'],
      savings: 'Save 15%'
    }
  ];

  const categories = ['All', 'Food', 'Treats', 'Toys', 'Beds & Furniture', 'Feeders & Waterers', 'Dental Care', 'Grooming', 'Health'];
  const petTypes = ['All', 'Dog', 'Cat', 'Bird', 'Fish', 'Small Pet'];

  // Cart functions
  const addToCart = (product: PetProduct) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
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

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPetType = selectedPetType === 'All' || product.petType === selectedPetType || product.petType === 'All';
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesPetType && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'rating': return b.rating - a.rating;
      default: return b.reviews - a.reviews;
    }
  });

  // Navigation
  const Navigation = () => (
    <nav className="bg-[#264653] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-[#f4a261]" />
            <div>
              <h1 className="text-2xl font-bold">Happy Paws</h1>
              <p className="text-xs text-[#f4a261]">Pet Supplies & Care</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-[#f4a261] transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="hover:text-[#f4a261] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative hover:text-[#f4a261] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e76f51] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { page: 'home' as Page, label: 'Home', icon: Heart },
            { page: 'shop' as Page, label: 'Shop by Pet', icon: ShoppingCart },
            { page: 'subscriptions' as Page, label: 'Subscriptions', icon: Gift },
            { page: 'sale' as Page, label: 'Sale', icon: Award },
            { page: 'auto-delivery' as Page, label: 'Auto-Delivery', icon: TruckIcon },
            { page: 'vet-approved' as Page, label: 'Vet Approved', icon: CheckCircle2 },
            { page: 'resources' as Page, label: 'Resources', icon: Award },
            { page: 'contact' as Page, label: 'Contact', icon: Phone }
          ].map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                currentPage === page ? 'bg-[#f4a261] text-white' : 'bg-[#e76f51] hover:bg-[#f4a261]'
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
      <div className="relative h-[500px] bg-gradient-to-r from-[#264653] to-[#e76f51] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Everything Your Pet Needs</h1>
            <p className="text-xl mb-6">Premium food, toys, and supplies with free delivery</p>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="bg-[#f4a261] px-8 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
              >
                Shop Now
              </button>
              <button
                onClick={() => setCurrentPage('subscriptions')}
                className="bg-white text-[#264653] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Auto-Delivery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Pet Type */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#264653] mb-8 text-center">Shop by Pet</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { type: 'Dog', icon: Dog, color: 'bg-[#e76f51]' },
              { type: 'Cat', icon: Cat, color: 'bg-[#f4a261]' },
              { type: 'Bird', icon: Bird, color: 'bg-[#264653]' },
              { type: 'Fish', icon: Fish, color: 'bg-[#2a9d8f]' },
              { type: 'Small Pet', icon: Rabbit, color: 'bg-[#e9c46a]' }
            ].map(({ type, icon: Icon, color }) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedPetType(type);
                  setCurrentPage('shop');
                }}
                className={`${color} text-white p-8 rounded-lg hover:opacity-90 transition-opacity`}
              >
                <Icon className="w-16 h-16 mx-auto mb-3" />
                <h3 className="font-bold text-lg">{type}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: TruckIcon, title: 'Free Shipping', desc: 'On orders over $35' },
              { icon: Award, title: 'Vet Approved', desc: 'Trusted by veterinarians' },
              { icon: Gift, title: 'Auto-Delivery', desc: 'Save up to 15%' },
              { icon: CheckCircle2, title: '100% Guarantee', desc: 'Love it or return it' }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <Icon className="w-12 h-12 text-[#264653] mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bestsellers */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#264653] mb-8">Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.filter(p => p.bestseller).map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  {product.vetApproved && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Vet Approved
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#264653]">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#264653] text-white px-4 py-2 rounded-lg hover:bg-[#e76f51] transition-colors"
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

      {/* Auto-Delivery CTA */}
      <div className="py-16 bg-[#264653] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <TruckIcon className="w-16 h-16 mx-auto mb-4 text-[#f4a261]" />
          <h2 className="text-3xl font-bold mb-4">Never Run Out with Auto-Delivery</h2>
          <p className="text-lg mb-6">Save up to 15% and get free shipping on every order</p>
          <button
            onClick={() => setCurrentPage('auto-delivery')}
            className="bg-[#f4a261] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );

  // Page: Shop
  const ShopPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-8">Shop Pet Supplies</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pet Type</label>
            <select
              value={selectedPetType}
              onChange={(e) => setSelectedPetType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
            >
              {petTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
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

      <p className="text-gray-600 mb-6">Showing {sortedProducts.length} products</p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              {product.vetApproved && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Vet
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.brand} • {product.size}</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#264653]">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[#264653] text-white px-4 py-2 rounded-lg hover:bg-[#e76f51] transition-colors flex items-center gap-2"
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

  // Other pages abbreviated for space
  const SubscriptionsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Gift className="w-16 h-16 text-[#264653] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-[#264653] mb-4">Auto-Delivery Subscriptions</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Save up to 15% and never worry about running out of pet essentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subscriptions.map((sub, index) => (
          <div key={sub.id} className={`bg-white rounded-lg shadow-lg overflow-hidden ${index === 1 ? 'ring-4 ring-[#264653] transform scale-105' : ''}`}>
            {index === 1 && (
              <div className="bg-[#264653] text-white text-center py-2 font-bold">MOST POPULAR</div>
            )}
            <div className="p-8">
              <div className="text-center mb-4">
                <div className="inline-block bg-[#f4a261] text-white px-4 py-2 rounded-full font-bold mb-2">
                  {sub.savings}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#264653] mb-2 text-center">{sub.name}</h3>
              <p className="text-gray-600 mb-6 text-center">{sub.description}</p>
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold text-[#264653]">${sub.price}</span>
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
              <button className="w-full bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors">
                Start Subscription
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SalePage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-4">Sale Items</h1>
      <p className="text-gray-600 mb-8">Save big on premium pet supplies</p>
      <div className="bg-[#e76f51] text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Up to 40% Off Selected Items!</h2>
        <p className="text-lg">Limited time offers on your pet's favorites</p>
      </div>
    </div>
  );

  const AutoDeliveryPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-4">Auto-Delivery Program</h1>
      <p className="text-gray-600 mb-8">Never run out of pet essentials with automatic deliveries</p>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#264653] mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-[#f4a261] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mb-3 mx-auto">1</div>
            <h3 className="font-bold text-lg mb-2">Choose Products</h3>
            <p className="text-gray-600">Select items and delivery frequency</p>
          </div>
          <div className="text-center">
            <div className="bg-[#f4a261] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mb-3 mx-auto">2</div>
            <h3 className="font-bold text-lg mb-2">Save Automatically</h3>
            <p className="text-gray-600">Get up to 15% off every order</p>
          </div>
          <div className="text-center">
            <div className="bg-[#f4a261] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mb-3 mx-auto">3</div>
            <h3 className="font-bold text-lg mb-2">Modify Anytime</h3>
            <p className="text-gray-600">Skip, cancel, or change schedule</p>
          </div>
        </div>
      </div>
    </div>
  );

  const VetApprovedPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-4">Vet Approved Products</h1>
      <p className="text-gray-600 mb-8">Trusted by veterinarians for your pet's health</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.filter(p => p.vetApproved).map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold mb-2">{product.name}</h3>
              <p className="text-xl font-bold text-[#264653]">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#264653] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
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
                  <p className="text-gray-600 text-sm mb-3">{item.brand} • {item.size}</p>
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
                    <span className="text-xl font-bold text-[#264653]">
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
              <h2 className="text-2xl font-bold text-[#264653] mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{cartTotal >= 35 ? 'FREE' : '$5.99'}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-[#264653]">
                    ${(cartTotal >= 35 ? cartTotal : cartTotal + 5.99).toFixed(2)}
                  </span>
                </div>
              </div>
              <button className="w-full bg-[#264653] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#e76f51] transition-colors mb-3">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AccountPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-8">My Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#264653] mb-4">My Pets</h2>
          {petProfiles.map(pet => (
            <div key={pet.id} className="border-b pb-4 mb-4">
              <h3 className="font-bold">{pet.name}</h3>
              <p className="text-sm text-gray-600">{pet.type} • {pet.breed}</p>
              <p className="text-sm text-gray-600">{pet.age} years • {pet.weight} lbs</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ResourcesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-4">Pet Care Resources</h1>
      <p className="text-gray-600 mb-8">Expert tips and guides for pet parents</p>
    </div>
  );

  const ContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-8">Contact Us</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#264653] mb-6">Get In Touch</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653]"></textarea>
          </div>
          <button className="w-full bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-[#264653] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-[#f4a261]" />
              <span className="text-xl font-bold">Happy Paws</span>
            </div>
            <p className="text-gray-300 text-sm">Everything your pet needs to thrive</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">All Products</button></li>
              <li><button onClick={() => setCurrentPage('sale')} className="hover:text-white">Sale</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
              <li><button onClick={() => setCurrentPage('resources')} className="hover:text-white">Resources</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button className="hover:text-white">About Us</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#e76f51] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Happy Paws Pet Supplies. All rights reserved.</p>
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
        {currentPage === 'sale' && <SalePage />}
        {currentPage === 'auto-delivery' && <AutoDeliveryPage />}
        {currentPage === 'vet-approved' && <VetApprovedPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'resources' && <ResourcesPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default HappyPawsPetSupplies;
