// // app/product/[id]/ProductClient.js
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { use } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';
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
//   CheckCircle,
//   Minus
// } from 'lucide-react';
// import Footer from '../../components/layout/Footer';
// import Navbar from '../../components/layout/Navbar';
// import AuthModal from '../../components/AuthModal';
// import ProductReviews from '../../components/product/ProductReviews';

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

// // Image Gallery Component
// const ImageGallery = ({ images = [], productName }) => {
//   const [mainImage, setMainImage] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//       {/* Thumbnails */}
//       <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
//         {images.slice(0, 4).map((image, idx) => (
//           <button
//             key={idx}
//             onClick={() => setMainImage(idx)}
//             onMouseEnter={() => setMainImage(idx)}
//             className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
//               mainImage === idx 
//                 ? 'border-[#E39A65] shadow-md' 
//                 : 'border-gray-200 hover:border-gray-300'
//             }`}
//           >
//             <img
//               src={image.url}
//               alt={`${productName} - Thumbnail ${idx + 1}`}
//               className="w-full h-full object-cover"
//             />
//             {mainImage === idx && (
//               <div className="absolute inset-0 bg-[#E39A65]/10 flex items-center justify-center">
//                 <Check className="w-4 h-4 text-[#E39A65]" />
//               </div>
//             )}
//           </button>
//         ))}
//         {images.length > 4 && (
//           <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg bg-gray-100 flex items-center justify-center text-xs sm:text-sm text-gray-500">
//             +{images.length - 4}
//           </div>
//         )}
//       </div>

//       {/* Main Image */}
//       <div 
//         className="flex-1 relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden group cursor-zoom-in order-1 sm:order-2"
//         onMouseMove={handleMouseMove}
//       >
//         <img
//           src={images[mainImage]?.url || images[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image'}
//           alt={`${productName} - Main view`}
//           className="w-full h-[300px] sm:h-[320px] lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-150"
//           style={{
//             transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
//           }}
//         />
        
//         <button
//           onClick={() => setIsFullscreen(true)}
//           className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
//         >
//           <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Fullscreen Modal */}
//       {isFullscreen && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center mt-16">
//           <button
//             onClick={() => setIsFullscreen(false)}
//             className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
//           </button>
//           <img
//             src={images[mainImage]?.url || images[0]?.url}
//             alt={productName}
//             className="max-w-[95vw] max-h-[85vh] object-contain"
//           />
//         </div>
//       )}
//     </div>
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

// // Bulk Pricing Table Component
// const BulkPricingTable = ({ pricing = [], unitPrice, moq }) => {
//   const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];

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
//                   Bulk Pricing
//                 </h3>
//                 <p className="text-xs text-white/80 mt-0.5">Volume discounts · Best rates</p>
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
//                     <span>Quantity</span>
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
//               {pricingData.map((tier, index) => {
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
// const KeyAttributes = ({ product }) => {
//   const attributes = [
//     { label: 'MOQ', value: `${product.moq} pieces` },
//     { label: 'Fabric', value: product.fabric || 'Standard' },
//     { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
//     { label: 'Available Sizes', value: product.sizes?.filter(s => s.trim()).slice(0, 5).join(', ') + (product.sizes?.length > 5 ? ` +${product.sizes.length - 5} more` : '') || 'Standard' },
//     ...(product.additionalInfo || []).map(info => ({
//       label: info.fieldName,
//       value: info.fieldValue
//     }))
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

// // Inquiry Item Component
// const InquiryItem = ({ item, index, product, onUpdate, onRemove, showRemove }) => {
//   const [sizeQuantities, setSizeQuantities] = useState(item.sizeQuantities || {});

//   useEffect(() => {
//     if (item.sizeQuantities) {
//       setSizeQuantities(item.sizeQuantities);
//     }
//   }, [item.sizeQuantities]);

//   const handleSizeQuantityChange = (size, quantity) => {
//     const newQuantities = { ...sizeQuantities, [size]: quantity };
//     setSizeQuantities(newQuantities);
    
//     const totalQty = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
    
//     onUpdate(item.id, 'sizeQuantities', newQuantities);
//     onUpdate(item.id, 'quantity', totalQty);
//   };

//   const getTotalForItem = () => {
//     return Object.values(sizeQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
//   };

//   const allSizes = product.sizes?.filter(s => s.trim()) || [];

//   return (
//     <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
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
//         {showRemove && (
//           <button
//             onClick={() => onRemove(item.id)}
//             className="p-1 hover:bg-red-100 rounded-lg transition-colors group"
//             title="Remove item"
//           >
//             <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 group-hover:text-red-600" />
//           </button>
//         )}
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
//         <span className="text-xs sm:text-sm text-gray-600">Item Total:</span>
//         <span className="text-xs sm:text-sm font-semibold text-[#E39A65]">{getTotalForItem()} pcs</span>
//       </div>
//     </div>
//   );
// };

// // Related Product Card Component
// const RelatedProductCard = ({ product }) => {
//   const productImages = product.images || [];
//   const [activeIndex, setActiveIndex] = useState(0);
//   const firstTier = product.quantityBasedPricing?.[0];
//   const primaryTag = product.tags?.[0];

//   const handleImageHover = (index) => {
//     setActiveIndex(index);
//   };

//   const handleImageLeave = () => {
//     setActiveIndex(0);
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
//       onClick={() => window.location.href = `/product/${product._id}`}
//       className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
//     >
//       {/* Image Container */}
//       <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-gray-100">
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
        
//         {/* Desktop Hover Icons */}
//         <motion.div 
//           className="absolute inset-0 bg-black/40 items-center justify-center gap-3 
//                      hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
//           initial={{ opacity: 0 }}
//           whileHover={{ opacity: 1 }}
//         >
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/product/${product._id}`;
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
//               window.location.href = `/product/${product._id}#inquiry-form`;
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
//         <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3 sm:hidden z-30">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/product/${product._id}`;
//             }}
//             className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-transform"
//           >
//             <Eye className="w-4 h-4 text-gray-700" />
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/product/${product._id}#inquiry-form`;
//             }}
//             className="bg-[#E39A65]/90 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-transform"
//           >
//             <ShoppingCart className="w-4 h-4 text-white" />
//           </button>
//         </div>
        
//         {/* Category Badge */}
//         <motion.span 
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="absolute top-3 left-3 bg-[#E39A65] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium shadow-lg z-20"
//         >
//           {product.category?.name || 'Uncategorized'}
//         </motion.span>
        
//         {/* Tag Badge */}
//         {primaryTag && (
//           <motion.span 
//             initial={{ x: 20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className={`absolute top-3 right-3 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium shadow-lg z-20 ${getTagStyles(primaryTag)}`}
//           >
//             {primaryTag}
//           </motion.span>
//         )}
        
//         {/* MOQ Badge */}
//         <motion.span 
//           initial={{ x: 20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="absolute bottom-3 right-3 bg-gray-900/90 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm shadow-lg z-20"
//         >
//           MOQ: {product.moq || 0}
//         </motion.span>

//         {/* Targeted Customer Badge */}
//         {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
//           <motion.span 
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="absolute bottom-3 left-3 bg-black/50 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full backdrop-blur-sm z-20"
//           >
//             {capitalizeFirst(product.targetedCustomer)}
//           </motion.span>
//         )}
//       </div>

//       {/* Thumbnail Gallery */}
//       {productImages.length > 1 && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="flex justify-center gap-1 py-2 px-2 bg-gray-50 border-t border-gray-100"
//           onMouseLeave={handleImageLeave}
//         >
//           {productImages.slice(0, 4).map((image, index) => (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-md overflow-hidden transition-all duration-300 ${
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
//           {productImages.length > 4 && (
//             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gray-200 flex items-center justify-center text-[10px] sm:text-xs text-gray-600 font-medium">
//               +{productImages.length - 4}
//             </div>
//           )}
//         </motion.div>
//       )}

//       {/* Content */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.7 }}
//         className="p-4"
//       >
//         {/* Title and Price */}
//         <div className="flex items-start justify-between gap-2 mb-2">
//           <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1" title={product.productName}>
//             {truncateText(product.productName, 25)}
//           </h3>
//           <div className="flex-shrink-0 text-right">
//             <span className="text-base font-bold text-[#E39A65]">
//               ${formatPriceNumber(product.pricePerUnit)}
//             </span>
//             <span className="text-gray-500 text-[8px] ml-1">/pc</span>
//           </div>
//         </div>

//         {/* Color Dots */}
//         {product.colors && product.colors.length > 0 && (
//           <div className="flex items-center gap-1 mb-2">
//             {product.colors.slice(0, 4).map((color, i) => (
//               <div
//                 key={i}
//                 className="w-4 h-4 rounded-full border border-white shadow-sm"
//                 style={{ backgroundColor: color.code }}
//                 title={color.name || color.code}
//               />
//             ))}
//             {product.colors.length > 4 && (
//               <span className="text-[8px] text-gray-400">+{product.colors.length - 4}</span>
//             )}
//           </div>
//         )}

//         {/* Bulk Price */}
//         {firstTier && (
//           <motion.div 
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-2 mb-3 border border-orange-100/80"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center text-[10px]">
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
//             window.location.href = `/product/${product._id}#inquiry-form`;
//           }}
//         >
//           <div className="flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-all duration-300 hover:shadow-md relative overflow-hidden cursor-pointer">
//             <ShoppingCart className="w-3 h-3" />
//             <span>Inquiry Now</span>
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Main Product Client Component
// export default function ProductClient({ params }) {
//   // Unwrap the params Promise (Next.js 16 feature)
//   const { id: productId } = use(params);
//   const router = useRouter();
  
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

//   // Auto-play functionality for related products
//   useEffect(() => {
//     if (relatedProducts.length <= 4) return;
    
//     const startAutoPlay = () => {
//       if (!isHovered) {
//         const autoPlayRef = setInterval(() => {
//           setCurrentIndex((prev) => 
//             prev + 4 >= relatedProducts.length ? 0 : prev + 4
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
//     setCurrentIndex((prev) => 
//       prev + 4 >= relatedProducts.length ? 0 : prev + 4
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => 
//       prev - 4 < 0 ? Math.max(relatedProducts.length - 4, 0) : prev - 4
//     );
//   };

//   const visibleProducts = relatedProducts.slice(currentIndex, currentIndex + 4);

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

//   useEffect(() => {
//     if (!product) return;
//     const totalQty = inquiryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
//     setTotalQuantity(totalQty);
//   }, [inquiryItems, product]);

//   useEffect(() => {
//     if (!product || totalQuantity === 0) {
//       setTotalPrice(0);
//       return;
//     }

//     let unitPrice = product.pricePerUnit;
    
//     if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
//       const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//         const aMin = parseInt(a.range.split('-')[0]);
//         const bMin = parseInt(b.range.split('-')[0]);
//         return aMin - bMin;
//       });
      
//       let matchedTier = null;
      
//       for (const tier of sortedTiers) {
//         const range = tier.range;
        
//         if (range.includes('-')) {
//           const [min, max] = range.split('-').map(Number);
//           if (totalQuantity >= min && totalQuantity <= max) {
//             matchedTier = tier;
//             break;
//           }
//         }
//         else if (range.includes('+')) {
//           const minQty = parseInt(range.replace('+', ''));
//           if (totalQuantity >= minQty) {
//             matchedTier = tier;
//             break;
//           }
//         }
//       }
      
