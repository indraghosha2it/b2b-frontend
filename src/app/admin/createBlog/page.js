// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
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
//   Tag,
//   User,
//   FileText,
//   Calendar,
//   BookOpen,
//   Type,
//   Globe,
//   ImagePlus
// } from 'lucide-react';
// import NextLink from 'next/link';
// import { toast } from 'sonner';
// import { MantineProvider } from '@mantine/core';
// import { RichTextEditor } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import TextAlign from '@tiptap/extension-text-align';
// import TipTapLink from '@tiptap/extension-link';
// import '@mantine/tiptap/styles.css';
// import '@mantine/core/styles.css';

// // Blog categories
// const BLOG_CATEGORIES = [
//   { value: 'fashion-trends', label: 'Fashion Trends', icon: '👗' },
//   { value: 'wholesale-guide', label: 'Wholesale Guide', icon: '📦' },
//   { value: 'industry-news', label: 'Industry News', icon: '📰' },
//   { value: 'style-tips', label: 'Style Tips', icon: '✨' },
//   { value: 'business-tips', label: 'Business Tips', icon: '💼' },
//   { value: 'fabric-and-quality', label: 'Fabric and Quality', icon: '🧵' },
//   { value: 'customer-stories', label: 'Customer Stories', icon: '👥' },
//   { value: 'case-studies', label: 'Case Studies', icon: '📊' },
//   { value: 'product-guide', label: 'Product Guide', icon: '📖' },
//   { value: 'others', label: 'Others', icon: '📌' }
// ];

// // ========== PARAGRAPH SECTION COMPONENT ==========
// // Updated to remove Section Image (Optional)
// const ParagraphSection = ({ index, paragraph, onUpdate, onRemove, errors, isMounted }) => {
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
//     content: paragraph.description || '',
//     onUpdate: ({ editor }) => {
//       onUpdate(index, 'description', editor.getHTML());
//     },
//     immediatelyRender: false,
//     editable: true,
//   });

//   return (
//     <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-sm font-medium text-gray-700">Section {index + 1}</h3>
//         <button
//           type="button"
//           onClick={() => onRemove(index)}
//           className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//         >
//           <Trash2 className="w-4 h-4" />
//         </button>
//       </div>

//       <div className="space-y-4">
//         {/* Header */}
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1.5">
//             Section Header <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={paragraph.header || ''}
//             onChange={(e) => onUpdate(index, 'header', e.target.value)}
//             placeholder="e.g., Why Choose Bulk Ordering?"
//             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//               errors[`paragraph_${index}_header`] ? 'border-red-500' : 'border-gray-300'
//             }`}
//           />
//           {errors[`paragraph_${index}_header`] && (
//             <p className="text-xs text-red-600 mt-1">{errors[`paragraph_${index}_header`]}</p>
//           )}
//         </div>

//         {/* Rich Text Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1.5">
//             Section Description <span className="text-red-500">*</span>
//           </label>
//           {isMounted && editor && (
//             <RichTextEditor editor={editor}>
//               <RichTextEditor.Toolbar>
//                 <RichTextEditor.ControlsGroup>
//                   <RichTextEditor.Bold />
//                   <RichTextEditor.Italic />
//                   <RichTextEditor.Underline />
//                   <RichTextEditor.Strikethrough />
//                 </RichTextEditor.ControlsGroup>
//                 <RichTextEditor.ControlsGroup>
//                   <RichTextEditor.H2 />
//                   <RichTextEditor.H3 />
//                   <RichTextEditor.H4 />
//                 </RichTextEditor.ControlsGroup>
//                 <RichTextEditor.ControlsGroup>
//                   <RichTextEditor.BulletList />
//                   <RichTextEditor.OrderedList />
//                 </RichTextEditor.ControlsGroup>
//                 <RichTextEditor.ControlsGroup>
//                   <RichTextEditor.AlignLeft />
//                   <RichTextEditor.AlignCenter />
//                   <RichTextEditor.AlignRight />
//                 </RichTextEditor.ControlsGroup>
//                 <RichTextEditor.ControlsGroup>
//                   <RichTextEditor.Link />
//                   <RichTextEditor.Unlink />
//                 </RichTextEditor.ControlsGroup>
//               </RichTextEditor.Toolbar>
//               <RichTextEditor.Content />
//             </RichTextEditor>
//           )}
//           {errors[`paragraph_${index}_description`] && (
//             <p className="text-xs text-red-600 mt-1">{errors[`paragraph_${index}_description`]}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ========== MAIN COMPONENT ==========
// export default function CreateBlog() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
  
//   // Refs for file inputs
//   const featuredImageRef = useRef(null);

//   // Form state
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     category: '',
//     publishDate: new Date().toISOString().split('T')[0],
//     excerpt: '',
//     content: '',
//     tags: [],
//     featured: false,
//     paragraphs: [],
//     // SEO fields
//     metaTitle: '',
//     metaDescription: '',
//     metaKeywords: ''
//   });

//   // Featured image state (required)
//   const [featuredImage, setFeaturedImage] = useState({
//     file: null,
//     preview: null,
//     error: ''
//   });

//   // Thumbnail images state (optional, multiple)
//   const [thumbnailImages, setThumbnailImages] = useState([]);

//   // Errors state
//   const [errors, setErrors] = useState({});

//   // Tag input state
//   const [tagInput, setTagInput] = useState('');

//   // Allowed file types
//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//   const maxFileSize = 5 * 1024 * 1024; // 5MB

