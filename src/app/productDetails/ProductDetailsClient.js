


// // app/productDetails/ProductDetailsClient.js
// 'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { 
//   ChevronLeft, 
//   ShoppingCart, 
//   MessageCircle, 
//   Check, 
//   Loader2,
//   Package,
//   Users,
//   FileText,
//   Truck,
//   Clock,
//   Maximize2,
//   X,
//   Trash2,
//   ChevronRight,
//   Eye,
//   DollarSign,
//   TrendingUp,
//   Sparkles,
//   BookOpen,
//   Plus,
//   ChevronDown,
//   ChevronUp,
//   CheckCircle,
//   FolderTree
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';
// import AuthModal from '../components/AuthModal';
// import { motion } from 'framer-motion';
// import ProductReviews from '../components/product/ProductReviews';
// import MetadataUpdater from './MetadataUpdater';
// import FullscreenModal from '../components/FullscreenModal';
// import WhatsAppButton from '../components/layout/WhatsAppButton';

// // Helper function to format currency
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to capitalize first letter
// const capitalizeFirst = (str) => {
//   if (!str) return '';
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// };

// // Helper function to truncate text
// const truncateText = (text, limit = 30) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// // Helper function to format price without currency symbol for display
// const formatPriceNumber = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// // Rich Text Content Renderer Component
// const RichTextContent = ({ content, className = '' }) => {
//   if (!content) return <p className="text-gray-500 italic">No content available.</p>;

//   return (
//     <div 
//       className={`prose prose-sm sm:prose lg:prose-lg max-w-none rich-text-content ${className}`}
//       dangerouslySetInnerHTML={{ __html: content }}
//     />
//   );
// };

// // Image Gallery Component - Without Zoom Effect
// const ImageGallery = ({ images = [], productName }) => {
//   const [mainImage, setMainImage] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState({});
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const preloadImage = (src) => {
//     const img = new Image();
//     img.src = src;
//   };

//   useEffect(() => {
//     if (images.length > 0) {
//       const nextIndex = (mainImage + 1) % images.length;
//       const prevIndex = (mainImage - 1 + images.length) % images.length;
      
//       if (images[nextIndex]?.url) preloadImage(images[nextIndex].url);
//       if (images[prevIndex]?.url) preloadImage(images[prevIndex].url);
//     }
//   }, [mainImage, images]);

//   const handleImageChange = (idx) => {
//     if (idx === mainImage) return;
    
//     setIsTransitioning(true);
//     setMainImage(idx);
//     setImageLoaded(prev => ({ ...prev, [idx]: false }));
//   };

//   const handleImageLoad = (idx) => {
//     setImageLoaded(prev => ({ ...prev, [idx]: true }));
//     setTimeout(() => {
//       setIsTransitioning(false);
//     }, 100);
//   };

//   const getThumbnailSize = () => {
//     const count = images.length;
//     if (count <= 4) return 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20';
//     if (count <= 6) return 'w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16';
//     return 'w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14';
//   };

//   return (
//     <>
//       <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//         {/* Thumbnails */}
//         <div className="flex sm:flex-row lg:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
//           <div className="flex sm:flex-row lg:flex-col gap-2">
//             {images.map((image, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleImageChange(idx)}
//                 onMouseEnter={() => {
//                   preloadImage(image.url);
//                   handleImageChange(idx);
//                 }}
//                 className={`relative flex-shrink-0 ${getThumbnailSize()} rounded-lg overflow-hidden border-2 transition-all ${
//                   mainImage === idx 
//                     ? 'border-[#E39A65] shadow-md ring-2 ring-[#E39A65]/20' 
//                     : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                 }`}
//               >
//                 <img
//                   src={image.url}
//                   alt={`${productName} - Thumbnail ${idx + 1}`}
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
//                   }}
//                 />
//                 {mainImage === idx && (
//                   <div className="absolute inset-0 bg-[#E39A65]/10 flex items-center justify-center">
//                     <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#E39A65]" />
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Main Image - No zoom effect */}
//         <div 
//           className="flex-1 relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden group cursor-default order-1 sm:order-2 flex items-center justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-[460px]"
//         >
//           {(isTransitioning || !imageLoaded[mainImage]) && (
//             <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
//               <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
//             </div>
//           )}
          
//           <div className="relative w-full h-full flex items-center justify-center">
//             <img
//               key={mainImage}
//               src={images[mainImage]?.url || images[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image'}
//               alt={`${productName} - Main view`}
//               className={`w-full h-auto max-h-[320px] sm:max-h-[380px] lg:max-h-[460px] object-contain transition-all duration-300 ${
//                 imageLoaded[mainImage] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//               }`}
//               style={{
//                 objectPosition: 'center',
//               }}
//               onLoad={() => handleImageLoad(mainImage)}
//               loading={mainImage === 0 ? "eager" : "lazy"}
//               fetchPriority={mainImage === 0 ? "high" : "auto"}
//               decoding="async"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
//                 handleImageLoad(mainImage);
//               }}
//             />
//           </div>
          
//           <button
//             onClick={() => setIsFullscreen(true)}
//             className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300 z-30"
//             aria-label="View fullscreen"
//           >
//             <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//           </button>

//           <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-30">
//             {mainImage + 1} / {images.length}
//           </div>
//         </div>
//       </div>

//       {/* Fullscreen Modal using Portal */}
//       <FullscreenModal
//         isOpen={isFullscreen}
//         onClose={() => setIsFullscreen(false)}
//         images={images}
//         currentIndex={mainImage}
//         onImageChange={handleImageChange}
//         productName={productName}
//       />
//     </>
//   );
// };

// // Color Selector Component
// const ColorSelector = ({ colors, selectedColor, onChange }) => {
//   return (
//     <div className="flex flex-wrap gap-2">
//       {colors.map((color, index) => (
//         <button
//           key={index}
//           onClick={() => onChange(color)}
//           className={`relative p-0.5 rounded-full transition-all ${
//             selectedColor?.code === color.code
//               ? 'ring-2 ring-[#E39A65] ring-offset-2'
//               : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
//           }`}
//           title={color.code}
//         >
//           <div
//             className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-md"
//             style={{ backgroundColor: color.code }}
//           />
//           {selectedColor?.code === color.code && (
//             <CheckCircle className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-[#E39A65] bg-white rounded-full" />
//           )}
//         </button>
//       ))}
//     </div>
//   );
// };

// // Bulk Pricing Table Component - Updated to show per color pricing
// const BulkPricingTable = ({ pricing = [], unitPrice, moq }) => {
//   const [showAllTiers, setShowAllTiers] = useState(false);
  
//   const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];
  
//   const displayedTiers = showAllTiers ? pricingData : pricingData.slice(0, 3);
//   const hasMoreTiers = pricingData.length > 3;

