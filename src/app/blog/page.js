'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { 
  Calendar, 
  User, 
  Tag, 
  Eye, 
  ChevronRight, 
  Search,
  Clock,
  ArrowRight,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popularTags, setPopularTags] = useState([]);
  
  const blogsPerPage = 9;

  // Categories
  const categories = [
    { value: 'all', label: 'All Posts', icon: '📰' },
    { value: 'fashion-trends', label: 'Fashion Trends', icon: '👗' },
    { value: 'wholesale-guide', label: 'Wholesale Guide', icon: '📦' },
    { value: 'industry-news', label: 'Industry News', icon: '📰' },
    { value: 'style-tips', label: 'Style Tips', icon: '✨' },
    { value: 'business-tips', label: 'Business Tips', icon: '💼' },
    { value: 'fabric-and-quality', label: 'Fabric & Quality', icon: '🧵' },
    { value: 'customer-stories', label: 'Customer Stories', icon: '👥' },
    { value: 'product-guide', label: 'Product Guide', icon: '📖' }
  ];

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: blogsPerPage,
          ...(selectedCategory !== 'all' && { category: selectedCategory }),
          ...(searchTerm && { search: searchTerm })
        });

        const response = await fetch(`http://localhost:5000/api/blogs?${params}`);
        const data = await response.json();

        if (data.success) {
          setBlogs(data.data);
          setTotalPages(data.pagination.pages);
          
          // Extract popular tags
          const allTags = data.data.flatMap(blog => blog.tags || []);
          const tagCount = allTags.reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
          }, {});
          
          const sortedTags = Object.entries(tagCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([tag]) => tag);
          
          setPopularTags(sortedTags);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, selectedCategory, searchTerm]);

  // Fetch featured blogs separately
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs?featured=true&limit=3');
        const data = await response.json();
        if (data.success) {
          setFeaturedBlogs(data.data);
        }
      } catch (error) {
        console.error('Error fetching featured blogs:', error);
      }
    };

    fetchFeatured();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time
  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat?.icon || '📄';
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-amber-50 pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fashion <span className="text-[#E39A65]">Insights</span> & Industry Trends
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert advice, wholesale tips, and the latest trends to grow your fashion business
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pr-14 text-lg border border-gray-200 rounded-full focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-[#E39A65] text-white rounded-full hover:bg-[#d48b54] transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content - Blog Grid */}
            <div className="lg:w-2/3">
              {/* Featured Posts */}
              {featuredBlogs.length > 0 && currentPage === 1 && !searchTerm && selectedCategory === 'all' && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-[#E39A65]" />
                    <h2 className="text-xl font-semibold text-gray-900">Featured Posts</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredBlogs.map((blog) => (
                      <Link
                        key={blog._id}
                        href={`/blog/blogDetailsPage?id=${blog._id}`}
                        className="group h-full"
                      >
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden flex-shrink-0">
                            {blog.featuredImage ? (
                              <img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-[#E39A65] opacity-50" />
                              </div>
                            )}
                            <div className="absolute top-3 left-3 bg-[#E39A65] text-white text-xs px-2 py-1 rounded-full">
                              Featured
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(blog.publishDate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {getReadingTime(blog.content)}
                              </span>
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#E39A65] transition-colors line-clamp-2 mb-2 min-h-[3rem]">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                              {blog.excerpt}
                            </p>
                            <div className="mt-auto pt-2">
                              <span className="inline-flex items-center gap-1 text-xs text-[#E39A65] group-hover:gap-2 transition-all duration-300">
                                Read More
                                <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Grid */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E39A65]"></div>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-4">
                    <BookOpen className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
                    {blogs.map((blog) => (
                      <Link
                        key={blog._id}
                        href={`/blog/blogDetailsPage?id=${blog._id}`}
                        className="group h-full"
                      >
                        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          {/* Image section - fixed height */}
                          <div className="relative h-48 overflow-hidden flex-shrink-0">
                            {blog.featuredImage ? (
                              <img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                                <BookOpen className="w-16 h-16 text-[#E39A65] opacity-30" />
                              </div>
                            )}
                          </div>
                          
                          {/* Content section - flex column with consistent spacing */}
                          <div className="p-6 flex-1 flex flex-col">
                            {/* Meta info - fixed height line */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 min-h-[1.5rem]">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(blog.publishDate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {blog.author}
                              </span>
                            </div>

                            {/* Title - fixed height for 2 lines */}
                            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#E39A65] transition-colors line-clamp-2 mb-3 min-h-[3.5rem]">
                              {blog.title}
                            </h2>
                            
                            {/* Excerpt - flex-grow to push bottom content */}
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1 min-h-[4.5rem]">
                              {blog.excerpt}
                            </p>

                            {/* Category and Read More - fixed at bottom */}
                            <div className="flex items-center justify-between mt-auto pt-2">
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
                                {getCategoryIcon(blog.category)} {categories.find(c => c.value === blog.category)?.label || blog.category}
                              </span>
                              
                              <span className="inline-flex items-center gap-1 text-sm text-[#E39A65] group-hover:gap-2 transition-all duration-300">
                                Read More
                                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === i + 1
                              ? 'bg-[#E39A65] text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => {
                          setSelectedCategory(category.value);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.value
                            ? 'bg-[#E39A65] text-white'
                            : 'text-gray-600 hover:bg-orange-50 hover:text-[#E39A65]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.label}</span>
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                {popularTags.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSearchTerm(tag);
                            setCurrentPage(1);
                          }}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#E39A65] hover:text-white transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-sm border border-orange-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest fashion trends and wholesale tips delivered to your inbox.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-[#E39A65] text-white text-sm font-medium rounded-lg hover:bg-[#d48b54] transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-3">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}