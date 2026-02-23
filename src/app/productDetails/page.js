
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
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
//   Eye
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';

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

// // Loading Skeleton Component
// const ProductDetailsSkeleton = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 max-w-7xl py-8">
//       <div className="h-4 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         <div className="lg:col-span-5">
//           <div className="flex gap-4">
//             <div className="w-24 space-y-2">
//               {[1, 2, 3, 4].map(i => (
//                 <div key={i} className="bg-gray-200 rounded-lg h-24 animate-pulse"></div>
//               ))}
//             </div>
//             <div className="flex-1 bg-gray-200 rounded-2xl h-[500px] animate-pulse"></div>
//           </div>
//         </div>
//         <div className="lg:col-span-7 space-y-6">
//           <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
//           <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
//           <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
//           <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
//           <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
//         </div>
//       </div>
//     </div>
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
//     <div className="flex gap-4">
//       <div className="w-24 space-y-2">
//         {images.slice(0, 4).map((image, idx) => (
//           <button
//             key={idx}
//             onClick={() => setMainImage(idx)}
//             onMouseEnter={() => setMainImage(idx)}
//             className={`relative w-full h-24 rounded-lg overflow-hidden border-2 transition-all ${
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
//           <div className="w-full h-24 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-500">
//             +{images.length - 4}
//           </div>
//         )}
//       </div>

//       <div 
//         className="flex-1 relative bg-gray-100 rounded-2xl overflow-hidden group cursor-zoom-in"
//         onMouseEnter={() => setShowZoom(true)}
//         onMouseLeave={() => setShowZoom(false)}
//         onMouseMove={handleMouseMove}
//       >
//         <img
//           src={images[mainImage]?.url || images[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image'}
//           alt={`${productName} - Main view`}
//           className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-150"
//           style={{
//             transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
//           }}
//         />
        
//         <button
//           onClick={() => setIsFullscreen(true)}
//           className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
//         >
//           <Maximize2 className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       {isFullscreen && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
//           <button
//             onClick={() => setIsFullscreen(false)}
//             className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <X className="w-6 h-6 text-gray-900" />
//           </button>
//           <img
//             src={images[mainImage]?.url || images[0]?.url}
//             alt={productName}
//             className="max-w-[90vw] max-h-[90vh] object-contain"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// // Color Selector Component - Shows color circles with selection indication
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
//             className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//             style={{ backgroundColor: color.code }}
//           />
//           {selectedColor?.code === color.code && (
//             <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-[#E39A65] bg-white rounded-full" />
//           )}
//         </button>
//       ))}
//     </div>
//   );
// };

// // Size Selector Component (kept for reference but not used in new design)
// const SizeSelector = ({ sizes, selectedSize, onChange }) => {
//   return (
//     <div className="flex flex-wrap gap-2">
//       {sizes.filter(s => s.trim()).map((size, index) => (
//         <button
//           key={index}
//           onClick={() => onChange(size)}
//           className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
//             selectedSize === size
//               ? 'border-[#E39A65] bg-[#E39A65] text-white'
//               : 'border-gray-200 bg-white text-gray-700 hover:border-[#E39A65] hover:text-[#E39A65]'
//           }`}
//         >
//           {size}
//         </button>
//       ))}
//     </div>
//   );
// };

// // Bulk Pricing Table Component
// const BulkPricingTable = ({ pricing = [], unitPrice, moq }) => {
//   const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900">Bulk Prices</h3>
//       </div>
//       <div className="p-6">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantity</th>
//               <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price per unit</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {pricingData.map((tier, index) => {
//               const tierPrice = tier.price || unitPrice;

//               return (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 text-gray-900">{tier.range || `${moq}+`}</td>
//                   <td className="py-3 px-4">
//                     <span className="font-semibold text-[#E39A65]">{formatPrice(tierPrice)}</span>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Key Attributes Component
// const KeyAttributes = ({ product }) => {
//   const attributes = [
//     { label: 'MOQ', value: `${product.moq} pieces` },
//     { label: 'Fabric', value: product.fabric || 'Standard' },
//     { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
//     { label: 'Available Sizes', value: product.sizes?.filter(s => s.trim()).join(', ') || 'Standard' },
//     ...(product.additionalInfo || []).map(info => ({
//       label: info.fieldName,
//       value: info.fieldValue
//     }))
//   ];

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900">Key Attributes</h3>
//       </div>
//       <div className="p-6">
//         <div className="grid grid-cols-2 gap-4">
//           {attributes.map((attr, index) => (
//             <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
//               <p className="text-sm text-gray-500 mb-1">{attr.label}</p>
//               <p className="text-sm font-medium text-gray-900">{attr.value}</p>
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
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
//       </div>
//       <div className="p-6">
//         <div 
//           className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-600 leading-relaxed"
//           dangerouslySetInnerHTML={{ 
//             __html: product.description || 'No description available.' 
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// // Shipping Info Component
// const ShippingInfo = () => {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900">Shipping Information</h3>
//       </div>
//       <div className="p-6">
//         <div className="space-y-4">
//           <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//             <Truck className="w-6 h-6 text-[#E39A65] flex-shrink-0" />
//             <div>
//               <h4 className="font-medium text-gray-900 mb-1">Global Shipping Available</h4>
//               <p className="text-sm text-gray-600">
//                 We ship worldwide with reliable carriers. Shipping costs calculated based on destination and order volume.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//             <Clock className="w-6 h-6 text-[#E39A65] flex-shrink-0" />
//             <div>
//               <h4 className="font-medium text-gray-900 mb-1">Estimated Delivery Time</h4>
//               <p className="text-sm text-gray-600">
//                 Domestic: 3-5 business days<br />
//                 International: 7-15 business days
//               </p>
//             </div>
//           </div>
//           <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//             <Package className="w-6 h-6 text-[#E39A65] flex-shrink-0" />
//             <div>
//               <h4 className="font-medium text-gray-900 mb-1">Bulk Order Shipping</h4>
//               <p className="text-sm text-gray-600">
//                 Special shipping rates available for bulk orders. Contact us for a customized quote.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // UPDATED: Inquiry Item Component - Shows multiple sizes for a selected color with quantity inputs
// const InquiryItem = ({ item, index, product, onUpdate, onRemove, showRemove }) => {
//   const [sizeQuantities, setSizeQuantities] = useState(item.sizeQuantities || {});

