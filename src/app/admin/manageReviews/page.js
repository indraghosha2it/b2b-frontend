// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Search,
//   Filter,
//   Eye,
//   Edit,
//   Trash2,
//   Calendar,
//   User,
//   Star,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Award,
//   AlertCircle,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   MessageCircle,
//   Mail,
//   Package,
//   X
// } from 'lucide-react';
// import { toast } from 'sonner';

// export default function ManageReviews() {
//   const router = useRouter();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deleteModal, setDeleteModal] = useState({ show: false, review: null });
//   const [responseModal, setResponseModal] = useState({ show: false, review: null, text: '' });
//   const [viewModal, setViewModal] = useState({ show: false, review: null });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [ratingFilter, setRatingFilter] = useState('');
//   const [featuredFilter, setFeaturedFilter] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [actionLoading, setActionLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0,
//     featured: 0
//   });

//   // Status options
//   const statusOptions = [
//     { value: 'all', label: 'All Status', icon: '📊' },
//     { value: 'pending', label: 'Pending', icon: '⏳', color: 'yellow' },
//     { value: 'approved', label: 'Approved', icon: '✅', color: 'green' },
//     { value: 'rejected', label: 'Rejected', icon: '❌', color: 'red' }
//   ];

//   // Rating options
//   const ratingOptions = [
//     { value: '', label: 'All Ratings' },
//     { value: '5', label: '5 Stars', icon: '⭐⭐⭐⭐⭐' },
//     { value: '4', label: '4 Stars', icon: '⭐⭐⭐⭐' },
//     { value: '3', label: '3 Stars', icon: '⭐⭐⭐' },
//     { value: '2', label: '2 Stars', icon: '⭐⭐' },
//     { value: '1', label: '1 Star', icon: '⭐' }
//   ];

//   // Featured options
//   const featuredOptions = [
//     { value: '', label: 'All Reviews' },
//     { value: 'true', label: 'Featured Only', icon: '🏆' }
//   ];

//   // Check user role
//   useEffect(() => {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserRole(user.role);
//         // Allow both admin and moderator
//         if (user.role !== 'admin' && user.role !== 'moderator') {
//           toast.error('Access denied. Admin or moderator privileges required.');
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

// // In your frontend ManageReviews component
// const fetchReviews = async () => {
//   setLoading(true);
//   try {
//     const token = localStorage.getItem('token');
    
//     // Build query params
//     const params = new URLSearchParams({
//       page: pagination.page,
//       limit: pagination.limit
//     });
    
//     // Only add status filter if it's NOT 'all'
//     if (statusFilter !== 'all') {
//       params.append('status', statusFilter);
//     }
    
//     if (ratingFilter) {
//       params.append('rating', ratingFilter);
//     }
    
//     if (featuredFilter) {
//       params.append('isFeatured', featuredFilter);
//     }
    
//     if (searchTerm) {
//       params.append('search', searchTerm);
//     }

//     console.log('Fetching with params:', params.toString());

//     const response = await fetch(`http://localhost:5000/api/reviews?${params}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     const data = await response.json();
//     console.log('API Response:', data);

