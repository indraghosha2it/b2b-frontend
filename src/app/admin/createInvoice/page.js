
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import {
//   FileText,
//   ArrowLeft,
//   Save,
//   Send,
//   Plus,
//   Trash2,
//   Download,
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   DollarSign,
//   Calendar,
//   User,
//   Building2,
//   Mail,
//   Phone,
//   MapPin,
//   Package,
//   FileOutput,
//   XCircle,
//   Copy,
//   Upload,
//   Image as ImageIcon,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Helper function to format currency
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// };

// // Generate invoice number
// const generateInvoiceNumber = () => {
//   const date = new Date();
//   const year = date.getFullYear().toString().slice(-2);
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
//   return `INV-${year}${month}-${random}`;
// };

// // Default logo URL
// const DEFAULT_LOGO_URL = 'https://i.ibb.co.com/60xkJ1Wd/favicon.png';

// // Size Badge Component with always visible delete button
// const SizeBadge = ({ size, quantity, onRemove, onQuantityChange }) => {
//   return (
//     <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-[#E39A65] transition-all">
//       <div className="px-2 py-1.5 bg-gray-50 border-r border-gray-200">
//         <span className="text-xs font-medium text-gray-700">{size}</span>
//       </div>
//       <input
//         type="number"
//         min="0"
//         value={quantity}
//         onChange={(e) => onQuantityChange(parseInt(e.target.value) || 0)}
//         className="w-14 px-1 py-1.5 text-xs text-center border-none focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
//         placeholder="0"
//       />
//       <button
//         onClick={onRemove}
//         className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border-l border-gray-200"
//         title="Remove size"
//       >
//         <Trash2 className="w-3.5 h-3.5" />
//       </button>
//     </div>
//   );
// };

// // Product Item Card Component with Expand/Collapse
// const ProductItemCard = ({ 
//   item, 
//   itemIndex, 
//   product, 
//   onUpdate, 
//   onAddColor, 
//   onAddSize, 
//   onRemoveColor, 
//   onRemoveSize,
//   isExpanded,
//   onToggleExpand
// }) => {
//   const availableColors = product?.colors || [];
//   const availableSizes = product?.sizes || [];

//   const handleQuantityChange = (colorIndex, sizeIndex, newQuantity) => {
//     onUpdate(itemIndex, colorIndex, sizeIndex, newQuantity);
//   };

//   const handleRemoveColor = (colorIndex) => {
//     onRemoveColor(itemIndex, colorIndex);
//   };

//   const handleRemoveSize = (colorIndex, sizeIndex) => {
//     onRemoveSize(itemIndex, colorIndex, sizeIndex);
//   };

//   const handleAddColor = (colorCode, colorName) => {
//     onAddColor(itemIndex, colorCode, colorName);
//   };

//   const handleAddSize = (colorIndex, size) => {
//     onAddSize(itemIndex, colorIndex, size);
//   };

//   // Get image URL with fallback
//   const imageUrl = item.productImage || product?.images?.[0]?.url || 'https://via.placeholder.com/80x80?text=No+Image';

//   // Calculate total price for this product
//   const productTotalPrice = item.total || 0;

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
//       {/* Header - Click to expand/collapse */}
//       <div 
//         className="bg-gradient-to-r from-gray-50 to-white px-5 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100/50 transition-colors"
//         onClick={onToggleExpand}
//       >
//         <div className="flex items-start gap-4">
//           {/* Product Image */}
//           <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
//             <img 
//               src={imageUrl} 
//               alt={item.productName}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
//               }}
//             />
//           </div>
          
//           {/* Product Info */}
//           <div className="flex-1">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h3 className="text-base font-semibold text-gray-900">{item.productName}</h3>
//                 <div className="flex items-center gap-3 mt-1">
//                   <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
//                     {item.colors.length} Colors
//                   </span>
//                   <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
//                     {item.totalQuantity} Total Pcs
//                   </span>
//                 </div>
//               </div>
//               <div className="text-right flex items-center gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Unit Price</p>
//                   <p className="text-lg font-bold text-[#E39A65]">{formatPrice(item.unitPrice)}</p>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-medium text-gray-600">Product Total:</span>
//                   <span className="text-xl font-bold text-[#E39A65]">{formatPrice(productTotalPrice)}</span>
//                 </div>
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onToggleExpand();
//                   }}
//                   className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
//                 >
//                   {isExpanded ? (
//                     <ChevronUp className="w-5 h-5 text-gray-500" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5 text-gray-500" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Expandable Content - Colors Section */}
//       {isExpanded && (
//         <div className="p-5 space-y-4">
//           {item.colors.map((color, colorIndex) => (
//             <div key={`${itemIndex}-${colorIndex}-${color.color.code}`} className="bg-gray-50/50 rounded-lg p-4 border border-gray-100">
//               {/* Color Header */}
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-2">
//                   <div 
//                     className="w-6 h-6 rounded-full border-2 border-white shadow-md" 
//                     style={{ backgroundColor: color.color.code }}
//                   />
//                   <span className="text-sm font-semibold text-gray-800">
//                     {color.color.name || color.color.code}
//                   </span>
//                   <span className="text-xs bg-white px-2 py-1 rounded-full border border-gray-200">
//                     {color.totalForColor} pcs
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => handleRemoveColor(colorIndex)}
//                   className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                   title="Remove color"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Size Grid */}
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {color.sizeQuantities.map((sq, sizeIndex) => (
//                   <SizeBadge
//                     key={`${itemIndex}-${colorIndex}-${sizeIndex}-${sq.size}`}
//                     size={sq.size}
//                     quantity={sq.quantity}
//                     onQuantityChange={(newQty) => handleQuantityChange(colorIndex, sizeIndex, newQty)}
//                     onRemove={() => handleRemoveSize(colorIndex, sizeIndex)}
//                   />
//                 ))}
                
//                 {/* Add Size Dropdown */}
//                 {availableSizes.length > 0 && (
//                   <select
//                     onChange={(e) => {
//                       if (e.target.value) {
//                         handleAddSize(colorIndex, e.target.value);
//                         e.target.value = '';
//                       }
//                     }}
//                     className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white hover:border-[#E39A65] focus:outline-none focus:ring-2 focus:ring-[#E39A65] transition-colors"
//                     value=""
//                   >
//                     <option value="">+ Add Size</option>
//                     {availableSizes
//                       .filter(s => !color.sizeQuantities.some(sq => sq.size === s))
//                       .map(size => (
//                         <option key={size} value={size}>{size}</option>
//                       ))
//                     }
//                   </select>
//                 )}
//               </div>
//             </div>
//           ))}

//           {/* Add Color Dropdown */}
//           {availableColors.length > 0 && (
//             <div className="mt-4 pt-3 border-t border-gray-200">
//               <select
//                 onChange={(e) => {
//                   if (e.target.value) {
//                     const selectedColor = availableColors.find(c => c.code === e.target.value);
//                     if (selectedColor) {
//                       handleAddColor(selectedColor.code, selectedColor.name);
//                     }
//                     e.target.value = '';
//                   }
//                 }}
//                 className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:border-[#E39A65] focus:outline-none focus:ring-2 focus:ring-[#E39A65] transition-colors w-full max-w-xs"
//                 value=""
//               >
//                 <option value="">+ Add New Color</option>
//                 {availableColors
//                   .filter(c => !item.colors.some(ic => ic.color.code === c.code))
//                   .map(color => (
//                     <option key={color.code} value={color.code}>
//                       {color.name || color.code}
//                     </option>
//                   ))
//                 }
//               </select>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default function CreateInvoicePage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
  
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [uploadingLogo, setUploadingLogo] = useState(false);
//   const [productDetails, setProductDetails] = useState({});
//   const [expandedItems, setExpandedItems] = useState({});
  
//   const [invoiceData, setInvoiceData] = useState({
//     invoiceNumber: generateInvoiceNumber(),
//     invoiceDate: new Date().toISOString().split('T')[0],
//     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//     inquiryId: '',
//     inquiryNumber: '',
//     company: {
//       logo: DEFAULT_LOGO_URL,
//       logoPublicId: '',
//       companyName: 'Asian Clothify',
//       contactPerson: '',
//       email: 'info@asianclothify.com',
//       phone: '+8801305-785685',
//       address: '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'
//     },
//     customer: {
//       companyName: '',
//       contactPerson: '',
//       email: '',
//       phone: '',
//       whatsapp: '',
//       billingAddress: '',
//       billingCity: '',
//       billingZipCode: '',
//       billingCountry: '',
//       shippingAddress: '',
//       shippingCity: '',
//       shippingZipCode: '',
//       shippingCountry: ''
//     },
//     items: [],
//     subtotal: 0,
//     shippingCost: 0,
//     taxRate: 0,
//     taxAmount: 0,
//     discountType: 'percentage',
//     discountValue: 0,
//     discountAmount: 0,
//     total: 0,
//     notes: '',
//     terms: 'Payment is due within 30 days. Please include invoice number with your payment.',
//     status: 'draft'
//   });

//   // Parse items and customer data from URL params
//   useEffect(() => {
//     const inquiryId = searchParams.get('inquiryId');
//     const inquiryNumber = searchParams.get('inquiryNumber');
//     const itemsParam = searchParams.get('items');
//     const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
//     const specialInstructions = searchParams.get('specialInstructions');
    
//     const customerData = {
//       companyName: searchParams.get('companyName') || '',
//       contactPerson: searchParams.get('contactPerson') || '',
//       email: searchParams.get('email') || '',
//       phone: searchParams.get('phone') || '',
//       whatsapp: searchParams.get('whatsapp') || '',
//       billingAddress: searchParams.get('address') || '',
//       billingCity: searchParams.get('city') || '',
//       billingZipCode: searchParams.get('zipCode') || '',
//       billingCountry: searchParams.get('country') || '',
//       shippingAddress: '',
//       shippingCity: '',
//       shippingZipCode: '',
//       shippingCountry: ''
//     };

//     setInvoiceData(prev => {
//       const updatedData = {
//         ...prev,
//         inquiryId: inquiryId || prev.inquiryId,
//         inquiryNumber: inquiryNumber || prev.inquiryNumber,
//         customer: {
//           ...prev.customer,
//           ...customerData
//         }
//       };

//       if (itemsParam) {
//         try {
//           const parsedItems = JSON.parse(itemsParam);
//           updatedData.items = parsedItems.map(item => ({
//             ...item,
//             unitPrice: item.unitPrice || 0,
//             total: (item.totalQuantity || 0) * (item.unitPrice || 0),
//             colors: (item.colors || []).map(color => ({
//               ...color,
//               sizeQuantities: (color.sizeQuantities || []).map(sq => ({
//                 size: sq.size,
//                 quantity: sq.quantity || 0
//               }))
//             }))
//           }));
//           updatedData.subtotal = totalAmount;
          
//           // Initialize expanded items - all expanded by default
//           const initialExpandedState = {};
//           parsedItems.forEach((_, index) => {
//             initialExpandedState[index] = true;
//           });
//           setExpandedItems(initialExpandedState);
          
//           // Fetch product details for each item
//           parsedItems.forEach(item => {
//             if (item.productId) {
//               fetchProductDetails(item.productId);
//             }
//           });
//         } catch (error) {
//           console.error('Error parsing items:', error);
//           toast.error('Failed to load inquiry items');
//         }
//       }

//       if (specialInstructions) {
//         updatedData.notes = specialInstructions;
//       }

//       return updatedData;
//     });
//   }, [searchParams]);

//   // Fetch product details for available colors and sizes
//   const fetchProductDetails = async (productId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//       const data = await response.json();
//       if (data.success) {
//         setProductDetails(prev => ({
//           ...prev,
//           [productId]: data.data
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };

//   // Toggle expand/collapse for an item
//   const toggleExpand = (itemIndex) => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [itemIndex]: !prev[itemIndex]
//     }));
//   };

//   // Calculate unit price based on bulk pricing tiers
//   const calculateUnitPrice = (productId, totalQuantity) => {
//     const product = productDetails[productId];
//     if (!product || !product.quantityBasedPricing || product.quantityBasedPricing.length === 0) {
//       return product?.pricePerUnit || 0;
//     }

//     const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//       const aMin = parseInt(a.range.split('-')[0] || a.range.replace('+', ''));
//       const bMin = parseInt(b.range.split('-')[0] || b.range.replace('+', ''));
//       return aMin - bMin;
//     });

//     for (const tier of sortedTiers) {
//       const range = tier.range;
//       if (range.includes('-')) {
//         const [min, max] = range.split('-').map(Number);
//         if (totalQuantity >= min && totalQuantity <= max) {
//           return tier.price;
//         }
//       } else if (range.includes('+')) {
//         const minQty = parseInt(range.replace('+', ''));
//         if (totalQuantity >= minQty) {
//           return tier.price;
//         }
//       }
//     }

//     const highestTier = sortedTiers[sortedTiers.length - 1];
//     return highestTier?.price || product.pricePerUnit;
//   };

//   // Recalculate all totals
//   const recalculateTotals = (items) => {
//     let subtotal = 0;
    
//     const updatedItems = items.map(item => {
//       // Calculate total quantity for this item
//       const itemTotalQty = item.colors.reduce((sum, color) => {
//         const colorQty = color.sizeQuantities.reduce((s, sq) => s + (sq.quantity || 0), 0);
//         return sum + colorQty;
//       }, 0);
      
//       // Calculate unit price based on bulk pricing
//       const unitPrice = calculateUnitPrice(item.productId, itemTotalQty);
      
//       // Calculate item total
//       const itemTotal = itemTotalQty * unitPrice;
      
//       subtotal += itemTotal;
      
//       return {
//         ...item,
//         totalQuantity: itemTotalQty,
//         unitPrice,
//         total: itemTotal
//       };
//     });
    
//     return { items: updatedItems, subtotal };
//   };

//   // Handle color quantity change
//   const handleColorQuantityChange = (itemIndex, colorIndex, sizeIndex, newQuantity) => {
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items)); // Deep clone
//       const color = updatedItems[itemIndex].colors[colorIndex];
      
