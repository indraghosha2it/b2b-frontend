'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Star, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  ArrowRight
} from 'lucide-react';
import ReviewModal from './ReviewModal';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Fetch reviews from API
  useEffect(() => {
    fetchReviews();
  }, []);

const fetchReviews = async () => {
  try {
    // Use the public featured reviews endpoint for homepage
    const response = await fetch('http://localhost:5000/api/reviews/featured?limit=6');
    const data = await response.json();
    
    if (data.success) {
      setReviews(data.data || []);
      calculateStats(data.data || []);
    } else {
      console.error('Failed to fetch reviews:', data.error);
      // Use mock data as fallback
      const mockReviews = getMockReviews();
      setReviews(mockReviews);
      calculateStats(mockReviews);
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Fallback to mock data
    const mockReviews = getMockReviews();
    setReviews(mockReviews);
    calculateStats(mockReviews);
  } finally {
    setLoading(false);
  }
};

  const calculateStats = (reviewsData) => {
    if (reviewsData.length === 0) return;
    
    const total = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating((total / reviewsData.length).toFixed(1));
    setTotalReviews(reviewsData.length);
  };

  // Mock data for development
  const getMockReviews = () => [
    {
      _id: '1',
      rating: 5,
      title: 'Excellent quality and service',
      comment: 'The bulk order quality exceeded our expectations. Fast shipping and great communication throughout.',
      createdAt: '2024-01-15T10:00:00Z',
      user: {
        _id: 'u1',
        companyName: 'Fashion Hub Retail',
        contactPerson: 'John Smith',
        email: 'john@example.com'
      },
      userName: 'John Smith',
      userCompany: 'Fashion Hub Retail',
      product: {
        _id: 'p1',
        productName: 'Premium Cotton T-Shirts',
        images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' }]
      }
    },
    {
      _id: '2',
      rating: 5,
      title: 'Best wholesale partner',
      comment: 'We\'ve been ordering for 2 years now. Consistent quality, competitive pricing, and they always deliver on time.',
      createdAt: '2024-01-10T10:00:00Z',
      user: {
        _id: 'u2',
        companyName: 'Urban Styles Boutique',
        contactPerson: 'Sarah Johnson',
        email: 'sarah@example.com'
      },
      userName: 'Sarah Johnson',
      userCompany: 'Urban Styles Boutique',
      product: {
        _id: 'p2',
        productName: 'Hoodies Collection',
        images: [{ url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100' }]
      }
    },
    {
      _id: '3',
      rating: 4,
      title: 'Great products, responsive team',
      comment: 'The MOQ options are flexible and the pricing tiers work well for our growing business.',
      createdAt: '2024-01-05T10:00:00Z',
      user: {
        _id: 'u3',
        companyName: 'Sportswear Pro',
        contactPerson: 'Michael Chen',
        email: 'michael@example.com'
      },
      userName: 'Michael Chen',
      userCompany: 'Sportswear Pro',
      product: {
        _id: 'p3',
        productName: 'Sports Jerseys',
        images: [{ url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=100' }]
      }
    },
    {
      _id: '4',
      rating: 5,
      title: 'Excellent custom branding options',
      comment: 'They helped us with custom logo printing. The samples looked perfect before bulk order.',
      createdAt: '2023-12-28T10:00:00Z',
      user: {
        _id: 'u4',
        companyName: 'Beachwear Co',
        contactPerson: 'Emily Rodriguez',
        email: 'emily@example.com'
      },
      userName: 'Emily Rodriguez',
      userCompany: 'Beachwear Co',
      product: {
        _id: 'p4',
        productName: 'Beachwear Collection',
        images: [{ url: 'https://images.unsplash.com/photo-1503341733017-190157c6e3f6?w=100' }]
      }
    }
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, reviews.length - 2));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, reviews.length - 2)) % Math.max(1, reviews.length - 2));
  };

  const StarRating = ({ rating, size = "w-4 h-4" }) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to get user display name
  const getUserName = (review) => {
    // First check if review has userName field (from our model)
    if (review.userName) {
      return review.userName;
    }
    // Then check populated user object
    if (review.user) {
      if (review.user.contactPerson) return review.user.contactPerson;
      if (review.user.companyName) return review.user.companyName;
      if (review.user.name) return review.user.name;
      if (review.user.email) return review.user.email.split('@')[0];
    }
    return 'Anonymous Buyer';
  };

  // Helper function to get user company
  const getUserCompany = (review) => {
    if (review.userCompany) return review.userCompany;
    if (review.user?.companyName) return review.user.companyName;
    return null;
  };

  // Helper function to get user initials
  const getUserInitials = (review) => {
    const name = getUserName(review);
    return name.charAt(0).toUpperCase();
  };

  // Helper function to get product image
  const getProductImage = (review) => {
    if (review.product?.images && review.product.images.length > 0) {
      return review.product.images[0].url;
    }
    if (review.product?.image) return review.product.image;
    return null;
  };

  // Helper function to get product name
  const getProductName = (review) => {
    if (review.product?.productName) return review.product.productName;
    if (review.product?.name) return review.product.name;
    return null;
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-[#E39A65] font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              What Our Clients Say
            </h2>
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-[#E39A65] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-[#E39A65] font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Join 1000+ satisfied wholesale buyers
            </p>

            {/* Rating Summary */}
            {totalReviews > 0 && (
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
                </div>
               
              </div>
            )}
          </div>

          {/* Reviews Carousel */}
          {reviews.length > 0 ? (
            <div className="relative">
              {/* Navigation Buttons */}
              {reviews.length > 3 && (
                <>
                  <button
                    onClick={prevReview}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hidden md:block"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hidden md:block"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.slice(currentIndex, currentIndex + 3).map((review) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
                  >
                    {/* Quote Icon */}
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-[#E39A65] opacity-20" />

                    {/* Rating */}
                    <div className="mb-4">
                      <StarRating rating={review.rating} />
                    </div>

                    {/* Review Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {review.title || 'Great Experience'}
                    </h3>

                    {/* Review Comment */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      "{review.comment}"
                    </p>

                    {/* Product Info (if available) */}
                    {getProductName(review) && (
                      <div className="flex items-center gap-2 mb-4 p-2 bg-white rounded-lg border border-gray-100">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                          {getProductImage(review) ? (
                            <img
                              src={getProductImage(review)}
                              alt={getProductName(review)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-400">No img</span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          Ordered: {getProductName(review)}
                        </span>
                      </div>
                    )}

                    {/* User Info */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {review.user?.avatar ? (
                          <img
                            src={review.user.avatar}
                            alt={getUserName(review)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#E39A65] flex items-center justify-center text-white font-bold text-lg">
                            {getUserInitials(review)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 truncate">
                          {getUserName(review)}
                        </p>
                        {getUserCompany(review) && (
                          <p className="text-sm text-gray-500 truncate">
                            {getUserCompany(review)}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Dots Indicator */}
              {reviews.length > 3 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx * 3)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentIndex === idx * 3
                          ? 'w-8 bg-[#E39A65]'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No reviews yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share your experience!</p>
            </div>
          )}

          {/* Give Feedback Button */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Give Your Feedback
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* View All Reviews Link */}
          {reviews.length > 0 && (
            <div className="text-center mt-6">
              <Link
                href="/reviews"
                className="text-gray-500 hover:text-[#E39A65] transition-colors text-sm"
              >
                View all reviews →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Review Modal */}
      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={() => {
          fetchReviews();
          setIsModalOpen(false);
        }}
      />
    </>
  );
}