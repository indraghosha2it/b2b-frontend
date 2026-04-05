

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
  BookOpen,
  Award,
  Sparkles,
  Flame,
  Layers,
  Grid3x3,
  Heart,
  MessageCircle,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [latestFeaturedBlog, setLatestFeaturedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  
  const blogsPerPage = 8;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm === '') {
        // Immediately fetch when search is cleared
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Categories
  const categories = [
    { value: 'all', label: 'All Posts', icon: '📰', color: 'from-gray-500 to-gray-600' },
    { value: 'fashion-trends', label: 'Fashion Trends', icon: '👗', color: 'from-pink-500 to-rose-500' },
    { value: 'wholesale-guide', label: 'Wholesale Guide', icon: '📦', color: 'from-blue-500 to-indigo-500' },
    { value: 'industry-news', label: 'Industry News', icon: '📰', color: 'from-purple-500 to-violet-500' },
    { value: 'style-tips', label: 'Style Tips', icon: '✨', color: 'from-amber-500 to-orange-500' },
    { value: 'business-tips', label: 'Business Tips', icon: '💼', color: 'from-emerald-500 to-teal-500' },
    { value: 'fabric-and-quality', label: 'Fabric and Quality', icon: '🧵', color: 'from-stone-500 to-neutral-500' },
    { value: 'customer-stories', label: 'Customer Stories', icon: '👥', color: 'from-cyan-500 to-sky-500' },
    { value: 'case-studies', label: 'Case Studies', icon: '📊', color: 'from-indigo-500 to-purple-500' },
    { value: 'product-guide', label: 'Product Guide', icon: '📖', color: 'from-lime-500 to-green-500' },
    { value: 'others', label: 'Others', icon: '📌', color: 'from-gray-500 to-slate-500' }
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
          ...(debouncedSearchTerm && { search: debouncedSearchTerm })
        });

        const response = await fetch(`http://localhost:5000/api/blogs?${params}`);
        const data = await response.json();

        if (data.success) {
          setBlogs(data.data);
          setTotalPages(data.pagination.pages);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, selectedCategory, debouncedSearchTerm]);

  // Fetch latest featured blog
  useEffect(() => {
    const fetchLatestFeatured = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs?featured=true&limit=1&sort=-publishDate');
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setLatestFeaturedBlog(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching featured blog:', error);
      }
    };

    fetchLatestFeatured();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate reading time
  const getReadingTime = (content) => {
    const wordsPerMinute = 60;
    const wordCount = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Get category details
  const getCategoryDetails = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || categories[0];
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    setDebouncedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // If search is cleared, immediately update debounced term and reset to page 1
    if (value === '') {
      setDebouncedSearchTerm('');
      setCurrentPage(1);
    }
  };

  // Clear search function
  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setCurrentPage(1);
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Simple Header with Search - Animated */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-8 bg-white border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <motion.div 
            className="flex flex-col items-center text-center"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            >
              Fashion Insights Blog
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-500 mb-6 max-w-2xl"
            >
              Expert advice, wholesale tips, and the latest trends for your fashion business
            </motion.p>
            
            {/* Search Bar - Animated */}
            <motion.form 
              variants={fadeInUp}
              onSubmit={handleSearch} 
              className="w-full max-w-xl"
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-5 py-3 pr-24 text-base bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65]/20 focus:border-[#E39A65] outline-none transition"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  {searchTerm && (
                    <motion.button
                      type="button"
                      onClick={clearSearch}
                      className="p-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Clear search"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  )}
                  <motion.button
                    type="submit"
                    className="p-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.form>

            {/* Active search indicator */}
            {debouncedSearchTerm && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-gray-500 mt-3"
              >
                Showing results for: <span className="font-medium text-[#E39A65]">"{debouncedSearchTerm}"</span>
              </motion.p>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Post - Animated */}
      {latestFeaturedBlog && currentPage === 1 && !debouncedSearchTerm && selectedCategory === 'all' && (
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="py-8 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="mb-4 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Award className="w-5 h-5 text-[#E39A65]" />
              </motion.div>
              <h2 className="text-lg font-semibold text-gray-900">Featured Post</h2>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={`/blog/blogDetailsPage?id=${latestFeaturedBlog._id}`} className="group block">
                <motion.div 
                  className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl"
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                >
                  <div className="absolute inset-0">
                    {latestFeaturedBlog.featuredImage ? (
                      <motion.img
                        src={latestFeaturedBlog.featuredImage}
                        alt={latestFeaturedBlog.title}
                        className="w-full h-full object-cover opacity-30"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 10, repeat: Infinity }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-[#E39A65]/20 to-amber-600/20"></div>
                    )}
                  </div>
                  
                  <div className="relative p-8 md:p-12">
                    <div className="max-w-3xl">
                      {/* Meta */}
                      <motion.div 
                        className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.span 
                          className="flex items-center gap-1"
                          whileHover={{ color: "#E39A65", x: 2 }}
                        >
                          <Calendar className="w-4 h-4" />
                          {formatDate(latestFeaturedBlog.publishDate)}
                        </motion.span>
                        <motion.span 
                          className="flex items-center gap-1"
                          whileHover={{ color: "#E39A65", x: 2 }}
                        >
                          <User className="w-4 h-4" />
                          {latestFeaturedBlog.author}
                        </motion.span>
                        <motion.span 
                          className="flex items-center gap-1"
                          whileHover={{ color: "#E39A65", x: 2 }}
                        >
                          <Clock className="w-4 h-4" />
                          {getReadingTime(latestFeaturedBlog.content)} min read
                        </motion.span>
                      </motion.div>
                      
                      {/* Category Badge */}
                      <motion.span 
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                      >
                        <span>{getCategoryDetails(latestFeaturedBlog.category).icon}</span>
                        <span>{getCategoryDetails(latestFeaturedBlog.category).label}</span>
                      </motion.span>
                      
                      {/* Title */}
                      <motion.h3 
                        className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#E39A65] transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {latestFeaturedBlog.title}
                      </motion.h3>
                      
                      {/* Excerpt */}
                      <motion.p 
                        className="text-white/80 mb-6 line-clamp-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        {latestFeaturedBlog.excerpt}
                      </motion.p>
                      
                      {/* Read More */}
                      <motion.span 
                        className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ x: 5 }}
                      >
                        Read full story
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Main Content Area */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Categories */}
            <motion.div 
              className="lg:w-1/4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sticky top-24 space-y-4">
                <motion.div 
                  className="flex items-center gap-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Filter className="w-4 h-4 text-[#E39A65]" />
                  <h3 className="font-semibold text-gray-900">Categories</h3>
                </motion.div>
                
                <motion.div 
                  className="space-y-1"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                >
                  {categories.map((category) => (
                    <motion.button
                      key={category.value}
                      variants={fadeInUp}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm ${
                        selectedCategory === category.value
                          ? `bg-gradient-to-r ${category.color} text-white`
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={selectedCategory === category.value ? { rotate: [0, 10, -10, 0] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {category.icon}
                        </motion.span>
                        <span>{category.label}</span>
                      </span>
                      {selectedCategory === category.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Blog Grid */}
            <div className="lg:w-3/4">
              {/* Header with View Toggle */}
              <motion.div 
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Latest Articles</h2>
                  {selectedCategory !== 'all' && (
                    <motion.p 
                      className="text-sm text-gray-500 mt-0.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Showing posts in {getCategoryDetails(selectedCategory).label}
                    </motion.p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <motion.div 
                    className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-md transition ${
                        viewMode === 'grid' ? 'bg-white shadow-sm text-[#E39A65]' : 'text-gray-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-md transition ${
                        viewMode === 'list' ? 'bg-white shadow-sm text-[#E39A65]' : 'text-gray-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Layers className="w-4 h-4" />
                    </motion.button>
                  </motion.div>

                  {/* Clear Filters */}
                  {(selectedCategory !== 'all' || debouncedSearchTerm) && (
                    <motion.button
                      onClick={() => {
                        setSelectedCategory('all');
                        clearSearch();
                      }}
                      className="text-sm text-[#E39A65] hover:text-[#d48b54] font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      Clear
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Blog Grid/List */}
              {loading ? (
                <motion.div 
                  className="flex justify-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div 
                    className="w-10 h-10 border-3 border-gray-200 border-t-[#E39A65] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                </motion.div>
              ) : blogs.length === 0 ? (
                <motion.div 
                  className="text-center py-12 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No articles found</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your search or filter</p>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    className={viewMode === 'grid' 
                      ? "grid grid-cols-1 md:grid-cols-2 gap-5" 
                      : "space-y-3"
                    }
                    variants={staggerChildren}
                    initial="initial"
                    animate="animate"
                  >
                    {blogs.map((blog, index) => (
                      <motion.div
                        key={blog._id}
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <Link
                          href={`/blog/blogDetailsPage?id=${blog._id}`}
                          className="group"
                        >
                          <motion.article 
                            className={`
                              relative bg-white rounded-xl border border-gray-200 overflow-hidden 
                              hover:shadow-lg hover:border-[#E39A65]/30 transition-all
                              ${viewMode === 'list' ? 'flex' : 'flex-col h-full'}
                            `}
                            whileHover={{ 
                              y: -5,
                              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {/* Image */}
                            <motion.div 
                              className={`
                                relative overflow-hidden bg-gray-100
                                ${viewMode === 'list' 
                                  ? 'w-36 h-36 flex-shrink-0' 
                                  : 'h-48 w-full'
                                }
                              `}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            >
                              {blog.featuredImage ? (
                                <img
                                  src={blog.featuredImage}
                                  alt={blog.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <BookOpen className="w-8 h-8 text-gray-300" />
                                </div>
                              )}
                              
                              {/* Reading Time Badge */}
                              <motion.div 
                                className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-sm"
                                whileHover={{ scale: 1.1 }}
                              >
                                {getReadingTime(blog.content)} min read
                              </motion.div>
                            </motion.div>

                            {/* Content */}
                            <div className={`p-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-center' : ''}`}>
                              {/* Meta */}
                              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                <motion.span 
                                  className="flex items-center gap-1"
                                  whileHover={{ color: "#E39A65" }}
                                >
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(blog.publishDate)}
                                </motion.span>
                                <motion.span 
                                  className="flex items-center gap-1"
                                  whileHover={{ color: "#E39A65" }}
                                >
                                  <User className="w-3 h-3" />
                                  {blog.author}
                                </motion.span>
                              </div>

                              {/* Title */}
                              <motion.h3 
                                className="font-semibold text-gray-900 group-hover:text-[#E39A65] transition-colors line-clamp-2 mb-2"
                                whileHover={{ x: 2 }}
                              >
                                {blog.title}
                              </motion.h3>

                              {/* Excerpt - Grid only */}
                              {viewMode === 'grid' && (
                                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                  {blog.excerpt}
                                </p>
                              )}

                              {/* Footer */}
                              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                                <motion.span 
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <span>{getCategoryDetails(blog.category).icon}</span>
                                  <span className="text-xs">{getCategoryDetails(blog.category).label}</span>
                                </motion.span>

                                <motion.span 
                                  className="inline-flex items-center gap-1 text-sm font-medium text-[#E39A65]"
                                  whileHover={{ x: 2 }}
                                >
                                  Read
                                  <ChevronRight className="w-3 h-3" />
                                </motion.span>
                              </div>
                            </div>

                            {/* Trending Badge */}
                            {index === 0 && (
                              <motion.div 
                                className="absolute top-2 left-2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.5 }}
                              >
                                <motion.div 
                                  className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full shadow"
                                  animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Flame className="w-3 h-3" />
                                  <span>Trending</span>
                                </motion.div>
                              </motion.div>
                            )}
                          </motion.article>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination - Animated */}
                  {totalPages > 1 && (
                    <motion.div 
                      className="flex justify-center gap-2 mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-[#E39A65] disabled:opacity-50"
                        whileHover={{ scale: 1.05, borderColor: "#E39A65" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Previous
                      </motion.button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <motion.button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 text-sm font-medium rounded-lg transition ${
                            currentPage === i + 1
                              ? 'bg-[#E39A65] text-white'
                              : 'text-gray-600 bg-white border border-gray-200 hover:border-[#E39A65]'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {i + 1}
                        </motion.button>
                      ))}
                      
                      <motion.button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-[#E39A65] disabled:opacity-50"
                        whileHover={{ scale: 1.05, borderColor: "#E39A65" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Next
                      </motion.button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}