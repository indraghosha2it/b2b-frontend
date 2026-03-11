// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { 
//   Search, 
//   Package, 
//   FileText, 
//   Tag, 
//   Loader2,
//   ChevronRight,
//   Filter,
//   X,
//   TrendingUp,
//   Clock,
//   Star,
//   ArrowRight,
//   Grid,
//   List,
//   ShoppingBag,
//   BookOpen,
//   FolderOpen
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const query = searchParams.get('q') || '';
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [filterType, setFilterType] = useState('all'); // 'all', 'products', 'blogs', 'categories'
//   const [showFilters, setShowFilters] = useState(false);
//   const [searchInput, setSearchInput] = useState(query);

//   useEffect(() => {
//     if (query) {
//       performSearch();
//     }
//   }, [query]);

//   const performSearch = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setResults(data.data);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchInput.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchInput)}`);
//     }
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case 'product':
//         return <Package className="w-5 h-5 text-[#E39A65]" />;
//       case 'blog':
//         return <BookOpen className="w-5 h-5 text-[#E39A65]" />;
//       case 'category':
//         return <FolderOpen className="w-5 h-5 text-[#E39A65]" />;
//       default:
//         return <Search className="w-5 h-5 text-[#E39A65]" />;
//     }
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case 'product':
//         return <ShoppingBag className="w-4 h-4" />;
//       case 'blog':
//         return <BookOpen className="w-4 h-4" />;
//       case 'category':
//         return <FolderOpen className="w-4 h-4" />;
//       default:
//         return <Tag className="w-4 h-4" />;
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'product':
//         return 'bg-blue-50 text-blue-600 border-blue-100';
//       case 'blog':
//         return 'bg-purple-50 text-purple-600 border-purple-100';
//       case 'category':
//         return 'bg-green-50 text-green-600 border-green-100';
//       default:
//         return 'bg-gray-50 text-gray-600 border-gray-100';
//     }
//   };

//   const getLink = (result) => {
//     switch (result.type) {
//       case 'product':
//         return `/productDetails?id=${result._id}`;
//       case 'blog':
//         return `/blog/blogDetailsPage?id=${result._id}`;
//       case 'category':
//         return `/products?category=${result._id}`;
//       default:
//         return '#';
//     }
//   };

//   const groupResults = () => {
//     const grouped = {
//       products: results.filter(r => r.type === 'product'),
//       blogs: results.filter(r => r.type === 'blog'),
//       categories: results.filter(r => r.type === 'category')
//     };
//     return grouped;
//   };

//   const grouped = groupResults();

//   const filteredResults = filterType === 'all' 
//     ? results 
//     : results.filter(r => r.type === filterType);

//   const getResultCount = (type) => {
//     switch (type) {
//       case 'products': return grouped.products.length;
//       case 'blogs': return grouped.blogs.length;
//       case 'categories': return grouped.categories.length;
//       default: return results.length;
//     }
//   };

//   return (
//     <>
//       <Navbar />
      
//       {/* Hero Search Section */}
//       <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 pt-32 pb-20 overflow-hidden">
//         {/* Decorative Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
//           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-100/30 to-amber-100/30 rounded-full blur-3xl"></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//                 Search <span className="text-[#E39A65]">Results</span>
//               </h1>
//               <p className="text-xl text-gray-600 mb-8">
//                 {loading ? 'Searching...' : `Found ${results.length} ${results.length === 1 ? 'result' : 'results'} for`}
//               </p>
              
//               {/* Search Bar */}
//               <form onSubmit={handleSearch} className="max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300">
//                 <div className="relative group">
//                   <input
//                     type="text"
//                     placeholder="Search products, blogs, categories..."
//                     value={searchInput}
//                     onChange={(e) => setSearchInput(e.target.value)}
//                     className="w-full px-8 py-5 pr-16 text-lg border-2 border-transparent bg-white/90 backdrop-blur-sm rounded-2xl focus:ring-4 focus:ring-[#E39A65]/20 focus:border-[#E39A65] outline-none transition-all shadow-xl group-hover:shadow-2xl"
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 p-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
//                   >
//                     <Search className="w-5 h-5" />
//                   </button>
//                 </div>
//               </form>

