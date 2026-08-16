import React, { useEffect, useState } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquare, TrendingUp, X, Play } from 'lucide-react';

interface ReviewsPageProps {
  onNavigate: (page: string) => void;
}

interface Review {
  name: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  text: string;
  verified: boolean;
}

interface VideoTestimonial {
  customer: string;
  service: string;
  transcript: string;
}

const REVIEWS_STORAGE_KEY = 'plumbing-demo-reviews';

const videoTestimonials: VideoTestimonial[] = [
  {
    customer: 'Karen Mitchell',
    service: 'Whole House Repipe',
    transcript:
      'We bought a 1970s house knowing the plumbing needed work. Premier Plumbing walked us through every option, gave us a fixed price up front, and finished the whole repipe in four days. The crew covered our floors, cleaned up every evening, and the water pressure now is night and day. I would recommend them to anyone.'
  },
  {
    customer: 'Steve Douglas',
    service: 'Emergency Sewer Backup',
    transcript:
      'Our basement started backing up on a holiday weekend. I called three companies and Premier was the only one that answered with a real person. The technician was here in about 45 minutes, cleared the main line, and showed me the camera footage so I could see exactly what happened. No holiday surcharge either.'
  },
  {
    customer: 'Angela Reyes',
    service: 'Tankless Water Heater',
    transcript:
      'We switched to a tankless water heater on their recommendation and it has been fantastic. They handled the permit, the installation took one day, and they came back a week later just to make sure everything was dialed in. That kind of follow-up is why we use them for everything now.'
  }
];

const defaultReviews: Review[] = [
    {
      name: 'Sarah Johnson',
      location: 'Downtown',
      rating: 5,
      date: 'October 28, 2024',
      service: 'Emergency Leak Repair',
      text: 'Had a burst pipe at 2 AM and they were here within 30 minutes! The technician was professional, explained everything clearly, and had the leak fixed in no time. The pricing was fair and there were no hidden charges. Highly recommend for emergency service!',
      verified: true
    },
    {
      name: 'Mike Roberts',
      location: 'West Side',
      rating: 5,
      date: 'October 25, 2024',
      service: 'Water Heater Installation',
      text: 'Excellent service from start to finish. They helped me choose the right water heater for my home, the installation was quick and clean, and they even hauled away my old unit. The technician showed me how to maintain it properly. Couldn\'t be happier!',
      verified: true
    },
    {
      name: 'Emily Chen',
      location: 'North Hills',
      rating: 5,
      date: 'October 22, 2024',
      service: 'Drain Cleaning',
      text: 'We had a recurring drain problem that two other companies couldn\'t solve. Premier Plumbing found the root cause with their camera inspection and fixed it permanently. It\'s been six months with no issues. Worth every penny!',
      verified: true
    },
    {
      name: 'David Martinez',
      location: 'East End',
      rating: 5,
      date: 'October 18, 2024',
      service: 'Bathroom Remodel',
      text: 'They replumbed our entire master bathroom during a remodel. The work was impeccable, they coordinated perfectly with our contractor, and stayed on schedule. Very professional team and great communication throughout the project.',
      verified: true
    },
    {
      name: 'Jennifer Wilson',
      location: 'Suburbs',
      rating: 5,
      date: 'October 15, 2024',
      service: 'Sewer Line Repair',
      text: 'Needed a sewer line replacement and was dreading the cost and mess. They offered trenchless repair which saved my landscaping and was much more affordable. The entire process was smooth and they cleaned up perfectly. Highly professional!',
      verified: true
    },
    {
      name: 'Robert Taylor',
      location: 'South District',
      rating: 5,
      date: 'October 12, 2024',
      service: 'Commercial Plumbing',
      text: 'We use them for all plumbing at our restaurant. They\'re always responsive, work around our schedule, and never let us down. Recently had an emergency on a Saturday night and they had us back in business within two hours. Couldn\'t ask for better service!',
      verified: true
    },
    {
      name: 'Lisa Anderson',
      location: 'Downtown',
      rating: 5,
      date: 'October 8, 2024',
      service: 'Leak Detection',
      text: 'High water bills led us to call for leak detection. Their technician used special equipment to find a hidden slab leak without tearing up my floors. Fixed the same day! Saved us hundreds on water bills. Great investment in their service.',
      verified: true
    },
    {
      name: 'James Brown',
      location: 'West Side',
      rating: 5,
      date: 'October 5, 2024',
      service: 'Fixture Installation',
      text: 'Installed a new kitchen faucet and garbage disposal. The technician was very knowledgeable, gave great recommendations, and the installation was perfect. Cleaned up completely when done. Fair pricing and excellent work quality!',
      verified: true
    },
    {
      name: 'Maria Garcia',
      location: 'North Hills',
      rating: 5,
      date: 'October 1, 2024',
      service: 'Pipe Replacement',
      text: 'Had old galvanized pipes replaced with PEX throughout the house. The team was courteous, kept the work area clean, and finished faster than expected. Water pressure is amazing now! Very happy with the quality of work and professionalism.',
      verified: true
    },
    {
      name: 'Thomas Lee',
      location: 'East End',
      rating: 5,
      date: 'September 28, 2024',
      service: 'Water Heater Repair',
      text: 'Water heater stopped working on a Sunday. They came out the same day, diagnosed the problem, and had the parts on the truck. Fixed in an hour and no overtime charges! This is the kind of honest, reliable service you can trust.',
      verified: true
    },
    {
      name: 'Patricia White',
      location: 'Suburbs',
      rating: 5,
      date: 'September 25, 2024',
      service: 'Gas Line Installation',
      text: 'Needed a gas line run for a new stove. They handled all the permits, did the work professionally, and passed inspection on the first try. The technician was very safety-conscious and explained everything clearly. Great experience!',
      verified: true
    },
    {
      name: 'Daniel Harris',
      location: 'South District',
      rating: 5,
      date: 'September 20, 2024',
      service: 'Whole House Repipe',
      text: 'Major job: complete house repipe. The team was incredible. Minimal disruption, daily cleanup, and the quality is outstanding. They even found and fixed some issues from the original construction. Money well spent for peace of mind!',
      verified: true
    }
  ];

