'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { 
  Calendar,
  User,
  Tag,
  Eye,
  Clock,
  ArrowLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Image as ImageIcon,
  X,
  BookOpen,
  FileText,
  Package,
  Users,
  CheckCircle,
  Youtube
} from 'lucide-react';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

export default function BlogDetailsClient() {
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  
  // Video player state
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isMuted, setIsMuted] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const videoRef = React.useRef(null);

  // Categories for reference
  const categories = [
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

  // Fetch blog details
  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!blogId) {
        setLoading(false);
        setError('No blog ID provided');
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
        const data = await response.json();
        
        if (data.success) {
          setBlog(data.data);
          // Parse paragraphs if they're stringified
          if (typeof data.data.paragraphs === 'string') {
            data.data.paragraphs = JSON.parse(data.data.paragraphs);
          }
          
          // Fetch related posts
          fetchRelatedPosts(data.data.category, data.data._id);
        } else {
          setError('Blog post not found');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  // Fetch related posts
  const fetchRelatedPosts = async (category, currentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs?category=${category}&limit=3`);
      const data = await response.json();
      if (data.success) {
        setRelatedPosts(data.data.filter(post => post._id !== currentId).slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

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
    const wordsPerMinute = 60;
    const wordCount = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Get category details
  const getCategoryDetails = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || categories[0];
  };

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.target.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Scroll to section function for table of contents
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[#E39A65] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-500">Loading amazing content...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">😕</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Post Not Found</h1>
            <p className="text-gray-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-xl hover:bg-[#d48b54] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const categoryDetails = getCategoryDetails(blog.category);

  return (
    <>
      <Navbar />
      
      {/* Image Modal */}
      {showImageModal && activeImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <button 
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={activeImage} 
            alt="Full size" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Back to Blog Link */}
      <div className="pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E39A65] transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section with Featured Image */}
      <section className="bg-white pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {blog.featuredImage ? (
              <>
                <img 
                  src={blog.featuredImage} 
                  alt={blog.title}
                  className="w-full h-[500px] object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </>
            ) : (
              <div className="w-full h-[500px] bg-gradient-to-r from-[#E39A65]/20 to-amber-600/20 flex items-center justify-center">
                <span className="text-8xl opacity-20">{categoryDetails.icon}</span>
              </div>
            )}

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-4xl">
                {/* Category Badge */}
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-xl">{categoryDetails.icon}</span>
                  <span className="text-white font-medium">{categoryDetails.label}</span>
                </motion.div>

                {/* Title */}
                <motion.h1 
                  className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {blog.title}
                </motion.h1>

                {/* Meta Info */}
                <motion.div 
                  className="flex flex-wrap items-center gap-6 text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span>{formatDate(blog.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      <User className="w-4 h-4" />
                    </div>
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span>{getReadingTime(blog.content)} min read</span>
                  </div>
                 
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content Area */}
            <div className="lg:w-2/3">
              {/* Excerpt */}
              <motion.div 
                className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mb-8 border border-orange-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-lg text-gray-700 italic leading-relaxed">
                  "{blog.excerpt}"
                </p>
              </motion.div>

              {/* Main Content with Rich Text - Using same styles as product description */}
              <motion.div 
                className="blog-content prose prose-lg max-w-none mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* YouTube Video Section */}
{blog.youtubeVideo && blog.youtubeVideo.videoId && (
  <motion.div 
    className="mb-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <Youtube className="w-6 h-6 text-red-600" />
      Featured Video
    </h3>
    <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${blog.youtubeVideo.videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  </motion.div>
)}

              {/* Additional Sections with Rich Text */}
              {blog.paragraphs && blog.paragraphs.length > 0 && (
                <motion.div 
                  className="space-y-8 mb-12"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                >
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#E39A65] rounded-lg flex items-center justify-center text-white text-sm">+</span>
                    In-Depth Analysis
                  </h3>
                  
                  {blog.paragraphs.map((section, index) => {
                    const sectionId = `section-${index}`;
                    return (
                      <motion.div 
                        key={index}
                        id={sectionId}
                        className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow scroll-mt-24"
                        variants={fadeInUp}
                      >
                        <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-[#E39A65]/20 rounded-lg flex items-center justify-center text-[#E39A65] font-bold text-sm">
                            {index + 1}
                          </span>
                          {section.header}
                        </h4>
                        <div 
                          className="blog-content prose max-w-none text-gray-600"
                          dangerouslySetInnerHTML={{ __html: section.description }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Thumbnail Gallery - Using the url property from objects */}
              {blog.thumbnailImages && blog.thumbnailImages.length > 0 && (
                <motion.div 
                  className="mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-[#E39A65]" />
                    Photo Gallery
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {blog.thumbnailImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => {
                          setActiveImage(image.url);
                          setShowImageModal(true);
                        }}
                      >
                        <img 
                          src={image.url} 
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <motion.div 
                  className="border-t border-gray-200 pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#E39A65]" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#E39A65] hover:text-white transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Author Card - Simplified without follow button */}
               <motion.div 
  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2 }}
>
  <div className="flex items-center gap-4 mb-4">
    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
      <img 
        src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
        alt="Asian Clothify"
        className="w-full h-full object-contain"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/100?text=AC';
        }}
      />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">Asian Clothify</h4>
      <p className="text-sm text-gray-500">Official Blog</p>
    </div>
  </div>
  <p className="text-sm text-gray-600">
    Expert insights from Asian Clothify's fashion and wholesale specialists. 
    Bringing you the latest trends and industry knowledge.
  </p>
</motion.div>

                {/* Table of Contents - With working links */}
                <motion.div 
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#E39A65]" />
                    Table of Contents
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-sm text-gray-600 hover:text-[#E39A65] flex items-center gap-2 w-full text-left"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                        Introduction
                      </button>
                    </li>
                    {blog.paragraphs?.map((section, index) => (
                      <li key={index}>
                        <button 
                          onClick={() => scrollToSection(`section-${index}`)}
                          className="text-sm text-gray-600 hover:text-[#E39A65] flex items-center gap-2 w-full text-left"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                          <span className="line-clamp-1">{section.header}</span>
                        </button>
                      </li>
                    ))}
                    <li>
                      <button 
                        onClick={() => {
                          const tagsSection = document.querySelector('.border-t.border-gray-200.pt-8');
                          if (tagsSection) {
                            const yOffset = -100;
                            const y = tagsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }}
                        className="text-sm text-gray-600 hover:text-[#E39A65] flex items-center gap-2 w-full text-left"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                        Tags
                      </button>
                    </li>
                  </ul>
                </motion.div>

                {/* Related Posts - Without newsletter */}
                {relatedPosts.length > 0 && (
                  <motion.div 
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#E39A65]" />
                      You Might Also Like
                    </h4>
                    <div className="space-y-4">
                      {relatedPosts.map((post) => (
                        <Link key={post._id} href={`/blog/blogDetailsPage?id=${post._id}`}>
                          <motion.div 
                            className="flex gap-6 mb-3 p-1  border-b-gray-300 group cursor-pointer"
                            whileHover={{ x: 5 }}
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              {post.featuredImage ? (
                                <img 
                                  src={post.featuredImage} 
                                  alt={post.title} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-2xl">{getCategoryDetails(post.category).icon}</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-900 group-hover:text-[#E39A65] line-clamp-2">
                                {post.title}
                              </h5>
                              <p className="text-xs text-gray-500 mt-1">{formatDate(post.publishDate)}</p>
                             
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Global styles for rich text content - Matches product page exactly */}
      <style jsx global>{`
        .blog-content {
          color: #374151;
          line-height: 1.6;
        }
        
        .blog-content h1 {
          font-size: 2em;
          margin: 0.5em 0;
          font-weight: 600;
          color: #111827;
        }
        
        .blog-content h2 {
          font-size: 1.5em;
          margin: 0.5em 0;
          font-weight: 600;
          color: #111827;
        }
        
        .blog-content h3 {
          font-size: 1.17em;
          margin: 0.5em 0;
          font-weight: 600;
          color: #111827;
        }
        
        .blog-content h4 {
          font-size: 1em;
          margin: 0.5em 0;
          font-weight: 600;
          color: #111827;
        }
        
        .blog-content p {
          margin: 0.75em 0;
        }
        
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        .blog-content li {
          margin: 0.25em 0;
        }
        
        .blog-content a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
        
        .blog-content a:hover {
          text-decoration: underline;
          color: #1d4ed8;
        }
        
        .blog-content strong {
          font-weight: 600;
          color: #111827;
        }
        
        .blog-content em {
          font-style: italic;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          color: #6b7280;
        }
        
        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-family: monospace;
          font-size: 0.875em;
        }
        
        .blog-content pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          font-family: monospace;
          font-size: 0.875em;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
          margin: 1em 0;
        }
        
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1em 0;
        }
        
        .blog-content th,
        .blog-content td {
          border: 1px solid #e5e7eb;
          padding: 0.5em;
          text-align: left;
        }
        
        .blog-content th {
          background-color: #f9fafb;
          font-weight: 600;
        }
        
        .blog-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1.5em 0;
        }
      `}</style>
    </>
  );
}