


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
//   ImagePlus,
//   Video
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

// // Cloudinary upload function
// const uploadToCloudinary = async (file, folder = 'blogs') => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'b2b-products'); // Reuse existing preset
//   formData.append('folder', folder);
  
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );
    
//     const data = await response.json();
//     if (data.secure_url) {
//       return {
//         url: data.secure_url,
//         publicId: data.public_id,
//       };
//     } else {
//       throw new Error('Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// // Cloudinary video upload function
// const uploadVideoToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'b2b-products');
//   formData.append('folder', 'blogs/videos');
//   formData.append('resource_type', 'video');
  
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );
    
//     const data = await response.json();
//     if (data.secure_url) {
//       return {
//         url: data.secure_url,
//         publicId: data.public_id,
//       };
//     } else {
//       throw new Error('Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary video upload error:', error);
//     throw error;
//   }
// };

// // ========== PARAGRAPH SECTION COMPONENT ==========
// const ParagraphSection = ({ index, paragraph, onUpdate, onRemove, onImageUpload, errors, isMounted }) => {
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

//   const imageInputRef = useRef(null);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     onImageUpload(index, file);
//   };

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
//             <div className="border border-gray-300 rounded-lg overflow-hidden">
//               <RichTextEditor editor={editor}>
//                 <RichTextEditor.Toolbar>
//                   <RichTextEditor.ControlsGroup>
//                     <RichTextEditor.Bold />
//                     <RichTextEditor.Italic />
//                     <RichTextEditor.Underline />
//                     <RichTextEditor.Strikethrough />
//                   </RichTextEditor.ControlsGroup>
//                   <RichTextEditor.ControlsGroup>
//                     <RichTextEditor.H2 />
//                     <RichTextEditor.H3 />
//                     <RichTextEditor.H4 />
//                   </RichTextEditor.ControlsGroup>
//                   <RichTextEditor.ControlsGroup>
//                     <RichTextEditor.BulletList />
//                     <RichTextEditor.OrderedList />
//                   </RichTextEditor.ControlsGroup>
//                   <RichTextEditor.ControlsGroup>
//                     <RichTextEditor.AlignLeft />
//                     <RichTextEditor.AlignCenter />
//                     <RichTextEditor.AlignRight />
//                   </RichTextEditor.ControlsGroup>
//                   <RichTextEditor.ControlsGroup>
//                     <RichTextEditor.Link />
//                     <RichTextEditor.Unlink />
//                   </RichTextEditor.ControlsGroup>
//                 </RichTextEditor.Toolbar>
//                 <RichTextEditor.Content />
//               </RichTextEditor>
//             </div>
//           )}
//           {errors[`paragraph_${index}_description`] && (
//             <p className="text-xs text-red-600 mt-1">{errors[`paragraph_${index}_description`]}</p>
//           )}
//         </div>

//         {/* Section Image (Optional) */}
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1.5">
//             Section Image (Optional)
//           </label>
//           {paragraph.imagePreview ? (
//             <div className="relative rounded-lg overflow-hidden border border-gray-200">
//               <img 
//                 src={paragraph.imagePreview} 
//                 alt={`Section ${index + 1}`} 
//                 className="w-full h-32 object-cover"
//               />
//               {paragraph.uploading && (
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                   <Loader2 className="w-6 h-6 text-white animate-spin" />
//                 </div>
//               )}
//               <button
//                 type="button"
//                 onClick={() => onUpdate(index, 'imageFile', null)}
//                 className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                 disabled={paragraph.uploading}
//               >
//                 <X className="w-3 h-3" />
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <input
//                 type="file"
//                 ref={imageInputRef}
//                 className="hidden"
//                 accept="image/jpeg,image/jpg,image/png,image/webp"
//                 onChange={handleImageUpload}
//               />
//               <button
//                 type="button"
//                 onClick={() => imageInputRef.current?.click()}
//                 className="flex items-center gap-2 px-3 py-2 text-sm text-[#E39A65] border border-dashed border-[#E39A65] rounded-lg hover:bg-orange-50 transition-colors"
//                 disabled={paragraph.uploading}
//               >
//                 <ImagePlus className="w-4 h-4" />
//                 {paragraph.uploading ? 'Uploading...' : 'Add Image'}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ========== MAIN COMPONENT ==========
// export default function ModeratorCreateBlog() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
  
