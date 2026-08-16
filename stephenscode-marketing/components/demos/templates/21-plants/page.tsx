'use client';

import React, { useEffect, useState } from 'react';
import { Leaf, ShoppingCart, BookOpen, HelpCircle, Gift, TruckIcon, User, Star, Search, Heart, CheckCircle2, Clock, Droplets, Sun, Wind, ThermometerSun, Award, Phone, X, ChevronDown, CreditCard, Send, RefreshCcw } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

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
  content: string[];
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
  content: string[];
}

interface Subscription {
  id: string;
  name: string;
  price: number;
  plantsPerMonth: number;
  description: string;
  features: string[];
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface DemoOrder {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered';
  total: number;
  items: OrderItem[];
}

interface ActiveSubscription {
  planId: string;
  planName: string;
  plantsPerMonth: number;
  price: number;
  status: 'active' | 'paused';
  nextDelivery: string;
}

interface AccountSettings {
  name: string;
  email: string;
  careTips: boolean;
}

type Page = 'home' | 'shop' | 'care-guides' | 'quiz' | 'subscriptions' | 'delivery' | 'cart' | 'checkout' | 'order-confirmation' | 'account' | 'blog' | 'contact' | 'faq' | 'about';
type AccountTab = 'orders' | 'subscription' | 'wishlist' | 'settings';

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
    image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?w=400&h=600&fit=crop',
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
    content: [
      'Starting your indoor plant collection is easier than most people think. The key is to begin with plants that forgive mistakes: Snake Plant, ZZ Plant, and Pothos all tolerate irregular watering and less-than-perfect light, which makes them ideal first plants.',
      'Before you buy anything, look at your space. Which direction do your windows face? South-facing windows get the strongest light, north-facing the weakest. Match plants to the light you actually have rather than the light you wish you had.',
      'Pick a watering day, once a week is plenty for most beginner plants, and check the soil with your finger before you pour. If the top two inches are still damp, skip it. Overwatering kills far more houseplants than underwatering ever will.',
      'Finally, do not repot right away. Plants need a few weeks to adjust to a new home. Keep them in their nursery pot, watch how they respond to your space, and repot only once you see new growth.'
    ]
  },
  {
    id: '2',
    title: 'Understanding Light Requirements',
    category: 'Care',
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&h=400&fit=crop',
    excerpt: 'Learn how to assess and provide the right light for your plants.',
    readTime: '6 min',
    content: [
      'Light is food for plants, and getting it right matters more than any fertilizer. "Bright indirect light" means a spot near a sunny window where the sun\'s rays never actually touch the leaves, think a few feet back from a south or west window, or right beside an east window.',
      'A simple test: hold your hand a foot above where the plant will sit at midday. A sharp, well-defined shadow means bright light. A soft, fuzzy shadow means medium light. Barely any shadow means low light.',
      'Low light does not mean no light. Even Snake Plants and ZZ Plants, famous for tolerating dim corners, will slowly decline in a room with no natural light at all. If a room feels too dark to read in during the day, it is too dark for a plant.',
      'Watch the leaves, they will tell you. Pale, scorched patches mean too much direct sun. Long, stretched stems reaching toward the window mean not enough. Rotate your plants a quarter turn each week so they grow evenly.'
    ]
  },
  {
    id: '3',
    title: 'Watering 101: How Much is Too Much?',
    category: 'Care',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    excerpt: 'Master the art of watering and avoid common mistakes.',
    readTime: '7 min',
    content: [
      'The number one killer of houseplants is love, specifically, too much water. Roots need oxygen as much as they need moisture, and constantly soggy soil suffocates them. Once roots rot, the plant wilts, which tempts you to water even more.',
      'Forget rigid schedules. Instead, check the soil: push your finger two inches down. Dry? Water thoroughly until it runs out the drainage hole. Damp? Wait and check again in a few days. Seasons matter too, most plants drink far less in winter.',
      'When you do water, water deeply. A small splash every day keeps the top of the soil wet while the root ball stays bone dry. A thorough soak once the soil dries out encourages deep, healthy roots.',
      'Learn your plant\'s thirsty signals. Peace Lilies droop dramatically when dry and bounce back within hours of watering. Succulents wrinkle. Pothos leaves curl slightly. Respond to the plant, not the calendar, and you will rarely go wrong.'
    ]
  }
];

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Easy Plants for Beginners',
    category: 'Getting Started',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=600&h=400&fit=crop',
    excerpt: 'Start your plant journey with these foolproof favorites.',
    date: 'August 5, 2026',
    content: [
      'If you have never kept a plant alive, start here. These favorites shrug off missed waterings, adapt to average home light, and reward you with steady growth: Snake Plant, ZZ Plant, Pothos, Spider Plant, Peace Lily, Monstera, Philodendron, Aloe, Rubber Plant, and Chinese Evergreen.',
      'The Snake Plant tops our list for a reason. It handles low light, needs water only every two to three weeks, and its upright architectural leaves look sharp in any room. The ZZ Plant is nearly as tough, with glossy foliage that stays handsome even when neglected.',
      'For something that grows fast enough to feel rewarding, choose Pothos or Spider Plant. Both trail beautifully from a shelf, and both are absurdly easy to propagate, snip a cutting, place it in water, and watch roots appear within weeks.',
      'Whichever you choose, resist the urge to fuss. Beginner plants thrive on benign neglect: decent light, water when the soil dries, and a wipe of the leaves now and then. That is the whole routine.'
    ]
  },
  {
    id: '2',
    title: 'Creating a Plant Care Routine',
    category: 'Tips & Tricks',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop',
    excerpt: 'Establish habits that keep your plants thriving all year.',
    date: 'July 28, 2026',
    content: [
      'Thriving plant collections are built on routine, not luck. Pick one day a week, many plant parents love a slow Sunday morning, and make it your check-in day. Coffee in one hand, watering can in the other.',
      'On check-in day, do four things: feel the soil of every plant, water the ones that are dry, rotate each pot a quarter turn, and scan leaves for pests or yellowing. The whole circuit takes fifteen minutes for a dozen plants.',
      'Monthly, go a little deeper. Wipe dust off broad leaves with a damp cloth so they can photosynthesize efficiently, trim any dead or leggy growth, and during spring and summer add a diluted fertilizer to your watering can.',
      'Twice a year, check roots. If roots are circling the pot or poking out the drainage holes, size up one pot diameter. A consistent, light-touch routine beats sporadic bursts of attention every time.'
    ]
  },
  {
    id: '3',
    title: 'The Best Air-Purifying Plants',
    category: 'Plant Benefits',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=400&fit=crop',
    excerpt: 'Breathe easier with these natural air cleaners.',
    date: 'July 15, 2026',
    content: [
      'Houseplants do more than look good, many actively filter common indoor pollutants while releasing fresh oxygen. If cleaner air is your goal, a handful of species consistently lead the pack.',
      'The Peace Lily is a standout, known for filtering common household compounds while producing elegant white blooms. The Snake Plant is unusual in that it continues converting CO2 to oxygen at night, which makes it a popular bedroom choice.',
      'Spider Plants are prolific, safe around pets, and among the easiest air-friendly plants to grow, making them perfect for kitchens and offices. Pothos rounds out the list, combining rapid growth with excellent filtering and near-indestructible ease of care.',
      'For a noticeable effect, think in groups. A few well-placed plants per room, kept healthy with good light and regular care, do far more than a single struggling specimen in a dark corner.'
    ]
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

const faqs: Array<{ q: string; a: string }> = [
  { q: 'How are plants packaged for shipping?', a: 'Every plant ships in a custom-fit box with the root ball secured, the pot wrapped, and the foliage protected. In cold months we add heat packs; in summer we ship early in the week so plants never sit in a warehouse over the weekend.' },
  { q: 'What is your 30-day plant guarantee?', a: 'If your plant arrives damaged or declines within 30 days despite following the included care guide, we will replace it free of charge. Just email a photo to support@urbanjungle.com and we will take care of the rest.' },
  { q: 'How do returns and replacements work?', a: 'Because live plants cannot be restocked, we do not accept physical returns. Instead, we make it right with a free replacement or store credit under our 30-day guarantee. Pots and supplies can be returned unused within 30 days for a full refund.' },
  { q: 'Which plants are safe for pets?', a: 'Every product page shows a pet-friendly badge when a plant is non-toxic to cats and dogs. The Spider Plant is our most popular pet-safe pick. You can also take the Plant Quiz and tell us you have pets, and we will prioritize safe matches.' },
  { q: 'Can I pause or cancel my subscription?', a: 'Anytime. From your account page you can pause deliveries with one click and resume whenever you like. There are no contracts, no cancellation fees, and you keep every plant you have received.' },
  { q: 'Do you offer local pickup or consultations?', a: 'Yes. Our greenhouse at 123 Green Street in Plant City is open for in-person shopping, and our botanists offer free 15-minute plant consultations during business hours, no appointment needed.' },
  { q: 'When will my order arrive?', a: 'Standard shipping takes 4-6 business days and express takes 2-3. Orders over $50 always ship free. You will receive a tracking number the moment your plant leaves our greenhouse.' }
];

const plantSizeClass: Record<string, 'small' | 'medium' | 'large'> = {
  '1': 'medium', '2': 'medium', '3': 'small', '4': 'large', '5': 'medium', '6': 'medium', '7': 'large', '8': 'small'
};

const seedOrders: DemoOrder[] = [
  {
    id: '#2026-101',
    date: 'July 24, 2026',
    status: 'Delivered',
    total: 82.06,
    items: [
      { id: '1', name: 'Monstera Deliciosa', price: 45.99, quantity: 1, image: plants[0].image },
      { id: '2', name: 'Snake Plant', price: 29.99, quantity: 1, image: plants[1].image }
    ]
  },
  {
    id: '#2026-102',
    date: 'August 2, 2026',
    status: 'In Transit',
    total: 134.97,
    items: [
      { id: '4', name: 'Fiddle Leaf Fig', price: 79.99, quantity: 1, image: plants[3].image },
      { id: '3', name: 'Pothos Golden', price: 24.99, quantity: 1, image: plants[2].image },
      { id: '8', name: 'Spider Plant', price: 19.99, quantity: 1, image: plants[7].image }
    ]
  },
  {
    id: '#2026-103',
    date: 'August 9, 2026',
    status: 'Delivered',
    total: 47.50,
    items: [
      { id: '5', name: 'Peace Lily', price: 34.99, quantity: 1, image: plants[4].image }
    ]
  }
];

const categories = ['All', 'Tropical', 'Succulent', 'Vining', 'Tree', 'Flowering'];
const difficulties = ['All', 'Easy', 'Moderate', 'Advanced'];

const quizQuestions: Array<{ id: string; question: string; options: string[] }> = [
  { id: 'light', question: 'How much natural light does your space get?', options: ['Low Light', 'Medium Light', 'Bright Light'] },
  { id: 'experience', question: "What's your experience level?", options: ['Beginner', 'Intermediate', 'Expert'] },
  { id: 'pets', question: 'Do you have pets?', options: ['Yes, show me pet-safe plants', 'No pets'] },
  { id: 'watering', question: 'How often can you water?', options: ['Once a week', '2-3 times a week', 'Every few days'] },
  { id: 'size', question: 'What size plant are you looking for?', options: ['Small (desk)', 'Medium (table)', 'Large (floor)'] }
];

const STORAGE_KEY = 'demo-urban-jungle-state';

const nextDeliveryDate = () => {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return next.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const todayLabel = () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const UrbanJunglePlantShop = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<Array<Plant & { quantity: number }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  // Detail modals
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<CareGuide | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Subscriptions
  const [subscribePlan, setSubscribePlan] = useState<Subscription | null>(null);
  const [subscribeForm, setSubscribeForm] = useState({ name: '', email: '' });
  const [subscribeDone, setSubscribeDone] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  const [activeSubscription, setActiveSubscription] = useState<ActiveSubscription | null>({
    planId: '2',
    planName: 'Jungle Builder',
    plantsPerMonth: 2,
    price: 49.99,
    status: 'active',
    nextDelivery: nextDeliveryDate()
  });

  // Checkout
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({ name: '', email: '', address: '', city: '', state: '', zip: '' });
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'free'>('standard');
  const [paymentInfo, setPaymentInfo] = useState({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
  const [checkoutError, setCheckoutError] = useState('');
  const [lastOrder, setLastOrder] = useState<DemoOrder | null>(null);

  // Account
  const [orders, setOrders] = useState<DemoOrder[]>(seedOrders);
  const [accountTab, setAccountTab] = useState<AccountTab>('orders');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [accountSettings, setAccountSettings] = useState<AccountSettings>({ name: 'Jane Green', email: 'jane.green@email.com', careTips: true });

  // Contact
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'General Question', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Persistence
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.cart)) setCart(saved.cart);
        if (Array.isArray(saved.wishlist)) setWishlist(saved.wishlist);
        if (Array.isArray(saved.orders) && saved.orders.length > 0) setOrders(saved.orders);
        if (saved.activeSubscription !== undefined) setActiveSubscription(saved.activeSubscription);
        if (saved.accountSettings) setAccountSettings(saved.accountSettings);
      }
    } catch {
      // Corrupt or unavailable storage -- start fresh with defaults
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, orders, activeSubscription, accountSettings }));
    } catch {
      // Storage unavailable -- state still works for this session
    }
  }, [hydrated, cart, wishlist, orders, activeSubscription, accountSettings]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  };

  const goTo = (page: Page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart functions
  const addToCart = (plant: Plant) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === plant.id);
      if (existing) {
        return prev.map(item => item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
    showToast(`${plant.name} added to cart`);
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
      showToast('Removed from wishlist');
    } else {
      setWishlist([...wishlist, plantId]);
      showToast('Saved to wishlist');
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

  // Quiz matching
  const getQuizMatches = () => {
    const lightMap: Record<string, Plant['light']> = { 'Low Light': 'Low', 'Medium Light': 'Medium', 'Bright Light': 'Bright' };
    const sizeMap: Record<string, 'small' | 'medium' | 'large'> = { 'Small (desk)': 'small', 'Medium (table)': 'medium', 'Large (floor)': 'large' };
    const lightOrder: Plant['light'][] = ['Low', 'Medium', 'Bright'];
    const wantsPetSafe = quizAnswers.pets === 'Yes, show me pet-safe plants';

    return plants
      .map(plant => {
        let score = 0;
        let max = 0;

        max += 3;
        const desiredLight = lightMap[quizAnswers.light];
        if (desiredLight) {
          if (plant.light === desiredLight) score += 3;
          else if (Math.abs(lightOrder.indexOf(plant.light) - lightOrder.indexOf(desiredLight)) === 1) score += 1;
        }

        max += 3;
        if (quizAnswers.experience === 'Beginner') score += plant.difficulty === 'Easy' ? 3 : 0;
        else if (quizAnswers.experience === 'Intermediate') score += plant.difficulty === 'Moderate' ? 3 : 2;
        else if (quizAnswers.experience === 'Expert') score += plant.difficulty === 'Easy' ? 2 : 3;

        max += 3;
        if (quizAnswers.watering === 'Once a week') score += plant.water === 'Low' ? 3 : plant.water === 'Medium' ? 2 : 0;
        else if (quizAnswers.watering === '2-3 times a week') score += plant.water === 'Medium' ? 3 : 1;
        else if (quizAnswers.watering === 'Every few days') score += plant.water === 'High' ? 3 : plant.water === 'Medium' ? 2 : 0;

        max += 2;
        const desiredSize = sizeMap[quizAnswers.size];
        if (desiredSize && plantSizeClass[plant.id] === desiredSize) score += 2;

        if (wantsPetSafe) {
          max += 4;
          if (plant.petFriendly) score += 4;
        }

        return { plant, percent: Math.max(0, Math.min(100, Math.round((score / max) * 100))) };
      })
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 3);
  };

  const handleQuizSubmit = () => {
    const unanswered = quizQuestions.filter(q => !quizAnswers[q.id]);
    if (unanswered.length > 0) {
      setQuizError('Please answer all five questions so we can find your best matches.');
      setQuizSubmitted(false);
      return;
    }
    setQuizError('');
    setQuizSubmitted(true);
  };

  // Contact form -> demo lead
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Urban Jungle Plant Shop',
          demoPackage: 'E-Commerce Website ($1,100)',
          demoSlug: 'urban-jungle-plant-shop',
          clientName: contactForm.name,
          clientPhone: '',
          clientEmail: contactForm.email,
          service: contactForm.subject,
          preferredDate: '',
          preferredTime: '',
          notes: contactForm.message
        })
      });

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: 'urban-jungle-plant-shop' });
        trackConversion('leadForm');
        setContactSubmitted(true);
        setContactForm({ name: '', email: '', subject: 'General Question', message: '' });
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  };

  // Subscription signup -> demo lead
  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribePlan) return;
    if (!subscribeForm.name.trim() || !subscribeForm.email.trim()) {
      setSubscribeError('Please enter your name and email to start your subscription.');
      return;
    }
    setSubscribeError('');
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Urban Jungle Plant Shop',
          demoPackage: 'E-Commerce Website ($1,100)',
          demoSlug: 'urban-jungle-plant-shop',
          clientName: subscribeForm.name,
          clientPhone: '',
          clientEmail: subscribeForm.email,
          service: `Subscription signup: ${subscribePlan.name}`,
          preferredDate: '',
          preferredTime: '',
          notes: `${subscribePlan.plantsPerMonth} plant(s) per month at $${subscribePlan.price}/mo`
        })
      });

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_subscription_form', demo_slug: 'urban-jungle-plant-shop' });
        trackConversion('leadForm');
        setActiveSubscription({
          planId: subscribePlan.id,
          planName: subscribePlan.name,
          plantsPerMonth: subscribePlan.plantsPerMonth,
          price: subscribePlan.price,
          status: 'active',
          nextDelivery: nextDeliveryDate()
        });
        setSubscribeDone(true);
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  };

  const openSubscribeModal = (plan: Subscription) => {
    setSubscribePlan(plan);
    setSubscribeForm({ name: accountSettings.name, email: accountSettings.email });
    setSubscribeDone(false);
    setSubscribeError('');
  };

  // Checkout
  const shippingCost = shippingMethod === 'express' ? 14.99 : shippingMethod === 'free' ? 0 : 8.99;
  const freeShippingEligible = cartTotal >= 50;
  const checkoutTotal = (cartTotal + shippingCost) * 1.08;

  const startCheckout = () => {
    setCheckoutStep(1);
    setCheckoutError('');
    setShippingMethod(freeShippingEligible ? 'free' : 'standard');
    setShippingInfo(prev => ({ ...prev, name: prev.name || accountSettings.name, email: prev.email || accountSettings.email }));
    goTo('checkout');
  };

  const handleShippingContinue = () => {
    const { name, email, address, city, state, zip } = shippingInfo;
    if (!name.trim() || !email.trim() || !address.trim() || !city.trim() || !state.trim() || !zip.trim()) {
      setCheckoutError('Please fill in every shipping field to continue.');
      return;
    }
    setCheckoutError('');
    setCheckoutStep(2);
  };

  const handlePaymentContinue = () => {
    const { cardName, cardNumber, expiry, cvc } = paymentInfo;
    if (!cardName.trim() || cardNumber.replace(/\D/g, '').length < 12 || !expiry.trim() || cvc.replace(/\D/g, '').length < 3) {
      setCheckoutError('Please complete all payment fields (any sample card number works in this demo).');
      return;
    }
    setCheckoutError('');
    setCheckoutStep(3);
  };

  const placeOrder = () => {
    const order: DemoOrder = {
      id: `#UJ-${Date.now().toString(36).toUpperCase()}`,
      date: todayLabel(),
      status: 'Processing',
      total: Number(checkoutTotal.toFixed(2)),
      items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image }))
    };
    setOrders(prev => [order, ...prev]);
    setLastOrder(order);
    setCart([]);
    setPaymentInfo({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
    goTo('order-confirmation');
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Account settings saved');
  };

  const renderStars = (rating: number) => (
    <span className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </span>
  );

  // Shared plant card
  const PlantCard = (plant: Plant, compact = false) => (
    <div key={plant.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-64">
        <button onClick={() => setSelectedPlant(plant)} className="block w-full h-full" aria-label={`View ${plant.name} details`}>
          <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
        </button>
        <button
          onClick={() => toggleWishlist(plant.id)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-5 h-5 ${wishlist.includes(plant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <div className="absolute top-3 left-3 bg-[#2d6a4f] text-white px-3 py-1 rounded-full text-sm font-semibold">
          {plant.difficulty}
        </div>
      </div>
      <div className="p-4">
        <button onClick={() => setSelectedPlant(plant)} className="text-left">
          <h3 className="font-bold text-lg mb-1 hover:text-[#40916c] transition-colors">{plant.name}</h3>
        </button>
        <p className="text-sm text-gray-600 mb-2 italic">{plant.scientificName}</p>
        <div className="flex items-center gap-2 mb-3">
          <Sun className={`w-4 h-4 ${plant.light === 'Bright' ? 'text-yellow-500' : plant.light === 'Medium' ? 'text-orange-400' : 'text-gray-400'}`} />
          <Droplets className={`w-4 h-4 ${plant.water === 'High' ? 'text-blue-500' : plant.water === 'Medium' ? 'text-blue-400' : 'text-blue-300'}`} />
          <Wind className={`w-4 h-4 ${plant.humidity === 'High' ? 'text-cyan-500' : plant.humidity === 'Medium' ? 'text-cyan-400' : 'text-gray-400'}`} />
          {plant.petFriendly && <span title="Pet Friendly"><Award className="w-4 h-4 text-green-500" /></span>}
        </div>
        {!compact && (
          <>
            <div className="flex items-center gap-1 mb-3">
              {renderStars(plant.rating)}
              <span className="text-sm text-gray-600 ml-1">({plant.reviews})</span>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{plant.description}</p>
          </>
        )}
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
  );

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
            <button
              onClick={() => goTo('account')}
              className="hover:text-[#52b788] transition-colors"
              aria-label="My account"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => goTo('shop')}
              className="hover:text-[#52b788] transition-colors"
              aria-label="Search plants"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => goTo('cart')}
              className="relative hover:text-[#52b788] transition-colors"
              aria-label="Cart"
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
              onClick={() => goTo(page)}
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
                onClick={() => goTo('shop')}
                className="bg-[#52b788] px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
              >
                Shop Plants
              </button>
              <button
                onClick={() => goTo('quiz')}
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
            {plants.slice(0, 4).map(plant => PlantCard(plant, true))}
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
            onClick={() => goTo('subscriptions')}
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
            <label htmlFor="plants-shop-search" className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              id="plants-shop-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search plants..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="plants-shop-category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              id="plants-shop-category"
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
            <label htmlFor="plants-shop-difficulty" className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
            <select
              id="plants-shop-difficulty"
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
            <label htmlFor="plants-shop-sort" className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              id="plants-shop-sort"
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
      {sortedPlants.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-4">No plants match your filters</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
            className="bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedPlants.map(plant => PlantCard(plant))}
        </div>
      )}
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
            <button onClick={() => setSelectedGuide(guide)} className="block w-full h-48" aria-label={`Read ${guide.title}`}>
              <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
            </button>
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
              <button
                onClick={() => setSelectedGuide(guide)}
                className="text-[#2d6a4f] font-semibold hover:text-[#40916c] transition-colors"
              >
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
  const QuizPage = () => {
    const matches = quizSubmitted ? getQuizMatches() : [];
    const wantsPetSafe = quizAnswers.pets === 'Yes, show me pet-safe plants';
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#2d6a4f] mb-4">Find Your Perfect Plant</h1>
        <p className="text-gray-600 mb-8">Answer a few questions to discover plants that match your lifestyle</p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            {quizQuestions.map(({ id, question, options }) => (
              <div key={id}>
                <p className="block text-lg font-semibold text-gray-800 mb-3">{question}</p>
                <div className={`grid gap-3 ${options.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {options.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setQuizAnswers(prev => ({ ...prev, [id]: option }));
                        setQuizSubmitted(false);
                        setQuizError('');
                      }}
                      className={`p-4 border-2 rounded-lg transition-colors text-left ${
                        quizAnswers[id] === option
                          ? 'border-[#2d6a4f] bg-[#2d6a4f] text-white'
                          : 'border-gray-300 hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {quizError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {quizError}
              </div>
            )}

            <button
              onClick={handleQuizSubmit}
              className="w-full bg-[#2d6a4f] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#40916c] transition-colors"
            >
              Show My Matches
            </button>
          </div>

          {quizSubmitted && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#2d6a4f]">Your Top Matches</h3>
                <button
                  onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); setQuizError(''); }}
                  className="flex items-center gap-2 text-[#2d6a4f] font-semibold hover:text-[#40916c] transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Retake Quiz
                </button>
              </div>
              {wantsPetSafe && (
                <p className="text-sm text-gray-600 mb-4">
                  You told us you have pets, so pet-safe plants are ranked first. Plants without the pet-safe badge should be kept out of reach of curious cats and dogs.
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {matches.map(({ plant, percent }) => (
                  <div key={plant.id} className="border rounded-lg p-4">
                    <div className="relative mb-3">
                      <button onClick={() => setSelectedPlant(plant)} className="block w-full" aria-label={`View ${plant.name} details`}>
                        <img src={plant.image} alt={plant.name} className="w-full h-32 object-cover rounded" />
                      </button>
                      <span className="absolute top-2 left-2 bg-[#2d6a4f] text-white text-xs font-bold px-2 py-1 rounded-full">
                        {percent}% match
                      </span>
                      {plant.petFriendly && (
                        <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                          Pet Safe
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold mb-1">{plant.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{plant.difficulty} care • {plant.light} light</p>
                    <button
                      onClick={() => addToCart(plant)}
                      className="w-full bg-[#2d6a4f] text-white px-4 py-2 rounded-lg hover:bg-[#40916c] transition-colors text-sm mb-2"
                    >
                      Add to Cart (${plant.price.toFixed(2)})
                    </button>
                    <button
                      onClick={() => setSelectedPlant(plant)}
                      className="w-full border-2 border-[#2d6a4f] text-[#2d6a4f] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

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
              {activeSubscription && activeSubscription.planId === sub.id ? (
                <button
                  onClick={() => { setAccountTab('subscription'); goTo('account'); }}
                  className="w-full border-2 border-[#2d6a4f] text-[#2d6a4f] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Your Current Plan -- Manage
                </button>
              ) : (
                <button
                  onClick={() => openSubscribeModal(sub)}
                  className="w-full bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
                >
                  Subscribe Now
                </button>
              )}
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

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2d6a4f] mb-4">Returns & Replacements</h2>
          <p className="text-gray-700 mb-4">
            Live plants cannot be restocked, so instead of returns we offer free replacements or store credit under our 30-day guarantee. Pots, tools, and supplies can be returned unused within 30 days for a full refund.
          </p>
          <ol className="space-y-3 text-gray-700 mb-6 list-decimal list-inside">
            <li>Email a photo of your plant to <a href="mailto:support@urbanjungle.com" className="text-[#2d6a4f] font-semibold hover:underline">support@urbanjungle.com</a> within 30 days of delivery.</li>
            <li>Our botanists review it within one business day and share care advice if the plant can be saved.</li>
            <li>If it cannot, we ship a free replacement or issue store credit, your choice.</li>
          </ol>
          <button
            onClick={() => goTo('faq')}
            className="text-[#2d6a4f] font-semibold hover:text-[#40916c] transition-colors"
          >
            Read the full policy in our FAQ →
          </button>
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
            onClick={() => goTo('shop')}
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

              <button
                onClick={startCheckout}
                className="w-full bg-[#2d6a4f] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#40916c] transition-colors mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => goTo('shop')}
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

  // Page: Checkout
  const CheckoutPage = () => {
    if (cart.length === 0) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty, add some plants first.</p>
          <button
            onClick={() => goTo('shop')}
            className="bg-[#2d6a4f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
          >
            Shop Plants
          </button>
        </div>
      );
    }

    const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent';

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#2d6a4f] mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">Demo checkout, no real payment is processed.</p>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { step: 1, label: 'Shipping' },
            { step: 2, label: 'Payment' },
            { step: 3, label: 'Review' }
          ].map(({ step, label }) => (
            <React.Fragment key={step}>
              <button
                onClick={() => { if (step < checkoutStep) { setCheckoutStep(step); setCheckoutError(''); } }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  checkoutStep === step
                    ? 'bg-[#2d6a4f] text-white'
                    : step < checkoutStep
                      ? 'bg-[#52b788] text-white hover:bg-[#40916c]'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < checkoutStep ? <CheckCircle2 className="w-4 h-4" /> : <span>{step}</span>}
                {label}
              </button>
              {step < 3 && <div className="w-8 h-0.5 bg-gray-300" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {checkoutStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Shipping Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="plants-ship-name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input id="plants-ship-name" type="text" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} className={inputClass} placeholder="Jane Green" />
                    </div>
                    <div>
                      <label htmlFor="plants-ship-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input id="plants-ship-email" type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} className={inputClass} placeholder="you@email.com" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="plants-ship-address" className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                      <input id="plants-ship-address" type="text" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} className={inputClass} placeholder="123 Fern Lane" />
                    </div>
                    <div>
                      <label htmlFor="plants-ship-city" className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input id="plants-ship-city" type="text" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} className={inputClass} placeholder="Plant City" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="plants-ship-state" className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                        <input id="plants-ship-state" type="text" value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} className={inputClass} placeholder="TX" />
                      </div>
                      <div>
                        <label htmlFor="plants-ship-zip" className="block text-sm font-semibold text-gray-700 mb-2">ZIP</label>
                        <input id="plants-ship-zip" type="text" value={shippingInfo.zip} onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} className={inputClass} placeholder="12345" />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-800 mb-3">Shipping Method</h3>
                  <div className="space-y-3 mb-6">
                    {freeShippingEligible && (
                      <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors border-gray-200 has-[:checked]:border-[#2d6a4f] has-[:checked]:bg-green-50">
                        <span className="flex items-center gap-3">
                          <input type="radio" name="plants-ship-method" checked={shippingMethod === 'free'} onChange={() => setShippingMethod('free')} className="accent-[#2d6a4f]" />
                          <span>
                            <span className="font-bold block">Free Shipping</span>
                            <span className="text-sm text-gray-600">4-6 business days (orders over $50)</span>
                          </span>
                        </span>
                        <span className="font-bold text-[#2d6a4f]">FREE</span>
                      </label>
                    )}
                    <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors border-gray-200 has-[:checked]:border-[#2d6a4f] has-[:checked]:bg-green-50">
                      <span className="flex items-center gap-3">
                        <input type="radio" name="plants-ship-method" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="accent-[#2d6a4f]" />
                        <span>
                          <span className="font-bold block">Standard Shipping</span>
                          <span className="text-sm text-gray-600">4-6 business days</span>
                        </span>
                      </span>
                      <span className="font-bold text-[#2d6a4f]">$8.99</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors border-gray-200 has-[:checked]:border-[#2d6a4f] has-[:checked]:bg-green-50">
                      <span className="flex items-center gap-3">
                        <input type="radio" name="plants-ship-method" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="accent-[#2d6a4f]" />
                        <span>
                          <span className="font-bold block">Express Shipping</span>
                          <span className="text-sm text-gray-600">2-3 business days</span>
                        </span>
                      </span>
                      <span className="font-bold text-[#2d6a4f]">$14.99</span>
                    </label>
                  </div>

                  {checkoutError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{checkoutError}</div>
                  )}

                  <button
                    onClick={handleShippingContinue}
                    className="w-full bg-[#2d6a4f] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#40916c] transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {checkoutStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#2d6a4f] mb-2 flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Payment
                  </h2>
                  <p className="text-sm text-gray-500 mb-6">This is a demo, enter any sample card details. Nothing is charged or stored.</p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="plants-pay-name" className="block text-sm font-semibold text-gray-700 mb-2">Name on Card</label>
                      <input id="plants-pay-name" type="text" value={paymentInfo.cardName} onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })} className={inputClass} placeholder="Jane Green" />
                    </div>
                    <div>
                      <label htmlFor="plants-pay-number" className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                      <input id="plants-pay-number" type="text" inputMode="numeric" maxLength={19} value={paymentInfo.cardNumber} onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} className={inputClass} placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="plants-pay-expiry" className="block text-sm font-semibold text-gray-700 mb-2">Expiry</label>
                        <input id="plants-pay-expiry" type="text" maxLength={5} value={paymentInfo.expiry} onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })} className={inputClass} placeholder="12/28" />
                      </div>
                      <div>
                        <label htmlFor="plants-pay-cvc" className="block text-sm font-semibold text-gray-700 mb-2">CVC</label>
                        <input id="plants-pay-cvc" type="text" inputMode="numeric" maxLength={4} value={paymentInfo.cvc} onChange={(e) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })} className={inputClass} placeholder="123" />
                      </div>
                    </div>
                  </div>

                  {checkoutError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{checkoutError}</div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setCheckoutStep(1); setCheckoutError(''); }}
                      className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePaymentContinue}
                      className="flex-1 bg-[#2d6a4f] text-white px-6 py-4 rounded-lg font-bold hover:bg-[#40916c] transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Review Your Order</h2>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                        <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty {item.quantity}</p>
                        </div>
                        <span className="font-bold text-[#2d6a4f]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700 space-y-1">
                    <p><span className="font-semibold">Ship to:</span> {shippingInfo.name}, {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                    <p><span className="font-semibold">Method:</span> {shippingMethod === 'free' ? 'Free Shipping (4-6 days)' : shippingMethod === 'express' ? 'Express (2-3 days)' : 'Standard (4-6 days)'}</p>
                    <p><span className="font-semibold">Payment:</span> Card ending in {paymentInfo.cardNumber.replace(/\D/g, '').slice(-4)}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setCheckoutStep(2); setCheckoutError(''); }}
                      className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={placeOrder}
                      className="flex-1 bg-[#2d6a4f] text-white px-6 py-4 rounded-lg font-bold hover:bg-[#40916c] transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#2d6a4f] mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">${((cartTotal + shippingCost) * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold text-[#2d6a4f]">${checkoutTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Page: Order Confirmation
  const OrderConfirmationPage = () => (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-3">Order Placed!</h1>
      <p className="text-lg text-gray-600 mb-2">
        Thank you{lastOrder ? `, ${shippingInfo.name.split(' ')[0] || 'plant friend'}` : ''}! Your plants are being prepped in the greenhouse.
      </p>
      {lastOrder && (
        <p className="text-gray-600 mb-8">
          Order <span className="font-bold text-[#2d6a4f]">{lastOrder.id}</span> • {lastOrder.date} • Total <span className="font-bold text-[#2d6a4f]">${lastOrder.total.toFixed(2)}</span>
        </p>
      )}

      {lastOrder && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-bold text-[#2d6a4f] mb-4">What You Ordered</h2>
          <div className="space-y-3">
            {lastOrder.items.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty {item.quantity}</p>
                </div>
                <span className="font-bold text-[#2d6a4f]">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500 mb-8">
        This is a demo store, no payment was processed and nothing will ship. Your order is saved to Order History so you can explore the account experience.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => { setAccountTab('orders'); goTo('account'); }}
          className="bg-[#2d6a4f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
        >
          View Order History
        </button>
        <button
          onClick={() => goTo('shop')}
          className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
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
              <h2 className="text-xl font-bold text-[#2d6a4f]">{accountSettings.name}</h2>
              <p className="text-gray-600">{accountSettings.email}</p>
            </div>
            <div className="space-y-2">
              {([
                { tab: 'orders' as AccountTab, label: 'Order History' },
                { tab: 'subscription' as AccountTab, label: 'Subscriptions' },
                { tab: 'wishlist' as AccountTab, label: `Wishlist (${wishlist.length})` },
                { tab: 'settings' as AccountTab, label: 'Account Settings' }
              ]).map(({ tab, label }) => (
                <button
                  key={tab}
                  onClick={() => setAccountTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                    accountTab === tab ? 'bg-[#2d6a4f] text-white' : 'text-[#2d6a4f] hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {accountTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Order History</h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border rounded-lg hover:shadow-md transition-shadow">
                    <button
                      onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                      className="w-full text-left p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-bold text-[#2d6a4f]">{order.id}</span>
                          <span className="text-gray-600 ml-4">{order.date}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{order.items.reduce((n, i) => n + i.quantity, 0)} {order.items.reduce((n, i) => n + i.quantity, 0) === 1 ? 'plant' : 'plants'}</span>
                        <span className="flex items-center gap-2 font-bold text-[#2d6a4f]">
                          ${order.total.toFixed(2)}
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
                        </span>
                      </div>
                    </button>
                    {expandedOrderId === order.id && (
                      <div className="border-t px-4 py-4 space-y-3 bg-gray-50 rounded-b-lg">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded" />
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{item.name}</p>
                              <p className="text-xs text-gray-600">Qty {item.quantity}</p>
                            </div>
                            <span className="font-semibold text-sm text-[#2d6a4f]">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {accountTab === 'subscription' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Active Subscription</h2>
              {activeSubscription ? (
                <div className="border-2 border-[#2d6a4f] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#2d6a4f]">{activeSubscription.planName}</h3>
                      <p className="text-gray-600">{activeSubscription.plantsPerMonth} {activeSubscription.plantsPerMonth === 1 ? 'plant' : 'plants'} per month • ${activeSubscription.price.toFixed(2)}/mo</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      activeSubscription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {activeSubscription.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {activeSubscription.status === 'active'
                      ? `Next delivery: ${activeSubscription.nextDelivery}`
                      : 'Deliveries are paused. Resume anytime and your next box ships the first of the month.'}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => goTo('subscriptions')}
                      className="flex-1 bg-[#2d6a4f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
                    >
                      Manage Subscription
                    </button>
                    <button
                      onClick={() => {
                        setActiveSubscription({ ...activeSubscription, status: activeSubscription.status === 'active' ? 'paused' : 'active' });
                        showToast(activeSubscription.status === 'active' ? 'Subscription paused' : 'Subscription resumed');
                      }}
                      className="px-4 py-2 border-2 border-[#2d6a4f] text-[#2d6a4f] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {activeSubscription.status === 'active' ? 'Pause' : 'Resume'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-6">You don't have an active subscription yet.</p>
                  <button
                    onClick={() => goTo('subscriptions')}
                    className="bg-[#2d6a4f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
                  >
                    Browse Plans
                  </button>
                </div>
              )}
            </div>
          )}

          {accountTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Wishlist</h2>
              {wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-6">No plants in your wishlist yet. Tap the heart on any plant to save it here.</p>
                  <button
                    onClick={() => goTo('shop')}
                    className="bg-[#2d6a4f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
                  >
                    Browse Plants
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {plants.filter(plant => wishlist.includes(plant.id)).map(plant => (
                    <div key={plant.id} className="border rounded-lg p-4">
                      <button onClick={() => setSelectedPlant(plant)} className="block w-full" aria-label={`View ${plant.name} details`}>
                        <img src={plant.image} alt={plant.name} className="w-full h-32 object-cover rounded mb-3" />
                      </button>
                      <h4 className="font-bold mb-1">{plant.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">${plant.price.toFixed(2)}</p>
                      <button
                        onClick={() => addToCart(plant)}
                        className="w-full bg-[#2d6a4f] text-white px-4 py-2 rounded-lg hover:bg-[#40916c] transition-colors text-sm mb-2"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(plant.id)}
                        className="w-full border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {accountTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#2d6a4f] mb-6">Account Settings</h2>
              <form onSubmit={saveSettings} className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="plants-settings-name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    id="plants-settings-name"
                    type="text"
                    value={accountSettings.name}
                    onChange={(e) => setAccountSettings({ ...accountSettings, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="plants-settings-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    id="plants-settings-email"
                    type="email"
                    value={accountSettings.email}
                    onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                  />
                </div>
                <label className="flex items-center gap-3 text-gray-700">
                  <input
                    type="checkbox"
                    checked={accountSettings.careTips}
                    onChange={(e) => setAccountSettings({ ...accountSettings, careTips: e.target.checked })}
                    className="w-5 h-5 accent-[#2d6a4f]"
                  />
                  Email me seasonal care tips and order updates
                </label>
                <button
                  type="submit"
                  className="w-full bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
                >
                  Save Settings
                </button>
              </form>
            </div>
          )}
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
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <button onClick={() => setSelectedPost(post)} className="block w-full h-48" aria-label={`Read ${post.title}`}>
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </button>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-[#52b788] text-white rounded-full text-sm font-semibold">
                  {post.category}
                </span>
                <span className="text-sm text-gray-600">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-[#2d6a4f] mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <button
                onClick={() => setSelectedPost(post)}
                className="text-[#2d6a4f] font-semibold hover:text-[#40916c] transition-colors"
              >
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
            {contactSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#2d6a4f] mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thanks for reaching out. Our plant team will reply within one business day.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="text-[#2d6a4f] font-semibold hover:text-[#40916c] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="plants-contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    id="plants-contact-name"
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="plants-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    id="plants-contact-email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="plants-contact-subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select
                    id="plants-contact-subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                  >
                    <option>General Question</option>
                    <option>Order Support</option>
                    <option>Plant Care Help</option>
                    <option>Subscription Question</option>
                    <option>Partnership Inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="plants-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    id="plants-contact-message"
                    rows={5}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
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
                <a href="tel:555-752-6871" className="text-[#2d6a4f] hover:underline">
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
            <a
              href="tel:555-752-6871"
              className="block text-center w-full bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
            >
              Call Plant Hotline
            </a>
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

  // Page: FAQ
  const FaqPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-4">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-8">Shipping, guarantees, pet safety, subscriptions, and more</p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-bold text-[#2d6a4f]">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-[#2d6a4f] flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === index && (
              <div className="px-5 pb-5 text-gray-700">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#2d6a4f] text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
        <p className="mb-6 text-gray-200">Our plant team answers every message within one business day.</p>
        <button
          onClick={() => goTo('contact')}
          className="bg-[#52b788] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
        >
          Contact Us
        </button>
      </div>
    </div>
  );

  // Page: About
  const AboutPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#2d6a4f] mb-4">About Urban Jungle</h1>
      <p className="text-gray-600 mb-8">Bringing nature into your home, one plant at a time</p>

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2d6a4f] mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Urban Jungle started in a one-car garage greenhouse with fifty Pothos cuttings and a simple belief: everyone deserves a home full of thriving plants, not just people with green thumbs.
          </p>
          <p className="text-gray-700">
            Today our greenhouse at 123 Green Street grows hundreds of varieties, ships nationwide, and pairs every single plant with the care knowledge to keep it alive. We are plant people first, retailers second.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2d6a4f] mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Make plant parenthood succeed for everyone. That means healthy greenhouse-fresh plants, honest difficulty ratings, care guides written by real botanists, and a guarantee that stands behind every leaf we ship.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Leaf, title: 'Healthy First', desc: 'Every plant is inspected twice before it ships' },
              { icon: BookOpen, title: 'Teach, Always', desc: 'Free care guides with every order' },
              { icon: Award, title: 'Stand Behind It', desc: '30-day guarantee, no fine print' }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <Icon className="w-10 h-10 text-[#2d6a4f] mx-auto mb-2" />
                <h3 className="font-bold mb-1">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2d6a4f] mb-4">Sustainability</h2>
          <ul className="space-y-3">
            {[
              'Plastic-free packaging: recycled cardboard, paper tape, and compostable coir wraps',
              'Rainwater collection supplies over half of our greenhouse irrigation',
              'Peat-free potting mixes to protect wetland ecosystems',
              'Local deliveries within 20 miles go out on electric cargo bikes'
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2d6a4f] mb-4">Careers</h2>
          <p className="text-gray-700 mb-6">
            We are a small team of plant obsessives and we are growing. Current openings:
          </p>
          <div className="space-y-4">
            {[
              { role: 'Greenhouse Technician', type: 'Full-time • On-site' },
              { role: 'Customer Care Botanist', type: 'Part-time • Remote friendly' }
            ].map(({ role, type }) => (
              <div key={role} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-bold text-lg">{role}</h3>
                  <p className="text-gray-600 text-sm">{type}</p>
                </div>
                <a
                  href={`mailto:careers@urbanjungle.com?subject=Application: ${encodeURIComponent(role)}`}
                  className="bg-[#2d6a4f] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
                >
                  Apply
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#2d6a4f] text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Come Say Hi</h2>
          <p className="mb-6 text-gray-200">Our greenhouse is open for shopping and free plant consultations.</p>
          <button
            onClick={() => goTo('contact')}
            className="bg-[#52b788] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );

  // Modal shell
  const ModalShell = (onClose: () => void, children: React.ReactNode, maxWidth = 'max-w-2xl') => (
    <div
      className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[85vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  // Plant detail modal
  const PlantDetailModal = () => {
    if (!selectedPlant) return null;
    const plant = selectedPlant;
    return ModalShell(() => setSelectedPlant(null), (
      <div>
        <div className="relative">
          <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover rounded-t-2xl" />
          <button
            onClick={() => setSelectedPlant(null)}
            aria-label="Close"
            className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100 shadow"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          <div className="absolute top-3 left-3 bg-[#2d6a4f] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {plant.difficulty}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h2 className="text-2xl font-bold text-[#2d6a4f]">{plant.name}</h2>
              <p className="text-gray-600 italic">{plant.scientificName}</p>
            </div>
            <span className="text-2xl font-bold text-[#2d6a4f]">${plant.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            {renderStars(plant.rating)}
            <span className="text-sm text-gray-600">{plant.rating} ({plant.reviews} reviews)</span>
          </div>
          <p className="text-gray-700 mb-4">{plant.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
              <Sun className="w-4 h-4 text-yellow-500" /> {plant.light} light
            </span>
            <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
              <Droplets className="w-4 h-4 text-blue-400" /> {plant.water} water
            </span>
            <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
              <Wind className="w-4 h-4 text-cyan-400" /> {plant.humidity} humidity
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{plant.size}</span>
            {plant.petFriendly && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Pet Safe</span>
            )}
            {plant.airPurifying && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Air Purifying</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-[#2d6a4f] mb-2">Care Instructions</h3>
              <ul className="space-y-2">
                {plant.careInstructions.map(instruction => (
                  <li key={instruction} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#2d6a4f] mb-2">Why You'll Love It</h3>
              <ul className="space-y-2">
                {plant.benefits.map(benefit => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                    <Leaf className="w-4 h-4 text-[#52b788] flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => addToCart(plant)}
              className="flex-1 bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#40916c] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(plant.id)}
              className={`px-4 py-3 border-2 rounded-lg transition-colors ${
                wishlist.includes(plant.id) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:bg-gray-50'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.includes(plant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
      </div>
    ), 'max-w-3xl');
  };

  // Care guide modal
  const GuideModal = () => {
    if (!selectedGuide) return null;
    const guide = selectedGuide;
    return ModalShell(() => setSelectedGuide(null), (
      <div>
        <div className="relative">
          <img src={guide.image} alt={guide.title} className="w-full h-56 object-cover rounded-t-2xl" />
          <button
            onClick={() => setSelectedGuide(null)}
            aria-label="Close"
            className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100 shadow"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-[#52b788] text-white rounded-full text-sm font-semibold">{guide.category}</span>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {guide.readTime} read
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#2d6a4f] mb-4">{guide.title}</h2>
          <div className="space-y-4 mb-6">
            {guide.content.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setSelectedGuide(null); goTo('shop'); }}
              className="flex-1 bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
            >
              Shop Plants
            </button>
            <button
              onClick={() => setSelectedGuide(null)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    ));
  };

  // Blog post modal
  const PostModal = () => {
    if (!selectedPost) return null;
    const post = selectedPost;
    return ModalShell(() => setSelectedPost(null), (
      <div>
        <div className="relative">
          <img src={post.image} alt={post.title} className="w-full h-56 object-cover rounded-t-2xl" />
          <button
            onClick={() => setSelectedPost(null)}
            aria-label="Close"
            className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100 shadow"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-[#52b788] text-white rounded-full text-sm font-semibold">{post.category}</span>
            <span className="text-sm text-gray-600">{post.date}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#2d6a4f] mb-4">{post.title}</h2>
          <div className="space-y-4 mb-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setSelectedPost(null); goTo('shop'); }}
              className="flex-1 bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
            >
              Shop Plants
            </button>
            <button
              onClick={() => setSelectedPost(null)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    ));
  };

  // Subscription signup modal
  const SubscribeModal = () => {
    if (!subscribePlan) return null;
    const plan = subscribePlan;
    return ModalShell(() => setSubscribePlan(null), (
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#2d6a4f]">
            {subscribeDone ? "You're Subscribed!" : `Subscribe: ${plan.name}`}
          </h2>
          <button
            onClick={() => setSubscribePlan(null)}
            aria-label="Close"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {subscribeDone ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-gray-700 mb-2">
              Welcome to the <span className="font-bold text-[#2d6a4f]">{plan.name}</span> plan.
            </p>
            <p className="text-gray-600 mb-6">
              Your first box of {plan.plantsPerMonth} {plan.plantsPerMonth === 1 ? 'plant' : 'plants'} arrives around {nextDeliveryDate()}. This is a demo signup, nothing is charged.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setSubscribePlan(null); setAccountTab('subscription'); goTo('account'); }}
                className="flex-1 bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40916c] transition-colors"
              >
                View My Subscription
              </button>
              <button
                onClick={() => setSubscribePlan(null)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="font-semibold text-gray-800">{plan.description}</p>
              <p className="text-gray-600 text-sm mt-1">
                {plan.plantsPerMonth} {plan.plantsPerMonth === 1 ? 'plant' : 'plants'} per month • <span className="font-bold text-[#2d6a4f]">${plan.price}/month</span> • Cancel or pause anytime
              </p>
            </div>
            <form onSubmit={handleSubscribeSubmit} className="space-y-4">
              <div>
                <label htmlFor="plants-sub-name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  id="plants-sub-name"
                  type="text"
                  value={subscribeForm.name}
                  onChange={(e) => setSubscribeForm({ ...subscribeForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="plants-sub-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  id="plants-sub-email"
                  type="email"
                  value={subscribeForm.email}
                  onChange={(e) => setSubscribeForm({ ...subscribeForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              {subscribeError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{subscribeError}</div>
              )}
              <p className="text-xs text-gray-500">Demo signup: no payment is collected and no charges occur.</p>
              <button
                type="submit"
                className="w-full bg-[#2d6a4f] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#40916c] transition-colors"
              >
                Start My Subscription
              </button>
            </form>
          </div>
        )}
      </div>
    ), 'max-w-md');
  };

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
              <li><button onClick={() => goTo('shop')} className="hover:text-white">All Plants</button></li>
              <li><button onClick={() => goTo('subscriptions')} className="hover:text-white">Subscriptions</button></li>
              <li><button onClick={() => goTo('care-guides')} className="hover:text-white">Care Guides</button></li>
              <li><button onClick={() => goTo('blog')} className="hover:text-white">Blog</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => goTo('contact')} className="hover:text-white">Contact Us</button></li>
              <li><button onClick={() => goTo('faq')} className="hover:text-white">FAQ</button></li>
              <li><button onClick={() => goTo('delivery')} className="hover:text-white">Shipping Info</button></li>
              <li><button onClick={() => goTo('delivery')} className="hover:text-white">Returns</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => goTo('about')} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => goTo('about')} className="hover:text-white">Our Mission</button></li>
              <li><button onClick={() => goTo('about')} className="hover:text-white">Sustainability</button></li>
              <li><button onClick={() => goTo('about')} className="hover:text-white">Careers</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#40916c] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2026 Urban Jungle Plant Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {Navigation()}
      <main>
        {currentPage === 'home' && HomePage()}
        {currentPage === 'shop' && ShopPage()}
        {currentPage === 'care-guides' && CareGuidesPage()}
        {currentPage === 'quiz' && QuizPage()}
        {currentPage === 'subscriptions' && SubscriptionsPage()}
        {currentPage === 'delivery' && DeliveryPage()}
        {currentPage === 'cart' && CartPage()}
        {currentPage === 'checkout' && CheckoutPage()}
        {currentPage === 'order-confirmation' && OrderConfirmationPage()}
        {currentPage === 'account' && AccountPage()}
        {currentPage === 'blog' && BlogPage()}
        {currentPage === 'contact' && ContactPage()}
        {currentPage === 'faq' && FaqPage()}
        {currentPage === 'about' && AboutPage()}
      </main>
      {Footer()}

      {/* Modals */}
      {PlantDetailModal()}
      {GuideModal()}
      {PostModal()}
      {SubscribeModal()}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] bg-[#2d6a4f] text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#52b788]" />
          <span className="font-semibold">{toast}</span>
        </div>
      )}
    </div>
  );
};

export default UrbanJunglePlantShop;
