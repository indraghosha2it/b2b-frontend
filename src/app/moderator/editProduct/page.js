


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
//   Users,
//   Shield,
//   Info,
//   Hash,
//   Type,
//   Star,
//   Search,
//   Tag
// } from 'lucide-react';
// import NextLink from 'next/link';
// import { toast } from 'sonner';
// import { SketchPicker } from 'react-color';
// import { MantineProvider } from '@mantine/core';
// import { RichTextEditor } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import TextAlign from '@tiptap/extension-text-align';
// import Link from '@tiptap/extension-link'; // Changed from TipTapLink to Link
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

// // Available tags (matching your schema)
// const AVAILABLE_TAGS = [
//   'Top Ranking',
//   'New Arrival',
//   'Top Deal',
//   'Best Seller',
//   'Summer Collection',
//   'Winter Collection',
//   'Limited Edition',
//   'Trending'
// ];

// export default function ModeratorEditProduct() {
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
//   const [userRole, setUserRole] = useState('');
//   const [keywordInput, setKeywordInput] = useState('');

//   // New state for collapsible sections
//   const [showTags, setShowTags] = useState(false);
//   const [showMeta, setShowMeta] = useState(false);
  
//   // Refs for click outside detection
//   const colorPickerRef = useRef(null);
  
//   // Form state with all fields including instruction
//   const [formData, setFormData] = useState({
//     productName: '',
//     description: '',
//     instruction: '', // ADDED instruction field
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
//     ],
//     additionalInfo: [],
//     // NEW FIELDS
//     isFeatured: false,
//     tags: [],
//     metaSettings: {
//       metaTitle: '',
//       metaDescription: '',
//       metaKeywords: []
//     }
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
    
//     // Get user role
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     setUserRole(user.role || '');
    
//     // Check if user has access (moderator or admin)
//     if (user.role !== 'moderator' && user.role !== 'admin') {
//       toast.error('Unauthorized access');
//       router.push('/login');
//     }
//   }, [router]);

//   // Check if product ID exists
//   useEffect(() => {
//     if (!productId) {
//       toast.error('No product ID provided');
//       router.push('/moderator/all-products');
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

//   // Initialize TipTap editor for description
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: {
//           keepMarks: true,
//           keepAttributes: false,
//         },
//         orderedList: {
//           keepMarks: true,
//           keepAttributes: false,
//         },
//       }),
//       Link.configure({
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

//   // Initialize TipTap editor for instructions
//   const instructionEditor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: {
//           keepMarks: true,
//           keepAttributes: false,
//         },
//         orderedList: {
//           keepMarks: true,
//           keepAttributes: false,
//         },
//       }),
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           rel: 'noopener noreferrer',
//           target: '_blank',
//         },
//       }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: formData.instruction,
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, instruction: editor.getHTML() }));
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

//   // Update instruction editor content when formData.instruction changes
//   useEffect(() => {
//     if (instructionEditor && formData.instruction !== instructionEditor.getHTML()) {
//       instructionEditor.commands.setContent(formData.instruction);
//     }
//   }, [formData.instruction, instructionEditor]);

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
        
//         // Set form data including new fields
//         setFormData({
//           productName: product.productName || '',
//           description: product.description || '',
//           instruction: product.instruction || '', // ADDED instruction field
//           category: product.category?._id || product.category || '',
//           targetedCustomer: product.targetedCustomer || 'unisex',
//           fabric: product.fabric || '',
//           moq: product.moq || 100,
//           pricePerUnit: product.pricePerUnit || 0,
//           quantityBasedPricing: product.quantityBasedPricing || [{ range: '100-299', price: 0 }],
//           sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
//           colors: product.colors || [{ code: '#FF0000' }],
//           additionalInfo: product.additionalInfo || [],
//           // NEW FIELDS
//           isFeatured: product.isFeatured || false,
//           tags: product.tags || [],
//           metaSettings: product.metaSettings || {
//             metaTitle: '',
//             metaDescription: '',
//             metaKeywords: []
//           }
//         });

//         // Set existing images
//         setExistingImages(product.images || []);
//       } else {
//         toast.error('Failed to fetch product details');
//         router.push('/moderator/all-products');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to fetch product details');
//       router.push('/moderator/all-products');
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

//   // ========== ADDITIONAL INFO HANDLERS ==========
  
//   // Handle additional info changes
//   const handleAdditionalInfoChange = (index, field, value) => {
//     const updatedInfo = [...formData.additionalInfo];
//     updatedInfo[index] = { ...updatedInfo[index], [field]: value };
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    
//     if (errors[`additionalInfo_${index}_${field}`]) {
//       setErrors(prev => ({ ...prev, [`additionalInfo_${index}_${field}`]: null }));
//     }
//   };

//   // Add new additional info row
//   const addAdditionalInfo = () => {
//     setFormData(prev => ({
//       ...prev,
//       additionalInfo: [
//         ...prev.additionalInfo,
//         { fieldName: '', fieldValue: '' }
//       ]
//     }));
//   };

//   // Remove additional info row
//   const removeAdditionalInfo = (index) => {
//     const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
//   };

//   // ========== HANDLERS FOR TAGS AND META ==========
  
//   // Handle tag toggle
//   const handleTagToggle = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.includes(tag) ? [] : [tag]
//     }));
//   };

//   // Handle meta settings change
//   const handleMetaChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         [field]: value
//       }
//     }));
//   };

//   // Add keyword handler
//   const addKeyword = () => {
//     if (!keywordInput.trim()) return;
    