//       if (matchedTier) {
//         unitPrice = matchedTier.price;
//       } else {
//         const highestTier = sortedTiers[sortedTiers.length - 1];
//         if (highestTier.range.includes('-') && totalQuantity > parseInt(highestTier.range.split('-')[1])) {
//           unitPrice = highestTier.price;
//         }
//       }
//     }

//     const total = unitPrice * totalQuantity;
//     setTotalPrice(total);
//   }, [totalQuantity, product]);

//   const getApplicableUnitPrice = () => {
//     if (!product || totalQuantity === 0) return product?.pricePerUnit || 0;
    
//     let unitPrice = product.pricePerUnit;
    
//     if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
//       const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//         const aMin = parseInt(a.range.split('-')[0]);
//         const bMin = parseInt(b.range.split('-')[0]);
//         return aMin - bMin;
//       });
      
//       let matchedTier = null;
      
//       for (const tier of sortedTiers) {
//         const range = tier.range;
        
//         if (range.includes('-')) {
//           const [min, max] = range.split('-').map(Number);
//           if (totalQuantity >= min && totalQuantity <= max) {
//             matchedTier = tier;
//             unitPrice = tier.price;
//             break;
//           }
//         }
//         else if (range.includes('+')) {
//           const minQty = parseInt(range.replace('+', ''));
//           if (totalQuantity >= minQty) {
//             matchedTier = tier;
//             unitPrice = tier.price;
//             break;
//           }
//         }
//       }
      
//       if (!matchedTier) {
//         const highestTier = sortedTiers[sortedTiers.length - 1];
//         if (highestTier.range.includes('-') && totalQuantity > parseInt(highestTier.range.split('-')[1])) {
//           unitPrice = highestTier.price;
//         }
//       }
//     }
    
//     return unitPrice;
//   };

//   const applicableUnitPrice = getApplicableUnitPrice();

//   const handleAddItem = () => {
//     if (!selectedColor) {
//       toast.error('Please select a color');
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
//       quantity: 0
//     }]);

//     toast.success('Color added. Enter quantities for each size.');
//   };

//   const handleUpdateItem = (id, field, value) => {
//     setInquiryItems(prev => prev.map(item => 
//       item.id === id ? { ...item, [field]: value } : item
//     ));
//   };

//   const handleRemoveItem = (id) => {
//     if (inquiryItems.length > 1) {
//       setInquiryItems(prev => prev.filter(item => item.id !== id));
//       toast.success('Item removed');
//     } else if (inquiryItems.length === 1) {
//       setInquiryItems([]);
//       toast.success('Item removed');
//     }
//   };

//   const handleSubmitInquiry = async () => {
//     if (!isAuthenticated) {
//       setAuthModalTab('login');
//       setShowAuthModal(true);
//       toast.info('Please login to submit an inquiry');
//       return;
//     }

//     if (inquiryItems.length === 0) {
//       toast.error('Please add at least one color');
//       return;
//     }

//     const hasQuantities = inquiryItems.some(item => {
//       const total = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       return total > 0;
//     });

//     if (!hasQuantities) {
//       toast.error('Please enter quantities for at least one size');
//       return;
//     }

//     const calculatedTotalQuantity = inquiryItems.reduce((total, item) => {
//       const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       return total + itemTotal;
//     }, 0);

//     if (calculatedTotalQuantity < product.moq) {
//       toast.error(`Total quantity must be at least ${product.moq} pieces (currently ${calculatedTotalQuantity})`);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
      
//       const colorsData = inquiryItems.map(item => {
//         const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
        
//         return {
//           color: item.color,
//           sizeQuantities: item.sizeQuantities,
//           totalQuantity: colorTotal
//         };
//       }).filter(item => item.totalQuantity > 0);

//       const cartItem = {
//         productId: product._id,
//         productName: product.productName,
//         colors: colorsData,
//         totalQuantity: calculatedTotalQuantity,
//         unitPrice: applicableUnitPrice,
//         moq: product.moq,
//         productImage: product.images?.[0]?.url,
//         specialInstructions: specialInstructions
//       };

//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/add', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(cartItem)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`${colorsData.length} color(s) added for ${product.productName}! Total: ${calculatedTotalQuantity} pcs`);
        
//         setInquiryItems([]);
//         setSpecialInstructions('');
        
//         setIsInCart(true);
//         checkIfInCart();
        
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart');
//       }
      
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       toast.error('Failed to add items to cart');
//     }
//   };

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
//     message += `• MOQ: ${product.moq} pieces\n\n`;
    
//     message += `*🛒 INQUIRY ITEMS*\n`;
    
//     inquiryItems.forEach((item, index) => {
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
      
//       const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       message += `  *Item Total:* ${itemTotal} pcs\n`;
//     });
    
//     message += `\n*📊 ORDER SUMMARY*\n`;
//     message += `• Total Quantity: ${totalQuantity} pieces\n`;
//     message += `• Unit Price: ${formatPrice(applicableUnitPrice)}\n`;
//     message += `• Estimated Total: ${formatPrice(totalPrice)}\n`;
    
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
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-[60vh] px-4">
//           <div className="text-center">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Product Not Found</h2>
//             <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">The product you're looking for doesn't exist or has been removed.</p>
//             <Link 
//               href="/products" 
//               className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-sm sm:text-base"
//             >
//               <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
//               Back to Products
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 mt-16 sm:mt-20">
//         {/* Breadcrumb */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="container mx-auto px-4 max-w-7xl py-3 sm:py-4">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <button
//                 onClick={() => router.back()}
//                 className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
//                 aria-label="Go back"
//               >
//                 <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//               </button>
              
//               <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap pb-0.5 flex-1">
//                 <Link href="/" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Home</Link>
//                 <span className="flex-shrink-0">/</span>
//                 <Link href="/products" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Products</Link>
//                 <span className="flex-shrink-0">/</span>
//                 <span className="text-gray-900 font-medium truncate">{product.productName}</span>
//               </div>
//             </div>
//           </div>
//         </div>

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
//               <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
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
//                         <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">MOQ</span>
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
//                         <span className="text-xs sm:text-sm text-gray-600">MOQ</span>
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
//               </div>

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
//                     <h3 className="text-sm sm:text-md font-semibold text-gray-900 mb-2 sm:mb-3">Your Items</h3>
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
//                         />
//                       ))}
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Total Qty</p>
//                         <p className="text-base sm:text-lg font-bold text-gray-900">{totalQuantity} pcs</p>
//                       </div>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Unit Price</p>
//                         <p className="text-base sm:text-lg font-bold text-[#E39A65]">{formatPrice(applicableUnitPrice)}</p>
//                       </div>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg col-span-2">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Estimated Total</p>
//                         <p className="text-lg sm:text-xl font-bold text-[#E39A65]">{formatPrice(totalPrice)}</p>
//                       </div>
//                     </div>

//                     {totalQuantity < product.moq && totalQuantity > 0 && (
//                       <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                         <p className="text-xs sm:text-sm text-yellow-800">
//                           ⚠️ Need {product.moq - totalQuantity} more pieces to meet MOQ
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
//                         disabled={totalQuantity < product.moq || inquiryItems.length === 0}
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
//                 {relatedProducts.length > 4 && (
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

//                 {relatedProducts.length > 4 && (
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
//                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
//                   >
//                     {visibleProducts.map((product) => (
//                       <RelatedProductCard key={product._id} product={product} />
//                     ))}
//                   </motion.div>
//                 </div>

//                 {relatedProducts.length > 4 && (
//                   <div className="flex items-center justify-center gap-2 mt-6">
//                     {Array.from({ length: Math.ceil(relatedProducts.length / 4) }).map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           setCurrentIndex(index * 4);
//                           setIsHovered(true);
//                           setTimeout(() => setIsHovered(false), 3000);
//                         }}
//                         className={`h-2 rounded-full transition-all duration-300 ${
//                           Math.floor(currentIndex / 4) === index
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





// 2

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';
// import ClientSideMetadata from '@/app/components/shared/ClientSideMetadata';
// import { 
//   ChevronLeft, 
//   ShoppingCart, 
//   MessageCircle, 
//   Check, 
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
//   CheckCircle
// } from 'lucide-react';
// import Footer from '../../components/layout/Footer';
// import Navbar from '../../components/layout/Navbar';
// import AuthModal from '../../components/AuthModal';
// import ProductReviews from '../../components/product/ProductReviews';

// // Helper functions
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(price || 0);
// };

// const capitalizeFirst = (str) => {
//   if (!str) return '';
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// };

// const truncateText = (text, limit = 30) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const formatPriceNumber = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// // Rich Text Content Renderer
// const RichTextContent = ({ content, className = '' }) => {
//   if (!content) return <p className="text-gray-500 italic">No content available.</p>;

//   return (
//     <div 
//       className={`prose prose-sm sm:prose lg:prose-lg max-w-none rich-text-content ${className}`}
//       dangerouslySetInnerHTML={{ __html: content }}
//     />
//   );
// };

// // Image Gallery Component
// const ImageGallery = ({ images = [], productName }) => {
//   const [mainImage, setMainImage] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//       <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
//         {images.slice(0, 4).map((image, idx) => (
//           <button
//             key={idx}
//             onClick={() => setMainImage(idx)}
//             onMouseEnter={() => setMainImage(idx)}
//             className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
//               mainImage === idx 
//                 ? 'border-[#E39A65] shadow-md' 
//                 : 'border-gray-200 hover:border-gray-300'
//             }`}
//           >
//             <img
//               src={image.url}
//               alt={`${productName} - Thumbnail ${idx + 1}`}
//               className="w-full h-full object-cover"
//             />
//             {mainImage === idx && (
//               <div className="absolute inset-0 bg-[#E39A65]/10 flex items-center justify-center">
//                 <Check className="w-4 h-4 text-[#E39A65]" />
//               </div>
//             )}
//           </button>
//         ))}
//         {images.length > 4 && (
//           <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg bg-gray-100 flex items-center justify-center text-xs sm:text-sm text-gray-500">
//             +{images.length - 4}
//           </div>
//         )}
//       </div>

//       <div 
//         className="flex-1 relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden group cursor-zoom-in order-1 sm:order-2"
//         onMouseMove={handleMouseMove}
//       >
//         <img
//           src={images[mainImage]?.url || images[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image'}
//           alt={`${productName} - Main view`}
//           className="w-full h-[300px] sm:h-[320px] lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-150"
//           style={{
//             transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
//           }}
//         />
        
//         <button
//           onClick={() => setIsFullscreen(true)}
//           className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
//         >
//           <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//         </button>
//       </div>

//       {isFullscreen && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center mt-16">
//           <button
//             onClick={() => setIsFullscreen(false)}
//             className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
//           </button>
//           <img
//             src={images[mainImage]?.url || images[0]?.url}
//             alt={productName}
//             className="max-w-[95vw] max-h-[85vh] object-contain"
//           />
//         </div>
//       )}
//     </div>
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

