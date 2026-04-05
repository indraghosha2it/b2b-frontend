


// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   Search, 
//   Grid, 
//   List, 
//   X, 
//   Filter,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   Tag,
//   Users,
//   DollarSign,
//   Edit,
//   Plus,
//   RefreshCw,
//   Eye,
//   Package,
//   AlertCircle,
//   ArrowLeft,
//   Star,
//   Sparkles,
//   TrendingUp,
//   Award,
//   Flame,
//   Palette,
//   Layers
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Filter Bar Component - Moved OUTSIDE of main component
// const FilterBar = ({ 
//   filters, 
//   handleFilterChange,
//   categories,
//   minPriceInput,
//   maxPriceInput,
//   setMinPriceInput,
//   setMaxPriceInput,
//   applyPriceRange,
//   clearPriceRange,
//   getActiveFilterCount,
//   clearFilters
// }) => (
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
//     <div className="flex items-center justify-between mb-3">
//       <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//         <Filter className="w-4 h-4 text-[#E39A65]" />
//         Filters
//       </h3>
//       {getActiveFilterCount() > 0 && (
//         <button
//           onClick={clearFilters}
//           className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium"
//         >
//           Clear All ({getActiveFilterCount()})
//         </button>
//       )}
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
//       {/* Category Filter */}
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">Category</label>
//         <select
//           value={filters.category}
//           onChange={(e) => handleFilterChange('category', e.target.value)}
//           className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
//         >
//           <option value="">All Categories</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Target Audience Filter */}
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">Target Audience</label>
//         <select
//           value={filters.targetedCustomer}
//           onChange={(e) => handleFilterChange('targetedCustomer', e.target.value)}
//           className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
//         >
//           <option value="">All</option>
//           <option value="ladies">Ladies</option>
//           <option value="gents">Gents</option>
//           <option value="kids">Kids</option>
//           <option value="unisex">Unisex</option>
//         </select>
//       </div>

//       {/* Status Filter */}
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">Status</label>
//         <select
//           value={filters.status}
//           onChange={(e) => handleFilterChange('status', e.target.value)}
//           className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
//         >
//           <option value="all">All</option>
//           <option value="active">Active Only</option>
//           <option value="inactive">Inactive Only</option>
//         </select>
//       </div>

//       {/* Featured Filter */}
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">Featured</label>
//         <select
//           value={filters.isFeatured}
//           onChange={(e) => handleFilterChange('isFeatured', e.target.value)}
//           className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
//         >
//           <option value="">All Products</option>
//           <option value="featured">Featured Only</option>
//         </select>
//       </div>

//       {/* Sort */}
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">Sort By</label>
//         <select
//           value={filters.sortBy}
//           onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//           className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
//         >
//           <option value="newest">Newest First</option>
//           <option value="price_low">Price: Low to High</option>
//           <option value="price_high">Price: High to Low</option>
//           <option value="name_asc">Name: A to Z</option>
//           <option value="featured">Featured First</option>
//         </select>
//       </div>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
//       {/* Min Price Input - FIXED */}
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">Min Price ($)</label>
//         <input
//           type="text"
//           inputMode="decimal"
//           value={minPriceInput}
//           onChange={(e) => {
//             const value = e.target.value;
//             if (value === '' || /^\d*\.?\d*$/.test(value)) {
//               setMinPriceInput(value);
//             }
//           }}
//           placeholder="0.00"
//           className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
//         />
//       </div>

//       {/* Max Price Input - FIXED */}
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">Max Price ($)</label>
//         <input
//           type="text"
//           inputMode="decimal"
//           value={maxPriceInput}
//           onChange={(e) => {
//             const value = e.target.value;
//             if (value === '' || /^\d*\.?\d*$/.test(value)) {
//               setMaxPriceInput(value);
//             }
//           }}
//           placeholder="Any"
//           className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
//         />
//       </div>

//       {/* Apply Price Button */}
//       <div className="flex items-end">
//         <button
//           onClick={applyPriceRange}
//           disabled={!minPriceInput && !maxPriceInput}
//           className="w-full px-3 py-2 bg-[#E39A65] text-white text-xs font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Apply Price
//         </button>
//       </div>
//     </div>

