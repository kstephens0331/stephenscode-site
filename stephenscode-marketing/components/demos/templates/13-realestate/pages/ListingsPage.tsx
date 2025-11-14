import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Bed, Bath, Square, Heart, Camera, Grid, List, ChevronDown } from 'lucide-react';

const ListingsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedType, setSelectedType] = useState('all');

  const listings = [
    {
      id: 1,
      title: 'Modern Downtown Penthouse',
      price: 1850000,
      location: 'Downtown District',
      address: '789 Skyline Tower',
      beds: 3,
      baths: 3,
      sqft: 2400,
      images: 12,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      type: 'Condo',
      status: 'For Sale',
      featured: true,
    },
    {
      id: 2,
      title: 'Luxury Waterfront Villa',
      price: 3200000,
      location: 'Coastal Heights',
      address: '456 Ocean View Drive',
      beds: 5,
      baths: 4,
      sqft: 4200,
      images: 24,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
      type: 'House',
      status: 'For Sale',
      featured: true,
    },
    {
      id: 3,
      title: 'Contemporary Family Home',
      price: 975000,
      location: 'Suburban Valley',
      address: '123 Maple Street',
      beds: 4,
      baths: 3,
      sqft: 3100,
      images: 18,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      type: 'House',
      status: 'For Sale',
      featured: false,
    },
    {
      id: 4,
      title: 'Urban Loft Apartment',
      price: 685000,
      location: 'Arts District',
      address: '321 Gallery Lane',
      beds: 2,
      baths: 2,
      sqft: 1600,
      images: 15,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      type: 'Loft',
      status: 'For Sale',
      featured: false,
    },
    {
      id: 5,
      title: 'Elegant Colonial Estate',
      price: 2100000,
      location: 'Heritage Hills',
      address: '555 Colonial Drive',
      beds: 6,
      baths: 5,
      sqft: 5200,
      images: 28,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      type: 'House',
      status: 'For Sale',
      featured: true,
    },
    {
      id: 6,
      title: 'Mountain View Retreat',
      price: 1450000,
      location: 'Mountain Ridge',
      address: '888 Vista Point',
      beds: 4,
      baths: 3,
      sqft: 3400,
      images: 20,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      type: 'House',
      status: 'For Sale',
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#000814] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Featured Listings</h1>
          <p className="text-gray-300 text-lg">
            Browse our exclusive collection of premium properties
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by location, property type, or keyword..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-[#000814] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center justify-center"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </button>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="loft">Loft</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent">
                  <option>Any</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent">
                  <option>Any</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent">
                  <option>No Min</option>
                  <option>$250,000</option>
                  <option>$500,000</option>
                  <option>$750,000</option>
                  <option>$1,000,000</option>
                  <option>$2,000,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent">
                  <option>No Max</option>
                  <option>$500,000</option>
                  <option>$1,000,000</option>
                  <option>$2,000,000</option>
                  <option>$3,000,000</option>
                  <option>$5,000,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Square Feet</option>
                  <option>Bedrooms</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#000814]">{listings.length}</span> properties
          </p>
        </div>

        {/* Listings Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {listing.featured && (
                    <div className="absolute top-4 left-4 bg-[#ffc300] text-[#000814] px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-[#ffc300] transition-colors">
                    <Heart className="w-5 h-5 text-[#000814]" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Camera className="w-4 h-4 mr-1 text-[#000814]" />
                    <span className="text-sm font-semibold text-[#000814]">{listing.images}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{listing.type}</span>
                    <span className="text-2xl font-bold text-[#000814]">
                      ${(listing.price / 1000).toLocaleString()}K
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#000814] mb-2 group-hover:text-[#001d3d] transition-colors">
                    {listing.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="text-sm">{listing.address}, {listing.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-gray-700">
                      <Bed className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{listing.beds}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Bath className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{listing.baths}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Square className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{listing.sqft.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative overflow-hidden md:w-96 h-64">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {listing.featured && (
                      <div className="absolute top-4 left-4 bg-[#ffc300] text-[#000814] px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Camera className="w-4 h-4 mr-1 text-[#000814]" />
                      <span className="text-sm font-semibold text-[#000814]">{listing.images}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-600">{listing.type}</span>
                        <h3 className="text-2xl font-bold text-[#000814] mt-1 group-hover:text-[#001d3d] transition-colors">
                          {listing.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {listing.address}, {listing.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#000814]">
                          ${(listing.price / 1000).toLocaleString()}K
                        </div>
                        <button className="mt-2 p-2 rounded-full hover:bg-[#ffc300] transition-colors">
                          <Heart className="w-5 h-5 text-[#000814]" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8 pt-4 border-t">
                      <div className="flex items-center text-gray-700">
                        <Bed className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{listing.beds} Beds</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Bath className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{listing.baths} Baths</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Square className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{listing.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-[#000814] text-white">1</button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
              3
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