//     if (data.success) {
//       setReviews(data.data);
//       setPagination(prev => ({
//         ...prev,
//         total: data.pagination.total,
//         pages: data.pagination.pages
//       }));
//     } else {
//       toast.error(data.error || 'Failed to fetch reviews');
//     }
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     toast.error('Network error. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

//   // Fetch stats
//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
      
//       const [allRes, pendingRes, approvedRes, rejectedRes, featuredRes] = await Promise.all([
//         fetch('http://localhost:5000/api/reviews?limit=1', { headers: { 'Authorization': `Bearer ${token}` } }),
//         fetch('http://localhost:5000/api/reviews?status=pending&limit=1', { headers: { 'Authorization': `Bearer ${token}` } }),
//         fetch('http://localhost:5000/api/reviews?status=approved&limit=1', { headers: { 'Authorization': `Bearer ${token}` } }),
//         fetch('http://localhost:5000/api/reviews?status=rejected&limit=1', { headers: { 'Authorization': `Bearer ${token}` } }),
//         fetch('http://localhost:5000/api/reviews?isFeatured=true&limit=1', { headers: { 'Authorization': `Bearer ${token}` } })
//       ]);

//       const allData = await allRes.json();
//       const pendingData = await pendingRes.json();
//       const approvedData = await approvedRes.json();
//       const rejectedData = await rejectedRes.json();
//       const featuredData = await featuredRes.json();

//       setStats({
//         total: allData.pagination?.total || 0,
//         pending: pendingData.pagination?.total || 0,
//         approved: approvedData.pagination?.total || 0,
//         rejected: rejectedData.pagination?.total || 0,
//         featured: featuredData.pagination?.total || 0
//       });
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   // Initial fetch and on filter change
//   useEffect(() => {
//     fetchReviews();
//     fetchStats();
//   }, [pagination.page, statusFilter, ratingFilter, featuredFilter]);

//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (pagination.page === 1) {
//         fetchReviews();
//       } else {
//         setPagination(prev => ({ ...prev, page: 1 }));
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Handle delete
//   const handleDelete = async () => {
//     if (!deleteModal.review) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/reviews/${deleteModal.review._id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Review deleted successfully');
//         setDeleteModal({ show: false, review: null });
//         fetchReviews();
//         fetchStats();
//       } else {
//         toast.error(data.error || 'Failed to delete review');
//       }
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle toggle featured
//   const handleToggleFeatured = async (reviewId, currentFeatured) => {
//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/feature`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success(`Review ${!currentFeatured ? 'featured' : 'unfeatured'} successfully`);
//         fetchReviews();
//         fetchStats();
//       } else {
//         toast.error(data.error || 'Failed to update featured status');
//       }
//     } catch (error) {
//       console.error('Error toggling featured:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle moderate
//   const handleModerate = async (reviewId, status) => {
//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/moderate`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ status })
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success(`Review ${status} successfully`);
//         fetchReviews();
//         fetchStats();
//       } else {
//         toast.error(data.error || 'Failed to moderate review');
//       }
//     } catch (error) {
//       console.error('Error moderating review:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle add response
//   const handleAddResponse = async () => {
//     if (!responseModal.review || !responseModal.text.trim()) {
//       toast.error('Please enter a response');
//       return;
//     }

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/reviews/${responseModal.review._id}/respond`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ text: responseModal.text })
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Response added successfully');
//         setResponseModal({ show: false, review: null, text: '' });
//         fetchReviews();
//       } else {
//         toast.error(data.error || 'Failed to add response');
//       }
//     } catch (error) {
//       console.error('Error adding response:', error);
//       toast.error('Network error. Please try again.');
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

// // Get status badge - more compact version
// const getStatusBadge = (status) => {
//   switch (status) {
//     case 'approved':
//       return (
//         <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
//           <CheckCircle className="w-3 h-3" />
//           <span className="hidden sm:inline">Approved</span>
//         </span>
//       );
//     case 'rejected':
//       return (
//         <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
//           <XCircle className="w-3 h-3" />
//           <span className="hidden sm:inline">Rejected</span>
//         </span>
//       );
//     case 'pending':
//       return (
//         <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">
//           <Clock className="w-3 h-3" />
//           <span className="hidden sm:inline">Pending</span>
//         </span>
//       );
//     default:
//       return null;
//   }
// };

//   // Star rating display
//   const StarRating = ({ rating }) => {
//     return (
//       <div className="flex items-center gap-0.5 whitespace-nowrap">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-3 h-3 ${
//               star <= rating
//                 ? 'fill-yellow-400 text-yellow-400'
//                 : 'text-gray-300'
//             }`}
//           />
//         ))}
//         <span className="ml-1 text-xs text-gray-500">({rating})</span>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
//                   <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                     userRole === 'admin' 
//                       ? 'bg-blue-100 text-blue-600' 
//                       : 'bg-green-100 text-green-600'
//                   }`}>
//                     {userRole === 'admin' ? 'Admin' : 'Moderator'}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">Moderate and manage customer reviews</p>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-5 gap-4 mt-4">
//             <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//               <p className="text-xs text-gray-500 mb-1">Total Reviews</p>
//               <p className="text-xl font-bold text-gray-900">{stats.total}</p>
//             </div>
//             <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
//               <p className="text-xs text-yellow-600 mb-1">Pending</p>
//               <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
//             </div>
//             <div className="bg-green-50 rounded-lg p-3 border border-green-200">
//               <p className="text-xs text-green-600 mb-1">Approved</p>
//               <p className="text-xl font-bold text-green-700">{stats.approved}</p>
//             </div>
//             <div className="bg-red-50 rounded-lg p-3 border border-red-200">
//               <p className="text-xs text-red-600 mb-1">Rejected</p>
//               <p className="text-xl font-bold text-red-700">{stats.rejected}</p>
//             </div>
//             <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
//               <p className="text-xs text-purple-600 mb-1">Featured</p>
//               <p className="text-xl font-bold text-purple-700">{stats.featured}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search reviews by customer, email, or comment..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//               />
//             </div>

