import React from 'react';
import { Phone, Clock, AlertCircle, Shield, MapPin, CheckCircle, Zap } from 'lucide-react';

interface EmergencyPageProps {
  onNavigate: (page: string) => void;
}

const EmergencyPage: React.FC<EmergencyPageProps> = ({ onNavigate }) => {
  const emergencies = [
    {
      title: 'Burst Pipes',
      description: 'Immediate response to stop water damage and repair broken pipes.',
      severity: 'critical'
    },
    {
      title: 'Sewer Backups',
      description: 'Fast cleanup and repair of sewer line issues and backups.',
      severity: 'critical'
    },
    {
      title: 'Gas Leaks',
      description: 'Emergency gas line repair for safety and code compliance.',
      severity: 'critical'
    },
    {
      title: 'Water Heater Failures',
      description: 'Quick replacement or repair to restore hot water service.',
      severity: 'urgent'
    },
    {
      title: 'Major Leaks',
      description: 'Stop leaks fast to prevent water damage to your property.',
      severity: 'urgent'
    },
    {
      title: 'Clogged Drains',
      description: 'Emergency drain clearing to restore proper drainage.',
      severity: 'urgent'
    },
    {
      title: 'Frozen Pipes',
      description: 'Thaw frozen pipes and prevent bursting in cold weather.',
      severity: 'urgent'
    },
    {
      title: 'Toilet Overflows',
      description: 'Stop overflows and repair toilet issues immediately.',
      severity: 'urgent'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Zap className="h-6 w-6 animate-pulse" />
              <span className="font-bold text-lg">24/7 EMERGENCY SERVICE</span>
              <Zap className="h-6 w-6 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Plumbing Emergency?<br />We're Here to Help!
            </h1>
            <p className="text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Fast response, expert service, available 24 hours a day, 7 days a week.
              No overtime charges, ever.
            </p>
            <div className="bg-white text-red-600 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
              <p className="text-lg font-semibold mb-3">Emergency Hotline - Call Now!</p>
              <a href="tel:5557658237" className="text-5xl md:text-6xl font-bold hover:text-red-700 transition-colors">
                (555) 765-8237
              </a>
              <p className="text-sm text-gray-600 mt-3">Average response time: Under 60 minutes</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6" />
                <span>No Overtime Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6" />
                <span>Upfront Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Emergency Response Process</h2>
            <p className="text-xl text-gray-600">Fast, efficient service when every minute counts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600">
                Speak directly with our emergency dispatch team. No answering service or voicemail.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rapid Dispatch</h3>
              <p className="text-gray-600">
                A fully-equipped technician is dispatched to your location immediately.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Diagnosis</h3>
              <p className="text-gray-600">
                We quickly assess the situation and provide upfront pricing before starting work.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Resolution</h3>
              <p className="text-gray-600">
                Our expert technicians resolve your emergency and restore your plumbing quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Emergencies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Common Plumbing Emergencies We Handle
            </h2>
            <p className="text-xl text-gray-600">
              From minor leaks to major disasters, we're ready to help
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencies.map((emergency, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 border-2 ${
                  emergency.severity === 'critical'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-orange-50 border-orange-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle
                    className={`h-6 w-6 ${
                      emergency.severity === 'critical' ? 'text-red-600' : 'text-orange-600'
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase ${
                      emergency.severity === 'critical' ? 'text-red-600' : 'text-orange-600'
                    }`}
                  >
                    {emergency.severity}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{emergency.title}</h3>
                <p className="text-gray-600 text-sm">{emergency.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Emergencies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Premier Plumbing Pros for Emergencies?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">True 24/7 Availability</h3>
                    <p className="text-gray-600">
                      Real people answer our phones 24/7/365. No answering services or callbacks.
                      Immediate dispatch to your location.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Zap className="h-6 w-6 text-[#0466c8]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Rapid Response</h3>
                    <p className="text-gray-600">
                      Our average response time is under 60 minutes. We understand that every minute
                      counts in a plumbing emergency.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Fully Equipped</h3>
                    <p className="text-gray-600">
                      Our emergency vehicles are stocked with the parts and tools needed to handle
                      most emergencies on the first visit.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Overtime Charges</h3>
                    <p className="text-gray-600">
                      We charge the same fair rates 24/7. No weekend fees, no holiday surcharges,
                      no overtime rates. Ever.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Local & Licensed</h3>
                    <p className="text-gray-600">
                      Fully licensed, bonded, and insured. Background-checked technicians who live
                      and work in your community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Emergency Service Guarantee</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-6 w-6" />
                    <h4 className="font-bold text-lg">60-Minute Response</h4>
                  </div>
                  <p className="text-red-100 text-sm">
                    We guarantee a technician will be dispatched to your location within 60 minutes
                    of your call.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="h-6 w-6" />
                    <h4 className="font-bold text-lg">Upfront Pricing</h4>
                  </div>
                  <p className="text-red-100 text-sm">
                    You'll know the exact cost before we start work. No hidden fees or surprise charges.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckCircle className="h-6 w-6" />
                    <h4 className="font-bold text-lg">100% Satisfaction</h4>
                  </div>
                  <p className="text-red-100 text-sm">
                    We stand behind our emergency work with a complete satisfaction guarantee.
                  </p>
                </div>
              </div>
              <button className="w-full bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <Phone className="h-6 w-6" />
                <span>Call Emergency Line Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Emergency Prevention Tips
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to help prevent plumbing emergencies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Know Your Main Shut-Off</h3>
              <p className="text-gray-600 mb-4">
                Locate and label your main water shut-off valve. In an emergency, turning it off quickly
                can prevent thousands in water damage.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Regular Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Schedule annual plumbing inspections to catch small issues before they become emergencies.
                Prevention is always cheaper than emergency repairs.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Watch for Warning Signs</h3>
              <p className="text-gray-600 mb-4">
                Slow drains, water pressure changes, or unusual sounds can indicate problems. Address
                them early before they become emergencies.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Protect from Freezing</h3>
              <p className="text-gray-600 mb-4">
                Insulate exposed pipes and keep cabinet doors open during freezing weather to prevent
                burst pipes from frozen water.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Don't Ignore Small Leaks</h3>
              <p className="text-gray-600 mb-4">
                A small drip can turn into a major leak. Fix minor issues promptly to avoid emergency
                situations and water damage.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Keep Our Number Handy</h3>
              <p className="text-gray-600 mb-4">
                Save our emergency number in your phone now. When an emergency strikes, you'll be ready
                to get help immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-4">Don't Wait - Get Help Now!</h2>
          <p className="text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
            Plumbing emergencies get worse with time. Call us now for immediate assistance.
          </p>
          <div className="bg-white text-red-600 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-3">24/7 Emergency Hotline</p>
            <a href="tel:5557658237" className="text-5xl md:text-6xl font-bold hover:text-red-700 transition-colors">
              (555) 765-8237
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Available 24/7/365</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>60-Minute Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No Overtime Charges</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencyPage;
