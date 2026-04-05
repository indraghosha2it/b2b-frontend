// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Search,
//   Eye,
//   Edit,
//   Calendar,
//   Star,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   MessageCircle,
//   Package,
//   X,
//   Save,
//   Filter
// } from 'lucide-react';
// import { toast } from 'sonner';

// export default function MyReviews() {
//   const router = useRouter();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editModal, setEditModal] = useState({ show: false, review: null, formData: null });
//   const [viewModal, setViewModal] = useState({ show: false, review: null });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [actionLoading, setActionLoading] = useState(false);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });

//   // Edit form errors
//   const [editErrors, setEditErrors] = useState({});

//   // Status options
//   const statusOptions = [
//     { value: 'all', label: 'All Reviews', icon: '📋' },
//     { value: 'pending', label: 'Pending', icon: '⏳' },
//     { value: 'approved', label: 'Approved', icon: '✅' },
//     { value: 'rejected', label: 'Rejected', icon: '❌' }
//   ];

//   // Check if user is logged in and is a customer
//   useEffect(() => {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         // Allow only customers
//         if (user.role !== 'customer') {
//           toast.error('Access denied. Customer area only.');
//           router.push('/login');
//         }
//       } catch (error) {
//         console.error('Error parsing user:', error);
//         router.push('/login');
//       }
//     } else {
//       router.push('/login');
//     }
//   }, [router]);

//   // Fetch user's reviews
//   const fetchMyReviews = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       // Build query params
//       const params = new URLSearchParams({
//         page: pagination.page.toString(),
//         limit: pagination.limit.toString()
//       });
      
//       // Add status filter if not 'all'
//       if (statusFilter && statusFilter !== 'all') {
//         params.append('status', statusFilter);
//       }
      
//       // Add search term if present
//       if (searchTerm && searchTerm.trim()) {
//         params.append('search', searchTerm.trim());
//       }

//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/reviews/user/me?${params.toString()}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         setReviews(data.data || []);
//         setPagination(prev => ({
//           ...prev,
//           total: data.pagination?.total || 0,
//           pages: data.pagination?.pages || 0
//         }));
//       } else {
//         toast.error(data.error || 'Failed to fetch reviews');
//         setReviews([]);
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       toast.error('Network error. Please try again.');
//       setReviews([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch when page, status filter, or search changes
//   useEffect(() => {
//     fetchMyReviews();
//   }, [pagination.page, statusFilter, searchTerm]);

//   // Handle edit - open modal with review data
//   const handleEditClick = (review) => {
//     setEditModal({
//       show: true,
//       review,
//       formData: {
//         rating: review.rating,
//         title: review.title || '',
//         comment: review.comment
//       }
//     });
//     setEditErrors({});
//     setHoveredRating(0);
//   };

