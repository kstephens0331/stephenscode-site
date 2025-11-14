import React from 'react';
import { AlertCircle, Phone, Clock, Zap, Shield, CheckCircle, ThermometerSnowflake, Flame } from 'lucide-react';

interface EmergencyPageProps {
  onNavigate: (page: string) => void;
}

export default function EmergencyPage({ onNavigate }: EmergencyPageProps) {
  const emergencyScenarios = [
    {
      icon: ThermometerSnowflake,
      title: 'AC System Failure',
      description: 'Complete AC breakdown during extreme heat',
      urgency: 'Critical',
    },
    {
      icon: Flame,
      title: 'No Heat',
      description: 'Furnace or heating system not working in winter',
      urgency: 'Critical',
    },
    {
      icon: AlertCircle,
      title: 'Gas Smell',
      description: 'Suspected gas leak from heating equipment',
      urgency: 'Immediate',
    },
    {
      icon: Zap,
      title: 'Electrical Issues',
      description: 'Burning smell or sparking from HVAC unit',
      urgency: 'Immediate',
    },
    {
      icon: AlertCircle,
      title: 'Carbon Monoxide',
      description: 'CO detector alarm from heating system',
      urgency: 'Immediate',
    },
    {
      icon: AlertCircle,
      title: 'Water Leaks',
      description: 'Major water leak from HVAC equipment',
      urgency: 'High',
    },
  ];

  const whyChooseUs = [
    'Fastest response time in the area',
    'Available 24 hours a day, 7 days a week',
    'Licensed and certified technicians',
    'Fully stocked service vehicles',
    'No overtime charges for emergencies',
    'Upfront pricing before we begin',
  ];

  const serviceAreas = [
    'Downtown & Metro Area',
    'North County',
    'South County',
    'East Valley',
    'West Valley',
    'Suburban Areas',
  ];

  return (
    <div>
      {/* Emergency Header */}
      <section className="bg-gradient-to-r from-[#d62828] to-[#b11f1f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="w-20 h-20 mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl font-bold mb-4">24/7 Emergency HVAC Service</h1>
            <p className="text-2xl text-white/90 mb-8">
              When you need help NOW, we&apos;re here for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:555-COOL-NOW"
                className="bg-white text-[#d62828] px-10 py-5 rounded-lg font-bold text-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl flex items-center animate-pulse"
              >
                <Phone className="w-8 h-8 mr-3" />
                CALL NOW: (555) COOL-NOW
              </a>
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold">Available 24/7/365</p>
                <p className="text-white/80">Average response time: Under 1 hour</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Qualifies as Emergency */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">
              What Qualifies as an Emergency?
            </h2>
            <p className="text-xl text-gray-600">
              If you&apos;re experiencing any of these issues, call us immediately
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyScenarios.map((scenario, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 shadow-lg border-l-4 ${
                  scenario.urgency === 'Immediate'
                    ? 'bg-red-50 border-red-500'
                    : scenario.urgency === 'Critical'
                    ? 'bg-orange-50 border-orange-500'
                    : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex items-start mb-4">
                  <scenario.icon
                    className={`w-10 h-10 mr-3 flex-shrink-0 ${
                      scenario.urgency === 'Immediate'
                        ? 'text-red-600'
                        : scenario.urgency === 'Critical'
                        ? 'text-orange-600'
                        : 'text-yellow-600'
                    }`}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#003049] mb-2">
                      {scenario.title}
                    </h3>
                    <p className="text-gray-700 mb-2">{scenario.description}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        scenario.urgency === 'Immediate'
                          ? 'bg-red-200 text-red-800'
                          : scenario.urgency === 'Critical'
                          ? 'bg-orange-200 text-orange-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {scenario.urgency} Action Required
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#d62828] text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Don&apos;t Wait - Call Immediately!</h3>
            <p className="text-xl mb-6">
              Emergency HVAC issues can be dangerous and cause property damage. Our team is standing by.
            </p>
            <a
              href="tel:555-COOL-NOW"
              className="inline-block bg-white text-[#d62828] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300"
            >
              <Phone className="inline w-6 h-6 mr-2" />
              Emergency Hotline: (555) COOL-NOW
            </a>
          </div>
        </div>
      </section>

      {/* Our Emergency Service Promise */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">
              Our Emergency Service Promise
            </h2>
            <p className="text-xl text-gray-600">
              When you call Cool Breeze, you can count on:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#d62828] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#003049]">
                Rapid Response
              </h3>
              <p className="text-gray-600">
                We aim to arrive within 60 minutes for true emergencies. Our technicians are strategically located throughout our service area.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#f77f00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#003049]">
                Expert Technicians
              </h3>
              <p className="text-gray-600">
                All our emergency techs are master-level certified with years of experience handling critical situations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#003049] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#003049]">
                Fully Equipped
              </h3>
              <p className="text-gray-600">
                Our trucks carry extensive inventory to fix most problems on the first visit, even in the middle of the night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Emergencies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[#003049]">
                Why Choose Cool Breeze for Emergency Service?
              </h2>
              <ul className="space-y-4">
                {whyChooseUs.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#f77f00] mr-3 flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#003049] to-[#004d73] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Emergency Service Areas</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#f77f00] mr-2 flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <p className="font-semibold mb-4">Coverage Details:</p>
                <ul className="space-y-2 text-sm text-white/90">
                  <li>• 50-mile service radius</li>
                  <li>• No additional travel charges</li>
                  <li>• Same pricing day or night</li>
                  <li>• Weekends and holidays covered</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Prepare */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">
              What to Do While You Wait
            </h2>
            <p className="text-xl text-gray-600">
              Follow these steps while our technician is on the way
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-[#003049]">For AC Failures:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Turn off the system at the thermostat</li>
                <li>• Close blinds to keep heat out</li>
                <li>• Stay hydrated</li>
                <li>• Move to coolest room if possible</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-[#003049]">For Heating Failures:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Turn off the system</li>
                <li>• Close doors to unused rooms</li>
                <li>• Dress in warm layers</li>
                <li>• Prevent pipe freezing if very cold</li>
              </ul>
            </div>

            <div className="bg-red-100 p-6 rounded-xl shadow-lg border-2 border-red-500">
              <h3 className="text-xl font-bold mb-4 text-red-800">For Gas Leaks:</h3>
              <ul className="space-y-2 text-red-900">
                <li>• Evacuate immediately</li>
                <li>• Do NOT use any electrical switches</li>
                <li>• Call 911 first, then us</li>
                <li>• Do NOT re-enter until cleared</li>
              </ul>
            </div>

            <div className="bg-red-100 p-6 rounded-xl shadow-lg border-2 border-red-500">
              <h3 className="text-xl font-bold mb-4 text-red-800">For Electrical Issues:</h3>
              <ul className="space-y-2 text-red-900">
                <li>• Turn off power to the unit</li>
                <li>• Do NOT touch the equipment</li>
                <li>• Keep area clear</li>
                <li>• Call us immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#d62828] to-[#b11f1f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Need Emergency Help Right Now?</h2>
          <p className="text-2xl text-white/90 mb-8">
            Don&apos;t wait - our expert technicians are standing by 24/7
          </p>
          <a
            href="tel:555-COOL-NOW"
            className="inline-block bg-white text-[#d62828] px-12 py-6 rounded-lg font-bold text-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl"
          >
            <Phone className="inline w-8 h-8 mr-3" />
            CALL (555) COOL-NOW
          </a>
          <p className="text-white/80 mt-6 text-lg">
            Available 24 hours • 7 days a week • 365 days a year
          </p>
        </div>
      </section>
    </div>
  );
}
