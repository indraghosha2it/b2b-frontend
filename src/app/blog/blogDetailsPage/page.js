// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import Link from 'next/link';
// // import Navbar from '../../components/layout/Navbar';
// // import Footer from '../../components/layout/Footer';
// // import { 
// //   Calendar, 
// //   User, 
// //   Tag, 
// //   Eye, 
// //   ChevronLeft,
// //   Clock,
// //   Share2,
// //   Facebook,
// //   Twitter,
// //   Linkedin,
// //   Link as LinkIcon,
// //   BookOpen,
// //   ArrowLeft,
// //   X
// // } from 'lucide-react';
// // import { toast } from 'sonner';

// // export default function BlogDetailsPage() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const blogId = searchParams.get('id');
  
// //   const [blog, setBlog] = useState(null);
// //   const [relatedBlogs, setRelatedBlogs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [shareModal, setShareModal] = useState(false);

// //   // Categories for reference
// //   const categories = [
// //     { value: 'fashion-trends', label: 'Fashion Trends', icon: '👗' },
// //     { value: 'wholesale-guide', label: 'Wholesale Guide', icon: '📦' },
// //     { value: 'industry-news', label: 'Industry News', icon: '📰' },
// //     { value: 'style-tips', label: 'Style Tips', icon: '✨' },
// //     { value: 'business-tips', label: 'Business Tips', icon: '💼' },
// //     { value: 'fabric-and-quality', label: 'Fabric & Quality', icon: '🧵' },
// //     { value: 'customer-stories', label: 'Customer Stories', icon: '👥' },
// //     { value: 'case-studies', label: 'Case Studies', icon: '📊' },
// //     { value: 'product-guide', label: 'Product Guide', icon: '📖' },
// //     { value: 'others', label: 'Others', icon: '📌' }
// //   ];

// //   // Redirect if no blog ID
// //   useEffect(() => {
// //     if (!blogId) {
// //       toast.error('No blog ID provided');
// //       router.push('/blog');
// //     }
// //   }, [blogId, router]);

// //   // Fetch blog data
// //   useEffect(() => {
// //     const fetchBlog = async () => {
// //       if (!blogId) return;

// //       setLoading(true);
// //       try {
// //         const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/blogs/${blogId}`);
// //         const data = await response.json();

// //         if (data.success) {
// //           setBlog(data.data);
          
// //           // Fetch related blogs (same category)
// //           if (data.data.category) {
// //             const relatedResponse = await fetch(
// //               `https://b2b-backend-rosy.vercel.app/api/blogs?category=${data.data.category}&limit=3`
// //             );
// //             const relatedData = await relatedResponse.json();
// //             if (relatedData.success) {
// //               // Filter out current blog
// //               const filtered = relatedData.data.filter(b => b._id !== blogId);
// //               setRelatedBlogs(filtered.slice(0, 3));
// //             }
// //           }
// //         } else {
// //           toast.error(data.error || 'Failed to fetch blog');
// //           router.push('/blog');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching blog:', error);
// //         toast.error('Network error. Please try again.');
// //         router.push('/blog');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBlog();
// //   }, [blogId, router]);

// //   // Format date
// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   // Calculate reading time
// //   const getReadingTime = (content) => {
// //     const wordsPerMinute = 200;
// //     const wordCount = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
// //     const minutes = Math.ceil(wordCount / wordsPerMinute);
// //     return `${minutes} min read`;
// //   };

// //   // Get category details
// //   const getCategoryDetails = (categoryValue) => {
// //     return categories.find(c => c.value === categoryValue) || { 
// //       label: categoryValue, 
// //       icon: '📄',
// //       color: 'bg-orange-50 text-orange-700'
// //     };
// //   };

// //   // Share handlers
// //   const handleShare = (platform) => {
// //     const url = window.location.href;
// //     const title = blog?.title || 'Check out this article';
    
// //     let shareUrl = '';
// //     switch (platform) {
// //       case 'facebook':
// //         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
// //         break;
// //       case 'twitter':
// //         shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
// //         break;
// //       case 'linkedin':
// //         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
// //         break;
// //       case 'copy':
// //         navigator.clipboard.writeText(url);
// //         toast.success('Link copied to clipboard!');
// //         setShareModal(false);
// //         return;
// //     }
    
