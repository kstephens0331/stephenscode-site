import React from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Clock, CreditCard, Syringe, Calendar, Phone, Heart } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function FAQPage({ onNavigate, colors }: FAQPageProps) {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(0);

  const faqCategories = [
    {
      category: 'General Questions',
      icon: HelpCircle,
      faqs: [
        {
          question: 'What are your office hours?',
          answer: 'We\'re open Monday-Friday 8am-7pm, Saturday 9am-5pm, and Sunday 10am-4pm. Emergency services are available 24/7, including holidays. Simply call our main number (555) 123-4567 anytime, day or night.'
        },
        {
          question: 'Do I need an appointment?',
          answer: 'Yes, we recommend scheduling appointments for wellness exams and routine care. This ensures minimal wait time and allows us to dedicate proper time to your pet. For emergencies, call ahead if possible, but come in immediately - we always make room for urgent cases.'
        },
        {
          question: 'What should I bring to my first visit?',
          answer: 'Please bring any previous medical records, vaccination history, current medications, and a list of questions or concerns. For puppies and kittens, bring a fresh stool sample if possible. Also bring your payment method and pet insurance information if applicable.'
        },
        {
          question: 'Do you see exotic pets?',
          answer: 'Yes! Dr. Rodriguez specializes in exotic pet medicine. We see birds, rabbits, guinea pigs, hamsters, reptiles, and other small mammals. Call ahead to ensure the appropriate specialist is available for your appointment.'
        },
        {
          question: 'Can I stay with my pet during procedures?',
          answer: 'You can stay with your pet during examinations and consultations. For procedures requiring sedation, surgery, or diagnostic imaging, pets are taken to our treatment area. We\'ll keep you updated throughout the process and reunite you as soon as it\'s safe.'
        }
      ]
    },
    {
      category: 'Appointments & Scheduling',
      icon: Calendar,
      faqs: [
        {
          question: 'How do I schedule an appointment?',
          answer: 'You can schedule by calling us at (555) 123-4567, using our online booking system on our website, or by stopping by the clinic in person. We offer same-day appointments for urgent (non-emergency) concerns when available.'
        },
        {
          question: 'What if I need to cancel or reschedule?',
          answer: 'We understand plans change! Please give us at least 24 hours notice if you need to cancel or reschedule. This allows us to offer the time to another pet in need. You can cancel by phone or through our online booking system.'
        },
        {
          question: 'How long will my appointment take?',
          answer: 'Routine wellness exams typically take 30-45 minutes. First-time visits may take 60-90 minutes. Sick visits vary depending on the issue. We allocate appropriate time for each appointment type to ensure thorough care without rushing.'
        },
        {
          question: 'Do you offer drop-off appointments?',
          answer: 'Yes! Drop-off appointments are perfect for working pet parents. Drop your pet off in the morning, and we\'ll examine them when the doctor has time between scheduled appointments. We\'ll call you with findings and recommendations, and you can pick up at your convenience.'
        },
        {
          question: 'Can I request a specific veterinarian?',
          answer: 'Absolutely! When scheduling, let us know if you have a preference. We\'ll do our best to accommodate your request. All our veterinarians have access to your pet\'s complete medical records, so your pet receives consistent, informed care regardless of which doctor you see.'
        }
      ]
    },
    {
      category: 'Costs & Payment',
      icon: CreditCard,
      faqs: [
        {
          question: 'How much does a wellness exam cost?',
          answer: 'Wellness exams start at $65 for cats and small dogs, $75 for large dogs. This includes a comprehensive physical examination. Additional costs may apply for vaccinations, lab work, or treatments recommended during the visit. We provide estimates before proceeding with any additional services.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept cash, checks, all major credit cards (Visa, MasterCard, Discover, American Express), CareCredit, and Scratchpay payment plans. Payment is due at the time of service. We also work with all pet insurance companies.'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Yes! We partner with CareCredit and Scratchpay to offer flexible payment plans for qualifying clients. Both offer interest-free periods for approved applicants. You can apply online or at our clinic, and approval typically takes just minutes.'
        },
        {
          question: 'How does pet insurance work?',
          answer: 'We accept all pet insurance providers. You pay for services at the time of visit, and we provide a detailed invoice for you to submit to your insurance company for reimbursement. We can also help with direct claim submission for many insurers. We recommend getting insurance early - before health issues develop.'
        },
        {
          question: 'Do you provide cost estimates?',
          answer: 'Yes! We always provide cost estimates before procedures. For surgeries and extensive treatments, we give written estimates with price ranges. For routine care, we discuss costs during your appointment. We never want cost to be a surprise - we\'ll work with you to find the best care within your budget.'
        }
      ]
    },
    {
      category: 'Medical Care',
      icon: Syringe,
      faqs: [
        {
          question: 'What vaccinations does my pet need?',
          answer: 'Core vaccines for dogs include rabies, distemper, and parvovirus. For cats: rabies, feline distemper (FVRCP). Additional "lifestyle" vaccines may be recommended based on your pet\'s exposure risk, such as Bordetella (kennel cough), Lyme disease, or feline leukemia. We create personalized vaccination schedules for each pet.'
        },
        {
          question: 'How often should my pet have a checkup?',
          answer: 'Annual wellness exams for adult pets (1-7 years). Senior pets (7+ years) should have exams twice yearly. Puppies and kittens need more frequent visits - typically at 6, 9, 12, and 16 weeks, then at 6 months for spay/neuter. Pets with chronic conditions may need more frequent monitoring.'
        },
        {
          question: 'At what age should I spay/neuter my pet?',
          answer: 'We typically recommend spaying/neutering at 6 months of age for most pets. Large breed dogs may benefit from waiting until 12-18 months for optimal bone development. We\'ll discuss the best timing for your specific pet during wellness visits, considering breed, size, and health factors.'
        },
        {
          question: 'Do you offer dental cleanings?',
          answer: 'Yes! We provide comprehensive dental care including cleanings, digital dental X-rays, extractions, and periodontal treatment. Dental cleanings are performed under general anesthesia to ensure thorough cleaning below the gum line and patient comfort. Most pets need dental cleanings annually.'
        },
        {
          question: 'What if my pet needs surgery?',
          answer: 'Our experienced surgical team performs a wide range of procedures from routine spay/neuter to complex soft tissue and orthopedic surgeries. All surgical patients receive pre-anesthetic bloodwork, IV fluids, pain management, and careful monitoring. We\'ll explain the entire process and provide detailed post-operative care instructions.'
        },
        {
          question: 'Can you prescribe medications for my pet?',
          answer: 'Yes, our on-site pharmacy stocks most commonly prescribed medications. For medications we don\'t stock, we can send prescriptions to outside pharmacies or order them for next-day pickup. We also offer auto-ship programs for chronic medications and monthly preventives like heartworm and flea/tick prevention.'
        }
      ]
    },
    {
      category: 'Emergency Care',
      icon: Heart,
      faqs: [
        {
          question: 'What constitutes a pet emergency?',
          answer: 'Emergencies include difficulty breathing, collapse, seizures, severe bleeding, poisoning, trauma, bloat, inability to urinate, eye injuries, heat stroke, or any situation where your pet\'s life may be in danger. If you\'re unsure, call us - we\'re happy to help you assess the urgency.'
        },
        {
          question: 'Are you open for emergencies 24/7?',
          answer: 'Yes! We provide 24/7 emergency care, 365 days a year including all holidays. Call our main number (555) 123-4567 anytime. After hours, an on-call veterinarian will answer and either provide guidance or meet you at the clinic immediately.'
        },
        {
          question: 'Should I call before bringing in an emergency?',
          answer: 'If possible, yes - call ahead so we can prepare for your arrival. However, if seconds count (severe trauma, not breathing, etc.), come directly to the clinic and call en route if you have a passenger who can make the call. Ring the emergency bell if you arrive after hours.'
        },
        {
          question: 'How much do emergency visits cost?',
          answer: 'Emergency visits include an emergency exam fee ($150-$250 depending on time of day) plus the cost of any diagnostics and treatments needed. We provide estimates before proceeding when possible. In life-threatening situations, we stabilize first and discuss costs once your pet is stable.'
        },
        {
          question: 'What if I can\'t afford emergency care?',
          answer: 'We offer CareCredit and Scratchpay financing with instant approval. We also work with you on payment plans for qualified clients. Your pet\'s health comes first - we\'ll stabilize and treat, then work out payment arrangements. We never turn away critical emergencies due to inability to pay upfront.'
        }
      ]
    },
    {
      category: 'Boarding & Services',
      icon: Clock,
      faqs: [
        {
          question: 'Do you offer boarding services?',
          answer: 'Yes! We provide climate-controlled boarding with veterinary supervision. Boarding includes individual suites, daily playtime, feeding, and medication administration if needed. We\'re especially great for pets with medical needs. Reservations are recommended, especially during holidays.'
        },
        {
          question: 'What vaccinations are required for boarding?',
          answer: 'Dogs must be current on rabies, distemper/parvo, and Bordetella (kennel cough). Cats need rabies and FVRCP (feline distemper). All pets must be on flea/tick prevention. We can update vaccines at drop-off if needed (additional charge applies).'
        },
        {
          question: 'Do you offer grooming services?',
          answer: 'Yes! Our professional groomer provides baths, haircuts, nail trims, ear cleaning, and sanitary trims. Grooming is especially convenient when combined with a vet visit. We also offer medical baths for skin conditions. Book grooming appointments in advance as our groomer\'s schedule fills quickly.'
        },
        {
          question: 'Can you administer medications during boarding?',
          answer: 'Absolutely! One advantage of boarding with a veterinary clinic is our ability to manage complex medication schedules, injections, and special medical needs. There\'s a small daily fee for medication administration. Just provide medications in original containers with clear instructions.'
        },
        {
          question: 'What happens if my pet gets sick while boarding?',
          answer: 'We monitor all boarding pets closely. If we notice any concerns, we\'ll contact you immediately. As a full-service veterinary hospital, we can provide immediate medical care if needed. We\'ll always get your approval before providing treatment except in life-threatening emergencies.'
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  let faqIndex = 0;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section style={{ backgroundColor: colors.primary }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our services, policies, and pet care
          </p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-gray-600 mb-2">Can't find your answer?</p>
              <p className="font-semibold" style={{ color: colors.primary }}>Call us at (555) 123-4567</p>
            </div>
            <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
            <div>
              <p className="text-gray-600 mb-2">Or</p>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all"
                style={{ backgroundColor: colors.secondary }}
              >
                Contact Us Online
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <div key={catIndex} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: colors.accent + '30' }}>
                    <Icon className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <h2 className="text-3xl font-bold" style={{ color: colors.primary }}>
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.faqs.map((faq) => {
                    const currentIndex = faqIndex++;
                    const isOpen = openFAQ === currentIndex;

                    return (
                      <div
                        key={currentIndex}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(currentIndex)}
                          className="w-full p-6 flex items-center justify-between text-left hover:bg-teal-50 transition-colors"
                        >
                          <span className="text-lg font-semibold pr-4" style={{ color: colors.primary }}>
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-6 h-6 flex-shrink-0" style={{ color: colors.secondary }} />
                          ) : (
                            <ChevronDown className="w-6 h-6 flex-shrink-0" style={{ color: colors.secondary }} />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6">
                            <div className="pt-4 border-t border-teal-100">
                              <p className="text-gray-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-teal-50 to-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <Phone className="w-16 h-16 mx-auto mb-6" style={{ color: colors.primary }} />
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're here to help! Our friendly team is happy to answer any questions about your pet's care.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white rounded-xl shadow-md">
                <Phone className="w-8 h-8 mx-auto mb-3" style={{ color: colors.secondary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.primary }}>Call Us</h3>
                <p className="text-gray-600 text-sm mb-2">Mon-Fri: 8am-7pm</p>
                <a href="tel:555-123-4567" className="font-bold hover:underline" style={{ color: colors.secondary }}>
                  (555) 123-4567
                </a>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-md">
                <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: colors.secondary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.primary }}>Schedule Visit</h3>
                <p className="text-gray-600 text-sm mb-3">Book an appointment</p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: colors.secondary }}
                >
                  Book Online →
                </button>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-md">
                <HelpCircle className="w-8 h-8 mx-auto mb-3" style={{ color: colors.secondary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.primary }}>Pet Care Tips</h3>
                <p className="text-gray-600 text-sm mb-3">Expert advice & resources</p>
                <button
                  onClick={() => onNavigate('pet-care')}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: colors.secondary }}
                >
                  View Tips →
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl" style={{ backgroundColor: colors.accent + '20' }}>
              <p className="text-gray-700">
                <strong>For emergencies:</strong> Call our 24/7 emergency hotline at (555) 123-4567. We're always here when you need us most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Exceptional Pet Care?
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Join the Paws & Care family and give your pet the quality care they deserve.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('new-patients')}
              className="px-8 py-4 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              New Patient Info
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
