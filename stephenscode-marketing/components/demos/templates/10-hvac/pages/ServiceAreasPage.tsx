import React, { useState } from 'react';
import { MapPin, Search, CheckCircle, Phone, Clock } from 'lucide-react';

interface ServiceAreasPageProps {
  onNavigate: (page: string) => void;
}

export default function ServiceAreasPage({ onNavigate }: ServiceAreasPageProps) {
  const [zipCode, setZipCode] = useState('');
  const [searchResult, setSearchResult] = useState<'valid' | 'invalid' | null>(null);

  const serviceAreas = [
    {
      region: 'Downtown & Metro',
      cities: ['Downtown', 'Midtown', 'Uptown', 'City Center', 'Metro West', 'Metro East'],
      zipCodes: '90001-90099',
    },
    {
      region: 'North County',
      cities: ['Northville', 'Northbrook', 'Highland Park', 'Forest Glen', 'Riverside North'],
      zipCodes: '90100-90199',
    },
    {
      region: 'South County',
      cities: ['Southgate', 'Southfield', 'Lakeside South', 'Meadowbrook', 'Sunset Valley'],
      zipCodes: '90200-90299',
    },
    {
      region: 'East Valley',
      cities: ['Eastwood', 'East Hills', 'Sunrise Valley', 'Pleasant Valley', 'Valley View'],
      zipCodes: '90300-90399',
    },
    {
      region: 'West Valley',
      cities: ['Westwood', 'West Hills', 'Canyon Creek', 'Mountain View', 'Vista West'],
      zipCodes: '90400-90499',
    },
    {
      region: 'Suburban Areas',
      cities: ['Greenfield', 'Springfield', 'Oakwood', 'Maple Grove', 'Cedar Hills', 'Pine Valley'],
      zipCodes: '90500-90599',
    },
  ];

  const handleZipCodeCheck = () => {
    // Simple validation - in real app would check against database
    if (zipCode.match(/^90[0-5]\d{2}$/)) {
      setSearchResult('valid');
    } else {
      setSearchResult('invalid');
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Service Areas</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Proudly serving the greater metro area and surrounding communities
          </p>
        </div>
      </section>

      {/* Zip Code Checker */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#003049] to-[#004d73] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="text-center mb-8">
              <Search className="w-16 h-16 text-[#f77f00] mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">Check Your Service Area</h2>
              <p className="text-white/90 text-lg">
                Enter your zip code to see if we service your area
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                    setSearchResult(null);
                  }}
                  placeholder="Enter zip code"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-[#f77f00]"
                  maxLength={5}
                />
                <button
                  onClick={handleZipCodeCheck}
                  className="bg-[#f77f00] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#e07000] transition-all duration-300 flex items-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Check
                </button>
              </div>

              {searchResult === 'valid' && (
                <div className="mt-6 bg-green-500 text-white p-6 rounded-lg text-center animate-fadeIn">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                  <p className="font-bold text-lg mb-2">Great news! We service your area!</p>
                  <p className="text-sm mb-4">Call us now to schedule your service</p>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Schedule Service
                  </button>
                </div>
              )}

              {searchResult === 'invalid' && (
                <div className="mt-6 bg-red-500 text-white p-6 rounded-lg text-center animate-fadeIn">
                  <p className="font-bold text-lg mb-2">We don&apos;t currently service this area</p>
                  <p className="text-sm mb-4">But we&apos;re expanding! Contact us to learn more.</p>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Contact Us
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Areas We Serve</h2>
            <p className="text-xl text-gray-600">
              Providing expert HVAC services across the region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#003049] to-[#004d73] p-6 text-white">
                  <MapPin className="w-8 h-8 text-[#f77f00] mb-2" />
                  <h3 className="text-2xl font-bold">{area.region}</h3>
                  <p className="text-white/70 text-sm mt-1">Zip Codes: {area.zipCodes}</p>
                </div>

                <div className="p-6">
                  <ul className="space-y-2">
                    {area.cities.map((city, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-[#f77f00] mr-2 flex-shrink-0" />
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Clock className="w-12 h-12 text-[#f77f00] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#003049] mb-2">Same-Day Service</h3>
                <p className="text-gray-600">Available for most service calls within our coverage area</p>
              </div>

              <div>
                <Phone className="w-12 h-12 text-[#d62828] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#003049] mb-2">24/7 Emergency</h3>
                <p className="text-gray-600">Round-the-clock emergency service for all areas</p>
              </div>

              <div>
                <MapPin className="w-12 h-12 text-[#003049] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#003049] mb-2">Local Experts</h3>
                <p className="text-gray-600">Familiar with local building codes and regulations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Our Coverage Area</h2>
            <p className="text-xl text-gray-600 mb-8">
              Serving a 50-mile radius from our central location
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="aspect-video bg-gradient-to-br from-[#003049]/10 to-[#f77f00]/10 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <MapPin className="w-20 h-20 text-[#003049] mx-auto mb-4" />
                <p className="text-2xl font-bold text-[#003049] mb-2">Interactive Service Map</p>
                <p className="text-gray-600">Coverage area visualization would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expansion Notice */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#003049]">Don&apos;t See Your Area?</h2>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;re constantly expanding our service areas. Contact us to see if we can help you!
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#003049] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#004d73] transition-all duration-300"
          >
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
}