// // Bulk Pricing Table Component
// const BulkPricingTable = ({ pricing = [], unitPrice, moq }) => {
//   const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];

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
//           <div className="flex items-center gap-3">
//             <div className="w-1 h-8 bg-gradient-to-b from-white to-amber-100 rounded-full"></div>
//             <div>
//               <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
//                 <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 Bulk Pricing
//               </h3>
//               <p className="text-xs text-white/80 mt-0.5">Volume discounts · Best rates</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-[#E39A65]/5">
//         <div className="w-full">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b-2 border-[#E39A65]/20">
//                 <th className="text-left py-3 px-2 sm:px-3 text-xs font-semibold text-gray-700">
//                   <div className="flex items-center gap-2">
//                     <Package className="w-4 h-4 text-[#E39A65]" />
//                     <span>Quantity</span>
//                   </div>
//                 </th>
//                 <th className="text-left py-3 px-2 sm:px-3 text-xs font-semibold text-gray-700">
//                   <div className="flex items-center gap-2">
//                     <DollarSign className="w-4 h-4 text-[#E39A65]" />
//                     <span>Price/Unit</span>
//                   </div>
//                 </th>
//                </tr>
//             </thead>
//             <tbody className="divide-y divide-[#E39A65]/10">
//               {pricingData.map((tier, index) => {
//                 const tierPrice = tier.price || unitPrice;
//                 const isBestValue = index === pricingData.length - 1 && pricingData.length > 1;

//                 return (
//                   <motion.tr 
//                     key={index}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ backgroundColor: '#fef2e6', scale: 1.01 }}
//                     className={`transition-all duration-200 ${isBestValue ? 'bg-[#E39A65]/5' : ''}`}
//                   >
//                     <td className="py-3 px-2 sm:px-3">
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm font-medium text-gray-900">
//                           {tier.range || `${moq}+`} pcs
//                         </span>
//                         {isBestValue && (
//                           <span className="px-2 py-0.5 bg-[#E39A65]/20 text-[#E39A65] text-[10px] font-medium rounded-full">
//                             Best Value
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="py-3 px-2 sm:px-3">
//                       <span className="font-bold text-[#E39A65] text-base">
//                         {formatPrice(tierPrice)}
//                       </span>
//                     </td>
//                   </motion.tr>
//                 );
//               })}
//             </tbody>
//            </table>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Key Attributes Component
// const KeyAttributes = ({ product }) => {
//   const attributes = [
//     { label: 'MOQ', value: `${product.moq} pieces` },
//     { label: 'Fabric', value: product.fabric || 'Standard' },
//     { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
//     { label: 'Available Sizes', value: product.sizes?.filter(s => s.trim()).slice(0, 5).join(', ') + (product.sizes?.length > 5 ? ` +${product.sizes.length - 5} more` : '') || 'Standard' },
//     ...(product.additionalInfo || []).map(info => ({
//       label: info.fieldName,
//       value: info.fieldValue
//     }))
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

// // Inquiry Item Component
// const InquiryItem = ({ item, index, product, onUpdate, onRemove, showRemove }) => {
//   const [sizeQuantities, setSizeQuantities] = useState(item.sizeQuantities || {});

//   useEffect(() => {
//     if (item.sizeQuantities) {
//       setSizeQuantities(item.sizeQuantities);
//     }
//   }, [item.sizeQuantities]);

//   const handleSizeQuantityChange = (size, quantity) => {
//     const newQuantities = { ...sizeQuantities, [size]: quantity };
//     setSizeQuantities(newQuantities);
    
//     const totalQty = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
    
//     onUpdate(item.id, 'sizeQuantities', newQuantities);
//     onUpdate(item.id, 'quantity', totalQty);
//   };

//   const getTotalForItem = () => {
//     return Object.values(sizeQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
//   };

//   const allSizes = product.sizes?.filter(s => s.trim()) || [];

//   return (
//     <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
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
//         {showRemove && (
//           <button
//             onClick={() => onRemove(item.id)}
//             className="p-1 hover:bg-red-100 rounded-lg transition-colors group"
//           >
//             <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 group-hover:text-red-600" />
//           </button>
//         )}
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
//         <span className="text-xs sm:text-sm text-gray-600">Item Total:</span>
//         <span className="text-xs sm:text-sm font-semibold text-[#E39A65]">{getTotalForItem()} pcs</span>
//       </div>
//     </div>
//   );
// };

// // Related Product Card Component
// const RelatedProductCard = ({ product }) => {
//   const productImages = product.images || [];
//   const [activeIndex, setActiveIndex] = useState(0);
//   const firstTier = product.quantityBasedPricing?.[0];
//   const primaryTag = product.tags?.[0];

//   const handleImageHover = (index) => {
//     setActiveIndex(index);
//   };

//   const handleImageLeave = () => {
//     setActiveIndex(0);
//   };

//   const getTagStyles = (tag) => {
//     const styles = {
//       'Top Ranking': 'bg-gradient-to-r from-amber-500 to-orange-500',
//       'New Arrival': 'bg-gradient-to-r from-blue-500 to-cyan-500',
//       'Top Deal': 'bg-gradient-to-r from-green-500 to-emerald-500',
//       'Best Seller': 'bg-gradient-to-r from-purple-500 to-pink-500',
//     };
//     return styles[tag] || 'bg-gradient-to-r from-gray-500 to-gray-600';
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       whileHover={{ y: -8 }}
//       onClick={() => window.location.href = `/product/${product._id}`}
//       className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
//     >
//       <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-gray-100">
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
        
//         <div className="absolute inset-0 bg-black/40 items-center justify-center gap-3 hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
//           <div onClick={(e) => { e.stopPropagation(); window.location.href = `/product/${product._id}`; }}>
//             <div className="bg-white rounded-full p-2.5 shadow-lg">
//               <Eye className="w-5 h-5 text-gray-700" />
//             </div>
//           </div>
//           <div onClick={(e) => { e.stopPropagation(); window.location.href = `/product/${product._id}#inquiry-form`; }}>
//             <div className="bg-[#E39A65] rounded-full p-2.5 shadow-lg">
//               <ShoppingCart className="w-5 h-5 text-white" />
//             </div>
//           </div>
//         </div>
        
//         <span className="absolute top-3 left-3 bg-[#E39A65] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium shadow-lg z-20">
//           {product.category?.name || 'Uncategorized'}
//         </span>
        
//         {primaryTag && (
//           <span className={`absolute top-3 right-3 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium shadow-lg z-20 ${getTagStyles(primaryTag)}`}>
//             {primaryTag}
//           </span>
//         )}
        
//         <span className="absolute bottom-3 right-3 bg-gray-900/90 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm shadow-lg z-20">
//           MOQ: {product.moq || 0}
//         </span>
//       </div>

//       {productImages.length > 1 && (
//         <div className="flex justify-center gap-1 py-2 px-2 bg-gray-50 border-t border-gray-100" onMouseLeave={handleImageLeave}>
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-md overflow-hidden transition-all duration-300 ${
//                 activeIndex === index ? 'ring-2 ring-[#E39A65] ring-offset-2 scale-110' : 'opacity-60 hover:opacity-100'
//               }`}
//               onMouseEnter={() => handleImageHover(index)}
//               onClick={(e) => { e.stopPropagation(); handleImageHover(index); }}
//             >
//               <img src={image.url} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//           {productImages.length > 4 && (
//             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gray-200 flex items-center justify-center text-[10px] text-gray-600">
//               +{productImages.length - 4}
//             </div>
//           )}
//         </div>
//       )}

//       <div className="p-4">
//         <div className="flex items-start justify-between gap-2 mb-2">
//           <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">{truncateText(product.productName, 25)}</h3>
//           <div className="flex-shrink-0 text-right">
//             <span className="text-base font-bold text-[#E39A65]">${formatPriceNumber(product.pricePerUnit)}</span>
//             <span className="text-gray-500 text-[8px] ml-1">/pc</span>
//           </div>
//         </div>

//         {product.colors && product.colors.length > 0 && (
//           <div className="flex items-center gap-1 mb-2">
//             {product.colors.slice(0, 4).map((color, i) => (
//               <div key={i} className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: color.code }} />
//             ))}
//             {product.colors.length > 4 && <span className="text-[8px] text-gray-400">+{product.colors.length - 4}</span>}
//           </div>
//         )}

//         {firstTier && (
//           <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-2 mb-3 border border-orange-100/80">
//             <div className="flex justify-between items-center text-[10px]">
//               <span className="text-gray-600 font-medium">{firstTier.range || 'Bulk'}</span>
//               <span className="font-bold text-[#E39A65]">${formatPriceNumber(firstTier.price)}/pc</span>
//             </div>
//           </div>
//         )}

//         <div onClick={(e) => { e.stopPropagation(); window.location.href = `/product/${product._id}#inquiry-form`; }}>
//           <div className="flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-all duration-300 cursor-pointer">
//             <ShoppingCart className="w-3 h-3" />
//             <span>Inquiry Now</span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Main Product Client Component
// export default function ProductClient() {
//   const params = useParams();
//   const router = useRouter();
//   const productId = params?.id;
  
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);
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

//   // Auto-play functionality
//   useEffect(() => {
//     if (relatedProducts.length <= 4) return;
    
//     const startAutoPlay = () => {
//       if (!isHovered) {
//         const autoPlayRef = setInterval(() => {
//           setCurrentIndex((prev) => prev + 4 >= relatedProducts.length ? 0 : prev + 4);
//         }, 5000);
//         return autoPlayRef;
//       }
//       return null;
//     };

//     const autoPlayRef = startAutoPlay();
//     return () => { if (autoPlayRef) clearInterval(autoPlayRef); };
//   }, [isHovered, relatedProducts.length]);

//   const handleNext = () => setCurrentIndex(prev => prev + 4 >= relatedProducts.length ? 0 : prev + 4);
//   const handlePrev = () => setCurrentIndex(prev => prev - 4 < 0 ? Math.max(relatedProducts.length - 4, 0) : prev - 4);
//   const visibleProducts = relatedProducts.slice(currentIndex, currentIndex + 4);

//   // Scroll to inquiry form if hash present
//   useEffect(() => {
//     if (window.location.hash === '#inquiry-form') {
//       const attemptScroll = (retries = 0) => {
//         const formElement = document.getElementById('inquiry-form');
//         if (formElement) {
//           const yOffset = -100;
//           const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
//           window.scrollTo({ top: y, behavior: 'smooth' });
//           formElement.classList.add('ring-4', 'ring-[#E39A65]/20', 'transition-all', 'duration-1000');
//           setTimeout(() => formElement.classList.remove('ring-4', 'ring-[#E39A65]/20'), 2000);
//         } else if (retries < 10) {
//           setTimeout(() => attemptScroll(retries + 1), 300);
//         }
//       };
//       setTimeout(attemptScroll, 500);
//     }
//   }, []);

//   // Check authentication status
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
//     toast.success('Successfully logged in!');
//   };

//   // Fetch product
//   const fetchProduct = async () => {
//     setLoading(true);
//     setNotFound(false);
//     try {
//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/products/${productId}`);
//       const data = await response.json();
      
