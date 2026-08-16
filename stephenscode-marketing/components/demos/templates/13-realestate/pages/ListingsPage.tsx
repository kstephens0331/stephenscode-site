import React, { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Bed, Bath, Square, Heart, Camera, Grid, List } from 'lucide-react';
import { PROPERTIES, Property } from '../data/properties';
import PropertyModal from '../components/PropertyModal';

export interface ListingsSearchFilters {
  query: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  status: 'all' | 'sale' | 'rent';
}

interface ListingsPageProps {
  initialFilters?: ListingsSearchFilters | null;
}

const PAGE_SIZE = 6;
const FAVORITES_KEY = 'skyline-realestate-favorites';

const ListingsPage: React.FC<ListingsPageProps> = ({ initialFilters }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(Boolean(initialFilters));
  const [searchQuery, setSearchQuery] = useState(initialFilters?.query ?? '');
  const [selectedType, setSelectedType] = useState(initialFilters?.type ?? 'all');
  const [listingStatus, setListingStatus] = useState<'all' | 'sale' | 'rent'>(initialFilters?.status ?? 'all');
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [minPrice, setMinPrice] = useState(initialFilters?.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice ?? Number.MAX_SAFE_INTEGER);
  const [sortBy, setSortBy] = useState('price-asc');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      /* corrupted storage is ignored */
    }
    setFavoritesLoaded(true);
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      /* storage may be unavailable */
    }
  }, [favorites, favoritesLoaded]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const filteredListings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const result = PROPERTIES.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q);
      const matchesType = selectedType === 'all' || p.type.toLowerCase() === selectedType.toLowerCase();
      const matchesStatus =
        listingStatus === 'all' ||
        (listingStatus === 'rent' ? p.status === 'For Rent' : p.status !== 'For Rent');
      const matchesBeds = p.beds >= minBeds;
      const matchesBaths = p.baths >= minBaths;
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      return matchesQuery && matchesType && matchesStatus && matchesBeds && matchesBaths && matchesPrice;
    });
    const sorted = [...result];
    switch (sortBy) {
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => a.listedDaysAgo - b.listedDaysAgo);
        break;
      case 'sqft':
        sorted.sort((a, b) => b.sqft - a.sqft);
        break;
      case 'beds':
        sorted.sort((a, b) => b.beds - a.beds);
        break;
      default:
        sorted.sort((a, b) => a.price - b.price);
    }
    return sorted;
  }, [searchQuery, selectedType, listingStatus, minBeds, minBaths, minPrice, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedListings = filteredListings.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedType, listingStatus, minBeds, minBaths, minPrice, maxPrice, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setListingStatus('all');
    setMinBeds(0);
    setMinBaths(0);
    setMinPrice(0);
    setMaxPrice(Number.MAX_SAFE_INTEGER);
    setSortBy('price-asc');
  };

  const formatListingPrice = (listing: Property) =>
    listing.status === 'For Rent'
      ? `$${listing.price.toLocaleString()}/mo`
      : `$${(listing.price / 1000).toLocaleString()}K`;

  const renderHeartButton = (listing: Property, extraClasses: string) => {
    const isFavorite = favorites.includes(listing.id);
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(listing.id);
        }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        className={extraClasses}
      >
        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#000814]'}`} />
      </button>
    );
  };

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
                aria-label="Search listings"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                aria-label="Grid view"
                className={`p-2 rounded ${
                  viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
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
                <label htmlFor="realestate-listings-status" className="block text-sm font-medium text-gray-700 mb-2">
                  For Sale / For Rent
                </label>
                <select
                  id="realestate-listings-status"
                  value={listingStatus}
                  onChange={(e) => setListingStatus(e.target.value as 'all' | 'sale' | 'rent')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                >
                  <option value="all">All Listings</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div>
                <label htmlFor="realestate-listings-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  id="realestate-listings-type"
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
                <label htmlFor="realestate-listings-bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  id="realestate-listings-bedrooms"
                  value={minBeds}
                  onChange={(e) => setMinBeds(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                  <option value={5}>5+</option>
                </select>
              </div>

              <div>
                <label htmlFor="realestate-listings-bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <select
                  id="realestate-listings-bathrooms"
                  value={minBaths}
                  onChange={(e) => setMinBaths(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                </select>
              </div>

              <div>
                <label htmlFor="realestate-listings-min-price" className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price
                </label>
                <select
                  id="realestate-listings-min-price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                >
                  <option value={0}>No Min</option>
                  <option value={250000}>$250,000</option>
                  <option value={500000}>$500,000</option>
                  <option value={750000}>$750,000</option>
                  <option value={1000000}>$1,000,000</option>
                  <option value={2000000}>$2,000,000</option>
                </select>
              </div>

              <div>
                <label htmlFor="realestate-listings-max-price" className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price
                </label>
                <select
                  id="realestate-listings-max-price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                >
                  <option value={Number.MAX_SAFE_INTEGER}>No Max</option>
                  <option value={500000}>$500,000</option>
                  <option value={1000000}>$1,000,000</option>
                  <option value={2000000}>$2,000,000</option>
                  <option value={3000000}>$3,000,000</option>
                  <option value={5000000}>$5,000,000</option>
                </select>
              </div>

              <div>
                <label htmlFor="realestate-listings-sort" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  id="realestate-listings-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="sqft">Square Feet</option>
                  <option value="beds">Bedrooms</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing{' '}
            <span className="font-semibold text-[#000814]">
              {filteredListings.length === 0
                ? 0
                : `${(safePage - 1) * PAGE_SIZE + 1}-${Math.min(safePage * PAGE_SIZE, filteredListings.length)}`}
            </span>{' '}
            of <span className="font-semibold text-[#000814]">{filteredListings.length}</span> properties
          </p>
          {favorites.length > 0 && (
            <p className="text-gray-600 flex items-center">
              <Heart className="w-4 h-4 mr-1 fill-red-500 text-red-500" />
              {favorites.length} saved
            </p>
          )}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#000814] mb-2">No properties match your search</h3>
            <p className="text-gray-600 mb-6">Try broadening your filters or clearing your search terms.</p>
            <button
              onClick={clearFilters}
              className="bg-[#000814] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Listings Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pagedListings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => setSelectedProperty(listing)}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all group cursor-pointer"
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
                  {listing.status === 'For Rent' && (
                    <div className="absolute top-4 left-4 bg-[#000814] text-white px-3 py-1 rounded-full text-sm font-bold">
                      For Rent
                    </div>
                  )}
                  {renderHeartButton(
                    listing,
                    'absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-[#ffc300] transition-colors'
                  )}
                  <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Camera className="w-4 h-4 mr-1 text-[#000814]" />
                    <span className="text-sm font-semibold text-[#000814]">{listing.images}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{listing.type}</span>
                    <span className="text-2xl font-bold text-[#000814]">
                      {formatListingPrice(listing)}
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
            {pagedListings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => setSelectedProperty(listing)}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all group cursor-pointer"
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
                    {listing.status === 'For Rent' && (
                      <div className="absolute top-4 left-4 bg-[#000814] text-white px-3 py-1 rounded-full text-sm font-bold">
                        For Rent
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
                          {formatListingPrice(listing)}
                        </div>
                        {renderHeartButton(listing, 'mt-2 p-2 rounded-full hover:bg-[#ffc300] transition-colors')}
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
        {filteredListings.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    safePage === pageNum
                      ? 'bg-[#000814] text-white'
                      : 'border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Property Detail Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default ListingsPage;
