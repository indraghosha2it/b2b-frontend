// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { 
//   Plus, 
//   X, 
//   Save, 
//   ArrowLeft,
//   Image as ImageIcon,
//   AlertCircle,
//   Loader2,
//   Trash2,
//   Upload,
//   Package,
//   DollarSign,
//   Palette,
//   Ruler,
//   MinusCircle,
//   PlusCircle,
//   ChevronDown,
//   Users
// } from 'lucide-react';
// import NextLink from 'next/link';
// import { toast } from 'sonner';
// import { SketchPicker } from 'react-color';
// import { MantineProvider } from '@mantine/core';
// import { RichTextEditor } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import TextAlign from '@tiptap/extension-text-align';
// import TipTapLink from '@tiptap/extension-link';
// import '@mantine/tiptap/styles.css';
// import '@mantine/core/styles.css';

// // Predefined colors for quick selection
// const PREDEFINED_COLORS = [
//   '#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF',
//   '#000000', '#FFFFFF', '#808080', '#800000', '#808000', '#008000',
//   '#800080', '#008080', '#000080', '#FFA500', '#FFC0CB', '#A52A2A',
//   '#E39A65', '#4A90E2', '#50C878', '#9B59B6', '#E74C3C', '#F39C12', '#1ABC9C',
// ];

// // Targeted customer options
// const TARGETED_CUSTOMERS = [
//   { value: 'ladies', label: 'Ladies', icon: '👩' },
//   { value: 'gents', label: 'Gents', icon: '👨' },
//   { value: 'kids', label: 'Kids', icon: '🧒' },
//   { value: 'unisex', label: 'Unisex', icon: '👤' }
// ];

// export default function EditProduct() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');
  
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [currentColorIndex, setCurrentColorIndex] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [originalProduct, setOriginalProduct] = useState(null);
  
//   // Refs for click outside detection
//   const colorPickerRef = useRef(null);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     productName: '',
//     description: '',
//     category: '',
//     targetedCustomer: 'unisex',
//     fabric: '',
//     moq: 100,
//     pricePerUnit: 0,
//     quantityBasedPricing: [
//       { range: '100-299', price: 0 }
//     ],
//     sizes: ['S', 'M', 'L', 'XL', 'XXL'],
//     colors: [
//       { code: '#FF0000' },
//       { code: '#0000FF' },
//       { code: '#000000' }
//     ]
//   });

//   // Image states
//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [imagesToDelete, setImagesToDelete] = useState([]);

//   // File input refs for new images
//   const fileInputRefs = useRef([]);

//   // Errors state
//   const [errors, setErrors] = useState({});

//   // Allowed file types
//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//   const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
//   const maxFileSize = 5 * 1024 * 1024; // 5MB

//   // Set mounted state
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Check if product ID exists
//   useEffect(() => {
//     if (!productId) {
//       toast.error('No product ID provided');
//       router.push('/admin/allProducts');
//     }
//   }, [productId, router]);

//   // Click outside handler for color picker
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
//         setShowColorPicker(false);
//         setCurrentColorIndex(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Initialize TipTap editor only on client side
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       TipTapLink.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           rel: 'noopener noreferrer',
//           target: '_blank',
//         },
//       }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: formData.description,
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, description: editor.getHTML() }));
//     },
//     immediatelyRender: false,
//     editable: true,
//   });

//   // Fetch categories and product data on mount
//   useEffect(() => {
//     if (productId) {
//       fetchCategories();
//       fetchProduct();
//     }
//   }, [productId]);

//   // Fetch category details when category is selected
//   useEffect(() => {
//     if (formData.category) {
//       fetchCategoryDetails(formData.category);
//     } else {
//       setSelectedCategoryDetails(null);
//     }
//   }, [formData.category]);

//   // Update editor content when formData.description changes
//   useEffect(() => {
//     if (editor && formData.description !== editor.getHTML()) {
//       editor.commands.setContent(formData.description);
//     }
//   }, [formData.description, editor]);