//       if (data.success && data.data) {
//         setProduct(data.data);
//         if (data.data.colors && data.data.colors.length > 0) {
//           setSelectedColor(data.data.colors[0]);
//         }
//         setInquiryItems([]);
//         fetchRelatedProducts(data.data.category?._id || data.data.category, data.data.targetedCustomer);
//       } else {
//         setNotFound(true);
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       setNotFound(true);
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
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success && data.data.items) {
//         const existingItem = data.data.items.find(item => item.productId === product._id || item.productId === product.id);
//         setIsInCart(!!existingItem);
//         if (existingItem) setCartItemDetails(existingItem);
//       }
//     } catch (error) {
//       console.error('Error checking cart:', error);
//     }
//   };

//   useEffect(() => {
//     if (productId) fetchProduct();
//   }, [productId]);

//   useEffect(() => {
//     if (product && isAuthenticated) checkIfInCart();
//     else { setIsInCart(false); setCartItemDetails(null); }
//   }, [product, isAuthenticated]);

//   useEffect(() => {
//     const handleCartUpdate = () => { if (product && isAuthenticated) checkIfInCart(); };
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [product, isAuthenticated]);

//   useEffect(() => {
//     if (!product) return;
//     const totalQty = inquiryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
//     setTotalQuantity(totalQty);
//   }, [inquiryItems, product]);

//   useEffect(() => {
//     if (!product || totalQuantity === 0) { setTotalPrice(0); return; }

//     let unitPrice = product.pricePerUnit;
//     if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
//       const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//         const aMin = parseInt(a.range.split('-')[0]);
//         const bMin = parseInt(b.range.split('-')[0]);
//         return aMin - bMin;
//       });
      
//       let matchedTier = null;
//       for (const tier of sortedTiers) {
//         const range = tier.range;
//         if (range.includes('-')) {
//           const [min, max] = range.split('-').map(Number);
//           if (totalQuantity >= min && totalQuantity <= max) { matchedTier = tier; break; }
//         } else if (range.includes('+')) {
//           const minQty = parseInt(range.replace('+', ''));
//           if (totalQuantity >= minQty) { matchedTier = tier; break; }
//         }
//       }
//       if (matchedTier) unitPrice = matchedTier.price;
//     }
//     setTotalPrice(unitPrice * totalQuantity);
//   }, [totalQuantity, product]);

//   const getApplicableUnitPrice = () => {
//     if (!product || totalQuantity === 0) return product?.pricePerUnit || 0;
//     let unitPrice = product.pricePerUnit;
//     if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
//       const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//         const aMin = parseInt(a.range.split('-')[0]);
//         const bMin = parseInt(b.range.split('-')[0]);
//         return aMin - bMin;
//       });
      
//       for (const tier of sortedTiers) {
//         const range = tier.range;
//         if (range.includes('-')) {
//           const [min, max] = range.split('-').map(Number);
//           if (totalQuantity >= min && totalQuantity <= max) { unitPrice = tier.price; break; }
//         } else if (range.includes('+')) {
//           const minQty = parseInt(range.replace('+', ''));
//           if (totalQuantity >= minQty) { unitPrice = tier.price; break; }
//         }
//       }
//     }
//     return unitPrice;
//   };

//   const applicableUnitPrice = getApplicableUnitPrice();

//   const handleAddItem = () => {
//     if (!selectedColor) { toast.error('Please select a color'); return; }
//     const initialSizeQuantities = {};
//     product.sizes?.filter(s => s.trim()).forEach(size => { initialSizeQuantities[size] = 0; });
//     setInquiryItems(prev => [...prev, {
//       id: Date.now(),
//       color: selectedColor,
//       sizeQuantities: initialSizeQuantities,
//       quantity: 0
//     }]);
//     toast.success('Color added. Enter quantities for each size.');
//   };

//   const handleUpdateItem = (id, field, value) => {
//     setInquiryItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
//   };

//   const handleRemoveItem = (id) => {
//     if (inquiryItems.length > 1) {
//       setInquiryItems(prev => prev.filter(item => item.id !== id));
//       toast.success('Item removed');
//     } else {
//       setInquiryItems([]);
//       toast.success('Item removed');
//     }
//   };

//   const handleSubmitInquiry = async () => {
//     if (!isAuthenticated) {
//       setAuthModalTab('login');
//       setShowAuthModal(true);
//       toast.info('Please login to submit an inquiry');
//       return;
//     }

//     if (inquiryItems.length === 0) { toast.error('Please add at least one color'); return; }

//     const hasQuantities = inquiryItems.some(item => {
//       const total = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       return total > 0;
//     });
//     if (!hasQuantities) { toast.error('Please enter quantities for at least one size'); return; }

//     const calculatedTotalQuantity = inquiryItems.reduce((total, item) => {
//       const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       return total + itemTotal;
//     }, 0);

//     if (calculatedTotalQuantity < product.moq) {
//       toast.error(`Total quantity must be at least ${product.moq} pieces (currently ${calculatedTotalQuantity})`);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const colorsData = inquiryItems.map(item => {
//         const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//         return { color: item.color, sizeQuantities: item.sizeQuantities, totalQuantity: colorTotal };
//       }).filter(item => item.totalQuantity > 0);

//       const cartItem = {
//         productId: product._id,
//         productName: product.productName,
//         colors: colorsData,
//         totalQuantity: calculatedTotalQuantity,
//         unitPrice: applicableUnitPrice,
//         moq: product.moq,
//         productImage: product.images?.[0]?.url,
//         specialInstructions: specialInstructions
//       };

//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/add', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify(cartItem)
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`${colorsData.length} color(s) added! Total: ${calculatedTotalQuantity} pcs`);
//         setInquiryItems([]);
//         setSpecialInstructions('');
//         setIsInCart(true);
//         checkIfInCart();
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart');
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       toast.error('Failed to add items to cart');
//     }
//   };

//   const handleWhatsAppInquiry = () => {
//     if (!isAuthenticated) {
//       setAuthModalTab('login');
//       setShowAuthModal(true);
//       toast.info('Please login to send WhatsApp inquiry');
//       return;
//     }

//     if (inquiryItems.length === 0) { toast.error('Please add items to inquiry'); return; }

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
//     message += `• MOQ: ${product.moq} pieces\n\n`;
    
//     message += `*🛒 INQUIRY ITEMS*\n`;
//     inquiryItems.forEach((item, index) => {
//       message += `\n*Item ${index + 1} - Color: ${item.color?.code || 'N/A'}*\n`;
//       Object.entries(item.sizeQuantities || {}).forEach(([size, qty]) => {
//         if (qty && qty > 0) message += `  • Size ${size}: ${qty} pcs\n`;
//       });
//       const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       message += `  *Item Total:* ${itemTotal} pcs\n`;
//     });
    
//     message += `\n*📊 ORDER SUMMARY*\n`;
//     message += `• Total Quantity: ${totalQuantity} pieces\n`;
//     message += `• Unit Price: ${formatPrice(applicableUnitPrice)}\n`;
//     message += `• Estimated Total: ${formatPrice(totalPrice)}\n`;
//     if (specialInstructions) message += `\n*📝 SPECIAL INSTRUCTIONS*\n${specialInstructions}\n`;
//     message += `\n*🕐 Inquiry sent:* ${new Date().toLocaleString()}\n`;

//     const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685';
//     const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
//     window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
//     toast.success('WhatsApp chat opened!');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="container mx-auto px-4 max-w-7xl py-8 mt-16">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//               <div className="lg:col-span-5"><div className="bg-gray-200 rounded-xl h-[500px]"></div></div>
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

//   if (notFound || !product) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-[60vh] px-4">
//           <div className="text-center">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
//             <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
//             <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors">
//               Browse Products
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* ClientSideMetadata for dynamic SEO */}
//       <ClientSideMetadata
//         title={product.metaSettings?.metaTitle || `${product.productName} - Asian Clothify`}
//         description={product.metaSettings?.metaDescription || `Shop ${product.productName}. ${product.fabric || 'Premium quality'} clothing. MOQ: ${product.moq} pieces.`}
//         canonical={`/product/${productId}`}
//         image={product.images?.[0]?.url}
//       />
      
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 mt-16 sm:mt-20">
//         {/* Breadcrumb */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="container mx-auto px-4 max-w-7xl py-3 sm:py-4">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <button
//                 onClick={() => router.back()}
//                 className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
//               >
//                 <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//               </button>
              