//     {/* Show applied price range */}
//     {(filters.minPrice || filters.maxPrice) && (
//       <div className="mt-3 flex items-center justify-between bg-orange-50 p-2 rounded-lg">
//         <span className="text-xs text-gray-700">
//           Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
//         </span>
//         <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
//           <X className="w-3 h-3" />
//         </button>
//       </div>
//     )}
//   </div>
// );

// export default function ModeratorAllProducts() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState({});
  
//   // Filter states
//   const [filters, setFilters] = useState({
//     search: '',
//     category: '',
//     targetedCustomer: '',
//     minPrice: '',
//     maxPrice: '',
//     status: 'all',
//     isFeatured: '',
//     sortBy: 'newest'
//   });

//   // Price range input states - Separate for input fields
//   const [minPriceInput, setMinPriceInput] = useState('');
//   const [maxPriceInput, setMaxPriceInput] = useState('');

//   // Search timeout for debouncing
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   // Available filter options
//   const [categories, setCategories] = useState([]);
  
//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);

//   // Check moderator access
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user.role !== 'moderator' && user.role !== 'admin') {
//       toast.error('Unauthorized access');
//       router.push('/login');
//     }
//   }, [router]);

//   // Helper functions
//   const capitalizeFirst = (str) => {
//     if (!str) return '';
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   };

//   const getFirstPricingTier = (pricingTiers) => {
//     if (!pricingTiers || pricingTiers.length === 0) return null;
//     return pricingTiers[0];
//   };

//   const formatPrice = (price) => {
//     return price?.toFixed(2) || '0.00';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Get tag color based on tag name
//   const getTagColor = (tag) => {
//     if (tag.includes('Top')) return 'bg-amber-100 text-amber-800 border-amber-200';
//     if (tag.includes('New')) return 'bg-blue-100 text-blue-800 border-blue-200';
//     if (tag.includes('Best')) return 'bg-purple-100 text-purple-800 border-purple-200';
//     if (tag.includes('Summer')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//     if (tag.includes('Winter')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
//     if (tag.includes('Limited')) return 'bg-red-100 text-red-800 border-red-200';
//     if (tag.includes('Trending')) return 'bg-pink-100 text-pink-800 border-pink-200';
//     return 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   // Get tag icon based on tag name
//   const getTagIcon = (tag) => {
//     if (tag === 'Top Ranking') return <TrendingUp className="w-3 h-3 mr-1" />;
//     if (tag === 'Best Seller') return <Award className="w-3 h-3 mr-1" />;
//     if (tag === 'New Arrival') return <Sparkles className="w-3 h-3 mr-1" />;
//     if (tag === 'Trending') return <Flame className="w-3 h-3 mr-1" />;
//     return <Tag className="w-3 h-3 mr-1" />;
//   };

//   // Fetch categories on mount
//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   // Debounced search effect
//   useEffect(() => {
//     if (searchTimeout) {
//       clearTimeout(searchTimeout);
//     }

//     const timeout = setTimeout(() => {
//       fetchProducts();
//     }, 500);

//     setSearchTimeout(timeout);

//     return () => {
//       if (searchTimeout) {
//         clearTimeout(searchTimeout);
//       }
//     };
//   }, [filters.search]);

//   // Fetch products when other filters change
//   useEffect(() => {
//     fetchProducts();
//   }, [
//     filters.category, 
//     filters.targetedCustomer, 
//     filters.minPrice, 
//     filters.maxPrice, 
//     filters.status,
//     filters.isFeatured,
//     filters.sortBy, 
//     currentPage
//   ]);

//   const fetchCategories = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/categories', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchProducts = async () => {
//     if (filters.search) {
//       setSearchLoading(true);
//     } else {
//       setLoading(true);
//     }
    
//     try {
//       const token = localStorage.getItem('token');
//       const queryParams = new URLSearchParams();
//       queryParams.append('page', currentPage);
//       queryParams.append('limit', 10); // Changed to 10 for better list view
      
