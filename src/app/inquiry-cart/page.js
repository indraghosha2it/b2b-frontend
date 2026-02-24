// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import {
//   Trash2,
//   Plus,
//   Minus,
//   ShoppingCart,
//   ArrowLeft,
//   Send,
//   FileText,
//   Upload,
//   X,
//   Loader2,
//   AlertCircle,
//   CheckCircle
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
//   }).format(price || 0);
// };

// export default function InquiryCartPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [specialInstructions, setSpecialInstructions] = useState('');
//   const [attachments, setAttachments] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   // Fetch cart on mount
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       toast.error('Failed to load cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateQuantity = async (itemId, newQuantities) => {
//     try {
//       const token = localStorage.getItem('token');
//       const totalQty = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0);

//       const response = await fetch(`http://localhost:5000/api/inquiry-cart/item/${itemId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           sizeQuantities: newQuantities,
//           totalQuantity: totalQty
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         setCart(data.data);
//       }
//     } catch (error) {
//       console.error('Error updating cart:', error);
//       toast.error('Failed to update cart');
//     }
//   };

//   const handleRemoveItem = async (itemId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/inquiry-cart/item/${itemId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setCart(data.data);
//         toast.success('Item removed from cart');
//       }
//     } catch (error) {
//       console.error('Error removing item:', error);
//       toast.error('Failed to remove item');
//     }
//   };

//   const handleClearCart = async () => {
//     if (!confirm('Are you sure you want to clear your entire cart?')) return;

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/inquiry-cart/clear', {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setCart({ ...cart, items: [], totalItems: 0, totalQuantity: 0, estimatedTotal: 0 });
//         toast.success('Cart cleared');
//       }
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//       toast.error('Failed to clear cart');
//     }
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('attachment', file);

//     setUploading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/inquiry-cart/upload', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//       });

//       const data = await response.json();
//       if (data.success) {
//         setAttachments([...attachments, data.data]);
//         toast.success('File uploaded successfully');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       toast.error('Failed to upload file');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removeAttachment = (index) => {
//     setAttachments(attachments.filter((_, i) => i !== index));
//   };

//   const handleSubmitInquiry = async () => {
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/inquiry-cart/submit', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           specialInstructions,
//           attachments
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Inquiry submitted successfully!');
//         router.push('/customer/dashboard');
//       } else {
//         toast.error(data.error || 'Failed to submit inquiry');
//       }
//     } catch (error) {
//       console.error('Error submitting inquiry:', error);
//       toast.error('Failed to submit inquiry');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-20">
//           <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 mt-20">
//         <div className="container mx-auto px-4 max-w-7xl py-8">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#E39A65] mb-2">
//                 <ArrowLeft className="w-4 h-4" />
//                 Continue Shopping
//               </Link>
//               <h1 className="text-2xl font-bold text-gray-900">Inquiry Cart</h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Review your items and submit an inquiry
//               </p>
//             </div>
//             {cart?.items?.length > 0 && (
//               <button
//                 onClick={handleClearCart}
//                 className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Clear Cart
//               </button>
//             )}
//           </div>

//           {!cart?.items?.length ? (
//             <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
//               <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
//               <p className="text-gray-500 mb-6">Start adding products to create your inquiry</p>
//               <Link
//                 href="/products"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
//               >
//                 Browse Products
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Cart Items */}
//            {/* Cart Items */}
// <div className="lg:col-span-2 space-y-4">
//   {cart.items.map((item) => (
//     <div key={item._id} className="bg-white rounded-xl border border-gray-200 p-4">
//       <div className="flex gap-4">
//         {/* Product Image */}
//         <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//           <img
//             src={item.productImage || 'https://via.placeholder.com/96'}
//             alt={item.productName}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="font-semibold text-gray-900">{item.productName}</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 Total Quantity: <span className="font-medium text-gray-900">{item.totalQuantity} pcs</span>
//               </p>
//             </div>
//             <button
//               onClick={() => handleRemoveItem(item._id)}
//               className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
//               title="Remove product"
//             >
//               <Trash2 className="w-4 h-4 text-red-500" />
//             </button>
//           </div>

