import React from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquare, TrendingUp } from 'lucide-react';

interface ReviewsPageProps {
  onNavigate: (page: string) => void;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  const reviews = [
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
      text: 'Major job - complete house repipe. The team was incredible. Minimal disruption, daily cleanup, and the quality is outstanding. They even found and fixed some issues from the original construction. Money well spent for peace of mind!',
      verified: true
    }
  ];

  const platformReviews = [
    { platform: 'Google', rating: 4.9, count: 287 },
    { platform: 'Yelp', rating: 4.8, count: 156 },
    { platform: 'Facebook', rating: 5.0, count: 203 },
    { platform: 'BBB', rating: 'A+', count: 89 }
  ];

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
              Don't just take our word for it - see what our customers have to say about their
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
            {[1, 2, 3].map((video) => (
              <div key={video} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="h-48 bg-gradient-to-br from-[#0466c8] to-[#023e7d] flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="font-semibold">Customer Testimonial {video}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">Watch our customer share their experience with Premier Plumbing Pros</p>
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
              <button className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Write a Review
              </button>
              <button className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors">
                Share on Social Media
              </button>
            </div>
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
                Our reviews aren't just numbers - they represent thousands of satisfied customers who
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
            Join thousands of satisfied customers - schedule your service today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Schedule Service
            </button>
            <button className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors">
              Call (555) 765-8237
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;