//       if (filters.search) queryParams.append('search', filters.search);
//       if (filters.category) queryParams.append('category', filters.category);
//       if (filters.targetedCustomer) queryParams.append('targetedCustomer', filters.targetedCustomer);
//       if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
//       if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      
//       if (filters.isFeatured === 'featured') {
//         queryParams.append('isFeatured', 'true');
//       }
      
//       queryParams.append('includeInactive', 'true');
      
//       if (filters.status === 'active') {
//         queryParams.append('isActive', 'true');
//       } else if (filters.status === 'inactive') {
//         queryParams.append('isActive', 'false');
//       }
      
//       let sortParam = '-createdAt';
//       switch (filters.sortBy) {
//         case 'price_low':
//           sortParam = 'price_asc';
//           break;
//         case 'price_high':
//           sortParam = 'price_desc';
//           break;
//         case 'name_asc':
//           sortParam = 'name_asc';
//           break;
//         case 'featured':
//           sortParam = 'featured';
//           break;
//         case 'newest':
//         default:
//           sortParam = 'newest';
//       }
//       queryParams.append('sort', sortParam);

//       const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalProducts(data.pagination?.total || 0);
        
//         const initialActiveIndex = {};
//         (data.data || []).forEach(product => {
//           if (product._id) {
//             initialActiveIndex[product._id] = 0;
//           }
//         });
//         setActiveImageIndex(initialActiveIndex);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       toast.error('Failed to fetch products');
//     } finally {
//       setLoading(false);
//       setSearchLoading(false);
//     }
//   };

//   const handleFilterChange = (name, value) => {
//     setFilters(prev => ({ ...prev, [name]: value }));
//     setCurrentPage(1);
//   };

//   // Apply price range function
//   const applyPriceRange = () => {
//     setFilters(prev => ({
//       ...prev,
//       minPrice: minPriceInput || '',
//       maxPrice: maxPriceInput || ''
//     }));
//     setCurrentPage(1);
//   };

//   // Clear price range function
//   const clearPriceRange = () => {
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
//     setCurrentPage(1);
//   };

//   // Special handler for search with debouncing
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setFilters(prev => ({ ...prev, search: value }));
//     setCurrentPage(1);
    
//     if (value.length > 0) {
//       setSearchLoading(true);
//     }
//   };

//   const clearSearch = () => {
//     setFilters(prev => ({ ...prev, search: '' }));
//     setCurrentPage(1);
//     fetchProducts();
//   };

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       category: '',
//       targetedCustomer: '',
//       minPrice: '',
//       maxPrice: '',
//       status: 'all',
//       isFeatured: '',
//       sortBy: 'newest'
//     });
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setCurrentPage(1);
//   };

//   const handleImageHover = (productId, imageIndex) => {
//     setActiveImageIndex(prev => ({ ...prev, [productId]: imageIndex }));
//   };

//   const handleImageLeave = (productId) => {
//     setActiveImageIndex(prev => ({ ...prev, [productId]: 0 }));
//   };

//   const handleEdit = (productId) => {
//     router.push(`/moderator/editProduct?id=${productId}`);
//   };

//   const handleView = (productId) => {
//     router.push(`/moderator/productDetails?id=${productId}`);
//   };

//   const getActiveFilterCount = () => {
//     let count = 0;
//     if (filters.category) count++;
//     if (filters.targetedCustomer) count++;
//     if (filters.minPrice || filters.maxPrice) count++;
//     if (filters.status !== 'all') count++;
//     if (filters.isFeatured) count++;
//     return count;
//   };

//   // Compact List View Component
//   const CompactProductList = ({ product }) => {
//     const productImages = product.images || [];
//     const activeIndex = activeImageIndex[product._id] || 0;
//     const firstTier = getFirstPricingTier(product.quantityBasedPricing);
//     const hasTags = product.tags && product.tags.length > 0;

