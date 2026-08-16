import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Square, Calendar, CheckCircle, Camera, Heart, Send } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';
import type { Property } from '../data/properties';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [showTourForm, setShowTourForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const resetAndClose = () => {
    setShowTourForm(false);
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    setSubmitted(false);
    setSubmitting(false);
    onClose();
  };

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Skyline Realty Group',
          demoPackage: 'Standard Website ($950)',
          demoSlug: 'skyline-realty-group',
          clientName: name,
          clientPhone: phone,
          clientEmail: email,
          service: `Property Tour: ${property.title}`,
          preferredDate: date,
          preferredTime: time,
          notes: `${property.address}, ${property.location} - listed at $${property.price.toLocaleString()}${property.status === 'For Rent' ? '/mo' : ''}`,
        }),
      });
      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'property_tour', demo_slug: 'skyline-realty-group' });
        trackConversion('leadForm');
        setSubmitted(true);
      }
    } catch {
      /* network errors are silently ignored in demo */
    }
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
      onClick={resetAndClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Header */}
        <div className="relative h-72 sm:h-80">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover rounded-t-xl" />
          <button
            onClick={resetAndClose}
            aria-label="Close"
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-[#000814]" />
          </button>
          <div className="absolute top-4 left-4 bg-[#ffc300] text-[#000814] px-4 py-2 rounded-full font-bold">
            ${property.price.toLocaleString()}
            {property.status === 'For Rent' ? '/mo' : ''}
          </div>
          <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <Camera className="w-4 h-4 mr-1 text-[#000814]" />
            <span className="text-sm font-semibold text-[#000814]">{property.images} photos</span>
          </div>
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(property.id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-[#ffc300] transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#000814]'}`} />
            </button>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#000814]">{property.title}</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              {property.status}
            </span>
          </div>
          <div className="flex items-center text-gray-600 mb-6">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            {property.address}, {property.location}
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Bed className="w-5 h-5 mx-auto mb-1 text-[#000814]" />
              <div className="font-bold text-[#000814]">{property.beds}</div>
              <div className="text-xs text-gray-600">Bedrooms</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Bath className="w-5 h-5 mx-auto mb-1 text-[#000814]" />
              <div className="font-bold text-[#000814]">{property.baths}</div>
              <div className="text-xs text-gray-600">Bathrooms</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Square className="w-5 h-5 mx-auto mb-1 text-[#000814]" />
              <div className="font-bold text-[#000814]">{property.sqft.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Sq Ft</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1 text-[#000814]" />
              <div className="font-bold text-[#000814]">{property.yearBuilt}</div>
              <div className="text-xs text-gray-600">Year Built</div>
            </div>
          </div>

          {/* Description */}
          <h4 className="text-lg font-bold text-[#000814] mb-2">About This Property</h4>
          <p className="text-gray-600 mb-6 leading-relaxed">{property.description}</p>

          {/* Features */}
          <h4 className="text-lg font-bold text-[#000814] mb-3">Highlights</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
            {property.features.map((feature) => (
              <li key={feature} className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#ffc300] mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Tour Request */}
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-[#000814] mb-2">Tour Requested!</h4>
              <p className="text-gray-600">
                We received your request to tour {property.address}. An agent will confirm your showing within 24 hours.
              </p>
            </div>
          ) : showTourForm ? (
            <form onSubmit={handleTourSubmit} className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h4 className="text-lg font-bold text-[#000814]">Schedule a Tour</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="realestate-tour-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="realestate-tour-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="realestate-tour-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    id="realestate-tour-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="realestate-tour-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    id="realestate-tour-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="realestate-tour-date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    id="realestate-tour-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="realestate-tour-time" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  id="realestate-tour-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                >
                  <option value="">Any time</option>
                  <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#ffc300] text-[#000814] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors flex items-center justify-center disabled:opacity-60"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {submitting ? 'Sending...' : 'Request Tour'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTourForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowTourForm(true)}
              className="w-full bg-[#000814] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Tour
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