//           {/* Colors and Sizes Section */}
//           <div className="mt-4 space-y-3">
//             <h4 className="text-sm font-medium text-gray-700">Selected Colors & Sizes:</h4>
//             {item.colors?.map((colorItem, colorIndex) => (
//               <div key={colorIndex} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center gap-2">
//                     <div 
//                       className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
//                       style={{ backgroundColor: colorItem.color?.code || '#CCCCCC' }}
//                     />
//                     <span className="text-sm font-medium text-gray-800">
//                       {colorItem.color?.name || colorItem.color?.code || `Color ${colorIndex + 1}`}
//                     </span>
//                   </div>
//                   <span className="text-xs bg-[#E39A65] text-white px-2 py-1 rounded-full">
//                     {colorItem.totalForColor || 
//                       colorItem.sizeQuantities?.reduce((sum, sq) => sum + (sq.quantity || 0), 0)} pcs
//                   </span>
//                 </div>
                
//                 {/* Size Quantities for this color */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
//                   {(colorItem.sizeQuantities || []).map((sizeQty, sqIndex) => (
//                     sizeQty.quantity > 0 ? (
//                       <div key={sqIndex} className="flex items-center text-sm bg-white p-1.5 rounded border border-gray-200">
//                         <span className="text-gray-600 w-8 font-medium">{sizeQty.size}:</span>
//                         <span className="font-semibold text-gray-900 ml-1">{sizeQty.quantity}</span>
//                       </div>
//                     ) : null
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Price and Total */}
//           <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-200">
//             <div>
//               <span className="text-sm text-gray-500">Unit Price:</span>
//               <span className="ml-2 font-medium text-[#E39A65]">{formatPrice(item.unitPrice)}</span>
//             </div>
//             <div>
//               <span className="text-sm text-gray-500">Product Total:</span>
//               <span className="ml-2 font-bold text-gray-900">
//                 {formatPrice(item.totalQuantity * item.unitPrice)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//               {/* Order Summary */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
//                   <h2 className="text-lg font-semibold text-gray-900 mb-4">Inquiry Summary</h2>
                  
//                   <div className="space-y-3 mb-4">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Total Items:</span>
//                       <span className="font-medium text-gray-900">{cart.totalItems}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Total Quantity:</span>
//                       <span className="font-medium text-gray-900">{cart.totalQuantity} pcs</span>
//                     </div>
//                     <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
//                       <span>Estimated Total:</span>
//                       <span className="text-[#E39A65]">{formatPrice(cart.estimatedTotal)}</span>
//                     </div>
//                   </div>

//                   {/* Special Instructions */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Special Instructions
//                     </label>
//                     <textarea
//                       value={specialInstructions}
//                       onChange={(e) => setSpecialInstructions(e.target.value)}
//                       rows="3"
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none resize-none"
//                       placeholder="Add any special requirements or notes..."
//                     />
//                   </div>

//                   {/* File Attachments */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Attachments (Optional)
//                     </label>
//                     <div className="space-y-2">
//                       {attachments.map((file, index) => (
//                         <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//                           <div className="flex items-center gap-2">
//                             <FileText className="w-4 h-4 text-gray-500" />
//                             <span className="text-xs text-gray-600 truncate max-w-[150px]">
//                               {file.fileName}
//                             </span>
//                           </div>
//                           <button
//                             onClick={() => removeAttachment(index)}
//                             className="p-1 hover:bg-gray-200 rounded"
//                           >
//                             <X className="w-3 h-3 text-gray-500" />
//                           </button>
//                         </div>
//                       ))}
                      