//             {/* Status Filter */}
//             <div className="w-full md:w-40 relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value);
//                   setPagination(prev => ({ ...prev, page: 1 }));
//                 }}
//                 className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition appearance-none bg-white"
//               >
//                 {statusOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.icon} {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Rating Filter */}
//             <div className="w-full md:w-40 relative">
//               <select
//                 value={ratingFilter}
//                 onChange={(e) => {
//                   setRatingFilter(e.target.value);
//                   setPagination(prev => ({ ...prev, page: 1 }));
//                 }}
//                 className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition bg-white"
//               >
//                 {ratingOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Featured Filter */}
//             <div className="w-full md:w-40 relative">
//               <select
//                 value={featuredFilter}
//                 onChange={(e) => {
//                   setFeaturedFilter(e.target.value);
//                   setPagination(prev => ({ ...prev, page: 1 }));
//                 }}
//                 className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition bg-white"
//               >
//                 {featuredOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.icon} {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Table */}
//         {/* Reviews Table */}
// <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//   {loading ? (
//     <div className="flex items-center justify-center py-20">
//       <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
//     </div>
//   ) : reviews.length === 0 ? (
//     <div className="text-center py-20">
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//         <MessageCircle className="w-8 h-8 text-gray-400" />
//       </div>
//       <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
//       <p className="text-sm text-gray-500">There are no reviews matching your criteria</p>
//     </div>
//   ) : (
//     <>
//       <div className="overflow-x-auto">
//         <table className="w-full table-fixed">
//           <colgroup>
//             <col className="w-[22%]" /> {/* Review */}
//             <col className="w-[18%]" /> {/* Customer */}
//             <col className="w-[15%]" /> {/* Product */}
//             <col className="w-[12%]" /> {/* Date */}
//             <col className="w-[10%]" /> {/* Status */}
//             <col className="w-[8%]" />  {/* Featured */}
//             <col className="w-[15%]" /> {/* Actions */}
//           </colgroup>
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
//               <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//               <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//               <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
//               <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {reviews.map((review) => (
//               <tr key={review._id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-3 py-3">
//                   <div className="space-y-1 max-w-[200px]">
//                     <StarRating rating={review.rating} />
//                     {review.title && (
//                       <p className="text-sm font-medium text-gray-900 truncate" title={review.title}>
//                         {review.title}
//                       </p>
//                     )}
//                     <p className="text-xs text-gray-500 truncate" title={review.comment}>
//                       {review.comment}
//                     </p>
//                   </div>
//                 </td>
//                 <td className="px-3 py-3">
//                   <div className="space-y-1 max-w-[160px]">
//                     <div className="flex items-center gap-1.5">
//                       <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                       <span className="text-sm text-gray-600 truncate" title={review.userName}>
//                         {review.userName}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-1.5">
//                       <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                       <span className="text-xs text-gray-500 truncate" title={review.userEmail}>
//                         {review.userEmail}
//                       </span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-3 py-3">
//                   {review.product ? (
//                     <div className="flex items-center gap-1.5 max-w-[130px]">
//                       <Package className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                       <span className="text-sm text-gray-600 truncate" title={review.product.productName}>
//                         {review.product.productName}
//                       </span>
//                     </div>
//                   ) : (
//                     <span className="text-sm text-gray-400">-</span>
//                   )}
//                 </td>
//                 <td className="px-3 py-3">
//                   <div className="flex items-center gap-1.5 whitespace-nowrap">
//                     <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                     <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
//                   </div>
//                 </td>
//                 <td className="px-3 py-3">
//                   <div className="whitespace-nowrap">
//                     {getStatusBadge(review.status)}
//                   </div>
//                 </td>
//                 <td className="px-3 py-3">
//                   <button
//                     onClick={() => handleToggleFeatured(review._id, review.isFeatured)}
//                     disabled={actionLoading}
//                     className={`p-1 rounded-lg transition-colors ${
//                       review.isFeatured 
//                         ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
//                         : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//                     }`}
//                     title={review.isFeatured ? 'Remove from featured' : 'Mark as featured'}
//                   >
//                     <Award className="w-4 h-4" />
//                   </button>
//                 </td>
//                 <td className="px-3 py-3">
//                   <div className="flex items-center justify-end gap-1">
//                     {/* View Button */}
//                     <button
//                       onClick={() => setViewModal({ show: true, review })}
//                       className="p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
//                       title="View Details"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>

