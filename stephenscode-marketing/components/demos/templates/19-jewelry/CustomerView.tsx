'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { DemoColors } from '@/lib/demo-colors'
import { ShoppingCart, User, Menu, X, Search, Gem, Heart, Phone, Mail, MapPin, Star, Gift, ZoomIn, Ruler, Package, CreditCard, Lock, CheckCircle, Sparkles } from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: DemoColors
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  metal?: string
  size?: string
  engraving?: string
  image: string
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<any[]>([])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.metal === item.metal && i.size === item.size)
      if (existing) {
        return prev.map(i => i.id === item.id && i.metal === item.metal && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item).filter(item => item.quantity > 0))
  }

  const clearCart = () => setCart([])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Collections', id: 'collections' },
    { name: 'Custom Design', id: 'custom' },
    { name: 'Gift Registry', id: 'registry' },
    { name: 'Wishlist', id: 'wishlist' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ]

  // Page Components
  const HomePage = () => (
    <div>
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #c9a227 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Est. 1985</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Timeless Treasures
                <span className="block text-yellow-400">Forever Yours</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Exquisite handcrafted jewelry for life's most precious moments.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setCurrentPage('shop')} className="bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all shadow-lg">
                  Shop Collection
                </button>
                <button onClick={() => setCurrentPage('custom')} className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all">
                  Custom Design
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800" alt="Jewelry" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: '1', name: 'Diamond Solitaire Ring', price: 3299.99, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400', rating: 5.0 },
              { id: '2', name: 'Pearl Necklace', price: 899.99, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', rating: 4.9 },
              { id: '3', name: 'Gold Bracelet', price: 1499.99, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400', rating: 4.8 },
              { id: '4', name: 'Emerald Earrings', price: 2199.99, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', rating: 5.0 },
            ].map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-2xl transition-all">
                <div className="relative overflow-hidden bg-gray-50">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <button onClick={() => addToCart(product)} className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Gem className="w-8 h-8 mr-2" />
                    <span className="font-semibold">View Details</span>
                  </button>
                  <div className="absolute top-4 left-4 bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {product.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>${product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-md">
              <Gem className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certified Diamonds</h3>
              <p className="text-gray-600">GIA certified stones with authenticity guarantee</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-md">
              <Gift className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lifetime Warranty</h3>
              <p className="text-gray-600">Complimentary cleaning and maintenance</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-md">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Returns</h3>
              <p className="text-gray-600">Full refund on unworn items</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const ShopPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop All Jewelry</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 12 }, (_, i) => ({
            id: String(i + 1),
            name: ['Diamond Ring', 'Gold Necklace', 'Pearl Earrings', 'Silver Bracelet', 'Sapphire Pendant'][i % 5],
            price: 999 + i * 200,
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
            rating: 4.5 + (i % 5) * 0.1,
          })).map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative bg-gray-50">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold" style={{ color: colors.primary }}>${product.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(product)} className="text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const CollectionsPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Collections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Engagement Rings', count: 48, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
            { name: 'Wedding Bands', count: 36, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
            { name: 'Necklaces', count: 52, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600' },
            { name: 'Earrings', count: 64, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
            { name: 'Bracelets', count: 41, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
            { name: 'Fine Watches', count: 28, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600' },
          ].map(collection => (
            <button key={collection.name} onClick={() => setCurrentPage('shop')} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                <p className="text-white/90">{collection.count} pieces</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const CustomDesignPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Jewelry Design</h1>
        <p className="text-xl text-gray-600 mb-12">Create a one-of-a-kind piece with our expert designers</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Your Piece</h2>
            <div className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Jewelry Type</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
                  <option>Ring</option>
                  <option>Necklace</option>
                  <option>Earrings</option>
                  <option>Bracelet</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Metal</label>
                <div className="grid grid-cols-3 gap-3">
                  {['14K Gold', '18K Gold', 'Platinum'].map(metal => (
                    <button key={metal} className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-yellow-400 transition-colors">
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Stone</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
                  <option>Diamond</option>
                  <option>Sapphire</option>
                  <option>Emerald</option>
                  <option>Ruby</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Additional Notes</label>
                <textarea rows={4} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" placeholder="Describe your vision..."></textarea>
              </div>
              <button className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                Request Consultation
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-100 to-yellow-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Consultation</h4>
                  <p className="text-gray-600">Meet with our design team to discuss your vision</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Design</h4>
                  <p className="text-gray-600">Review 3D renderings and make adjustments</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Crafting</h4>
                  <p className="text-gray-600">Our master jewelers bring your design to life</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Delivery</h4>
                  <p className="text-gray-600">Receive your custom piece in 6-8 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const GiftRegistryPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Gift Registry</h1>
        <p className="text-xl text-gray-600 mb-12">Create your perfect wedding or special event registry</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button className="bg-white rounded-xl shadow-md p-12 text-center hover:shadow-2xl transition-all border-2 border-transparent hover:border-yellow-400">
            <Gift className="w-16 h-16 mx-auto mb-6" style={{ color: colors.primary }} />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Registry</h3>
            <p className="text-gray-600">Start building your dream gift list</p>
          </button>
          <button className="bg-white rounded-xl shadow-md p-12 text-center hover:shadow-2xl transition-all border-2 border-transparent hover:border-yellow-400">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Registry</h3>
            <p className="text-gray-600">Search for a couple's registry</p>
          </button>
        </div>
      </div>
    </div>
  )

  const WishlistPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <button onClick={() => setCurrentPage('shop')} className="text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlist.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-xl font-bold" style={{ color: colors.primary }}>${item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const CartPageContent = () => {
    if (cart.length === 0) {
      return (
        <div className="py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button onClick={() => setCurrentPage('shop')} className="text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
            Start Shopping
          </button>
        </div>
      )
    }

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
                    <p className="font-bold" style={{ color: colors.primary }}>${item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded border hover:bg-gray-100">-</button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded border hover:bg-gray-100">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span style={{ color: colors.primary }}>${cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <button onClick={() => setCurrentPage('checkout')} className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const CheckoutPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-6">
            <Lock className="w-5 h-5" />
            <span className="font-semibold">Secure Payment Processing</span>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <input type="text" placeholder="Last Name" className="px-4 py-3 border-2 border-gray-200 rounded-lg" />
            </div>
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
            <input type="text" placeholder="Card Number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="MM/YY" className="px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <input type="text" placeholder="CVV" className="px-4 py-3 border-2 border-gray-200 rounded-lg" />
            </div>
            <button type="submit" className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
              Complete Purchase - ${cartTotal.toLocaleString()}
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  const AccountPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: User, title: 'Profile', desc: 'Manage account details' },
            { icon: Package, title: 'Orders', desc: 'View order history' },
            { icon: Heart, title: 'Wishlist', desc: 'Saved items' },
          ].map(item => {
            const Icon = item.icon
            return (
              <div key={item.title} className="bg-white rounded-xl shadow-md p-8 text-center">
                <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const AboutPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Timeless Treasures</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800" alt="Jewelry" className="rounded-2xl shadow-xl" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Legacy</h2>
            <p className="text-lg text-gray-600 mb-4">
              Since 1985, Timeless Treasures has been crafting exquisite jewelry pieces that celebrate life's most precious moments.
            </p>
            <p className="text-lg text-gray-600">
              Each piece is meticulously handcrafted by our master jewelers using only the finest materials and gemstones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const ContactPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              { icon: MapPin, title: 'Address', content: '123 Diamond Street, Luxury City, LC 12345' },
              { icon: Phone, title: 'Phone', content: '(555) GEM-SHOP' },
              { icon: Mail, title: 'Email', content: 'hello@timelesstreasures.com' },
            ].map(item => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white rounded-xl shadow-md p-6">
                  <Icon className="w-8 h-8 mb-4" style={{ color: colors.primary }} />
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              )
            })}
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <textarea rows={5} placeholder="Message" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"></textarea>
              <button type="submit" className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />
      case 'shop': return <ShopPage />
      case 'collections': return <CollectionsPage />
      case 'custom': return <CustomDesignPage />
      case 'registry': return <GiftRegistryPage />
      case 'wishlist': return <WishlistPage />
      case 'cart': return <CartPageContent />
      case 'checkout': return <CheckoutPage />
      case 'account': return <AccountPage />
      case 'about': return <AboutPage />
      case 'contact': return <ContactPage />
      default: return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3">
              <Gem className="w-8 h-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold">Timeless Treasures</div>
                <div className="text-xs text-yellow-400">Fine Jewelry Since 1985</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map(item => (
                <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`px-4 py-2 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button onClick={() => setCurrentPage('account')} className="p-2 hover:bg-white/10 rounded-lg">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentPage('wishlist')} className="p-2 hover:bg-white/10 rounded-lg relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{wishlist.length}</span>}
              </button>
              <button onClick={() => setCurrentPage('cart')} className="relative p-2 hover:bg-white/10 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-yellow-500 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-white/20">
              {navigation.map(item => (
                <button key={item.id} onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false) }} className={`block w-full text-left px-4 py-3 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main>{renderPage()}</main>

      <footer className="bg-slate-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Gem className="w-8 h-8 text-yellow-400 mb-4" />
              <p className="text-gray-400">Exquisite handcrafted jewelry since 1985</p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-yellow-400">Shop</h3>
              <div className="space-y-2 text-gray-400">
                {navigation.slice(0, 4).map(item => (
                  <button key={item.id} onClick={() => setCurrentPage(item.id)} className="block hover:text-white">{item.name}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-yellow-400">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>123 Diamond Street</p>
                <p>(555) GEM-SHOP</p>
                <p>hello@timelesstreasures.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Timeless Treasures Jewelry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