//       // Update the specific size quantity
//       color.sizeQuantities[sizeIndex].quantity = newQuantity;
      
//       // Recalculate color total
//       color.totalForColor = color.sizeQuantities.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
      
//       // Recalculate all totals
//       const { items, subtotal } = recalculateTotals(updatedItems);
      
//       return {
//         ...prev,
//         items,
//         subtotal
//       };
//     });
//   };

//   // Add a new color to an item
//   const handleAddColor = (itemIndex, colorCode, colorName) => {
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items)); // Deep clone
//       const item = updatedItems[itemIndex];
//       const product = productDetails[item.productId];
      
//       if (!product) return prev;
      
//       // Check if color already exists
//       const colorExists = item.colors.some(c => c.color?.code === colorCode);
//       if (colorExists) return prev;
      
//       // Create size quantities array from product sizes
//       const sizeQuantities = (product.sizes || []).map(size => ({
//         size,
//         quantity: 0
//       }));
      
//       // Add new color
//       item.colors.push({
//         color: {
//           code: colorCode,
//           name: colorName || colorCode
//         },
//         sizeQuantities,
//         totalForColor: 0
//       });
      
//       // Recalculate all totals
//       const { items, subtotal } = recalculateTotals(updatedItems);
      
//       return {
//         ...prev,
//         items,
//         subtotal
//       };
//     });
//   };

//   // Add a new size to a color
//   const handleAddSize = (itemIndex, colorIndex, size) => {
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items)); // Deep clone
//       const color = updatedItems[itemIndex].colors[colorIndex];
      
//       // Check if size already exists
//       const sizeExists = color.sizeQuantities.some(sq => sq.size === size);
//       if (sizeExists) return prev;
      
//       // Add new size with quantity 0
//       color.sizeQuantities.push({
//         size,
//         quantity: 0
//       });
      
//       // Recalculate color total
//       color.totalForColor = color.sizeQuantities.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
      
//       // Recalculate all totals
//       const { items, subtotal } = recalculateTotals(updatedItems);
      
//       return {
//         ...prev,
//         items,
//         subtotal
//       };
//     });
//   };

//   // Remove a color from an item
//   const handleRemoveColor = (itemIndex, colorIndex) => {
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items)); // Deep clone
//       updatedItems[itemIndex].colors.splice(colorIndex, 1);
      
//       // If no colors left, remove the entire item
//       if (updatedItems[itemIndex].colors.length === 0) {
//         updatedItems.splice(itemIndex, 1);
//       }
      
//       // Recalculate all totals
//       const { items, subtotal } = recalculateTotals(updatedItems);
      
//       return {
//         ...prev,
//         items,
//         subtotal
//       };
//     });
//   };

//   // Remove a size from a color
//   const handleRemoveSize = (itemIndex, colorIndex, sizeIndex) => {
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items)); // Deep clone
//       const color = updatedItems[itemIndex].colors[colorIndex];
      
//       // Remove the size
//       color.sizeQuantities.splice(sizeIndex, 1);
      
//       // Recalculate color total
//       color.totalForColor = color.sizeQuantities.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
      
//       // Recalculate all totals
//       const { items, subtotal } = recalculateTotals(updatedItems);
      
//       return {
//         ...prev,
//         items,
//         subtotal
//       };
//     });
//   };

//   const handleCompanyChange = (field, value) => {
//     setInvoiceData(prev => ({
//       ...prev,
//       company: {
//         ...prev.company,
//         [field]: value
//       }
//     }));
//   };

//   const handleCustomerChange = (field, value) => {
//     setInvoiceData(prev => ({
//       ...prev,
//       customer: {
//         ...prev.customer,
//         [field]: value
//       }
//     }));
//   };

//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Please upload an image file (JPEG, PNG, or WEBP)');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('Logo image must be less than 2MB');
//       return;
//     }

//     setUploadingLogo(true);
//     try {
//       const formData = new FormData();
//       formData.append('logo', file);

//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/upload/company-logo', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         handleCompanyChange('logo', data.fileUrl);
//         handleCompanyChange('logoPublicId', data.publicId);
//         toast.success('Logo uploaded successfully');
//         e.target.value = '';
//       } else {
//         toast.error(data.error || 'Failed to upload logo');
//       }
//     } catch (error) {
//       console.error('Error uploading logo:', error);
//       toast.error('Failed to upload logo. Please check your connection.');
//     } finally {
//       setUploadingLogo(false);
//     }
//   };

//   const resetToDefaultLogo = () => {
//     if (invoiceData.company.logoPublicId) {
//       fetch(`http://localhost:5000/api/upload/delete-logo?publicId=${invoiceData.company.logoPublicId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       }).catch(err => console.error('Error deleting old logo:', err));
//     }
    
//     handleCompanyChange('logo', DEFAULT_LOGO_URL);
//     handleCompanyChange('logoPublicId', '');
//     toast.success('Reset to default logo');
//   };

//   const handleSaveInvoice = async (status = 'draft') => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const invoicePayload = {
//         ...invoiceData,
//         status,
//         createdAt: new Date().toISOString()
//       };

//       const response = await fetch('http://localhost:5000/api/admin/invoices', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(invoicePayload)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Invoice ${status === 'draft' ? 'saved as draft' : 'created and sent'} successfully`);
//         router.push('/admin/inquiries');
//       } else {
//         toast.error(data.error || 'Failed to save invoice');
//       }
//     } catch (error) {
//       console.error('Save invoice error:', error);
//       toast.error('Failed to save invoice');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleSendInvoice = () => {
//     handleSaveInvoice('sent');
//   };

//   const copyBillingToShipping = () => {
//     handleCustomerChange('shippingAddress', invoiceData.customer?.billingAddress || '');
//     handleCustomerChange('shippingCity', invoiceData.customer?.billingCity || '');
//     handleCustomerChange('shippingZipCode', invoiceData.customer?.billingZipCode || '');
//     handleCustomerChange('shippingCountry', invoiceData.customer?.billingCountry || '');
//     toast.success('Billing address copied to shipping');
//   };

