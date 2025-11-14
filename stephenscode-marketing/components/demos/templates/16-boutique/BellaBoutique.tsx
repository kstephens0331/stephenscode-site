'use client';

import React, { useState, useMemo } from 'react';
import {
  ShoppingCart, Heart, User, Search, Menu, X, Star,
  Filter, ChevronDown, ChevronUp, Minus, Plus, Trash2,
  MapPin, CreditCard, Package, Clock, Check, AlertCircle,
  Facebook, Instagram, Twitter, Mail, Phone, Tag
} from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

// Product Data
const products: Product[] = [
  {
    id: 1,
    name: "Floral Midi Dress",
    category: "Dresses",
    price: 89.99,
    salePrice: 67.49,
    image: "linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)",
    images: ["img1", "img2", "img3"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Lavender", "Blush", "Sage"],
    description: "Elegant floral midi dress perfect for any occasion. Features a flattering A-line silhouette and delicate flutter sleeves.",
    rating: 4.8,
    reviews: 124,
    isSale: true,
    discount: 25
  },
  {
    id: 2,
    name: "Silk Blouse",
    category: "Tops",
    price: 64.99,
    image: "linear-gradient(135deg, #e0aaff 0%, #c77dff 100%)",
    images: ["img1", "img2"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Black", "Purple"],
    description: "Luxurious silk blouse with pearl button details. Perfect for office or evening wear.",
    rating: 4.6,
    reviews: 89,
    isNew: true
  },
  {
    id: 3,
    name: "High-Rise Jeans",
    category: "Bottoms",
    price: 79.99,
    image: "linear-gradient(135deg, #c77dff 0%, #9d4edd 100%)",
    images: ["img1", "img2", "img3"],
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Dark Wash", "Light Wash", "Black"],
    description: "Classic high-rise jeans with a flattering fit. Made from premium stretch denim for all-day comfort.",
    rating: 4.9,
    reviews: 256,
    isNew: true
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    price: 129.99,
    salePrice: 97.49,
    image: "linear-gradient(135deg, #9d4edd 0%, #e0aaff 100%)",
    images: ["img1", "img2"],
    sizes: ["One Size"],
    colors: ["Tan", "Black", "Burgundy"],
    description: "Genuine leather crossbody bag with adjustable strap. Features multiple compartments for organization.",
    rating: 4.7,
    reviews: 167,
    isSale: true,
    discount: 25
  },
  {
    id: 5,
    name: "Ankle Boots",
    category: "Shoes",
    price: 149.99,
    image: "linear-gradient(135deg, #c77dff 0%, #e0aaff 100%)",
    images: ["img1", "img2", "img3"],
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Black", "Cognac", "Gray"],
    description: "Stylish ankle boots with block heel. Perfect for transitioning between seasons.",
    rating: 4.5,
    reviews: 203,
    isNew: true
  },
  {
    id: 6,
    name: "Cashmere Sweater",
    category: "Tops",
    price: 159.99,
    salePrice: 119.99,
    image: "linear-gradient(135deg, #e0aaff 0%, #9d4edd 100%)",
    images: ["img1", "img2"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Camel", "Charcoal"],
    description: "Luxurious 100% cashmere sweater. Soft, warm, and timeless.",
    rating: 4.9,
    reviews: 145,
    isSale: true,
    discount: 25
  },
  {
    id: 7,
    name: "Pleated Midi Skirt",
    category: "Bottoms",
    price: 69.99,
    image: "linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)",
    images: ["img1", "img2"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Wine"],
    description: "Elegant pleated midi skirt with elastic waistband. Versatile piece for work or play.",
    rating: 4.6,
    reviews: 98,
    isNew: true
  },
  {
    id: 8,
    name: "Evening Gown",
    category: "Dresses",
    price: 249.99,
    image: "linear-gradient(135deg, #c77dff 0%, #9d4edd 100%)",
    images: ["img1", "img2", "img3", "img4"],
    sizes: ["0", "2", "4", "6", "8", "10"],
    colors: ["Emerald", "Sapphire", "Ruby"],
    description: "Stunning floor-length evening gown with elegant draping. Perfect for formal events.",
    rating: 5.0,
    reviews: 76,
    isNew: true
  },
  {
    id: 9,
    name: "Statement Necklace",
    category: "Accessories",
    price: 49.99,
    salePrice: 37.49,
    image: "linear-gradient(135deg, #e0aaff 0%, #c77dff 100%)",
    images: ["img1", "img2"],
    sizes: ["One Size"],
    colors: ["Gold", "Silver", "Rose Gold"],
    description: "Bold statement necklace with geometric design. Elevate any outfit instantly.",
    rating: 4.4,
    reviews: 112,
    isSale: true,
    discount: 25
  },
  {
    id: 10,
    name: "Satin Heels",
    category: "Shoes",
    price: 119.99,
    image: "linear-gradient(135deg, #9d4edd 0%, #e0aaff 100%)",
    images: ["img1", "img2"],
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Nude", "Black", "Blush"],
    description: "Elegant satin heels with pointed toe. Perfect for special occasions.",
    rating: 4.7,
    reviews: 134,
    isNew: true
  },
  {
    id: 11,
    name: "Wrap Dress",
    category: "Dresses",
    price: 94.99,
    salePrice: 71.24,
    image: "linear-gradient(135deg, #c77dff 0%, #e0aaff 100%)",
    images: ["img1", "img2", "img3"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Burgundy"],
    description: "Classic wrap dress with tie waist. Flattering silhouette that works for any body type.",
    rating: 4.8,
    reviews: 189,
    isSale: true,
    discount: 25
  },
  {
    id: 12,
    name: "Linen Pants",
    category: "Bottoms",
    price: 74.99,
    image: "linear-gradient(135deg, #e0aaff 0%, #9d4edd 100%)",
    images: ["img1", "img2"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Beige", "Olive"],
    description: "Breathable linen pants with wide leg. Perfect for summer days.",
    rating: 4.5,
    reviews: 156,
    isNew: true
  },
  {
    id: 13,
    name: "Blazer",
    category: "Tops",
    price: 139.99,
    image: "linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)",
    images: ["img1", "img2", "img3"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Camel"],
    description: "Tailored blazer with classic fit. Essential piece for professional wardrobe.",
    rating: 4.9,
    reviews: 234,
    isNew: true
  },
  {
    id: 14,
    name: "Tote Bag",
    category: "Accessories",
    price: 89.99,
    salePrice: 67.49,
    image: "linear-gradient(135deg, #c77dff 0%, #9d4edd 100%)",
    images: ["img1", "img2"],
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Cream"],
    description: "Spacious leather tote bag perfect for work or weekend. Multiple pockets for organization.",
    rating: 4.6,
    reviews: 178,
    isSale: true,
    discount: 25
  },
  {
    id: 15,
    name: "Sandals",
    category: "Shoes",
    price: 79.99,
    image: "linear-gradient(135deg, #e0aaff 0%, #c77dff 100%)",
    images: ["img1", "img2"],
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Tan", "White", "Gold"],
    description: "Comfortable strappy sandals with cushioned footbed. Perfect for all-day wear.",
    rating: 4.7,
    reviews: 201,
    isNew: true
  },
  {
    id: 16,
    name: "Maxi Dress",
    category: "Dresses",
    price: 109.99,
    salePrice: 82.49,
    image: "linear-gradient(135deg, #9d4edd 0%, #e0aaff 100%)",
    images: ["img1", "img2", "img3"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral", "Solid Black", "Stripe"],
    description: "Flowing maxi dress with empire waist. Effortlessly elegant for any summer event.",
    rating: 4.8,
    reviews: 167,
    isSale: true,
    discount: 25
  }
];

const collections: Collection[] = [
  {
    id: 1,
    name: "Spring Essentials",
    description: "Fresh pieces for the new season",
    image: "linear-gradient(135deg, #9d4edd 0%, #c77dff 50%, #e0aaff 100%)",
    productCount: 24
  },
  {
    id: 2,
    name: "Evening Elegance",
    description: "Sophisticated styles for special occasions",
    image: "linear-gradient(135deg, #c77dff 0%, #9d4edd 100%)",
    productCount: 18
  },
  {
    id: 3,
    name: "Workwear Chic",
    description: "Professional pieces with style",
    image: "linear-gradient(135deg, #e0aaff 0%, #c77dff 100%)",
    productCount: 32
  },
  {
    id: 4,
    name: "Weekend Casual",
    description: "Comfortable & stylish everyday wear",
    image: "linear-gradient(135deg, #9d4edd 0%, #e0aaff 100%)",
    productCount: 28
  }
];

const BellaBoutique: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Checkout state
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });

  // User account state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderHistory] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 249.97,
      status: 'Delivered',
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-08',
      total: 159.99,
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2024-01-01',
      total: 329.98,
      status: 'In Transit',
      items: 4
    }
  ]);

  // Cart functions
  const addToCart = (product: Product, size: string, color: string) => {
    const existingItem = cart.find(
      item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (productId: number, size: string, color: string) => {
    setCart(cart.filter(item =>
      !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
    ));
  };

  const updateQuantity = (productId: number, size: string, color: string, change: number) => {
    setCart(cart.map(item =>
      item.id === productId && item.selectedSize === size && item.selectedColor === color
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const cartTotal = cart.reduce((sum, item) =>
    sum + (item.salePrice || item.price) * item.quantity, 0
  );

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtering and sorting
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange !== 'All') {
      const ranges: { [key: string]: [number, number] } = {
        'Under $50': [0, 50],
        '$50 - $100': [50, 100],
        '$100 - $150': [100, 150],
        'Over $150': [150, 999999]
      };
      const [min, max] = ranges[selectedPriceRange];
      filtered = filtered.filter(p => {
        const price = p.salePrice || p.price;
        return price >= min && price <= max;
      });
    }

    // Size filter
    if (selectedSize !== 'All') {
      filtered = filtered.filter(p => p.sizes.includes(selectedSize));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = filtered.filter(p => p.isNew);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedSize, sortBy]);

  const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Accessories', 'Shoes'];
  const priceRanges = ['All', 'Under $50', '$50 - $100', '$100 - $150', 'Over $150'];
  const allSizes = ['All', 'XS', 'S', 'M', 'L', 'XL', '0', '2', '4', '6', '8', '10'];

  // Product Card Component
  const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
    const displayPrice = product.salePrice || product.price;
    const isOnWishlist = wishlist.includes(product.id);

    return (
      <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        {/* Product Image */}
        <div
          className="relative h-80 cursor-pointer overflow-hidden"
          onClick={onClick}
        >
          <div
            className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
            style={{ background: product.image }}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-[#9d4edd] text-white px-3 py-1 rounded-full text-xs font-semibold">
                NEW
              </span>
            )}
            {product.isSale && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                SALE {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <Heart
              className={`w-5 h-5 ${isOnWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
            />
          </button>

          {/* Quick View Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={onClick}
              className="w-full bg-white text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Quick View
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#9d4edd]">
              ${displayPrice.toFixed(2)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Product Detail Modal
  const ProductModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div
                className="w-full h-96 rounded-lg mb-4"
                style={{ background: product.image }}
              />
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-24 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ background: product.image, opacity: 0.6 }}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <button
                onClick={onClose}
                className="float-right w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.category}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[#9d4edd]">
                  ${(product.salePrice || product.price).toFixed(2)}
                </span>
                {product.salePrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-semibold text-gray-900">Size</label>
                  <button className="text-sm text-[#9d4edd] hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-[#9d4edd] bg-[#9d4edd] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-[#9d4edd]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="font-semibold text-gray-900 mb-3 block">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                        selectedColor === color
                          ? 'border-[#9d4edd] bg-[#9d4edd] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-[#9d4edd]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="font-semibold text-gray-900 mb-3 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#9d4edd] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#9d4edd] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product, selectedSize, selectedColor);
                  }
                  onClose();
                }}
                className="w-full bg-[#9d4edd] text-white py-4 rounded-lg font-semibold hover:bg-[#8b3dc9] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-full mt-3 border-2 border-[#9d4edd] text-[#9d4edd] py-4 rounded-lg font-semibold hover:bg-[#9d4edd] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Heart className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                {wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-md sticky top-0 z-40">
      {/* Top Banner */}
      <div className="bg-[#9d4edd] text-white text-center py-2 text-sm">
        Free Shipping on Orders Over $100 | Use Code: BELLA25 for 25% Off
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-bold text-[#9d4edd] hover:text-[#8b3dc9] transition-colors"
          >
            Bella Boutique
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`font-medium transition-colors ${
                currentPage === 'home' ? 'text-[#9d4edd]' : 'text-gray-700 hover:text-[#9d4edd]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className={`font-medium transition-colors ${
                currentPage === 'shop' ? 'text-[#9d4edd]' : 'text-gray-700 hover:text-[#9d4edd]'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => setCurrentPage('collections')}
              className={`font-medium transition-colors ${
                currentPage === 'collections' ? 'text-[#9d4edd]' : 'text-gray-700 hover:text-[#9d4edd]'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => setCurrentPage('new-arrivals')}
              className={`font-medium transition-colors ${
                currentPage === 'new-arrivals' ? 'text-[#9d4edd]' : 'text-gray-700 hover:text-[#9d4edd]'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setCurrentPage('sale')}
              className={`font-medium transition-colors ${
                currentPage === 'sale' ? 'text-[#9d4edd]' : 'text-gray-700 hover:text-[#9d4edd]'
              }`}
            >
              Sale
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`font-medium transition-colors ${
                currentPage === 'about' ? 'text-[#9d4edd]' : 'text-gray-700 hover:text-[#9d4edd]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`font-medium transition-colors ${
                currentPage === 'contact' ? 'text-[#9d4edd]' : 'text-gray-700 hover:text-[#9d4edd]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-gray-700 hover:text-[#9d4edd] transition-colors">
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentPage('account')}
              className="text-gray-700 hover:text-[#9d4edd] transition-colors"
            >
              <User className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative text-gray-700 hover:text-[#9d4edd] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#9d4edd] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-gray-700"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-4">
            <button
              onClick={() => { setCurrentPage('home'); setShowMobileMenu(false); }}
              className="text-left font-medium text-gray-700 hover:text-[#9d4edd] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('shop'); setShowMobileMenu(false); }}
              className="text-left font-medium text-gray-700 hover:text-[#9d4edd] transition-colors"
            >
              Shop
            </button>
            <button
              onClick={() => { setCurrentPage('collections'); setShowMobileMenu(false); }}
              className="text-left font-medium text-gray-700 hover:text-[#9d4edd] transition-colors"
            >
              Collections
            </button>
            <button
              onClick={() => { setCurrentPage('new-arrivals'); setShowMobileMenu(false); }}
              className="text-left font-medium text-gray-700 hover:text-[#9d4edd] transition-colors"
            >
              New Arrivals
            </button>
            <button
              onClick={() => { setCurrentPage('sale'); setShowMobileMenu(false); }}
              className="text-left font-medium text-gray-700 hover:text-[#9d4edd] transition-colors"
            >
              Sale
            </button>
            <button
              onClick={() => { setCurrentPage('about'); setShowMobileMenu(false); }}
              className="text-left font-medium text-gray-700 hover:text-[#9d4edd] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => { setCurrentPage('contact'); setShowMobileMenu(false); }}
              className="text-left font-medium text-gray-700 hover:text-[#9d4edd] transition-colors"
            >
              Contact
            </button>
          </nav>
        )}
      </div>
    </header>
  );

  // Shopping Cart Sidebar
  const CartSidebar = () => (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        showCart ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Shopping Cart ({cartItemCount})
          </h2>
          <button
            onClick={() => setShowCart(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-600 mb-2">Your cart is empty</p>
              <button
                onClick={() => { setShowCart(false); setCurrentPage('shop'); }}
                className="text-[#9d4edd] hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex gap-4 pb-4 border-b border-gray-200">
                  <div
                    className="w-24 h-24 rounded-lg flex-shrink-0"
                    style={{ background: item.image }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-[#9d4edd]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-[#9d4edd]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#9d4edd]">
                        ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-gray-900">Subtotal:</span>
              <span className="font-bold text-[#9d4edd] text-2xl">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => { setCurrentPage('checkout'); setShowCart(false); }}
              className="w-full bg-[#9d4edd] text-white py-4 rounded-lg font-semibold hover:bg-[#8b3dc9] transition-colors"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => setShowCart(false)}
              className="w-full border-2 border-[#9d4edd] text-[#9d4edd] py-4 rounded-lg font-semibold hover:bg-[#9d4edd] hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Page: Home
  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-[#9d4edd] via-[#c77dff] to-[#e0aaff] flex items-center justify-center text-white">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Spring Collection 2024</h1>
          <p className="text-xl md:text-2xl mb-8">Discover the latest trends in women's fashion</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('new-arrivals')}
              className="bg-white text-[#9d4edd] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop New Arrivals
            </button>
            <button
              onClick={() => setCurrentPage('sale')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#9d4edd] transition-colors"
            >
              Shop Sale - 25% Off
            </button>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop By Collection</h2>
          <p className="text-xl text-gray-600">Curated styles for every occasion</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map(collection => (
            <button
              key={collection.id}
              onClick={() => setCurrentPage('collections')}
              className="group relative h-80 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div
                className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                style={{ background: collection.image }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                <p className="text-sm mb-2">{collection.description}</p>
                <span className="text-sm opacity-80">{collection.productCount} Products</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
              <p className="text-xl text-gray-600">Fresh styles just for you</p>
            </div>
            <button
              onClick={() => setCurrentPage('new-arrivals')}
              className="text-[#9d4edd] font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.isNew).slice(0, 4).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#9d4edd] to-[#c77dff] rounded-2xl p-12 text-center text-white">
          <h2 className="text-5xl font-bold mb-4">Limited Time Sale</h2>
          <p className="text-2xl mb-8">Save 25% on select items</p>
          <button
            onClick={() => setCurrentPage('sale')}
            className="bg-white text-[#9d4edd] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Tag className="w-5 h-5" />
            Shop Sale Now
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e0aaff] rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-[#9d4edd]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e0aaff] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#9d4edd]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">2-3 business days</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e0aaff] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-[#9d4edd]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e0aaff] rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-[#9d4edd]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure checkout</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Page: Shop
  const ShopPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop All</h1>
        <p className="text-xl text-gray-600">Discover our complete collection</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPriceRange('All');
                  setSelectedSize('All');
                  setSearchQuery('');
                }}
                className="text-sm text-[#9d4edd] hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#9d4edd] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedPriceRange === range
                        ? 'bg-[#9d4edd] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-[#9d4edd] bg-[#9d4edd] text-white'
                        : 'border-gray-300 text-gray-700 hover:border-[#9d4edd]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">No products found</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPriceRange('All');
                  setSelectedSize('All');
                  setSearchQuery('');
                }}
                className="text-[#9d4edd] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Page: Collections
  const CollectionsPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Collections</h1>
        <p className="text-xl text-gray-600">Curated styles for every occasion and season</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {collections.map(collection => (
          <div
            key={collection.id}
            className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
          >
            <div
              className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              style={{ background: collection.image }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
              <h2 className="text-3xl font-bold mb-3">{collection.name}</h2>
              <p className="text-lg mb-4">{collection.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">{collection.productCount} Products</span>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="bg-white text-[#9d4edd] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Products from Collections */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Items</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Page: New Arrivals
  const NewArrivalsPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h1>
        <p className="text-xl text-gray-600">Discover the latest additions to our collection</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.filter(p => p.isNew).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
    </div>
  );

  // Page: Sale
  const SalePage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-12 text-center text-white mb-12">
        <h1 className="text-5xl font-bold mb-4">Limited Time Sale</h1>
        <p className="text-2xl mb-2">Save up to 25% on select items</p>
        <p className="text-lg opacity-90">Use code: BELLA25 at checkout</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.filter(p => p.isSale).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
    </div>
  );

  // Page: Cart
  const CartPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to get started</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#9d4edd] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#8b3dc9] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
                <div
                  className="w-32 h-32 rounded-lg flex-shrink-0"
                  style={{ background: item.image }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Size: {item.selectedSize} | Color: {item.selectedColor}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                        className="w-8 h-8 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#9d4edd]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                        className="w-8 h-8 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#9d4edd]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#9d4edd]">
                        ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                      </div>
                      {item.salePrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{cartTotal >= 100 ? 'FREE' : '$10.00'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex items-center justify-between text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-[#9d4edd] text-2xl">
                    ${(cartTotal + (cartTotal >= 100 ? 0 : 10) + cartTotal * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              {cartTotal >= 100 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center gap-2 text-green-700">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">You qualify for free shipping!</span>
                </div>
              )}

              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-[#9d4edd] text-white py-4 rounded-lg font-semibold hover:bg-[#8b3dc9] transition-colors mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => setCurrentPage('shop')}
                className="w-full border-2 border-[#9d4edd] text-[#9d4edd] py-4 rounded-lg font-semibold hover:bg-[#9d4edd] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Page: Checkout
  const CheckoutPage = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (checkoutStep === 1) {
        setCheckoutStep(2);
      } else if (checkoutStep === 2) {
        setCheckoutStep(3);
      }
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                checkoutStep >= 1 ? 'bg-[#9d4edd] text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <div className="text-sm font-medium ml-2">Shipping</div>
            </div>
            <div className={`w-24 h-1 mx-4 ${checkoutStep >= 2 ? 'bg-[#9d4edd]' : 'bg-gray-300'}`} />
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                checkoutStep >= 2 ? 'bg-[#9d4edd] text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <div className="text-sm font-medium ml-2">Payment</div>
            </div>
            <div className={`w-24 h-1 mx-4 ${checkoutStep >= 3 ? 'bg-[#9d4edd]' : 'bg-gray-300'}`} />
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                checkoutStep >= 3 ? 'bg-[#9d4edd] text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                3
              </div>
              <div className="text-sm font-medium ml-2">Review</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {checkoutStep === 1 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#9d4edd] text-white py-4 rounded-lg font-semibold hover:bg-[#8b3dc9] transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#9d4edd] text-white py-4 rounded-lg font-semibold hover:bg-[#8b3dc9] transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                  <p className="text-gray-600">Thank you for your purchase</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-gray-600 text-sm">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                      <p className="text-gray-600 text-sm">
                        {shippingInfo.email}<br />
                        {shippingInfo.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCart([]);
                    setCurrentPage('home');
                    setCheckoutStep(1);
                  }}
                  className="w-full bg-[#9d4edd] text-white py-4 rounded-lg font-semibold hover:bg-[#8b3dc9] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-3">
                    <div
                      className="w-16 h-16 rounded-lg flex-shrink-0"
                      style={{ background: item.image }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-gray-600">
                        {item.selectedSize} | {item.selectedColor}
                      </p>
                      <p className="text-sm font-semibold text-[#9d4edd]">
                        ${(item.salePrice || item.price).toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{cartTotal >= 100 ? 'FREE' : '$10.00'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex items-center justify-between text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-[#9d4edd] text-2xl">
                    ${(cartTotal + (cartTotal >= 100 ? 0 : 10) + cartTotal * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Page: Account
  const AccountPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Account Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#9d4edd] to-[#c77dff] rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <h3 className="font-semibold text-gray-900">Jane Doe</h3>
              <p className="text-sm text-gray-600">jane.doe@email.com</p>
            </div>
            <nav className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-[#9d4edd] text-white rounded-lg font-medium">
                Orders
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                Wishlist ({wishlist.length})
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                Profile
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                Addresses
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                Payment Methods
              </button>
            </nav>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

            <div className="space-y-4">
              {orderHistory.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Order {order.id}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-semibold text-[#9d4edd]">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Items</p>
                      <p className="font-semibold">{order.items}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Status</p>
                      <p className="font-semibold">{order.status}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 border-2 border-[#9d4edd] text-[#9d4edd] py-2 rounded-lg font-medium hover:bg-[#9d4edd] hover:text-white transition-colors">
                      View Details
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="flex-1 bg-[#9d4edd] text-white py-2 rounded-lg font-medium hover:bg-[#8b3dc9] transition-colors">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist ({wishlist.length})</h2>

            {wishlist.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="text-[#9d4edd] hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => wishlist.includes(p.id)).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Page: About
  const AboutPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">About Bella Boutique</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your destination for timeless fashion and contemporary style since 2010
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-gradient-to-br from-[#9d4edd] to-[#c77dff] rounded-2xl h-96" />
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2010, Bella Boutique began as a small boutique in downtown Manhattan with a simple mission: to provide women with high-quality, fashionable clothing that makes them feel confident and beautiful.
          </p>
          <p className="text-gray-600 mb-4">
            Over the years, we've grown from a single storefront to a beloved online destination, serving customers across the country. Our commitment to quality, style, and exceptional customer service remains unchanged.
          </p>
          <p className="text-gray-600">
            Today, we carefully curate each collection to bring you the latest trends alongside timeless classics, ensuring you'll find the perfect piece for any occasion.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#e0aaff] rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-[#9d4edd]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
            <p className="text-gray-600">
              We source only the finest materials and work with skilled artisans to ensure every piece meets our high standards.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#e0aaff] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#9d4edd]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Love</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We're dedicated to providing exceptional service and creating lasting relationships.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#e0aaff] rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-[#9d4edd]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
            <p className="text-gray-600">
              We're committed to ethical practices and sustainable fashion, working towards a better future for our planet.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { name: 'Isabella Martinez', role: 'Founder & CEO' },
            { name: 'Sophia Chen', role: 'Creative Director' },
            { name: 'Emma Thompson', role: 'Head Buyer' },
            { name: 'Olivia Rodriguez', role: 'Customer Experience' }
          ].map((member, idx) => (
            <div key={idx} className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#9d4edd] to-[#c77dff] rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Page: Contact
  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">We'd love to hear from you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#9d4edd] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#9d4edd] text-white py-4 rounded-lg font-semibold hover:bg-[#8b3dc9] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#e0aaff] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#9d4edd]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Fashion Avenue<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#e0aaff] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#9d4edd]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600">
                    (555) 123-4567<br />
                    Mon-Fri 9am-6pm EST
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#e0aaff] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#9d4edd]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600">
                    hello@bellaboutique.com<br />
                    support@bellaboutique.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Store Hours */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Store Hours</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Monday - Friday</span>
                <span className="font-semibold text-gray-900">10am - 8pm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Saturday</span>
                <span className="font-semibold text-gray-900">10am - 6pm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Sunday</span>
                <span className="font-semibold text-gray-900">12pm - 5pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is your return policy?</h3>
            <p className="text-gray-600">
              We offer a 30-day return policy for unworn items with tags attached. Free returns on all orders.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Do you ship internationally?</h3>
            <p className="text-gray-600">
              Yes! We ship to over 50 countries worldwide. Shipping costs vary by destination.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How long does shipping take?</h3>
            <p className="text-gray-600">
              Standard shipping takes 2-3 business days. Express shipping is available for next-day delivery.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Do you offer gift wrapping?</h3>
            <p className="text-gray-600">
              Yes! We offer complimentary gift wrapping on all orders. Just select the option at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#e0aaff]">Bella Boutique</h3>
            <p className="text-gray-400 mb-4">
              Your destination for timeless fashion and contemporary style.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9d4edd] transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9d4edd] transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9d4edd] transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => setCurrentPage('new-arrivals')} className="hover:text-white">New Arrivals</button></li>
              <li><button onClick={() => setCurrentPage('sale')} className="hover:text-white">Sale</button></li>
              <li><button onClick={() => setCurrentPage('collections')} className="hover:text-white">Collections</button></li>
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">All Products</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:text-white">Shipping & Returns</button></li>
              <li><button className="hover:text-white">Size Guide</button></li>
              <li><button className="hover:text-white">Track Order</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe for exclusive offers and updates</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-[#9d4edd] focus:outline-none text-white"
              />
              <button className="bg-[#9d4edd] px-4 py-2 rounded-lg hover:bg-[#8b3dc9] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>2024 Bella Boutique. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button className="hover:text-white">Privacy Policy</button>
            <button className="hover:text-white">Terms of Service</button>
            <button className="hover:text-white">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'collections' && <CollectionsPage />}
        {currentPage === 'new-arrivals' && <NewArrivalsPage />}
        {currentPage === 'sale' && <SalePage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Cart/Sidebar Overlay */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowCart(false)}
        />
      )}
    </div>
  );
};

export default BellaBoutique;