// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   Star, 
//   MessageCircle, 
//   ThumbsUp, 
//   ChevronDown, 
//   ChevronUp,
//   Loader2,
//   CheckCircle,
//   Award,
//   ChevronRight
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ReviewModal from './ReviewModal'; // Import the ReviewModal

// export default function ProductReviews({ productId, productName }) {
//   const [reviews, setReviews] = useState([]);
//   const [allReviews, setAllReviews] = useState([]);
//   const [displayCount, setDisplayCount] = useState(2);
//   const [stats, setStats] = useState({
//     averageRating: 0,
//     totalReviews: 0,
//     ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState('highest');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (productId) {
//       fetchAllReviews();
//     }
//   }, [productId, sortBy]);

//   const fetchAllReviews = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const url = `https://b2b-backend-rosy.vercel.app/api/reviews/product/${productId}?limit=100&sort=${sortBy === 'highest' ? '-rating' : '-createdAt'}`;
      
//       const response = await fetch(url);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();

//       if (data.success) {
//         setAllReviews(data.data.reviews || []);
//         setStats(data.data.productStats || {
//           averageRating: 0,
//           totalReviews: 0,
//           ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
//         });
        
//         updateDisplayedReviews(data.data.reviews || []);
//       } else {
//         setError(data.error || 'Failed to load reviews');
//         toast.error(data.error || 'Failed to load reviews');
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       setError(error.message);
//       toast.error('Failed to load reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateDisplayedReviews = (allReviewsList = allReviews) => {
//     const sorted = [...allReviewsList].sort((a, b) => {
//       if (sortBy === 'highest') {
//         return b.rating - a.rating;
//       } else {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       }
//     });
//     setReviews(sorted.slice(0, displayCount));
//   };

//   useEffect(() => {
//     updateDisplayedReviews();
//   }, [displayCount, sortBy, allReviews]);

//   const handleViewMore = () => {
//     setDisplayCount(prev => Math.min(prev + 2, allReviews.length));
//   };

//   const handleViewLess = () => {
//     setDisplayCount(2);
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//     setDisplayCount(2);
//   };

//   const handleMarkHelpful = async (reviewId) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.info('Please login to mark reviews as helpful');
//         return;
//       }

//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/reviews/${reviewId}/helpful`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         setAllReviews(prev => prev.map(r => 
//           r._id === reviewId 
//             ? { ...r, helpfulCount: data.data.helpfulCount }
//             : r
//         ));
//         toast.success('Thank you for your feedback!');
//       }
//     } catch (error) {
//       console.error('Error marking helpful:', error);
//     }
//   };

//   const handleReviewSubmitted = () => {
//     fetchAllReviews(); // Refresh reviews after submission
//   };

//   const StarRating = ({ rating, size = "w-4 h-4", showNumber = false }) => (
//     <div className="flex items-center gap-1">
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`${size} ${
//               star <= rating
//                 ? 'fill-yellow-400 text-yellow-400'
//                 : 'text-gray-300'
//             }`}
//           />
//         ))}
//       </div>
//       {showNumber && <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>}
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

//   const RatingBreakdown = () => {
//     const total = stats.totalReviews;
//     const average = stats.averageRating;

//     return (
//       <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100 mb-6">
//         <div className="flex items-center gap-3">
//           <div className="text-3xl font-bold text-gray-900">{average.toFixed(1)}</div>
//           <div className="flex flex-col">
//             <StarRating rating={Math.round(average)} />
//             <span className="text-xs text-gray-500 mt-0.5">{total} reviews</span>
//           </div>
//         </div>

//         <div className="flex-1 flex items-center gap-4">
//           {[5, 4, 3, 2, 1].map(rating => {
//             const count = stats.ratingDistribution[rating] || 0;
//             const percentage = total > 0 ? (count / total) * 100 : 0;
            
//             return (
//               <div key={rating} className="flex-1 group relative">
//                 <div className="text-xs text-gray-500 text-center mb-1">{rating}★</div>
//                 <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-[#E39A65] rounded-full group-hover:bg-[#d48b54] transition-colors"
//                     style={{ width: `${percentage}%` }}
//                   />
//                 </div>
//                 <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                   {count} reviews
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
//           <CheckCircle className="w-4 h-4" />
//           <span className="text-xs font-medium">Verified</span>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-16">
//         <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-16 bg-red-50 rounded-xl border border-red-100">
//         <MessageCircle className="w-12 h-12 text-red-300 mx-auto mb-3" />
//         <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load reviews</h3>
//         <p className="text-sm text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//             <MessageCircle className="w-5 h-5 text-[#E39A65]" />
//             Customer Reviews
//           </h2>
//         </div>