//   if (!invoiceData.inquiryId) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
//           <h2 className="text-lg font-semibold text-gray-900 mb-2">No Inquiry Selected</h2>
//           <p className="text-sm text-gray-500 mb-4">Please select an inquiry to create an invoice.</p>
//           <Link
//             href="/admin/inquiries"
//             className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Inquiries
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
//         <div className="container mx-auto px-4 max-w-7xl py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="/admin/inquiries"
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </Link>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Create Invoice</h1>
//                 <p className="text-xs text-gray-500 mt-0.5">
//                   From Inquiry: {invoiceData.inquiryNumber}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handleSaveInvoice('draft')}
//                 disabled={saving}
//                 className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                 Save Draft
//               </button>
//               <button
//                 onClick={handleSendInvoice}
//                 disabled={saving}
//                 className="flex items-center gap-2 px-4 py-2 text-sm bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
//               >
//                 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
//                 Create & Send Invoice
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Invoice Information - Full Width at the top */}
//       <div className="container mx-auto px-4 max-w-7xl pt-6">
//         <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">
//                 Invoice Number
//               </label>
//               <input
//                 type="text"
//                 value={invoiceData.invoiceNumber}
//                 onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">
//                 Invoice Date
//               </label>
//               <input
//                 type="date"
//                 value={invoiceData.invoiceDate}
//                 onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceDate: e.target.value }))}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">
//                 Due Date
//               </label>
//               <input
//                 type="date"
//                 value={invoiceData.dueDate}
//                 onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 max-w-7xl pb-6">
//         <div className="grid grid-cols-3 gap-6">
//           {/* Left Column - Main Content (2/3 width) */}
//           <div className="col-span-2 space-y-6">
//             {/* Company Information */}
//             <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
              
//               {/* Logo Upload Section */}
//               <div className="mb-6">
//                 <label className="block text-xs font-medium text-gray-500 mb-2">
//                   Company Logo
//                 </label>
//                 <div className="flex items-start gap-4">
//                   <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden">
//                     {invoiceData.company.logo ? (
//                       <img 
//                         src={invoiceData.company.logo} 
//                         alt="Company logo" 
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = DEFAULT_LOGO_URL;
//                         }}
//                       />
//                     ) : (
//                       <ImageIcon className="w-8 h-8 text-gray-400" />
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex gap-2">
//                       <input
//                         type="file"
//                         id="logo-upload"
//                         accept="image/jpeg,image/jpg,image/png,image/webp"
//                         onChange={handleLogoUpload}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor="logo-upload"
//                         className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
//                       >
//                         {uploadingLogo ? (
//                           <Loader2 className="w-4 h-4 animate-spin" />
//                         ) : (
//                           <Upload className="w-4 h-4" />
//                         )}
//                         {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
//                       </label>
                      
//                       {invoiceData.company.logo !== DEFAULT_LOGO_URL && (
//                         <button
//                           onClick={resetToDefaultLogo}
//                           className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                         >
//                           <ImageIcon className="w-4 h-4" />
//                           Reset to Default
//                         </button>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-400 mt-2">
//                       Default logo is shown. Upload your own image (JPEG, PNG, WEBP, max 2MB)
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Company Details */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="col-span-2">
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Company Name
//                   </label>
//                   <input
//                     type="text"
//                     value={invoiceData.company?.companyName || 'Asian Clothify'}
//                     onChange={(e) => handleCompanyChange('companyName', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="Your company name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Contact Person
//                   </label>
//                   <input
//                     type="text"
//                     value={invoiceData.company?.contactPerson || ''}
//                     onChange={(e) => handleCompanyChange('contactPerson', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="Contact person"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value={invoiceData.company?.email || 'info@asianclothify.com'}
//                     onChange={(e) => handleCompanyChange('email', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="company@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Phone
//                   </label>
//                   <input
//                     type="text"
//                     value={invoiceData.company?.phone || '+8801305-785685'}
//                     onChange={(e) => handleCompanyChange('phone', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="Phone number"
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     value={invoiceData.company?.address || '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'}
//                     onChange={(e) => handleCompanyChange('address', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="Full company address"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Customer Information */}
//             <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
              
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Company Name
//                   </label>
//                   <input
//                     type="text"
//                     value={invoiceData.customer?.companyName || ''}
//                     onChange={(e) => handleCustomerChange('companyName', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="Company name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Contact Person
//                   </label>
//                   <input
//                     type="text"
//                     value={invoiceData.customer?.contactPerson || ''}
//                     onChange={(e) => handleCustomerChange('contactPerson', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="Contact person"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value={invoiceData.customer?.email || ''}
//                     onChange={(e) => handleCustomerChange('email', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="Email address"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Phone
//                   </label>
//                   <input
//                     type="text"
//                     value={invoiceData.customer?.phone || ''}
//                     onChange={(e) => handleCustomerChange('phone', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="Phone number"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     WhatsApp
//                   </label>
//                   <input
//                     type="text"
//                     value={invoiceData.customer?.whatsapp || ''}
//                     onChange={(e) => handleCustomerChange('whatsapp', e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="WhatsApp number"
//                   />
//                 </div>
//               </div>

//               {/* Billing Address */}
//               <div className="mb-6">
//                 <h3 className="text-sm font-medium text-gray-700 mb-3">Billing Address</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="col-span-1">
//                     <label className="block text-xs font-medium text-gray-500 mb-1">
//                       Street Address
//                     </label>
//                     <input
//                       type="text"
//                       value={invoiceData.customer?.billingAddress || ''}
//                       onChange={(e) => handleCustomerChange('billingAddress', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                       placeholder="Street address"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       value={invoiceData.customer?.billingCity || ''}
//                       onChange={(e) => handleCustomerChange('billingCity', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                       placeholder="City"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">
//                       ZIP Code
//                     </label>
//                     <input
//                       type="text"
//                       value={invoiceData.customer?.billingZipCode || ''}
//                       onChange={(e) => handleCustomerChange('billingZipCode', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                       placeholder="ZIP/Postal code"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">
//                       Country
//                     </label>
//                     <input
//                       type="text"
//                       value={invoiceData.customer?.billingCountry || ''}
//                       onChange={(e) => handleCustomerChange('billingCountry', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                       placeholder="Country"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Shipping Address */}
//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="text-sm font-medium text-gray-700">Shipping Address</h3>
//                   <button
//                     onClick={copyBillingToShipping}
//                     className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     <Copy className="w-3 h-3" />
//                     Copy from Billing
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="col-span-1">
//                     <label className="block text-xs font-medium text-gray-500 mb-1">
//                       Street Address
//                     </label>
//                     <input
//                       type="text"
//                       value={invoiceData.customer?.shippingAddress || ''}
//                       onChange={(e) => handleCustomerChange('shippingAddress', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                       placeholder="Street address"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       value={invoiceData.customer?.shippingCity || ''}
//                       onChange={(e) => handleCustomerChange('shippingCity', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                       placeholder="City"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">
//                       ZIP Code
//                     </label>
//                     <input
//                       type="text"
//                       value={invoiceData.customer?.shippingZipCode || ''}
//                       onChange={(e) => handleCustomerChange('shippingZipCode', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                       placeholder="ZIP/Postal code"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">
//                       Country
//                     </label>
//                     <input
//                       type="text"
//                       value={invoiceData.customer?.shippingCountry || ''}
//                       onChange={(e) => handleCustomerChange('shippingCountry', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                       placeholder="Country"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Invoice Items */}
//             <div className="space-y-4">
//               {invoiceData.items.map((item, itemIndex) => {
//                 const product = productDetails[item.productId];
//                 const isExpanded = expandedItems[itemIndex] !== false; // Default to expanded (true)
                
//                 return (
//                   <ProductItemCard
//                     key={`${itemIndex}-${item.productId}`}
//                     item={item}
//                     itemIndex={itemIndex}
//                     product={product}
//                     onUpdate={handleColorQuantityChange}
//                     onAddColor={handleAddColor}
//                     onAddSize={handleAddSize}
//                     onRemoveColor={handleRemoveColor}
//                     onRemoveSize={handleRemoveSize}
//                     isExpanded={isExpanded}
//                     onToggleExpand={() => toggleExpand(itemIndex)}
//                   />
//                 );
//               })}
//             </div>

//             {/* Notes and Terms */}
//             <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Notes
//                   </label>
//                   <textarea
//                     value={invoiceData.notes}
//                     onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
//                     rows="3"
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                     placeholder="Add any additional notes..."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Terms & Conditions
//                   </label>
//                   <textarea
//                     value={invoiceData.terms}
//                     onChange={(e) => setInvoiceData(prev => ({ ...prev, terms: e.target.value }))}
//                     rows="3"
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Sticky Summary */}
//           <div className="col-span-1">
//             <div className="sticky top-28 space-y-6">
//               {/* Invoice Summary */}
//               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
                
//                 <div className="space-y-3 mb-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Subtotal</span>
//                     <span className="font-medium text-gray-900">{formatPrice(invoiceData.subtotal)}</span>
//                   </div>

//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Shipping Cost</span>
//                     <input
//                       type="number"
//                       value={invoiceData.shippingCost}
//                       onChange={(e) => setInvoiceData(prev => ({ ...prev, shippingCost: parseFloat(e.target.value) || 0 }))}
//                       className="w-24 px-2 py-1 text-right text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
//                     />
//                   </div>

//                   <div className="border-t border-gray-100 pt-3">
//                     <div className="flex items-center gap-2 mb-2">
//                       <select
//                         value={invoiceData.discountType}
//                         onChange={(e) => setInvoiceData(prev => ({ ...prev, discountType: e.target.value }))}
//                         className="px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
//                       >
//                         <option value="percentage">Percentage (%)</option>
//                         <option value="fixed">Fixed ($)</option>
//                       </select>
//                       <input
//                         type="number"
//                         value={invoiceData.discountValue}
//                         onChange={(e) => setInvoiceData(prev => ({ ...prev, discountValue: parseFloat(e.target.value) || 0 }))}
//                         className="w-20 px-2 py-1 text-right text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
//                         placeholder="0"
//                       />
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Discount</span>
//                       <span className="font-medium text-red-600">-{formatPrice(invoiceData.discountAmount)}</span>
//                     </div>
//                   </div>

//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Tax Rate (%)</span>
//                     <input
//                       type="number"
//                       value={invoiceData.taxRate}
//                       onChange={(e) => setInvoiceData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
//                       className="w-20 px-2 py-1 text-right text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
//                     />
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Tax Amount</span>
//                     <span className="font-medium text-gray-900">{formatPrice(invoiceData.taxAmount)}</span>
//                   </div>

//                   <div className="border-t border-gray-200 pt-3">
//                     <div className="flex justify-between text-base font-semibold">
//                       <span>Total</span>
//                       <span className="text-[#E39A65]">{formatPrice(invoiceData.total)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <button
//                     onClick={() => handleSaveInvoice('draft')}
//                     disabled={saving}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                     Save as Draft
//                   </button>
//                   <button
//                     onClick={handleSendInvoice}
//                     disabled={saving}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
//                   >
//                     {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
//                     Create & Send Invoice
//                   </button>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <h3 className="text-xs font-semibold text-gray-700 mb-2">Inquiry Details</h3>
//                   <div className="space-y-1 text-xs text-gray-500">
//                     <p>Inquiry: {invoiceData.inquiryNumber}</p>
//                     <p>ID: {invoiceData.inquiryId}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  ArrowLeft,
  Save,
  Send,
  Plus,
  Trash2,
  Download,
  Loader2,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Package,
  FileOutput,
  XCircle,
  Copy,
  Upload,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  Landmark
} from 'lucide-react';
import { toast } from 'sonner';