// //     if (shareUrl) {
// //       window.open(shareUrl, '_blank', 'noopener,noreferrer');
// //     }
// //     setShareModal(false);
// //   };

// //   if (loading) {
// //     return (
// //       <>
// //         <Navbar />
// //         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E39A65]"></div>
// //         </div>
// //         <Footer />
// //       </>
// //     );
// //   }

// //   if (!blog) return null;

// //   const category = getCategoryDetails(blog.category);
// //   const readingTime = getReadingTime(blog.content);

// //   return (
// //     <>
// //       <Navbar />
      
// //       {/* Back to Blog Link */}
// //       <div className="bg-gray-50 border-b border-gray-200">
// //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //           <Link 
// //             href="/blog"
// //             className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#E39A65] transition-colors"
// //           >
// //             <ArrowLeft className="w-4 h-4" />
// //             Back to all articles
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <article className="bg-white py-12">
// //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
// //           {/* Header */}
// //           <header className="mb-8">
// //             {/* Category */}
// //             <div className="mb-4">
// //               <span className={`inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full`}>
// //                 {category.icon} {category.label}
// //               </span>
// //             </div>

// //             {/* Title */}
// //             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
// //               {blog.title}
// //             </h1>

// //             {/* Meta Info */}
// //             <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
// //               <div className="flex items-center gap-1">
// //                 <User className="w-4 h-4" />
// //                 <span>{blog.author}</span>
// //               </div>
// //               <div className="flex items-center gap-1">
// //                 <Calendar className="w-4 h-4" />
// //                 <span>{formatDate(blog.publishDate)}</span>
// //               </div>
// //               <div className="flex items-center gap-1">
// //                 <Clock className="w-4 h-4" />
// //                 <span>{readingTime}</span>
// //               </div>
// //               <div className="flex items-center gap-1">
// //                 <Eye className="w-4 h-4" />
// //                 <span>{blog.views || 0} views</span>
// //               </div>
// //             </div>

// //             {/* Tags & Share */}
// //             <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
// //               {/* Tags */}
// //               {blog.tags && blog.tags.length > 0 && (
// //                 <div className="flex flex-wrap gap-2">
// //                   {blog.tags.map(tag => (
// //                     <Link
// //                       key={tag}
// //                       href={`/blog?search=${tag}`}
// //                       className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#E39A65] hover:text-white transition-colors"
// //                     >
// //                       #{tag}
// //                     </Link>
// //                   ))}
// //                 </div>
// //               )}

// //               {/* Share Button */}
// //               <button
// //                 onClick={() => setShareModal(true)}
// //                 className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
// //               >
// //                 <Share2 className="w-4 h-4" />
// //                 <span className="text-sm">Share</span>
// //               </button>
// //             </div>
// //           </header>

// //           {/* Featured Image */}
// //           {blog.featuredImage && (
// //             <div className="mb-8 rounded-xl overflow-hidden">
// //               <img 
// //                 src={blog.featuredImage} 
// //                 alt={blog.title}
// //                 className="w-full h-auto max-h-[500px] object-cover"
// //               />
// //             </div>
// //           )}

// //           {/* Excerpt */}
// //           {blog.excerpt && (
// //             <div className="mb-8 p-6 bg-orange-50 rounded-lg border-l-4 border-[#E39A65]">
// //               <p className="text-lg text-gray-700 italic">{blog.excerpt}</p>
// //             </div>
// //           )}

// //           {/* Main Content */}
// //           <div className="prose prose-lg max-w-none mb-12">
// //             <div dangerouslySetInnerHTML={{ __html: blog.content }} />
// //           </div>