//   // Initialize size quantities when component mounts or item changes
//   useEffect(() => {
//     if (item.sizeQuantities) {
//       setSizeQuantities(item.sizeQuantities);
//     }
//   }, [item.sizeQuantities]);

//   const handleSizeQuantityChange = (size, quantity) => {
//     const newQuantities = { ...sizeQuantities, [size]: quantity };
//     setSizeQuantities(newQuantities);
    
//     // Calculate total quantity for this item
//     const totalQty = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
    
//     // Update parent component with size quantities and total
//     onUpdate(item.id, 'sizeQuantities', newQuantities);
//     onUpdate(item.id, 'quantity', totalQty);
//   };

//   const getTotalForItem = () => {
//     return Object.values(sizeQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
//   };

//   return (
//     <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <div 
//             className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
//             style={{ backgroundColor: item.color?.code || '#CCCCCC' }}
//           />
//           <h4 className="font-medium text-gray-900">
//             {item.color?.code || 'Selected Color'} - Item {index + 1}
//           </h4>
//         </div>
//         {showRemove && (
//           <button
//             onClick={() => onRemove(item.id)}
//             className="p-1.5 hover:bg-red-100 rounded-lg transition-colors group"
//             title="Remove item"
//           >
//             <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
//           </button>
//         )}
//       </div>

//       {/* Size Quantities Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//         {product.sizes?.filter(s => s.trim()).map((size, idx) => (
//           <div key={idx} className="flex flex-col">
//             <label className="block text-xs text-gray-500 mb-1">{size}</label>
//             <input
//               type="number"
//               min="0"
//               value={sizeQuantities[size] || ''}
//               onChange={(e) => handleSizeQuantityChange(size, parseInt(e.target.value) || 0)}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
//               placeholder="Qty"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Item Total */}
//       <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
//         <span className="text-sm text-gray-600">Item Total:</span>
//         <span className="text-sm font-semibold text-[#E39A65]">{getTotalForItem()} pcs</span>
//       </div>
//     </div>
//   );
// };

// // ADDED: Related Product Card Component matching grid view design
// // ADDED: Related Product Card Component matching grid view design
// const RelatedProductCard = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const productImages = product.images || [];
//   const firstTier = product.quantityBasedPricing?.[0];
  
//   // Calculate discount if available
//   const discount = product.pricePerUnit && firstTier?.price 
//     ? ((product.pricePerUnit - firstTier.price) / product.pricePerUnit * 100).toFixed(0)
//     : null;

//   const handleInquireClick = (e) => {
//     e.preventDefault(); // Prevent the Link from triggering
//     window.location.href = `/productDetails?id=${product._id}`;
//   };

//   return (
//     <Link href={`/productDetails?id=${product._id}`}>
//       <div 
//         className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 relative"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Image Container */}
//         <div className="relative h-48 overflow-hidden bg-gray-100">
//           <img
//             src={productImages[0]?.url || 'https://via.placeholder.com/300x300?text=No+Image'}
//             alt={product.productName}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//           />
          
//           {/* Category Badge */}
//           <span className="absolute top-3 left-3 bg-[#E39A65] text-white text-xs px-2 py-1 rounded-full shadow-md">
//             {product.category?.name || 'Uncategorized'}
//           </span>

//           {/* Discount Badge */}
//           {/* {discount && Number(discount) > 0 && (
//             <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
//               -{discount}%
//             </span>
//           )} */}

//           {/* View Overlay */}
//           <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//             <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
//               <Eye className="w-4 h-4" />
//               View Details
//             </span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-4">
//           {/* Product Title */}
//           <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12" title={product.productName}>
//             {product.productName}
//           </h3>

//           {/* Price and MOQ */}
//           <div className="flex items-center justify-between mb-3">
//             <div>
//               <span className="text-lg font-bold text-[#E39A65]">
//                 ${formatPriceNumber(product.pricePerUnit)}
//               </span>
//               <span className="text-xs text-gray-500 ml-1">/pc</span>
//             </div>
//             <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
//               MOQ: {product.moq}
//             </span>
//           </div>

//           {/* Bulk Pricing Preview */}
//           {firstTier && (
//             <div className="text-xs bg-orange-50 p-2 rounded-lg">
//               <span className="font-medium text-orange-700">Bulk: </span>
//               <span className="text-gray-600">
//                 {firstTier.range} @ ${formatPriceNumber(firstTier.price)}
//               </span>
//             </div>
//           )}

//           {/* Quick Stats */}
//           <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
//             <div className="flex items-center gap-1">
//               <Package className="w-3 h-3" />
//               <span>{product.sizes?.length || 0} sizes</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Palette className="w-3 h-3" />
//               <span>{product.colors?.length || 0} colors</span>
//             </div>
//           </div>

