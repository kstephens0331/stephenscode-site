import React from 'react';
import { Calendar, User, ArrowRight, TrendingUp, Scale, X, CheckCircle2 } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  content: string[];
}

const FEATURED_POST: BlogPost = {
  title: 'Major Changes to Personal Injury Laws in 2024',
  excerpt: 'New legislation affects statute of limitations and damage caps. Here\'s what you need to know to protect your rights when filing a personal injury claim.',
  category: 'Personal Injury',
  date: 'November 10, 2024',
  author: 'Robert Justice',
  readTime: '8 min read',
  content: [
    'State legislatures across the country have been active this year, and several changes directly affect anyone considering a personal injury claim. The two areas seeing the most movement are filing deadlines and limits on certain categories of damages.',
    'Statutes of limitations set the window in which you can file a lawsuit. In several jurisdictions, those windows have been adjusted, and in some cases shortened for specific claim types such as medical malpractice. Missing the deadline almost always means losing the right to recover, no matter how strong the underlying case is. If you have been injured, the safest course is to speak with an attorney early rather than assuming you have years to decide.',
    'Damage caps are the second major area of change. Some states have revisited limits on non-economic damages, the category that covers pain and suffering rather than measurable costs like medical bills. Where caps change, the realistic value of a claim changes with them, which affects settlement negotiations from day one.',
    'Insurers track these changes closely and adjust their early settlement offers accordingly. An offer that arrives quickly after an accident is usually calculated against the insurer\'s view of your maximum recovery, not your actual losses. Understanding the current legal landscape is essential before accepting anything.',
    'Every case is different, and how these changes apply depends on where and when your injury occurred. Our personal injury team offers free consultations and can tell you exactly which rules govern your claim and what deadlines apply.',
  ],
};

