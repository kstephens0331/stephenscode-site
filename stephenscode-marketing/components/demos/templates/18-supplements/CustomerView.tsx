'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import {
  ShoppingCart, User, Menu, X, Search, Dumbbell, Phone, Mail, MapPin, Star,
  Package, Truck, Calendar, Award, CheckCircle, ChevronLeft, CreditCard,
  Pause, Play, Trash2, BookOpen
} from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  rating: number
  reviewCount: number
  description: string
  flavors: string[]
  servings: string
  featured?: boolean
}

interface CartItem {
  id: string
  productId?: string
  name: string
  price: number
  quantity: number
  flavor?: string
  subscription?: string
  image: string
}

interface OrderItem {
  id: string
  productId?: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  date: string
  status: string
  total: number
  items: OrderItem[]
}

interface Subscription {
  id: string
  productId: string
  name: string
  frequency: string
  price: number
  status: 'active' | 'paused'
  started: string
}

interface Review {
  id: string
  name: string
  rating: number
  title: string
  text: string
  date: string
}

const IMG_A = 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400'
const IMG_B = 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400'

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Whey Protein Isolate', category: 'Protein', price: 49.99, image: IMG_A, rating: 4.9, reviewCount: 214, description: '25g of fast-absorbing protein per serving with under 1g of sugar. Cold-filtered for maximum purity.', flavors: ['Chocolate', 'Vanilla', 'Strawberry'], servings: '30 servings', featured: true },
  { id: 'p2', name: 'Pre-Workout Ignite', category: 'Pre-Workout', price: 39.99, image: IMG_B, rating: 4.8, reviewCount: 187, description: 'Clinically dosed caffeine, citrulline, and beta-alanine for explosive energy and focus.', flavors: ['Blue Raspberry', 'Fruit Punch', 'Watermelon'], servings: '25 servings', featured: true },
  { id: 'p3', name: 'BCAA Recovery', category: 'Recovery', price: 34.99, image: IMG_A, rating: 4.7, reviewCount: 156, description: '2:1:1 ratio of branched-chain amino acids with added electrolytes to speed recovery.', flavors: ['Lemon Lime', 'Orange', 'Unflavored'], servings: '30 servings', featured: true },
  { id: 'p4', name: 'Creatine Monohydrate', category: 'Performance', price: 29.99, image: IMG_B, rating: 5.0, reviewCount: 342, description: 'Micronized creatine monohydrate, the most researched supplement in sports nutrition.', flavors: ['Unflavored'], servings: '60 servings', featured: true },
  { id: 'p5', name: 'Casein Night Protein', category: 'Protein', price: 44.99, image: IMG_A, rating: 4.6, reviewCount: 98, description: 'Slow-digesting protein that feeds your muscles overnight while you sleep.', flavors: ['Chocolate', 'Vanilla'], servings: '28 servings' },
  { id: 'p6', name: 'Daily Multivitamin', category: 'Vitamins', price: 24.99, image: IMG_B, rating: 4.8, reviewCount: 267, description: '23 essential vitamins and minerals formulated for active adults.', flavors: ['Unflavored'], servings: '90 capsules' },
  { id: 'p7', name: 'Omega-3 Fish Oil', category: 'Vitamins', price: 19.99, image: IMG_A, rating: 4.7, reviewCount: 203, description: 'High-potency EPA and DHA for joint, heart, and brain support.', flavors: ['Unflavored'], servings: '120 softgels' },
  { id: 'p8', name: 'Thermo Burn', category: 'Weight Management', price: 34.99, image: IMG_B, rating: 4.5, reviewCount: 121, description: 'Thermogenic blend with green tea extract and L-carnitine to support fat metabolism.', flavors: ['Unflavored'], servings: '60 capsules' },
  { id: 'p9', name: 'CLA Softgels', category: 'Weight Management', price: 22.99, image: IMG_A, rating: 4.4, reviewCount: 87, description: 'Conjugated linoleic acid to support lean body composition alongside training.', flavors: ['Unflavored'], servings: '90 softgels' },
  { id: 'p10', name: 'Beta-Alanine', category: 'Performance', price: 27.99, image: IMG_B, rating: 4.6, reviewCount: 114, description: 'Pure beta-alanine to buffer lactic acid and push through longer sets.', flavors: ['Unflavored'], servings: '50 servings' },
  { id: 'p11', name: 'Electrolyte Hydration', category: 'Recovery', price: 21.99, image: IMG_A, rating: 4.8, reviewCount: 176, description: 'Sugar-free electrolyte mix with sodium, potassium, and magnesium for all-day hydration.', flavors: ['Citrus', 'Berry'], servings: '40 servings' },
  { id: 'p12', name: 'Plant Protein Blend', category: 'Protein', price: 42.99, image: IMG_B, rating: 4.7, reviewCount: 143, description: 'Pea and rice protein blend delivering a complete amino acid profile, 100% vegan.', flavors: ['Chocolate', 'Vanilla'], servings: '28 servings' },
]

const CATEGORIES = ['Protein', 'Pre-Workout', 'Recovery', 'Vitamins', 'Weight Management', 'Performance']

const FREQUENCIES = [
  { label: 'Monthly', discount: 0.10 },
  { label: 'Bi-Weekly', discount: 0.15 },
  { label: 'Weekly', discount: 0.20 },
]

const BUNDLES = [
  { id: 'bundle-muscle', name: 'Muscle Builder Stack', products: ['Whey Protein', 'Creatine', 'BCAA'], price: 99.99, save: 25 },
  { id: 'bundle-weight', name: 'Weight Loss Bundle', products: ['Protein', 'Fat Burner', 'CLA'], price: 89.99, save: 30 },
  { id: 'bundle-performance', name: 'Performance Pack', products: ['Pre-Workout', 'Protein', 'Recovery'], price: 119.99, save: 20 },
  { id: 'bundle-wellness', name: 'Essential Wellness', products: ['Multivitamin', 'Fish Oil', 'Vitamin D'], price: 59.99, save: 15 },
]

