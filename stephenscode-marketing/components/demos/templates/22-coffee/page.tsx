'use client';

import React, { useEffect, useState } from 'react';
import { Coffee, ShoppingCart, Gift, Package, BookOpen, Users, User, Star, Search, Heart, CheckCircle2, TruckIcon, Award, ThermometerSun, Droplets, Clock, Phone, MapPin, ChevronRight, X, Send, Mail } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

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
  ratio: string;
  waterTemp: string;
  grind: string;
  steps: string[];
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
}

type CartItem = CoffeeProduct & { quantity: number; grind: string };

interface Order {
  id: string;
  date: string;
  items: Array<{ name: string; grind: string; quantity: number; price: number }>;
  total: number;
  status: string;
}

interface ActiveSubscription {
  planId: string;
  planName: string;
  price: number;
  grind: string;
  frequency: string;
  startedAt: string;
}

type Page = 'home' | 'shop' | 'subscriptions' | 'wholesale' | 'brewing' | 'story' | 'cart' | 'checkout' | 'account' | 'blog' | 'contact';

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
    description: 'Clean, bright cup highlighting coffee complexity',
    ratio: '1:16 (22g coffee to 350g water)',
    waterTemp: '195-205 F',
    grind: 'Medium-fine, like table salt',
    steps: [
      'Place a filter in your dripper and rinse it with hot water to remove paper taste. Discard the rinse water.',
      'Add 22g of medium-fine ground coffee and level the bed. Place on your scale and tare.',
      'Start a timer and pour 50g of water in slow circles to saturate all grounds. Let it bloom for 45 seconds.',
      'Pour in slow, steady spirals up to 350g total water by the 2:45 mark, keeping the water level consistent.',
      'Allow full drawdown. Total brew time should land between 3:30 and 4:00.',
      'Give the carafe a gentle swirl and serve. Adjust grind finer if it tasted weak, coarser if bitter.'
    ]
  },
  {
    id: '2',
    title: 'French Press',
    method: 'Immersion',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&h=400&fit=crop',
    difficulty: 'Beginner',
    time: '4 minutes',
    description: 'Full-bodied, rich coffee with oils and sediment',
    ratio: '1:15 (30g coffee to 450g water)',
    waterTemp: '200 F',
    grind: 'Coarse, like breadcrumbs',
    steps: [
      'Preheat your French press with hot water, then discard the water.',
      'Add 30g of coarsely ground coffee to the press.',
      'Start a timer and pour 450g of water just off the boil, saturating all the grounds.',
      'Rest the lid on top without plunging and wait 4 minutes.',
      'Break the crust with a spoon, skim any floating grounds, then press the plunger down slowly.',
      'Pour immediately into cups or a carafe so the coffee does not over-extract sitting on the grounds.'
    ]
  },
  {
    id: '3',
    title: 'Espresso Mastery',
    method: 'Espresso',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&h=400&fit=crop',
    difficulty: 'Advanced',
    time: '25-30 seconds',
    description: 'Concentrated, intense coffee shot with crema',
    ratio: '1:2 (18g in, 36g out)',
    waterTemp: '198-202 F',
    grind: 'Fine, like powdered sugar with slight grit',
    steps: [
      'Dose 18g of finely ground coffee into a clean, dry portafilter basket.',
      'Distribute the grounds evenly, then tamp with firm, level pressure.',
      'Lock in the portafilter and start the shot immediately.',
      'Aim for 36g of espresso in 25-30 seconds from the first drip.',
      'Look for a steady, honey-like flow and a rich golden crema.',
      'Dial in: if the shot ran fast and tastes sour, grind finer. If slow and bitter, grind coarser.'
    ]
  }
];

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Store Coffee Beans for Maximum Freshness',
    category: 'Coffee Tips',
    date: 'March 12, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop',
    excerpt: 'Freshly roasted coffee starts losing flavor the moment the bag is opened. Here is how to slow that down.',
    content: [
      'Coffee has four enemies: air, moisture, heat, and light. Every one of them speeds up the staling process that turns a vibrant, aromatic bag of beans into something flat and cardboard-like. The good news is that all four are easy to control at home.',
      'Keep beans in an airtight, opaque container at room temperature. A dedicated coffee canister with a one-way valve is ideal, but any sealed jar stored inside a cabinet works well. Avoid clear jars on a sunny countertop, as light degrades the oils that carry most of the flavor.',
      'Skip the refrigerator. Coffee is porous and absorbs surrounding odors, and the temperature swings every time the door opens create condensation inside the bag. The freezer can work for long-term storage of unopened bags, but only freeze once and thaw fully sealed.',
      'Finally, buy whole bean and grind right before brewing. Ground coffee has vastly more surface area exposed to air and goes stale within days, while whole beans hold their character for weeks. It is the single biggest upgrade you can make to your morning cup.'
    ]
  },
  {
    id: '2',
    title: 'Understanding Roast Levels: Light to Dark',
    category: 'Coffee Education',
    date: 'February 28, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop',
    excerpt: 'Light, medium, or dark? What roast level actually changes in the cup, and how to pick the right one for you.',
    content: [
      'Roast level describes how long and how hot the green coffee was roasted, and it changes almost everything about how the coffee tastes. It is not a quality scale. A great light roast and a great dark roast are simply different experiences.',
      'Light roasts are pulled from the roaster shortly after first crack. They preserve the most origin character: florals, fruit, and bright acidity. If you want to taste what makes an Ethiopian coffee different from a Kenyan, light roasts show it most clearly.',
      'Medium roasts balance origin character with roast development. Acidity softens, body increases, and sweetness moves toward caramel and chocolate. This is the crowd-pleasing middle ground and our most popular roast level for drip brewing.',
      'Dark roasts push further, developing bold, smoky, bittersweet flavors that come more from the roasting process than the origin. They shine as espresso and stand up beautifully to milk. If you love a heavy, intense cup, this is your lane.',
      'The best way to find your preference is to taste side by side. Brew a light and a dark roast the same way on the same morning and pay attention to which cup you keep reaching for.'
    ]
  },
  {
    id: '3',
    title: 'What Does Single Origin Really Mean?',
    category: 'Coffee Education',
    date: 'February 10, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop',
    excerpt: 'Single origin is more than a marketing label. Here is what it tells you about the coffee in your cup.',
    content: [
      'A single origin coffee comes from one place: sometimes a single country, often a single region, and at its most specific, a single farm or washing station. The narrower the source, the more distinct and traceable the flavor.',
      'Why does it matter? Coffee is an agricultural product, and like wine grapes, the same plant grown in different soil, altitude, and climate tastes different. A washed Ethiopian from Yirgacheffe brings jasmine and citrus. A wet-hulled Sumatran brings earth and dark chocolate. Blending averages those characters out; single origins let them speak.',
      'Blends still have an important place. A well-built blend delivers a consistent flavor profile year-round and is often designed specifically for espresso or milk drinks. We roast both for exactly that reason.',
      'If you are new to single origins, start with a washed Central American coffee for clean, approachable sweetness, then branch out to African coffees when you are ready for brighter, fruitier cups.'
    ]
  },
  {
    id: '4',
    title: 'Cold Brew vs Iced Coffee: What Is the Difference?',
    category: 'Brewing',
    date: 'January 22, 2024',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&h=400&fit=crop',
    excerpt: 'They both end up cold and over ice, but they are made completely differently and taste nothing alike.',
    content: [
      'Iced coffee is hot-brewed coffee that has been chilled and poured over ice. Because it is brewed hot, it keeps the acidity and aromatics of a normal cup. Brew it slightly stronger than usual so the melting ice does not water it down.',
      'Cold brew never touches hot water. Coarsely ground coffee steeps in room temperature or cold water for 12 to 18 hours, then gets filtered. The result is a smooth, low-acid concentrate with heavy chocolate and nut tones and almost no bitterness.',
      'Which should you make? If you love bright, complex flavor, go iced with a light roast. If you want something smooth, sweet, and easy to batch for the week, cold brew is hard to beat. Our Brazil Santos and French Roast Blend both make outstanding cold brew.',
      'A starter recipe: 100g coarse ground coffee to 1 liter of cold water, steeped 16 hours in the refrigerator, then filtered. Dilute the concentrate 1:1 with water or milk over ice.'
    ]
  }
];

