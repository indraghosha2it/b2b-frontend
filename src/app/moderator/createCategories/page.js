'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Loader2,
  Trash2,
  Edit,
  Eye,
  Search,
  XCircle,
  Calendar,
  User,
  FileText,
  Hash,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CreateCategories() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });
  const [viewModal, setViewModal] = useState({ show: false, category: null });
  const [editModal, setEditModal] = useState({ show: false, category: null, imageFile: null, imagePreview: null });

  // Fetch existing categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Check user role
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Current user role:', user.role);
    
    if (user.role !== 'moderator' && user.role !== 'admin') {
      console.log('Unauthorized - redirecting');
      router.push('/login');
    }
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // View Modal Handlers
  const handleViewClick = (category) => {
    setViewModal({ show: true, category });
  };

  const handleViewClose = () => {
    setViewModal({ show: false, category: null });
  };

  // Edit Modal Handlers
  const handleEditClick = (category) => {
    setEditModal({ 
      show: true, 
      category,
      formData: {
        name: category.name,
        description: category.description || ''
      },
      imagePreview: category.image?.url || null,
      imageFile: null
    });
  };

  const handleEditClose = () => {
    setEditModal({ show: false, category: null, formData: { name: '', description: '' }, imagePreview: null, imageFile: null });
    setErrors({});
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setEditModal(prev => ({
      ...prev,
      imageFile: file
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditModal(prev => ({
        ...prev,
        imagePreview: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditRemoveImage = () => {
    setEditModal(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: null
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!editModal.formData.name.trim()) {
      setErrors({ name: 'Category name is required' });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('name', editModal.formData.name);
      formDataToSend.append('description', editModal.formData.description);
      
      if (editModal.imageFile) {
        formDataToSend.append('image', editModal.imageFile);
      }

      const response = await fetch(`http://localhost:5000/api/categories/${editModal.category._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Category updated successfully!');
        fetchCategories();
        handleEditClose();
      } else {
        toast.error(data.error || 'Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Modal Handlers
  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${deleteModal.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Category deleted successfully');
        fetchCategories();
      } else {
        toast.error(data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setDeleteModal({ show: false, id: null, name: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters';
    }
    
    if (!imageFile && !imagePreview) {
      newErrors.image = 'Category image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    
    if (errors.image) setErrors({ ...errors, image: null });
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', imageFile);

      const response = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Category created successfully!');
        setFormData({ name: '', description: '' });
        setImagePreview(null);
        setImageFile(null);
        fetchCategories();
      } else {
        toast.error(data.error || 'Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Truncate description function
  const truncateDescription = (text, wordLimit = 10) => {
    if (!text) return '—';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/moderator/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
                <p className="text-sm text-gray-500 mt-1">Create and manage product categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Create Form (Compact) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#E39A65]" />
                  Add New Category
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Image Upload - Compact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image <span className="text-red-500">*</span>
                  </label>
                  
                  {!imagePreview ? (
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
                        errors.image ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-[#E39A65] hover:bg-orange-50'
                      }`}
                      onClick={() => document.getElementById('image-upload').click()}
                    >
                      <input type="file" id="image-upload" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} />
                      <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${errors.image ? 'text-red-400' : 'text-gray-400'}`} />
                      <p className={`text-xs ${errors.image ? 'text-red-600' : 'text-gray-600'}`}>
                        Click to upload
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPEG (max 5MB)</p>
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
                      <button type="button" onClick={removeImage} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  {errors.image && <p className="text-xs text-red-600 mt-1">{errors.image}</p>}
                </div>

                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., T-Shirts"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                    placeholder="Brief description (optional)"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E39A65] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Create Category</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Categories Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Table Header with Search */}
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    All Categories ({filteredCategories.length})
                  </h2>
                  <div className="relative w-64">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
  <input
    type="text"
    placeholder="Search categories..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition placeholder:text-gray-400"
  />
</div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className="px-5 py-8 text-center">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#E39A65]" />
                        </td>
                      </tr>
                    ) : filteredCategories.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-5 py-8 text-center text-gray-500">
                          {searchTerm ? 'No categories found matching your search' : 'No categories created yet'}
                        </td>
                      </tr>
                    ) : (
                      filteredCategories.map((category) => (
                        <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                              <img 
                                src={category.image?.url || '/placeholder-image.jpg'} 
                                alt={category.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/48?text=No+Image';
                                }}
                              />
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">ID: {category._id.slice(-6)}</div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="text-sm text-gray-600 max-w-xs">
                              {truncateDescription(category.description, 8)}
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="text-sm text-gray-600">
                              {formatDate(category.createdAt)}
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleViewClick(category)}
                                className="p-1.5 text-gray-600 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEditClick(category)}
                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(category._id, category.name)}
                                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-5 py-3 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-500">
                  Showing {filteredCategories.length} of {categories.length} categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact View Modal */}
      {viewModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={viewModal.category?.image?.url || '/placeholder-image.jpg'} 
                    alt={viewModal.category?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{viewModal.category?.name}</h2>
                  <p className="text-xs text-gray-500">Category Details</p>
                </div>
              </div>
              <button 
                onClick={handleViewClose} 
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Details Grid - 2 Columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* ID */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Hash className="w-3.5 h-3.5 text-[#E39A65]" />
                    <span className="text-xs font-medium text-gray-500">Category ID</span>
                  </div>
                  <p className="text-xs font-mono text-gray-900 break-all">{viewModal.category?._id}</p>
                </div>

                {/* Created Date */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E39A65]" />
                    <span className="text-xs font-medium text-gray-500">Created</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    {viewModal.category?.createdAt && formatDate(viewModal.category.createdAt)}
                  </p>
                </div>

                {/* Created By */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-3.5 h-3.5 text-[#E39A65]" />
                    <span className="text-xs font-medium text-gray-500">Created By</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    {viewModal.category?.createdBy?.contactPerson || 'Unknown'}
                  </p>
                </div>

                {/* Last Updated */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#E39A65]" />
                    <span className="text-xs font-medium text-gray-500">Updated</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    {viewModal.category?.updatedAt && formatDate(viewModal.category.updatedAt)}
                  </p>
                </div>

                {/* Description - Full Width */}
                <div className="col-span-2 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-3.5 h-3.5 text-[#E39A65]" />
                    <span className="text-xs font-medium text-gray-500">Description</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {viewModal.category?.description || 'No description provided for this category.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleViewClose();
                    handleEditClick(viewModal.category);
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={handleViewClose}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Edit Modal */}
      {editModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#E39A65]/10 rounded-lg">
                    <Edit className="w-5 h-5 text-[#E39A65]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Edit Category</h3>
                </div>
                <button onClick={handleEditClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                {/* Image Upload - Compact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>
                  
                  {!editModal.imagePreview ? (
                    <div 
                      className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-[#E39A65] hover:bg-orange-50 transition-colors"
                      onClick={() => document.getElementById('edit-image-upload').click()}
                    >
                      <input type="file" id="edit-image-upload" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={handleEditImageChange} />
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-xs text-gray-600">Click to upload new image</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPEG (max 5MB)</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                          <img src={editModal.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">New image selected</p>
                          <p className="text-xs text-gray-500">Click remove to cancel</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={handleEditRemoveImage}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editModal.formData?.name || ''}
                    onChange={(e) => setEditModal(prev => ({
                      ...prev,
                      formData: { ...prev.formData, name: e.target.value }
                    }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                    placeholder="e.g., T-Shirts"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editModal.formData?.description || ''}
                    onChange={(e) => setEditModal(prev => ({
                      ...prev,
                      formData: { ...prev.formData, description: e.target.value }
                    }))}
                    rows="3"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
                    placeholder="Brief description (optional)"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleEditClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white text-sm font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Delete Category</h3>
              </div>
              
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete <span className="font-semibold">"{deleteModal.name}"</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. Products in this category may need to be reassigned.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteModal({ show: false, id: null, name: '' })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}