//               {/* Search Query Display */}
//               {query && !loading && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
//                 >
//                   <span className="text-gray-600">Showing results for:</span>
//                   <span className="font-semibold text-[#E39A65] text-lg">"{query}"</span>
//                 </motion.div>
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Results Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Results Header */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//             {/* Result Stats */}
//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-[#E39A65]" />
//                 <span className="text-gray-600">
//                   {loading ? 'Loading...' : `${results.length} results found`}
//                 </span>
//               </div>
              
//               {/* Filter Chips */}
//               {!loading && results.length > 0 && (
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setFilterType('all')}
//                     className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
//                       filterType === 'all'
//                         ? 'bg-[#E39A65] text-white shadow-md shadow-[#E39A65]/30'
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     All ({results.length})
//                   </button>
//                   <button
//                     onClick={() => setFilterType('product')}
//                     className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
//                       filterType === 'product'
//                         ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
//                         : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
//                     }`}
//                   >
//                     <Package className="w-3 h-3" />
//                     Products ({grouped.products.length})
//                   </button>
//                   <button
//                     onClick={() => setFilterType('blog')}
//                     className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
//                       filterType === 'blog'
//                         ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
//                         : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
//                     }`}
//                   >
//                     <BookOpen className="w-3 h-3" />
//                     Blogs ({grouped.blogs.length})
//                   </button>
//                   <button
//                     onClick={() => setFilterType('category')}
//                     className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
//                       filterType === 'category'
//                         ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
//                         : 'bg-green-50 text-green-600 hover:bg-green-100'
//                     }`}
//                   >
//                     <FolderOpen className="w-3 h-3" />
//                     Categories ({grouped.categories.length})
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* View Toggle */}
//             {!loading && results.length > 0 && (
//               <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === 'grid'
//                       ? 'bg-white text-[#E39A65] shadow-md'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   <Grid className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === 'list'
//                       ? 'bg-white text-[#E39A65] shadow-md'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   <List className="w-5 h-5" />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Loading State */}
//           {loading && (
//             <div className="flex flex-col items-center justify-center py-20">
//               <div className="relative">
//                 <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
//                 <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#E39A65] rounded-full border-t-transparent animate-spin"></div>
//               </div>
//               <p className="mt-6 text-lg text-gray-600 animate-pulse">Searching through our collection...</p>
//             </div>
//           )}

//           {/* No Results */}
//           {!loading && results.length === 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-200"
//             >
//               <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-6">
//                 <Search className="w-12 h-12 text-[#E39A65]" />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-3">No results found</h2>
//               <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
//                 We couldn't find anything matching "{query}". Try different keywords or browse our categories.
//               </p>
//               <div className="flex flex-wrap items-center justify-center gap-4">
//                 <Link
//                   href="/products"
//                   className="px-8 py-3 bg-[#E39A65] text-white font-medium rounded-xl hover:bg-[#d48b54] transition-all hover:shadow-lg hover:scale-105"
//                 >
//                   Browse Products
//                 </Link>
//                 <Link
//                   href="/blog"
//                   className="px-8 py-3 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-[#E39A65] hover:text-[#E39A65] transition-all hover:shadow-lg"
//                 >
//                   Read Blog
//                 </Link>
//               </div>
//             </motion.div>
//           )}

//           {/* Results Grid/List */}
//           {!loading && results.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               {viewMode === 'grid' ? (
//                 /* Grid View */
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
//                   {filteredResults.map((result, index) => (
//                     <motion.div
//                       key={`${result.type}-${result._id}`}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                     >
//                       <Link
//                         href={getLink(result)}
//                         className="group block h-full"
//                       >
//                         <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
//                           {/* Image Section */}
//                           <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
//                             {result.image ? (
//                               <img
//                                 src={result.image}
//                                 alt={result.title}
//                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                               />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center">
//                                 {getIcon(result.type)}
//                               </div>
//                             )}
                            
//                             {/* Type Badge */}
//                             <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${getTypeColor(result.type)}`}>
//                               <span className="flex items-center gap-1">
//                                 {getTypeIcon(result.type)}
//                                 {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
//                               </span>
//                             </div>

//                             {/* Hover Overlay */}
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                               <div className="absolute bottom-3 right-3">
//                                 <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#E39A65]">
//                                   View Details
//                                   <ChevronRight className="w-4 h-4" />
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Content Section */}
//                           <div className="p-5 flex-1 flex flex-col">
//                             <h3 className="font-semibold text-gray-900 group-hover:text-[#E39A65] transition-colors line-clamp-2 mb-2 min-h-[3rem]">
//                               {result.title}
//                             </h3>
                            
