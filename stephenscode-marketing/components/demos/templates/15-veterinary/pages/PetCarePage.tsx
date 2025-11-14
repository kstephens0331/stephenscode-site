import React from 'react';
import { Heart, Droplet, Utensils, Activity, Moon, Thermometer, Bone, Stethoscope, Sparkles, ShieldCheck, Dog, Cat } from 'lucide-react';

interface PetCarePageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function PetCarePage({ onNavigate, colors }: PetCarePageProps) {
  const [selectedCategory, setSelectedCategory] = React.useState('general');

  const categories = [
    { id: 'general', label: 'General Care', icon: Heart },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'health', label: 'Health Signs', icon: Stethoscope },
    { id: 'senior', label: 'Senior Pets', icon: Moon },
    { id: 'puppyKitten', label: 'Puppies & Kittens', icon: Sparkles },
  ];

  const articles = {
    general: [
      {
        title: 'Essential Daily Pet Care Routine',
        icon: Heart,
        content: 'Establishing a consistent daily routine helps keep your pet healthy and happy. This includes regular feeding times, exercise, play, grooming, and quiet time.',
        tips: [
          'Feed at the same times each day',
          'Provide fresh water at all times',
          'Daily exercise appropriate for age and breed',
          'Regular brushing and grooming',
          'Quality time and mental stimulation',
          'Consistent sleep schedule'
        ]
      },
      {
        title: 'Hydration & Water Safety',
        icon: Droplet,
        content: 'Proper hydration is crucial for your pet\'s health. Dogs and cats should have access to clean, fresh water at all times.',
        tips: [
          'Change water at least twice daily',
          'Wash water bowls daily',
          'Monitor water intake for changes',
          'Provide multiple water stations in larger homes',
          'Use stainless steel or ceramic bowls',
          'Consider a pet fountain for cats'
        ]
      },
      {
        title: 'Exercise & Mental Stimulation',
        icon: Activity,
        content: 'Physical activity and mental enrichment are vital for your pet\'s wellbeing, helping prevent obesity and behavioral issues.',
        tips: [
          'Dogs: 30-120 minutes daily depending on breed',
          'Cats: 20-30 minutes of active play',
          'Use puzzle toys and food dispensers',
          'Rotate toys to maintain interest',
          'Training sessions for mental stimulation',
          'Consider dog sports or agility training'
        ]
      }
    ],
    nutrition: [
      {
        title: 'Choosing the Right Food',
        icon: Utensils,
        content: 'Quality nutrition is the foundation of good health. Select food appropriate for your pet\'s life stage, size, and health needs.',
        tips: [
          'Look for AAFCO-approved foods',
          'Choose age-appropriate formulas',
          'Consider breed-specific requirements',
          'Read ingredient labels carefully',
          'Transition foods gradually over 7-10 days',
          'Consult your vet for recommendations'
        ]
      },
      {
        title: 'Portion Control & Feeding Schedule',
        icon: Bone,
        content: 'Proper portion sizes and feeding schedules help maintain a healthy weight and prevent obesity-related health issues.',
        tips: [
          'Follow feeding guidelines on food packaging',
          'Adjust portions based on activity level',
          'Feed adults 1-2 times daily',
          'Puppies/kittens need 3-4 smaller meals',
          'Use measuring cups for accuracy',
          'Limit treats to 10% of daily calories'
        ]
      },
      {
        title: 'Foods to Avoid',
        icon: ShieldCheck,
        content: 'Many common human foods are toxic to pets. Know what to keep away from your furry friends.',
        tips: [
          'NEVER: Chocolate, grapes, raisins, onions, garlic',
          'Avoid: Xylitol (artificial sweetener)',
          'Dangerous: Macadamia nuts, avocado',
          'Toxic: Alcohol, caffeine',
          'Harmful: Raw dough, cooked bones',
          'Keep human medications away from pets'
        ]
      }
    ],
    health: [
      {
        title: 'Signs of a Healthy Pet',
        icon: Heart,
        content: 'Knowing what\'s normal for your pet helps you identify when something might be wrong.',
        tips: [
          'Clear, bright eyes',
          'Clean ears with no odor',
          'Shiny, clean coat',
          'Pink, healthy gums',
          'Good appetite and energy',
          'Normal bowel movements'
        ]
      },
      {
        title: 'When to Call the Vet',
        icon: Thermometer,
        content: 'Recognizing warning signs can help you get your pet timely medical care when they need it.',
        tips: [
          'Sudden loss of appetite or lethargy',
          'Vomiting or diarrhea lasting more than 24 hours',
          'Difficulty breathing or excessive panting',
          'Limping or difficulty moving',
          'Excessive drinking or urination',
          'Unusual lumps or bumps'
        ]
      },
      {
        title: 'Preventive Care Schedule',
        icon: Stethoscope,
        content: 'Regular preventive care helps catch problems early and keeps your pet healthy for life.',
        tips: [
          'Annual wellness exams (bi-annual for seniors)',
          'Keep vaccinations up to date',
          'Monthly flea, tick, and heartworm prevention',
          'Annual dental cleanings',
          'Regular parasite screenings',
          'Bloodwork for senior pets'
        ]
      }
    ],
    senior: [
      {
        title: 'Caring for Aging Pets',
        icon: Moon,
        content: 'Senior pets (7+ years for dogs, 10+ for cats) need special attention and modified care to maintain quality of life.',
        tips: [
          'Increase vet visits to twice yearly',
          'Senior wellness bloodwork',
          'Joint supplements for mobility',
          'Softer bedding and easier access',
          'Adjust diet for age and activity',
          'Monitor for cognitive changes'
        ]
      },
      {
        title: 'Managing Arthritis & Joint Pain',
        icon: Bone,
        content: 'Many senior pets develop arthritis. Proper management can keep them comfortable and mobile.',
        tips: [
          'Weight management is crucial',
          'Low-impact exercise like swimming',
          'Orthopedic beds and ramps',
          'Joint supplements (glucosamine, chondroitin)',
          'Anti-inflammatory medications if needed',
          'Keep nails trimmed short'
        ]
      },
      {
        title: 'Senior Pet Nutrition',
        icon: Utensils,
        content: 'Nutritional needs change as pets age. Senior formulas address these changing requirements.',
        tips: [
          'Lower calorie, higher fiber formulas',
          'Enhanced with joint-supporting nutrients',
          'Easier to chew and digest',
          'More frequent, smaller meals',
          'Plenty of fresh water',
          'Consider wet food for hydration'
        ]
      }
    ],
    puppyKitten: [
      {
        title: 'First Year Milestones',
        icon: Sparkles,
        content: 'The first year is crucial for development. Proper care sets the foundation for a healthy life.',
        tips: [
          'Vaccination series: 6, 9, 12, and 16 weeks',
          'Spay/neuter at 6 months',
          'Puppy/kitten classes for socialization',
          'Multiple small meals daily',
          'Lots of gentle handling and exposure',
          'Establish routines early'
        ]
      },
      {
        title: 'Socialization & Training',
        icon: Heart,
        content: 'Early socialization and positive training create well-adjusted, confident adult pets.',
        tips: [
          'Critical period: 3-14 weeks for puppies',
          'Expose to various people, pets, sounds',
          'Positive reinforcement training only',
          'Short, fun training sessions',
          'Puppy kindergarten classes recommended',
          'Handle paws, ears, mouth regularly'
        ]
      },
      {
        title: 'Puppy & Kitten Nutrition',
        icon: Utensils,
        content: 'Growing pets need nutrient-dense food formulated for development and high energy needs.',
        tips: [
          'Feed puppy/kitten formula until 1 year',
          'Large breeds may need puppy food longer',
          'Feed 3-4 times daily until 6 months',
          'Then reduce to 2-3 times daily',
          'Don\'t overfeed - obesity affects development',
          'Provide fresh water at all times'
        ]
      }
    ]
  };

  const breedSpecificTips = [
    {
      breed: 'Large Breeds',
      icon: Dog,
      tips: 'Joint health supplements, controlled growth rates, heart disease screening, bloat prevention measures'
    },
    {
      breed: 'Small Breeds',
      icon: Dog,
      tips: 'Dental care emphasis, hypoglycemia awareness, knee joint monitoring, careful with treats'
    },
    {
      breed: 'Flat-Faced Breeds',
      icon: Dog,
      tips: 'Heat sensitivity awareness, breathing monitoring, dental care, eye protection, weight management'
    },
    {
      breed: 'Long-Haired Cats',
      icon: Cat,
      tips: 'Daily brushing, hairball prevention, mat removal, professional grooming as needed'
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section style={{ backgroundColor: colors.primary }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Pet Care Tips & Resources</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Expert advice to help you provide the best care for your beloved companion at every stage of life
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white shadow-md sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'text-white shadow-lg'
                      : 'bg-teal-50 text-gray-700 hover:bg-teal-100'
                  }`}
                  style={selectedCategory === category.id ? { backgroundColor: colors.secondary } : {}}
                >
                  <Icon className="w-5 h-5" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles[selectedCategory as keyof typeof articles].map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="p-6 border-b-4" style={{ borderBottomColor: colors.accent }}>
                  <article.icon className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
                  <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
                    {article.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {article.content}
                  </p>
                </div>
                <div className="p-6 bg-teal-50">
                  <h4 className="font-semibold mb-3" style={{ color: colors.secondary }}>
                    Key Tips:
                  </h4>
                  <ul className="space-y-2">
                    {article.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} fill="currentColor" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breed-Specific Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Breed-Specific Care Tips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Different breeds have unique needs - here's what to know
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {breedSpecificTips.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: colors.accent + '20' }}
              >
                <item.icon className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                  {item.breed}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.tips}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                Need Breed-Specific Advice?
              </h3>
              <p className="text-teal-100 mb-6 leading-relaxed">
                Our veterinarians have extensive experience with all breeds and can provide personalized care recommendations for your pet.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-lg"
                style={{ backgroundColor: colors.accent }}
              >
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Warning Signs */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Emergency Warning Signs
            </h2>
            <p className="text-xl text-red-100">
              Call us immediately if you notice any of these symptoms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Difficulty breathing or choking',
              'Seizures or collapse',
              'Bleeding that won\'t stop',
              'Suspected poisoning',
              'Severe vomiting or diarrhea',
              'Unable to urinate',
              'Eye injuries',
              'Heat stroke symptoms',
              'Broken bones or severe injuries'
            ].map((sign, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border-2 border-white/20 flex items-center gap-3"
              >
                <Thermometer className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium">{sign}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl font-bold mb-4">24/7 Emergency Hotline</p>
            <a
              href="tel:555-123-4567"
              className="text-3xl font-bold hover:underline"
            >
              (555) 123-4567
            </a>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
              Additional Resources
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.secondary }}>
                  Recommended Reading
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Complete Guide to Puppy Care (Free Download)</li>
                  <li>• Senior Pet Wellness Checklist</li>
                  <li>• Emergency First Aid for Pets</li>
                  <li>• Nutrition Guide by Life Stage</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.secondary }}>
                  Online Tools
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pet Health Tracker App</li>
                  <li>• Vaccination Reminder Service</li>
                  <li>• Body Condition Score Calculator</li>
                  <li>• Pet Medication Reminder</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.secondary }}>
                  Community Resources
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Monthly Pet Care Webinars</li>
                  <li>• Local Training Classes</li>
                  <li>• Pet Parent Support Groups</li>
                  <li>• Rescue & Adoption Partners</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Have Questions About Pet Care?
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Our veterinary team is here to help with personalized advice for your pet's unique needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              Contact Us
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all"
            >
              View FAQs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