const platformReviews = [
  { platform: 'Google', rating: 4.9, count: 287 },
  { platform: 'Yelp', rating: 4.8, count: 156 },
  { platform: 'Facebook', rating: 5.0, count: 203 },
  { platform: 'BBB', rating: 'A+', count: 89 }
];

const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (stored) setUserReviews(JSON.parse(stored) as Review[]);
    } catch {
      // Corrupted store -- start fresh
    }
  }, []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    location: '',
    service: '',
    rating: 5,
    text: ''
  });

  const reviews: Review[] = [...userReviews, ...defaultReviews];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      name: reviewForm.name.trim(),
      location: reviewForm.location.trim() || 'Metro Area',
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      service: reviewForm.service.trim() || 'General Plumbing',
      text: reviewForm.text.trim(),
      verified: false
    };
    const updated = [newReview, ...userReviews];
    setUserReviews(updated);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    }
    setReviewSubmitted(true);
  };

  const closeReviewForm = () => {
    setShowReviewForm(false);
    setReviewSubmitted(false);
    setReviewForm({ name: '', location: '', service: '', rating: 5, text: '' });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      // Clipboard unavailable -- leave the share links as the path forward
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://premierplumbing.example.com';

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0466c8] to-[#0353a4] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-12 w-12 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h1 className="text-5xl font-bold mb-6">Customer Reviews & Testimonials</h1>
            <p className="text-xl text-blue-100 mb-4">
              Don't just take our word for it. See what our customers have to say about their
              experience with Premier Plumbing Pros.
            </p>
            <div className="flex items-center justify-center space-x-4 text-2xl">
              <span className="font-bold">4.9/5</span>
              <span className="text-blue-100">|</span>
              <span>500+ Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Reviews */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformReviews.map((platform, index) => (
              <div key={index} className="text-center">
                <h3 className="font-bold text-gray-900 mb-2">{platform.platform}</h3>
                <div className="flex justify-center mb-2">
                  {platform.rating === 'A+' ? (
                    <span className="text-3xl font-bold text-[#0466c8]">{platform.rating}</span>
                  ) : (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(platform.rating as number)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">{platform.count} reviews</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <TrendingUp className="h-12 w-12 text-[#0466c8] mx-auto mb-3" />
              <p className="text-4xl font-bold text-gray-900 mb-2">98%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div>
              <ThumbsUp className="h-12 w-12 text-[#0466c8] mx-auto mb-3" />
              <p className="text-4xl font-bold text-gray-900 mb-2">95%</p>
              <p className="text-gray-600">Would Recommend</p>
            </div>
            <div>
              <MessageSquare className="h-12 w-12 text-[#0466c8] mx-auto mb-3" />
              <p className="text-4xl font-bold text-gray-900 mb-2">500+</p>
              <p className="text-gray-600">Total Reviews</p>
            </div>
            <div>
              <CheckCircle className="h-12 w-12 text-[#0466c8] mx-auto mb-3" />
              <p className="text-4xl font-bold text-gray-900 mb-2">50K+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                  {review.verified && (
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-green-600 font-semibold">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-[#0466c8] font-semibold mb-2">{review.service}</p>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Video Testimonials</h2>
            <p className="text-xl text-gray-600">Hear directly from our satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoTestimonials.map((video) => (
              <div
                key={video.customer}
                onClick={() => setActiveVideo(video)}
                className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-[#0466c8] to-[#023e7d] flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="font-semibold">{video.customer}</p>
                    <p className="text-sm text-blue-200">{video.service}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">Read this customer's full story about their experience with Premier Plumbing Pros</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave Review CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 md:p-12 text-white text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We'd love to hear about your experience with Premier Plumbing Pros. Your feedback helps
              us improve and helps others make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Write a Review
              </button>
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors"
              >
                Share on Social Media
              </button>
            </div>
            {showShareMenu && (
              <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 max-w-md mx-auto">
                <p className="font-semibold mb-4">Share Premier Plumbing Pros:</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#0466c8] px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Great plumbing service from Premier Plumbing Pros!')}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#0466c8] px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Twitter
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="bg-white text-[#0466c8] px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {linkCopied ? 'Link Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Reviews Matter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Our Reviews Speak Volumes
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our reviews aren't just numbers. They represent thousands of satisfied customers who
                have trusted us with their plumbing needs over the past 25 years.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Verified Reviews</h3>
                    <p className="text-gray-600">
                      All our reviews are from verified customers who have used our services.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Consistent Excellence</h3>
                    <p className="text-gray-600">
                      Our high ratings across multiple platforms show consistent quality service.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Real Experiences</h3>
                    <p className="text-gray-600">
                      Detailed reviews from customers sharing their actual experiences with our team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Service Quality</h3>
                  <span className="text-2xl font-bold text-[#0466c8]">4.9/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-[#0466c8] h-3 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Professionalism</h3>
                  <span className="text-2xl font-bold text-[#0466c8]">5.0/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-[#0466c8] h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Value for Money</h3>
                  <span className="text-2xl font-bold text-[#0466c8]">4.8/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-[#0466c8] h-3 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Response Time</h3>
                  <span className="text-2xl font-bold text-[#0466c8]">4.9/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-[#0466c8] h-3 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#0466c8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Our Award-Winning Service</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers. Schedule your service today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Schedule Service
            </button>
            <a
              href="tel:5557658237"
              className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors inline-block"
            >
              Call (555) 765-8237
            </a>
          </div>
        </div>
      </section>

      {/* Write a Review Modal */}
      {showReviewForm && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={closeReviewForm}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#0466c8] to-[#0353a4] p-6 text-white flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">Write a Review</h3>
                <p className="text-blue-100">Tell us about your experience</p>
              </div>
              <button
                onClick={closeReviewForm}
                aria-label="Close review form"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {reviewSubmitted ? (
              <div className="p-8 text-center">
                <CheckCircle className="h-14 w-14 text-green-600 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600 mb-6">
                  Your review has been posted. We appreciate you taking the time to share your experience.
                </p>
                <button
                  onClick={closeReviewForm}
                  className="bg-[#0466c8] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="plumbing-review-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    id="plumbing-review-name"
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="plumbing-review-location" className="block text-sm font-medium text-gray-700 mb-2">
                    Neighborhood
                  </label>
                  <input
                    id="plumbing-review-location"
                    type="text"
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                    placeholder="Downtown"
                  />
                </div>
                <div>
                  <label htmlFor="plumbing-review-service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Received
                  </label>
                  <select
                    id="plumbing-review-service"
                    value={reviewForm.service}
                    onChange={(e) => setReviewForm({ ...reviewForm, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option>Drain Cleaning</option>
                    <option>Leak Detection</option>
                    <option>Water Heater Installation</option>
                    <option>Water Heater Repair</option>
                    <option>Pipe Repair</option>
                    <option>Fixture Installation</option>
                    <option>Sewer Line Repair</option>
                    <option>Emergency Service</option>
                    <option>Commercial Plumbing</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-2">Your Rating *</p>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            star <= reviewForm.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="plumbing-review-text" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    id="plumbing-review-text"
                    required
                    rows={4}
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                    placeholder="Tell us about your experience..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0466c8] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
                >
                  Post Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video Testimonial Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Play className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{activeVideo.customer}</h3>
                    <p className="text-blue-200 text-sm">{activeVideo.service}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close testimonial"
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold text-[#0466c8] uppercase tracking-wide mb-3">
                Testimonial Transcript
              </p>
              <p className="text-gray-700 italic mb-6">"{activeVideo.transcript}"</p>
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <button
                onClick={() => {
                  setActiveVideo(null);
                  onNavigate('contact');
                }}
                className="w-full bg-[#0466c8] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
              >
                Get the Same Great Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