const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Understanding Your Rights During a Police Stop',
    excerpt: 'What you should and shouldn\'t say when pulled over or questioned by law enforcement.',
    category: 'Criminal Defense',
    date: 'November 8, 2024',
    author: 'Sarah Mitchell',
    readTime: '6 min read',
    content: [
      'A police stop is stressful, and most mistakes people make come from not knowing what the law actually requires of them. You must generally provide identification when driving and comply with lawful orders, but you are not required to answer investigative questions.',
      'The most important sentence you can learn is simple: "I am exercising my right to remain silent, and I would like a lawyer." Say it clearly and then stop talking. Continuing to explain, justify, or fill silence is where people talk themselves into charges.',
      'You also do not have to consent to a search of your vehicle. Officers may search anyway under certain legal exceptions, but withholding consent preserves your attorney\'s ability to challenge the search later. Never physically resist; assert your rights verbally and let your lawyer fight the legality in court.',
      'If you are detained or arrested, call an attorney as early as possible. The first hours of a case often determine what evidence exists and how the charges are framed.',
    ],
  },
  {
    title: 'Child Custody: Factors Courts Consider',
    excerpt: 'Learn about the key factors judges evaluate when making custody determinations.',
    category: 'Family Law',
    date: 'November 5, 2024',
    author: 'Emily Rodriguez',
    readTime: '7 min read',
    content: [
      'Custody decisions are governed by one standard: the best interests of the child. That phrase sounds vague, but courts apply it through a fairly consistent set of factors.',
      'Judges look at each parent\'s existing relationship with the child, the stability of each home, work schedules and availability, and each parent\'s willingness to support the child\'s relationship with the other parent. That last factor surprises many people: undermining the other parent often backfires in court.',
      'Depending on age and maturity, a child\'s own preference may carry weight. Courts also consider any history of domestic violence or substance abuse, school and community ties, and the practical logistics of proposed parenting schedules.',
      'The strongest custody cases are built on documentation: school records, medical involvement, consistent communication, and a realistic parenting plan. An experienced family law attorney helps you present that record clearly and avoid the emotional missteps that damage credibility.',
    ],
  },
  {
    title: 'Why Every Business Needs a Solid Operating Agreement',
    excerpt: 'Protecting your business with proper legal documentation from day one.',
    category: 'Business Law',
    date: 'November 3, 2024',
    author: 'Michael Chen',
    readTime: '5 min read',
    content: [
      'Many businesses are formed between friends or family with nothing but a handshake and good intentions. That works until the first serious disagreement, and by then it is too late to negotiate calmly.',
      'An operating agreement answers the questions that eventually arise in every company: who owns what percentage, how profits are distributed, who has authority to make decisions, and what happens when an owner wants out, becomes disabled, or passes away.',
      'Without a written agreement, state default rules fill the gaps, and those defaults rarely match what the owners would have chosen. Disputes that could have been resolved by pointing to a paragraph instead become expensive litigation.',
      'The best time to put an operating agreement in place is at formation, when everyone is aligned. The second best time is now. Our business law team drafts agreements tailored to how your company actually operates.',
    ],
  },
  {
    title: 'Estate Planning Mistakes to Avoid',
    excerpt: 'Common pitfalls that can derail your estate plan and how to avoid them.',
    category: 'Estate Planning',
    date: 'October 30, 2024',
    author: 'Emily Rodriguez',
    readTime: '9 min read',
    content: [
      'Most estate planning failures are not caused by bad documents. They are caused by good documents that were never updated, never funded, or contradicted by paperwork elsewhere.',
      'The most common mistake is outdated beneficiary designations. Retirement accounts and life insurance pass by designation, not by will. If your 401(k) still names a former spouse, that designation generally controls regardless of what your will says.',
      'The second is creating a trust and never funding it. A trust only governs assets that are actually titled to it. An unfunded trust sends everything through probate anyway, defeating the main reason it was created.',
      'Other frequent problems include naming a single executor with no backup, failing to plan for incapacity with powers of attorney, and never revisiting the plan after marriages, divorces, births, or moves to another state.',
      'A good estate plan is reviewed every few years and after every major life event. If yours has been sitting in a drawer for a decade, it is worth a fresh look.',
    ],
  },
  {
    title: 'New Immigration Policy Updates: What You Need to Know',
    excerpt: 'Recent changes to visa processing and requirements for family-based immigration.',
    category: 'Immigration',
    date: 'October 28, 2024',
    author: 'Jennifer Park',
    readTime: '10 min read',
    content: [
      'Immigration procedures change frequently, and staying current matters because applications are judged against the rules in effect when they are filed and adjudicated.',
      'Recent procedural updates have affected processing timelines and documentation expectations for family-based petitions. Applicants should expect closer scrutiny of supporting evidence, particularly proof of qualifying relationships and financial sponsorship.',
      'Practical steps remain the same regardless of policy shifts: keep certified copies of every civil document, respond to any request for evidence promptly and completely, and never guess on a government form. Inconsistencies between filings, even innocent ones, create long delays.',
      'Because individual circumstances vary so widely, general information can only go so far. If you have a pending case or are preparing to file, a consultation can identify issues before the government does.',
    ],
  },
  {
    title: 'Workplace Discrimination: Recognizing the Signs',
    excerpt: 'Understanding what constitutes illegal discrimination and when to take action.',
    category: 'Employment Law',
    date: 'October 25, 2024',
    author: 'Jennifer Park',
    readTime: '6 min read',
    content: [
      'Not every unfair workplace decision is illegal, which is exactly why real discrimination often goes unchallenged. The law prohibits adverse treatment based on protected characteristics such as race, sex, religion, national origin, age, disability, and others defined by statute.',
      'Warning signs include being passed over for promotions in favor of less qualified colleagues, sudden negative reviews after disclosing a pregnancy or medical condition, exclusion from meetings central to your role, and comments about protected characteristics, even ones framed as jokes.',
      'Documentation is everything. Keep dated notes of incidents, save emails and messages, and record who witnessed what. Report concerns through your employer\'s official channels so there is a paper trail, and know that retaliation for a good-faith complaint is itself illegal.',
      'Strict deadlines apply to discrimination claims, including administrative filing requirements that come before any lawsuit. If you believe you are experiencing discrimination, get legal advice early so no deadline quietly passes.',
    ],
  },
  {
    title: 'Real Estate Contract Red Flags',
    excerpt: 'Important clauses and terms to watch for when reviewing real estate contracts.',
    category: 'Real Estate',
    date: 'October 22, 2024',
    author: 'David Thompson',
    readTime: '7 min read',
    content: [
      'Real estate contracts are dense by design, and the clauses that cause the most damage are usually the ones buyers and sellers skim past.',
      'Watch the contingency sections closely. Financing, inspection, and appraisal contingencies are your exit doors; contracts that waive them or set unrealistically short deadlines can lock you into a purchase or forfeit your deposit.',
      '"As-is" clauses deserve special attention. They do not always excuse a seller from disclosure obligations, but they significantly shift risk to the buyer. Similarly, check who pays which closing costs, what fixtures actually convey, and whether the possession date matches your expectations.',
      'For commercial deals, review assignment rights, estoppel requirements, and any lease obligations that transfer with the property. A one-hour contract review with an attorney is inexpensive compared to litigating an ambiguous clause later.',
    ],
  },
  {
    title: 'Social Media and Your Legal Case',
    excerpt: 'How your online activity can impact your personal injury or criminal case.',
    category: 'General',
    date: 'October 20, 2024',
    author: 'Sarah Mitchell',
    readTime: '5 min read',
    content: [
      'Assume that anything you post online will be read by the opposing side. Insurance companies and prosecutors routinely review public social media, and courts can order production of private content when it is relevant.',
      'In personal injury cases, a single photo can undermine months of documented treatment. A claimant alleging a serious back injury who posts vacation photos gives the defense a narrative, even if the photos are misleading about their actual condition.',
      'In criminal matters, posts can establish location, associations, and state of mind. Even deleted content is often recoverable and deleting it after a case begins can create separate legal problems relating to evidence preservation.',
      'The safest practice during any legal matter is simple: stop posting, tighten privacy settings, ask friends not to tag you, and never discuss the case online. Talk to your attorney before changing or removing anything already posted.',
    ],
  },
  {
    title: 'Maximizing Your Personal Injury Settlement',
    excerpt: 'Strategies for documenting damages and negotiating the best possible outcome.',
    category: 'Personal Injury',
    date: 'October 18, 2024',
    author: 'Robert Justice',
    readTime: '8 min read',
    content: [
      'Settlement value is built on evidence, not sympathy. The claims that resolve well are the ones where every category of loss is documented from the beginning.',
      'Start with complete medical records. Follow every treatment recommendation and attend every appointment; gaps in treatment are the single most common argument insurers use to discount injuries. Keep receipts for out-of-pocket costs, mileage to appointments, and any equipment or home modifications.',
      'Lost income requires its own paper trail: pay stubs, employer letters, and for self-employed claimants, tax returns and invoices showing the drop in earnings. Pain and suffering is strengthened by a simple daily journal noting limitations and missed activities.',
      'Finally, be patient. Cases settle for full value when the insurer believes you are prepared to go to trial. An experienced attorney builds that leverage, times the demand correctly, and knows when an offer is genuinely final versus a negotiating position.',
    ],
  },
];