//   const calculateSavings = (prevPrice, currentPrice) => {
//     if (!prevPrice || !currentPrice) return null;
//     const savingsPercent = ((prevPrice - currentPrice) / prevPrice * 100).toFixed(1);
//     return savingsPercent;
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg sm:rounded-xl border border-[#E39A65]/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
//     >
//       <div className="relative overflow-hidden">
//         <motion.div 
//           className="absolute inset-0 bg-gradient-to-r from-[#E39A65] to-[#d48b54]"
//           initial={{ x: '-100%' }}
//           animate={{ x: '100%' }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
//           style={{ opacity: 0.15 }}
//         />
        
//         <div className="relative px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-[#E39A65] to-[#d48b54]">
//           <div className="flex items-center justify-between flex-wrap gap-2">
//             <div className="flex items-center gap-3">
//               <div className="w-1 h-8 bg-gradient-to-b from-white to-amber-100 rounded-full"></div>
//               <div>
//                 <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
//                   <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   Bulk Pricing (Per Color)
//                 </h3>
//                 <p className="text-xs text-white/80 mt-0.5">Volume discounts apply per color · Each color must meet minimum quantity</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-[#E39A65]/5">
//         <div className="w-full">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b-2 border-[#E39A65]/20">
//                 <th className="text-left py-3 px-2 sm:px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   <div className="flex items-center gap-2">
//                     <Package className="w-4 h-4 text-[#E39A65]" />
//                     <span>Quantity Per Color</span>
//                   </div>
//                 </th>
//                 <th className="text-left py-3 px-2 sm:px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   <div className="flex items-center gap-2">
//                     <DollarSign className="w-4 h-4 text-[#E39A65]" />
//                     <span>Price/Unit</span>
//                   </div>
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-[#E39A65]/10">
//               {displayedTiers.map((tier, index) => {
//                 const tierPrice = tier.price || unitPrice;
//                 const prevPrice = index > 0 ? pricingData[index - 1].price : null;
//                 const savings = prevPrice ? calculateSavings(prevPrice, tierPrice) : null;
//                 const isBestValue = index === pricingData.length - 1 && pricingData.length > 1;

//                 return (
//                   <motion.tr 
//                     key={index}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ 
//                       backgroundColor: '#fef2e6',
//                       scale: 1.01,
//                       transition: { duration: 0.2 }
//                     }}
//                     className={`transition-all duration-200 cursor-default rounded-lg ${
//                       isBestValue ? 'bg-[#E39A65]/5' : ''
//                     }`}
//                   >
//                     <td className="py-3 px-2 sm:px-3">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <span className="text-sm font-medium text-gray-900">
//                           {tier.range || `${moq}+`} pcs
//                         </span>
//                         {isBestValue && (
//                           <motion.span 
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             className="px-2 py-0.5 bg-[#E39A65]/20 text-[#E39A65] text-[10px] font-medium rounded-full whitespace-nowrap"
//                           >
//                             Best Value
//                           </motion.span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="py-3 px-2 sm:px-3">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <span className="font-bold text-[#E39A65] text-base">
//                           {formatPrice(tierPrice)}
//                         </span>
//                         {savings && (
//                           <motion.span 
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full whitespace-nowrap"
//                           >
//                             Save {savings}%
//                           </motion.span>
//                         )}
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
        
//         {hasMoreTiers && (
//           <div className="mt-4 pt-3 text-center">
//             <button
//               onClick={() => setShowAllTiers(!showAllTiers)}
//               className="inline-flex items-center gap-2 text-sm text-[#E39A65] hover:text-[#d48b54] font-medium transition-colors duration-200"
//             >
//               {showAllTiers ? (
//                 <>
//                   <ChevronUp className="w-4 h-4" />
//                   Show Less
//                 </>
//               ) : (
//                 <>
//                   <ChevronDown className="w-4 h-4" />
//                   Show More ({pricingData.length - 3} more)
//                 </>
//               )}
//             </button>
//           </div>
//         )}
        
//         <div className="mt-4 pt-3 border-t border-[#E39A65]/20 relative">
//           <div className="absolute -top-[2px] left-0 w-20 h-[2px] bg-gradient-to-r from-[#E39A65] to-transparent"></div>
          
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
//           >
//             <div className="flex items-center gap-2 text-xs text-gray-600">
//               <CheckCircle className="w-4 h-4 text-[#E39A65]" />
//               <span className="whitespace-nowrap">Best price</span>
//             </div>
//             <div className="flex items-center gap-2 text-xs text-gray-600">
//               <Clock className="w-4 h-4 text-[#E39A65]" />
//               <span className="whitespace-nowrap">Inst. Quote</span>
//             </div>
//             <div className="flex items-center gap-2 text-xs text-gray-600 col-span-2 sm:col-span-1">
//               <TrendingUp className="w-4 h-4 text-[#E39A65]" />
//               <span className="whitespace-nowrap"> Discounts</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Key Attributes Component
// // const KeyAttributes = ({ product }) => {
// //   const attributes = [
// //     { label: 'MOQ (Per Color)', value: `${product.moq} pieces` },
// //     { label: 'Fabric', value: product.fabric || 'Standard' },
// //     { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
// //     { label: 'Available Sizes', value: product.sizes?.filter(s => s.trim()).slice(0, 5).join(', ') + (product.sizes?.length > 5 ? ` +${product.sizes.length - 5} more` : '') || 'Standard' },
// //     ...(product.additionalInfo || []).map(info => ({
// //       label: info.fieldName,
// //       value: info.fieldValue
// //     }))
// //   ];

// //   return (
// //     <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
// //       <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
// //         <h3 className="text-base sm:text-lg font-semibold text-gray-900">Key Attributes</h3>
// //       </div>
// //       <div className="p-4 sm:p-6">
// //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
// //           {attributes.map((attr, index) => (
// //             <div key={index} className="border-b border-gray-100 pb-2 sm:pb-3 last:border-0">
// //               <p className="text-xs sm:text-sm text-gray-500 mb-1">{attr.label}</p>
// //               <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{attr.value}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// const KeyAttributes = ({ product }) => {
//   // Build additional info attributes
//   const additionalInfoAttributes = (product.additionalInfo || []).map(info => ({
//     label: info.fieldName,
//     value: info.fieldValue
//   }));

//   // Build subcategory attribute if exists
//   const subcategoryAttribute = product.subcategoryName ? [{ label: 'Subcategory', value: product.subcategoryName }] : [];

//   const attributes = [
//     { label: 'MOQ (Per Color)', value: `${product.moq} pieces` },
//     { label: 'Fabric', value: product.fabric || 'Standard' },
//     { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
//     { label: 'Available Sizes', value: product.sizes?.filter(s => s.trim()).slice(0, 5).join(', ') + (product.sizes?.length > 5 ? ` +${product.sizes.length - 5} more` : '') || 'Standard' },
//     { label: 'Category', value: product.category?.name || 'Uncategorized' },
//     ...subcategoryAttribute,
//     ...additionalInfoAttributes
//   ];

//   return (
//     <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
//       <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
//         <h3 className="text-base sm:text-lg font-semibold text-gray-900">Key Attributes</h3>
//       </div>
//       <div className="p-4 sm:p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//           {attributes.map((attr, index) => (
//             <div key={index} className="border-b border-gray-100 pb-2 sm:pb-3 last:border-0">
//               <p className="text-xs sm:text-sm text-gray-500 mb-1">{attr.label}</p>
//               <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{attr.value}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Description Component
// const Description = ({ product }) => {
//   return (
//     <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
//       <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
//         <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
//           <FileText className="w-5 h-5 text-[#E39A65]" />
//           Product Description
//         </h3>
//       </div>
//       <div className="p-4 sm:p-6">
//         <RichTextContent content={product.description} />
//       </div>
//     </div>
//   );
// };

// // Instructions Component
// const Instructions = ({ product }) => {
//   if (!product.instruction) {
//     return (
//       <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
//         <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
//           <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
//             <BookOpen className="w-5 h-5 text-[#E39A65]" />
//             Care Instructions
//           </h3>
//         </div>
//         <div className="p-4 sm:p-6">
//           <p className="text-gray-500 italic">No care instructions available.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
//       <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
//         <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
//           <BookOpen className="w-5 h-5 text-[#E39A65]" />
//           Care Instructions
//         </h3>
//       </div>
//       <div className="p-4 sm:p-6">
//         <RichTextContent content={product.instruction} />
//       </div>
//     </div>
//   );
// };

// // Shipping Info Component
// const ShippingInfo = () => {
//   return (
//     <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
//       <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
//         <h3 className="text-base sm:text-lg font-semibold text-gray-900">Shipping Information</h3>
//       </div>
//       <div className="p-4 sm:p-6">
//         <div className="space-y-3 sm:space-y-4">
//           <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
//             <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#E39A65] flex-shrink-0" />
//             <div>
//               <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Global Shipping Available</h4>
//               <p className="text-xs sm:text-sm text-gray-600">
//                 We ship worldwide with reliable carriers. Shipping costs calculated based on destination and order volume.
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
//             <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#E39A65] flex-shrink-0" />
//             <div>
//               <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Estimated Delivery Time</h4>
//               <p className="text-xs sm:text-sm text-gray-600">
//                 Domestic: 3-5 business days<br />
//                 International: 7-15 business days
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
//             <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#E39A65] flex-shrink-0" />
//             <div>
//               <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Bulk Order Shipping</h4>
//               <p className="text-xs sm:text-sm text-gray-600">
//                 Special shipping rates available for bulk orders. Contact us for a customized quote.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Inquiry Item Component - Updated with per-color pricing and validation
// const InquiryItem = ({ item, index, product, onUpdate, onRemove, showRemove, onColorQuantityChange }) => {
//   const [sizeQuantities, setSizeQuantities] = useState(item.sizeQuantities || {});
//   const [colorTotal, setColorTotal] = useState(item.quantity || 0);
//   const [colorUnitPrice, setColorUnitPrice] = useState(item.unitPrice || product.pricePerUnit);

//   useEffect(() => {
//     if (item.sizeQuantities) {
//       setSizeQuantities(item.sizeQuantities);
//     }
//     if (item.quantity !== undefined) {
//       setColorTotal(item.quantity);
//     }
//     if (item.unitPrice) {
//       setColorUnitPrice(item.unitPrice);
//     }
//   }, [item.sizeQuantities, item.quantity, item.unitPrice]);

//   // Get price based on quantity for this specific color
//   const getPriceForQuantity = (quantity) => {
//     if (!product.quantityBasedPricing || product.quantityBasedPricing.length === 0) {
//       return product.pricePerUnit;
//     }
    
//     const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//       const aMin = parseInt(a.range.split('-')[0]);
//       const bMin = parseInt(b.range.split('-')[0]);
//       return aMin - bMin;
//     });
    
//     let matchedTier = null;
    
//     for (const tier of sortedTiers) {
//       const range = tier.range;
      
//       if (range.includes('-')) {
//         const [min, max] = range.split('-').map(Number);
//         if (quantity >= min && quantity <= max) {
//           matchedTier = tier;
//           break;
//         }
//       }
//       else if (range.includes('+')) {
//         const minQty = parseInt(range.replace('+', ''));
//         if (quantity >= minQty) {
//           matchedTier = tier;
//           break;
//         }
//       }
//     }
    
//     if (matchedTier) {
//       return matchedTier.price;
//     }
    
//     // If no tier matched, check if quantity exceeds the highest tier's max
//     const highestTier = sortedTiers[sortedTiers.length - 1];
//     if (highestTier && highestTier.range.includes('-') && quantity > parseInt(highestTier.range.split('-')[1])) {
//       return highestTier.price;
//     }
    
//     return product.pricePerUnit;
//   };

//   const handleSizeQuantityChange = (size, quantity) => {
//     const newQuantities = { ...sizeQuantities, [size]: quantity };
//     setSizeQuantities(newQuantities);
    
//     const totalQty = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
//     setColorTotal(totalQty);
    
//     // Get the applicable unit price based on this color's total quantity
//     const applicablePrice = getPriceForQuantity(totalQty);
//     setColorUnitPrice(applicablePrice);
    
//     onUpdate(item.id, 'sizeQuantities', newQuantities);
//     onUpdate(item.id, 'quantity', totalQty);
//     onUpdate(item.id, 'unitPrice', applicablePrice);
    
//     // Notify parent about color quantity change for overall validation
//     if (onColorQuantityChange) {
//       onColorQuantityChange(item.id, totalQty, applicablePrice);
//     }
//   };

//   const allSizes = product.sizes?.filter(s => s.trim()) || [];
//   const meetsMOQ = colorTotal >= product.moq;
//   const colorPrice = colorUnitPrice;

//   return (
//     <div className={`bg-gray-50 rounded-lg p-3 sm:p-4 border transition-all ${meetsMOQ ? 'border-green-200' : 'border-yellow-200'}`}>
//       <div className="flex items-center justify-between mb-2 sm:mb-3">
//         <div className="flex items-center gap-2">
//           <div 
//             className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-sm"
//             style={{ backgroundColor: item.color?.code || '#CCCCCC' }}
//           />
//           <h4 className="text-xs sm:text-sm font-medium text-gray-900">
//             {item.color?.code || 'Selected Color'} - Item {index + 1}
//           </h4>
//         </div>
//         <div className="flex items-center gap-2">
//           {!meetsMOQ && colorTotal > 0 && (
//             <span className="text-[10px] text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
//               Need {product.moq - colorTotal} more
//             </span>
//           )}
//           {showRemove && (
//             <button
//               onClick={() => onRemove(item.id)}
//               className="p-1 hover:bg-red-100 rounded-lg transition-colors group"
//               title="Remove item"
//             >
//               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 group-hover:text-red-600" />
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
//         {allSizes.map((size, idx) => (
//           <div key={idx} className="flex flex-col">
//             <label className="block text-[10px] sm:text-xs text-gray-500 mb-1">{size}</label>
//             <input
//               type="number"
//               min="0"
//               value={sizeQuantities[size] || ''}
//               onChange={(e) => handleSizeQuantityChange(size, parseInt(e.target.value) || 0)}
//               onWheel={(e) => e.target.blur()}
//               className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
//               placeholder="Qty"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="mt-2 sm:mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
//         <div className="flex flex-col">
//           <span className="text-xs sm:text-sm text-gray-600">Color Total:</span>
//           <span className="text-xs sm:text-sm font-semibold text-[#E39A65]">{colorTotal} pcs</span>
//         </div>
//         <div className="flex flex-col text-right">
//           <span className="text-xs sm:text-sm text-gray-600">Unit Price:</span>
//           <span className="text-xs sm:text-sm font-semibold text-[#E39A65]">{formatPrice(colorPrice)}</span>
//         </div>
//         <div className="flex flex-col text-right">
//           <span className="text-xs sm:text-sm text-gray-600">Color Total Price:</span>
//           <span className="text-xs sm:text-sm font-bold text-[#E39A65]">{formatPrice(colorPrice * colorTotal)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper for tag styling
// const getTagStyles = (tag) => {
//   const styles = {
//     'Top Ranking': 'bg-gradient-to-r from-amber-500 to-orange-500',
//     'New Arrival': 'bg-gradient-to-r from-blue-500 to-cyan-500',
//     'Top Deal': 'bg-gradient-to-r from-green-500 to-emerald-500',
//     'Best Seller': 'bg-gradient-to-r from-purple-500 to-pink-500',
//     'Summer Collection': 'bg-gradient-to-r from-yellow-500 to-orange-400',
//     'Winter Collection': 'bg-gradient-to-r from-indigo-500 to-blue-400',
//     'Limited Edition': 'bg-gradient-to-r from-red-500 to-rose-500',
//     'Trending': 'bg-gradient-to-r from-pink-500 to-rose-500',
//   };
//   return styles[tag] || 'bg-gradient-to-r from-gray-500 to-gray-600';
// };

// // Helper for targeted audience badge styling
// const getTargetedAudienceStyle = (audience) => {
//   const styles = {
//     'ladies': 'bg-gradient-to-r from-pink-400 to-rose-400 text-white',
//     'gents': 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white',
//     'kids': 'bg-gradient-to-r from-green-400 to-emerald-400 text-white',
//     'unisex': 'bg-gradient-to-r from-purple-400 to-violet-400 text-white',
//   };
//   return styles[audience] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
// };

// // RelatedProductCard Component
// const RelatedProductCard = ({ product }) => {
//   const productImages = product.images || [];
//   const [activeIndex, setActiveIndex] = useState(0);
//   const hasMultipleImages = productImages.length > 1;
//   const firstTier = product.quantityBasedPricing?.[0];
//   const primaryTag = product.tags?.[0];
//   const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';

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
//         y: -8,
//         transition: { type: "spring", stiffness: 300, damping: 15 }
//       }}
//       onClick={() => window.location.href = `/productDetails?id=${product._id}`}
//       className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-[#E39A65]/20 cursor-pointer"
//     >
//       {/* Image Container */}
//       <div className="relative h-48 overflow-hidden bg-gray-100">
//         <motion.div 
//           className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
//           whileHover={{ opacity: 1 }}
//         />
        
//         <motion.img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
//           alt={product.productName || 'Product image'}
//           className="w-full h-full object-contain bg-gray-50 p-2"
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.5 }}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
//           }}
//           loading="lazy"
//         />
        
//         {/* Desktop Hover Icons */}
//         <motion.div 
//           className="absolute inset-0 bg-black/40 items-center justify-center gap-3 
//                      hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
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

//         {/* Mobile Icons */}
//         <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:hidden z-30">
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
        
//         {/* ONLY TAG BADGE */}
//         {primaryTag && (
//           <motion.span 
//             initial={{ x: 20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className={`absolute top-2 right-2 ${getTagStyles(primaryTag)} text-white text-[8px] md:text-[10px] px-1.5 py-0.5 rounded-full font-medium shadow-lg z-20 flex items-center gap-0.5 max-w-[90px]`}
//           >
//             <span className="truncate">{primaryTag}</span>
//           </motion.span>
//         )}
//       </div>

//       {/* Thumbnail Gallery */}
//       {hasMultipleImages && (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6 }}
//               className="flex justify-center gap-1 py-1.5 px-1 bg-gray-50/80 border-t border-gray-100"
//               onMouseLeave={handleImageLeave}
//             >
//             {productImages.slice(0, 4).map((image, index) => (
//       <motion.button
//         key={index}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         className={`relative w-5 h-5 md:w-7 md:h-7 rounded-md overflow-hidden transition-all duration-300 ${
//           activeIndex === index 
//             ? 'ring-1 ring-[#E39A65] ring-offset-1 scale-110 shadow-md' 
//             : 'opacity-60 hover:opacity-100'
//         }`}
//         onMouseEnter={() => handleImageHover(index)}
//         onClick={(e) => {
//           e.stopPropagation();
//           handleImageHover(index);
//         }}
//       >
//         <img
//           src={image.url}
//           alt=""
//           className="w-full h-full object-cover"
//         />
//       </motion.button>
//     ))}
//     {/* Removed the +X indicator completely */}
//             </motion.div>
//           )}
    

//       {/* Content */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.7 }}
//         className="p-2 md:p-3"
//       >
//         {/* Title and Price */}
//         <div className="flex items-start justify-between gap-1 mb-2">
//           <h3 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 flex-1" title={product.productName}>
//             {truncateText(product.productName, 20)}
//           </h3>
//           <div className="flex-shrink-0 text-right">
//             <span className="text-xs md:text-base font-bold text-[#E39A65]">
//               ${formatPriceNumber(product.pricePerUnit)}
//             </span>
//             <span className="text-gray-500 text-[8px] md:text-[10px] ml-0.5">/pc</span>
//           </div>
//         </div>

//         {/* Category, Targeted Audience & MOQ */}
//         <div className="flex items-center justify-start gap-1 mb-2 flex-wrap sm:flex-nowrap">
//           <div className="flex items-center gap-1 bg-gray-100 rounded-md px-1.5 py-0.5 flex-shrink-0">
//             <Package className="w-2.5 h-2.5 text-gray-500" />
//             <span className="text-[8px] md:text-[10px] text-gray-700 font-medium whitespace-nowrap">
//               {truncateText(product.category?.name || 'Uncategorized', 8)}
//             </span>
//           </div>

//           {product.targetedCustomer && (
//             <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md flex-shrink-0 ${audienceStyle}`}>
//               <Users className="w-2.5 h-2.5" />
//               <span className="text-[8px] md:text-[10px] capitalize font-medium whitespace-nowrap">
//                 {product.targetedCustomer === 'ladies' ? 'Ladies' : 
//                  product.targetedCustomer === 'gents' ? 'Gents' :
//                  product.targetedCustomer === 'kids' ? 'Kids' : product.targetedCustomer}
//               </span>
//             </div>
//           )}

//           <div className="flex items-center gap-1 bg-gray-100 rounded-md px-1.5 py-0.5 flex-shrink-0">
//             <span className="text-[8px] md:text-[10px] text-gray-600 whitespace-nowrap">MOQ:</span>
//             <span className="text-[8px] md:text-[10px] font-semibold text-gray-800 whitespace-nowrap">{product.moq || 0}</span>
//           </div>
//         </div>

//         {/* Color Dots */}
//         {product.colors && product.colors.length > 0 && (
//           <div className="flex items-center gap-0.5 md:gap-1 mb-2">
//             {product.colors.slice(0, 4).map((color, i) => (
//               <div
//                 key={i}
//                 className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-white shadow-sm"
//                 style={{ backgroundColor: color.code }}
//                 title={color.name || color.code}
//               />
//             ))}
//             {product.colors.length > 4 && (
//               <span className="text-[6px] md:text-[8px] text-gray-400">+{product.colors.length - 4}</span>
//             )}
//           </div>
//         )}

//         {/* Bulk Price */}
//         {firstTier && (
//           <motion.div 
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-md p-1 md:p-1.5 mb-2 border border-orange-100/80"
//           >
//             <div className="flex justify-between items-center text-[9px] md:text-xs">
//               <span className="text-gray-600 font-medium">{firstTier.range || 'Bulk'}</span>
//               <span className="font-bold text-[#E39A65]">${formatPriceNumber(firstTier.price)}/pc</span>
//             </div>
//           </motion.div>
//         )}

