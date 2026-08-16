'use client'

import { useEffect, useState } from 'react'
import { Package, Heart, MapPin, CreditCard, Settings, LogOut, ShoppingBag, Trash2, Check, ChevronDown } from 'lucide-react'
import type { WishlistItem } from '../CustomerView'
import type { StoredOrder } from './CheckoutPage'

interface AccountPageProps {
  wishlist: WishlistItem[]
  removeFromWishlist: (id: string) => void
  addToCart: (item: { id: string; name: string; price: number; image: string; size: string; color: string }) => void
  setCurrentPage: (page: string) => void
  initialTab?: string
}

interface SavedAddress {
  id: number
  label: string
  name: string
  address: string
  isDefault: boolean
}

interface SavedCard {
  id: number
  type: string
  last4: string
  expiry: string
  isDefault: boolean
}

const ORDERS_KEY = 'boutique-demo-orders'
const ADDRESSES_KEY = 'boutique-demo-addresses'
const CARDS_KEY = 'boutique-demo-cards'
const SETTINGS_KEY = 'boutique-demo-settings'

function buildMockOrder(id: string, date: string, status: string, itemsList: StoredOrder['itemsList']): StoredOrder {
  const subtotal = itemsList.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping + subtotal * 0.08
  return { id, date, status, total, items: itemsList.reduce((sum, item) => sum + item.quantity, 0), itemsList }
}