const roastLevels = ['All', 'Light', 'Medium', 'Medium-Dark', 'Dark'];
const origins = ['All', 'Ethiopia', 'Colombia', 'Indonesia', 'Costa Rica', 'Guatemala', 'Brazil', 'Kenya', 'Blend'];

const DEMO_SLUG = 'roasted-perfection-coffee';
const DEMO_NAME = 'Roasted Perfection Coffee';
const DEMO_PACKAGE = 'E-Commerce Website ($1,100)';

const STORAGE_KEYS = {
  cart: 'coffee-demo-cart',
  wishlist: 'coffee-demo-wishlist',
  orders: 'coffee-demo-orders',
  subscription: 'coffee-demo-subscription'
};

const RoastedPerfectionCoffee = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [productGrinds, setProductGrinds] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  // Nav search
  const [navSearchOpen, setNavSearchOpen] = useState(false);

  // Product detail modal
  const [detailProduct, setDetailProduct] = useState<CoffeeProduct | null>(null);
  const [detailGrind, setDetailGrind] = useState('Whole Bean');
  const [detailQty, setDetailQty] = useState(1);
  const [detailAdded, setDetailAdded] = useState(false);

  // Subscriptions
  const [subscribeModal, setSubscribeModal] = useState<Subscription | null>(null);
  const [subGrind, setSubGrind] = useState('Whole Bean');
  const [subFrequency, setSubFrequency] = useState('Monthly');
  const [subConfirmed, setSubConfirmed] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState<ActiveSubscription | null>(null);

  // Brewing + blog modals
  const [brewGuideModal, setBrewGuideModal] = useState<BrewGuide | null>(null);
  const [blogPostModal, setBlogPostModal] = useState<BlogPost | null>(null);

  // Checkout
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shipping, setShipping] = useState({ name: '', email: '', address: '', city: '', state: '', zip: '' });
  const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Wholesale form
  const [whFormOpen, setWhFormOpen] = useState(false);
  const [whForm, setWhForm] = useState({ name: '', business: '', email: '', phone: '', businessType: 'Cafe / Coffee Shop', volume: '25-50 lbs / month', message: '' });
  const [whSubmitted, setWhSubmitted] = useState(false);

  // Contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Load persisted state
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.cart);
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem(STORAGE_KEYS.wishlist);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedOrders = localStorage.getItem(STORAGE_KEYS.orders);
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      const savedSub = localStorage.getItem(STORAGE_KEYS.subscription);
      if (savedSub) setActiveSubscription(JSON.parse(savedSub));
    } catch {
      // Corrupt or unavailable storage: start fresh
    }
    setHydrated(true);
  }, []);

  // Persist state
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart)); } catch { /* storage unavailable */ }
  }, [cart, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist)); } catch { /* storage unavailable */ }
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders)); } catch { /* storage unavailable */ }
  }, [orders, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (activeSubscription) {
        localStorage.setItem(STORAGE_KEYS.subscription, JSON.stringify(activeSubscription));
      } else {
        localStorage.removeItem(STORAGE_KEYS.subscription);
      }
    } catch { /* storage unavailable */ }
  }, [activeSubscription, hydrated]);

  const goToPage = (page: Page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  };

  // Cart functions
  const addToCart = (coffee: CoffeeProduct, grind: string = 'Whole Bean', quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === coffee.id && item.grind === grind);
      if (existing) {
        return prev.map(item =>
          item.id === coffee.id && item.grind === grind ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...coffee, quantity, grind }];
    });
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
  const shippingCost = cartTotal >= 40 ? 0 : 6.99;
  const orderTotal = cartTotal + (cart.length > 0 ? shippingCost : 0);

  const toggleWishlist = (coffeeId: string) => {
    if (wishlist.includes(coffeeId)) {
      setWishlist(wishlist.filter(id => id !== coffeeId));
    } else {
      setWishlist([...wishlist, coffeeId]);
    }
  };

  const openProductDetail = (coffee: CoffeeProduct) => {
    setDetailProduct(coffee);
    setDetailGrind(productGrinds[coffee.id] || 'Whole Bean');
    setDetailQty(1);
    setDetailAdded(false);
  };

  const openSubscribeModal = (sub: Subscription) => {
    setSubscribeModal(sub);
    setSubGrind('Whole Bean');
    setSubFrequency('Monthly');
    setSubConfirmed(false);
  };

  const startCheckout = () => {
    setCheckoutStep(1);
    setPlacedOrder(null);
    goToPage('checkout');
  };

  const placeOrder = () => {
    const order: Order = {
      id: `RP-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      items: cart.map(item => ({ name: item.name, grind: item.grind, quantity: item.quantity, price: item.price })),
      total: orderTotal,
      status: 'Confirmed'
    };
    setOrders(prev => [order, ...prev]);
    setPlacedOrder(order);
    setCart([]);
    setPayment({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
    setCheckoutStep(4);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  };

  const submitLead = async (payload: { clientName: string; clientEmail: string; clientPhone: string; service: string; notes: string }) => {
    const response = await fetch('/api/demo-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        demoName: DEMO_NAME,
        demoPackage: DEMO_PACKAGE,
        demoSlug: DEMO_SLUG,
        clientName: payload.clientName,
        clientPhone: payload.clientPhone,
        clientEmail: payload.clientEmail,
        service: payload.service,
        preferredDate: '',
        preferredTime: '',
        notes: payload.notes
      })
    });
    return response.ok;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ok = await submitLead({
        clientName: contactForm.name,
        clientEmail: contactForm.email,
        clientPhone: contactForm.phone,
        service: contactForm.subject,
        notes: contactForm.message
      });
      if (ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: DEMO_SLUG });
        trackConversion('leadForm');
        setContactSubmitted(true);
      }
    } catch {
      // Network/API failure -- form stays visible so the user can retry
    }
  };

  const handleWholesaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ok = await submitLead({
        clientName: whForm.name,
        clientEmail: whForm.email,
        clientPhone: whForm.phone,
        service: 'Wholesale Inquiry',
        notes: `Business: ${whForm.business} | Type: ${whForm.businessType} | Est. volume: ${whForm.volume} | ${whForm.message}`
      });
      if (ok) {
        trackEvent('generate_lead', { form_name: 'demo_wholesale_form', demo_slug: DEMO_SLUG });
        trackConversion('leadForm');
        setWhSubmitted(true);
      }
    } catch {
      // Network/API failure -- form stays visible so the user can retry
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

  const renderStars = (rating: number, reviews: number) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({reviews})</span>
    </div>
  );

  // Navigation
  const renderNavigation = () => (
    <nav className="bg-[#3e2723] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => goToPage('home')} className="flex items-center gap-3 text-left">
            <Coffee className="w-8 h-8 text-[#8d6e63]" />
            <div>
              <h1 className="text-2xl font-bold">Roasted Perfection</h1>
              <p className="text-xs text-[#8d6e63]">Artisan Coffee Roasters</p>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => goToPage('account')}
              aria-label="My Account"
              className={`hover:text-[#8d6e63] transition-colors ${currentPage === 'account' ? 'text-[#8d6e63]' : ''}`}
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setNavSearchOpen(!navSearchOpen)}
              aria-label="Search coffees"
              className={`hover:text-[#8d6e63] transition-colors ${navSearchOpen ? 'text-[#8d6e63]' : ''}`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => goToPage('cart')}
              aria-label="Shopping cart"
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
        {navSearchOpen && (
          <div className="mb-4 flex gap-2">
            <input
              id="coffee-nav-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  goToPage('shop');
                  setNavSearchOpen(false);
                }
              }}
              placeholder="Search by coffee name or origin..."
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 border-2 border-[#8d6e63] focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
            />
            <button
              onClick={() => {
                goToPage('shop');
                setNavSearchOpen(false);
              }}
              className="bg-[#8d6e63] px-5 py-2 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
            >
              Search
            </button>
          </div>
        )}
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
              onClick={() => goToPage(page)}
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
  const renderHomePage = () => (
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
                onClick={() => goToPage('shop')}
                className="bg-[#8d6e63] px-8 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
              >
                Shop Coffee
              </button>
              <button
                onClick={() => goToPage('subscriptions')}
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
                  <button onClick={() => openProductDetail(coffee)} className="w-full h-full block" aria-label={`View ${coffee.name}`}>
                    <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(coffee.id)}
                    aria-label="Toggle wishlist"
                    className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(coffee.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  {coffee.bestseller && (
                    <div className="absolute top-3 left-3 bg-[#3e2723] text-white px-3 py-1 rounded-full text-sm font-semibold pointer-events-none">
                      Bestseller
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <button onClick={() => openProductDetail(coffee)} className="text-left">
                    <h3 className="font-bold text-lg mb-1 hover:text-[#8d6e63] transition-colors">{coffee.name}</h3>
                  </button>
                  <p className="text-sm text-gray-600 mb-2">{coffee.origin}</p>
                  <div className="mb-3">{renderStars(coffee.rating, coffee.reviews)}</div>
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
            onClick={() => goToPage('subscriptions')}
            className="bg-[#8d6e63] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
          >
            Explore Plans
          </button>
        </div>
      </div>
    </div>
  );

  // Page: Shop Coffee
  const renderShopPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-8">Shop Coffee</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="coffee-shop-search" className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              id="coffee-shop-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search coffees..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="coffee-shop-roast" className="block text-sm font-semibold text-gray-700 mb-2">Roast Level</label>
            <select
              id="coffee-shop-roast"
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
            <label htmlFor="coffee-shop-origin" className="block text-sm font-semibold text-gray-700 mb-2">Origin</label>
            <select
              id="coffee-shop-origin"
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
            <label htmlFor="coffee-shop-sort" className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              id="coffee-shop-sort"
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

      {sortedCoffees.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-4">No coffees match your filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRoast('All');
              setSelectedOrigin('All');
            }}
            className="bg-[#3e2723] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedCoffees.map(coffee => (
            <div key={coffee.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <button onClick={() => openProductDetail(coffee)} className="w-full h-full block" aria-label={`View ${coffee.name}`}>
                  <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => toggleWishlist(coffee.id)}
                  aria-label="Toggle wishlist"
                  className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(coffee.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
                <div className="absolute top-3 left-3 bg-[#3e2723] text-white px-3 py-1 rounded-full text-sm font-semibold pointer-events-none">
                  {coffee.roastLevel}
                </div>
              </div>
              <div className="p-4">
                <button onClick={() => openProductDetail(coffee)} className="text-left">
                  <h3 className="font-bold text-lg mb-1 hover:text-[#8d6e63] transition-colors">{coffee.name}</h3>
                </button>
                <p className="text-sm text-gray-600 mb-2">{coffee.origin}</p>
                <div className="mb-2">{renderStars(coffee.rating, coffee.reviews)}</div>
                <p className="text-sm text-gray-600 mb-3">
                  {coffee.tastingNotes.slice(0, 3).join(', ')}
                </p>
                <div className="mb-3">
                  <label htmlFor={`coffee-grind-${coffee.id}`} className="block text-xs font-semibold text-gray-700 mb-1">Grind</label>
                  <select
                    id={`coffee-grind-${coffee.id}`}
                    value={productGrinds[coffee.id] || 'Whole Bean'}
                    className="w-full text-sm px-2 py-1 border border-gray-300 rounded"
                    onChange={(e) => setProductGrinds({ ...productGrinds, [coffee.id]: e.target.value })}
                  >
                    {grindOptions.map(grind => (
                      <option key={grind.id} value={grind.name}>{grind.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#3e2723]">${coffee.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(coffee, productGrinds[coffee.id] || 'Whole Bean')}
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
      )}
    </div>
  );

  const renderSubscriptionsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Gift className="w-16 h-16 text-[#3e2723] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-[#3e2723] mb-4">Coffee Subscriptions</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Get freshly roasted coffee delivered on your schedule. Flexible plans, cancel anytime.
        </p>
      </div>

      {activeSubscription && (
        <div className="max-w-2xl mx-auto mb-10 bg-green-50 border-2 border-green-200 rounded-lg p-6 flex items-start gap-4">
          <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg text-green-800">You have an active subscription</h3>
            <p className="text-green-700">
              {activeSubscription.planName} at ${activeSubscription.price.toFixed(2)}/month ({activeSubscription.frequency.toLowerCase()} delivery, {activeSubscription.grind}).
              Manage it from your account page.
            </p>
            <button
              onClick={() => goToPage('account')}
              className="mt-2 text-green-800 font-semibold underline hover:text-green-900"
            >
              Go to My Account
            </button>
          </div>
        </div>
      )}

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
              <button
                onClick={() => openSubscribeModal(sub)}
                className="w-full bg-[#3e2723] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWholesalePage = () => (
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

      <div className="bg-[#3e2723] text-white rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Become a Wholesale Partner</h2>
        <p className="mb-6">Tell us about your business and our wholesale team will follow up with pricing and options.</p>
        {!whFormOpen && !whSubmitted && (
          <button
            onClick={() => setWhFormOpen(true)}
            className="bg-[#8d6e63] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
          >
            Request Wholesale Info
          </button>
        )}
      </div>

      {whSubmitted ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#3e2723] mb-2">Request Received</h3>
          <p className="text-gray-600 mb-6">
            Thanks, {whForm.name || 'partner'}. Our wholesale team will reach out within one business day with pricing for {whForm.business || 'your business'}.
          </p>
          <button
            onClick={() => {
              setWhSubmitted(false);
              setWhFormOpen(false);
              setWhForm({ name: '', business: '', email: '', phone: '', businessType: 'Cafe / Coffee Shop', volume: '25-50 lbs / month', message: '' });
            }}
            className="text-[#3e2723] font-semibold underline hover:text-[#5d4037]"
          >
            Submit Another Request
          </button>
        </div>
      ) : whFormOpen && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Wholesale Inquiry</h2>
          <form onSubmit={handleWholesaleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="coffee-wh-name" className="block text-sm font-semibold text-gray-700 mb-2">Contact Name *</label>
                <input
                  id="coffee-wh-name"
                  type="text"
                  required
                  value={whForm.name}
                  onChange={(e) => setWhForm({ ...whForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  placeholder="Jordan Rivera"
                />
              </div>
              <div>
                <label htmlFor="coffee-wh-business" className="block text-sm font-semibold text-gray-700 mb-2">Business Name *</label>
                <input
                  id="coffee-wh-business"
                  type="text"
                  required
                  value={whForm.business}
                  onChange={(e) => setWhForm({ ...whForm, business: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  placeholder="Corner Cafe"
                />
              </div>
              <div>
                <label htmlFor="coffee-wh-email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  id="coffee-wh-email"
                  type="email"
                  required
                  value={whForm.email}
                  onChange={(e) => setWhForm({ ...whForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  placeholder="you@business.com"
                />
              </div>
              <div>
                <label htmlFor="coffee-wh-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  id="coffee-wh-phone"
                  type="tel"
                  value={whForm.phone}
                  onChange={(e) => setWhForm({ ...whForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="coffee-wh-type" className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
                <select
                  id="coffee-wh-type"
                  value={whForm.businessType}
                  onChange={(e) => setWhForm({ ...whForm, businessType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                >
                  {['Cafe / Coffee Shop', 'Restaurant', 'Office', 'Retail Store', 'Hotel / Hospitality', 'Other'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="coffee-wh-volume" className="block text-sm font-semibold text-gray-700 mb-2">Estimated Monthly Volume</label>
                <select
                  id="coffee-wh-volume"
                  value={whForm.volume}
                  onChange={(e) => setWhForm({ ...whForm, volume: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                >
                  {['Under 25 lbs / month', '25-50 lbs / month', '50-100 lbs / month', '100+ lbs / month'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="coffee-wh-message" className="block text-sm font-semibold text-gray-700 mb-2">Tell Us About Your Needs</label>
              <textarea
                id="coffee-wh-message"
                rows={4}
                value={whForm.message}
                onChange={(e) => setWhForm({ ...whForm, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                placeholder="Roast preferences, equipment, timeline..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3e2723] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Wholesale Inquiry
            </button>
          </form>
        </div>
      )}
    </div>
  );

  const renderBrewingPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-4">Brewing Guides</h1>
      <p className="text-gray-600 mb-8">Master the art of brewing perfect coffee at home</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {brewGuides.map(guide => (
          <div key={guide.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <button onClick={() => setBrewGuideModal(guide)} className="h-48 w-full block" aria-label={`View ${guide.title} guide`}>
              <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
            </button>
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
              <button
                onClick={() => setBrewGuideModal(guide)}
                className="text-[#3e2723] font-semibold hover:text-[#5d4037] transition-colors flex items-center gap-1"
              >
                View Guide
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOurStoryPage = () => (
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

      <div className="bg-[#3e2723] text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Taste the Difference</h2>
        <p className="mb-6">Explore our current lineup of single origins and blends, roasted fresh this week.</p>
        <button
          onClick={() => goToPage('shop')}
          className="bg-[#8d6e63] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
        >
          Shop Coffee
        </button>
      </div>
    </div>
  );

  const renderCartPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={() => goToPage('shop')}
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
                {cartTotal < 40 && (
                  <p className="text-xs text-gray-500">Add ${(40 - cartTotal).toFixed(2)} more for free shipping</p>
                )}
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-[#3e2723]">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={startCheckout}
                className="w-full bg-[#3e2723] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#5d4037] transition-colors mb-3"
              >
                Checkout
              </button>
              <button
                onClick={() => goToPage('shop')}
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

  const renderCheckoutPage = () => {
    if (checkoutStep !== 4 && cart.length === 0) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty. Add some coffee before checking out.</p>
          <button
            onClick={() => goToPage('shop')}
            className="bg-[#3e2723] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
          >
            Shop Coffee
          </button>
        </div>
      );
    }

    const steps = ['Shipping', 'Payment', 'Review'];

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#3e2723] mb-8">Checkout</h1>

        {checkoutStep < 4 && (
          <div className="flex items-center gap-2 mb-8">
            {steps.map((label, i) => (
              <React.Fragment key={label}>
                <div className={`flex items-center gap-2 ${checkoutStep === i + 1 ? 'text-[#3e2723]' : checkoutStep > i + 1 ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    checkoutStep === i + 1 ? 'bg-[#3e2723] text-white' : checkoutStep > i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {checkoutStep > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </span>
                  <span className="font-semibold text-sm">{label}</span>
                </div>
                {i < steps.length - 1 && <div className="flex-1 h-0.5 bg-gray-200" />}
              </React.Fragment>
            ))}
          </div>
        )}

        {checkoutStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Shipping Information</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCheckoutStep(2);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="coffee-ship-name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    id="coffee-ship-name"
                    type="text"
                    required
                    value={shipping.name}
                    onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                    placeholder="Jordan Rivera"
                  />
                </div>
                <div>
                  <label htmlFor="coffee-ship-email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    id="coffee-ship-email"
                    type="email"
                    required
                    value={shipping.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="coffee-ship-address" className="block text-sm font-semibold text-gray-700 mb-2">Street Address *</label>
                <input
                  id="coffee-ship-address"
                  type="text"
                  required
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="coffee-ship-city" className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <input
                    id="coffee-ship-city"
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="coffee-ship-state" className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                  <input
                    id="coffee-ship-state"
                    type="text"
                    required
                    value={shipping.state}
                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="coffee-ship-zip" className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code *</label>
                  <input
                    id="coffee-ship-zip"
                    type="text"
                    required
                    value={shipping.zip}
                    onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => goToPage('cart')}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#3e2723] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {checkoutStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#3e2723] mb-2">Payment</h2>
            <p className="text-sm text-gray-500 mb-6">
              This is a demo checkout. No real payment is processed and no card details are stored.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCheckoutStep(3);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="coffee-pay-name" className="block text-sm font-semibold text-gray-700 mb-2">Name on Card *</label>
                <input
                  id="coffee-pay-name"
                  type="text"
                  required
                  value={payment.cardName}
                  onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  placeholder="Jordan Rivera"
                />
              </div>
              <div>
                <label htmlFor="coffee-pay-number" className="block text-sm font-semibold text-gray-700 mb-2">Card Number *</label>
                <input
                  id="coffee-pay-number"
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={19}
                  value={payment.cardNumber}
                  onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                  placeholder="4242 4242 4242 4242"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="coffee-pay-expiry" className="block text-sm font-semibold text-gray-700 mb-2">Expiry *</label>
                  <input
                    id="coffee-pay-expiry"
                    type="text"
                    required
                    maxLength={5}
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="coffee-pay-cvv" className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                  <input
                    id="coffee-pay-cvv"
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={4}
                    value={payment.cvv}
                    onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#3e2723] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
                >
                  Review Order
                </button>
              </div>
            </form>
          </div>
        )}

        {checkoutStep === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Review Your Order</h2>
            <div className="space-y-3 mb-6">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.grind}-${idx}`} className="flex items-center gap-4 border-b border-gray-100 pb-3">
                  <img src={item.image} alt={item.name} className="w-14 h-18 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.grind} • Qty {item.quantity}</p>
                  </div>
                  <span className="font-bold text-[#3e2723]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
              <p className="font-semibold text-[#3e2723] mb-1">Shipping to</p>
              <p>{shipping.name}</p>
              <p>{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-[#3e2723]">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCheckoutStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={placeOrder}
                className="flex-1 bg-[#3e2723] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#5d4037] transition-colors"
              >
                Place Order
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Demo order only. No payment will be charged.
            </p>
          </div>
        )}

        {checkoutStep === 4 && placedOrder && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#3e2723] mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you, {shipping.name || 'friend'}. Your order <span className="font-bold text-[#3e2723]">{placedOrder.id}</span> has been placed.
              A confirmation was sent to {shipping.email || 'your email'}.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 text-left mb-6 max-w-md mx-auto">
              <h3 className="font-bold text-[#3e2723] mb-3">Order Summary</h3>
              {placedOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm mb-2">
                  <span>{item.name} ({item.grind}) x{item.quantity}</span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2 mt-2 font-bold">
                <span>Total</span>
                <span>${placedOrder.total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                <TruckIcon className="w-4 h-4" />
                Roasting fresh and shipping within 2 business days
              </p>
            </div>
            <p className="text-xs text-gray-500 mb-6">This was a simulated demo checkout. No real payment was processed.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => goToPage('account')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                View Order History
              </button>
              <button
                onClick={() => goToPage('shop')}
                className="bg-[#3e2723] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAccountPage = () => {
    const wishlistCoffees = coffees.filter(c => wishlist.includes(c.id));
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#3e2723] mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-[#3e2723] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#3e2723]">Coffee Lover</h2>
                <p className="text-gray-600">coffee@example.com</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-[#3e2723] mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                My Subscription
              </h3>
              {activeSubscription ? (
                <div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="font-bold text-green-800">{activeSubscription.planName}</p>
                    <p className="text-sm text-green-700">${activeSubscription.price.toFixed(2)}/month • {activeSubscription.frequency} delivery</p>
                    <p className="text-sm text-green-700">Grind: {activeSubscription.grind}</p>
                    <p className="text-xs text-green-600 mt-1">Started {new Date(activeSubscription.startedAt).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => setActiveSubscription(null)}
                    className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm"
                  >
                    Cancel Subscription
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 text-sm mb-4">No active subscription. Get fresh coffee delivered on your schedule.</p>
                  <button
                    onClick={() => goToPage('subscriptions')}
                    className="w-full bg-[#3e2723] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors text-sm"
                  >
                    Explore Plans
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-[#3e2723] mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                My Wishlist ({wishlistCoffees.length})
              </h3>
              {wishlistCoffees.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">Your wishlist is empty. Tap the heart on any coffee to save it here.</p>
                  <button
                    onClick={() => goToPage('shop')}
                    className="bg-[#3e2723] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors text-sm"
                  >
                    Browse Coffees
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlistCoffees.map(coffee => (
                    <div key={coffee.id} className="flex items-center gap-4 border border-gray-100 rounded-lg p-3">
                      <img src={coffee.image} alt={coffee.name} className="w-14 h-18 object-cover rounded" />
                      <div className="flex-1">
                        <button onClick={() => openProductDetail(coffee)} className="text-left">
                          <p className="font-semibold hover:text-[#8d6e63] transition-colors">{coffee.name}</p>
                        </button>
                        <p className="text-sm text-gray-600">{coffee.origin} • ${coffee.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => addToCart(coffee)}
                        className="bg-[#3e2723] text-white px-3 py-2 rounded-lg hover:bg-[#5d4037] transition-colors text-sm"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(coffee.id)}
                        aria-label={`Remove ${coffee.name} from wishlist`}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-[#3e2723] mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order History ({orders.length})
              </h3>
              {orders.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">No orders yet. Your completed orders will appear here.</p>
                  <button
                    onClick={() => goToPage('shop')}
                    className="bg-[#3e2723] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors text-sm"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-bold text-[#3e2723]">{order.id}</p>
                          <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-1">
                            {order.status}
                          </span>
                          <p className="font-bold text-[#3e2723]">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.items.map((item, i) => (
                          <p key={i}>{item.name} ({item.grind}) x{item.quantity}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBlogPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-4">Coffee Blog</h1>
      <p className="text-gray-600 mb-8">Tips, recipes, and stories from the world of coffee</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <button onClick={() => setBlogPostModal(post)} className="h-56 w-full block" aria-label={`Read ${post.title}`}>
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </button>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3 text-sm">
                <span className="px-3 py-1 bg-[#8d6e63] text-white rounded-full font-semibold">{post.category}</span>
                <span className="text-gray-500">{post.date}</span>
                <span className="text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#3e2723] mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <button
                onClick={() => setBlogPostModal(post)}
                className="text-[#3e2723] font-semibold hover:text-[#5d4037] transition-colors flex items-center gap-1"
              >
                Read More
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#3e2723] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Phone, title: 'Phone', lines: ['(555) 812-2739', 'Mon-Fri 8am-5pm'] },
          { icon: Mail, title: 'Email', lines: ['hello@roastedperfection.example', 'Replies within 1 business day'] },
          { icon: MapPin, title: 'Roastery', lines: ['456 Roast House Lane', 'Bean City, TX 77000'] }
        ].map(({ icon: Icon, title, lines }) => (
          <div key={title} className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Icon className="w-10 h-10 text-[#3e2723] mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            {lines.map(line => (
              <p key={line} className="text-gray-600 text-sm">{line}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Get In Touch</h2>
        {contactSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#3e2723] mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thanks for reaching out. We will get back to you within one business day.
            </p>
            <button
              onClick={() => {
                setContactSubmitted(false);
                setContactForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
              }}
              className="text-[#3e2723] font-semibold underline hover:text-[#5d4037]"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="coffee-contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  id="coffee-contact-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723]"
                  placeholder="Jordan Rivera"
                />
              </div>
              <div>
                <label htmlFor="coffee-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  id="coffee-contact-email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723]"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="coffee-contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  id="coffee-contact-phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723]"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="coffee-contact-subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <select
                  id="coffee-contact-subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723]"
                >
                  {['General Inquiry', 'Order Question', 'Subscription Question', 'Wholesale', 'Brewing Help', 'Other'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="coffee-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
              <textarea
                id="coffee-contact-message"
                rows={5}
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723]"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3e2723] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );

  const renderFooter = () => (
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
              <li><button onClick={() => goToPage('shop')} className="hover:text-white">All Coffee</button></li>
              <li><button onClick={() => goToPage('subscriptions')} className="hover:text-white">Subscriptions</button></li>
              <li><button onClick={() => goToPage('wholesale')} className="hover:text-white">Wholesale</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Learn</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => goToPage('brewing')} className="hover:text-white">Brewing Guides</button></li>
              <li><button onClick={() => goToPage('blog')} className="hover:text-white">Blog</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => goToPage('story')} className="hover:text-white">Our Story</button></li>
              <li><button onClick={() => goToPage('contact')} className="hover:text-white">Contact</button></li>
              <li><button onClick={() => goToPage('account')} className="hover:text-white">My Account</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#5d4037] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Roasted Perfection Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // Product detail modal
  const renderProductDetailModal = () => {
    if (!detailProduct) return null;
    const coffee = detailProduct;
    return (
      <div
        className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
        onClick={() => setDetailProduct(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-full min-h-[300px]">
              <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover md:rounded-l-2xl" />
              {coffee.bestseller && (
                <div className="absolute top-3 left-3 bg-[#3e2723] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Bestseller
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-[#3e2723]">{coffee.name}</h2>
                  <p className="text-gray-600">{coffee.origin} • {coffee.roastLevel} Roast</p>
                </div>
                <button
                  onClick={() => setDetailProduct(null)}
                  aria-label="Close"
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-3">{renderStars(coffee.rating, coffee.reviews)}</div>
              <p className="text-gray-700 mb-4">{coffee.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {coffee.tastingNotes.map(note => (
                  <span key={note} className="px-3 py-1 bg-[#8d6e63]/10 text-[#5d4037] rounded-full text-sm font-semibold">
                    {note}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Process</p>
                  <p className="font-semibold text-[#3e2723]">{coffee.process}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Altitude</p>
                  <p className="font-semibold text-[#3e2723]">{coffee.altitude}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Variety</p>
                  <p className="font-semibold text-[#3e2723]">{coffee.variety}</p>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="coffee-detail-grind" className="block text-sm font-semibold text-gray-700 mb-2">Grind</label>
                <select
                  id="coffee-detail-grind"
                  value={detailGrind}
                  onChange={(e) => setDetailGrind(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                >
                  {grindOptions.map(grind => (
                    <option key={grind.id} value={grind.name}>{grind.name} ({grind.description})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDetailQty(Math.max(1, detailQty - 1))}
                    className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-semibold">{detailQty}</span>
                  <button
                    onClick={() => setDetailQty(detailQty + 1)}
                    className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-2xl font-bold text-[#3e2723]">${(coffee.price * detailQty).toFixed(2)}</span>
              </div>

              {detailAdded && (
                <p className="flex items-center gap-2 text-green-600 font-semibold text-sm mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Added to cart
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(coffee, detailGrind, detailQty);
                    setDetailAdded(true);
                  }}
                  className="flex-1 bg-[#3e2723] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(coffee.id)}
                  aria-label="Toggle wishlist"
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(coffee.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
              {detailAdded && (
                <button
                  onClick={() => {
                    setDetailProduct(null);
                    goToPage('cart');
                  }}
                  className="w-full mt-3 bg-gray-100 text-[#3e2723] px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  View Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Subscription modal
  const renderSubscribeModal = () => {
    if (!subscribeModal) return null;
    const sub = subscribeModal;
    return (
      <div
        className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
        onClick={() => setSubscribeModal(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {subConfirmed ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#3e2723] mb-2">Subscription Started!</h3>
              <p className="text-gray-600 mb-4">
                Welcome to the {sub.name} plan. Your first shipment of {sub.bagsPerMonth} bag{sub.bagsPerMonth > 1 ? 's' : ''} ({subGrind}) will roast and ship within 2 business days, then arrive {subFrequency.toLowerCase()}.
              </p>
              <p className="text-xs text-gray-500 mb-6">Demo subscription only. No payment was processed.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSubscribeModal(null);
                    goToPage('account');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Manage in Account
                </button>
                <button
                  onClick={() => setSubscribeModal(null)}
                  className="flex-1 bg-[#3e2723] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#3e2723]">{sub.name}</h3>
                  <p className="text-gray-600">{sub.description}</p>
                </div>
                <button
                  onClick={() => setSubscribeModal(null)}
                  aria-label="Close"
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#3e2723]">${sub.price}</span>
                <span className="text-gray-600">/month • {sub.bagsPerMonth} bag{sub.bagsPerMonth > 1 ? 's' : ''} (12oz)</span>
              </div>
              <div className="mb-4">
                <label htmlFor="coffee-sub-grind" className="block text-sm font-semibold text-gray-700 mb-2">Grind Preference</label>
                <select
                  id="coffee-sub-grind"
                  value={subGrind}
                  onChange={(e) => setSubGrind(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                >
                  {grindOptions.map(grind => (
                    <option key={grind.id} value={grind.name}>{grind.name} ({grind.description})</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="coffee-sub-frequency" className="block text-sm font-semibold text-gray-700 mb-2">Delivery Frequency</label>
                <select
                  id="coffee-sub-frequency"
                  value={subFrequency}
                  onChange={(e) => setSubFrequency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e2723] focus:border-transparent"
                >
                  {['Every 2 Weeks', 'Monthly', 'Every 6 Weeks'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              {activeSubscription && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  Starting this plan will replace your current {activeSubscription.planName} subscription.
                </p>
              )}
              <button
                onClick={() => {
                  setActiveSubscription({
                    planId: sub.id,
                    planName: sub.name,
                    price: sub.price,
                    grind: subGrind,
                    frequency: subFrequency,
                    startedAt: new Date().toISOString()
                  });
                  setSubConfirmed(true);
                }}
                className="w-full bg-[#3e2723] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#5d4037] transition-colors"
              >
                Start Subscription
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">Demo signup. No payment will be charged. Cancel anytime.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Brew guide modal
  const renderBrewGuideModal = () => {
    if (!brewGuideModal) return null;
    const guide = brewGuideModal;
    return (
      <div
        className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
        onClick={() => setBrewGuideModal(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-56">
            <img src={guide.image} alt={guide.title} className="w-full h-full object-cover rounded-t-2xl" />
            <button
              onClick={() => setBrewGuideModal(null)}
              aria-label="Close"
              className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100 text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-3 flex gap-2">
              <span className="px-3 py-1 bg-[#8d6e63] text-white rounded-full text-sm font-semibold">{guide.difficulty}</span>
              <span className="px-3 py-1 bg-white/90 text-[#3e2723] rounded-full text-sm font-semibold flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {guide.time}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-[#3e2723] mb-2">{guide.title}</h3>
            <p className="text-gray-700 mb-6">{guide.description}</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Droplets className="w-6 h-6 text-[#3e2723] mx-auto mb-1" />
                <p className="text-xs text-gray-500 mb-1">Ratio</p>
                <p className="font-semibold text-sm text-[#3e2723]">{guide.ratio}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <ThermometerSun className="w-6 h-6 text-[#3e2723] mx-auto mb-1" />
                <p className="text-xs text-gray-500 mb-1">Water Temp</p>
                <p className="font-semibold text-sm text-[#3e2723]">{guide.waterTemp}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Coffee className="w-6 h-6 text-[#3e2723] mx-auto mb-1" />
                <p className="text-xs text-gray-500 mb-1">Grind</p>
                <p className="font-semibold text-sm text-[#3e2723]">{guide.grind}</p>
              </div>
            </div>

            <h4 className="font-bold text-[#3e2723] mb-3">Step by Step</h4>
            <ol className="space-y-3 mb-6">
              {guide.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-7 h-7 bg-[#3e2723] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setBrewGuideModal(null);
                  goToPage('shop');
                }}
                className="flex-1 bg-[#3e2723] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
              >
                Shop Coffee for This Method
              </button>
              <button
                onClick={() => setBrewGuideModal(null)}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Blog post modal
  const renderBlogPostModal = () => {
    if (!blogPostModal) return null;
    const post = blogPostModal;
    return (
      <div
        className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
        onClick={() => setBlogPostModal(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-56">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-t-2xl" />
            <button
              onClick={() => setBlogPostModal(null)}
              aria-label="Close"
              className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100 text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3 text-sm">
              <span className="px-3 py-1 bg-[#8d6e63] text-white rounded-full font-semibold">{post.category}</span>
              <span className="text-gray-500">{post.date}</span>
              <span className="text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#3e2723] mb-4">{post.title}</h3>
            <div className="space-y-4 mb-6">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setBlogPostModal(null);
                  goToPage('shop');
                }}
                className="flex-1 bg-[#3e2723] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#5d4037] transition-colors"
              >
                Shop Coffee
              </button>
              <button
                onClick={() => setBlogPostModal(null)}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
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
        {currentPage === 'wholesale' && renderWholesalePage()}
        {currentPage === 'brewing' && renderBrewingPage()}
        {currentPage === 'story' && renderOurStoryPage()}
        {currentPage === 'cart' && renderCartPage()}
        {currentPage === 'checkout' && renderCheckoutPage()}
        {currentPage === 'account' && renderAccountPage()}
        {currentPage === 'blog' && renderBlogPage()}
        {currentPage === 'contact' && renderContactPage()}
      </main>
      {renderFooter()}
      {renderProductDetailModal()}
      {renderSubscribeModal()}
      {renderBrewGuideModal()}
      {renderBlogPostModal()}
    </div>
  );
};

export default RoastedPerfectionCoffee;
