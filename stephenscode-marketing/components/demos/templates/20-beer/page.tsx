'use client';

import React, { useState, useEffect } from 'react';
import { Beer, ShoppingCart, MapPin, Calendar, Gift, Search, User, Award, Star, ChevronRight, CheckCircle2, TruckIcon, Clock, Heart, X, Facebook, Instagram, Twitter } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

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

interface PastOrder {
  id: string;
  date: string;
  status: string;
  items: { name: string; qty: number; price: number }[];
}

type Page = 'home' | 'shop' | 'breweries' | 'finder' | 'pickup' | 'subscriptions' | 'cart' | 'account' | 'events' | 'contact';
type AccountTab = 'orders' | 'subscription' | 'wishlist' | 'settings';

const STORAGE_KEY = 'hoppy-trails-demo';

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
  const [pickupError, setPickupError] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Product detail modal
  const [detailBeer, setDetailBeer] = useState<BeerProduct | null>(null);
  const [detailAdded, setDetailAdded] = useState(false);

  // Beer Finder
  const [finderFlavor, setFinderFlavor] = useState<string | null>(null);
  const [finderAbv, setFinderAbv] = useState<string | null>(null);
  const [finderPairing, setFinderPairing] = useState<string | null>(null);
  const [finderBitterness, setFinderBitterness] = useState(50);
  const [finderResults, setFinderResults] = useState<BeerProduct[] | null>(null);

  // Newsletter (Events page)
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterError, setNewsletterError] = useState(false);

  // Contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Account
  const [accountTab, setAccountTab] = useState<AccountTab>('orders');
  const [accountSettings, setAccountSettings] = useState({ name: 'John Smith', email: 'john.smith@email.com', phone: '(555) 234-8867' });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [subscriptionPaused, setSubscriptionPaused] = useState(false);
  const [viewOrder, setViewOrder] = useState<PastOrder | null>(null);

  // Events
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [eventRegOpen, setEventRegOpen] = useState<Event | null>(null);
  const [eventRegForm, setEventRegForm] = useState({ name: '', email: '', tickets: 1 });
  const [eventRegConfirmed, setEventRegConfirmed] = useState(false);

  // Footer info modal
  const [infoModal, setInfoModal] = useState<{ title: string; body: string[] } | null>(null);

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

  const pastOrders: PastOrder[] = [
    {
      id: '#2024-001',
      date: 'May 15, 2024',
      status: 'Delivered',
      items: [
        { name: 'Imperial Thunder IPA', qty: 1, price: 15.99 },
        { name: 'Midnight Stout', qty: 2, price: 14.99 }
      ]
    },
    {
      id: '#2024-002',
      date: 'May 8, 2024',
      status: 'Delivered',
      items: [
        { name: 'Hoppy Trails IPA', qty: 2, price: 12.99 },
        { name: 'Hazy Days NEIPA', qty: 2, price: 13.99 },
        { name: 'Golden Valley Lager', qty: 1, price: 10.99 }
      ]
    },
    {
      id: '#2024-003',
      date: 'May 1, 2024',
      status: 'Delivered',
      items: [
        { name: 'Wheat Field Hefeweizen', qty: 1, price: 10.99 },
        { name: 'Autumn Amber Ale', qty: 1, price: 11.99 },
        { name: 'Porter of Call', qty: 1, price: 12.99 }
      ]
    }
  ];

  const beerStyles = ['All', 'IPA', 'NEIPA', 'Imperial IPA', 'Stout', 'Porter', 'Lager', 'Wheat Beer', 'Amber Ale'];

  const infoContent: Record<string, string[]> = {
    'FAQ': [
      'How does local pickup work? Place your order online, choose one of our three Denver locations at checkout, and we will have it ready within about 2 hours during store hours.',
      'Do you ship beer? We currently offer free local pickup at all three stores. Subscription boxes on the Craft Connoisseur and Brewmaster Elite plans include free shipping within our service area.',
      'Can I change my subscription? Yes. You can pause, upgrade, downgrade, or cancel your subscription at any time from your account page with no fees.',
      'What if a beer I want is out of stock? Add it to your wishlist and it will be waiting in your account when it comes back.'
    ],
    'Shipping Info': [
      'Local pickup is free at all three of our Denver locations. Orders are typically ready within 2 hours during store hours, and we will notify you by email and SMS when your order is ready.',
      'Subscription boxes ship once per month. Craft Connoisseur and Brewmaster Elite plans include free shipping; Hoppy Explorer boxes are available for free local pickup.',
      'An adult 21 or older with a valid photo ID must be present to receive any beer order. No exceptions.'
    ],
    'Returns': [
      'Unopened beer in its original packaging may be returned within 14 days of purchase for a full refund.',
      'If a beer arrives damaged or out of code, contact us within 48 hours and we will replace it or refund you, whichever you prefer.',
      'Refunds are issued to the original payment method within 5-7 business days.'
    ],
    'Terms of Service': [
      'You must be 21 years of age or older to purchase from Hoppy Trails Craft Beer. A valid photo ID is required at pickup.',
      'All prices are listed in USD and are subject to change. Sales tax is applied at checkout based on your pickup location.',
      'Subscriptions renew monthly on the date you signed up and can be paused or cancelled at any time from your account page.',
      'We reserve the right to refuse service to anyone who cannot provide valid proof of age.'
    ],
    'Privacy Policy': [
      'We collect only the information needed to process your orders: your name, contact details, and purchase history.',
      'We never sell your personal information to third parties. Order data is shared only with the payment processor and the store fulfilling your pickup.',
      'You can request a copy of your data, or ask us to delete it, at any time by emailing info@hoppytrails.com.'
    ],
    'Age Verification': [
      'Federal and state law requires that all customers be 21 years of age or older to purchase alcohol.',
      'Age is verified twice: once when you enter this site, and again with a valid photo ID when you pick up your order.',
      'Acceptable forms of ID include a driver license, state ID card, passport, or military ID.'
    ],
    'Responsible Drinking': [
      'We are committed to promoting the responsible enjoyment of craft beer.',
      'Please never drink and drive. Plan ahead with a designated driver or a rideshare.',
      'If you or someone you know is struggling with alcohol, visit responsibility.org for resources and support.'
    ]
  };

  // Persistence -- hydrate once, then write through on change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (Array.isArray(data.cart)) setCart(data.cart);
        if (Array.isArray(data.wishlist)) setWishlist(data.wishlist);
        if (typeof data.subscribedPlan === 'string') setSubscribedPlan(data.subscribedPlan);
        if (Array.isArray(data.registeredEvents)) setRegisteredEvents(data.registeredEvents);
        if (data.accountSettings && typeof data.accountSettings.name === 'string') setAccountSettings(data.accountSettings);
        if (typeof data.subscriptionPaused === 'boolean') setSubscriptionPaused(data.subscriptionPaused);
      }
    } catch {
      // Corrupted or unavailable storage -- start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, subscribedPlan, registeredEvents, accountSettings, subscriptionPaused }));
    } catch {
      // Storage unavailable -- state still lives in memory for this session
    }
  }, [hydrated, cart, wishlist, subscribedPlan, registeredEvents, accountSettings, subscriptionPaused]);

  // Cart functions
  const addToCart = (beer: BeerProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === beer.id);
      if (existing) {
        return prev.map(item =>
          item.id === beer.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...beer, quantity: 1 }];
    });
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

  const handleCheckout = () => {
    if (!selectedPickup) {
      setPickupError(true);
      return;
    }
    setPickupError(false);
    setOrderNumber(`HT${Math.floor(100000 + Math.random() * 900000)}`);
    setOrderTotal(cartTotal * 1.08);
    setOrderPlaced(true);
    setCart([]);
  };

  const toggleWishlist = (beerId: string) => {
    if (wishlist.includes(beerId)) {
      setWishlist(wishlist.filter(id => id !== beerId));
    } else {
      setWishlist([...wishlist, beerId]);
    }
  };

  const openDetail = (beer: BeerProduct) => {
    setDetailBeer(beer);
    setDetailAdded(false);
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

  // Beer Finder matching
  const flavorStyles: Record<string, string[]> = {
    'Hoppy & Bitter': ['IPA', 'NEIPA', 'Imperial IPA'],
    'Malty & Sweet': ['Amber Ale', 'Wheat Beer', 'Porter'],
    'Dark & Roasty': ['Stout', 'Porter'],
    'Light & Crisp': ['Lager', 'Wheat Beer']
  };

  const pairingKeywords: Record<string, string[]> = {
    'Spicy Food': ['spicy', 'curry', 'thai', 'tacos', 'wings'],
    'BBQ & Meat': ['bbq', 'steak', 'burgers', 'ribs', 'pork', 'chicken', 'bratwurst', 'smoked'],
    'Seafood': ['salmon', 'seafood', 'oysters', 'fish', 'shellfish'],
    'Cheese & Snacks': ['cheddar', 'cheese', 'brie', 'gouda', 'pretzels'],
    'Dessert': ['chocolate', 'pie', 'desserts', 'cake'],
    'Just Drinking': []
  };

  const runBeerFinder = () => {
    const scored = beers.map(beer => {
      let score = 0;
      if (finderFlavor && (flavorStyles[finderFlavor] || []).includes(beer.style)) score += 3;
      if (finderAbv === 'Low (4-5%)' && beer.abv <= 5.5) score += 2;
      if (finderAbv === 'Medium (5-7%)' && beer.abv > 5.5 && beer.abv <= 7) score += 2;
      if (finderAbv === 'High (7%+)' && beer.abv > 7) score += 2;
      if (finderPairing) {
        const keywords = pairingKeywords[finderPairing] || [];
        if (keywords.length === 0) {
          score += 1;
        } else if (beer.foodPairings.some(p => keywords.some(k => p.toLowerCase().includes(k)))) {
          score += 2;
        }
      }
      score += Math.max(0, 2 - Math.abs(beer.ibu - finderBitterness) / 25);
      return { beer, score };
    });
    scored.sort((a, b) => b.score - a.score || b.beer.rating - a.beer.rating);
    setFinderResults(scored.slice(0, 3).map(s => s.beer));
    setTimeout(() => {
      document.getElementById('beer-finder-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Contact form
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Hoppy Trails Craft Beer',
          demoPackage: 'E-Commerce Website ($1,100)',
          demoSlug: 'hoppy-trails-craft-beer',
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
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: 'hoppy-trails-craft-beer' });
        trackConversion('leadForm');
        setContactSubmitted(true);
        setContactForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      }
    } catch {
      // Network/API failure -- form stays visible so the visitor can retry
    }
  };

  // Event registration
  const openEventRegistration = (event: Event) => {
    setEventRegOpen(event);
    setEventRegForm({ name: '', email: '', tickets: 1 });
    setEventRegConfirmed(false);
  };

  const handleEventRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventRegOpen) return;
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Hoppy Trails Craft Beer',
          demoPackage: 'E-Commerce Website ($1,100)',
          demoSlug: 'hoppy-trails-craft-beer',
          clientName: eventRegForm.name,
          clientPhone: '',
          clientEmail: eventRegForm.email,
          service: `Event Registration: ${eventRegOpen.title}`,
          preferredDate: eventRegOpen.date,
          preferredTime: eventRegOpen.time,
          notes: `${eventRegForm.tickets} ticket(s) at $${eventRegOpen.price.toFixed(2)} each. Location: ${eventRegOpen.location}.`
        })
      });

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_event_registration', demo_slug: 'hoppy-trails-craft-beer' });
        trackConversion('leadForm');
        if (!registeredEvents.includes(eventRegOpen.id)) {
          setRegisteredEvents([...registeredEvents, eventRegOpen.id]);
        }
        setEventRegConfirmed(true);
      }
    } catch {
      // Network/API failure -- form stays visible so the visitor can retry
    }
  };

  // Newsletter
  const handleNewsletterSubscribe = () => {
    const email = newsletterEmail.trim();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setNewsletterError(true);
      return;
    }
    setNewsletterError(false);
    setNewsletterDone(true);
  };

  // Account helpers
  const orderTotalOf = (order: PastOrder) => order.items.reduce((s, i) => s + i.qty * i.price, 0);
  const orderCountOf = (order: PastOrder) => order.items.reduce((s, i) => s + i.qty, 0);

  const reorderPastOrder = (order: PastOrder) => {
    setCart(prev => {
      let next = [...prev];
      order.items.forEach(it => {
        const beer = beers.find(b => b.name === it.name);
        if (!beer) return;
        const existing = next.find(c => c.id === beer.id);
        if (existing) {
          next = next.map(c => c.id === beer.id ? { ...c, quantity: c.quantity + it.qty } : c);
        } else {
          next.push({ ...beer, quantity: it.qty });
        }
      });
      return next;
    });
    setViewOrder(null);
    setCurrentPage('cart');
  };

  const activePlan = subscriptions.find(s => s.id === (subscribedPlan ?? '2')) || subscriptions[1];

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
            I am 21 or Older, Enter Site
          </button>
          <button
            onClick={() => window.location.href = 'https://www.responsibility.org/'}
            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            I am Under 21, Exit
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
            <button
              onClick={() => setCurrentPage('account')}
              aria-label="My account"
              className="hover:text-[#936639] transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setCurrentPage('shop');
                setTimeout(() => document.getElementById('beer-shop-search')?.focus(), 50);
              }}
              aria-label="Search beers"
              className="hover:text-[#936639] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              aria-label="Shopping cart"
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
                <div className="relative h-64 cursor-pointer" onClick={() => openDetail(beer)}>
                  <img src={beer.image} alt={beer.name} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(beer.id);
                    }}
                    aria-label={wishlist.includes(beer.id) ? `Remove ${beer.name} from wishlist` : `Add ${beer.name} to wishlist`}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(beer.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <h3
                    className="font-bold text-lg mb-1 cursor-pointer hover:text-[#7f4f24]"
                    onClick={() => openDetail(beer)}
                  >
                    {beer.name}
                  </h3>
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
            <label htmlFor="beer-shop-search" className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              id="beer-shop-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search beers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="beer-shop-style" className="block text-sm font-semibold text-gray-700 mb-2">Beer Style</label>
            <select
              id="beer-shop-style"
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
            <label htmlFor="beer-shop-brewery" className="block text-sm font-semibold text-gray-700 mb-2">Brewery</label>
            <select
              id="beer-shop-brewery"
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
            <label htmlFor="beer-shop-sort" className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              id="beer-shop-sort"
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
            <div className="relative h-64 cursor-pointer" onClick={() => openDetail(beer)}>
              <img src={beer.image} alt={beer.name} className="w-full h-full object-cover" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(beer.id);
                }}
                aria-label={wishlist.includes(beer.id) ? `Remove ${beer.name} from wishlist` : `Add ${beer.name} to wishlist`}
                className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(beer.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              <div className="absolute top-3 left-3 bg-[#582f0e] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {beer.style}
              </div>
            </div>
            <div className="p-4">
              <h3
                className="font-bold text-lg mb-1 cursor-pointer hover:text-[#7f4f24]"
                onClick={() => openDetail(beer)}
              >
                {beer.name}
              </h3>
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
                <button
                  key={flavor}
                  onClick={() => setFinderFlavor(finderFlavor === flavor ? null : flavor)}
                  className={`p-4 border-2 rounded-lg transition-colors text-left ${
                    finderFlavor === flavor
                      ? 'border-[#582f0e] bg-[#582f0e] text-white'
                      : 'border-gray-300 hover:border-[#582f0e] hover:bg-[#582f0e] hover:text-white'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">Preferred ABV Range?</label>
            <div className="grid grid-cols-3 gap-3">
              {['Low (4-5%)', 'Medium (5-7%)', 'High (7%+)'].map(abv => (
                <button
                  key={abv}
                  onClick={() => setFinderAbv(finderAbv === abv ? null : abv)}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    finderAbv === abv
                      ? 'border-[#582f0e] bg-[#582f0e] text-white'
                      : 'border-gray-300 hover:border-[#582f0e] hover:bg-[#582f0e] hover:text-white'
                  }`}
                >
                  {abv}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">What are you pairing it with?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Spicy Food', 'BBQ & Meat', 'Seafood', 'Cheese & Snacks', 'Dessert', 'Just Drinking'].map(pairing => (
                <button
                  key={pairing}
                  onClick={() => setFinderPairing(finderPairing === pairing ? null : pairing)}
                  className={`p-4 border-2 rounded-lg transition-colors text-left ${
                    finderPairing === pairing
                      ? 'border-[#582f0e] bg-[#582f0e] text-white'
                      : 'border-gray-300 hover:border-[#582f0e] hover:bg-[#582f0e] hover:text-white'
                  }`}
                >
                  {pairing}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="beer-finder-bitterness" className="block text-lg font-semibold text-gray-800 mb-3">Bitterness Level?</label>
            <input
              id="beer-finder-bitterness"
              type="range"
              min="0"
              max="100"
              value={finderBitterness}
              onChange={(e) => setFinderBitterness(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#582f0e]"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Not Bitter</span>
              <span className="font-semibold text-[#582f0e]">Target: about {finderBitterness} IBU</span>
              <span>Very Bitter</span>
            </div>
          </div>

          <button
            onClick={runBeerFinder}
            className="w-full bg-[#582f0e] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#7f4f24] transition-colors"
          >
            Find My Perfect Beer
          </button>
        </div>

        <div className="mt-8 pt-8 border-t" id="beer-finder-results">
          <h3 className="text-xl font-bold text-[#582f0e] mb-2">
            {finderResults ? 'Your Top Matches' : 'Popular Right Now'}
          </h3>
          {finderResults && (
            <p className="text-sm text-gray-600 mb-4">
              Ranked by how well each beer fits your flavor, strength, pairing, and bitterness picks.
            </p>
          )}
          <div className={`grid gap-4 ${finderResults ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
            {(finderResults ?? beers.slice(0, 2)).map(beer => (
              <div key={beer.id} className="border rounded-lg p-4">
                <img
                  src={beer.image}
                  alt={beer.name}
                  className="w-full h-32 object-cover rounded mb-3 cursor-pointer"
                  onClick={() => openDetail(beer)}
                />
                <h4
                  className="font-bold mb-1 cursor-pointer hover:text-[#7f4f24]"
                  onClick={() => openDetail(beer)}
                >
                  {beer.name}
                </h4>
                <p className="text-sm text-gray-600 mb-1">{beer.style}</p>
                <p className="text-xs text-gray-500 mb-2">{beer.abv}% ABV | {beer.ibu} IBU</p>
                <button
                  onClick={() => addToCart(beer)}
                  className="w-full bg-[#582f0e] text-white px-4 py-2 rounded-lg hover:bg-[#7f4f24] transition-colors text-sm"
                >
                  Add to Cart (${beer.price.toFixed(2)})
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

      {selectedPickup && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <p className="text-green-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>
              <strong>{pickupLocations.find(l => l.id === selectedPickup)?.name}</strong> is set as your pickup location for checkout.
            </span>
          </p>
          <button
            onClick={() => setCurrentPage(cart.length > 0 ? 'cart' : 'shop')}
            className="bg-[#582f0e] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors whitespace-nowrap"
          >
            {cart.length > 0 ? 'Go to Cart' : 'Start Shopping'}
          </button>
        </div>
      )}

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

      {subscribedPlan && (
        <div className="mb-8 max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
          <p className="text-green-800 text-sm">
            You're subscribed to the <strong>{subscriptions.find(s => s.id === subscribedPlan)?.name}</strong> plan.
            This is a demo storefront, so no payment was processed.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {subscriptions.map((sub, index) => {
          const isActive = subscribedPlan === sub.id;
          return (
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
              <button
                onClick={() => {
                  setSubscribedPlan(sub.id);
                  setSubscriptionPaused(false);
                }}
                disabled={isActive}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isActive
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-[#582f0e] text-white hover:bg-[#7f4f24]'
                }`}
              >
                {isActive ? 'Subscribed ✓' : 'Subscribe Now'}
              </button>
            </div>
          </div>
          );
        })}
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
  const CartPage = () => {
    if (orderPlaced) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-[#582f0e] mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thanks for your order. This is a demo storefront, so no payment was processed and no beer is on its way.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-bold text-[#582f0e]">#{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pickup Location</span>
              <span className="font-bold text-[#582f0e]">
                {pickupLocations.find(l => l.id === selectedPickup)?.name || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="text-gray-600">Order Total</span>
              <span className="font-bold text-[#582f0e]">${orderTotal.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-8">Must be 21+ to pick up. Please bring a valid photo ID.</p>
          <button
            onClick={() => {
              setOrderPlaced(false);
              setSelectedPickup('');
              setCurrentPage('shop');
            }}
            className="bg-[#582f0e] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      );
    }

    return (
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
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
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
                <label htmlFor="beer-cart-pickup-location" className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location</label>
                <select
                  id="beer-cart-pickup-location"
                  value={selectedPickup}
                  onChange={(e) => {
                    setSelectedPickup(e.target.value);
                    if (e.target.value) setPickupError(false);
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#582f0e] ${
                    pickupError ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Location</option>
                  {pickupLocations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
                {pickupError && (
                  <p className="text-sm text-red-500 mt-2">Please select a pickup location to continue.</p>
                )}
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#582f0e] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#7f4f24] transition-colors mb-3"
              >
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
  };

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
              <h2 className="text-xl font-bold text-[#582f0e]">{accountSettings.name}</h2>
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
                    accountTab === tab
                      ? 'bg-[#582f0e] text-white'
                      : 'hover:bg-gray-50 text-[#582f0e]'
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
              <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Recent Orders</h2>
              <div className="space-y-4">
                {pastOrders.map(order => (
                  <div
                    key={order.id}
                    onClick={() => setViewOrder(order)}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
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
                      <span className="text-gray-600">{orderCountOf(order)} items</span>
                      <span className="font-bold text-[#582f0e]">${orderTotalOf(order).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-[#936639] font-semibold mt-2 flex items-center gap-1">
                      View details <ChevronRight className="w-4 h-4" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {accountTab === 'subscription' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Active Subscription</h2>
              <div className="border-2 border-[#582f0e] rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#582f0e]">{activePlan.name}</h3>
                    <p className="text-gray-600">{activePlan.beersPerMonth} beers per month</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {subscriptionPaused && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                        Paused
                      </span>
                    )}
                    <Gift className="w-8 h-8 text-[#936639]" />
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  {subscriptionPaused
                    ? 'Deliveries are paused. Resume anytime to restart your monthly box.'
                    : 'Next delivery: June 1, 2024'}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentPage('subscriptions')}
                    className="flex-1 bg-[#582f0e] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
                  >
                    Manage Subscription
                  </button>
                  <button
                    onClick={() => setSubscriptionPaused(!subscriptionPaused)}
                    className="px-4 py-2 border-2 border-[#582f0e] text-[#582f0e] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {subscriptionPaused ? 'Resume' : 'Pause'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {accountTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Wishlist</h2>
              {wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No items in your wishlist</p>
                  <button
                    onClick={() => setCurrentPage('shop')}
                    className="bg-[#582f0e] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
                  >
                    Browse Beers
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {beers.filter(beer => wishlist.includes(beer.id)).map(beer => (
                    <div key={beer.id} className="border rounded-lg p-4">
                      <img
                        src={beer.image}
                        alt={beer.name}
                        className="w-full h-32 object-cover rounded mb-3 cursor-pointer"
                        onClick={() => openDetail(beer)}
                      />
                      <h4
                        className="font-bold mb-1 cursor-pointer hover:text-[#7f4f24]"
                        onClick={() => openDetail(beer)}
                      >
                        {beer.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">${beer.price.toFixed(2)}</p>
                      <button
                        onClick={() => addToCart(beer)}
                        className="w-full bg-[#582f0e] text-white px-4 py-2 rounded-lg hover:bg-[#7f4f24] transition-colors text-sm mb-2"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(beer.id)}
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
              <h2 className="text-2xl font-bold text-[#582f0e] mb-6">Account Settings</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label htmlFor="beer-account-name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    id="beer-account-name"
                    type="text"
                    value={accountSettings.name}
                    onChange={(e) => setAccountSettings({ ...accountSettings, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="beer-account-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    id="beer-account-email"
                    type="email"
                    value={accountSettings.email}
                    onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="beer-account-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    id="beer-account-phone"
                    type="tel"
                    value={accountSettings.phone}
                    onChange={(e) => setAccountSettings({ ...accountSettings, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => {
                    setSettingsSaved(true);
                    setTimeout(() => setSettingsSaved(false), 3000);
                  }}
                  className="bg-[#582f0e] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
                >
                  Save Changes
                </button>
                {settingsSaved && (
                  <p className="text-green-600 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Your changes have been saved.
                  </p>
                )}
              </div>
            </div>
          )}
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
        {events.map(event => {
          const isRegistered = registeredEvents.includes(event.id);
          return (
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
                {isRegistered ? (
                  <span className="bg-green-100 text-green-700 px-6 py-2 rounded-lg font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Registered
                  </span>
                ) : (
                  <button
                    onClick={() => openEventRegistration(event)}
                    className="bg-[#582f0e] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="mt-12 bg-[#582f0e] text-white rounded-lg p-8">
        <div className="max-w-2xl mx-auto text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-[#936639]" />
          <h2 className="text-3xl font-bold mb-4">Never Miss an Event</h2>
          <p className="text-lg mb-6">Subscribe to our newsletter for updates on upcoming tastings, releases, and events.</p>
          {newsletterDone ? (
            <div className="bg-[#7f4f24] rounded-lg p-4 max-w-md mx-auto flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
              <p className="font-semibold">You're on the list! Watch your inbox for event news and new releases.</p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  aria-label="Email address for newsletter"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    setNewsletterError(false);
                  }}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <button
                  onClick={handleNewsletterSubscribe}
                  className="bg-[#936639] px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {newsletterError && (
                <p className="text-sm text-red-300 mt-2 text-left">Please enter a valid email address.</p>
              )}
            </div>
          )}
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
            {contactSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#582f0e] mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thanks for reaching out. Our team will get back to you within one business day.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="text-[#582f0e] font-semibold hover:text-[#7f4f24] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="beer-contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  id="beer-contact-name"
                  name="name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="beer-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  id="beer-contact-email"
                  name="email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="beer-contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  id="beer-contact-phone"
                  name="phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="beer-contact-subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <select
                  id="beer-contact-subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                >
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Subscription Question</option>
                  <option>Event Information</option>
                  <option>Wholesale/Partnership</option>
                </select>
              </div>
              <div>
                <label htmlFor="beer-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  id="beer-contact-message"
                  name="message"
                  rows={5}
                  required
                  value={contactForm.message}
                  onChange={handleContactChange}
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
            )}
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
              <button
                onClick={() => setCurrentPage('events')}
                aria-label="See our upcoming events on Facebook"
                className="w-12 h-12 bg-[#936639] rounded-full flex items-center justify-center hover:bg-[#7f4f24] transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentPage('shop')}
                aria-label="See our latest beers on Instagram"
                className="w-12 h-12 bg-[#936639] rounded-full flex items-center justify-center hover:bg-[#7f4f24] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentPage('events')}
                aria-label="Follow our event announcements on Twitter"
                className="w-12 h-12 bg-[#936639] rounded-full flex items-center justify-center hover:bg-[#7f4f24] transition-colors"
              >
                <Twitter className="w-6 h-6" />
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
              <li><button onClick={() => setInfoModal({ title: 'FAQ', body: infoContent['FAQ'] })} className="hover:text-white">FAQ</button></li>
              <li><button onClick={() => setInfoModal({ title: 'Shipping Info', body: infoContent['Shipping Info'] })} className="hover:text-white">Shipping Info</button></li>
              <li><button onClick={() => setInfoModal({ title: 'Returns', body: infoContent['Returns'] })} className="hover:text-white">Returns</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setInfoModal({ title: 'Terms of Service', body: infoContent['Terms of Service'] })} className="hover:text-white">Terms of Service</button></li>
              <li><button onClick={() => setInfoModal({ title: 'Privacy Policy', body: infoContent['Privacy Policy'] })} className="hover:text-white">Privacy Policy</button></li>
              <li><button onClick={() => setInfoModal({ title: 'Age Verification', body: infoContent['Age Verification'] })} className="hover:text-white">Age Verification</button></li>
              <li><button onClick={() => setInfoModal({ title: 'Responsible Drinking', body: infoContent['Responsible Drinking'] })} className="hover:text-white">Responsible Drinking</button></li>
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

  // Modal: Beer detail
  const BeerDetailModal = () => {
    if (!detailBeer) return null;
    return (
      <div
        className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
        onClick={() => setDetailBeer(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-full min-h-[16rem]">
              <img src={detailBeer.image} alt={detailBeer.name} className="w-full h-full object-cover md:rounded-l-2xl" />
              <div className="absolute top-3 left-3 bg-[#582f0e] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {detailBeer.style}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-[#582f0e]">{detailBeer.name}</h2>
                  <p className="text-gray-600">{detailBeer.brewery}</p>
                </div>
                <button
                  onClick={() => setDetailBeer(null)}
                  aria-label="Close"
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(detailBeer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">{detailBeer.rating} ({detailBeer.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                <span className="font-semibold">{detailBeer.abv}% ABV</span>
                <span>{detailBeer.ibu} IBU</span>
                <span className={detailBeer.inStock ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {detailBeer.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{detailBeer.description}</p>

              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">Tasting Notes</p>
                <div className="flex flex-wrap gap-2">
                  {detailBeer.tastingNotes.map(note => (
                    <span key={note} className="bg-[#582f0e]/10 text-[#582f0e] px-3 py-1 rounded-full text-sm font-medium">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-gray-800 mb-2">Pairs Well With</p>
                <div className="flex flex-wrap gap-2">
                  {detailBeer.foodPairings.map(pairing => (
                    <span key={pairing} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {pairing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-[#582f0e]">${detailBeer.price.toFixed(2)}</span>
                <button
                  onClick={() => toggleWishlist(detailBeer.id)}
                  aria-label={wishlist.includes(detailBeer.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(detailBeer.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(detailBeer);
                  setDetailAdded(true);
                }}
                className="w-full bg-[#582f0e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              {detailAdded && (
                <div className="mt-3 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <span className="text-green-700 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Added to cart
                  </span>
                  <button
                    onClick={() => {
                      setDetailBeer(null);
                      setCurrentPage('cart');
                    }}
                    className="text-[#582f0e] font-semibold hover:underline"
                  >
                    View Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal: Event registration
  const EventRegistrationModal = () => {
    if (!eventRegOpen) return null;
    return (
      <div
        className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
        onClick={() => setEventRegOpen(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-xl font-bold text-[#582f0e]">
              {eventRegConfirmed ? 'Registration Confirmed' : `Register: ${eventRegOpen.title}`}
            </h3>
            <button
              onClick={() => setEventRegOpen(null)}
              aria-label="Close"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {eventRegConfirmed ? (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-[#582f0e] mb-2">You're Registered!</h4>
              <p className="text-gray-600 mb-4">
                {eventRegForm.tickets} ticket{eventRegForm.tickets > 1 ? 's' : ''} reserved for {eventRegOpen.title} at the {eventRegOpen.location}.
                A confirmation email is headed to {eventRegForm.email}.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This is a demo storefront, so no payment was processed. Must be 21+ to attend; please bring a valid photo ID.
              </p>
              <button
                onClick={() => setEventRegOpen(null)}
                className="w-full bg-[#582f0e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleEventRegSubmit} className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 space-y-1">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#582f0e]" />
                  {new Date(eventRegOpen.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#582f0e]" />
                  {eventRegOpen.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#582f0e]" />
                  {eventRegOpen.location}
                </p>
              </div>
              <div>
                <label htmlFor="beer-event-name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  id="beer-event-name"
                  type="text"
                  required
                  value={eventRegForm.name}
                  onChange={(e) => setEventRegForm({ ...eventRegForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="beer-event-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  id="beer-event-email"
                  type="email"
                  required
                  value={eventRegForm.email}
                  onChange={(e) => setEventRegForm({ ...eventRegForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="beer-event-tickets" className="block text-sm font-semibold text-gray-700 mb-2">Tickets</label>
                <select
                  id="beer-event-tickets"
                  value={eventRegForm.tickets}
                  onChange={(e) => setEventRegForm({ ...eventRegForm, tickets: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#582f0e] focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} ticket{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-gray-600 font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#582f0e]">
                  ${(eventRegOpen.price * eventRegForm.tickets).toFixed(2)}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-[#582f0e] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#7f4f24] transition-colors"
              >
                Confirm Registration
              </button>
              <p className="text-xs text-gray-500 text-center">
                Must be 21+ to attend. Payment is collected at the door; this reservation holds your spot.
              </p>
            </form>
          )}
        </div>
      </div>
    );
  };

  // Modal: Past order details
  const OrderDetailModal = () => {
    if (!viewOrder) return null;
    return (
      <div
        className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
        onClick={() => setViewOrder(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-[#582f0e]">Order {viewOrder.id}</h3>
              <p className="text-sm text-gray-600">{viewOrder.date}</p>
            </div>
            <button
              onClick={() => setViewOrder(null)}
              aria-label="Close"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              {viewOrder.status}
            </span>
            <div className="space-y-3 mb-6">
              {viewOrder.items.map(item => (
                <div key={item.name} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty {item.qty} at ${item.price.toFixed(2)}</p>
                  </div>
                  <span className="font-bold text-[#582f0e]">${(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-800">Order Total</span>
              <span className="text-2xl font-bold text-[#582f0e]">${orderTotalOf(viewOrder).toFixed(2)}</span>
            </div>
            <button
              onClick={() => reorderPastOrder(viewOrder)}
              className="w-full bg-[#582f0e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors mb-3 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Reorder These Beers
            </button>
            <button
              onClick={() => setViewOrder(null)}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal: Footer info pages (FAQ, policies)
  const InfoModal = () => {
    if (!infoModal) return null;
    return (
      <div
        className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
        onClick={() => setInfoModal(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-xl font-bold text-[#582f0e]">{infoModal.title}</h3>
            <button
              onClick={() => setInfoModal(null)}
              aria-label="Close"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto space-y-4">
            {infoModal.body.map((paragraph, i) => (
              <p key={i} className="text-gray-700">{paragraph}</p>
            ))}
          </div>
          <div className="p-5 border-t border-gray-200">
            <button
              onClick={() => setInfoModal(null)}
              className="w-full bg-[#582f0e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7f4f24] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showAgeModal && !isAgeVerified && AgeVerificationModal()}
      {isAgeVerified && (
        <>
          {Navigation()}
          <main>
            {currentPage === 'home' && HomePage()}
            {currentPage === 'shop' && ShopPage()}
            {currentPage === 'breweries' && BreweriesPage()}
            {currentPage === 'finder' && FinderPage()}
            {currentPage === 'pickup' && PickupPage()}
            {currentPage === 'subscriptions' && SubscriptionsPage()}
            {currentPage === 'cart' && CartPage()}
            {currentPage === 'account' && AccountPage()}
            {currentPage === 'events' && EventsPage()}
            {currentPage === 'contact' && ContactPage()}
          </main>
          {Footer()}
          {BeerDetailModal()}
          {EventRegistrationModal()}
          {OrderDetailModal()}
          {InfoModal()}
        </>
      )}
    </div>
  );
};

export default HoppyTrailsCraftBeer;