//   // Check user role
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user.role !== 'moderator' && user.role !== 'admin') {
//       router.push('/login');
//     }
//   }, [router]);

//   const fetchCategories = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/categories', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to fetch categories');
//     }
//   };

//   const fetchCategoryDetails = async (categoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setSelectedCategoryDetails(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching category details:', error);
//     }
//   };

//   const fetchProduct = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         const product = data.data;
//         setOriginalProduct(product);
        
//         // Set form data
//         setFormData({
//           productName: product.productName || '',
//           description: product.description || '',
//           category: product.category?._id || product.category || '',
//           targetedCustomer: product.targetedCustomer || 'unisex',
//           fabric: product.fabric || '',
//           moq: product.moq || 100,
//           pricePerUnit: product.pricePerUnit || 0,
//           quantityBasedPricing: product.quantityBasedPricing || [{ range: '100-299', price: 0 }],
//           sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
//           colors: product.colors || [{ code: '#FF0000' }]
//         });

//         // Set existing images
//         setExistingImages(product.images || []);
//       } else {
//         toast.error('Failed to fetch product details');
//         router.push('/admin/allProducts');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to fetch product details');
//       router.push('/admin/allProducts');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Validate image file
//   const validateImageFile = (file) => {
//     if (!allowedFileTypes.includes(file.type)) {
//       const fileExtension = file.name.split('.').pop().toLowerCase();
//       return {
//         valid: false,
//         message: `Invalid format: .${fileExtension}. Allowed: ${allowedExtensions.join(', ')}`
//       };
//     }

//     if (file.size > maxFileSize) {
//       const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
//       return {
//         valid: false,
//         message: `File too large: ${fileSizeMB}MB. Max: 5MB`
//       };
//     }

//     return { valid: true };
//   };

//   // Handle new image selection
//   const handleNewImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       toast.error(validation.message);
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const updatedNewImages = [...newImages];
//       updatedNewImages[index] = {
//         file,
//         preview: reader.result
//       };
//       setNewImages(updatedNewImages);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Remove existing image
//   const removeExistingImage = (imageId) => {
//     setImagesToDelete(prev => [...prev, imageId]);
//     setExistingImages(prev => prev.filter(img => img.publicId !== imageId));
//   };

//   // Remove new image
//   const removeNewImage = (index) => {
//     const updatedNewImages = [...newImages];
//     updatedNewImages[index] = null;
//     setNewImages(updatedNewImages);
//     if (fileInputRefs.current[index]) {
//       fileInputRefs.current[index].value = '';
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   // Handle quantity based pricing changes
//   const handlePricingChange = (index, field, value) => {
//     const updatedPricing = [...formData.quantityBasedPricing];
    
//     if (field === 'price') {
//       if (value === '') {
//         updatedPricing[index] = { ...updatedPricing[index], [field]: '' };
//       } else {
//         const numValue = parseFloat(value);
//         if (!isNaN(numValue)) {
//           updatedPricing[index] = { ...updatedPricing[index], [field]: numValue };
//         }
//       }
//     } else {
//       updatedPricing[index] = { ...updatedPricing[index], [field]: value };
//     }
    
//     setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
//   };

//   // Add new pricing row
//   const addPricingRow = () => {
//     setFormData(prev => ({
//       ...prev,
//       quantityBasedPricing: [
//         ...prev.quantityBasedPricing,
//         { range: '', price: '' }
//       ]
//     }));
//   };

//   // Remove pricing row
//   const removePricingRow = (index) => {
//     if (formData.quantityBasedPricing.length > 1) {
//       const updatedPricing = formData.quantityBasedPricing.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
//     }
//   };

//   // Handle size changes
//   const handleSizeChange = (index, value) => {
//     const updatedSizes = [...formData.sizes];
//     updatedSizes[index] = value;
//     setFormData(prev => ({ ...prev, sizes: updatedSizes }));
//   };

//   // Add new size
//   const addSize = () => {
//     setFormData(prev => ({
//       ...prev,
//       sizes: [...prev.sizes, '']
//     }));
//   };

//   // Remove size
//   const removeSize = (index) => {
//     if (formData.sizes.length > 1) {
//       const updatedSizes = formData.sizes.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, sizes: updatedSizes }));
//     }
//   };

//   // Handle color changes
//   const handleColorChange = (index, field, value) => {
//     const updatedColors = [...formData.colors];
//     updatedColors[index] = { ...updatedColors[index], [field]: value };
//     setFormData(prev => ({ ...prev, colors: updatedColors }));
//   };

//   // Handle color picker open
//   const openColorPicker = (index, event) => {
//     event.stopPropagation();
//     setCurrentColorIndex(index);
//     setShowColorPicker(true);
//   };

//   // Add new color
//   const addColor = () => {
//     setFormData(prev => ({
//       ...prev,
//       colors: [...prev.colors, { code: '#000000' }]
//     }));
//   };

//   // Remove color
//   const removeColor = (index) => {
//     if (formData.colors.length > 1) {
//       const updatedColors = formData.colors.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, colors: updatedColors }));
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.productName.trim()) {
//       newErrors.productName = 'Product name is required';
//     }

//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }

//     if (!formData.targetedCustomer) {
//       newErrors.targetedCustomer = 'Targeted customer is required';
//     }

//     if (!formData.fabric.trim()) {
//       newErrors.fabric = 'Fabric details are required';
//     }

//     if (formData.moq < 1) {
//       newErrors.moq = 'MOQ must be at least 1';
//     }

//     if (formData.pricePerUnit < 0) {
//       newErrors.pricePerUnit = 'Price must be 0 or greater';
//     }

//     const hasImages = existingImages.length > 0 || newImages.some(img => img !== null);
//     if (!hasImages) {
//       newErrors.images = 'At least one product image is required';
//     }

//     const validSizes = formData.sizes.filter(s => s.trim() !== '');
//     if (validSizes.length === 0) {
//       newErrors.sizes = 'At least one size is required';
//     }

//     if (formData.colors.length === 0) {
//       newErrors.colors = 'At least one color is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Check if any changes were made
//   const hasChanges = () => {
//     if (!originalProduct) return false;

//     // Check basic fields
//     if (formData.productName !== originalProduct.productName) return true;
//     if (formData.description !== originalProduct.description) return true;
//     if (formData.category !== (originalProduct.category?._id || originalProduct.category)) return true;
//     if (formData.targetedCustomer !== originalProduct.targetedCustomer) return true;
//     if (formData.fabric !== originalProduct.fabric) return true;
//     if (formData.moq !== originalProduct.moq) return true;
//     if (formData.pricePerUnit !== originalProduct.pricePerUnit) return true;

//     // Check quantity based pricing
//     if (JSON.stringify(formData.quantityBasedPricing) !== JSON.stringify(originalProduct.quantityBasedPricing)) return true;

//     // Check sizes
//     if (JSON.stringify(formData.sizes) !== JSON.stringify(originalProduct.sizes)) return true;

//     // Check colors
//     if (JSON.stringify(formData.colors) !== JSON.stringify(originalProduct.colors)) return true;

//     // Check images
//     if (imagesToDelete.length > 0) return true;
//     if (newImages.some(img => img !== null)) return true;

//     return false;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!hasChanges()) {
//       toast.info('No changes to save');
//       router.push('/admin/allProducts');
//       return;
//     }

//     const hasEmptyPrice = formData.quantityBasedPricing.some(tier => tier.price === '');
//     if (hasEmptyPrice) {
//       toast.error('Please fill in all price fields in Quantity Based Pricing');
//       return;
//     }

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();

//       const processedPricing = formData.quantityBasedPricing.map(tier => ({
//         ...tier,
//         price: tier.price === '' ? 0 : parseFloat(tier.price)
//       }));

//       // Append all form data
//       formDataToSend.append('productName', formData.productName);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('targetedCustomer', formData.targetedCustomer);
//       formDataToSend.append('fabric', formData.fabric);
//       formDataToSend.append('moq', formData.moq);
//       formDataToSend.append('pricePerUnit', formData.pricePerUnit);
//       formDataToSend.append('quantityBasedPricing', JSON.stringify(processedPricing));
//       formDataToSend.append('sizes', JSON.stringify(formData.sizes.filter(s => s.trim() !== '')));
//       formDataToSend.append('colors', JSON.stringify(formData.colors));

//       // Append images to delete
//       if (imagesToDelete.length > 0) {
//         formDataToSend.append('imagesToDelete', JSON.stringify(imagesToDelete));
//       }

//       // Append new images
//       newImages.forEach(img => {
//         if (img && img.file) {
//           formDataToSend.append('images', img.file);
//         }
//       });

//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formDataToSend
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Product updated successfully!');
//         router.push('/admin/allProducts');
//       } else {
//         toast.error(data.error || 'Failed to update product');
//       }
//     } catch (error) {
//       console.error('Error updating product:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Get icon for selected customer
//   const getSelectedCustomerIcon = () => {
//     const customer = TARGETED_CUSTOMERS.find(c => c.value === formData.targetedCustomer);
//     return customer ? customer.icon : '👤';
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-[#E39A65] mx-auto mb-4" />
//           <p className="text-gray-600">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <MantineProvider>
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <NextLink href="/admin/allProducts" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
//                     <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
//                       {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' ? 'Admin' : 'Moderator' : ''}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Product ID: {productId?.slice(-8)} • Update product information
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit}>
//             {/* Row 1: Basic Details and Product Images */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//               {/* Basic Details Card */}
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Package className="w-5 h-5 text-[#E39A65]" />
//                       Basic Details
//                     </h2>
//                   </div>
                  
//                   <div className="p-5 space-y-4">
//                     {/* Product Name */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Product Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="productName"
//                         value={formData.productName}
//                         onChange={handleChange}
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                           errors.productName ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="e.g., Premium Cotton T-Shirt"
//                       />
//                       {errors.productName && (
//                         <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                           <AlertCircle className="w-3 h-3" />
//                           {errors.productName}
//                         </p>
//                       )}
//                     </div>

//                     {/* Description with Rich Text Editor */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Description
//                       </label>
//                       {isMounted && editor && (
//                         <RichTextEditor editor={editor}>
//                           <RichTextEditor.Toolbar sticky stickyOffset={60}>
//                             <RichTextEditor.ControlsGroup>
//                               <RichTextEditor.Bold />
//                               <RichTextEditor.Italic />
//                               <RichTextEditor.Underline />
//                               <RichTextEditor.Strikethrough />
//                               <RichTextEditor.ClearFormatting />
//                             </RichTextEditor.ControlsGroup>

//                             <RichTextEditor.ControlsGroup>
//                               <RichTextEditor.H1 />
//                               <RichTextEditor.H2 />
//                               <RichTextEditor.H3 />
//                               <RichTextEditor.H4 />
//                             </RichTextEditor.ControlsGroup>

//                             <RichTextEditor.ControlsGroup>
//                               <RichTextEditor.AlignLeft />
//                               <RichTextEditor.AlignCenter />
//                               <RichTextEditor.AlignRight />
//                             </RichTextEditor.ControlsGroup>
//                           </RichTextEditor.Toolbar>

//                           <RichTextEditor.Content />
//                         </RichTextEditor>
//                       )}
//                     </div>

//                     {/* Category, Targeted Customer, and Fabric */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       {/* Category */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Category <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           name="category"
//                           value={formData.category}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                             errors.category ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                         >
//                           <option value="">Choose Category</option>
//                           {categories.map(cat => (
//                             <option key={cat._id} value={cat._id}>{cat.name}</option>
//                           ))}
//                         </select>
//                         {errors.category && (
//                           <p className="text-xs text-red-600 mt-1">{errors.category}</p>
//                         )}
                        
//                         {/* Show selected category details */}
//                         {selectedCategoryDetails && (
//                           <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-200">
//                             <p className="text-xs text-gray-600">
//                               <span className="font-medium">Selected:</span> {selectedCategoryDetails.name}
//                             </p>
//                           </div>
//                         )}
//                       </div>

//                       {/* Targeted Customer */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-1">
//                             <Users className="w-4 h-4" />
//                             Target Customer <span className="text-red-500">*</span>
//                           </div>
//                         </label>
//                         <div className="relative">
//                           <select
//                             name="targetedCustomer"
//                             value={formData.targetedCustomer}
//                             onChange={handleChange}
//                             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition appearance-none ${
//                               errors.targetedCustomer ? 'border-red-500' : 'border-gray-300'
//                             }`}
//                           >
//                             {TARGETED_CUSTOMERS.map(customer => (
//                               <option key={customer.value} value={customer.value}>
//                                 {customer.icon} {customer.label}
//                               </option>
//                             ))}
//                           </select>
//                           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                             <span className="text-lg">{getSelectedCustomerIcon()}</span>
//                           </div>
//                         </div>
//                         {errors.targetedCustomer && (
//                           <p className="text-xs text-red-600 mt-1">{errors.targetedCustomer}</p>
//                         )}
//                       </div>

//                       {/* Fabric */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Fabric (Material) <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="fabric"
//                           value={formData.fabric}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                             errors.fabric ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="e.g., 100% Cotton"
//                         />
//                         {errors.fabric && (
//                           <p className="text-xs text-red-600 mt-1">{errors.fabric}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Product Images Card */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <ImageIcon className="w-5 h-5 text-[#E39A65]" />
//                       Product Images <span className="text-red-500">*</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Existing images: {existingImages.length} • Max 4 images total
//                     </p>
//                   </div>
                  
//                   <div className="p-5">
//                     {errors.images && (
//                       <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.images}
//                       </p>
//                     )}
                    
//                     {/* Existing Images */}
//                     {existingImages.length > 0 && (
//                       <div className="mb-4">
//                         <h3 className="text-xs font-medium text-gray-500 mb-2">Current Images</h3>
//                         <div className="grid grid-cols-2 gap-3">
//                           {existingImages.map((image, index) => (
//                             <div key={image.publicId} className="relative rounded-lg overflow-hidden border border-gray-200 h-24">
//                               <img 
//                                 src={image.url} 
//                                 alt={`Product ${index + 1}`} 
//                                 className="w-full h-full object-cover"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => removeExistingImage(image.publicId)}
//                                 className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                                 title="Remove Image"
//                               >
//                                 <X className="w-3 h-3" />
//                               </button>
//                               {image.isPrimary && (
//                                 <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-green-500 text-white text-xs rounded">
//                                   Primary
//                                 </span>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* New Images Upload */}
//                     {existingImages.length + newImages.filter(img => img !== null).length < 4 && (
//                       <div>
//                         <h3 className="text-xs font-medium text-gray-500 mb-2">Add New Images</h3>
//                         <div className="grid grid-cols-2 gap-3">
//                           {[0, 1, 2, 3].map((index) => {
//                             if (index >= (4 - (existingImages.length + newImages.filter(img => img !== null).length))) {
//                               return null;
//                             }
                            
//                             return (
//                               <div key={`new-${index}`}>
//                                 {!newImages[index] ? (
//                                   <div 
//                                     className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center transition-colors cursor-pointer h-24 flex flex-col items-center justify-center hover:border-[#E39A65] hover:bg-orange-50"
//                                     onClick={() => fileInputRefs.current[index]?.click()}
//                                   >
//                                     <input 
//                                       type="file" 
//                                       ref={el => fileInputRefs.current[index] = el}
//                                       className="hidden" 
//                                       accept="image/jpeg,image/jpg,image/png,image/webp" 
//                                       onChange={(e) => handleNewImageChange(e, index)} 
//                                     />
//                                     <Upload className="w-5 h-5 text-gray-400 mb-1" />
//                                     <p className="text-xs text-gray-600">New Image</p>
//                                   </div>
//                                 ) : (
//                                   <div className="relative rounded-lg overflow-hidden border border-gray-200 h-24">
//                                     <img 
//                                       src={newImages[index].preview} 
//                                       alt={`New ${index + 1}`} 
//                                       className="w-full h-full object-cover"
//                                     />
//                                     <button
//                                       type="button"
//                                       onClick={() => removeNewImage(index)}
//                                       className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                                     >
//                                       <X className="w-3 h-3" />
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Row 2: Sizes and Colors */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               {/* Sizes Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Ruler className="w-5 h-5 text-[#E39A65]" />
//                     Sizes <span className="text-red-500">*</span>
//                   </h2>
//                 </div>
                
//                 <div className="p-5">
//                   {errors.sizes && (
//                     <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {errors.sizes}
//                     </p>
//                   )}
                  
//                   <div className="space-y-2">
//                     {formData.sizes.map((size, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <input
//                           type="text"
//                           value={size}
//                           onChange={(e) => handleSizeChange(index, e.target.value)}
//                           placeholder={`Size ${index + 1}`}
//                           className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//                         />
//                         {formData.sizes.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeSize(index)}
//                             className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
                    
//                     <button
//                       type="button"
//                       onClick={addSize}
//                       className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium text-[#E39A65] border border-dashed border-[#E39A65] rounded-lg hover:bg-orange-50 transition-colors"
//                     >
//                       <Plus className="w-3.5 h-3.5" />
//                       Add Size
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Colors Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Palette className="w-5 h-5 text-[#E39A65]" />
//                     Colors <span className="text-red-500">*</span>
//                   </h2>
//                 </div>
                
//                 <div className="p-5">
//                   {errors.colors && (
//                     <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {errors.colors}
//                     </p>
//                   )}
                  
//                   <div className="space-y-3">
//                     {formData.colors.map((color, index) => (
//                       <div key={index} className="relative">
//                         <div className="flex items-center gap-2 w-full">
//                           {/* Color Preview and Hex Code */}
//                           <div 
//                             className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-1 cursor-pointer hover:border-[#E39A65] transition-colors"
//                             onClick={(e) => openColorPicker(index, e)}
//                           >
//                             <div 
//                               className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
//                               style={{ backgroundColor: color.code }}
//                             />
//                             <div className="flex-1 font-mono text-sm text-gray-600">
//                               {color.code}
//                             </div>
//                             <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
//                           </div>
                          
//                           {/* Delete Button */}
//                           {formData.colors.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => removeColor(index)}
//                               className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//                               title="Remove Color"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           )}
//                         </div>

//                         {/* Color Picker Popup */}
//                         {showColorPicker && currentColorIndex === index && (
//                           <div 
//                             ref={colorPickerRef}
//                             className="absolute right-0 mt-2 z-50"
//                           >
//                             <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
//                               <SketchPicker
//                                 color={color.code}
//                                 onChange={(color) => handleColorChange(index, 'code', color.hex)}
//                                 presetColors={PREDEFINED_COLORS}
//                               />
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
                    
//                     <button
//                       type="button"
//                       onClick={addColor}
//                       className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium text-[#E39A65] border border-dashed border-[#E39A65] rounded-lg hover:bg-orange-50 transition-colors"
//                     >
//                       <Plus className="w-3.5 h-3.5" />
//                       Add Color
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Row 3: Bulk Pricing */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <DollarSign className="w-5 h-5 text-[#E39A65]" />
//                     Bulk Pricing
//                   </h2>
//                 </div>
                
//                 <div className="p-5 space-y-4">
//                   {/* MOQ and Base Price */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Minimum Quantity (MOQ) <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         name="moq"
//                         value={formData.moq}
//                         onChange={handleChange}
//                         min="1"
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                           errors.moq ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                       />
//                       {errors.moq && (
//                         <p className="text-xs text-red-600 mt-1">{errors.moq}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Price Per Unit ($) <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         name="pricePerUnit"
//                         value={formData.pricePerUnit}
//                         onChange={handleChange}
//                         min="0"
//                         step="0.01"
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                           errors.pricePerUnit ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                       />
//                       {errors.pricePerUnit && (
//                         <p className="text-xs text-red-600 mt-1">{errors.pricePerUnit}</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Quantity Based Pricing */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Quantity Based Pricing:
//                       </label>
//                       <button
//                         type="button"
//                         onClick={addPricingRow}
//                         className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors border border-[#E39A65]/20"
//                       >
//                         <PlusCircle className="w-3.5 h-3.5" />
//                         Add Tier
//                       </button>
//                     </div>
                    
//                     <div className="space-y-4">
//                       {formData.quantityBasedPricing.map((tier, index) => (
//                         <div key={index} className="flex items-start gap-3">
//                           <div className="w-1/2">
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               Quantity Range
//                             </label>
//                             <input
//                               type="text"
//                               value={tier.range}
//                               onChange={(e) => handlePricingChange(index, 'range', e.target.value)}
//                               placeholder="e.g., 100-299"
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//                             />
//                           </div>
                          
//                           <div className="w-1/2">
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               Price ($)
//                             </label>
//                             <input
//                               type="number"
//                               value={tier.price}
//                               onChange={(e) => handlePricingChange(index, 'price', e.target.value)}
//                               placeholder="0.00"
//                               min="0"
//                               step="0.01"
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//                             />
//                           </div>
                          
//                           {formData.quantityBasedPricing.length > 1 && (
//                             <div className="flex items-end h-[62px]">
//                               <button
//                                 type="button"
//                                 onClick={() => removePricingRow(index)}
//                                 className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                 title="Remove Tier"
//                               >
//                                 <MinusCircle className="w-5 h-5" />
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-6 flex justify-end gap-3">
//               <NextLink
//                 href="/admin/allProducts"
//                 className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
//               >
//                 Cancel
//               </NextLink>
//               <button
//                 type="submit"
//                 disabled={isSubmitting || !hasChanges()}
//                 className="flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Updating Product...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Update Product</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </MantineProvider>
//   );
// }



'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Trash2,
  Upload,
  Package,
  DollarSign,
  Palette,
  Ruler,
  MinusCircle,
  PlusCircle,
  ChevronDown,
  Users,
  Info,
  Hash,
  Type
} from 'lucide-react';
import NextLink from 'next/link';
import { toast } from 'sonner';
import { SketchPicker } from 'react-color';
import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TipTapLink from '@tiptap/extension-link';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';

