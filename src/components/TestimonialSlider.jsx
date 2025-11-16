
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Jessica M.',
    quote: 'StephensCode built our entire admin system from scratch — and it works beautifully. Highly recommended!',
    rating: 5,
    image: '/assets/customers/jessica.jpg',
  },
  {
    name: 'Marcus T.',
    quote: 'Flat-rate, zero hassle. We got a full client dashboard for less than half what others quoted.',
    rating: 4,
    image: '/assets/customers/marcus.jpg',
  },
  {
    name: 'Ariana G.',
    quote: 'As a small business owner, I needed something reliable without the agency price tag. This was it.',
    rating: 5,
    image: '/assets/customers/ariana.jpg',
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="bg-[#0e0e0e] text-white py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-orange-400 mb-8">What Clients Are Saying</h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1a1a1a] rounded-lg p-8 border border-gray-800 shadow-lg"
            >
              {testimonials[index].image && (
                <img
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <p className="text-lg text-gray-300 italic mb-4">“{testimonials[index].quote}”</p>
              <div className="flex justify-center mb-2">
                {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mr-1" />
                ))}
              </div>
              <p className="text-sm text-gray-400 font-medium">— {testimonials[index].name}</p>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-white transition text-xl">
            <FaChevronLeft />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-white transition text-xl">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