// Helper function to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Generate invoice number
const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `INV-${year}${month}-${random}`;
};

// Default logo URL
const DEFAULT_LOGO_URL = 'https://i.ibb.co.com/60xkJ1Wd/favicon.png';

// Parse number helper
const parseNumber = (value) => {
  if (value === '' || value === null || value === undefined) return 0;
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Paid: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
    Partial: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: TrendingUp },
    Unpaid: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: AlertCircle },
    Overpaid: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', icon: TrendingDown },
    'Not Calculated': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', icon: DollarSign }
  };

  const config = statusConfig[status] || statusConfig['Not Calculated'];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} ${config.border} border`}>
      <Icon className={`w-4 h-4 ${config.text}`} />
      <span className={`text-xs font-medium ${config.text}`}>{status}</span>
    </div>
  );
};

// Size Badge Component with removable zero
const SizeBadge = ({ size, quantity, onRemove, onQuantityChange }) => {
  const displayValue = quantity === 0 ? '' : quantity;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      onQuantityChange(0);
    } else {
      const num = parseInt(value);
      if (!isNaN(num) && num >= 0) {
        onQuantityChange(num);
      }
    }
  };

  const handleBlur = () => {
    if (quantity === 0) {
      onQuantityChange(0);
    }
  };

  return (
    <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-[#E39A65] transition-all">
      <div className="px-2 py-1.5 bg-gray-50 border-r border-gray-200">
        <span className="text-xs font-medium text-gray-700">{size}</span>
      </div>
      <input
        type="number"
        min="0"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-14 px-1 py-1.5 text-xs text-center border-none focus:outline-none focus:ring-2 focus:ring-[#E39A65] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="0"
      />
      <button
        onClick={onRemove}
        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border-l border-gray-200"
        title="Remove size"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

// Product Item Card Component with Expand/Collapse
const ProductItemCard = ({ 
  item, 
  itemIndex, 
  product, 
  onUpdate, 
  onAddColor, 
  onAddSize, 
  onRemoveColor, 
  onRemoveSize,
  onRemoveProduct,
  isExpanded,
  onToggleExpand
}) => {
  const availableColors = product?.colors || [];
  const availableSizes = product?.sizes || [];

  const handleQuantityChange = (colorIndex, sizeIndex, newQuantity) => {
    onUpdate(itemIndex, colorIndex, sizeIndex, newQuantity);
  };

  const handleRemoveColor = (colorIndex) => {
    onRemoveColor(itemIndex, colorIndex);
  };

  const handleRemoveSize = (colorIndex, sizeIndex) => {
    onRemoveSize(itemIndex, colorIndex, sizeIndex);
  };

  const handleAddColor = (colorCode, colorName) => {
    onAddColor(itemIndex, colorCode, colorName);
  };

  const handleAddSize = (colorIndex, size) => {
    onAddSize(itemIndex, colorIndex, size);
  };

  const imageUrl = item.productImage || product?.images?.[0]?.url || 'https://via.placeholder.com/80x80?text=No+Image';
  const productTotalPrice = item.total || 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header - Click to expand/collapse */}
      <div 
        className="bg-gradient-to-r from-gray-50 to-white px-5 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100/50 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-start gap-4">
          {/* Product Image */}
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={item.productName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
              }}
            />
          </div>
          
          {/* Product Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              {/* Left side - Product name and stats */}
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{item.productName}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    {item.colors.length} Colors
                  </span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                    {item.totalQuantity} Total Pcs
                  </span>
                </div>
              </div>
              
              {/* Right side - Pricing and actions */}
              <div className="flex items-center gap-4">
                {/* Unit Price */}
                <div className="text-right">
                  <p className="text-xs text-gray-500">Unit Price</p>
                  <p className="text-base font-bold text-[#E39A65]">{formatPrice(item.unitPrice)}</p>
                </div>
                
                {/* Product Total */}
                <div className="text-right min-w-[100px]">
                  <p className="text-xs text-gray-500">Product Total</p>
                  <p className="text-base font-bold text-[#E39A65]">{formatPrice(productTotalPrice)}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-1 ml-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveProduct(itemIndex);
                    }}
                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                    title="Remove product"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleExpand();
                    }}
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Content - Colors Section */}
      {isExpanded && (
        <div className="p-5 space-y-4">
          {item.colors.map((color, colorIndex) => (
            <div key={`${itemIndex}-${colorIndex}-${color.color.code}`} className="bg-gray-50/50 rounded-lg p-4 border border-gray-100">
              {/* Color Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-md" 
                    style={{ backgroundColor: color.color.code }}
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    {color.color.name || color.color.code}
                  </span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full border border-gray-200">
                    {color.totalForColor} pcs
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveColor(colorIndex)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove color"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Size Grid */}
              <div className="flex flex-wrap gap-2 mt-3">
                {color.sizeQuantities.map((sq, sizeIndex) => (
                  <SizeBadge
                    key={`${itemIndex}-${colorIndex}-${sizeIndex}-${sq.size}`}
                    size={sq.size}
                    quantity={sq.quantity}
                    onQuantityChange={(newQty) => handleQuantityChange(colorIndex, sizeIndex, newQty)}
                    onRemove={() => handleRemoveSize(colorIndex, sizeIndex)}
                  />
                ))}
                
                {/* Add Size Dropdown */}
                {availableSizes.length > 0 && (
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddSize(colorIndex, e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white hover:border-[#E39A65] focus:outline-none focus:ring-2 focus:ring-[#E39A65] transition-colors"
                    value=""
                  >
                    <option value="">+ Add Size</option>
                    {availableSizes
                      .filter(s => !color.sizeQuantities.some(sq => sq.size === s))
                      .map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))
                    }
                  </select>
                )}
              </div>
            </div>
          ))}

          {/* Add New Color Section */}
          {availableColors.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Add New Color
              </label>
              
              <div className="flex flex-wrap gap-3">
                {availableColors
                  .filter(c => !item.colors.some(ic => ic.color.code === c.code))
                  .map(color => (
                    <button
                      key={color.code}
                      onClick={() => handleAddColor(color.code, color.name)}
                      className="group relative focus:outline-none"
                      title={color.code}
                    >
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform hover:ring-2 hover:ring-[#E39A65]"
                        style={{ backgroundColor: color.code }}
                      />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {color.code}
                      </span>
                    </button>
                  ))
                }
              </div>
              
              {availableColors.filter(c => !item.colors.some(ic => ic.color.code === c.code)).length === 0 && (
                <p className="text-xs text-gray-400 italic">All colors have been added</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Search Product Modal Component
const SearchProductModal = ({ isOpen, onClose, onSelectProduct, existingProductIds }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      searchProducts();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const searchProducts = async () => {
    setSearching(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(searchTerm)}&limit=10`);
      const data = await response.json();
      if (data.success) {
        const filtered = data.data.filter(p => !existingProductIds.includes(p._id));
        setSearchResults(filtered);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Failed to search products');
    } finally {
      setSearching(false);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      onSelectProduct(selectedProduct);
      setSearchTerm('');
      setSearchResults([]);
      setSelectedProduct(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Add Product to Invoice</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
              autoFocus
            />
            {searching && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-[#E39A65]" />
            )}
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleSelectProduct(product)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedProduct?._id === product._id
                      ? 'border-[#E39A65] bg-orange-50'
                      : 'border-gray-200 hover:border-[#E39A65] hover:bg-gray-50'
                  }`}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.images?.[0]?.url || 'https://via.placeholder.com/48'}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{product.productName}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {product.colors?.length || 0} colors • {product.sizes?.length || 0} sizes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#E39A65]">{formatPrice(product.pricePerUnit)}</p>
                    <p className="text-xs text-gray-500">MOQ: {product.moq}</p>
                  </div>
                </div>
              ))
            ) : searchTerm.length > 2 && !searching ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No products found</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProduct}
              disabled={!selectedProduct}
              className="px-4 py-2 text-sm font-medium bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CreateInvoicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [amountPaid, setAmountPaid] = useState(0);
  const [dynamicFields, setDynamicFields] = useState([]);
  
 const [invoiceData, setInvoiceData] = useState({
  invoiceNumber: generateInvoiceNumber(),
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  inquiryId: '',
  inquiryNumber: '',
  userId: '', // Add this for customer userId
  company: {
    logo: DEFAULT_LOGO_URL,
    logoPublicId: '',
    companyName: 'Asian Clothify',
    contactPerson: '',
    email: 'info@asianclothify.com',
    phone: '+8801305-785685',
    address: '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'
  },
  customer: { // Make sure this is properly initialized
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    billingAddress: '',
    billingCity: '',
    billingZipCode: '',
    billingCountry: '',
    shippingAddress: '',
    shippingCity: '',
    shippingZipCode: '',
    shippingCountry: ''
  },
  bankDetails: {
    bankName: '',
    accountName: '',
    accountNumber: '',
    accountType: '',
    routingNumber: '',
    swiftCode: '',
    iban: '',
    bankAddress: ''
  },
  items: [],
  subtotal: 0,
  vatPercentage: 0,
  vatAmount: 0,
  totalAfterVat: 0,
  discountPercentage: 0,
  discountAmount: 0,
  totalAfterDiscount: 0,
  shippingCost: 0,
  finalTotal: 0,
  amountPaid: 0,
  dueAmount: 0,
  notes: '',
  terms: 'This invoice is issued for wholesale purposes only and confirms the agreed products, quantities, prices, and payment terms; all sales are subject to availability and are non-returnable unless stated otherwise.',
  status: 'draft'
});

  // Handler functions for dynamic fields
  const handleAddField = () => {
    setDynamicFields(prev => [
      ...prev,
      { id: Date.now(), fieldName: '', fieldValue: '' }
    ]);
  };

  const handleFieldChange = (id, field, value) => {
    setDynamicFields(prev =>
      prev.map(fieldItem =>
        fieldItem.id === id ? { ...fieldItem, [field]: value } : fieldItem
      )
    );
  };

  const handleRemoveField = (id) => {
    setDynamicFields(prev => prev.filter(fieldItem => fieldItem.id !== id));
  };

  // Parse items and customer data from URL params


// useEffect(() => {
//   const inquiryId = searchParams.get('inquiryId');
//   const inquiryNumber = searchParams.get('inquiryNumber');
//   const userIdParam = searchParams.get('userId'); 
//   const itemsParam = searchParams.get('items');
//   const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
//   const specialInstructions = searchParams.get('specialInstructions');
  
//   console.log('🔍 URL Params - Raw values:', { 
//     inquiryId, 
//     inquiryNumber, 
//     userIdParam, 
//     userIdParamType: typeof userIdParam,
//     userIdParamValue: userIdParam,
//     itemsParam: itemsParam ? 'exists' : 'missing',
//     totalAmount 
//   });

//   // Validate userIdParam - it should be a valid ObjectId string (24 characters hex)
//   if (userIdParam && (userIdParam === '[object Object]' || userIdParam.includes('[object'))) {
//     console.error('❌ Invalid userId format in URL params:', userIdParam);
//     toast.error('Invalid user ID format in URL. Please check the inquiry data.');
//   }

//   const customerData = {
//     companyName: searchParams.get('companyName') || '',
//     contactPerson: searchParams.get('contactPerson') || '',
//     email: searchParams.get('email') || '',
//     phone: searchParams.get('phone') || '',
//     whatsapp: searchParams.get('whatsapp') || '',
//     billingAddress: searchParams.get('address') || '',
//     billingCity: searchParams.get('city') || '',
//     billingZipCode: searchParams.get('zipCode') || '',
//     billingCountry: searchParams.get('country') || '',
//     shippingAddress: '',
//     shippingCity: '',
//     shippingZipCode: '',
//     shippingCountry: ''
//   };

//   setInvoiceData(prev => {
//     // Ensure prev.customer exists
//     const currentCustomer = prev.customer || {
//       companyName: '',
//       contactPerson: '',
//       email: '',
//       phone: '',
//       whatsapp: '',
//       billingAddress: '',
//       billingCity: '',
//       billingZipCode: '',
//       billingCountry: '',
//       shippingAddress: '',
//       shippingCity: '',
//       shippingZipCode: '',
//       shippingCountry: ''
//     };

//     // Clean the userId - if it's "[object Object]", set to empty string
//     let cleanUserId = userIdParam;
//     if (cleanUserId === '[object Object]' || (cleanUserId && cleanUserId.includes('[object'))) {
//       console.warn('⚠️ Cleaning invalid userId:', cleanUserId);
//       cleanUserId = '';
//     }

//     const updatedData = {
//       ...prev,
//       inquiryId: inquiryId || prev.inquiryId,
//       inquiryNumber: inquiryNumber || prev.inquiryNumber,
//       userId: cleanUserId || prev.userId, // Store the cleaned userId
//       customer: {
//         ...currentCustomer,
//         ...customerData
//       }
//     };

//     console.log('📦 Updated invoiceData:', {
//       userId: updatedData.userId,
//       inquiryId: updatedData.inquiryId,
//       inquiryNumber: updatedData.inquiryNumber
//     });

//     if (itemsParam) {
//       try {
//         const parsedItems = JSON.parse(itemsParam);
//         updatedData.items = parsedItems.map(item => ({
//           ...item,
//           unitPrice: item.unitPrice || 0,
//           total: (item.totalQuantity || 0) * (item.unitPrice || 0),
//           colors: (item.colors || []).map(color => ({
//             ...color,
//             sizeQuantities: (color.sizeQuantities || []).map(sq => ({
//               size: sq.size,
//               quantity: sq.quantity || 0
//             }))
//           }))
//         }));
//         updatedData.subtotal = totalAmount;
        
//         const initialExpandedState = {};
//         parsedItems.forEach((_, index) => {
//           initialExpandedState[index] = true;
//         });
//         setExpandedItems(initialExpandedState);
        
//         parsedItems.forEach(item => {
//           if (item.productId) {
//             fetchProductDetails(item.productId);
//           }
//         });
//       } catch (error) {
//         console.error('Error parsing items:', error);
//         toast.error('Failed to load inquiry items');
//       }
//     }

//     if (specialInstructions) {
//       updatedData.notes = specialInstructions;
//     }

//     return updatedData;
//   });
// }, [searchParams]);
useEffect(() => {
  const inquiryId = searchParams.get('inquiryId');
  const inquiryNumber = searchParams.get('inquiryNumber');
  const userIdParam = searchParams.get('userId'); 
  const itemsParam = searchParams.get('items');
  const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
  const specialInstructions = searchParams.get('specialInstructions');
  
  console.log('🔍 URL Params - Raw values:', { 
    inquiryId, 
    inquiryNumber, 
    userIdParam, 
    userIdParamType: typeof userIdParam,
    userIdParamValue: userIdParam,
    itemsParam: itemsParam ? 'exists' : 'missing',
    itemsParamLength: itemsParam?.length,
    totalAmount 
  });

  // Validate userIdParam - it should be a valid ObjectId string (24 characters hex)
  if (userIdParam && (userIdParam === '[object Object]' || userIdParam.includes('[object'))) {
    console.error('❌ Invalid userId format in URL params:', userIdParam);
    toast.error('Invalid user ID format in URL. Please check the inquiry data.');
  }

  const customerData = {
    companyName: searchParams.get('companyName') || '',
    contactPerson: searchParams.get('contactPerson') || '',
    email: searchParams.get('email') || '',
    phone: searchParams.get('phone') || '',
    whatsapp: searchParams.get('whatsapp') || '',
    billingAddress: searchParams.get('address') || '',
    billingCity: searchParams.get('city') || '',
    billingZipCode: searchParams.get('zipCode') || '',
    billingCountry: searchParams.get('country') || '',
    shippingAddress: '',
    shippingCity: '',
    shippingZipCode: '',
    shippingCountry: ''
  };

  setInvoiceData(prev => {
    // Ensure prev.customer exists
    const currentCustomer = prev.customer || {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      whatsapp: '',
      billingAddress: '',
      billingCity: '',
      billingZipCode: '',
      billingCountry: '',
      shippingAddress: '',
      shippingCity: '',
      shippingZipCode: '',
      shippingCountry: ''
    };

    // Clean the userId - if it's "[object Object]", set to empty string
    let cleanUserId = userIdParam;
    if (cleanUserId === '[object Object]' || (cleanUserId && cleanUserId.includes('[object'))) {
      console.warn('⚠️ Cleaning invalid userId:', cleanUserId);
      cleanUserId = '';
    }

    const updatedData = {
      ...prev,
      inquiryId: inquiryId || prev.inquiryId,
      inquiryNumber: inquiryNumber || prev.inquiryNumber,
      userId: cleanUserId || prev.userId,
      customer: {
        ...currentCustomer,
        ...customerData
      }
    };

    console.log('📦 Updated invoiceData:', {
      userId: updatedData.userId,
      inquiryId: updatedData.inquiryId,
      inquiryNumber: updatedData.inquiryNumber
    });

    if (itemsParam) {
      try {
        const parsedItems = JSON.parse(itemsParam);
        
        // Debug parsed items to check for images
        console.log('📦 Raw parsed items:', parsedItems);
        console.log('📦 Items with image check:', parsedItems.map(item => ({
          productId: item.productId,
          productName: item.productName,
          hasProductImage: !!item.productImage,
          productImage: item.productImage,
          colorsCount: item.colors?.length,
          totalQuantity: item.totalQuantity
        })));

        updatedData.items = parsedItems.map(item => ({
          ...item,
          unitPrice: item.unitPrice || 0,
          total: (item.totalQuantity || 0) * (item.unitPrice || 0),
          productImage: item.productImage || '', // Preserve product image
          colors: (item.colors || []).map(color => ({
            ...color,
            sizeQuantities: (color.sizeQuantities || []).map(sq => ({
              size: sq.size,
              quantity: sq.quantity || 0
            }))
          }))
        }));

        updatedData.subtotal = totalAmount;
        
        // Log final items with images after mapping
        console.log('📦 Final items after mapping:', updatedData.items.map(item => ({
          productName: item.productName,
          hasImage: !!item.productImage,
          imageUrl: item.productImage
        })));

        const initialExpandedState = {};
        parsedItems.forEach((_, index) => {
          initialExpandedState[index] = true;
        });
        setExpandedItems(initialExpandedState);
        
        parsedItems.forEach(item => {
          if (item.productId) {
            fetchProductDetails(item.productId);
          }
        });
      } catch (error) {
        console.error('❌ Error parsing items:', error);
        console.error('❌ Items param that failed:', itemsParam);
        toast.error('Failed to load inquiry items');
      }
    }

    if (specialInstructions) {
      updatedData.notes = specialInstructions;
      console.log('📝 Special instructions added:', specialInstructions);
    }

    return updatedData;
  });
}, [searchParams]);

  // Fetch product details for available colors and sizes
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      if (data.success) {
        setProductDetails(prev => ({
          ...prev,
          [productId]: data.data
        }));
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Toggle expand/collapse for an item
  const toggleExpand = (itemIndex) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }));
  };

  // Calculate unit price based on bulk pricing tiers
  const calculateUnitPrice = (productId, totalQuantity) => {
    const product = productDetails[productId];
    if (!product || !product.quantityBasedPricing || product.quantityBasedPricing.length === 0) {
      return product?.pricePerUnit || 0;
    }

    const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
      const aMin = parseInt(a.range.split('-')[0] || a.range.replace('+', ''));
      const bMin = parseInt(b.range.split('-')[0] || b.range.replace('+', ''));
      return aMin - bMin;
    });

    for (const tier of sortedTiers) {
      const range = tier.range;
      if (range.includes('-')) {
        const [min, max] = range.split('-').map(Number);
        if (totalQuantity >= min && totalQuantity <= max) {
          return tier.price;
        }
      } else if (range.includes('+')) {
        const minQty = parseInt(range.replace('+', ''));
        if (totalQuantity >= minQty) {
          return tier.price;
        }
      }
    }

    const highestTier = sortedTiers[sortedTiers.length - 1];
    return highestTier?.price || product.pricePerUnit;
  };

  // Recalculate all totals
  const recalculateTotals = (items) => {
    let subtotal = 0;
    
    const updatedItems = items.map(item => {
      const itemTotalQty = item.colors.reduce((sum, color) => {
        const colorQty = color.sizeQuantities.reduce((s, sq) => s + (sq.quantity || 0), 0);
        return sum + colorQty;
      }, 0);
      
      const unitPrice = calculateUnitPrice(item.productId, itemTotalQty);
      const itemTotal = itemTotalQty * unitPrice;
      
      subtotal += itemTotal;
      
      return {
        ...item,
        totalQuantity: itemTotalQty,
        unitPrice,
        total: itemTotal
      };
    });
    
    return { items: updatedItems, subtotal };
  };

  // Handle color quantity change
  const handleColorQuantityChange = (itemIndex, colorIndex, sizeIndex, newQuantity) => {
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      const color = updatedItems[itemIndex].colors[colorIndex];
      
      color.sizeQuantities[sizeIndex].quantity = newQuantity;
      color.totalForColor = color.sizeQuantities.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      
      return {
        ...prev,
        items,
        subtotal
      };
    });
  };

  // Add a new color to an item
  const handleAddColor = (itemIndex, colorCode, colorName) => {
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      const item = updatedItems[itemIndex];
      const product = productDetails[item.productId];
      
      if (!product) return prev;
      
      const colorExists = item.colors.some(c => c.color?.code === colorCode);
      if (colorExists) return prev;
      
      const sizeQuantities = (product.sizes || []).map(size => ({
        size,
        quantity: 0
      }));
      
      item.colors.push({
        color: {
          code: colorCode,
          name: colorName || colorCode
        },
        sizeQuantities,
        totalForColor: 0
      });
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      
      return {
        ...prev,
        items,
        subtotal
      };
    });
  };

  // Add a new size to a color
  const handleAddSize = (itemIndex, colorIndex, size) => {
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      const color = updatedItems[itemIndex].colors[colorIndex];
      
      const sizeExists = color.sizeQuantities.some(sq => sq.size === size);
      if (sizeExists) return prev;
      
      color.sizeQuantities.push({
        size,
        quantity: 0
      });
      
      color.totalForColor = color.sizeQuantities.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      
      return {
        ...prev,
        items,
        subtotal
      };
    });
  };

  // Remove a color from an item
  const handleRemoveColor = (itemIndex, colorIndex) => {
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      updatedItems[itemIndex].colors.splice(colorIndex, 1);
      
      if (updatedItems[itemIndex].colors.length === 0) {
        updatedItems.splice(itemIndex, 1);
      }
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      
      return {
        ...prev,
        items,
        subtotal
      };
    });
  };

  // Remove a size from a color
  const handleRemoveSize = (itemIndex, colorIndex, sizeIndex) => {
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      const color = updatedItems[itemIndex].colors[colorIndex];
      
      color.sizeQuantities.splice(sizeIndex, 1);
      color.totalForColor = color.sizeQuantities.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      
      return {
        ...prev,
        items,
        subtotal
      };
    });
  };

  // Remove a product from invoice
  const handleRemoveProduct = (itemIndex) => {
    if (!confirm('Are you sure you want to remove this product from the invoice?')) return;
    
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      updatedItems.splice(itemIndex, 1);
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      
      const newExpandedItems = {};
      items.forEach((_, index) => {
        newExpandedItems[index] = true;
      });
      setExpandedItems(newExpandedItems);
      
      toast.success('Product removed from invoice');
      
      return {
        ...prev,
        items,
        subtotal
      };
    });
  };

  // Add a new product to invoice
  const handleAddProduct = (product) => {
    setInvoiceData(prev => {
      const newItem = {
        productId: product._id,
        productName: product.productName,
        productImage: product.images?.[0]?.url,
        colors: [],
        totalQuantity: 0,
        unitPrice: product.pricePerUnit,
        moq: product.moq,
        total: 0
      };

      const updatedItems = [...prev.items, newItem];
      
      fetchProductDetails(product._id);
      
      const newExpandedItems = {};
      updatedItems.forEach((_, index) => {
        newExpandedItems[index] = true;
      });
      setExpandedItems(newExpandedItems);
      
      toast.success(`${product.productName} added to invoice`);
      
      return {
        ...prev,
        items: updatedItems
      };
    });
  };

  const handleCompanyChange = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value
      }
    }));
  };

  const handleCustomerChange = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    }));
  };

  // const handleBankDetailsChange = (field, value) => {
  //   setInvoiceData(prev => ({
  //     ...prev,
  //     bankDetails: {
  //       ...prev.bankDetails,
  //       [field]: value
  //     }
  //   }));
  // };


  const handleBankDetailsChange = (field, value) => {
  setInvoiceData(prev => ({
    ...prev,
    bankDetails: {
      ...(prev.bankDetails || {}), // Ensure bankDetails exists
      [field]: value
    }
  }));
};
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload an image file (JPEG, PNG, or WEBP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo image must be less than 2MB');
      return;
    }

    setUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/upload/company-logo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        handleCompanyChange('logo', data.fileUrl);
        handleCompanyChange('logoPublicId', data.publicId);
        toast.success('Logo uploaded successfully');
        e.target.value = '';
      } else {
        toast.error(data.error || 'Failed to upload logo');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo. Please check your connection.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const resetToDefaultLogo = () => {
    if (invoiceData.company.logoPublicId) {
      fetch(`http://localhost:5000/api/upload/delete-logo?publicId=${invoiceData.company.logoPublicId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).catch(err => console.error('Error deleting old logo:', err));
    }
    
    handleCompanyChange('logo', DEFAULT_LOGO_URL);
    handleCompanyChange('logoPublicId', '');
    toast.success('Reset to default logo');
  };

  const copyBillingToShipping = () => {
    handleCustomerChange('shippingAddress', invoiceData.customer?.billingAddress || '');
    handleCustomerChange('shippingCity', invoiceData.customer?.billingCity || '');
    handleCustomerChange('shippingZipCode', invoiceData.customer?.billingZipCode || '');
    handleCustomerChange('shippingCountry', invoiceData.customer?.billingCountry || '');
    toast.success('Billing address copied to shipping');
  };

  const existingProductIds = invoiceData.items.map(item => item.productId);

  const vatPercentage = parseNumber(invoiceData.vatPercentage);
  const discountPercentage = parseNumber(invoiceData.discountPercentage);
  const shippingCost = parseNumber(invoiceData.shippingCost);
  const paidAmount = parseNumber(invoiceData.amountPaid);
  const subtotal = invoiceData.subtotal || 0;

  const vatAmount = (subtotal * vatPercentage) / 100;
  const totalAfterVat = subtotal + vatAmount;
  const discountAmount = (totalAfterVat * discountPercentage) / 100;
  const totalAfterDiscount = totalAfterVat - discountAmount;
  const finalTotal = totalAfterDiscount + shippingCost;
  const dueAmount = finalTotal - paidAmount;

  const getStatus = () => {
    const epsilon = 0.01;
    
    if (Math.abs(dueAmount) < epsilon && finalTotal > 0) {
      return { text: 'Paid', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle };
    }
    if (dueAmount < -epsilon) {
      return { text: 'Overpaid', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', icon: TrendingDown };
    }
    if (paidAmount > epsilon) {
      return { text: 'Partial', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: TrendingUp };
    }
    if (finalTotal > epsilon) {
      return { text: 'Unpaid', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertCircle };
    }
    return { text: 'Not Calculated', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: DollarSign };
  };

  const status = getStatus();

  const handleInputChange = (field, value) => {
    if (field === 'amountPaid') {
      setInvoiceData(prev => ({
        ...prev,
        [field]: value === '' ? '' : parseFloat(value) || 0
      }));
    } else {
      setInvoiceData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNumericBlur = (field) => {
    if (invoiceData[field] === '') {
      setInvoiceData(prev => ({
        ...prev,
        [field]: 0
      }));
    }
  };

// const handleSaveInvoice = async (invoiceStatus = 'draft') => {
//   setSaving(true);
//   try {
//     const token = localStorage.getItem('token');
    
//     const validDynamicFields = dynamicFields.filter(
//       field => field.fieldName.trim() !== '' && field.fieldValue.trim() !== ''
//     );
    
//     // Get the current admin user from localStorage
//     const userStr = localStorage.getItem('user');
//     let adminId = null;
    
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         adminId = user.id;
//       } catch (e) {
//         console.error('Error parsing user data:', e);
//       }
//     }

//     // Get userId directly from URL params as the most reliable source
//     let userIdFromUrl = searchParams.get('userId');
    
//     console.log('🔍 UserId from URL params:', userIdFromUrl, 'Type:', typeof userIdFromUrl);
    
//     // Validate the userId from URL
//     if (!userIdFromUrl || userIdFromUrl === '[object Object]' || userIdFromUrl.includes('[object')) {
//       console.error('❌ Invalid userId in URL params:', userIdFromUrl);
//       toast.error('Invalid user ID in URL. Please go back and select the inquiry again.');
//       setSaving(false);
//       return;
//     }

//     // Use the URL userId directly - it should be a clean string
//     const processedUserId = userIdFromUrl;

//     console.log('✅ Using userId:', processedUserId);

//     // Get the payment status from your existing status object
//     const paymentStatusText = status.text;

//     // Format the items to match backend schema
//     const formattedItems = invoiceData.items.map(item => ({
//       productId: item.productId,
//       productName: item.productName,
//       colors: item.colors.map(color => ({
//         color: {
//           code: color.color.code,
//           name: color.color.name || color.color.code
//         },
//         sizeQuantities: color.sizeQuantities.map(sq => ({
//           size: sq.size,
//           quantity: sq.quantity
//         })),
//         totalForColor: color.totalForColor
//       })),
//       totalQuantity: item.totalQuantity,
//       unitPrice: item.unitPrice,
//       moq: item.moq,
//       productImage: item.productImage || '',
//       total: item.total
//     }));

//     // Create payload matching backend schema
//     const invoicePayload = {
//       invoiceNumber: invoiceData.invoiceNumber,
//       invoiceDate: invoiceData.invoiceDate,
//       dueDate: invoiceData.dueDate,
//       inquiryId: invoiceData.inquiryId,
//       inquiryNumber: invoiceData.inquiryNumber,
      
//       // Customer info
//       customer: {
//         companyName: invoiceData.customer?.companyName || '',
//         contactPerson: invoiceData.customer?.contactPerson || '',
//         email: invoiceData.customer?.email || '',
//         phone: invoiceData.customer?.phone || '',
//         whatsapp: invoiceData.customer?.whatsapp || '',
//         billingAddress: invoiceData.customer?.billingAddress || '',
//         billingCity: invoiceData.customer?.billingCity || '',
//         billingZipCode: invoiceData.customer?.billingZipCode || '',
//         billingCountry: invoiceData.customer?.billingCountry || '',
//         shippingAddress: invoiceData.customer?.shippingAddress || '',
//         shippingCity: invoiceData.customer?.shippingCity || '',
//         shippingZipCode: invoiceData.customer?.shippingZipCode || '',
//         shippingCountry: invoiceData.customer?.shippingCountry || ''
//       },
      
//       // Company info
//       company: {
//         logo: invoiceData.company?.logo || '',
//         logoPublicId: invoiceData.company?.logoPublicId || '',
//         companyName: invoiceData.company?.companyName || 'Asian Clothify',
//         contactPerson: invoiceData.company?.contactPerson || '',
//         email: invoiceData.company?.email || 'info@asianclothify.com',
//         phone: invoiceData.company?.phone || '+8801305-785685',
//         address: invoiceData.company?.address || '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'
//       },
      
//       // Bank details
//       bankDetails: {
//         bankName: invoiceData.bankDetails?.bankName || '',
//         accountName: invoiceData.bankDetails?.accountName || '',
//         accountNumber: invoiceData.bankDetails?.accountNumber || '',
//         accountType: invoiceData.bankDetails?.accountType || '',
//         routingNumber: invoiceData.bankDetails?.routingNumber || '',
//         swiftCode: invoiceData.bankDetails?.swiftCode || '',
//         iban: invoiceData.bankDetails?.iban || '',
//         bankAddress: invoiceData.bankDetails?.bankAddress || ''
//       },
      
//       // Items
//       items: formattedItems,
      
//       // Calculations
//       subtotal: subtotal,
//       vatPercentage: vatPercentage,
//       vatAmount: vatAmount,
//       totalAfterVat: totalAfterVat,
//       discountPercentage: discountPercentage,
//       discountAmount: discountAmount,
//       totalAfterDiscount: totalAfterDiscount,
//       shippingCost: shippingCost,
//       finalTotal: finalTotal,
//       amountPaid: paidAmount,
//       dueAmount: dueAmount,
      
//       // Status fields
//       paymentStatus: paymentStatusText.toLowerCase(),
//       status: invoiceStatus === 'draft' ? 'draft' : 'sent',
      
//       // Additional info
//       notes: invoiceData.notes || '',
//       terms: invoiceData.terms || '',
//       customFields: validDynamicFields,
      
//       // Tracking - USE URL USERID DIRECTLY
//       userId: processedUserId,
//       createdBy: adminId,
      
//       createdAt: new Date().toISOString()
//     };

//     console.log('📤 Final invoice payload userId:', invoicePayload.userId);

//     const response = await fetch('http://localhost:5000/api/invoices', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(invoicePayload)
//     });

//     // Get the response as text first for debugging
//     const responseText = await response.text();
//     console.log('📥 Response:', responseText);

//     let data;
//     try {
//       data = JSON.parse(responseText);
//     } catch (e) {
//       console.error('Failed to parse response:', responseText);
//       throw new Error('Invalid response from server');
//     }
    
//     if (response.ok && data.success) {
//       toast.success(`Invoice ${invoiceStatus === 'draft' ? 'saved as draft' : 'created and sent'} successfully`);
//       router.push('/admin/invoices');
//     } else {
//       toast.error(data.error || data.message || 'Failed to save invoice');
//     }
//   } catch (error) {
//     console.error('Save invoice error:', error);
//     toast.error('Failed to save invoice: ' + error.message);
//   } finally {
//     setSaving(false);
//   }
// };
const handleSaveInvoice = async (invoiceStatus = 'draft') => {
  setSaving(true);
  try {
    const token = localStorage.getItem('token');
    
    const validDynamicFields = dynamicFields.filter(
      field => field.fieldName.trim() !== '' && field.fieldValue.trim() !== ''
    );
    
    // Get the current admin user from localStorage
    const userStr = localStorage.getItem('user');
    let adminId = null;
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        adminId = user.id;
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    // Get userId directly from URL params as the most reliable source
    let userIdFromUrl = searchParams.get('userId');
    
    console.log('🔍 UserId from URL params:', userIdFromUrl, 'Type:', typeof userIdFromUrl);
    
    // Validate the userId from URL
    if (!userIdFromUrl || userIdFromUrl === '[object Object]' || userIdFromUrl.includes('[object')) {
      console.error('❌ Invalid userId in URL params:', userIdFromUrl);
      toast.error('Invalid user ID in URL. Please go back and select the inquiry again.');
      setSaving(false);
      return;
    }

    // Use the URL userId directly - it should be a clean string
    const processedUserId = userIdFromUrl;

    console.log('✅ Using userId:', processedUserId);

    // Get the payment status from your existing status object
    const paymentStatusText = status.text;

    // Format the items to match backend schema - ENSURE productImage IS INCLUDED
    const formattedItems = invoiceData.items.map(item => {
      console.log(`📦 Formatting item ${item.productName} with image:`, item.productImage);
      
      return {
        productId: item.productId,
        productName: item.productName,
        colors: item.colors.map(color => ({
          color: {
            code: color.color.code,
            name: color.color.name || color.color.code
          },
          sizeQuantities: color.sizeQuantities.map(sq => ({
            size: sq.size,
            quantity: sq.quantity
          })),
          totalForColor: color.totalForColor
        })),
        totalQuantity: item.totalQuantity,
        unitPrice: item.unitPrice,
        moq: item.moq,
        productImage: item.productImage || '', // CRITICAL: Ensure productImage is included
        total: item.total
      };
    });

    // Log formatted items to verify images
    console.log('📦 Formatted items with images:', formattedItems.map(item => ({
      product: item.productName,
      hasImage: !!item.productImage,
      imageUrl: item.productImage
    })));

    // Create payload matching backend schema
    const invoicePayload = {
      invoiceNumber: invoiceData.invoiceNumber,
      invoiceDate: invoiceData.invoiceDate,
      dueDate: invoiceData.dueDate,
      inquiryId: invoiceData.inquiryId,
      inquiryNumber: invoiceData.inquiryNumber,
      
      // Customer info
      customer: {
        companyName: invoiceData.customer?.companyName || '',
        contactPerson: invoiceData.customer?.contactPerson || '',
        email: invoiceData.customer?.email || '',
        phone: invoiceData.customer?.phone || '',
        whatsapp: invoiceData.customer?.whatsapp || '',
        billingAddress: invoiceData.customer?.billingAddress || '',
        billingCity: invoiceData.customer?.billingCity || '',
        billingZipCode: invoiceData.customer?.billingZipCode || '',
        billingCountry: invoiceData.customer?.billingCountry || '',
        shippingAddress: invoiceData.customer?.shippingAddress || '',
        shippingCity: invoiceData.customer?.shippingCity || '',
        shippingZipCode: invoiceData.customer?.shippingZipCode || '',
        shippingCountry: invoiceData.customer?.shippingCountry || ''
      },
      
      // Company info
      company: {
        logo: invoiceData.company?.logo || '',
        logoPublicId: invoiceData.company?.logoPublicId || '',
        companyName: invoiceData.company?.companyName || 'Asian Clothify',
        contactPerson: invoiceData.company?.contactPerson || '',
        email: invoiceData.company?.email || 'info@asianclothify.com',
        phone: invoiceData.company?.phone || '+8801305-785685',
        address: invoiceData.company?.address || '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'
      },
      
      // Bank details
      bankDetails: {
        bankName: invoiceData.bankDetails?.bankName || '',
        accountName: invoiceData.bankDetails?.accountName || '',
        accountNumber: invoiceData.bankDetails?.accountNumber || '',
        accountType: invoiceData.bankDetails?.accountType || '',
        routingNumber: invoiceData.bankDetails?.routingNumber || '',
        swiftCode: invoiceData.bankDetails?.swiftCode || '',
        iban: invoiceData.bankDetails?.iban || '',
        bankAddress: invoiceData.bankDetails?.bankAddress || ''
      },
      
      // Items - with images included
      items: formattedItems,
      
      // Calculations
      subtotal: subtotal,
      vatPercentage: vatPercentage,
      vatAmount: vatAmount,
      totalAfterVat: totalAfterVat,
      discountPercentage: discountPercentage,
      discountAmount: discountAmount,
      totalAfterDiscount: totalAfterDiscount,
      shippingCost: shippingCost,
      finalTotal: finalTotal,
      amountPaid: paidAmount,
      dueAmount: dueAmount,
      
      // Status fields
      paymentStatus: paymentStatusText.toLowerCase(),
      status: invoiceStatus === 'draft' ? 'draft' : 'sent',
      
      // Additional info
      notes: invoiceData.notes || '',
      terms: invoiceData.terms || '',
      customFields: validDynamicFields,
      
      // Tracking - USE URL USERID DIRECTLY
      userId: processedUserId,
      createdBy: adminId,
      
      createdAt: new Date().toISOString()
    };

    console.log('📤 Final invoice payload - items with images:', 
      invoicePayload.items.map(item => ({
        product: item.productName,
        hasImage: !!item.productImage,
        imageUrl: item.productImage
      }))
    );

    const response = await fetch('http://localhost:5000/api/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoicePayload)
    });

    // Get the response as text first for debugging
    const responseText = await response.text();
    console.log('📥 Response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response:', responseText);
      throw new Error('Invalid response from server');
    }
    
    if (response.ok && data.success) {
      toast.success(`Invoice ${invoiceStatus === 'draft' ? 'saved as draft' : 'created and sent'} successfully`);
      router.push('/admin/invoices');
    } else {
      toast.error(data.error || data.message || 'Failed to save invoice');
    }
  } catch (error) {
    console.error('Save invoice error:', error);
    toast.error('Failed to save invoice: ' + error.message);
  } finally {
    setSaving(false);
  }
};


const handleSendInvoice = () => {
  handleSaveInvoice('sent'); // This passes 'sent' as the invoiceStatus parameter
};


  if (!invoiceData.inquiryId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No Inquiry Selected</h2>
          <p className="text-sm text-gray-500 mb-4">Please select an inquiry to create an invoice.</p>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Inquiries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/inquiries"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Invoice</h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  From Inquiry: {invoiceData.inquiryNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSaveInvoice('draft')}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Draft
              </button>
              <button
                onClick={handleSendInvoice}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Create & Send Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Information */}
      <div className="container mx-auto px-4 max-w-7xl pt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Invoice Date
              </label>
              <input
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceDate: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Company and Customer Information */}
      <div className="container mx-auto px-4 max-w-7xl pb-6">
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Company Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
            
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Company Logo
              </label>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                  {invoiceData.company.logo ? (
                    <img 
                      src={invoiceData.company.logo} 
                      alt="Company logo" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_LOGO_URL;
                      }}
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex gap-2">
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      {uploadingLogo ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                    </label>
                    
                    {invoiceData.company.logo !== DEFAULT_LOGO_URL && (
                      <button
                        onClick={resetToDefaultLogo}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Reset to Default
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Default logo is shown. Upload your own image (JPEG, PNG, WEBP, max 2MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={invoiceData.company?.companyName || 'Asian Clothify'}
                  onChange={(e) => handleCompanyChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={invoiceData.company?.contactPerson || ''}
                  onChange={(e) => handleCompanyChange('contactPerson', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="Contact person"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={invoiceData.company?.email || 'info@asianclothify.com'}
                  onChange={(e) => handleCompanyChange('email', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="company@example.com"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={invoiceData.company?.phone || '+8801305-785685'}
                  onChange={(e) => handleCompanyChange('phone', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="Phone number"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={invoiceData.company?.address || '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'}
                  onChange={(e) => handleCompanyChange('address', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="Full company address"
                />
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={invoiceData.customer?.companyName || ''}
                  onChange={(e) => handleCustomerChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={invoiceData.customer?.contactPerson || ''}
                  onChange={(e) => handleCustomerChange('contactPerson', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="Contact person"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={invoiceData.customer?.email || ''}
                  onChange={(e) => handleCustomerChange('email', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={invoiceData.customer?.phone || ''}
                  onChange={(e) => handleCustomerChange('phone', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={invoiceData.customer?.whatsapp || ''}
                  onChange={(e) => handleCustomerChange('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                  placeholder="WhatsApp number"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Billing Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={invoiceData.customer?.billingAddress || ''}
                    onChange={(e) => handleCustomerChange('billingAddress', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={invoiceData.customer?.billingCity || ''}
                    onChange={(e) => handleCustomerChange('billingCity', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={invoiceData.customer?.billingZipCode || ''}
                    onChange={(e) => handleCustomerChange('billingZipCode', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    placeholder="ZIP/Postal code"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={invoiceData.customer?.billingCountry || ''}
                    onChange={(e) => handleCustomerChange('billingCountry', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">Shipping Address</h3>
                <button
                  onClick={copyBillingToShipping}
                  className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy from Billing
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={invoiceData.customer?.shippingAddress || ''}
                    onChange={(e) => handleCustomerChange('shippingAddress', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={invoiceData.customer?.shippingCity || ''}
                    onChange={(e) => handleCustomerChange('shippingCity', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={invoiceData.customer?.shippingZipCode || ''}
                    onChange={(e) => handleCustomerChange('shippingZipCode', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    placeholder="ZIP/Postal code"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={invoiceData.customer?.shippingCountry || ''}
                    onChange={(e) => handleCustomerChange('shippingCountry', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Products</h2>
              <button
                onClick={() => setShowProductSearch(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            {invoiceData.items.length > 0 ? (
              <div className="space-y-4">
                {invoiceData.items.map((item, itemIndex) => {
                  const product = productDetails[item.productId];
                  const isExpanded = expandedItems[itemIndex] !== false;
                  
                  return (
                    <ProductItemCard
                      key={`${itemIndex}-${item.productId}`}
                      item={item}
                      itemIndex={itemIndex}
                      product={product}
                      onUpdate={handleColorQuantityChange}
                      onAddColor={handleAddColor}
                      onAddSize={handleAddSize}
                      onRemoveColor={handleRemoveColor}
                      onRemoveSize={handleRemoveSize}
                      onRemoveProduct={handleRemoveProduct}
                      isExpanded={isExpanded}
                      onToggleExpand={() => toggleExpand(itemIndex)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-gray-900 mb-1">No products added</h3>
                <p className="text-xs text-gray-500 mb-4">Click the "Add Product" button to add products to this invoice</p>
                <button
                  onClick={() => setShowProductSearch(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Summary and Additional Information */}
{/* Summary and Additional Information */}
<div className="space-y-6">
  {/* Top Row - Summary and Bank Details side by side */}
  <div className="grid grid-cols-2 gap-6">
     {/* Bank Details Form */}
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-[#E39A65]" />
          Bank Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Bank Name</label>
            <input
              type="text"
              value={invoiceData.bankDetails?.bankName || ''}
              onChange={(e) => handleBankDetailsChange('bankName', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
              placeholder="Enter bank name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Account Name</label>
            <input
              type="text"
              value={invoiceData.bankDetails?.accountName || ''}
              onChange={(e) => handleBankDetailsChange('accountName', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
              placeholder="Enter account holder name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Account Number</label>
            <input
              type="text"
              value={invoiceData.bankDetails?.accountNumber || ''}
              onChange={(e) => handleBankDetailsChange('accountNumber', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
              placeholder="Enter account number"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Account Type</label>
            <input
              type="text"
              value={invoiceData.bankDetails?.accountType || ''}
              onChange={(e) => handleBankDetailsChange('accountType', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
              placeholder="e.g., Savings, Checking, Business"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Routing Number</label>
              <input
                type="text"
                value={invoiceData.bankDetails?.routingNumber || ''}
                onChange={(e) => handleBankDetailsChange('routingNumber', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
                placeholder="Routing #"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">SWIFT Code</label>
              <input
                type="text"
                value={invoiceData.bankDetails?.swiftCode || ''}
                onChange={(e) => handleBankDetailsChange('swiftCode', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
                placeholder="SWIFT code"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">IBAN (Optional)</label>
            <input
              type="text"
              value={invoiceData.bankDetails?.iban || ''}
              onChange={(e) => handleBankDetailsChange('iban', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
              placeholder="IBAN"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Bank Address</label>
            <textarea
              value={invoiceData.bankDetails?.bankAddress || ''}
              onChange={(e) => handleBankDetailsChange('bankAddress', e.target.value)}
              rows="2"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
              placeholder="Enter bank address"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Summary Form */}
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
        
        <div className="space-y-6">
          {/* Calculations */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Calculations</h3>
            
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">VAT (%)</span>
                <input
                  type="number"
                  value={invoiceData.vatPercentage}
                  onChange={(e) => handleInputChange('vatPercentage', e.target.value)}
                  onBlur={() => handleNumericBlur('vatPercentage')}
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-20 px-2 py-1 text-right text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">VAT Amount</span>
                <span className="font-medium text-blue-600">{formatPrice(vatAmount)}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">After VAT</span>
                <span className="text-lg font-bold text-blue-700">{formatPrice(totalAfterVat)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Discount (%)</span>
                <input
                  type="number"
                  value={invoiceData.discountPercentage}
                  onChange={(e) => handleInputChange('discountPercentage', e.target.value)}
                  onBlur={() => handleNumericBlur('discountPercentage')}
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-20 px-2 py-1 text-right text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount Amount</span>
                <span className="font-medium text-red-600">-{formatPrice(discountAmount)}</span>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-yellow-700">After Discount</span>
                <span className="text-lg font-bold text-yellow-700">{formatPrice(totalAfterDiscount)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Shipping Cost</span>
              <input
                type="number"
                value={invoiceData.shippingCost}
                onChange={(e) => handleInputChange('shippingCost', e.target.value)}
                onBlur={() => handleNumericBlur('shippingCost')}
                min="0"
                step="0.01"
                className="w-24 px-2 py-1 text-right text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
              />
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-emerald-700">Final Total</span>
                <span className="text-xl font-bold text-emerald-700">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4 pt-3 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#E39A65]" />
              Payment Details
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Amount Paid</span>
                <input
                  type="number"
                  value={invoiceData.amountPaid}
                  onChange={(e) => handleInputChange('amountPaid', e.target.value)}
                  onBlur={() => handleNumericBlur('amountPaid')}
                  min="0"
                  max={finalTotal}
                  step="0.01"
                  className="w-24 px-2 py-1 text-right text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Due Amount</span>
                <span className={`text-lg font-bold ${status.color}`}>{formatPrice(dueAmount)}</span>
              </div>

              <div className="flex justify-center mt-2">
                <StatusBadge status={status.text} />
              </div>

              <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Payment Summary</h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Final Total:</span>
                    <span className="font-medium">{formatPrice(finalTotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Paid:</span>
                    <span className="font-medium text-green-600">{formatPrice(paidAmount)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold pt-1 border-t border-gray-200">
                    <span className={status.color}>Balance:</span>
                    <span className={status.color}>{formatPrice(dueAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   
  </div>

  {/* Additional Information - Full Width Below */}
  <div className="w-full">
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Notes
          </label>
          <textarea
            value={invoiceData.notes}
            onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
            rows="3"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
            placeholder="Add any additional notes..."
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Terms & Conditions
          </label>
          <textarea
            value={invoiceData.terms}
            onChange={(e) => setInvoiceData(prev => ({ ...prev, terms: e.target.value }))}
            rows="3"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
          />
        </div>

        {/* Dynamic Fields Section */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Custom Fields</h3>
            <button
              onClick={handleAddField}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Field
            </button>
          </div>

          {dynamicFields.length > 0 ? (
            <div className="space-y-3">
              {dynamicFields.map((field) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={field.fieldName}
                      onChange={(e) => handleFieldChange(field.id, 'fieldName', e.target.value)}
                      placeholder="Field name (e.g., PO Number)"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={field.fieldValue}
                      onChange={(e) => handleFieldChange(field.id, 'fieldValue', e.target.value)}
                      placeholder="Value"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveField(field.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove field"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic text-center py-3 border border-dashed border-gray-200 rounded-lg">
              No custom fields added. Click "Add Field" to create custom fields.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <button
              onClick={handleSendInvoice}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Create & Send Invoice
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-700 mb-2">Inquiry Details</h3>
            <div className="space-y-1 text-xs text-gray-500">
              <p>Inquiry: {invoiceData.inquiryNumber}</p>
              <p>ID: {invoiceData.inquiryId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>

      {/* Search Product Modal */}
      <SearchProductModal
        isOpen={showProductSearch}
        onClose={() => setShowProductSearch(false)}
        onSelectProduct={handleAddProduct}
        existingProductIds={existingProductIds}
      />
    </div>
  );
}