//     return (
//       <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border ${
//         product.isActive ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
//       }`}>
//         <div className="flex items-center gap-4 p-3">
//           {/* Product Image */}
//           <div 
//             className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
//             onMouseEnter={() => productImages.length > 1 && handleImageHover(product._id, (activeIndex + 1) % productImages.length)}
//             onMouseLeave={() => handleImageLeave(product._id)}
//             onClick={() => handleView(product._id)}
//           >
//             <img
//               src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'}
//               alt={product.productName}
//               className="w-full h-full object-cover"
//             />
//             {productImages.length > 1 && (
//               <div className="absolute bottom-0 right-0 bg-black/50 text-white text-[10px] px-1 rounded-tl">
//                 {activeIndex + 1}/{productImages.length}
//               </div>
//             )}
//           </div>

//           {/* Product Details - Compact */}
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-2 mb-1">
//               <h3 className="text-sm font-semibold text-gray-900 truncate" title={product.productName}>
//                 {product.productName}
//               </h3>
              
//               {/* Status Badge */}
//               <span className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full ${
//                 product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//               }`}>
//                 {product.isActive ? 'Active' : 'Inactive'}
//               </span>

//               {/* Featured Badge */}
//               {product.isFeatured && (
//                 <span className="flex-shrink-0 text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full flex items-center gap-0.5">
//                   <Star className="w-2.5 h-2.5" />
//                   Featured
//                 </span>
//               )}
//             </div>

//             {/* Tags */}
//             {hasTags && (
//               <div className="flex flex-wrap gap-1 mb-1">
//                 {product.tags.slice(0, 2).map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium ${getTagColor(tag)}`}
//                   >
//                     {getTagIcon(tag)}
//                     {tag}
//                   </span>
//                 ))}
//                 {product.tags.length > 2 && (
//                   <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-gray-100 text-gray-600">
//                     +{product.tags.length - 2}
//                   </span>
//                 )}
//               </div>
//             )}

//             {/* Key Details Grid */}
//             <div className="grid grid-cols-5 gap-2 text-xs">
//               {/* Price */}
//               <div className="flex items-center gap-1">
//                 <DollarSign className="w-3 h-3 text-[#E39A65]" />
//                 <span className="font-medium text-[#E39A65]">${formatPrice(product.pricePerUnit)}</span>
//                 <span className="text-gray-400 text-[10px]">/pc</span>
//               </div>

//               {/* MOQ */}
//               <div className="flex items-center gap-1">
//                 <Package className="w-3 h-3 text-gray-400" />
//                 <span className="text-gray-600">MOQ: {product.moq}</span>
//               </div>

//               {/* Category */}
//               <div className="flex items-center gap-1">
//                 <Tag className="w-3 h-3 text-gray-400" />
//                 <span className="text-gray-600 truncate">{product.category?.name || 'N/A'}</span>
//               </div>

//               {/* Colors */}
//               {product.colors && product.colors.length > 0 && (
//                 <div className="flex items-center gap-1">
//                   <Palette className="w-3 h-3 text-gray-400" />
//                   <div className="flex gap-0.5">
//                     {product.colors.slice(0, 3).map((color, idx) => (
//                       <div
//                         key={idx}
//                         className="w-3 h-3 rounded-full border border-gray-200"
//                         style={{ backgroundColor: color.code }}
//                         title={color.name}
//                       />
//                     ))}
//                     {product.colors.length > 3 && (
//                       <span className="text-[10px] text-gray-500">+{product.colors.length - 3}</span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Bulk Price */}
//               {firstTier && (
//                 <div className="flex items-center gap-1">
//                   <Layers className="w-3 h-3 text-orange-400" />
//                   <span className="text-orange-600 text-[10px]">{firstTier.range}pcs: ${formatPrice(firstTier.price)}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Action Buttons - Compact */}
//           <div className="flex items-center gap-1 flex-shrink-0">
//             <button
//               onClick={() => handleView(product._id)}
//               className="p-1.5 bg-[#E39A65] text-white rounded hover:bg-[#d48b54] transition-colors"
//               title="View Details"
//             >
//               <Eye className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => handleEdit(product._id)}
//               className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//               title="Edit"
//             >
//               <Edit className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
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
//               <Link href="/moderator/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </Link>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
//                   <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
//                     Moderator
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Manage your product catalog • {totalProducts} total products
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={fetchProducts}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                 title="Refresh"
//               >
//                 <RefreshCw className="w-5 h-5" />
//               </button>
//               <Link
//                 href="/moderator/create-products"
//                 className="flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Add Product</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         {/* Search Bar with Instant Search Indicator */}
//         <div className="mb-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Instant search: Type to find products by name, fabric, or category..."
//               value={filters.search}
//               onChange={handleSearchChange}
//               className="w-full pl-9 pr-12 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//             />
//             {filters.search && (
//               <button
//                 onClick={clearSearch}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-3 h-3" />
//               </button>
//             )}
//             {searchLoading && (
//               <div className="absolute right-10 top-1/2 -translate-y-1/2">
//                 <Loader2 className="w-3 h-3 animate-spin text-[#E39A65]" />
//               </div>
//             )}
//           </div>
//           <p className="text-xs text-gray-400 mt-1">
//             {filters.search ? `Searching for "${filters.search}"...` : 'Start typing for instant results'}
//           </p>
//         </div>