//               <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap pb-0.5 flex-1">
//                 <Link href="/" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Home</Link>
//                 <span className="flex-shrink-0">/</span>
//                 <Link href="/products" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Products</Link>
//                 <span className="flex-shrink-0">/</span>
//                 <span className="text-gray-900 font-medium truncate">{product.productName}</span>
//               </div>
//             </div>
//           </div>
//         </div>

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
//               <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
//                 <div className="mb-3 sm:mb-4">
//                   <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 pb-3 border-b border-gray-100">
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center justify-center w-7 h-7 bg-[#E39A65]/10 rounded-lg">
//                         <Package className="w-3.5 h-3.5 text-[#E39A65]" />
//                       </div>
//                       <div>
//                         <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">Category</span>
//                         <span className="text-xs font-semibold text-gray-900">{product.category?.name || 'Uncategorized'}</span>
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
//                         <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">MOQ</span>
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
//                         <span className="text-xs sm:text-sm text-gray-600">MOQ</span>
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
//                             <span key={index} className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 rounded-lg">
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
//               </div>

//               {/* Inquiry Form Card */}
//               <div id="inquiry-form" className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
//                   <h2 className="text-base sm:text-lg font-semibold text-gray-900">Create Your Inquiry</h2>
//                   {totalQuantity > 0 && <span className="text-xs sm:text-sm text-gray-500">{totalQuantity} total pcs</span>}
//                 </div>
                
//                 {product.colors && product.colors.length > 0 && (
//                   <div className="mb-3 sm:mb-4">
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Select Color to Add</label>
//                     <ColorSelector colors={product.colors} selectedColor={selectedColor} onChange={setSelectedColor} />
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
//                         <p className="text-xs sm:text-sm font-medium text-green-800">✓ This product is already in your inquiry cart</p>
//                         <p className="text-[10px] sm:text-xs text-green-600 mt-1">You can view or modify it in your cart</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {product.sizes?.filter(s => s.trim()).length > 0 && !isInCart && (
//                   <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
//                     <p className="text-[10px] sm:text-xs text-blue-700">
//                       <span className="font-medium">Available Sizes:</span> {product.sizes.filter(s => s.trim()).join(', ')}
//                     </p>
//                     <p className="text-[10px] sm:text-xs text-blue-600 mt-1">Enter quantities for each size under each color item</p>
//                   </div>
//                 )}

//                 {!isInCart && inquiryItems.length > 0 && (
//                   <>
//                     <h3 className="text-sm sm:text-md font-semibold text-gray-900 mb-2 sm:mb-3">Your Items</h3>
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
//                         />
//                       ))}
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Total Qty</p>
//                         <p className="text-base sm:text-lg font-bold text-gray-900">{totalQuantity} pcs</p>
//                       </div>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Unit Price</p>
//                         <p className="text-base sm:text-lg font-bold text-[#E39A65]">{formatPrice(applicableUnitPrice)}</p>
//                       </div>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg col-span-2">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Estimated Total</p>
//                         <p className="text-lg sm:text-xl font-bold text-[#E39A65]">{formatPrice(totalPrice)}</p>
//                       </div>
//                     </div>

//                     {totalQuantity < product.moq && totalQuantity > 0 && (
//                       <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                         <p className="text-xs sm:text-sm text-yellow-800">⚠️ Need {product.moq - totalQuantity} more pieces to meet MOQ</p>
//                       </div>
//                     )}

//                     <div className="mb-3 sm:mb-4">
//                       <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Special Instructions</label>
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
//                       <Link href="/inquiry-cart" className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-green-700 transition-colors">
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
//                         disabled={totalQuantity < product.moq || inquiryItems.length === 0}
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
//                     <p className="text-xs sm:text-sm text-gray-500">Select a color and click "Add Selected Color" to start building your inquiry</p>
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
//                       activeTab === tab ? 'border-[#E39A65] text-[#E39A65]' : 'border-transparent text-gray-500 hover:text-gray-700'
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
//                 <BulkPricingTable pricing={product.quantityBasedPricing} unitPrice={product.pricePerUnit} moq={product.moq} />
//               )}
//               {activeTab === 'shipping' && <ShippingInfo />}
//               {activeTab === 'reviews' && <ProductReviews productId={product._id} />}
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
//                   <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Related Products</h2>
//                 </div>
//                 <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E39A65] transition-colors group bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100">
//                   <span>Browse all products</span>
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </div>

//               <div className="relative px-4 sm:px-8 md:px-10">
//                 {relatedProducts.length > 4 && (
//                   <button onClick={handlePrev} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-[#E39A65] hover:text-white hover:border-[#E39A65] transition-all duration-300 flex items-center justify-center opacity-60 hover:opacity-100">
//                     <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
//                   </button>
//                 )}

//                 {relatedProducts.length > 4 && (
//                   <button onClick={handleNext} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-[#E39A65] hover:text-white hover:border-[#E39A65] transition-all duration-300 flex items-center justify-center opacity-60 hover:opacity-100">
//                     <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
//                   </button>
//                 )}

//                 <div className="overflow-hidden">
//                   <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
//                     {visibleProducts.map((product) => (
//                       <RelatedProductCard key={product._id} product={product} />
//                     ))}
//                   </motion.div>
//                 </div>

//                 {relatedProducts.length > 4 && (
//                   <div className="flex items-center justify-center gap-2 mt-6">
//                     {Array.from({ length: Math.ceil(relatedProducts.length / 4) }).map((_, index) => (
//                       <button key={index} onClick={() => { setCurrentIndex(index * 4); setIsHovered(true); setTimeout(() => setIsHovered(false), 3000); }} className={`h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / 4) === index ? 'w-8 bg-[#E39A65]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* WhatsApp Floating Button */}
//         <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
//           <button onClick={handleWhatsAppInquiry} disabled={inquiryItems.length === 0} className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
//             <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//           </button>
//         </div>

//         {/* Auth Modal */}
//         <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialTab={authModalTab} onAuthSuccess={handleAuthSuccess} />
//       </div>
//       <Footer />

//       <style jsx global>{`
//         .rich-text-content { color: #374151; line-height: 1.6; }
//         .rich-text-content h1 { font-size: 2em; margin: 0.5em 0; font-weight: 600; color: #111827; }
//         .rich-text-content h2 { font-size: 1.5em; margin: 0.5em 0; font-weight: 600; color: #111827; }
//         .rich-text-content p { margin: 0.75em 0; }
//         .rich-text-content ul { list-style-type: disc; padding-left: 1.5em; margin: 0.5em 0; }
//         .rich-text-content a { color: #2563eb; text-decoration: none; font-weight: 500; }
//         .rich-text-content a:hover { text-decoration: underline; color: #1d4ed8; }
//         .rich-text-content strong { font-weight: 600; color: #111827; }
//         .rich-text-preview { color: #6b7280; line-height: 1.5; }
//       `}</style>
//     </>
//   );
// }




// // working
// // src/app/product/[id]/ProductClient.js
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';
// import { 
//   ChevronLeft, 
//   ShoppingCart, 
//   MessageCircle, 
//   Check, 
//   Loader2,
//   Package,
//   Users,
//   Ruler,
//   Palette,
//   Info,
//   FileText,
//   Truck,
//   Shield,
//   Clock,
//   Share2,
//   Heart,
//   Maximize2,
//   Minus,
//   Plus,
//   CheckCircle,
//   X,
//   Trash2,
//   ChevronRight,
//   Star,
//   Eye,
//   AlertCircle,
//   DollarSign,
//   TrendingUp,
//   Sparkles,
//   BookOpen
// } from 'lucide-react';

// import Navbar from '@/app/components/layout/Navbar';
// import Footer from '@/app/components/layout/Footer';
// import AuthModal from '@/app/components/AuthModal';
// import ProductReviews from '@/app/components/product/ProductReviews';

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

// // Helper function to format price without currency symbol
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

// // Loading Skeleton Component
// const ProductDetailsSkeleton = () => (
//   <div className="min-h-screen bg-gray-50">
//     <Navbar />
//     <div className="container mx-auto px-4 max-w-7xl py-4 sm:py-6 md:py-8 mt-16 sm:mt-20">
//       <div className="h-4 bg-gray-200 rounded w-32 sm:w-48 mb-4 sm:mb-6 animate-pulse"></div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
//         <div className="lg:col-span-5">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
//               {[1, 2, 3, 4].map(i => (
//                 <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-lg animate-pulse"></div>
//               ))}
//             </div>
//             <div className="flex-1 bg-gray-200 rounded-xl sm:rounded-2xl h-[300px] sm:h-[400px] lg:h-[500px] animate-pulse order-1 sm:order-2"></div>
//           </div>
//         </div>
//         <div className="lg:col-span-7 space-y-4 sm:space-y-6">
//           <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
//           <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
//           <div className="h-16 sm:h-20 bg-gray-200 rounded animate-pulse"></div>
//           <div className="h-48 sm:h-56 lg:h-64 bg-gray-200 rounded animate-pulse"></div>
//           <div className="h-40 sm:h-44 lg:h-48 bg-gray-200 rounded animate-pulse"></div>
//         </div>
//       </div>
//     </div>
//     <Footer />
//   </div>
// );

// // Image Gallery Component
// const ImageGallery = ({ images = [], productName }) => {
//   const [mainImage, setMainImage] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [showZoom, setShowZoom] = useState(false);

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//       {/* Thumbnails */}
//       <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
//         {images.slice(0, 4).map((image, idx) => (
//           <button
//             key={idx}
//             onClick={() => setMainImage(idx)}
//             onMouseEnter={() => setMainImage(idx)}
//             className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
//               mainImage === idx 
//                 ? 'border-[#E39A65] shadow-md' 
//                 : 'border-gray-200 hover:border-gray-300'
//             }`}
//           >
//             <img
//               src={image.url}
//               alt={`${productName} - Thumbnail ${idx + 1}`}
//               className="w-full h-full object-cover"
//             />
//             {mainImage === idx && (
//               <div className="absolute inset-0 bg-[#E39A65]/10 flex items-center justify-center">
//                 <Check className="w-4 h-4 text-[#E39A65]" />
//               </div>
//             )}
//           </button>
//         ))}
//         {images.length > 4 && (
//           <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg bg-gray-100 flex items-center justify-center text-xs sm:text-sm text-gray-500">
//             +{images.length - 4}
//           </div>
//         )}
//       </div>

//       {/* Main Image */}
//       <div 
//         className="flex-1 relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden group cursor-zoom-in order-1 sm:order-2"
//         onMouseEnter={() => setShowZoom(true)}
//         onMouseLeave={() => setShowZoom(false)}
//         onMouseMove={handleMouseMove}
//       >
//         <img
//           src={images[mainImage]?.url || images[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image'}
//           alt={`${productName} - Main view`}
//           className="w-full h-[300px] sm:h-[320px] lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-150"
//           style={{
//             transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
//           }}
//         />
        
//         <button
//           onClick={() => setIsFullscreen(true)}
//           className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
//         >
//           <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Fullscreen Modal */}
//       {isFullscreen && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center mt-16">
//           <button
//             onClick={() => setIsFullscreen(false)}
//             className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
//           </button>
//           <img
//             src={images[mainImage]?.url || images[0]?.url}
//             alt={productName}
//             className="max-w-[95vw] max-h-[85vh] object-contain"
//           />
//         </div>
//       )}
//     </div>
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

// // Bulk Pricing Table Component
// const BulkPricingTable = ({ pricing = [], unitPrice, moq }) => {
//   const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];

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
//                   Bulk Pricing
//                 </h3>
//                 <p className="text-xs text-white/80 mt-0.5">Volume discounts · Best wholesale rates</p>
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
//                     <span>Quantity</span>
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
//               {pricingData.map((tier, index) => {
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
//               <span className="whitespace-nowrap">Discounts</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Key Attributes Component
// const KeyAttributes = ({ product }) => {
//   const attributes = [
//     { label: 'MOQ', value: `${product.moq} pieces` },
//     { label: 'Fabric', value: product.fabric || 'Standard' },
//     { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
//     { label: 'Available Sizes', value: product.sizes?.filter(s => s.trim()).slice(0, 5).join(', ') + (product.sizes?.length > 5 ? ` +${product.sizes.length - 5} more` : '') || 'Standard' },
//     ...(product.additionalInfo || []).map(info => ({
//       label: info.fieldName,
//       value: info.fieldValue
//     }))
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

// // Inquiry Item Component
// const InquiryItem = ({ item, index, product, onUpdate, onRemove, showRemove }) => {
//   const [sizeQuantities, setSizeQuantities] = useState(item.sizeQuantities || {});

//   useEffect(() => {
//     if (item.sizeQuantities) {
//       setSizeQuantities(item.sizeQuantities);
//     }
//   }, [item.sizeQuantities]);

//   const handleSizeQuantityChange = (size, quantity) => {
//     const newQuantities = { ...sizeQuantities, [size]: quantity };
//     setSizeQuantities(newQuantities);
    
//     const totalQty = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
    
//     onUpdate(item.id, 'sizeQuantities', newQuantities);
//     onUpdate(item.id, 'quantity', totalQty);
//   };

//   const getTotalForItem = () => {
//     return Object.values(sizeQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
//   };

//   const allSizes = product.sizes?.filter(s => s.trim()) || [];

//   return (
//     <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
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
//         {showRemove && (
//           <button
//             onClick={() => onRemove(item.id)}
//             className="p-1 hover:bg-red-100 rounded-lg transition-colors group"
//             title="Remove item"
//           >
//             <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 group-hover:text-red-600" />
//           </button>
//         )}
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
//         <span className="text-xs sm:text-sm text-gray-600">Item Total:</span>
//         <span className="text-xs sm:text-sm font-semibold text-[#E39A65]">{getTotalForItem()} pcs</span>
//       </div>
//     </div>
//   );
// };

// // Related Product Card Component
// const RelatedProductCard = ({ product }) => {
//   const productImages = product.images || [];
//   const [activeIndex, setActiveIndex] = useState(0);
//   const hasMultipleImages = productImages.length > 1;
//   const firstTier = product.quantityBasedPricing?.[0];
//   const primaryTag = product.tags?.[0];

//   const handleImageHover = (index) => {
//     setActiveIndex(index);
//   };

//   const handleImageLeave = () => {
//     setActiveIndex(0);
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
//       onClick={() => window.location.href = `/product/${product._id}`}
//       className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
//     >
//       <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-gray-100">
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
        
//         <motion.div 
//           className="absolute inset-0 bg-black/40 items-center justify-center gap-3 
//                      hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
//           initial={{ opacity: 0 }}
//           whileHover={{ opacity: 1 }}
//         >
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/product/${product._id}`;
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
//               window.location.href = `/product/${product._id}#inquiry-form`;
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

//         <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3 sm:hidden z-30">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/product/${product._id}`;
//             }}
//             className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-transform"
//           >
//             <Eye className="w-4 h-4 text-gray-700" />
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               window.location.href = `/product/${product._id}#inquiry-form`;
//             }}
//             className="bg-[#E39A65]/90 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-transform"
//           >
//             <ShoppingCart className="w-4 h-4 text-white" />
//           </button>
//         </div>
        
//         <motion.span 
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="absolute top-3 left-3 bg-[#E39A65] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium shadow-lg z-20"
//         >
//           {product.category?.name || 'Uncategorized'}
//         </motion.span>
        
//         {primaryTag && (
//           <motion.span 
//             initial={{ x: 20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className={`absolute top-3 right-3 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium shadow-lg z-20 ${getTagStyles(primaryTag)}`}
//           >
//             {primaryTag}
//           </motion.span>
//         )}
        
//         <motion.span 
//           initial={{ x: 20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="absolute bottom-3 right-3 bg-gray-900/90 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm shadow-lg z-20"
//         >
//           MOQ: {product.moq || 0}
//         </motion.span>

//         {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
//           <motion.span 
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="absolute bottom-3 left-3 bg-black/50 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full backdrop-blur-sm z-20"
//           >
//             {capitalizeFirst(product.targetedCustomer)}
//           </motion.span>
//         )}
//       </div>

//       {hasMultipleImages && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="flex justify-center gap-1 py-2 px-2 bg-gray-50 border-t border-gray-100"
//           onMouseLeave={handleImageLeave}
//         >
//           {productImages.slice(0, 4).map((image, index) => (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-md overflow-hidden transition-all duration-300 ${
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
//           {productImages.length > 4 && (
//             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gray-200 flex items-center justify-center text-[10px] sm:text-xs text-gray-600 font-medium">
//               +{productImages.length - 4}
//             </div>
//           )}
//         </motion.div>
//       )}

//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.7 }}
//         className="p-4"
//       >
//         <div className="flex items-start justify-between gap-2 mb-2">
//           <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1" title={product.productName}>
//             {truncateText(product.productName, 25)}
//           </h3>
//           <div className="flex-shrink-0 text-right">
//             <span className="text-base font-bold text-[#E39A65]">
//               ${formatPriceNumber(product.pricePerUnit)}
//             </span>
//             <span className="text-gray-500 text-[8px] ml-1">/pc</span>
//           </div>
//         </div>

//         {product.colors && product.colors.length > 0 && (
//           <div className="flex items-center gap-1 mb-2">
//             {product.colors.slice(0, 4).map((color, i) => (
//               <div
//                 key={i}
//                 className="w-4 h-4 rounded-full border border-white shadow-sm"
//                 style={{ backgroundColor: color.code }}
//                 title={color.name || color.code}
//               />
//             ))}
//             {product.colors.length > 4 && (
//               <span className="text-[8px] text-gray-400">+{product.colors.length - 4}</span>
//             )}
//           </div>
//         )}

//         {firstTier && (
//           <motion.div 
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-2 mb-3 border border-orange-100/80"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center text-[10px]">
//               <span className="text-gray-600 font-medium">{firstTier.range || 'Bulk'}</span>
//               <span className="font-bold text-[#E39A65]">${formatPriceNumber(firstTier.price)}/pc</span>
//             </div>
//           </motion.div>
//         )}

//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={(e) => {
//             e.stopPropagation();
//             window.location.href = `/product/${product._id}#inquiry-form`;
//           }}
//         >
//           <div className="flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-all duration-300 hover:shadow-md relative overflow-hidden cursor-pointer">
//             <ShoppingCart className="w-3 h-3" />
//             <span>Inquiry Now</span>
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Main Product Content Component
// export default function ProductClient({ product: initialProduct }) {
//   const router = useRouter();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const autoPlayRef = useRef(null);
  
//   const [product, setProduct] = useState(initialProduct);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [inquiryItems, setInquiryItems] = useState([]);
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [specialInstructions, setSpecialInstructions] = useState('');
//   const [activeTab, setActiveTab] = useState('attributes');
  
//   // Auth state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authModalTab, setAuthModalTab] = useState('login');
  
//   // Cart check state
//   const [isInCart, setIsInCart] = useState(false);
//   const [cartItemDetails, setCartItemDetails] = useState(null);

//   // Initialize selected color
//   useEffect(() => {
//     if (product?.colors && product.colors.length > 0 && !selectedColor) {
//       setSelectedColor(product.colors[0]);
//     }
//   }, [product]);

//   // Auto-play functionality
//   useEffect(() => {
//     if (relatedProducts.length <= 4) return;
    
//     const startAutoPlay = () => {
//       if (!isHovered) {
//         autoPlayRef.current = setInterval(() => {
//           setCurrentIndex((prev) => 
//             prev + 4 >= relatedProducts.length ? 0 : prev + 4
//           );
//         }, 5000);
//       }
//     };

//     startAutoPlay();

//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isHovered, relatedProducts.length]);

//   const handleNext = () => {
//     setCurrentIndex((prev) => 
//       prev + 4 >= relatedProducts.length ? 0 : prev + 4
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => 
//       prev - 4 < 0 ? Math.max(relatedProducts.length - 4, 0) : prev - 4
//     );
//   };

//   const visibleProducts = relatedProducts.slice(currentIndex, currentIndex + 4);

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

//   // Fetch related products
//   useEffect(() => {
//     if (product) {
//       fetchRelatedProducts(product.category?._id || product.category, product.targetedCustomer);
//     }
//   }, [product]);

//   // Check cart status
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

//   const fetchRelatedProducts = async (categoryId, targetedCustomer) => {
//     try {
//       const queryParams = new URLSearchParams();
//       queryParams.append('limit', 8);
//       if (categoryId) queryParams.append('category', categoryId);
//       if (targetedCustomer) queryParams.append('targetedCustomer', targetedCustomer);
      
//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/products?${queryParams.toString()}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = (data.data || []).filter(p => p._id !== product._id);
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
//     if (!product) return;
//     const totalQty = inquiryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
//     setTotalQuantity(totalQty);
//   }, [inquiryItems, product]);

//   useEffect(() => {
//     if (!product || totalQuantity === 0) {
//       setTotalPrice(0);
//       return;
//     }

//     let unitPrice = product.pricePerUnit;
    
//     if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
//       const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//         const aMin = parseInt(a.range.split('-')[0]);
//         const bMin = parseInt(b.range.split('-')[0]);
//         return aMin - bMin;
//       });
      
//       let matchedTier = null;
      
//       for (const tier of sortedTiers) {
//         const range = tier.range;
        
//         if (range.includes('-')) {
//           const [min, max] = range.split('-').map(Number);
//           if (totalQuantity >= min && totalQuantity <= max) {
//             matchedTier = tier;
//             break;
//           }
//         }
//         else if (range.includes('+')) {
//           const minQty = parseInt(range.replace('+', ''));
//           if (totalQuantity >= minQty) {
//             matchedTier = tier;
//             break;
//           }
//         }
//       }
      
//       if (matchedTier) {
//         unitPrice = matchedTier.price;
//       } else {
//         const highestTier = sortedTiers[sortedTiers.length - 1];
//         if (highestTier.range.includes('-') && totalQuantity > parseInt(highestTier.range.split('-')[1])) {
//           unitPrice = highestTier.price;
//         }
//       }
//     }

//     const total = unitPrice * totalQuantity;
//     setTotalPrice(total);
//   }, [totalQuantity, product]);

//   const getApplicableUnitPrice = () => {
//     if (!product || totalQuantity === 0) return product?.pricePerUnit || 0;
    
//     let unitPrice = product.pricePerUnit;
    
//     if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
//       const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//         const aMin = parseInt(a.range.split('-')[0]);
//         const bMin = parseInt(b.range.split('-')[0]);
//         return aMin - bMin;
//       });
      
//       let matchedTier = null;
      
//       for (const tier of sortedTiers) {
//         const range = tier.range;
        
//         if (range.includes('-')) {
//           const [min, max] = range.split('-').map(Number);
//           if (totalQuantity >= min && totalQuantity <= max) {
//             matchedTier = tier;
//             unitPrice = tier.price;
//             break;
//           }
//         }
//         else if (range.includes('+')) {
//           const minQty = parseInt(range.replace('+', ''));
//           if (totalQuantity >= minQty) {
//             matchedTier = tier;
//             unitPrice = tier.price;
//             break;
//           }
//         }
//       }
      
//       if (!matchedTier) {
//         const highestTier = sortedTiers[sortedTiers.length - 1];
//         if (highestTier.range.includes('-') && totalQuantity > parseInt(highestTier.range.split('-')[1])) {
//           unitPrice = highestTier.price;
//         }
//       }
//     }
    
//     return unitPrice;
//   };

//   const applicableUnitPrice = getApplicableUnitPrice();

//   const handleAddItem = () => {
//     if (!selectedColor) {
//       toast.error('Please select a color');
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
//       quantity: 0
//     }]);

//     toast.success('Color added. Enter quantities for each size.');
//   };

//   const handleUpdateItem = (id, field, value) => {
//     setInquiryItems(prev => prev.map(item => 
//       item.id === id ? { ...item, [field]: value } : item
//     ));
//   };

//   const handleRemoveItem = (id) => {
//     if (inquiryItems.length > 1) {
//       setInquiryItems(prev => prev.filter(item => item.id !== id));
//       toast.success('Item removed');
//     } else if (inquiryItems.length === 1) {
//       setInquiryItems([]);
//       toast.success('Item removed');
//     }
//   };

//   const handleSubmitInquiry = async () => {
//     if (!isAuthenticated) {
//       setAuthModalTab('login');
//       setShowAuthModal(true);
//       toast.info('Please login to submit an inquiry');
//       return;
//     }

//     if (inquiryItems.length === 0) {
//       toast.error('Please add at least one color');
//       return;
//     }

//     const hasQuantities = inquiryItems.some(item => {
//       const total = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       return total > 0;
//     });

//     if (!hasQuantities) {
//       toast.error('Please enter quantities for at least one size');
//       return;
//     }

//     const calculatedTotalQuantity = inquiryItems.reduce((total, item) => {
//       const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       return total + itemTotal;
//     }, 0);

//     if (calculatedTotalQuantity < product.moq) {
//       toast.error(`Total quantity must be at least ${product.moq} pieces (currently ${calculatedTotalQuantity})`);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
      
//       const colorsData = inquiryItems.map(item => {
//         const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
        
//         return {
//           color: item.color,
//           sizeQuantities: item.sizeQuantities,
//           totalQuantity: colorTotal
//         };
//       }).filter(item => item.totalQuantity > 0);

//       const cartItem = {
//         productId: product._id,
//         productName: product.productName,
//         colors: colorsData,
//         totalQuantity: calculatedTotalQuantity,
//         unitPrice: applicableUnitPrice,
//         moq: product.moq,
//         productImage: product.images?.[0]?.url,
//         specialInstructions: specialInstructions
//       };

//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/add', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(cartItem)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`${colorsData.length} color(s) added for ${product.productName}! Total: ${calculatedTotalQuantity} pcs`);
        
//         setInquiryItems([]);
//         setSpecialInstructions('');
        
//         setIsInCart(true);
//         checkIfInCart();
        
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart');
//       }
      
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       toast.error('Failed to add items to cart');
//     }
//   };

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
//     message += `• MOQ: ${product.moq} pieces\n\n`;
    
//     message += `*🛒 INQUIRY ITEMS*\n`;
    
//     inquiryItems.forEach((item, index) => {
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
      
//       const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       message += `  *Item Total:* ${itemTotal} pcs\n`;
//     });
    
//     message += `\n*📊 ORDER SUMMARY*\n`;
//     message += `• Total Quantity: ${totalQuantity} pieces\n`;
//     message += `• Unit Price: ${formatPrice(applicableUnitPrice)}\n`;
//     message += `• Estimated Total: ${formatPrice(totalPrice)}\n`;
    
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

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
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
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 mt-16 sm:mt-20">
//         {/* Breadcrumb */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="container mx-auto px-4 max-w-7xl py-3 sm:py-4">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <button
//                 onClick={() => router.back()}
//                 className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
//                 aria-label="Go back"
//               >
//                 <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//               </button>
              
//               <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap pb-0.5 flex-1">
//                 <Link href="/" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Home</Link>
//                 <span className="flex-shrink-0">/</span>
//                 <Link href="/products" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Products</Link>
//                 <span className="flex-shrink-0">/</span>
//                 <span className="text-gray-900 font-medium truncate">{product.productName}</span>
//               </div>
//             </div>
//           </div>
//         </div>

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
//               <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
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
//                         <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">MOQ</span>
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
//                         <span className="text-xs sm:text-sm text-gray-600">MOQ</span>
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
//               </div>

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
//                     <h3 className="text-sm sm:text-md font-semibold text-gray-900 mb-2 sm:mb-3">Your Items</h3>
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
//                         />
//                       ))}
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Total Qty</p>
//                         <p className="text-base sm:text-lg font-bold text-gray-900">{totalQuantity} pcs</p>
//                       </div>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Unit Price</p>
//                         <p className="text-base sm:text-lg font-bold text-[#E39A65]">{formatPrice(applicableUnitPrice)}</p>
//                       </div>
//                       <div className="p-2 sm:p-3 bg-gray-50 rounded-lg col-span-2">
//                         <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Estimated Total</p>
//                         <p className="text-lg sm:text-xl font-bold text-[#E39A65]">{formatPrice(totalPrice)}</p>
//                       </div>
//                     </div>

//                     {totalQuantity < product.moq && totalQuantity > 0 && (
//                       <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                         <p className="text-xs sm:text-sm text-yellow-800">
//                           ⚠️ Need {product.moq - totalQuantity} more pieces to meet MOQ
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
//                         disabled={totalQuantity < product.moq || inquiryItems.length === 0}
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
//                 {relatedProducts.length > 4 && (
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

//                 {relatedProducts.length > 4 && (
//                   <button
//                     onClick={handleNext}
//                     onMouseEnter={() => setIsHovered(true)}
//                     onMouseLeave={() => setIsHovered(false)}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-[#E39A65] hover:text-white hover:border-[#E39A65] transition-all duration-300 flex items-center justify-center opacity-60 hover:opacity-100 focus:opacity-100"
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
//                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
//                   >
//                     {visibleProducts.map((product) => (
//                       <RelatedProductCard key={product._id} product={product} />
//                     ))}
//                   </motion.div>
//                 </div>

//                 {relatedProducts.length > 4 && (
//                   <div className="flex items-center justify-center gap-2 mt-6">
//                     {Array.from({ length: Math.ceil(relatedProducts.length / 4) }).map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           setCurrentIndex(index * 4);
//                           setIsHovered(true);
//                           setTimeout(() => setIsHovered(false), 3000);
//                         }}
//                         className={`h-2 rounded-full transition-all duration-300 ${
//                           Math.floor(currentIndex / 4) === index
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
























// src/app/product/[id]/ProductClient.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  ChevronLeft, 
  ShoppingCart, 
  MessageCircle, 
  Check, 
  Package,
  Users,
  FileText,
  Truck,
  Clock,
  Plus,
  CheckCircle,
  X,
  Trash2,
  ChevronRight,
  DollarSign,
  Maximize2,
  BookOpen,
  Sparkles,
  Eye,
  TrendingUp
} from 'lucide-react';