//           {/* Inquiry Button - Updated to navigate to product details */}
//           <button 
//             className="w-full mt-3 bg-[#E39A65] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#d48b54] transition-colors flex items-center justify-center gap-2"
//             onClick={handleInquireClick}
//           >
//             <ShoppingCart className="w-4 h-4" />
//             Inquire Now
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// };

// // Main Product Details Component
// export default function ProductDetails() {
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');
  
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [inquiryItems, setInquiryItems] = useState([]);
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [specialInstructions, setSpecialInstructions] = useState('');
//   const [activeTab, setActiveTab] = useState('attributes');

//   useEffect(() => {
//     if (productId) {
//       fetchProduct();
//     }
//   }, [productId]);

//   const fetchProduct = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setProduct(data.data);
//         // Set default selections
//         if (data.data.colors && data.data.colors.length > 0) {
//           setSelectedColor(data.data.colors[0]);
//         }
//         if (data.data.sizes && data.data.sizes.length > 0) {
//           setSelectedSize(data.data.sizes.find(s => s.trim()) || data.data.sizes[0]);
//         }
        
//         // Initialize with empty inquiry items (no default item)
//         setInquiryItems([]);
        
//         // Fetch related products based on category and targeted customer
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
//       queryParams.append('limit', 8); // Fetch more to filter
//       if (categoryId) queryParams.append('category', categoryId);
//       if (targetedCustomer) queryParams.append('targetedCustomer', targetedCustomer);
      
//       const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
//       const data = await response.json();
      
//       if (data.success) {
//         // Filter out current product and get random 4
//         const filtered = (data.data || []).filter(p => p._id !== productId);
//         // Shuffle array to get random products
//         const shuffled = filtered.sort(() => 0.5 - Math.random());
//         setRelatedProducts(shuffled.slice(0, 4));
//       }
//     } catch (error) {
//       console.error('Error fetching related products:', error);
//     }
//   };

//   // Calculate total quantity
//   useEffect(() => {
//     if (!product) return;
    
//     const totalQty = inquiryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
//     setTotalQuantity(totalQty);
//   }, [inquiryItems, product]);

//   // Calculate total price based on total quantity tier
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

//   // Handle adding a new item with selected color
//   const handleAddItem = () => {
//     if (!selectedColor) {
//       toast.error('Please select a color');
//       return;
//     }

//     // Initialize empty size quantities object
//     const initialSizeQuantities = {};
//     product.sizes?.filter(s => s.trim()).forEach(size => {
//       initialSizeQuantities[size] = 0;
//     });

//     setInquiryItems(prev => [...prev, {
//       id: Date.now(),
//       color: selectedColor,
//       sizeQuantities: initialSizeQuantities,
//       quantity: 0 // Will be calculated from size quantities
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

//   const handleSubmitInquiry = () => {
//     if (inquiryItems.length === 0) {
//       toast.error('Please add at least one color');
//       return;
//     }

//     // Check if any quantities are entered
//     const hasQuantities = inquiryItems.some(item => {
//       const total = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       return total > 0;
//     });

//     if (!hasQuantities) {
//       toast.error('Please enter quantities for at least one size');
//       return;
//     }

//     if (totalQuantity < product.moq) {
//       toast.error(`Total quantity must be at least ${product.moq} pieces`);
//       return;
//     }

//     const inquiryData = {
//       productId: product._id,
//       productName: product.productName,
//       items: inquiryItems.map(item => ({
//         color: item.color,
//         sizeQuantities: item.sizeQuantities,
//         totalQuantity: Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0)
//       })),
//       totalQuantity,
//       totalPrice,
//       specialInstructions,
//       submittedAt: new Date().toISOString()
//     };

//     const existingInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
//     existingInquiries.push(inquiryData);
//     localStorage.setItem('inquiries', JSON.stringify(existingInquiries));

//     toast.success('Inquiry submitted successfully!');
//     setInquiryItems([]);
//     setSpecialInstructions('');
//   };

//   const handleWhatsAppInquiry = () => {
//     if (inquiryItems.length === 0) {
//       toast.error('Please add items to inquiry');
//       return;
//     }

//     let message = `*Inquiry for ${product.productName}*\n\n`;
//     message += `*Items:*\n`;
    
//     inquiryItems.forEach((item, index) => {
//       message += `\n📦 *Item ${index + 1} - ${item.color?.code}*\n`;
      
//       // Add size quantities
//       Object.entries(item.sizeQuantities || {}).forEach(([size, qty]) => {
//         if (qty > 0) {
//           message += `   ${size}: ${qty} pcs\n`;
//         }
//       });
      
//       const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
//       message += `   *Item Total:* ${itemTotal} pcs\n`;
//     });
    
//     message += `\n*Total Quantity:* ${totalQuantity} pieces\n`;
//     message += `*Unit Price:* ${formatPrice(applicableUnitPrice)}\n`;
//     message += `*Estimated Total:* ${formatPrice(totalPrice)}\n`;
    
