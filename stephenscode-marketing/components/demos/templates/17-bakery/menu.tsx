import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Star, Leaf, Award, AlertCircle } from 'lucide-react';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'cakes', name: 'Cakes', icon: '🍰' },
    { id: 'cookies', name: 'Cookies', icon: '🍪' },
    { id: 'pastries', name: 'Pastries', icon: '🥐' },
    { id: 'bread', name: 'Bread', icon: '🥖' }
  ];

  const dietaryOptions = [
    { id: 'gluten-free', name: 'Gluten-Free', icon: '🌾' },
    { id: 'vegan', name: 'Vegan', icon: '🌱' },
    { id: 'dairy-free', name: 'Dairy-Free', icon: '🥛' },
    { id: 'nut-free', name: 'Nut-Free', icon: '🥜' }
  ];

  const products = [
    {
      id: 1,
      name: "Classic Chocolate Cake",
      category: "cakes",
      description: "Three layers of rich chocolate cake with silky chocolate buttercream frosting",
      price: 45.00,
      image: "🍰",
      rating: 4.9,
      reviews: 127,
      dietary: [],
      allergens: ["eggs", "dairy", "wheat", "soy"],
      ingredients: "Premium cocoa, eggs, butter, sugar, flour, vanilla extract",
      sizes: ["6-inch ($35)", "8-inch ($45)", "10-inch ($65)"],
      bestseller: true
    },
    {
      id: 2,
      name: "Red Velvet Cake",
      category: "cakes",
      description: "Southern classic with cream cheese frosting and hint of cocoa",
      price: 48.00,
      image: "🎂",
      rating: 4.8,
      reviews: 98,
      dietary: [],
      allergens: ["eggs", "dairy", "wheat"],
      ingredients: "Buttermilk, eggs, butter, cocoa powder, cream cheese, red food coloring",
      sizes: ["6-inch ($38)", "8-inch ($48)", "10-inch ($68)"]
    },
    {
      id: 3,
      name: "Lemon Blueberry Cake",
      category: "cakes",
      description: "Light lemon cake with fresh blueberries and lemon cream cheese frosting",
      price: 42.00,
      image: "🍋",
      rating: 5.0,
      reviews: 156,
      dietary: [],
      allergens: ["eggs", "dairy", "wheat"],
      ingredients: "Fresh lemons, blueberries, eggs, butter, cream cheese, vanilla",
      sizes: ["6-inch ($32)", "8-inch ($42)", "10-inch ($62)"]
    },
    {
      id: 4,
      name: "Vegan Chocolate Cake",
      category: "cakes",
      description: "Rich and moist chocolate cake made entirely plant-based",
      price: 52.00,
      image: "🌱",
      rating: 4.7,
      reviews: 89,
      dietary: ["vegan", "dairy-free"],
      allergens: ["wheat", "soy"],
      ingredients: "Cocoa powder, coconut oil, almond milk, apple cider vinegar, flour",
      sizes: ["6-inch ($42)", "8-inch ($52)", "10-inch ($72)"]
    },
    {
      id: 5,
      name: "Chocolate Chip Cookies",
      category: "cookies",
      description: "Classic cookies with premium Belgian chocolate chips (12 pack)",
      price: 18.00,
      image: "🍪",
      rating: 4.9,
      reviews: 203,
      dietary: [],
      allergens: ["eggs", "dairy", "wheat", "soy"],
      ingredients: "Butter, brown sugar, eggs, vanilla, chocolate chips, flour",
      sizes: ["12 pack ($18)", "24 pack ($32)", "36 pack ($45)"],
      bestseller: true
    },
    {
      id: 6,
      name: "Oatmeal Raisin Cookies",
      category: "cookies",
      description: "Hearty oats with plump raisins and warm cinnamon (12 pack)",
      price: 16.00,
      image: "🥠",
      rating: 4.6,
      reviews: 67,
      dietary: [],
      allergens: ["eggs", "dairy", "wheat"],
      ingredients: "Oats, raisins, butter, eggs, cinnamon, brown sugar, flour",
      sizes: ["12 pack ($16)", "24 pack ($28)", "36 pack ($40)"]
    },
    {
      id: 7,
      name: "Gluten-Free Almond Cookies",
      category: "cookies",
      description: "Delicate almond cookies made with almond flour (10 pack)",
      price: 20.00,
      image: "🌰",
      rating: 4.8,
      reviews: 45,
      dietary: ["gluten-free"],
      allergens: ["eggs", "dairy", "nuts"],
      ingredients: "Almond flour, butter, powdered sugar, vanilla, egg whites",
      sizes: ["10 pack ($20)", "20 pack ($36)"]
    },
    {
      id: 8,
      name: "Vegan Double Chocolate Cookies",
      category: "cookies",
      description: "Fudgy chocolate cookies with chocolate chips (10 pack)",
      price: 19.00,
      image: "🍫",
      rating: 4.7,
      reviews: 78,
      dietary: ["vegan", "dairy-free"],
      allergens: ["wheat", "soy"],
      ingredients: "Cocoa powder, vegan butter, coconut sugar, chocolate chips, flour",
      sizes: ["10 pack ($19)", "20 pack ($34)"]
    },
    {
      id: 9,
      name: "Butter Croissants",
      category: "pastries",
      description: "Flaky French pastry with layers of European butter (6 pack)",
      price: 18.00,
      image: "🥐",
      rating: 5.0,
      reviews: 234,
      dietary: [],
      allergens: ["wheat", "dairy", "eggs"],
      ingredients: "European butter, flour, milk, yeast, sugar, eggs",
      sizes: ["6 pack ($18)", "12 pack ($32)"],
      bestseller: true
    },
    {
      id: 10,
      name: "Almond Croissants",
      category: "pastries",
      description: "Butter croissants filled with almond cream and topped with sliced almonds (4 pack)",
      price: 16.00,
      image: "🥮",
      rating: 4.9,
      reviews: 167,
      dietary: [],
      allergens: ["wheat", "dairy", "eggs", "nuts"],
      ingredients: "Butter croissant, almond paste, almonds, powdered sugar, vanilla",
      sizes: ["4 pack ($16)", "8 pack ($28)"]
    },
    {
      id: 11,
      name: "Danish Pastries",
      category: "pastries",
      description: "Assorted fruit and cheese danish pastries (6 pack)",
      price: 20.00,
      image: "🥧",
      rating: 4.8,
      reviews: 134,
      dietary: [],
      allergens: ["wheat", "dairy", "eggs"],
      ingredients: "Puff pastry, cream cheese, seasonal fruits, sugar, vanilla",
      sizes: ["6 pack ($20)", "12 pack ($36)"]
    },
    {
      id: 12,
      name: "Cinnamon Rolls",
      category: "pastries",
      description: "Warm cinnamon rolls with cream cheese frosting (6 pack)",
      price: 22.00,
      image: "🌀",
      rating: 5.0,
      reviews: 298,
      dietary: [],
      allergens: ["wheat", "dairy", "eggs"],
      ingredients: "Flour, butter, cinnamon, brown sugar, cream cheese, vanilla",
      sizes: ["6 pack ($22)", "12 pack ($40)"]
    },
    {
      id: 13,
      name: "Artisan Sourdough",
      category: "bread",
      description: "Classic sourdough with 48-hour fermentation and crispy crust",
      price: 8.50,
      image: "🍞",
      rating: 4.9,
      reviews: 189,
      dietary: ["vegan", "dairy-free"],
      allergens: ["wheat"],
      ingredients: "Sourdough starter, flour, water, sea salt",
      sizes: ["1 loaf ($8.50)"],
      bestseller: true
    },
    {
      id: 14,
      name: "Whole Wheat Sandwich Bread",
      category: "bread",
      description: "Soft and hearty whole wheat bread perfect for sandwiches",
      price: 6.50,
      image: "🥖",
      rating: 4.7,
      reviews: 145,
      dietary: ["vegan", "dairy-free"],
      allergens: ["wheat"],
      ingredients: "Whole wheat flour, water, yeast, honey, olive oil, salt",
      sizes: ["1 loaf ($6.50)"]
    },
    {
      id: 15,
      name: "Multigrain Bread",
      category: "bread",
      description: "Nutritious blend of grains, seeds, and oats",
      price: 7.50,
      image: "🌾",
      rating: 4.8,
      reviews: 112,
      dietary: ["vegan", "dairy-free"],
      allergens: ["wheat"],
      ingredients: "Whole wheat flour, oats, flax seeds, sunflower seeds, honey",
      sizes: ["1 loaf ($7.50)"]
    },
    {
      id: 16,
      name: "Gluten-Free Sandwich Bread",
      category: "bread",
      description: "Soft and delicious gluten-free bread that doesn't crumble",
      price: 10.50,
      image: "🌿",
      rating: 4.6,
      reviews: 87,
      dietary: ["gluten-free", "dairy-free"],
      allergens: ["eggs"],
      ingredients: "Rice flour, tapioca starch, xanthan gum, eggs, olive oil",
      sizes: ["1 loaf ($10.50)"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesDietary = selectedDietary.length === 0 ||
      selectedDietary.every(diet => product.dietary.includes(diet));
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDietary && matchesSearch;
  });

  const toggleDietary = (dietId: string) => {
    setSelectedDietary(prev =>
      prev.includes(dietId)
        ? prev.filter(d => d !== dietId)
        : [...prev, dietId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🧁</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Sweet Dreams Bakery
                </h1>
                <p className="text-sm" style={{ color: '#f77f00' }}>Baked Fresh Daily</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="/menu" className="font-semibold" style={{ color: '#d62828' }}>Menu</a>
              <a href="/custom-cakes" className="text-gray-700 hover:text-gray-900">Custom Cakes</a>
              <a href="/catering" className="text-gray-700 hover:text-gray-900">Catering</a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            </nav>
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" style={{ color: '#d62828' }} />
              <span className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: '#d62828' }}>3</span>
            </a>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="py-12 px-4" style={{ backgroundColor: '#fcbf49' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Complete Menu
          </h2>
          <p className="text-xl text-gray-700">
            Fresh, handcrafted treats made with the finest ingredients
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-current"
              style={{ borderColor: '#fcbf49' }}
            />
          </div>

          {/* Category Filters */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5" style={{ color: '#d62828' }} />
              <span className="font-semibold text-gray-900">Categories</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={selectedCategory === category.id ? { backgroundColor: '#d62828' } : {}}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5" style={{ color: '#f77f00' }} />
              <span className="font-semibold text-gray-900">Dietary Options</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {dietaryOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleDietary(option.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDietary.includes(option.id)
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={selectedDietary.includes(option.id) ? { backgroundColor: '#f77f00' } : {}}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <div className="text-8xl text-center py-8 bg-gradient-to-br from-orange-50 to-yellow-50">
                  {product.image}
                </div>
                {product.bestseller && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1" style={{ backgroundColor: '#d62828' }}>
                    <Award className="w-3 h-3" />
                    Bestseller
                  </div>
                )}
                {product.dietary.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.dietary.includes('vegan') && (
                      <span className="px-2 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#f77f00' }}>
                        🌱 Vegan
                      </span>
                    )}
                    {product.dietary.includes('gluten-free') && (
                      <span className="px-2 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#fcbf49', color: '#d62828' }}>
                        🌾 GF
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        style={{ color: i < Math.floor(product.rating) ? '#fcbf49' : '#e5e7eb' }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Allergen Info */}
                <div className="mb-3 p-2 bg-orange-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#f77f00' }} />
                    <div className="text-xs text-gray-600">
                      <span className="font-semibold">Contains: </span>
                      {product.allergens.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Size Options */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Available Sizes:</p>
                  <p className="text-xs text-gray-600">{product.sizes.join(' • ')}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-2xl font-bold" style={{ color: '#d62828' }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="px-4 py-2 rounded-lg font-semibold text-white text-sm transition-transform hover:scale-105" style={{ backgroundColor: '#f77f00' }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">No products match your filters</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary([]);
                setSearchQuery('');
              }}
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: '#d62828' }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="py-12 px-4 mt-16" style={{ backgroundColor: '#d62828' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Can't Find What You're Looking For?
          </h3>
          <p className="text-xl text-white/90 mb-6">
            Design a custom cake or reach out to discuss special orders
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/custom-cakes" className="px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105" style={{ backgroundColor: '#fcbf49', color: '#d62828' }}>
              Custom Cake Builder
            </a>
            <a href="/contact" className="px-8 py-3 border-2 border-white rounded-lg font-semibold text-white transition-transform hover:scale-105">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