//         {/* Filter Bar - Using external component */}
//         <FilterBar 
//           filters={filters}
//           handleFilterChange={handleFilterChange}
//           categories={categories}
//           minPriceInput={minPriceInput}
//           maxPriceInput={maxPriceInput}
//           setMinPriceInput={setMinPriceInput}
//           setMaxPriceInput={setMaxPriceInput}
//           applyPriceRange={applyPriceRange}
//           clearPriceRange={clearPriceRange}
//           getActiveFilterCount={getActiveFilterCount}
//           clearFilters={clearFilters}
//         />

//         {/* Results Count */}
//         <div className="mb-4 flex items-center justify-between">
//           <p className="text-sm text-gray-600">
//             Showing <span className="font-semibold text-gray-900">{products.length}</span> of{' '}
//             <span className="font-semibold text-gray-900">{totalProducts}</span> products
//             {filters.search && <span> for "<span className="font-medium">{filters.search}</span>"</span>}
//           </p>
//         </div>

//         {/* Loading State */}
//         {loading && !searchLoading && (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
//           </div>
//         )}

//         {/* Products Display - COMPACT LIST ONLY */}
//         {!loading && (
//           <>
//             {products.length === 0 ? (
//               <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
//                 <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500 mb-4">No products found matching your criteria</p>
//                 <button
//                   onClick={clearFilters}
//                   className="px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="space-y-2">
//                   {products.map(product => (
//                     <CompactProductList key={product._id} product={product} />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex justify-center items-center gap-2 mt-8">
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                       disabled={currentPage === 1}
//                       className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
//                     >
//                       <ChevronLeft className="w-4 h-4" />
//                     </button>
                    
//                     {[...Array(totalPages)].map((_, i) => {
//                       const pageNum = i + 1;
//                       if (
//                         pageNum === 1 ||
//                         pageNum === totalPages ||
//                         (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
//                       ) {
//                         return (
//                           <button
//                             key={i}
//                             onClick={() => setCurrentPage(pageNum)}
//                             className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                               currentPage === pageNum
//                                 ? 'bg-[#E39A65] text-white'
//                                 : 'bg-white border border-gray-300 hover:bg-gray-50'
//                             }`}
//                           >
//                             {pageNum}
//                           </button>
//                         );
//                       } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                         return <span key={i} className="text-gray-400">...</span>;
//                       }
//                       return null;
//                     })}
                    
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                       disabled={currentPage === totalPages}
//                       className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
//                     >
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  X, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Tag,
  Users,
  DollarSign,
  Edit,
  Plus,
  RefreshCw,
  Eye,
  Package,
  AlertCircle,
  ArrowLeft,
  Star,
  Sparkles,
  TrendingUp,
  Award,
  Flame,
  Palette,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';

