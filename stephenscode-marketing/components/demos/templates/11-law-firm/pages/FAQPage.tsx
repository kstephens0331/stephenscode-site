import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function FAQPage({ onNavigate, accentColor = '#c9a227' }: FAQPageProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqCategories = [
    {
      category: 'General Questions',
      faqs: [
        {
          question: 'How much does a consultation cost?',
          answer: 'We offer free initial consultations for most practice areas. During this meeting, we\'ll discuss your case, answer your questions, and explain your legal options. There is no obligation to hire us after the consultation.',
        },
        {
          question: 'How do I know if I need a lawyer?',
          answer: 'If you\'re facing legal issues, have been injured, are being sued, or need legal advice on important matters, it\'s wise to consult with an attorney. Even if you\'re unsure, a free consultation can help you understand your situation and options.',
        },
        {
          question: 'What should I bring to my consultation?',
          answer: 'Bring any relevant documents such as contracts, correspondence, medical records, police reports, photos, or other evidence related to your case. Also bring a list of questions you want to ask and any notes about important dates or events.',
        },
        {
          question: 'How long will my case take?',
          answer: 'The timeline varies significantly based on the type of case and its complexity. Simple matters might resolve in weeks, while complex litigation can take 1-2 years or more. We\'ll provide a realistic timeline estimate during your consultation based on your specific situation.',
        },
      ],
    },
    {
      category: 'Fees & Costs',
      faqs: [
        {
          question: 'What is a contingency fee?',
          answer: 'A contingency fee means you pay no attorney fees unless we win your case. We only collect a percentage of your recovery (typically 33-40%). This arrangement is common for personal injury cases and ensures everyone has access to legal representation.',
        },
        {
          question: 'What if I can\'t afford an attorney?',
          answer: 'Many of our cases are handled on a contingency fee basis, meaning no upfront costs. For other matters, we offer flexible payment plans. We also provide pro bono services for qualifying individuals. Don\'t let cost concerns prevent you from seeking legal help.',
        },
        {
          question: 'Will I have to pay if I lose my case?',
          answer: 'For contingency fee cases, you don\'t pay attorney fees if we don\'t recover compensation. However, some case costs (like filing fees or expert witnesses) may still apply. For hourly fee cases, you pay for the attorney\'s time regardless of outcome. We\'ll explain the fee structure clearly before you hire us.',
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Yes, we offer flexible payment plans for cases that are not handled on a contingency basis. We understand legal issues often come at financially difficult times, and we work with clients to make representation affordable.',
        },
      ],
    },
    {
      category: 'Personal Injury',
      faqs: [
        {
          question: 'What should I do immediately after an accident?',
          answer: 'First, seek medical attention even if injuries seem minor. Call the police to file a report. Document everything with photos and notes. Get contact information from witnesses. Don\'t admit fault or sign anything. Contact an attorney as soon as possible to protect your rights.',
        },
        {
          question: 'How much is my personal injury case worth?',
          answer: 'Case value depends on many factors: injury severity, medical costs, lost wages, pain and suffering, permanent disability, and liability. We\'ll review your case details and provide a realistic valuation during your consultation. Past results don\'t guarantee future outcomes.',
        },
        {
          question: 'How long do I have to file a personal injury claim?',
          answer: 'In most states, the statute of limitations for personal injury cases is 2-3 years from the date of injury. However, this can vary by state and case type. It\'s crucial to consult an attorney quickly as evidence can disappear and witnesses\' memories fade.',
        },
        {
          question: 'What if the accident was partially my fault?',
          answer: 'Many states follow "comparative negligence" rules, meaning you can still recover damages even if partially at fault, though your recovery may be reduced by your percentage of fault. We\'ll evaluate your case and explain how your state\'s laws apply to your situation.',
        },
      ],
    },
    {
      category: 'Criminal Defense',
      faqs: [
        {
          question: 'What should I do if I\'m arrested?',
          answer: 'Remain calm and polite, but invoke your right to remain silent and your right to an attorney immediately. Don\'t answer questions, consent to searches, or make statements without a lawyer present. Contact us as soon as possible - we\'re available 24/7 for emergency situations.',
        },
        {
          question: 'Can charges be dropped or reduced?',
          answer: 'Yes, charges can sometimes be dropped or reduced through negotiation with prosecutors, demonstrating lack of evidence, or identifying procedural violations. Our experienced criminal defense attorneys know how to build strong defenses and negotiate favorable outcomes.',
        },
        {
          question: 'What\'s the difference between a felony and misdemeanor?',
          answer: 'Felonies are more serious crimes typically punishable by more than one year in prison, while misdemeanors carry shorter jail terms (usually less than one year) or fines. Felony convictions have more severe long-term consequences including loss of voting rights and professional licenses.',
        },
        {
          question: 'Will I have to go to trial?',
          answer: 'Most criminal cases are resolved through plea bargaining without going to trial. However, if a fair plea agreement isn\'t offered, we\'re fully prepared to take your case to trial. We\'ll explain all options and help you make informed decisions about your defense strategy.',
        },
      ],
    },
    {
      category: 'Family Law',
      faqs: [
        {
          question: 'How long does a divorce take?',
          answer: 'Uncontested divorces can be finalized in a few months, while contested divorces involving disputes over property, custody, or support can take 1-2 years. Many states also have mandatory waiting periods. We work efficiently to resolve cases as quickly as possible while protecting your interests.',
        },
        {
          question: 'How is child custody determined?',
          answer: 'Courts decide custody based on the "best interests of the child" standard, considering factors like each parent\'s relationship with the child, stability of home environment, ability to provide care, child\'s preferences (if age-appropriate), and more. We help present strong evidence supporting your custody position.',
        },
        {
          question: 'Do I need a prenuptial agreement?',
          answer: 'Prenuptial agreements can be valuable for protecting assets, clarifying financial expectations, and avoiding disputes if the marriage ends. They\'re especially recommended if you have significant assets, own a business, have children from previous relationships, or have substantial debt.',
        },
        {
          question: 'Can child support or alimony be modified?',
          answer: 'Yes, support orders can be modified if there\'s a substantial change in circumstances such as job loss, significant income changes, remarriage, or changes in child custody arrangements. We can help you petition for modification or defend against requested changes.',
        },
      ],
    },
    {
      category: 'Working With Us',
      faqs: [
        {
          question: 'How do I communicate with my attorney?',
          answer: 'We offer multiple communication channels including phone, email, video calls, and our secure client portal. We respond to client inquiries promptly and keep you informed about case developments. You\'ll have direct access to your attorney and our support team.',
        },
        {
          question: 'Do I have to come to your office?',
          answer: 'We offer flexible meeting options including in-office consultations, home or hospital visits, and virtual video meetings. Choose whatever is most convenient for your situation. For clients with mobility issues or those living far away, we make every accommodation possible.',
        },
        {
          question: 'What if I need help after business hours?',
          answer: 'We understand legal emergencies don\'t follow a 9-5 schedule. We offer 24/7 availability for urgent matters, especially criminal arrests and serious injuries. Call our main number anytime and follow the prompts to reach our emergency line.',
        },
        {
          question: 'How involved will I be in my case?',
          answer: 'You\'ll be informed and involved at every stage. We make all major decisions together, though we handle the day-to-day legal work. You\'ll receive regular updates, and we encourage your input throughout the process. This is your case - we\'re here to guide and advocate for you.',
        },
      ],
    },
  ];

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    const uniqueIndex = categoryIndex * 1000 + faqIndex;
    setOpenIndex(openIndex === uniqueIndex ? null : uniqueIndex);
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300">
            Find answers to common questions about our legal services, fees, and processes.
            Don't see your question? Contact us for personalized answers.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 'Free', label: 'Consultations' },
              { value: '24/7', label: 'Availability' },
              { value: 'No Fee', label: 'Unless We Win' },
              { value: '35+ Years', label: 'Experience' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <HelpCircle className="w-8 h-8" style={{ color: accentColor }} />
                <h2 className="text-3xl font-bold" style={{ color: '#1a1a2e' }}>
                  {category.category}
                </h2>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const uniqueIndex = categoryIndex * 1000 + faqIndex;
                  const isOpen = openIndex === uniqueIndex;

                  return (
                    <div
                      key={faqIndex}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
                      >
                        <span className="font-bold text-lg pr-4" style={{ color: '#1a1a2e' }}>
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 flex-shrink-0" style={{ color: accentColor }} />
                        ) : (
                          <ChevronDown className="w-6 h-6 flex-shrink-0" style={{ color: accentColor }} />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div
                            className="h-px mb-4"
                            style={{ backgroundColor: `${accentColor}40` }}
                          />
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Every case is unique. Get personalized answers by speaking directly with one of our
            experienced attorneys. We're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: '#16213e' }}
            >
              Schedule Free Consultation
            </button>
            <button
              onClick={() => onNavigate('client-resources')}
              className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all"
              style={{ borderColor: accentColor, color: '#1a1a2e' }}
            >
              View Resources
            </button>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-12 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-sm mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
              Legal Disclaimer
            </h3>
            <p className="text-sm text-gray-600">
              The information provided in these FAQs is general in nature and not intended as legal
              advice for any specific situation. Laws vary by state and case circumstances differ.
              For advice about your specific legal situation, please schedule a consultation with
              one of our attorneys. Past results do not guarantee future outcomes. Attorney advertising.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
