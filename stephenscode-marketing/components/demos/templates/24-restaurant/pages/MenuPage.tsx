'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface MenuPageProps {
  colors: ColorPalette
  onOrderOpen: () => void
  setOrderItem: (item: string) => void
}

export default function MenuPage({ colors, onOrderOpen, setOrderItem }: MenuPageProps) {
  const menuCategories = [
    {
      name: 'Antipasti (Appetizers)',
      items: [
        { name: 'Bruschetta al Pomodoro', price: '$12', description: 'Grilled bread with fresh tomatoes, basil, and extra virgin olive oil' },
        { name: 'Carpaccio di Manzo', price: '$18', description: 'Thinly sliced beef tenderloin with arugula, capers, and Parmesan' },
        { name: 'Burrata Caprese', price: '$16', description: 'Creamy burrata with heirloom tomatoes and aged balsamic' },
        { name: 'Calamari Fritti', price: '$15', description: 'Crispy fried squid with marinara and lemon aioli' }
      ]
    },
    {
      name: 'Primi (First Courses)',
      items: [
        { name: 'Truffle Carbonara', price: '$32', description: 'Fettuccine with pancetta, eggs, Parmigiano, and black truffles', popular: true },
        { name: 'Lobster Ravioli', price: '$36', description: 'House-made ravioli filled with Maine lobster in saffron cream sauce' },
        { name: 'Pappardelle Bolognese', price: '$28', description: 'Wide ribbon pasta with traditional meat ragù, slow-cooked 8 hours' },
        { name: 'Risotto ai Funghi', price: '$26', description: 'Creamy Arborio rice with porcini mushrooms and truffle oil' }
      ]
    },
    {
      name: 'Secondi (Main Courses)',
      items: [
        { name: 'Osso Buco Milanese', price: '$48', description: 'Braised veal shanks with saffron risotto and gremolata', popular: true },
        { name: 'Branzino al Forno', price: '$42', description: 'Oven-roasted Mediterranean sea bass with lemon and herbs' },
        { name: 'Bistecca Fiorentina', price: '$65', description: '24oz Porterhouse steak, grilled rare, with rosemary potatoes (serves 2)' },
        { name: 'Pollo alla Parmigiana', price: '$32', description: 'Breaded chicken breast with tomato sauce and melted mozzarella' }
      ]
    },
    {
      name: 'Dolci (Desserts)',
      items: [
        { name: 'Tiramisu Classico', price: '$12', description: 'Espresso-soaked ladyfingers with mascarpone cream', popular: true },
        { name: 'Panna Cotta', price: '$10', description: 'Vanilla-infused cream with berry compote' },
        { name: 'Cannoli Siciliani', price: '$11', description: 'Crispy shells filled with sweet ricotta and chocolate chips' },
        { name: 'Gelato Trio', price: '$9', description: 'Three flavors of house-made Italian ice cream' }
      ]
    }
  ]

  const handleOrderItem = (itemName: string) => {
    setOrderItem(itemName)
    onOrderOpen()
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            Our Menu
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            Authentic Italian Cuisine
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl max-w-2xl mx-auto">
            Every dish is prepared fresh to order using traditional recipes and the finest ingredients
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      {menuCategories.map((category, idx) => (
        <section
          key={category.name}
          className="py-16"
          style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8f8f8' }}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 style={{ color: '#9b2226' }} className="text-4xl font-black mb-12 text-center">
              {category.name}
            </h2>
            <div className="space-y-6">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#f8f8f8' : '#ffffff',
                    border: item.popular ? '3px solid #ee9b00' : '1px solid #e5e5e5'
                  }}
                  className="p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold">
                          {item.name}
                        </h3>
                        {item.popular && (
                          <span
                            style={{ backgroundColor: '#ee9b00', color: '#1a1a1a' }}
                            className="px-3 py-1 text-xs font-bold uppercase"
                          >
                            Popular
                          </span>
                        )}
                      </div>
                      <p style={{ color: '#666666' }} className="mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div style={{ color: '#9b2226' }} className="text-2xl font-black ml-6">
                      {item.price}
                    </div>
                  </div>
                  <button
                    onClick={() => handleOrderItem(item.name)}
                    style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                    className="px-6 py-2 font-bold text-sm hover:opacity-90 transition"
                  >
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Wine List Teaser */}
      <section className="py-20" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🍷</div>
          <h2 style={{ color: '#ffffff' }} className="text-4xl font-black mb-4">
            Award-Winning Wine Selection
          </h2>
          <p style={{ color: '#cccccc' }} className="text-lg mb-8">
            Over 200 carefully curated wines from Italy's finest regions. Ask your server for our
            complete wine list or speak with our sommelier for the perfect pairing.
          </p>
          <div className="flex gap-8 justify-center text-left" style={{ color: '#ee9b00' }}>
            <div>
              <div className="text-3xl font-black">200+</div>
              <div style={{ color: '#cccccc' }} className="text-sm">Wine Selections</div>
            </div>
            <div>
              <div className="text-3xl font-black">15+</div>
              <div style={{ color: '#cccccc' }} className="text-sm">Italian Regions</div>
            </div>
            <div>
              <div className="text-3xl font-black">$12</div>
              <div style={{ color: '#cccccc' }} className="text-sm">Glasses From</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: '#ee9b00' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-6">
            Ready to Order?
          </h2>
          <p style={{ color: '#333333' }} className="text-lg mb-8">
            Order online for pickup or delivery, or make a reservation to dine with us
          </p>
          <button
            onClick={onOrderOpen}
            style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
            className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
          >
            Start Your Order
          </button>
        </div>
      </section>
    </div>
  )
}