//   // Refs for file inputs
//   const featuredImageRef = useRef(null);
//   const videoInputRef = useRef(null);

//   // Form state
//   const [formData, setFormData] = useState({
//     title: '',
//     author: 'Asian Clothify',
//     category: '',
//     publishDate: new Date().toISOString().split('T')[0],
//     excerpt: '',
//     content: '',
//     tags: [],
//     featured: false,
//     paragraphs: [],
//     metaTitle: '',
//     metaDescription: '',
//     metaKeywords: ''
//   });

//   // Featured image state with Cloudinary URL
//   const [featuredImage, setFeaturedImage] = useState({
//     file: null,
//     preview: null,
//     url: null,
//     publicId: null,
//     uploading: false,
//     error: ''
//   });

//   // Video state with Cloudinary URL
//   const [videoFile, setVideoFile] = useState({
//     file: null,
//     preview: null,
//     url: null,
//     publicId: null,
//     uploading: false,
//     error: ''
//   });

//   // Thumbnail images state with Cloudinary URLs
//   const [thumbnailImages, setThumbnailImages] = useState([]);

//   // Errors state
//   const [errors, setErrors] = useState({});

//   // Tag input state
//   const [tagInput, setTagInput] = useState('');

//   // Allowed file types
//   const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//   const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
//   const maxImageSize = 5 * 1024 * 1024; // 5MB
//   const maxVideoSize = 50 * 1024 * 1024; // 50MB

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
//         if (user.role !== 'moderator') {
//           toast.error('Access denied. Moderator privileges required.');
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

//     if (file.size > maxImageSize) {
//       const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
//       return {
//         valid: false,
//         message: `File too large: ${fileSizeMB}MB. Max: 5MB`
//       };
//     }

//     return { valid: true };
//   };

//   // Validate video file
//   const validateVideoFile = (file) => {
//     const fileExtension = file.name.split('.').pop().toLowerCase();
//     const allowedExtensions = ['mp4', 'webm', 'mov', 'avi', 'mpeg', 'mkv'];
    
//     if (!allowedExtensions.includes(fileExtension)) {
//       return {
//         valid: false,
//         message: `Invalid format: .${fileExtension}. Allowed: ${allowedExtensions.join(', ')}`
//       };
//     }

//     if (file.size > maxVideoSize) {
//       const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
//       return {
//         valid: false,
//         message: `Video too large: ${fileSizeMB}MB. Max: 50MB`
//       };
//     }

//     return { valid: true };
//   };

//   // ========== FEATURED IMAGE HANDLERS ==========
  
//   const handleFeaturedImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       setFeaturedImage(prev => ({ ...prev, error: validation.message }));
//       return;
//     }

//     // Show preview immediately
//     const previewUrl = URL.createObjectURL(file);
//     setFeaturedImage({
//       file,
//       preview: previewUrl,
//       url: null,
//       publicId: null,
//       uploading: true,
//       error: ''
//     });

//     // Upload to Cloudinary
//     try {
//       const { url, publicId } = await uploadToCloudinary(file, 'blogs/featured');
//       setFeaturedImage({
//         file,
//         preview: previewUrl,
//         url,
//         publicId,
//         uploading: false,
//         error: ''
//       });
//       toast.success('Featured image uploaded successfully');
//     } catch (error) {
//       console.error('Upload error:', error);
//       setFeaturedImage(prev => ({
//         ...prev,
//         uploading: false,
//         error: 'Failed to upload image'
//       }));
//       toast.error('Failed to upload featured image');
//     }
//   };