//   // Set mounted state
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Check user role
//   useEffect(() => {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         if (user.role !== 'moderator' && user.role !== 'admin') {
//           router.push('/login');
//         }
//       } catch (error) {
//         console.error('Error parsing user:', error);
//         router.push('/login');
//       }
//     } else {
//       router.push('/login');
//     }
//   }, [router]);

//   // Add debug useEffect
//   useEffect(() => {
//     console.log('📝 All paragraphs state:', formData.paragraphs);
//   }, [formData.paragraphs]);

//   // Initialize TipTap editor for main content
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
//     content: formData.content,
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, content: editor.getHTML() }));
//       if (errors.content) {
//         setErrors(prev => ({ ...prev, content: null }));
//       }
//     },
//     immediatelyRender: false,
//     editable: true,
//   });

//   // Validate image file
//   const validateImageFile = (file) => {
//     const fileExtension = file.name.split('.').pop().toLowerCase();
//     const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    
//     if (!allowedExtensions.includes(fileExtension)) {
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

//   // ========== FEATURED IMAGE HANDLERS ==========
  
//   const handleFeaturedImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       setFeaturedImage(prev => ({ ...prev, error: validation.message }));
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFeaturedImage({
//         file,
//         preview: reader.result,
//         error: ''
//       });
//       if (errors.featuredImage) {
//         setErrors(prev => ({ ...prev, featuredImage: null }));
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeFeaturedImage = () => {
//     setFeaturedImage({ file: null, preview: null, error: '' });
//     if (featuredImageRef.current) {
//       featuredImageRef.current.value = '';
//     }
//   };

//   // ========== THUMBNAIL IMAGES HANDLERS ==========
  
//   const handleThumbnailImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (!files.length) return;

//     const validFiles = [];
//     const errors = [];

//     files.forEach(file => {
//       const validation = validateImageFile(file);
//       if (validation.valid) {
//         validFiles.push(file);
//       } else {
//         errors.push(`${file.name}: ${validation.message}`);
//       }
//     });

//     if (errors.length > 0) {
//       toast.error(errors.join('\n'));
//     }

//     if (validFiles.length > 0) {
//       Promise.all(
//         validFiles.map(file => {
//           return new Promise((resolve) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               resolve({
//                 file,
//                 preview: reader.result,
//                 id: Math.random().toString(36).substr(2, 9)
//               });
//             };
//             reader.readAsDataURL(file);
//           });
//         })
//       ).then(newImages => {
//         setThumbnailImages(prev => [...prev, ...newImages]);
//       });
//     }

//     // Clear input
//     e.target.value = '';
//   };

//   const removeThumbnailImage = (imageId) => {
//     setThumbnailImages(prev => prev.filter(img => img.id !== imageId));
//   };

//   // ========== PARAGRAPH HANDLERS ==========
  
//   const handleParagraphUpdate = (index, field, value) => {
//     console.log(`📝 Updating paragraph ${index}, field: ${field}`, value);
    
//     const updatedParagraphs = [...formData.paragraphs];
//     updatedParagraphs[index] = { ...updatedParagraphs[index], [field]: value };
    
//     setFormData(prev => ({ ...prev, paragraphs: updatedParagraphs }));
    
//     if (errors[`paragraph_${index}_${field}`]) {
//       setErrors(prev => ({ ...prev, [`paragraph_${index}_${field}`]: null }));
//     }
//   };

//   const addParagraph = () => {
//     setFormData(prev => ({
//       ...prev,
//       paragraphs: [
//         ...prev.paragraphs,
//         {
//           header: '',
//           description: '',
//           imageFile: null,
//           imagePreview: null,
//           imageError: ''
//         }
//       ]
//     }));
//   };

//   const removeParagraph = (index) => {
//     const updatedParagraphs = formData.paragraphs.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, paragraphs: updatedParagraphs }));
//   };

//   // ========== TAGS HANDLERS ==========
  
//   const handleTagKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       addTag();
//     }
//   };

//   const addTag = () => {
//     const trimmedTag = tagInput.trim().toLowerCase();
//     if (trimmedTag && !formData.tags.includes(trimmedTag)) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, trimmedTag]
//       }));
//       setTagInput('');
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   // ========== VALIDATION ==========
  
//   const validateParagraphs = () => {
//     let isValid = true;
//     const newErrors = {};

//     formData.paragraphs.forEach((paragraph, index) => {
//       if (!paragraph.header?.trim()) {
//         newErrors[`paragraph_${index}_header`] = 'Header is required';
//         isValid = false;
//       }
//       if (!paragraph.description?.trim() || paragraph.description === '<p></p>') {
//         newErrors[`paragraph_${index}_description`] = 'Description is required';
//         isValid = false;
//       }
//     });

//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return isValid;
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) newErrors.title = 'Title is required';
//     if (!formData.author.trim()) newErrors.author = 'Author name is required';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
//     if (!formData.content || formData.content === '<p></p>') newErrors.content = 'Content is required';
//     if (!featuredImage.file) newErrors.featuredImage = 'Featured image is required';

//     setErrors(newErrors);
    
//     const isParagraphsValid = validateParagraphs();
    
//     return Object.keys(newErrors).length === 0 && isParagraphsValid;
//   };

//   // ========== TOKEN HELPER ==========
//   const getAuthToken = () => {
//     // First try to get from separate token storage (your login page stores it this way)
//     let token = localStorage.getItem('token');
    
//     // If not found, try to get from user object
//     if (!token) {
//       try {
//         const userStr = localStorage.getItem('user');
//         if (userStr) {
//           const user = JSON.parse(userStr);
//           token = user.token || null;
//         }
//       } catch (error) {
//         console.error('Error parsing user:', error);
//       }
//     }
    
//     return token;
//   };

//   // ========== FORM SUBMISSION ==========
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Get token using our helper
//       const token = getAuthToken();
      
//       if (!token) {
//         toast.error('Please login again');
//         router.push('/login');
//         return;
//       }

//       console.log('🔑 Token retrieved:', token.substring(0, 30) + '...'); // Debug

//       const formDataToSend = new FormData();

//       // Append all text fields
//       formDataToSend.append('title', formData.title);
//       formDataToSend.append('author', formData.author);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('publishDate', formData.publishDate);
//       formDataToSend.append('excerpt', formData.excerpt);
//       formDataToSend.append('content', formData.content);
//       formDataToSend.append('tags', JSON.stringify(formData.tags));
//       formDataToSend.append('featured', formData.featured);
      
//       // SEO fields
//       formDataToSend.append('metaTitle', formData.metaTitle || '');
//       formDataToSend.append('metaDescription', formData.metaDescription || '');
//       formDataToSend.append('metaKeywords', formData.metaKeywords || '');

//       // Append paragraphs as JSON string
//       const processedParagraphs = formData.paragraphs
//         .filter(p => p.header?.trim() && p.description?.trim())
//         .map(p => ({
//           header: p.header,
//           description: p.description
//         }));
      
//       formDataToSend.append('paragraphs', JSON.stringify(processedParagraphs));

//       // Append featured image
//       if (featuredImage.file) {
//         formDataToSend.append('featuredImage', featuredImage.file);
//       }

//       // Append thumbnail images
//       thumbnailImages.forEach((image) => {
//         formDataToSend.append('thumbnailImages', image.file);
//       });

//       // Append paragraph images
//       formData.paragraphs.forEach((paragraph) => {
//         if (paragraph.imageFile) {
//           formDataToSend.append('paragraphImages', paragraph.imageFile);
//         }
//       });

//       // Send to API
//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/blogs', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formDataToSend
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Blog post created successfully!');
//         router.push('/admin/allBlogs');
//       } else {
//         toast.error(data.error || 'Failed to create blog post');
//       }
//     } catch (error) {
//       console.error('Error creating blog:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Get category icon
//   const getCategoryIcon = (categoryValue) => {
//     const category = BLOG_CATEGORIES.find(c => c.value === categoryValue);
//     return category?.icon || '📌';
//   };

//   return (
//     <MantineProvider>
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <NextLink href="/admin/allBlogs" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h1 className="text-2xl font-bold text-gray-900">Create Blog Post</h1>
//                     <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
//                       {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' ? 'Admin' : 'Moderator' : ''}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">Share insights, trends, and updates with your customers</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit}>
//             {/* Row 1: Basic Info - 2 Column Layout */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               {/* Left Column - Text Fields */}
//               <div className="space-y-6">
//                 {/* Blog Title */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Blog Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                     className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                       errors.title ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="e.g., Top Fashion Trends for 2026"
//                   />
//                   {errors.title && (
//                     <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {errors.title}
//                     </p>
//                   )}
//                 </div>

//                 {/* Author Name */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     <div className="flex items-center gap-1">
//                       <User className="w-4 h-4" />
//                       Author Name <span className="text-red-500">*</span>
//                     </div>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.author}
//                     onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
//                     className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                       errors.author ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="e.g., John Doe"
//                   />
//                   {errors.author && (
//                     <p className="text-xs text-red-600 mt-1">{errors.author}</p>
//                   )}
//                 </div>

//                 {/* Category and Publish Date */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
//                   <div className="grid grid-cols-2 gap-4">
//                     {/* Category */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Category <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={formData.category}
//                         onChange={(e) => {
//                           setFormData(prev => ({ ...prev, category: e.target.value }));
//                           if (errors.category) setErrors(prev => ({ ...prev, category: null }));
//                         }}
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
//                           errors.category ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                       >
//                         <option value="">Select category</option>
//                         {BLOG_CATEGORIES.map(cat => (
//                           <option key={cat.value} value={cat.value}>
//                             {cat.icon} {cat.label}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.category && (
//                         <p className="text-xs text-red-600 mt-1">{errors.category}</p>
//                       )}
//                     </div>

//                     {/* Publish Date */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           Publish Date
//                         </div>
//                       </label>
//                       <input
//                         type="date"
//                         value={formData.publishDate}
//                         onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Excerpt */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Excerpt (Short Summary) <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     value={formData.excerpt}
//                     onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
//                     rows="4"
//                     className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition resize-none ${
//                       errors.excerpt ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Brief summary of your blog post..."
//                   />
//                   {errors.excerpt && (
//                     <p className="text-xs text-red-600 mt-1">{errors.excerpt}</p>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">
//                     {formData.excerpt.length}/160 characters recommended
//                   </p>
//                 </div>
//               </div>

//               {/* Right Column - Images */}
//               <div className="space-y-6">
//                 {/* Featured Image (Required) */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <ImageIcon className="w-5 h-5 text-[#E39A65]" />
//                       Featured Image <span className="text-red-500">*</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Main blog image (JPG, PNG, WebP, max 5MB)</p>
//                   </div>
                  
//                   <div className="p-5">
//                     {errors.featuredImage && (
//                       <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.featuredImage}
//                       </p>
//                     )}
                    
//                     {!featuredImage.preview ? (
//                       <div 
//                         className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
//                           featuredImage.error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-[#E39A65] hover:bg-orange-50'
//                         }`}
//                         onClick={() => featuredImageRef.current?.click()}
//                       >
//                         <input 
//                           type="file" 
//                           ref={featuredImageRef}
//                           className="hidden" 
//                           accept=".jpg,.jpeg,.png,.webp" 
//                           onChange={handleFeaturedImageChange} 
//                         />
//                         <Upload className={`w-8 h-8 mx-auto mb-2 ${featuredImage.error ? 'text-red-400' : 'text-gray-400'}`} />
//                         <p className={`text-sm font-medium ${featuredImage.error ? 'text-red-600' : 'text-gray-600'}`}>
//                           Click to upload featured image
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">
//                           JPG, PNG, WebP up to 5MB
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="relative rounded-lg overflow-hidden border border-gray-200">
//                         <img 
//                           src={featuredImage.preview} 
//                           alt="Featured" 
//                           className="w-full h-48 object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeFeaturedImage}
//                           className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
                    
//                     {featuredImage.error && (
//                       <p className="text-xs text-red-600 mt-2">{featuredImage.error}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Thumbnail Images (Optional) */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <ImagePlus className="w-5 h-5 text-[#E39A65]" />
//                       Thumbnail Images
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Additional images for gallery (optional)</p>
//                   </div>
                  
//                   <div className="p-5">
//                     {/* Thumbnail Gallery */}
//                     {thumbnailImages.length > 0 && (
//                       <div className="grid grid-cols-3 gap-3 mb-4">
//                         {thumbnailImages.map((image) => (
//                           <div key={image.id} className="relative rounded-lg overflow-hidden border border-gray-200 aspect-square">
//                             <img 
//                               src={image.preview} 
//                               alt="Thumbnail" 
//                               className="w-full h-full object-cover"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeThumbnailImage(image.id)}
//                               className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* Upload Button */}
//                     <div 
//                       className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors cursor-pointer hover:border-[#E39A65] hover:bg-orange-50"
//                       onClick={() => document.getElementById('thumbnailImages')?.click()}
//                     >
//                       <input 
//                         type="file" 
//                         id="thumbnailImages"
//                         className="hidden" 
//                         accept=".jpg,.jpeg,.png,.webp" 
//                         multiple
//                         onChange={handleThumbnailImagesChange} 
//                       />
//                       <Upload className="w-6 h-6 mx-auto mb-1 text-gray-400" />
//                       <p className="text-xs text-gray-600">
//                         Click to upload thumbnail images
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         You can select multiple images
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mark as Featured and Tags */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
//                   {/* Featured Checkbox */}
//                   <div className="mb-4 pb-4 border-b border-gray-200">
//                     <label className="flex items-center gap-2 text-sm text-gray-700">
//                       <input
//                         type="checkbox"
//                         checked={formData.featured}
//                         onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
//                         className="w-4 h-4 text-[#E39A65] border-gray-300 rounded focus:ring-[#E39A65]"
//                       />
//                       <span>Mark as Featured Post</span>
//                     </label>
//                   </div>

//                   {/* Tags */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <div className="flex items-center gap-1">
//                         <Tag className="w-4 h-4" />
//                         Tags
//                       </div>
//                     </label>
                    
//                     <div className="flex items-center gap-2 mb-3">
//                       <input
//                         type="text"
//                         value={tagInput}
//                         onChange={(e) => setTagInput(e.target.value)}
//                         onKeyDown={handleTagKeyDown}
//                         placeholder="Enter tags (press Enter or comma to add)"
//                         className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//                       />
//                       <button
//                         type="button"
//                         onClick={addTag}
//                         className="px-4 py-2 bg-[#E39A65] text-white text-sm font-medium rounded-lg hover:bg-[#d48b54] transition-colors"
//                       >
//                         Add
//                       </button>
//                     </div>

//                     {/* Tags List */}
//                     <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-gray-50 rounded-lg border border-gray-200">
//                       {formData.tags.length > 0 ? (
//                         formData.tags.map(tag => (
//                           <span
//                             key={tag}
//                             className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
//                           >
//                             #{tag}
//                             <button
//                               type="button"
//                               onClick={() => removeTag(tag)}
//                               className="hover:text-blue-900"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                           </span>
//                         ))
//                       ) : (
//                         <p className="text-sm text-gray-400 w-full text-center py-1">
//                           No tags added yet
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <BookOpen className="w-5 h-5 text-[#E39A65]" />
//                     Main Content <span className="text-red-500">*</span>
//                   </h2>
//                 </div>
                
//                 <div className="p-5">
//                   {errors.content && (
//                     <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {errors.content}
//                     </p>
//                   )}
                  
//                   {isMounted && editor && (
//                     <RichTextEditor editor={editor}>
//                       <RichTextEditor.Toolbar sticky stickyOffset={60}>
//                         <RichTextEditor.ControlsGroup>
//                           <RichTextEditor.Bold />
//                           <RichTextEditor.Italic />
//                           <RichTextEditor.Underline />
//                           <RichTextEditor.Strikethrough />
//                           <RichTextEditor.ClearFormatting />
//                         </RichTextEditor.ControlsGroup>

//                         <RichTextEditor.ControlsGroup>
//                           <RichTextEditor.H1 />
//                           <RichTextEditor.H2 />
//                           <RichTextEditor.H3 />
//                           <RichTextEditor.H4 />
//                         </RichTextEditor.ControlsGroup>

//                         <RichTextEditor.ControlsGroup>
//                           <RichTextEditor.BulletList />
//                           <RichTextEditor.OrderedList />
//                         </RichTextEditor.ControlsGroup>

//                         <RichTextEditor.ControlsGroup>
//                           <RichTextEditor.AlignLeft />
//                           <RichTextEditor.AlignCenter />
//                           <RichTextEditor.AlignRight />
//                         </RichTextEditor.ControlsGroup>

//                         <RichTextEditor.ControlsGroup>
//                           <RichTextEditor.Link />
//                           <RichTextEditor.Unlink />
//                         </RichTextEditor.ControlsGroup>
//                       </RichTextEditor.Toolbar>

//                       <RichTextEditor.Content />
//                     </RichTextEditor>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Additional Sections */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Plus className="w-5 h-5 text-[#E39A65]" />
//                     Additional Sections
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Add more sections with header and rich text description
//                   </p>
//                 </div>
                
//                 <div className="p-5 space-y-6">
//                   {formData.paragraphs.map((paragraph, index) => (
//                     <ParagraphSection
//                       key={index}
//                       index={index}
//                       paragraph={paragraph}
//                       onUpdate={handleParagraphUpdate}
//                       onRemove={removeParagraph}
//                       errors={errors}
//                       isMounted={isMounted}
//                     />
//                   ))}

//                   {/* Add Section Button */}
//                   <button
//                     type="button"
//                     onClick={addParagraph}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#E39A65] border-2 border-dashed border-[#E39A65]/30 rounded-lg hover:bg-orange-50 hover:border-[#E39A65] transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add New Section
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* SEO Settings */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Globe className="w-5 h-5 text-[#E39A65]" />
//                     SEO Settings
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">Optimize your blog post for search engines</p>
//                 </div>
                
//                 <div className="p-5 space-y-4">
//                   {/* Meta Title */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Meta Title
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.metaTitle}
//                       onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//                       placeholder="Leave empty to use blog title"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Recommended: 50-60 characters
//                     </p>
//                   </div>

//                   {/* Meta Description */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Meta Description
//                     </label>
//                     <textarea
//                       value={formData.metaDescription}
//                       onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
//                       rows="3"
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition resize-none"
//                       placeholder="Brief description for search engines"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Recommended: 150-160 characters
//                     </p>
//                   </div>

//                   {/* Meta Keywords */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Meta Keywords
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.metaKeywords}
//                       onChange={(e) => setFormData(prev => ({ ...prev, metaKeywords: e.target.value }))}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
//                       placeholder="fashion, wholesale, clothing, trends (comma separated)"
//                     />
//                   </div>