//                     {/* Moderate Buttons or Response Button */}
//                     {review.status === 'pending' ? (
//                       <>
//                         <button
//                           onClick={() => handleModerate(review._id, 'approved')}
//                           disabled={actionLoading}
//                           className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                           title="Approve"
//                         >
//                           <CheckCircle className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleModerate(review._id, 'rejected')}
//                           disabled={actionLoading}
//                           className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Reject"
//                         >
//                           <XCircle className="w-4 h-4" />
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => setResponseModal({ show: true, review, text: '' })}
//                         className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                         title="Add Response"
//                       >
//                         <MessageCircle className="w-4 h-4" />
//                       </button>
//                     )}

//                     {/* Delete Button - Admin only */}
//                     {userRole === 'admin' && (
//                       <button
//                         onClick={() => setDeleteModal({ show: true, review })}
//                         className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {pagination.pages > 1 && (
//         <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
//           <p className="text-sm text-gray-500">
//             Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
//           </p>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//               disabled={pagination.page === 1}
//               className="p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <span className="text-sm text-gray-600">
//               Page {pagination.page} of {pagination.pages}
//             </span>
//             <button
//               onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//               disabled={pagination.page === pagination.pages}
//               className="p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   )}
// </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {deleteModal.show && deleteModal.review && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
//             <div className="p-6">
//               <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
//                 <AlertCircle className="w-6 h-6 text-red-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Review</h3>
//               <p className="text-sm text-gray-500 text-center mb-6">
//                 Are you sure you want to delete this review from {deleteModal.review.userName}? This action cannot be undone.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setDeleteModal({ show: false, review: null })}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={actionLoading}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
//                 >
//                   {actionLoading ? 'Deleting...' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Response Modal */}
//       {responseModal.show && responseModal.review && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-bold text-gray-900">Add Response</h3>
//                 <button
//                   onClick={() => setResponseModal({ show: false, review: null, text: '' })}
//                   className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
//               <p className="text-sm text-gray-500 mb-4">
//                 Responding to review by {responseModal.review.userName}
//               </p>
              
//               <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                 <p className="text-xs text-gray-500 mb-1">Original review:</p>
//                 <p className="text-sm text-gray-700">"{responseModal.review.comment}"</p>
//                 <div className="mt-2">
//                   <StarRating rating={responseModal.review.rating} />
//                 </div>
//               </div>

//               <textarea
//                 value={responseModal.text}
//                 onChange={(e) => setResponseModal(prev => ({ ...prev, text: e.target.value }))}
//                 rows="4"
//                 className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//                 placeholder="Write your response..."
//               />
              
//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => setResponseModal({ show: false, review: null, text: '' })}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddResponse}
//                   disabled={actionLoading || !responseModal.text.trim()}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#E39A65] rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50"
//                 >
//                   {actionLoading ? 'Sending...' : 'Send Response'}
//                 </button>
//               </div>
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

//               {/* Customer Info */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Customer Name</p>
//                   <p className="font-medium text-gray-900 flex items-center gap-2">
//                     <User className="w-4 h-4 text-gray-400" />
//                     {viewModal.review.userName}
//                   </p>
//                 </div>
//                 {viewModal.review.userCompany && (
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Company</p>
//                     <p className="text-gray-700">{viewModal.review.userCompany}</p>
//                   </div>
//                 )}
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Email</p>
//                   <p className="text-gray-700 flex items-center gap-2">
//                     <Mail className="w-4 h-4 text-gray-400" />
//                     {viewModal.review.userEmail}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Date</p>
//                   <p className="text-gray-700 flex items-center gap-2">
//                     <Calendar className="w-4 h-4 text-gray-400" />
//                     {formatDate(viewModal.review.createdAt)}
//                   </p>
//                 </div>
//               </div>