const mockOrders: StoredOrder[] = [
  buildMockOrder('#BB12847', '2024-11-10', 'Delivered', [
    { id: '3', name: 'Cashmere Sweater', price: 159.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', size: 'M', color: 'Cream', quantity: 1 },
    { id: '7', name: 'Pearl Necklace', price: 89.99, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', size: 'One Size', color: 'White', quantity: 1 },
    { id: '8', name: 'Satin Blouse', price: 119.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', size: 'S', color: 'Blush', quantity: 1 },
  ]),
  buildMockOrder('#BB12756', '2024-11-03', 'In Transit', [
    { id: '6', name: 'Pleated Midi Skirt', price: 129.99, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', size: 'S', color: 'Black', quantity: 1 },
    { id: '7', name: 'Pearl Necklace', price: 89.99, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', size: 'One Size', color: 'Cream', quantity: 1 },
  ]),
  buildMockOrder('#BB12654', '2024-10-28', 'Delivered', [
    { id: '4', name: 'Leather Boots', price: 249.99, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', size: '8', color: 'Black', quantity: 1 },
    { id: '5', name: 'Tailored Blazer', price: 279.99, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400', size: 'M', color: 'Navy', quantity: 1 },
  ]),
]

const defaultAddresses: SavedAddress[] = [
  { id: 1, label: 'Home', name: 'Sarah Johnson', address: '123 Fashion Ave, New York, NY 10001', isDefault: true },
  { id: 2, label: 'Work', name: 'Sarah Johnson', address: '456 Style Street, New York, NY 10002', isDefault: false },
]

const defaultCards: SavedCard[] = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: 2, type: 'Mastercard', last4: '8888', expiry: '09/26', isDefault: false },
]

export default function AccountPage({ wishlist, removeFromWishlist, addToCart, setCurrentPage, initialTab }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState(initialTab || 'orders')
  const [orders, setOrders] = useState<StoredOrder[]>(mockOrders)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [reorderedId, setReorderedId] = useState<string | null>(null)
  const [addedFromWishlist, setAddedFromWishlist] = useState<string | null>(null)

  const [addresses, setAddresses] = useState<SavedAddress[]>(defaultAddresses)
  const [addressFormOpen, setAddressFormOpen] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null)
  const [addressForm, setAddressForm] = useState({ label: '', name: '', address: '' })
  const [addressError, setAddressError] = useState('')

  const [cards, setCards] = useState<SavedCard[]>(defaultCards)
  const [cardFormOpen, setCardFormOpen] = useState(false)
  const [editingCardId, setEditingCardId] = useState<number | null>(null)
  const [cardForm, setCardForm] = useState({ type: 'Visa', last4: '', expiry: '' })
  const [cardError, setCardError] = useState('')

  const [settings, setSettings] = useState({ email: 'sarah.johnson@email.com', phone: '(555) 123-4567', newsletter: true })
  const [settingsSaved, setSettingsSaved] = useState(false)

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem(ORDERS_KEY)
      if (storedOrders) {
        const parsed: StoredOrder[] = JSON.parse(storedOrders)
        setOrders([...parsed, ...mockOrders])
      }
      const storedAddresses = localStorage.getItem(ADDRESSES_KEY)
      if (storedAddresses) setAddresses(JSON.parse(storedAddresses))
      const storedCards = localStorage.getItem(CARDS_KEY)
      if (storedCards) setCards(JSON.parse(storedCards))
      const storedSettings = localStorage.getItem(SETTINGS_KEY)
      if (storedSettings) setSettings(JSON.parse(storedSettings))
    } catch {
      // Ignore malformed stored state -- defaults still render
    }
  }, [])

  const persistAddresses = (next: SavedAddress[]) => {
    setAddresses(next)
    try {
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next))
    } catch {
      // Storage unavailable -- state still updates in memory
    }
  }

  const persistCards = (next: SavedCard[]) => {
    setCards(next)
    try {
      localStorage.setItem(CARDS_KEY, JSON.stringify(next))
    } catch {
      // Storage unavailable -- state still updates in memory
    }
  }

  const handleReorder = (order: StoredOrder) => {
    order.itemsList.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, size: item.size, color: item.color })
      }
    })
    setReorderedId(order.id)
  }

  const handleWishlistAddToCart = (item: WishlistItem) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, size: item.sizes[0], color: item.colors[0] })
    setAddedFromWishlist(item.id)
  }

  const openAddAddress = () => {
    setEditingAddressId(null)
    setAddressForm({ label: '', name: '', address: '' })
    setAddressError('')
    setAddressFormOpen(true)
  }

  const openEditAddress = (address: SavedAddress) => {
    setEditingAddressId(address.id)
    setAddressForm({ label: address.label, name: address.name, address: address.address })
    setAddressError('')
    setAddressFormOpen(true)
  }

  const handleSaveAddress = () => {
    if (!addressForm.label.trim() || !addressForm.name.trim() || !addressForm.address.trim()) {
      setAddressError('Please fill in all address fields.')
      return
    }
    if (editingAddressId !== null) {
      persistAddresses(addresses.map(a => a.id === editingAddressId ? { ...a, ...addressForm } : a))
    } else {
      const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1
      persistAddresses([...addresses, { id: newId, ...addressForm, isDefault: addresses.length === 0 }])
    }
    setAddressFormOpen(false)
  }

  const handleRemoveAddress = (id: number) => {
    const removed = addresses.find(a => a.id === id)
    let next = addresses.filter(a => a.id !== id)
    if (removed?.isDefault && next.length > 0) {
      next = next.map((a, i) => ({ ...a, isDefault: i === 0 }))
    }
    persistAddresses(next)
  }

  const handleDefaultAddress = (id: number) => {
    persistAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })))
  }

  const openAddCard = () => {
    setEditingCardId(null)
    setCardForm({ type: 'Visa', last4: '', expiry: '' })
    setCardError('')
    setCardFormOpen(true)
  }

  const openEditCard = (card: SavedCard) => {
    setEditingCardId(card.id)
    setCardForm({ type: card.type, last4: card.last4, expiry: card.expiry })
    setCardError('')
    setCardFormOpen(true)
  }

  const handleSaveCard = () => {
    if (!/^\d{4}$/.test(cardForm.last4.trim())) {
      setCardError('Enter the last 4 digits of the card.')
      return
    }
    if (!/^\d{2}\/\d{2}$/.test(cardForm.expiry.trim())) {
      setCardError('Enter the expiry as MM/YY.')
      return
    }
    if (editingCardId !== null) {
      persistCards(cards.map(c => c.id === editingCardId ? { ...c, type: cardForm.type, last4: cardForm.last4.trim(), expiry: cardForm.expiry.trim() } : c))
    } else {
      const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1
      persistCards([...cards, { id: newId, type: cardForm.type, last4: cardForm.last4.trim(), expiry: cardForm.expiry.trim(), isDefault: cards.length === 0 }])
    }
    setCardFormOpen(false)
  }

  const handleRemoveCard = (id: number) => {
    const removed = cards.find(c => c.id === id)
    let next = cards.filter(c => c.id !== id)
    if (removed?.isDefault && next.length > 0) {
      next = next.map((c, i) => ({ ...c, isDefault: i === 0 }))
    }
    persistCards(next)
  }

  const handleDefaultCard = (id: number) => {
    persistCards(cards.map(c => ({ ...c, isDefault: c.id === id })))
  }

  const handleSaveSettings = () => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch {
      // Storage unavailable -- state still updates in memory
    }
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 3000)
  }

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    SJ
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">VIP Member</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-purple-100 text-[var(--color-primary)] font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                        {tab.id === 'wishlist' && wishlist.length > 0 && (
                          <span className="ml-auto bg-[var(--color-primary)] text-white text-xs font-bold rounded-full px-2 py-0.5">
                            {wishlist.length}
                          </span>
                        )}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-6"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'orders' && (
                <div className="bg-white rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-[var(--color-primary)] transition-colors">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-xl font-bold text-gray-900">{order.id}</p>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-gray-600">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                            <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                          </div>

                          {expandedOrder === order.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                              {order.itemsList.map((item, idx) => (
                                <div key={`${item.id}-${idx}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-600">Size: {item.size}, Color: {item.color}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                              ))}
                              <p className="text-sm text-gray-500">
                                {order.status === 'Delivered'
                                  ? 'Delivered to 123 Fashion Ave, New York, NY 10001.'
                                  : order.status === 'In Transit'
                                    ? 'On its way -- expected within 2 business days.'
                                    : 'Being prepared for shipment. Estimated delivery in 3-5 business days.'}
                              </p>
                            </div>
                          )}

                          <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                            <button
                              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                              className="flex-1 bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
                            >
                              <span>{expandedOrder === order.id ? 'Hide Details' : 'View Details'}</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} />
                            </button>
                            {order.status === 'Delivered' && (
                              reorderedId === order.id ? (
                                <button
                                  onClick={() => setCurrentPage('cart')}
                                  className="px-6 bg-green-50 text-green-700 py-3 rounded-lg font-semibold border-2 border-green-200 transition-all flex items-center space-x-2"
                                >
                                  <Check className="w-4 h-4" />
                                  <span>Added -- View Cart</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleReorder(order)}
                                  className="px-6 bg-white text-gray-700 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all"
                                >
                                  Reorder
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-6">Your wishlist is empty</p>
                      <button
                        onClick={() => setCurrentPage('shop')}
                        className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                      >
                        Discover Pieces You&apos;ll Love
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 border-2 border-gray-200 rounded-xl p-4 hover:border-[var(--color-primary)] transition-colors">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-lg font-bold text-gray-900">${item.price}</p>
                          </div>
                          {addedFromWishlist === item.id ? (
                            <button
                              onClick={() => setCurrentPage('cart')}
                              className="flex items-center space-x-2 bg-green-50 text-green-700 border-2 border-green-200 px-4 py-2 rounded-lg font-semibold"
                            >
                              <Check className="w-4 h-4" />
                              <span>View Cart</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleWishlistAddToCart(item)}
                              className="flex items-center space-x-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </button>
                          )}
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            aria-label={`Remove ${item.name} from wishlist`}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-white rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <button
                      onClick={openAddAddress}
                      className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                    >
                      Add New
                    </button>
                  </div>
                  <div className="p-6">
                    {addressFormOpen && (
                      <div className="border-2 border-[var(--color-primary)] rounded-xl p-6 mb-6 bg-purple-50/50">
                        <h3 className="font-bold text-gray-900 mb-4">{editingAddressId !== null ? 'Edit Address' : 'New Address'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="boutique-address-label" className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                            <input id="boutique-address-label" type="text" placeholder="Home, Work..." value={addressForm.label} onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                          </div>
                          <div>
                            <label htmlFor="boutique-address-name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input id="boutique-address-name" type="text" value={addressForm.name} onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="boutique-address-street" className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                            <input id="boutique-address-street" type="text" placeholder="Street, City, State ZIP" value={addressForm.address} onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                          </div>
                        </div>
                        {addressError && <p className="text-sm text-red-600 font-semibold mb-4">{addressError}</p>}
                        <div className="flex gap-3">
                          <button onClick={handleSaveAddress} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                            {editingAddressId !== null ? 'Save Changes' : 'Add Address'}
                          </button>
                          <button onClick={() => setAddressFormOpen(false)} className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-400 transition-all">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    {addresses.length === 0 ? (
                      <p className="text-gray-600 text-center py-8">No saved addresses yet. Add one to speed up checkout.</p>
                    ) : (
                      <div className="space-y-4">
                        {addresses.map((address) => (
                          <div key={address.id} className="border-2 border-gray-200 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-bold text-gray-900 mb-1">{address.label}</p>
                                {address.isDefault && (
                                  <span className="inline-block bg-purple-100 text-[var(--color-primary)] text-xs px-2 py-1 rounded-full font-semibold">
                                    Default
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-900 mb-1">{address.name}</p>
                            <p className="text-gray-600">{address.address}</p>
                            <div className="mt-4 flex gap-3">
                              <button onClick={() => openEditAddress(address)} className="text-[var(--color-primary)] font-semibold hover:underline">Edit</button>
                              <button onClick={() => handleRemoveAddress(address.id)} className="text-red-600 font-semibold hover:underline">Remove</button>
                              {!address.isDefault && (
                                <button onClick={() => handleDefaultAddress(address.id)} className="text-gray-600 font-semibold hover:underline">Set as Default</button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="bg-white rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                    <button
                      onClick={openAddCard}
                      className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                    >
                      Add Card
                    </button>
                  </div>
                  <div className="p-6">
                    {cardFormOpen && (
                      <div className="border-2 border-[var(--color-primary)] rounded-xl p-6 mb-6 bg-purple-50/50">
                        <h3 className="font-bold text-gray-900 mb-4">{editingCardId !== null ? 'Edit Card' : 'New Card'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label htmlFor="boutique-card-type" className="block text-sm font-semibold text-gray-700 mb-2">Card Type</label>
                            <select id="boutique-card-type" value={cardForm.type} onChange={(e) => setCardForm({ ...cardForm, type: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]">
                              <option>Visa</option>
                              <option>Mastercard</option>
                              <option>Amex</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="boutique-card-last4" className="block text-sm font-semibold text-gray-700 mb-2">Last 4 Digits</label>
                            <input id="boutique-card-last4" type="text" placeholder="4242" maxLength={4} value={cardForm.last4} onChange={(e) => setCardForm({ ...cardForm, last4: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                          </div>
                          <div>
                            <label htmlFor="boutique-card-expiry" className="block text-sm font-semibold text-gray-700 mb-2">Expiry (MM/YY)</label>
                            <input id="boutique-card-expiry" type="text" placeholder="12/27" maxLength={5} value={cardForm.expiry} onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                          </div>
                        </div>
                        {cardError && <p className="text-sm text-red-600 font-semibold mb-4">{cardError}</p>}
                        <div className="flex gap-3">
                          <button onClick={handleSaveCard} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                            {editingCardId !== null ? 'Save Changes' : 'Add Card'}
                          </button>
                          <button onClick={() => setCardFormOpen(false)} className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-400 transition-all">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    {cards.length === 0 ? (
                      <p className="text-gray-600 text-center py-8">No saved cards yet. Add one to speed up checkout.</p>
                    ) : (
                      <div className="space-y-4">
                        {cards.map((card) => (
                          <div key={card.id} className="border-2 border-gray-200 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-bold text-gray-900 mb-1">{card.type} •••• {card.last4}</p>
                                <p className="text-sm text-gray-600">Expires {card.expiry}</p>
                                {card.isDefault && (
                                  <span className="inline-block bg-purple-100 text-[var(--color-primary)] text-xs px-2 py-1 rounded-full font-semibold mt-2">
                                    Default
                                  </span>
                                )}
                              </div>
                              <CreditCard className="w-8 h-8 text-gray-400" />
                            </div>
                            <div className="mt-4 flex gap-3">
                              <button onClick={() => openEditCard(card)} className="text-[var(--color-primary)] font-semibold hover:underline">Edit</button>
                              <button onClick={() => handleRemoveCard(card.id)} className="text-red-600 font-semibold hover:underline">Remove</button>
                              {!card.isDefault && (
                                <button onClick={() => handleDefaultCard(card.id)} className="text-gray-600 font-semibold hover:underline">Set as Default</button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="boutique-account-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input id="boutique-account-email" type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label htmlFor="boutique-account-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input id="boutique-account-phone" type="tel" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label htmlFor="boutique-account-newsletter" className="block text-sm font-semibold text-gray-700 mb-2">Newsletter</label>
                      <label htmlFor="boutique-account-newsletter" className="flex items-center space-x-3">
                        <input id="boutique-account-newsletter" type="checkbox" checked={settings.newsletter} onChange={(e) => setSettings({ ...settings, newsletter: e.target.checked })} className="w-5 h-5 text-[var(--color-primary)]" />
                        <span className="text-gray-700">Receive email updates about new arrivals and exclusive offers</span>
                      </label>
                    </div>
                    {settingsSaved && (
                      <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg font-semibold">
                        <Check className="w-5 h-5" />
                        <span>Settings saved</span>
                      </div>
                    )}
                    <button
                      onClick={handleSaveSettings}
                      className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