//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6 flex justify-end gap-3">
//               <NextLink
//                 href="/admin/allBlogs"
//                 className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
//               >
//                 Cancel
//               </NextLink>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Creating Blog Post...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Create Blog Post</span>
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
import { useRouter } from 'next/navigation';
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
  Tag,
  User,
  FileText,
  Calendar,
  BookOpen,
  Type,
  Globe,
  ImagePlus,
  Video
} from 'lucide-react';
import NextLink from 'next/link';
import { toast } from 'sonner';
import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TipTapLink from '@tiptap/extension-link';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';

// Blog categories
const BLOG_CATEGORIES = [
  { value: 'fashion-trends', label: 'Fashion Trends', icon: '👗' },
  { value: 'wholesale-guide', label: 'Wholesale Guide', icon: '📦' },
  { value: 'industry-news', label: 'Industry News', icon: '📰' },
  { value: 'style-tips', label: 'Style Tips', icon: '✨' },
  { value: 'business-tips', label: 'Business Tips', icon: '💼' },
  { value: 'fabric-and-quality', label: 'Fabric and Quality', icon: '🧵' },
  { value: 'customer-stories', label: 'Customer Stories', icon: '👥' },
  { value: 'case-studies', label: 'Case Studies', icon: '📊' },
  { value: 'product-guide', label: 'Product Guide', icon: '📖' },
  { value: 'others', label: 'Others', icon: '📌' }
];

