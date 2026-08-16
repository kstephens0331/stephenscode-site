'use client';

import React, { useState, useEffect } from 'react';
import {
  Heart, ShoppingCart, Gift, TruckIcon, Award, User, Star, Search,
  CheckCircle2, Phone, Mail, MapPin, X, Trash2, CreditCard, Package,
  ArrowLeft, Send, Clock, BookOpen, Dog, Cat, Bird, Fish, Rabbit
} from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

// Types
interface PetProduct {
  id: string;
  name: string;
  category: string;
  petType: 'Dog' | 'Cat' | 'Bird' | 'Fish' | 'Small Pet' | 'All';
  price: number;
  salePrice?: number;
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

interface CartItem extends PetProduct {
  quantity: number;
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

interface Order {
  id: string;
  date: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  total: number;
  shipTo: string;
}

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
}

type Page = 'home' | 'shop' | 'subscriptions' | 'sale' | 'auto-delivery' | 'vet-approved' | 'cart' | 'checkout' | 'account' | 'resources' | 'contact';
type AccountTab = 'pets' | 'orders' | 'wishlist' | 'subscription';

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
    salePrice: 59.99,
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
    salePrice: 17.99,
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
    salePrice: 64.99,
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
    salePrice: 12.99,
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

const articles: Article[] = [
  {
    id: '1',
    title: 'How to Choose the Right Food for Your Dog',
    category: 'Nutrition',
    readTime: '6 min read',
    summary: 'Age, size, and activity level all change what your dog needs from a food. Here is how to read a label with confidence.',
    content: [
      'Start with your dog\'s life stage. Puppies, adults, and seniors have very different calorie and nutrient needs, and foods are formulated for each stage. A growing puppy needs more protein and fat per pound than a senior dog who spends most of the day napping.',
      'Next, look at the first three ingredients on the label. A named protein source such as chicken, beef, or salmon should appear first. Whole ingredients you can recognize are a good sign, while long lists of fillers and artificial preservatives are worth avoiding.',
      'Finally, factor in size and activity. Large breeds benefit from joint-support formulas, and highly active dogs need more calories than couch companions. If your dog has allergies or a sensitive stomach, a limited-ingredient or grain-free formula can help. When in doubt, ask your veterinarian which formula fits your dog best.'
    ]
  },
  {
    id: '2',
    title: 'Hairball Help for Indoor Cats',
    category: 'Cat Care',
    readTime: '4 min read',
    summary: 'Frequent hairballs are common in indoor cats, but a few small changes can dramatically reduce them.',
    content: [
      'Indoor cats groom more than their outdoor counterparts, which means they swallow more fur. Most of it passes through normally, but some collects in the stomach and comes back up as the hairball every cat owner knows too well.',
      'Regular brushing is the single most effective fix. A few minutes every day removes loose fur before your cat can swallow it. Long-haired breeds may need a deshedding tool during seasonal coat changes.',
      'Diet also plays a big role. Hairball-control formulas add fiber that helps fur move through the digestive tract, and omega-3 rich foods keep the coat healthy so less fur sheds in the first place. If hairballs come with vomiting, weight loss, or lethargy, schedule a vet visit to rule out anything more serious.'
    ]
  },
  {
    id: '3',
    title: 'Why Dental Care Matters for Pets',
    category: 'Health',
    readTime: '5 min read',
    summary: 'Dental disease is one of the most common health issues vets see. Prevention at home is easier than you think.',
    content: [
      'By age three, most dogs and cats show some sign of dental disease. Left untreated, plaque hardens into tartar, gums become inflamed, and bacteria can eventually affect the heart, liver, and kidneys.',
      'Daily brushing with a pet-safe toothpaste is the gold standard, but dental chews, water additives, and dental-formula kibble all help slow plaque buildup between professional cleanings.',
      'Watch for warning signs: bad breath that gets steadily worse, drooling, dropping food, pawing at the mouth, or a reluctance to chew hard food. Any of these means it is time for a dental checkup with your veterinarian.'
    ]
  },
  {
    id: '4',
    title: 'Getting Started with Auto-Delivery',
    category: 'Shopping Tips',
    readTime: '3 min read',
    summary: 'Never run out of food or litter again. Here is how our auto-delivery program works and how to get the most from it.',
    content: [
      'Auto-delivery works best for items you buy on a predictable schedule: food, litter, treats, and dental chews. Estimate how long a bag usually lasts and set your delivery frequency to match, with a few days of buffer.',
      'Every auto-delivery order saves up to 15% depending on your plan, and shipping is always free. Discounts apply automatically at checkout, so there are no codes to remember.',
      'Life changes and so do pets. You can skip a delivery, change the schedule, swap products, or cancel entirely from your account at any time with no fees. Start with one staple item, see how the rhythm fits, and add more as it proves useful.'
    ]
  }
];

const categories = ['All', 'Food', 'Treats', 'Toys', 'Beds & Furniture', 'Feeders & Waterers', 'Dental Care', 'Grooming', 'Health'];
const petTypes = ['All', 'Dog', 'Cat', 'Bird', 'Fish', 'Small Pet'];

const contactSubjects = [
  'General Inquiry',
  'Order Question',
  'Product Recommendation',
  'Auto-Delivery Help',
  'Subscription Help',
  'Returns & Refunds',
  'Other'
];

const priceOf = (product: PetProduct) => product.salePrice ?? product.price;

const defaultPets: PetProfile[] = [
  { id: '1', name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: 3, weight: 65 }
];

const emptyCheckoutForm = {
  name: '', email: '', phone: '', address: '', city: '', state: '', zip: '',
  cardName: '', cardNumber: '', cardExp: '', cardCvc: ''
};

const emptyContactForm = { name: '', email: '', phone: '', subject: 'General Inquiry', message: '' };

const emptyPetForm = { name: '', type: 'Dog', breed: '', age: '', weight: '' };

const HappyPawsPetSupplies = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPetType, setSelectedPetType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [petProfiles, setPetProfiles] = useState<PetProfile[]>(defaultPets);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // UI state
  const [toast, setToast] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<PetProduct | null>(null);
  const [detailQty, setDetailQty] = useState(1);
  const [navSearchOpen, setNavSearchOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Subscription flow
  const [subPlanModal, setSubPlanModal] = useState<Subscription | null>(null);
  const [subForm, setSubForm] = useState({ name: '', email: '' });
  const [subConfirmed, setSubConfirmed] = useState(false);

  // Checkout flow
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [checkoutForm, setCheckoutForm] = useState(emptyCheckoutForm);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Account
  const [accountTab, setAccountTab] = useState<AccountTab>('pets');
  const [showAddPet, setShowAddPet] = useState(false);
  const [petForm, setPetForm] = useState(emptyPetForm);

  // Contact form
  const [contactForm, setContactForm] = useState(emptyContactForm);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSending, setContactSending] = useState(false);

