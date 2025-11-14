'use client';

import React, { useState } from 'react';
import {
  ShoppingCart, Menu, X, Heart, User, Search, ChevronDown, Star,
  Clock, Award, Package, Repeat, MapPin, Phone, Mail, Tag, Filter,
  TrendingUp, DollarSign, Check, AlertCircle, ShoppingBag, ChevronRight,
  Calendar, Truck, Shield
} from 'lucide-react';

type Page = 'home' | 'shop' | 'subscriptions' | 'sale' | 'auto-delivery' | 'vet-approved' | 'cart' | 'account' | 'resources' | 'contact';
type PetType = 'all' | 'dog' | 'cat' | 'bird' | 'fish' | 'small-pet';

interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  petType: PetType[];
  rating: number;
  reviews: number;
  vetApproved?: boolean;
  subscription?: boolean;
  autoDelivery?: boolean;
  inStock: boolean;
  breed?: string[];
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  petName: string;
  petPhoto: string;
  verified: boolean;
}

interface PetProfile {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  photo: string;
}

const CustomerView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPetType, setSelectedPetType] = useState<PetType>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Premium Grain-Free Dog Food',
      price: 54.99,
      salePrice: 44.99,
      image: '🦴',
      category: 'Food',
      petType: ['dog'],
      rating: 4.8,
      reviews: 342,
      vetApproved: true,
      subscription: true,
      autoDelivery: true,
      inStock: true,
      breed: ['Golden Retriever', 'Labrador', 'German Shepherd']
    },
    {
      id: 2,
      name: 'Organic Cat Treats - Salmon',
      price: 12.99,
      image: '🐟',
      category: 'Treats',
      petType: ['cat'],
      rating: 4.9,
      reviews: 428,
      vetApproved: true,
      subscription: true,
      autoDelivery: true,
      inStock: true
    },
    {
      id: 3,
      name: 'Interactive Dog Toy Set',
      price: 29.99,
      salePrice: 22.99,
      image: '🎾',
      category: 'Toys',
      petType: ['dog'],
      rating: 4.7,
      reviews: 215,
      inStock: true
    },
    {
      id: 4,
      name: 'Self-Cleaning Cat Litter Box',
      price: 149.99,
      image: '🏠',
      category: 'Supplies',
      petType: ['cat'],
      rating: 4.6,
      reviews: 187,
      inStock: true
    },
    {
      id: 5,
      name: 'Bird Seed Premium Mix',
      price: 18.99,
      image: '🌾',
      category: 'Food',
      petType: ['bird'],
      rating: 4.8,
      reviews: 156,
      subscription: true,
      autoDelivery: true,
      inStock: true
    },
    {
      id: 6,
      name: 'Aquarium Filter System',
      price: 79.99,
      salePrice: 64.99,
      image: '💧',
      category: 'Supplies',
      petType: ['fish'],
      rating: 4.7,
      reviews: 98,
      inStock: true
    },
    {
      id: 7,
      name: 'Small Pet Habitat Deluxe',
      price: 89.99,
      image: '🏰',
      category: 'Supplies',
      petType: ['small-pet'],
      rating: 4.9,
      reviews: 124,
      inStock: true
    },
    {
      id: 8,
      name: 'Vet-Approved Dental Chews',
      price: 24.99,
      image: '🦷',
      category: 'Health',
      petType: ['dog'],
      rating: 4.8,
      reviews: 389,
      vetApproved: true,
      subscription: true,
      autoDelivery: true,
      inStock: true
    },
    {
      id: 9,
      name: 'Cat Scratching Post Tower',
      price: 59.99,
      salePrice: 49.99,
      image: '🗼',
      category: 'Furniture',
      petType: ['cat'],
      rating: 4.6,
      reviews: 203,
      inStock: true
    },
    {
      id: 10,
      name: 'Nutritional Supplement for Dogs',
      price: 34.99,
      image: '💊',
      category: 'Health',
      petType: ['dog'],
      rating: 4.7,
      reviews: 267,
      vetApproved: true,
      subscription: true,
      autoDelivery: true,
      inStock: true
    },
    {
      id: 11,
      name: 'Automatic Pet Feeder',
      price: 119.99,
      image: '⏰',
      category: 'Supplies',
      petType: ['dog', 'cat'],
      rating: 4.5,
      reviews: 145,
      inStock: true
    },
    {
      id: 12,
      name: 'Orthopedic Pet Bed - Large',
      price: 79.99,
      salePrice: 64.99,
      image: '🛏️',
      category: 'Furniture',
      petType: ['dog', 'cat'],
      rating: 4.9,
      reviews: 412,
      inStock: true
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      comment: 'My Golden Retriever absolutely loves this food! His coat is shinier and he has more energy.',
      petName: 'Max',
      petPhoto: '🐕',
      verified: true
    },
    {
      id: 2,
      author: 'Mike T.',
      rating: 5,
      date: '2024-01-10',
      comment: 'Best cat treats ever! My picky eater finally found something she loves.',
      petName: 'Luna',
      petPhoto: '🐈',
      verified: true
    },
    {
      id: 3,
      author: 'Jennifer L.',
      rating: 4,
      date: '2024-01-08',
      comment: 'Great quality toys. My dog plays with them every day!',
      petName: 'Buddy',
      petPhoto: '🦮',
      verified: true
    }
  ];

  const petProfiles: PetProfile[] = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '3 years',
      photo: '🐕'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Maine Coon',
      age: '2 years',
      photo: '🐈'
    }
  ];

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedPetType !== 'all' && !product.petType.includes(selectedPetType)) {
      return false;
    }
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    { name: 'Home', page: 'home' as Page },
    { name: 'Shop by Pet', page: 'shop' as Page },
    { name: 'Subscriptions', page: 'subscriptions' as Page },
    { name: 'Sale', page: 'sale' as Page },
    { name: 'Auto-Delivery', page: 'auto-delivery' as Page },
    { name: 'Vet Approved', page: 'vet-approved' as Page },
    { name: 'Resources', page: 'resources' as Page },
    { name: 'Contact', page: 'contact' as Page },
  ];

  const renderHeader = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="bg-[#264653] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Free Shipping on Orders $49+
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                100% Satisfaction Guarantee
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-4 h-4" />
              <span>1-800-HAPPY-PAWS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="text-4xl">🐾</div>
            <div>
              <h1 className="text-2xl font-bold text-[#264653]">Happy Paws</h1>
              <p className="text-xs text-[#e76f51] font-medium">Pet Supplies</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-[#f4a261]'
                    : 'text-gray-700 hover:text-[#e76f51]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setCurrentPage('account')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e76f51] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-[#f4a261] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f4a261] via-[#e76f51] to-[#264653] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🎉 New Customer? Get 20% Off First Order
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Everything Your Pet Needs, Delivered to Your Door
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Premium pet supplies with auto-delivery, vet-approved products, and breed-specific recommendations.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="bg-white text-[#264653] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => setCurrentPage('subscriptions')}
                  className="bg-[#264653] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a3640] transition-colors border-2 border-white/20"
                >
                  View Subscriptions
                </button>
              </div>
            </div>
            <div className="text-center text-8xl">
              🐕🐈🦜
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#f4a261]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[#f4a261]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $49</p>
            </div>
            <div className="text-center">
              <div className="bg-[#e76f51]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Repeat className="w-8 h-8 text-[#e76f51]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Auto-Delivery</h3>
              <p className="text-gray-600 text-sm">Save 10% on subscriptions</p>
            </div>
            <div className="text-center">
              <div className="bg-[#264653]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#264653]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Vet Approved</h3>
              <p className="text-gray-600 text-sm">Expert-recommended products</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f4a261]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#f4a261]" />
              </div>
              <h3 className="font-bold text-lg mb-2">100% Guarantee</h3>
              <p className="text-gray-600 text-sm">Full satisfaction or refund</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Pet Type */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#264653] mb-4">Shop by Pet</h2>
            <p className="text-gray-600 text-lg">Find everything your furry, feathered, or finned friend needs</p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { type: 'dog', icon: '🐕', name: 'Dogs', count: '500+ items' },
              { type: 'cat', icon: '🐈', name: 'Cats', count: '450+ items' },
              { type: 'bird', icon: '🦜', name: 'Birds', count: '200+ items' },
              { type: 'fish', icon: '🐠', name: 'Fish', count: '150+ items' },
              { type: 'small-pet', icon: '🐹', name: 'Small Pets', count: '180+ items' }
            ].map((pet) => (
              <button
                key={pet.type}
                onClick={() => {
                  setSelectedPetType(pet.type as PetType);
                  setCurrentPage('shop');
                }}
                className="bg-white p-8 rounded-xl hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#f4a261]"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{pet.icon}</div>
                <h3 className="font-bold text-lg mb-1">{pet.name}</h3>
                <p className="text-gray-500 text-sm">{pet.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#264653] mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Top-rated items loved by pets and their owners</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#f4a261] hover:shadow-lg transition-all group">
                <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">{product.image}</div>
                {product.vetApproved && (
                  <div className="inline-flex items-center gap-1 bg-[#264653] text-white text-xs px-2 py-1 rounded-full mb-2">
                    <Award className="w-3 h-3" />
                    Vet Approved
                  </div>
                )}
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl font-bold text-[#e76f51]">${product.salePrice}</span>
                      <span className="text-gray-400 line-through">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-[#264653]">${product.price}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#f4a261] text-white py-3 rounded-lg font-semibold hover:bg-[#e09451] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-Delivery CTA */}
      <section className="py-16 bg-gradient-to-r from-[#264653] to-[#2a5968] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl mb-6">📦⏰</div>
              <h2 className="text-4xl font-bold mb-4">Never Run Out Again</h2>
              <p className="text-xl mb-6 text-white/90">
                Set up auto-delivery and save 10% on every order. Choose your schedule, skip or cancel anytime.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-[#f4a261]" />
                  <span>10% off all auto-delivery orders</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-[#f4a261]" />
                  <span>Free shipping on all subscriptions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-[#f4a261]" />
                  <span>Flexible scheduling - change or cancel anytime</span>
                </li>
              </ul>
              <button
                onClick={() => setCurrentPage('auto-delivery')}
                className="bg-[#f4a261] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e09451] transition-colors"
              >
                Start Auto-Delivery
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#f4a261] w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold mb-1">Choose Your Products</h4>
                    <p className="text-white/80 text-sm">Select items and delivery frequency</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#f4a261] w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold mb-1">Save 10%</h4>
                    <p className="text-white/80 text-sm">Automatic discount on every order</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#f4a261] w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold mb-1">Delivered Automatically</h4>
                    <p className="text-white/80 text-sm">Right to your door, on your schedule</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews with Pet Photos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#264653] mb-4">Happy Pets, Happy Owners</h2>
            <p className="text-gray-600 text-lg">See what our furry customers think!</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{review.petPhoto}</div>
                  <div>
                    <div className="font-bold">{review.petName}</div>
                    <div className="text-sm text-gray-500">{review.author}</div>
                  </div>
                  {review.verified && (
                    <div className="ml-auto">
                      <div className="bg-[#264653] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Verified
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <p className="text-sm text-gray-400">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">💌</div>
          <h2 className="text-3xl font-bold text-[#264653] mb-4">Join the Happy Paws Family</h2>
          <p className="text-gray-600 text-lg mb-8">
            Get exclusive deals, pet care tips, and early access to new products!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f4a261]"
            />
            <button className="bg-[#e76f51] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d65d41] transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderShop = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#264653] mb-4">Shop by Pet</h1>
          <p className="text-gray-600 text-lg">Find the perfect products for your beloved companion</p>
        </div>

        {/* Pet Type Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedPetType('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedPetType === 'all'
                  ? 'bg-[#f4a261] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Pets
            </button>
            <button
              onClick={() => setSelectedPetType('dog')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                selectedPetType === 'dog'
                  ? 'bg-[#f4a261] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🐕</span> Dogs
            </button>
            <button
              onClick={() => setSelectedPetType('cat')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                selectedPetType === 'cat'
                  ? 'bg-[#f4a261] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🐈</span> Cats
            </button>
            <button
              onClick={() => setSelectedPetType('bird')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                selectedPetType === 'bird'
                  ? 'bg-[#f4a261] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🦜</span> Birds
            </button>
            <button
              onClick={() => setSelectedPetType('fish')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                selectedPetType === 'fish'
                  ? 'bg-[#f4a261] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🐠</span> Fish
            </button>
            <button
              onClick={() => setSelectedPetType('small-pet')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                selectedPetType === 'small-pet'
                  ? 'bg-[#f4a261] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🐹</span> Small Pets
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl p-6 hover:shadow-xl transition-all group border-2 border-gray-100 hover:border-[#f4a261]">
              <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">{product.image}</div>

              <div className="flex flex-wrap gap-2 mb-3">
                {product.vetApproved && (
                  <span className="inline-flex items-center gap-1 bg-[#264653] text-white text-xs px-2 py-1 rounded-full">
                    <Award className="w-3 h-3" />
                    Vet Approved
                  </span>
                )}
                {product.subscription && (
                  <span className="inline-flex items-center gap-1 bg-[#e76f51] text-white text-xs px-2 py-1 rounded-full">
                    <Repeat className="w-3 h-3" />
                    Subscribe
                  </span>
                )}
                {product.salePrice && (
                  <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    <Tag className="w-3 h-3" />
                    Sale
                  </span>
                )}
              </div>

              <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">({product.reviews})</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-[#e76f51]">${product.salePrice}</span>
                    <span className="text-gray-400 line-through text-sm">${product.price}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-[#264653]">${product.price}</span>
                )}
              </div>

              {product.breed && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Perfect for:</p>
                  <p className="text-xs font-medium text-[#f4a261]">{product.breed[0]}</p>
                </div>
              )}

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#f4a261] text-white py-3 rounded-lg font-semibold hover:bg-[#e09451] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">📦💝</div>
          <h1 className="text-4xl font-bold text-[#264653] mb-4">Subscription Plans</h1>
          <p className="text-gray-600 text-lg">Save 10% with our convenient subscription service</p>
        </div>

        {/* Subscription Benefits */}
        <div className="bg-gradient-to-r from-[#f4a261] to-[#e76f51] text-white p-8 rounded-2xl mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Subscribe?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <DollarSign className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Save 10%</h3>
                <p className="text-sm text-white/90">On every subscription order</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Free Shipping</h3>
                <p className="text-sm text-white/90">On all subscription items</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Flexible Schedule</h3>
                <p className="text-sm text-white/90">Skip, pause, or cancel anytime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Subscription Products */}
        <h2 className="text-2xl font-bold text-[#264653] mb-6">Popular Subscription Items</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {products.filter(p => p.subscription).map((product) => (
            <div key={product.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>

              <div className="bg-[#264653]/5 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Regular Price:</span>
                  <span className="text-gray-400 line-through">${product.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Subscription Price:</span>
                  <span className="text-2xl font-bold text-[#e76f51]">
                    ${(product.price * 0.9).toFixed(2)}
                  </span>
                </div>
                <div className="text-center mt-2">
                  <span className="inline-block bg-[#e76f51] text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Save ${(product.price * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Frequency
                </label>
                <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f4a261]">
                  <option>Every 2 weeks</option>
                  <option>Every 3 weeks</option>
                  <option>Every month</option>
                  <option>Every 6 weeks</option>
                  <option>Every 2 months</option>
                </select>
              </div>

              <button className="w-full bg-[#f4a261] text-white py-3 rounded-lg font-semibold hover:bg-[#e09451] transition-colors">
                Start Subscription
              </button>
            </div>
          ))}
        </div>

        {/* How Subscriptions Work */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-[#264653] mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#f4a261] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Choose Products</h3>
              <p className="text-gray-600 text-sm">Select items your pet loves</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f4a261] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Set Schedule</h3>
              <p className="text-gray-600 text-sm">Pick your delivery frequency</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f4a261] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Save Money</h3>
              <p className="text-gray-600 text-sm">Automatic 10% discount applied</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f4a261] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Delivered</h3>
              <p className="text-gray-600 text-sm">Right to your door, on time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSale = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🏷️💰</div>
          <h1 className="text-4xl font-bold text-[#264653] mb-4">Sale Items</h1>
          <p className="text-gray-600 text-lg">Amazing deals on premium pet supplies - limited time!</p>
        </div>

        {/* Sale Banner */}
        <div className="bg-gradient-to-r from-red-500 to-[#e76f51] text-white p-8 rounded-2xl mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">Flash Sale - Up to 40% Off!</h2>
          <p className="text-xl mb-4">Ends in 2 days, 14 hours, 32 minutes</p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-3xl font-bold">02</div>
              <div className="text-sm">Days</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-3xl font-bold">14</div>
              <div className="text-sm">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-3xl font-bold">32</div>
              <div className="text-sm">Minutes</div>
            </div>
          </div>
        </div>

        {/* Sale Products */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.filter(p => p.salePrice).map((product) => {
            const discount = Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100);
            return (
              <div key={product.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-red-200 relative">
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  -{discount}%
                </div>
                <div className="text-6xl mb-4 text-center">{product.image}</div>
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({product.reviews})</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-red-500">${product.salePrice}</span>
                    <span className="text-gray-400 line-through text-lg">${product.price}</span>
                  </div>
                  <p className="text-sm text-green-600 font-semibold mt-1">
                    You save ${(product.price - (product.salePrice || product.price)).toFixed(2)}!
                  </p>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAutoDelivery = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">📦⏰</div>
          <h1 className="text-4xl font-bold text-[#264653] mb-4">Auto-Delivery Service</h1>
          <p className="text-gray-600 text-lg">Never run out of your pet's essentials - save time and money!</p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-[#f4a261]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-[#f4a261]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Save 10%</h3>
            <p className="text-gray-600">Automatic discount on every auto-delivery order, no code needed</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-[#e76f51]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-[#e76f51]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Free Shipping</h3>
            <p className="text-gray-600">All auto-delivery orders ship free, regardless of order size</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-[#264653]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#264653]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Flexible Schedule</h3>
            <p className="text-gray-600">Choose delivery frequency - skip, pause, or cancel anytime</p>
          </div>
        </div>

        {/* How to Set Up */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-2xl font-bold text-[#264653] mb-6">How to Set Up Auto-Delivery</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#f4a261] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Add Items to Cart</h3>
                <p className="text-gray-600">Look for the "Auto-Delivery Available" badge on eligible products</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#f4a261] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Choose Delivery Frequency</h3>
                <p className="text-gray-600">Select how often you want to receive each product (every 2 weeks, monthly, etc.)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#f4a261] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Complete Checkout</h3>
                <p className="text-gray-600">Your 10% discount and free shipping will be automatically applied</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#f4a261] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Manage Your Schedule</h3>
                <p className="text-gray-600">View and modify your auto-delivery schedule anytime from your account</p>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Delivery Products */}
        <h2 className="text-2xl font-bold text-[#264653] mb-6">Popular Auto-Delivery Items</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {products.filter(p => p.autoDelivery).slice(0, 8).map((product) => (
            <div key={product.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-[#f4a261]/20">
              <div className="text-5xl mb-4 text-center">{product.image}</div>
              <div className="inline-flex items-center gap-1 bg-[#f4a261] text-white text-xs px-2 py-1 rounded-full mb-3">
                <Repeat className="w-3 h-3" />
                Auto-Delivery
              </div>
              <h3 className="font-bold mb-2">{product.name}</h3>
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Regular:</span>
                  <span className="line-through">${product.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Auto-Delivery:</span>
                  <span className="text-xl font-bold text-[#e76f51]">
                    ${(product.price * 0.9).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#f4a261] text-white py-2 rounded-lg font-semibold hover:bg-[#e09451] transition-colors text-sm"
              >
                Set Up Auto-Delivery
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVetApproved = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">⭐🏆</div>
          <h1 className="text-4xl font-bold text-[#264653] mb-4">Vet-Approved Products</h1>
          <p className="text-gray-600 text-lg">Recommended by veterinary professionals for your pet's health</p>
        </div>

        {/* Vet Approval Badge Info */}
        <div className="bg-gradient-to-r from-[#264653] to-[#2a5968] text-white p-8 rounded-2xl mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">What Does "Vet-Approved" Mean?</h2>
              <p className="text-white/90 mb-6">
                Our vet-approved products have been carefully reviewed and recommended by licensed veterinarians
                based on nutritional value, safety, and health benefits for your pets.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#f4a261]" />
                  <span>Reviewed by board-certified veterinarians</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#f4a261]" />
                  <span>High-quality, safe ingredients</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#f4a261]" />
                  <span>Proven health benefits</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#f4a261]" />
                  <span>Meets strict quality standards</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <div className="text-center mb-6">
                <div className="bg-[#f4a261] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold">Veterinarian Approved</h3>
                <p className="text-white/80 text-sm mt-2">Trusted by 5,000+ vets nationwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vet-Approved Products */}
        <h2 className="text-2xl font-bold text-[#264653] mb-6">Recommended Products</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.filter(p => p.vetApproved).map((product) => (
            <div key={product.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-[#264653]/20 relative">
              <div className="absolute top-4 right-4">
                <div className="bg-[#264653] text-white p-2 rounded-full">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="text-6xl mb-4 text-center">{product.image}</div>

              <div className="inline-flex items-center gap-1 bg-[#264653] text-white text-xs px-3 py-1 rounded-full mb-3">
                <Award className="w-3 h-3" />
                Vet Approved
              </div>

              <h3 className="font-bold text-lg mb-2">{product.name}</h3>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">({product.reviews})</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-xs text-gray-600 mb-1">Veterinarian Says:</p>
                <p className="text-sm text-gray-700 italic">
                  "Excellent quality and great for pet health and nutrition."
                </p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-[#e76f51]">${product.salePrice}</span>
                    <span className="text-gray-400 line-through">${product.price}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-[#264653]">${product.price}</span>
                )}
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#f4a261] text-white py-3 rounded-lg font-semibold hover:bg-[#e09451] transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#264653] mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-16 rounded-xl shadow-md text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-[#f4a261] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e09451] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex gap-6">
                    <div className="text-6xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.vetApproved && (
                          <span className="inline-flex items-center gap-1 bg-[#264653] text-white text-xs px-2 py-1 rounded-full">
                            <Award className="w-3 h-3" />
                            Vet Approved
                          </span>
                        )}
                        {item.subscription && (
                          <span className="inline-flex items-center gap-1 bg-[#e76f51] text-white text-xs px-2 py-1 rounded-full">
                            <Repeat className="w-3 h-3" />
                            Subscribe & Save 10%
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#f4a261] hover:bg-[#f4a261] hover:text-white transition-colors"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#f4a261] hover:bg-[#f4a261] hover:text-white transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.salePrice ? (
                            <>
                              <span className="text-2xl font-bold text-[#e76f51]">${item.salePrice}</span>
                              <span className="text-gray-400 line-through">${item.price}</span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-[#264653]">${item.price}</span>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Subtotal</p>
                          <p className="text-xl font-bold text-[#264653]">
                            ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
                <h2 className="text-2xl font-bold text-[#264653] mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItemCount} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-[#264653]">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">Free shipping applied!</span>
                  </div>
                </div>

                <button className="w-full bg-[#e76f51] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d65d41] transition-colors mb-3">
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => setCurrentPage('shop')}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </button>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-bold mb-3">Auto-Delivery Available</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Subscribe to eligible items and save 10% on every order!
                  </p>
                  <button className="w-full bg-[#264653] text-white py-2 rounded-lg font-semibold hover:bg-[#1a3640] transition-colors text-sm">
                    View Subscription Options
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAccount = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#264653] mb-8">My Account</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-[#f4a261] rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  👤
                </div>
                <h2 className="text-xl font-bold">Sarah Johnson</h2>
                <p className="text-gray-600">sarah.j@email.com</p>
              </div>
              <nav className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-[#f4a261] text-white font-semibold">
                  My Pets
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  Order History
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  Auto-Deliveries
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  Subscriptions
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  Addresses
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  Payment Methods
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pet Profiles */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#264653]">My Pets</h2>
                <button className="bg-[#f4a261] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e09451] transition-colors">
                  + Add Pet
                </button>
              </div>

              <div className="space-y-4">
                {petProfiles.map((pet) => (
                  <div key={pet.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#f4a261] transition-colors">
                    <div className="flex items-start gap-6">
                      <div className="text-6xl">{pet.photo}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{pet.name}</h3>
                            <p className="text-gray-600">{pet.breed}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              ✏️
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              🗑️
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Type</p>
                            <p className="font-semibold">{pet.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Breed</p>
                            <p className="font-semibold">{pet.breed}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Age</p>
                            <p className="font-semibold">{pet.age}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedPetType(pet.type.toLowerCase() as PetType);
                            setCurrentPage('shop');
                          }}
                          className="bg-[#264653] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1a3640] transition-colors"
                        >
                          Shop for {pet.name}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breed-Specific Recommendations */}
            <div className="bg-gradient-to-r from-[#f4a261] to-[#e76f51] p-8 rounded-xl text-white">
              <h2 className="text-2xl font-bold mb-4">Recommended for Max (Golden Retriever)</h2>
              <p className="mb-6">Products specially selected for your pet's breed and needs</p>
              <div className="grid md:grid-cols-2 gap-4">
                {products.filter(p => p.breed?.includes('Golden Retriever')).slice(0, 2).map((product) => (
                  <div key={product.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{product.image}</div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{product.name}</h3>
                        <p className="text-2xl font-bold">${product.salePrice || product.price}</p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-white text-[#264653] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reorder Shortcuts */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-[#264653] mb-6">Reorder Your Favorites</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="border-2 border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:border-[#f4a261] transition-colors">
                    <div className="text-4xl">{product.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{product.name}</h3>
                      <p className="text-lg font-bold text-[#264653]">${product.salePrice || product.price}</p>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#f4a261] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e09451] transition-colors whitespace-nowrap"
                    >
                      Reorder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">📚🐾</div>
          <h1 className="text-4xl font-bold text-[#264653] mb-4">Pet Care Resources</h1>
          <p className="text-gray-600 text-lg">Expert advice and guides for your furry friends</p>
        </div>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">📖</div>
            <h3 className="text-xl font-bold text-[#264653] mb-3">Care Guides</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive guides on pet nutrition, grooming, training, and health care
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Puppy Training 101</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Cat Behavior Guide</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Bird Care Basics</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Fish Tank Setup</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🍖</div>
            <h3 className="text-xl font-bold text-[#264653] mb-3">Nutrition Tips</h3>
            <p className="text-gray-600 mb-4">
              Learn about proper nutrition and feeding schedules for different pets
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Grain-Free Diet Guide</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Feeding by Age</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Food Allergies</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Healthy Treats</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🏥</div>
            <h3 className="text-xl font-bold text-[#264653] mb-3">Health & Wellness</h3>
            <p className="text-gray-600 mb-4">
              Expert advice on maintaining your pet's health and wellbeing
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Vaccination Schedule</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Dental Care Tips</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Common Health Issues</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#f4a261]" />
                <span>Senior Pet Care</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Featured Articles */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-2xl font-bold text-[#264653] mb-6">Featured Articles</h2>
          <div className="space-y-6">
            <div className="flex gap-6 pb-6 border-b">
              <div className="text-6xl">🦴</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">The Complete Guide to Dog Nutrition</h3>
                <p className="text-gray-600 mb-3">
                  Learn everything you need to know about feeding your dog, from puppyhood to senior years.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By Dr. Emily Chen, DVM</span>
                  <span>•</span>
                  <span>10 min read</span>
                </div>
              </div>
              <button className="text-[#f4a261] font-semibold hover:text-[#e09451]">
                Read More →
              </button>
            </div>

            <div className="flex gap-6 pb-6 border-b">
              <div className="text-6xl">🐱</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Understanding Cat Behavior: A Complete Guide</h3>
                <p className="text-gray-600 mb-3">
                  Decode your cat's body language and behaviors to strengthen your bond.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By Dr. Michael Torres, DVM</span>
                  <span>•</span>
                  <span>8 min read</span>
                </div>
              </div>
              <button className="text-[#f4a261] font-semibold hover:text-[#e09451]">
                Read More →
              </button>
            </div>

            <div className="flex gap-6">
              <div className="text-6xl">🏃</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Exercise and Enrichment for Indoor Pets</h3>
                <p className="text-gray-600 mb-3">
                  Keep your indoor pets happy, healthy, and mentally stimulated with these expert tips.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By Dr. Sarah Williams, DVM</span>
                  <span>•</span>
                  <span>12 min read</span>
                </div>
              </div>
              <button className="text-[#f4a261] font-semibold hover:text-[#e09451]">
                Read More →
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-[#264653] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="border-b pb-4">
              <summary className="font-semibold text-lg cursor-pointer hover:text-[#f4a261]">
                How do I choose the right food for my pet?
              </summary>
              <p className="text-gray-600 mt-3">
                Consider your pet's age, size, breed, and any health conditions. Our vet-approved products are
                labeled with recommendations for specific breeds and life stages.
              </p>
            </details>
            <details className="border-b pb-4">
              <summary className="font-semibold text-lg cursor-pointer hover:text-[#f4a261]">
                How does auto-delivery work?
              </summary>
              <p className="text-gray-600 mt-3">
                Choose your delivery frequency when adding items to cart. You'll save 10% automatically,
                and can skip, pause, or cancel anytime from your account.
              </p>
            </details>
            <details className="border-b pb-4">
              <summary className="font-semibold text-lg cursor-pointer hover:text-[#f4a261]">
                What makes a product "vet-approved"?
              </summary>
              <p className="text-gray-600 mt-3">
                Vet-approved products have been reviewed by licensed veterinarians for quality, safety,
                and health benefits based on current veterinary science.
              </p>
            </details>
            <details className="pb-4">
              <summary className="font-semibold text-lg cursor-pointer hover:text-[#f4a261]">
                Do you offer breed-specific recommendations?
              </summary>
              <p className="text-gray-600 mt-3">
                Yes! Create a pet profile in your account with breed information, and we'll recommend
                products specifically suited to your pet's breed characteristics.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">📞💬</div>
          <h1 className="text-4xl font-bold text-[#264653] mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">We're here to help! Reach out anytime.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-[#f4a261]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-[#f4a261]" />
            </div>
            <h3 className="font-bold text-lg mb-2">Phone</h3>
            <p className="text-gray-600 mb-4">Mon-Fri: 8am-8pm EST<br />Sat-Sun: 9am-6pm EST</p>
            <p className="text-2xl font-bold text-[#264653]">1-800-HAPPY-PAWS</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-[#e76f51]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-[#e76f51]" />
            </div>
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Response within 24 hours</p>
            <p className="text-lg font-semibold text-[#264653]">support@happypaws.com</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-[#264653]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-[#264653]" />
            </div>
            <h3 className="font-bold text-lg mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Mon-Sat: 10am-7pm<br />Sunday: 11am-5pm</p>
            <p className="text-sm text-[#264653]">123 Pet Supplies Lane<br />Austin, TX 78701</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-[#264653] mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f4a261]"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f4a261]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f4a261]"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f4a261]"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f4a261]">
                  <option>General Inquiry</option>
                  <option>Order Question</option>
                  <option>Product Question</option>
                  <option>Auto-Delivery Help</option>
                  <option>Subscription Help</option>
                  <option>Returns & Refunds</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f4a261]"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#e76f51] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d65d41] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#f4a261] to-[#e76f51] text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Quick Help</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Order Tracking</h4>
                  <p className="text-white/90 text-sm">Track your order anytime in your account dashboard</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Returns & Refunds</h4>
                  <p className="text-white/90 text-sm">100% satisfaction guarantee - 30 day returns</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Auto-Delivery</h4>
                  <p className="text-white/90 text-sm">Manage subscriptions in your account settings</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-[#264653] mb-4">Store Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold">11:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-[#264653] mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <button className="flex-1 bg-[#264653] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3640] transition-colors">
                  Facebook
                </button>
                <button className="flex-1 bg-[#264653] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3640] transition-colors">
                  Instagram
                </button>
                <button className="flex-1 bg-[#264653] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3640] transition-colors">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    <footer className="bg-[#264653] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">🐾</div>
              <div>
                <h3 className="text-xl font-bold">Happy Paws</h3>
                <p className="text-sm text-white/70">Pet Supplies</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">
              Your trusted source for premium pet supplies with auto-delivery and expert recommendations.
            </p>
            <div className="flex gap-3">
              <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">📘</button>
              <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">📸</button>
              <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">🐦</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">Shop by Pet</button></li>
              <li><button onClick={() => setCurrentPage('sale')} className="hover:text-white">Sale Items</button></li>
              <li><button onClick={() => setCurrentPage('vet-approved')} className="hover:text-white">Vet Approved</button></li>
              <li><button onClick={() => setCurrentPage('subscriptions')} className="hover:text-white">Subscriptions</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><button onClick={() => setCurrentPage('auto-delivery')} className="hover:text-white">Auto-Delivery</button></li>
              <li><button onClick={() => setCurrentPage('account')} className="hover:text-white">My Account</button></li>
              <li><button className="hover:text-white">Order Tracking</button></li>
              <li><button className="hover:text-white">Returns & Refunds</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><button onClick={() => setCurrentPage('resources')} className="hover:text-white">Pet Care Resources</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact Us</button></li>
              <li><button className="hover:text-white">Shipping Info</button></li>
              <li><button className="hover:text-white">FAQ</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © 2024 Happy Paws Pet Supplies. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            <button className="hover:text-white">Privacy Policy</button>
            <button className="hover:text-white">Terms of Service</button>
            <button className="hover:text-white">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}

      {currentPage === 'home' && renderHome()}
      {currentPage === 'shop' && renderShop()}
      {currentPage === 'subscriptions' && renderSubscriptions()}
      {currentPage === 'sale' && renderSale()}
      {currentPage === 'auto-delivery' && renderAutoDelivery()}
      {currentPage === 'vet-approved' && renderVetApproved()}
      {currentPage === 'cart' && renderCart()}
      {currentPage === 'account' && renderAccount()}
      {currentPage === 'resources' && renderResources()}
      {currentPage === 'contact' && renderContact()}

      {renderFooter()}
    </div>
  );
};

export default CustomerView;