// Filter Bar Component - Responsive
const FilterBar = ({ 
  filters, 
  handleFilterChange,
  categories,
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
    <div className="flex items-center justify-between mb-2 sm:mb-3">
      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
        <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E39A65]" />
        Filters
      </h3>
      {getActiveFilterCount() > 0 && (
        <button
          onClick={clearFilters}
          className="text-[10px] sm:text-xs text-[#E39A65] hover:text-[#d48b54] font-medium"
        >
          Clear All ({getActiveFilterCount()})
        </button>
      )}
    </div>
  
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-3">
      {/* Category Filter */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Target Audience Filter */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Target Audience</label>
        <select
          value={filters.targetedCustomer}
          onChange={(e) => handleFilterChange('targetedCustomer', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
        >
          <option value="">All</option>
          <option value="ladies">Ladies</option>
          <option value="gents">Gents</option>
          <option value="kids">Kids</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
        >
          <option value="all">All</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>

      {/* Featured Filter */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Featured</label>
        <select
          value={filters.isFeatured}
          onChange={(e) => handleFilterChange('isFeatured', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
        >
          <option value="">All Products</option>
          <option value="featured">Featured Only</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="featured">Featured First</option>
        </select>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {/* Min Price Input */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Min Price ($)</label>
        <input
          type="text"
          inputMode="decimal"
          value={minPriceInput}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              setMinPriceInput(value);
            }
          }}
          placeholder="0.00"
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
        />
      </div>

      {/* Max Price Input */}
      <div>
        <label className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Max Price ($)</label>
        <input
          type="text"
          inputMode="decimal"
          value={maxPriceInput}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              setMaxPriceInput(value);
            }
          }}
          placeholder="Any"
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
        />
      </div>

      {/* Apply Price Button */}
      <div className="flex items-end">
        <button
          onClick={applyPriceRange}
          disabled={!minPriceInput && !maxPriceInput}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-[#E39A65] text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply Price
        </button>
      </div>
    </div>

    {/* Show applied price range */}
    {(filters.minPrice || filters.maxPrice) && (
      <div className="mt-2 sm:mt-3 flex items-center justify-between bg-orange-50 p-1.5 sm:p-2 rounded-lg">
        <span className="text-[9px] sm:text-xs text-gray-700">
          Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
        </span>
        <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
          <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </button>
      </div>
    )}
  </div>
);

export default function ModeratorAllProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    targetedCustomer: '',
    minPrice: '',
    maxPrice: '',
    status: 'all',
    isFeatured: '',
    sortBy: 'newest'
  });

  // Price range input states - Separate for input fields
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');

  // Search timeout for debouncing
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Available filter options
  const [categories, setCategories] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Check moderator access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'moderator' && user.role !== 'admin') {
      toast.error('Unauthorized access');
      router.push('/login');
    }
  }, [router]);

  // Helper functions
  const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getFirstPricingTier = (pricingTiers) => {
    if (!pricingTiers || pricingTiers.length === 0) return null;
    return pricingTiers[0];
  };

  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get tag color based on tag name
  const getTagColor = (tag) => {
    if (tag.includes('Top')) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (tag.includes('New')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (tag.includes('Best')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (tag.includes('Summer')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (tag.includes('Winter')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    if (tag.includes('Limited')) return 'bg-red-100 text-red-800 border-red-200';
    if (tag.includes('Trending')) return 'bg-pink-100 text-pink-800 border-pink-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Get tag icon based on tag name
  const getTagIcon = (tag) => {
    if (tag === 'Top Ranking') return <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />;
    if (tag === 'Best Seller') return <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />;
    if (tag === 'New Arrival') return <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />;
    if (tag === 'Trending') return <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />;
    return <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />;
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchProducts();
    }, 500);

    setSearchTimeout(timeout);

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [filters.search]);

  // Fetch products when other filters change
  useEffect(() => {
    fetchProducts();
  }, [
    filters.category, 
    filters.targetedCustomer, 
    filters.minPrice, 
    filters.maxPrice, 
    filters.status,
    filters.isFeatured,
    filters.sortBy, 
    currentPage
  ]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    if (filters.search) {
      setSearchLoading(true);
    } else {
      setLoading(true);
    }
    
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 10);
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.targetedCustomer) queryParams.append('targetedCustomer', filters.targetedCustomer);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      
      if (filters.isFeatured === 'featured') {
        queryParams.append('isFeatured', 'true');
      }
      
      queryParams.append('includeInactive', 'true');
      
      if (filters.status === 'active') {
        queryParams.append('isActive', 'true');
      } else if (filters.status === 'inactive') {
        queryParams.append('isActive', 'false');
      }
      
      let sortParam = '-createdAt';
      switch (filters.sortBy) {
        case 'price_low':
          sortParam = 'price_asc';
          break;
        case 'price_high':
          sortParam = 'price_desc';
          break;
        case 'name_asc':
          sortParam = 'name_asc';
          break;
        case 'featured':
          sortParam = 'featured';
          break;
        case 'newest':
        default:
          sortParam = 'newest';
      }
      queryParams.append('sort', sortParam);

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
        
        const initialActiveIndex = {};
        (data.data || []).forEach(product => {
          if (product._id) {
            initialActiveIndex[product._id] = 0;
          }
        });
        setActiveImageIndex(initialActiveIndex);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  // Apply price range function
  const applyPriceRange = () => {
    setFilters(prev => ({
      ...prev,
      minPrice: minPriceInput || '',
      maxPrice: maxPriceInput || ''
    }));
    setCurrentPage(1);
  };

  // Clear price range function
  const clearPriceRange = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
    setCurrentPage(1);
  };

  // Special handler for search with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, search: value }));
    setCurrentPage(1);
    
    if (value.length > 0) {
      setSearchLoading(true);
    }
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, search: '' }));
    setCurrentPage(1);
    fetchProducts();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      targetedCustomer: '',
      minPrice: '',
      maxPrice: '',
      status: 'all',
      isFeatured: '',
      sortBy: 'newest'
    });
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
  };

  const handleImageHover = (productId, imageIndex) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: imageIndex }));
  };

  const handleImageLeave = (productId) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };

  const handleEdit = (productId) => {
    router.push(`/moderator/editProduct?id=${productId}`);
  };

  const handleView = (productId) => {
    router.push(`/moderator/productDetails?id=${productId}`);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.targetedCustomer) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.status !== 'all') count++;
    if (filters.isFeatured) count++;
    return count;
  };

  // Compact List View Component - Responsive (same as admin version)
  const CompactProductList = ({ product }) => {
    const productImages = product.images || [];
    const activeIndex = activeImageIndex[product._id] || 0;
    const firstTier = getFirstPricingTier(product.quantityBasedPricing);
    const hasTags = product.tags && product.tags.length > 0;

    return (
      <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border ${
        product.isActive ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
      }`}>
        <div className="p-3">
          {/* First Row: Image and Product Details - 2 columns */}
          <div className="flex gap-3">
            {/* Left Column - Image */}
            <div 
              className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
              onMouseEnter={() => productImages.length > 1 && handleImageHover(product._id, (activeIndex + 1) % productImages.length)}
              onMouseLeave={() => handleImageLeave(product._id)}
              onClick={() => handleView(product._id)}
            >
              <img
                src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
              {productImages.length > 1 && (
                <div className="absolute bottom-0 right-0 bg-black/50 text-white text-[8px] px-1 rounded-tl">
                  {activeIndex + 1}/{productImages.length}
                </div>
              )}
            </div>

            {/* Right Column - Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1 mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate" title={product.productName}>
                  {product.productName}
                </h3>
                
                <span className={`flex-shrink-0 text-[8px] px-1.5 py-0.5 rounded-full ${
                  product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>

                {product.isFeatured && (
                  <span className="flex-shrink-0 text-[8px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5" />
                    Featured
                  </span>
                )}
              </div>

              {/* Tags */}
              {hasTags && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-medium ${getTagColor(tag)}`}
                    >
                      {getTagIcon(tag)}
                      {tag}
                    </span>
                  ))}
                  {product.tags.length > 2 && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-medium bg-gray-100 text-gray-600">
                      +{product.tags.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-1 mb-1">
                <DollarSign className="w-3 h-3 text-[#E39A65]" />
                <span className="font-medium text-[#E39A65] text-xs">${formatPrice(product.pricePerUnit)}</span>
                <span className="text-gray-400 text-[10px]">/pc</span>
                {firstTier && (
                  <span className="text-orange-600 text-[9px] ml-1">
                    • {firstTier.range}pcs: ${formatPrice(firstTier.price)}
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="flex items-center gap-1">
                <Tag className="w-2.5 h-2.5 text-gray-400" />
                <span className="text-[10px] text-gray-600 truncate">{product.category?.name || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Second Row: MOQ & Colors (Left) and Action Buttons (Right) */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            {/* Left Side - MOQ and Colors */}
            <div className="flex items-center gap-3">
              {/* MOQ */}
              <div className="flex items-center gap-1">
                <Package className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] text-gray-600">MOQ: {product.moq}</span>
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-1">
                  <Palette className="w-3 h-3 text-gray-400" />
                  <div className="flex gap-0.5">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full border border-gray-200"
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-[8px] text-gray-500">+{product.colors.length - 3}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => handleView(product._id)}
                className="p-1.5 bg-[#E39A65] text-white rounded hover:bg-[#d48b54] transition-colors"
                title="View Details"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleEdit(product._id)}
                className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                title="Edit"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive (same as admin) */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            {/* Left Side - Title Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/moderator/dashboard" className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900">All Products</h1>
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-600 text-[9px] sm:text-xs font-medium rounded-full">
                    Moderator
                  </span>
                </div>
                <p className="text-[10px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                  Manage your product catalog • {totalProducts} total products
                </p>
              </div>
            </div>

            {/* Right Side - Action Buttons (Desktop) */}
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-3">
              <button
                onClick={fetchProducts}
                className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </button>
              <Link
                href="/moderator/create-products"
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-[10px] sm:text-sm"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>

          {/* Action Buttons - Below Title (Mobile Only) */}
          <div className="flex sm:hidden items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-100">
            <button
              onClick={fetchProducts}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              href="/moderator/create-products"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-6">
        {/* Search Bar */}
        <div className="mb-3 sm:mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Instant search: Type to find products by name, fabric, or category..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-8 sm:pl-9 pr-12 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
            />
            {filters.search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            )}
            {searchLoading && (
              <div className="absolute right-9 sm:right-10 top-1/2 -translate-y-1/2">
                <Loader2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin text-[#E39A65]" />
              </div>
            )}
          </div>
          <p className="text-[9px] sm:text-xs text-gray-400 mt-1">
            {filters.search ? `Searching for "${filters.search}"...` : 'Start typing for instant results'}
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar 
          filters={filters}
          handleFilterChange={handleFilterChange}
          categories={categories}
          minPriceInput={minPriceInput}
          maxPriceInput={maxPriceInput}
          setMinPriceInput={setMinPriceInput}
          setMaxPriceInput={setMaxPriceInput}
          applyPriceRange={applyPriceRange}
          clearPriceRange={clearPriceRange}
          getActiveFilterCount={getActiveFilterCount}
          clearFilters={clearFilters}
        />

        {/* Results Count */}
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <p className="text-[10px] sm:text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{products.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalProducts}</span> products
            {filters.search && <span> for "<span className="font-medium">{filters.search}</span>"</span>}
          </p>
        </div>

        {/* Loading State */}
        {loading && !searchLoading && (
          <div className="flex justify-center items-center py-10 sm:py-20">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[#E39A65]" />
          </div>
        )}

        {/* Products Display */}
        {!loading && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-10 sm:py-20 bg-white rounded-lg border border-gray-200">
                <Package className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">No products found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E39A65] text-white text-[10px] sm:text-sm rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {products.map(product => (
                    <CompactProductList key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1 sm:p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-sm font-medium transition-colors ${
                              currentPage === pageNum
                                ? 'bg-[#E39A65] text-white'
                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return <span key={i} className="text-gray-400 text-[10px] sm:text-sm">...</span>;
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1 sm:p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}