import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import AuthModal from '@/app/components/AuthModal';
import ProductReviews from '@/app/components/product/ProductReviews';


// Add this ProductDetailsSkeleton component after your imports
const ProductDetailsSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto px-4 max-w-7xl py-4 sm:py-6 md:py-8 mt-16 sm:mt-20">
      <div className="h-4 bg-gray-200 rounded w-32 sm:w-48 mb-4 sm:mb-6 animate-pulse"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="flex-1 bg-gray-200 rounded-xl sm:rounded-2xl h-[300px] sm:h-[400px] lg:h-[500px] animate-pulse order-1 sm:order-2"></div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-16 sm:h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-48 sm:h-56 lg:h-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-40 sm:h-44 lg:h-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

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

// Helper function to format price without currency symbol
const formatPriceNumber = (price) => {
  return price?.toFixed(2) || '0.00';
};

// Rich Text Content Renderer
const RichTextContent = ({ content, className = '' }) => {
  if (!content) return <p className="text-gray-500 italic">No content available.</p>;

  return (
    <div 
      className={`prose prose-sm sm:prose lg:prose-lg max-w-none rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

// Image Gallery Component (EXACTLY as your original)
const ImageGallery = ({ images = [], productName }) => {
  const [mainImage, setMainImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
        {images.slice(0, 4).map((image, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(idx)}
            onMouseEnter={() => setMainImage(idx)}
            className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
              mainImage === idx 
                ? 'border-[#E39A65] shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image.url}
              alt={`${productName} - Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            {mainImage === idx && (
              <div className="absolute inset-0 bg-[#E39A65]/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#E39A65]" />
              </div>
            )}
          </button>
        ))}
        {images.length > 4 && (
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg bg-gray-100 flex items-center justify-center text-xs sm:text-sm text-gray-500">
            +{images.length - 4}
          </div>
        )}
      </div>

      <div 
        className="flex-1 relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden group cursor-zoom-in order-1 sm:order-2"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[mainImage]?.url || images[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image'}
          alt={`${productName} - Main view`}
          className="w-full h-[300px] sm:h-[320px] lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-150"
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
          }}
        />
        
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center mt-16">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
          </button>
          <img
            src={images[mainImage]?.url || images[0]?.url}
            alt={productName}
            className="max-w-[95vw] max-h-[85vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