//                       <label className="block">
//                         <input
//                           type="file"
//                           onChange={handleFileUpload}
//                           accept=".jpg,.jpeg,.png,.pdf"
//                           className="hidden"
//                           disabled={uploading}
//                         />
//                         <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#E39A65] transition-colors">
//                           {uploading ? (
//                             <Loader2 className="w-4 h-4 animate-spin text-[#E39A65]" />
//                           ) : (
//                             <Upload className="w-4 h-4 text-gray-500" />
//                           )}
//                           <span className="text-sm text-gray-600">
//                             {uploading ? 'Uploading...' : 'Upload File'}
//                           </span>
//                         </div>
//                       </label>
//                       <p className="text-xs text-gray-500">
//                         Allowed: JPG, PNG, PDF (Max 5MB)
//                       </p>
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     onClick={handleSubmitInquiry}
//                     disabled={submitting || !cart.items.length}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#E39A65] text-white font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {submitting ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Submitting...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4" />
//                         Submit Inquiry
//                       </>
//                     )}
//                   </button>

//                   {/* MOQ Warning */}
//                   {cart.items.some(item => item.totalQuantity < item.moq) && (
//                     <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                       <div className="flex items-start gap-2">
//                         <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
//                         <p className="text-xs text-yellow-700">
//                           Some items don't meet the minimum order quantity. Please adjust quantities.
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Send,
  FileText,
  Upload,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Save
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

export default function InquiryCartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  // State for expanded items and color selection
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [colorQuantities, setColorQuantities] = useState({});
  const [addingToCart, setAddingToCart] = useState({});
  const [productDetails, setProductDetails] = useState({});
  
  // State for editing existing colors
  const [editingColors, setEditingColors] = useState({});
  const [editedQuantities, setEditedQuantities] = useState({});
  const [savingEdits, setSavingEdits] = useState({});
  const [deletingColor, setDeletingColor] = useState({});
  
  // State for deleting colors - styled modal
  const [deleteModal, setDeleteModal] = useState({ 
    show: false, 
    itemId: null, 
    colorIndex: null,
    colorName: '',
    productName: ''
  });

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/inquiry-cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        // Fetch product details for each item to get available colors/sizes
        data.data.items.forEach(item => {
          fetchProductDetails(item.productId);
        });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

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

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Toggle edit mode for a specific color
  const toggleEditColor = (itemId, colorIndex) => {
    const key = `${itemId}-${colorIndex}`;
    setEditingColors(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      
      // Initialize edited quantities when starting edit
      if (newState[key]) {
        const item = cart.items.find(i => i._id === itemId);
        if (item && item.colors[colorIndex]) {
          const colorData = item.colors[colorIndex];
          
          // Convert array of size quantities to object for easy editing
          const quantitiesObj = {};
          (colorData.sizeQuantities || []).forEach(sq => {
            quantitiesObj[sq.size] = sq.quantity;
          });
          
          setEditedQuantities(prev => ({
            ...prev,
            [key]: quantitiesObj
          }));
        }
      }
      
      return newState;
    });
  };

  // Handle quantity change in edit mode
  const handleEditQuantityChange = (itemId, colorIndex, size, value) => {
    const key = `${itemId}-${colorIndex}`;
    const qty = parseInt(value) || 0;
    
    setEditedQuantities(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [size]: qty
      }
    }));
  };

  // Show delete modal instead of browser confirm
  const showDeleteModal = (itemId, colorIndex, colorName, productName) => {
    setDeleteModal({
      show: true,
      itemId,
      colorIndex,
      colorName: colorName || 'this color',
      productName
    });
  };

  // Handle delete color