//               {/* Product Info */}
//               {viewModal.review.product && (
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Product</p>
//                   <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
//                     <Package className="w-5 h-5 text-[#E39A65]" />
//                     <div>
//                       <p className="font-medium text-gray-900">{viewModal.review.product.productName}</p>
//                       {viewModal.review.product.productId && (
//                         <p className="text-xs text-gray-500">ID: {viewModal.review.product.productId}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Status and Featured */}
//               <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Status</p>
//                   {getStatusBadge(viewModal.review.status)}
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Featured</p>
//                   <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
//                     viewModal.review.isFeatured 
//                       ? 'bg-purple-100 text-purple-700' 
//                       : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     <Award className="w-3 h-3" />
//                     {viewModal.review.isFeatured ? 'Featured' : 'Not Featured'}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 mb-1">Helpful</p>
//                   <span className="flex items-center gap-1 text-sm text-gray-700">
//                     <CheckCircle className="w-4 h-4 text-green-500" />
//                     {viewModal.review.helpfulCount || 0} found this helpful
//                   </span>
//                 </div>
//               </div>

//               {/* Response */}
//               {viewModal.review.response && (
//                 <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//                   <p className="text-xs font-medium text-blue-700 mb-2 flex items-center gap-1">
//                     <MessageCircle className="w-4 h-4" />
//                     Admin Response:
//                   </p>
//                   <p className="text-sm text-blue-800 mb-2">{viewModal.review.response.text}</p>
//                   <p className="text-xs text-blue-600">
//                     Responded on {formatDate(viewModal.review.response.respondedAt)}
//                   </p>
//                 </div>
//               )}

//               {/* Moderation Note */}
//               {viewModal.review.moderationNote && (
//                 <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-xs font-medium text-gray-700 mb-1">Moderation Note:</p>
//                   <p className="text-sm text-gray-600">{viewModal.review.moderationNote}</p>
//                 </div>
//               )}
//             </div>

