'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  User,
  Tag,
  CheckCircle,
  XCircle,
  Loader2,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

export default function ModeratorBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Categories for filter
  const categories = [
    { value: 'fashion-trends', label: 'Fashion Trends', icon: '👗' },
    { value: 'wholesale-guide', label: 'Wholesale Guide', icon: '📦' },
    { value: 'industry-news', label: 'Industry News', icon: '📰' },
    { value: 'style-tips', label: 'Style Tips', icon: '✨' },
    { value: 'business-tips', label: 'Business Tips', icon: '💼' },
    { value: 'fabric-and-quality', label: 'Fabric and Quality', icon: '🧵' },
    { value: 'customer-stories', label: 'Customer Stories', icon: '👥' },
    { value: 'case-studies', label: 'Case Studies', icon: '📊' },
    { value: 'product-guide', label: 'Product Guide', icon: '📖' },
    { value: 'others', label: 'Others', icon: '📌' }
  ];

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active', icon: '✅' },
    { value: 'inactive', label: 'Inactive', icon: '❌' }
  ];

  // Check user role - MODERATOR ONLY
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Allow ONLY moderator
        if (user.role !== 'moderator') {
          toast.error('Access denied. Moderator privileges required.');
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

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Build query params
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit
      });
      
      if (categoryFilter !== 'all') {
        params.append('category', categoryFilter);
      }
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/blogs/admin/all?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
        setPagination(prev => ({
          ...prev,
          total: data.total,
          pages: data.pages
        }));
      } else {
        toast.error(data.error || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and on filter change
  useEffect(() => {
    fetchBlogs();
  }, [pagination.page, categoryFilter, statusFilter, searchTerm]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pagination.page === 1) {
        fetchBlogs();
      } else {
        setPagination(prev => ({ ...prev, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get category details
  const getCategoryDetails = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || { label: categoryValue, icon: '📄' };
  };

  // Get status badge
  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
        <CheckCircle className="w-3 h-3" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
        <XCircle className="w-3 h-3" />
        Inactive
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
  <div className="px-4 sm:px-6 py-3 sm:py-4">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Left Section - Title and Badge */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
            Blog Management
          </h1>
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-600 text-[8px] sm:text-xs font-medium rounded-full whitespace-nowrap">
            Moderator
          </span>
        </div>
        <p className="text-[10px] sm:text-sm text-gray-500 mt-0.5 truncate">
          Manage blog posts
        </p>
      </div>

      {/* Right Section - Create Blog Button */}
      <div className="flex sm:justify-end">
        <Link
          href="/moderator/create-blog"
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-[10px] sm:text-sm font-medium w-full sm:w-auto"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Create New Blog</span>
        </Link>
      </div>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs by title, author, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
              />
            </div>
          <div className="flex flex-col md:flex-row gap-4">
          

            {/* Category Filter */}
            <div className="w-full md:w-48 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-40 relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition bg-white"
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

        {/* Blogs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
              <p className="text-sm text-gray-500 mb-6">Get started by creating your first blog post</p>
              <Link
                href="/moderator/create-blog"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Create New Blog
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {blogs.map((blog) => {
                      const category = getCategoryDetails(blog.category);
                      return (
                        <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                {blog.featuredImage ? (
                                  <img 
                                    src={blog.featuredImage} 
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[250px]">
                                  {blog.title}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-1 max-w-[250px]">
                                  {blog.excerpt}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{blog.author}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
                              {category.icon} {category.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(blog.isActive)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{formatDate(blog.publishDate)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {/* View Link - Navigates to public blog details page */}
                              <Link
                                href={`/blog/blogDetailsPage?id=${blog._id}`}
                                className="p-2 text-gray-400 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
                                title="View"
                                target="_blank"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              
                              {/* Edit Link */}
                              <Link
                                href={`/moderator/editBlog?id=${blog._id}`}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
    </div>
  );
}