//   const removeFeaturedImage = () => {
//     if (featuredImage.preview && featuredImage.preview.startsWith('blob:')) {
//       URL.revokeObjectURL(featuredImage.preview);
//     }
//     setFeaturedImage({ file: null, preview: null, url: null, publicId: null, uploading: false, error: '' });
//     if (featuredImageRef.current) {
//       featuredImageRef.current.value = '';
//     }
//   };

//   // ========== VIDEO HANDLERS ==========

//   const handleVideoChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateVideoFile(file);
//     if (!validation.valid) {
//       setVideoFile(prev => ({ ...prev, error: validation.message }));
//       toast.error(validation.message);
//       return;
//     }

//     // Show preview immediately
//     const videoUrl = URL.createObjectURL(file);
//     setVideoFile({
//       file,
//       preview: videoUrl,
//       url: null,
//       publicId: null,
//       uploading: true,
//       error: ''
//     });

//     // Upload to Cloudinary
//     try {
//       const { url, publicId } = await uploadVideoToCloudinary(file);
//       setVideoFile({
//         file,
//         preview: videoUrl,
//         url,
//         publicId,
//         uploading: false,
//         error: ''
//       });
//       toast.success('Video uploaded successfully');
//     } catch (error) {
//       console.error('Upload error:', error);
//       setVideoFile(prev => ({
//         ...prev,
//         uploading: false,
//         error: 'Failed to upload video'
//       }));
//       toast.error('Failed to upload video');
//     }
//   };

//   const removeVideo = () => {
//     if (videoFile.preview && videoFile.preview.startsWith('blob:')) {
//       URL.revokeObjectURL(videoFile.preview);
//     }
//     setVideoFile({ file: null, preview: null, url: null, publicId: null, uploading: false, error: '' });
//     if (videoInputRef.current) {
//       videoInputRef.current.value = '';
//     }
//   };

//   // ========== THUMBNAIL IMAGES HANDLERS ==========
  
//   const handleThumbnailImagesChange = async (e) => {
//     const files = Array.from(e.target.files);
//     if (!files.length) return;

//     const validFiles = [];
//     const errorsList = [];

//     files.forEach(file => {
//       const validation = validateImageFile(file);
//       if (validation.valid) {
//         validFiles.push(file);
//       } else {
//         errorsList.push(`${file.name}: ${validation.message}`);
//       }
//     });

//     if (errorsList.length > 0) {
//       toast.error(errorsList.join('\n'));
//     }

//     if (validFiles.length > 0) {
//       // Add all new images with uploading state
//       const newImagesWithPreview = validFiles.map(file => ({
//         file,
//         preview: URL.createObjectURL(file),
//         url: null,
//         publicId: null,
//         uploading: true,
//         id: Math.random().toString(36).substr(2, 9)
//       }));
      
//       setThumbnailImages(prev => [...prev, ...newImagesWithPreview]);

//       // Upload each image to Cloudinary
//       for (const img of newImagesWithPreview) {
//         try {
//           const { url, publicId } = await uploadToCloudinary(img.file, 'blogs/thumbnails');
//           setThumbnailImages(prev => prev.map(item => 
//             item.id === img.id ? { ...item, url, publicId, uploading: false } : item
//           ));
//         } catch (error) {
//           console.error('Upload error:', error);
//           setThumbnailImages(prev => prev.filter(item => item.id !== img.id));
//           toast.error(`Failed to upload ${img.file.name}`);
//         }
//       }
//     }

//     // Clear input
//     e.target.value = '';
//   };

//   const removeThumbnailImage = (imageId) => {
//     const imageToRemove = thumbnailImages.find(img => img.id === imageId);
//     if (imageToRemove && imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
//       URL.revokeObjectURL(imageToRemove.preview);
//     }
//     setThumbnailImages(prev => prev.filter(img => img.id !== imageId));
//   };

//   // ========== PARAGRAPH HANDLERS ==========
  
//   const handleParagraphUpdate = (index, field, value) => {
//     const updatedParagraphs = [...formData.paragraphs];
//     updatedParagraphs[index] = { ...updatedParagraphs[index], [field]: value };
//     setFormData(prev => ({ ...prev, paragraphs: updatedParagraphs }));
    