// //           {/* Additional Sections */}
// //           {blog.paragraphs && blog.paragraphs.length > 0 && (
// //             <div className="space-y-8 mb-12">
// //               <h2 className="text-2xl font-bold text-gray-900">More Details</h2>
// //               {blog.paragraphs.map((section, index) => (
// //                 <div key={index} className="border-l-4 border-[#E39A65] pl-6">
// //                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.header}</h3>
// //                   <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: section.description }} />
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* Thumbnail Gallery */}
// //           {blog.thumbnailImages && blog.thumbnailImages.length > 0 && (
// //             <div className="mb-12">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
// //               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //                 {blog.thumbnailImages.map((thumb, index) => (
// //                   <div key={index} className="rounded-lg overflow-hidden">
// //                     <img 
// //                       src={thumb.url || thumb} 
// //                       alt={`Gallery ${index + 1}`}
// //                       className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
// //                       onClick={() => window.open(thumb.url || thumb, '_blank')}
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* SEO Info */}
// //           {(blog.metaTitle || blog.metaDescription) && (
// //             <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
// //               <h3 className="text-sm font-medium text-gray-500 mb-3">SEO Information</h3>
// //               {blog.metaTitle && (
// //                 <p className="text-sm text-gray-600 mb-1">
// //                   <span className="font-medium">Meta Title:</span> {blog.metaTitle}
// //                 </p>
// //               )}
// //               {blog.metaDescription && (
// //                 <p className="text-sm text-gray-600 mb-1">
// //                   <span className="font-medium">Meta Description:</span> {blog.metaDescription}
// //                 </p>
// //               )}
// //               {blog.metaKeywords && (
// //                 <p className="text-sm text-gray-600">
// //                   <span className="font-medium">Meta Keywords:</span> {blog.metaKeywords}
// //                 </p>
// //               )}
// //             </div>
// //           )}

// //           {/* Related Posts */}
// //           {relatedBlogs.length > 0 && (
// //             <div className="mt-16 pt-8 border-t border-gray-200">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                 {relatedBlogs.map((related) => {
// //                   const relatedCategory = getCategoryDetails(related.category);
// //                   return (
// //                     <Link
// //                       key={related._id}
// //                       href={`/blog/blogDetailsPage?id=${related._id}`}
// //                       className="group"
// //                     >
// //                       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
// //                         <div className="h-40 overflow-hidden">
// //                           {related.featuredImage ? (
// //                             <img 
// //                               src={related.featuredImage} 
// //                               alt={related.title}
// //                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
// //                             />
// //                           ) : (
// //                             <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
// //                               <BookOpen className="w-12 h-12 text-[#E39A65] opacity-50" />
// //                             </div>
// //                           )}
// //                         </div>
// //                         <div className="p-4">
// //                           <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
// //                             <span className="flex items-center gap-1">
// //                               <Calendar className="w-3 h-3" />
// //                               {formatDate(related.publishDate)}
// //                             </span>
// //                           </div>
// //                           <h3 className="font-semibold text-gray-900 group-hover:text-[#E39A65] transition-colors line-clamp-2 mb-2">
// //                             {related.title}
// //                           </h3>
// //                           <span className="inline-flex items-center gap-1 text-xs text-[#E39A65]">
// //                             Read More
// //                             <ChevronLeft className="w-3 h-3 rotate-180" />
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </Link>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </article>

// //       {/* Share Modal */}
// //       {shareModal && (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
// //             <div className="p-6">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="text-lg font-bold text-gray-900">Share this article</h3>
// //                 <button
// //                   onClick={() => setShareModal(false)}
// //                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //                 >
// //                   <X className="w-5 h-5 text-gray-500" />
// //                 </button>
// //               </div>

// //               <div className="grid grid-cols-2 gap-3">
// //                 <button
// //                   onClick={() => handleShare('facebook')}
// //                   className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
// //                 >
// //                   <Facebook className="w-5 h-5" />
// //                   <span className="text-sm font-medium">Facebook</span>
// //                 </button>

// //                 <button
// //                   onClick={() => handleShare('twitter')}
// //                   className="flex items-center gap-3 p-3 bg-sky-50 text-sky-500 rounded-lg hover:bg-sky-100 transition-colors"
// //                 >
// //                   <Twitter className="w-5 h-5" />
// //                   <span className="text-sm font-medium">Twitter</span>
// //                 </button>

// //                 <button
// //                   onClick={() => handleShare('linkedin')}
// //                   className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
// //                 >
// //                   <Linkedin className="w-5 h-5" />
// //                   <span className="text-sm font-medium">LinkedIn</span>
// //                 </button>

// //                 <button
// //                   onClick={() => handleShare('copy')}
// //                   className="flex items-center gap-3 p-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
// //                 >
// //                   <LinkIcon className="w-5 h-5" />
// //                   <span className="text-sm font-medium">Copy Link</span>
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <Footer />
// //     </>
// //   );
// // }