//     const keywordsToAdd = keywordInput
//       .split(',')
//       .map(k => k.trim())
//       .filter(k => k !== '');
    
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd]
//       }
//     }));
//     setKeywordInput('');
//   };

//   const handleKeywordKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       addKeyword();
//     }
//   };

//   const handleKeywordBlur = () => {
//     if (keywordInput.trim()) {
//       addKeyword();
//     }
//   };

//   const removeKeyword = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove)
//       }
//     }));
//   };

//   // Validate additional info
//   const validateAdditionalInfo = () => {
//     let isValid = true;
//     const newErrors = {};

//     formData.additionalInfo.forEach((info, index) => {
//       if (!info.fieldName.trim()) {
//         newErrors[`additionalInfo_${index}_fieldName`] = 'Field name is required';
//         isValid = false;
//       }
//       if (!info.fieldValue.trim()) {
//         newErrors[`additionalInfo_${index}_fieldValue`] = 'Field value is required';
//         isValid = false;
//       }
//     });

//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return isValid;
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

//     if (formData.metaSettings.metaTitle && formData.metaSettings.metaTitle.length > 70) {
//       newErrors.metaTitle = 'Meta title should not exceed 70 characters';
//     }

//     if (formData.metaSettings.metaDescription && formData.metaSettings.metaDescription.length > 160) {
//       newErrors.metaDescription = 'Meta description should not exceed 160 characters';
//     }

//     setErrors(newErrors);
    
//     const isAdditionalInfoValid = validateAdditionalInfo();
    
//     return Object.keys(newErrors).length === 0 && isAdditionalInfoValid;
//   };

//   // Check if any changes were made
//   const hasChanges = () => {
//     if (!originalProduct) return false;

//     // Check basic fields
//     if (formData.productName !== originalProduct.productName) return true;
//     if (formData.description !== originalProduct.description) return true;
//     if (formData.instruction !== originalProduct.instruction) return true; // ADDED instruction check
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

//     // Check additional info
//     if (JSON.stringify(formData.additionalInfo) !== JSON.stringify(originalProduct.additionalInfo || [])) return true;

//     // Check NEW FIELDS
//     if (formData.isFeatured !== originalProduct.isFeatured) return true;
//     if (JSON.stringify(formData.tags) !== JSON.stringify(originalProduct.tags || [])) return true;
//     if (JSON.stringify(formData.metaSettings) !== JSON.stringify(originalProduct.metaSettings || {})) return true;

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
//       router.push('/moderator/all-products');
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

//       const processedAdditionalInfo = formData.additionalInfo.filter(
//         info => info.fieldName.trim() !== '' && info.fieldValue.trim() !== ''
//       );

//       formDataToSend.append('productName', formData.productName);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('instruction', formData.instruction || ''); // ADDED instruction field
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('targetedCustomer', formData.targetedCustomer);
//       formDataToSend.append('fabric', formData.fabric);
//       formDataToSend.append('moq', formData.moq);
//       formDataToSend.append('pricePerUnit', formData.pricePerUnit);
//       formDataToSend.append('quantityBasedPricing', JSON.stringify(processedPricing));
//       formDataToSend.append('sizes', JSON.stringify(formData.sizes.filter(s => s.trim() !== '')));
//       formDataToSend.append('colors', JSON.stringify(formData.colors));
//       formDataToSend.append('additionalInfo', JSON.stringify(processedAdditionalInfo));
      
//       formDataToSend.append('isFeatured', formData.isFeatured);
//       formDataToSend.append('tags', JSON.stringify(formData.tags));
//       formDataToSend.append('metaSettings', JSON.stringify(formData.metaSettings));

//       if (imagesToDelete.length > 0) {
//         formDataToSend.append('imagesToDelete', JSON.stringify(imagesToDelete));
//       }

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
//         router.push('/moderator/all-products');
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
//                 <NextLink href="/moderator/all-products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
//                     <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full flex items-center gap-1">
//                       <Shield className="w-3 h-3" />
//                       Moderator
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
//                         <div className="border border-gray-300 rounded-lg overflow-hidden">
//                           <RichTextEditor editor={editor}>
//                             <RichTextEditor.Toolbar>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Bold />
//                                 <RichTextEditor.Italic />
//                                 <RichTextEditor.Underline />
//                                 <RichTextEditor.Strikethrough />
//                               </RichTextEditor.ControlsGroup>

//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.H1 />
//                                 <RichTextEditor.H2 />
//                                 <RichTextEditor.H3 />
//                                 <RichTextEditor.H4 />
//                               </RichTextEditor.ControlsGroup>

//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.BulletList />
//                                 <RichTextEditor.OrderedList />
//                               </RichTextEditor.ControlsGroup>

//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.AlignLeft />
//                                 <RichTextEditor.AlignCenter />
//                                 <RichTextEditor.AlignRight />
//                               </RichTextEditor.ControlsGroup>

//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Link />
//                                 <RichTextEditor.Unlink />
//                               </RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>

//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                     </div>

//                     {/* NEW: Instruction Field with Rich Text Editor */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Instructions / Care Instructions
//                       </label>
//                       {isMounted && instructionEditor && (
//                         <div className="border border-gray-300 rounded-lg overflow-hidden">
//                           <RichTextEditor editor={instructionEditor}>
//                             <RichTextEditor.Toolbar>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Bold />
//                                 <RichTextEditor.Italic />
//                                 <RichTextEditor.Underline />
//                                 <RichTextEditor.Strikethrough />
//                               </RichTextEditor.ControlsGroup>

//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.H1 />
//                                 <RichTextEditor.H2 />
//                                 <RichTextEditor.H3 />
//                                 <RichTextEditor.H4 />
//                               </RichTextEditor.ControlsGroup>

