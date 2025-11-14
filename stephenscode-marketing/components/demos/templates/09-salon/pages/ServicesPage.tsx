import React, { useState } from 'react';
import { Scissors, Sparkles, Palette, Crown, Heart, Users, Package, Video } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services', icon: Sparkles },
    { id: 'hair', name: 'Hair', icon: Scissors },
    { id: 'styling', name: 'Styling', icon: Palette },
    { id: 'nails', name: 'Nails', icon: Heart },
    { id: 'special', name: 'Special Occasions', icon: Crown },
  ];

  const services = [
    {
      category: 'hair',
      title: 'Hair Cutting',
      items: [
        { name: 'Women\'s Haircut', price: '$65', duration: '45 min' },
        { name: 'Men\'s Haircut', price: '$45', duration: '30 min' },
        { name: 'Children\'s Haircut (12 & under)', price: '$35', duration: '30 min' },
        { name: 'Bang Trim', price: '$15', duration: '15 min' },
      ],
    },
    {
      category: 'hair',
      title: 'Hair Coloring',
      items: [
        { name: 'Single Process Color', price: '$85+', duration: '90 min' },
        { name: 'Partial Highlights', price: '$125+', duration: '2 hrs' },
        { name: 'Full Highlights', price: '$165+', duration: '3 hrs' },
        { name: 'Balayage', price: '$185+', duration: '3 hrs' },
        { name: 'Ombre', price: '$175+', duration: '3 hrs' },
        { name: 'Root Touch-Up', price: '$65', duration: '60 min' },
        { name: 'Toner Treatment', price: '$45', duration: '30 min' },
      ],
    },
    {
      category: 'styling',
      title: 'Hair Styling',
      items: [
        { name: 'Blowout', price: '$45', duration: '45 min' },
        { name: 'Special Occasion Updo', price: '$85+', duration: '90 min' },
        { name: 'Braiding Styles', price: '$65+', duration: '60 min' },
        { name: 'Hair Extensions (Full Head)', price: '$350+', duration: '4 hrs' },
        { name: 'Extension Installation (Tape-in)', price: '$250+', duration: '2 hrs' },
        { name: 'Extension Removal', price: '$75', duration: '60 min' },
      ],
    },
    {
      category: 'hair',
      title: 'Hair Treatments',
      items: [
        { name: 'Keratin Treatment', price: '$250+', duration: '3 hrs' },
        { name: 'Deep Conditioning Treatment', price: '$45', duration: '30 min' },
        { name: 'Olaplex Treatment', price: '$65', duration: '45 min' },
        { name: 'Scalp Treatment', price: '$55', duration: '30 min' },
      ],
    },
    {
      category: 'nails',
      title: 'Manicure Services',
      items: [
        { name: 'Classic Manicure', price: '$35', duration: '45 min' },
        { name: 'Gel Manicure', price: '$55', duration: '60 min' },
        { name: 'Acrylic Full Set', price: '$65', duration: '90 min' },
        { name: 'Acrylic Fill', price: '$45', duration: '60 min' },
        { name: 'Gel Extensions', price: '$75', duration: '90 min' },
        { name: 'Nail Art (per nail)', price: '$5+', duration: '10 min' },
      ],
    },
    {
      category: 'nails',
      title: 'Pedicure Services',
      items: [
        { name: 'Classic Pedicure', price: '$45', duration: '60 min' },
        { name: 'Gel Pedicure', price: '$65', duration: '75 min' },
        { name: 'Spa Pedicure', price: '$75', duration: '90 min' },
        { name: 'Luxury Pedicure', price: '$95', duration: '105 min' },
      ],
    },
    {
      category: 'special',
      title: 'Bridal & Special Events',
      items: [
        { name: 'Bridal Hair', price: '$150+', duration: '2 hrs' },
        { name: 'Bridal Makeup', price: '$125+', duration: '90 min' },
        { name: 'Bridal Hair & Makeup Package', price: '$250+', duration: '3 hrs' },
        { name: 'Bridal Trial', price: '$100', duration: '90 min' },
        { name: 'Bridesmaid Hair', price: '$85', duration: '60 min' },
        { name: 'Bridesmaid Makeup', price: '$75', duration: '45 min' },
        { name: 'Prom Package (Hair & Makeup)', price: '$150', duration: '2 hrs' },
      ],
    },
    {
      category: 'special',
      title: 'Makeup Services',
      items: [
        { name: 'Special Occasion Makeup', price: '$85', duration: '60 min' },
        { name: 'Natural/Everyday Makeup', price: '$65', duration: '45 min' },
        { name: 'Makeup Lesson', price: '$95', duration: '90 min' },
        { name: 'Lash Extensions (Full Set)', price: '$150', duration: '2 hrs' },
        { name: 'Lash Fill', price: '$75', duration: '60 min' },
      ],
    },
    {
      category: 'styling',
      title: 'Waxing Services',
      items: [
        { name: 'Eyebrow Wax', price: '$20', duration: '15 min' },
        { name: 'Upper Lip Wax', price: '$15', duration: '10 min' },
        { name: 'Face Wax', price: '$45', duration: '30 min' },
        { name: 'Arm Wax', price: '$55', duration: '45 min' },
        { name: 'Leg Wax (Full)', price: '$85', duration: '60 min' },
        { name: 'Brazilian Wax', price: '$75', duration: '45 min' },
      ],
    },
  ];

  const packages = [
    {
      name: 'Signature Glam Package',
      price: '$185',
      duration: '3.5 hours',
      services: ['Haircut & Style', 'Partial Highlights', 'Deep Conditioning', 'Gel Manicure'],
      savings: 'Save $45',
    },
    {
      name: 'Complete Beauty Day',
      price: '$295',
      duration: '5 hours',
      services: ['Cut & Color', 'Blowout', 'Gel Manicure', 'Spa Pedicure', 'Makeup Application'],
      savings: 'Save $80',
    },
    {
      name: 'Bridal Luxury Experience',
      price: '$495',
      duration: '6 hours',
      services: ['Bridal Hair', 'Bridal Makeup', 'Manicure', 'Pedicure', 'Lash Extensions', 'Touch-up Kit'],
      savings: 'Save $120',
    },
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Premium beauty services with exceptional results. All services include consultation.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-md sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-4 py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredServices.map((serviceGroup, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-8 py-4">
                  <h3 className="text-2xl font-bold">{serviceGroup.title}</h3>
                </div>
                <div className="p-8">
                  <div className="grid gap-4">
                    {serviceGroup.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center py-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 px-4 rounded-lg transition-colors duration-200"
                      >
                        <div>
                          <h4 className="font-semibold text-lg">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#d00000]">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Deals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Package className="w-16 h-16 text-[#d00000] mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">VIP Package Deals</h2>
            <p className="text-xl text-gray-600">
              Combine services and save big on our curated packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-[#d00000] transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-6 py-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    <span className="bg-white text-[#d00000] px-3 py-1 rounded-full text-sm font-semibold">
                      {pkg.savings}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-[#d00000] mb-2">{pkg.price}</p>
                    <p className="text-sm text-gray-500">{pkg.duration}</p>
                  </div>
                  <ul className="space-y-3">
                    {pkg.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start">
                        <span className="text-[#d00000] mr-2">✓</span>
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onNavigate('booking')}
                    className="w-full mt-6 bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Book This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Virtual Consultation */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Video className="w-12 h-12 text-[#d00000] mb-4" />
              <h3 className="text-2xl font-bold mb-4">Virtual Consultation</h3>
              <p className="text-gray-600 mb-4">
                Not sure what service is right for you? Book a complimentary 15-minute video consultation with one of our expert stylists.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-[#d00000] mr-2">✓</span>
                  <span>Color recommendations</span>
                </li>
                <li className="flex items-center">
                  <span className="text-[#d00000] mr-2">✓</span>
                  <span>Style suggestions</span>
                </li>
                <li className="flex items-center">
                  <span className="text-[#d00000] mr-2">✓</span>
                  <span>Product advice</span>
                </li>
              </ul>
              <button className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                Schedule Consultation
              </button>
            </div>

            {/* Product Line */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Sparkles className="w-12 h-12 text-[#d00000] mb-4" />
              <h3 className="text-2xl font-bold mb-4">Premium Products</h3>
              <p className="text-gray-600 mb-4">
                We exclusively use and retail professional-grade products from industry-leading brands.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Olaplex</p>
                  <p className="text-sm text-gray-500">Hair Treatment</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Redken</p>
                  <p className="text-sm text-gray-500">Color & Style</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">OPI</p>
                  <p className="text-sm text-gray-500">Nail Products</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">MAC</p>
                  <p className="text-sm text-gray-500">Makeup</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">
                VIP members receive 20% off all retail products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book Your Service?</h2>
          <p className="text-xl text-white/90 mb-8">
            Choose your preferred stylist and time - appointments available 7 days a week
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="bg-white text-[#d00000] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Book Your Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
