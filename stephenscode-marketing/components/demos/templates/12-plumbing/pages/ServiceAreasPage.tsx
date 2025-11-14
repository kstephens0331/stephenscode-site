import React from 'react';
import { MapPin, CheckCircle, Clock, Phone, Navigation } from 'lucide-react';

interface ServiceAreasPageProps {
  onNavigate: (page: string) => void;
}

const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({ onNavigate }) => {
  const serviceAreas = [
    {
      name: 'Downtown',
      neighborhoods: ['Central Business District', 'Arts District', 'Historic Downtown', 'Waterfront'],
      avgResponse: '25 min'
    },
    {
      name: 'North Side',
      neighborhoods: ['North Hills', 'Riverside', 'Oak Park', 'Highland Heights'],
      avgResponse: '30 min'
    },
    {
      name: 'South Side',
      neighborhoods: ['South District', 'Maple Grove', 'Sunset Valley', 'Garden Heights'],
      avgResponse: '35 min'
    },
    {
      name: 'East End',
      neighborhoods: ['East Harbor', 'Lakeside', 'Parkview', 'Meadowbrook'],
      avgResponse: '30 min'
    },
    {
      name: 'West Side',
      neighborhoods: ['West End', 'University District', 'Woodland', 'Riverside West'],
      avgResponse: '35 min'
    },
    {
      name: 'Suburbs - North',
      neighborhoods: ['Northbrook', 'Woodridge', 'Clearwater', 'Pine Hills'],
      avgResponse: '40 min'
    },
    {
      name: 'Suburbs - South',
      neighborhoods: ['Southfield', 'Oak Valley', 'Greenwood', 'Pleasant Hills'],
      avgResponse: '40 min'
    },
    {
      name: 'Suburbs - East',
      neighborhoods: ['Eastgate', 'Fairview', 'Brookside', 'Millcreek'],
      avgResponse: '45 min'
    },
    {
      name: 'Suburbs - West',
      neighborhoods: ['Westwood', 'Cedar Park', 'Rolling Hills', 'Sunset Ridge'],
      avgResponse: '45 min'
    }
  ];

  const zipCodes = [
    '10001', '10002', '10003', '10004', '10005', '10006', '10007', '10008', '10009', '10010',
    '10011', '10012', '10013', '10014', '10015', '10016', '10017', '10018', '10019', '10020',
    '10021', '10022', '10023', '10024', '10025', '10026', '10027', '10028', '10029', '10030'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0466c8] to-[#0353a4] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <MapPin className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Service Areas</h1>
            <p className="text-xl text-blue-100 mb-8">
              Proudly serving the greater metro area with fast, reliable plumbing services.
              We're your local plumbing experts, ready to help 24/7.
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 inline-block">
              <p className="text-lg mb-2">Don't see your area listed?</p>
              <p className="text-2xl font-bold">Call us at (555) 765-8237</p>
              <p className="text-sm text-blue-100 mt-2">We may still be able to help!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Map Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Coverage Area</h2>
            <p className="text-xl text-gray-600">Fast response times throughout the metro area</p>
          </div>
          <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Clock className="h-12 w-12 mx-auto mb-4" />
                <p className="text-4xl font-bold mb-2">Average Response</p>
                <p className="text-2xl text-blue-100">Under 60 Minutes</p>
              </div>
              <div>
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-4xl font-bold mb-2">Coverage Area</p>
                <p className="text-2xl text-blue-100">50+ Mile Radius</p>
              </div>
              <div>
                <Navigation className="h-12 w-12 mx-auto mb-4" />
                <p className="text-4xl font-bold mb-2">Service Zones</p>
                <p className="text-2xl text-blue-100">9 Primary Areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Primary Service Areas</h2>
            <p className="text-xl text-gray-600">
              We serve these areas with fast response times and expert service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0466c8] p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{area.name}</h3>
                  </div>
                  <div className="bg-green-100 px-3 py-1 rounded-full">
                    <p className="text-xs font-semibold text-green-700">Active</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Neighborhoods:</p>
                  <ul className="space-y-1">
                    {area.neighborhoods.map((neighborhood, nIndex) => (
                      <li key={nIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{neighborhood}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Avg. Response:</span>
                    </div>
                    <span className="font-bold text-[#0466c8]">{area.avgResponse}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZIP Codes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ZIP Codes We Service</h2>
            <p className="text-xl text-gray-600">Complete list of ZIP codes in our service area</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-4">
              {zipCodes.map((zip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="font-bold text-gray-900">{zip}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't see your ZIP code?{' '}
              <button
                onClick={() => onNavigate('contact')}
                className="text-[#0466c8] font-semibold hover:text-[#0353a4]"
              >
                Contact us
              </button>
              {' '}to verify service availability.
            </p>
          </div>
        </div>
      </section>

      {/* Service Guarantees by Area */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What You Can Expect in Your Area
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Response Times</h3>
                    <p className="text-gray-600">
                      Our strategically located service vehicles ensure we can reach you quickly,
                      with most areas served in under 60 minutes for emergencies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-6 w-6 text-[#0466c8]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Local Knowledge</h3>
                    <p className="text-gray-600">
                      Our technicians know the area and common plumbing issues specific to different
                      neighborhoods and building types in your community.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Same-Day Service</h3>
                    <p className="text-gray-600">
                      In most service areas, we offer same-day appointments for non-emergency service
                      calls when you contact us early in the day.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h3>
                    <p className="text-gray-600">
                      All service areas receive 24/7 emergency service with no overtime charges,
                      regardless of when you need us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Service Area Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Multiple service vehicles strategically positioned</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>GPS tracking for fastest route to your location</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Fully stocked trucks ready for most repairs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Local technicians familiar with your area</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Same upfront pricing across all service areas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>No travel fees or distance charges</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Permit knowledge for all local jurisdictions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expanding Service */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0466c8] to-[#0353a4] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Growing to Serve You Better</h2>
                <p className="text-xl text-blue-100 mb-6">
                  We're constantly expanding our service area to reach more customers. If you're just
                  outside our current coverage area, we may still be able to help.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>New service areas added regularly</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>Special accommodations for major projects</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>Commercial service available wider area</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-4">Check Service Availability</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter your ZIP code"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-white text-[#0466c8] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Check Availability
                  </button>
                </div>
                <p className="text-sm text-blue-100 mt-4 text-center">
                  Or call us at (555) 765-8237
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience Our Local Service?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Fast, reliable plumbing service in your neighborhood
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#0466c8] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
            >
              Schedule Service
            </button>
            <button
              onClick={() => onNavigate('emergency')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
              Emergency? Call Now!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreasPage;