//             <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
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
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Mail,
  Package,
  X,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export default function ManageReviews() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, review: null });
  const [editModal, setEditModal] = useState({ show: false, review: null, formData: null });
  const [viewModal, setViewModal] = useState({ show: false, review: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [userRole, setUserRole] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    featured: 0
  });

  // Edit form errors
  const [editErrors, setEditErrors] = useState({});

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Status', icon: '📊' },
    { value: 'pending', label: 'Pending', icon: '⏳', color: 'yellow' },
    { value: 'approved', label: 'Approved', icon: '✅', color: 'green' },
    { value: 'rejected', label: 'Rejected', icon: '❌', color: 'red' }
  ];

  // Rating options
  const ratingOptions = [
    { value: '', label: 'All Ratings' },
    { value: '5', label: '5 Stars', icon: '⭐⭐⭐⭐⭐' },
    { value: '4', label: '4 Stars', icon: '⭐⭐⭐⭐' },
    { value: '3', label: '3 Stars', icon: '⭐⭐⭐' },
    { value: '2', label: '2 Stars', icon: '⭐⭐' },
    { value: '1', label: '1 Star', icon: '⭐' }
  ];

  // Featured options
  const featuredOptions = [
    { value: '', label: 'All Reviews' },
    { value: 'true', label: 'Featured Only', icon: '🏆' }
  ];

  // Check user role
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.role);
        // Allow both admin and moderator
        if (user.role !== 'admin' && user.role !== 'moderator') {
          toast.error('Access denied. Admin or moderator privileges required.');
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

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit
      });
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      if (ratingFilter) {
        params.append('rating', ratingFilter);
      }
      
      if (featuredFilter) {
        params.append('isFeatured', featuredFilter);
      }
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      console.log('Fetching with params:', params.toString());

      const response = await fetch(`http://localhost:5000/api/reviews?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        setReviews(data.data);
        setPagination(prev => ({
          ...prev,
          total: data.pagination.total,
          pages: data.pagination.pages
        }));
      } else {
        toast.error(data.error || 'Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const [allRes, pendingRes, approvedRes, rejectedRes, featuredRes] = await Promise.all([
        fetch('http://localhost:5000/api/reviews?limit=1', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/reviews?status=pending&limit=1', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/reviews?status=approved&limit=1', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/reviews?status=rejected&limit=1', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/reviews?isFeatured=true&limit=1', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const allData = await allRes.json();
      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();
      const rejectedData = await rejectedRes.json();
      const featuredData = await featuredRes.json();

      setStats({
        total: allData.pagination?.total || 0,
        pending: pendingData.pagination?.total || 0,
        approved: approvedData.pagination?.total || 0,
        rejected: rejectedData.pagination?.total || 0,
        featured: featuredData.pagination?.total || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Initial fetch and on filter change
  useEffect(() => {
    fetchReviews();
    fetchStats();
  }, [pagination.page, statusFilter, ratingFilter, featuredFilter]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pagination.page === 1) {
        fetchReviews();
      } else {
        setPagination(prev => ({ ...prev, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle delete
  const handleDelete = async () => {
    if (!deleteModal.review) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reviews/${deleteModal.review._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Review deleted successfully');
        setDeleteModal({ show: false, review: null });
        fetchReviews();
        fetchStats();
      } else {
        toast.error(data.error || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle toggle featured
  const handleToggleFeatured = async (reviewId, currentFeatured) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/feature`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Review ${!currentFeatured ? 'featured' : 'unfeatured'} successfully`);
        fetchReviews();
        fetchStats();
      } else {
        toast.error(data.error || 'Failed to update featured status');
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle moderate
  const handleModerate = async (reviewId, status) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/moderate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Review ${status} successfully`);
        fetchReviews();
        fetchStats();
      } else {
        toast.error(data.error || 'Failed to moderate review');
      }
    } catch (error) {
      console.error('Error moderating review:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle edit - open modal with review data
  const handleEditClick = (review) => {
    setEditModal({
      show: true,
      review,
      formData: {
        rating: review.rating,
        title: review.title || '',
        comment: review.comment,
        status: review.status,
        isFeatured: review.isFeatured
      }
    });
    setEditErrors({});
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditModal(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: type === 'checkbox' ? checked : value
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
      const response = await fetch(`http://localhost:5000/api/reviews/${editModal.review._id}`, {
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
        fetchReviews();
        fetchStats();
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
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
            <CheckCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Approved</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
            <XCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Rejected</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">
            <Clock className="w-3 h-3" />
            <span className="hidden sm:inline">Pending</span>
          </span>
        );
      default:
        return null;
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    userRole === 'admin' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {userRole === 'admin' ? 'Admin' : 'Moderator'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Moderate and manage customer reviews</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-4 mt-4">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Total Reviews</p>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <p className="text-xs text-yellow-600 mb-1">Pending</p>
              <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-xs text-green-600 mb-1">Approved</p>
              <p className="text-xl font-bold text-green-700">{stats.approved}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
              <p className="text-xs text-red-600 mb-1">Rejected</p>
              <p className="text-xl font-bold text-red-700">{stats.rejected}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <p className="text-xs text-purple-600 mb-1">Featured</p>
              <p className="text-xl font-bold text-purple-700">{stats.featured}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews by customer, email, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-40 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition appearance-none bg-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="w-full md:w-40 relative">
              <select
                value={ratingFilter}
                onChange={(e) => {
                  setRatingFilter(e.target.value);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition bg-white"
              >
                {ratingOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Filter */}
            <div className="w-full md:w-40 relative">
              <select
                value={featuredFilter}
                onChange={(e) => {
                  setFeaturedFilter(e.target.value);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition bg-white"
              >
                {featuredOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-sm text-gray-500">There are no reviews matching your criteria</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                 <colgroup>
  {[
    'w-[22%]', // Review
    'w-[18%]', // Customer
    'w-[15%]', // Product
    'w-[12%]', // Date
    'w-[10%]', // Status
    'w-[8%]',  // Featured
    'w-[15%]'  // Actions
  ].map((width, index) => (
    <col key={index} className={width} />
  ))}
</colgroup>
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reviews.map((review) => (
                      <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-3">
                          <div className="space-y-1 max-w-[200px]">
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
                        <td className="px-3 py-3">
                          <div className="space-y-1 max-w-[160px]">
                            <div className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-600 truncate" title={review.userName}>
                                {review.userName}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                              <span className="text-xs text-gray-500 truncate" title={review.userEmail}>
                                {review.userEmail}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          {review.product ? (
                            <div className="flex items-center gap-1.5 max-w-[130px]">
                              <Package className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-600 truncate" title={review.product.productName}>
                                {review.product.productName}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="whitespace-nowrap">
                            {getStatusBadge(review.status)}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <button
                            onClick={() => handleToggleFeatured(review._id, review.isFeatured)}
                            disabled={actionLoading}
                            className={`p-1 rounded-lg transition-colors ${
                              review.isFeatured 
                                ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                            title={review.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-end gap-1">
                            {/* View Button */}
                            <button
                              onClick={() => setViewModal({ show: true, review })}
                              className="p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Edit Button - NEW */}
                            <button
                              onClick={() => handleEditClick(review)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Review"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* Moderate Buttons (only for pending) */}
                            {review.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleModerate(review._id, 'approved')}
                                  disabled={actionLoading}
                                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleModerate(review._id, 'rejected')}
                                  disabled={actionLoading}
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}

                            {/* Delete Button - Admin only */}
                            {userRole === 'admin' && (
                              <button
                                onClick={() => setDeleteModal({ show: true, review })}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={pagination.page === 1}
                      className="p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={pagination.page === pagination.pages}
                      className="p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && deleteModal.review && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Review</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete this review from {deleteModal.review.userName}? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ show: false, review: null })}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Review Modal */}
      {editModal.show && editModal.review && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Edit Review</h3>
              <button
                onClick={() => setEditModal({ show: false, review: null, formData: null })}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Customer Info (Read-only) */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Review by</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E39A65] flex items-center justify-center text-white font-bold">
                    {editModal.review.userName?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{editModal.review.userName}</p>
                    <p className="text-sm text-gray-500">{editModal.review.userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Product Info (Read-only) */}
              {editModal.review.product && (
                <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-xs text-orange-600 mb-1">Product</p>
                  <p className="font-medium text-gray-900">{editModal.review.product.productName}</p>
                </div>
              )}

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {/* Rating Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <StarRating 
                    rating={editModal.formData.rating} 
                    size="w-8 h-8"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editModal.formData.title}
                    onChange={handleEditChange}
                    placeholder="Review title"
                    maxLength="100"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Comment <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="comment"
                    value={editModal.formData.comment}
                    onChange={handleEditChange}
                    rows="4"
                    maxLength="500"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-white transition-all resize-none"
                    placeholder="Review comment..."
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
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {editErrors.submit}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditModal({ show: false, review: null, formData: null })}
                    className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={actionLoading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {actionLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
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

      {/* View Details Modal */}
      {viewModal.show && viewModal.review && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Review Details</h3>
              <button
                onClick={() => setViewModal({ show: false, review: null })}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Rating and Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={viewModal.review.rating} />
                  <span className="text-xs text-gray-500">({viewModal.review.rating}/5)</span>
                </div>
                {viewModal.review.title && (
                  <h4 className="text-lg font-semibold text-gray-900">{viewModal.review.title}</h4>
                )}
              </div>

              {/* Review Comment */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">{viewModal.review.comment}</p>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Customer Name</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {viewModal.review.userName}
                  </p>
                </div>
                {viewModal.review.userCompany && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Company</p>
                    <p className="text-gray-700">{viewModal.review.userCompany}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {viewModal.review.userEmail}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(viewModal.review.createdAt)}
                  </p>
                </div>
              </div>

              {/* Product Info */}
              {viewModal.review.product && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Product</p>
                  <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <Package className="w-5 h-5 text-[#E39A65]" />
                    <div>
                      <p className="font-medium text-gray-900">{viewModal.review.product.productName}</p>
                      {viewModal.review.product._id && (
                        <p className="text-xs text-gray-500">ID: {viewModal.review.product._id}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Status and Featured */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  {getStatusBadge(viewModal.review.status)}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Featured</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    viewModal.review.isFeatured 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Award className="w-3 h-3" />
                    {viewModal.review.isFeatured ? 'Featured' : 'Not Featured'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Helpful</p>
                  <span className="flex items-center gap-1 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {viewModal.review.helpfulCount || 0} found this helpful
                  </span>
                </div>
              </div>

              {/* Moderation Info */}
              {viewModal.review.moderatedBy && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-1">Moderated by:</p>
                  <p className="text-sm text-gray-600">
                    {viewModal.review.moderatedBy.contactPerson || viewModal.review.moderatedBy.email}
                  </p>
                  {viewModal.review.moderatedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      on {formatDate(viewModal.review.moderatedAt)}
                    </p>
                  )}
                  {viewModal.review.moderationNote && (
                    <>
                      <p className="text-xs font-medium text-gray-700 mt-3 mb-1">Moderation Note:</p>
                      <p className="text-sm text-gray-600">{viewModal.review.moderationNote}</p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => setViewModal({ show: false, review: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
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