//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.BulletList />
//                                 <RichTextEditor.OrderedList />
//                               </RichTextEditor.ControlsGroup>

//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.AlignLeft />
//                                 <RichTextEditor.AlignCenter />
//                                 <RichTextEditor.AlignRight />
//                               </RichTextEditor.ControlsGroup>

//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Link />
//                                 <RichTextEditor.Unlink />
//                               </RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>

//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                       <p className="text-xs text-gray-500 mt-1">
//                         Update care instructions, washing guidelines, or any special notes for customers
//                       </p>
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

//             {/* Additional Information Section */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Info className="w-5 h-5 text-[#E39A65]" />
//                     Additional Information
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Add or edit custom fields for extra product details (e.g., Care Instructions, Country of Origin, Warranty, etc.)
//                   </p>
//                 </div>
                
//                 <div className="p-5">
//                   <div className="space-y-4">
//                     {formData.additionalInfo.map((info, index) => (
//                       <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//                           {/* Field Name */}
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <div className="flex items-center gap-1">
//                                 <Type className="w-3 h-3" />
//                                 Field Name
//                               </div>
//                             </label>
//                             <input
//                               type="text"
//                               value={info.fieldName}
//                               onChange={(e) => handleAdditionalInfoChange(index, 'fieldName', e.target.value)}
//                               placeholder="e.g., Care Instructions, Country, Warranty"
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                                 errors[`additionalInfo_${index}_fieldName`] ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                             />
//                             {errors[`additionalInfo_${index}_fieldName`] && (
//                               <p className="text-xs text-red-600 mt-1">{errors[`additionalInfo_${index}_fieldName`]}</p>
//                             )}
//                           </div>
                          
//                           {/* Field Value */}
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <div className="flex items-center gap-1">
//                                 <Hash className="w-3 h-3" />
//                                 Field Value
//                               </div>
//                             </label>
//                             <input
//                               type="text"
//                               value={info.fieldValue}
//                               onChange={(e) => handleAdditionalInfoChange(index, 'fieldValue', e.target.value)}
//                               placeholder="e.g., Machine Wash, Bangladesh, 2 Years"
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                                 errors[`additionalInfo_${index}_fieldValue`] ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                             />
//                             {errors[`additionalInfo_${index}_fieldValue`] && (
//                               <p className="text-xs text-red-600 mt-1">{errors[`additionalInfo_${index}_fieldValue`]}</p>
//                             )}
//                           </div>
//                         </div>
                        
//                         {/* Remove Button */}
//                         <button
//                           type="button"
//                           onClick={() => removeAdditionalInfo(index)}
//                           className="mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//                           title="Remove Field"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
                    
//                     {/* Add Button */}
//                     <button
//                       type="button"
//                       onClick={addAdditionalInfo}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#E39A65] border-2 border-dashed border-[#E39A65]/30 rounded-lg hover:bg-orange-50 hover:border-[#E39A65] transition-colors"
//                     >
//                       <PlusCircle className="w-4 h-4" />
//                       Add Additional Information
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Featured & Tags Section */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Star className="w-5 h-5 text-[#E39A65]" />
//                     Product Promotion
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Update featured status and tags to highlight your product
//                   </p>
//                 </div>
                
//                 <div className="p-5">
//                   {/* Featured Checkbox */}
//                   <div className="mb-4">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={formData.isFeatured}
//                         onChange={(e) => {
//                           setFormData({ ...formData, isFeatured: e.target.checked });
//                           setShowTags(e.target.checked);
//                         }}
//                         className="w-5 h-5 text-[#E39A65] border-gray-300 rounded focus:ring-[#E39A65]"
//                       />
//                       <div>
//                         <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
//                         <p className="text-xs text-gray-500">Featured products will appear in special sections</p>
//                       </div>
//                     </label>
//                   </div>

//                   {/* Tags Section */}
//                  {/* Tags Section */}
// <div className="mt-4">
//   <div 
//     className="flex items-center justify-between cursor-pointer py-2"
//     onClick={() => setShowTags(!showTags)}
//   >
//     <div className="flex items-center gap-2">
//       <Tag className="w-4 h-4 text-[#E39A65]" />
//       <h3 className="text-sm font-medium text-gray-700">Product Tags/Labels</h3>
//     </div>
//     <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showTags ? 'rotate-180' : ''}`} />
//   </div>

//   {showTags && (
//     <div className="mt-3">
//       <p className="text-xs text-gray-500 mb-2">Select one tag (optional)</p>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         {AVAILABLE_TAGS.map(tag => (
//           <label key={tag} className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio" // Changed from checkbox to radio
//               name="productTag" // Add name to group radio buttons
//               checked={formData.tags.includes(tag)}
//               onChange={() => handleTagToggle(tag)}
//               className="w-4 h-4 text-[#E39A65] border-gray-300 focus:ring-[#E39A65]"
//             />
//             <span className="text-sm text-gray-600">{tag}</span>
//           </label>
//         ))}
//       </div>
      
//       {/* Selected Tags Display - Now shows only one tag */}
//       {formData.tags.length > 0 && (
//         <div className="mt-4 flex flex-wrap gap-2">
//           {formData.tags.map(tag => (
//             <span
//               key={tag}
//               className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
//             >
//               {tag}
//               <button
//                 type="button"
//                 onClick={() => handleTagToggle(tag)}
//                 className="ml-1.5 text-orange-600 hover:text-orange-800"
//               >
//                 <X className="w-3 h-3" />
//               </button>
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   )}
// </div>
//                 </div>
//               </div>
//             </div>