//                             {result.description && (
//                               <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
//                                 {result.description}
//                               </p>
//                             )}

//                             {/* Meta Info */}
//                             <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
//                               <span className="text-xs text-gray-400 flex items-center gap-1">
//                                 <Clock className="w-3 h-3" />
//                                 Just now
//                               </span>
//                               <span className="text-xs font-medium text-[#E39A65] group-hover:gap-2 transition-all duration-300 flex items-center gap-1">
//                                 Explore
//                                 <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
//                               </span>
//                             </div>
//                           </div>
//                         </article>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               ) : (
//                 /* List View */
//                 <div className="space-y-4">
//                   {filteredResults.map((result, index) => (
//                     <motion.div
//                       key={`${result.type}-${result._id}`}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                     >
//                       <Link
//                         href={getLink(result)}
//                         className="group block"
//                       >
//                         <article className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
//                           <div className="flex items-start gap-6">
//                             {/* Image */}
//                             <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 flex-shrink-0">
//                               {result.image ? (
//                                 <img
//                                   src={result.image}
//                                   alt={result.title}
//                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                                 />
//                               ) : (
//                                 <div className="w-full h-full flex items-center justify-center">
//                                   {getIcon(result.type)}
//                                 </div>
//                               )}
//                             </div>

//                             {/* Content */}
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-center gap-3 mb-2">
//                                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
//                                   <span className="flex items-center gap-1">
//                                     {getTypeIcon(result.type)}
//                                     {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
//                                   </span>
//                                 </span>
//                                 <span className="text-xs text-gray-400 flex items-center gap-1">
//                                   <Clock className="w-3 h-3" />
//                                   Just now
//                                 </span>
//                               </div>

//                               <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#E39A65] transition-colors mb-2">
//                                 {result.title}
//                               </h3>

//                               {result.description && (
//                                 <p className="text-gray-600 line-clamp-2">
//                                   {result.description}
//                                 </p>
//                               )}
//                             </div>

//                             {/* Arrow */}
//                             <div className="flex-shrink-0 self-center">
//                               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#E39A65] group-hover:text-white transition-all duration-300">
//                                 <ChevronRight className="w-5 h-5" />
//                               </div>
//                             </div>
//                           </div>
//                         </article>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </div>
//       </section>