// Color Selector Component (EXACTLY as your original)
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

// Bulk Pricing Table (EXACTLY as your original)
const BulkPricingTable = ({ pricing = [], unitPrice, moq }) => {
  const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];

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
                  Bulk Pricing
                </h3>
                <p className="text-xs text-white/80 mt-0.5">Volume discounts · Best wholesale rates</p>
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
                    <span>Quantity</span>
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
              {pricingData.map((tier, index) => {
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

// Key Attributes Component (EXACTLY as your original)
const KeyAttributes = ({ product }) => {
  const attributes = [
    { label: 'MOQ', value: `${product.moq} pieces` },
    { label: 'Fabric', value: product.fabric || 'Standard' },
    { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
    { label: 'Available Sizes', value: product.sizes?.filter(s => s.trim()).slice(0, 5).join(', ') + (product.sizes?.length > 5 ? ` +${product.sizes.length - 5} more` : '') || 'Standard' },
    ...(product.additionalInfo || []).map(info => ({
      label: info.fieldName,
      value: info.fieldValue
    }))
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

// Description Component (EXACTLY as your original)
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

// Instructions Component (EXACTLY as your original)
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

// Shipping Info Component (EXACTLY as your original)
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

// Inquiry Item Component (EXACTLY as your original)
const InquiryItem = ({ item, index, product, onUpdate, onRemove, showRemove }) => {
  const [sizeQuantities, setSizeQuantities] = useState(item.sizeQuantities || {});

  useEffect(() => {
    if (item.sizeQuantities) {
      setSizeQuantities(item.sizeQuantities);
    }
  }, [item.sizeQuantities]);

  const handleSizeQuantityChange = (size, quantity) => {
    const newQuantities = { ...sizeQuantities, [size]: quantity };
    setSizeQuantities(newQuantities);
    
    const totalQty = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
    
    onUpdate(item.id, 'sizeQuantities', newQuantities);
    onUpdate(item.id, 'quantity', totalQty);
  };

  const getTotalForItem = () => {
    return Object.values(sizeQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
  };

  const allSizes = product.sizes?.filter(s => s.trim()) || [];

  return (
    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
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
        <span className="text-xs sm:text-sm text-gray-600">Item Total:</span>
        <span className="text-xs sm:text-sm font-semibold text-[#E39A65]">{getTotalForItem()} pcs</span>
      </div>
    </div>
  );
};

// Related Product Card Component (EXACTLY as your original)
const RelatedProductCard = ({ product }) => {
  const productImages = product.images || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = productImages.length > 1;
  const firstTier = product.quantityBasedPricing?.[0];
  const primaryTag = product.tags?.[0];

  const handleImageHover = (index) => {
    setActiveIndex(index);
  };

  const handleImageLeave = () => {
    setActiveIndex(0);
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
      onClick={() => window.location.href = `/product/${product._id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
    >
      <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-gray-100">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          whileHover={{ opacity: 1 }}
        />
        
        <motion.img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
          alt={product.productName || 'Product image'}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
          }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-black/40 items-center justify-center gap-3 
                     hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/product/${product._id}`;
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
              window.location.href = `/product/${product._id}#inquiry-form`;
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

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3 sm:hidden z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/product/${product._id}`;
            }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-transform"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/product/${product._id}#inquiry-form`;
            }}
            className="bg-[#E39A65]/90 backdrop-blur-sm rounded-full p-2 shadow-lg active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-3 left-3 bg-[#E39A65] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium shadow-lg z-20"
        >
          {product.category?.name || 'Uncategorized'}
        </motion.span>
        
        {primaryTag && (
          <motion.span 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`absolute top-3 right-3 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium shadow-lg z-20 ${getTagStyles(primaryTag)}`}
          >
            {primaryTag}
          </motion.span>
        )}
        
        <motion.span 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-3 right-3 bg-gray-900/90 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm shadow-lg z-20"
        >
          MOQ: {product.moq || 0}
        </motion.span>

        {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-3 left-3 bg-black/50 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full backdrop-blur-sm z-20"
          >
            {capitalizeFirst(product.targetedCustomer)}
          </motion.span>
        )}
      </div>

      {hasMultipleImages && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-1 py-2 px-2 bg-gray-50 border-t border-gray-100"
          onMouseLeave={handleImageLeave}
        >
          {productImages.slice(0, 4).map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-md overflow-hidden transition-all duration-300 ${
                activeIndex === index 
                  ? 'ring-2 ring-[#E39A65] ring-offset-2 scale-110 shadow-md' 
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100';
                }}
              />
            </motion.button>
          ))}
          {productImages.length > 4 && (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gray-200 flex items-center justify-center text-[10px] sm:text-xs text-gray-600 font-medium">
              +{productImages.length - 4}
            </div>
          )}
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="p-4"
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1" title={product.productName}>
            {truncateText(product.productName, 25)}
          </h3>
          <div className="flex-shrink-0 text-right">
            <span className="text-base font-bold text-[#E39A65]">
              ${formatPriceNumber(product.pricePerUnit)}
            </span>
            <span className="text-gray-500 text-[8px] ml-1">/pc</span>
          </div>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color.code }}
                title={color.name || color.code}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[8px] text-gray-400">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {firstTier && (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-2 mb-3 border border-orange-100/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-600 font-medium">{firstTier.range || 'Bulk'}</span>
              <span className="font-bold text-[#E39A65]">${formatPriceNumber(firstTier.price)}/pc</span>
            </div>
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/product/${product._id}#inquiry-form`;
          }}
        >
          <div className="flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-all duration-300 hover:shadow-md relative overflow-hidden cursor-pointer">
            <ShoppingCart className="w-3 h-3" />
            <span>Inquiry Now</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main Product Client Component (EXACTLY as your original, but using productId prop)