const GUIDES = [
  {
    id: 'g1',
    title: "Beginner's Guide to Supplements",
    excerpt: 'Where to start when the supplement aisle feels overwhelming.',
    paragraphs: [
      'If you are new to supplements, start with the basics before anything exotic. A quality protein powder covers the single most common gap in training diets: total daily protein. Most lifters do well with 0.7 to 1 gram per pound of bodyweight, and a shake is simply the easiest way to close the difference.',
      'After protein, creatine monohydrate is the most researched and cost-effective addition. Three to five grams daily, taken any time of day, supports strength and training volume. There is no need to cycle it or load it aggressively.',
      'Everything else, including pre-workouts, BCAAs, and fat burners, is situational. Get your training, sleep, and whole-food nutrition consistent first, then add products that solve a specific problem you actually have.',
    ],
    takeaways: ['Protein powder solves the most common dietary gap', '3-5g of creatine daily is safe and effective', 'Fix training and sleep before buying anything else'],
  },
  {
    id: 'g2',
    title: 'Muscle Building Nutrition',
    excerpt: 'The calorie and protein targets that actually drive growth.',
    paragraphs: [
      'Muscle growth requires two things nutrition can control: a modest calorie surplus and enough protein. Aim for 200 to 400 calories above maintenance. Bigger surpluses mostly add body fat, not extra muscle.',
      'Distribute protein across 3 to 5 meals with 25 to 40 grams each. Leucine-rich sources like whey are especially effective around training. A casein shake before bed extends the overnight feeding window.',
      'Track bodyweight weekly. Gaining 0.25 to 0.5 percent of bodyweight per week is a solid pace for most intermediate lifters. Adjust calories in 100 to 200 calorie steps based on the trend, not a single weigh-in.',
    ],
    takeaways: ['Keep the surplus modest: 200-400 calories', '25-40g protein per meal, 3-5 meals daily', 'Adjust based on weekly weight trends'],
  },
  {
    id: 'g3',
    title: 'Pre & Post Workout Nutrition',
    excerpt: 'What to eat around training and what actually matters.',
    paragraphs: [
      'The pre-workout meal matters more than most people think. Eat 1 to 3 hours before training with carbs for fuel and some protein. If you train fasted first thing in the morning, a scoop of whey and a banana beats training on empty.',
      'A pre-workout formula with caffeine and citrulline can meaningfully improve session quality, but timing matters: take it 20 to 30 minutes before your first working set, and skip it within 6 hours of bedtime.',
      'Post-workout, the famous anabolic window is wider than the old 30-minute myth. Getting 25 to 40 grams of protein within a couple of hours of training is plenty. Total daily intake still matters most.',
    ],
    takeaways: ['Eat carbs plus protein 1-3 hours pre-training', 'Dose pre-workout 20-30 minutes before lifting', 'The post-workout window is hours, not minutes'],
  },
  {
    id: 'g4',
    title: 'Understanding Protein Timing',
    excerpt: 'Does when you eat protein matter as much as how much?',
    paragraphs: [
      'Total daily protein is the dominant factor in muscle retention and growth. Timing is a refinement on top of that, worth maybe 5 to 10 percent, but it is free performance if your total is already dialed in.',
      'Spacing protein into 3 to 5 feedings keeps muscle protein synthesis elevated across the day better than one or two large meals. Each feeding should hit roughly 0.4 grams per kilogram of bodyweight.',
      'Before bed, slow-digesting casein provides a steady amino acid release for 6 to 8 hours. It is one of the few timing strategies with consistent research support for hard-training athletes.',
    ],
    takeaways: ['Daily total comes first, timing second', '3-5 evenly spaced protein feedings per day', 'Casein before bed supports overnight recovery'],
  },
  {
    id: 'g5',
    title: 'Fat Loss Strategies',
    excerpt: 'A sustainable framework for cutting without losing muscle.',
    paragraphs: [
      'Fat loss comes down to a sustained calorie deficit, but how you build that deficit determines whether you keep your muscle. Aim to lose 0.5 to 1 percent of bodyweight per week. Faster than that and strength usually starts sliding.',
      'Keep protein high while cutting, at the top of the normal range or slightly above. Protein preserves lean mass, blunts hunger, and has the highest thermic effect of any macronutrient.',
      'Thermogenics and CLA can provide a small assist, but they work at the margins. Think of them as a 5 percent tool layered on top of the 95 percent that is diet, resistance training, and daily steps.',
    ],
    takeaways: ['Lose 0.5-1% of bodyweight per week, no faster', 'Protein stays high while calories drop', 'Fat burners assist a deficit, they do not replace one'],
  },
  {
    id: 'g6',
    title: 'Recovery & Sleep Optimization',
    excerpt: 'The most underrated performance enhancer is free.',
    paragraphs: [
      'Sleep is where adaptation happens. Consistently getting under 7 hours measurably reduces strength output, reaction time, and even the proportion of weight lost as fat during a diet. Guard your sleep like a training session.',
      'Build a wind-down routine: dim lights an hour before bed, keep the room cool, and cut caffeine at least 6 hours before bedtime. If you use a pre-workout in the evening, choose a stimulant-free formula.',
      'On the supplement side, electrolytes support hydration status, and magnesium-containing formulas taken in the evening are a reasonable, low-risk addition for hard-training athletes.',
    ],
    takeaways: ['Under 7 hours of sleep costs measurable performance', 'Cut caffeine at least 6 hours before bed', 'Hydration and electrolytes are part of recovery'],
  },
]

const SEED_REVIEWS: Review[] = [
  { id: 'r1', name: 'Marcus T.', rating: 5, title: 'Best protein I have tried', text: 'The chocolate whey isolate mixes clean with zero clumps and sits light in the stomach. I have been through three tubs and the flavor still has not gotten old.', date: 'Aug 02' },
  { id: 'r2', name: 'Jenna L.', rating: 5, title: 'Pre-workout that actually works', text: 'Ignite gives me steady energy without the jittery crash I got from other brands. Blue Raspberry tastes great even mixed with just water.', date: 'Jul 26' },
  { id: 'r3', name: 'Chris B.', rating: 4, title: 'Solid creatine, great price', text: 'Unflavored, dissolves fully, and the 60-serving tub is a better value than anything at the big-box stores. Four stars only because shipping took an extra day.', date: 'Jul 14' },
  { id: 'r4', name: 'Dana W.', rating: 5, title: 'Subscription makes it easy', text: 'I set up the monthly subscription for protein and electrolytes and have not thought about reordering since. Skipping a month when I traveled took two clicks.', date: 'Jul 03' },
  { id: 'r5', name: 'Aaron P.', rating: 4, title: 'Good recovery blend', text: 'BCAA Recovery noticeably cuts down my soreness on back-to-back training days. Lemon Lime is solid, would love to see a grape flavor added.', date: 'Jun 21' },
]