// 'use client';

// import { useState, useEffect , useRef} from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import Navbar from '../../components/layout/Navbar';
// import Footer from '../../components/layout/Footer';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Calendar, 
//   User, 
//   Tag, 
//   Eye, 
//   ChevronLeft,
//   Clock,
//   Share2,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Link as LinkIcon,
//   BookOpen,
//   ArrowLeft,
//   X,
//   Heart,
//   Bookmark,
//   MessageCircle,
//   ArrowRight
// } from 'lucide-react';
// import { toast } from 'sonner';

// export default function BlogDetailsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const blogId = searchParams.get('id');
  
//   const [blog, setBlog] = useState(null);
//   const [relatedBlogs, setRelatedBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [shareModal, setShareModal] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const hasFetched = useRef(false);


//   // Categories for reference
//   const categories = [
//     { value: 'fashion-trends', label: 'Fashion Trends', icon: '👗', color: 'from-pink-500 to-rose-500' },
//     { value: 'wholesale-guide', label: 'Wholesale Guide', icon: '📦', color: 'from-blue-500 to-cyan-500' },
//     { value: 'industry-news', label: 'Industry News', icon: '📰', color: 'from-purple-500 to-indigo-500' },
//     { value: 'style-tips', label: 'Style Tips', icon: '✨', color: 'from-yellow-500 to-amber-500' },
//     { value: 'business-tips', label: 'Business Tips', icon: '💼', color: 'from-emerald-500 to-teal-500' },
//     { value: 'fabric-and-quality', label: 'Fabric & Quality', icon: '🧵', color: 'from-orange-500 to-red-500' },
//     { value: 'customer-stories', label: 'Customer Stories', icon: '👥', color: 'from-violet-500 to-purple-500' },
//     { value: 'case-studies', label: 'Case Studies', icon: '📊', color: 'from-cyan-500 to-blue-500' },
//     { value: 'product-guide', label: 'Product Guide', icon: '📖', color: 'from-indigo-500 to-purple-500' },
//     { value: 'others', label: 'Others', icon: '📌', color: 'from-gray-500 to-slate-500' }
//   ];

