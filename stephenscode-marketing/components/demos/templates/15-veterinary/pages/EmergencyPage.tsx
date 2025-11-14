import React from 'react';
import { Phone, Clock, AlertTriangle, Flame, Droplets, Skull, Heart, Zap, ThermometerSun, Navigation, Shield, Activity } from 'lucide-react';

interface EmergencyPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function EmergencyPage({ onNavigate, colors }: EmergencyPageProps) {
  const emergencySigns = [
    {
      icon: Activity,
      title: 'Difficulty Breathing',
      description: 'Gasping, choking, blue-tinged gums, or severe respiratory distress',
      action: 'Call immediately - life-threatening'
    },
    {
      icon: Heart,
      title: 'Collapse or Seizures',
      description: 'Loss of consciousness, convulsions, or inability to stand',
      action: 'Emergency care needed now'
    },
    {
      icon: Droplets,
      title: 'Severe Bleeding',
      description: 'Bleeding that won\'t stop after 5 minutes of pressure',
      action: 'Apply pressure and come in'
    },
    {
      icon: Skull,
      title: 'Poisoning',
      description: 'Known or suspected ingestion of toxins, chemicals, or harmful substances',
      action: 'Call poison control & us'
    },
    {
      icon: ThermometerSun,
      title: 'Heat Stroke',
      description: 'Excessive panting, drooling, weakness after heat exposure',
      action: 'Cool down and bring in'
    },
    {
      icon: AlertTriangle,
      title: 'Trauma/Injury',
      description: 'Hit by car, serious fall, broken bones, or penetrating wounds',
      action: 'Stabilize and transport'
    },
    {
      icon: Zap,
      title: 'Bloat',
      description: 'Distended abdomen, unproductive vomiting, restlessness (especially large dogs)',
      action: 'Immediate emergency'
    },
    {
      icon: Shield,
      title: 'Unable to Urinate',
      description: 'Straining without producing urine, especially in male cats',
      action: 'Come in within 2 hours'
    },
  ];

  const commonEmergencies = [
    {
      category: 'Poisoning',
      icon: Skull,
      items: [
        'Chocolate, grapes, raisins, xylitol',
        'Household cleaners and chemicals',
        'Antifreeze (even small amounts)',
        'Human medications',
        'Rat poison or insecticides',
        'Toxic plants (lilies, azaleas, etc.)'
      ],
      firstAid: 'Do NOT induce vomiting. Call us and Pet Poison Hotline: (855) 764-7661'
    },
    {
      category: 'Wounds & Bleeding',
      icon: Droplets,
      items: [
        'Deep cuts or lacerations',
        'Puncture wounds from fights',
        'Torn nails or paw pad injuries',
        'Eye injuries',
        'Gunshot or arrow wounds',
        'Internal bleeding (pale gums)'
      ],
      firstAid: 'Apply pressure with clean cloth. Don\'t remove embedded objects. Transport carefully.'
    },
    {
      category: 'Respiratory Distress',
      icon: Activity,
      items: [
        'Choking on foreign object',
        'Severe asthma attack',
        'Allergic reaction',
        'Tracheal collapse',
        'Pneumonia',
        'Smoke inhalation'
      ],
      firstAid: 'Keep pet calm. Don\'t attempt Heimlich unless trained. Get to clinic immediately.'
    },
    {
      category: 'Gastrointestinal',
      icon: AlertTriangle,
      items: [
        'Bloat/gastric torsion',
        'Foreign body obstruction',
        'Severe vomiting/diarrhea',
        'Bloody stool or vomit',
        'Abdominal pain/distension',
        'Inability to defecate'
      ],
      firstAid: 'Withhold food. Note symptoms and frequency. Come in for evaluation.'
    },
  ];

