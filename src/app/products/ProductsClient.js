'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  DollarSign,
  Sparkles,
  Eye, 
  ShoppingCart,
  ArrowLeft,
  Package,
  TrendingUp,
  Palette,
  Ruler
} from 'lucide-react';

// Loading Bar Component
const LoadingBar = ({ isVisible }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="h-full bg-[#E39A65] animate-loading-bar" style={{ width: '100%' }}></div>
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ 
  expandedSections, 
  toggleSection, 
  categories, 
  filters, 
  handleCategoryChange, 
  handleRemoveCategory,
  handleTargetedCustomerChange,
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Filter className="w-5 h-5 text-[#E39A65]" />
        Filters
      </h3>
      {getActiveFilterCount() > 0 && (
        <button
          onClick={clearFilters}
          className="text-sm text-[#E39A65] hover:text-[#d48b54] font-medium"
        >
          Clear All ({getActiveFilterCount()})
        </button>
      )}
    </div>

    {/* Price Range */}
    <div className="mb-6 border-b border-gray-100 pb-6">
      <button
        onClick={() => toggleSection('price')}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#E39A65]" />
          Price Range
        </h4>
        {expandedSections.price ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.price && (
        <div className="space-y-4">
          <div className="space-y-3">
            {/* Min Price Input */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Min ($)</span>
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
                className="w-28 px-2 py-1.5 text-right text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
              />
            </div>

            {/* Max Price Input */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Max ($)</span>
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
                placeholder="∞"
                className="w-28 px-2 py-1.5 text-right text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
              />
            </div>
          </div>
          
          <button
            onClick={applyPriceRange}
            disabled={!minPriceInput && !maxPriceInput}
            className="w-full py-2.5 bg-[#E39A65] text-white text-sm font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply Price Range
          </button>

          {(filters.priceRange.min || filters.priceRange.max) && (
            <div className="flex items-center justify-between bg-orange-50 p-2 rounded-lg">
              <span className="text-sm text-gray-700">
                ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
              </span>
              <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Categories */}
    <div className="mb-6 border-b border-gray-100 pb-6">
      <button
        onClick={() => toggleSection('categories')}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#E39A65]" />
          Categories
        </h4>
        {expandedSections.categories ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.categories && (
        <div className="space-y-2">
          {/* Show selected categories with remove option */}
          {filters.categories.length > 0 && (
            <div className="mb-3 p-2 bg-orange-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Selected Categories:</p>
              {filters.categories.map(catId => {
                const category = categories.find(c => c._id === catId);
                return category ? (
                  <div key={catId} className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <button
                      onClick={() => handleRemoveCategory(catId)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
          
          {/* Category checkboxes */}
          <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
            {categories.map(category => (
              <label key={category._id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className="w-4 h-4 rounded border-gray-300 text-[#E39A65] focus:ring-[#E39A65]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#E39A65] transition-colors flex-1">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Target Audience */}
    <div className="mb-2">
      <button
        onClick={() => toggleSection('audience')}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#E39A65]" />
          Target Audience
        </h4>
        {expandedSections.audience ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.audience && (
        <div className="space-y-2">
          {[
            { value: 'ladies', label: 'Ladies' },
            { value: 'gents', label: 'Gents' },
            { value: 'kids', label: 'Kids' },
            { value: 'unisex', label: 'Unisex' }
          ].map(customer => (
            <label key={customer.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.targetedCustomer.includes(customer.value)}
                onChange={() => handleTargetedCustomerChange(customer.value)}
                className="w-4 h-4 rounded border-gray-300 text-[#E39A65] focus:ring-[#E39A65]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#E39A65] transition-colors flex-1">
                {customer.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ========== PRODUCT GRID CARD COMPONENT ==========
// const ProductGridCard = ({ product }) => {
//   const capitalizeFirst = (str) => {
//     if (!str) return '';
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   };

//   const getFirstPricingTier = (pricingTiers) => {
//     if (!pricingTiers || pricingTiers.length === 0) return null;
//     return pricingTiers[0];
//   };

//   const truncateText = (text, limit = 30) => {
//     if (!text) return '';
//     if (text.length <= limit) return text;
//     return text.substring(0, limit) + '...';
//   };

//   const formatPrice = (price) => {
//     return price?.toFixed(2) || '0.00';
//   };

//   const getTagStyles = (tag) => {
//     const styles = {
//       'Top Ranking': 'bg-gradient-to-r from-amber-500 to-orange-500',
//       'New Arrival': 'bg-gradient-to-r from-blue-500 to-cyan-500',
//       'Top Deal': 'bg-gradient-to-r from-green-500 to-emerald-500',
//       'Best Seller': 'bg-gradient-to-r from-purple-500 to-pink-500',
//       'Summer Collection': 'bg-gradient-to-r from-yellow-500 to-orange-400',
//       'Winter Collection': 'bg-gradient-to-r from-indigo-500 to-blue-400',
//       'Limited Edition': 'bg-gradient-to-r from-red-500 to-rose-500',
//       'Trending': 'bg-gradient-to-r from-pink-500 to-rose-500',
//     };
//     return styles[tag] || 'bg-gradient-to-r from-gray-500 to-gray-600';
//   };

//   const productImages = product.images || [];
//   const [activeIndex, setActiveIndex] = useState(0);
//   const hasMultipleImages = productImages.length > 1;
//   const firstTier = getFirstPricingTier(product.quantityBasedPricing);
//   const primaryTag = product.tags?.[0];

//   const handleImageHover = (index) => {
//     setActiveIndex(index);
//   };

//   const handleImageLeave = () => {
//     setActiveIndex(0);
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{
//         layout: { type: "spring", stiffness: 100, damping: 15 },
//         opacity: { duration: 0.3 }
//       }}
//       whileHover={{ 
//         y: -4,
//         transition: { type: "spring", stiffness: 300, damping: 15 }
//       }}
//       onClick={() => window.location.href = `/productDetails?id=${product._id}`}
//       className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
//     >
//       {/* Image Container - Mobile optimized height */}
//       <div className="relative h-36 sm:h-52 overflow-hidden bg-gray-100">
//         <motion.div 
//           className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
//           whileHover={{ opacity: 1 }}
//         />
        
//         <motion.img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
//           alt={product.productName || 'Product image'}
//           className="w-full h-full object-cover"
//           whileHover={{ scale: 1.1 }}
//           transition={{ duration: 0.5 }}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
//           }}
//         />
        
//         {/* Desktop Hover Icons - Hidden on mobile */}
//         <motion.div 
//           className="absolute inset-0 bg-black/40 items-center justify-center gap-3 
//                      hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
//           initial={{ opacity: 0 }}
//           whileHover={{ opacity: 1 }}
//         >
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/productDetails?id=${product._id}`;
//             }}
//           >
//             <motion.div 
//               className="bg-white rounded-full p-2.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:shadow-xl"
//               whileHover={{ scale: 1.15 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Eye className="w-5 h-5 text-gray-700" />
//             </motion.div>
//           </div>
          
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
//             }}
//           >
//             <motion.div 
//               className="bg-[#E39A65] rounded-full p-2.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:shadow-xl"
//               whileHover={{ scale: 1.15 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ShoppingCart className="w-5 h-5 text-white" />
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* ===== MODIFIED: Mobile Icons - Right Side Center ===== */}
//         <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:hidden z-30">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/productDetails?id=${product._id}`;
//             }}
//             className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-all duration-200 hover:bg-white"
//           >
//             <Eye className="w-4 h-4 text-gray-700" />
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
//             }}
//             className="bg-[#E39A65]/95 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-all duration-200 hover:bg-[#E39A65]"
//           >
//             <ShoppingCart className="w-4 h-4 text-white" />
//           </button>
//         </div>
        
//         {/* Category Badge - Adjusted position */}
//         <motion.span 
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="absolute top-2 left-2 bg-[#E39A65] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium shadow-lg z-20"
//         >
//           {truncateText(product.category?.name || 'Uncategorized', 6)}
//         </motion.span>
        
//         {/* Tag Badge (if any) - Adjusted position to avoid overlapping icons */}
//         {primaryTag && (
//           <motion.span 
//             initial={{ x: 20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className={`absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium shadow-lg z-20 ${getTagStyles(primaryTag)}`}
//           >
//             {truncateText(primaryTag, 10)}
//           </motion.span>
//         )}
        
//         {/* MOQ Badge - Bottom Right */}
//         <motion.span 
//           initial={{ x: 20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-gray-900/90 text-white text-[8px] sm:text-xs px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full font-medium backdrop-blur-sm shadow-lg z-20"
//         >
//           MOQ:{product.moq || 0}
//         </motion.span>

//         {/* Targeted Customer Badge - Bottom Left */}
//         {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
//           <motion.span 
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/50 text-white text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full backdrop-blur-sm z-20"
//           >
//             {capitalizeFirst(product.targetedCustomer)}
//           </motion.span>
//         )}
//       </div>

//       {/* Thumbnail Gallery - Hidden on mobile to save space */}
//       {hasMultipleImages && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="hidden sm:flex justify-center gap-2 py-3 px-2 bg-gray-50 border-t border-gray-100"
//           onMouseLeave={handleImageLeave}
//         >
//           {productImages.slice(0, 5).map((image, index) => (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className={`relative w-8 h-8 rounded-md overflow-hidden transition-all duration-300 ${
//                 activeIndex === index 
//                   ? 'ring-2 ring-[#E39A65] ring-offset-2 scale-110 shadow-md' 
//                   : 'opacity-60 hover:opacity-100'
//               }`}
//               onMouseEnter={() => handleImageHover(index)}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleImageHover(index);
//               }}
//             >
//               <img
//                 src={image.url}
//                 alt=""
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100';
//                 }}
//               />
//             </motion.button>
//           ))}
//           {productImages.length > 5 && (
//             <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
//               +{productImages.length - 5}
//             </div>
//           )}
//         </motion.div>
//       )}

//       {/* Content - Mobile optimized padding */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.7 }}
//         className="p-2 sm:p-5 sm:pt-3"
//       >
//         {/* Title and Price - Compact on mobile */}
//         <div className="flex items-start justify-between gap-1 mb-1">
//           <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 flex-1" title={product.productName}>
//             {truncateText(product.productName, 20)}
//           </h3>
//           <div className="flex-shrink-0 text-right">
//             <span className="text-sm sm:text-lg font-bold text-[#E39A65]">
//               ${formatPrice(product.pricePerUnit)}
//             </span>
//             <span className="text-gray-500 text-[8px] sm:text-[10px] ml-0.5">/pc</span>
//           </div>
//         </div>

//         {/* Color Dots - Compact on mobile */}
//         {product.colors && product.colors.length > 0 && (
//           <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
//             <span className="text-[10px] sm:text-sm text-gray-500">Colors:</span>
//             <div className="flex gap-0.5 sm:gap-1.5">
//               {product.colors.slice(0, 3).map((color, i) => (
//                 <div
//                   key={`${product._id}-color-${i}-${color.code || i}`}
//                   className="w-3 h-3 sm:w-5 sm:h-5 rounded-full border border-white shadow-sm"
//                   style={{ backgroundColor: color.code || '#CCCCCC' }}
//                   title={`Color ${i + 1}`}
//                 />
//               ))}
//               {product.colors.length > 3 && (
//                 <span className="text-[8px] sm:text-xs text-gray-400 ml-0.5">
//                   +{product.colors.length - 3}
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Bulk Price - Compact on mobile */}
//         {firstTier && (
//           <motion.div 
//             whileHover={{ scale: 1.01 }}
//             className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-md sm:rounded-lg p-1.5 sm:p-3 mb-1.5 sm:mb-3 border border-orange-100/80"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <p className="text-[8px] sm:text-xs text-[#E39A65] font-medium mb-0.5">Bulk:</p>
//             <div className="flex justify-between text-[10px] sm:text-sm">
//               <span className="text-gray-600">{firstTier.range || 'Bulk'}</span>
//               <span className="font-semibold text-[#E39A65]">
//                 ${formatPrice(firstTier.price)}/pc
//               </span>
//             </div>
//           </motion.div>
//         )}

//         {/* Add to Inquiry Button - Compact on mobile */}
//         <motion.div
//           whileHover={{ scale: 1.01 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={(e) => {
//             e.stopPropagation();
//             window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
//           }}
//         >
//           <div className="flex items-center justify-center gap-1 w-full text-center bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white py-1.5 sm:py-2.5 rounded-md sm:rounded-lg text-[10px] sm:text-sm font-medium hover:opacity-90 transition-all duration-300 hover:shadow-md cursor-pointer">
//             <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
//             <span>Inquiry</span>
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

const ProductGridCard = ({ product }) => {
  const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getFirstPricingTier = (pricingTiers) => {
    if (!pricingTiers || pricingTiers.length === 0) return null;
    return pricingTiers[0];
  };

  const truncateText = (text, limit = 30) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  const getTagStyles = (tag) => {
    const styles = {
      'Top Ranking': 'bg-gradient-to-r from-amber-500 to-orange-500',
      'New Arrival': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      'Top Deal': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'Best Seller': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'Summer Collection': 'bg-gradient-to-r from-yellow-500 to-orange-400',
      'Winter Collection': 'bg-gradient-to-r from-indigo-500 to-blue-400',
      'Limited Edition': 'bg-gradient-to-r from-red-500 to-rose-500',
      'Trending': 'bg-gradient-to-r from-pink-500 to-rose-500',
    };
    return styles[tag] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const getTargetedAudienceStyle = (audience) => {
    const styles = {
      'ladies': 'bg-gradient-to-r from-pink-400 to-rose-400 text-white',
      'gents': 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white',
      'kids': 'bg-gradient-to-r from-green-400 to-emerald-400 text-white',
      'unisex': 'bg-gradient-to-r from-purple-400 to-violet-400 text-white',
    };
    return styles[audience] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
  };

  const productImages = product.images || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = productImages.length > 1;
  const firstTier = getFirstPricingTier(product.quantityBasedPricing);
  const primaryTag = product.tags?.[0];
  const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';
  const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';

  const handleImageHover = (index) => {
    setActiveIndex(index);
  };

  const handleImageLeave = () => {
    setActiveIndex(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.3 }
      }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      onClick={() => window.location.href = `/productDetails?id=${product._id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-[#E39A65]/20 cursor-pointer"
    >
      {/* Image Container - Only Tag badge on image */}
      <div className="relative h-40 sm:h-52 overflow-hidden bg-gray-100">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          whileHover={{ opacity: 1 }}
        />
        
        <motion.img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
          alt={product.productName || 'Product image'}
          className="w-full h-full object-contain bg-gray-50"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
          }}
          loading="lazy"
        />
        
        {/* Desktop Hover Icons */}
        <motion.div 
          className="absolute inset-0 bg-black/40 items-center justify-center gap-3 
                     hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/productDetails?id=${product._id}`;
            }}
          >
            <motion.div 
              className="bg-white rounded-full p-2.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5 text-gray-700" />
            </motion.div>
          </div>
          
          <div
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
            }}
          >
            <motion.div 
              className="bg-[#E39A65] rounded-full p-2.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Icons - Right side center */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:hidden z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/productDetails?id=${product._id}`;
            }}
            className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-all duration-200 hover:bg-white"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
            }}
            className="bg-[#E39A65]/95 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-all duration-200 hover:bg-[#E39A65]"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* ONLY TAG BADGE - Remains on image */}
        {primaryTag && (
          <motion.span 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`absolute top-2 right-2 ${tagStyle} text-[8px] md:text-[10px] px-1.5 py-0.5 rounded-full font-medium shadow-lg z-20 flex items-center gap-0.5 max-w-[90px]`}
          >
            <span className="truncate">{primaryTag}</span>
          </motion.span>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {hasMultipleImages && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-1 py-1.5 px-1 bg-gray-50/80 border-t border-gray-100"
          onMouseLeave={handleImageLeave}
        >
        {productImages.slice(0, 4).map((image, index) => (
  <motion.button
    key={index}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`relative w-5 h-5 md:w-7 md:h-7 rounded-md overflow-hidden transition-all duration-300 ${
      activeIndex === index 
        ? 'ring-1 ring-[#E39A65] ring-offset-1 scale-110 shadow-md' 
        : 'opacity-60 hover:opacity-100'
    }`}
    onMouseEnter={() => handleImageHover(index)}
    onClick={(e) => {
      e.stopPropagation();
      handleImageHover(index);
    }}
  >
    <img
      src={image.url}
      alt=""
      className="w-full h-full object-cover"
    />
  </motion.button>
))}
{/* Removed the +X indicator completely */}
        </motion.div>
      )}

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="p-2 md:p-3"
      >
        {/* Title and Price in same row */}
        <div className="flex items-start justify-between gap-1 mb-2">
          <h3 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 flex-1" title={product.productName}>
            {truncateText(product.productName, 20)}
          </h3>
          <div className="flex-shrink-0 text-right">
            <span className="text-xs md:text-base font-bold text-[#E39A65]">
              ${formatPrice(product.pricePerUnit)}
            </span>
            <span className="text-gray-500 text-[8px] md:text-[10px] ml-0.5">/pc</span>
          </div>
        </div>

        {/* Category, Targeted Audience & MOQ - All in one row */}
 {/* Category, Targeted Audience & MOQ - All in one row - With hidden scrollbar */}
<div className="flex items-center gap-1 mb-2 overflow-x-auto overflow-y-hidden pb-1" 
     style={{ 
       scrollbarWidth: 'none',
       msOverflowStyle: 'none',
       WebkitOverflowScrolling: 'touch'
     }}
     onMouseEnter={(e) => {
       e.currentTarget.style.scrollbarWidth = 'thin';
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.scrollbarWidth = 'none';
     }}>
  {/* Category */}
  <div className="flex items-center gap-1 bg-gray-100 rounded-md px-1.5 py-0.5 flex-shrink-0">
    <Package className="w-2.5 h-2.5 text-gray-500" />
    <span className="text-[8px] md:text-[10px] text-gray-700 font-medium whitespace-nowrap">
      {truncateText(product.category?.name || 'Uncategorized', 8)}
    </span>
  </div>

  {/* Targeted Audience */}
  {product.targetedCustomer && (
    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md flex-shrink-0 ${audienceStyle}`}>
      <Users className="w-2.5 h-2.5" />
      <span className="text-[8px] md:text-[10px] capitalize font-medium whitespace-nowrap">
        {product.targetedCustomer === 'ladies' ? 'Ladies' : 
         product.targetedCustomer === 'gents' ? 'Gents' :
         product.targetedCustomer === 'kids' ? 'Kids' : product.targetedCustomer}
      </span>
    </div>
  )}

  {/* MOQ */}
  <div className="flex items-center gap-1 bg-gray-100 rounded-md px-1.5 py-0.5 flex-shrink-0">
    <span className="text-[8px] md:text-[10px] text-gray-600 whitespace-nowrap">MOQ:</span>
    <span className="text-[8px] md:text-[10px] font-semibold text-gray-800 whitespace-nowrap">{product.moq || 0}</span>
  </div>
</div>

        {/* Color Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-0.5 md:gap-1 mb-2">
            <Palette className="w-3 h-3 text-gray-400 mr-0.5" />
            {product.colors.slice(0, 4).map((color, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color.code }}
                title={color.name || color.code}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[6px] md:text-[8px] text-gray-400">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Ruler className="w-3 h-3 text-gray-400" />
            <span className="text-[9px] md:text-[10px] text-gray-600">
              {product.sizes.slice(0, 4).join(', ')}
              {product.sizes.length > 4 && ` +${product.sizes.length - 4}`}
            </span>
          </div>
        )}

        {/* Bulk Price */}
        {firstTier && (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-md p-1 md:p-1.5 mb-2 border border-orange-100/80"
          >
            <div className="flex justify-between items-center text-[9px] md:text-xs">
              <span className="text-gray-600 font-medium">{truncateText(firstTier.range || 'Bulk', 10)}</span>
              <span className="font-bold text-[#E39A65]">${formatPrice(firstTier.price)}</span>
            </div>
          </motion.div>
        )}

        {/* Add to Inquiry Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
          }}
        >
          <div className="flex items-center justify-center gap-1 w-full text-center bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white py-1.5 md:py-2 rounded-lg text-[9px] md:text-xs font-medium hover:opacity-90 transition-all duration-300 hover:shadow-md cursor-pointer">
            <ShoppingCart className="w-2.5 h-2.5 md:w-3 md:h-3" />
            <span>Add to Inquiry</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProductListCard = ({ product }) => {
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

  const getTagStyles = (tag) => {
    const styles = {
      'Top Ranking': 'bg-gradient-to-r from-amber-500 to-orange-500',
      'New Arrival': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      'Top Deal': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'Best Seller': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'Summer Collection': 'bg-gradient-to-r from-yellow-500 to-orange-400',
      'Winter Collection': 'bg-gradient-to-r from-indigo-500 to-blue-400',
      'Limited Edition': 'bg-gradient-to-r from-red-500 to-rose-500',
      'Trending': 'bg-gradient-to-r from-pink-500 to-rose-500',
    };
    return styles[tag] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const getTargetedAudienceStyle = (audience) => {
    const styles = {
      'ladies': 'bg-gradient-to-r from-pink-400 to-rose-400 text-white',
      'gents': 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white',
      'kids': 'bg-gradient-to-r from-green-400 to-emerald-400 text-white',
      'unisex': 'bg-gradient-to-r from-purple-400 to-violet-400 text-white',
    };
    return styles[audience] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
  };

  const productImages = product.images || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = productImages.length > 1;
  const firstTier = getFirstPricingTier(product.quantityBasedPricing);
  const primaryTag = product.tags?.[0];
  const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';

  const handleImageHover = (index) => {
    setActiveIndex(index);
  };

  const handleImageLeave = () => {
    setActiveIndex(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.3 }
      }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      onClick={() => window.location.href = `/productDetails?id=${product._id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Images */}
        <div className="md:w-80">
          {/* Main Image - Optimized with no badges */}
          <div className="relative h-[250px] md:h-64 overflow-hidden bg-gray-100">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              whileHover={{ opacity: 1 }}
            />
            
            <motion.img
              src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
              alt={product.productName}
              className="w-full h-full object-contain bg-gray-50 "
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
              }}
              loading="lazy"
            />
            
            {/* Desktop Hover Icons */}
            <motion.div 
              className="absolute inset-0 bg-black/40 items-center justify-center gap-3 
                         hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/productDetails?id=${product._id}`;
                }}
              >
                <motion.div 
                  className="bg-white rounded-full p-2.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-5 h-5 text-gray-700" />
                </motion.div>
              </div>
              
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
                }}
              >
                <motion.div 
                  className="bg-[#E39A65] rounded-full p-2.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile Icons */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:hidden z-30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/productDetails?id=${product._id}`;
                }}
                className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-all duration-200 hover:bg-white"
              >
                <Eye className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
                }}
                className="bg-[#E39A65]/95 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-all duration-200 hover:bg-[#E39A65]"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
              </button>
            </div>
            
            {/* ONLY TAG BADGE - Remains on image */}
            {primaryTag && (
              <span 
                className={`absolute top-4 right-4 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg z-20 ${getTagStyles(primaryTag)}`}
              >
                {primaryTag}
              </span>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {hasMultipleImages && (
            <div 
              className="flex justify-center gap-2 py-3 px-2 bg-gray-50 border-t border-gray-100"
              onMouseLeave={handleImageLeave}
            >
              {productImages.slice(0, 4).map((image, idx) => (
                <div
                  key={idx}
                  className={`relative w-12 h-12 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                    activeIndex === idx 
                      ? 'border-[#E39A65] scale-110 shadow-md' 
                      : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  onMouseEnter={() => handleImageHover(idx)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageHover(idx);
                  }}
                >
                  <img
                    src={image.url}
                    alt={`${product.productName} - view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
             
            </div>
          )}
        </div>

        {/* Right Column - Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 line-clamp-1">
                {product.productName}
              </h3>
              
              {/* Category, Targeted Audience & MOQ in one row */}
              <div className="flex items-center flex-wrap gap-2 mb-4">
                {/* Category */}
                <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-3 py-1.5">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-700 font-medium">
                    {product.category?.name || 'Uncategorized'}
                  </span>
                </div>

                {/* Targeted Audience */}
                {product.targetedCustomer && (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${audienceStyle}`}>
                    <Users className="w-4 h-4" />
                    <span className="text-xs capitalize font-medium">
                      {product.targetedCustomer === 'ladies' ? 'Ladies' : 
                       product.targetedCustomer === 'gents' ? 'Gents' :
                       product.targetedCustomer === 'kids' ? 'Kids' : product.targetedCustomer}
                    </span>
                  </div>
                )}

                {/* MOQ */}
                <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-gray-600">MOQ:</span>
                  <span className="text-xs font-semibold text-gray-800">{product.moq} pcs</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.description?.replace(/<[^>]*>/g, '') || 'No description available'}
              </p>

             <div className="grid grid-cols-3 gap-4 mb-4">
  <div>
    <p className="text-xs text-gray-500">Price</p>
    <p className="text-2xl font-bold text-[#E39A65]">
      ${formatPrice(product.pricePerUnit)}
      <span className="text-sm text-gray-500 ml-1">/pc</span>
    </p>
  </div>
  
  <div>
    <p className="text-xs text-gray-500">Fabric</p>
    <p className="font-semibold text-gray-900 truncate" title={product.fabric || 'N/A'}>
      {product.fabric || 'N/A'}
    </p>
  </div>
  
  {/* Colors */}
  {product.colors && product.colors.length > 0 && (
    <div>
      <p className="text-xs text-gray-500 mb-1">Colors</p>
      <div className="flex items-center gap-1.5 flex-wrap">
        {product.colors.slice(0, 4).map((color, idx) => (
          <div
            key={idx}
            className="w-6 h-6 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: color.code }}
            title={color.name || `Color ${idx + 1}`}
          />
        ))}
        {product.colors.length > 5 && (
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
            +{product.colors.length - 5}
          </div>
        )}
      </div>
    </div>
  )}
</div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full gap-4 mt-auto">
              {/* Bulk Pricing */}
              <div className="flex-1">
                {firstTier && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-orange-50 rounded-lg p-3 border border-orange-100 h-full flex flex-col justify-center"
                  >
                    <p className="text-xs text-[#E39A65] font-medium mb-1">Bulk pricing:</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{firstTier.range || 'Bulk'} pcs</span>
                      <span className="font-semibold text-[#E39A65]">
                        ${formatPrice(firstTier.price)}/pc
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Add to Inquiry Button */}
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
                  }}
                  className="w-full h-full"
                >
                  <div className="flex items-center justify-center gap-2 w-full h-full bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white px-6 py-3 rounded-lg text-md font-medium hover:opacity-90 transition-all duration-300 hover:shadow-md cursor-pointer">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Inquiry</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ========== MAIN PRODUCTS CONTENT COMPONENT ==========
export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    audience: true
  });

  // Add ref to store scroll position
  const productsContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Add debounce timer ref for search
  const searchTimerRef = useRef(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    targetedCustomer: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  // Local search input state for immediate feedback
  const [searchInput, setSearchInput] = useState('');

  // Available filter options
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Price range input states
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');

  // Flag to track initial URL category setup
  const [initialCategorySet, setInitialCategorySet] = useState(false);

  // Helper function to capitalize first letter
  const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Helper function to get first pricing tier
  const getFirstPricingTier = (pricingTiers) => {
    if (!pricingTiers || pricingTiers.length === 0) return null;
    return pricingTiers[0];
  };

  // Helper function to truncate text
  const truncateText = (text, limit = 30) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  // Helper for tag styling
  const getTagStyles = (tag) => {
    const styles = {
      'Top Ranking': 'bg-gradient-to-r from-amber-500 to-orange-500',
      'New Arrival': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      'Top Deal': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'Best Seller': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'Summer Collection': 'bg-gradient-to-r from-yellow-500 to-orange-400',
      'Winter Collection': 'bg-gradient-to-r from-indigo-500 to-blue-400',
      'Limited Edition': 'bg-gradient-to-r from-red-500 to-rose-500',
      'Trending': 'bg-gradient-to-r from-pink-500 to-rose-500',
    };
    return styles[tag] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  // Save scroll position before filter change
  const saveScrollPosition = () => {
    scrollPositionRef.current = window.scrollY;
  };

  // Restore scroll position after products load
  const restoreScrollPosition = () => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: 'instant'
      });
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback((searchValue) => {
    // Clear previous timer
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    // Set new timer
    searchTimerRef.current = setTimeout(() => {
      saveScrollPosition();
      setFilters(prev => ({ ...prev, search: searchValue }));
      setCurrentPage(1);
    }, 500);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchInput('');
    saveScrollPosition();
    setFilters(prev => ({ ...prev, search: '' }));
    setCurrentPage(1);
  };

  // First, fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Then, after categories are loaded, handle URL parameter
  useEffect(() => {
    if (categories.length > 0 && !initialCategorySet) {
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        const categoryExists = categories.some(cat => cat._id === categoryParam);
        if (categoryExists) {
          setFilters(prev => ({
            ...prev,
            categories: [categoryParam]
          }));
        }
      }
      setInitialCategorySet(true);
    }
  }, [categories, searchParams, initialCategorySet]);

  // Fetch products when filters change, but only after initial setup
  useEffect(() => {
    if (initialCategorySet) {
      fetchProducts();
    }
  }, [filters, currentPage, initialCategorySet]);

  // Restore scroll position after products load
  useEffect(() => {
    if (!loading) {
      restoreScrollPosition();
    }
  }, [loading]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
      setCategoriesLoaded(true);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoriesLoaded(true);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 12);
      
      if (filters.search) queryParams.append('search', filters.search);
      
      if (filters.categories.length > 0) {
        filters.categories.forEach(cat => queryParams.append('category', cat));
      }
      
      if (filters.targetedCustomer.length > 0) {
        filters.targetedCustomer.forEach(cust => queryParams.append('targetedCustomer', cust));
      }
      
      if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
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
        case 'newest':
        default:
          sortParam = 'newest';
      }
      queryParams.append('sort', sortParam);

      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/products?${queryParams.toString()}`);
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
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories };
    });
    setCurrentPage(1);
  };

  const handleRemoveCategory = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.filter(id => id !== categoryId)
    }));
    setCurrentPage(1);
  };

  const handleTargetedCustomerChange = (customer) => {
    saveScrollPosition();
    setFilters(prev => {
      const newCustomers = prev.targetedCustomer.includes(customer)
        ? prev.targetedCustomer.filter(c => c !== customer)
        : [...prev.targetedCustomer, customer];
      return { ...prev, targetedCustomer: newCustomers };
    });
    setCurrentPage(1);
  };

  const applyPriceRange = () => {
    saveScrollPosition();
    setFilters(prev => ({
      ...prev,
      priceRange: { 
        min: minPriceInput || '', 
        max: maxPriceInput || '' 
      }
    }));
    setCurrentPage(1);
  };

  const clearPriceRange = () => {
    saveScrollPosition();
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
  };

  const clearFilters = () => {
    saveScrollPosition();
    setSearchInput('');
    setFilters({
      search: '',
      categories: [],
      targetedCustomer: [],
      priceRange: { min: '', max: '' },
      sortBy: 'newest'
    });
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    saveScrollPosition();
    setCurrentPage(newPage);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count += 1;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.targetedCustomer.length > 0) count += filters.targetedCustomer.length;
    if (filters.priceRange.min || filters.priceRange.max) count += 1;
    return count;
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Add Loading Bar */}
      <LoadingBar isVisible={loading} />
      
      <Navbar />
      
      {/* Hero Section with Search */}
      <section className="mt-16 relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-4 pb-10 md:pt-6 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full">
          <div className="flex items-center gap-2 mb-3 md:mb-4 px-4 md:px-0 md:ml-4 lg:ml-8">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
              aria-label="Go back"
            >
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
            </button>
            <div className="flex items-center gap-1.5 text-xs">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-white font-medium">Products</span>
            </div>
          </div>
        </div>

        <div className="relative container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-0.5 md:px-3 md:py-1 mb-2 md:mb-3 border border-white/20">
                <Package className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#E39A65]" />
                <span className="text-white text-[10px] md:text-xs font-medium">Premium Wholesale</span>
              </div>
              
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
                Discover Our Products
              </h1>
              
              <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4 max-w-xl mx-auto px-4">
                Browse our collection of high-quality apparel with competitive wholesale pricing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-xl mx-auto px-4 md:px-0"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E39A65] to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-3 md:left-4 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="w-full pl-8 md:pl-10 pr-8 md:pr-10 py-2 md:py-2.5 text-xs md:text-sm bg-white/95 backdrop-blur-sm border-2 border-transparent rounded-lg md:rounded-xl focus:ring-2 focus:ring-[#E39A65]/20 focus:border-[#E39A65] outline-none transition-all shadow-md group-hover:shadow-lg"
                  />
                  {searchInput && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 md:right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {searchInput && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 mt-1.5 text-center"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] md:text-xs text-white border border-white/20">
                    <Search className="w-2.5 h-2.5" />
                    {products.length} results {filters.search && `for "${filters.search}"`}
                  </span>
                </motion.div>
              )}
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6 text-[10px] md:text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Package className="w-3 h-3 text-[#E39A65]" />
                 Products
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-[#E39A65]" />
                Live Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-[#E39A65]" />
                Global Suppliers
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          {/* Header with Sort and View Toggle */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
              <div className="flex items-center gap-2 md:gap-3 ml-auto">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="md:hidden flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 bg-white border border-gray-200 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-[#E39A65] text-white text-xs rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>

                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-2 md:px-4 md:py-3 text-sm border border-gray-200 rounded-lg md:rounded-xl bg-white focus:ring-2 focus:ring-[#E39A65]/20 focus:border-[#E39A65] outline-none transition shadow-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>

                <div className="hidden md:flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-[#E39A65] text-white' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-[#E39A65] text-white' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    title="List View"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.search || filters.categories.length > 0 || filters.targetedCustomer.length > 0 || filters.priceRange.min || filters.priceRange.max) && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                {filters.search && (
                  <div className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-orange-50 text-[#E39A65] rounded-full text-xs md:text-sm">
                    <span>"{filters.search}"</span>
                    <button onClick={handleClearSearch} className="ml-1 hover:text-[#d48b54]">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {filters.categories.map(catId => {
                  const category = categories.find(c => c._id === catId);
                  return category ? (
                    <div key={catId} className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-orange-50 text-[#E39A65] rounded-full text-xs md:text-sm">
                      <span>{category.name}</span>
                      <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-[#d48b54]">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : null;
                })}
                {filters.targetedCustomer.map(cust => (
                  <div key={cust} className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-orange-50 text-[#E39A65] rounded-full text-xs md:text-sm">
                    <span>{capitalizeFirst(cust)}</span>
                    <button onClick={() => handleTargetedCustomerChange(cust)} className="ml-1 hover:text-[#d48b54]">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {(filters.priceRange.min || filters.priceRange.max) && (
                  <div className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-orange-50 text-[#E39A65] rounded-full text-xs md:text-sm">
                    <span>${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}</span>
                    <button onClick={clearPriceRange} className="ml-1 hover:text-[#d48b54]">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Filters */}
            <div className="hidden md:block md:w-80 flex-shrink-0">
              <FilterSidebar 
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                categories={categories}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handleRemoveCategory={handleRemoveCategory}
                handleTargetedCustomerChange={handleTargetedCustomerChange}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                setMinPriceInput={setMinPriceInput}
                setMaxPriceInput={setMaxPriceInput}
                applyPriceRange={applyPriceRange}
                clearPriceRange={clearPriceRange}
                getActiveFilterCount={getActiveFilterCount}
                clearFilters={clearFilters}
              />
            </div>

            {/* Products Grid/List */}
            <div className="flex-1" ref={productsContainerRef}>
              {/* Loading State with Skeleton */}
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[...Array(12)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
                      <div className="h-36 sm:h-52 bg-gray-200"></div>
                      <div className="p-2 sm:p-5">
                        <div className="h-3 sm:h-6 bg-gray-200 rounded mb-1 sm:mb-2"></div>
                        <div className="h-4 sm:h-8 bg-gray-200 rounded mb-1 sm:mb-3 w-1/2"></div>
                        <div className="h-2 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-4"></div>
                        <div className="h-6 sm:h-10 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {products.length === 0 ? (
                    <div className="text-center py-16 md:py-20 bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm">
                      <Package className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 md:mb-4" />
                      <p className="text-sm md:text-base text-gray-500 mb-4">No products found</p>
                      <button
                        onClick={clearFilters}
                        className="px-4 py-2 md:px-6 md:py-2.5 bg-[#E39A65] text-white text-sm md:text-base rounded-lg hover:bg-[#d48b54] transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <>
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                          {products.map(product => (
                            <ProductGridCard key={product._id} product={product} />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4 md:space-y-6">
                          {products.map(product => (
                            <ProductListCard key={product._id} product={product} />
                          ))}
                        </div>
                      )}

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8">
                          <button
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 md:p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
                          >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
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
                                  onClick={() => handlePageChange(pageNum)}
                                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-medium transition-colors shadow-sm ${
                                    currentPage === pageNum
                                      ? 'bg-[#E39A65] text-white'
                                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                              return <span key={i} className="text-xs md:text-sm text-gray-400">...</span>;
                            }
                            return null;
                          })}
                          
                          <button
                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 md:p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
                          >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar 
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                categories={categories}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handleRemoveCategory={handleRemoveCategory}
                handleTargetedCustomerChange={handleTargetedCustomerChange}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                setMinPriceInput={setMinPriceInput}
                setMaxPriceInput={setMaxPriceInput}
                applyPriceRange={applyPriceRange}
                clearPriceRange={clearPriceRange}
                getActiveFilterCount={getActiveFilterCount}
                clearFilters={clearFilters}
              />
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-[#E39A65] text-white rounded-lg font-medium hover:bg-[#d48b54] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Add CSS for loading animation */}
      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
         .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  
  .overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
      `}</style>
    </>
  );
}