//         {/* Add to Inquiry Button */}
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={(e) => {
//             e.stopPropagation();
//             window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
//           }}
//         >
//           <div className="flex items-center justify-center gap-1 w-full text-center bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white py-1.5 md:py-2 rounded-lg text-[9px] md:text-xs font-medium hover:opacity-90 transition-all duration-300 hover:shadow-md cursor-pointer">
//             <ShoppingCart className="w-2.5 h-2.5 md:w-3 md:h-3" />
//             <span>Add to Inquiry</span>
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Main Product Content Component
// export default function ProductDetailsClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');

//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [inquiryItems, setInquiryItems] = useState([]);
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [specialInstructions, setSpecialInstructions] = useState('');
//   const [activeTab, setActiveTab] = useState('attributes');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
  
//   // Auth state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authModalTab, setAuthModalTab] = useState('login');
  
//   // Cart check state
//   const [isInCart, setIsInCart] = useState(false);
//   const [cartItemDetails, setCartItemDetails] = useState(null);

//   // Helper function to get items per view based on screen size
//   const getItemsPerView = () => {
//     if (typeof window !== 'undefined') {
//       if (window.innerWidth < 640) return 2;
//       if (window.innerWidth < 1024) return 3;
//       return 4;
//     }
//     return 4;
//   };

//   // Auto-play functionality for related products
//   useEffect(() => {
//     if (relatedProducts.length <= getItemsPerView()) return;
    
//     const startAutoPlay = () => {
//       if (!isHovered) {
//         const autoPlayRef = setInterval(() => {
//           const itemsPerView = getItemsPerView();
//           setCurrentIndex((prev) => 
//             prev + itemsPerView >= relatedProducts.length ? 0 : prev + itemsPerView
//           );
//         }, 5000);
//         return autoPlayRef;
//       }
//       return null;
//     };

//     const autoPlayRef = startAutoPlay();
//     return () => {
//       if (autoPlayRef) clearInterval(autoPlayRef);
//     };
//   }, [isHovered, relatedProducts.length]);

//   const handleNext = () => {
//     const itemsPerView = getItemsPerView();
//     setCurrentIndex((prev) => 
//       prev + itemsPerView >= relatedProducts.length ? 0 : prev + itemsPerView
//     );
//   };

//   const handlePrev = () => {
//     const itemsPerView = getItemsPerView();
//     setCurrentIndex((prev) => 
//       prev - itemsPerView < 0 ? Math.max(relatedProducts.length - itemsPerView, 0) : prev - itemsPerView
//     );
//   };

//   const visibleProducts = relatedProducts.slice(currentIndex, currentIndex + getItemsPerView());

//   // Add resize listener to update carousel when screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       if (currentIndex + getItemsPerView() > relatedProducts.length) {
//         setCurrentIndex(0);
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [currentIndex, relatedProducts.length]);
  
//   // Scroll to inquiry form if hash present
//   useEffect(() => {
//     if (window.location.hash === '#inquiry-form') {
//       const attemptScroll = (retries = 0) => {
//         const formElement = document.getElementById('inquiry-form');
        
//         if (formElement) {
//           const yOffset = -100;
//           const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
//           window.scrollTo({
//             top: y,
//             behavior: 'smooth'
//           });
          
//           formElement.classList.add('ring-4', 'ring-[#E39A65]/20', 'transition-all', 'duration-1000');
//           setTimeout(() => {
//             formElement.classList.remove('ring-4', 'ring-[#E39A65]/20');
//           }, 2000);
//         } else if (retries < 10) {
//           setTimeout(() => attemptScroll(retries + 1), 300);
//         }
//       };
      
//       setTimeout(attemptScroll, 500);
//     }
//   }, []);

//   // Check authentication status on mount
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = () => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
      
//       if (token && userData) {
//         setIsAuthenticated(true);
//         setUser(JSON.parse(userData));
//       } else {
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     }
//   };

//   const handleAuthSuccess = (userData, token) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setIsAuthenticated(true);
//     setUser(userData);
//     setShowAuthModal(false);
    
//     toast.success('Successfully logged in!', {
//       description: `Welcome back, ${userData.contactPerson || userData.companyName}!`,
//     });
//   };

//   // Fetch product
//   const fetchProduct = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/products/${productId}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setProduct(data.data);
//         if (data.data.colors && data.data.colors.length > 0) {
//           setSelectedColor(data.data.colors[0]);
//         }
//         setInquiryItems([]);
//         fetchRelatedProducts(data.data.category?._id || data.data.category, data.data.targetedCustomer);
//       } else {
//         toast.error('Product not found');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to load product details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRelatedProducts = async (categoryId, targetedCustomer) => {
//     try {
//       const queryParams = new URLSearchParams();
//       queryParams.append('limit', 8);
//       if (categoryId) queryParams.append('category', categoryId);
//       if (targetedCustomer) queryParams.append('targetedCustomer', targetedCustomer);
      
//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/products?${queryParams.toString()}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = (data.data || []).filter(p => p._id !== productId);
//         const shuffled = filtered.sort(() => 0.5 - Math.random());
//         setRelatedProducts(shuffled.slice(0, 12));
//       }
//     } catch (error) {
//       console.error('Error fetching related products:', error);
//     }
//   };

//   const checkIfInCart = async () => {
//     if (!isAuthenticated || !product) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
      
//       if (data.success && data.data.items) {
//         const existingItem = data.data.items.find(item => 
//           item.productId === product._id || item.productId === product.id
//         );
        
//         if (existingItem) {
//           setIsInCart(true);
//           setCartItemDetails(existingItem);
//         } else {
//           setIsInCart(false);
//           setCartItemDetails(null);
//         }
//       }
//     } catch (error) {
//       console.error('Error checking cart:', error);
//     }
//   };

