'use client';

import { BookOpen, Calendar, Clock, User, TrendingUp, Dumbbell, Apple, Heart, X, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPageProps {
  basePath: string;
}

interface Article {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string[];
}

const NEWSLETTER_KEY = 'iron-temple-newsletter';

const featuredPost: Article = {
  title: 'The Ultimate Guide to Building Muscle After 40',
  excerpt: 'Age is just a number when it comes to building strength. Learn the science-backed strategies that help you gain muscle and strength regardless of your age.',
  category: 'Strength Training',
  author: 'Marcus Steel',
  date: 'Nov 10, 2024',
  readTime: '8 min read',
  icon: TrendingUp,
  content: [
    'The idea that muscle growth stops after 40 is one of the most persistent myths in fitness. Research consistently shows that adults in their 40s, 50s, and beyond can build significant muscle mass with the right approach. What changes is not your potential, but the strategy required to reach it.',
    'The foundation is progressive resistance training three to four times per week. Focus on compound movements: squats, deadlifts, presses, and rows. These recruit the most muscle fibers and drive the hormonal response that supports growth. Start with weights you can control for 8 to 12 quality repetitions.',
    'Recovery becomes non-negotiable after 40. Where a 25-year-old might train the same muscle group every 48 hours, you will see better results allowing 72 hours between sessions for the same muscle group. Sleep is your most powerful recovery tool: aim for 7 to 9 hours nightly.',
    'Protein needs also increase with age due to anabolic resistance. Target 0.7 to 1 gram of protein per pound of bodyweight daily, spread across 3 to 4 meals. Pair that with adequate calories and you give your body the raw material it needs to build.',
    'Finally, be patient and consistent. Members at Iron Temple in their 40s and 50s routinely add 10 to 15 pounds of lean muscle in their first year of structured training. The key is showing up, tracking progress, and trusting the process.',
  ],
};

const allPosts: Article[] = [
  {
    title: '5 HIIT Mistakes That Are Sabotaging Your Results',
    excerpt: 'High-intensity training is effective, but only when done correctly. Avoid these common pitfalls to maximize your fat-burning potential.',
    category: 'Training Tips',
    author: 'Sarah Chen',
    date: 'Nov 8, 2024',
    readTime: '6 min read',
    icon: TrendingUp,
    content: [
      'HIIT works because of intensity, but most people sabotage that intensity without realizing it. The first mistake is going too long. True high-intensity intervals cannot be sustained for 45 minutes. If your "HIIT" session lasts that long, you are doing moderate cardio with extra steps.',
      'Mistake two: skipping the warm-up. Cold muscles cannot produce maximal effort, and jumping straight into sprints is the fastest route to a pulled hamstring. Give yourself 5 to 10 minutes of progressive movement first.',
      'Third, too many sessions per week. HIIT is a stressor, and your nervous system needs 48 hours to recover from a genuine session. Two to three sessions weekly is the sweet spot for most members.',
      'Fourth, incomplete rest intervals. If you cannot go hard in your next work interval, your rest was too short. Quality beats density every time.',
      'Finally, neglecting strength work. HIIT alone will not build the muscle that drives your metabolism long-term. Pair it with two strength sessions weekly and watch your results compound.',
    ],
  },
  {
    title: 'Pre-Workout Nutrition: What to Eat and When',
    excerpt: 'Fuel your workouts properly with our comprehensive guide to pre-workout nutrition timing and food choices for optimal performance.',
    category: 'Nutrition',
    author: 'Dr. James Wilson',
    date: 'Nov 5, 2024',
    readTime: '7 min read',
    icon: Apple,
    content: [
      'What you eat before training directly affects how hard you can push. The goal of pre-workout nutrition is simple: stable energy, no digestive distress, and enough fuel to support intensity.',
      'If you train 2 to 3 hours after eating, a balanced meal works well: lean protein, complex carbs, and a small amount of fat. Think chicken with rice and vegetables, or oatmeal with eggs.',
      'Training within an hour of eating? Keep it light and carb-focused. A banana with a small scoop of peanut butter, or a slice of toast with honey, digests quickly and tops off your glycogen.',
      'Early morning trainers often do fine fasted for sessions under 45 minutes, but for longer or heavier sessions, even a small amount of quick carbs improves performance measurably.',
      'Hydration matters as much as food. Arrive at the gym having consumed at least 16 ounces of water over the previous two hours. A 2 percent drop in hydration can reduce strength output by up to 10 percent.',
    ],
  },
  {
    title: 'Recovery 101: Why Rest Days Are Essential',
    excerpt: 'Discover why taking rest days is crucial for muscle growth, injury prevention, and long-term fitness success.',
    category: 'Recovery',
    author: 'Emily Rodriguez',
    date: 'Nov 3, 2024',
    readTime: '5 min read',
    icon: Heart,
    content: [
      'Training does not build muscle. Training creates the stimulus; recovery builds the muscle. Skipping rest days does not make you tougher, it makes you weaker over time.',
      'During rest, your body repairs muscle fibers, replenishes glycogen, and rebalances the hormones that drive adaptation. Chronic under-recovery shows up as stalled lifts, poor sleep, irritability, and nagging injuries.',
      'A rest day does not have to mean the couch. Active recovery, such as a walk, easy swim, or gentle yoga session, increases blood flow and can actually speed up the repair process.',
      'Aim for at least one full rest day and one active recovery day per week. If your motivation is dropping and your lifts are stalling, take a full deload week: same movements, half the weight and volume.',
      'Our sauna and cold plunge facilities exist for exactly this reason. Contrast therapy after hard sessions reduces soreness and helps you show up ready for your next workout.',
    ],
  },
  {
    title: 'CrossFit for Beginners: Everything You Need to Know',
    excerpt: 'New to CrossFit? This comprehensive guide covers the basics, what to expect in your first class, and how to get started safely.',
    category: 'CrossFit',
    author: 'Jake Morrison',
    date: 'Oct 30, 2024',
    readTime: '10 min read',
    icon: Dumbbell,
    content: [
      'CrossFit has a reputation for intensity, but every workout is infinitely scalable. Your first class will not look like the competitions you see online, and it is not supposed to.',
      'A typical class runs 60 minutes: a group warm-up, a skill or strength segment where the coach teaches a movement, the workout of the day (WOD), and a cool-down. Coaches scale every movement to your current ability.',
      'Your first month is about learning positions, not chasing scores. Master the air squat before the barbell squat. Master the ring row before the pull-up. The members who progress fastest are the ones who leave their ego at the door.',
      'Expect to be sore for the first two weeks: that is normal adaptation. Attend three classes per week at first, with rest days between, and let your body adjust.',
      'The best part of CrossFit is the community. At Iron Temple, the last person to finish a workout gets the loudest cheers. Show up, be coachable, and you will be amazed what you can do in six months.',
    ],
  },
  {
    title: 'Mastering the Mind-Muscle Connection',
    excerpt: 'Learn how focusing on the muscles you\'re working can dramatically improve your strength gains and muscle development.',
    category: 'Strength Training',
    author: 'Marcus Steel',
    date: 'Oct 28, 2024',
    readTime: '6 min read',
    icon: TrendingUp,
    content: [
      'Two lifters can perform the same exercise with the same weight and get very different results. The difference is often the mind-muscle connection: the deliberate focus on the muscle doing the work.',
      'Research using EMG shows that actively thinking about contracting a muscle during a lift measurably increases its activation. For hypertrophy work in the 8 to 15 rep range, this translates directly to better growth.',
      'To develop it, slow down. Use a 2 to 3 second lowering phase and pause briefly at the point of peak contraction. If you cannot feel the target muscle working, the weight is probably too heavy.',
      'Try pre-activation sets: before bench press, do a light set of flyes to "wake up" the chest. Before rows, do a light set of straight-arm pulldowns for the lats.',
      'Heavy compound strength work is the exception: when lifting near-maximal loads, focus on moving the bar, not the muscle. Save the mind-muscle connection for your accessory and isolation work.',
    ],
  },
  {
    title: 'Supplement Guide: What Actually Works',
    excerpt: 'Cut through the marketing hype and learn which supplements are actually worth your money based on scientific research.',
    category: 'Nutrition',
    author: 'Dr. James Wilson',
    date: 'Oct 25, 2024',
    readTime: '9 min read',
    icon: Apple,
    content: [
      'The supplement industry thrives on confusion. The truth is that only a handful of supplements have strong evidence behind them, and none of them replace consistent training and good food.',
      'Creatine monohydrate is the most studied supplement in existence. Three to five grams daily improves strength, power output, and lean mass gains. It does not need to be cycled and does not require a loading phase.',
      'Protein powder is not magic, it is food. If you struggle to hit your daily protein target with whole foods, a whey or plant protein shake is a convenient and cost-effective way to close the gap.',
      'Caffeine is a legitimate performance enhancer: 3 to 6 mg per kilogram of bodyweight taken 30 to 60 minutes before training improves both strength and endurance. Time it carefully so it does not wreck your sleep.',
      'Vitamin D is worth testing for, especially if you train indoors year-round. Beyond these, be skeptical: fat burners, BCAAs alongside adequate protein, and most pre-workout blends are marketing dressed up as science.',
    ],
  },
  {
    title: 'Progressive Overload: The Key to Continuous Gains',
    excerpt: 'Understand the principle of progressive overload and how to apply it to your training for continuous improvement.',
    category: 'Training Tips',
    author: 'Sarah Chen',
    date: 'Oct 22, 2024',
    readTime: '7 min read',
    icon: TrendingUp,
    content: [
      'Your body adapts to exactly the demand you place on it, then stops. Progressive overload is the practice of systematically increasing that demand so adaptation never stops.',
      'Adding weight to the bar is the most obvious method, but it is not the only one. You can add reps at the same weight, add sets, slow the tempo, shorten rest periods, or improve range of motion. All of these are progression.',
      'The mistake most lifters make is trying to progress every session. Sustainable progress looks like adding 5 pounds or 1 to 2 reps per week on main lifts, and even that pace slows as you advance.',
      'Track your training. A simple log of exercises, weights, sets, and reps turns every workout into a target to beat. Members who log their sessions progress roughly twice as fast in their first year.',
      'When progress stalls for three weeks or more, do not push harder: change the stimulus. Rotate exercise variations, adjust rep ranges, or take a deload week. Plateaus are information, not failure.',
    ],
  },
  {
    title: 'Yoga for Athletes: Improve Flexibility and Performance',
    excerpt: 'How incorporating yoga into your training routine can enhance athletic performance, reduce injury risk, and speed recovery.',
    category: 'Yoga',
    author: 'Emily Rodriguez',
    date: 'Oct 20, 2024',
    readTime: '8 min read',
    icon: Heart,
    content: [
      'Strength without mobility is a ceiling on your performance. Tight hips limit your squat depth, a stiff thoracic spine caps your overhead press, and restricted ankles change your entire movement pattern.',
      'Yoga addresses all of this while adding something most training programs lack: deliberate breath work and body awareness. Athletes who add one to two yoga sessions weekly consistently report better recovery and fewer nagging injuries.',
      'For lifters, focus on poses that open the hips and thoracic spine: pigeon pose, lizard pose, thread-the-needle, and supported backbends. Hold each for 60 to 90 seconds and breathe into the stretch.',
      'Timing matters. Long static holds before heavy lifting can temporarily reduce power output, so schedule deep stretching sessions after training or on rest days, and keep pre-workout mobility dynamic.',
      'Our Mind-Body Studio runs yoga classes seven days a week, including a Sunday morning session designed specifically for athletes and lifters. One class per week is enough to notice the difference within a month.',
    ],
  },
  {
    title: 'The Truth About Cardio and Muscle Loss',
    excerpt: 'Debunking myths about cardio killing your gains and how to balance cardio with strength training for optimal results.',
    category: 'Training Tips',
    author: 'Jake Morrison',
    date: 'Oct 18, 2024',
    readTime: '6 min read',
    icon: Dumbbell,
    content: [
      'The fear that cardio burns muscle keeps a lot of lifters unhealthily out of breath. The research is clear: moderate cardio does not meaningfully interfere with muscle growth, and it improves the recovery capacity that supports it.',
      'The interference effect is real but overstated. It appears mainly with high volumes of long-duration, high-impact cardio, think marathon training, combined with heavy lifting. Two to four moderate sessions weekly is nowhere near that threshold.',
      'Better cardiovascular fitness means shorter rest periods, more quality sets per session, and faster recovery between training days. Your heart is the engine behind every lift.',
      'To minimize any interference: separate cardio and lifting by at least six hours when possible, favor low-impact options like cycling, rowing, and incline walking, and keep intense cardio away from leg day.',
      'The lifters with the best physiques at Iron Temple almost all do regular cardio. Aim for 150 minutes of moderate work weekly, and treat it as an investment in your training, not a threat to it.',
    ],
  },
];

const extraPosts: Article[] = [
  {
    title: 'Sleep: The Most Underrated Performance Enhancer',
    excerpt: 'Why quality sleep beats any supplement, and the practical habits that help you get more of it.',
    category: 'Recovery',
    author: 'Emily Rodriguez',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    icon: Heart,
    content: [
      'If sleep were a supplement, it would be banned for being too effective. A single week of sleeping under six hours measurably reduces strength output, reaction time, and glucose tolerance.',
      'Most muscle repair happens during deep sleep, when growth hormone release peaks. Cutting sleep short literally cuts your recovery short, no matter how well you eat and train.',
      'Build a wind-down routine: dim lights an hour before bed, keep your bedroom cool, and put screens away 30 minutes before sleep. Consistency of sleep and wake times matters more than any single night.',
      'Caffeine has a half-life of five to six hours. That 4 PM pre-workout is still circulating at 10 PM. If you train in the evening, consider a caffeine-free session.',
      'Track how you feel, not just how long you sleep. Waking without an alarm feeling rested is the real target. Most hard-training members need 7.5 to 9 hours to fully recover.',
    ],
  },
  {
    title: 'How to Break Through a Weight Loss Plateau',
    excerpt: 'Stalled progress is normal. Here is the systematic approach our coaches use to get the scale moving again.',
    category: 'Training Tips',
    author: 'Sarah Chen',
    date: 'Oct 12, 2024',
    readTime: '7 min read',
    icon: TrendingUp,
    content: [
      'Every successful weight loss journey includes plateaus. Your body is an adaptive machine: as you lose weight, your maintenance calories drop and your movement efficiency improves. What worked at day one will not work forever.',
      'First, audit before you adjust. Most plateaus are tracking drift: portions creep up, weekend calories go uncounted, and liquid calories sneak in. Two weeks of honest logging usually reveals the answer.',
      'If your tracking is genuinely tight, make one change at a time. Reduce daily intake by 100 to 150 calories, or add 2,000 daily steps. Small levers are sustainable levers.',
      'Protect your muscle while cutting. Keep protein high and continue strength training. Losing muscle lowers your metabolism and makes every future plateau harder.',
      'Finally, consider a diet break: one to two weeks at maintenance calories. It restores training energy, normalizes hunger hormones, and makes the next phase of loss more productive. Plateaus are part of the process, not the end of it.',
    ],
  },
  {
    title: 'Building Core Strength Beyond Crunches',
    excerpt: 'Your core is more than abs. Train it the way it actually works and watch every other lift improve.',
    category: 'Strength Training',
    author: 'Marcus Steel',
    date: 'Oct 8, 2024',
    readTime: '5 min read',
    icon: TrendingUp,
    content: [
      'The core exists primarily to resist movement, not create it. It braces your spine while your limbs generate force. Training it only with crunches is like training your legs only with leg extensions.',
      'Build your core program around three categories: anti-extension (planks, dead bugs, ab wheel rollouts), anti-rotation (Pallof presses, bird dogs), and anti-lateral-flexion (suitcase carries, side planks).',
      'Loaded carries might be the most functional core work there is. Grab a heavy dumbbell in one hand and walk 40 yards keeping your torso perfectly upright. Your obliques will understand immediately.',
      'Heavy compound lifts are core training too. Squats, deadlifts, and overhead presses demand serious bracing. Learn to breathe and brace properly: big breath into your belly, brace like you are about to be punched, then lift.',
      'Train core two to three times weekly at the end of sessions. Two or three exercises, two to three sets each, is plenty when the quality is high.',
    ],
  },
  {
    title: 'Meal Prep Made Simple: A Beginner\'s System',
    excerpt: 'No more decision fatigue at dinner time. A practical two-hour Sunday routine that covers your whole week.',
    category: 'Nutrition',
    author: 'Dr. James Wilson',
    date: 'Oct 5, 2024',
    readTime: '8 min read',
    icon: Apple,
    content: [
      'The biggest predictor of nutrition success is not willpower, it is environment. When healthy food is ready to eat, you eat healthy food. Meal prep is how you engineer that environment.',
      'Start with a simple framework: two protein options, two carb options, and two vegetable options per week. Chicken thighs and ground turkey, rice and roasted potatoes, broccoli and mixed peppers. That is 8 different meal combinations from six ingredients.',
      'Batch everything in parallel: protein in the oven, carbs on the stove, vegetables roasting on a sheet pan. With a little practice the whole session takes under two hours, including cleanup.',
      'Portion into containers immediately. A food scale removes all guesswork: for most members, 6 to 8 ounces of protein, a fist of carbs, and unlimited vegetables per meal is a great starting template.',
      'Keep flavor rotating with sauces and spices rather than new recipes: salsa, hot sauce, teriyaki, chimichurri. Same ingredients, completely different meals. Boredom, not hunger, is what breaks most diets.',
    ],
  },
];

export default function BlogPage({ basePath }: BlogPageProps) {
  const posts = [...allPosts, ...extraPosts];

  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(NEWSLETTER_KEY)) setSubscribed(true);
    } catch {
      // Storage unavailable -- newsletter still works for this session
    }
  }, []);

  const categories = [
    { name: 'All Posts', count: posts.length },
    ...Array.from(new Set(posts.map((p) => p.category))).map((name) => ({
      name,
      count: posts.filter((p) => p.category === name).length,
    })),
  ];

  const filteredPosts =
    selectedCategory === 'All Posts' ? posts : posts.filter((p) => p.category === selectedCategory);
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const selectCategory = (name: string) => {
    setSelectedCategory(name);
    setVisibleCount(8);
  };

  const handleSubscribe = () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    try {
      window.localStorage.setItem(NEWSLETTER_KEY, trimmed);
    } catch {
      // Storage unavailable -- subscription still shows for this session
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#780000]/20 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[#c1121f]/10 border border-[#c1121f]/20 rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4 text-[#c1121f]" />
              <span className="text-sm font-medium text-[#c1121f]">Fitness Knowledge Hub</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-50 mb-6">
              Fitness Blog &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                Expert Tips
              </span>
            </h1>

            <p className="text-xl text-zinc-400">
              Expert advice, training tips, nutrition guides, and fitness insights
              from our certified trainers and wellness professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#c1121f]/50 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Featured Image */}
              <div className="bg-gradient-to-br from-[#c1121f]/20 to-[#780000]/20 p-12 lg:p-16 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#c1121f] to-[#780000] rounded-full mx-auto mb-6 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-[#fdf0d5]" />
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-[#c1121f] text-zinc-50 rounded-full text-sm font-bold">
                    FEATURED POST
                  </div>
                </div>
              </div>

              {/* Featured Content */}
              <div className="p-8 lg:p-12">
                <div className="inline-flex items-center px-3 py-1 bg-zinc-800 text-[#c1121f] rounded-full text-xs font-semibold mb-4">
                  {featuredPost.category}
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-zinc-50 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-zinc-400 leading-relaxed mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center space-x-6 text-sm text-zinc-500 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {featuredPost.readTime}
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(featuredPost)}
                  className="px-6 py-3 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#c1121f]/30 transition-all"
                >
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-zinc-50 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => selectCategory(category.name)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                          selectedCategory === category.name
                            ? 'bg-[#c1121f] text-zinc-50'
                            : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span
                          className={`text-xs ${
                            selectedCategory === category.name ? 'text-zinc-200' : 'text-zinc-600'
                          }`}
                        >
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Posts Grid */}
            <div className="flex-1">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-50 mb-2">
                  {selectedCategory === 'All Posts' ? 'Latest Articles' : selectedCategory}
                </h2>
                <p className="text-zinc-400">
                  {selectedCategory === 'All Posts'
                    ? 'Stay informed with our latest fitness insights'
                    : `Showing ${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} in ${selectedCategory}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visiblePosts.map((post, index) => {
                  const Icon = post.icon;
                  return (
                    <article key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#c1121f]/50 transition-all group">
                      {/* Post Header */}
                      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 border-b border-zinc-800">
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center px-3 py-1 bg-zinc-950 text-[#c1121f] rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                          <Icon className="h-6 w-6 text-[#c1121f]" />
                        </div>

                        <h3 className="text-xl font-bold text-zinc-50 mb-2 leading-tight group-hover:text-[#c1121f] transition-colors">
                          {post.title}
                        </h3>
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500">{post.date}</span>
                          <button
                            onClick={() => setActiveArticle(post)}
                            className="text-sm font-semibold text-[#c1121f] hover:underline"
                          >
                            Read More →
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Load More */}
              <div className="mt-12 text-center">
                {visibleCount < filteredPosts.length ? (
                  <button
                    onClick={() => setVisibleCount(filteredPosts.length)}
                    className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-zinc-50 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    Load More Articles
                  </button>
                ) : (
                  <p className="text-sm text-zinc-500">
                    You're all caught up. Check back weekly for new articles.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-zinc-950 to-[#780000]/10 border border-zinc-800 rounded-2xl p-12 text-center">
            <BookOpen className="h-12 w-12 text-[#c1121f] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-zinc-50 mb-4">
              Get Fitness Tips Delivered Weekly
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join 10,000+ subscribers receiving expert training tips, nutrition advice,
              and exclusive member content straight to their inbox.
            </p>

            {subscribed ? (
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#c1121f]/10 rounded-full mb-4">
                  <CheckCircle2 className="h-7 w-7 text-[#c1121f]" />
                </div>
                <h3 className="text-xl font-bold text-zinc-50 mb-2">You're Subscribed!</h3>
                <p className="text-sm text-zinc-400">
                  Welcome to the Iron Temple newsletter. Your first issue lands in your inbox this week.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    aria-label="Email address for newsletter"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSubscribe();
                    }}
                    className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#c1121f]"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="px-6 py-3 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#c1121f]/30 transition-all whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>

                {emailError ? (
                  <p className="text-xs text-[#c1121f] mt-4">{emailError}</p>
                ) : (
                  <p className="text-xs text-zinc-500 mt-4">
                    No spam. Unsubscribe anytime.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-950 via-[#780000]/20 to-zinc-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-zinc-50 mb-6">
            Ready to Put Knowledge Into Action?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join Iron Temple and work with expert trainers who will guide you every step of the way.
          </p>
          <Link
            href={`${basePath}/join`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" onClick={() => setActiveArticle(null)}></div>
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 bg-zinc-950 text-[#c1121f] rounded-full text-xs font-semibold">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-8 pb-8 pt-6">
              <h2 className="text-3xl font-bold text-zinc-50 mb-4 leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500 mb-6 pb-6 border-b border-zinc-800">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {activeArticle.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {activeArticle.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {activeArticle.readTime}
                </div>
              </div>

              <div className="space-y-4">
                {activeArticle.content.map((paragraph, index) => (
                  <p key={index} className="text-zinc-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`${basePath}/join`}
                  className="flex-1 py-3 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-center hover:shadow-lg hover:shadow-[#c1121f]/30 transition-all"
                >
                  Start Free Trial
                </Link>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="flex-1 py-3 bg-zinc-800 text-zinc-50 rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
                >
                  Back to Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