//         <div className="p-6">
//           {/* Rating Breakdown */}
//           <RatingBreakdown />

//           {/* Sort and Filter Bar */}
//           {stats.totalReviews > 0 && (
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-500">Sort by:</span>
//                 <select
//                   value={sortBy}
//                   onChange={handleSortChange}
//                   className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white"
//                 >
//                   <option value="highest">Top Rated</option>
//                   <option value="newest">Most Recent</option>
//                 </select>
//               </div>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="text-sm text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center gap-1 transition-colors"
//               >
//                 Write a Review
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           )}

//           {/* Reviews List */}
//           {stats.totalReviews > 0 ? (
//             <>
//               <div className="space-y-6">
//                 {reviews.map((review, index) => (
//                   <div 
//                     key={review._id} 
//                     className={`${index !== reviews.length - 1 ? 'border-b border-gray-100 pb-6' : ''}`}
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex items-start gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E39A65] to-[#d48b54] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
//                           {review.userName?.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="font-medium text-gray-900">{review.userName}</span>
//                             {review.isFeatured && (
//                               <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full flex items-center gap-1">
//                                 <Award className="w-3 h-3" />
//                                 Featured
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <StarRating rating={review.rating} />
//                             <span className="text-xs text-gray-400">•</span>
//                             <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="ml-13 pl-13">
//                       {review.title && (
//                         <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
//                       )}
//                       <p className="text-gray-600 mb-4 leading-relaxed">{review.comment}</p>

//                       <div className="flex items-center justify-between">
//                         {review.userCompany && (
//                           <span className="text-xs text-gray-400 flex items-center gap-1">
//                             <CheckCircle className="w-3 h-3 text-green-500" />
//                             Verified Buyer • {review.userCompany}
//                           </span>
//                         )}
//                         <button
//                           onClick={() => handleMarkHelpful(review._id)}
//                           className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
//                         >
//                           <ThumbsUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E39A65]" />
//                           <span className="text-xs text-gray-500 group-hover:text-[#E39A65]">
//                             Helpful ({review.helpfulCount || 0})
//                           </span>
//                         </button>
//                       </div>

//                       {review.response && (
//                         <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
//                           <p className="text-xs font-medium text-blue-700 mb-2 flex items-center gap-1">
//                             <MessageCircle className="w-3 h-3" />
//                             Response from seller:
//                           </p>
//                           <p className="text-sm text-blue-800">{review.response.text}</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* View More / View Less Controls */}
//               {allReviews.length > 2 && (
//                 <div className="mt-8 flex flex-col items-center gap-3">
//                   {displayCount < allReviews.length ? (
//                     <button
//                       onClick={handleViewMore}
//                       className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-all duration-300 group"
//                     >
//                       <span>View More Reviews</span>
//                       <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
//                     </button>
//                   ) : displayCount > 2 && (
//                     <button
//                       onClick={handleViewLess}
//                       className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300 group"
//                     >
//                       <span>View Less</span>
//                       <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
//                     </button>
//                   )}
                  
//                   <p className="text-sm text-gray-400">
//                     Showing {Math.min(displayCount, allReviews.length)} of {allReviews.length} reviews
//                   </p>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <MessageCircle className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
//               <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                 Be the first to share your experience with this product
//               </p>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors"
//               >
//                 Write a Review
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Review Modal */}
//       <ReviewModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onReviewSubmitted={handleReviewSubmitted}
//         productId={productId}
//         productName={productName}
//       />
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { 
  Star, 
  MessageCircle, 
  ThumbsUp, 
  ChevronDown, 
  ChevronUp,
  Loader2,
  CheckCircle,
  Award,
  ChevronRight,
  Clock,
  XCircle,
  AlertCircle,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import ReviewModal from './ReviewModal';

export default function ProductReviews({ productId, productName }) {
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [displayCount, setDisplayCount] = useState(2);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('highest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setIsAuthenticated(true);
          setCurrentUser(parsedUser);
          console.log('User authenticated:', parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } else {
        console.log('No user authenticated');
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    }
  };

  useEffect(() => {
    if (productId) {
      fetchAllReviews();
    }
  }, [productId, sortBy, isAuthenticated, currentUser]); // Add dependencies

  useEffect(() => {
    // Listen for auth changes
    const handleAuthChange = () => {
      console.log('Auth change detected');
      checkAuthStatus();
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

const fetchAllReviews = async () => {
  setLoading(true);
  setError(null);
  try {
    // Get the current auth state directly
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    let currentUserId = null;
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        currentUserId = user.id || user._id;
        console.log('Current user ID from localStorage:', currentUserId);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    // Fetch public reviews (approved only)
    const url = `https://b2b-backend-rosy.vercel.app/api/reviews/product/${productId}?limit=100&sort=${sortBy === 'highest' ? '-rating' : '-createdAt'}`;
    console.log('Fetching reviews from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Reviews data received:', data);

    if (data.success) {
      const allReviewsList = data.data.reviews || [];
      console.log('All reviews:', allReviewsList);
      
      setStats(data.data.productStats || {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      });
      
      setAllReviews(allReviewsList);
      updateDisplayedReviews(allReviewsList);
      
      // If user is authenticated, also fetch their personal review for this product
      if (token && currentUserId) {
        fetchUserReview();
      } else {
        setUserReview(null);
      }
    } else {
      setError(data.error || 'Failed to load reviews');
      toast.error(data.error || 'Failed to load reviews');
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    setError(error.message);
    toast.error('Failed to load reviews');
  } finally {
    setLoading(false);
  }
};

// New function to fetch user's personal review
const fetchUserReview = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/reviews/product/${productId}/my-review`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 404) {
      // User hasn't reviewed this product
      setUserReview(null);
      return;
    }
    
    const data = await response.json();
    
    if (data.success) {
      console.log('User review found:', data.data);
      setUserReview(data.data);
      
      // Remove user's review from the main list
      setAllReviews(prev => prev.filter(review => review._id !== data.data._id));
    }
  } catch (error) {
    console.error('Error fetching user review:', error);
  }
};

  const updateDisplayedReviews = (reviewsList = allReviews) => {
    console.log('Updating displayed reviews with list:', reviewsList.length);
    const sorted = [...reviewsList].sort((a, b) => {
      if (sortBy === 'highest') {
        return b.rating - a.rating;
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setReviews(sorted.slice(0, displayCount));
  };

  useEffect(() => {
    if (allReviews.length > 0) {
      updateDisplayedReviews();
    }
  }, [displayCount, sortBy, allReviews]);

  const handleViewMore = () => {
    setDisplayCount(prev => Math.min(prev + 2, allReviews.length));
  };

  const handleViewLess = () => {
    setDisplayCount(2);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setDisplayCount(2);
  };

  const handleMarkHelpful = async (reviewId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.info('Please login to mark reviews as helpful');
        return;
      }

      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        // Update in all reviews
        setAllReviews(prev => prev.map(r => 
          r._id === reviewId 
            ? { ...r, helpfulCount: data.data.helpfulCount }
            : r
        ));
        
        // Also update in user review if it's the same
        if (userReview && userReview._id === reviewId) {
          setUserReview(prev => ({ ...prev, helpfulCount: data.data.helpfulCount }));
        }
        
        toast.success('Thank you for your feedback!');
      }
    } catch (error) {
      console.error('Error marking helpful:', error);
    }
  };

const handleReviewSubmitted = () => {
  console.log('Review submitted, refreshing...');
  // Refresh both public reviews and user's review
  fetchAllReviews();
};

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
            <Clock className="w-3 h-3" />
            Pending Review
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
            <XCircle className="w-3 h-3" />
            Not Approved
          </span>
        );
      default:
        return null;
    }
  };

  const StarRating = ({ rating, size = "w-4 h-4", showNumber = false }) => (
    <div className="flex items-center gap-1">
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
      {showNumber && <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>}
    </div>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const RatingBreakdown = () => {
    const total = stats.totalReviews;
    const average = stats.averageRating;

    return (
      <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-gray-900">{average.toFixed(1)}</div>
          <div className="flex flex-col">
            <StarRating rating={Math.round(average)} />
            <span className="text-xs text-gray-500 mt-0.5">{total} reviews</span>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = stats.ratingDistribution[rating] || 0;
            const percentage = total > 0 ? (count / total) * 100 : 0;
            
            return (
              <div key={rating} className="flex-1 group relative">
                <div className="text-xs text-gray-500 text-center mb-1">{rating}★</div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#E39A65] rounded-full group-hover:bg-[#d48b54] transition-colors"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {count} reviews
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs font-medium">Verified</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-red-50 rounded-xl border border-red-100">
        <MessageCircle className="w-12 h-12 text-red-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load reviews</h3>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#E39A65]" />
            Customer Reviews
          </h2>
        </div>

        <div className="p-6">
          {/* Rating Breakdown */}
          <RatingBreakdown />

          {/* User's Own Review (if exists) */}
          {userReview && (
            <div className="mb-8 p-5 bg-orange-50 rounded-xl border-2 border-[#E39A65] relative">
              <div className="absolute -top-3 left-4 px-3 py-1 bg-[#E39A65] text-white text-xs font-medium rounded-full flex items-center gap-1">
                <User className="w-3 h-3" />
                Your Review
              </div>
              
              <div className="mt-2">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E39A65] to-[#d48b54] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {userReview.userName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{userReview.userName}</span>
                        {getStatusBadge(userReview.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={userReview.rating} />
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{formatDate(userReview.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-13 pl-13">
                  {userReview.title && (
                    <h4 className="font-semibold text-gray-900 mb-2">{userReview.title}</h4>
                  )}
                  <p className="text-gray-600 mb-4 leading-relaxed">{userReview.comment}</p>

                  {userReview.status === 'pending' && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-700">
                        Your review is pending moderation. It will be published once approved by our team.
                      </p>
                    </div>
                  )}

                  {userReview.status === 'rejected' && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-red-700 font-medium mb-1">Review not approved</p>
                        {userReview.moderationNote && (
                          <p className="text-xs text-red-600">Reason: {userReview.moderationNote}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {userReview.userCompany && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Verified Buyer • {userReview.userCompany}
                      </span>
                    )}
                    <button
                      onClick={() => handleMarkHelpful(userReview._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E39A65]" />
                      <span className="text-xs text-gray-500 group-hover:text-[#E39A65]">
                        Helpful ({userReview.helpfulCount || 0})
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sort and Filter Bar */}
          {allReviews.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white"
                >
                  <option value="highest">Top Rated</option>
                  <option value="newest">Most Recent</option>
                </select>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center gap-1 transition-colors"
              >
                {userReview ? 'Edit Your Review' : 'Write a Review'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Reviews List */}
          {allReviews.length > 0 ? (
            <>
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div 
                    key={review._id} 
                    className={`${index !== reviews.length - 1 ? 'border-b border-gray-100 pb-6' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E39A65] to-[#d48b54] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {review.userName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{review.userName}</span>
                            {review.isFeatured && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} />
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-13 pl-13">
                      {review.title && (
                        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                      )}
                      <p className="text-gray-600 mb-4 leading-relaxed">{review.comment}</p>

                      <div className="flex items-center justify-between">
                        {review.userCompany && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            Verified Buyer • {review.userCompany}
                          </span>
                        )}
                        <button
                          onClick={() => handleMarkHelpful(review._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E39A65]" />
                          <span className="text-xs text-gray-500 group-hover:text-[#E39A65]">
                            Helpful ({review.helpfulCount || 0})
                          </span>
                        </button>
                      </div>

                      {review.response && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-xs font-medium text-blue-700 mb-2 flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            Response from seller:
                          </p>
                          <p className="text-sm text-blue-800">{review.response.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* View More / View Less Controls */}
              {allReviews.length > 2 && (
                <div className="mt-8 flex flex-col items-center gap-3">
                  {displayCount < allReviews.length ? (
                    <button
                      onClick={handleViewMore}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-all duration-300 group"
                    >
                      <span>View More Reviews</span>
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  ) : displayCount > 2 && (
                    <button
                      onClick={handleViewLess}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300 group"
                    >
                      <span>View Less</span>
                      <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  )}
                  
                  <p className="text-sm text-gray-400">
                    Showing {Math.min(displayCount, allReviews.length)} of {allReviews.length} reviews
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {userReview 
                  ? 'You have submitted a review. It will appear here once approved.'
                  : 'Be the first to share your experience with this product'}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors"
              >
                {userReview ? 'Edit Your Review' : 'Write a Review'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
        productId={productId}
        productName={productName}
      />
    </>
  );
}