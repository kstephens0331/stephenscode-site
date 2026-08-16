import React from 'react';
import { FileText, Download, Book, Video, HelpCircle, Phone, AlertTriangle, CheckCircle2, X, Play, Pause } from 'lucide-react';

interface ClientResourcesPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

interface GuideSection {
  heading: string;
  points: string[];
}

interface Guide {
  title: string;
  category: string;
  icon: typeof FileText;
  description: string;
  intro: string;
  sections: GuideSection[];
}

interface VideoResource {
  title: string;
  duration: string;
  category: string;
  summary: string;
  points: string[];
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function parseDuration(duration: string): number {
  const [m, s] = duration.split(':').map(Number);
  return (m || 0) * 60 + (s || 0);
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

const GUIDES: Guide[] = [
  {
    title: 'What to Do After a Car Accident',
    category: 'Personal Injury',
    icon: FileText,
    description: 'Step-by-step guide on protecting your rights and documenting your accident.',
    intro: 'The minutes and days after a car accident matter. What you document and say can significantly affect any later claim. This guide walks through the key steps.',
    sections: [
      {
        heading: 'At the Scene',
        points: [
          'Check for injuries and call 911 if anyone needs medical attention.',
          'Move to a safe location if possible, but do not leave the scene.',
          'Call the police and request an official accident report.',
          'Exchange names, insurance, and license plate information with the other driver.',
          'Photograph vehicle damage, skid marks, road conditions, and visible injuries.',
        ],
      },
      {
        heading: 'In the Following Days',
        points: [
          'See a doctor even if injuries seem minor. Some symptoms appear later.',
          'Notify your insurance company, but stick to the basic facts.',
          'Keep a folder with the police report, medical bills, and repair estimates.',
          'Avoid posting about the accident on social media.',
        ],
      },
      {
        heading: 'What Not to Do',
        points: [
          'Do not admit fault at the scene, even out of politeness.',
          'Do not accept a quick settlement before knowing the full extent of injuries.',
          'Do not give a recorded statement to the other insurer without counsel.',
        ],
      },
    ],
  },
  {
    title: 'Understanding Your Rights When Arrested',
    category: 'Criminal Defense',
    icon: Book,
    description: 'Know your constitutional rights and what to say (or not say) to police.',
    intro: 'Every person has constitutional protections during an arrest. Knowing them ahead of time helps you stay calm and avoid mistakes that hurt your defense.',
    sections: [
      {
        heading: 'Your Core Rights',
        points: [
          'You have the right to remain silent. Say clearly that you are invoking it.',
          'You have the right to an attorney before answering any questions.',
          'You do not have to consent to a search of your person, car, or home.',
          'You have the right to know why you are being arrested.',
        ],
      },
      {
        heading: 'How to Conduct Yourself',
        points: [
          'Stay calm and keep your hands visible. Do not resist, even if the arrest feels unfair.',
          'Provide your name and identification when required by law.',
          'Say "I want a lawyer" and then stop talking. Repeat if questioning continues.',
          'Remember details: officer names, badge numbers, and witnesses.',
        ],
      },
      {
        heading: 'After the Arrest',
        points: [
          'Contact an attorney as soon as you can make a call.',
          'Do not discuss your case on jail phones. Calls are typically recorded.',
          'Write down everything you remember while it is fresh.',
        ],
      },
    ],
  },
  {
    title: 'Divorce Process: A Complete Guide',
    category: 'Family Law',
    icon: FileText,
    description: 'Navigate the divorce process with confidence and understand your options.',
    intro: 'Divorce involves legal, financial, and emotional decisions. Understanding the typical stages helps you plan and reduces uncertainty.',
    sections: [
      {
        heading: 'Stages of a Divorce',
        points: [
          'Filing: one spouse files a petition and the other is formally served.',
          'Temporary orders: courts can set interim custody, support, and living arrangements.',
          'Discovery: both sides exchange financial documents and information.',
          'Settlement or trial: most cases settle; unresolved issues go before a judge.',
        ],
      },
      {
        heading: 'Key Issues to Resolve',
        points: [
          'Division of marital property and debts.',
          'Child custody and parenting time schedules.',
          'Child support obligations under state guidelines.',
          'Spousal support amount and duration, where applicable.',
        ],
      },
      {
        heading: 'Practical Preparation',
        points: [
          'Gather tax returns, pay stubs, account statements, and property records.',
          'Open individual accounts and monitor your credit.',
          'Keep communications with your spouse civil and in writing where possible.',
        ],
      },
    ],
  },
  {
    title: 'Estate Planning Essentials',
    category: 'Estate Planning',
    icon: Book,
    description: 'Learn why estate planning is crucial and what documents you need.',
    intro: 'A complete estate plan protects your family and ensures your wishes are honored. These are the core documents most adults should have.',
    sections: [
      {
        heading: 'Core Documents',
        points: [
          'Will: directs how your assets are distributed and names guardians for minor children.',
          'Revocable living trust: can help assets pass outside of probate.',
          'Durable power of attorney: lets someone manage finances if you are incapacitated.',
          'Healthcare directive: records your medical wishes and names a healthcare agent.',
        ],
      },
      {
        heading: 'Common Mistakes',
        points: [
          'Outdated beneficiary designations that contradict your will.',
          'Failing to fund a trust after creating it.',
          'Not updating documents after marriage, divorce, or a new child.',
          'Assuming a will avoids probate. It does not.',
        ],
      },
      {
        heading: 'When to Review Your Plan',
        points: [
          'After any major life event: marriage, divorce, birth, death, or relocation.',
          'When your assets change significantly.',
          'At least every three to five years, even without major changes.',
        ],
      },
    ],
  },
  {
    title: 'Starting a Business: Legal Checklist',
    category: 'Business Law',
    icon: FileText,
    description: 'Essential legal steps for starting and protecting your business.',
    intro: 'Getting the legal foundation right at formation prevents expensive problems later. Use this checklist as a starting point for your new venture.',
    sections: [
      {
        heading: 'Formation Basics',
        points: [
          'Choose an entity type: LLC, S-Corp, C-Corp, or partnership each have tradeoffs.',
          'Register with the state and appoint a registered agent.',
          'Obtain an EIN from the IRS and open a dedicated business bank account.',
          'Check local licensing and permit requirements.',
        ],
      },
      {
        heading: 'Protect the Business',
        points: [
          'Put an operating agreement or bylaws in writing, even among friends.',
          'Use written contracts with clients, vendors, and contractors.',
          'Protect your name and logo with trademark registration where appropriate.',
          'Carry appropriate liability insurance.',
        ],
      },
      {
        heading: 'Ongoing Compliance',
        points: [
          'Keep business and personal finances strictly separate.',
          'File annual reports and maintain good standing with the state.',
          'Document major decisions with meeting minutes or written consents.',
        ],
      },
    ],
  },
  {
    title: 'Immigration Application Guide',
    category: 'Immigration',
    icon: Book,
    description: 'Understanding the immigration process and common visa types.',
    intro: 'Immigration processes involve strict deadlines and documentation requirements. This overview covers the most common paths and how to prepare.',
    sections: [
      {
        heading: 'Common Paths',
        points: [
          'Family-based petitions through a qualifying relative.',
          'Employment-based visas sponsored by an employer.',
          'Naturalization for lawful permanent residents who meet residency requirements.',
          'Humanitarian relief, including asylum for those who qualify.',
        ],
      },
      {
        heading: 'Preparing Your Application',
        points: [
          'Gather identity documents, civil records, and translations where needed.',
          'Keep copies of everything you submit and note all filing dates.',
          'Answer every question truthfully. Misrepresentation has serious consequences.',
          'Track your case status and respond to government notices promptly.',
        ],
      },
      {
        heading: 'When to Get Help',
        points: [
          'Prior visa denials, overstays, or any criminal history.',
          'Approaching deadlines you may not be able to meet.',
          'Notices of intent to deny or requests for additional evidence.',
        ],
      },
    ],
  },
];

const VIDEOS: VideoResource[] = [
  {
    title: 'Know Your Rights: Police Encounters',
    duration: '8:45',
    category: 'Criminal Defense',
    summary: 'Attorney Sarah Mitchell explains what to do and say during traffic stops, street encounters, and arrests.',
    points: [
      'The exact words to use when invoking your right to remain silent',
      'When police need a warrant and when they do not',
      'How to handle a request to search your vehicle',
      'What to do in the first hour after an arrest',
    ],
  },
  {
    title: 'Personal Injury Claims Explained',
    duration: '12:30',
    category: 'Personal Injury',
    summary: 'Attorney Robert Justice walks through the life of a personal injury claim from intake to settlement.',
    points: [
      'How claim value is actually calculated',
      'Why early settlement offers are usually low',
      'What the insurance adjuster is looking for',
      'How contingency fees work: no recovery, no fee',
    ],
  },
  {
    title: 'Estate Planning 101',
    duration: '15:20',
    category: 'Estate Planning',
    summary: 'Attorney Emily Rodriguez covers the essential documents every family should have in place.',
    points: [
      'Wills versus trusts and when each makes sense',
      'What happens if you die without a plan',
      'Choosing guardians, executors, and trustees',
      'Keeping beneficiary designations up to date',
    ],
  },
  {
    title: 'Workplace Rights and Discrimination',
    duration: '10:15',
    category: 'Employment Law',
    summary: 'Attorney Jennifer Park explains how to recognize illegal treatment at work and what to do about it.',
    points: [
      'Protected classes and what counts as discrimination',
      'How to document workplace incidents properly',
      'Retaliation: what your employer cannot do',
      'Deadlines for filing an EEOC charge',
    ],
  },
];

const FORM_FIELDS: Record<string, string[]> = {
  'New Client Intake Form': ['Full legal name', 'Date of birth', 'Home address', 'Phone number', 'Email address', 'Type of legal matter', 'Opposing party (if any)', 'Brief description of your legal matter', 'How did you hear about us?'],
  'Authorization to Release Medical Records': ['Patient name', 'Date of birth', 'Provider / facility name', 'Records requested (dates of service)', 'Purpose of release', 'Patient signature', 'Date'],
  'Contingency Fee Agreement': ['Client name', 'Description of the matter', 'Contingency fee percentage', 'Responsibility for costs and expenses', 'Client signature', 'Attorney signature', 'Date'],
  'Client Questionnaire (Personal Injury)': ['Date and location of incident', 'Description of what happened', 'Injuries sustained', 'Medical providers seen to date', 'Your insurance information', 'Witness names and contact information', 'Lost wages to date'],
  'Document Checklist (Family Law)': ['Marriage certificate', 'Any prior court orders', 'Last three years of tax returns', 'Recent pay stubs', 'Bank and retirement account statements', 'Property deeds and vehicle titles', 'List of shared debts'],
  'Business Formation Questionnaire': ['Proposed business name', 'Entity type (LLC, S-Corp, C-Corp)', 'State of formation', 'Owners and ownership percentages', 'Registered agent name and address', 'Initial capital contributions', 'Management structure'],
};

export default function ClientResourcesPage({ onNavigate, accentColor = '#c9a227' }: ClientResourcesPageProps) {
  const [activeGuide, setActiveGuide] = React.useState<number | null>(null);
  const [activeVideo, setActiveVideo] = React.useState<number | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [downloadedGuides, setDownloadedGuides] = React.useState<Record<number, boolean>>({});
  const [downloadedForms, setDownloadedForms] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  React.useEffect(() => {
    if (progress >= 100) setPlaying(false);
  }, [progress]);

  const closeVideo = () => {
    setActiveVideo(null);
    setPlaying(false);
    setProgress(0);
  };

  const downloadGuide = (index: number) => {
    const guide = GUIDES[index];
    const lines: string[] = [
      'JUSTICE & ASSOCIATES LAW',
      guide.title,
      `Category: ${guide.category}`,
      '',
      guide.intro,
      '',
    ];
    guide.sections.forEach((section) => {
      lines.push(section.heading.toUpperCase());
      section.points.forEach((point) => lines.push(`  - ${point}`));
      lines.push('');
    });
    lines.push('This guide is general information, not legal advice. For advice about your specific situation, schedule a free consultation: (555) 123-4567.');
    downloadTextFile(`${slugify(guide.title)}.txt`, lines.join('\n'));
    setDownloadedGuides((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setDownloadedGuides((prev) => ({ ...prev, [index]: false }));
    }, 2500);
  };

  const downloadForm = (formName: string) => {
    const fields = FORM_FIELDS[formName] || [];
    const lines: string[] = [
      'JUSTICE & ASSOCIATES LAW',
      formName,
      'Please complete this form and bring it to your consultation.',
      '',
      ...fields.map((f) => `${f}:\n  _______________________________________________\n`),
      'All information provided is confidential.',
    ];
    downloadTextFile(`${slugify(formName)}.txt`, lines.join('\n'));
    setDownloadedForms((prev) => ({ ...prev, [formName]: true }));
    setTimeout(() => {
      setDownloadedForms((prev) => ({ ...prev, [formName]: false }));
    }, 2500);
  };

  const steps = [
    {
      number: 1,
      title: 'Initial Consultation',
      description: 'Schedule a free consultation to discuss your case with an experienced attorney.',
    },
    {
      number: 2,
      title: 'Case Evaluation',
      description: 'We review all relevant documents and evidence to build your case strategy.',
    },
    {
      number: 3,
      title: 'Agreement & Retainer',
      description: 'Sign the representation agreement and we begin working on your case immediately.',
    },
    {
      number: 4,
      title: 'Investigation & Discovery',
      description: 'We gather evidence, interview witnesses, and build a strong case on your behalf.',
    },
    {
      number: 5,
      title: 'Negotiation or Trial',
      description: 'We pursue the best outcome through settlement negotiations or courtroom litigation.',
    },
    {
      number: 6,
      title: 'Resolution',
      description: 'Achieve a successful resolution and receive your compensation or favorable verdict.',
    },
  ];

  const currentVideo = activeVideo !== null ? VIDEOS[activeVideo] : null;
  const videoTotalSeconds = currentVideo ? parseDuration(currentVideo.duration) : 0;
  const videoElapsed = Math.round((progress / 100) * videoTotalSeconds);

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
          <h1 className="text-5xl font-bold mb-6">Client Resources</h1>
          <p className="text-xl text-gray-300">
            Access helpful guides, forms, and information to help you understand your legal rights
            and navigate the legal process with confidence.
          </p>
        </div>
      </section>

      {/* Legal Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Free Legal Guides
            </h2>
            <p className="text-xl text-gray-600">
              Read online or download our comprehensive guides to understand your legal situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDES.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <div
                  key={index}
                  onClick={() => setActiveGuide(index)}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
                  style={{ borderTop: `4px solid ${accentColor}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <Download className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    {guide.category}
                  </div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: '#1a1a2e' }}>
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadGuide(index);
                    }}
                    className="w-full py-2 rounded-lg font-medium text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                    style={{ backgroundColor: accentColor, color: '#16213e' }}
                  >
                    {downloadedGuides[index] ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Downloaded
                      </>
                    ) : (
                      'Download Guide'
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Resources */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Educational Videos
            </h2>
            <p className="text-xl text-gray-600">
              Watch our attorneys explain important legal topics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEOS.map((video, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveVideo(index);
                  setPlaying(false);
                  setProgress(0);
                }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className="h-40 flex items-center justify-center relative"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <Video className="w-16 h-16" style={{ color: accentColor }} />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: '#1a1a2ecc' }}
                  >
                    <Play className="w-12 h-12" style={{ color: accentColor }} />
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    {video.category}
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#1a1a2e' }}>
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-600">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              What to Expect When Working With Us
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the legal process helps reduce stress and uncertainty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg"
                    style={{ backgroundColor: accentColor, color: '#16213e' }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute left-6 top-14 w-0.5 h-full"
                    style={{ backgroundColor: `${accentColor}40` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms & Documents */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Forms & Documents
            </h2>
            <p className="text-xl text-gray-600">
              Download and complete necessary forms before your consultation
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(FORM_FIELDS).map((form) => (
                <button
                  key={form}
                  onClick={() => downloadForm(form)}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-all text-left w-full"
                  style={{ border: `1px solid ${accentColor}40` }}
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
                    <span className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                      {form}
                    </span>
                  </div>
                  {downloadedForms[form] ? (
                    <span className="flex items-center gap-1 text-xs font-bold flex-shrink-0" style={{ color: '#22c55e' }}>
                      <CheckCircle2 className="w-4 h-4" />
                      Downloaded
                    </span>
                  ) : (
                    <Download className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Common Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to frequently asked questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                question: 'How much does it cost?',
                answer: 'Many cases are handled on contingency: you pay nothing unless we win.',
              },
              {
                question: 'How long will my case take?',
                answer: 'Timeline varies by case complexity, typically 6-18 months for settlements.',
              },
              {
                question: 'Do I need to come to your office?',
                answer: 'We offer flexible meetings including office, home visits, and virtual consultations.',
              },
              {
                question: 'What should I bring to consultation?',
                answer: 'Any relevant documents, photos, medical records, and a list of questions.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-lg"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <HelpCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: accentColor }} />
                  <h3 className="font-bold" style={{ color: '#1a1a2e' }}>
                    {faq.question}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('faq')}
              className="px-8 py-3 rounded-lg font-bold transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: '#16213e' }}
            >
              View All FAQs
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section
        className="py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-6">
            <AlertTriangle className="w-12 h-12 flex-shrink-0" style={{ color: accentColor }} />
            <div>
              <h2 className="text-3xl font-bold mb-4">Need Immediate Legal Help?</h2>
              <p className="text-xl mb-6 text-gray-300">
                If you're facing an urgent legal situation, contact us immediately. We're available
                24/7 for emergency consultations.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: '#16213e' }}
                >
                  Contact Us Now
                </button>
                <a
                  href="tel:5551234567"
                  className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all hover:bg-white hover:text-gray-900 flex items-center space-x-2"
                  style={{ borderColor: accentColor, color: '#ffffff' }}
                >
                  <Phone className="w-5 h-5" />
                  <span>(555) 123-4567</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Reader Modal */}
      {activeGuide !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60" onClick={() => setActiveGuide(null)}>
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: accentColor }}>
                  {GUIDES[activeGuide].category}
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>{GUIDES[activeGuide].title}</h3>
              </div>
              <button onClick={() => setActiveGuide(null)} aria-label="Close" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">{GUIDES[activeGuide].intro}</p>
              {GUIDES[activeGuide].sections.map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h4 className="font-bold text-lg mb-3" style={{ color: '#1a1a2e' }}>{section.heading}</h4>
                  <ul className="space-y-2">
                    {section.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: accentColor }} />
                        <span className="text-sm text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="text-xs text-gray-500 mb-6">
                This guide is general information, not legal advice. For advice about your specific
                situation, schedule a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => downloadGuide(activeGuide)}
                  className="flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: '#16213e' }}
                >
                  <Download className="w-4 h-4" />
                  {downloadedGuides[activeGuide] ? 'Downloaded' : 'Download This Guide'}
                </button>
                <button
                  onClick={() => {
                    setActiveGuide(null);
                    onNavigate('contact');
                  }}
                  className="flex-1 py-3 rounded-lg font-bold text-sm border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: `${accentColor}40`, color: '#1a1a2e' }}
                >
                  Get a Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {currentVideo && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60" onClick={closeVideo}>
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: accentColor }}>
                  {currentVideo.category}
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>{currentVideo.title}</h3>
              </div>
              <button onClick={closeVideo} aria-label="Close" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              {/* Simulated player */}
              <div
                className="rounded-lg overflow-hidden mb-4"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="h-56 flex items-center justify-center">
                  <button
                    onClick={() => {
                      if (progress >= 100) setProgress(0);
                      setPlaying((p) => !p);
                    }}
                    aria-label={playing ? 'Pause video' : 'Play video'}
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105"
                    style={{ backgroundColor: accentColor }}
                  >
                    {playing ? (
                      <Pause className="w-8 h-8" style={{ color: '#16213e' }} />
                    ) : (
                      <Play className="w-8 h-8 ml-1" style={{ color: '#16213e' }} />
                    )}
                  </button>
                </div>
                <div className="px-4 pb-4">
                  <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${progress}%`, backgroundColor: accentColor }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-300">
                    <span>{formatTime(videoElapsed)}</span>
                    <span>{currentVideo.duration}</span>
                  </div>
                </div>
              </div>
              {progress >= 100 && (
                <p className="text-sm font-medium mb-4 text-center" style={{ color: '#22c55e' }}>
                  Video complete. Press play to watch again.
                </p>
              )}
              <p className="text-gray-700 mb-4">{currentVideo.summary}</p>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-3" style={{ color: '#1a1a2e' }}>
                In This Video
              </h4>
              <ul className="space-y-2 mb-6">
                {currentVideo.points.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: accentColor }} />
                    <span className="text-sm text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  closeVideo();
                  onNavigate('contact');
                }}
                className="w-full py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: accentColor, color: '#16213e' }}
              >
                Have Questions? Get a Free Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