//   // Animation variants
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   const staggerChildren = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const scaleOnHover = {
//     whileHover: { scale: 1.05 },
//     whileTap: { scale: 0.95 }
//   };

//   // Redirect if no blog ID
//   useEffect(() => {
//     if (!blogId) {
//       toast.error('No blog ID provided');
//       router.push('/blog');
//     }
//   }, [blogId, router]);

//   // Fetch blog data
//   // useEffect(() => {
//   //   const fetchBlog = async () => {
//   //     if (!blogId) return;

//   //     setLoading(true);
//   //     try {
//   //       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/blogs/${blogId}`);
//   //       const data = await response.json();

//   //       if (data.success) {
//   //         setBlog(data.data);
          
//   //         // Fetch related blogs (same category)
//   //         if (data.data.category) {
//   //           const relatedResponse = await fetch(
//   //             `https://b2b-backend-rosy.vercel.app/api/blogs?category=${data.data.category}&limit=3`
//   //           );
//   //           const relatedData = await relatedResponse.json();
//   //           if (relatedData.success) {
//   //             const filtered = relatedData.data.filter(b => b._id !== blogId);
//   //             setRelatedBlogs(filtered.slice(0, 3));
//   //           }
//   //         }
//   //       } else {
//   //         toast.error(data.error || 'Failed to fetch blog');
//   //         router.push('/blog');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching blog:', error);
//   //       toast.error('Network error. Please try again.');
//   //       router.push('/blog');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchBlog();
//   // }, [blogId, router]);
//   // In your blogDetailsPage.js, add this console log
//   useEffect(() => {
//     const fetchBlog = async () => {
//       // ✅ Prevent double fetch
//       if (hasFetched.current) return;
//       hasFetched.current = true;
      
//       if (!blogId) return;

//       setLoading(true);
//       try {
//         console.log('🔍 Fetching blog with ID:', blogId);
//         const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/blogs/${blogId}`);
//         const data = await response.json();
//         console.log('📥 Blog data received:', data);

//         if (data.success) {
//           setBlog(data.data);
          
//           // Fetch related blogs (same category)
//           if (data.data.category) {
//             const relatedResponse = await fetch(
//               `https://b2b-backend-rosy.vercel.app/api/blogs?category=${data.data.category}&limit=3`
//             );
//             const relatedData = await relatedResponse.json();
//             if (relatedData.success) {
//               const filtered = relatedData.data.filter(b => b._id !== blogId);
//               setRelatedBlogs(filtered.slice(0, 3));
//             }
//           }
//         } else {
//           toast.error(data.error || 'Failed to fetch blog');
//           router.push('/blog');
//         }
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//         toast.error('Network error. Please try again.');
//         router.push('/blog');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [blogId, router]);

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Calculate reading time
//   const getReadingTime = (content) => {
//     const wordsPerMinute = 200;
//     const wordCount = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
//     const minutes = Math.ceil(wordCount / wordsPerMinute);
//     return `${minutes} min read`;
//   };

//   // Get category details
//   const getCategoryDetails = (categoryValue) => {
//     return categories.find(c => c.value === categoryValue) || { 
//       label: categoryValue, 
//       icon: '📄',
//       color: 'from-gray-500 to-slate-500'
//     };
//   };

//   // Share handlers
//   const handleShare = (platform) => {
//     const url = window.location.href;
//     const title = blog?.title || 'Check out this article';
    
//     let shareUrl = '';
//     switch (platform) {
//       case 'facebook':
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
//         break;
//       case 'twitter':
//         shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
//         break;
//       case 'linkedin':
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
//         break;
//       case 'copy':
//         navigator.clipboard.writeText(url);
//         toast.success('Link copied to clipboard!');
//         setShareModal(false);
//         return;
//     }
    
//     if (shareUrl) {
//       window.open(shareUrl, '_blank', 'noopener,noreferrer');
//     }
//     setShareModal(false);
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-center"
//           >
//             <div className="relative">
//               <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
//               <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#E39A65] rounded-full border-t-transparent animate-spin"></div>
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Loading amazing content...</p>
//           </motion.div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!blog) return null;

//   const category = getCategoryDetails(blog.category);
//   const readingTime = getReadingTime(blog.content);

//   return (
//     <>
//       <Navbar />
      
//       {/* Hero Section with Gradient Background */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-24 pb-12 overflow-hidden"
//       >
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
//         </div>

//         {/* Back to Blog Link */}
//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <Link 
//               href="/blog"
//               className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#E39A65] transition-colors group"
//             >
//               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//               Back to all articles
//             </Link>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Main Content */}
//       <article className="bg-white py-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header with Animation */}
//           <motion.header 
//             initial="initial"
//             animate="animate"
//             variants={staggerChildren}
//             className="mb-8"
//           >
//             {/* Category Badge */}
//             <motion.div variants={fadeInUp} className="mb-4">
//               <span className={`inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r ${category.color} text-white text-sm rounded-full shadow-lg`}>
//                 {category.icon} {category.label}
//               </span>
//             </motion.div>

//             {/* Title */}
//             <motion.h1 
//               variants={fadeInUp}
//               className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
//             >
//               {blog.title}
//             </motion.h1>

//             {/* Meta Info with Icons */}
//             <motion.div 
//               variants={fadeInUp}
//               className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="p-2 bg-orange-100 rounded-full">
//                   <User className="w-4 h-4 text-[#E39A65]" />
//                 </div>
//                 <span className="font-medium">{blog.author}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="p-2 bg-orange-100 rounded-full">
//                   <Calendar className="w-4 h-4 text-[#E39A65]" />
//                 </div>
//                 <span>{formatDate(blog.publishDate)}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="p-2 bg-orange-100 rounded-full">
//                   <Clock className="w-4 h-4 text-[#E39A65]" />
//                 </div>
//                 <span>{readingTime}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="p-2 bg-orange-100 rounded-full">
//                   <Eye className="w-4 h-4 text-[#E39A65]" />
//                 </div>
//                 <span>{blog.views || 0} views</span>
//               </div>
//             </motion.div>

//             {/* Interaction Bar */}
//             <motion.div 
//               variants={fadeInUp}
//               className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200"
//             >
//               {/* Tags */}
//               {blog.tags && blog.tags.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {blog.tags.map((tag, index) => (
//                     <motion.div
//                       key={tag}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.5 + index * 0.1 }}
//                     >
//                       <Link
//                         href={`/blog?search=${tag}`}
//                         className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#E39A65] hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
//                       >
//                         #{tag}
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex items-center gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setIsLiked(!isLiked)}
//                   className={`p-3 rounded-full transition-all duration-300 ${
//                     isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-100'
//                   }`}
//                 >
//                   <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//                 </motion.button>
                
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setIsBookmarked(!isBookmarked)}
//                   className={`p-3 rounded-full transition-all duration-300 ${
//                     isBookmarked ? 'bg-[#E39A65] text-white' : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
//                   }`}
//                 >
//                   <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setShareModal(true)}
//                   className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-orange-100 transition-colors"
//                 >
//                   <Share2 className="w-5 h-5" />
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.header>