const CATEGORIES = [
  'All Posts',
  'Personal Injury',
  'Criminal Defense',
  'Family Law',
  'Business Law',
  'Estate Planning',
  'Immigration',
  'Employment Law',
  'Real Estate',
];

export default function BlogPage({ onNavigate, accentColor = '#c9a227' }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = React.useState('All Posts');
  const [activePost, setActivePost] = React.useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const filteredPosts = selectedCategory === 'All Posts'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('lawfirm-newsletter-email', newsletterEmail);
    } catch { /* storage unavailable */ }
    setSubscribed(true);
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
          <h1 className="text-5xl font-bold mb-6">Legal News & Insights</h1>
          <p className="text-xl text-gray-300">
            Stay informed with the latest legal updates, analysis, and practical advice from our
            experienced attorneys. Knowledge is power when it comes to protecting your rights.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-6 h-6" style={{ color: accentColor }} />
            <h2 className="text-2xl font-bold" style={{ color: '#1a1a2e' }}>Featured Article</h2>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div
                className="h-64 lg:h-auto flex items-center justify-center text-white text-6xl font-bold"
                style={{ background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)' }}
              >
                FP
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-4 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ backgroundColor: `${accentColor}20`, color: '#1a1a2e' }}
                  >
                    {FEATURED_POST.category}
                  </span>
                  <span className="text-sm text-gray-500">{FEATURED_POST.readTime}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
                  {FEATURED_POST.title}
                </h3>
                <p className="text-gray-700 mb-6 text-lg">{FEATURED_POST.excerpt}</p>
                <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{FEATURED_POST.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{FEATURED_POST.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActivePost(FEATURED_POST)}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: '#16213e' }}
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-2 rounded-lg font-medium text-sm transition-all"
                style={{
                  backgroundColor: selectedCategory === category ? accentColor : '#ffffff',
                  color: selectedCategory === category ? '#16213e' : '#1a1a2e',
                  border: `2px solid ${selectedCategory === category ? accentColor : '#e5e7eb'}`,
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div
                key={index}
                onClick={() => setActivePost(post)}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className="h-48 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
                    color: '#ffffff',
                  }}
                >
                  <Scale className="w-16 h-16" style={{ color: accentColor }} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                      style={{ backgroundColor: `${accentColor}20`, color: '#1a1a2e' }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 line-clamp-2" style={{ color: '#1a1a2e' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <button
                    className="flex items-center space-x-2 font-semibold text-sm hover:underline"
                    style={{ color: accentColor }}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
            Stay Informed
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for legal updates, tips, and insights delivered to your inbox
          </p>
          {subscribed ? (
            <div
              className="max-w-xl mx-auto p-6 rounded-lg flex items-center justify-center gap-3"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <CheckCircle2 className="w-8 h-8 flex-shrink-0" style={{ color: accentColor }} />
              <div className="text-left">
                <p className="font-bold" style={{ color: '#1a1a2e' }}>You're subscribed!</p>
                <p className="text-sm text-gray-600">
                  Legal updates will be sent to {newsletterEmail}.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                aria-label="Email address for newsletter"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-opacity-50"
                style={{ borderColor: '#e5e7eb' }}
              />
              <button
                type="submit"
                className="px-8 py-3 rounded-lg font-bold whitespace-nowrap transition-all hover:opacity-90"
                style={{ backgroundColor: accentColor, color: '#16213e' }}
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
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
              The content on this blog is for informational purposes only and does not constitute
              legal advice. Laws vary by jurisdiction and change over time. For advice about your
              specific legal situation, please consult with an attorney. Reading this blog does not
              create an attorney-client relationship.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Need Legal Advice?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Don't rely on general information alone. Get personalized legal guidance from our
            experienced attorneys.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: accentColor, color: '#16213e' }}
          >
            Schedule Free Consultation
          </button>
        </div>
      </section>

      {/* Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60" onClick={() => setActivePost(null)}>
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white gap-4">
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2"
                  style={{ backgroundColor: `${accentColor}20`, color: '#1a1a2e' }}
                >
                  {activePost.category}
                </span>
                <h3 className="text-2xl font-bold" style={{ color: '#1a1a2e' }}>{activePost.title}</h3>
              </div>
              <button onClick={() => setActivePost(null)} aria-label="Close" className="p-1 rounded hover:bg-gray-100 flex-shrink-0">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{activePost.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{activePost.date}</span>
                </div>
                <span>{activePost.readTime}</span>
              </div>
              <div className="space-y-4 mb-8">
                {activePost.content.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed">{paragraph}</p>
                ))}
              </div>
              <div
                className="rounded-lg p-6 mb-2"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <p className="text-xs text-gray-500 mb-4">
                  This article is for informational purposes only and does not constitute legal
                  advice. Reading it does not create an attorney-client relationship.
                </p>
                <button
                  onClick={() => {
                    setActivePost(null);
                    onNavigate('contact');
                  }}
                  className="w-full py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: '#16213e' }}
                >
                  Discuss Your Situation: Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