//     if (specialInstructions) {
//       message += `\n*Special Instructions:* ${specialInstructions}\n`;
//     }
    
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   if (loading) {
//     return <ProductDetailsSkeleton />;
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
//           <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
//           <Link 
//             href="/products" 
//             className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
//           >
//             <ChevronLeft className="w-4 h-4" />
//             Back to Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 mt-24">
//         {/* Breadcrumb */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="container mx-auto px-4 max-w-7xl py-4">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Link href="/" className="hover:text-[#E39A65] transition-colors">Home</Link>
//               <span>/</span>
//               <Link href="/products" className="hover:text-[#E39A65] transition-colors">Products</Link>
//               <span>/</span>
//               <span className="text-gray-900 font-medium">{product.productName}</span>
//             </div>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 max-w-7xl py-8">
//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {/* Left Column - Image Gallery (5 columns) - Sticky */}
//             <div className="lg:col-span-5">
//               <div className="sticky top-24">
//                 <ImageGallery images={product.images} productName={product.productName} />
//               </div>
//             </div>

//             {/* Right Column - Product Info & Inquiry Form (7 columns) */}
//             <div className="lg:col-span-7 space-y-6">
//               {/* Product Info Card */}
//               <div className="bg-white rounded-xl border border-gray-200 p-6">
//                 <div className="mb-4">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="px-3 py-1 bg-[#E39A65] text-white text-sm rounded-full">
//                       {product.category?.name || 'Uncategorized'}
//                     </span>
//                     {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
//                       <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
//                         {capitalizeFirst(product.targetedCustomer)}
//                       </span>
//                     )}
//                   </div>
//                   <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.productName}</h1>
//                   <div 
//                     className="text-gray-600 text-sm line-clamp-2 prose prose-sm max-w-none"
//                     dangerouslySetInnerHTML={{ 
//                       __html: product.description || 'No description available.' 
//                     }}
//                   />
//                 </div>

//                 <div className="flex items-baseline justify-between p-4 bg-orange-50 rounded-lg">
//                   <div>
//                     <span className="text-sm text-gray-600">Starting from</span>
//                     <div className="text-3xl font-bold text-[#E39A65]">
//                       {formatPrice(product.pricePerUnit)}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-sm text-gray-600">MOQ</span>
//                     <div className="text-xl font-semibold text-gray-900">{product.moq} pieces</div>
//                   </div>
//                 </div>

//                 {/* Fabric Detail */}
//                 {product.fabric && (
//                   <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                     <span className="text-sm font-medium text-gray-700">Fabric: </span>
//                     <span className="text-sm text-gray-600">{product.fabric}</span>
//                   </div>
//                 )}

//                 {/* Available Colors */}
//                 {product.colors && product.colors.length > 0 && (
//                   <div className="mt-4">
//                     <h3 className="text-sm font-medium text-gray-700 mb-3">Available Colors</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {product.colors.map((color, index) => (
//                         <div
//                           key={index}
//                           className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//                           style={{ backgroundColor: color.code }}
//                           title={color.code}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Available Sizes */}
//                 {product.sizes && product.sizes.filter(s => s.trim()).length > 0 && (
//                   <div className="mt-4">
//                     <h3 className="text-sm font-medium text-gray-700 mb-3">Available Sizes</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {product.sizes.filter(s => s.trim()).map((size, index) => (
//                         <span
//                           key={index}
//                           className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg"
//                         >
//                           {size}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Bulk Pricing Table */}
//                 <div className="mt-6">
//                   <BulkPricingTable 
//                     pricing={product.quantityBasedPricing} 
//                     unitPrice={product.pricePerUnit}
//                     moq={product.moq}
//                   />
//                 </div>
//               </div>

//               {/* UPDATED: Inquiry Form Card with Multi-Size Selection */}
//            {/* UPDATED: Inquiry Form Card with Multi-Size Selection */}
// <div className="bg-white rounded-xl border border-gray-200 p-6">
//   <div className="flex items-center justify-between mb-4">
//     <h2 className="text-lg font-semibold text-gray-900">Create Your Inquiry</h2>
//     {totalQuantity > 0 && (
//       <span className="text-sm text-gray-500">{totalQuantity} total pcs</span>
//     )}
//   </div>
  
//   {/* Color Selection */}
//   {product.colors && product.colors.length > 0 && (
//     <div className="mb-4">
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         Select Color to Add
//         {selectedColor && (
//           <span className="ml-2 text-xs text-gray-500">
//             (Currently selected: {selectedColor.code})
//           </span>
//         )}
//       </label>
//       <ColorSelector 
//         colors={product.colors}
//         selectedColor={selectedColor}
//         onChange={setSelectedColor}
//       />
//     </div>
//   )}

//   {/* Add Button */}
//   <button
//     onClick={handleAddItem}
//     disabled={!selectedColor}
//     className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
//   >
//     <Plus className="w-5 h-5" />
//     Add Selected Color
//   </button>

//   {/* Quick size guide */}
//   {product.sizes && product.sizes.filter(s => s.trim()).length > 0 && (
//     <div className="mb-4 p-3 bg-blue-50 rounded-lg">
//       <p className="text-xs text-blue-700">
//         <span className="font-medium">Available Sizes:</span> {product.sizes.filter(s => s.trim()).join(', ')}
//       </p>
//       <p className="text-xs text-blue-600 mt-1">
//         Enter quantities for each size under each color item
//       </p>
//     </div>
//   )}

//   {/* Inquiry Items List */}
//   {inquiryItems.length > 0 && (
//     <>
//       <h3 className="text-md font-semibold text-gray-900 mb-3">Your Items</h3>
//       <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 mb-4">
//         {inquiryItems.map((item, index) => (
//           <InquiryItem
//             key={item.id}
//             item={item}
//             index={index}
//             product={product}
//             onUpdate={handleUpdateItem}
//             onRemove={handleRemoveItem}
//             showRemove={true}
//           />
//         ))}
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 gap-3 mb-4">
//         <div className="p-3 bg-gray-50 rounded-lg">
//           <p className="text-xs text-gray-500 mb-1">Total Qty</p>
//           <p className="text-lg font-bold text-gray-900">{totalQuantity} pcs</p>
//         </div>
//         <div className="p-3 bg-gray-50 rounded-lg">
//           <p className="text-xs text-gray-500 mb-1">Unit Price</p>
//           <p className="text-lg font-bold text-[#E39A65]">{formatPrice(applicableUnitPrice)}</p>
//         </div>
//         <div className="p-3 bg-gray-50 rounded-lg col-span-2">
//           <p className="text-xs text-gray-500 mb-1">Estimated Total</p>
//           <p className="text-xl font-bold text-[#E39A65]">{formatPrice(totalPrice)}</p>
//         </div>
//       </div>

//       {/* MOQ Warning */}
//       {totalQuantity < product.moq && totalQuantity > 0 && (
//         <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <p className="text-sm text-yellow-800">
//             ⚠️ Need {product.moq - totalQuantity} more pieces to meet MOQ
//           </p>
//         </div>
//       )}

//       {/* Special Instructions */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Special Instructions
//         </label>
//         <textarea
//           value={specialInstructions}
//           onChange={(e) => setSpecialInstructions(e.target.value)}
//           rows="2"
//           className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none resize-none"
//           placeholder="Add any special requirements..."
//         />
//       </div>
//     </>
//   )}

//   {/* Action Buttons - Always Visible */}
//   <div className="flex gap-3 mt-4">
//     <button
//       onClick={handleSubmitInquiry}
//       disabled={totalQuantity < product.moq || inquiryItems.length === 0}
//       className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E39A65] text-white font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       <ShoppingCart className="w-4 h-4" />
//       Submit Inquiry
//     </button>
//     <button
//       onClick={handleWhatsAppInquiry}
//       disabled={inquiryItems.length === 0}
//       className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       <MessageCircle className="w-4 h-4" />
//       WhatsApp
//     </button>
//   </div>

//   {/* Empty State Message */}
//   {inquiryItems.length === 0 && (
//     <div className="text-center py-4 mt-2">
//       <p className="text-sm text-gray-500">
//         Select a color and click "Add Selected Color" to start building your inquiry
//       </p>
//     </div>
//   )}
// </div>
//             </div>
//           </div>

//           {/* Product Details Tabs */}
//           <div className="mt-8">
//             <div className="border-b border-gray-200">
//               <nav className="flex gap-8">
//                 <button
//                   onClick={() => setActiveTab('attributes')}
//                   className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
//                     activeTab === 'attributes'
//                       ? 'border-[#E39A65] text-[#E39A65]'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Key Attributes
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('description')}
//                   className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
//                     activeTab === 'description'
//                       ? 'border-[#E39A65] text-[#E39A65]'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Description
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('pricing')}
//                   className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
//                     activeTab === 'pricing'
//                       ? 'border-[#E39A65] text-[#E39A65]'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Bulk Pricing
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('shipping')}
//                   className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
//                     activeTab === 'shipping'
//                       ? 'border-[#E39A65] text-[#E39A65]'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Shipping Info
//                 </button>
//               </nav>
//             </div>