// ========== PARAGRAPH SECTION COMPONENT ==========
const ParagraphSection = ({ index, paragraph, onUpdate, onRemove, errors, isMounted }) => {
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
    content: paragraph.description || '',
    onUpdate: ({ editor }) => {
      onUpdate(index, 'description', editor.getHTML());
    },
    immediatelyRender: false,
    editable: true,
  });

  return (
    <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Section {index + 1}</h3>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Section Header <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={paragraph.header || ''}
            onChange={(e) => onUpdate(index, 'header', e.target.value)}
            placeholder="e.g., Why Choose Bulk Ordering?"
            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
              errors[`paragraph_${index}_header`] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors[`paragraph_${index}_header`] && (
            <p className="text-xs text-red-600 mt-1">{errors[`paragraph_${index}_header`]}</p>
          )}
        </div>

        {/* Rich Text Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Section Description <span className="text-red-500">*</span>
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
          {errors[`paragraph_${index}_description`] && (
            <p className="text-xs text-red-600 mt-1">{errors[`paragraph_${index}_description`]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========
export default function CreateBlog() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Refs for file inputs
  const featuredImageRef = useRef(null);
  const videoInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publishDate: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    tags: [],
    featured: false,
    paragraphs: [],
    // SEO fields
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  });

  // Featured image state (required)
  const [featuredImage, setFeaturedImage] = useState({
    file: null,
    preview: null,
    error: ''
  });

  // Video state (optional)
  const [videoFile, setVideoFile] = useState({
    file: null,
    preview: null,
    error: ''
  });

  // Thumbnail images state (optional, multiple)
  const [thumbnailImages, setThumbnailImages] = useState([]);

  // Errors state
  const [errors, setErrors] = useState({});

  // Tag input state
  const [tagInput, setTagInput] = useState('');

  // Allowed file types
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/x-msvideo'];
  const maxImageSize = 5 * 1024 * 1024; // 5MB
  const maxVideoSize = 50 * 1024 * 1024; // 50MB

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check user role
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role !== 'moderator' && user.role !== 'admin') {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error parsing user:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  // Add debug useEffect
  useEffect(() => {
    console.log('📝 All paragraphs state:', formData.paragraphs);
  }, [formData.paragraphs]);

  // Initialize TipTap editor for main content
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
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
      if (errors.content) {
        setErrors(prev => ({ ...prev, content: null }));
      }
    },
    immediatelyRender: false,
    editable: true,
  });

  // Validate image file
  const validateImageFile = (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    
    if (!allowedExtensions.includes(fileExtension)) {
      return {
        valid: false,
        message: `Invalid format: .${fileExtension}. Allowed: ${allowedExtensions.join(', ')}`
      };
    }

    if (file.size > maxImageSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return {
        valid: false,
        message: `File too large: ${fileSizeMB}MB. Max: 5MB`
      };
    }

    return { valid: true };
  };

// Validate video file
const validateVideoFile = (file) => {
  const fileExtension = file.name.split('.').pop().toLowerCase();
  const allowedExtensions = ['mp4', 'webm', 'mov', 'avi', 'mpeg', 'mkv'];
  
  // Check extension first (most reliable)
  if (!allowedExtensions.includes(fileExtension)) {
    return {
      valid: false,
      message: `Invalid format: .${fileExtension}. Allowed: ${allowedExtensions.join(', ')}`
    };
  }

  // Check mimetype if available (sometimes undefined in some browsers)
  if (file.type) {
    const allowedMimeTypes = [
      'video/mp4', 
      'video/webm', 
      'video/quicktime', 
      'video/x-msvideo', 
      'video/mpeg',
      'video/x-matroska'
    ];
    
    if (!allowedMimeTypes.includes(file.type)) {
      return {
        valid: false,
        message: `Invalid video type: ${file.type}. Allowed: MP4, WebM, MOV, AVI, MPEG`
      };
    }
  }

  // Check file size
  if (file.size > maxVideoSize) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      message: `Video too large: ${fileSizeMB}MB. Max: 50MB`
    };
  }

  return { valid: true };
};

  // ========== FEATURED IMAGE HANDLERS ==========
  
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setFeaturedImage(prev => ({ ...prev, error: validation.message }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFeaturedImage({
        file,
        preview: reader.result,
        error: ''
      });
      if (errors.featuredImage) {
        setErrors(prev => ({ ...prev, featuredImage: null }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removeFeaturedImage = () => {
    setFeaturedImage({ file: null, preview: null, error: '' });
    if (featuredImageRef.current) {
      featuredImageRef.current.value = '';
    }
  };

  // ========== VIDEO HANDLERS ==========

// ========== VIDEO HANDLERS ==========

const handleVideoChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Debug: Log file details
  console.log('Video file details:', {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified
  });

  const validation = validateVideoFile(file);
  if (!validation.valid) {
    setVideoFile(prev => ({ ...prev, error: validation.message }));
    toast.error(validation.message);
    return;
  }

  // Create video preview URL
  const videoUrl = URL.createObjectURL(file);
  
  setVideoFile({
    file,
    preview: videoUrl,
    error: ''
  });
  
  if (errors.video) {
    setErrors(prev => ({ ...prev, video: null }));
  }
  
  toast.success('Video uploaded successfully!');
};

  const removeVideo = () => {
    if (videoFile.preview) {
      URL.revokeObjectURL(videoFile.preview);
    }
    setVideoFile({ file: null, preview: null, error: '' });
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  // ========== THUMBNAIL IMAGES HANDLERS ==========
  
  const handleThumbnailImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.message}`);
      }
    });

    if (errors.length > 0) {
      toast.error(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      Promise.all(
        validFiles.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                file,
                preview: reader.result,
                id: Math.random().toString(36).substr(2, 9)
              });
            };
            reader.readAsDataURL(file);
          });
        })
      ).then(newImages => {
        setThumbnailImages(prev => [...prev, ...newImages]);
      });
    }

    // Clear input
    e.target.value = '';
  };

  const removeThumbnailImage = (imageId) => {
    setThumbnailImages(prev => prev.filter(img => img.id !== imageId));
  };

  // ========== PARAGRAPH HANDLERS ==========
  
  const handleParagraphUpdate = (index, field, value) => {
    console.log(`📝 Updating paragraph ${index}, field: ${field}`, value);
    
    const updatedParagraphs = [...formData.paragraphs];
    updatedParagraphs[index] = { ...updatedParagraphs[index], [field]: value };
    
    setFormData(prev => ({ ...prev, paragraphs: updatedParagraphs }));
    
    if (errors[`paragraph_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`paragraph_${index}_${field}`]: null }));
    }
  };

  const addParagraph = () => {
    setFormData(prev => ({
      ...prev,
      paragraphs: [
        ...prev.paragraphs,
        {
          header: '',
          description: '',
          imageFile: null,
          imagePreview: null,
          imageError: ''
        }
      ]
    }));
  };

  const removeParagraph = (index) => {
    const updatedParagraphs = formData.paragraphs.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, paragraphs: updatedParagraphs }));
  };

  // ========== TAGS HANDLERS ==========
  
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // ========== VALIDATION ==========
  
  const validateParagraphs = () => {
    let isValid = true;
    const newErrors = {};

    formData.paragraphs.forEach((paragraph, index) => {
      if (!paragraph.header?.trim()) {
        newErrors[`paragraph_${index}_header`] = 'Header is required';
        isValid = false;
      }
      if (!paragraph.description?.trim() || paragraph.description === '<p></p>') {
        newErrors[`paragraph_${index}_description`] = 'Description is required';
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content || formData.content === '<p></p>') newErrors.content = 'Content is required';
    if (!featuredImage.file) newErrors.featuredImage = 'Featured image is required';

    setErrors(newErrors);
    
    const isParagraphsValid = validateParagraphs();
    
    return Object.keys(newErrors).length === 0 && isParagraphsValid;
  };

  // ========== TOKEN HELPER ==========
  const getAuthToken = () => {
    // First try to get from separate token storage (your login page stores it this way)
    let token = localStorage.getItem('token');
    
    // If not found, try to get from user object
    if (!token) {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          token = user.token || null;
        }
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
    
    return token;
  };

  // ========== FORM SUBMISSION ==========
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get token using our helper
      const token = getAuthToken();
      
      if (!token) {
        toast.error('Please login again');
        router.push('/login');
        return;
      }

      console.log('🔑 Token retrieved:', token.substring(0, 30) + '...'); // Debug

      const formDataToSend = new FormData();

      // Append all text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('publishDate', formData.publishDate);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      formDataToSend.append('featured', formData.featured);
      
      // SEO fields
      formDataToSend.append('metaTitle', formData.metaTitle || '');
      formDataToSend.append('metaDescription', formData.metaDescription || '');
      formDataToSend.append('metaKeywords', formData.metaKeywords || '');

      // Append paragraphs as JSON string
      const processedParagraphs = formData.paragraphs
        .filter(p => p.header?.trim() && p.description?.trim())
        .map(p => ({
          header: p.header,
          description: p.description
        }));
      
      formDataToSend.append('paragraphs', JSON.stringify(processedParagraphs));

      // Append featured image
      if (featuredImage.file) {
        formDataToSend.append('featuredImage', featuredImage.file);
      }

      // Append video if uploaded
      if (videoFile.file) {
        formDataToSend.append('video', videoFile.file);
      }

      // Append thumbnail images
      thumbnailImages.forEach((image) => {
        formDataToSend.append('thumbnailImages', image.file);
      });

      // Append paragraph images
      formData.paragraphs.forEach((paragraph) => {
        if (paragraph.imageFile) {
          formDataToSend.append('paragraphImages', paragraph.imageFile);
        }
      });

      // Send to API
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/blogs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Blog post created successfully!');
        router.push('/admin/allBlogs');
      } else {
        toast.error(data.error || 'Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get category icon
  const getCategoryIcon = (categoryValue) => {
    const category = BLOG_CATEGORIES.find(c => c.value === categoryValue);
    return category?.icon || '📌';
  };

  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <NextLink href="/admin/allBlogs" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </NextLink>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">Create Blog Post</h1>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                      {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' ? 'Admin' : 'Moderator' : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Share insights, trends, and updates with your customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Row 1: Basic Info - 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Left Column - Text Fields */}
              <div className="space-y-6">
                {/* Blog Title */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blog Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Top Fashion Trends for 2026"
                  />
                  {errors.title && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Author Name */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Author Name <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                      errors.author ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., John Doe"
                  />
                  {errors.author && (
                    <p className="text-xs text-red-600 mt-1">{errors.author}</p>
                  )}
                </div>

                {/* Category and Publish Date */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, category: e.target.value }));
                          if (errors.category) setErrors(prev => ({ ...prev, category: null }));
                        }}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select category</option>
                        {BLOG_CATEGORIES.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-xs text-red-600 mt-1">{errors.category}</p>
                      )}
                    </div>

                    {/* Publish Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Publish Date
                        </div>
                      </label>
                      <input
                        type="date"
                        value={formData.publishDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt (Short Summary) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows="4"
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition resize-none ${
                      errors.excerpt ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Brief summary of your blog post..."
                  />
                  {errors.excerpt && (
                    <p className="text-xs text-red-600 mt-1">{errors.excerpt}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.excerpt.length}/160 characters recommended
                  </p>
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="space-y-6">
                {/* Featured Image (Required) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#E39A65]" />
                      Featured Image <span className="text-red-500">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Main blog image (JPG, PNG, WebP, max 5MB)</p>
                  </div>
                  
                  <div className="p-5">
                    {errors.featuredImage && (
                      <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.featuredImage}
                      </p>
                    )}
                    
                    {!featuredImage.preview ? (
                      <div 
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                          featuredImage.error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-[#E39A65] hover:bg-orange-50'
                        }`}
                        onClick={() => featuredImageRef.current?.click()}
                      >
                        <input 
                          type="file" 
                          ref={featuredImageRef}
                          className="hidden" 
                          accept=".jpg,.jpeg,.png,.webp" 
                          onChange={handleFeaturedImageChange} 
                        />
                        <Upload className={`w-8 h-8 mx-auto mb-2 ${featuredImage.error ? 'text-red-400' : 'text-gray-400'}`} />
                        <p className={`text-sm font-medium ${featuredImage.error ? 'text-red-600' : 'text-gray-600'}`}>
                          Click to upload featured image
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG, WebP up to 5MB
                        </p>
                      </div>
                    ) : (
                      <div className="relative rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={featuredImage.preview} 
                          alt="Featured" 
                          className="w-full h-48 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeFeaturedImage}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {featuredImage.error && (
                      <p className="text-xs text-red-600 mt-2">{featuredImage.error}</p>
                    )}
                  </div>
                </div>

                {/* Video Upload (Optional) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Video className="w-5 h-5 text-[#E39A65]" />
                      Video (Optional)
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Upload a video to accompany your blog post (MP4, WebM, MOV - max 50MB)</p>
                  </div>
                  
                  <div className="p-5">
                    {videoFile.error && (
                      <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {videoFile.error}
                      </p>
                    )}
                    
                    {!videoFile.preview ? (
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors cursor-pointer hover:border-[#E39A65] hover:bg-orange-50"
                        onClick={() => videoInputRef.current?.click()}
                      >
                      <input 
  type="file" 
  ref={videoInputRef}
  className="hidden" 
  accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/mpeg,.mp4,.webm,.mov,.avi,.mpeg" 
  onChange={handleVideoChange} 
/>
                        <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600">
                          Click to upload video
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          MP4, WebM, MOV up to 50MB
                        </p>
                      </div>
                    ) : (
                      <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-900">
                        <video 
                          src={videoFile.preview} 
                          controls
                          className="w-full h-auto max-h-64"
                        >
                          Your browser does not support the video tag.
                        </video>
                        <button
                          type="button"
                          onClick={removeVideo}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Images (Optional) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <ImagePlus className="w-5 h-5 text-[#E39A65]" />
                      Thumbnail Images
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Additional images for gallery (optional)</p>
                  </div>
                  
                  <div className="p-5">
                    {/* Thumbnail Gallery */}
                    {thumbnailImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {thumbnailImages.map((image) => (
                          <div key={image.id} className="relative rounded-lg overflow-hidden border border-gray-200 aspect-square">
                            <img 
                              src={image.preview} 
                              alt="Thumbnail" 
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeThumbnailImage(image.id)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Button */}
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors cursor-pointer hover:border-[#E39A65] hover:bg-orange-50"
                      onClick={() => document.getElementById('thumbnailImages')?.click()}
                    >
                      <input 
                        type="file" 
                        id="thumbnailImages"
                        className="hidden" 
                        accept=".jpg,.jpeg,.png,.webp" 
                        multiple
                        onChange={handleThumbnailImagesChange} 
                      />
                      <Upload className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                      <p className="text-xs text-gray-600">
                        Click to upload thumbnail images
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        You can select multiple images
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mark as Featured and Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  {/* Featured Checkbox */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4 text-[#E39A65] border-gray-300 rounded focus:ring-[#E39A65]"
                      />
                      <span>Mark as Featured Post</span>
                    </label>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        Tags
                      </div>
                    </label>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="Enter tags (press Enter or comma to add)"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-[#E39A65] text-white text-sm font-medium rounded-lg hover:bg-[#d48b54] transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-gray-50 rounded-lg border border-gray-200">
                      {formData.tags.length > 0 ? (
                        formData.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:text-blue-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400 w-full text-center py-1">
                          No tags added yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Updated to match product description field */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#E39A65]" />
                    Main Content <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Write your main blog content with rich text formatting</p>
                </div>
                
                <div className="p-5">
                  {errors.content && (
                    <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.content}
                    </p>
                  )}
                  
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
              </div>
            </div>

            {/* Additional Sections */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#E39A65]" />
                    Additional Sections
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Add more sections with header and rich text description
                  </p>
                </div>
                
                <div className="p-5 space-y-6">
                  {formData.paragraphs.map((paragraph, index) => (
                    <ParagraphSection
                      key={index}
                      index={index}
                      paragraph={paragraph}
                      onUpdate={handleParagraphUpdate}
                      onRemove={removeParagraph}
                      errors={errors}
                      isMounted={isMounted}
                    />
                  ))}

                  {/* Add Section Button */}
                  <button
                    type="button"
                    onClick={addParagraph}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#E39A65] border-2 border-dashed border-[#E39A65]/30 rounded-lg hover:bg-orange-50 hover:border-[#E39A65] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Section
                  </button>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#E39A65]" />
                    SEO Settings
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Optimize your blog post for search engines</p>
                </div>
                
                <div className="p-5 space-y-4">
                  {/* Meta Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                      placeholder="Leave empty to use blog title"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 50-60 characters
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                      rows="3"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition resize-none"
                      placeholder="Brief description for search engines"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 150-160 characters
                    </p>
                  </div>

                  {/* Meta Keywords */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={formData.metaKeywords}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaKeywords: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                      placeholder="fashion, wholesale, clothing, trends (comma separated)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end gap-3">
              <NextLink
                href="/admin/allBlogs"
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </NextLink>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Blog Post...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Create Blog Post</span>
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