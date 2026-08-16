'use client';

import { Dumbbell, Droplets, Wind, Wifi, Lock, Car, Coffee, Heart, Zap, Shield, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface AmenitiesPageProps {
  basePath: string;
}

const tourStops = [
  {
    name: 'Main Training Floor',
    icon: Dumbbell,
    description: 'Step into 15,000 square feet of open training space. Ten power racks, eight squat cages, Olympic lifting platforms, and a full dumbbell set running from 5 to 150 pounds. Rubber flooring throughout means you can train hard at any hour.',
    highlight: '10 power racks, zero wait times',
  },
  {
    name: 'Cardio Zone',
    icon: Heart,
    description: 'Seventy-five cardio machines face floor-to-ceiling windows: treadmills, ellipticals, rowers, stair climbers, and assault bikes. Every station has its own screen, phone charger, and heart rate integration.',
    highlight: '75 machines with personal screens',
  },
  {
    name: 'Group Studios',
    icon: Zap,
    description: 'Our 3,000 square foot main studio hosts CrossFit, bootcamp, and boxing with a full-size ring. Next door, the dedicated spin studio runs immersive ride classes, and the Mind-Body Studio hosts yoga and Pilates in a calm, sound-treated space.',
    highlight: '3 dedicated studios, 100+ classes weekly',
  },
  {
    name: 'Spa & Recovery Suite',
    icon: Droplets,
    description: 'Finish your session in the Finnish sauna or steam room, then contrast with the hot and cold plunge pools. Massage therapy rooms are available for booked sessions, and Elite members receive two sessions monthly.',
    highlight: 'Sauna, steam, and plunge pools',
  },
  {
    name: 'Fuel Bar & Lounge',
    icon: Coffee,
    description: 'Refuel at the smoothie and supplement bar with fresh juices, protein shakes, and healthy snacks. The member lounge has high-speed WiFi and comfortable seating if you want to settle in before or after training.',
    highlight: 'Fresh smoothies made to order',
  },
  {
    name: 'Locker Rooms & Parking',
    icon: Lock,
    description: 'Premium changing facilities with private showers, towel service, and day-use or monthly rental lockers. Outside, 200+ well-lit parking spots with EV charging sit steps from the front door, accessible 24/7.',
    highlight: 'Towel service and 200+ parking spots',
  },
];

export default function AmenitiesPage({ basePath }: AmenitiesPageProps) {
  const [tourStop, setTourStop] = useState<number | null>(null);
  const amenities = [
    {
      icon: Dumbbell,
      title: 'Premium Equipment',
      description: 'Top-tier machines and free weights from leading brands like Rogue, Hammer Strength, and Life Fitness.',
      features: ['Latest cardio machines', 'Olympic lifting platforms', 'Power racks & squat cages', 'Cable crossover stations'],
    },
    {
      icon: Droplets,
      title: 'Spa Facilities',
      description: 'Relax and recover in our luxury spa amenities designed for optimal post-workout recovery.',
      features: ['Finnish sauna', 'Steam room', 'Hot & cold plunge pools', 'Massage therapy rooms'],
    },
    {
      icon: Wind,
      title: 'Climate Control',
      description: 'Train in comfort year-round with advanced HVAC systems maintaining perfect temperature.',
      features: ['Individual zone controls', 'Air purification', 'Humidity regulation', 'Fresh air circulation'],
    },
    {
      icon: Coffee,
      title: 'Fuel Bar',
      description: 'Grab nutritious pre and post-workout fuel at our full-service smoothie and supplement bar.',
      features: ['Fresh smoothies & juices', 'Protein supplements', 'Healthy snacks', 'Sports drinks'],
    },
    {
      icon: Lock,
      title: 'Secure Lockers',
      description: 'Keep your belongings safe with personal lockers, towel service, and premium changing facilities.',
      features: ['Day-use lockers', 'Monthly rental available', 'Towel service', 'Private showers'],
    },
    {
      icon: Car,
      title: 'Free Parking',
      description: 'Convenient parking with ample space right outside the facility for hassle-free access.',
      features: ['200+ parking spots', 'Well-lit & secure', 'EV charging stations', '24/7 access'],
    },
  ];

  const equipment = [
    {
      category: 'Cardio Zone',
      items: [
        '25 Treadmills',
        '15 Ellipticals',
        '12 Rowing Machines',
        '10 Spin Bikes',
        '8 Stair Climbers',
        '5 Assault Bikes',
      ],
    },
    {
      category: 'Strength Training',
      items: [
        'Full Dumbbell Set (5-150 lbs)',
        '10 Power Racks',
        '8 Squat Cages',
        '6 Bench Press Stations',
        'Complete Machine Circuit',
        'Olympic Lifting Platforms',
      ],
    },
    {
      category: 'Functional Training',
      items: [
        'TRX Suspension Trainers',
        'Battle Ropes',
        'Plyo Boxes',
        'Kettlebells',
        'Medicine Balls',
        'Resistance Bands',
      ],
    },
    {
      category: 'Group Studios',
      items: [
        '3,000 sq ft Main Studio',
        'Dedicated Spin Studio',
        'Mind-Body Studio',
        'Boxing Ring',
        'Turf Training Area',
        'Outdoor Training Zone',
      ],
    },
  ];

  const features = [
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Stay connected throughout your workout',
    },
    {
      icon: Heart,
      title: 'Heart Rate Monitors',
      description: 'Track your intensity in real-time',
    },
    {
      icon: Zap,
      title: 'Phone Charging',
      description: 'Charging stations at every cardio machine',
    },
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Professional security and surveillance',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#780000]/20 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[#c1121f]/10 border border-[#c1121f]/20 rounded-full px-4 py-2 mb-6">
              <Dumbbell className="h-4 w-4 text-[#c1121f]" />
              <span className="text-sm font-medium text-[#c1121f]">World-Class Facilities</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-50 mb-6">
              Gym Amenities &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                Equipment
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8">
              Experience fitness luxury with state-of-the-art equipment, premium amenities,
              and facilities designed to elevate every workout.
            </p>

            <button
              onClick={() => setTourStop(0)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all"
            >
              Take a Virtual Tour
            </button>
          </div>
        </div>
      </section>

      {/* Main Amenities */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-50 mb-4">Premium Amenities</h2>
            <p className="text-xl text-zinc-400">Everything you need for the ultimate fitness experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-[#c1121f]/50 transition-all">
                  <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-[#fdf0d5]" strokeWidth={2} />
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-50 mb-3">{amenity.title}</h3>
                  <p className="text-zinc-400 mb-4 leading-relaxed">{amenity.description}</p>

                  <ul className="space-y-2">
                    {amenity.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-zinc-300">
                        <div className="w-1.5 h-1.5 bg-[#c1121f] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment Inventory */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-50 mb-4">Equipment Inventory</h2>
            <p className="text-xl text-zinc-400">Over 15,000 sq ft of training space</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipment.map((section, index) => (
              <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <div className="mb-4 pb-4 border-b border-zinc-800">
                  <h3 className="text-xl font-bold text-zinc-50">{section.category}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-zinc-300">
                      <div className="w-1.5 h-1.5 bg-[#c1121f] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-50 mb-4">Additional Features</h2>
            <p className="text-xl text-zinc-400">The little extras that make a big difference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:border-[#c1121f]/50 transition-all">
                  <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-[#fdf0d5]" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-50 mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facility Stats */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-zinc-950 to-[#780000]/10 border border-zinc-800 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-zinc-50 mb-4">Our Facility by the Numbers</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '15,000', label: 'Square Feet', unit: 'sq ft' },
                { number: '200+', label: 'Equipment Pieces', unit: 'pieces' },
                { number: '6', label: 'Training Zones', unit: 'zones' },
                { number: '24/7', label: 'Access Hours', unit: 'access' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-zinc-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cleanliness Standards */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-50 mb-4">Cleanliness & Safety</h2>
            <p className="text-xl text-zinc-400">Your health and safety are our top priorities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Deep Cleaning',
                description: 'Professional deep cleaning every night with hospital-grade disinfectants',
              },
              {
                title: 'Equipment Sanitization',
                description: 'Multiple daily wipe-downs of all equipment and high-touch surfaces',
              },
              {
                title: 'Air Quality',
                description: 'Advanced HVAC filtration with HEPA filters and UV sanitization',
              },
              {
                title: 'Hygiene Stations',
                description: 'Hand sanitizer and cleaning supplies throughout the facility',
              },
            ].map((item, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-zinc-50 mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-900 via-[#780000]/20 to-zinc-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-zinc-50 mb-6">
            Experience Our Facilities Firsthand
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Schedule a FREE tour and see why Iron Temple is the premier fitness destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${basePath}/join`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all"
            >
              Schedule Tour
            </Link>
            <Link
              href={`${basePath}/membership`}
              className="inline-flex items-center justify-center px-8 py-4 bg-zinc-800 text-zinc-50 rounded-lg font-bold text-lg hover:bg-zinc-700 transition-colors"
            >
              View Membership
            </Link>
          </div>
        </div>
      </section>

      {/* Virtual Tour Modal */}
      {tourStop !== null && (() => {
        const stop = tourStops[tourStop];
        const StopIcon = stop.icon;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" onClick={() => setTourStop(null)}></div>
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full overflow-hidden">
              <button
                onClick={() => setTourStop(null)}
                aria-label="Close virtual tour"
                className="absolute top-4 right-4 z-10 p-2 rounded-lg text-zinc-300 hover:text-zinc-50 hover:bg-zinc-950/50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Stop Visual */}
              <div className="bg-gradient-to-br from-[#c1121f]/30 to-[#780000]/30 p-10 text-center border-b border-zinc-800">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#c1121f] to-[#780000] rounded-2xl mb-4">
                  <StopIcon className="h-10 w-10 text-[#fdf0d5]" />
                </div>
                <div className="text-xs font-semibold text-[#fdf0d5] tracking-wider mb-1">
                  VIRTUAL TOUR: STOP {tourStop + 1} OF {tourStops.length}
                </div>
                <h3 className="text-2xl font-bold text-zinc-50">{stop.name}</h3>
              </div>

              <div className="p-8">
                <p className="text-zinc-300 leading-relaxed mb-4">{stop.description}</p>
                <div className="inline-flex items-center px-3 py-1.5 bg-[#c1121f]/10 border border-[#c1121f]/20 rounded-full text-sm font-medium text-[#c1121f] mb-6">
                  {stop.highlight}
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-center space-x-2 mb-6">
                  {tourStops.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => setTourStop(index)}
                      aria-label={`Go to tour stop: ${s.name}`}
                      className={`h-2 rounded-full transition-all ${
                        index === tourStop ? 'w-6 bg-[#c1121f]' : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTourStop(Math.max(0, tourStop - 1))}
                    disabled={tourStop === 0}
                    className={`flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-colors ${
                      tourStop === 0
                        ? 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
                        : 'bg-zinc-800 text-zinc-50 hover:bg-zinc-700'
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Back
                  </button>
                  {tourStop < tourStops.length - 1 ? (
                    <button
                      onClick={() => setTourStop(tourStop + 1)}
                      className="flex-1 flex items-center justify-center py-3 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold hover:shadow-lg hover:shadow-[#c1121f]/30 transition-all"
                    >
                      Next Stop
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                  ) : (
                    <Link
                      href={`${basePath}/join`}
                      className="flex-1 flex items-center justify-center py-3 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold hover:shadow-lg hover:shadow-[#c1121f]/30 transition-all"
                    >
                      See It in Person: Join Free
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