export default function ProductClient({ productId }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [inquiryItems, setInquiryItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [activeTab, setActiveTab] = useState('attributes');
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  
  // Cart check state
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemDetails, setCartItemDetails] = useState(null);

  // Auto-play functionality
  useEffect(() => {
    if (relatedProducts.length <= 4) return;
    
    const startAutoPlay = () => {
      if (!isHovered) {
        autoPlayRef.current = setInterval(() => {
          setCurrentIndex((prev) => 
            prev + 4 >= relatedProducts.length ? 0 : prev + 4
          );
        }, 5000);
      }
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isHovered, relatedProducts.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev + 4 >= relatedProducts.length ? 0 : prev + 4
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev - 4 < 0 ? Math.max(relatedProducts.length - 4, 0) : prev - 4
    );
  };

  const visibleProducts = relatedProducts.slice(currentIndex, currentIndex + 4);

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

  const handleAuthSuccess = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    setShowAuthModal(false);
    
    toast.success('Successfully logged in!', {
      description: `Welcome back, ${userData.contactPerson || userData.companyName}!`,
    });
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (product && isAuthenticated) {
      checkIfInCart();
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
        
        // Update SEO meta tags dynamically
        updateMetaTags(data.data);
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

  // Update meta tags for client-side navigation
  const updateMetaTags = (product) => {
    const metaTitle = product.metaSettings?.metaTitle || 
      `${product.productName} | Asian Clothify - Premium Wholesale Clothing`;
    document.title = metaTitle;

    const metaDescription = product.metaSettings?.metaDescription || 
      `${product.productName} - Available in ${product.colors?.length || 0} colors, ${product.sizes?.length || 0} sizes. MOQ: ${product.moq} pieces.`;
    
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
      metaDescTag.setAttribute('content', metaDescription);
    } else {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      metaDescTag.setAttribute('content', metaDescription);
      document.head.appendChild(metaDescTag);
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
    if (!product) return;
    const totalQty = inquiryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setTotalQuantity(totalQty);
  }, [inquiryItems, product]);

  useEffect(() => {
    if (!product || totalQuantity === 0) {
      setTotalPrice(0);
      return;
    }

    let unitPrice = product.pricePerUnit;
    
    if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
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
          if (totalQuantity >= min && totalQuantity <= max) {
            matchedTier = tier;
            break;
          }
        }
        else if (range.includes('+')) {
          const minQty = parseInt(range.replace('+', ''));
          if (totalQuantity >= minQty) {
            matchedTier = tier;
            break;
          }
        }
      }
      
      if (matchedTier) {
        unitPrice = matchedTier.price;
      } else {
        const highestTier = sortedTiers[sortedTiers.length - 1];
        if (highestTier.range.includes('-') && totalQuantity > parseInt(highestTier.range.split('-')[1])) {
          unitPrice = highestTier.price;
        }
      }
    }

    const total = unitPrice * totalQuantity;
    setTotalPrice(total);
  }, [totalQuantity, product]);

  const getApplicableUnitPrice = () => {
    if (!product || totalQuantity === 0) return product?.pricePerUnit || 0;
    
    let unitPrice = product.pricePerUnit;
    
    if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
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
          if (totalQuantity >= min && totalQuantity <= max) {
            matchedTier = tier;
            unitPrice = tier.price;
            break;
          }
        }
        else if (range.includes('+')) {
          const minQty = parseInt(range.replace('+', ''));
          if (totalQuantity >= minQty) {
            matchedTier = tier;
            unitPrice = tier.price;
            break;
          }
        }
      }
      
      if (!matchedTier) {
        const highestTier = sortedTiers[sortedTiers.length - 1];
        if (highestTier.range.includes('-') && totalQuantity > parseInt(highestTier.range.split('-')[1])) {
          unitPrice = highestTier.price;
        }
      }
    }
    
    return unitPrice;
  };

  const applicableUnitPrice = getApplicableUnitPrice();

  const handleAddItem = () => {
    if (!selectedColor) {
      toast.error('Please select a color');
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
      quantity: 0
    }]);

    toast.success('Color added. Enter quantities for each size.');
  };

  const handleUpdateItem = (id, field, value) => {
    setInquiryItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleRemoveItem = (id) => {
    if (inquiryItems.length > 1) {
      setInquiryItems(prev => prev.filter(item => item.id !== id));
      toast.success('Item removed');
    } else if (inquiryItems.length === 1) {
      setInquiryItems([]);
      toast.success('Item removed');
    }
  };

  const handleSubmitInquiry = async () => {
    if (!isAuthenticated) {
      setAuthModalTab('login');
      setShowAuthModal(true);
      toast.info('Please login to submit an inquiry');
      return;
    }

    if (inquiryItems.length === 0) {
      toast.error('Please add at least one color');
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

    const calculatedTotalQuantity = inquiryItems.reduce((total, item) => {
      const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
      return total + itemTotal;
    }, 0);

    if (calculatedTotalQuantity < product.moq) {
      toast.error(`Total quantity must be at least ${product.moq} pieces (currently ${calculatedTotalQuantity})`);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const colorsData = inquiryItems.map(item => {
        const colorTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
        
        return {
          color: item.color,
          sizeQuantities: item.sizeQuantities,
          totalQuantity: colorTotal
        };
      }).filter(item => item.totalQuantity > 0);

      const cartItem = {
        productId: product._id,
        productName: product.productName,
        colors: colorsData,
        totalQuantity: calculatedTotalQuantity,
        unitPrice: applicableUnitPrice,
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
        toast.success(`${colorsData.length} color(s) added for ${product.productName}! Total: ${calculatedTotalQuantity} pcs`);
        
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

  const handleWhatsAppInquiry = () => {
    if (!isAuthenticated) {
      setAuthModalTab('login');
      setShowAuthModal(true);
      toast.info('Please login to send WhatsApp inquiry');
      return;
    }

    if (inquiryItems.length === 0) {
      toast.error('Please add items to inquiry');
      return;
    }

    let message = `*Inquiry for ${product.productName}*\n\n`;
    
    message += `*👤 BUYER INFORMATION*\n`;
    message += `• Company: ${user?.companyName || 'N/A'}\n`;
    message += `• Contact Person: ${user?.contactPerson || 'N/A'}\n`;
    message += `• Email: ${user?.email || 'N/A'}\n`;
    message += `• Phone: ${user?.phone || 'N/A'}\n`;
    if (user?.whatsapp) message += `• WhatsApp: ${user.whatsapp}\n`;
    message += `• Country: ${user?.country || 'N/A'}\n\n`;
    
    message += `*📦 PRODUCT DETAILS*\n`;
    message += `• Product: ${product.productName}\n`;
    message += `• Category: ${product.category?.name || 'Uncategorized'}\n`;
    message += `• Fabric: ${product.fabric || 'Standard'}\n`;
    message += `• Target: ${capitalizeFirst(product.targetedCustomer || 'Unisex')}\n`;
    message += `• MOQ: ${product.moq} pieces\n\n`;
    
    message += `*🛒 INQUIRY ITEMS*\n`;
    
    inquiryItems.forEach((item, index) => {
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
      
      const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
      message += `  *Item Total:* ${itemTotal} pcs\n`;
    });
    
    message += `\n*📊 ORDER SUMMARY*\n`;
    message += `• Total Quantity: ${totalQuantity} pieces\n`;
    message += `• Unit Price: ${formatPrice(applicableUnitPrice)}\n`;
    message += `• Estimated Total: ${formatPrice(totalPrice)}\n`;
    
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

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
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
      </div>
    );
  }

  // MAIN RENDER - EXACTLY AS YOUR ORIGINAL DESIGN
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 mt-16 sm:mt-20">
        {/* Breadcrumb - Responsive */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-7xl py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
                aria-label="Go back"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>
              
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap pb-0.5 flex-1">
                <Link href="/" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Home</Link>
                <span className="flex-shrink-0">/</span>
                <Link href="/products" className="hover:text-[#E39A65] transition-colors flex-shrink-0">Products</Link>
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
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none mb-1">MOQ</span>
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
                        <span className="text-xs sm:text-sm text-gray-600">MOQ</span>
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
                    <h3 className="text-sm sm:text-md font-semibold text-gray-900 mb-2 sm:mb-3">Your Items</h3>
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
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Total Qty</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">{totalQuantity} pcs</p>
                      </div>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Unit Price</p>
                        <p className="text-base sm:text-lg font-bold text-[#E39A65]">{formatPrice(applicableUnitPrice)}</p>
                      </div>
                      <div className="p-2 sm:p-3 bg-gray-50 rounded-lg col-span-2">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Estimated Total</p>
                        <p className="text-lg sm:text-xl font-bold text-[#E39A65]">{formatPrice(totalPrice)}</p>
                      </div>
                    </div>

                    {totalQuantity < product.moq && totalQuantity > 0 && (
                      <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs sm:text-sm text-yellow-800">
                          ⚠️ Need {product.moq - totalQuantity} more pieces to meet MOQ
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
                        disabled={totalQuantity < product.moq || inquiryItems.length === 0}
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
                {relatedProducts.length > 4 && (
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

                {relatedProducts.length > 4 && (
                  <button
                    onClick={handleNext}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-[#E39A65] hover:text-white hover:border-[#E39A65] transition-all duration-300 flex items-center justify-center opacity-60 hover:opacity-100 focus:opacity-100"
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
                  >
                    {visibleProducts.map((product) => (
                      <RelatedProductCard key={product._id} product={product} />
                    ))}
                  </motion.div>
                </div>

                {relatedProducts.length > 4 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    {Array.from({ length: Math.ceil(relatedProducts.length / 4) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index * 4);
                          setIsHovered(true);
                          setTimeout(() => setIsHovered(false), 3000);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          Math.floor(currentIndex / 4) === index
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
      </div>
      <Footer />

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