//       {/* Related Categories Section */}
//       {!loading && results.length > 0 && grouped.categories.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
//               <FolderOpen className="w-6 h-6 text-[#E39A65]" />
//               Explore Related Categories
//             </h2>
            
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {grouped.categories.slice(0, 4).map((category) => (
//                 <Link
//                   key={category._id}
//                   href={getLink(category)}
//                   className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-[#E39A65] hover:shadow-lg transition-all text-center"
//                 >
//                   <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#E39A65] group-hover:text-white transition-colors">
//                     <FolderOpen className="w-6 h-6 text-[#E39A65] group-hover:text-white" />
//                   </div>
//                   <h3 className="font-medium text-gray-900 group-hover:text-[#E39A65] transition-colors">
//                     {category.title}
//                   </h3>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       <Footer />
//     </>
//   );
// }

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Package, 
  Loader2,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  ShoppingBag,
  FolderOpen,
  Eye,
  ShoppingCart,
  ChevronUp
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Separate component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [displayCount, setDisplayCount] = useState(8); // Show 8 products initially
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        console.log('Search results:', data.data);
        setResults(data.data);
        
        // Initialize active image index for products
        const initialActiveIndex = {};
        data.data.forEach(result => {
          if (result.type === 'product' && result._id) {
            initialActiveIndex[result._id] = 0;
          }
        });
        setActiveImageIndex(initialActiveIndex);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleShowMore = () => {
    setDisplayCount(prev => prev + 8);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setDisplayCount(8);
    setShowAll(false);
    // Scroll to top of products section smoothly
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  // Helper function to capitalize first letter
  const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Strip HTML tags for excerpt
  const stripHtml = (html) => {
    if (!html) return '';
    if (typeof window !== 'undefined') {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }
    return html.replace(/<[^>]*>/g, '');
  };

  const groupResults = () => {
    const grouped = {
      products: results.filter(r => r.type === 'product'),
      categories: results.filter(r => r.type === 'category')
    };
    return grouped;
  };

  const grouped = groupResults();
  const displayedProducts = grouped.products.slice(0, displayCount);

// Product Card Component
const ProductCard = ({ product }) => {
  const productColors = product.colors || [];
  const productImages = product.images || [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Helper function to truncate text - ADD THIS INSIDE THE COMPONENT
  const truncateText = (text, limit = 30) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  // Helper function to capitalize first letter
  const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Get first pricing tier from actual quantityBasedPricing
  const getFirstPricingTier = () => {
    if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
      return product.quantityBasedPricing[0];
    }
    // Fallback to showing bulk pricing based on price if no tiers exist
    if (product.price) {
      return { price: product.price, range: 'Bulk' };
    }
    return null;
  };

  const firstTier = getFirstPricingTier();

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={productImages[activeImageIndex]?.url || product.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
          }}
        />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-[#E39A65] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg z-10">
          {product.category || 'Product'}
        </span>
        
        {/* MOQ Badge */}
        {product.moq && (
          <span className="absolute top-4 right-4 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm shadow-lg z-10">
            MOQ: {product.moq}pcs
          </span>
        )}

        {/* Targeted Customer Badge */}
        {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
          <span className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm z-10">
            {capitalizeFirst(product.targetedCustomer)}
          </span>
        )}

        {/* Hover Overlay with Shopping Cart Icon */}
        <Link href={`/productDetails?id=${product._id}`} onClick={(e) => e.stopPropagation()}>
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <ShoppingCart className="w-6 h-6 text-[#E39A65]" />
            </div>
          </div>
        </Link>
      </div>

      {/* Thumbnail Gallery */}
      {productImages.length > 1 && (
        <div className="flex justify-center gap-2 py-3 px-2 bg-gray-50 border-t border-gray-100">
          {productImages.slice(0, 5).map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              onMouseEnter={() => handleThumbnailClick(index)}
              className={`relative w-12 h-12 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                activeImageIndex === index 
                  ? 'border-[#E39A65] scale-110 shadow-md' 
                  : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={image.url}
                alt={`${product.title} - view ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100';
                }}
              />
            </button>
          ))}
          {productImages.length > 5 && (
            <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium border-2 border-transparent">
              +{productImages.length - 5}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Product Name and Price - UPDATED with your new layout */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-md font-semibold text-gray-900 line-clamp-2 flex-1" title={product.title}>
            {truncateText(product.title, 30)}
          </h3>
          <div className="flex-shrink-0 text-right">
            <span className="text-base font-bold text-[#E39A65] text-lg">
              ${formatPrice(product.price)}
            </span>
            <span className="text-gray-500 text-[10px] ml-1">/pc</span>
          </div>
        </div>

        {/* Color Options */}
        {productColors.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Colors:</span>
            <div className="flex gap-1.5">
              {productColors.slice(0, 5).map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: color.code || '#CCCCCC' }}
                  title={color.name || `Color ${i + 1}`}
                />
              ))}
              {productColors.length > 5 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{productColors.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Bulk Pricing Preview */}
        {firstTier && (
          <div className="bg-orange-50 rounded-lg p-3 mb-4 border border-orange-100">
            <p className="text-xs text-[#E39A65] font-medium mb-1">Bulk pricing:</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">
                {firstTier.range || 'Bulk'} pcs
              </span>
              <span className="font-semibold text-[#E39A65]">
                ${formatPrice(firstTier.price)}/pc
              </span>
            </div>
          </div>
        )}

        {/* View Details Button */}
        <Link 
          href={`/productDetails?id=${product._id}`}
          onClick={(e) => e.stopPropagation()}
          className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-[#E39A65] transition-colors duration-300"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

  // Category Card Component
  const CategoryCard = ({ category, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={category.url}
          onClick={(e) => e.stopPropagation()}
          className="group block relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#E39A65] hover:shadow-xl transition-all duration-300"
        >
          <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
            {category.image ? (
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FolderOpen className="w-16 h-16 text-gray-300" />
              </div>
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* View Category Button on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-4 h-4" />
                Browse Category
              </span>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-semibold text-gray-900 group-hover:text-[#E39A65] transition-colors text-lg mb-2">
              {category.title}
            </h3>
            
            {category.description && (
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {stripHtml(category.description)}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {category.productCount || 0} products
              </span>
              <span className={`text-sm font-medium text-[#E39A65] flex items-center gap-1 transition-all duration-300 ${isHovered ? 'gap-2' : ''}`}>
                Explore
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </span>
            </div>
          </div>

          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 bg-[#E39A65] transform rotate-45 translate-x-8 -translate-y-8 transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-0'}`} />
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Search Section - Responsive height */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 pt-20 md:pt-24 lg:pt-32 pb-10 md:pb-16 lg:pb-20 overflow-hidden">
        {/* Decorative Elements - Adjusted for mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-64 md:w-96 h-64 md:h-96 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-64 md:w-96 h-64 md:h-96 bg-amber-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-6">
                Search <span className="text-[#E39A65]">Results</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6 lg:mb-8">
                {loading ? 'Searching...' : `Found ${results.length} ${results.length === 1 ? 'result' : 'results'} for`}
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300 px-4 md:px-0">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search products, categories..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 pr-12 md:pr-14 lg:pr-16 text-base md:text-lg border-2 border-transparent bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl focus:ring-4 focus:ring-[#E39A65]/20 focus:border-[#E39A65] outline-none transition-all shadow-xl group-hover:shadow-2xl"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 p-2 md:p-3 lg:p-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white rounded-lg md:rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <Search className="w-4 h-4 md:w-5 h-4 md:h-5" />
                  </button>
                </div>
              </form>

              {/* Search Query Display */}
              {query && !loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 md:mt-6 inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                >
                  <span className="text-xs md:text-sm text-gray-600">Showing results for:</span>
                  <span className="font-semibold text-[#E39A65] text-sm md:text-lg">"{query}"</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Result Stats */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#E39A65]" />
              <span className="text-sm md:text-base text-gray-600">
                {loading ? 'Loading...' : `${results.length} ${results.length === 1 ? 'result' : 'results'} found`}
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 border-4 border-[#E39A65] rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 animate-pulse">Searching through our collection...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl border-2 border-dashed border-gray-200"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-orange-100 rounded-full mb-4 md:mb-6">
                <Search className="w-10 h-10 md:w-12 md:h-12 text-[#E39A65]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">No results found</h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-md mx-auto px-4">
                We couldn't find anything matching "{query}". Try different keywords or browse our categories.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="px-6 md:px-8 py-2 md:py-3 bg-[#E39A65] text-white font-medium rounded-lg md:rounded-xl hover:bg-[#d48b54] transition-all hover:shadow-lg hover:scale-105"
                >
                  Browse Products
                </Link>
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          {!loading && grouped.products.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12 md:mb-16"
              id="products-section"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-[#E39A65]" />
                Products ({grouped.products.length})
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedProducts.map((product, index) => (
                  <ProductCard key={`product-${product._id}`} product={product} />
                ))}
              </div>

              {/* Show More / Show Less Buttons */}
              {grouped.products.length > 8 && (
                <div className="flex justify-center mt-8 md:mt-10 gap-4">
                  {displayCount < grouped.products.length && (
                    <button
                      onClick={handleShowMore}
                      className="px-6 md:px-8 py-2.5 md:py-3 bg-[#E39A65] text-white font-medium rounded-lg md:rounded-xl hover:bg-[#d48b54] transition-all hover:shadow-lg hover:scale-105 flex items-center gap-2"
                    >
                      <span>Show More Products</span>
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  )}
                  
                  {displayCount > 8 && (
                    <button
                      onClick={handleShowLess}
                      className="px-6 md:px-8 py-2.5 md:py-3 bg-gray-200 text-gray-700 font-medium rounded-lg md:rounded-xl hover:bg-gray-300 transition-all hover:shadow-lg flex items-center gap-2"
                    >
                      <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Show Less</span>
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Categories Section */}
          {!loading && grouped.categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 md:w-6 md:h-6 text-[#E39A65]" />
                Related Categories ({grouped.categories.length})
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {grouped.categories.map((category, index) => (
                  <CategoryCard key={`category-${category._id}`} category={category} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

// Main component with Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center h-64 md:h-96">
          <Loader2 className="w-8 h-8 md:w-10 md:h-10 animate-spin text-[#E39A65]" />
        </div>
        <Footer />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}