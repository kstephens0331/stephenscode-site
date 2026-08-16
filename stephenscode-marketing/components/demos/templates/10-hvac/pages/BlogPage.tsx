import React, { useState } from 'react';
import { FileText, Calendar, User, Tag, Search, ArrowRight, CheckCircle, X } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  keyTakeaways: string[];
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'maintenance', label: 'Maintenance Tips' },
    { id: 'energy', label: 'Energy Efficiency' },
    { id: 'seasonal', label: 'Seasonal Advice' },
    { id: 'buying', label: 'Buying Guides' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: '10 Signs Your AC Needs Repair Before Summer',
      excerpt: 'Don\'t wait for a breakdown during the hottest days. Learn the warning signs that your AC needs professional attention.',
      category: 'troubleshooting',
      author: 'Mike Johnson',
      date: 'May 15, 2024',
      readTime: '5 min read',
      image: '🔧',
      content: [
        'Your air conditioner rarely fails without warning. In most of the emergency calls we run during the first heatwave of the year, the system had been showing symptoms for weeks. Catching those symptoms early is the difference between a $150 repair and a mid-July breakdown.',
        'Watch for warm air blowing from vents, weak airflow, short cycling (the system turning on and off every few minutes), and unusual noises like grinding, squealing, or banging. Musty odors point to drainage or mold issues, while a burning smell means you should shut the system down immediately.',
        'Rising energy bills without a change in usage are another red flag. A struggling compressor or a refrigerant leak forces the system to run longer to reach the same temperature, and you pay for every extra minute.',
        'If you notice two or more of these signs, schedule a diagnostic before peak season. Spring appointments are easier to book, and repairs made early prevent the cascading damage that turns small fixes into full replacements.',
      ],
      keyTakeaways: [
        'Warm air, weak airflow, and short cycling are the three most common early warnings',
        'Burning smells or electrical odors mean shut the system off and call immediately',
        'A spring diagnostic visit costs far less than a mid-summer emergency call',
      ],
    },
    {
      id: 2,
      title: 'How to Reduce Your Energy Bills This Summer',
      excerpt: 'Simple tips and tricks to keep your home cool without breaking the bank. Save up to 30% on cooling costs.',
      category: 'energy',
      author: 'Sarah Williams',
      date: 'May 10, 2024',
      readTime: '7 min read',
      image: '💡',
      content: [
        'Cooling is the single largest line item on most summer utility bills, but a handful of low-cost habits can cut it dramatically without sacrificing comfort.',
        'Start with your thermostat. Every degree you raise the setpoint saves roughly 3% on cooling costs. Setting it to 78 while home and letting it drift higher while away is the single highest-impact change most households can make. A programmable or smart thermostat automates this so you never think about it.',
        'Next, reduce the heat entering your home: close blinds on sun-facing windows during the afternoon, run heat-producing appliances like ovens and dryers in the evening, and use ceiling fans so you can raise the thermostat a couple degrees while feeling the same.',
        'Finally, keep your system efficient. A clogged filter can raise energy use by 5-15%, and dirty condenser coils force the compressor to work overtime. A seasonal tune-up typically pays for itself in energy savings alone.',
      ],
      keyTakeaways: [
        'Each degree higher on the thermostat saves about 3% on cooling',
        'Blocking afternoon sun and using ceiling fans lets you set the thermostat higher comfortably',
        'Clean filters and coils directly reduce the energy your system consumes',
      ],
    },
    {
      id: 3,
      title: 'Complete HVAC Maintenance Checklist for Homeowners',
      excerpt: 'A comprehensive guide to maintaining your HVAC system year-round. Keep your system running efficiently.',
      category: 'maintenance',
      author: 'Tom Rodriguez',
      date: 'May 5, 2024',
      readTime: '10 min read',
      image: '✅',
      content: [
        'A well-maintained HVAC system lasts 15-20 years; a neglected one often fails in under 10. The good news is that most of the maintenance that extends system life is simple enough to put on a calendar.',
        'Monthly: check your air filter and replace it if it looks gray or clogged. Homes with pets or allergies should replace filters every 30-60 days; others can stretch to 90.',
        'Seasonally: clear leaves and debris from around the outdoor unit, keep two feet of clearance on all sides, check that supply vents are open and unblocked, and test your thermostat by running both heating and cooling modes before you need them.',
        'Annually: schedule professional tune-ups in spring for cooling and fall for heating. A technician will clean coils, check refrigerant levels, tighten electrical connections, lubricate moving parts, and inspect the heat exchanger -- the items that cause breakdowns when skipped.',
      ],
      keyTakeaways: [
        'Check filters monthly; replace at least every 90 days',
        'Keep two feet of clearance around the outdoor unit',
        'Book professional tune-ups twice a year: spring for AC, fall for heat',
      ],
    },
    {
      id: 4,
      title: 'When to Replace vs. Repair Your HVAC System',
      excerpt: 'Making the right decision can save you thousands. Here\'s how to evaluate whether repair or replacement is best.',
      category: 'buying',
      author: 'Mike Johnson',
      date: 'April 28, 2024',
      readTime: '8 min read',
      image: '🤔',
      content: [
        'Every homeowner eventually faces the repair-or-replace question, usually at the worst possible moment. Having a framework ready makes the decision far less stressful.',
        'The industry rule of thumb is the 5,000 rule: multiply the repair cost by the age of the system. If the result exceeds 5,000, replacement is usually the better investment. A $500 repair on an 8-year-old system (4,000) makes sense; the same repair on a 12-year-old system (6,000) probably does not.',
        'Also weigh efficiency. A 15-year-old system typically runs at 8-10 SEER; modern systems start at 14-15 SEER and can exceed 20. That difference alone can cut cooling costs 30-50%, which shortens the payback period on a new system considerably.',
        'Frequency matters too. If you have needed two or more repairs in the last two years, the system is telling you something. Repeated component failures usually signal broader wear that will keep generating service calls.',
      ],
      keyTakeaways: [
        'Use the 5,000 rule: repair cost times system age over 5,000 favors replacement',
        'Modern high-SEER systems can cut cooling costs by a third or more',
        'Two or more repairs in two years is a strong signal to start pricing replacements',
      ],
    },
    {
      id: 5,
      title: 'Preparing Your Heating System for Winter',
      excerpt: 'Essential steps to ensure your furnace is ready for cold weather. Prevent breakdowns and stay warm all winter.',
      category: 'seasonal',
      author: 'Lisa Chen',
      date: 'April 20, 2024',
      readTime: '6 min read',
      image: '❄️',
      content: [
        'The first cold snap of the year is our busiest week for no-heat calls, and most of them were preventable. A short fall checklist keeps your furnace off that list.',
        'Start by test-firing the system in early fall: switch the thermostat to heat and let it run for 15 minutes. A dusty smell for the first few minutes is normal; anything that smells electrical or does not clear is worth a service call while the weather is still mild.',
        'Replace the filter, check that all registers are open, and clear anything stored near the furnace -- especially paint, solvents, or boxes blocking airflow. If you have a gas furnace, test your carbon monoxide detectors and replace their batteries.',
        'Finally, book a professional fall tune-up. The technician will inspect the heat exchanger for cracks, clean the burners, test safety controls, and verify proper venting -- the checks that keep small issues from becoming December emergencies.',
      ],
      keyTakeaways: [
        'Test-fire your furnace in early fall, before the first cold night',
        'Replace filters and test CO detectors before heating season',
        'A fall tune-up catches heat exchanger and burner issues early',
      ],
    },
    {
      id: 6,
      title: 'Understanding SEER Ratings: What They Mean for You',
      excerpt: 'Demystifying SEER ratings and how they impact your energy costs and comfort. Make informed purchasing decisions.',
      category: 'buying',
      author: 'Sarah Williams',
      date: 'April 15, 2024',
      readTime: '5 min read',
      image: '📊',
      content: [
        'SEER (Seasonal Energy Efficiency Ratio) measures how much cooling a system delivers per unit of electricity over a typical season. Higher numbers mean lower operating costs -- but the right number for your home depends on more than the sticker.',
        'The math is straightforward: upgrading from a 10 SEER system to a 16 SEER system cuts cooling energy use by roughly 37%. On a $300-per-summer-month cooling bill, that is over $100 a month back in your pocket during peak season.',
        'Diminishing returns are real, though. The jump from 14 to 16 SEER usually pays for itself within a few years in our climate; the jump from 18 to 22 takes much longer and mainly benefits homes with very high cooling loads.',
        'When comparing quotes, look at the full installed system rating, not just the outdoor unit. A high-SEER condenser paired with an old air handler will not deliver its rated efficiency. Ask your installer for the AHRI matched-system certificate.',
      ],
      keyTakeaways: [
        'Higher SEER means lower cooling costs -- roughly proportional to the ratio',
        '14 to 16 SEER is the sweet spot for payback in most homes',
        'Efficiency ratings only hold when indoor and outdoor units are properly matched',
      ],
    },
    {
      id: 7,
      title: 'DIY vs. Professional HVAC Maintenance: What You Need to Know',
      excerpt: 'Learn which maintenance tasks you can handle yourself and when to call the professionals.',
      category: 'maintenance',
      author: 'Tom Rodriguez',
      date: 'April 10, 2024',
      readTime: '7 min read',
      image: '🛠️',
      content: [
        'There is real maintenance homeowners should do themselves, and there is work that belongs to a licensed technician. Knowing the line saves money on both sides of it.',
        'Safe DIY tasks: replacing air filters, keeping the outdoor unit clear of leaves and grass clippings, gently rinsing condenser fins with a hose (power off first), clearing the condensate drain line with vinegar, and keeping supply vents open and dusted.',
        'Leave to professionals: anything involving refrigerant (EPA-regulated and requires certification), electrical repairs, gas connections, heat exchanger inspection, and internal blower or coil cleaning. These involve safety risks and specialized instruments, and DIY attempts frequently void manufacturer warranties.',
        'The best approach combines both: handle the monthly basics yourself, and put the twice-yearly professional tune-up on autopilot with a maintenance plan. Our plan customers see roughly half the emergency-repair rate of non-plan customers.',
      ],
      keyTakeaways: [
        'Filters, outdoor-unit clearing, and drain-line flushes are safe DIY tasks',
        'Refrigerant, gas, and electrical work legally and practically require a pro',
        'DIY repairs on sealed components can void your manufacturer warranty',
      ],
    },
    {
      id: 8,
      title: 'The Complete Guide to Indoor Air Quality',
      excerpt: 'Everything you need to know about improving the air you breathe at home. Better health starts with clean air.',
      category: 'energy',
      author: 'Lisa Chen',
      date: 'April 5, 2024',
      readTime: '12 min read',
      image: '🌬️',
      content: [
        'The EPA estimates indoor air can be two to five times more polluted than outdoor air. Since most of us spend the majority of our time indoors, air quality has a direct, measurable effect on sleep, allergies, and respiratory health.',
        'The first line of defense is filtration. Standard fiberglass filters protect your equipment, not your lungs. Upgrading to a MERV 11-13 pleated filter captures pollen, pet dander, and fine dust without choking airflow on most modern systems.',
        'Humidity is the second lever. Indoor humidity between 30-50% suppresses dust mites and mold while keeping skin and sinuses comfortable. Whole-home humidifiers and dehumidifiers integrate directly with your HVAC system and manage this automatically.',
        'For households with allergies or asthma, whole-home air purifiers and UV lights take treatment further -- purifiers capture particles down to 0.3 microns, while UV lamps installed at the coil prevent mold and bacterial growth inside the system itself.',
      ],
      keyTakeaways: [
        'Upgrade to a MERV 11-13 filter for meaningful health filtration',
        'Keep indoor humidity between 30-50% year-round',
        'Whole-home purifiers and UV lights are the strongest options for allergy sufferers',
      ],
    },
    {
      id: 9,
      title: 'Smart Thermostats: Are They Worth the Investment?',
      excerpt: 'Exploring the benefits, costs, and savings potential of upgrading to a smart thermostat.',
      category: 'buying',
      author: 'Mike Johnson',
      date: 'March 28, 2024',
      readTime: '6 min read',
      image: '📱',
      content: [
        'Smart thermostats have moved from novelty to mainstream, and the data behind them is solid: independent studies consistently show 10-15% savings on heating and cooling costs, which typically pays back the hardware in one to two years.',
        'The savings come from three features. Scheduling eliminates conditioning an empty house. Geofencing uses your phone location to shift to away-mode automatically. And learning algorithms fine-tune run times around your actual comfort patterns rather than fixed setpoints.',
        'Beyond savings, smart thermostats surface problems early. Runtime alerts can flag a struggling system weeks before failure -- several of our customers have caught refrigerant leaks because their thermostat reported unusually long cooling cycles.',
        'Installation matters more than brand. Wiring varies between systems, and heat pumps in particular have configuration options that cause comfort problems when set incorrectly. Professional installation typically adds little cost and includes correct system configuration.',
      ],
      keyTakeaways: [
        'Expect 10-15% savings, with payback usually inside two years',
        'Runtime alerts can catch developing system problems early',
        'Heat pump owners especially benefit from professional configuration',
      ],
    },
    {
      id: 10,
      title: 'Common Summer AC Problems and How to Fix Them',
      excerpt: 'Quick troubleshooting guide for the most common AC issues during peak cooling season.',
      category: 'troubleshooting',
      author: 'Tom Rodriguez',
      date: 'March 20, 2024',
      readTime: '8 min read',
      image: '🔍',
      content: [
        'Before you call for service, a few checks resolve a surprising share of summer AC complaints -- and knowing what you can rule out helps us diagnose faster when you do call.',
        'AC not turning on: check the thermostat batteries, then the breaker panel. Cooling systems have two breakers (indoor and outdoor); a tripped outdoor breaker leaves the fan running but blowing warm air, which is the most common "AC broken" call we get.',
        'Weak or warm airflow: check your filter first. A fully clogged filter can drop airflow enough to freeze the indoor coil, which then blocks air entirely. If you see ice on the refrigerant lines, turn the system off and let it thaw for a few hours before restarting.',
        'Water around the indoor unit: usually a clogged condensate drain. Flushing the drain line with a cup of white vinegar often clears it. Persistent leaks, refrigerant issues, and any electrical smell are your cue to stop troubleshooting and call a professional.',
      ],
      keyTakeaways: [
        'Check thermostat batteries and both breakers before calling for service',
        'Ice on refrigerant lines means shut down and thaw before restarting',
        'A vinegar flush clears most condensate drain clogs',
      ],
    },
    {
      id: 11,
      title: 'How Often Should You Change Your HVAC Filters?',
      excerpt: 'The definitive guide to filter replacement schedules based on your home and system type.',
      category: 'maintenance',
      author: 'Sarah Williams',
      date: 'March 15, 2024',
      readTime: '4 min read',
      image: '🔄',
      content: [
        'Filter changes are the cheapest maintenance your system gets and the most commonly skipped. The right schedule depends on your filter type and your household.',
        'Baseline guidance: 1-inch fiberglass filters every 30 days, 1-inch pleated filters every 60-90 days, and 4-5 inch media filters every 6-12 months. When in doubt, hold the filter up to a light -- if you cannot see light through it, it is overdue.',
        'Shorten those intervals if you have shedding pets (subtract 30 days), allergy sufferers (30-45 day changes with a MERV 11+ filter), recent renovation dust, or a system that runs nearly continuously in peak season.',
        'The cost of skipping is real: restricted airflow makes the blower work harder, raises energy use 5-15%, accelerates wear, and in the worst case freezes the coil. A $10 filter is protecting a $7,000 system.',
      ],
      keyTakeaways: [
        'Fiberglass monthly, pleated every 60-90 days, thick media every 6-12 months',
        'Pets, allergies, and heavy runtime all shorten the interval',
        'If light does not pass through the filter, replace it now',
      ],
    },
    {
      id: 12,
      title: 'Heat Pump vs. Traditional HVAC: Which is Right for You?',
      excerpt: 'Comparing the pros, cons, and costs of heat pumps versus traditional heating and cooling systems.',
      category: 'buying',
      author: 'Lisa Chen',
      date: 'March 10, 2024',
      readTime: '10 min read',
      image: '⚖️',
      content: [
        'A heat pump is essentially an air conditioner that can run in reverse: in summer it moves heat out of your home, and in winter it moves heat in. Because it moves heat rather than generating it, it can deliver two to three units of heat per unit of electricity.',
        'The traditional pairing -- gas furnace plus AC -- still wins in some situations: very cold climates where heat pump efficiency drops, homes with cheap natural gas service, and households that prefer the hotter supply-air temperature a furnace delivers.',
        'Modern cold-climate heat pumps have changed the math considerably, maintaining full capacity well below freezing. Combined with federal tax credits and utility rebates currently available for high-efficiency heat pumps, total cost of ownership now favors heat pumps for most homes in moderate climates.',
        'A popular middle path is the dual-fuel system: a heat pump handles cooling and mild-weather heating, and a gas furnace takes over automatically during cold snaps. You get the efficiency of the heat pump with the cold-weather muscle of gas.',
      ],
      keyTakeaways: [
        'Heat pumps deliver 2-3x the heat per dollar of electricity versus resistance heat',
        'Gas furnaces still make sense in very cold climates or with cheap gas',
        'Dual-fuel systems combine the strengths of both approaches',
      ],
    },
  ];

  const matchesSearch = (article: Article) => {
    if (!searchTerm.trim()) return true;
    const haystack = [
      article.title,
      article.excerpt,
      article.author,
      categories.find((c) => c.id === article.category)?.label ?? '',
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(searchTerm.trim().toLowerCase());
  };

  const filteredArticles = articles.filter(
    (article) =>
      (selectedCategory === 'all' || article.category === selectedCategory) &&
      matchesSearch(article)
  );

  const featuredArticle = articles[0];

  const popularTopics = [
    { label: 'AC Maintenance', term: 'AC' },
    { label: 'Energy Savings', term: 'energy' },
    { label: 'Filter Changes', term: 'filter' },
    { label: 'Thermostat Tips', term: 'thermostat' },
    { label: 'System Replacement', term: 'replace' },
    { label: 'Emergency Repairs', term: 'repair' },
    { label: 'Air Quality', term: 'air quality' },
    { label: 'Seasonal Prep', term: 'seasonal' },
  ];

  const handleTopicClick = (term: string) => {
    setSelectedCategory('all');
    setSearchTerm(term);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = () => {
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">HVAC Resources & Blog</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Expert advice, tips, and guides to keep your HVAC system running efficiently
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              aria-label="Search articles"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-12 py-4 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#003049] transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-3">
              Showing {filteredArticles.length} article{filteredArticles.length === 1 ? '' : 's'} matching &quot;{searchTerm}&quot;
            </p>
          )}
        </div>
      </section>

      {/* Featured Article */}
      {!searchTerm && selectedCategory === 'all' && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-gradient-to-br from-[#003049] to-[#004d73] p-12 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-8xl mb-6">{featuredArticle.image}</div>
                    <span className="inline-block bg-[#f77f00] text-white px-4 py-2 rounded-full text-sm font-bold">
                      FEATURED ARTICLE
                    </span>
                  </div>
                </div>

                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {featuredArticle.date}
                    </span>
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {featuredArticle.author}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4 text-[#003049]">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-700 text-lg mb-6">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{featuredArticle.readTime}</span>
                    <button
                      onClick={() => setSelectedArticle(featuredArticle)}
                      className="bg-[#003049] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#004d73] transition-all duration-300 flex items-center"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#003049] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-[#003049] to-[#004d73] p-8 text-center">
                  <div className="text-6xl mb-4">{article.image}</div>
                  <span className="inline-block bg-[#f77f00] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {categories.find(c => c.id === article.category)?.label}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#003049] group-hover:text-[#f77f00] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {article.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArticle(article);
                      }}
                      className="text-[#003049] font-semibold text-sm group-hover:text-[#f77f00] transition-colors flex items-center"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No articles match your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-[#003049] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#004d73] transition"
              >
                Show All Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#003049] to-[#004d73] rounded-2xl p-8 md:p-12 text-white text-center">
            <FileText className="w-16 h-16 text-[#f77f00] mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for HVAC tips, seasonal advice, and exclusive offers
            </p>

            <div className="max-w-md mx-auto">
              {subscribed ? (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
                  <p className="font-bold text-lg mb-1">You&apos;re subscribed!</p>
                  <p className="text-white/80 text-sm">
                    Seasonal tips and offers will arrive at {newsletterEmail}.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      aria-label="Email address for newsletter"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubscribe();
                      }}
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-[#f77f00]"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="bg-[#f77f00] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#e07000] transition-all duration-300 whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-white/70 text-sm mt-4">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Popular Topics</h2>
            <p className="text-xl text-gray-600">
              Quick links to our most read articles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTopicClick(topic.term)}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-[#003049] font-semibold hover:text-[#f77f00]"
              >
                <Tag className="w-5 h-5 inline mr-2" />
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#003049]">
            Need Professional HVAC Service?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our expert technicians are ready to help with all your heating and cooling needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#003049] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#004d73] transition-all duration-300"
            >
              Schedule Service
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="bg-[#f77f00] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e07000] transition-all duration-300"
            >
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white p-6 flex items-start justify-between gap-4">
              <div>
                <span className="inline-block bg-[#f77f00] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase mb-3">
                  {categories.find(c => c.id === selectedArticle.category)?.label}
                </span>
                <h2 className="text-2xl font-bold leading-snug">{selectedArticle.title}</h2>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/80">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {selectedArticle.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {selectedArticle.date}
                  </span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article"
                className="text-white/80 hover:text-white transition flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              {selectedArticle.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-5">
                  {paragraph}
                </p>
              ))}

              <div className="bg-gray-50 border-l-4 border-[#f77f00] rounded-r-xl p-6 mt-6">
                <h3 className="font-bold text-[#003049] mb-3">Key Takeaways</h3>
                <ul className="space-y-2">
                  {selectedArticle.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#f77f00] mr-2 mt-0.5 flex-shrink-0" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 bg-gradient-to-r from-[#003049] to-[#004d73] rounded-xl p-6 text-white text-center">
                <p className="font-bold text-lg mb-2">Need help with your HVAC system?</p>
                <p className="text-white/80 text-sm mb-4">
                  Our certified technicians are ready to put this advice to work in your home.
                </p>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onNavigate('contact');
                  }}
                  className="bg-[#f77f00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e07000] transition"
                >
                  Schedule Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
