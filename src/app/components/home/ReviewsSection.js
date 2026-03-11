'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  ArrowRight,
  Eye,
  X,
  Calendar,
  User,
  Award,
  CheckCircle,
  Package,
  Sparkles,
  Heart,
  Share2
} from 'lucide-react';
import ReviewModal from './ReviewModal';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Fetch reviews from API
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews/featured?limit=6');
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data || []);
        calculateStats(data.data || []);
      } else {
        console.error('Failed to fetch reviews:', data.error);
        const mockReviews = getMockReviews();
        setReviews(mockReviews);
        calculateStats(mockReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
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
      isFeatured: true,
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
      isFeatured: true,
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
    }
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, reviews.length - 2));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, reviews.length - 2)) % Math.max(1, reviews.length - 2));
  };

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setIsViewModalOpen(true);
  };

  const StarRating = ({ rating, size = "w-4 h-4", isHovered = false }) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            animate={isHovered ? {
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
              transition: { 
                duration: 0.5, 
                delay: star * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }
            } : {
              scale: 1,
              rotate: 0
            }}
          >
            <Star
              className={`${size} ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </motion.div>
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
    if (review.userName) return review.userName;
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
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#E39A65] font-semibold text-sm uppercase tracking-wider"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <div className="flex justify-center items-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-[#E39A65] border-t-transparent rounded-full"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header with Animation */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-[#E39A65]/10 text-[#E39A65] rounded-full text-sm font-semibold mb-4"
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              Testimonials
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Join 1000+ satisfied wholesale buyers
            </p>

            {/* Rating Summary with Animation */}
            {totalReviews > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center gap-4 flex-wrap"
              >
                <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
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
              </motion.div>
            )}
          </motion.div>

          {/* Reviews Carousel */}
          {reviews.length > 0 ? (
            <div className="relative px-4 md:px-8">
              {/* Navigation Buttons with Animation */}
              {reviews.length > 3 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevReview}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hidden md:block"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextReview}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hidden md:block"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </>
              )}

              {/* Reviews Grid Container - Fixed overflow */}
              <div className="overflow-hidden">
                <div className="flex -mx-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-3"
                    >
                      {reviews.slice(currentIndex, currentIndex + 3).map((review, idx) => (
                        <motion.div
                          key={review._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                          onHoverStart={() => setHoveredCard(review._id)}
                          onHoverEnd={() => setHoveredCard(null)}
                          className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#E39A65]/30 transition-all duration-300 relative group w-full"
                        >
                          {/* Decorative Background */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-[#E39A65]/5 to-transparent rounded-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredCard === review._id ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />

                          {/* Quote Icon with Animation */}
                          <motion.div
                            animate={{ 
                              rotate: hoveredCard === review._id ? 5 : 0,
                              scale: hoveredCard === review._id ? 1.1 : 1
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-[#E39A65] opacity-20" />
                          </motion.div>

                          {/* Rating with Hover Animation */}
                          <div className="mb-4">
                            <StarRating 
                              rating={review.rating} 
                              isHovered={hoveredCard === review._id}
                            />
                          </div>

                          {/* Review Title - 1 line with ellipsis */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate pr-8" title={review.title}>
                            {review.title || 'Great Experience'}
                          </h3>

                          {/* Review Comment - 2 lines with ellipsis */}
                          <p className="text-gray-600 mb-4 line-clamp-2" title={review.comment}>
                            "{review.comment}"
                          </p>

                          {/* Product Info - 2 lines max */}
                          {getProductName(review) && (
                            <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg border border-gray-100">
                              <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                                {getProductImage(review) ? (
                                  <img
                                    src={getProductImage(review)}
                                    alt={getProductName(review)}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <span className="text-sm text-gray-500 line-clamp-2 flex-1">
                                {getProductName(review)}
                              </span>
                            </div>
                          )}

                          {/* User Info */}
                          <div className="flex items-center gap-3 mt-4">
                            <motion.div 
                              whileHover={{ scale: 1.1 }}
                              className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#E39A65] to-[#d48b54] flex-shrink-0"
                            >
                              {review.user?.avatar ? (
                                <img
                                  src={review.user.avatar}
                                  alt={getUserName(review)}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                                  {getUserInitials(review)}
                                </div>
                              )}
                            </motion.div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 truncate">
                                {getUserName(review)}
                              </p>
                              {getUserCompany(review) && (
                                <p className="text-sm text-gray-500 truncate">
                                  {getUserCompany(review)}
                                </p>
                              )}
                              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(review.createdAt)}
                              </p>
                            </div>
                          </div>

                          {/* View Icon at Bottom Right */}
                          <motion.div 
                            className="absolute bottom-4 right-4"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: hoveredCard === review._id ? 1 : 0,
                              scale: hoveredCard === review._id ? 1 : 0,
                              rotate: hoveredCard === review._id ? 0 : 180
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleViewReview(review)}
                              className="p-2 bg-[#E39A65] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                              title="View full review"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Dots Indicator with Animation */}
              {reviews.length > 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center gap-2 mt-8"
                >
                  {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentIndex(idx * 3)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`h-2 rounded-full transition-all ${
                        currentIndex === idx * 3
                          ? 'w-8 bg-[#E39A65]'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-white rounded-2xl border border-gray-100"
            >
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No reviews yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share your experience!</p>
            </motion.div>
          )}

          {/* Give Feedback Button with Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(227, 154, 101, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
              </motion.span>
              Give Your Feedback
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* View All Reviews Link */}
          {reviews.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center mt-6"
            >
              <Link
                href="/reviews"
                className="text-gray-500 hover:text-[#E39A65] transition-colors text-sm inline-flex items-center gap-1 group"
              >
                View all reviews
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Review Modal for writing reviews */}
      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={() => {
          fetchReviews();
          setIsModalOpen(false);
        }}
      />

      {/* View Details Modal with Animation */}
      <AnimatePresence>
        {isViewModalOpen && selectedReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsViewModalOpen(false)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                {/* Close button with animation */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsViewModalOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>

                <div className="p-6">
                  {/* Header with Animation */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-4 mb-6"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E39A65] to-[#d48b54] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                    >
                      {getUserInitials(selectedReview)}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {getUserName(selectedReview)}
                      </h3>
                      {getUserCompany(selectedReview) && (
                        <p className="text-gray-600">{getUserCompany(selectedReview)}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <StarRating rating={selectedReview.rating} size="w-5 h-5" />
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(selectedReview.createdAt)}
                        </span>
                      </div>
                    </div>
                   
                  </motion.div>

                  {/* Title with Animation */}
                  {selectedReview.title && (
                    <motion.h4 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl font-bold text-gray-900 mb-4"
                    >
                      {selectedReview.title}
                    </motion.h4>
                  )}

                  {/* Comment with Animation */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200"
                  >
                    <p className="text-gray-700 text-sm leading-relaxed">
                      "{selectedReview.comment}"
                    </p>
                  </motion.div>

                  {/* Product Info with Animation */}
                  {getProductName(selectedReview) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100"
                    >
                      <p className="text-xs text-orange-600 mb-2 flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        Product Reviewed
                      </p>
                      <div className="flex items-center gap-3">
                        {getProductImage(selectedReview) && (
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-orange-200"
                          >
                            <img
                              src={getProductImage(selectedReview)}
                              alt={getProductName(selectedReview)}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">
                            {getProductName(selectedReview)}
                          </p>
                          <Link 
                            href={`/productDetails?id=${selectedReview.product?._id}`}
                            className="text-sm text-[#E39A65] hover:underline inline-flex items-center gap-1 mt-1 group"
                          >
                            View Product Details
                            <motion.span
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Stats with Animation */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 pt-4 border-t border-gray-200"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1 text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Verified Purchase
                    </motion.div>
                    {selectedReview.helpfulCount > 0 && (
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1 text-sm text-gray-600 bg-orange-50 px-3 py-1 rounded-full"
                      >
                        <Heart className="w-4 h-4 text-[#E39A65]" />
                        {selectedReview.helpfulCount} found this helpful
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Admin Response with Animation */}
                  {selectedReview.response && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <p className="text-xs font-medium text-blue-700 mb-2 flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        Response from seller
                      </p>
                      <p className="text-sm text-blue-800">{selectedReview.response.text}</p>
                      <p className="text-xs text-blue-600 mt-2">
                        {formatDate(selectedReview.response.respondedAt)}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}