//   useEffect(() => {
//     if (productId) {
//       fetchProduct();
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (product && isAuthenticated) {
//       checkIfInCart();
//     } else {
//       setIsInCart(false);
//       setCartItemDetails(null);
//     }
//   }, [product, isAuthenticated]);

//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (product && isAuthenticated) {
//         checkIfInCart();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [product, isAuthenticated]);

//   // Calculate totals - Now based on per-color pricing
//   useEffect(() => {
//     if (!product) return;
    
//     // Calculate total quantity across all colors
//     const totalQty = inquiryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
//     setTotalQuantity(totalQty);
    
//     // Calculate total price based on each color's unit price and quantity
//     const total = inquiryItems.reduce((sum, item) => {
//       const itemPrice = (item.unitPrice || product.pricePerUnit) * (item.quantity || 0);
//       return sum + itemPrice;
//     }, 0);
//     setTotalPrice(total);
//   }, [inquiryItems, product]);

//   // Function to get price for a specific quantity (per color)
//   const getPriceForQuantity = (quantity) => {
//     if (!product || !product.quantityBasedPricing || product.quantityBasedPricing.length === 0) {
//       return product?.pricePerUnit || 0;
//     }
    
//     const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//       const aMin = parseInt(a.range.split('-')[0]);
//       const bMin = parseInt(b.range.split('-')[0]);
//       return aMin - bMin;
//     });
    
//     let matchedTier = null;
    
//     for (const tier of sortedTiers) {
//       const range = tier.range;
      
//       if (range.includes('-')) {
//         const [min, max] = range.split('-').map(Number);
//         if (quantity >= min && quantity <= max) {
//           matchedTier = tier;
//           break;
//         }
//       }
//       else if (range.includes('+')) {
//         const minQty = parseInt(range.replace('+', ''));
//         if (quantity >= minQty) {
//           matchedTier = tier;
//           break;
//         }
//       }
//     }
    
//     if (matchedTier) {
//       return matchedTier.price;
//     }
    
//     // If no tier matched, check if quantity exceeds the highest tier's max
//     const highestTier = sortedTiers[sortedTiers.length - 1];
//     if (highestTier && highestTier.range.includes('-') && quantity > parseInt(highestTier.range.split('-')[1])) {
//       return highestTier.price;
//     }
    
//     return product.pricePerUnit;
//   };

//   const handleAddItem = () => {
//     if (!selectedColor) {
//       toast.error('Please select a color');
//       return;
//     }

//     // Check if this color is already added
//     const colorExists = inquiryItems.some(item => item.color?.code === selectedColor.code);
//     if (colorExists) {
//       toast.error(`${selectedColor.code} is already added. Please modify quantities in the existing item.`);
//       return;
//     }

//     const initialSizeQuantities = {};
//     product.sizes?.filter(s => s.trim()).forEach(size => {
//       initialSizeQuantities[size] = 0;
//     });

//     setInquiryItems(prev => [...prev, {
//       id: Date.now(),
//       color: selectedColor,
//       sizeQuantities: initialSizeQuantities,
//       quantity: 0,
//       unitPrice: product.pricePerUnit
//     }]);

//     toast.success(`${selectedColor.code} added. Enter quantities for each size.`);
//   };

//   const handleUpdateItem = (id, field, value) => {
//     setInquiryItems(prev => prev.map(item => 
//       item.id === id ? { ...item, [field]: value } : item
//     ));
//   };

//   const handleRemoveItem = (id) => {
//     setInquiryItems(prev => prev.filter(item => item.id !== id));
//     toast.success('Item removed');
//   };

//   // Handle color quantity change to update unit price based on that color's quantity
//   const handleColorQuantityChange = (id, quantity, newUnitPrice) => {
//     setInquiryItems(prev => prev.map(item => 
//       item.id === id ? { ...item, quantity: quantity, unitPrice: newUnitPrice } : item
//     ));
//   };

//   // const handleSubmitInquiry = async () => {
//   //   if (!isAuthenticated) {
//   //     setAuthModalTab('login');
//   //     setShowAuthModal(true);
//   //     toast.info('Please login to submit an inquiry');
//   //     return;
//   //   }

//   //   if (inquiryItems.length === 0) {
//   //     toast.error('Please add at least one color');
//   //     return;
//   //   }

//   //   // Check each color meets MOQ individually
//   //   const invalidColors = inquiryItems.filter(item => {
//   //     const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//   //     return colorTotal > 0 && colorTotal < product.moq;
//   //   });

//   //   if (invalidColors.length > 0) {
//   //     const colorNames = invalidColors.map(item => item.color?.code).join(', ');
//   //     toast.error(`Each color must meet the minimum MOQ of ${product.moq} pieces. Colors below MOQ: ${colorNames}`);
//   //     return;
//   //   }

//   //   // Check if any quantities are entered
//   //   const hasQuantities = inquiryItems.some(item => {
//   //     const total = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//   //     return total > 0;
//   //   });

//   //   if (!hasQuantities) {
//   //     toast.error('Please enter quantities for at least one size');
//   //     return;
//   //   }

//   //   try {
//   //     const token = localStorage.getItem('token');
      
//   //     const colorsData = inquiryItems.map(item => {
//   //       const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
        
//   //       // Get the applicable unit price for this color based on its quantity
//   //       const applicablePrice = getPriceForQuantity(colorTotal);
        
//   //       return {
//   //         color: item.color,
//   //         sizeQuantities: item.sizeQuantities,
//   //         totalQuantity: colorTotal,
//   //         unitPrice: applicablePrice
//   //       };
//   //     }).filter(item => item.totalQuantity > 0);

//   //     const cartItem = {
//   //       productId: product._id,
//   //       productName: product.productName,
//   //       colors: colorsData,
//   //       totalQuantity: colorsData.reduce((sum, c) => sum + c.totalQuantity, 0),
//   //       unitPrice: product.pricePerUnit, // Base price for reference
//   //       moq: product.moq,
//   //       productImage: product.images?.[0]?.url,
//   //       specialInstructions: specialInstructions
//   //     };

//   //     const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/add', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify(cartItem)
//   //     });

//   //     const data = await response.json();
      
//   //     if (data.success) {
//   //       toast.success(`${colorsData.length} color(s) added for ${product.productName}!`);
        
//   //       setInquiryItems([]);
//   //       setSpecialInstructions('');
        
//   //       setIsInCart(true);
//   //       checkIfInCart();
        
//   //       window.dispatchEvent(new Event('cart-update'));
//   //     } else {
//   //       toast.error(data.error || 'Failed to add to cart');
//   //     }
      
//   //   } catch (error) {
//   //     console.error('Error adding to cart:', error);
//   //     toast.error('Failed to add items to cart');
//   //   }
//   // };


//   const handleSubmitInquiry = async () => {
//   if (!isAuthenticated) {
//     setAuthModalTab('login');
//     setShowAuthModal(true);
//     toast.info('Please login to submit an inquiry');
//     return;
//   }

//   if (inquiryItems.length === 0) {
//     toast.error('Please add at least one color');
//     return;
//   }

//   // Check each color meets MOQ individually
//   const invalidColors = inquiryItems.filter(item => {
//     const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//     return colorTotal > 0 && colorTotal < product.moq;
//   });

//   if (invalidColors.length > 0) {
//     const colorNames = invalidColors.map(item => item.color?.code).join(', ');
//     toast.error(`Each color must meet the minimum MOQ of ${product.moq} pieces. Colors below MOQ: ${colorNames}`);
//     return;
//   }

//   // Check if any quantities are entered
//   const hasQuantities = inquiryItems.some(item => {
//     const total = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//     return total > 0;
//   });

//   if (!hasQuantities) {
//     toast.error('Please enter quantities for at least one size');
//     return;
//   }

//   try {
//     const token = localStorage.getItem('token');
    
//     const colorsData = inquiryItems.map(item => {
//       const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
      
//       // Get the applicable unit price for this color based on its quantity
//       const applicablePrice = getPriceForQuantity(colorTotal);
      
//       // IMPORTANT: Keep sizeQuantities as OBJECT (not array)
//       // This is correct and backend will handle it
//       return {
//         color: {
//           code: item.color.code,
//           name: item.color.name || item.color.code  // Include color name
//         },
//         sizeQuantities: item.sizeQuantities,  // This is an OBJECT like { "S": 10, "M": 40 }
//         totalQuantity: colorTotal,
//         unitPrice: applicablePrice
//       };
//     }).filter(item => item.totalQuantity > 0);

//     const cartItem = {
//       productId: product._id,
//       productName: product.productName,
//       colors: colorsData,
//       totalQuantity: colorsData.reduce((sum, c) => sum + c.totalQuantity, 0),
//       unitPrice: product.pricePerUnit,
//       moq: product.moq,
//       productImage: product.images?.[0]?.url,
//       specialInstructions: specialInstructions
//     };

//     console.log('📤 Sending to cart:', JSON.stringify(cartItem, null, 2)); // Debug log

//     const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/add', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(cartItem)
//     });

//     const data = await response.json();
    
//     if (data.success) {
//       toast.success(`${colorsData.length} color(s) added for ${product.productName}!`);
      
//       setInquiryItems([]);
//       setSpecialInstructions('');
      
//       setIsInCart(true);
//       checkIfInCart();
      
//       window.dispatchEvent(new Event('cart-update'));
//     } else {
//       toast.error(data.error || 'Failed to add to cart');
//     }
    
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     toast.error('Failed to add items to cart');
//   }
// };
//   const handleWhatsAppInquiry = () => {
//     if (!isAuthenticated) {
//       setAuthModalTab('login');
//       setShowAuthModal(true);
//       toast.info('Please login to send WhatsApp inquiry');
//       return;
//     }

//     if (inquiryItems.length === 0) {
//       toast.error('Please add items to inquiry');
//       return;
//     }

//     let message = `*Inquiry for ${product.productName}*\n\n`;
    
//     message += `*👤 BUYER INFORMATION*\n`;
//     message += `• Company: ${user?.companyName || 'N/A'}\n`;
//     message += `• Contact Person: ${user?.contactPerson || 'N/A'}\n`;
//     message += `• Email: ${user?.email || 'N/A'}\n`;
//     message += `• Phone: ${user?.phone || 'N/A'}\n`;
//     if (user?.whatsapp) message += `• WhatsApp: ${user.whatsapp}\n`;
//     message += `• Country: ${user?.country || 'N/A'}\n\n`;
    
//     message += `*📦 PRODUCT DETAILS*\n`;
//     message += `• Product: ${product.productName}\n`;
//     message += `• Category: ${product.category?.name || 'Uncategorized'}\n`;
//     message += `• Fabric: ${product.fabric || 'Standard'}\n`;
//     message += `• Target: ${capitalizeFirst(product.targetedCustomer || 'Unisex')}\n`;
//     message += `• MOQ (Per Color): ${product.moq} pieces\n\n`;
    
//     message += `*🛒 INQUIRY ITEMS (Per Color Pricing)*\n`;
    
//     inquiryItems.forEach((item, index) => {
//       const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       const colorUnitPrice = getPriceForQuantity(colorTotal);
      
//       message += `\n*Item ${index + 1} - Color: ${item.color?.code || 'N/A'}*\n`;
      
//       let hasSizes = false;
//       Object.entries(item.sizeQuantities || {}).forEach(([size, qty]) => {
//         if (qty && qty > 0) {
//           message += `  • Size ${size}: ${qty} pcs\n`;
//           hasSizes = true;
//         }
//       });
      
//       if (!hasSizes) {
//         message += `  • No sizes specified\n`;
//       }
      
//       message += `  *Color Total:* ${colorTotal} pcs\n`;
//       message += `  *Unit Price:* ${formatPrice(colorUnitPrice)}/pc\n`;
//       message += `  *Color Subtotal:* ${formatPrice(colorUnitPrice * colorTotal)}\n`;
//     });
    
//     const totalPriceCalculated = inquiryItems.reduce((sum, item) => {
//       const colorTotal = Object.values(item.sizeQuantities || {}).reduce((s, qty) => s + (qty || 0), 0);
//       const colorUnitPrice = getPriceForQuantity(colorTotal);
//       return sum + (colorUnitPrice * colorTotal);
//     }, 0);
    
//     message += `\n*📊 ORDER SUMMARY*\n`;
//     message += `• Total Quantity: ${totalQuantity} pieces\n`;
//     message += `• Estimated Total: ${formatPrice(totalPriceCalculated)}\n`;
    
//     if (specialInstructions) {
//       message += `\n*📝 SPECIAL INSTRUCTIONS*\n`;
//       message += `${specialInstructions}\n`;
//     }
    
//     message += `\n*🕐 Inquiry sent:* ${new Date().toLocaleString()}\n`;

//     const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685';
//     const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
//     const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    
//     window.open(whatsappUrl, '_blank');
    
//     toast.success('WhatsApp chat opened!', {
//       description: 'Your inquiry has been prepared and ready to send.',
//     });
//   };

//   // Check if all colors meet MOQ
//   const allColorsMeetMOQ = inquiryItems.every(item => {
//     const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//     return colorTotal === 0 || colorTotal >= product?.moq;
//   });

//   const hasAnyQuantity = inquiryItems.some(item => {
//     const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//     return colorTotal > 0;
//   });

//   const canSubmit = hasAnyQuantity && allColorsMeetMOQ;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="container mx-auto px-4 max-w-7xl py-8 mt-16">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//               <div className="lg:col-span-5">
//                 <div className="bg-gray-200 rounded-xl h-[500px]"></div>
//               </div>
//               <div className="lg:col-span-7 space-y-4">
//                 <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 <div className="h-20 bg-gray-200 rounded"></div>
//                 <div className="h-40 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//         <Navbar />
//         <div className="text-center">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Product Not Found</h2>
//           <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">The product you're looking for doesn't exist or has been removed.</p>
//           <Link 
//             href="/products" 
//             className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-sm sm:text-base"
//           >
//             <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
//             Back to Products
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <>
//       <MetadataUpdater product={product} />
      
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 mt-16 sm:mt-20">
//         {/* Breadcrumb */}
//        {/* Breadcrumb */}
// <div className="bg-white border-b border-gray-200">
//   <div className="container mx-auto px-4 max-w-7xl py-3 sm:py-4">
//     <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
//       <button
//         onClick={() => router.back()}
//         className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
//         aria-label="Go back"
//       >
//         <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//       </button>
      
//       <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap pb-0.5 flex-1">
//         <Link href="/" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Home</Link>
//         <span className="flex-shrink-0">/</span>
//         <Link href="/products" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Products</Link>
//         <span className="flex-shrink-0">/</span>
//         <Link 
//           href={`/products?category=${product.category?._id}`} 
//           className="hover:text-[#E39A65] transition-colors flex-shrink-0"
//         >
//           {product.category?.name || 'Category'}
//         </Link>
//         {/* NEW: Add subcategory to breadcrumb */}
//         {product.subcategoryName && (
//           <>
//             <span className="flex-shrink-0">/</span>
//             <Link 
//               href={`/products?category=${product.category?._id}&subcategory=${product.subcategoryName}`} 
//               className="hover:text-[#E39A65] transition-colors flex-shrink-0"
//             >
//               {product.subcategoryName}
//             </Link>
//           </>
//         )}
//         <span className="flex-shrink-0">/</span>
//         <span className="text-gray-900 font-medium truncate">{product.productName}</span>
//       </div>
//     </div>
//   </div>
// </div>

//         <div className="container mx-auto px-4 max-w-7xl py-4 sm:py-6 lg:py-8">
//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
//             {/* Left Column - Image Gallery */}
//             <div className="lg:col-span-5">
//               <div className="lg:sticky lg:top-24">
//                 <ImageGallery images={product.images} productName={product.productName} />
//               </div>
//             </div>

//             {/* Right Column - Product Info & Inquiry Form */}
//             <div className="lg:col-span-7 space-y-4 sm:space-y-6">
//               {/* Product Info Card */}
//               {/* <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
//                 <div className="mb-3 sm:mb-4">
//                   <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 pb-3 border-b border-gray-100">
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center justify-center w-7 h-7 bg-[#E39A65]/10 rounded-lg">
//                         <Package className="w-3.5 h-3.5 text-[#E39A65]" />
//                       </div>
//                       <div>
//                         <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">Category</span>
//                         <span className="text-xs font-semibold text-gray-900">
//                           {product.category?.name || 'Uncategorized'}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>

//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center justify-center w-7 h-7 bg-[#E39A65]/10 rounded-lg">
//                         <Users className="w-3.5 h-3.5 text-[#E39A65]" />
//                       </div>
//                       <div>
//                         <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">Target</span>
//                         <span className="text-xs font-semibold text-gray-900">
//                           {product.targetedCustomer && product.targetedCustomer !== 'unisex' 
//                             ? capitalizeFirst(product.targetedCustomer) 
//                             : 'Unisex (All)'}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 ml-auto">
//                       <div className="flex items-center justify-center w-7 h-7 bg-green-50 rounded-lg">
//                         <Package className="w-3.5 h-3.5 text-green-600" />
//                       </div>
//                       <div>
//                         <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">MOQ (Per Color)</span>
//                         <span className="text-xs font-semibold text-gray-900">{product.moq} pcs</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{product.productName}</h1>
                  
//                   {product.description && (
//                     <div 
//                       className="text-xs sm:text-sm text-gray-600 line-clamp-2 prose prose-sm max-w-none rich-text-preview"
//                       dangerouslySetInnerHTML={{ 
//                         __html: product.description.length > 200 
//                           ? product.description.substring(0, 200) + '...' 
//                           : product.description
//                       }}
//                     />
//                   )}
//                 </div>
                
//                 <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
//                   <div className="lg:w-1/2">
//                     <div className="flex items-baseline justify-between p-3 sm:p-4 bg-orange-50 rounded-lg mb-4">
//                       <div>
//                         <span className="text-xs sm:text-sm text-gray-600">Starting from</span>
//                         <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E39A65]">
//                           {formatPrice(product.pricePerUnit)}
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <span className="text-xs sm:text-sm text-gray-600">MOQ (Per Color)</span>
//                         <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{product.moq} pieces</div>
//                       </div>
//                     </div>

//                     {product.fabric && (
//                       <div className="mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <span className="text-xs sm:text-sm font-medium text-gray-700">Fabric: </span>
//                         <span className="text-xs sm:text-sm text-gray-600">{product.fabric}</span>
//                       </div>
//                     )}

//                     {product.colors && product.colors.length > 0 && (
//                       <div className="mb-4">
//                         <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Available Colors</h3>
//                         <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                           {product.colors.map((color, index) => (
//                             <div
//                               key={index}
//                               className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white shadow-md"
//                               style={{ backgroundColor: color.code }}
//                               title={color.code}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {product.sizes?.filter(s => s.trim()).length > 0 && (
//                       <div className="mb-4">
//                         <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Available Sizes</h3>
//                         <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                           {product.sizes.filter(s => s.trim()).map((size, index) => (
//                             <span
//                               key={index}
//                               className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 rounded-lg"
//                             >
//                               {size}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="lg:w-1/2 mt-4 lg:mt-0">
//                     <BulkPricingTable 
//                       pricing={product.quantityBasedPricing} 
//                       unitPrice={product.pricePerUnit}
//                       moq={product.moq}
//                     />
//                   </div>
//                 </div>
//               </div> */}

//               {/* Product Info Card */}
// <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
//   <div className="mb-3 sm:mb-4">
//     <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 pb-3 border-b border-gray-100">
//       {/* Category Display */}
//       <div className="flex items-center gap-2">
//         <div className="flex items-center justify-center w-7 h-7 bg-[#E39A65]/10 rounded-lg">
//           <Package className="w-3.5 h-3.5 text-[#E39A65]" />
//         </div>
//         <div>
//           <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">Category</span>
//           <span className="text-xs font-semibold text-gray-900">
//             {product.category?.name || 'Uncategorized'}
//           </span>
//         </div>
//       </div>

//       {/* Subcategory Display */}
//       {product.subcategoryName && (
//         <>
//           <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
//           <div className="flex items-center gap-2">
//             <div className="flex items-center justify-center w-7 h-7 bg-[#E39A65]/10 rounded-lg">
//               <FolderTree className="w-3.5 h-3.5 text-[#E39A65]" />
//             </div>
//             <div>
//               <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">Subcategory</span>
//               <span className="text-xs font-semibold text-gray-900">
//                 {product.subcategoryName}
//               </span>
//             </div>
//           </div>
//         </>
//       )}

//       <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>

//       <div className="flex items-center gap-2">
//         <div className="flex items-center justify-center w-7 h-7 bg-[#E39A65]/10 rounded-lg">
//           <Users className="w-3.5 h-3.5 text-[#E39A65]" />
//         </div>
//         <div>
//           <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">Target</span>
//           <span className="text-xs font-semibold text-gray-900">
//             {product.targetedCustomer && product.targetedCustomer !== 'unisex' 
//               ? capitalizeFirst(product.targetedCustomer) 
//               : 'Unisex (All)'}
//           </span>
//         </div>
//       </div>

//       <div className="flex items-center gap-2 ml-auto">
//         <div className="flex items-center justify-center w-7 h-7 bg-green-50 rounded-lg">
//           <Package className="w-3.5 h-3.5 text-green-600" />
//         </div>
//         <div>
//           <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">MOQ (Per Color)</span>
//           <span className="text-xs font-semibold text-gray-900">{product.moq} pcs</span>
//         </div>
//       </div>
//     </div>
    
//     <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{product.productName}</h1>
    
//     {product.description && (
//       <div 
//         className="text-xs sm:text-sm text-gray-600 line-clamp-2 prose prose-sm max-w-none rich-text-preview"
//         dangerouslySetInnerHTML={{ 
//           __html: product.description.length > 200 
//             ? product.description.substring(0, 200) + '...' 
//             : product.description
//         }}
//       />
//     )}
//   </div>
  
//   <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
//     <div className="lg:w-1/2">
//       <div className="flex items-baseline justify-between p-3 sm:p-4 bg-orange-50 rounded-lg mb-4">
//         <div>
//           <span className="text-xs sm:text-sm text-gray-600">Starting from</span>
//           <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E39A65]">
//             {formatPrice(product.pricePerUnit)}
//           </div>
//         </div>
//         <div className="text-right">
//           <span className="text-xs sm:text-sm text-gray-600">MOQ (Per Color)</span>
//           <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{product.moq} pieces</div>
//         </div>
//       </div>

//       {product.fabric && (
//         <div className="mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
//           <span className="text-xs sm:text-sm font-medium text-gray-700">Fabric: </span>
//           <span className="text-xs sm:text-sm text-gray-600">{product.fabric}</span>
//         </div>
//       )}

//       {product.colors && product.colors.length > 0 && (
//         <div className="mb-4">
//           <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Available Colors</h3>
//           <div className="flex flex-wrap gap-1.5 sm:gap-2">
//             {product.colors.map((color, index) => (
//               <div
//                 key={index}
//                 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white shadow-md"
//                 style={{ backgroundColor: color.code }}
//                 title={color.code}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {product.sizes?.filter(s => s.trim()).length > 0 && (
//         <div className="mb-4">
//           <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Available Sizes</h3>
//           <div className="flex flex-wrap gap-1.5 sm:gap-2">
//             {product.sizes.filter(s => s.trim()).map((size, index) => (
//               <span
//                 key={index}
//                 className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 rounded-lg"
//               >
//                 {size}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//     <div className="lg:w-1/2 mt-4 lg:mt-0">
//       <BulkPricingTable 
//         pricing={product.quantityBasedPricing} 
//         unitPrice={product.pricePerUnit}
//         moq={product.moq}
//       />
//     </div>
//   </div>
// </div>

//               {/* Inquiry Form Card */}
//               <div id="inquiry-form" className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
//                   <h2 className="text-base sm:text-lg font-semibold text-gray-900">Create Your Inquiry</h2>
//                   {totalQuantity > 0 && (
//                     <span className="text-xs sm:text-sm text-gray-500">{totalQuantity} total pcs</span>
//                   )}
//                 </div>
                
//                 {product.colors && product.colors.length > 0 && (
//                   <div className="mb-3 sm:mb-4">
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                       Select Color to Add
//                     </label>
//                     <ColorSelector 
//                       colors={product.colors}
//                       selectedColor={selectedColor}
//                       onChange={setSelectedColor}
//                     />
//                   </div>
//                 )}

//                 <button
//                   onClick={handleAddItem}
//                   disabled={!selectedColor || isInCart}
//                   className="w-full flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#E39A65] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3 sm:mb-4"
//                 >
//                   <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//                   Add Selected Color
//                 </button>

//                 {isInCart && (
//                   <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
//                     <div className="flex items-start gap-2">
//                       <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
//                       <div>
//                         <p className="text-xs sm:text-sm font-medium text-green-800">
//                           ✓ This product is already in your inquiry cart
//                         </p>
//                         <p className="text-[10px] sm:text-xs text-green-600 mt-1">
//                           You can view or modify it in your cart
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {product.sizes?.filter(s => s.trim()).length > 0 && !isInCart && (
//                   <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
//                     <p className="text-[10px] sm:text-xs text-blue-700">
//                       <span className="font-medium">Available Sizes:</span> {product.sizes.filter(s => s.trim()).join(', ')}
//                     </p>
//                     <p className="text-[10px] sm:text-xs text-blue-600 mt-1">
//                       Enter quantities for each size under each color item
//                     </p>
//                   </div>
//                 )}

//                 {!isInCart && inquiryItems.length > 0 && (
//                   <>
//                     <h3 className="text-sm sm:text-md font-semibold text-gray-900 mb-2 sm:mb-3">Your Items (Each color must meet MOQ of {product.moq} pcs)</h3>
//                     <div className="space-y-2 sm:space-y-3 max-h-[350px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2 mb-3 sm:mb-4">
//                       {inquiryItems.map((item, index) => (
//                         <InquiryItem
//                           key={item.id}
//                           item={item}
//                           index={index}
//                           product={product}
//                           onUpdate={handleUpdateItem}
//                           onRemove={handleRemoveItem}
//                           showRemove={true}
//                           onColorQuantityChange={handleColorQuantityChange}
//                         />
//                       ))}
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Total Qty (All Colors)</p>
//                         <p className="text-base sm:text-lg font-bold text-gray-900">{totalQuantity} pcs</p>
//                       </div>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Estimated Total</p>
//                         <p className="text-base sm:text-lg font-bold text-[#E39A65]">{formatPrice(totalPrice)}</p>
//                       </div>
//                     </div>

//                     {!allColorsMeetMOQ && hasAnyQuantity && (
//                       <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                         <p className="text-xs sm:text-sm text-yellow-800">
//                           ⚠️ Each color must meet the minimum MOQ of {product.moq} pieces. Please adjust quantities for colors below the MOQ.
//                         </p>
//                       </div>
//                     )}

//                     <div className="mb-3 sm:mb-4">
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                         Special Instructions
//                       </label>
//                       <textarea
//                         value={specialInstructions}
//                         onChange={(e) => setSpecialInstructions(e.target.value)}
//                         rows="2"
//                         className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none resize-none"
//                         placeholder="Add any special requirements..."
//                       />
//                     </div>
//                   </>
//                 )}

//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
//                   {isInCart ? (
//                     <>
//                       <Link 
//                         href="/inquiry-cart" 
//                         className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-green-700 transition-colors"
//                       >
//                         <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                         View in Cart
//                       </Link>
//                       <button
//                         onClick={handleWhatsAppInquiry}
//                         disabled={inquiryItems.length === 0}
//                         className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#E39A65] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
//                         Chat on WhatsApp
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={handleSubmitInquiry}
//                         disabled={!canSubmit}
//                         className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#E39A65] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                         Add to Cart
//                       </button>
//                       <button
//                         onClick={handleWhatsAppInquiry}
//                         disabled={inquiryItems.length === 0}
//                         className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
//                         Chat on WhatsApp
//                       </button>
//                     </>
//                   )}
//                 </div>

//                 {!isInCart && inquiryItems.length === 0 && (
//                   <div className="text-center py-3 sm:py-4 mt-2">
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Select a color and click "Add Selected Color" to start building your inquiry
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Product Details Tabs */}
//           <div className="mt-6 sm:mt-8">
//             <div className="border-b border-gray-200 overflow-x-auto">
//               <nav className="flex gap-4 sm:gap-6 lg:gap-8 min-w-max px-1">
//                 {['attributes', 'description', 'instructions', 'pricing', 'shipping', 'reviews'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`pb-3 sm:pb-4 px-1 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
//                       activeTab === tab
//                         ? 'border-[#E39A65] text-[#E39A65]'
//                         : 'border-transparent text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     {tab === 'attributes' && 'Key Attributes'}
//                     {tab === 'description' && 'Description'}
//                     {tab === 'instructions' && 'Care Instructions'}
//                     {tab === 'pricing' && 'Bulk Pricing'}
//                     {tab === 'shipping' && 'Shipping Info'}
//                     {tab === 'reviews' && 'Reviews'}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             <div className="mt-4 sm:mt-6">
//               {activeTab === 'attributes' && <KeyAttributes product={product} />}
//               {activeTab === 'description' && <Description product={product} />}
//               {activeTab === 'instructions' && <Instructions product={product} />}
//               {activeTab === 'pricing' && (
//                 <BulkPricingTable 
//                   pricing={product.quantityBasedPricing} 
//                   unitPrice={product.pricePerUnit}
//                   moq={product.moq}
//                 />
//               )}
//               {activeTab === 'shipping' && <ShippingInfo />}
//               {activeTab === 'reviews' && (
//                 <ProductReviews productId={product._id} />
//               )}
//             </div>
//           </div>

//           {/* Related Products Section */}
//           {relatedProducts.length > 0 && (
//             <div className="mt-8 sm:mt-10 lg:mt-12">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//                 <div>
//                   <div className="inline-flex items-center gap-2 bg-[#E39A65]/10 px-3 py-1 rounded-full mb-3">
//                     <Sparkles className="w-4 h-4 text-[#E39A65]" />
//                     <span className="text-xs font-medium text-[#E39A65]">You might also like</span>
//                   </div>
//                   <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
//                     Related Products
//                   </h2>
//                 </div>
                
//                 <Link 
//                   href="/products" 
//                   className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E39A65] transition-colors group bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100"
//                 >
//                   <span>Browse all products</span>
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </div>

//               <div className="relative px-4 sm:px-8 md:px-10">
//                 {/* Previous Button */}
//                 {relatedProducts.length > getItemsPerView() && (
//                   <button
//                     onClick={handlePrev}
//                     onMouseEnter={() => setIsHovered(true)}
//                     onMouseLeave={() => setIsHovered(false)}
//                     className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-[#E39A65] hover:text-white hover:border-[#E39A65] transition-all duration-300 flex items-center justify-center opacity-60 hover:opacity-100"
//                     style={{ transform: 'translateY(-50%)' }}
//                     aria-label="Previous products"
//                   >
//                     <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
//                   </button>
//                 )}

//                 {/* Next Button */}
//                 {relatedProducts.length > getItemsPerView() && (
//                   <button
//                     onClick={handleNext}
//                     onMouseEnter={() => setIsHovered(true)}
//                     onMouseLeave={() => setIsHovered(false)}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-[#E39A65] hover:text-white hover:border-[#E39A65] transition-all duration-300 flex items-center justify-center opacity-60 hover:opacity-100"
//                     style={{ transform: 'translateY(-50%)' }}
//                     aria-label="Next products"
//                   >
//                     <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
//                   </button>
//                 )}

//                 <div className="overflow-hidden">
//                   <motion.div 
//                     key={currentIndex}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.5 }}
//                     className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
//                   >
//                     {visibleProducts.map((product) => (
//                       <RelatedProductCard key={product._id} product={product} />
//                     ))}
//                   </motion.div>
//                 </div>

//                 {/* Pagination Dots */}
//                 {relatedProducts.length > getItemsPerView() && (
//                   <div className="flex items-center justify-center gap-2 mt-6">
//                     {Array.from({ length: Math.ceil(relatedProducts.length / getItemsPerView()) }).map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           setCurrentIndex(index * getItemsPerView());
//                           setIsHovered(true);
//                           setTimeout(() => setIsHovered(false), 3000);
//                         }}
//                         className={`h-2 rounded-full transition-all duration-300 ${
//                           Math.floor(currentIndex / getItemsPerView()) === index
//                             ? 'w-8 bg-[#E39A65]'
//                             : 'w-2 bg-gray-300 hover:bg-gray-400'
//                         }`}
//                         aria-label={`Go to slide ${index + 1}`}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* WhatsApp Floating Button */}
//         <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
//           <button
//             onClick={handleWhatsAppInquiry}
//             disabled={inquiryItems.length === 0}
//             className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//           </button>
//         </div>

//         {/* Auth Modal */}
//         <AuthModal
//           isOpen={showAuthModal}
//           onClose={() => setShowAuthModal(false)}
//           initialTab={authModalTab}
//           onAuthSuccess={handleAuthSuccess}
//         />
//       </div>
//       <Footer />
//       <WhatsAppButton />

//       {/* Global styles for rich text content */}
//       <style jsx global>{`
//         .rich-text-content {
//           color: #374151;
//           line-height: 1.6;
//         }
        
//         .rich-text-content h1 {
//           font-size: 2em;
//           margin: 0.5em 0;
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .rich-text-content h2 {
//           font-size: 1.5em;
//           margin: 0.5em 0;
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .rich-text-content h3 {
//           font-size: 1.17em;
//           margin: 0.5em 0;
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .rich-text-content h4 {
//           font-size: 1em;
//           margin: 0.5em 0;
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .rich-text-content p {
//           margin: 0.75em 0;
//         }
        
//         .rich-text-content ul {
//           list-style-type: disc;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .rich-text-content ol {
//           list-style-type: decimal;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .rich-text-content li {
//           margin: 0.25em 0;
//         }
        
//         .rich-text-content a {
//           color: #2563eb;
//           text-decoration: none;
//           font-weight: 500;
//         }
        
//         .rich-text-content a:hover {
//           text-decoration: underline;
//           color: #1d4ed8;
//         }
        
//         .rich-text-content strong {
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .rich-text-content em {
//           font-style: italic;
//         }
        
//         .rich-text-content blockquote {
//           border-left: 4px solid #e5e7eb;
//           padding-left: 1em;
//           margin: 1em 0;
//           color: #6b7280;
//         }
        
//         .rich-text-content code {
//           background-color: #f3f4f6;
//           padding: 0.2em 0.4em;
//           border-radius: 0.25em;
//           font-family: monospace;
//           font-size: 0.875em;
//         }
        
//         .rich-text-content pre {
//           background-color: #f3f4f6;
//           padding: 1em;
//           border-radius: 0.5em;
//           overflow-x: auto;
//           font-family: monospace;
//           font-size: 0.875em;
//         }
        
//         .rich-text-preview {
//           color: #6b7280;
//           line-height: 1.5;
//         }
        
//         .rich-text-preview p {
//           margin: 0.5em 0;
//         }
        
//         .rich-text-preview a {
//           color: #2563eb;
//         }
//       `}</style>
//     </>
//   );
// }
















// app/productDetails/ProductDetailsClient.js
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ShoppingCart, 
  MessageCircle, 
  Check, 
  Loader2,
  Package,
  Users,
  FileText,
  Truck,
  Clock,
  Maximize2,
  X,
  Trash2,
  ChevronRight,
  Eye,
  DollarSign,
  TrendingUp,
  Sparkles,
  BookOpen,
  Plus,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  FolderTree
} from 'lucide-react';
import { toast } from 'sonner';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import AuthModal from '../components/AuthModal';
import { motion } from 'framer-motion';
import ProductReviews from '../components/product/ProductReviews';
import MetadataUpdater from './MetadataUpdater';
import FullscreenModal from '../components/FullscreenModal';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import CompleteProfileModal from '../components/CompleteProfileModal';

// Helper function to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to capitalize first letter
const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Helper function to truncate text
const truncateText = (text, limit = 30) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

// Helper function to format price without currency symbol for display
const formatPriceNumber = (price) => {
  return price?.toFixed(2) || '0.00';
};

// Rich Text Content Renderer Component
const RichTextContent = ({ content, className = '' }) => {
  if (!content) return <p className="text-gray-500 italic">No content available.</p>;

  return (
    <div 
      className={`prose prose-sm sm:prose lg:prose-lg max-w-none rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

// Image Gallery Component - Without Zoom Effect
const ImageGallery = ({ images = [], productName }) => {
  const [mainImage, setMainImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  useEffect(() => {
    if (images.length > 0) {
      const nextIndex = (mainImage + 1) % images.length;
      const prevIndex = (mainImage - 1 + images.length) % images.length;
      
      if (images[nextIndex]?.url) preloadImage(images[nextIndex].url);
      if (images[prevIndex]?.url) preloadImage(images[prevIndex].url);
    }
  }, [mainImage, images]);

  const handleImageChange = (idx) => {
    if (idx === mainImage) return;
    
    setIsTransitioning(true);
    setMainImage(idx);
    setImageLoaded(prev => ({ ...prev, [idx]: false }));
  };

  const handleImageLoad = (idx) => {
    setImageLoaded(prev => ({ ...prev, [idx]: true }));
    setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
  };

  const getThumbnailSize = () => {
    const count = images.length;
    if (count <= 4) return 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20';
    if (count <= 6) return 'w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16';
    return 'w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14';
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Thumbnails */}
        <div className="flex sm:flex-row lg:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
          <div className="flex sm:flex-row lg:flex-col gap-2">
            {images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => handleImageChange(idx)}
                onMouseEnter={() => {
                  preloadImage(image.url);
                  handleImageChange(idx);
                }}
                className={`relative flex-shrink-0 ${getThumbnailSize()} rounded-lg overflow-hidden border-2 transition-all ${
                  mainImage === idx 
                    ? 'border-[#E39A65] shadow-md ring-2 ring-[#E39A65]/20' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <img
                  src={image.url}
                  alt={`${productName} - Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                  }}
                />
                {mainImage === idx && (
                  <div className="absolute inset-0 bg-[#E39A65]/10 flex items-center justify-center">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#E39A65]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Image - No zoom effect */}
        <div 
          className="flex-1 relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden group cursor-default order-1 sm:order-2 flex items-center justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-[460px]"
        >
          {(isTransitioning || !imageLoaded[mainImage]) && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
            </div>
          )}
          
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              key={mainImage}
              src={images[mainImage]?.url || images[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image'}
              alt={`${productName} - Main view`}
              className={`w-full h-auto max-h-[320px] sm:max-h-[380px] lg:max-h-[460px] object-contain transition-all duration-300 ${
                imageLoaded[mainImage] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                objectPosition: 'center',
              }}
              onLoad={() => handleImageLoad(mainImage)}
              loading={mainImage === 0 ? "eager" : "lazy"}
              fetchPriority={mainImage === 0 ? "high" : "auto"}
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
                handleImageLoad(mainImage);
              }}
            />
          </div>
          
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300 z-30"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>

          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-30">
            {mainImage + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal using Portal */}
      <FullscreenModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        images={images}
        currentIndex={mainImage}
        onImageChange={handleImageChange}
        productName={productName}
      />
    </>
  );
};

// Color Selector Component
const ColorSelector = ({ colors, selectedColor, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color, index) => (
        <button
          key={index}
          onClick={() => onChange(color)}
          className={`relative p-0.5 rounded-full transition-all ${
            selectedColor?.code === color.code
              ? 'ring-2 ring-[#E39A65] ring-offset-2'
              : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
          }`}
          title={color.code}
        >
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: color.code }}
          />
          {selectedColor?.code === color.code && (
            <CheckCircle className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-[#E39A65] bg-white rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

// Bulk Pricing Table Component
const BulkPricingTable = ({ pricing = [], unitPrice, moq }) => {
  const [showAllTiers, setShowAllTiers] = useState(false);
  
  const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];
  
  const displayedTiers = showAllTiers ? pricingData : pricingData.slice(0, 3);
  const hasMoreTiers = pricingData.length > 3;

  const calculateSavings = (prevPrice, currentPrice) => {
    if (!prevPrice || !currentPrice) return null;
    const savingsPercent = ((prevPrice - currentPrice) / prevPrice * 100).toFixed(1);
    return savingsPercent;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg sm:rounded-xl border border-[#E39A65]/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#E39A65] to-[#d48b54]"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ opacity: 0.15 }}
        />
        
        <div className="relative px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-[#E39A65] to-[#d48b54]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-white to-amber-100 rounded-full"></div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  Bulk Pricing (Per Color)
                </h3>
                <p className="text-xs text-white/80 mt-0.5">Volume discounts apply per color · Each color must meet minimum quantity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-[#E39A65]/5">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#E39A65]/20">
                <th className="text-left py-3 px-2 sm:px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#E39A65]" />
                    <span>Quantity Per Color</span>
                  </div>
                </th>
                <th className="text-left py-3 px-2 sm:px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#E39A65]" />
                    <span>Price/Unit</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E39A65]/10">
              {displayedTiers.map((tier, index) => {
                const tierPrice = tier.price || unitPrice;
                const prevPrice = index > 0 ? pricingData[index - 1].price : null;
                const savings = prevPrice ? calculateSavings(prevPrice, tierPrice) : null;
                const isBestValue = index === pricingData.length - 1 && pricingData.length > 1;

                return (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      backgroundColor: '#fef2e6',
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                    className={`transition-all duration-200 cursor-default rounded-lg ${
                      isBestValue ? 'bg-[#E39A65]/5' : ''
                    }`}
                  >
                    <td className="py-3 px-2 sm:px-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">
                          {tier.range || `${moq}+`} pcs
                        </span>
                        {isBestValue && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-2 py-0.5 bg-[#E39A65]/20 text-[#E39A65] text-[10px] font-medium rounded-full whitespace-nowrap"
                          >
                            Best Value
                          </motion.span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:px-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#E39A65] text-base">
                          {formatPrice(tierPrice)}
                        </span>
                        {savings && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full whitespace-nowrap"
                          >
                            Save {savings}%
                          </motion.span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {hasMoreTiers && (
          <div className="mt-4 pt-3 text-center">
            <button
              onClick={() => setShowAllTiers(!showAllTiers)}
              className="inline-flex items-center gap-2 text-sm text-[#E39A65] hover:text-[#d48b54] font-medium transition-colors duration-200"
            >
              {showAllTiers ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show More ({pricingData.length - 3} more)
                </>
              )}
            </button>
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-[#E39A65]/20 relative">
          <div className="absolute -top-[2px] left-0 w-20 h-[2px] bg-gradient-to-r from-[#E39A65] to-transparent"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
          >
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle className="w-4 h-4 text-[#E39A65]" />
              <span className="whitespace-nowrap">Best price</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="w-4 h-4 text-[#E39A65]" />
              <span className="whitespace-nowrap">Inst. Quote</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 col-span-2 sm:col-span-1">
              <TrendingUp className="w-4 h-4 text-[#E39A65]" />
              <span className="whitespace-nowrap"> Discounts</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Key Attributes Component
const KeyAttributes = ({ product }) => {
  // Build additional info attributes
  const additionalInfoAttributes = (product.additionalInfo || []).map(info => ({
    label: info.fieldName,
    value: info.fieldValue
  }));

  // Build subcategory attribute if exists
  const subcategoryAttribute = product.subcategoryName ? [{ label: 'Subcategory', value: product.subcategoryName }] : [];
  const childSubcategoryAttribute = product.childSubcategoryName ? [{ label: 'Child Subcategory', value: product.childSubcategoryName }] : [];
  const attributes = [
    { label: 'MOQ (Per Color)', value: `${product.moq} pieces` },
    { label: 'Fabric', value: product.fabric || 'Standard' },
    { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
    { label: 'Available Sizes', value: product.sizes?.filter(s => s.trim()).slice(0, 5).join(', ') + (product.sizes?.length > 5 ? ` +${product.sizes.length - 5} more` : '') || 'Standard' },
    { label: 'Category', value: product.category?.name || 'Uncategorized' },
    ...subcategoryAttribute,
      ...childSubcategoryAttribute,
    ...additionalInfoAttributes
  ];

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Key Attributes</h3>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {attributes.map((attr, index) => (
            <div key={index} className="border-b border-gray-100 pb-2 sm:pb-3 last:border-0">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">{attr.label}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{attr.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Description Component
const Description = ({ product }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#E39A65]" />
          Product Description
        </h3>
      </div>
      <div className="p-4 sm:p-6">
        <RichTextContent content={product.description} />
      </div>
    </div>
  );
};

// Instructions Component
const Instructions = ({ product }) => {
  if (!product.instruction) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#E39A65]" />
            Care Instructions
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <p className="text-gray-500 italic">No care instructions available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#E39A65]" />
          Care Instructions
        </h3>
      </div>
      <div className="p-4 sm:p-6">
        <RichTextContent content={product.instruction} />
      </div>
    </div>
  );
};

// Shipping Info Component
const ShippingInfo = () => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Shipping Information</h3>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#E39A65] flex-shrink-0" />
            <div>
              <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Global Shipping Available</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                We ship worldwide with reliable carriers. Shipping costs calculated based on destination and order volume.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#E39A65] flex-shrink-0" />
            <div>
              <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Estimated Delivery Time</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Domestic: 3-5 business days<br />
                International: 7-15 business days
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#E39A65] flex-shrink-0" />
            <div>
              <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Bulk Order Shipping</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Special shipping rates available for bulk orders. Contact us for a customized quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inquiry Item Component
const InquiryItem = ({ item, index, product, onUpdate, onRemove, showRemove, onColorQuantityChange }) => {
  const [sizeQuantities, setSizeQuantities] = useState(item.sizeQuantities || {});
  const [colorTotal, setColorTotal] = useState(item.quantity || 0);
  const [colorUnitPrice, setColorUnitPrice] = useState(item.unitPrice || product.pricePerUnit);

  useEffect(() => {
    if (item.sizeQuantities) {
      setSizeQuantities(item.sizeQuantities);
    }
    if (item.quantity !== undefined) {
      setColorTotal(item.quantity);
    }
    if (item.unitPrice) {
      setColorUnitPrice(item.unitPrice);
    }
  }, [item.sizeQuantities, item.quantity, item.unitPrice]);

  const getPriceForQuantity = (quantity) => {
    if (!product.quantityBasedPricing || product.quantityBasedPricing.length === 0) {
      return product.pricePerUnit;
    }
    
    const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
      const aMin = parseInt(a.range.split('-')[0]);
      const bMin = parseInt(b.range.split('-')[0]);
      return aMin - bMin;
    });
    
    let matchedTier = null;
    
    for (const tier of sortedTiers) {
      const range = tier.range;
      
      if (range.includes('-')) {
        const [min, max] = range.split('-').map(Number);
        if (quantity >= min && quantity <= max) {
          matchedTier = tier;
          break;
        }
      }
      else if (range.includes('+')) {
        const minQty = parseInt(range.replace('+', ''));
        if (quantity >= minQty) {
          matchedTier = tier;
          break;
        }
      }
    }
    
    if (matchedTier) {
      return matchedTier.price;
    }
    
    const highestTier = sortedTiers[sortedTiers.length - 1];
    if (highestTier && highestTier.range.includes('-') && quantity > parseInt(highestTier.range.split('-')[1])) {
      return highestTier.price;
    }
    
    return product.pricePerUnit;
  };

  const handleSizeQuantityChange = (size, quantity) => {
    const newQuantities = { ...sizeQuantities, [size]: quantity };
    setSizeQuantities(newQuantities);
    
    const totalQty = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
    setColorTotal(totalQty);
    
    const applicablePrice = getPriceForQuantity(totalQty);
    setColorUnitPrice(applicablePrice);
    
    onUpdate(item.id, 'sizeQuantities', newQuantities);
    onUpdate(item.id, 'quantity', totalQty);
    onUpdate(item.id, 'unitPrice', applicablePrice);
    
    if (onColorQuantityChange) {
      onColorQuantityChange(item.id, totalQty, applicablePrice);
    }
  };

  const allSizes = product.sizes?.filter(s => s.trim()) || [];
  const meetsMOQ = colorTotal >= product.moq;
  const colorPrice = colorUnitPrice;

  return (
    <div className={`bg-gray-50 rounded-lg p-3 sm:p-4 border transition-all ${meetsMOQ ? 'border-green-200' : 'border-yellow-200'}`}>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: item.color?.code || '#CCCCCC' }}
          />
          <h4 className="text-xs sm:text-sm font-medium text-gray-900">
            {item.color?.code || 'Selected Color'} - Item {index + 1}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {!meetsMOQ && colorTotal > 0 && (
            <span className="text-[10px] text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
              Need {product.moq - colorTotal} more
            </span>
          )}
          {showRemove && (
            <button
              onClick={() => onRemove(item.id)}
              className="p-1 hover:bg-red-100 rounded-lg transition-colors group"
              title="Remove item"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 group-hover:text-red-600" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {allSizes.map((size, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="block text-[10px] sm:text-xs text-gray-500 mb-1">{size}</label>
            <input
              type="number"
              min="0"
              value={sizeQuantities[size] || ''}
              onChange={(e) => handleSizeQuantityChange(size, parseInt(e.target.value) || 0)}
              onWheel={(e) => e.target.blur()}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
              placeholder="Qty"
            />
          </div>
        ))}
      </div>

      <div className="mt-2 sm:mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm text-gray-600">Color Total:</span>
          <span className="text-xs sm:text-sm font-semibold text-[#E39A65]">{colorTotal} pcs</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs sm:text-sm text-gray-600">Unit Price:</span>
          <span className="text-xs sm:text-sm font-semibold text-[#E39A65]">{formatPrice(colorPrice)}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs sm:text-sm text-gray-600">Color Total Price:</span>
          <span className="text-xs sm:text-sm font-bold text-[#E39A65]">{formatPrice(colorPrice * colorTotal)}</span>
        </div>
      </div>
    </div>
  );
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

// Helper for targeted audience badge styling
const getTargetedAudienceStyle = (audience) => {
  const styles = {
    'ladies': 'bg-gradient-to-r from-pink-400 to-rose-400 text-white',
    'gents': 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white',
    'kids': 'bg-gradient-to-r from-green-400 to-emerald-400 text-white',
    'unisex': 'bg-gradient-to-r from-purple-400 to-violet-400 text-white',
  };
  return styles[audience] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
};

// RelatedProductCard Component
const RelatedProductCard = ({ product }) => {
  const productImages = product.images || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = productImages.length > 1;
  const firstTier = product.quantityBasedPricing?.[0];
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
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-[#E39A65]/20 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          whileHover={{ opacity: 1 }}
        />
        
        <motion.img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
          alt={product.productName || 'Product image'}
          className="w-full h-full object-contain bg-gray-50 p-2"
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

        {/* Mobile Icons */}
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
        
        {/* ONLY TAG BADGE */}
        {primaryTag && (
          <motion.span 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`absolute top-2 right-2 ${getTagStyles(primaryTag)} text-white text-[8px] md:text-[10px] px-1.5 py-0.5 rounded-full font-medium shadow-lg z-20 flex items-center gap-0.5 max-w-[90px]`}
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
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-1 mb-2">
          <h3 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 flex-1" title={product.productName}>
            {truncateText(product.productName, 20)}
          </h3>
          <div className="flex-shrink-0 text-right">
            <span className="text-xs md:text-base font-bold text-[#E39A65]">
              ${formatPriceNumber(product.pricePerUnit)}
            </span>
            <span className="text-gray-500 text-[8px] md:text-[10px] ml-0.5">/pc</span>
          </div>
        </div>

        {/* Category, Targeted Audience & MOQ */}
        <div className="flex items-center justify-start gap-1 mb-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1 bg-gray-100 rounded-md px-1.5 py-0.5 flex-shrink-0">
            <Package className="w-2.5 h-2.5 text-gray-500" />
            <span className="text-[8px] md:text-[10px] text-gray-700 font-medium whitespace-nowrap">
              {truncateText(product.category?.name || 'Uncategorized', 8)}
            </span>
          </div>


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

          <div className="flex items-center gap-1 bg-gray-100 rounded-md px-1.5 py-0.5 flex-shrink-0">
            <span className="text-[8px] md:text-[10px] text-gray-600 whitespace-nowrap">MOQ:</span>
            <span className="text-[8px] md:text-[10px] font-semibold text-gray-800 whitespace-nowrap">{product.moq || 0}</span>
          </div>
        </div>

        {/* Color Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-0.5 md:gap-1 mb-2">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
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

        {/* Bulk Price */}
        {firstTier && (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-md p-1 md:p-1.5 mb-2 border border-orange-100/80"
          >
            <div className="flex justify-between items-center text-[9px] md:text-xs">
              <span className="text-gray-600 font-medium">{firstTier.range || 'Bulk'}</span>
              <span className="font-bold text-[#E39A65]">${formatPriceNumber(firstTier.price)}/pc</span>
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

// Main Product Content Component
export default function ProductDetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [inquiryItems, setInquiryItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [activeTab, setActiveTab] = useState('attributes');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  
  // Profile completion state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [pendingInquiryAction, setPendingInquiryAction] = useState(null);
  
  // Cart check state
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemDetails, setCartItemDetails] = useState(null);

  // Helper function to get items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2;
      if (window.innerWidth < 1024) return 3;
      return 4;
    }
    return 4;
  };

  // Auto-play functionality for related products
  useEffect(() => {
    if (relatedProducts.length <= getItemsPerView()) return;
    
    const startAutoPlay = () => {
      if (!isHovered) {
        const autoPlayRef = setInterval(() => {
          const itemsPerView = getItemsPerView();
          setCurrentIndex((prev) => 
            prev + itemsPerView >= relatedProducts.length ? 0 : prev + itemsPerView
          );
        }, 5000);
        return autoPlayRef;
      }
      return null;
    };

    const autoPlayRef = startAutoPlay();
    return () => {
      if (autoPlayRef) clearInterval(autoPlayRef);
    };
  }, [isHovered, relatedProducts.length]);

  const handleNext = () => {
    const itemsPerView = getItemsPerView();
    setCurrentIndex((prev) => 
      prev + itemsPerView >= relatedProducts.length ? 0 : prev + itemsPerView
    );
  };

  const handlePrev = () => {
    const itemsPerView = getItemsPerView();
    setCurrentIndex((prev) => 
      prev - itemsPerView < 0 ? Math.max(relatedProducts.length - itemsPerView, 0) : prev - itemsPerView
    );
  };

  const visibleProducts = relatedProducts.slice(currentIndex, currentIndex + getItemsPerView());

  // Add resize listener to update carousel when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (currentIndex + getItemsPerView() > relatedProducts.length) {
        setCurrentIndex(0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, relatedProducts.length]);
  
  // Scroll to inquiry form if hash present
  useEffect(() => {
    if (window.location.hash === '#inquiry-form') {
      const attemptScroll = (retries = 0) => {
        const formElement = document.getElementById('inquiry-form');
        
        if (formElement) {
          const yOffset = -100;
          const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
          
          formElement.classList.add('ring-4', 'ring-[#E39A65]/20', 'transition-all', 'duration-1000');
          setTimeout(() => {
            formElement.classList.remove('ring-4', 'ring-[#E39A65]/20');
          }, 2000);
        } else if (retries < 10) {
          setTimeout(() => attemptScroll(retries + 1), 300);
        }
      };
      
      setTimeout(attemptScroll, 500);
    }
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  };

  // Check profile completeness
  const checkProfileCompleteness = async () => {
    if (!isAuthenticated) return false;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/auth/profile-status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsProfileComplete(data.data.isComplete);
        
        // Update local storage with profile completion status
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (storedUser.profileCompleted !== data.data.isComplete) {
          storedUser.profileCompleted = data.data.isComplete;
          localStorage.setItem('user', JSON.stringify(storedUser));
          setUser(storedUser);
        }
        
        return data.data.isComplete;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking profile:', error);
      return false;
    }
  };

  const handleAuthSuccess = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    setShowAuthModal(false);
    
    toast.success('Successfully logged in!', {
      description: `Welcome back, ${userData.contactPerson || userData.companyName}!`,
    });
    
    // Check profile completeness after login
    setTimeout(() => {
      checkProfileCompleteness();
    }, 500);
  };

  // Fetch product
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/products/${productId}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
        if (data.data.colors && data.data.colors.length > 0) {
          setSelectedColor(data.data.colors[0]);
        }
        setInquiryItems([]);
        fetchRelatedProducts(data.data.category?._id || data.data.category, data.data.targetedCustomer);
      } else {
        toast.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (categoryId, targetedCustomer) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('limit', 8);
      if (categoryId) queryParams.append('category', categoryId);
      if (targetedCustomer) queryParams.append('targetedCustomer', targetedCustomer);
      
      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/products?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        const filtered = (data.data || []).filter(p => p._id !== productId);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 12));
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const checkIfInCart = async () => {
    if (!isAuthenticated || !product) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success && data.data.items) {
        const existingItem = data.data.items.find(item => 
          item.productId === product._id || item.productId === product.id
        );
        
        if (existingItem) {
          setIsInCart(true);
          setCartItemDetails(existingItem);
        } else {
          setIsInCart(false);
          setCartItemDetails(null);
        }
      }
    } catch (error) {
      console.error('Error checking cart:', error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (product && isAuthenticated) {
      checkIfInCart();
      checkProfileCompleteness();
    } else {
      setIsInCart(false);
      setCartItemDetails(null);
    }
  }, [product, isAuthenticated]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (product && isAuthenticated) {
        checkIfInCart();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [product, isAuthenticated]);

  // Calculate totals
  useEffect(() => {
    if (!product) return;
    
    const totalQty = inquiryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setTotalQuantity(totalQty);
    
    const total = inquiryItems.reduce((sum, item) => {
      const itemPrice = (item.unitPrice || product.pricePerUnit) * (item.quantity || 0);
      return sum + itemPrice;
    }, 0);
    setTotalPrice(total);
  }, [inquiryItems, product]);

  // Function to get price for a specific quantity (per color)
  const getPriceForQuantity = (quantity) => {
    if (!product || !product.quantityBasedPricing || product.quantityBasedPricing.length === 0) {
      return product?.pricePerUnit || 0;
    }
    
    const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
      const aMin = parseInt(a.range.split('-')[0]);
      const bMin = parseInt(b.range.split('-')[0]);
      return aMin - bMin;
    });
    
    let matchedTier = null;
    
    for (const tier of sortedTiers) {
      const range = tier.range;
      
      if (range.includes('-')) {
        const [min, max] = range.split('-').map(Number);
        if (quantity >= min && quantity <= max) {
          matchedTier = tier;
          break;
        }
      }
      else if (range.includes('+')) {
        const minQty = parseInt(range.replace('+', ''));
        if (quantity >= minQty) {
          matchedTier = tier;
          break;
        }
      }
    }
    
    if (matchedTier) {
      return matchedTier.price;
    }
    
    const highestTier = sortedTiers[sortedTiers.length - 1];
    if (highestTier && highestTier.range.includes('-') && quantity > parseInt(highestTier.range.split('-')[1])) {
      return highestTier.price;
    }
    
    return product.pricePerUnit;
  };

  const handleAddItem = () => {
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    const colorExists = inquiryItems.some(item => item.color?.code === selectedColor.code);
    if (colorExists) {
      toast.error(`${selectedColor.code} is already added. Please modify quantities in the existing item.`);
      return;
    }

    const initialSizeQuantities = {};
    product.sizes?.filter(s => s.trim()).forEach(size => {
      initialSizeQuantities[size] = 0;
    });

    setInquiryItems(prev => [...prev, {
      id: Date.now(),
      color: selectedColor,
      sizeQuantities: initialSizeQuantities,
      quantity: 0,
      unitPrice: product.pricePerUnit
    }]);

    toast.success(`${selectedColor.code} added. Enter quantities for each size.`);
  };

  const handleUpdateItem = (id, field, value) => {
    setInquiryItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setInquiryItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed');
  };

  const handleColorQuantityChange = (id, quantity, newUnitPrice) => {
    setInquiryItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: quantity, unitPrice: newUnitPrice } : item
    ));
  };

  // Updated handleSubmitInquiry with profile check
  const handleSubmitInquiry = async () => {
    if (!isAuthenticated) {
      setAuthModalTab('login');
      setShowAuthModal(true);
      toast.info('Please login to submit an inquiry');
      return;
    }

    // Check if profile is complete
    const profileComplete = await checkProfileCompleteness();
    if (!profileComplete) {
      setPendingInquiryAction('add-to-cart');
      setShowProfileModal(true);
      toast.warning('Please complete your profile first', {
        description: 'We need your contact information to process your inquiry.'
      });
      return;
    }

    if (inquiryItems.length === 0) {
      toast.error('Please add at least one color');
      return;
    }

    const invalidColors = inquiryItems.filter(item => {
      const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
      return colorTotal > 0 && colorTotal < product.moq;
    });

    if (invalidColors.length > 0) {
      const colorNames = invalidColors.map(item => item.color?.code).join(', ');
      toast.error(`Each color must meet the minimum MOQ of ${product.moq} pieces. Colors below MOQ: ${colorNames}`);
      return;
    }

    const hasQuantities = inquiryItems.some(item => {
      const total = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
      return total > 0;
    });

    if (!hasQuantities) {
      toast.error('Please enter quantities for at least one size');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const colorsData = inquiryItems.map(item => {
        const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
        const applicablePrice = getPriceForQuantity(colorTotal);
        
        return {
          color: {
            code: item.color.code,
            name: item.color.name || item.color.code
          },
          sizeQuantities: item.sizeQuantities,
          totalQuantity: colorTotal,
          unitPrice: applicablePrice
        };
      }).filter(item => item.totalQuantity > 0);

      const cartItem = {
        productId: product._id,
        productName: product.productName,
        colors: colorsData,
        totalQuantity: colorsData.reduce((sum, c) => sum + c.totalQuantity, 0),
        unitPrice: product.pricePerUnit,
        moq: product.moq,
        productImage: product.images?.[0]?.url,
        specialInstructions: specialInstructions
      };

      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(`${colorsData.length} color(s) added for ${product.productName}!`);
        
        setInquiryItems([]);
        setSpecialInstructions('');
        
        setIsInCart(true);
        checkIfInCart();
        
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to add to cart');
      }
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add items to cart');
    }
  };

  // Updated handleWhatsAppInquiry with profile check
  const handleWhatsAppInquiry = async () => {
    if (!isAuthenticated) {
      setAuthModalTab('login');
      setShowAuthModal(true);
      toast.info('Please login to send WhatsApp inquiry');
      return;
    }

    // Check if profile is complete
    const profileComplete = await checkProfileCompleteness();
    if (!profileComplete) {
      setPendingInquiryAction('whatsapp');
      setShowProfileModal(true);
      toast.warning('Please complete your profile first', {
        description: 'We need your contact information to proceed.'
      });
      return;
    }

    if (inquiryItems.length === 0) {
      toast.error('Please add items to inquiry');
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    let message = `*Inquiry for ${product.productName}*\n\n`;
    
    message += `*👤 BUYER INFORMATION*\n`;
    message += `• Company: ${currentUser?.companyName || 'N/A'}\n`;
    message += `• Contact Person: ${currentUser?.contactPerson || 'N/A'}\n`;
    message += `• Email: ${currentUser?.email || 'N/A'}\n`;
    message += `• Phone: ${currentUser?.phone || 'N/A'}\n`;
    if (currentUser?.whatsapp) message += `• WhatsApp: ${currentUser.whatsapp}\n`;
    message += `• Country: ${currentUser?.country || 'N/A'}\n\n`;
    
    message += `*📦 PRODUCT DETAILS*\n`;
    message += `• Product: ${product.productName}\n`;
    message += `• Category: ${product.category?.name || 'Uncategorized'}\n`;
    message += `• Fabric: ${product.fabric || 'Standard'}\n`;
    message += `• Target: ${capitalizeFirst(product.targetedCustomer || 'Unisex')}\n`;
    message += `• MOQ (Per Color): ${product.moq} pieces\n\n`;
    
    message += `*🛒 INQUIRY ITEMS (Per Color Pricing)*\n`;
    
    inquiryItems.forEach((item, index) => {
      const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
      const colorUnitPrice = getPriceForQuantity(colorTotal);
      
      message += `\n*Item ${index + 1} - Color: ${item.color?.code || 'N/A'}*\n`;
      
      let hasSizes = false;
      Object.entries(item.sizeQuantities || {}).forEach(([size, qty]) => {
        if (qty && qty > 0) {
          message += `  • Size ${size}: ${qty} pcs\n`;
          hasSizes = true;
        }
      });
      
      if (!hasSizes) {
        message += `  • No sizes specified\n`;
      }
      
      message += `  *Color Total:* ${colorTotal} pcs\n`;
      message += `  *Unit Price:* ${formatPrice(colorUnitPrice)}/pc\n`;
      message += `  *Color Subtotal:* ${formatPrice(colorUnitPrice * colorTotal)}\n`;
    });
    
    const totalPriceCalculated = inquiryItems.reduce((sum, item) => {
      const colorTotal = Object.values(item.sizeQuantities || {}).reduce((s, qty) => s + (qty || 0), 0);
      const colorUnitPrice = getPriceForQuantity(colorTotal);
      return sum + (colorUnitPrice * colorTotal);
    }, 0);
    
    message += `\n*📊 ORDER SUMMARY*\n`;
    message += `• Total Quantity: ${totalQuantity} pieces\n`;
    message += `• Estimated Total: ${formatPrice(totalPriceCalculated)}\n`;
    
    if (specialInstructions) {
      message += `\n*📝 SPECIAL INSTRUCTIONS*\n`;
      message += `${specialInstructions}\n`;
    }
    
    message += `\n*🕐 Inquiry sent:* ${new Date().toLocaleString()}\n`;

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685';
    const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success('WhatsApp chat opened!', {
      description: 'Your inquiry has been prepared and ready to send.',
    });
  };

  const allColorsMeetMOQ = inquiryItems.every(item => {
    const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
    return colorTotal === 0 || colorTotal >= product?.moq;
  });

  const hasAnyQuantity = inquiryItems.some(item => {
    const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
    return colorTotal > 0;
  });

  const canSubmit = hasAnyQuantity && allColorsMeetMOQ;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 max-w-7xl py-8 mt-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <div className="bg-gray-200 rounded-xl h-[500px]"></div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Navbar />
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Product Not Found</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-sm sm:text-base"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <MetadataUpdater product={product} />
      
      <Navbar />
      <div className="min-h-screen bg-gray-50 mt-16 sm:mt-20">
        {/* Breadcrumb */}
    {/* Breadcrumb */}
<div className="bg-white border-b border-gray-200">
  <div className="container mx-auto px-4 max-w-7xl py-3 sm:py-4">
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
       <button
        onClick={() => router.back()}
        className="lg:hidden flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
        aria-label="Go back"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </button>
      
      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap pb-0.5 flex-1">
        <Link href="/" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Home</Link>
        <span className="flex-shrink-0">/</span>
        <Link href="/products" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Products</Link>
        <span className="flex-shrink-0">/</span>
        <Link 
          href={`/products?category=${product.category?._id}`} 
          className="hover:text-[#E39A65] transition-colors flex-shrink-0"
        >
          {product.category?.name || 'Category'}
        </Link>
        
        {/* Subcategory */}
        {product.subcategoryName && product.subcategory && (
          <>
            <span className="flex-shrink-0">/</span>
            <Link 
              href={`/products?category=${product.category?._id}&subcategory=${product.subcategory}`} 
              className="hover:text-[#E39A65] transition-colors flex-shrink-0"
            >
              {product.subcategoryName}
            </Link>
          </>
        )}
        
        {/* NEW: Child Subcategory */}
        {product.childSubcategoryName && product.childSubcategory && (
          <>
            <span className="flex-shrink-0">/</span>
            <Link 
              href={`/products?category=${product.category?._id}&subcategory=${product.subcategory}&childSubcategory=${product.childSubcategory}`} 
              className="hover:text-[#E39A65] transition-colors flex-shrink-0"
            >
              {product.childSubcategoryName}
            </Link>
          </>
        )}
        
        <span className="flex-shrink-0">/</span>
        <span className="text-gray-900 font-medium truncate">{product.productName}</span>
      </div>
    </div>
  </div>
</div>

        <div className="container mx-auto px-4 max-w-7xl py-4 sm:py-6 lg:py-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Image Gallery */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <ImageGallery images={product.images} productName={product.productName} />
              </div>
            </div>

            {/* Right Column - Product Info & Inquiry Form */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Product Info Card */}
              <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-7 h-7 bg-[#E39A65]/10 rounded-lg">
                        <Package className="w-3.5 h-3.5 text-[#E39A65]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">Category</span>
                        <span className="text-xs font-semibold text-gray-900">
                          {product.category?.name || 'Uncategorized'}
                        </span>
                      </div>
                    </div>

                     {/* NEW: Subcategory - Add this block right after Category */}
      {product.subcategoryName && (
        <>
          <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 bg-[#E39A65]/10 rounded-lg">
              <FolderTree className="w-3.5 h-3.5 text-[#E39A65]" />
            </div>
            <div>
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">Subcategory</span>
              <span className="text-xs font-semibold text-gray-900">
                {product.subcategoryName}
              </span>
            </div>
          </div>
        </>
      )}

         {/* NEW: Child Subcategory - Add this block */}
     
                    

                    <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-7 h-7 bg-[#E39A65]/10 rounded-lg">
                        <Users className="w-3.5 h-3.5 text-[#E39A65]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">Target</span>
                        <span className="text-xs font-semibold text-gray-900">
                          {product.targetedCustomer && product.targetedCustomer !== 'unisex' 
                            ? capitalizeFirst(product.targetedCustomer) 
                            : 'Unisex (All)'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <div className="flex items-center justify-center w-7 h-7 bg-green-50 rounded-lg">
                        <Package className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <div>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">MOQ (Per Color)</span>
                        <span className="text-xs font-semibold text-gray-900">{product.moq} pcs</span>
                      </div>
                    </div>
                  </div>
                  
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{product.productName}</h1>
                  
                  {product.description && (
                    <div 
                      className="text-xs sm:text-sm text-gray-600 line-clamp-2 prose prose-sm max-w-none rich-text-preview"
                      dangerouslySetInnerHTML={{ 
                        __html: product.description.length > 200 
                          ? product.description.substring(0, 200) + '...' 
                          : product.description
                      }}
                    />
                  )}
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
                  <div className="lg:w-1/2">
                    <div className="flex items-baseline justify-between p-3 sm:p-4 bg-orange-50 rounded-lg mb-4">
                      <div>
                        <span className="text-xs sm:text-sm text-gray-600">Starting from</span>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E39A65]">
                          {formatPrice(product.pricePerUnit)}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs sm:text-sm text-gray-600">MOQ (Per Color)</span>
                        <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{product.moq} pieces</div>
                      </div>
                    </div>

                    {product.fabric && (
                      <div className="mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Fabric: </span>
                        <span className="text-xs sm:text-sm text-gray-600">{product.fabric}</span>
                      </div>
                    )}

                    {product.colors && product.colors.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Available Colors</h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {product.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white shadow-md"
                              style={{ backgroundColor: color.code }}
                              title={color.code}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {product.sizes?.filter(s => s.trim()).length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Available Sizes</h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {product.sizes.filter(s => s.trim()).map((size, index) => (
                            <span
                              key={index}
                              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 rounded-lg"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-1/2 mt-4 lg:mt-0">
                    <BulkPricingTable 
                      pricing={product.quantityBasedPricing} 
                      unitPrice={product.pricePerUnit}
                      moq={product.moq}
                    />
                  </div>
                </div>
              </div>

              {/* Inquiry Form Card */}
              <div id="inquiry-form" className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Create Your Inquiry</h2>
                  {totalQuantity > 0 && (
                    <span className="text-xs sm:text-sm text-gray-500">{totalQuantity} total pcs</span>
                  )}
                </div>
                
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-3 sm:mb-4">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Select Color to Add
                    </label>
                    <ColorSelector 
                      colors={product.colors}
                      selectedColor={selectedColor}
                      onChange={setSelectedColor}
                    />
                  </div>
                )}

                <button
                  onClick={handleAddItem}
                  disabled={!selectedColor || isInCart}
                  className="w-full flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#E39A65] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3 sm:mb-4"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Add Selected Color
                </button>

                {isInCart && (
                  <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-green-800">
                          ✓ This product is already in your inquiry cart
                        </p>
                        <p className="text-[10px] sm:text-xs text-green-600 mt-1">
                          You can view or modify it in your cart
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {product.sizes?.filter(s => s.trim()).length > 0 && !isInCart && (
                  <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <p className="text-[10px] sm:text-xs text-blue-700">
                      <span className="font-medium">Available Sizes:</span> {product.sizes.filter(s => s.trim()).join(', ')}
                    </p>
                    <p className="text-[10px] sm:text-xs text-blue-600 mt-1">
                      Enter quantities for each size under each color item
                    </p>
                  </div>
                )}

                {!isInCart && inquiryItems.length > 0 && (
                  <>
                    <h3 className="text-sm sm:text-md font-semibold text-gray-900 mb-2 sm:mb-3">Your Items (Each color must meet MOQ of {product.moq} pcs)</h3>
                    <div className="space-y-2 sm:space-y-3 max-h-[350px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2 mb-3 sm:mb-4">
                      {inquiryItems.map((item, index) => (
                        <InquiryItem
                          key={item.id}
                          item={item}
                          index={index}
                          product={product}
                          onUpdate={handleUpdateItem}
                          onRemove={handleRemoveItem}
                          showRemove={true}
                          onColorQuantityChange={handleColorQuantityChange}
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Total Qty (All Colors)</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">{totalQuantity} pcs</p>
                      </div>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Estimated Total</p>
                        <p className="text-base sm:text-lg font-bold text-[#E39A65]">{formatPrice(totalPrice)}</p>
                      </div>
                    </div>

                    {!allColorsMeetMOQ && hasAnyQuantity && (
                      <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs sm:text-sm text-yellow-800">
                          ⚠️ Each color must meet the minimum MOQ of {product.moq} pieces. Please adjust quantities for colors below the MOQ.
                        </p>
                      </div>
                    )}

                    <div className="mb-3 sm:mb-4">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Special Instructions
                      </label>
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        rows="2"
                        className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none resize-none"
                        placeholder="Add any special requirements..."
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
                  {isInCart ? (
                    <>
                      <Link 
                        href="/inquiry-cart" 
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        View in Cart
                      </Link>
                      <button
                        onClick={handleWhatsAppInquiry}
                        disabled={inquiryItems.length === 0}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#E39A65] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        Chat on WhatsApp
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSubmitInquiry}
                        disabled={!canSubmit}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#E39A65] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        Add to Cart
                      </button>
                      <button
                        onClick={handleWhatsAppInquiry}
                        disabled={inquiryItems.length === 0}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        Chat on WhatsApp
                      </button>
                    </>
                  )}
                </div>

                {!isInCart && inquiryItems.length === 0 && (
                  <div className="text-center py-3 sm:py-4 mt-2">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Select a color and click "Add Selected Color" to start building your inquiry
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-6 sm:mt-8">
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex gap-4 sm:gap-6 lg:gap-8 min-w-max px-1">
                {['attributes', 'description', 'instructions', 'pricing', 'shipping', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 sm:pb-4 px-1 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-[#E39A65] text-[#E39A65]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'attributes' && 'Key Attributes'}
                    {tab === 'description' && 'Description'}
                    {tab === 'instructions' && 'Care Instructions'}
                    {tab === 'pricing' && 'Bulk Pricing'}
                    {tab === 'shipping' && 'Shipping Info'}
                    {tab === 'reviews' && 'Reviews'}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-4 sm:mt-6">
              {activeTab === 'attributes' && <KeyAttributes product={product} />}
              {activeTab === 'description' && <Description product={product} />}
              {activeTab === 'instructions' && <Instructions product={product} />}
              {activeTab === 'pricing' && (
                <BulkPricingTable 
                  pricing={product.quantityBasedPricing} 
                  unitPrice={product.pricePerUnit}
                  moq={product.moq}
                />
              )}
              {activeTab === 'shipping' && <ShippingInfo />}
              {activeTab === 'reviews' && (
                <ProductReviews productId={product._id} />
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#E39A65]/10 px-3 py-1 rounded-full mb-3">
                    <Sparkles className="w-4 h-4 text-[#E39A65]" />
                    <span className="text-xs font-medium text-[#E39A65]">You might also like</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    Related Products
                  </h2>
                </div>
                
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E39A65] transition-colors group bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  <span>Browse all products</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="relative px-4 sm:px-8 md:px-10">
                {/* Previous Button */}
                {relatedProducts.length > getItemsPerView() && (
                  <button
                    onClick={handlePrev}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-[#E39A65] hover:text-white hover:border-[#E39A65] transition-all duration-300 flex items-center justify-center opacity-60 hover:opacity-100"
                    style={{ transform: 'translateY(-50%)' }}
                    aria-label="Previous products"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                )}

                {/* Next Button */}
                {relatedProducts.length > getItemsPerView() && (
                  <button
                    onClick={handleNext}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-[#E39A65] hover:text-white hover:border-[#E39A65] transition-all duration-300 flex items-center justify-center opacity-60 hover:opacity-100"
                    style={{ transform: 'translateY(-50%)' }}
                    aria-label="Next products"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                )}

                <div className="overflow-hidden">
                  <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
                  >
                    {visibleProducts.map((product) => (
                      <RelatedProductCard key={product._id} product={product} />
                    ))}
                  </motion.div>
                </div>

                {/* Pagination Dots */}
                {relatedProducts.length > getItemsPerView() && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    {Array.from({ length: Math.ceil(relatedProducts.length / getItemsPerView()) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index * getItemsPerView());
                          setIsHovered(true);
                          setTimeout(() => setIsHovered(false), 3000);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          Math.floor(currentIndex / getItemsPerView()) === index
                            ? 'w-8 bg-[#E39A65]'
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Floating Button */}
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
          <button
            onClick={handleWhatsAppInquiry}
            disabled={inquiryItems.length === 0}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialTab={authModalTab}
          onAuthSuccess={handleAuthSuccess}
        />

        {/* Complete Profile Modal */}
        <CompleteProfileModal
          isOpen={showProfileModal}
          onClose={() => {
            setShowProfileModal(false);
            setPendingInquiryAction(null);
          }}
          user={user}
          onComplete={async (updatedUser) => {
            setUser(updatedUser);
            setIsProfileComplete(true);
            toast.success('Profile completed! You can now proceed.');
            
            if (pendingInquiryAction === 'add-to-cart') {
              setTimeout(() => handleSubmitInquiry(), 500);
            } else if (pendingInquiryAction === 'whatsapp') {
              setTimeout(() => handleWhatsAppInquiry(), 500);
            }
            
            setPendingInquiryAction(null);
          }}
        />
      </div>
      <Footer />
      <WhatsAppButton />

      {/* Global styles for rich text content */}
      <style jsx global>{`
        .rich-text-content {
          color: #374151;
          line-height: 1.6;
        }
        
        .rich-text-content h1 {
          font-size: 2em;
          margin: 0.5em 0;
          font-weight: 600;
          color: #111827;
        }
        
        .rich-text-content h2 {
          font-size: 1.5em;
          margin: 0.5em 0;
          font-weight: 600;
          color: #111827;
        }
        
        .rich-text-content h3 {
          font-size: 1.17em;
          margin: 0.5em 0;
          font-weight: 600;
          color: #111827;
        }
        
        .rich-text-content h4 {
          font-size: 1em;
          margin: 0.5em 0;
          font-weight: 600;
          color: #111827;
        }
        
        .rich-text-content p {
          margin: 0.75em 0;
        }
        
        .rich-text-content ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        .rich-text-content ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        .rich-text-content li {
          margin: 0.25em 0;
        }
        
        .rich-text-content a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
        
        .rich-text-content a:hover {
          text-decoration: underline;
          color: #1d4ed8;
        }
        
        .rich-text-content strong {
          font-weight: 600;
          color: #111827;
        }
        
        .rich-text-content em {
          font-style: italic;
        }
        
        .rich-text-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          color: #6b7280;
        }
        
        .rich-text-content code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-family: monospace;
          font-size: 0.875em;
        }
        
        .rich-text-content pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          font-family: monospace;
          font-size: 0.875em;
        }
        
        .rich-text-preview {
          color: #6b7280;
          line-height: 1.5;
        }
        
        .rich-text-preview p {
          margin: 0.5em 0;
        }
        
        .rich-text-preview a {
          color: #2563eb;
        }
      `}</style>
    </>
  );
}