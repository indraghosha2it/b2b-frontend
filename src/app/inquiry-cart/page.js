

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import {
//   Trash2,
//   Plus,
//   ShoppingCart,
//   ArrowLeft,
//   Send,
//   FileText,
//   Upload,
//   X,
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   ChevronDown,
//   ChevronUp,
//   Save
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
  
//   // State for expanded items and color selection
//   const [expandedItems, setExpandedItems] = useState({});
//   const [selectedColors, setSelectedColors] = useState({});
//   const [colorQuantities, setColorQuantities] = useState({});
//   const [addingToCart, setAddingToCart] = useState({});
//   const [productDetails, setProductDetails] = useState({});
  
//   // State for editing existing colors
//   const [editingColors, setEditingColors] = useState({});
//   const [editedQuantities, setEditedQuantities] = useState({});
//   const [savingEdits, setSavingEdits] = useState({});
//   const [deletingColor, setDeletingColor] = useState({});
  
//   // State for deleting colors - styled modal
//   const [deleteModal, setDeleteModal] = useState({ 
//     show: false, 
//     itemId: null, 
//     colorIndex: null,
//     colorName: '',
//     productName: ''
//   });

//   // State for product delete confirmation modal
//   const [productDeleteModal, setProductDeleteModal] = useState({ 
//     show: false, 
//     itemId: null,
//     productName: ''
//   });

//   // State for clear cart confirmation modal
//   const [clearCartModal, setClearCartModal] = useState({ 
//     show: false
//   });

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

//        console.log('🔍 === DEBUGGING STORAGE ===');
//     console.log('localStorage cart:', localStorage.getItem('cart'));
//     console.log('sessionStorage cart:', sessionStorage.getItem('cart'));
//     console.log('All localStorage keys:', Object.keys(localStorage));
//     console.log('All sessionStorage keys:', Object.keys(sessionStorage));
//     console.log('===============================');

//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         // Fetch product details for each item to get available colors/sizes
//         data.data.items.forEach(item => {
//           fetchProductDetails(item.productId);
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       toast.error('Failed to load cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductDetails = async (productId) => {
//     try {
//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/products/${productId}`);
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

//   const toggleExpand = (itemId) => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [itemId]: !prev[itemId]
//     }));
//   };

//   // Toggle edit mode for a specific color
//   const toggleEditColor = (itemId, colorIndex) => {
//     const key = `${itemId}-${colorIndex}`;
//     setEditingColors(prev => {
//       const newState = { ...prev, [key]: !prev[key] };
      
//       // Initialize edited quantities when starting edit
//       if (newState[key]) {
//         const item = cart.items.find(i => i._id === itemId);
//         if (item && item.colors[colorIndex]) {
//           const colorData = item.colors[colorIndex];
          
//           // Convert array of size quantities to object for easy editing
//           const quantitiesObj = {};
//           (colorData.sizeQuantities || []).forEach(sq => {
//             quantitiesObj[sq.size] = sq.quantity;
//           });
          
//           setEditedQuantities(prev => ({
//             ...prev,
//             [key]: quantitiesObj
//           }));
//         }
//       }
      
//       return newState;
//     });
//   };

//   // Handle quantity change in edit mode
//   const handleEditQuantityChange = (itemId, colorIndex, size, value) => {
//     const key = `${itemId}-${colorIndex}`;
//     const qty = parseInt(value) || 0;
    
//     setEditedQuantities(prev => ({
//       ...prev,
//       [key]: {
//         ...(prev[key] || {}),
//         [size]: qty
//       }
//     }));
//   };

//   // Show delete modal instead of browser confirm
//   const showDeleteModal = (itemId, colorIndex, colorName, productName) => {
//     setDeleteModal({
//       show: true,
//       itemId,
//       colorIndex,
//       colorName: colorName || 'this color',
//       productName
//     });
//   };

//   // Handle delete color
//   const handleDeleteColor = async () => {
//     const { itemId, colorIndex } = deleteModal;
    
//     // Close modal immediately
//     closeDeleteModal();
    
//     const key = `${itemId}-${colorIndex}`;
//     setDeletingColor(prev => ({ ...prev, [key]: true }));
    
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/inquiry-cart/item/${itemId}/color/${colorIndex}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
        
//         // Show success toast
//         toast.success('Color removed successfully', {
//           description: 'The color has been removed from your cart',
//           duration: 3000,
//         });
        
//         // Dispatch cart update event
//         window.dispatchEvent(new Event('cart-update'));
        
//         // If the item still exists but with remaining colors, collapse the add section
//         const updatedItem = data.data.items.find(item => item._id === itemId);
//         if (updatedItem && updatedItem.colors && updatedItem.colors.length > 0) {
//           // Keep expanded state as is or collapse if needed
//           setExpandedItems(prev => ({
//             ...prev,
//             [itemId]: false
//           }));
//         }
        
//       } else {
//         // Show error toast
//         toast.error('Failed to remove color', {
//           description: data.error || 'Something went wrong',
//           duration: 4000
//         });
//       }
      
//     } catch (error) {
//       console.error('Error deleting color:', error);
      
//       // Show error toast
//       toast.error('Failed to remove color', {
//         description: error.message || 'Network error occurred',
//         duration: 4000
//       });
//     } finally {
//       setDeletingColor(prev => ({ ...prev, [key]: false }));
//     }
//   };

//   // Close modal
//   const closeDeleteModal = () => {
//     setDeleteModal({ show: false, itemId: null, colorIndex: null, colorName: '', productName: '' });
//   };

//   // Show product delete modal instead of browser confirm
//   const showProductDeleteModal = (itemId, productName) => {
//     setProductDeleteModal({
//       show: true,
//       itemId,
//       productName
//     });
//   };

//   // Handle product delete confirmation
//   const handleProductDeleteConfirm = async () => {
//     const { itemId } = productDeleteModal;
    
//     // Close modal immediately
//     setProductDeleteModal({ show: false, itemId: null, productName: '' });
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/inquiry-cart/item/${itemId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setCart(data.data);
        
//         toast.success('Product removed from cart', {
//           description: 'The item has been removed successfully',
//           duration: 3000,
//         });
        
//         // Dispatch cart update event
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error('Failed to remove product', {
//           description: data.error || 'Something went wrong',
//           duration: 4000
//         });
//       }
//     } catch (error) {
//       console.error('Error removing item:', error);
//       toast.error('Failed to remove product', {
//         description: error.message || 'Network error occurred',
//         duration: 4000
//       });
//     }
//   };

//   // Close product delete modal
//   const closeProductDeleteModal = () => {
//     setProductDeleteModal({ show: false, itemId: null, productName: '' });
//   };

//   // Show clear cart modal instead of browser confirm
//   const showClearCartModal = () => {
//     setClearCartModal({ show: true });
//   };

//   // Handle clear cart confirmation
//   const handleClearCartConfirm = async () => {
//     // Close modal immediately
//     setClearCartModal({ show: false });
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/clear', {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setCart({ ...cart, items: [], totalItems: 0, totalQuantity: 0, estimatedTotal: 0 });
        
//         toast.success('Cart cleared successfully', {
//           description: 'All items have been removed from your cart',
//           duration: 3000,
//         });
        
//         // Dispatch cart update event
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error('Failed to clear cart', {
//           description: data.error || 'Something went wrong',
//           duration: 4000
//         });
//       }
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//       toast.error('Failed to clear cart', {
//         description: error.message || 'Network error occurred',
//         duration: 4000
//       });
//     }
//   };

//   // Close clear cart modal
//   const closeClearCartModal = () => {
//     setClearCartModal({ show: false });
//   };

//   // Save edited quantities for a color
//   const handleSaveColorEdits = async (itemId, colorIndex) => {
//     const key = `${itemId}-${colorIndex}`;
//     const editedData = editedQuantities[key];
    
//     if (!editedData) return;
    
//     setSavingEdits(prev => ({ ...prev, [key]: true }));
    
//     try {
//       const token = localStorage.getItem('token');
//       const item = cart.items.find(i => i._id === itemId);
//       if (!item) return;

//       // Get all available sizes from the product
//       const productDetail = productDetails[item.productId];
//       const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
      
//       // Create an array with ALL sizes, including zeros for the edited color
//       const updatedSizeQuantities = allSizes.map(size => ({
//         size,
//         quantity: editedData[size] || 0
//       }));

//       // Update the specific color's quantities
//       const updatedColors = [...item.colors];
//       updatedColors[colorIndex] = {
//         ...updatedColors[colorIndex],
//         color: {
//           code: updatedColors[colorIndex].color?.code || '#CCCCCC',
//           name: updatedColors[colorIndex].color?.name || updatedColors[colorIndex].color?.code || 'Unknown Color'
//         },
//         sizeQuantities: updatedSizeQuantities,
//         // Remove totalQuantity and totalForColor - let backend calculate
//       };

//       const cartItem = {
//         productId: item.productId,
//         productName: item.productName,
//         colors: updatedColors,
//         // REMOVE totalQuantity - let backend calculate
//         unitPrice: item.unitPrice, // Send current price, backend will recalc
//         moq: item.moq,
//         productImage: item.productImage,
//         specialInstructions: item.specialInstructions 
//       };

//       console.log('📤 Saving edited colors:', JSON.stringify(cartItem, null, 2));

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
//         setCart(data.data);
        
//         // Exit edit mode
//         setEditingColors(prev => {
//           const newState = { ...prev };
//           delete newState[key];
//           return newState;
//         });
        
//         setEditedQuantities(prev => {
//           const newState = { ...prev };
//           delete newState[key];
//           return newState;
//         });
        
//         toast.success('Quantities updated successfully');
        
//         // Dispatch cart update event
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         console.error('❌ Server response error:', data);
//         toast.error(data.error || 'Failed to update quantities');
//       }
//     } catch (error) {
//       console.error('❌ Error updating quantities:', error);
//       toast.error('Failed to update quantities');
//     } finally {
//       setSavingEdits(prev => ({ ...prev, [key]: false }));
//     }
//   };

//   // Cancel edit mode
//   const cancelEdit = (itemId, colorIndex) => {
//     const key = `${itemId}-${colorIndex}`;
//     setEditingColors(prev => {
//       const newState = { ...prev };
//       delete newState[key];
//       return newState;
//     });
//     setEditedQuantities(prev => {
//       const newState = { ...prev };
//       delete newState[key];
//       return newState;
//     });
//   };

//   const handleColorSelect = (itemId, color) => {
//     setSelectedColors(prev => ({
//       ...prev,
//       [itemId]: color
//     }));

//     // Initialize quantities for this color
//     if (!colorQuantities[itemId]) {
//       setColorQuantities(prev => ({
//         ...prev,
//         [itemId]: {}
//       }));
//     }
//   };

//   const handleQuantityChange = (itemId, size, value) => {
//     const qty = parseInt(value) || 0;
//     setColorQuantities(prev => ({
//       ...prev,
//       [itemId]: {
//         ...(prev[itemId] || {}),
//         [size]: qty
//       }
//     }));
//   };

//   // Handle adding a new color
//   const handleAddColorToCart = async (item) => {
//     const selectedColor = selectedColors[item._id];
//     if (!selectedColor) {
//       toast.error('Please select a color');
//       return;
//     }

//     const quantities = colorQuantities[item._id] || {};
//     const totalQty = Object.values(quantities).reduce((sum, qty) => sum + (qty || 0), 0);

//     if (totalQty === 0) {
//       toast.error('Please enter quantities for at least one size');
//       return;
//     }

//     setAddingToCart(prev => ({ ...prev, [item._id]: true }));

//     try {
//       const token = localStorage.getItem('token');
      
//       // Get existing colors from current item
//       const existingColors = item.colors || [];
      
//       // Check if this color already exists
//       const colorExists = existingColors.some(
//         c => c.color?.code === selectedColor.code
//       );

//       if (colorExists) {
//         toast.error('This color is already in your cart');
//         setAddingToCart(prev => ({ ...prev, [item._id]: false }));
//         return;
//       }

//       // Get all available sizes for this product
//       const productDetail = productDetails[item.productId];
//       const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];

//       // Create array with ALL sizes, including zeros
//       const sizeQuantitiesArray = allSizes.map(size => ({
//         size,
//         quantity: quantities[size] || 0
//       }));

//       // Prepare the new color data with proper structure
//       const newColorData = {
//         color: {
//           code: selectedColor.code,
//           name: selectedColor.name || selectedColor.code
//         },
//         sizeQuantities: sizeQuantitiesArray,
//         totalQuantity: totalQty,
//         totalForColor: totalQty
//       };

//       // Update the cart with the new color - MERGE with existing colors
//       const updatedColors = [...existingColors, newColorData];
//       const updatedTotalQuantity = updatedColors.reduce(
//         (sum, color) => sum + (color.totalQuantity || 0), 
//         0
//       );

//       // Determine the correct unit price based on the new total quantity
//       let updatedUnitPrice = item.unitPrice;
      
//       // Check if product has bulk pricing tiers
//       if (productDetail?.quantityBasedPricing && productDetail.quantityBasedPricing.length > 0) {
//         const sortedTiers = [...productDetail.quantityBasedPricing].sort((a, b) => {
//           const aMin = parseInt(a.range.split('-')[0] || a.range.replace('+', ''));
//           const bMin = parseInt(b.range.split('-')[0] || b.range.replace('+', ''));
//           return aMin - bMin;
//         });
        
//         // Find the applicable tier based on updatedTotalQuantity
//         for (const tier of sortedTiers) {
//           const range = tier.range;
//           if (range.includes('-')) {
//             const [min, max] = range.split('-').map(Number);
//             if (updatedTotalQuantity >= min && updatedTotalQuantity <= max) {
//               updatedUnitPrice = tier.price;
//               break;
//             }
//           } else if (range.includes('+')) {
//             const minQty = parseInt(range.replace('+', ''));
//             if (updatedTotalQuantity >= minQty) {
//               updatedUnitPrice = tier.price;
//               break;
//             }
//           }
//         }
//       }

//       const cartItem = {
//         productId: item.productId,
//         productName: item.productName,
//         colors: updatedColors,
//         totalQuantity: updatedTotalQuantity,
//         unitPrice: updatedUnitPrice,
//         moq: item.moq,
//         productImage: item.productImage
//       };

//       console.log('📤 Adding new color to existing product:', JSON.stringify(cartItem, null, 2));

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
//         toast.success(`${selectedColor.code || 'Color'} added successfully!`);
        
//         // Reset selections for this item
//         setSelectedColors(prev => {
//           const newState = { ...prev };
//           delete newState[item._id];
//           return newState;
//         });
        
//         setColorQuantities(prev => {
//           const newState = { ...prev };
//           delete newState[item._id];
//           return newState;
//         });

//         // Update cart with the response data
//         setCart(data.data);
        
//         // Dispatch cart update event
//         window.dispatchEvent(new Event('cart-update'));
        
//         // Collapse the add color section
//         setExpandedItems(prev => ({
//           ...prev,
//           [item._id]: false
//         }));
//       } else {
//         console.error('❌ Server response error:', data);
//         toast.error(data.error || 'Failed to add color');
//       }
//     } catch (error) {
//       console.error('❌ Error adding color:', error);
//       toast.error('Failed to add color');
//     } finally {
//       setAddingToCart(prev => ({ ...prev, [item._id]: false }));
//     }
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     console.log('📤 Frontend: File selected:', {
//       name: file.name,
//       type: file.type,
//       size: file.size
//     });

//     // Validate file size on frontend
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File too large', {
//         description: 'Maximum file size is 5MB'
//       });
//       return;
//     }

//     // Validate file type on frontend - exact allowed types
//     const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Invalid file type', {
//         description: 'Only PNG, JPEG images and PDF files are allowed'
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('attachment', file);

//     setUploading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/upload', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setAttachments([...attachments, data.data]);
//         toast.success('File uploaded successfully', {
//           description: data.data.fileName
//         });
        
//         // Clear the file input
//         e.target.value = '';
//       } else {
//         toast.error('Upload failed', {
//           description: data.error || 'Something went wrong'
//         });
//       }
//     } catch (error) {
//       console.error('❌ Error uploading file:', error);
//       toast.error('Upload failed', {
//         description: error.message || 'Network error occurred'
//       });
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
//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/submit', {
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
//         router.push('/customer/inquiries');
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
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-16 sm:mt-20 px-4">
//           <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 mt-16 sm:mt-20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-4 max-w-7xl py-6 sm:py-8">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//             <div>
//               <Link href="/products" className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-[#E39A65] mb-2 transition-colors">
//                 <ArrowLeft className="w-4 h-4" />
//                 Continue Shopping
//               </Link>
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Inquiry Cart</h1>
//               <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                 Review and modify your inquiry items
//               </p>
//             </div>
//             {cart?.items?.length > 0 && (
//               <button
//                 onClick={showClearCartModal}
//                 className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Clear Cart
//               </button>
//             )}
//           </div>

//           {!cart?.items?.length ? (
//             <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
//               <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
//               <p className="text-sm sm:text-base text-gray-500 mb-6">Start adding products to create your inquiry</p>
//               <Link
//                 href="/products"
//                 className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors w-full sm:w-auto"
//               >
//                 Browse Products
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//               {/* Cart Items */}
//               <div className="lg:col-span-2 space-y-3 sm:space-y-4">
//                 {cart.items.map((item) => {
//                   const productDetail = productDetails[item.productId];
//                   const availableColors = productDetail?.colors || [];
//                   const availableSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
//                   const isExpanded = expandedItems[item._id];
//                   const selectedColor = selectedColors[item._id];
//                   const quantities = colorQuantities[item._id] || {};
//                   const isAdding = addingToCart[item._id];

//                   return (
//                     <div key={item._id} className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
//                       {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4"> */}
                      
//                         {/* <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
//                           <img
//                             src={item.productImage || 'https://via.placeholder.com/96'}
//                             alt={item.productName}
//                             className="w-full h-full object-cover"
//                           />
//                         </div> */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//   {/* Product Image - Mobile Version (visible only on small screens) */}
//   <div className="w-full h-48 sm:hidden bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 mx-auto">
//     <img
//       src={item.productImage || 'https://via.placeholder.com/96'}
//       alt={item.productName}
//       className="w-full h-full object-cover"
//     />
//   </div>
  
//   {/* Product Image - Desktop Version (visible only on large screens) */}
//   <div className="hidden sm:block w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//     <img
//       src={item.productImage || 'https://via.placeholder.com/96'}
//       alt={item.productName}
//       className="w-full h-full object-cover"
//     />
//   </div>

//                         {/* Product Details */}
//                         <div className="flex-1 w-full">
//                           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
//                             <div className="text-center sm:text-left">
//                               <Link 
//                                 href={`/productDetails?id=${item.productId}`}
//                                 className="block w-full sm:w-fit"
//                               >
//                                 <h3 className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#E39A65] transition-colors cursor-pointer">
//                                   {item.productName}
//                                 </h3>
//                               </Link>
//                               <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                                 Total Quantity: <span className="font-medium text-gray-900">{item.totalQuantity} pcs</span>
//                               </p>
//                             </div>
//                             <button
//                               onClick={() => showProductDeleteModal(item._id, item.productName)}
//                               className="p-1.5 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-start"
//                               title="Remove product"
//                             >
//                               <Trash2 className="w-4 h-4 text-red-500" />
//                             </button>
//                           </div>

//                           {/* Colors and Sizes Section */}
//                           <div className="mt-3 sm:mt-4 space-y-3">
//                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                               <h4 className="text-xs sm:text-sm font-medium text-gray-700">Selected Colors & Sizes:</h4>
//                               {availableColors.length > 0 && (
//                                 <button
//                                   onClick={() => toggleExpand(item._id)}
//                                   className="flex items-center justify-center sm:justify-start gap-1 text-xs text-[#E39A65] hover:text-[#d48b54] transition-colors"
//                                 >
//                                   {isExpanded ? (
//                                     <>Hide Add Color <ChevronUp className="w-3 h-3" /></>
//                                   ) : (
//                                     <>Add More Colors <ChevronDown className="w-3 h-3" /></>
//                                   )}
//                                 </button>
//                               )}
//                             </div>
                            
//                             {/* Existing Colors - With inline editing, delete option always visible */}
//                             {item.colors?.map((colorItem, colorIndex) => {
//                               const editKey = `${item._id}-${colorIndex}`;
//                               const isEditing = editingColors[editKey];
//                               const isSaving = savingEdits[editKey];
//                               const isDeleting = deletingColor[`${item._id}-${colorIndex}`];
//                               const editedData = editedQuantities[editKey] || {};
                              
//                               // Get all available sizes for this product
//                               const allSizes = availableSizes;
                              
//                               // Create a map of existing quantities
//                               const existingQuantities = {};
//                               (colorItem.sizeQuantities || []).forEach(sq => {
//                                 existingQuantities[sq.size] = sq.quantity;
//                               });
                              
//                               return (
//                                 <div key={colorIndex} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
//                                     <div className="flex items-center gap-2">
//                                       <div 
//                                         className="w-5 h-5 rounded-full border-2 border-white shadow-sm flex-shrink-0"
//                                         style={{ backgroundColor: colorItem.color?.code || '#CCCCCC' }}
//                                       />
//                                       <span className="text-xs sm:text-sm font-medium text-gray-800">
//                                         {colorItem.color?.name || colorItem.color?.code || `Color ${colorIndex + 1}`}
//                                       </span>
//                                     </div>
//                                     <div className="flex items-center gap-2 self-end sm:self-auto">
//                                       <span className="text-xs bg-[#E39A65] text-white px-2 py-1 rounded-full whitespace-nowrap">
//                                         {colorItem.totalQuantity} pcs
//                                       </span>
                                      
//                                       {/* Delete Color Button - Always visible */}
//                                       <button
//                                         onClick={() => showDeleteModal(
//                                           item._id, 
//                                           colorIndex, 
//                                           colorItem.color?.name || colorItem.color?.code || `Color ${colorIndex + 1}`,
//                                           item.productName
//                                         )}
//                                         disabled={isDeleting}
//                                         className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
//                                         title="Remove this color"
//                                       >
//                                         {isDeleting ? (
//                                           <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
//                                         ) : (
//                                           <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                                         )}
//                                       </button>
                                      
//                                       {!isEditing ? (
//                                         <button
//                                           onClick={() => toggleEditColor(item._id, colorIndex)}
//                                           className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                                           title="Edit quantities"
//                                         >
//                                           <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
//                                         </button>
//                                       ) : (
//                                         <div className="flex gap-1">
//                                           <button
//                                             onClick={() => handleSaveColorEdits(item._id, colorIndex)}
//                                             disabled={isSaving}
//                                             className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
//                                             title="Save changes"
//                                           >
//                                             {isSaving ? (
//                                               <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
//                                             ) : (
//                                               <Save className="w-3 h-3 sm:w-4 sm:h-4" />
//                                             )}
//                                           </button>
//                                           <button
//                                             onClick={() => cancelEdit(item._id, colorIndex)}
//                                             className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
//                                             title="Cancel"
//                                           >
//                                             <X className="w-3 h-3 sm:w-4 sm:h-4" />
//                                           </button>
//                                         </div>
//                                       )}
//                                     </div>
//                                   </div>
                                  
//                                   {/* Size Quantities Grid - All sizes shown */}
//                                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
//                                     {allSizes.map((size, idx) => {
//                                       const currentQty = isEditing 
//                                         ? (editedData[size] !== undefined ? editedData[size] : (existingQuantities[size] || 0))
//                                         : (existingQuantities[size] || 0);
                                      
//                                       return (
//                                         <div key={idx} className="flex items-center">
//                                           <span className="text-xs text-gray-500 w-6 sm:w-8">{size}:</span>
//                                           {isEditing ? (
//                                             <input
//                                               type="number"
//                                               min="0"
//                                               value={currentQty || ''}
//                                               onChange={(e) => handleEditQuantityChange(
//                                                 item._id, 
//                                                 colorIndex, 
//                                                 size, 
//                                                 e.target.value
//                                               )}
//                                               onWheel={(e) => e.target.blur()}
//                                               className="w-12 sm:w-16 px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
//                                               placeholder="0"
//                                             />
//                                           ) : (
//                                             <span className={`ml-1 text-xs sm:text-sm font-medium ${
//                                               currentQty > 0 ? 'text-gray-900' : 'text-gray-400'
//                                             }`}>
//                                               {currentQty > 0 ? currentQty : '-'}
//                                             </span>
//                                           )}
//                                         </div>
//                                       );
//                                     })}
//                                   </div>
                                  
//                                   {/* Show message if no quantities entered (in view mode) */}
//                                   {!isEditing && Object.values(existingQuantities).every(qty => qty === 0) && (
//                                     <p className="text-xs text-gray-400 mt-2 italic">
//                                       No quantities specified
//                                     </p>
//                                   )}
//                                 </div>
//                               );
//                             })}

//                             {/* Display special instructions if they exist */}
//                             {item.specialInstructions && (
//                               <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-[#E39A65]">
//                                 <div className="flex items-start gap-2">
//                                   <FileText className="w-4 h-4 text-[#E39A65] flex-shrink-0 mt-0.5" />
//                                   <div>
//                                     <p className="text-xs font-medium text-[#E39A65]">Special Instructions:</p>
//                                     <p className="text-xs font-semibold text-gray-700 mt-1">{item.specialInstructions}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}

//                             {/* Add New Color Section - Only shown when expanded */}
//                             {isExpanded && (
//                               <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
//                                 <h5 className="text-xs sm:text-sm font-medium text-blue-800 mb-3">Add Another Color</h5>
                                
//                                 {/* Color Selection */}
//                                 {availableColors.length > 0 && (
//                                   <div className="mb-3">
//                                     <label className="block text-xs text-blue-700 mb-2">Select Color:</label>
//                                     <div className="flex flex-wrap gap-2">
//                                       {availableColors.map((color, idx) => {
//                                         // Check if color already exists in cart
//                                         const colorExists = item.colors?.some(
//                                           c => c.color?.code === color.code
//                                         );
                                        
//                                         return (
//                                           <button
//                                             key={idx}
//                                             onClick={() => !colorExists && handleColorSelect(item._id, color)}
//                                             disabled={colorExists}
//                                             className={`relative p-0.5 rounded-full transition-all ${
//                                               selectedColor?.code === color.code
//                                                 ? 'ring-2 ring-blue-600 ring-offset-2'
//                                                 : colorExists
//                                                 ? 'opacity-40 cursor-not-allowed'
//                                                 : 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2'
//                                             }`}
//                                             title={colorExists ? 'Already in cart' : color.code}
//                                           >
//                                             <div
//                                               className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-md"
//                                               style={{ backgroundColor: color.code }}
//                                             />
//                                             {colorExists && (
//                                               <CheckCircle className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-green-600 bg-white rounded-full" />
//                                             )}
//                                           </button>
//                                         );
//                                       })}
//                                     </div>
//                                   </div>
//                                 )}

//                                 {/* Size Quantity Inputs for Selected Color */}
//                                 {selectedColor && (
//                                   <>
//                                     <div className="mb-3">
//                                       <label className="block text-xs text-blue-700 mb-2">Enter Quantities:</label>
//                                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                                         {availableSizes.map((size, idx) => (
//                                           <div key={idx} className="flex flex-col">
//                                             <label className="text-xs text-gray-600 mb-1">{size}</label>
//                                             <input
//                                               type="number"
//                                               min="0"
//                                               value={quantities[size] || ''}
//                                               onChange={(e) => handleQuantityChange(item._id, size, e.target.value)}
//                                               className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                                               placeholder="Qty"
//                                             />
//                                           </div>
//                                         ))}
//                                       </div>
//                                     </div>

//                                     {/* Add Button */}
//                                     <button
//                                       onClick={() => handleAddColorToCart(item)}
//                                       disabled={isAdding}
//                                       className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                       {isAdding ? (
//                                         <>
//                                           <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
//                                           Adding...
//                                         </>
//                                       ) : (
//                                         <>
//                                           <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
//                                           Add This Color
//                                         </>
//                                       )}
//                                     </button>
//                                   </>
//                                 )}
//                               </div>
//                             )}
//                           </div>

//                           {/* Price and Total */}
//                           <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-3 border-t border-gray-200">
//                             <div className="flex justify-between sm:justify-start">
//                               <span className="text-xs sm:text-sm text-gray-500">Unit Price:</span>
//                               <span className="ml-2 text-xs sm:text-sm font-medium text-[#E39A65]">{formatPrice(item.unitPrice)}</span>
//                             </div>
//                             <div className="flex justify-between sm:justify-start">
//                               <span className="text-xs sm:text-sm text-gray-500">Product Total:</span>
//                               <span className="ml-2 text-sm sm:text-base font-bold text-gray-900">
//                                 {formatPrice(item.totalQuantity * item.unitPrice)}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Order Summary */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 sticky top-20 sm:top-24">
//                   <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Inquiry Summary</h2>
                  
//                   <div className="space-y-3 mb-4">
//                     <div className="flex justify-between text-xs sm:text-sm">
//                       <span className="text-gray-600">Total Items:</span>
//                       <span className="font-medium text-gray-900">{cart.totalItems}</span>
//                     </div>
//                     <div className="flex justify-between text-xs sm:text-sm">
//                       <span className="text-gray-600">Total Quantity:</span>
//                       <span className="font-medium text-gray-900">{cart.totalQuantity} pcs</span>
//                     </div>
//                     <div className="flex justify-between text-base sm:text-lg font-semibold pt-2 border-t border-gray-200">
//                       <span>Estimated Total:</span>
//                       <span className="text-[#E39A65]">{formatPrice(cart.estimatedTotal)}</span>
//                     </div>
//                   </div>

//                   {/* Special Instructions */}
//                   <div className="mb-4">
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
//                       Special Instructions
//                     </label>
//                     <textarea
//                       value={specialInstructions}
//                       onChange={(e) => setSpecialInstructions(e.target.value)}
//                       rows="3"
//                       className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none resize-none"
//                       placeholder="Add any special requirements or notes..."
//                     />
//                   </div>

//                   {/* File Attachments */}
//                   <div className="mb-4">
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
//                       Attachments (Optional)
//                     </label>
//                     <div className="space-y-2">
//                       {attachments.map((file, index) => (
//                         <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//                           <div className="flex items-center gap-2 min-w-0">
//                             <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
//                             <span className="text-xs text-gray-600 truncate max-w-[120px] sm:max-w-[150px]">
//                               {file.fileName}
//                             </span>
//                           </div>
//                           <button
//                             onClick={() => removeAttachment(index)}
//                             className="p-1 hover:bg-gray-200 rounded flex-shrink-0"
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
//                         <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#E39A65] transition-colors">
//                           {uploading ? (
//                             <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-[#E39A65]" />
//                           ) : (
//                             <Upload className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
//                           )}
//                           <span className="text-xs sm:text-sm text-gray-600">
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
//                     className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-[#E39A65] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {submitting ? (
//                       <>
//                         <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
//                         Submitting...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-3 h-3 sm:w-4 sm:h-4" />
//                         Submit Inquiry
//                       </>
//                     )}
//                   </button>

//                   {/* MOQ Warning */}
//                   {cart.items.some(item => item.totalQuantity < item.moq) && (
//                     <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                       <div className="flex items-start gap-2">
//                         <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
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

//       {/* Delete Color Confirmation Modal */}
//       {deleteModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center gap-3 text-red-600 mb-4">
//                 <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//                 <h3 className="text-base sm:text-lg font-semibold">Remove Color</h3>
//               </div>
              
//               <p className="text-sm sm:text-base text-gray-600 mb-2">
//                 Are you sure you want to remove <span className="font-semibold">"{deleteModal.colorName}"</span> from{' '}
//                 <span className="font-semibold">"{deleteModal.productName}"</span>?
//               </p>
//               <p className="text-xs sm:text-sm text-gray-500 mb-6">
//                 This action cannot be undone. The color and its quantities will be removed from your cart.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
//                 <button
//                   onClick={closeDeleteModal}
//                   className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors order-2 sm:order-1"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteColor}
//                   className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors order-1 sm:order-2"
//                 >
//                   Remove Color
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Product Delete Confirmation Modal */}
//       {productDeleteModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center gap-3 text-red-600 mb-4">
//                 <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//                 <h3 className="text-base sm:text-lg font-semibold">Remove Product</h3>
//               </div>
              
//               <p className="text-sm sm:text-base text-gray-600 mb-2">
//                 Are you sure you want to remove <span className="font-semibold">"{productDeleteModal.productName}"</span> from your cart?
//               </p>
//               <p className="text-xs sm:text-sm text-gray-500 mb-6">
//                 This action cannot be undone. The product and all its colors will be removed from your cart.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
//                 <button
//                   onClick={closeProductDeleteModal}
//                   className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors order-2 sm:order-1"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleProductDeleteConfirm}
//                   className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors order-1 sm:order-2"
//                 >
//                   Remove Product
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Clear Cart Confirmation Modal */}
//       {clearCartModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center gap-3 text-red-600 mb-4">
//                 <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//                 <h3 className="text-base sm:text-lg font-semibold">Clear Entire Cart</h3>
//               </div>
              
//               <p className="text-sm sm:text-base text-gray-600 mb-2">
//                 Are you sure you want to clear your entire cart?
//               </p>
//               <p className="text-xs sm:text-sm text-gray-500 mb-6">
//                 This action cannot be undone. All products and their colors will be removed from your cart.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
//                 <button
//                   onClick={closeClearCartModal}
//                   className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors order-2 sm:order-1"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleClearCartConfirm}
//                   className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors order-1 sm:order-2"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

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
  Save,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

// useEffect(() => {
//   // Check what's in localStorage
//   console.log('🔍 localStorage cart:', localStorage.getItem('cart'));
//   console.log('🔍 sessionStorage cart:', sessionStorage.getItem('cart'));
  
//   fetchCart();
// }, []);

// Helper function to get price based on quantity for a specific color
const getPriceForQuantity = (quantity, productDetail, basePrice) => {
  if (!productDetail?.quantityBasedPricing || productDetail.quantityBasedPricing.length === 0) {
    return basePrice;
  }
  
  const sortedTiers = [...productDetail.quantityBasedPricing].sort((a, b) => {
    const aMin = parseInt(a.range.split('-')[0] || a.range.replace('+', ''));
    const bMin = parseInt(b.range.split('-')[0] || b.range.replace('+', ''));
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
  
  // If no tier matched, check if quantity exceeds the highest tier's max
  const highestTier = sortedTiers[sortedTiers.length - 1];
  if (highestTier && highestTier.range.includes('-') && quantity > parseInt(highestTier.range.split('-')[1])) {
    return highestTier.price;
  }
  
  return basePrice;
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

  // State for product delete confirmation modal
  const [productDeleteModal, setProductDeleteModal] = useState({ 
    show: false, 
    itemId: null,
    productName: ''
  });

  // State for clear cart confirmation modal
  const [clearCartModal, setClearCartModal] = useState({ 
    show: false
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

      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        // Fetch product details for each item to get available colors/sizes and pricing
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
      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/products/${productId}`);
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

  // Handle quantity change in edit mode with real-time price update
  const handleEditQuantityChange = (itemId, colorIndex, size, value) => {
    const key = `${itemId}-${colorIndex}`;
    const qty = parseInt(value) || 0;
    
    setEditedQuantities(prev => {
      const newQuantities = {
        ...(prev[key] || {}),
        [size]: qty
      };
      
      // Calculate new total for this color
      const newTotal = Object.values(newQuantities).reduce((sum, val) => sum + (val || 0), 0);
      
      // Get the product details for price calculation
      const item = cart.items.find(i => i._id === itemId);
      const productDetail = productDetails[item?.productId];
      
      // Calculate new unit price based on the new total
      const newUnitPrice = getPriceForQuantity(newTotal, productDetail, item?.unitPrice || 0);
      
      // Store the calculated unit price for this color in a separate state
      setColorUnitPrices(prev => ({
        ...prev,
        [key]: newUnitPrice
      }));
      
      return {
        ...prev,
        [key]: newQuantities
      };
    });
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
  const handleDeleteColor = async () => {
    const { itemId, colorIndex } = deleteModal;
    
    closeDeleteModal();
    
    const key = `${itemId}-${colorIndex}`;
    setDeletingColor(prev => ({ ...prev, [key]: true }));
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/inquiry-cart/item/${itemId}/color/${colorIndex}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        
        toast.success('Color removed successfully', {
          description: 'The color has been removed from your cart',
          duration: 3000,
        });
        
        window.dispatchEvent(new Event('cart-update'));
        
        const updatedItem = data.data.items.find(item => item._id === itemId);
        if (updatedItem && updatedItem.colors && updatedItem.colors.length > 0) {
          setExpandedItems(prev => ({
            ...prev,
            [itemId]: false
          }));
        }
        
      } else {
        toast.error('Failed to remove color', {
          description: data.error || 'Something went wrong',
          duration: 4000
        });
      }
      
    } catch (error) {
      console.error('Error deleting color:', error);
      toast.error('Failed to remove color', {
        description: error.message || 'Network error occurred',
        duration: 4000
      });
    } finally {
      setDeletingColor(prev => ({ ...prev, [key]: false }));
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, itemId: null, colorIndex: null, colorName: '', productName: '' });
  };

  const showProductDeleteModal = (itemId, productName) => {
    setProductDeleteModal({
      show: true,
      itemId,
      productName
    });
  };

  const handleProductDeleteConfirm = async () => {
    const { itemId } = productDeleteModal;
    
    setProductDeleteModal({ show: false, itemId: null, productName: '' });
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/inquiry-cart/item/${itemId}`, {
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
        });
        
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

  const closeProductDeleteModal = () => {
    setProductDeleteModal({ show: false, itemId: null, productName: '' });
  };

  const showClearCartModal = () => {
    setClearCartModal({ show: true });
  };

  const handleClearCartConfirm = async () => {
    setClearCartModal({ show: false });
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/clear', {
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
        });
        
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

  const closeClearCartModal = () => {
    setClearCartModal({ show: false });
  };

  // State for storing calculated unit prices per color during editing
  const [colorUnitPrices, setColorUnitPrices] = useState({});

  // Save edited quantities for a color with per-color pricing
  const handleSaveColorEdits = async (itemId, colorIndex) => {
    const key = `${itemId}-${colorIndex}`;
    const editedData = editedQuantities[key];
    
    if (!editedData) return;
    
    // Calculate total quantity for this color
    const totalQty = Object.values(editedData).reduce((sum, qty) => sum + (qty || 0), 0);
    const item = cart.items.find(i => i._id === itemId);
    const moq = item?.moq || 0;
    const productDetail = productDetails[item?.productId];
    
    // Check if total quantity meets MOQ (if quantity > 0)
    if (totalQty > 0 && totalQty < moq) {
      toast.error(`Each color must meet the minimum MOQ of ${moq} pieces. Current total: ${totalQty} pieces.`);
      return;
    }
    
    // Calculate the unit price based on this color's quantity
    const colorUnitPrice = getPriceForQuantity(totalQty, productDetail, item?.unitPrice || 0);
    
    setSavingEdits(prev => ({ ...prev, [key]: true }));
    
    try {
      const token = localStorage.getItem('token');
      if (!item) return;

      const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
      
      const updatedSizeQuantities = allSizes.map(size => ({
        size,
        quantity: editedData[size] || 0
      }));

      const updatedColors = [...item.colors];
      updatedColors[colorIndex] = {
        ...updatedColors[colorIndex],
        color: {
          code: updatedColors[colorIndex].color?.code || '#CCCCCC',
          name: updatedColors[colorIndex].color?.name || updatedColors[colorIndex].color?.code || 'Unknown Color'
        },
        sizeQuantities: updatedSizeQuantities,
        unitPrice: colorUnitPrice // Store the per-color unit price
      };

      // Recalculate total quantity for the product
      const updatedTotalQuantity = updatedColors.reduce((sum, color) => {
        const colorTotal = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
        return sum + colorTotal;
      }, 0);

      const cartItem = {
        productId: item.productId,
        productName: item.productName,
        colors: updatedColors,
        totalQuantity: updatedTotalQuantity,
        unitPrice: item.unitPrice, // Base price for reference
        moq: item.moq,
        productImage: item.productImage,
        specialInstructions: item.specialInstructions 
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
        setCart(data.data);
        
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
        
        toast.success(`Quantities updated! Unit price: ${formatPrice(colorUnitPrice)}/pc`);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to update quantities');
      }
    } catch (error) {
      console.error('Error updating quantities:', error);
      toast.error('Failed to update quantities');
    } finally {
      setSavingEdits(prev => ({ ...prev, [key]: false }));
    }
  };

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
    // Clear the temporary unit price
    setColorUnitPrices(prev => {
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

  // Get current total for the new color being added
  const getNewColorTotal = (itemId) => {
    const quantities = colorQuantities[itemId] || {};
    return Object.values(quantities).reduce((sum, qty) => sum + (qty || 0), 0);
  };

  // Get the unit price for the new color based on its quantity
  const getNewColorUnitPrice = (itemId, item) => {
    const totalQty = getNewColorTotal(itemId);
    const productDetail = productDetails[item?.productId];
    return getPriceForQuantity(totalQty, productDetail, item?.unitPrice || 0);
  };

  // Handle adding a new color with per-color pricing
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

    // MOQ VALIDATION
    if (totalQty < item.moq) {
      toast.error(`This color must meet the minimum MOQ of ${item.moq} pieces. Current total: ${totalQty} pieces. Please add ${item.moq - totalQty} more pieces.`);
      return;
    }

    setAddingToCart(prev => ({ ...prev, [item._id]: true }));

    try {
      const token = localStorage.getItem('token');
      
      const existingColors = item.colors || [];
      
      const colorExists = existingColors.some(
        c => c.color?.code === selectedColor.code
      );

      if (colorExists) {
        toast.error('This color is already in your cart');
        setAddingToCart(prev => ({ ...prev, [item._id]: false }));
        return;
      }

      const productDetail = productDetails[item.productId];
      const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];

      const sizeQuantitiesArray = allSizes.map(size => ({
        size,
        quantity: quantities[size] || 0
      }));

      // Calculate the unit price based on this color's quantity
      const colorUnitPrice = getPriceForQuantity(totalQty, productDetail, item.unitPrice);

      const newColorData = {
        color: {
          code: selectedColor.code,
          name: selectedColor.name || selectedColor.code
        },
        sizeQuantities: sizeQuantitiesArray,
        totalQuantity: totalQty,
        unitPrice: colorUnitPrice // Store per-color unit price
      };

      const updatedColors = [...existingColors, newColorData];
      
      // Recalculate total quantity for the product
      const updatedTotalQuantity = updatedColors.reduce((sum, color) => {
        return sum + (color.totalQuantity || 0);
      }, 0);

      const cartItem = {
        productId: item.productId,
        productName: item.productName,
        colors: updatedColors,
        totalQuantity: updatedTotalQuantity,
        unitPrice: item.unitPrice, // Keep base price for reference
        moq: item.moq,
        productImage: item.productImage
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
        toast.success(`${selectedColor.code || 'Color'} added! (${totalQty} pcs @ ${formatPrice(colorUnitPrice)}/pc)`);
        
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

        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        
        setExpandedItems(prev => ({
          ...prev,
          [item._id]: false
        }));
      } else {
        toast.error(data.error || 'Failed to add color');
      }
    } catch (error) {
      console.error('Error adding color:', error);
      toast.error('Failed to add color');
    } finally {
      setAddingToCart(prev => ({ ...prev, [item._id]: false }));
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Maximum file size is 5MB'
      });
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type', {
        description: 'Only PNG, JPEG images and PDF files are allowed'
      });
      return;
    }

    const formData = new FormData();
    formData.append('attachment', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setAttachments([...attachments, data.data]);
        toast.success('File uploaded successfully', {
          description: data.data.fileName
        });
        
        e.target.value = '';
      } else {
        toast.error('Upload failed', {
          description: data.error || 'Something went wrong'
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Upload failed', {
        description: error.message || 'Network error occurred'
      });
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
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/inquiry-cart/submit', {
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
        router.push('/customer/inquiries');
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-16 sm:mt-20 px-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 mt-16 sm:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-4 max-w-7xl py-6 sm:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-[#E39A65] mb-2 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Inquiry Cart</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Review and modify your inquiry items (pricing based on per-color quantity)
              </p>
            </div>
            {cart?.items?.length > 0 && (
              <button
                onClick={showClearCartModal}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            )}
          </div>

          {!cart?.items?.length ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
              <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-sm sm:text-base text-gray-500 mb-6">Start adding products to create your inquiry</p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors w-full sm:w-auto"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                {cart.items.map((item) => {
                  const productDetail = productDetails[item.productId];
                  const availableColors = productDetail?.colors || [];
                  const availableSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
                  const isExpanded = expandedItems[item._id];
                  const selectedColor = selectedColors[item._id];
                  const quantities = colorQuantities[item._id] || {};
                  const isAdding = addingToCart[item._id];
                  const newColorTotal = getNewColorTotal(item._id);
                  const newColorUnitPrice = getNewColorUnitPrice(item._id, item);
                  const meetsMOQ = newColorTotal >= item.moq;

                  return (
                    <div key={item._id} className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {/* Product Image - Mobile Version */}
                        <div className="w-full h-48 sm:hidden bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 mx-auto">
                          <img
                            src={item.productImage || 'https://via.placeholder.com/96'}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product Image - Desktop Version */}
                        <div className="hidden sm:block w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.productImage || 'https://via.placeholder.com/96'}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 w-full">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div className="text-center sm:text-left">
                              <Link 
                                href={`/productDetails?id=${item.productId}`}
                                className="block w-full sm:w-fit"
                              >
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#E39A65] transition-colors cursor-pointer">
                                  {item.productName}
                                </h3>
                              </Link>
                              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                MOQ: <span className="font-medium text-gray-900">{item.moq} pcs per color</span>
                              </p>
                            </div>
                            <button
                              onClick={() => showProductDeleteModal(item._id, item.productName)}
                              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-start"
                              title="Remove product"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>

                          {/* Colors and Sizes Section */}
                          <div className="mt-3 sm:mt-4 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h4 className="text-xs sm:text-sm font-medium text-gray-700">Selected Colors & Sizes:</h4>
                              {availableColors.length > 0 && (
                                <button
                                  onClick={() => toggleExpand(item._id)}
                                  className="flex items-center justify-center sm:justify-start gap-1 text-xs text-[#E39A65] hover:text-[#d48b54] transition-colors"
                                >
                                  {isExpanded ? (
                                    <>Hide Add Color <ChevronUp className="w-3 h-3" /></>
                                  ) : (
                                    <>Add More Colors <ChevronDown className="w-3 h-3" /></>
                                  )}
                                </button>
                              )}
                            </div>
                            
                            {/* Existing Colors with Per-Color Pricing Display */}
                            {item.colors?.map((colorItem, colorIndex) => {
                              const editKey = `${item._id}-${colorIndex}`;
                              const isEditing = editingColors[editKey];
                              const isSaving = savingEdits[editKey];
                              const isDeleting = deletingColor[`${item._id}-${colorIndex}`];
                              const editedData = editedQuantities[editKey] || {};
                              
                              const allSizes = availableSizes;
                              
                              const existingQuantities = {};
                              (colorItem.sizeQuantities || []).forEach(sq => {
                                existingQuantities[sq.size] = sq.quantity;
                              });
                              
                              // Calculate current total for this color
                              const colorTotal = Object.values(existingQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
                              // Get the unit price for this color based on its quantity
                              const colorUnitPrice = colorItem.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice);
                              const colorSubtotal = colorTotal * colorUnitPrice;
                              
                              return (
                                <div key={colorIndex} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                      <div 
                                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                                        style={{ backgroundColor: colorItem.color?.code || '#CCCCCC' }}
                                      />
                                      <span className="text-xs sm:text-sm font-medium text-gray-800">
                                        {colorItem.color?.name || colorItem.color?.code || `Color ${colorIndex + 1}`}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                                      <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                                        colorTotal >= item.moq 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-yellow-100 text-yellow-700'
                                      }`}>
                                        {colorTotal} pcs
                                      </span>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
                                        {formatPrice(colorUnitPrice)}/pc
                                      </span>
                                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full whitespace-nowrap">
                                        Subtotal: {formatPrice(colorSubtotal)}
                                      </span>
                                      
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
                                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                                        ) : (
                                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                        )}
                                      </button>
                                      
                                      {!isEditing ? (
                                        <button
                                          onClick={() => toggleEditColor(item._id, colorIndex)}
                                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                          title="Edit quantities"
                                        >
                                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
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
                                              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                                            ) : (
                                              <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                                            )}
                                          </button>
                                          <button
                                            onClick={() => cancelEdit(item._id, colorIndex)}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Cancel"
                                          >
                                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Size Quantities Grid */}
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                                    {allSizes.map((size, idx) => {
                                      let currentQty;
                                      let tempUnitPrice = null;
                                      
                                      if (isEditing) {
                                        currentQty = editedData[size] !== undefined ? editedData[size] : (existingQuantities[size] || 0);
                                        // Calculate temporary total for preview
                                        const tempTotal = Object.values({...editedData, [size]: currentQty}).reduce((sum, val) => sum + (val || 0), 0);
                                        tempUnitPrice = getPriceForQuantity(tempTotal, productDetail, item.unitPrice);
                                      } else {
                                        currentQty = existingQuantities[size] || 0;
                                      }
                                      
                                      return (
                                        <div key={idx} className="flex items-center">
                                          <span className="text-xs text-gray-500 w-6 sm:w-8">{size}:</span>
                                          {isEditing ? (
                                            <div className="flex items-center gap-1">
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
                                                onWheel={(e) => e.target.blur()}
                                                className="w-12 sm:w-16 px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
                                                placeholder="0"
                                              />
                                            </div>
                                          ) : (
                                            <span className={`ml-1 text-xs sm:text-sm font-medium ${
                                              currentQty > 0 ? 'text-gray-900' : 'text-gray-400'
                                            }`}>
                                              {currentQty > 0 ? currentQty : '-'}
                                            </span>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                  
                                  {/* Show live price preview during editing */}
                                  {isEditing && (() => {
                                    const tempTotal = Object.values(editedData).reduce((sum, val) => sum + (val || 0), 0);
                                    const tempPrice = getPriceForQuantity(tempTotal, productDetail, item.unitPrice);
                                    return (
                                      <div className="mt-2 pt-2 border-t border-gray-200">
                                        <div className="flex justify-between items-center text-xs">
                                          <span className="text-gray-500">Preview:</span>
                                          <span className="font-medium text-[#E39A65]">
                                            {tempTotal} pcs @ {formatPrice(tempPrice)}/pc = {formatPrice(tempTotal * tempPrice)}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                  
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

                            {/* Add New Color Section with Per-Color Pricing Preview */}
                            {isExpanded && (
                              <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h5 className="text-xs sm:text-sm font-medium text-blue-800 mb-3">Add Another Color</h5>
                                
                                {/* Color Selection */}
                                {availableColors.length > 0 && (
                                  <div className="mb-3">
                                    <label className="block text-xs text-blue-700 mb-2">Select Color:</label>
                                    <div className="flex flex-wrap gap-2">
                                      {availableColors.map((color, idx) => {
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
                                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-md"
                                              style={{ backgroundColor: color.code }}
                                            />
                                            {colorExists && (
                                              <CheckCircle className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-green-600 bg-white rounded-full" />
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
                                              className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                              placeholder="Qty"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Price Preview for New Color */}
                                    {newColorTotal > 0 && (
                                      <div className="mb-3 p-2 bg-white rounded-lg border border-blue-200">
                                        <div className="flex justify-between items-center text-xs">
                                          <span className="text-gray-600">Price Preview:</span>
                                          <div className="text-right">
                                            <span className="font-medium text-[#E39A65]">
                                              {newColorTotal} pcs @ {formatPrice(newColorUnitPrice)}/pc
                                            </span>
                                            <span className="text-gray-500 ml-2">
                                              = {formatPrice(newColorTotal * newColorUnitPrice)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* MOQ Warning for new color */}
                                    {newColorTotal > 0 && !meetsMOQ && (
                                      <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-xs text-yellow-700">
                                          ⚠️ Need {item.moq - newColorTotal} more pieces to meet MOQ of {item.moq}
                                        </p>
                                      </div>
                                    )}

                                    {meetsMOQ && newColorTotal > 0 && (
                                      <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-xs text-green-700">
                                          ✓ Meets MOQ! Unit price: {formatPrice(newColorUnitPrice)}/pc
                                        </p>
                                      </div>
                                    )}

                                    {/* Add Button */}
                                    <button
                                      onClick={() => handleAddColorToCart(item)}
                                      disabled={isAdding || !meetsMOQ || newColorTotal === 0}
                                      className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {isAdding ? (
                                        <>
                                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                                          Adding...
                                        </>
                                      ) : (
                                        <>
                                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                          Add This Color ({newColorTotal} pcs @ {formatPrice(newColorUnitPrice)}/pc)
                                        </>
                                      )}
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Product Total */}

{/* Product Total - Calculate based on per-color pricing */}
<div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-3 border-t border-gray-200">
  <div className="flex justify-between sm:justify-start">
    <span className="text-xs sm:text-sm text-gray-500">Per-Color Pricing:</span>
    <span className="ml-2 text-xs sm:text-sm font-medium text-gray-600">Each color priced based on its quantity</span>
  </div>
  <div className="flex justify-between sm:justify-start">
    <span className="text-xs sm:text-sm text-gray-500">Product Total:</span>
    <span className="ml-2 text-sm sm:text-base font-bold text-[#E39A65]">
      {formatPrice(item.colors?.reduce((sum, color) => {
        const colorTotal = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
        const colorUnitPrice = color.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice);
        return sum + (colorTotal * colorUnitPrice);
      }, 0) || 0)}
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
  <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 sticky top-20 sm:top-24">
    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Inquiry Summary</h2>
    
    <div className="space-y-3 mb-4">
      <div className="flex justify-between text-xs sm:text-sm">
        <span className="text-gray-600">Total products:</span>
        <span className="font-medium text-gray-900">{cart.totalItems}</span>
      </div>
      <div className="flex justify-between text-xs sm:text-sm">
        <span className="text-gray-600">Total Quantity:</span>
        <span className="font-medium text-gray-900">{cart.totalQuantity} pcs</span>
      </div>
      
      {/* Per-color pricing breakdown with color swatch + product name + color name - NO HEX CODES */}
      <div className="pt-2 max-h-[300px] overflow-y-auto space-y-1">
        {cart.items.map((item) => {
          const productDetail = productDetails[item.productId];
          return item.colors?.map((color, idx) => {
            const colorTotal = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
            if (colorTotal === 0) return null;
            
            const colorUnitPrice = color.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice);
            const colorSubtotal = colorTotal * colorUnitPrice;
            
            // Get color name - NEVER show hex code
            const colorDisplayName = color.color?.name || `Color ${idx + 1}`;
            
            return (
              <div key={`${item._id}-${idx}`} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2 truncate flex-1 mr-2">
                  {/* Color Swatch Circle */}
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: color.color?.code || '#CCCCCC' }}
                    title={colorDisplayName}
                  />
                  {/* Product Name + Color Name (no hex) */}
                  <span className="text-gray-600 truncate">
                    <span className="font-medium text-gray-700">{item.productName.substring(0, 25)}</span>
                   
                    {/* <span className="text-gray-500">{colorDisplayName}</span> */}
                  </span>
                </div>
                {/* Price */}
                <span className="font-semibold text-[#E39A65] flex-shrink-0">
                  {formatPrice(colorSubtotal)}
                </span>
              </div>
            );
          });
        })}
      </div>
      
      <div className="flex justify-between text-base sm:text-lg font-semibold pt-3 border-t border-gray-200 mt-2">
        <span>Estimated Total:</span>
        <span className="text-[#E39A65]">
          {formatPrice(cart.items?.reduce((total, item) => {
            const productDetail = productDetails[item.productId];
            return total + (item.colors?.reduce((sum, color) => {
              const colorTotal = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
              const colorUnitPrice = color.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice);
              return sum + (colorTotal * colorUnitPrice);
            }, 0) || 0);
          }, 0) || 0)}
        </span>
      </div>
    </div>

    {/* Special Instructions */}
    <div className="mb-4">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
        Special Instructions
      </label>
      <textarea
        value={specialInstructions}
        onChange={(e) => setSpecialInstructions(e.target.value)}
        rows="3"
        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none resize-none"
        placeholder="Add any special requirements or notes..."
      />
    </div>

    {/* File Attachments */}
    <div className="mb-4">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
        Attachments (Optional)
      </label>
      <div className="space-y-2">
        {attachments.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <span className="text-xs text-gray-600 truncate max-w-[120px] sm:max-w-[150px]">
                {file.fileName}
              </span>
            </div>
            <button
              onClick={() => removeAttachment(index)}
              className="p-1 hover:bg-gray-200 rounded flex-shrink-0"
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
          <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#E39A65] transition-colors">
            {uploading ? (
              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-[#E39A65]" />
            ) : (
              <Upload className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
            )}
            <span className="text-xs sm:text-sm text-gray-600">
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
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-[#E39A65] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {submitting ? (
        <>
          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <Send className="w-3 h-3 sm:w-4 sm:h-4" />
          Submit Inquiry
        </>
      )}
    </button>

    {/* MOQ Warning for product level */}
    {cart.items.some(item => item.colors?.some(color => {
      const colorTotal = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
      return colorTotal > 0 && colorTotal < item.moq;
    })) && (
      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-700">
            Some colors don't meet the minimum order quantity. Each color must have at least {cart.items[0]?.moq} pieces.
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

      {/* Delete Color Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">Remove Color</h3>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                Are you sure you want to remove <span className="font-semibold">"{deleteModal.colorName}"</span> from{' '}
                <span className="font-semibold">"{deleteModal.productName}"</span>?
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                This action cannot be undone. The color and its quantities will be removed from your cart.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteColor}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors order-1 sm:order-2"
                >
                  Remove Color
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Delete Confirmation Modal */}
      {productDeleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">Remove Product</h3>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                Are you sure you want to remove <span className="font-semibold">"{productDeleteModal.productName}"</span> from your cart?
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                This action cannot be undone. The product and all its colors will be removed from your cart.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  onClick={closeProductDeleteModal}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProductDeleteConfirm}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors order-1 sm:order-2"
                >
                  Remove Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear Cart Confirmation Modal */}
      {clearCartModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">Clear Entire Cart</h3>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                Are you sure you want to clear your entire cart?
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                This action cannot be undone. All products and their colors will be removed from your cart.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  onClick={closeClearCartModal}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCartConfirm}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors order-1 sm:order-2"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </>
  );
}