  // Load persisted demo state
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('happypaws-cart');
      if (storedCart) setCart(JSON.parse(storedCart));
      const storedWishlist = localStorage.getItem('happypaws-wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      const storedPets = localStorage.getItem('happypaws-pets');
      if (storedPets) setPetProfiles(JSON.parse(storedPets));
      const storedOrders = localStorage.getItem('happypaws-orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      const storedSub = localStorage.getItem('happypaws-subscription');
      if (storedSub) setActiveSubscription(storedSub);
    } catch {
      // Corrupted local data; demo starts fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('happypaws-cart', JSON.stringify(cart)); } catch { /* storage unavailable */ }
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('happypaws-wishlist', JSON.stringify(wishlist)); } catch { /* storage unavailable */ }
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('happypaws-pets', JSON.stringify(petProfiles)); } catch { /* storage unavailable */ }
  }, [petProfiles, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('happypaws-orders', JSON.stringify(orders)); } catch { /* storage unavailable */ }
  }, [orders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (activeSubscription) {
        localStorage.setItem('happypaws-subscription', activeSubscription);
      } else {
        localStorage.removeItem('happypaws-subscription');
      }
    } catch { /* storage unavailable */ }
  }, [activeSubscription, hydrated]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  // Cart functions
  const addToCart = (product: PetProduct, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`${product.name} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (priceOf(item) * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = cartTotal >= 35 ? 0 : 5.99;

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Saved to wishlist');
    }
  };

  const openProduct = (product: PetProduct) => {
    setSelectedProduct(product);
    setDetailQty(1);
  };

  const startCheckout = () => {
    setPlacedOrder(null);
    setCheckoutStep(1);
    setCurrentPage('checkout');
  };

  const updateCheckout = (field: keyof typeof emptyCheckoutForm, value: string) => {
    setCheckoutForm(prev => ({ ...prev, [field]: value }));
  };

  const placeOrder = () => {
    const order: Order = {
      id: `HP-${String(Date.now()).slice(-6)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: priceOf(item) })),
      subtotal: cartTotal,
      shipping: shippingCost,
      total: cartTotal + shippingCost,
      shipTo: `${checkoutForm.address}, ${checkoutForm.city}, ${checkoutForm.state} ${checkoutForm.zip}`
    };
    setOrders(prev => [order, ...prev]);
    setPlacedOrder(order);
    setCart([]);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subPlanModal) return;
    setActiveSubscription(subPlanModal.id);
    setSubConfirmed(true);
  };

  const closeSubModal = () => {
    setSubPlanModal(null);
    setSubConfirmed(false);
    setSubForm({ name: '', email: '' });
  };

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    const newPet: PetProfile = {
      id: String(Date.now()),
      name: petForm.name.trim(),
      type: petForm.type,
      breed: petForm.breed.trim(),
      age: Number(petForm.age) || 0,
      weight: Number(petForm.weight) || 0
    };
    setPetProfiles(prev => [...prev, newPet]);
    setPetForm(emptyPetForm);
    setShowAddPet(false);
    showToast(`${newPet.name} added to your pets`);
  };

  const removePet = (id: string) => {
    setPetProfiles(prev => prev.filter(pet => pet.id !== id));
    showToast('Pet profile removed');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSending(true);
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Happy Paws Pet Supplies',
          demoPackage: 'E-Commerce Website ($1,100)',
          demoSlug: 'happy-paws-pet-supplies',
          clientName: contactForm.name,
          clientPhone: contactForm.phone,
          clientEmail: contactForm.email,
          service: contactForm.subject,
          preferredDate: '',
          preferredTime: '',
          notes: contactForm.message
        })
      });

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: 'happy-paws-pet-supplies' });
        trackConversion('leadForm');
        setContactSubmitted(true);
      }
    } catch {
      // Network/API failure -- form stays visible so the user can retry
    } finally {
      setContactSending(false);
    }
  };

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(navSearch);
    setSelectedPetType('All');
    setSelectedCategory('All');
    setCurrentPage('shop');
    setNavSearchOpen(false);
  };

  const shopForPet = (petType: string) => {
    setSelectedPetType(petTypes.includes(petType) ? petType : 'All');
    setSelectedCategory('All');
    setCurrentPage('shop');
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
      case 'price-low': return priceOf(a) - priceOf(b);
      case 'price-high': return priceOf(b) - priceOf(a);
      case 'name': return a.name.localeCompare(b.name);
      case 'rating': return b.rating - a.rating;
      default: return b.reviews - a.reviews;
    }
  });

  const renderStars = (rating: number, reviews: number) => (
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({reviews})</span>
    </div>
  );

  const renderPrice = (product: PetProduct, large = false) => (
    product.salePrice !== undefined ? (
      <span className="flex items-baseline gap-2">
        <span className={`${large ? 'text-3xl' : 'text-xl'} font-bold text-red-500`}>${product.salePrice.toFixed(2)}</span>
        <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
      </span>
    ) : (
      <span className={`${large ? 'text-3xl' : 'text-xl'} font-bold text-[#264653]`}>${product.price.toFixed(2)}</span>
    )
  );

  const renderProductCard = (product: PetProduct) => {
    const discount = product.salePrice !== undefined
      ? Math.round((1 - product.salePrice / product.price) * 100)
      : 0;
    return (
      <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
        <div className="relative h-64">
          <button onClick={() => openProduct(product)} className="block w-full h-full" aria-label={`View details for ${product.name}`}>
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
            aria-label={wishlist.includes(product.id) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          >
            <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
            {product.vetApproved && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Vet Approved
              </span>
            )}
            {product.salePrice !== undefined && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {discount}% Off
              </span>
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <button onClick={() => openProduct(product)} className="text-left">
            <h3 className="font-bold text-lg mb-1 hover:text-[#e76f51] transition-colors">{product.name}</h3>
          </button>
          <p className="text-sm text-gray-600 mb-2">{product.brand} • {product.size}</p>
          {renderStars(product.rating, product.reviews)}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-auto">
            {renderPrice(product)}
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
    );
  };

  // Navigation
  const renderNavigation = () => (
    <nav className="bg-[#264653] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-left">
            <Heart className="w-8 h-8 text-[#f4a261]" />
            <div>
              <h1 className="text-2xl font-bold">Happy Paws</h1>
              <p className="text-xs text-[#f4a261]">Pet Supplies & Care</p>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage('account')}
              className="hover:text-[#f4a261] transition-colors"
              aria-label="My account"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setNavSearchOpen(!navSearchOpen)}
              className="hover:text-[#f4a261] transition-colors"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative hover:text-[#f4a261] transition-colors"
              aria-label="Shopping cart"
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
        {navSearchOpen && (
          <form onSubmit={handleNavSearch} className="mb-4 flex gap-2">
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search food, toys, treats, and more..."
              aria-label="Search products"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f4a261]"
            />
            <button type="submit" className="bg-[#f4a261] px-5 py-2 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors">
              Search
            </button>
          </form>
        )}
        <div className="flex flex-wrap gap-2">
          {[
            { page: 'home' as Page, label: 'Home', icon: Heart },
            { page: 'shop' as Page, label: 'Shop by Pet', icon: ShoppingCart },
            { page: 'subscriptions' as Page, label: 'Subscriptions', icon: Gift },
            { page: 'sale' as Page, label: 'Sale', icon: Award },
            { page: 'auto-delivery' as Page, label: 'Auto-Delivery', icon: TruckIcon },
            { page: 'vet-approved' as Page, label: 'Vet Approved', icon: CheckCircle2 },
            { page: 'resources' as Page, label: 'Resources', icon: BookOpen },
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
  const renderHomePage = () => (
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
                onClick={() => shopForPet(type)}
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
            {products.filter(p => p.bestseller).map(product => renderProductCard(product))}
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
  const renderShopPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-8">Shop Pet Supplies</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="petfood-shop-search" className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              id="petfood-shop-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="petfood-shop-pet-type" className="block text-sm font-semibold text-gray-700 mb-2">Pet Type</label>
            <select
              id="petfood-shop-pet-type"
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
            <label htmlFor="petfood-shop-category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              id="petfood-shop-category"
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
            <label htmlFor="petfood-shop-sort" className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              id="petfood-shop-sort"
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

      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-4">No products match your filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedPetType('All');
              setSelectedCategory('All');
            }}
            className="bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map(product => renderProductCard(product))}
        </div>
      )}
    </div>
  );

  const renderSubscriptionsPage = () => (
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
              {activeSubscription === sub.id ? (
                <button
                  onClick={() => {
                    setAccountTab('subscription');
                    setCurrentPage('account');
                  }}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Current Plan -- Manage
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSubConfirmed(false);
                    setSubPlanModal(sub);
                  }}
                  className="w-full bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
                >
                  Start Subscription
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSalePage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-4">Sale Items</h1>
      <p className="text-gray-600 mb-8">Save big on premium pet supplies</p>
      <div className="bg-[#e76f51] text-white p-8 rounded-lg text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Up to 40% Off Selected Items!</h2>
        <p className="text-lg">Limited time offers on your pet's favorites -- discounts applied automatically</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.filter(p => p.salePrice !== undefined).map(product => renderProductCard(product))}
      </div>
    </div>
  );

  const renderAutoDeliveryPage = () => (
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

      <div className="bg-[#264653] text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-gray-200 mb-6">Pick a plan or browse auto-delivery favorites like food, treats, and dental chews.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentPage('subscriptions')}
            className="bg-[#f4a261] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
          >
            Choose a Plan
          </button>
          <button
            onClick={() => {
              setSelectedPetType('All');
              setSelectedCategory('All');
              setCurrentPage('shop');
            }}
            className="bg-white text-[#264653] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Eligible Items
          </button>
        </div>
      </div>
    </div>
  );

  const renderVetApprovedPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-4">Vet Approved Products</h1>
      <p className="text-gray-600 mb-8">Trusted by veterinarians for your pet's health</p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.filter(p => p.vetApproved).map(product => renderProductCard(product))}
      </div>
    </div>
  );

  const renderCartPage = () => (
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
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xl font-bold text-[#264653]">
                      ${(priceOf(item) * item.quantity).toFixed(2)}
                    </span>
                    {item.salePrice !== undefined && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">Sale price</span>
                    )}
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
                  <span className="font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-[#264653]">
                    ${(cartTotal + shippingCost).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={startCheckout}
                className="w-full bg-[#264653] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#e76f51] transition-colors mb-3"
              >
                Checkout
              </button>
              <button
                onClick={() => setCurrentPage('shop')}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCheckoutPage = () => {
    if (placedOrder) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-[#264653] mb-3">Order Placed!</h1>
            <p className="text-gray-600 text-lg mb-6">
              Thanks, {checkoutForm.name.split(' ')[0] || 'friend'}! Your order confirmation number is
              <span className="font-bold text-[#264653]"> {placedOrder.id}</span>.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
              <h2 className="font-bold text-[#264653] mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {placedOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name} x {item.quantity}</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${placedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{placedOrder.shipping === 0 ? 'FREE' : `$${placedOrder.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1">
                  <span>Total</span>
                  <span className="text-[#264653]">${placedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <span className="font-semibold">Shipping to:</span> {placedOrder.shipTo}
              </p>
            </div>
            <p className="text-sm text-gray-500 mb-8">
              This is a demo store. No payment was processed and nothing will ship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('shop')}
                className="bg-[#264653] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setAccountTab('orders');
                  setCurrentPage('account');
                }}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                View Order History
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (cart.length === 0) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty -- add something before checking out</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#264653] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => setCurrentPage('cart')}
          className="flex items-center gap-2 text-[#264653] font-semibold hover:text-[#e76f51] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>
        <h1 className="text-4xl font-bold text-[#264653] mb-8">Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { n: 1 as const, label: 'Shipping' },
            { n: 2 as const, label: 'Payment' },
            { n: 3 as const, label: 'Review' }
          ].map((step, i) => (
            <React.Fragment key={step.n}>
              {i > 0 && <div className={`flex-1 h-1 rounded ${checkoutStep >= step.n ? 'bg-[#f4a261]' : 'bg-gray-200'}`}></div>}
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  checkoutStep > step.n ? 'bg-green-500 text-white' : checkoutStep === step.n ? 'bg-[#264653] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {checkoutStep > step.n ? <CheckCircle2 className="w-5 h-5" /> : step.n}
                </div>
                <span className={`text-sm font-semibold hidden sm:inline ${checkoutStep >= step.n ? 'text-[#264653]' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {checkoutStep === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setCheckoutStep(2); }}>
              <h2 className="text-2xl font-bold text-[#264653] mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="petfood-ship-name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    id="petfood-ship-name"
                    type="text"
                    required
                    value={checkoutForm.name}
                    onChange={(e) => updateCheckout('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="Jamie Rivera"
                  />
                </div>
                <div>
                  <label htmlFor="petfood-ship-email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    id="petfood-ship-email"
                    type="email"
                    required
                    value={checkoutForm.email}
                    onChange={(e) => updateCheckout('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="jamie@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="petfood-ship-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    id="petfood-ship-phone"
                    type="tel"
                    value={checkoutForm.phone}
                    onChange={(e) => updateCheckout('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="petfood-ship-address" className="block text-sm font-semibold text-gray-700 mb-2">Street Address *</label>
                  <input
                    id="petfood-ship-address"
                    type="text"
                    required
                    value={checkoutForm.address}
                    onChange={(e) => updateCheckout('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="123 Maple Street"
                  />
                </div>
                <div>
                  <label htmlFor="petfood-ship-city" className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <input
                    id="petfood-ship-city"
                    type="text"
                    required
                    value={checkoutForm.city}
                    onChange={(e) => updateCheckout('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="Springfield"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="petfood-ship-state" className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                    <input
                      id="petfood-ship-state"
                      type="text"
                      required
                      value={checkoutForm.state}
                      onChange={(e) => updateCheckout('state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                      placeholder="TX"
                    />
                  </div>
                  <div>
                    <label htmlFor="petfood-ship-zip" className="block text-sm font-semibold text-gray-700 mb-2">ZIP *</label>
                    <input
                      id="petfood-ship-zip"
                      type="text"
                      required
                      value={checkoutForm.zip}
                      onChange={(e) => updateCheckout('zip', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                      placeholder="75001"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#264653] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#e76f51] transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {checkoutStep === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); setCheckoutStep(3); }}>
              <h2 className="text-2xl font-bold text-[#264653] mb-2 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Payment Details
              </h2>
              <p className="text-sm text-gray-500 mb-6 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
                Demo checkout: no real payment is processed and no card is charged. Feel free to use placeholder numbers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="md:col-span-2">
                  <label htmlFor="petfood-card-name" className="block text-sm font-semibold text-gray-700 mb-2">Name on Card *</label>
                  <input
                    id="petfood-card-name"
                    type="text"
                    required
                    value={checkoutForm.cardName}
                    onChange={(e) => updateCheckout('cardName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="Jamie Rivera"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="petfood-card-number" className="block text-sm font-semibold text-gray-700 mb-2">Card Number *</label>
                  <input
                    id="petfood-card-number"
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={19}
                    value={checkoutForm.cardNumber}
                    onChange={(e) => updateCheckout('cardNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div>
                  <label htmlFor="petfood-card-exp" className="block text-sm font-semibold text-gray-700 mb-2">Expiration *</label>
                  <input
                    id="petfood-card-exp"
                    type="text"
                    required
                    maxLength={5}
                    value={checkoutForm.cardExp}
                    onChange={(e) => updateCheckout('cardExp', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="12/29"
                  />
                </div>
                <div>
                  <label htmlFor="petfood-card-cvc" className="block text-sm font-semibold text-gray-700 mb-2">CVC *</label>
                  <input
                    id="petfood-card-cvc"
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={4}
                    value={checkoutForm.cardCvc}
                    onChange={(e) => updateCheckout('cardCvc', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setCheckoutStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back to Shipping
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#264653] text-white px-6 py-4 rounded-lg font-bold hover:bg-[#e76f51] transition-colors"
                >
                  Review Order
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[#264653] mb-6">Review Your Order</h2>
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#264653]">${(priceOf(item) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-[#264653]">${(cartTotal + shippingCost).toFixed(2)}</span>
                </div>
                <p className="text-gray-600 pt-2">
                  <span className="font-semibold">Ship to:</span> {checkoutForm.name}, {checkoutForm.address}, {checkoutForm.city}, {checkoutForm.state} {checkoutForm.zip}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Payment:</span> Card ending in {checkoutForm.cardNumber.replace(/\s/g, '').slice(-4) || '0000'} (demo)
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCheckoutStep(2)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back to Payment
                </button>
                <button
                  onClick={placeOrder}
                  className="flex-1 bg-[#e76f51] text-white px-6 py-4 rounded-lg font-bold hover:bg-[#264653] transition-colors"
                >
                  Place Order (Demo)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAccountPage = () => {
    const activePlan = subscriptions.find(sub => sub.id === activeSubscription);
    const wishlistProducts = products.filter(product => wishlist.includes(product.id));

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#264653] mb-8">My Account</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-2">
              {[
                { tab: 'pets' as AccountTab, label: 'My Pets', icon: Heart },
                { tab: 'orders' as AccountTab, label: 'Order History', icon: Package },
                { tab: 'wishlist' as AccountTab, label: 'Wishlist', icon: Star },
                { tab: 'subscription' as AccountTab, label: 'Subscription', icon: Gift }
              ].map(({ tab, label, icon: Icon }) => (
                <button
                  key={tab}
                  onClick={() => setAccountTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold flex items-center gap-3 transition-colors ${
                    accountTab === tab ? 'bg-[#264653] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {accountTab === 'pets' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#264653]">My Pets</h2>
                  <button
                    onClick={() => setShowAddPet(!showAddPet)}
                    className="bg-[#f4a261] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
                  >
                    {showAddPet ? 'Cancel' : '+ Add Pet'}
                  </button>
                </div>

                {showAddPet && (
                  <form onSubmit={handleAddPet} className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-[#264653] mb-4">Add a Pet Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="petfood-pet-name" className="block text-sm font-semibold text-gray-700 mb-2">Pet Name *</label>
                        <input
                          id="petfood-pet-name"
                          type="text"
                          required
                          value={petForm.name}
                          onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                          placeholder="Bella"
                        />
                      </div>
                      <div>
                        <label htmlFor="petfood-pet-type" className="block text-sm font-semibold text-gray-700 mb-2">Pet Type *</label>
                        <select
                          id="petfood-pet-type"
                          value={petForm.type}
                          onChange={(e) => setPetForm({ ...petForm, type: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                        >
                          {petTypes.filter(type => type !== 'All').map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="petfood-pet-breed" className="block text-sm font-semibold text-gray-700 mb-2">Breed *</label>
                        <input
                          id="petfood-pet-breed"
                          type="text"
                          required
                          value={petForm.breed}
                          onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                          placeholder="Labrador"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="petfood-pet-age" className="block text-sm font-semibold text-gray-700 mb-2">Age (yrs)</label>
                          <input
                            id="petfood-pet-age"
                            type="number"
                            min="0"
                            max="40"
                            value={petForm.age}
                            onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                            placeholder="2"
                          />
                        </div>
                        <div>
                          <label htmlFor="petfood-pet-weight" className="block text-sm font-semibold text-gray-700 mb-2">Weight (lbs)</label>
                          <input
                            id="petfood-pet-weight"
                            type="number"
                            min="0"
                            max="300"
                            value={petForm.weight}
                            onChange={(e) => setPetForm({ ...petForm, weight: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                            placeholder="45"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
                    >
                      Save Pet Profile
                    </button>
                  </form>
                )}

                {petProfiles.length === 0 ? (
                  <div className="text-center py-10">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No pets yet. Add your first pet profile to get personalized recommendations.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {petProfiles.map(pet => (
                      <div key={pet.id} className="border-2 border-gray-200 rounded-lg p-5 hover:border-[#f4a261] transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{pet.name}</h3>
                            <p className="text-sm text-gray-600">{pet.type} • {pet.breed}</p>
                            <p className="text-sm text-gray-600">{pet.age} years • {pet.weight} lbs</p>
                          </div>
                          <button
                            onClick={() => removePet(pet.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                            aria-label={`Remove ${pet.name}`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <button
                          onClick={() => shopForPet(pet.type)}
                          className="mt-3 bg-[#264653] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors text-sm"
                        >
                          Shop for {pet.name}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {accountTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#264653] mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-10">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-6">No orders yet. Your completed orders will show up here.</p>
                    <button
                      onClick={() => setCurrentPage('shop')}
                      className="bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border-2 border-gray-200 rounded-lg p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div>
                            <p className="font-bold text-[#264653]">Order {order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Confirmed
                          </span>
                        </div>
                        <div className="space-y-1 mb-3">
                          {order.items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-700">{item.name} x {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between border-t pt-2 font-bold">
                          <span>Total</span>
                          <span className="text-[#264653]">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {accountTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#264653] mb-6">Wishlist</h2>
                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-10">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-6">Your wishlist is empty. Tap the heart on any product to save it here.</p>
                    <button
                      onClick={() => setCurrentPage('shop')}
                      className="bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlistProducts.map(product => (
                      <div key={product.id} className="border-2 border-gray-200 rounded-lg p-4 flex items-center gap-4">
                        <button onClick={() => openProduct(product)} aria-label={`View details for ${product.name}`}>
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        </button>
                        <div className="flex-1">
                          <button onClick={() => openProduct(product)} className="text-left">
                            <p className="font-bold hover:text-[#e76f51] transition-colors">{product.name}</p>
                          </button>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                          {renderPrice(product)}
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-[#264653] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#e76f51] transition-colors"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {accountTab === 'subscription' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#264653] mb-6">My Subscription</h2>
                {activePlan ? (
                  <div>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#264653]">{activePlan.name}</h3>
                          <p className="text-gray-600">{activePlan.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-[#264653]">${activePlan.price}</span>
                          <span className="text-gray-600">/month</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {activePlan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => setCurrentPage('subscriptions')}
                        className="flex-1 bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
                      >
                        Change Plan
                      </button>
                      <button
                        onClick={() => {
                          setActiveSubscription(null);
                          showToast('Subscription cancelled');
                        }}
                        className="flex-1 bg-gray-100 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                      >
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-6">You don't have an active subscription. Save up to 15% with auto-delivery.</p>
                    <button
                      onClick={() => setCurrentPage('subscriptions')}
                      className="bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
                    >
                      View Plans
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResourcesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-4">Pet Care Resources</h1>
      <p className="text-gray-600 mb-8">Expert tips and guides for pet parents</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map(article => (
          <div key={article.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#f4a261] text-white px-3 py-1 rounded-full text-xs font-semibold">{article.category}</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#264653] mb-3">{article.title}</h2>
            <p className="text-gray-600 mb-4 flex-1">{article.summary}</p>
            <button
              onClick={() => setSelectedArticle(article)}
              className="self-start bg-[#264653] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Read Guide
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#264653] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Phone className="w-8 h-8 text-[#e76f51] mx-auto mb-3" />
          <h3 className="font-bold text-[#264653] mb-1">Phone</h3>
          <a href="tel:555-224-7297" className="text-gray-600 hover:text-[#e76f51] transition-colors">(555) 224-7297</a>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Mail className="w-8 h-8 text-[#e76f51] mx-auto mb-3" />
          <h3 className="font-bold text-[#264653] mb-1">Email</h3>
          <a href="mailto:hello@happypawssupplies.com" className="text-gray-600 hover:text-[#e76f51] transition-colors break-all">hello@happypawssupplies.com</a>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <MapPin className="w-8 h-8 text-[#e76f51] mx-auto mb-3" />
          <h3 className="font-bold text-[#264653] mb-1">Store</h3>
          <p className="text-gray-600">123 Pet Supplies Lane<br />Austin, TX 78701</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#264653] mb-6">Get In Touch</h2>
        {contactSubmitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#264653] mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thanks for reaching out. Our team will get back to you within one business day.
            </p>
            <button
              onClick={() => {
                setContactSubmitted(false);
                setContactForm(emptyContactForm);
              }}
              className="text-[#e76f51] font-semibold hover:text-[#264653] transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="petfood-contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  id="petfood-contact-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653]"
                  placeholder="Jamie Rivera"
                />
              </div>
              <div>
                <label htmlFor="petfood-contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  id="petfood-contact-phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653]"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            <div>
              <label htmlFor="petfood-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                id="petfood-contact-email"
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653]"
                placeholder="jamie@example.com"
              />
            </div>
            <div>
              <label htmlFor="petfood-contact-subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
              <select
                id="petfood-contact-subject"
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653]"
              >
                {contactSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="petfood-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
              <textarea
                id="petfood-contact-message"
                rows={5}
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653]"
                placeholder="How can we help you and your pet?"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={contactSending}
              className="w-full bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send className="w-5 h-5" />
              {contactSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  const renderFooter = () => (
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
              <li><button onClick={() => setCurrentPage('vet-approved')} className="hover:text-white">Vet Approved</button></li>
              <li><button onClick={() => setCurrentPage('subscriptions')} className="hover:text-white">Subscriptions</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
              <li><button onClick={() => setCurrentPage('resources')} className="hover:text-white">Resources</button></li>
              <li><button onClick={() => setCurrentPage('account')} className="hover:text-white">My Account</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setShowAbout(true)} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => setCurrentPage('auto-delivery')} className="hover:text-white">Auto-Delivery Program</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#e76f51] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Happy Paws Pet Supplies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const renderProductModal = () => {
    if (!selectedProduct) return null;
    return (
      <div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={() => setSelectedProduct(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-72 md:h-full min-h-[280px]">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover md:rounded-l-2xl" />
              {selectedProduct.vetApproved && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Vet Approved
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-2xl font-bold text-[#264653]">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  aria-label="Close product details"
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{selectedProduct.brand} • {selectedProduct.size} • {selectedProduct.category}</p>
              {renderStars(selectedProduct.rating, selectedProduct.reviews)}
              <div className="mb-4">{renderPrice(selectedProduct, true)}</div>
              <p className="text-gray-700 mb-4">{selectedProduct.description}</p>

              {selectedProduct.ingredients && (
                <div className="mb-4">
                  <h3 className="font-bold text-[#264653] mb-2 text-sm">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.ingredients.map(ingredient => (
                      <span key={ingredient} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-[#264653] mb-2 text-sm">Features</h3>
                <ul className="space-y-1">
                  {selectedProduct.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDetailQty(Math.max(1, detailQty - 1))}
                    className="w-9 h-9 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-semibold">{detailQty}</span>
                  <button
                    onClick={() => setDetailQty(detailQty + 1)}
                    className="w-9 h-9 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="p-2 border-2 border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                  aria-label={wishlist.includes(selectedProduct.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct, detailQty);
                  setSelectedProduct(null);
                }}
                className="w-full bg-[#264653] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#e76f51] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add {detailQty} to Cart -- ${(priceOf(selectedProduct) * detailQty).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSubscriptionModal = () => {
    if (!subPlanModal) return null;
    return (
      <div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={closeSubModal}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-xl font-bold text-[#264653] flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#e76f51]" />
              {subConfirmed ? 'Subscription Active' : `Start ${subPlanModal.name}`}
            </h3>
            <button
              onClick={closeSubModal}
              aria-label="Close"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {subConfirmed ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-[#264653] mb-2">You're all set!</h4>
              <p className="text-gray-600 mb-2">
                Your <span className="font-semibold">{subPlanModal.name}</span> plan is now active at ${subPlanModal.price}/month.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Demo subscription: no payment was collected. Manage or cancel anytime from My Account.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    closeSubModal();
                    setAccountTab('subscription');
                    setCurrentPage('account');
                  }}
                  className="w-full bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
                >
                  Manage Subscription
                </button>
                <button
                  onClick={closeSubModal}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Keep Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#264653]">{subPlanModal.name}</span>
                  <span className="font-bold text-[#264653]">${subPlanModal.price}/mo</span>
                </div>
                <p className="text-sm text-gray-600">{subPlanModal.description}</p>
                <span className="inline-block bg-[#f4a261] text-white px-3 py-1 rounded-full text-xs font-bold mt-2">
                  {subPlanModal.savings}
                </span>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="petfood-sub-name" className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input
                    id="petfood-sub-name"
                    type="text"
                    required
                    value={subForm.name}
                    onChange={(e) => setSubForm({ ...subForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="Jamie Rivera"
                  />
                </div>
                <div>
                  <label htmlFor="petfood-sub-email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    id="petfood-sub-email"
                    type="email"
                    required
                    value={subForm.email}
                    onChange={(e) => setSubForm({ ...subForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264653] focus:border-transparent"
                    placeholder="jamie@example.com"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Demo signup: no payment is collected. You can cancel anytime from My Account.
              </p>
              <button
                type="submit"
                className="w-full bg-[#264653] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#e76f51] transition-colors"
              >
                Confirm Subscription
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };

  const renderArticleModal = () => {
    if (!selectedArticle) return null;
    return (
      <div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={() => setSelectedArticle(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#f4a261] text-white px-3 py-1 rounded-full text-xs font-semibold">{selectedArticle.category}</span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedArticle.readTime}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#264653]">{selectedArticle.title}</h2>
            </div>
            <button
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto space-y-4">
            {selectedArticle.content.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
            ))}
            <p className="text-sm text-gray-500 pt-2 border-t">Written by the Happy Paws Care Team</p>
          </div>
          <div className="p-5 border-t border-gray-200">
            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAboutModal = () => {
    if (!showAbout) return null;
    return (
      <div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={() => setShowAbout(false)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-xl font-bold text-[#264653] flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#e76f51]" />
              About Happy Paws
            </h3>
            <button
              onClick={() => setShowAbout(false)}
              aria-label="Close"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-4 text-gray-700">
            <p>
              Happy Paws started as a small neighborhood pet shop in Austin, Texas, run by a family that could
              never say no to a wagging tail. Today we serve pet parents across the country, but we still pick
              every product the same way we always have: would we feed it to our own pets?
            </p>
            <p>
              Every food, treat, and toy in our catalog is screened for quality ingredients and safe materials,
              and our vet-approved collection is reviewed by licensed veterinarians. Our auto-delivery program was
              built for busy pet parents who never want to hit the bottom of the food bag by surprise.
            </p>
            <p>
              Whether you have a dog, cat, bird, fish, or a small furry friend, we are here to help them thrive.
            </p>
          </div>
          <div className="p-5 border-t border-gray-200">
            <button
              onClick={() => {
                setShowAbout(false);
                setCurrentPage('contact');
              }}
              className="w-full bg-[#264653] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      <main>
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'shop' && renderShopPage()}
        {currentPage === 'subscriptions' && renderSubscriptionsPage()}
        {currentPage === 'sale' && renderSalePage()}
        {currentPage === 'auto-delivery' && renderAutoDeliveryPage()}
        {currentPage === 'vet-approved' && renderVetApprovedPage()}
        {currentPage === 'cart' && renderCartPage()}
        {currentPage === 'checkout' && renderCheckoutPage()}
        {currentPage === 'account' && renderAccountPage()}
        {currentPage === 'resources' && renderResourcesPage()}
        {currentPage === 'contact' && renderContactPage()}
      </main>
      {renderFooter()}
      {renderProductModal()}
      {renderSubscriptionModal()}
      {renderArticleModal()}
      {renderAboutModal()}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] bg-[#264653] text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#f4a261]" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}
    </div>
  );
};

export default HappyPawsPetSupplies;