//             {/* Meta Settings (SEO) Section */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <div 
//                     className="flex items-center justify-between cursor-pointer"
//                     onClick={() => setShowMeta(!showMeta)}
//                   >
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Search className="w-5 h-5 text-[#E39A65]" />
//                       Meta Settings (SEO)
//                     </h2>
//                     <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Update SEO settings to optimize your product for search engines
//                   </p>
//                 </div>
                
//                 {showMeta && (
//                   <div className="p-5">
//                     <div className="space-y-4">
//                       {/* Meta Title */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Meta Title
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.metaSettings.metaTitle || ''}
//                           onChange={(e) => handleMetaChange('metaTitle', e.target.value)}
//                           maxLength="70"
//                           placeholder="Enter meta title (max 70 characters)"
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                             errors.metaTitle ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                         />
//                         <div className="flex justify-between mt-1">
//                           <p className="text-xs text-gray-500">Appears in search engine results</p>
//                           <span className={`text-xs ${(formData.metaSettings.metaTitle?.length || 0) > 60 ? 'text-orange-600' : 'text-gray-500'}`}>
//                             {formData.metaSettings.metaTitle?.length || 0}/70
//                           </span>
//                         </div>
//                         {errors.metaTitle && (
//                           <p className="text-xs text-red-600 mt-1">{errors.metaTitle}</p>
//                         )}
//                       </div>

//                       {/* Meta Description */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Meta Description
//                         </label>
//                         <textarea
//                           value={formData.metaSettings.metaDescription || ''}
//                           onChange={(e) => handleMetaChange('metaDescription', e.target.value)}
//                           maxLength="160"
//                           placeholder="Enter meta description (max 160 characters)"
//                           rows="3"
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition resize-none ${
//                             errors.metaDescription ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                         />
//                         <div className="flex justify-between mt-1">
//                           <p className="text-xs text-gray-500">Brief description for search results</p>
//                           <span className={`text-xs ${(formData.metaSettings.metaDescription?.length || 0) > 150 ? 'text-orange-600' : 'text-gray-500'}`}>
//                             {formData.metaSettings.metaDescription?.length || 0}/160
//                           </span>
//                         </div>
//                         {errors.metaDescription && (
//                           <p className="text-xs text-red-600 mt-1">{errors.metaDescription}</p>
//                         )}
//                       </div>

//                       {/* Meta Keywords */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Meta Keywords
//                         </label>
                        
//                         {/* Display existing keywords as chips */}
//                         {formData.metaSettings.metaKeywords?.length > 0 && (
//                           <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                             {formData.metaSettings.metaKeywords.map((keyword, index) => (
//                               <span
//                                 key={index}
//                                 className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
//                               >
//                                 {keyword}
//                                 <button
//                                   type="button"
//                                   onClick={() => removeKeyword(index)}
//                                   className="ml-1.5 text-blue-600 hover:text-blue-800 focus:outline-none"
//                                 >
//                                   <X className="w-3 h-3" />
//                                 </button>
//                               </span>
//                             ))}
//                           </div>
//                         )}
                        
//                         {/* Input for new keywords */}
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={keywordInput}
//                             onChange={(e) => setKeywordInput(e.target.value)}
//                             onKeyDown={handleKeywordKeyDown}
//                             onBlur={handleKeywordBlur}
//                             placeholder="Type a keyword and press Enter or comma to add"
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition pr-20"
//                           />
//                           {keywordInput.trim() && (
//                             <button
//                               type="button"
//                               onClick={addKeyword}
//                               className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#E39A65] text-white text-xs font-medium rounded hover:bg-[#d48b54] transition-colors"
//                             >
//                               Add
//                             </button>
//                           )}
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">
//                           Type a keyword and press Enter or comma to add. Keywords appear as chips above.
//                         </p>
//                       </div>

//                       {/* SEO Preview */}
//                       {(formData.metaSettings.metaTitle || formData.metaSettings.metaDescription) && (
//                         <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                           <h4 className="text-xs font-medium text-gray-700 mb-2">Search Engine Preview:</h4>
//                           <div className="space-y-1">
//                             <div className="text-blue-600 text-sm font-medium truncate">
//                               {formData.metaSettings.metaTitle || formData.productName || 'Product Title'}
//                             </div>
//                             <div className="text-green-600 text-xs">
//                               {typeof window !== 'undefined' ? window.location.origin : ''}/product/{formData.productName?.toLowerCase().replace(/\s+/g, '-') || 'product-slug'}
//                             </div>
//                             <div className="text-gray-600 text-xs line-clamp-2">
//                               {formData.metaSettings.metaDescription || formData.description?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Product description will appear here...'}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Bulk Pricing */}
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
//                          onWheel={(e) => e.target.blur()}
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
//                                onWheel={(e) => e.target.blur()}
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

//             {/* Info Message - Moderator Permissions */}
//             <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//               <div className="flex items-start gap-2">
//                 <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm text-blue-800 font-medium">Moderator Access</p>
//                   <p className="text-xs text-blue-600">
//                     You can update all product information including instructions, featured status, tags, and SEO settings. 
//                     All changes will be reflected immediately in the catalog.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-6 flex justify-end gap-3">
//               <NextLink
//                 href="/moderator/all-products"
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
  Shield,
  Info,
  Hash,
  Type,
  Star,
  Search,
  Tag
} from 'lucide-react';
import NextLink from 'next/link';
import { toast } from 'sonner';
import { SketchPicker } from 'react-color';
import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
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