//           {/* Featured Image with Parallax Effect */}
//           {blog.featuredImage && (
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="mb-12 rounded-2xl overflow-hidden shadow-2xl relative group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
//               <img 
//                 src={blog.featuredImage} 
//                 alt={blog.title}
//                 className="w-full h-auto max-h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
//               />
//             </motion.div>
//           )}

//           {/* Excerpt with Quote Style */}
//           {blog.excerpt && (
//             <motion.div 
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="mb-12 p-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-l-8 border-[#E39A65] shadow-lg"
//             >
//               <p className="text-xl text-gray-700 italic leading-relaxed">"{blog.excerpt}"</p>
//             </motion.div>
//           )}

//           {/* Main Content with Typography */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="prose prose-lg max-w-none mb-16 prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#E39A65] hover:prose-a:text-[#d48b54]"
//           >
//             <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//           </motion.div>

//           {/* Additional Sections with Cards */}
//           {blog.paragraphs && blog.paragraphs.length > 0 && (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6 }}
//               className="space-y-8 mb-16"
//             >
//               <h2 className="text-3xl font-bold text-gray-900 mb-8">More Details</h2>
//               <div className="grid gap-8">
//                 {blog.paragraphs.map((section, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.7 + index * 0.1 }}
//                     whileHover={{ y: -5 }}
//                     className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
//                   >
//                     <div className="h-2 bg-gradient-to-r from-[#E39A65] to-[#d48b54]"></div>
//                     <div className="p-8">
//                       <h3 className="text-2xl font-semibold text-gray-900 mb-4">{section.header}</h3>
//                       <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.description }} />
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

       

//           {/* Related Posts with Animation */}
//           {relatedBlogs.length > 0 && (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.9 }}
//               className="mt-16 pt-12 border-t border-gray-200"
//             >
//               <h2 className="text-3xl font-bold text-gray-900 mb-8">You might also like</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {relatedBlogs.map((related, index) => {
//                   const relatedCategory = getCategoryDetails(related.category);
//                   return (
//                     <motion.div
//                       key={related._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 1 + index * 0.1 }}
//                       whileHover={{ y: -8 }}
//                     >
//                       <Link
//                         href={`/blog/blogDetailsPage?id=${related._id}`}
//                         className="group block"
//                       >
//                         <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
//                           <div className="relative h-48 overflow-hidden">
//                             {related.featuredImage ? (
//                               <img 
//                                 src={related.featuredImage} 
//                                 alt={related.title}
//                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                               />
//                             ) : (
//                               <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
//                                 <BookOpen className="w-16 h-16 text-[#E39A65] opacity-30" />
//                               </div>
//                             )}
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           </div>
//                           <div className="p-5">
//                             <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
//                               <Calendar className="w-3 h-3" />
//                               {formatDate(related.publishDate)}
//                             </div>
//                             <h3 className="font-semibold text-gray-900 group-hover:text-[#E39A65] transition-colors line-clamp-2 mb-3">
//                               {related.title}
//                             </h3>
//                             <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E39A65] group-hover:gap-2 transition-all">
//                               Read Article
//                               <ArrowRight className="w-4 h-4" />
//                             </span>
//                           </div>
//                         </div>
//                       </Link>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </article>