//     if (errors[`paragraph_${index}_${field}`]) {
//       setErrors(prev => ({ ...prev, [`paragraph_${index}_${field}`]: null }));
//     }
//   };

//   const handleParagraphImageUpload = async (index, file) => {
//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       toast.error(validation.message);
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
    
//     // Update paragraph with preview and uploading state
//     const updatedParagraphs = [...formData.paragraphs];
//     updatedParagraphs[index] = {
//       ...updatedParagraphs[index],
//       imageFile: file,
//       imagePreview: previewUrl,
//       imageUrl: null,
//       imagePublicId: null,
//       imageUploading: true
//     };
//     setFormData(prev => ({ ...prev, paragraphs: updatedParagraphs }));

//     // Upload to Cloudinary
//     try {
//       const { url, publicId } = await uploadToCloudinary(file, 'blogs/paragraphs');
//       const finalParagraphs = [...formData.paragraphs];
//       finalParagraphs[index] = {
//         ...finalParagraphs[index],
//         imageUrl: url,
//         imagePublicId: publicId,
//         imageUploading: false
//       };
//       setFormData(prev => ({ ...prev, paragraphs: finalParagraphs }));
//       toast.success('Section image uploaded');
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorParagraphs = [...formData.paragraphs];
//       errorParagraphs[index] = {
//         ...errorParagraphs[index],
//         imageUploading: false,
//         imageError: 'Failed to upload'
//       };
//       setFormData(prev => ({ ...prev, paragraphs: errorParagraphs }));
//       toast.error('Failed to upload image');
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
//           imageUrl: null,
//           imagePublicId: null,
//           imageUploading: false
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
//     if (!featuredImage.url) newErrors.featuredImage = 'Featured image is required';

//     setErrors(newErrors);
    
//     const isParagraphsValid = validateParagraphs();
    
//     return Object.keys(newErrors).length === 0 && isParagraphsValid;
//   };

//   // ========== FORM SUBMISSION ==========
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if any uploads are still in progress
//     if (featuredImage.uploading || videoFile.uploading || thumbnailImages.some(img => img.uploading)) {
//       toast.error('Please wait for all uploads to complete');
//       return;
//     }

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login again');
//         router.push('/login');
//         return;
//       }

//       // Prepare paragraphs data with image URLs
//       const processedParagraphs = formData.paragraphs
//         .filter(p => p.header?.trim() && p.description?.trim())
//         .map(p => ({
//           header: p.header,
//           description: p.description,
//           image: p.imageUrl || null
//         }));

//       // Prepare payload with Cloudinary URLs
//       const payload = {
//         title: formData.title,
//         author: formData.author,
//         category: formData.category,
//         publishDate: formData.publishDate,
//         excerpt: formData.excerpt,
//         content: formData.content,
//         tags: formData.tags,
//         featured: formData.featured,
//         paragraphs: processedParagraphs,
//         metaTitle: formData.metaTitle || '',
//         metaDescription: formData.metaDescription || '',
//         metaKeywords: formData.metaKeywords || '',
//         featuredImageUrl: featuredImage.url,
//         featuredImagePublicId: featuredImage.publicId,
//         videoUrl: videoFile.url || null,
//         videoPublicId: videoFile.publicId || null,
//         thumbnailImages: thumbnailImages.map(img => ({
//           url: img.url,
//           publicId: img.publicId
//         }))
//       };

//       console.log('Submitting blog payload:', payload);

//       const response = await fetch('http://localhost:5000/api/blogs', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Blog post created successfully!');
//         router.push('/moderator/manage-blogs');
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
//                 <NextLink href="/moderator/manage-blogs" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h1 className="text-2xl font-bold text-gray-900">Create Blog Post</h1>
//                     <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
//                       Moderator
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

//                 {/* Author Name - Readonly */}
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
//                     readOnly
//                     disabled
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
//                   />
//                 </div>

//                 {/* Category and Publish Date */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
//                   <div className="grid grid-cols-2 gap-4">
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
                