  const whatToDo = [
    {
      step: '1',
      title: 'Stay Calm',
      description: 'Your pet can sense your anxiety. Take a deep breath and assess the situation calmly.'
    },
    {
      step: '2',
      title: 'Call Ahead',
      description: 'Contact us immediately at (555) 123-4567 so we can prepare for your arrival.'
    },
    {
      step: '3',
      title: 'Safe Transport',
      description: 'Use a carrier for cats/small pets. Muzzle dogs if needed (injured pets may bite). Support injured limbs.'
    },
    {
      step: '4',
      title: 'Bring Information',
      description: 'Medical records, list of medications, details of incident, and any substance/toxin involved.'
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section - Emergency Alert */}
      <section className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">24/7 Emergency Veterinary Care</h1>
          <p className="text-2xl text-red-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            When your pet needs immediate medical attention, we're here for you - day or night
          </p>

          <div className="bg-white text-gray-900 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
            <Phone className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <p className="text-xl font-semibold mb-4">Emergency Hotline - Available 24/7</p>
            <a
              href="tel:555-123-4567"
              className="text-5xl font-bold text-red-600 hover:underline block mb-4"
            >
              (555) 123-4567
            </a>
            <p className="text-gray-600">
              <Clock className="w-5 h-5 inline mr-2" />
              Open 24 hours a day, 365 days a year
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Warning Signs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              When to Seek Emergency Care
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If you notice any of these signs, contact us immediately
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencySigns.map((sign, index) => {
              const Icon = sign.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-b from-red-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-red-600"
                >
                  <Icon className="w-12 h-12 mb-4 text-red-600" />
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                    {sign.title}
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                    {sign.description}
                  </p>
                  <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-xs font-bold">
                    {sign.action}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl p-8 text-center">
            <p className="text-xl font-bold mb-2">
              When in Doubt, Call Us
            </p>
            <p className="text-red-100">
              If you're unsure whether your pet needs emergency care, call us. We'll help you assess the situation and determine the best course of action.
            </p>
          </div>
        </div>
      </section>

      {/* Common Emergencies */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Common Pet Emergencies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Know the signs and what to do before you arrive
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {commonEmergencies.map((emergency, index) => {
              const Icon = emergency.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="p-6 border-b-4 border-red-600">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-red-100 rounded-xl">
                        <Icon className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold" style={{ color: colors.primary }}>
                        {emergency.category}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {emergency.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0 text-red-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-red-50">
                    <p className="font-bold text-red-800 mb-2">First Aid:</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {emergency.firstAid}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Do in an Emergency */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Emergency Action Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these steps when your pet has an emergency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToDo.map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white"
                  style={{ backgroundColor: colors.secondary }}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Directions */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <Navigation className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                Emergency Clinic Location
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>
                  Our Address
                </h3>
                <p className="text-gray-700 mb-6 text-lg">
                  Paws & Care Animal Hospital<br />
                  123 Veterinary Lane<br />
                  Anytown, ST 12345
                </p>

                <h3 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>
                  Parking & Entrance
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Free parking available in front and rear lot</li>
                  <li>• Emergency entrance on the right side of building</li>
                  <li>• Look for red "Emergency" signs</li>
                  <li>• Ring bell if doors are locked (after hours)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>
                  Quick Directions
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>From North:</strong> Take I-95 South to Exit 42, turn left on Main St, right on Veterinary Ln
                  </li>
                  <li>
                    <strong>From South:</strong> Take I-95 North to Exit 42, turn right on Main St, right on Veterinary Ln
                  </li>
                  <li>
                    <strong>From Downtown:</strong> Take Main Street east for 2 miles, turn right on Veterinary Lane
                  </li>
                </ul>

                <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: colors.accent + '20' }}>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Navigation className="w-5 h-5 flex-shrink-0" style={{ color: colors.primary }} />
                    <span>GPS Coordinates: 40.7128° N, 74.0060° W</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* After Hours Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-teal-50 to-white rounded-2xl shadow-xl p-8">
            <Clock className="w-16 h-16 mx-auto mb-6" style={{ color: colors.primary }} />
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
              After-Hours Emergency Protocol
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.secondary }}>
                  How After-Hours Works
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold" style={{ color: colors.primary }}>1.</span>
                    <span>Call our main number (555) 123-4567 - it's answered 24/7</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold" style={{ color: colors.primary }}>2.</span>
                    <span>Describe your pet's emergency to our on-call veterinarian</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold" style={{ color: colors.primary }}>3.</span>
                    <span>We'll determine if immediate care is needed or can wait until morning</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold" style={{ color: colors.primary }}>4.</span>
                    <span>If needed, bring your pet in - a veterinarian will meet you at the clinic</span>
                  </li>
                </ol>
              </div>

              <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl">
                <p className="text-gray-800 font-semibold mb-2">
                  Emergency Fee Information
                </p>
                <p className="text-gray-700 leading-relaxed">
                  After-hours emergency visits include an emergency exam fee in addition to treatment costs. We accept all major credit cards and offer CareCredit financing. Your pet's health comes first - we'll work with you on payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Poison Control Resources */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Skull className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
              Pet Poison Control Resources
            </h2>

            <div className="space-y-4 text-center">
              <div className="p-6 bg-purple-50 rounded-xl">
                <p className="font-bold text-lg mb-2 text-purple-900">ASPCA Animal Poison Control</p>
                <a href="tel:888-426-4435" className="text-2xl font-bold text-purple-600 hover:underline">
                  (888) 426-4435
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  Available 24/7 • $95 consultation fee may apply
                </p>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl">
                <p className="font-bold text-lg mb-2 text-blue-900">Pet Poison Helpline</p>
                <a href="tel:855-764-7661" className="text-2xl font-bold text-blue-600 hover:underline">
                  (855) 764-7661
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  Available 24/7 • $75 consultation fee may apply
                </p>
              </div>

              <p className="text-gray-700 pt-4">
                <strong>Always call us in addition to poison control.</strong> We can provide immediate care while poison control advises on specific toxin management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            We're Here When You Need Us Most
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Emergencies are stressful, but you're not alone. Our experienced emergency team is ready to provide expert care for your pet 24 hours a day, 7 days a week.
          </p>
          <a
            href="tel:555-123-4567"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-red-600 rounded-full font-bold text-2xl hover:bg-red-50 transition-all shadow-2xl"
          >
            <Phone className="w-8 h-8" />
            Call (555) 123-4567 Now
          </a>
          <p className="mt-6 text-red-100">
            Save this number in your phone for quick access in emergencies
          </p>
        </div>
      </section>
    </div>
  );
}