//       {/* Share Modal with Animation */}
//       <AnimatePresence>
//         {shareModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             onClick={() => setShareModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
//               onClick={e => e.stopPropagation()}
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-900">Share this article</h3>
//                   <motion.button
//                     whileHover={{ scale: 1.1, rotate: 90 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setShareModal(false)}
//                     className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                   >
//                     <X className="w-5 h-5 text-gray-500" />
//                   </motion.button>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   {[
//                     { platform: 'facebook', icon: Facebook, color: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-white' },
//                     { platform: 'twitter', icon: Twitter, color: 'bg-sky-400', hover: 'hover:bg-sky-500', text: 'text-white' },
//                     { platform: 'linkedin', icon: Linkedin, color: 'bg-blue-700', hover: 'hover:bg-blue-800', text: 'text-white' },
//                     { platform: 'copy', icon: LinkIcon, color: 'bg-gray-700', hover: 'hover:bg-gray-800', text: 'text-white' }
//                   ].map((item, index) => (
//                     <motion.button
//                       key={item.platform}
//                       whileHover={{ scale: 1.05, y: -2 }}
//                       whileTap={{ scale: 0.95 }}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       onClick={() => handleShare(item.platform)}
//                       className={`flex items-center gap-3 p-4 ${item.color} ${item.hover} ${item.text} rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span className="text-sm font-medium capitalize">{item.platform}</span>
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <Footer />
//     </>
//   );
// }

// app/blog/blogDetailsPage/page.jsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Tag, 
  Eye, 
  ChevronLeft,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  BookOpen,
  ArrowLeft,
  X,
  Heart,
  Bookmark,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