//             <div className="mt-6">
//               {activeTab === 'attributes' && <KeyAttributes product={product} />}
//               {activeTab === 'description' && <Description product={product} />}
//               {activeTab === 'pricing' && (
//                 <BulkPricingTable 
//                   pricing={product.quantityBasedPricing} 
//                   unitPrice={product.pricePerUnit}
//                   moq={product.moq}
//                 />
//               )}
//               {activeTab === 'shipping' && <ShippingInfo />}
//             </div>
//           </div>

//           {/* ADDED: Related Products Section */}
//           {relatedProducts.length > 0 && (
//             <div className="mt-12">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
//                   <p className="text-sm text-gray-500 mt-1">You might also be interested in these products</p>
//                 </div>
//                 <Link 
//                   href="/products" 
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-sm font-medium group"
//                 >
//                   View All Products
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {relatedProducts.map((product) => (
//                   <RelatedProductCard key={product._id} product={product} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* WhatsApp Floating Button */}
//         <div className="fixed bottom-6 right-6 z-50">
//           <button
//             onClick={handleWhatsAppInquiry}
//             disabled={inquiryItems.length === 0}
//             className="flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <MessageCircle className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ShoppingCart, 
  MessageCircle, 
  Check, 
  Loader2,
  Package,
  Users,
  Ruler,
  Palette,
  Info,
  FileText,
  Truck,
  Shield,
  Clock,
  Share2,
  Heart,
  Maximize2,
  Minus,
  Plus,
  CheckCircle,
  X,
  Trash2,
  ChevronRight,
  Star,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import AuthModal from '../components/AuthModal';

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

// Loading Skeleton Component
const ProductDetailsSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 max-w-7xl py-8">
      <div className="h-4 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="flex gap-4">
            <div className="w-24 space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-200 rounded-lg h-24 animate-pulse"></div>
              ))}
            </div>
            <div className="flex-1 bg-gray-200 rounded-2xl h-[500px] animate-pulse"></div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Image Gallery Component
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
    <div className="flex gap-4">
      <div className="w-24 space-y-2">
        {images.slice(0, 4).map((image, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(idx)}
            onMouseEnter={() => setMainImage(idx)}
            className={`relative w-full h-24 rounded-lg overflow-hidden border-2 transition-all ${
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
          <div className="w-full h-24 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-500">
            +{images.length - 4}
          </div>
        )}
      </div>

      <div 
        className="flex-1 relative bg-gray-100 rounded-2xl overflow-hidden group cursor-zoom-in"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[mainImage]?.url || images[0]?.url || 'https://via.placeholder.com/800x800?text=No+Image'}
          alt={`${productName} - Main view`}
          className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-150"
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
          }}
        />
        
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Maximize2 className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
          <img
            src={images[mainImage]?.url || images[0]?.url}
            alt={productName}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

// Color Selector Component - Shows color circles with selection indication
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
            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: color.code }}
          />
          {selectedColor?.code === color.code && (
            <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-[#E39A65] bg-white rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

// Bulk Pricing Table Component
const BulkPricingTable = ({ pricing = [], unitPrice, moq }) => {
  const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Bulk Prices</h3>
      </div>
      <div className="p-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantity</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price per unit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pricingData.map((tier, index) => {
              const tierPrice = tier.price || unitPrice;

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{tier.range || `${moq}+`}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#E39A65]">{formatPrice(tierPrice)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Key Attributes Component
const KeyAttributes = ({ product }) => {
  const attributes = [
    { label: 'MOQ', value: `${product.moq} pieces` },
    { label: 'Fabric', value: product.fabric || 'Standard' },
    { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
    { label: 'Available Sizes', value: product.sizes?.filter(s => s.trim()).join(', ') || 'Standard' },
    ...(product.additionalInfo || []).map(info => ({
      label: info.fieldName,
      value: info.fieldValue
    }))
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Key Attributes</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {attributes.map((attr, index) => (
            <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
              <p className="text-sm text-gray-500 mb-1">{attr.label}</p>
              <p className="text-sm font-medium text-gray-900">{attr.value}</p>
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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
      </div>
      <div className="p-6">
        <div 
          className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: product.description || 'No description available.' 
          }}
        />
      </div>
    </div>
  );
};

// Shipping Info Component
const ShippingInfo = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Shipping Information</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Truck className="w-6 h-6 text-[#E39A65] flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Global Shipping Available</h4>
              <p className="text-sm text-gray-600">
                We ship worldwide with reliable carriers. Shipping costs calculated based on destination and order volume.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Clock className="w-6 h-6 text-[#E39A65] flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Estimated Delivery Time</h4>
              <p className="text-sm text-gray-600">
                Domestic: 3-5 business days<br />
                International: 7-15 business days
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Package className="w-6 h-6 text-[#E39A65] flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Bulk Order Shipping</h4>
              <p className="text-sm text-gray-600">
                Special shipping rates available for bulk orders. Contact us for a customized quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// UPDATED: Inquiry Item Component - Shows multiple sizes for a selected color with quantity inputs
const InquiryItem = ({ item, index, product, onUpdate, onRemove, showRemove }) => {
  const [sizeQuantities, setSizeQuantities] = useState(item.sizeQuantities || {});

  // Initialize size quantities when component mounts or item changes
  useEffect(() => {
    if (item.sizeQuantities) {
      setSizeQuantities(item.sizeQuantities);
    }
  }, [item.sizeQuantities]);

  const handleSizeQuantityChange = (size, quantity) => {
    const newQuantities = { ...sizeQuantities, [size]: quantity };
    setSizeQuantities(newQuantities);
    
    // Calculate total quantity for this item
    const totalQty = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
    
    // Update parent component with size quantities and total
    onUpdate(item.id, 'sizeQuantities', newQuantities);
    onUpdate(item.id, 'quantity', totalQty);
  };

  const getTotalForItem = () => {
    return Object.values(sizeQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: item.color?.code || '#CCCCCC' }}
          />
          <h4 className="font-medium text-gray-900">
            {item.color?.code || 'Selected Color'} - Item {index + 1}
          </h4>
        </div>
        {showRemove && (
          <button
            onClick={() => onRemove(item.id)}
            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors group"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
          </button>
        )}
      </div>

      {/* Size Quantities Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {product.sizes?.filter(s => s.trim()).map((size, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="block text-xs text-gray-500 mb-1">{size}</label>
            <input
              type="number"
              min="0"
              value={sizeQuantities[size] || ''}
              onChange={(e) => handleSizeQuantityChange(size, parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
              placeholder="Qty"
            />
          </div>
        ))}
      </div>

      {/* Item Total */}
      <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
        <span className="text-sm text-gray-600">Item Total:</span>
        <span className="text-sm font-semibold text-[#E39A65]">{getTotalForItem()} pcs</span>
      </div>
    </div>
  );
};

// ADDED: Related Product Card Component matching grid view design
const RelatedProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const productImages = product.images || [];
  const firstTier = product.quantityBasedPricing?.[0];
  
  // Calculate discount if available
  const discount = product.pricePerUnit && firstTier?.price 
    ? ((product.pricePerUnit - firstTier.price) / product.pricePerUnit * 100).toFixed(0)
    : null;

  const handleInquireClick = (e) => {
    e.preventDefault(); // Prevent the Link from triggering
    window.location.href = `/productDetails?id=${product._id}`;
  };

  return (
    <Link href={`/productDetails?id=${product._id}`}>
      <div 
        className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={productImages[0]?.url || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.productName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-[#E39A65] text-white text-xs px-2 py-1 rounded-full shadow-md">
            {product.category?.name || 'Uncategorized'}
          </span>

          {/* View Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Product Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12" title={product.productName}>
            {product.productName}
          </h3>

          {/* Price and MOQ */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-[#E39A65]">
                ${formatPriceNumber(product.pricePerUnit)}
              </span>
              <span className="text-xs text-gray-500 ml-1">/pc</span>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
              MOQ: {product.moq}
            </span>
          </div>

          {/* Bulk Pricing Preview */}
          {firstTier && (
            <div className="text-xs bg-orange-50 p-2 rounded-lg">
              <span className="font-medium text-orange-700">Bulk: </span>
              <span className="text-gray-600">
                {firstTier.range} @ ${formatPriceNumber(firstTier.price)}
              </span>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              <span>{product.sizes?.length || 0} sizes</span>
            </div>
            <div className="flex items-center gap-1">
              <Palette className="w-3 h-3" />
              <span>{product.colors?.length || 0} colors</span>
            </div>
          </div>

          {/* Inquiry Button - Updated to navigate to product details */}
          <button 
            className="w-full mt-3 bg-[#E39A65] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#d48b54] transition-colors flex items-center justify-center gap-2"
            onClick={handleInquireClick}
          >
            <ShoppingCart className="w-4 h-4" />
            Inquire Now
          </button>
        </div>
      </div>
    </Link>
  );
};

// Main Product Details Component
export default function ProductDetails() {
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
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' or 'register'

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

  // Handle successful login/register
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

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
        // Set default selections
        if (data.data.colors && data.data.colors.length > 0) {
          setSelectedColor(data.data.colors[0]);
        }
        
        // Initialize with empty inquiry items (no default item)
        setInquiryItems([]);
        
        // Fetch related products based on category and targeted customer
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
      queryParams.append('limit', 8); // Fetch more to filter
      if (categoryId) queryParams.append('category', categoryId);
      if (targetedCustomer) queryParams.append('targetedCustomer', targetedCustomer);
      
      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        // Filter out current product and get random 4
        const filtered = (data.data || []).filter(p => p._id !== productId);
        // Shuffle array to get random products
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  // Calculate total quantity
  useEffect(() => {
    if (!product) return;
    
    const totalQty = inquiryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setTotalQuantity(totalQty);
  }, [inquiryItems, product]);

  // Calculate total price based on total quantity tier
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

  // Handle adding a new item with selected color
  const handleAddItem = () => {
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    // Initialize empty size quantities object
    const initialSizeQuantities = {};
    product.sizes?.filter(s => s.trim()).forEach(size => {
      initialSizeQuantities[size] = 0;
    });

    setInquiryItems(prev => [...prev, {
      id: Date.now(),
      color: selectedColor,
      sizeQuantities: initialSizeQuantities,
      quantity: 0 // Will be calculated from size quantities
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

  // UPDATED: Check authentication before submitting inquiry
  const handleSubmitInquiry = () => {
    // First check if user is authenticated
    if (!isAuthenticated) {
      setAuthModalTab('login');
      setShowAuthModal(true);
      toast.info('Please login to submit an inquiry');
      return;
    }

    // Then validate inquiry
    if (inquiryItems.length === 0) {
      toast.error('Please add at least one color');
      return;
    }

    // Check if any quantities are entered
    const hasQuantities = inquiryItems.some(item => {
      const total = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
      return total > 0;
    });

    if (!hasQuantities) {
      toast.error('Please enter quantities for at least one size');
      return;
    }

    if (totalQuantity < product.moq) {
      toast.error(`Total quantity must be at least ${product.moq} pieces`);
      return;
    }

    const inquiryData = {
      productId: product._id,
      productName: product.productName,
      userId: user?._id,
      userEmail: user?.email,
      companyName: user?.companyName,
      items: inquiryItems.map(item => ({
        color: item.color,
        sizeQuantities: item.sizeQuantities,
        totalQuantity: Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0)
      })),
      totalQuantity,
      totalPrice,
      specialInstructions,
      submittedAt: new Date().toISOString()
    };

    const existingInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    existingInquiries.push(inquiryData);
    localStorage.setItem('inquiries', JSON.stringify(existingInquiries));

    toast.success('Inquiry submitted successfully!');
    setInquiryItems([]);
    setSpecialInstructions('');
  };

  // UPDATED: Check authentication before WhatsApp inquiry
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
    message += `*Company:* ${user?.companyName}\n`;
    message += `*Contact Person:* ${user?.contactPerson}\n`;
    message += `*Email:* ${user?.email}\n`;
    message += `*Phone:* ${user?.phone}\n\n`;
    
    message += `*Items:*\n`;
    
    inquiryItems.forEach((item, index) => {
      message += `\n📦 *Item ${index + 1} - ${item.color?.code}*\n`;
      
      // Add size quantities
      Object.entries(item.sizeQuantities || {}).forEach(([size, qty]) => {
        if (qty > 0) {
          message += `   ${size}: ${qty} pcs\n`;
        }
      });
      
      const itemTotal = Object.values(item.sizeQuantities || {}).reduce((sum, qty) => sum + (qty || 0), 0);
      message += `   *Item Total:* ${itemTotal} pcs\n`;
    });
    
    message += `\n*Total Quantity:* ${totalQuantity} pieces\n`;
    message += `*Unit Price:* ${formatPrice(applicableUnitPrice)}\n`;
    message += `*Estimated Total:* ${formatPrice(totalPrice)}\n`;
    
    if (specialInstructions) {
      message += `\n*Special Instructions:* ${specialInstructions}\n`;
    }
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 mt-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 pb-2">
          <div className="container mx-auto px-4 max-w-7xl py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#E39A65] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-[#E39A65] transition-colors">Products</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.productName}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl py-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Image Gallery (5 columns) - Sticky */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <ImageGallery images={product.images} productName={product.productName} />
              </div>
            </div>

            {/* Right Column - Product Info & Inquiry Form (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Product Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#E39A65] text-white text-sm rounded-full">
                      {product.category?.name || 'Uncategorized'}
                    </span>
                    {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {capitalizeFirst(product.targetedCustomer)}
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.productName}</h1>
                  <div 
                    className="text-gray-600 text-sm line-clamp-2 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: product.description || 'No description available.' 
                    }}
                  />
                </div>

                <div className="flex items-baseline justify-between p-4 bg-orange-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Starting from</span>
                    <div className="text-3xl font-bold text-[#E39A65]">
                      {formatPrice(product.pricePerUnit)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">MOQ</span>
                    <div className="text-xl font-semibold text-gray-900">{product.moq} pieces</div>
                  </div>
                </div>

                {/* Fabric Detail */}
                {product.fabric && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Fabric: </span>
                    <span className="text-sm text-gray-600">{product.fabric}</span>
                  </div>
                )}

                {/* Available Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Available Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: color.code }}
                          title={color.code}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Sizes */}
                {product.sizes && product.sizes.filter(s => s.trim()).length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Available Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.filter(s => s.trim()).map((size, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bulk Pricing Table */}
                <div className="mt-6">
                  <BulkPricingTable 
                    pricing={product.quantityBasedPricing} 
                    unitPrice={product.pricePerUnit}
                    moq={product.moq}
                  />
                </div>
              </div>

              {/* UPDATED: Inquiry Form Card with Multi-Size Selection */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Create Your Inquiry</h2>
                  {totalQuantity > 0 && (
                    <span className="text-sm text-gray-500">{totalQuantity} total pcs</span>
                  )}
                </div>
                
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Color to Add
                      {selectedColor && (
                        <span className="ml-2 text-xs text-gray-500">
                          (Currently selected: {selectedColor.code})
                        </span>
                      )}
                    </label>
                    <ColorSelector 
                      colors={product.colors}
                      selectedColor={selectedColor}
                      onChange={setSelectedColor}
                    />
                  </div>
                )}

                {/* Add Button */}
                <button
                  onClick={handleAddItem}
                  disabled={!selectedColor}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  <Plus className="w-5 h-5" />
                  Add Selected Color
                </button>

                {/* Quick size guide */}
                {product.sizes && product.sizes.filter(s => s.trim()).length > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <span className="font-medium">Available Sizes:</span> {product.sizes.filter(s => s.trim()).join(', ')}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Enter quantities for each size under each color item
                    </p>
                  </div>
                )}

                {/* Inquiry Items List */}
                {inquiryItems.length > 0 && (
                  <>
                    <h3 className="text-md font-semibold text-gray-900 mb-3">Your Items</h3>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 mb-4">
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

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Total Qty</p>
                        <p className="text-lg font-bold text-gray-900">{totalQuantity} pcs</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                        <p className="text-lg font-bold text-[#E39A65]">{formatPrice(applicableUnitPrice)}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                        <p className="text-xs text-gray-500 mb-1">Estimated Total</p>
                        <p className="text-xl font-bold text-[#E39A65]">{formatPrice(totalPrice)}</p>
                      </div>
                    </div>

                    {/* MOQ Warning */}
                    {totalQuantity < product.moq && totalQuantity > 0 && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          ⚠️ Need {product.moq - totalQuantity} more pieces to meet MOQ
                        </p>
                      </div>
                    )}

                    {/* Special Instructions */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions
                      </label>
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        rows="2"
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none resize-none"
                        placeholder="Add any special requirements..."
                      />
                    </div>
                  </>
                )}

                {/* Action Buttons - Always Visible */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSubmitInquiry}
                    disabled={totalQuantity < product.moq || inquiryItems.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E39A65] text-white font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Submit Inquiry
                  </button>
                  <button
                    onClick={handleWhatsAppInquiry}
                    disabled={inquiryItems.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>

                {/* Empty State Message */}
                {inquiryItems.length === 0 && (
                  <div className="text-center py-4 mt-2">
                    <p className="text-sm text-gray-500">
                      Select a color and click "Add Selected Color" to start building your inquiry
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex gap-8">
                <button
                  onClick={() => setActiveTab('attributes')}
                  className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'attributes'
                      ? 'border-[#E39A65] text-[#E39A65]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Key Attributes
                </button>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'description'
                      ? 'border-[#E39A65] text-[#E39A65]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'pricing'
                      ? 'border-[#E39A65] text-[#E39A65]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Bulk Pricing
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'shipping'
                      ? 'border-[#E39A65] text-[#E39A65]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Shipping Info
                </button>
              </nav>
            </div>

            <div className="mt-6">
              {activeTab === 'attributes' && <KeyAttributes product={product} />}
              {activeTab === 'description' && <Description product={product} />}
              {activeTab === 'pricing' && (
                <BulkPricingTable 
                  pricing={product.quantityBasedPricing} 
                  unitPrice={product.pricePerUnit}
                  moq={product.moq}
                />
              )}
              {activeTab === 'shipping' && <ShippingInfo />}
            </div>
          </div>

          {/* ADDED: Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
                  <p className="text-sm text-gray-500 mt-1">You might also be interested in these products</p>
                </div>
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-sm font-medium group"
                >
                  View All Products
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <RelatedProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Floating Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleWhatsAppInquiry}
            disabled={inquiryItems.length === 0}
            className="flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-6 h-6" />
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
    </>
  );
}