//                 {/* Mark as Featured and Tags */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
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
//                         {featuredImage.uploading && (
//                           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                             <Loader2 className="w-6 h-6 text-white animate-spin" />
//                           </div>
//                         )}
//                         <button
//                           type="button"
//                           onClick={removeFeaturedImage}
//                           className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                           disabled={featuredImage.uploading}
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

//                 {/* Video Upload (Optional) */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Video className="w-5 h-5 text-[#E39A65]" />
//                       Video (Optional)
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Upload a video to accompany your blog post (MP4, WebM, MOV - max 50MB)</p>
//                   </div>
                  
//                   <div className="p-5">
//                     {!videoFile.preview ? (
//                       <div 
//                         className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors cursor-pointer hover:border-[#E39A65] hover:bg-orange-50"
//                         onClick={() => videoInputRef.current?.click()}
//                       >
//                         <input 
//                           type="file" 
//                           ref={videoInputRef}
//                           className="hidden" 
//                           accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/mpeg,.mp4,.webm,.mov,.avi,.mpeg" 
//                           onChange={handleVideoChange} 
//                         />
//                         <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                         <p className="text-sm font-medium text-gray-600">
//                           Click to upload video
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">
//                           MP4, WebM, MOV up to 50MB
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-900">
//                         <video 
//                           src={videoFile.preview} 
//                           controls
//                           className="w-full h-auto max-h-64"
//                         >
//                           Your browser does not support the video tag.
//                         </video>
//                         {videoFile.uploading && (
//                           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                             <Loader2 className="w-6 h-6 text-white animate-spin" />
//                           </div>
//                         )}
//                         <button
//                           type="button"
//                           onClick={removeVideo}
//                           className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                           disabled={videoFile.uploading}
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
//                     {videoFile.error && (
//                       <p className="text-xs text-red-600 mt-2">{videoFile.error}</p>
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
//                             {image.uploading && (
//                               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                                 <Loader2 className="w-4 h-4 text-white animate-spin" />
//                               </div>
//                             )}
//                             <button
//                               type="button"
//                               onClick={() => removeThumbnailImage(image.id)}
//                               className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                               disabled={image.uploading}
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
//                   <p className="text-xs text-gray-500 mt-1">Write your main blog content with rich text formatting</p>
//                 </div>
                
//                 <div className="p-5">
//                   {errors.content && (
//                     <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {errors.content}
//                     </p>
//                   )}
                  
//                   {isMounted && editor && (
//                     <div className="border border-gray-300 rounded-lg overflow-hidden">
//                       <RichTextEditor editor={editor}>
//                         <RichTextEditor.Toolbar>
//                           <RichTextEditor.ControlsGroup>
//                             <RichTextEditor.Bold />
//                             <RichTextEditor.Italic />
//                             <RichTextEditor.Underline />
//                             <RichTextEditor.Strikethrough />
//                           </RichTextEditor.ControlsGroup>

//                           <RichTextEditor.ControlsGroup>
//                             <RichTextEditor.H1 />
//                             <RichTextEditor.H2 />
//                             <RichTextEditor.H3 />
//                             <RichTextEditor.H4 />
//                           </RichTextEditor.ControlsGroup>

//                           <RichTextEditor.ControlsGroup>
//                             <RichTextEditor.BulletList />
//                             <RichTextEditor.OrderedList />
//                           </RichTextEditor.ControlsGroup>

//                           <RichTextEditor.ControlsGroup>
//                             <RichTextEditor.AlignLeft />
//                             <RichTextEditor.AlignCenter />
//                             <RichTextEditor.AlignRight />
//                           </RichTextEditor.ControlsGroup>

//                           <RichTextEditor.ControlsGroup>
//                             <RichTextEditor.Link />
//                             <RichTextEditor.Unlink />
//                           </RichTextEditor.ControlsGroup>
//                         </RichTextEditor.Toolbar>

