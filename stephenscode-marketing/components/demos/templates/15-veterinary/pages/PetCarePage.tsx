import React from 'react';
import { Heart, Droplet, Utensils, Activity, Moon, Thermometer, Bone, Stethoscope, Sparkles, ShieldCheck, Dog, Cat, Download, CheckCircle } from 'lucide-react';

const readingGuides: { title: string; content: string[] }[] = [
  {
    title: 'Complete Guide to Puppy Care',
    content: [
      'FIRST WEEK HOME',
      '- Set up a quiet space with a crate, bed, water, and toys',
      '- Keep the same food the breeder or shelter used, transition slowly',
      '- Schedule a first wellness exam within 72 hours',
      '',
      'VACCINATION SCHEDULE',
      '- 6-8 weeks: DHPP first dose',
      '- 10-12 weeks: DHPP booster, Bordetella',
      '- 14-16 weeks: DHPP booster, Rabies',
      '',
      'HOUSE TRAINING BASICS',
      '- Take your puppy out after meals, naps, and play',
      '- Reward outdoor success immediately, never punish accidents',
      '- Most puppies are reliable by 4-6 months with consistency',
      '',
      'SOCIALIZATION WINDOW (3-14 WEEKS)',
      '- Introduce new people, sounds, surfaces, and gentle handling',
      '- Puppy kindergarten classes are strongly recommended',
    ],
  },
  {
    title: 'Senior Pet Wellness Checklist',
    content: [
      'TWICE-YEARLY VET VISITS',
      '[ ] Comprehensive physical exam every 6 months',
      '[ ] Senior bloodwork panel annually',
      '[ ] Blood pressure check',
      '[ ] Dental evaluation',
      '',
      'AT-HOME MONITORING',
      '[ ] Weigh monthly and note changes over 5 percent',
      '[ ] Watch water intake, increased thirst warrants a call',
      '[ ] Note stiffness after rest or reluctance on stairs',
      '[ ] Track appetite and litter box or bathroom habits',
      '',
      'COMFORT UPGRADES',
      '[ ] Orthopedic bed in a warm, draft-free spot',
      '[ ] Ramps or steps for furniture and cars',
      '[ ] Rugs or runners on slippery floors',
      '[ ] Raised food and water bowls',
    ],
  },
  {
    title: 'Emergency First Aid for Pets',
    content: [
      'EMERGENCY NUMBERS',
      'Paws & Care 24/7 line: (555) 123-4567',
      'ASPCA Poison Control: (888) 426-4435',
      'Pet Poison Helpline: (855) 764-7661',
      '',
      'BLEEDING',
      '- Apply firm pressure with a clean cloth for 5 minutes',
      '- Do not remove embedded objects, stabilize and transport',
      '',
      'CHOKING',
      '- Open the mouth and look, remove visible objects only',
      '- If the airway stays blocked, come in immediately',
      '',
      'POISONING',
      '- Do NOT induce vomiting unless a vet instructs you to',
      '- Bring the packaging or a photo of what was eaten',
      '',
      'HEAT STROKE',
      '- Move to shade, wet with cool (not ice-cold) water',
      '- Offer small sips of water and head to the clinic',
    ],
  },
  {
    title: 'Nutrition Guide by Life Stage',
    content: [
      'PUPPIES AND KITTENS (0-12 MONTHS)',
      '- Growth formula food, 3-4 small meals daily',
      '- Large-breed puppies need controlled-calcium formulas',
      '',
      'ADULTS (1-7 YEARS)',
      '- Feed measured portions 1-2 times daily',
      '- Treats should stay under 10 percent of daily calories',
      '- Choose AAFCO-approved complete diets',
      '',
      'SENIORS (7+ YEARS)',
      '- Lower calorie, higher fiber senior formulas',
      '- Joint-support nutrients such as glucosamine',
      '- Wet food can help hydration, especially for cats',
      '',
      'NEVER FEED',
      'Chocolate, grapes, raisins, onions, garlic, xylitol,',
      'macadamia nuts, alcohol, caffeine, raw dough, cooked bones',
    ],
  },
];

function buildGuideFile(guide: { title: string; content: string[] }): string {
  return [
    'PAWS & CARE ANIMAL HOSPITAL',
    'Pet Parent Resource Library',
    '='.repeat(50),
    guide.title.toUpperCase(),
    '='.repeat(50),
    '',
    ...guide.content,
    '',
    '-'.repeat(50),
    'Questions? Call us at (555) 123-4567 anytime.',
  ].join('\n');
}

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
  const [downloadedGuide, setDownloadedGuide] = React.useState<string | null>(null);

  const handleDownloadGuide = (guide: { title: string; content: string[] }) => {
    const blob = new Blob([buildGuideFile(guide)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${guide.title.replace(/[^a-z0-9]+/gi, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedGuide(guide.title);
    window.setTimeout(() => {
      setDownloadedGuide((current) => (current === guide.title ? null : current));
    }, 3000);
  };

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
          'Don\'t overfeed. Obesity affects development',
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
                className="bg-white rounded-2xl shadow-lg transition-all overflow-hidden"
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
              Different breeds have unique needs. Here's what to know
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
                  Free Guides to Download
                </h3>
                <div className="space-y-3">
                  {readingGuides.map((guide) => (
                    <button
                      key={guide.title}
                      onClick={() => handleDownloadGuide(guide)}
                      className="w-full flex items-center justify-between gap-3 p-3 rounded-xl border-2 text-left hover:shadow-md transition-all"
                      style={{ borderColor: colors.accent + '40', backgroundColor: colors.accent + '10' }}
                    >
                      <span className="font-medium text-gray-800">{guide.title}</span>
                      {downloadedGuide === guide.title ? (
                        <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600 flex-shrink-0">
                          <CheckCircle className="w-4 h-4" />
                          Saved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm font-semibold flex-shrink-0" style={{ color: colors.primary }}>
                          <Download className="w-4 h-4" />
                          Download
                        </span>
                      )}
                    </button>
                  ))}
                </div>
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