// Handle delete color
const handleDeleteColor = async () => {
  const { itemId, colorIndex } = deleteModal;
  
  // Close modal immediately
  closeDeleteModal();
  
  const key = `${itemId}-${colorIndex}`;
  setDeletingColor(prev => ({ ...prev, [key]: true }));
  
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`http://localhost:5000/api/inquiry-cart/item/${itemId}/color/${colorIndex}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (data.success) {
      setCart(data.data);
      
      // Show success toast
      toast.success('Color removed successfully', {
        description: 'The color has been removed from your cart',
        duration: 3000,
      });
      
      // Dispatch cart update event
      window.dispatchEvent(new Event('cart-update'));
      
      // If the item still exists but with remaining colors, collapse the add section
      const updatedItem = data.data.items.find(item => item._id === itemId);
      if (updatedItem && updatedItem.colors && updatedItem.colors.length > 0) {
        // Keep expanded state as is or collapse if needed
        setExpandedItems(prev => ({
          ...prev,
          [itemId]: false
        }));
      }
      
    } else {
      // Show error toast
      toast.error('Failed to remove color', {
        description: data.error || 'Something went wrong',
        duration: 4000
      });
    }
    
  } catch (error) {
    console.error('Error deleting color:', error);
    
    // Show error toast
    toast.error('Failed to remove color', {
      description: error.message || 'Network error occurred',
      duration: 4000
    });
  } finally {
    setDeletingColor(prev => ({ ...prev, [key]: false }));
  }
};

  // Close modal
  const closeDeleteModal = () => {
    setDeleteModal({ show: false, itemId: null, colorIndex: null, colorName: '', productName: '' });
  };

  // Save edited quantities for a color
// Save edited quantities for a color
// Save edited quantities for a color
const handleSaveColorEdits = async (itemId, colorIndex) => {
  const key = `${itemId}-${colorIndex}`;
  const editedData = editedQuantities[key];
  
  if (!editedData) return;
  
  setSavingEdits(prev => ({ ...prev, [key]: true }));
  
  try {
    const token = localStorage.getItem('token');
    const item = cart.items.find(i => i._id === itemId);
    if (!item) return;

    // Get all available sizes from the product
    const productDetail = productDetails[item.productId];
    const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
    
    // Create an array with ALL sizes, including zeros for the edited color
    const updatedSizeQuantities = allSizes.map(size => ({
      size,
      quantity: editedData[size] || 0
    }));

    // Update the specific color's quantities
    const updatedColors = [...item.colors];
    updatedColors[colorIndex] = {
      ...updatedColors[colorIndex],
      color: {
        code: updatedColors[colorIndex].color?.code || '#CCCCCC',
        name: updatedColors[colorIndex].color?.name || updatedColors[colorIndex].color?.code || 'Unknown Color'
      },
      sizeQuantities: updatedSizeQuantities,
      // Remove totalQuantity and totalForColor - let backend calculate
    };

    const cartItem = {
      productId: item.productId,
      productName: item.productName,
      colors: updatedColors,
      // REMOVE totalQuantity - let backend calculate
      unitPrice: item.unitPrice, // Send current price, backend will recalc
      moq: item.moq,
      productImage: item.productImage,
      specialInstructions: item.specialInstructions 
    };

    console.log('📤 Saving edited colors:', JSON.stringify(cartItem, null, 2));

    const response = await fetch('http://localhost:5000/api/inquiry-cart/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItem)
    });

    const data = await response.json();
    if (data.success) {
      setCart(data.data);
      
      // Exit edit mode
      setEditingColors(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
      
      setEditedQuantities(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
      
      toast.success('Quantities updated successfully');
      
      // Dispatch cart update event
      window.dispatchEvent(new Event('cart-update'));
    } else {
      console.error('❌ Server response error:', data);
      toast.error(data.error || 'Failed to update quantities');
    }
  } catch (error) {
    console.error('❌ Error updating quantities:', error);
    toast.error('Failed to update quantities');
  } finally {
    setSavingEdits(prev => ({ ...prev, [key]: false }));
  }
};

  // Cancel edit mode
  const cancelEdit = (itemId, colorIndex) => {
    const key = `${itemId}-${colorIndex}`;
    setEditingColors(prev => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
    setEditedQuantities(prev => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };

  const handleColorSelect = (itemId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [itemId]: color
    }));

    // Initialize quantities for this color
    if (!colorQuantities[itemId]) {
      setColorQuantities(prev => ({
        ...prev,
        [itemId]: {}
      }));
    }
  };

  const handleQuantityChange = (itemId, size, value) => {
    const qty = parseInt(value) || 0;
    setColorQuantities(prev => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [size]: qty
      }
    }));
  };

  // Handle adding a new color
 // Handle adding a new color
const handleAddColorToCart = async (item) => {
  const selectedColor = selectedColors[item._id];
  if (!selectedColor) {
    toast.error('Please select a color');
    return;
  }

  const quantities = colorQuantities[item._id] || {};
  const totalQty = Object.values(quantities).reduce((sum, qty) => sum + (qty || 0), 0);

  if (totalQty === 0) {
    toast.error('Please enter quantities for at least one size');
    return;
  }

  setAddingToCart(prev => ({ ...prev, [item._id]: true }));

  try {
    const token = localStorage.getItem('token');
    
    // Get existing colors from current item
    const existingColors = item.colors || [];
    
    // Check if this color already exists
    const colorExists = existingColors.some(
      c => c.color?.code === selectedColor.code
    );

    if (colorExists) {
      toast.error('This color is already in your cart');
      setAddingToCart(prev => ({ ...prev, [item._id]: false }));
      return;
    }

    // Get all available sizes for this product
    const productDetail = productDetails[item.productId];
    const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];

    // Create array with ALL sizes, including zeros
    const sizeQuantitiesArray = allSizes.map(size => ({
      size,
      quantity: quantities[size] || 0
    }));

    // Prepare the new color data with proper structure
    const newColorData = {
      color: {
        code: selectedColor.code,
        name: selectedColor.name || selectedColor.code
      },
      sizeQuantities: sizeQuantitiesArray,
      totalQuantity: totalQty,
      totalForColor: totalQty
    };

    // Update the cart with the new color - MERGE with existing colors
    const updatedColors = [...existingColors, newColorData];
    const updatedTotalQuantity = updatedColors.reduce(
      (sum, color) => sum + (color.totalQuantity || 0), 
      0
    );

    // Determine the correct unit price based on the new total quantity
    let updatedUnitPrice = item.unitPrice;
    
    // Check if product has bulk pricing tiers
    if (productDetail?.quantityBasedPricing && productDetail.quantityBasedPricing.length > 0) {
      const sortedTiers = [...productDetail.quantityBasedPricing].sort((a, b) => {
        const aMin = parseInt(a.range.split('-')[0] || a.range.replace('+', ''));
        const bMin = parseInt(b.range.split('-')[0] || b.range.replace('+', ''));
        return aMin - bMin;
      });
      
      // Find the applicable tier based on updatedTotalQuantity
      for (const tier of sortedTiers) {
        const range = tier.range;
        if (range.includes('-')) {
          const [min, max] = range.split('-').map(Number);
          if (updatedTotalQuantity >= min && updatedTotalQuantity <= max) {
            updatedUnitPrice = tier.price;
            break;
          }
        } else if (range.includes('+')) {
          const minQty = parseInt(range.replace('+', ''));
          if (updatedTotalQuantity >= minQty) {
            updatedUnitPrice = tier.price;
            break;
          }
        }
      }
    }

    const cartItem = {
      productId: item.productId,
      productName: item.productName,
      colors: updatedColors,
      totalQuantity: updatedTotalQuantity,
      unitPrice: updatedUnitPrice,
      moq: item.moq,
      productImage: item.productImage
    };

    console.log('📤 Adding new color to existing product:', JSON.stringify(cartItem, null, 2));

    const response = await fetch('http://localhost:5000/api/inquiry-cart/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItem)
    });

    const data = await response.json();
    
    if (data.success) {
      toast.success(`${selectedColor.code || 'Color'} added successfully!`);
      
      // Reset selections for this item
      setSelectedColors(prev => {
        const newState = { ...prev };
        delete newState[item._id];
        return newState;
      });
      
      setColorQuantities(prev => {
        const newState = { ...prev };
        delete newState[item._id];
        return newState;
      });

      // Update cart with the response data
      setCart(data.data);
      
      // Dispatch cart update event
      window.dispatchEvent(new Event('cart-update'));
      
      // Collapse the add color section
      setExpandedItems(prev => ({
        ...prev,
        [item._id]: false
      }));
    } else {
      console.error('❌ Server response error:', data);
      toast.error(data.error || 'Failed to add color');
    }
  } catch (error) {
    console.error('❌ Error adding color:', error);
    toast.error('Failed to add color');
  } finally {
    setAddingToCart(prev => ({ ...prev, [item._id]: false }));
  }
};

  const handleRemoveItem = async (itemId) => {
    if (!confirm('Are you sure you want to remove this product from your cart?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inquiry-cart/item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.data);
        
        toast.success('Product removed from cart', {
          description: 'The item has been removed successfully',
          duration: 3000,
          icon: '🗑️'
        });
        
        // Dispatch cart update event
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error('Failed to remove product', {
          description: data.error || 'Something went wrong',
          duration: 4000
        });
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove product', {
        description: error.message || 'Network error occurred',
        duration: 4000
      });
    }
  };

  const handleClearCart = async () => {
    if (!confirm('Are you sure you want to clear your entire cart? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/inquiry-cart/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setCart({ ...cart, items: [], totalItems: 0, totalQuantity: 0, estimatedTotal: 0 });
        
        toast.success('Cart cleared successfully', {
          description: 'All items have been removed from your cart',
          duration: 3000,
          icon: '🧹'
        });
        
        // Dispatch cart update event
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error('Failed to clear cart', {
          description: data.error || 'Something went wrong',
          duration: 4000
        });
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart', {
        description: error.message || 'Network error occurred',
        duration: 4000
      });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('attachment', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/inquiry-cart/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setAttachments([...attachments, data.data]);
        toast.success('File uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmitInquiry = async () => {
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/inquiry-cart/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          specialInstructions,
          attachments
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Inquiry submitted successfully!');
        router.push('/customer/dashboard');
      } else {
        toast.error(data.error || 'Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 mt-20">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#E39A65] mb-2">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Inquiry Cart</h1>
              <p className="text-sm text-gray-500 mt-1">
                Review and modify your inquiry items
              </p>
            </div>
            {cart?.items?.length > 0 && (
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            )}
          </div>

          {!cart?.items?.length ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Start adding products to create your inquiry</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => {
                  const productDetail = productDetails[item.productId];
                  const availableColors = productDetail?.colors || [];
                  const availableSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
                  const isExpanded = expandedItems[item._id];
                  const selectedColor = selectedColors[item._id];
                  const quantities = colorQuantities[item._id] || {};
                  const isAdding = addingToCart[item._id];

                  return (
                    <div key={item._id} className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.productImage || 'https://via.placeholder.com/96'}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
              <div className="flex-1">
  <div className="flex justify-between items-start">
    <div>
      <Link 
        href={`/productDetails?id=${item.productId}`}
        className="block w-fit"
      >
        <h3 className="font-semibold text-gray-900 hover:text-[#E39A65] transition-colors cursor-pointer">
          {item.productName}
        </h3>
      </Link>
      <p className="text-sm text-gray-500 mt-1">
        Total Quantity: <span className="font-medium text-gray-900">{item.totalQuantity} pcs</span>
      </p>
    </div>
    <button
      onClick={() => handleRemoveItem(item._id)}
      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
      title="Remove product"
    >
      <Trash2 className="w-4 h-4 text-red-500" />
    </button>
  </div>

                          {/* Colors and Sizes Section */}
                          <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-700">Selected Colors & Sizes:</h4>
                              {availableColors.length > 0 && (
                                <button
                                  onClick={() => toggleExpand(item._id)}
                                  className="flex items-center gap-1 text-xs text-[#E39A65] hover:text-[#d48b54] transition-colors"
                                >
                                  {isExpanded ? (
                                    <>Hide Add Color <ChevronUp className="w-3 h-3" /></>
                                  ) : (
                                    <>Add More Colors <ChevronDown className="w-3 h-3" /></>
                                  )}
                                </button>
                              )}
                            </div>
                            
                            {/* Existing Colors - With inline editing, delete option always visible */}
                            {item.colors?.map((colorItem, colorIndex) => {
                              const editKey = `${item._id}-${colorIndex}`;
                              const isEditing = editingColors[editKey];
                              const isSaving = savingEdits[editKey];
                              const isDeleting = deletingColor[`${item._id}-${colorIndex}`];
                              const editedData = editedQuantities[editKey] || {};
                              
                              // Get all available sizes for this product
                              const allSizes = availableSizes;
                              
                              // Create a map of existing quantities
                              const existingQuantities = {};
                              (colorItem.sizeQuantities || []).forEach(sq => {
                                existingQuantities[sq.size] = sq.quantity;
                              });
                              
                              return (
                                <div key={colorIndex} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <div 
                                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                                        style={{ backgroundColor: colorItem.color?.code || '#CCCCCC' }}
                                      />
                                      <span className="text-sm font-medium text-gray-800">
                                        {colorItem.color?.name || colorItem.color?.code || `Color ${colorIndex + 1}`}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs bg-[#E39A65] text-white px-2 py-1 rounded-full">
                                        {colorItem.totalQuantity} pcs
                                      </span>
                                      
                                      {/* Delete Color Button - Always visible */}
                                      <button
                                        onClick={() => showDeleteModal(
                                          item._id, 
                                          colorIndex, 
                                          colorItem.color?.name || colorItem.color?.code || `Color ${colorIndex + 1}`,
                                          item.productName
                                        )}
                                        disabled={isDeleting}
                                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Remove this color"
                                      >
                                        {isDeleting ? (
                                          <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                          <Trash2 className="w-4 h-4" />
                                        )}
                                      </button>
                                      
                                      {!isEditing ? (
                                        <button
                                          onClick={() => toggleEditColor(item._id, colorIndex)}
                                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                          title="Edit quantities"
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      ) : (
                                        <div className="flex gap-1">
                                          <button
                                            onClick={() => handleSaveColorEdits(item._id, colorIndex)}
                                            disabled={isSaving}
                                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                            title="Save changes"
                                          >
                                            {isSaving ? (
                                              <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                              <Save className="w-4 h-4" />
                                            )}
                                          </button>
                                          <button
                                            onClick={() => cancelEdit(item._id, colorIndex)}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Cancel"
                                          >
                                            <X className="w-4 h-4" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Size Quantities Grid - All sizes shown */}
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                                    {allSizes.map((size, idx) => {
                                      const currentQty = isEditing 
                                        ? (editedData[size] !== undefined ? editedData[size] : (existingQuantities[size] || 0))
                                        : (existingQuantities[size] || 0);
                                      
                                      return (
                                        <div key={idx} className="flex items-center">
                                          <span className="text-xs text-gray-500 w-8">{size}:</span>
                                          {isEditing ? (
                                            <input
                                              type="number"
                                              min="0"
                                              value={currentQty || ''}
                                              onChange={(e) => handleEditQuantityChange(
                                                item._id, 
                                                colorIndex, 
                                                size, 
                                                e.target.value
                                              )}
                                              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
                                              placeholder="0"
                                            />
                                          ) : (
                                            <span className={`ml-1 text-sm font-medium ${
                                              currentQty > 0 ? 'text-gray-900' : 'text-gray-400'
                                            }`}>
                                              {currentQty > 0 ? currentQty : '-'}
                                            </span>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                  
                                  {/* Show message if no quantities entered (in view mode) */}
                                  {!isEditing && Object.values(existingQuantities).every(qty => qty === 0) && (
                                    <p className="text-xs text-gray-400 mt-2 italic">
                                      No quantities specified
                                    </p>
                                  )}
                                </div>
                              );
                            })}

                                        {/* Display special instructions if they exist */}
                      {item.specialInstructions && (
                        <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-[#E39A65]">
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-[#E39A65] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-medium text-[#E39A65]">Special Instructions:</p>
                              <p className="text-xs font-semibold text-gray-700 mt-1">{item.specialInstructions}</p>
                            </div>
                          </div>
                        </div>
                      )}

                            {/* Add New Color Section - Only shown when expanded */}
                            {isExpanded && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h5 className="text-sm font-medium text-blue-800 mb-3">Add Another Color</h5>
                                
                                {/* Color Selection */}
                                {availableColors.length > 0 && (
                                  <div className="mb-3">
                                    <label className="block text-xs text-blue-700 mb-2">Select Color:</label>
                                    <div className="flex flex-wrap gap-2">
                                      {availableColors.map((color, idx) => {
                                        // Check if color already exists in cart
                                        const colorExists = item.colors?.some(
                                          c => c.color?.code === color.code
                                        );
                                        
                                        return (
                                          <button
                                            key={idx}
                                            onClick={() => !colorExists && handleColorSelect(item._id, color)}
                                            disabled={colorExists}
                                            className={`relative p-0.5 rounded-full transition-all ${
                                              selectedColor?.code === color.code
                                                ? 'ring-2 ring-blue-600 ring-offset-2'
                                                : colorExists
                                                ? 'opacity-40 cursor-not-allowed'
                                                : 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2'
                                            }`}
                                            title={colorExists ? 'Already in cart' : color.code}
                                          >
                                            <div
                                              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                                              style={{ backgroundColor: color.code }}
                                            />
                                            {colorExists && (
                                              <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-600 bg-white rounded-full" />
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Size Quantity Inputs for Selected Color */}
                                {selectedColor && (
                                  <>
                                    <div className="mb-3">
                                      <label className="block text-xs text-blue-700 mb-2">Enter Quantities:</label>
                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {availableSizes.map((size, idx) => (
                                          <div key={idx} className="flex flex-col">
                                            <label className="text-xs text-gray-600 mb-1">{size}</label>
                                            <input
                                              type="number"
                                              min="0"
                                              value={quantities[size] || ''}
                                              onChange={(e) => handleQuantityChange(item._id, size, e.target.value)}
                                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                              placeholder="Qty"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Add Button */}
                                    <button
                                      onClick={() => handleAddColorToCart(item)}
                                      disabled={isAdding}
                                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {isAdding ? (
                                        <>
                                          <Loader2 className="w-4 h-4 animate-spin" />
                                          Adding...
                                        </>
                                      ) : (
                                        <>
                                          <Plus className="w-4 h-4" />
                                          Add This Color
                                        </>
                                      )}
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Price and Total */}
                          <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-200">
                            <div>
                              <span className="text-sm text-gray-500">Unit Price:</span>
                              <span className="ml-2 font-medium text-[#E39A65]">{formatPrice(item.unitPrice)}</span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Product Total:</span>
                              <span className="ml-2 font-bold text-gray-900">
                                {formatPrice(item.totalQuantity * item.unitPrice)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Inquiry Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-medium text-gray-900">{cart.totalItems}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Quantity:</span>
                      <span className="font-medium text-gray-900">{cart.totalQuantity} pcs</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                      <span>Estimated Total:</span>
                      <span className="text-[#E39A65]">{formatPrice(cart.estimatedTotal)}</span>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none resize-none"
                      placeholder="Add any special requirements or notes..."
                    />
                  </div>

                  {/* File Attachments */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments (Optional)
                    </label>
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-600 truncate max-w-[150px]">
                              {file.fileName}
                            </span>
                          </div>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <X className="w-3 h-3 text-gray-500" />
                          </button>
                        </div>
                      ))}
                      
                      <label className="block">
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="hidden"
                          disabled={uploading}
                        />
                        <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#E39A65] transition-colors">
                          {uploading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#E39A65]" />
                          ) : (
                            <Upload className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-sm text-gray-600">
                            {uploading ? 'Uploading...' : 'Upload File'}
                          </span>
                        </div>
                      </label>
                      <p className="text-xs text-gray-500">
                        Allowed: JPG, PNG, PDF (Max 5MB)
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmitInquiry}
                    disabled={submitting || !cart.items.length}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#E39A65] text-white font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Inquiry
                      </>
                    )}
                  </button>

                  {/* MOQ Warning */}
                  {cart.items.some(item => item.totalQuantity < item.moq) && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-700">
                          Some items don't meet the minimum order quantity. Please adjust quantities.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal - Styled like Admin page */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Remove Color</h3>
              </div>
              
              <p className="text-gray-600 mb-2">
                Are you sure you want to remove <span className="font-semibold">"{deleteModal.colorName}"</span> from{' '}
                <span className="font-semibold">"{deleteModal.productName}"</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The color and its quantities will be removed from your cart.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteColor}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Remove Color
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}