//                         <RichTextEditor.Content />
//                       </RichTextEditor>
//                     </div>
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
//                       onImageUpload={handleParagraphImageUpload}
//                       errors={errors}
//                       isMounted={isMounted}
//                     />
//                   ))}

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
//                 href="/moderator/manage-blogs"
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

// Cloudinary upload function for images
const uploadToCloudinary = async (file, folder = 'blogs') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'b2b-products');
  formData.append('folder', folder);
  
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

// YouTube helper functions
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/\s]+)/,
    /youtube\.com\/embed\/([^/?]+)/,
    /youtube\.com\/v\/([^/?]+)/,
    /youtube\.com\/shorts\/([^/?]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

const getYouTubeThumbnail = (videoId) => {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const validateYoutubeUrl = (url) => {
  if (!url) return { valid: true, error: null };
  const videoId = getYouTubeVideoId(url);
  return { 
    valid: !!videoId, 
    error: videoId ? null : 'Please enter a valid YouTube URL'
  };
};

// ========== PARAGRAPH SECTION COMPONENT ==========
const ParagraphSection = ({ index, paragraph, onUpdate, onRemove, onImageUpload, errors, isMounted }) => {
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

  const imageInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onImageUpload(index, file);
  };

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

        {/* Section Image (Optional) */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Section Image (Optional)
          </label>
          {paragraph.imagePreview ? (
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={paragraph.imagePreview} 
                alt={`Section ${index + 1}`} 
                className="w-full h-32 object-cover"
              />
              {paragraph.uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
              <button
                type="button"
                onClick={() => onUpdate(index, 'imageFile', null)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                disabled={paragraph.uploading}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageUpload}
              />
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#E39A65] border border-dashed border-[#E39A65] rounded-lg hover:bg-orange-50 transition-colors"
                disabled={paragraph.uploading}
              >
                <ImagePlus className="w-4 h-4" />
                {paragraph.uploading ? 'Uploading...' : 'Add Image'}
              </button>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========
export default function ModeratorCreateBlog() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Refs for file inputs
  const featuredImageRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: 'Asian Clothify',
    category: '',
    publishDate: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    tags: [],
    featured: false,
    paragraphs: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  });

  // Featured image state with Cloudinary URL
  const [featuredImage, setFeaturedImage] = useState({
    file: null,
    preview: null,
    url: null,
    publicId: null,
    uploading: false,
    error: ''
  });

  // YouTube video state
  const [youtubeVideo, setYoutubeVideo] = useState({
    url: '',
    videoId: null,
    thumbnail: null,
    error: ''
  });

  // Thumbnail images state with Cloudinary URLs
  const [thumbnailImages, setThumbnailImages] = useState([]);

  // Errors state
  const [errors, setErrors] = useState({});

  // Tag input state
  const [tagInput, setTagInput] = useState('');

  // Allowed file types
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxImageSize = 5 * 1024 * 1024; // 5MB

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
        if (user.role !== 'moderator') {
          toast.error('Access denied. Moderator privileges required.');
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

  // YouTube URL handler
  const handleYoutubeUrlChange = (e) => {
    const url = e.target.value;
    const validation = validateYoutubeUrl(url);
    
    if (validation.valid && url) {
      const videoId = getYouTubeVideoId(url);
      setYoutubeVideo({
        url,
        videoId,
        thumbnail: getYouTubeThumbnail(videoId),
        error: ''
      });
    } else {
      setYoutubeVideo({
        url,
        videoId: null,
        thumbnail: null,
        error: validation.error || ''
      });
    }
  };

  const removeYoutubeVideo = () => {
    setYoutubeVideo({
      url: '',
      videoId: null,
      thumbnail: null,
      error: ''
    });
  };

  // ========== FEATURED IMAGE HANDLERS ==========
  
  const handleFeaturedImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setFeaturedImage(prev => ({ ...prev, error: validation.message }));
      return;
    }

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setFeaturedImage({
      file,
      preview: previewUrl,
      url: null,
      publicId: null,
      uploading: true,
      error: ''
    });

    // Upload to Cloudinary
    try {
      const { url, publicId } = await uploadToCloudinary(file, 'blogs/featured');
      setFeaturedImage({
        file,
        preview: previewUrl,
        url,
        publicId,
        uploading: false,
        error: ''
      });
      toast.success('Featured image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      setFeaturedImage(prev => ({
        ...prev,
        uploading: false,
        error: 'Failed to upload image'
      }));
      toast.error('Failed to upload featured image');
    }
  };

  const removeFeaturedImage = () => {
    if (featuredImage.preview && featuredImage.preview.startsWith('blob:')) {
      URL.revokeObjectURL(featuredImage.preview);
    }
    setFeaturedImage({ file: null, preview: null, url: null, publicId: null, uploading: false, error: '' });
    if (featuredImageRef.current) {
      featuredImageRef.current.value = '';
    }
  };

  // ========== THUMBNAIL IMAGES HANDLERS ==========
  
  const handleThumbnailImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const validFiles = [];
    const errorsList = [];

    files.forEach(file => {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errorsList.push(`${file.name}: ${validation.message}`);
      }
    });

    if (errorsList.length > 0) {
      toast.error(errorsList.join('\n'));
    }

    if (validFiles.length > 0) {
      // Add all new images with uploading state
      const newImagesWithPreview = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        url: null,
        publicId: null,
        uploading: true,
        id: Math.random().toString(36).substr(2, 9)
      }));
      
      setThumbnailImages(prev => [...prev, ...newImagesWithPreview]);

      // Upload each image to Cloudinary
      for (const img of newImagesWithPreview) {
        try {
          const { url, publicId } = await uploadToCloudinary(img.file, 'blogs/thumbnails');
          setThumbnailImages(prev => prev.map(item => 
            item.id === img.id ? { ...item, url, publicId, uploading: false } : item
          ));
        } catch (error) {
          console.error('Upload error:', error);
          setThumbnailImages(prev => prev.filter(item => item.id !== img.id));
          toast.error(`Failed to upload ${img.file.name}`);
        }
      }
    }

    // Clear input
    e.target.value = '';
  };

  const removeThumbnailImage = (imageId) => {
    const imageToRemove = thumbnailImages.find(img => img.id === imageId);
    if (imageToRemove && imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setThumbnailImages(prev => prev.filter(img => img.id !== imageId));
  };

  // ========== PARAGRAPH HANDLERS ==========
  
  const handleParagraphUpdate = (index, field, value) => {
    const updatedParagraphs = [...formData.paragraphs];
    updatedParagraphs[index] = { ...updatedParagraphs[index], [field]: value };
    setFormData(prev => ({ ...prev, paragraphs: updatedParagraphs }));
    
    if (errors[`paragraph_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`paragraph_${index}_${field}`]: null }));
    }
  };

  const handleParagraphImageUpload = async (index, file) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    
    // Update paragraph with preview and uploading state
    const updatedParagraphs = [...formData.paragraphs];
    updatedParagraphs[index] = {
      ...updatedParagraphs[index],
      imageFile: file,
      imagePreview: previewUrl,
      imageUrl: null,
      imagePublicId: null,
      imageUploading: true
    };
    setFormData(prev => ({ ...prev, paragraphs: updatedParagraphs }));

    // Upload to Cloudinary
    try {
      const { url, publicId } = await uploadToCloudinary(file, 'blogs/paragraphs');
      const finalParagraphs = [...formData.paragraphs];
      finalParagraphs[index] = {
        ...finalParagraphs[index],
        imageUrl: url,
        imagePublicId: publicId,
        imageUploading: false
      };
      setFormData(prev => ({ ...prev, paragraphs: finalParagraphs }));
      toast.success('Section image uploaded');
    } catch (error) {
      console.error('Upload error:', error);
      const errorParagraphs = [...formData.paragraphs];
      errorParagraphs[index] = {
        ...errorParagraphs[index],
        imageUploading: false,
        imageError: 'Failed to upload'
      };
      setFormData(prev => ({ ...prev, paragraphs: errorParagraphs }));
      toast.error('Failed to upload image');
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
          imageUrl: null,
          imagePublicId: null,
          imageUploading: false
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
    if (!featuredImage.url) newErrors.featuredImage = 'Featured image is required';

    setErrors(newErrors);
    
    const isParagraphsValid = validateParagraphs();
    
    return Object.keys(newErrors).length === 0 && isParagraphsValid;
  };

  // ========== FORM SUBMISSION ==========
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any uploads are still in progress
    if (featuredImage.uploading || thumbnailImages.some(img => img.uploading)) {
      toast.error('Please wait for all uploads to complete');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login again');
        router.push('/login');
        return;
      }

      // Prepare paragraphs data with image URLs
      const processedParagraphs = formData.paragraphs
        .filter(p => p.header?.trim() && p.description?.trim())
        .map(p => ({
          header: p.header,
          description: p.description,
          image: p.imageUrl || null
        }));

      // Prepare payload with Cloudinary URLs and YouTube video
      const payload = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        publishDate: formData.publishDate,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags,
        featured: formData.featured,
        paragraphs: processedParagraphs,
        metaTitle: formData.metaTitle || '',
        metaDescription: formData.metaDescription || '',
        metaKeywords: formData.metaKeywords || '',
        featuredImageUrl: featuredImage.url,
        featuredImagePublicId: featuredImage.publicId,
        youtubeVideo: youtubeVideo.videoId ? {
          url: youtubeVideo.url,
          videoId: youtubeVideo.videoId,
          thumbnail: youtubeVideo.thumbnail
        } : null,
        thumbnailImages: thumbnailImages.map(img => ({
          url: img.url,
          publicId: img.publicId
        }))
      };

      console.log('Submitting blog payload:', payload);

      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Blog post created successfully!');
        router.push('/moderator/manage-blogs');
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
                <NextLink href="/moderator/manage-blogs" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </NextLink>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">Create Blog Post</h1>
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                      Moderator
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

                {/* Author Name - Readonly */}
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
                    readOnly
                    disabled
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* Category and Publish Date */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <div className="grid grid-cols-2 gap-4">
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
                
                {/* Mark as Featured and Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
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

              {/* Right Column - Images & Video */}
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
                        {featuredImage.uploading && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={removeFeaturedImage}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          disabled={featuredImage.uploading}
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

                {/* YouTube Video (Optional) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Video className="w-5 h-5 text-[#E39A65]" />
                      YouTube Video (Optional)
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Add a YouTube video to accompany your blog post</p>
                  </div>
                  
                  <div className="p-5">
                    {!youtubeVideo.videoId ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            YouTube URL
                          </label>
                          <input
                            type="text"
                            value={youtubeVideo.url}
                            onChange={handleYoutubeUrlChange}
                            placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                              youtubeVideo.error ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {youtubeVideo.error && (
                            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {youtubeVideo.error}
                            </p>
                          )}
                          {!youtubeVideo.error && youtubeVideo.url && (
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              ✓ Valid YouTube URL
                            </p>
                          )}
                        </div>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm font-medium text-gray-600">
                            Enter a YouTube URL above
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Supports YouTube links, shorts, and embed URLs
                          </p>
                          <div className="mt-3 text-xs text-gray-400">
                            <p>Examples:</p>
                            <p>• https://www.youtube.com/watch?v=...</p>
                            <p>• https://youtu.be/...</p>
                            <p>• https://www.youtube.com/shorts/...</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-900">
                        <div className="relative pb-[56.25%] h-0">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeVideo.videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          ></iframe>
                        </div>
                        <button
                          type="button"
                          onClick={removeYoutubeVideo}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
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
                            {image.uploading && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => removeThumbnailImage(image.id)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              disabled={image.uploading}
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
              </div>
            </div>

            {/* Main Content */}
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
                      onImageUpload={handleParagraphImageUpload}
                      errors={errors}
                      isMounted={isMounted}
                    />
                  ))}

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
                href="/moderator/manage-blogs"
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