// Predefined colors for quick selection
const PREDEFINED_COLORS = [
  '#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF',
  '#000000', '#FFFFFF', '#808080', '#800000', '#808000', '#008000',
  '#800080', '#008080', '#000080', '#FFA500', '#FFC0CB', '#A52A2A',
  '#E39A65', '#4A90E2', '#50C878', '#9B59B6', '#E74C3C', '#F39C12', '#1ABC9C',
];

// Targeted customer options
const TARGETED_CUSTOMERS = [
  { value: 'ladies', label: 'Ladies', icon: '👩' },
  { value: 'gents', label: 'Gents', icon: '👨' },
  { value: 'kids', label: 'Kids', icon: '🧒' },
  { value: 'unisex', label: 'Unisex', icon: '👤' }
];

export default function EditProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [originalProduct, setOriginalProduct] = useState(null);
  
  // Refs for click outside detection
  const colorPickerRef = useRef(null);
  
  // Form state with additionalInfo
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    targetedCustomer: 'unisex',
    fabric: '',
    moq: 100,
    pricePerUnit: 0,
    quantityBasedPricing: [
      { range: '100-299', price: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { code: '#FF0000' },
      { code: '#0000FF' },
      { code: '#000000' }
    ],
    additionalInfo: [] // New field for additional information
  });

  // Image states
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  // File input refs for new images
  const fileInputRefs = useRef([]);

  // Errors state
  const [errors, setErrors] = useState({});

  // Allowed file types
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if product ID exists
  useEffect(() => {
    if (!productId) {
      toast.error('No product ID provided');
      router.push('/admin/allProducts');
    }
  }, [productId, router]);

  // Click outside handler for color picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
        setCurrentColorIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initialize TipTap editor only on client side
  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, description: editor.getHTML() }));
    },
    immediatelyRender: false,
    editable: true,
  });

  // Fetch categories and product data on mount
  useEffect(() => {
    if (productId) {
      fetchCategories();
      fetchProduct();
    }
  }, [productId]);

  // Fetch category details when category is selected
  useEffect(() => {
    if (formData.category) {
      fetchCategoryDetails(formData.category);
    } else {
      setSelectedCategoryDetails(null);
    }
  }, [formData.category]);

  // Update editor content when formData.description changes
  useEffect(() => {
    if (editor && formData.description !== editor.getHTML()) {
      editor.commands.setContent(formData.description);
    }
  }, [formData.description, editor]);

  // Check user role
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'moderator' && user.role !== 'admin') {
      router.push('/login');
    }
  }, [router]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const fetchCategoryDetails = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setSelectedCategoryDetails(data.data);
      }
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  };

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        const product = data.data;
        setOriginalProduct(product);
        
        // Set form data including additionalInfo
        setFormData({
          productName: product.productName || '',
          description: product.description || '',
          category: product.category?._id || product.category || '',
          targetedCustomer: product.targetedCustomer || 'unisex',
          fabric: product.fabric || '',
          moq: product.moq || 100,
          pricePerUnit: product.pricePerUnit || 0,
          quantityBasedPricing: product.quantityBasedPricing || [{ range: '100-299', price: 0 }],
          sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
          colors: product.colors || [{ code: '#FF0000' }],
          additionalInfo: product.additionalInfo || [] // Load additional info
        });

        // Set existing images
        setExistingImages(product.images || []);
      } else {
        toast.error('Failed to fetch product details');
        router.push('/admin/allProducts');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product details');
      router.push('/admin/allProducts');
    } finally {
      setIsLoading(false);
    }
  };

  // Validate image file
  const validateImageFile = (file) => {
    if (!allowedFileTypes.includes(file.type)) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return {
        valid: false,
        message: `Invalid format: .${fileExtension}. Allowed: ${allowedExtensions.join(', ')}`
      };
    }

    if (file.size > maxFileSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return {
        valid: false,
        message: `File too large: ${fileSizeMB}MB. Max: 5MB`
      };
    }

    return { valid: true };
  };

  // Handle new image selection
  const handleNewImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedNewImages = [...newImages];
      updatedNewImages[index] = {
        file,
        preview: reader.result
      };
      setNewImages(updatedNewImages);
    };
    reader.readAsDataURL(file);
  };

  // Remove existing image
  const removeExistingImage = (imageId) => {
    setImagesToDelete(prev => [...prev, imageId]);
    setExistingImages(prev => prev.filter(img => img.publicId !== imageId));
  };

  // Remove new image
  const removeNewImage = (index) => {
    const updatedNewImages = [...newImages];
    updatedNewImages[index] = null;
    setNewImages(updatedNewImages);
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = '';
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle quantity based pricing changes
  const handlePricingChange = (index, field, value) => {
    const updatedPricing = [...formData.quantityBasedPricing];
    
    if (field === 'price') {
      if (value === '') {
        updatedPricing[index] = { ...updatedPricing[index], [field]: '' };
      } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          updatedPricing[index] = { ...updatedPricing[index], [field]: numValue };
        }
      }
    } else {
      updatedPricing[index] = { ...updatedPricing[index], [field]: value };
    }
    
    setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
  };

  // Add new pricing row
  const addPricingRow = () => {
    setFormData(prev => ({
      ...prev,
      quantityBasedPricing: [
        ...prev.quantityBasedPricing,
        { range: '', price: '' }
      ]
    }));
  };

  // Remove pricing row
  const removePricingRow = (index) => {
    if (formData.quantityBasedPricing.length > 1) {
      const updatedPricing = formData.quantityBasedPricing.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
    }
  };

  // Handle size changes
  const handleSizeChange = (index, value) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index] = value;
    setFormData(prev => ({ ...prev, sizes: updatedSizes }));
  };

  // Add new size
  const addSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, '']
    }));
  };

  // Remove size
  const removeSize = (index) => {
    if (formData.sizes.length > 1) {
      const updatedSizes = formData.sizes.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, sizes: updatedSizes }));
    }
  };

  // Handle color changes
  const handleColorChange = (index, field, value) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setFormData(prev => ({ ...prev, colors: updatedColors }));
  };

  // Handle color picker open
  const openColorPicker = (index, event) => {
    event.stopPropagation();
    setCurrentColorIndex(index);
    setShowColorPicker(true);
  };

  // Add new color
  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { code: '#000000' }]
    }));
  };

  // Remove color
  const removeColor = (index) => {
    if (formData.colors.length > 1) {
      const updatedColors = formData.colors.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, colors: updatedColors }));
    }
  };

  // ========== ADDITIONAL INFO HANDLERS ==========
  
  // Handle additional info changes
  const handleAdditionalInfoChange = (index, field, value) => {
    const updatedInfo = [...formData.additionalInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    
    // Clear error for this field if it exists
    if (errors[`additionalInfo_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`additionalInfo_${index}_${field}`]: null }));
    }
  };

  // Add new additional info row
  const addAdditionalInfo = () => {
    setFormData(prev => ({
      ...prev,
      additionalInfo: [
        ...prev.additionalInfo,
        { fieldName: '', fieldValue: '' }
      ]
    }));
  };

  // Remove additional info row
  const removeAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
  };

  // Validate additional info
  const validateAdditionalInfo = () => {
    let isValid = true;
    const newErrors = {};

    formData.additionalInfo.forEach((info, index) => {
      if (!info.fieldName.trim()) {
        newErrors[`additionalInfo_${index}_fieldName`] = 'Field name is required';
        isValid = false;
      }
      if (!info.fieldValue.trim()) {
        newErrors[`additionalInfo_${index}_fieldValue`] = 'Field value is required';
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.targetedCustomer) {
      newErrors.targetedCustomer = 'Targeted customer is required';
    }

    if (!formData.fabric.trim()) {
      newErrors.fabric = 'Fabric details are required';
    }

    if (formData.moq < 1) {
      newErrors.moq = 'MOQ must be at least 1';
    }

    if (formData.pricePerUnit < 0) {
      newErrors.pricePerUnit = 'Price must be 0 or greater';
    }

    const hasImages = existingImages.length > 0 || newImages.some(img => img !== null);
    if (!hasImages) {
      newErrors.images = 'At least one product image is required';
    }

    const validSizes = formData.sizes.filter(s => s.trim() !== '');
    if (validSizes.length === 0) {
      newErrors.sizes = 'At least one size is required';
    }

    if (formData.colors.length === 0) {
      newErrors.colors = 'At least one color is required';
    }

    setErrors(newErrors);
    
    // Validate additional info separately
    const isAdditionalInfoValid = validateAdditionalInfo();
    
    return Object.keys(newErrors).length === 0 && isAdditionalInfoValid;
  };

  // Check if any changes were made
  const hasChanges = () => {
    if (!originalProduct) return false;

    // Check basic fields
    if (formData.productName !== originalProduct.productName) return true;
    if (formData.description !== originalProduct.description) return true;
    if (formData.category !== (originalProduct.category?._id || originalProduct.category)) return true;
    if (formData.targetedCustomer !== originalProduct.targetedCustomer) return true;
    if (formData.fabric !== originalProduct.fabric) return true;
    if (formData.moq !== originalProduct.moq) return true;
    if (formData.pricePerUnit !== originalProduct.pricePerUnit) return true;

    // Check quantity based pricing
    if (JSON.stringify(formData.quantityBasedPricing) !== JSON.stringify(originalProduct.quantityBasedPricing)) return true;

    // Check sizes
    if (JSON.stringify(formData.sizes) !== JSON.stringify(originalProduct.sizes)) return true;

    // Check colors
    if (JSON.stringify(formData.colors) !== JSON.stringify(originalProduct.colors)) return true;

    // Check additional info
    if (JSON.stringify(formData.additionalInfo) !== JSON.stringify(originalProduct.additionalInfo || [])) return true;

    // Check images
    if (imagesToDelete.length > 0) return true;
    if (newImages.some(img => img !== null)) return true;

    return false;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      toast.info('No changes to save');
      router.push('/admin/allProducts');
      return;
    }

    const hasEmptyPrice = formData.quantityBasedPricing.some(tier => tier.price === '');
    if (hasEmptyPrice) {
      toast.error('Please fill in all price fields in Quantity Based Pricing');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      const processedPricing = formData.quantityBasedPricing.map(tier => ({
        ...tier,
        price: tier.price === '' ? 0 : parseFloat(tier.price)
      }));

      // Filter out empty additional info rows
      const processedAdditionalInfo = formData.additionalInfo.filter(
        info => info.fieldName.trim() !== '' && info.fieldValue.trim() !== ''
      );

      // Append all form data
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('targetedCustomer', formData.targetedCustomer);
      formDataToSend.append('fabric', formData.fabric);
      formDataToSend.append('moq', formData.moq);
      formDataToSend.append('pricePerUnit', formData.pricePerUnit);
      formDataToSend.append('quantityBasedPricing', JSON.stringify(processedPricing));
      formDataToSend.append('sizes', JSON.stringify(formData.sizes.filter(s => s.trim() !== '')));
      formDataToSend.append('colors', JSON.stringify(formData.colors));
      formDataToSend.append('additionalInfo', JSON.stringify(processedAdditionalInfo));

      // Append images to delete
      if (imagesToDelete.length > 0) {
        formDataToSend.append('imagesToDelete', JSON.stringify(imagesToDelete));
      }

      // Append new images
      newImages.forEach(img => {
        if (img && img.file) {
          formDataToSend.append('images', img.file);
        }
      });

      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product updated successfully!');
        router.push('/admin/allProducts');
      } else {
        toast.error(data.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get icon for selected customer
  const getSelectedCustomerIcon = () => {
    const customer = TARGETED_CUSTOMERS.find(c => c.value === formData.targetedCustomer);
    return customer ? customer.icon : '👤';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#E39A65] mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <NextLink href="/admin/allProducts" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </NextLink>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                      {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' ? 'Admin' : 'Moderator' : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Product ID: {productId?.slice(-8)} • Update product information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Row 1: Basic Details and Product Images */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Basic Details Card */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#E39A65]" />
                      Basic Details
                    </h2>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                          errors.productName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Premium Cotton T-Shirt"
                      />
                      {errors.productName && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.productName}
                        </p>
                      )}
                    </div>

                    {/* Description with Rich Text Editor */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      {isMounted && editor && (
                        <RichTextEditor editor={editor}>
                          <RichTextEditor.Toolbar sticky stickyOffset={60}>
                            <RichTextEditor.ControlsGroup>
                              <RichTextEditor.Bold />
                              <RichTextEditor.Italic />
                              <RichTextEditor.Underline />
                              <RichTextEditor.Strikethrough />
                              <RichTextEditor.ClearFormatting />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                              <RichTextEditor.H1 />
                              <RichTextEditor.H2 />
                              <RichTextEditor.H3 />
                              <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                              <RichTextEditor.AlignLeft />
                              <RichTextEditor.AlignCenter />
                              <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>
                          </RichTextEditor.Toolbar>

                          <RichTextEditor.Content />
                        </RichTextEditor>
                      )}
                    </div>

                    {/* Category, Targeted Customer, and Fabric */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                            errors.category ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Choose Category</option>
                          {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="text-xs text-red-600 mt-1">{errors.category}</p>
                        )}
                        
                        {/* Show selected category details */}
                        {selectedCategoryDetails && (
                          <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-200">
                            <p className="text-xs text-gray-600">
                              <span className="font-medium">Selected:</span> {selectedCategoryDetails.name}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Targeted Customer */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Target Customer <span className="text-red-500">*</span>
                          </div>
                        </label>
                        <div className="relative">
                          <select
                            name="targetedCustomer"
                            value={formData.targetedCustomer}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition appearance-none ${
                              errors.targetedCustomer ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            {TARGETED_CUSTOMERS.map(customer => (
                              <option key={customer.value} value={customer.value}>
                                {customer.icon} {customer.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <span className="text-lg">{getSelectedCustomerIcon()}</span>
                          </div>
                        </div>
                        {errors.targetedCustomer && (
                          <p className="text-xs text-red-600 mt-1">{errors.targetedCustomer}</p>
                        )}
                      </div>

                      {/* Fabric */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fabric (Material) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fabric"
                          value={formData.fabric}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                            errors.fabric ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., 100% Cotton"
                        />
                        {errors.fabric && (
                          <p className="text-xs text-red-600 mt-1">{errors.fabric}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Images Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#E39A65]" />
                      Product Images <span className="text-red-500">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Existing images: {existingImages.length} • Max 4 images total
                    </p>
                  </div>
                  
                  <div className="p-5">
                    {errors.images && (
                      <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.images}
                      </p>
                    )}
                    
                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs font-medium text-gray-500 mb-2">Current Images</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {existingImages.map((image, index) => (
                            <div key={image.publicId} className="relative rounded-lg overflow-hidden border border-gray-200 h-24">
                              <img 
                                src={image.url} 
                                alt={`Product ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeExistingImage(image.publicId)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                title="Remove Image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              {image.isPrimary && (
                                <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-green-500 text-white text-xs rounded">
                                  Primary
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* New Images Upload */}
                    {existingImages.length + newImages.filter(img => img !== null).length < 4 && (
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 mb-2">Add New Images</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {[0, 1, 2, 3].map((index) => {
                            if (index >= (4 - (existingImages.length + newImages.filter(img => img !== null).length))) {
                              return null;
                            }
                            
                            return (
                              <div key={`new-${index}`}>
                                {!newImages[index] ? (
                                  <div 
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center transition-colors cursor-pointer h-24 flex flex-col items-center justify-center hover:border-[#E39A65] hover:bg-orange-50"
                                    onClick={() => fileInputRefs.current[index]?.click()}
                                  >
                                    <input 
                                      type="file" 
                                      ref={el => fileInputRefs.current[index] = el}
                                      className="hidden" 
                                      accept="image/jpeg,image/jpg,image/png,image/webp" 
                                      onChange={(e) => handleNewImageChange(e, index)} 
                                    />
                                    <Upload className="w-5 h-5 text-gray-400 mb-1" />
                                    <p className="text-xs text-gray-600">New Image</p>
                                  </div>
                                ) : (
                                  <div className="relative rounded-lg overflow-hidden border border-gray-200 h-24">
                                    <img 
                                      src={newImages[index].preview} 
                                      alt={`New ${index + 1}`} 
                                      className="w-full h-full object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeNewImage(index)}
                                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Sizes and Colors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Sizes Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-[#E39A65]" />
                    Sizes <span className="text-red-500">*</span>
                  </h2>
                </div>
                
                <div className="p-5">
                  {errors.sizes && (
                    <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.sizes}
                    </p>
                  )}
                  
                  <div className="space-y-2">
                    {formData.sizes.map((size, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={size}
                          onChange={(e) => handleSizeChange(index, e.target.value)}
                          placeholder={`Size ${index + 1}`}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                        />
                        {formData.sizes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSize(index)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addSize}
                      className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium text-[#E39A65] border border-dashed border-[#E39A65] rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Size
                    </button>
                  </div>
                </div>
              </div>

              {/* Colors Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#E39A65]" />
                    Colors <span className="text-red-500">*</span>
                  </h2>
                </div>
                
                <div className="p-5">
                  {errors.colors && (
                    <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.colors}
                    </p>
                  )}
                  
                  <div className="space-y-3">
                    {formData.colors.map((color, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center gap-2 w-full">
                          {/* Color Preview and Hex Code */}
                          <div 
                            className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-1 cursor-pointer hover:border-[#E39A65] transition-colors"
                            onClick={(e) => openColorPicker(index, e)}
                          >
                            <div 
                              className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
                              style={{ backgroundColor: color.code }}
                            />
                            <div className="flex-1 font-mono text-sm text-gray-600">
                              {color.code}
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          </div>
                          
                          {/* Delete Button */}
                          {formData.colors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeColor(index)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                              title="Remove Color"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Color Picker Popup */}
                        {showColorPicker && currentColorIndex === index && (
                          <div 
                            ref={colorPickerRef}
                            className="absolute right-0 mt-2 z-50"
                          >
                            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                              <SketchPicker
                                color={color.code}
                                onChange={(color) => handleColorChange(index, 'code', color.hex)}
                                presetColors={PREDEFINED_COLORS}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addColor}
                      className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium text-[#E39A65] border border-dashed border-[#E39A65] rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Color
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW ROW: Additional Information */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#E39A65]" />
                    Additional Information
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Add or edit custom fields for extra product details (e.g., Care Instructions, Country of Origin, Warranty, etc.)
                  </p>
                </div>
                
                <div className="p-5">
                  <div className="space-y-4">
                    {formData.additionalInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Field Name */}
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              <div className="flex items-center gap-1">
                                <Type className="w-3 h-3" />
                                Field Name
                              </div>
                            </label>
                            <input
                              type="text"
                              value={info.fieldName}
                              onChange={(e) => handleAdditionalInfoChange(index, 'fieldName', e.target.value)}
                              placeholder="e.g., Care Instructions, Country, Warranty"
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                                errors[`additionalInfo_${index}_fieldName`] ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors[`additionalInfo_${index}_fieldName`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`additionalInfo_${index}_fieldName`]}</p>
                            )}
                          </div>
                          
                          {/* Field Value */}
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              <div className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                Field Value
                              </div>
                            </label>
                            <input
                              type="text"
                              value={info.fieldValue}
                              onChange={(e) => handleAdditionalInfoChange(index, 'fieldValue', e.target.value)}
                              placeholder="e.g., Machine Wash, Bangladesh, 2 Years"
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                                errors[`additionalInfo_${index}_fieldValue`] ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors[`additionalInfo_${index}_fieldValue`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`additionalInfo_${index}_fieldValue`]}</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeAdditionalInfo(index)}
                          className="mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                          title="Remove Field"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Add Button */}
                    <button
                      type="button"
                      onClick={addAdditionalInfo}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#E39A65] border-2 border-dashed border-[#E39A65]/30 rounded-lg hover:bg-orange-50 hover:border-[#E39A65] transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Additional Information
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Bulk Pricing */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#E39A65]" />
                    Bulk Pricing
                  </h2>
                </div>
                
                <div className="p-5 space-y-4">
                  {/* MOQ and Base Price */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Quantity (MOQ) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="moq"
                        value={formData.moq}
                        onChange={handleChange}
                        min="1"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                          errors.moq ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.moq && (
                        <p className="text-xs text-red-600 mt-1">{errors.moq}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Per Unit ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="pricePerUnit"
                        value={formData.pricePerUnit}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                          errors.pricePerUnit ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.pricePerUnit && (
                        <p className="text-xs text-red-600 mt-1">{errors.pricePerUnit}</p>
                      )}
                    </div>
                  </div>

                  {/* Quantity Based Pricing */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity Based Pricing:
                      </label>
                      <button
                        type="button"
                        onClick={addPricingRow}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors border border-[#E39A65]/20"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        Add Tier
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {formData.quantityBasedPricing.map((tier, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-1/2">
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              Quantity Range
                            </label>
                            <input
                              type="text"
                              value={tier.range}
                              onChange={(e) => handlePricingChange(index, 'range', e.target.value)}
                              placeholder="e.g., 100-299"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                            />
                          </div>
                          
                          <div className="w-1/2">
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              Price ($)
                            </label>
                            <input
                              type="number"
                              value={tier.price}
                              onChange={(e) => handlePricingChange(index, 'price', e.target.value)}
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                            />
                          </div>
                          
                          {formData.quantityBasedPricing.length > 1 && (
                            <div className="flex items-end h-[62px]">
                              <button
                                type="button"
                                onClick={() => removePricingRow(index)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove Tier"
                              >
                                <MinusCircle className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <NextLink
                href="/admin/allProducts"
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Cancel
              </NextLink>
              <button
                type="submit"
                disabled={isSubmitting || !hasChanges()}
                className="flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Product...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MantineProvider>
  );
}