// Available tags
const AVAILABLE_TAGS = [
  'Top Ranking',
  'New Arrival',
  'Top Deal',
  'Best Seller',
  'Summer Collection',
  'Winter Collection',
  'Limited Edition',
  'Trending'
];

// Cloudinary upload function
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'b2b-products');
  formData.append('folder', 'b2b-products');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export default function ModeratorEditProduct() {
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
  const [userRole, setUserRole] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  const [showTags, setShowTags] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  
  const colorPickerRef = useRef(null);
  
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    instruction: '',
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
    additionalInfo: [],
    isFeatured: false,
    tags: [],
    metaSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const fileInputRefs = useRef({});
  const [errors, setErrors] = useState({});

  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const maxFileSize = 5 * 1024 * 1024;

  useEffect(() => {
    setIsMounted(true);
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user.role || '');
    
    if (user.role !== 'moderator' && user.role !== 'admin') {
      toast.error('Unauthorized access');
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (!productId) {
      toast.error('No product ID provided');
      router.push('/moderator/all-products');
    }
  }, [productId, router]);

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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
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

  const instructionEditor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: formData.instruction,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, instruction: editor.getHTML() }));
    },
    immediatelyRender: false,
    editable: true,
  });

  useEffect(() => {
    if (productId) {
      fetchCategories();
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (formData.category) {
      fetchCategoryDetails(formData.category);
    } else {
      setSelectedCategoryDetails(null);
    }
  }, [formData.category]);

  useEffect(() => {
    if (editor && formData.description !== editor.getHTML()) {
      editor.commands.setContent(formData.description);
    }
  }, [formData.description, editor]);

  useEffect(() => {
    if (instructionEditor && formData.instruction !== instructionEditor.getHTML()) {
      instructionEditor.commands.setContent(formData.instruction);
    }
  }, [formData.instruction, instructionEditor]);

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
      toast.error('Failed to fetch categories');
    }
  };

  const fetchCategoryDetails = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
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
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        const product = data.data;
        setOriginalProduct(product);
        
        setFormData({
          productName: product.productName || '',
          description: product.description || '',
          instruction: product.instruction || '',
          category: product.category?._id || product.category || '',
          targetedCustomer: product.targetedCustomer || 'unisex',
          fabric: product.fabric || '',
          moq: product.moq || 100,
          pricePerUnit: product.pricePerUnit || 0,
          quantityBasedPricing: product.quantityBasedPricing || [{ range: '100-299', price: 0 }],
          sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
          colors: product.colors || [{ code: '#FF0000' }],
          additionalInfo: product.additionalInfo || [],
          isFeatured: product.isFeatured || false,
          tags: product.tags || [],
          metaSettings: product.metaSettings || {
            metaTitle: '',
            metaDescription: '',
            metaKeywords: []
          }
        });

        setExistingImages(product.images || []);
      } else {
        toast.error('Failed to fetch product details');
        router.push('/moderator/all-products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product details');
      router.push('/moderator/all-products');
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleNewImageChange = async (e, slotId) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    const imageId = Date.now() + Math.random();
    const previewUrl = URL.createObjectURL(file);
    
    const newImageObj = {
      id: imageId,
      slotId: slotId,
      file,
      preview: previewUrl,
      uploading: true,
      url: null,
      publicId: null
    };
    
    setNewImages(prev => [...prev, newImageObj]);

    try {
      const { url, publicId } = await uploadToCloudinary(file);
      
      setNewImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, url, publicId, uploading: false }
          : img
      ));
      toast.success(`Image uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      setNewImages(prev => prev.filter(img => img.id !== imageId));
      toast.error('Failed to upload image');
    }
  };

  // Handle multiple image selection
const handleMultipleImageSelect = async (e) => {
  const files = Array.from(e.target.files);
  
  if (files.length === 0) return;
  
  // Check total images limit (6 max)
  const currentImagesCount = existingImages.length + newImages.filter(img => img.url || img.uploading).length;
  const availableSlots = 6 - currentImagesCount;
  
  if (files.length > availableSlots) {
    toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
    return;
  }
  
  // Create temporary array to store all new images
  const tempNewImages = [...newImages];
  
  // First, add all previews immediately
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(`Image ${i + 1}: ${validation.message}`);
      continue;
    }
    
    const imageId = Date.now() + Math.random() + i;
    const previewUrl = URL.createObjectURL(file);
    
    // Add to temp array
    tempNewImages.push({
      id: imageId,
      slotId: `multi-${imageId}`,
      file: file,
      preview: previewUrl,
      uploading: true,
      url: null,
      publicId: null
    });
  }
  
  // Update state with all previews at once
  setNewImages([...tempNewImages]);
  
  // Now upload each image one by one
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    const validation = validateImageFile(file);
    if (!validation.valid) {
      continue;
    }
    
    try {
      const { url, publicId } = await uploadToCloudinary(file);
      
      // Update the specific image with URL while preserving others
      setNewImages(prev => {
        // Find the image that's currently uploading (the one without a URL)
        const uploadingIndex = prev.findIndex(img => img.file === file && !img.url);
        if (uploadingIndex !== -1) {
          const updated = [...prev];
          updated[uploadingIndex] = {
            ...updated[uploadingIndex],
            url: url,
            publicId: publicId,
            uploading: false
          };
          return updated;
        }
        return prev;
      });
      
      toast.success(`Image ${i + 1} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      setNewImages(prev => prev.filter(img => img.file !== file));
      toast.error(`Failed to upload image ${i + 1}`);
    }
  }
  
  // Clear the input
  if (fileInputRefs.current['multiple']) {
    fileInputRefs.current['multiple'].value = '';
  }
};

 const removeNewImage = (imageId) => {
  // Find and revoke the object URL to free memory
  const imageToRemove = newImages.find(img => img.id === imageId);
  if (imageToRemove && imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
    URL.revokeObjectURL(imageToRemove.preview);
  }
  setNewImages(prev => prev.filter(img => img.id !== imageId));
};

  const removeExistingImage = (imageId, imageUrl) => {
    console.log('Removing image:', { imageId, imageUrl });
    setImagesToDelete(prev => [...prev, imageId]);
    setExistingImages(prev => prev.filter(img => img.publicId !== imageId));
    toast.info('Image marked for deletion');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

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

  const addPricingRow = () => {
    setFormData(prev => ({
      ...prev,
      quantityBasedPricing: [
        ...prev.quantityBasedPricing,
        { range: '', price: '' }
      ]
    }));
  };

  const removePricingRow = (index) => {
    if (formData.quantityBasedPricing.length > 1) {
      const updatedPricing = formData.quantityBasedPricing.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
    }
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index] = value;
    setFormData(prev => ({ ...prev, sizes: updatedSizes }));
  };

  const addSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, '']
    }));
  };

  const removeSize = (index) => {
    if (formData.sizes.length > 1) {
      const updatedSizes = formData.sizes.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, sizes: updatedSizes }));
    }
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setFormData(prev => ({ ...prev, colors: updatedColors }));
  };

  const openColorPicker = (index, event) => {
    event.stopPropagation();
    setCurrentColorIndex(index);
    setShowColorPicker(true);
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { code: '#000000' }]
    }));
  };

  const removeColor = (index) => {
    if (formData.colors.length > 1) {
      const updatedColors = formData.colors.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, colors: updatedColors }));
    }
  };

  const handleAdditionalInfoChange = (index, field, value) => {
    const updatedInfo = [...formData.additionalInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    
    if (errors[`additionalInfo_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`additionalInfo_${index}_${field}`]: null }));
    }
  };

  const addAdditionalInfo = () => {
    setFormData(prev => ({
      ...prev,
      additionalInfo: [
        ...prev.additionalInfo,
        { fieldName: '', fieldValue: '' }
      ]
    }));
  };

  const removeAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? [] : [tag]
    }));
  };

  const handleMetaChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      metaSettings: {
        ...prev.metaSettings,
        [field]: value
      }
    }));
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    
    const keywordsToAdd = keywordInput
      .split(',')
      .map(k => k.trim())
      .filter(k => k !== '');
    
    setFormData(prev => ({
      ...prev,
      metaSettings: {
        ...prev.metaSettings,
        metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd]
      }
    }));
    setKeywordInput('');
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleKeywordBlur = () => {
    if (keywordInput.trim()) {
      addKeyword();
    }
  };

  const removeKeyword = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      metaSettings: {
        ...prev.metaSettings,
        metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove)
      }
    }));
  };

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

    const hasImages = existingImages.length > 0 || newImages.length > 0;
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

    if (formData.metaSettings.metaTitle && formData.metaSettings.metaTitle.length > 70) {
      newErrors.metaTitle = 'Meta title should not exceed 70 characters';
    }

    if (formData.metaSettings.metaDescription && formData.metaSettings.metaDescription.length > 160) {
      newErrors.metaDescription = 'Meta description should not exceed 160 characters';
    }

    setErrors(newErrors);
    const isAdditionalInfoValid = validateAdditionalInfo();
    
    return Object.keys(newErrors).length === 0 && isAdditionalInfoValid;
  };

  const hasChanges = () => {
    if (!originalProduct) return false;

    if (formData.productName !== originalProduct.productName) return true;
    if (formData.description !== originalProduct.description) return true;
    if (formData.instruction !== originalProduct.instruction) return true;
    if (formData.category !== (originalProduct.category?._id || originalProduct.category)) return true;
    if (formData.targetedCustomer !== originalProduct.targetedCustomer) return true;
    if (formData.fabric !== originalProduct.fabric) return true;
    if (formData.moq !== originalProduct.moq) return true;
    if (formData.pricePerUnit !== originalProduct.pricePerUnit) return true;
    if (JSON.stringify(formData.quantityBasedPricing) !== JSON.stringify(originalProduct.quantityBasedPricing)) return true;
    if (JSON.stringify(formData.sizes) !== JSON.stringify(originalProduct.sizes)) return true;
    if (JSON.stringify(formData.colors) !== JSON.stringify(originalProduct.colors)) return true;
    if (JSON.stringify(formData.additionalInfo) !== JSON.stringify(originalProduct.additionalInfo || [])) return true;
    if (formData.isFeatured !== originalProduct.isFeatured) return true;
    if (JSON.stringify(formData.tags) !== JSON.stringify(originalProduct.tags || [])) return true;
    if (JSON.stringify(formData.metaSettings) !== JSON.stringify(originalProduct.metaSettings || {})) return true;
    if (imagesToDelete.length > 0) return true;
    if (newImages.some(img => img !== null && img.url)) return true;

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      toast.info('No changes to save');
      router.push('/moderator/all-products');
      return;
    }

    const uploading = newImages.some(img => img.uploading === true);
    if (uploading) {
      toast.error('Please wait for all images to finish uploading');
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
      
      const existingImageUrls = existingImages.map(img => img.url);
      const newImageUrls = newImages
        .filter(img => img.url)
        .map(img => img.url);
      const allImageUrls = [...existingImageUrls, ...newImageUrls];
      
      const processedPricing = formData.quantityBasedPricing.map(tier => ({
        ...tier,
        price: tier.price === '' ? 0 : parseFloat(tier.price)
      }));

      const processedAdditionalInfo = formData.additionalInfo.filter(
        info => info.fieldName.trim() !== '' && info.fieldValue.trim() !== ''
      );

      const payload = {
        productName: formData.productName,
        description: formData.description,
        instruction: formData.instruction || '',
        category: formData.category,
        targetedCustomer: formData.targetedCustomer,
        fabric: formData.fabric,
        moq: formData.moq,
        pricePerUnit: formData.pricePerUnit,
        quantityBasedPricing: processedPricing,
        sizes: formData.sizes.filter(s => s.trim() !== ''),
        colors: formData.colors,
        additionalInfo: processedAdditionalInfo,
        images: allImageUrls,
        isFeatured: formData.isFeatured,
        tags: formData.tags,
        metaSettings: formData.metaSettings,
        imagesToDelete: imagesToDelete
      };

      console.log('Submitting payload:', payload);

      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product updated successfully!');
        router.push('/moderator/all-products');
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
                <NextLink href="/moderator/all-products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </NextLink>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Moderator
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

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      {isMounted && editor && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignRight />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                              </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                    </div>

                    {/* Instruction Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instructions / Care Instructions
                      </label>
                      {isMounted && instructionEditor && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <RichTextEditor editor={instructionEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignRight />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                              </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Update care instructions, washing guidelines, or any special notes for customers
                      </p>
                    </div>

                    {/* Category, Targeted Customer, Fabric */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        {selectedCategoryDetails && (
                          <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-200">
                            <p className="text-xs text-gray-600">
                              <span className="font-medium">Selected:</span> {selectedCategoryDetails.name}
                            </p>
                          </div>
                        )}
                      </div>

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

                    {/* Quick Stats for Selected Customer */}
                    {formData.targetedCustomer && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getSelectedCustomerIcon()}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {TARGETED_CUSTOMERS.find(c => c.value === formData.targetedCustomer)?.label} Collection
                            </p>
                            <p className="text-xs text-gray-600">
                              This product will be shown in the {formData.targetedCustomer} section
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
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
                      Existing: {existingImages.length} • New: {newImages.length} • Total: {existingImages.length + newImages.length} • Max 6 images total
                    </p>
                  </div>
                  
                 <div className="p-5">
  {errors.images && (
    <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" />
      {errors.images}
    </p>
  )}
  
  {/* Multiple Image Upload Button */}
  <div className="mb-4">
    <input
      type="file"
      id="multiple-images"
      className="hidden"
      accept="image/jpeg,image/jpg,image/png,image/webp"
      multiple
      onChange={handleMultipleImageSelect}
      ref={el => {
        if (el) fileInputRefs.current['multiple'] = el;
      }}
    />
    <button
      type="button"
      onClick={() => fileInputRefs.current['multiple']?.click()}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg border-2 border-dashed border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-colors"
    >
      <Upload className="w-5 h-5" />
      <span>Select Multiple Images (Up to 6)</span>
    </button>
    <p className="text-xs text-gray-500 mt-2 text-center">
      You can select multiple images at once. Images will be uploaded automatically.
    </p>
  </div>

  {/* Existing Images */}
  {existingImages.length > 0 && (
    <div className="mb-4">
      <h3 className="text-xs font-medium text-gray-500 mb-2">Current Images</h3>
      <div className="grid grid-cols-2 gap-3">
        {existingImages.map((image) => (
          <div key={image.publicId} className="relative rounded-lg overflow-hidden border border-gray-200 h-24">
            <img 
              src={image.url} 
              alt="Product" 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeExistingImage(image.publicId, image.url)}
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

  {/* New Images - Dynamic display */}
  {newImages.length > 0 && (
    <div className="mb-4">
      <h3 className="text-xs font-medium text-gray-500 mb-2">New Images to Add</h3>
      <div className="grid grid-cols-2 gap-3">
        {newImages.map((img) => (
          <div key={img.id} className="relative rounded-lg overflow-hidden border border-gray-200 h-24">
            <img 
              src={img.preview} 
              alt="New upload" 
              className="w-full h-full object-cover"
            />
            {img.uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
            )}
            <button
              type="button"
              onClick={() => removeNewImage(img.id)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              disabled={img.uploading}
            >
              <X className="w-3 h-3" />
            </button>
            {!img.uploading && img.url && (
              <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-green-500 text-white text-xs rounded">
                Ready
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
  
  {/* Separate Upload Slots - Updated to show up to 6 slots */}
  <div className="mt-4">
    <h3 className="text-xs font-medium text-gray-500 mb-2">Add More Images</h3>
    <div 
      key={`slots-${existingImages.length}-${newImages.length}`}
      className="grid grid-cols-2 gap-3"
    >
      {Array.from({ length: Math.max(0, 6 - (existingImages.length + newImages.length)) }).map((_, idx) => {
        const slotId = `slot-${Date.now()}-${idx}-${Math.random()}`;
        return (
          <div key={slotId} className="relative">
            <input
              type="file"
              id={`image-upload-${slotId}`}
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => handleNewImageChange(e, slotId)}
              ref={el => {
                if (el) fileInputRefs.current[slotId] = el;
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRefs.current[slotId]?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-center transition-colors cursor-pointer h-24 flex flex-col items-center justify-center hover:border-[#E39A65] hover:bg-orange-50"
            >
              <Upload className="w-5 h-5 text-gray-400 mb-1" />
              <p className="text-xs text-gray-600">Upload Image</p>
              <p className="text-xs text-gray-400">Slot {idx + 1}</p>
            </button>
          </div>
        );
      })}
    </div>
  </div>
  
  {/* Upload Progress Summary */}
  {newImages.some(img => img.uploading) && (
    <div className="mt-4 p-2 bg-blue-50 rounded-lg">
      <p className="text-xs text-blue-600">
        Uploading: {newImages.filter(img => img.uploading).length} image(s) remaining...
      </p>
    </div>
  )}
  
  {/* Image Count Info */}
  <div className="mt-4 text-xs text-gray-500 text-center">
    {existingImages.length + newImages.filter(img => img.url).length} of 6 images total
  </div>
</div>
                </div>
              </div>
            </div>

            {/* Sizes and Colors */}
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
                          {formData.colors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeColor(index)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        {showColorPicker && currentColorIndex === index && (
                          <div ref={colorPickerRef} className="absolute right-0 mt-2 z-50">
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

            {/* Additional Information */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#E39A65]" />
                    Additional Information
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Add or edit custom fields for extra product details
                  </p>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {formData.additionalInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              <Type className="w-3 h-3 inline mr-1" />
                              Field Name
                            </label>
                            <input
                              type="text"
                              value={info.fieldName}
                              onChange={(e) => handleAdditionalInfoChange(index, 'fieldName', e.target.value)}
                              placeholder="e.g., Material Care"
                              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              <Hash className="w-3 h-3 inline mr-1" />
                              Field Value
                            </label>
                            <input
                              type="text"
                              value={info.fieldValue}
                              onChange={(e) => handleAdditionalInfoChange(index, 'fieldValue', e.target.value)}
                              placeholder="e.g., Machine Wash"
                              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAdditionalInfo(index)}
                          className="mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAdditionalInfo}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#E39A65] border-2 border-dashed border-[#E39A65]/30 rounded-lg hover:bg-orange-50"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Additional Information
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Promotion */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#E39A65]" />
                    Product Promotion
                  </h2>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => {
                          setFormData({ ...formData, isFeatured: e.target.checked });
                          setShowTags(e.target.checked);
                        }}
                        className="w-5 h-5 text-[#E39A65] border-gray-300 rounded"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
                        <p className="text-xs text-gray-500">Featured products will appear in special sections</p>
                      </div>
                    </label>
                  </div>

                  <div className="mt-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer py-2"
                      onClick={() => setShowTags(!showTags)}
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#E39A65]" />
                        <h3 className="text-sm font-medium text-gray-700">Product Tags/Labels</h3>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showTags ? 'rotate-180' : ''}`} />
                    </div>
                    {showTags && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Select one tag (optional)</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {AVAILABLE_TAGS.map(tag => (
                            <label key={tag} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="productTag"
                                checked={formData.tags.includes(tag)}
                                onChange={() => handleTagToggle(tag)}
                                className="w-4 h-4 text-[#E39A65] border-gray-300"
                              />
                              <span className="text-sm text-gray-600">{tag}</span>
                            </label>
                          ))}
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {formData.tags.map(tag => (
                              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleTagToggle(tag)}
                                  className="ml-1.5 text-orange-600 hover:text-orange-800"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Settings (SEO) */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setShowMeta(!showMeta)}
                  >
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Search className="w-5 h-5 text-[#E39A65]" />
                      Meta Settings (SEO)
                    </h2>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                {showMeta && (
                  <div className="p-5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                        <input
                          type="text"
                          value={formData.metaSettings.metaTitle}
                          onChange={(e) => handleMetaChange('metaTitle', e.target.value)}
                          maxLength="70"
                          placeholder="Enter meta title (max 70 characters)"
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                        />
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">Appears in search engine results</p>
                          <span className="text-xs text-gray-500">{formData.metaSettings.metaTitle?.length || 0}/70</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                        <textarea
                          value={formData.metaSettings.metaDescription}
                          onChange={(e) => handleMetaChange('metaDescription', e.target.value)}
                          maxLength="160"
                          placeholder="Enter meta description (max 160 characters)"
                          rows="3"
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition resize-none"
                        />
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">Brief description for search results</p>
                          <span className="text-xs text-gray-500">{formData.metaSettings.metaDescription?.length || 0}/160</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                        {formData.metaSettings.metaKeywords?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            {formData.metaSettings.metaKeywords.map((keyword, index) => (
                              <span key={index} className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                {keyword}
                                <button type="button" onClick={() => removeKeyword(index)} className="ml-1.5 text-blue-600 hover:text-blue-800">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="relative">
                          <input
                            type="text"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            onKeyDown={handleKeywordKeyDown}
                            onBlur={handleKeywordBlur}
                            placeholder="Type a keyword and press Enter or comma to add"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition pr-20"
                          />
                          {keywordInput.trim() && (
                            <button
                              type="button"
                              onClick={addKeyword}
                              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#E39A65] text-white text-xs font-medium rounded hover:bg-[#d48b54] transition-colors"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bulk Pricing */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#E39A65]" />
                    Bulk Pricing
                  </h2>
                </div>
                <div className="p-5 space-y-4">
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
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                      />
                      {errors.moq && <p className="text-xs text-red-600 mt-1">{errors.moq}</p>}
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
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                      />
                      {errors.pricePerUnit && <p className="text-xs text-red-600 mt-1">{errors.pricePerUnit}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-700">Quantity Based Pricing:</label>
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
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Quantity Range</label>
                            <input
                              type="text"
                              value={tier.range}
                              onChange={(e) => handlePricingChange(index, 'range', e.target.value)}
                              placeholder="e.g., 100-299"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                            />
                          </div>
                          <div className="w-1/2">
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Price ($)</label>
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
                href="/moderator/all-products"
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
