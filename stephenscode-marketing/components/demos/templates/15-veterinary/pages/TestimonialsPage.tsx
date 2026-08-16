import React from 'react';
import { Star, Quote, Heart, ThumbsUp, Award, TrendingUp, Play, Pause, ChevronLeft, ChevronRight, X, CheckCircle } from 'lucide-react';

interface Testimonial {
  name: string;
  pet: string;
  image: string;
  rating: number;
  date: string;
  review: string;
  service: string;
}

const VISITOR_REVIEWS_KEY = 'vet-demo-visitor-reviews';

const petTypeEmoji: Record<string, string> = {
  dog: '\u{1F436}',
  cat: '\u{1F431}',
  other: '\u{1F43E}',
};

const petTypeLabel: Record<string, string> = {
  dog: 'Dog',
  cat: 'Cat',
  other: 'Pet',
};

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function TestimonialsPage({ onNavigate, colors }: TestimonialsPageProps) {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      pet: 'Max (Golden Retriever, 8 years)',
      image: '🐕',
      rating: 5,
      date: 'November 2024',
      review: 'Dr. Martinez and her team saved Max\'s life during a bloat emergency at 2am. They responded immediately, performed emergency surgery, and kept us updated throughout the entire process. Max made a full recovery thanks to their expertise and compassionate care. We cannot thank them enough!',
      service: 'Emergency Surgery'
    },
    {
      name: 'Michael Chen',
      pet: 'Whiskers (Cat, 12 years)',
      image: '🐱',
      rating: 5,
      date: 'October 2024',
      review: 'Whiskers has severe anxiety at vet visits, but the team at Paws & Care makes every visit stress-free. Dr. Chen takes his time, never rushes, and uses gentle handling techniques. They even let me stay in the room during everything. The low-stress approach has made such a difference for Whiskers.',
      service: 'Senior Wellness Care'
    },
    {
      name: 'Emily Rodriguez',
      pet: 'Luna (Beagle, 5 years)',
      image: '🐶',
      rating: 5,
      date: 'October 2024',
      review: 'Luna needed extensive dental work, and I was nervous about the anesthesia. The team explained every step of the process, did thorough pre-surgical bloodwork, and called me with updates during and after the procedure. Luna\'s teeth look amazing, and she\'s so much more comfortable now. Worth every penny!',
      service: 'Dental Surgery'
    },
    {
      name: 'David Thompson',
      pet: 'Buddy (Labrador Mix, 3 years)',
      image: '🦮',
      rating: 5,
      date: 'September 2024',
      review: 'We adopted Buddy from a shelter with some health issues and behavioral problems. Dr. Foster created a comprehensive treatment plan and connected us with a trainer. Six months later, Buddy is healthy, happy, and thriving! The entire team celebrates his progress with us at every visit.',
      service: 'Wellness & Behavioral Support'
    },
    {
      name: 'Jennifer Martinez',
      pet: 'Coco (Poodle, 10 years)',
      image: '🐩',
      rating: 5,
      date: 'September 2024',
      review: 'Coco has diabetes, and managing it was overwhelming at first. Dr. Thompson taught us how to check her blood sugar and administer insulin. They\'re always available when I have questions, and they\'ve helped us keep Coco\'s diabetes well-controlled. She\'s doing great!',
      service: 'Chronic Disease Management'
    },
    {
      name: 'Robert Kim',
      pet: 'Shadow (German Shepherd, 7 years)',
      image: '🐕‍🦺',
      rating: 5,
      date: 'August 2024',
      review: 'Shadow tore his ACL, and Dr. Kim performed the surgery. The orthopedic care and rehabilitation plan were exceptional. They checked on him multiple times during recovery, and now he\'s back to running and playing. Dr. Kim\'s expertise in orthopedics is outstanding.',
      service: 'Orthopedic Surgery'
    },
    {
      name: 'Amanda Foster',
      pet: 'Mittens (Cat, 14 years)',
      image: '🐈',
      rating: 5,
      date: 'August 2024',
      review: 'Mittens is a senior cat with kidney disease, arthritis, and hyperthyroidism. The team created a comprehensive care plan that addresses all her conditions. They\'re so patient and gentle with her, and they truly care about her quality of life. We\'re so grateful for their expertise in senior pet care.',
      service: 'Senior Pet Care'
    },
    {
      name: 'Lisa Anderson',
      pet: 'Charlie (Yorkie, 2 years)',
      image: '🐕',
      rating: 5,
      date: 'July 2024',
      review: 'Charlie ate a sock (of course), and needed emergency surgery to remove it. The team was incredible. They got us in right away, explained all the options, and worked with our pet insurance. Charlie recovered perfectly, and they even called to check on him several times after surgery.',
      service: 'Emergency Foreign Body Removal'
    },
    {
      name: 'Thomas Wright',
      pet: 'Stella (Mixed Breed, 9 years)',
      image: '🐶',
      rating: 5,
      date: 'July 2024',
      review: 'Stella had a mysterious skin condition that other vets couldn\'t diagnose. Dr. Rodriguez ran specialized tests, identified the allergen, and created a treatment plan. Stella\'s skin is finally healthy after months of suffering. Dr. Rodriguez\'s dermatology expertise made all the difference.',
      service: 'Dermatology'
    },
    {
      name: 'Maria Garcia',
      pet: 'Pepper (Chihuahua, 6 years)',
      image: '🐕',
      rating: 5,
      date: 'June 2024',
      review: 'As a first-time dog owner, I had so many questions. The team has been incredibly patient and educational. They never make me feel silly for asking questions, and they always take time to explain things thoroughly. Pepper gets excellent care, and I\'ve learned so much!',
      service: 'Preventive Care & Education'
    },
    {
      name: 'James Wilson',
      pet: 'Milo (Tabby Cat, 4 years)',
      image: '🐈',
      rating: 5,
      date: 'June 2024',
      review: 'Milo blocked (couldn\'t urinate) on a Sunday evening, a true emergency. I called the emergency line, and Dr. Martinez met us at the clinic within 20 minutes. She unblocked him, got him stabilized, and he stayed for monitoring. The 24/7 emergency service literally saved his life.',
      service: '24/7 Emergency Care'
    },
    {
      name: 'Patricia Brown',
      pet: 'Rocky (Bulldog, 5 years)',
      image: '🐕',
      rating: 5,
      date: 'May 2024',
      review: 'Rocky has breathing issues common in bulldogs. Dr. Chen monitors him closely and has helped us manage his condition with medications and lifestyle changes. They\'re always careful about anesthesia for his dental cleanings and take extra precautions. We trust them completely with Rocky\'s specialized needs.',
      service: 'Breed-Specific Care'
    },
  ];

  const stats = [
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '500+', label: 'Five-Star Reviews', icon: Award },
    { number: '98%', label: 'Client Satisfaction', icon: ThumbsUp },
    { number: '2000+', label: 'Happy Pet Families', icon: Heart },
  ];

  // Featured stories player state
  const featuredStories = testimonials.slice(0, 5);
  const [storyIndex, setStoryIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [platformModal, setPlatformModal] = React.useState<string | null>(null);

  // Visitor-submitted reviews (persisted in this browser)
  const [visitorReviews, setVisitorReviews] = React.useState<Testimonial[]>([]);
  const [reviewModalOpen, setReviewModalOpen] = React.useState(false);
  const [reviewSubmitted, setReviewSubmitted] = React.useState(false);
  const [reviewDraft, setReviewDraft] = React.useState({
    name: '',
    petName: '',
    petType: 'dog',
    service: 'Wellness Exam',
    rating: 5,
    review: '',
  });

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(VISITOR_REVIEWS_KEY);
      if (saved) {
        setVisitorReviews(JSON.parse(saved) as Testimonial[]);
      }
    } catch {
      // Corrupted saved data -- start with no visitor reviews
    }
  }, []);

  const openReviewModal = () => {
    setReviewSubmitted(false);
    setReviewDraft({ name: '', petName: '', petType: 'dog', service: 'Wellness Exam', rating: 5, review: '' });
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = petTypeLabel[reviewDraft.petType] || 'Pet';
    const newReview: Testimonial = {
      name: reviewDraft.name.trim(),
      pet: reviewDraft.petName.trim() ? `${reviewDraft.petName.trim()} (${typeLabel})` : typeLabel,
      image: petTypeEmoji[reviewDraft.petType] || petTypeEmoji.other,
      rating: reviewDraft.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      review: reviewDraft.review.trim(),
      service: reviewDraft.service,
    };
    const next = [newReview, ...visitorReviews];
    setVisitorReviews(next);
    try {
      window.localStorage.setItem(VISITOR_REVIEWS_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable -- review still shows for this session
    }
    setReviewSubmitted(true);
  };

  const allTestimonials = [...visitorReviews, ...testimonials];

  React.useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStoryIndex((current) => (current + 1) % featuredStories.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [playing, featuredStories.length]);

  const goToStory = (delta: number) => {
    setStoryIndex((current) => (current + delta + featuredStories.length) % featuredStories.length);
  };

  const platformReviews: Record<string, { name: string; pet: string; text: string }[]> = {
    'Google Reviews': [
      { name: 'Sarah J.', pet: 'Max the Golden Retriever', text: 'Emergency surgery at 2am and Max made a full recovery. This team is incredible.' },
      { name: 'James W.', pet: 'Milo the Tabby', text: 'Dr. Martinez met us at the clinic within 20 minutes on a Sunday night. Lifesavers, literally.' },
      { name: 'Maria G.', pet: 'Pepper the Chihuahua', text: 'Patient, educational, and never rushed. Best vet experience we have had as first-time owners.' },
    ],
    'Yelp': [
      { name: 'Emily R.', pet: 'Luna the Beagle', text: 'Dental work went perfectly. They called with updates during and after the procedure.' },
      { name: 'Robert K.', pet: 'Shadow the German Shepherd', text: 'ACL surgery and rehab plan were exceptional. Shadow is back to running and playing.' },
      { name: 'Lisa A.', pet: 'Charlie the Yorkie', text: 'Charlie ate a sock and needed emergency surgery. They got us in right away and worked with our insurance.' },
    ],
    'Facebook': [
      { name: 'Michael C.', pet: 'Whiskers the Cat', text: 'The low-stress handling has completely changed vet visits for our anxious cat.' },
      { name: 'Patricia B.', pet: 'Rocky the Bulldog', text: 'They understand bulldog breathing issues and take extra precautions. We trust them completely.' },
      { name: 'David T.', pet: 'Buddy the Lab Mix', text: 'From shelter dog with health issues to thriving family member. The whole team celebrates his progress.' },
    ],
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section style={{ backgroundColor: colors.primary }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">What Pet Parents Are Saying</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Real reviews from real families who trust us with their beloved pets
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.accent + '30' }}>
                    <Icon className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <p className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
                    {stat.number}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg transition-all overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="p-6 border-b-4" style={{ borderBottomColor: colors.accent }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{testimonial.image}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1" style={{ color: colors.primary }}>
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{testimonial.pet}</p>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.accent }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: colors.secondary, color: 'white' }}>
                    {testimonial.service}
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <Quote className="w-8 h-8 mb-3 opacity-20" style={{ color: colors.primary }} />
                  <p className="text-gray-700 leading-relaxed mb-4 flex-1">
                    {testimonial.review}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Why Families Choose Paws & Care
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These themes appear consistently in our reviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Compassionate Care',
                description: 'Gentle, loving treatment that puts anxious pets at ease',
                icon: Heart
              },
              {
                title: 'Expert Veterinarians',
                description: 'Board-certified doctors with advanced training and specialties',
                icon: Award
              },
              {
                title: 'Clear Communication',
                description: 'Thorough explanations and patience with all questions',
                icon: TrendingUp
              },
              {
                title: '24/7 Availability',
                description: 'Emergency services when pets need us most, day or night',
                icon: Star
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl text-center hover:shadow-lg transition-all"
                  style={{ backgroundColor: colors.accent + '20' }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.secondary }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Stories Player */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
              Featured Client Stories
            </h2>

            <div className="aspect-video bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl mb-6 relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 text-white">
                <div className="text-5xl mb-4">{featuredStories[storyIndex].image}</div>
                <div className="flex justify-center mb-3">
                  {[...Array(featuredStories[storyIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.accent }} />
                  ))}
                </div>
                <p className="text-sm md:text-lg text-teal-50 italic leading-relaxed max-w-2xl mb-4 line-clamp-4">
                  "{featuredStories[storyIndex].review}"
                </p>
                <p className="font-bold">{featuredStories[storyIndex].name}</p>
                <p className="text-sm text-teal-200">{featuredStories[storyIndex].pet}</p>
              </div>

              {/* Player Controls */}
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
                <button
                  onClick={() => goToStory(-1)}
                  aria-label="Previous story"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPlaying(!playing)}
                  aria-label={playing ? 'Pause story slideshow' : 'Play story slideshow'}
                  className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
                >
                  {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
                <button
                  onClick={() => goToStory(1)}
                  aria-label="Next story"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Dots */}
              <div className="absolute top-4 left-0 right-0 flex justify-center gap-2">
                {featuredStories.map((story, i) => (
                  <button
                    key={i}
                    onClick={() => setStoryIndex(i)}
                    aria-label={`Go to story from ${story.name}`}
                    className={`h-2 rounded-full transition-all ${i === storyIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Press play to browse featured stories from our client families. Want to share your experience? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Review Platforms */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
            Find Us On Review Platforms
          </h2>
          <p className="text-gray-600 mb-8">
            Read more reviews and share your experience on these platforms
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Google Reviews', rating: '4.9/5', reviews: '250+ reviews' },
              { name: 'Yelp', rating: '5/5', reviews: '150+ reviews' },
              { name: 'Facebook', rating: '4.9/5', reviews: '200+ reviews' }
            ].map((platform, index) => (
              <button
                key={index}
                onClick={() => setPlatformModal(platform.name)}
                className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
                style={{ backgroundColor: colors.accent + '20' }}
              >
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" style={{ color: colors.accent }} />
                  ))}
                </div>
                <h3 className="font-bold text-xl mb-2" style={{ color: colors.primary }}>
                  {platform.name}
                </h3>
                <p className="text-2xl font-bold mb-1" style={{ color: colors.secondary }}>
                  {platform.rating}
                </p>
                <p className="text-sm text-gray-600 mb-3">{platform.reviews}</p>
                <span className="text-sm font-semibold underline" style={{ color: colors.primary }}>
                  Read Recent Reviews
                </span>
              </button>
            ))}
          </div>

          {/* Platform Reviews Modal */}
          {platformModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
              onClick={() => setPlatformModal(null)}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto text-left"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={`Recent reviews on ${platformModal}`}
              >
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
                  <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                    Recent Reviews on {platformModal}
                  </h3>
                  <button
                    onClick={() => setPlatformModal(null)}
                    aria-label="Close reviews"
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {(platformReviews[platformModal] || []).map((review, i) => (
                    <div key={i} className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-current" style={{ color: colors.accent }} />
                        ))}
                      </div>
                      <p className="text-gray-800 mb-3 leading-relaxed">"{review.text}"</p>
                      <p className="text-sm font-semibold" style={{ color: colors.primary }}>
                        {review.name}
                      </p>
                      <p className="text-xs text-gray-500">{review.pet}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setPlatformModal(null);
                      onNavigate('contact');
                    }}
                    className="w-full px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-all"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Book Your First Visit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Experience the Paws & Care Difference
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Join hundreds of happy pet families who trust us with their beloved companions
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full font-semibold text-gray-800 hover:opacity-90 transition-all shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your First Visit
            </button>
            <button
              onClick={() => onNavigate('new-patients')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all"
            >
              New Patient Info
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-teal-400">
            <p className="text-teal-100 mb-4">Have a great experience? We'd love to hear about it!</p>
            <button
              onClick={openReviewModal}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full font-medium hover:bg-white/30 transition-all"
            >
              Leave a Review
            </button>
          </div>
        </div>
      </section>

      {/* Leave a Review Modal */}
      {reviewModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setReviewModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Leave a review"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                Share Your Experience
              </h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                aria-label="Close review form"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
                  Thank You!
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your review has been posted. You can see it at the top of the reviews on this page.
                </p>
                <button
                  onClick={() => setReviewModalOpen(false)}
                  className="px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-all"
                  style={{ backgroundColor: colors.secondary }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="vet-review-name" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Your Name *
                  </label>
                  <input
                    id="vet-review-name"
                    type="text"
                    value={reviewDraft.name}
                    onChange={(e) => setReviewDraft({ ...reviewDraft, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vet-review-pet-name" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                      Pet's Name
                    </label>
                    <input
                      id="vet-review-pet-name"
                      type="text"
                      value={reviewDraft.petName}
                      onChange={(e) => setReviewDraft({ ...reviewDraft, petName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <label htmlFor="vet-review-pet-type" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                      Pet Type
                    </label>
                    <select
                      id="vet-review-pet-type"
                      value={reviewDraft.petType}
                      onChange={(e) => setReviewDraft({ ...reviewDraft, petType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                    >
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="vet-review-service" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Service Received
                  </label>
                  <select
                    id="vet-review-service"
                    value={reviewDraft.service}
                    onChange={(e) => setReviewDraft({ ...reviewDraft, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                  >
                    <option value="Wellness Exam">Wellness Exam</option>
                    <option value="Vaccinations">Vaccinations</option>
                    <option value="Dental Care">Dental Care</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Emergency Care">Emergency Care</option>
                    <option value="Boarding">Boarding</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <span className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Your Rating *
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewDraft({ ...reviewDraft, rating: star })}
                        aria-label={`Rate ${star} star${star === 1 ? '' : 's'}`}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className="w-8 h-8"
                          style={{ color: star <= reviewDraft.rating ? colors.accent : '#d1d5db' }}
                          fill={star <= reviewDraft.rating ? 'currentColor' : 'none'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="vet-review-text" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Your Review *
                  </label>
                  <textarea
                    id="vet-review-text"
                    value={reviewDraft.review}
                    onChange={(e) => setReviewDraft({ ...reviewDraft, review: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell other pet parents about your experience..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-all"
                  style={{ backgroundColor: colors.primary }}
                >
                  Post Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
