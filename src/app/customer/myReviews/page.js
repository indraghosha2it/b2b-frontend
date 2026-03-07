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
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

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

  // Edit form errors
  const [editErrors, setEditErrors] = useState({});

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Reviews' },
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

  // Fetch user's reviews
  const fetchMyReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Build query params
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit
      });
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`http://localhost:5000/api/reviews/user/me?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

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

  // Initial fetch and on filter change
  useEffect(() => {
    fetchMyReviews();
  }, [pagination.page, statusFilter]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pagination.page === 1) {
        fetchMyReviews();
      } else {
        setPagination(prev => ({ ...prev, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
            <Clock className="w-3 h-3" />
            Pending
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
              <p className="text-sm text-gray-500 mt-1">View and manage your product reviews</p>
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
                placeholder="Search your reviews by title or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48 relative">
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-sm text-gray-500 mb-6">You haven't written any reviews yet.</p>
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-sm font-medium"
              >
                Browse Products to Review
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
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
                            {/* View Button */}
                            <button
                              onClick={() => setViewModal({ show: true, review })}
                              className="p-1.5 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Edit Button - Show for all reviews but disable if not pending */}
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
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reviews
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

      {/* Edit Review Modal */}
      {editModal.show && editModal.review && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Edit Your Review</h3>
              <button
                onClick={() => setEditModal({ show: false, review: null, formData: null })}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Product Info (Read-only) */}
              {editModal.review.product && (
                <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-xs text-orange-600 mb-1">Product</p>
                  <p className="font-medium text-gray-900">{editModal.review.product.productName}</p>
                </div>
              )}

              {/* Status Info */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-600 mb-1">Review Status</p>
                <div className="flex items-center gap-2">
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
                    placeholder="Summarize your experience"
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

              {/* Product Info */}
              {viewModal.review.product && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Product</p>
                  <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <Package className="w-5 h-5 text-[#E39A65]" />
                    <span className="font-medium text-gray-900">{viewModal.review.product.productName}</span>
                  </div>
                </div>
              )}

              {/* Date and Status */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(viewModal.review.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  {getStatusBadge(viewModal.review.status)}
                </div>
              </div>

              {/* Moderation Note (if any) */}
              {viewModal.review.moderationNote && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-1">Moderation Note:</p>
                  <p className="text-sm text-gray-600">{viewModal.review.moderationNote}</p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
              {viewModal.review.status === 'pending' && (
                <button
                  onClick={() => {
                    setViewModal({ show: false });
                    handleEditClick(viewModal.review);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#E39A65] rounded-lg hover:bg-[#d48b54] transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Review
                </button>
              )}
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