const SEED_ORDERS: Order[] = [
  {
    id: 'PP-100482', date: 'Jul 18', status: 'Delivered', total: 79.98,
    items: [
      { id: 'p1:Chocolate', productId: 'p1', name: 'Whey Protein Isolate (Chocolate)', price: 49.99, quantity: 1 },
      { id: 'p4:Unflavored', productId: 'p4', name: 'Creatine Monohydrate', price: 29.99, quantity: 1 },
    ],
  },
  {
    id: 'PP-100311', date: 'Jun 02', status: 'Delivered', total: 83.97,
    items: [
      { id: 'p2:Blue Raspberry', productId: 'p2', name: 'Pre-Workout Ignite (Blue Raspberry)', price: 39.99, quantity: 1 },
      { id: 'p11:Citrus', productId: 'p11', name: 'Electrolyte Hydration (Citrus)', price: 21.99, quantity: 2 },
    ],
  },
]

const LS = {
  cart: 'peak-supplements-cart',
  orders: 'peak-supplements-orders',
  subs: 'peak-supplements-subscriptions',
  profile: 'peak-supplements-profile',
  reviews: 'peak-supplements-reviews',
}

const todayLabel = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Persisted data
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', goal: 'Build muscle' })

  // Shop state
  const [shopSearch, setShopSearch] = useState('')
  const [shopCategory, setShopCategory] = useState('All')
  const [shopSort, setShopSort] = useState('featured')

  // Product detail state
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [detailFlavor, setDetailFlavor] = useState('')
  const [detailQty, setDetailQty] = useState(1)
  const [detailSubscribe, setDetailSubscribe] = useState(false)
  const [detailFrequency, setDetailFrequency] = useState('Monthly')
  const [detailAdded, setDetailAdded] = useState(false)

  // Checkout state
  const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment' | 'review' | 'confirm'>('shipping')
  const [shipping, setShipping] = useState({ name: '', email: '', address: '', city: '', state: '', zip: '' })
  const [payment, setPayment] = useState({ nameOnCard: '', card: '', expiry: '', cvc: '' })
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)

  // Contact state
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactError, setContactError] = useState('')

  // Reviews state
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, title: '', text: '' })
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  // Subscription builder modal
  const [subModalOpen, setSubModalOpen] = useState(false)
  const [subFrequency, setSubFrequency] = useState('Monthly')
  const [subProductId, setSubProductId] = useState('p1')
  const [subStarted, setSubStarted] = useState(false)

  // Guides modal
  const [openGuideId, setOpenGuideId] = useState<string | null>(null)

  // Account state
  const [accountTab, setAccountTab] = useState<'profile' | 'orders' | 'subscriptions'>('profile')
  const [profileSaved, setProfileSaved] = useState(false)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const c = localStorage.getItem(LS.cart)
      if (c) setCart(JSON.parse(c))
      const o = localStorage.getItem(LS.orders)
      if (o) setOrders(JSON.parse(o))
      const s = localStorage.getItem(LS.subs)
      if (s) setSubscriptions(JSON.parse(s))
      const r = localStorage.getItem(LS.reviews)
      if (r) setUserReviews(JSON.parse(r))
      const p = localStorage.getItem(LS.profile)
      if (p) setProfile(JSON.parse(p))
    } catch {
      // Corrupt or unavailable storage: start fresh with defaults
    }
    setHydrated(true)
  }, [])

  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.cart, JSON.stringify(cart)) } catch {} }, [cart, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.orders, JSON.stringify(orders)) } catch {} }, [orders, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.subs, JSON.stringify(subscriptions)) } catch {} }, [subscriptions, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.reviews, JSON.stringify(userReviews)) } catch {} }, [userReviews, hydrated])

  const go = (page: string) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openProduct = (id: string) => {
    const product = PRODUCTS.find(p => p.id === id)
    if (!product) return
    setSelectedProductId(id)
    setDetailFlavor(product.flavors[0])
    setDetailQty(1)
    setDetailSubscribe(false)
    setDetailFrequency('Monthly')
    setDetailAdded(false)
    go('product')
  }

  const addToCart = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, { ...item, quantity: qty }]
    })
  }

  const quickAdd = (product: Product) => {
    const flavor = product.flavors[0]
    addToCart({
      id: `${product.id}:${flavor}`,
      productId: product.id,
      name: product.flavors.length > 1 ? `${product.name} (${flavor})` : product.name,
      price: product.price,
      flavor,
      image: product.image,
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item).filter(item => item.quantity > 0))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const startCheckout = () => {
    setCheckoutStep('shipping')
    setPlacedOrder(null)
    go('checkout')
  }

  const placeOrder = () => {
    const shippingCost = cartTotal > 75 ? 0 : 8.99
    const order: Order = {
      id: `PP-${String(Date.now()).slice(-6)}`,
      date: todayLabel(),
      status: 'Processing',
      total: Number((cartTotal + shippingCost).toFixed(2)),
      items: cart.map(i => ({ id: i.id, productId: i.productId, name: i.name, price: i.price, quantity: i.quantity })),
    }
    const newSubs: Subscription[] = cart
      .filter(i => i.subscription && i.productId)
      .map(i => ({
        id: `sub-${Date.now()}-${i.productId}`,
        productId: i.productId as string,
        name: i.name,
        frequency: i.subscription as string,
        price: i.price,
        status: 'active' as const,
        started: todayLabel(),
      }))
    setOrders(prev => [order, ...prev])
    if (newSubs.length > 0) setSubscriptions(prev => [...newSubs, ...prev])
    setPlacedOrder(order)
    setCart([])
    setCheckoutStep('confirm')
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactError('')
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Peak Performance Supplements',
          demoPackage: 'E-Commerce Website ($1,100)',
          demoSlug: 'peak-performance-supplements',
          clientName: contactForm.name,
          clientPhone: contactForm.phone,
          clientEmail: contactForm.email,
          service: 'General Inquiry',
          preferredDate: '',
          preferredTime: '',
          notes: contactForm.message,
        }),
      })
      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: 'peak-performance-supplements' })
        trackConversion('leadForm')
        setContactSubmitted(true)
        setContactForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setContactError('Something went wrong sending your message. Please try again.')
      }
    } catch {
      setContactError('Something went wrong sending your message. Please try again.')
    }
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const review: Review = {
      id: `ur-${Date.now()}`,
      name: reviewForm.name,
      rating: reviewForm.rating,
      title: reviewForm.title,
      text: reviewForm.text,
      date: todayLabel(),
    }
    setUserReviews(prev => [review, ...prev])
    setReviewForm({ name: '', rating: 5, title: '', text: '' })
    setReviewSubmitted(true)
    setTimeout(() => setReviewSubmitted(false), 4000)
  }

  const openSubModal = (frequency: string) => {
    setSubFrequency(frequency)
    setSubProductId('p1')
    setSubStarted(false)
    setSubModalOpen(true)
  }

  const startSubscription = () => {
    const product = PRODUCTS.find(p => p.id === subProductId)
    const freq = FREQUENCIES.find(f => f.label === subFrequency)
    if (!product || !freq) return
    const sub: Subscription = {
      id: `sub-${Date.now()}`,
      productId: product.id,
      name: product.name,
      frequency: freq.label,
      price: Number((product.price * (1 - freq.discount)).toFixed(2)),
      status: 'active',
      started: todayLabel(),
    }
    setSubscriptions(prev => [sub, ...prev])
    setSubStarted(true)
  }

  const toggleSubscription = (id: string) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s))
  }

  const changeSubscriptionFrequency = (id: string, frequency: string) => {
    const freq = FREQUENCIES.find(f => f.label === frequency)
    if (!freq) return
    setSubscriptions(prev => prev.map(s => {
      if (s.id !== id) return s
      const product = PRODUCTS.find(p => p.id === s.productId)
      const base = product ? product.price : s.price
      return { ...s, frequency, price: Number((base * (1 - freq.discount)).toFixed(2)) }
    }))
  }

  const cancelSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id))
    setCancelConfirmId(null)
  }

  const reorder = (order: Order) => {
    order.items.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.productId)
      addToCart({
        id: item.id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: product ? product.image : IMG_A,
      }, item.quantity)
    })
    go('cart')
  }

  const goShopWithCategory = (category: string) => {
    setShopCategory(category)
    setShopSearch('')
    go('shop')
  }

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Categories', id: 'categories' },
    { name: 'Subscriptions', id: 'subscriptions' },
    { name: 'Bundles', id: 'bundles' },
    { name: 'Nutrition Guides', id: 'guides' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' },
  ]

  const renderProductCard = (product: Product) => (
    <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden group transition-all hover:shadow-xl">
      <button onClick={() => openProduct(product.id)} className="block w-full text-left relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-4 left-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
          <Star className="w-4 h-4 mr-1 fill-current" />
          {product.rating.toFixed(1)}
        </div>
      </button>
      <div className="p-6">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wide mb-1">{product.category}</p>
        <button onClick={() => openProduct(product.id)} className="font-bold text-gray-900 mb-2 text-left hover:text-[var(--color-secondary)] transition-colors">
          {product.name}
        </button>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[var(--color-primary)]">${product.price.toFixed(2)}</span>
          <button onClick={() => quickAdd(product)} className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90">
            Add
          </button>
        </div>
      </div>
    </div>
  )

  const renderHome = () => (
    <div>
      <section className="relative bg-gradient-to-r from-cyan-900 via-teal-800 to-cyan-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Science-Backed Performance
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Fuel Your
                <span className="block text-cyan-300">Peak Performance</span>
              </h1>
              <p className="text-xl text-cyan-100 mb-8">
                Premium supplements designed for serious athletes and fitness enthusiasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => go('shop')} className="bg-cyan-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-cyan-600 transition-all shadow-lg">
                  Shop Now
                </button>
                <button onClick={() => go('subscriptions')} className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all">
                  Subscribe & Save
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800" alt="Supplements" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter(p => p.featured).map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden group transition-all hover:shadow-xl">
                <button onClick={() => openProduct(product.id)} className="block w-full relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {product.rating.toFixed(1)}
                  </div>
                </button>
                <div className="p-6">
                  <button onClick={() => openProduct(product.id)} className="font-bold text-gray-900 mb-2 text-left hover:text-[var(--color-secondary)] transition-colors">
                    {product.name}
                  </button>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-[var(--color-primary)]">${product.price.toFixed(2)}</p>
                    <button onClick={() => quickAdd(product)} className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lab Tested</h3>
              <p className="text-gray-600">Third-party verified for purity and potency</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $75</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Money-Back Guarantee</h3>
              <p className="text-gray-600">60-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderShop = () => {
    let filtered = PRODUCTS.filter(p =>
      (shopCategory === 'All' || p.category === shopCategory) &&
      (shopSearch.trim() === '' || p.name.toLowerCase().includes(shopSearch.trim().toLowerCase()))
    )
    if (shopSort === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price)
    if (shopSort === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price)
    if (shopSort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)

    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop All Products</h1>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={shopSearch}
                onChange={e => setShopSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', ...CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => setShopCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${shopCategory === cat ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-cyan-500'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={shopSort}
              onChange={e => setShopSort(e.target.value)}
              aria-label="Sort products"
              className="px-4 py-3 border-2 border-gray-200 rounded-lg bg-white font-semibold text-gray-700"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-900 mb-2">No products match your search</p>
              <button onClick={() => { setShopSearch(''); setShopCategory('All') }} className="text-[var(--color-secondary)] font-semibold hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filtered.map(renderProductCard)}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderProductDetail = () => {
    const product = PRODUCTS.find(p => p.id === selectedProductId)
    if (!product) {
      return (
        <div className="py-20 text-center">
          <p className="text-xl font-semibold text-gray-900 mb-4">Product not found</p>
          <button onClick={() => go('shop')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold">Back to Shop</button>
        </div>
      )
    }
    const freq = FREQUENCIES.find(f => f.label === detailFrequency) || FREQUENCIES[0]
    const unitPrice = detailSubscribe ? Number((product.price * (1 - freq.discount)).toFixed(2)) : product.price
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

    const handleDetailAdd = () => {
      const idParts = [product.id, detailFlavor]
      if (detailSubscribe) idParts.push(`sub-${freq.label}`)
      addToCart({
        id: idParts.join(':'),
        productId: product.id,
        name: product.flavors.length > 1 ? `${product.name} (${detailFlavor})` : product.name,
        price: unitPrice,
        flavor: detailFlavor,
        subscription: detailSubscribe ? freq.label : undefined,
        image: product.image,
      }, detailQty)
      setDetailAdded(true)
      setTimeout(() => setDetailAdded(false), 3000)
    }

    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <button onClick={() => go('shop')} className="flex items-center text-[var(--color-secondary)] font-semibold mb-8 hover:underline">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Shop
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <img src={product.image} alt={product.name} className="w-full rounded-2xl shadow-lg object-cover aspect-square" />
            </div>
            <div>
              <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 text-gray-600">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
              </div>
              <p className="text-gray-600 text-lg mb-2">{product.description}</p>
              <p className="text-sm text-gray-500 mb-6">{product.servings}</p>

              {product.flavors.length > 1 && (
                <div className="mb-6">
                  <p className="font-semibold text-gray-900 mb-2">Flavor</p>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map(flavor => (
                      <button
                        key={flavor}
                        onClick={() => setDetailFlavor(flavor)}
                        className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all ${detailFlavor === flavor ? 'border-[var(--color-secondary)] bg-cyan-50 text-[var(--color-secondary)]' : 'border-gray-200 text-gray-700 hover:border-cyan-300'}`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6 space-y-3">
                <button
                  onClick={() => setDetailSubscribe(false)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-lg border-2 transition-all ${!detailSubscribe ? 'border-[var(--color-secondary)] bg-cyan-50' : 'border-gray-200 hover:border-cyan-300'}`}
                >
                  <span className="font-semibold text-gray-900">One-time purchase</span>
                  <span className="font-bold text-[var(--color-primary)]">${product.price.toFixed(2)}</span>
                </button>
                <button
                  onClick={() => setDetailSubscribe(true)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-lg border-2 transition-all ${detailSubscribe ? 'border-[var(--color-secondary)] bg-cyan-50' : 'border-gray-200 hover:border-cyan-300'}`}
                >
                  <span className="font-semibold text-gray-900 text-left">Subscribe & Save up to 20%</span>
                  <span className="font-bold text-green-600">${(product.price * (1 - freq.discount)).toFixed(2)}</span>
                </button>
                {detailSubscribe && (
                  <div className="pl-2">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Delivery frequency</p>
                    <div className="flex flex-wrap gap-2">
                      {FREQUENCIES.map(f => (
                        <button
                          key={f.label}
                          onClick={() => setDetailFrequency(f.label)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${detailFrequency === f.label ? 'bg-[var(--color-primary)] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-cyan-400'}`}
                        >
                          {f.label} ({Math.round(f.discount * 100)}% off)
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button onClick={() => setDetailQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity" className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-bold">-</button>
                  <span className="px-4 font-bold text-gray-900 w-12 text-center">{detailQty}</span>
                  <button onClick={() => setDetailQty(q => q + 1)} aria-label="Increase quantity" className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-bold">+</button>
                </div>
                <button onClick={handleDetailAdd} className="flex-1 bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                  Add to Cart - ${(unitPrice * detailQty).toFixed(2)}
                </button>
              </div>

              {detailAdded && (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6">
                  <span className="flex items-center text-green-700 font-semibold">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Added to cart
                  </span>
                  <button onClick={() => go('cart')} className="text-[var(--color-secondary)] font-semibold hover:underline">View Cart</button>
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-600 border-t pt-6">
                <p className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Third-party lab tested</p>
                <p className="flex items-center"><Truck className="w-4 h-4 text-green-500 mr-2" /> Free shipping on orders over $75</p>
                <p className="flex items-center"><Award className="w-4 h-4 text-green-500 mr-2" /> 60-day money-back guarantee</p>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map(renderProductCard)}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderCategories = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop by Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, i) => {
            const count = PRODUCTS.filter(p => p.category === cat).length
            return (
              <button key={cat} onClick={() => goShopWithCategory(cat)} className="group relative overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={i % 2 === 0 ? IMG_A.replace('w=400', 'w=600') : IMG_B.replace('w=400', 'w=600')} alt={cat} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{cat}</h3>
                  <p className="text-white/90">{count} product{count === 1 ? '' : 's'}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderSubscriptions = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Subscribe & Save</h1>
          <p className="text-xl text-gray-600">Get your favorite supplements delivered automatically and save up to 20%</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FREQUENCIES.map(freq => (
            <div key={freq.label} className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-xl">
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{freq.label}</h3>
                <p className="text-4xl font-bold text-[var(--color-primary)] mb-2">{Math.round(freq.discount * 100)}% OFF</p>
                <p className="text-gray-600">Save on every order</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Free shipping
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Cancel anytime
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Skip or modify deliveries
                </li>
              </ul>
              <button onClick={() => openSubModal(freq.label)} className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90">
                Get Started
              </button>
            </div>
          ))}
        </div>

        {subscriptions.length > 0 && (
          <div className="mt-12 text-center">
            <button onClick={() => { setAccountTab('subscriptions'); go('account') }} className="text-[var(--color-secondary)] font-semibold hover:underline">
              Manage my {subscriptions.length} active subscription{subscriptions.length === 1 ? '' : 's'} →
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderBundles = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Performance Bundles</h1>
        <p className="text-xl text-gray-600 mb-12">Complete nutrition packages designed for your goals</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BUNDLES.map(bundle => (
            <div key={bundle.id} className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{bundle.name}</h3>
                  <p className="text-green-600 font-semibold">Save ${bundle.save}</p>
                </div>
                <Package className="w-12 h-12 text-[var(--color-primary)]" />
              </div>
              <ul className="space-y-2 mb-6">
                {bundle.products.map(prod => (
                  <li key={prod} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {prod}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t pt-6">
                <span className="text-3xl font-bold text-[var(--color-primary)]">${bundle.price.toFixed(2)}</span>
                <button onClick={() => addToCart({ id: bundle.id, name: bundle.name, price: bundle.price, image: IMG_A })} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  Add Bundle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderGuides = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Nutrition & Training Guides</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GUIDES.map(guide => (
            <div key={guide.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all flex flex-col">
              <BookOpen className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{guide.title}</h3>
              <p className="text-gray-600 mb-6 flex-1">{guide.excerpt}</p>
              <button onClick={() => setOpenGuideId(guide.id)} className="text-[var(--color-secondary)] font-semibold hover:underline text-left">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCart = () => {
    if (cart.length === 0) {
      return (
        <div className="py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button onClick={() => go('shop')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90">
            Start Shopping
          </button>
        </div>
      )
    }

    const shippingCost = cartTotal > 75 ? 0 : 8.99
    const total = cartTotal + shippingCost

    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex gap-4 items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    {item.subscription && (
                      <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-2 py-1 rounded-full mt-1">
                        {item.subscription} subscription
                      </span>
                    )}
                    <p className="text-[var(--color-primary)] font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} className="w-8 h-8 rounded border hover:bg-gray-100">-</button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="w-8 h-8 rounded border hover:bg-gray-100">+</button>
                  </div>
                  <div className="text-right font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                {cartTotal < 75 && (
                  <p className="text-sm text-cyan-600">Add ${(75 - cartTotal).toFixed(2)} for free shipping!</p>
                )}
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[var(--color-primary)]">${total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={startCheckout} className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 mb-3">
                Checkout
              </button>
              <button onClick={() => go('shop')} className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-cyan-400">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCheckout = () => {
    if (checkoutStep === 'confirm' && placedOrder) {
      return (
        <div className="py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-2">Thank you for your order.</p>
            <p className="text-gray-600 mb-8">
              Order <span className="font-bold text-gray-900">#{placedOrder.id}</span> is being processed.
              A confirmation was sent to {shipping.email || 'your email'}.
            </p>
            <div className="bg-white rounded-xl shadow-md p-6 text-left mb-8">
              <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
              {placedOrder.items.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b last:border-b-0 text-gray-700">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4 font-bold text-gray-900">
                <span>Total</span>
                <span>${placedOrder.total.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-8">This is a demo store. No payment was processed and nothing will ship.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => { setAccountTab('orders'); go('account') }} className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-cyan-400">
                View My Orders
              </button>
              <button onClick={() => go('shop')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (cart.length === 0) {
      return (
        <div className="py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button onClick={() => go('shop')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90">
            Start Shopping
          </button>
        </div>
      )
    }

    const shippingCost = cartTotal > 75 ? 0 : 8.99
    const total = cartTotal + shippingCost
    const steps: { key: typeof checkoutStep; label: string }[] = [
      { key: 'shipping', label: 'Shipping' },
      { key: 'payment', label: 'Payment' },
      { key: 'review', label: 'Review' },
    ]
    const stepIndex = steps.findIndex(s => s.key === checkoutStep)

    return (
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="flex items-center mb-10">
            {steps.map((step, i) => (
              <div key={step.key} className="flex items-center flex-1 last:flex-none">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${i <= stepIndex ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {i + 1}
                </div>
                <span className={`ml-2 font-semibold ${i <= stepIndex ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</span>
                {i < steps.length - 1 && <div className={`flex-1 h-1 mx-4 rounded ${i < stepIndex ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {checkoutStep === 'shipping' && (
            <form
              onSubmit={e => { e.preventDefault(); setCheckoutStep('payment') }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center"><Truck className="w-6 h-6 mr-2 text-[var(--color-primary)]" /> Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input type="text" required value={shipping.name} onChange={e => setShipping({ ...shipping, name: e.target.value })} placeholder="Full name" aria-label="Full name" className="px-4 py-3 border-2 border-gray-200 rounded-lg md:col-span-2 focus:border-cyan-500 focus:outline-none" />
                <input type="email" required value={shipping.email} onChange={e => setShipping({ ...shipping, email: e.target.value })} placeholder="Email address" aria-label="Email address" className="px-4 py-3 border-2 border-gray-200 rounded-lg md:col-span-2 focus:border-cyan-500 focus:outline-none" />
                <input type="text" required value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} placeholder="Street address" aria-label="Street address" className="px-4 py-3 border-2 border-gray-200 rounded-lg md:col-span-2 focus:border-cyan-500 focus:outline-none" />
                <input type="text" required value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} placeholder="City" aria-label="City" className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" required value={shipping.state} onChange={e => setShipping({ ...shipping, state: e.target.value })} placeholder="State" aria-label="State" className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                  <input type="text" required value={shipping.zip} onChange={e => setShipping({ ...shipping, zip: e.target.value })} placeholder="ZIP" aria-label="ZIP code" className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => go('cart')} className="text-gray-600 font-semibold hover:text-gray-900">Back to Cart</button>
                <button type="submit" className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90">Continue to Payment</button>
              </div>
            </form>
          )}

          {checkoutStep === 'payment' && (
            <form
              onSubmit={e => { e.preventDefault(); setCheckoutStep('review') }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center"><CreditCard className="w-6 h-6 mr-2 text-[var(--color-primary)]" /> Payment</h2>
              <p className="text-sm text-gray-500 mb-6">Demo checkout: no payment is processed and no card is charged. Use placeholder numbers.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input type="text" required value={payment.nameOnCard} onChange={e => setPayment({ ...payment, nameOnCard: e.target.value })} placeholder="Name on card" aria-label="Name on card" className="px-4 py-3 border-2 border-gray-200 rounded-lg md:col-span-2 focus:border-cyan-500 focus:outline-none" />
                <input type="text" required inputMode="numeric" value={payment.card} onChange={e => setPayment({ ...payment, card: e.target.value })} placeholder="Card number (e.g. 4242 4242 4242 4242)" aria-label="Card number" className="px-4 py-3 border-2 border-gray-200 rounded-lg md:col-span-2 focus:border-cyan-500 focus:outline-none" />
                <input type="text" required value={payment.expiry} onChange={e => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM/YY" aria-label="Expiration date" className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                <input type="text" required inputMode="numeric" value={payment.cvc} onChange={e => setPayment({ ...payment, cvc: e.target.value })} placeholder="CVC" aria-label="CVC" className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setCheckoutStep('shipping')} className="text-gray-600 font-semibold hover:text-gray-900">Back</button>
                <button type="submit" className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90">Review Order</button>
              </div>
            </form>
          )}

          {checkoutStep === 'review' && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
              <div className="mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between py-3 border-b text-gray-700">
                    <span>
                      {item.name} x{item.quantity}
                      {item.subscription && <span className="ml-2 text-xs bg-cyan-100 text-cyan-800 font-semibold px-2 py-0.5 rounded-full">{item.subscription} subscription</span>}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between py-3 text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">Ship to</p>
                <p>{shipping.name}</p>
                <p>{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setCheckoutStep('payment')} className="text-gray-600 font-semibold hover:text-gray-900">Back</button>
                <button onClick={placeOrder} className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  Place Order - ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderAccount = () => {
    const allOrders = [...orders, ...SEED_ORDERS]
    const tabs = [
      { key: 'profile' as const, icon: User, title: 'Profile', desc: 'Manage account details' },
      { key: 'orders' as const, icon: Package, title: 'Orders', desc: 'View order history' },
      { key: 'subscriptions' as const, icon: Calendar, title: 'Subscriptions', desc: 'Manage subscriptions' },
    ]

    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {tabs.map(item => {
              const Icon = item.icon
              const active = accountTab === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setAccountTab(item.key)}
                  className={`bg-white rounded-xl shadow-md p-8 text-center transition-all ${active ? 'ring-2 ring-[var(--color-secondary)] shadow-xl' : 'hover:shadow-xl'}`}
                >
                  <Icon className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </button>
              )
            })}
          </div>

          {accountTab === 'profile' && (
            <form
              onSubmit={e => {
                e.preventDefault()
                try { localStorage.setItem(LS.profile, JSON.stringify(profile)) } catch {}
                setProfileSaved(true)
                setTimeout(() => setProfileSaved(false), 3000)
              }}
              className="bg-white rounded-xl shadow-md p-8 max-w-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Details</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="pp-profile-name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input id="pp-profile-name" type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Alex Carter" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="pp-profile-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input id="pp-profile-email" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="alex@example.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="pp-profile-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input id="pp-profile-phone" type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="(555) 123-4567" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="pp-profile-goal" className="block text-sm font-semibold text-gray-700 mb-2">Fitness Goal</label>
                  <select id="pp-profile-goal" value={profile.goal} onChange={e => setProfile({ ...profile, goal: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:border-cyan-500 focus:outline-none">
                    <option>Build muscle</option>
                    <option>Lose weight</option>
                    <option>Improve endurance</option>
                    <option>General wellness</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button type="submit" className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90">Save Profile</button>
                {profileSaved && (
                  <span className="flex items-center text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5 mr-1" /> Saved
                  </span>
                )}
              </div>
            </form>
          )}

          {accountTab === 'orders' && (
            <div className="space-y-4 max-w-3xl">
              {allOrders.map(order => (
                <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)} className="w-full flex items-center justify-between p-6 text-left">
                    <div>
                      <p className="font-bold text-gray-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date} • {order.items.length} item{order.items.length === 1 ? '' : 's'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.status}
                      </span>
                      <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                  </button>
                  {expandedOrderId === order.id && (
                    <div className="px-6 pb-6 border-t pt-4">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between py-2 text-gray-700">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <button onClick={() => reorder(order)} className="mt-4 bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90">
                        Reorder
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {accountTab === 'subscriptions' && (
            <div className="max-w-3xl">
              {subscriptions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl font-bold text-gray-900 mb-2">No subscriptions yet</p>
                  <p className="text-gray-600 mb-6">Save up to 20% with automatic deliveries of your favorite products.</p>
                  <button onClick={() => go('subscriptions')} className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                    Browse Subscription Plans
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map(sub => (
                    <div key={sub.id} className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-gray-900">{sub.name}</p>
                          <p className="text-sm text-gray-600">Started {sub.started} • ${sub.price.toFixed(2)} per delivery</p>
                          <span className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                            {sub.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <select
                            value={sub.frequency}
                            onChange={e => changeSubscriptionFrequency(sub.id, e.target.value)}
                            aria-label={`Delivery frequency for ${sub.name}`}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg bg-white text-sm font-semibold"
                          >
                            {FREQUENCIES.map(f => <option key={f.label} value={f.label}>{f.label}</option>)}
                          </select>
                          <button onClick={() => toggleSubscription(sub.id)} className="flex items-center px-4 py-2 rounded-lg font-semibold border-2 border-gray-200 text-gray-700 hover:border-cyan-400">
                            {sub.status === 'active' ? <><Pause className="w-4 h-4 mr-1" /> Pause</> : <><Play className="w-4 h-4 mr-1" /> Resume</>}
                          </button>
                          {cancelConfirmId === sub.id ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => cancelSubscription(sub.id)} className="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700">Confirm</button>
                              <button onClick={() => setCancelConfirmId(null)} className="px-4 py-2 rounded-lg font-semibold border-2 border-gray-200 text-gray-700">Keep</button>
                            </div>
                          ) : (
                            <button onClick={() => setCancelConfirmId(sub.id)} className="flex items-center px-4 py-2 rounded-lg font-semibold text-red-600 border-2 border-red-200 hover:bg-red-50">
                              <Trash2 className="w-4 h-4 mr-1" /> Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderReviews = () => {
    const allReviews = [...userReviews, ...SEED_REVIEWS]
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length

    return (
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
          <div className="flex items-center mb-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-6 h-6 ${i < Math.round(avg) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="ml-3 text-lg font-semibold text-gray-700">{avg.toFixed(1)} out of 5 • {allReviews.length} reviews</span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h2>
            {reviewSubmitted && (
              <div className="flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6 text-green-700 font-semibold">
                <CheckCircle className="w-5 h-5 mr-2" />
                Thanks! Your review has been posted.
              </div>
            )}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" required value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} placeholder="Your name" aria-label="Your name" className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                <div className="flex items-center gap-1 px-2">
                  <span className="text-sm font-semibold text-gray-700 mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })} aria-label={`Rate ${star} star${star === 1 ? '' : 's'}`}>
                      <Star className={`w-6 h-6 ${star <= reviewForm.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <input type="text" required value={reviewForm.title} onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })} placeholder="Review title" aria-label="Review title" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
              <textarea rows={4} required value={reviewForm.text} onChange={e => setReviewForm({ ...reviewForm, text: e.target.value })} placeholder="Tell us about your experience..." aria-label="Review text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
              <button type="submit" className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90">Post Review</button>
            </form>
          </div>

          <div className="space-y-6">
            {allReviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-5 h-5 ${j < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{review.title}</h3>
                <p className="text-gray-600 mb-4">"{review.text}"</p>
                <p className="text-sm text-gray-500">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderContact = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <MapPin className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">123 Fitness Blvd, Performance City, PC 12345</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <Phone className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <a href="tel:555-732-5348" className="text-gray-600 hover:text-[var(--color-secondary)]">(555) PEAK-FIT</a>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <Mail className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:support@peakperformance.com" className="text-gray-600 hover:text-[var(--color-secondary)]">support@peakperformance.com</a>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            {contactSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-600 mb-6">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setContactSubmitted(false)} className="text-[var(--color-secondary)] font-semibold hover:underline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input type="text" required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} aria-label="Your name" placeholder="Name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                  <input type="email" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} aria-label="Email address" placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                  <input type="tel" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} aria-label="Phone number" placeholder="Phone (optional)" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                  <textarea rows={5} required value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} aria-label="Message" placeholder="Message" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none"></textarea>
                  {contactError && <p className="text-red-600 font-semibold text-sm">{contactError}</p>}
                  <button type="submit" className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90">
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return renderHome()
      case 'shop': return renderShop()
      case 'product': return renderProductDetail()
      case 'categories': return renderCategories()
      case 'subscriptions': return renderSubscriptions()
      case 'bundles': return renderBundles()
      case 'guides': return renderGuides()
      case 'cart': return renderCart()
      case 'checkout': return renderCheckout()
      case 'account': return renderAccount()
      case 'reviews': return renderReviews()
      case 'contact': return renderContact()
      default: return renderHome()
    }
  }

  const openGuide = GUIDES.find(g => g.id === openGuideId)
  const subProduct = PRODUCTS.find(p => p.id === subProductId)
  const subFreq = FREQUENCIES.find(f => f.label === subFrequency) || FREQUENCIES[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <header className="bg-[var(--color-primary)] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => go('home')} className="flex items-center space-x-3">
              <Dumbbell className="w-8 h-8" />
              <div className="text-left">
                <div className="text-2xl font-bold">Peak Performance</div>
                <div className="text-xs text-cyan-200">Premium Supplements</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map(item => (
                <button key={item.id} onClick={() => go(item.id)} className={`px-4 py-2 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button onClick={() => go('account')} aria-label="My account" className="p-2 hover:bg-white/10 rounded-lg">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => go('cart')} aria-label="Shopping cart" className="relative p-2 hover:bg-white/10 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" className="lg:hidden p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-white/20">
              {navigation.map(item => (
                <button key={item.id} onClick={() => go(item.id)} className={`block w-full text-left px-4 py-3 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main>{renderPage()}</main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Dumbbell className="w-8 h-8 mb-4" />
              <p className="text-gray-400">Science-backed supplements for peak performance</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <div className="space-y-2 text-gray-400">
                {navigation.slice(0, 4).map(item => (
                  <button key={item.id} onClick={() => go(item.id)} className="block hover:text-white">{item.name}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>123 Fitness Blvd</p>
                <p>(555) PEAK-FIT</p>
                <p>support@peakperformance.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Peak Performance Supplements. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Guide article modal */}
      {openGuide && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setOpenGuideId(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--color-secondary)]" />
                {openGuide.title}
              </h3>
              <button onClick={() => setOpenGuideId(null)} aria-label="Close guide" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {openGuide.paragraphs.map((para, i) => (
                <p key={i} className="text-gray-700 mb-4 leading-relaxed">{para}</p>
              ))}
              <div className="bg-cyan-50 rounded-xl p-5 mt-2">
                <h4 className="font-bold text-gray-900 mb-3">Key Takeaways</h4>
                <ul className="space-y-2">
                  {openGuide.takeaways.map((t, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-5 border-t flex flex-wrap gap-3">
              <button onClick={() => { setOpenGuideId(null); go('shop') }} className="flex-1 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                Shop Products
              </button>
              <button onClick={() => setOpenGuideId(null)} className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription builder modal */}
      {subModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setSubModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--color-secondary)]" />
                Build Your Subscription
              </h3>
              <button onClick={() => setSubModalOpen(false)} aria-label="Close subscription builder" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            {subStarted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Subscription Started!</h4>
                <p className="text-gray-600 mb-6">
                  {subProduct?.name} will be delivered {subFrequency.toLowerCase()} at {Math.round(subFreq.discount * 100)}% off. Manage it anytime from your account.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button onClick={() => { setSubModalOpen(false); setAccountTab('subscriptions'); go('account') }} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                    View My Subscriptions
                  </button>
                  <button onClick={() => setSubModalOpen(false)} className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-200">
                    Keep Browsing
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 overflow-y-auto">
                <div className="mb-5">
                  <label htmlFor="pp-sub-product" className="block text-sm font-semibold text-gray-700 mb-2">Choose a product</label>
                  <select id="pp-sub-product" value={subProductId} onChange={e => setSubProductId(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:border-cyan-500 focus:outline-none">
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - ${p.price.toFixed(2)}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-5">
                  <p className="block text-sm font-semibold text-gray-700 mb-2">Delivery frequency</p>
                  <div className="flex flex-wrap gap-2">
                    {FREQUENCIES.map(f => (
                      <button
                        key={f.label}
                        onClick={() => setSubFrequency(f.label)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${subFrequency === f.label ? 'bg-[var(--color-primary)] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-cyan-400'}`}
                      >
                        {f.label} ({Math.round(f.discount * 100)}% off)
                      </button>
                    ))}
                  </div>
                </div>
                {subProduct && (
                  <div className="bg-cyan-50 rounded-xl p-5 mb-6">
                    <div className="flex justify-between text-gray-700 mb-1">
                      <span>Regular price</span>
                      <span className="line-through">${subProduct.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>Your {subFrequency.toLowerCase()} price</span>
                      <span className="text-green-600">${(subProduct.price * (1 - subFreq.discount)).toFixed(2)}</span>
                    </div>
                  </div>
                )}
                <button onClick={startSubscription} className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90">
                  Start Subscription
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">Demo store: no payment is collected for subscriptions.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
