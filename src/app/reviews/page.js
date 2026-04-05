// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Star, 
//   Search, 
//   Filter, 
//   ChevronLeft, 
//   ChevronRight, 
//   Loader2,
//   MessageCircle,
//   CheckCircle,
//   Award,
//   X,
//   SlidersHorizontal,
//   Eye,
//   Calendar,
//   User,
//   Package,
//   Heart,
//   Quote,
//   Sparkles
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// export default function AllReviewsPage() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 9,
//     total: 0,
//     pages: 0
//   });
//   const [filters, setFilters] = useState({
//     rating: '',
//     sort: 'newest',
//     search: ''
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [stats, setStats] = useState({
//     averageRating: 0,
//     totalReviews: 0,
//     ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
//   });
  
//   // Modal state
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   useEffect(() => {
//     fetchReviews();
//     fetchStats();
//   }, [pagination.page, filters]);

//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams({
//         page: pagination.page,
//         limit: pagination.limit,
//         sort: filters.sort === 'highest' ? '-rating' : '-createdAt'
//       });

//       if (filters.rating) {
//         params.append('rating', filters.rating);
//       }

//       if (filters.search) {
//         params.append('search', filters.search);
//       }

//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/reviews/public?${params}`);
//       const data = await response.json();

//       if (data.success) {
//         setReviews(data.data);
//         setPagination(prev => ({
//           ...prev,
//           total: data.pagination.total,
//           pages: data.pagination.pages
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       toast.error('Failed to load reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/reviews/public?limit=1000');
//       const data = await response.json();
      
//       if (data.success) {
//         const allReviews = data.data;
//         const total = allReviews.length;
//         const avgRating = total > 0 
//           ? allReviews.reduce((sum, r) => sum + r.rating, 0) / total 
//           : 0;
        
//         const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//         allReviews.forEach(r => {
//           distribution[r.rating] = (distribution[r.rating] || 0) + 1;
//         });

//         setStats({
//           averageRating: avgRating,
//           totalReviews: total,
//           ratingDistribution: distribution
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       rating: '',
//       sort: 'newest',
//       search: ''
//     });
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const handleViewReview = (review) => {
//     setSelectedReview(review);
//     setIsViewModalOpen(true);
//   };

//   const StarRating = ({ rating, size = "w-4 h-4", isHovered = false }) => (
//     <div className="flex gap-0.5">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <motion.div
//           key={star}
//           animate={isHovered ? {
//             scale: [1, 1.2, 1],
//             rotate: [0, 5, -5, 0],
//             transition: { 
//               duration: 0.5, 
//               delay: star * 0.1,
//               repeat: Infinity,
//               repeatDelay: 2
//             }
//           } : {
//             scale: 1,
//             rotate: 0
//           }}
//         >
//           <Star
//             className={`${size} ${
//               star <= rating
//                 ? 'fill-yellow-400 text-yellow-400'
//                 : 'text-gray-300'
//             }`}
//           />
//         </motion.div>
//       ))}
//     </div>
//   );

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getUserName = (review) => {
//     if (review.userName) return review.userName;
//     if (review.user) {
//       if (review.user.contactPerson) return review.user.contactPerson;
//       if (review.user.companyName) return review.user.companyName;
//     }
//     return 'Anonymous Buyer';
//   };

//   const getUserCompany = (review) => {
//     if (review.userCompany) return review.userCompany;
//     if (review.user?.companyName) return review.user.companyName;
//     return null;
//   };

//   const getUserInitials = (review) => {
//     const name = getUserName(review);
//     return name.charAt(0).toUpperCase();
//   };

//   const getProductName = (review) => {
//     if (review.product?.productName) return review.product.productName;
//     if (review.product?.name) return review.product.name;
//     return null;
//   };

//   const getProductImage = (review) => {
//     if (review.product?.images && review.product.images.length > 0) {
//       return review.product.images[0].url;
//     }
//     return null;
//   };

//   const RatingProgressBar = ({ rating, count, total }) => {
//     const percentage = total > 0 ? (count / total) * 100 : 0;
    
//     return (
//       <div className="flex items-center gap-2 text-sm">
//         <span className="text-gray-600 w-8">{rating}★</span>
//         <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-[#E39A65] rounded-full"
//             style={{ width: `${percentage}%` }}
//           />
//         </div>
//         <span className="text-gray-500 w-8 text-right">{count}</span>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 pt-20">
//         <div className="container mx-auto px-4 max-w-7xl py-8">
//           {/* Header */}
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8"
//           >
//             <h1 className="text-3xl font-bold text-gray-900">All Reviews</h1>
//             <p className="text-gray-600 mt-2">
//               Read what our customers are saying about our products
//             </p>
//           </motion.div>

//           {/* Stats Overview */}
//           {stats.totalReviews > 0 && (
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white rounded-xl border border-gray-200 p-6 mb-8"
//             >
//               <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//                 <div className="flex items-center gap-4">
//                   <div className="text-4xl font-bold text-gray-900">
//                     {stats.averageRating.toFixed(1)}
//                   </div>
//                   <div>
//                     <StarRating rating={Math.round(stats.averageRating)} size="w-5 h-5" />
//                     <p className="text-sm text-gray-500 mt-1">
//                       Based on all reviews
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex-1 space-y-1">
//                   {[5, 4, 3, 2, 1].map(rating => (
//                     <RatingProgressBar
//                       key={rating}
//                       rating={rating}
//                       count={stats.ratingDistribution[rating] || 0}
//                       total={stats.totalReviews}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Filters Bar */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-white rounded-xl border border-gray-200 p-4 mb-6"
//           >
//             <div className="flex flex-col md:flex-row gap-4">
//               {/* Search */}
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search reviews by product or comment..."
//                   value={filters.search}
//                   onChange={(e) => handleFilterChange('search', e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                 />
//               </div>

//               {/* Filter Button (Mobile) */}
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="md:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//                 Filters
//               </button>

//               {/* Desktop Filters */}
//               <div className="hidden md:flex items-center gap-3">
//                 <select
//                   value={filters.rating}
//                   onChange={(e) => handleFilterChange('rating', e.target.value)}
//                   className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white"
//                 >
//                   <option value="">All Ratings</option>
//                   <option value="5">5 Stars</option>
//                   <option value="4">4 Stars</option>
//                   <option value="3">3 Stars</option>
//                   <option value="2">2 Stars</option>
//                   <option value="1">1 Star</option>
//                 </select>

//                 <select
//                   value={filters.sort}
//                   onChange={(e) => handleFilterChange('sort', e.target.value)}
//                   className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="highest">Highest Rated</option>
//                 </select>

//                 {(filters.rating || filters.search) && (
//                   <button
//                     onClick={clearFilters}
//                     className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="w-4 h-4" />
//                     Clear
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Mobile Filters Panel */}
//             {showFilters && (
//               <div className="mt-4 space-y-3 md:hidden">
//                 <select
//                   value={filters.rating}
//                   onChange={(e) => handleFilterChange('rating', e.target.value)}
//                   className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
//                 >
//                   <option value="">All Ratings</option>
//                   <option value="5">5 Stars</option>
//                   <option value="4">4 Stars</option>
//                   <option value="3">3 Stars</option>
//                   <option value="2">2 Stars</option>
//                   <option value="1">1 Star</option>
//                 </select>

//                 <select
//                   value={filters.sort}
//                   onChange={(e) => handleFilterChange('sort', e.target.value)}
//                   className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="highest">Highest Rated</option>
//                 </select>

//                 {(filters.rating || filters.search) && (
//                   <button
//                     onClick={clearFilters}
//                     className="w-full px-4 py-2 text-sm bg-gray-100 rounded-lg text-gray-700"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             )}
//           </motion.div>

//           {/* Reviews Grid */}
//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
//             </div>
//           ) : reviews.length === 0 ? (
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-20 bg-white rounded-xl border border-gray-200"
//             >
//               <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
//               <p className="text-gray-500">Try adjusting your filters or search criteria</p>
//             </motion.div>
//           ) : (
//             <>
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {reviews.map((review, idx) => (
//                   <motion.div
//                     key={review._id}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: idx * 0.1 }}
//                     whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
//                     onHoverStart={() => setHoveredCard(review._id)}
//                     onHoverEnd={() => setHoveredCard(null)}
//                     className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#E39A65]/30 transition-all duration-300 relative group"
//                   >
//                     {/* Decorative Background */}
//                     <motion.div 
//                       className="absolute inset-0 bg-gradient-to-br from-[#E39A65]/5 to-transparent rounded-2xl"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: hoveredCard === review._id ? 1 : 0 }}
//                       transition={{ duration: 0.3 }}
//                     />

//                     {/* Quote Icon */}
//                     <motion.div
//                       animate={{ 
//                         rotate: hoveredCard === review._id ? 5 : 0,
//                         scale: hoveredCard === review._id ? 1.1 : 1
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <Quote className="absolute top-6 right-6 w-8 h-8 text-[#E39A65] opacity-20" />
//                     </motion.div>


//                     {/* Rating */}
//                     <div className="mb-4">
//                       <StarRating 
//                         rating={review.rating} 
//                         isHovered={hoveredCard === review._id}
//                       />
//                     </div>

//                     {/* Title - 1 line */}
//                     {review.title && (
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate pr-8" title={review.title}>
//                         {review.title}
//                       </h3>
//                     )}

//                     {/* Comment - 2 lines */}
//                     <p className="text-gray-600 mb-4 line-clamp-2" title={review.comment}>
//                       "{review.comment}"
//                     </p>

//                     {/* Product Info - 2 lines */}
//                     {getProductName(review) && (
//                       <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg border border-gray-100">
//                         <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
//                           {getProductImage(review) ? (
//                             <img
//                               src={getProductImage(review)}
//                               alt={getProductName(review)}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                               <Package className="w-5 h-5 text-gray-400" />
//                             </div>
//                           )}
//                         </div>
//                         <span className="text-sm text-gray-500 line-clamp-2 flex-1">
//                           {getProductName(review)}
//                         </span>
//                       </div>
//                     )}

//                     {/* User Info */}
//                     <div className="flex items-center gap-3 mt-4">
//                       <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#E39A65] to-[#d48b54] flex-shrink-0">
//                         <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
//                           {getUserInitials(review)}
//                         </div>
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <p className="font-semibold text-gray-900 truncate">
//                           {getUserName(review)}
//                         </p>
//                         {getUserCompany(review) && (
//                           <p className="text-sm text-gray-500 truncate">
//                             {getUserCompany(review)}
//                           </p>
//                         )}
//                         <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//                           <Calendar className="w-3 h-3" />
//                           {formatDate(review.createdAt)}
//                         </p>
//                       </div>
//                     </div>

//                     {/* View Icon at Bottom Right */}
//                     <motion.div 
//                       className="absolute bottom-4 right-4"
//                       initial={{ opacity: 0, scale: 0 }}
//                       animate={{ 
//                         opacity: hoveredCard === review._id ? 1 : 0,
//                         scale: hoveredCard === review._id ? 1 : 0,
//                         rotate: hoveredCard === review._id ? 0 : 180
//                       }}
//                       transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                     >
//                       <motion.button
//                         whileHover={{ scale: 1.1, rotate: 5 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => handleViewReview(review)}
//                         className="p-2 bg-[#E39A65] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
//                         title="View full review"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </motion.button>
//                     </motion.div>

//                     {/* Helpful Count (if any) */}
//                     {review.helpfulCount > 0 && (
//                       <div className="absolute bottom-4 left-4 flex items-center gap-1 text-xs text-gray-400">
//                         <Heart className="w-3 h-3" />
//                         {review.helpfulCount}
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//               </motion.div>

//               {/* Pagination */}
//               {pagination.pages > 1 && (
//                 <motion.div 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="flex items-center justify-between px-6 py-4 mt-8 bg-white rounded-xl border border-gray-200"
//                 >
//                   <p className="text-sm text-gray-500">
//                     Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
//                     {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => handlePageChange(pagination.page - 1)}
//                       disabled={pagination.page === 1}
//                       className="p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </motion.button>
//                     <span className="text-sm text-gray-600">
//                       Page {pagination.page} of {pagination.pages}
//                     </span>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => handlePageChange(pagination.page + 1)}
//                       disabled={pagination.page === pagination.pages}
//                       className="p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* View Details Modal */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedReview && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 overflow-y-auto"
//           >
//             <div className="flex items-center justify-center min-h-screen px-4">
//               {/* Backdrop */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//                 onClick={() => setIsViewModalOpen(false)}
//               />

//               {/* Modal */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: 50 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: 50 }}
//                 transition={{ type: "spring", duration: 0.5 }}
//                 className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//               >
//                 {/* Close button */}
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </motion.button>

//                 <div className="p-6">
//                   {/* Header */}
//                   <motion.div 
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="flex items-start gap-4 mb-6"
//                   >
//                     <motion.div 
//                       whileHover={{ scale: 1.1, rotate: 5 }}
//                       className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E39A65] to-[#d48b54] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
//                     >
//                       {getUserInitials(selectedReview)}
//                     </motion.div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-gray-900">
//                         {getUserName(selectedReview)}
//                       </h3>
//                       {getUserCompany(selectedReview) && (
//                         <p className="text-gray-600">{getUserCompany(selectedReview)}</p>
//                       )}
//                       <div className="flex items-center gap-3 mt-2">
//                         <StarRating rating={selectedReview.rating} size="w-5 h-5" />
//                         <span className="text-sm text-gray-400 flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           {formatDate(selectedReview.createdAt)}
//                         </span>
//                       </div>
//                     </div>
                
//                   </motion.div>

//                   {/* Title */}
//                   {selectedReview.title && (
//                     <motion.h4 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="text-lg font-bold text-gray-900 mb-4"
//                     >
//                       {selectedReview.title}
//                     </motion.h4>
//                   )}

//                   {/* Comment */}
//                   <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200"
//                   >
//                     <p className="text-gray-700 text-sm leading-relaxed">
//                       "{selectedReview.comment}"
//                     </p>
//                   </motion.div>

//                   {/* Product Info */}
//                   {getProductName(selectedReview) && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.4 }}
//                       className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100"
//                     >
//                       <p className="text-xs text-orange-600 mb-2 flex items-center gap-1">
//                         <Package className="w-4 h-4" />
//                         Product Reviewed
//                       </p>
//                       <div className="flex items-center gap-3">
//                         {getProductImage(selectedReview) && (
//                           <motion.div 
//                             whileHover={{ scale: 1.05 }}
//                             className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-orange-200"
//                           >
//                             <img
//                               src={getProductImage(selectedReview)}
//                               alt={getProductName(selectedReview)}
//                               className="w-full h-full object-cover"
//                             />
//                           </motion.div>
//                         )}
//                         <div>
//                           <p className="font-semibold text-gray-900">
//                             {getProductName(selectedReview)}
//                           </p>
//                           <Link 
//                             href={`/productDetails?id=${selectedReview.product?._id}`}
//                             className="text-sm text-[#E39A65] hover:underline inline-flex items-center gap-1 mt-1 group"
//                           >
//                             View Product Details
//                             <motion.span
//                               animate={{ x: [0, 3, 0] }}
//                               transition={{ duration: 1, repeat: Infinity }}
//                             >
//                               →
//                             </motion.span>
//                           </Link>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Stats */}
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="flex items-center gap-4 pt-4 border-t border-gray-200"
//                   >
//                     <motion.div 
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center gap-1 text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full"
//                     >
//                       <CheckCircle className="w-4 h-4 text-green-500" />
//                       Verified Purchase
//                     </motion.div>
//                     {selectedReview.helpfulCount > 0 && (
//                       <motion.div 
//                         whileHover={{ scale: 1.05 }}
//                         className="flex items-center gap-1 text-sm text-gray-600 bg-orange-50 px-3 py-1 rounded-full"
//                       >
//                         <Heart className="w-4 h-4 text-[#E39A65]" />
//                         {selectedReview.helpfulCount} found this helpful
//                       </motion.div>
//                     )}
//                   </motion.div>

//                   {/* Admin Response */}
//                   {selectedReview.response && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.6 }}
//                       className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
//                     >
//                       <p className="text-xs font-medium text-blue-700 mb-2 flex items-center gap-1">
//                         <MessageCircle className="w-4 h-4" />
//                         Response from seller
//                       </p>
//                       <p className="text-sm text-blue-800">{selectedReview.response.text}</p>
//                       <p className="text-xs text-blue-600 mt-2">
//                         {formatDate(selectedReview.response.respondedAt)}
//                       </p>
//                     </motion.div>
//                   )}
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <Footer />
//     </>
//   );
// }



// app/reviews/page.jsx
import ReviewsClient from './ReviewsClient';

// Metadata for Reviews page
export const metadata = {
  title: "Reviews - what our customers say ",
  description: "Read authentic reviews from our B2B customers worldwide. See why businesses trust Asian Clothify for wholesale clothing orders. 4.8+ rating from 500+ verified buyers.",
  keywords: [
    "clothing supplier reviews",
    "wholesale clothing reviews",
    "Asian Clothify reviews",
    "B2B clothing reviews",
    "Bangladesh clothing manufacturer reviews",
    "customer testimonials",
    "verified reviews"
  ],
  openGraph: {
    title: "Customer Reviews - what our customers say ",
    description: "See what our customers say about Asian Clothify. Real reviews from verified buyers worldwide. Quality products, fast shipping, excellent service.",
    url: "https://asianclothify.com/reviews",
    siteName: "Asian Clothify",
    images: [
      {
        url: "/reviews-og.jpg",
        width: 1200,
        height: 630,
        alt: "Asian Clothify Customer Reviews - Trusted Wholesale Clothing Supplier"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews | Asian Clothify",
    description: "Read real reviews from our B2B clothing customers. 4.8+ rating from verified buyers worldwide.",
    images: ["/reviews-og.jpg"],
    site: "@asianclothify",
  },
  alternates: {
    canonical: "/reviews"
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-site-verification", // Optional: Add if you have Google Search Console
  }
};

// Simple server component that renders the client component
export default function ReviewsPage() {
  return <ReviewsClient />;
}