// Create a separate component that uses useSearchParams
function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');
  
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareModal, setShareModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const hasFetched = useRef(false);

  // Categories for reference
  const categories = [
    { value: 'fashion-trends', label: 'Fashion Trends', icon: '👗', color: 'from-pink-500 to-rose-500' },
    { value: 'wholesale-guide', label: 'Wholesale Guide', icon: '📦', color: 'from-blue-500 to-cyan-500' },
    { value: 'industry-news', label: 'Industry News', icon: '📰', color: 'from-purple-500 to-indigo-500' },
    { value: 'style-tips', label: 'Style Tips', icon: '✨', color: 'from-yellow-500 to-amber-500' },
    { value: 'business-tips', label: 'Business Tips', icon: '💼', color: 'from-emerald-500 to-teal-500' },
    { value: 'fabric-and-quality', label: 'Fabric & Quality', icon: '🧵', color: 'from-orange-500 to-red-500' },
    { value: 'customer-stories', label: 'Customer Stories', icon: '👥', color: 'from-violet-500 to-purple-500' },
    { value: 'case-studies', label: 'Case Studies', icon: '📊', color: 'from-cyan-500 to-blue-500' },
    { value: 'product-guide', label: 'Product Guide', icon: '📖', color: 'from-indigo-500 to-purple-500' },
    { value: 'others', label: 'Others', icon: '📌', color: 'from-gray-500 to-slate-500' }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  // Redirect if no blog ID
  useEffect(() => {
    if (!blogId) {
      toast.error('No blog ID provided');
      router.push('/blog');
    }
  }, [blogId, router]);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      
      if (!blogId) return;

      setLoading(true);
      try {
        console.log('🔍 Fetching blog with ID:', blogId);
        const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/blogs/${blogId}`);
        const data = await response.json();
        console.log('📥 Blog data received:', data);

        if (data.success) {
          setBlog(data.data);
          
          // Fetch related blogs (same category)
          if (data.data.category) {
            const relatedResponse = await fetch(
              `https://b2b-backend-rosy.vercel.app/api/blogs?category=${data.data.category}&limit=3`
            );
            const relatedData = await relatedResponse.json();
            if (relatedData.success) {
              const filtered = relatedData.data.filter(b => b._id !== blogId);
              setRelatedBlogs(filtered.slice(0, 3));
            }
          }
        } else {
          toast.error(data.error || 'Failed to fetch blog');
          router.push('/blog');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Network error. Please try again.');
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, router]);

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

  // Get category details
  const getCategoryDetails = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || { 
      label: categoryValue, 
      icon: '📄',
      color: 'from-gray-500 to-slate-500'
    };
  };

  // Share handlers
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || 'Check out this article';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        setShareModal(false);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    setShareModal(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#E39A65] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading amazing content...</p>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) return null;

  const category = getCategoryDetails(blog.category);
  const readingTime = getReadingTime(blog.content);

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Gradient Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-24 pb-12 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        </div>

        {/* Back to Blog Link */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#E39A65] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to all articles
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <article className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Animation */}
          <motion.header 
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="mb-8"
          >
            {/* Category Badge */}
            <motion.div variants={fadeInUp} className="mb-4">
              <span className={`inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r ${category.color} text-white text-sm rounded-full shadow-lg`}>
                {category.icon} {category.label}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
            >
              {blog.title}
            </motion.h1>

            {/* Meta Info with Icons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-full">
                  <User className="w-4 h-4 text-[#E39A65]" />
                </div>
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Calendar className="w-4 h-4 text-[#E39A65]" />
                </div>
                <span>{formatDate(blog.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Clock className="w-4 h-4 text-[#E39A65]" />
                </div>
                <span>{readingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Eye className="w-4 h-4 text-[#E39A65]" />
                </div>
                <span>{blog.views || 0} views</span>
              </div>
            </motion.div>

            {/* Interaction Bar */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200"
            >
              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Link
                        href={`/blog?search=${tag}`}
                        className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#E39A65] hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                      >
                        #{tag}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-100'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isBookmarked ? 'bg-[#E39A65] text-white' : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShareModal(true)}
                  className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-orange-100 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.header>

          {/* Featured Image with Parallax Effect */}
          {blog.featuredImage && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-12 rounded-2xl overflow-hidden shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img 
                src={blog.featuredImage} 
                alt={blog.title}
                className="w-full h-auto max-h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          )}

          {/* Excerpt with Quote Style */}
          {blog.excerpt && (
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12 p-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-l-8 border-[#E39A65] shadow-lg"
            >
              <p className="text-xl text-gray-700 italic leading-relaxed">"{blog.excerpt}"</p>
            </motion.div>
          )}

          {/* Main Content with Typography */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="prose prose-lg max-w-none mb-16 prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#E39A65] hover:prose-a:text-[#d48b54]"
          >
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </motion.div>

          {/* Additional Sections with Cards */}
          {blog.paragraphs && blog.paragraphs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">More Details</h2>
              <div className="grid gap-8">
                {blog.paragraphs.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="h-2 bg-gradient-to-r from-[#E39A65] to-[#d48b54]"></div>
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{section.header}</h3>
                      <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.description }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Posts with Animation */}
          {relatedBlogs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-16 pt-12 border-t border-gray-200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">You might also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((related, index) => {
                  const relatedCategory = getCategoryDetails(related.category);
                  return (
                    <motion.div
                      key={related._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <Link
                        href={`/blog/blogDetailsPage?id=${related._id}`}
                        className="group block"
                      >
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
                          <div className="relative h-48 overflow-hidden">
                            {related.featuredImage ? (
                              <img 
                                src={related.featuredImage} 
                                alt={related.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                                <BookOpen className="w-16 h-16 text-[#E39A65] opacity-30" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <Calendar className="w-3 h-3" />
                              {formatDate(related.publishDate)}
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#E39A65] transition-colors line-clamp-2 mb-3">
                              {related.title}
                            </h3>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E39A65] group-hover:gap-2 transition-all">
                              Read Article
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </article>

      {/* Share Modal with Animation */}
      <AnimatePresence>
        {shareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Share this article</h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShareModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { platform: 'facebook', icon: Facebook, color: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-white' },
                    { platform: 'twitter', icon: Twitter, color: 'bg-sky-400', hover: 'hover:bg-sky-500', text: 'text-white' },
                    { platform: 'linkedin', icon: Linkedin, color: 'bg-blue-700', hover: 'hover:bg-blue-800', text: 'text-white' },
                    { platform: 'copy', icon: LinkIcon, color: 'bg-gray-700', hover: 'hover:bg-gray-800', text: 'text-white' }
                  ].map((item, index) => (
                    <motion.button
                      key={item.platform}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleShare(item.platform)}
                      className={`flex items-center gap-3 p-4 ${item.color} ${item.hover} ${item.text} rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium capitalize">{item.platform}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

// Main page component with Suspense
export default function BlogDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#E39A65] rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading blog...</p>
        </div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}