//   // Handle edit form change
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditModal(prev => ({
//       ...prev,
//       formData: {
//         ...prev.formData,
//         [name]: value
//       }
//     }));
//     // Clear error for this field
//     if (editErrors[name]) {
//       setEditErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   // Handle rating click in edit modal
//   const handleEditRatingClick = (rating) => {
//     setEditModal(prev => ({
//       ...prev,
//       formData: {
//         ...prev.formData,
//         rating
//       }
//     }));
//     if (editErrors.rating) {
//       setEditErrors(prev => ({ ...prev, rating: null }));
//     }
//   };

//   // Validate edit form
//   const validateEditForm = () => {
//     const newErrors = {};
    
//     if (!editModal.formData.rating || editModal.formData.rating === 0) {
//       newErrors.rating = 'Rating is required';
//     }
    
//     if (!editModal.formData.comment.trim()) {
//       newErrors.comment = 'Review comment is required';
//     } else if (editModal.formData.comment.length < 10) {
//       newErrors.comment = 'Review must be at least 10 characters';
//     } else if (editModal.formData.comment.length > 500) {
//       newErrors.comment = 'Review must be less than 500 characters';
//     }
    
//     if (editModal.formData.title && editModal.formData.title.length > 100) {
//       newErrors.title = 'Title must be less than 100 characters';
//     }
    
//     setEditErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle save edit
//   const handleSaveEdit = async () => {
//     if (!validateEditForm()) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/reviews/${editModal.review._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           rating: editModal.formData.rating,
//           title: editModal.formData.title || undefined,
//           comment: editModal.formData.comment
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Review updated successfully');
//         setEditModal({ show: false, review: null, formData: null });
//         fetchMyReviews();
//       } else {
//         setEditErrors({ submit: data.error || 'Failed to update review' });
//       }
//     } catch (error) {
//       console.error('Error updating review:', error);
//       setEditErrors({ submit: 'Network error. Please try again.' });
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Get status badge
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'approved':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
//             <CheckCircle className="w-3 h-3" />
//             Approved
//           </span>
//         );
//       case 'rejected':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
//             <XCircle className="w-3 h-3" />
//             Rejected
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
//             <Clock className="w-3 h-3" />
//             Pending
//           </span>
//         );
//       default:
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
//             <AlertCircle className="w-3 h-3" />
//             Unknown
//           </span>
//         );
//     }
//   };

//   // Star rating display
//   const StarRating = ({ rating, size = "w-3 h-3", interactive = false, onRatingClick, hoveredRating, onHover }) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={interactive ? () => onRatingClick(i) : undefined}
//           onMouseEnter={interactive ? () => onHover(i) : undefined}
//           onMouseLeave={interactive ? () => onHover(0) : undefined}
//           className={interactive ? 'focus:outline-none' : ''}
//           disabled={!interactive}
//         >
//           <Star
//             className={`${size} ${
//               i <= (hoveredRating || rating)
//                 ? 'fill-yellow-400 text-yellow-400'
//                 : 'text-gray-300'
//             } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
//           />
//         </button>
//       );
//     }
//     return (
//       <div className="flex items-center gap-0.5">
//         {stars}
//         {!interactive && <span className="ml-1 text-xs text-gray-500">({rating})</span>}
//       </div>
//     );
//   };

//   // Handle filter change
//   const handleStatusFilterChange = (e) => {
//     setStatusFilter(e.target.value);
//     setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
//   };

//   // Handle search with debounce
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
//   };

//   // Clear status filter
//   const clearStatusFilter = () => {
//     setStatusFilter('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
//               <p className="text-sm text-gray-500 mt-1">View and manage your product reviews</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         {/* Filters - Increased width for search */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search - Increased width with flex-[2] */}
//             <div className="flex-[2] relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search your reviews by title or comment..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//               />
//             </div>

//             {/* Status Filter */}
//             <div className="flex-1 relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <select
//                 value={statusFilter}
//                 onChange={handleStatusFilterChange}
//                 className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition appearance-none bg-white"
//               >
//                 {statusOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.icon} {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Active Filters Display */}
//             <div className="flex items-center gap-2">
//               {statusFilter !== 'all' && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 text-sm rounded-lg">
//                   <Filter className="w-3 h-3" />
//                   {statusOptions.find(opt => opt.value === statusFilter)?.label}
//                   <button
//                     onClick={clearStatusFilter}
//                     className="ml-1 hover:text-orange-900"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </span>
//               )}
//               {searchTerm && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-lg">
//                   <Search className="w-3 h-3" />
//                   "{searchTerm}"
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="ml-1 hover:text-blue-900"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Reviews Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
//             </div>
//           ) : reviews.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                 <MessageCircle className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
//               <p className="text-sm text-gray-500 mb-6">
//                 {statusFilter !== 'all' 
//                   ? `You don't have any ${statusOptions.find(opt => opt.value === statusFilter)?.label.toLowerCase()} reviews.` 
//                   : searchTerm
//                   ? `No reviews matching "${searchTerm}"`
//                   : "You haven't written any reviews yet."}
//               </p>
//               <Link
//                 href="/products"
//                 className="inline-flex items-center px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-sm font-medium"
//               >
//                 Browse Products to Review
//               </Link>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full table-fixed">
//                   <colgroup>
//                     <col className="w-[40%]" />
//                     <col className="w-[20%]" />
//                     <col className="w-[15%]" />
//                     <col className="w-[15%]" />
//                     <col className="w-[10%]" />
//                   </colgroup>
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {reviews.map((review) => (
//                       <tr key={review._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-4 py-3">
//                           <div className="space-y-1 max-w-[300px]">
//                             <StarRating rating={review.rating} />
//                             {review.title && (
//                               <p className="text-sm font-medium text-gray-900 truncate" title={review.title}>
//                                 {review.title}
//                               </p>
//                             )}
//                             <p className="text-xs text-gray-500 truncate" title={review.comment}>
//                               {review.comment}
//                             </p>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           {review.product ? (
//                             <div className="flex items-center gap-2 max-w-[150px]">
//                               <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                               <span className="text-sm text-gray-600 truncate" title={review.product.productName}>
//                                 {review.product.productName}
//                               </span>
//                             </div>
//                           ) : (
//                             <span className="text-sm text-gray-400">-</span>
//                           )}
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2 whitespace-nowrap">
//                             <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                             <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="whitespace-nowrap">
//                             {getStatusBadge(review.status)}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-end gap-2">
//                             {/* View Button */}
//                             <button
//                               onClick={() => setViewModal({ show: true, review })}
//                               className="p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
//                               title="View Details"
//                             >
//                               <Eye className="w-4 h-4" />
//                             </button>

//                             {/* Edit Button - Show for all reviews but disable if not pending */}
//                             <button
//                               onClick={() => review.status === 'pending' ? handleEditClick(review) : toast.info('Only pending reviews can be edited')}
//                               className={`p-1.5 rounded-lg transition-colors ${
//                                 review.status === 'pending'
//                                   ? 'text-gray-400 hover:text-blue-600 hover:bg-blue-50' 
//                                   : 'text-gray-300 cursor-not-allowed'
//                               }`}
//                               title={review.status === 'pending' ? 'Edit Review' : 'Cannot edit approved/rejected reviews'}
//                               disabled={review.status !== 'pending'}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               {pagination.pages > 1 && (
//                 <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
//                   <p className="text-sm text-gray-500">
//                     Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reviews
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//                       disabled={pagination.page === 1}
//                       className="p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <span className="text-sm text-gray-600">
//                       Page {pagination.page} of {pagination.pages}
//                     </span>
//                     <button
//                       onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                       disabled={pagination.page === pagination.pages}
//                       className="p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Edit Review Modal */}
//       {editModal.show && editModal.review && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h3 className="text-lg font-bold text-gray-900">Edit Your Review</h3>
//               <button
//                 onClick={() => setEditModal({ show: false, review: null, formData: null })}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <div className="p-6">
//               {/* Product Info (Read-only) */}
//               {editModal.review.product && (
//                 <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
//                   <p className="text-xs text-orange-600 mb-1">Product</p>
//                   <p className="font-medium text-gray-900">{editModal.review.product.productName}</p>
//                 </div>
//               )}

//               {/* Status Info */}
//               <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//                 <p className="text-xs text-blue-600 mb-1">Review Status</p>
//                 <div className="flex items-center gap-2">
//                   {getStatusBadge(editModal.review.status)}
//                   <span className="text-xs text-blue-600">
//                     {editModal.review.status === 'pending' 
//                       ? 'You can edit this review while it\'s pending approval.'
//                       : 'This review cannot be edited.'}
//                   </span>
//                 </div>
//               </div>

//               <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//                 {/* Rating Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Rating <span className="text-red-500">*</span>
//                   </label>
//                   <StarRating 
//                     rating={editModal.formData.rating} 
//                     size="w-8 h-8"
//                     interactive={true}
//                     onRatingClick={handleEditRatingClick}
//                     hoveredRating={hoveredRating}
//                     onHover={setHoveredRating}
//                   />
//                   {editErrors.rating && (
//                     <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {editErrors.rating}
//                     </p>
//                   )}
//                 </div>

//                 {/* Review Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Review Title <span className="text-gray-400 text-xs">(Optional)</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={editModal.formData.title}
//                     onChange={handleEditChange}
//                     placeholder="Summarize your experience"
//                     maxLength="100"
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all"
//                   />
//                   {editErrors.title && (
//                     <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {editErrors.title}
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-400 mt-1 text-right">
//                     {editModal.formData.title.length}/100
//                   </p>
//                 </div>

//                 {/* Review Comment */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Review Comment <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     name="comment"
//                     value={editModal.formData.comment}
//                     onChange={handleEditChange}
//                     rows="4"
//                     maxLength="500"
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all resize-none"
//                     placeholder="Share your experience with this product..."
//                   />
//                   {editErrors.comment && (
//                     <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {editErrors.comment}
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-400 mt-1 text-right">
//                     {editModal.formData.comment.length}/500
//                   </p>
//                 </div>

//                 {/* Submit Error */}
//                 {editErrors.submit && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                     <p className="text-red-600 text-sm flex items-center gap-2">
//                       <AlertCircle className="w-4 h-4" />
//                       {editErrors.submit}
//                     </p>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setEditModal({ show: false, review: null, formData: null })}
//                     className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSaveEdit}
//                     disabled={actionLoading}
//                     className="flex-1 py-3 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {actionLoading ? (
//                       <>
//                         <Loader2 className="w-5 h-5 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-4 h-4" />
//                         Save Changes
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Details Modal */}
//       {viewModal.show && viewModal.review && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h3 className="text-lg font-bold text-gray-900">Review Details</h3>
//               <button
//                 onClick={() => setViewModal({ show: false, review: null })}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <div className="p-6 space-y-6">
//               {/* Rating and Title */}
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <StarRating rating={viewModal.review.rating} />
//                   <span className="text-xs text-gray-500">({viewModal.review.rating}/5)</span>
//                 </div>
//                 {viewModal.review.title && (
//                   <h4 className="text-lg font-semibold text-gray-900">{viewModal.review.title}</h4>
//                 )}
//               </div>

//               {/* Review Comment */}
//               <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <p className="text-sm text-gray-700">{viewModal.review.comment}</p>
//               </div>

//               {/* Product Info */}
//               {viewModal.review.product && (
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Product</p>
//                   <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
//                     <Package className="w-5 h-5 text-[#E39A65]" />
//                     <span className="font-medium text-gray-900">{viewModal.review.product.productName}</span>
//                   </div>
//                 </div>
//               )}

//               {/* Date and Status */}
//               <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Date</p>
//                   <p className="text-sm text-gray-700 flex items-center gap-2">
//                     <Calendar className="w-4 h-4 text-gray-400" />
//                     {formatDate(viewModal.review.createdAt)}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Status</p>
//                   {getStatusBadge(viewModal.review.status)}
//                 </div>
//               </div>

//               {/* Moderation Note (if any) */}
//               {viewModal.review.moderationNote && (
//                 <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-xs font-medium text-gray-700 mb-1">Moderation Note:</p>
//                   <p className="text-sm text-gray-600">{viewModal.review.moderationNote}</p>
//                 </div>
//               )}
//             </div>

//             <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
//               {viewModal.review.status === 'pending' && (
//                 <button
//                   onClick={() => {
//                     setViewModal({ show: false });
//                     handleEditClick(viewModal.review);
//                   }}
//                   className="px-4 py-2 text-sm font-medium text-white bg-[#E39A65] rounded-lg hover:bg-[#d48b54] transition-colors flex items-center gap-2"
//                 >
//                   <Edit className="w-4 h-4" />
//                   Edit Review
//                 </button>
//               )}
//               <button
//                 onClick={() => setViewModal({ show: false, review: null })}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Eye,
  Edit,
  Calendar,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Package,
  X,
  Save,
  Filter,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';
import { useRef } from 'react';

export default function MyReviews() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState({ show: false, review: null, formData: null });
  const [viewModal, setViewModal] = useState({ show: false, review: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  // First, add this state near your other useState declarations
const [showStatusDropdown, setShowStatusDropdown] = useState(false);
const dropdownRef = useRef(null);

  

  // Edit form errors
  const [editErrors, setEditErrors] = useState({});

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Reviews', icon: '📋' },
    { value: 'pending', label: 'Pending', icon: '⏳' },
    { value: 'approved', label: 'Approved', icon: '✅' },
    { value: 'rejected', label: 'Rejected', icon: '❌' }
  ];

  // Check if user is logged in and is a customer
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Allow only customers
        if (user.role !== 'customer') {
          toast.error('Access denied. Customer area only.');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error parsing user:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);


  
// Add this useEffect to handle clicking outside
useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowStatusDropdown(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  // Fetch user's reviews
  const fetchMyReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Build query params
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      });
      
      // Add status filter if not 'all'
      if (statusFilter && statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      // Add search term if present
      if (searchTerm && searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/reviews/user/me?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setReviews(data.data || []);
        setPagination(prev => ({
          ...prev,
          total: data.pagination?.total || 0,
          pages: data.pagination?.pages || 0
        }));
      } else {
        toast.error(data.error || 'Failed to fetch reviews');
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Network error. Please try again.');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page, status filter, or search changes
  useEffect(() => {
    fetchMyReviews();
  }, [pagination.page, statusFilter, searchTerm]);

  // Handle edit - open modal with review data
  const handleEditClick = (review) => {
    setEditModal({
      show: true,
      review,
      formData: {
        rating: review.rating,
        title: review.title || '',
        comment: review.comment
      }
    });
    setEditErrors({});
    setHoveredRating(0);
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditModal(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value
      }
    }));
    // Clear error for this field
    if (editErrors[name]) {
      setEditErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle rating click in edit modal
  const handleEditRatingClick = (rating) => {
    setEditModal(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        rating
      }
    }));
    if (editErrors.rating) {
      setEditErrors(prev => ({ ...prev, rating: null }));
    }
  };

  // Validate edit form
  const validateEditForm = () => {
    const newErrors = {};
    
    if (!editModal.formData.rating || editModal.formData.rating === 0) {
      newErrors.rating = 'Rating is required';
    }
    
    if (!editModal.formData.comment.trim()) {
      newErrors.comment = 'Review comment is required';
    } else if (editModal.formData.comment.length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    } else if (editModal.formData.comment.length > 500) {
      newErrors.comment = 'Review must be less than 500 characters';
    }
    
    if (editModal.formData.title && editModal.formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!validateEditForm()) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/reviews/${editModal.review._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: editModal.formData.rating,
          title: editModal.formData.title || undefined,
          comment: editModal.formData.comment
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Review updated successfully');
        setEditModal({ show: false, review: null, formData: null });
        fetchMyReviews();
      } else {
        setEditErrors({ submit: data.error || 'Failed to update review' });
      }
    } catch (error) {
      console.error('Error updating review:', error);
      setEditErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap">
            <AlertCircle className="w-3 h-3" />
            Unknown
          </span>
        );
    }
  };

  // Star rating display
  const StarRating = ({ rating, size = "w-3 h-3", interactive = false, onRatingClick, hoveredRating, onHover }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={interactive ? () => onRatingClick(i) : undefined}
          onMouseEnter={interactive ? () => onHover(i) : undefined}
          onMouseLeave={interactive ? () => onHover(0) : undefined}
          className={interactive ? 'focus:outline-none' : ''}
          disabled={!interactive}
        >
          <Star
            className={`${size} ${
              i <= (hoveredRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          />
        </button>
      );
    }
    return (
      <div className="flex items-center gap-0.5">
        {stars}
        {!interactive && <span className="ml-1 text-xs text-gray-500">({rating})</span>}
      </div>
    );
  };

  // Handle filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle search with debounce
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Clear status filter
  const clearStatusFilter = () => {
    setStatusFilter('all');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">My Reviews</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">View and manage your product reviews</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-6">
        {/* Filters */}
    
<div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {/* Search - Full width on both */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search reviews..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
      />
    </div>

    {/* Status Filter */}
  {/* Status Filter - Custom Dropdown */}
<div className="relative" ref={dropdownRef}>
  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 z-10">
    <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
  </div>
  
  {/* Dropdown Button */}
  <button
    type="button"
    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
    className="w-full pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition bg-white text-left flex items-center justify-between"
  >
    <span className="truncate">
      {statusOptions.find(opt => opt.value === statusFilter)?.icon} {statusOptions.find(opt => opt.value === statusFilter)?.label}
    </span>
    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
  </button>

  {/* Dropdown Menu */}
  {showStatusDropdown && (
    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {statusOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            setStatusFilter(option.value);
            setShowStatusDropdown(false);
            setPagination(prev => ({ ...prev, page: 1 }));
          }}
          className={`w-full px-4 py-2.5 text-left hover:bg-orange-50 transition-colors flex items-center gap-2 text-xs sm:text-sm ${
            statusFilter === option.value ? 'bg-orange-50 text-[#E39A65] font-medium' : 'text-gray-700'
          }`}
        >
          <span>{option.icon}</span>
          <span className="truncate">{option.label}</span>
          {statusFilter === option.value && (
            <CheckCircle className="w-3.5 h-3.5 ml-auto text-[#E39A65] flex-shrink-0" />
          )}
        </button>
      ))}
    </div>
  )}
</div>
  </div>

  {/* Active Filters Display - Below the filters */}
  {(statusFilter !== 'all' || searchTerm) && (
    <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-gray-100">
      <span className="text-xs text-gray-500">Active filters:</span>
      {statusFilter !== 'all' && (
        <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-lg whitespace-nowrap">
          <Filter className="w-3 h-3" />
          {statusOptions.find(opt => opt.value === statusFilter)?.label}
          <button
            onClick={clearStatusFilter}
            className="ml-0.5 hover:text-orange-900"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {searchTerm && (
        <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg whitespace-nowrap max-w-[200px] sm:max-w-none">
          <Search className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">"{searchTerm}"</span>
          <button
            onClick={() => setSearchTerm('')}
            className="ml-0.5 hover:text-blue-900 flex-shrink-0"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
    </div>
  )}
</div>

        {/* Reviews Table - Card layout on mobile, table on larger screens */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 sm:py-20">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[#E39A65]" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 sm:py-20 px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-3 sm:mb-4">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No reviews found</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto">
                {statusFilter !== 'all' 
                  ? `You don't have any ${statusOptions.find(opt => opt.value === statusFilter)?.label.toLowerCase()} reviews.` 
                  : searchTerm
                  ? `No reviews matching "${searchTerm}"`
                  : "You haven't written any reviews yet."}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-xs sm:text-sm font-medium"
              >
                Browse Products to Review
              </Link>
            </div>
          ) : (
            <>
              {/* Mobile View - Card Layout (hidden on sm and above) */}
              <div className="block sm:hidden divide-y divide-gray-200">
                {reviews.map((review) => (
                  <div key={review._id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <StarRating rating={review.rating} size="w-3 h-3" />
                          <span className="text-xs text-gray-500">({review.rating}/5)</span>
                        </div>
                        {review.title && (
                          <p className="text-sm font-medium text-gray-900 truncate">{review.title}</p>
                        )}
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">{review.comment}</p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => setViewModal({ show: true, review })}
                          className="p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => review.status === 'pending' ? handleEditClick(review) : toast.info('Only pending reviews can be edited')}
                          className={`p-1.5 rounded-lg transition-colors ${
                            review.status === 'pending'
                              ? 'text-gray-400 hover:text-blue-600 hover:bg-blue-50' 
                              : 'text-gray-300 cursor-not-allowed'
                          }`}
                          disabled={review.status !== 'pending'}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2 min-w-0">
                        {review.product && (
                          <div className="flex items-center gap-1 truncate max-w-[120px]">
                            <Package className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{review.product.productName}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 whitespace-nowrap">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                        {getStatusBadge(review.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View - Table (hidden on mobile, visible on sm and above) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col className="w-[40%]" />
                    <col className="w-[20%]" />
                    <col className="w-[15%]" />
                    <col className="w-[15%]" />
                    <col className="w-[10%]" />
                  </colgroup>
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reviews.map((review) => (
                      <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="space-y-1 max-w-[300px]">
                            <StarRating rating={review.rating} />
                            {review.title && (
                              <p className="text-sm font-medium text-gray-900 truncate" title={review.title}>
                                {review.title}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 truncate" title={review.comment}>
                              {review.comment}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {review.product ? (
                            <div className="flex items-center gap-2 max-w-[150px]">
                              <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-600 truncate" title={review.product.productName}>
                                {review.product.productName}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="whitespace-nowrap">
                            {getStatusBadge(review.status)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setViewModal({ show: true, review })}
                              className="p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => review.status === 'pending' ? handleEditClick(review) : toast.info('Only pending reviews can be edited')}
                              className={`p-1.5 rounded-lg transition-colors ${
                                review.status === 'pending'
                                  ? 'text-gray-400 hover:text-blue-600 hover:bg-blue-50' 
                                  : 'text-gray-300 cursor-not-allowed'
                              }`}
                              title={review.status === 'pending' ? 'Edit Review' : 'Cannot edit approved/rejected reviews'}
                              disabled={review.status !== 'pending'}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reviews
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={pagination.page === 1}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <span className="text-xs sm:text-sm text-gray-600">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={pagination.page === pagination.pages}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Edit Review Modal - Already responsive */}
      {editModal.show && editModal.review && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Edit Your Review</h3>
              <button
                onClick={() => setEditModal({ show: false, review: null, formData: null })}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              {/* Product Info */}
              {editModal.review.product && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-xs text-orange-600 mb-1">Product</p>
                  <p className="text-sm sm:text-base font-medium text-gray-900">{editModal.review.product.productName}</p>
                </div>
              )}

              {/* Status Info */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-600 mb-1">Review Status</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  {getStatusBadge(editModal.review.status)}
                  <span className="text-xs text-blue-600">
                    {editModal.review.status === 'pending' 
                      ? 'You can edit this review while it\'s pending approval.'
                      : 'This review cannot be edited.'}
                  </span>
                </div>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {/* Rating Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <StarRating 
                    rating={editModal.formData.rating} 
                    size="w-6 h-6 sm:w-8 sm:h-8"
                    interactive={true}
                    onRatingClick={handleEditRatingClick}
                    hoveredRating={hoveredRating}
                    onHover={setHoveredRating}
                  />
                  {editErrors.rating && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {editErrors.rating}
                    </p>
                  )}
                </div>

                {/* Review Title */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Review Title <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editModal.formData.title}
                    onChange={handleEditChange}
                    placeholder="Summarize your experience"
                    maxLength="100"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all"
                  />
                  {editErrors.title && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {editErrors.title}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {editModal.formData.title.length}/100
                  </p>
                </div>

                {/* Review Comment */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Review Comment <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="comment"
                    value={editModal.formData.comment}
                    onChange={handleEditChange}
                    rows="4"
                    maxLength="500"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all resize-none"
                    placeholder="Share your experience with this product..."
                  />
                  {editErrors.comment && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {editErrors.comment}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {editModal.formData.comment.length}/500
                  </p>
                </div>

                {/* Submit Error */}
                {editErrors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-xs sm:text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {editErrors.submit}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditModal({ show: false, review: null, formData: null })}
                    className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={actionLoading}
                    className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {actionLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal - Already responsive */}
      {viewModal.show && viewModal.review && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Review Details</h3>
              <button
                onClick={() => setViewModal({ show: false, review: null })}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Rating and Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={viewModal.review.rating} size="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm text-gray-500">({viewModal.review.rating}/5)</span>
                </div>
                {viewModal.review.title && (
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">{viewModal.review.title}</h4>
                )}
              </div>

              {/* Review Comment */}
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-700">{viewModal.review.comment}</p>
              </div>

              {/* Product Info */}
              {viewModal.review.product && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Product</p>
                  <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#E39A65]" />
                    <span className="text-sm sm:text-base font-medium text-gray-900">{viewModal.review.product.productName}</span>
                  </div>
                </div>
              )}

              {/* Date and Status */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-xs sm:text-sm text-gray-700 flex items-center gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    {formatDate(viewModal.review.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  {getStatusBadge(viewModal.review.status)}
                </div>
              </div>

              {/* Moderation Note */}
              {viewModal.review.moderationNote && (
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-1">Moderation Note:</p>
                  <p className="text-xs sm:text-sm text-gray-600">{viewModal.review.moderationNote}</p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-end gap-2">
              {viewModal.review.status === 'pending' && (
                <button
                  onClick={() => {
                    setViewModal({ show: false });
                    handleEditClick(viewModal.review);
                  }}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#E39A65] rounded-lg hover:bg-[#d48b54] transition-colors flex items-center justify-center gap-2 order-2 sm:order-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit Review
                </button>
              )}
              <button
                onClick={() => setViewModal({ show: false, review: null })}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors order-1 sm:order-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}