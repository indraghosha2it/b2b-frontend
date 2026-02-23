'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Grid, 
  List, 
  X, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Package,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAllProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    targetedCustomer: '',
    minPrice: '',
    maxPrice: '',
    status: 'all',
    sortBy: 'newest'
  });

  // Available filter options
  const [categories, setCategories] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });

  // Check admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin' && user.role !== 'moderator') {
      toast.error('Unauthorized access');
      router.push('/login');
    }
  }, [router]);

  // Helper functions
  const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getFirstPricingTier = (pricingTiers) => {
    if (!pricingTiers || pricingTiers.length === 0) return null;
    return pricingTiers[0];
  };

  const truncateText = (text, limit = 30) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage]);

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
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 9);
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.targetedCustomer) queryParams.append('targetedCustomer', filters.targetedCustomer);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      
      // Include inactive products for admin
      queryParams.append('includeInactive', 'true');
      
      // Filter by status
      if (filters.status === 'active') {
        queryParams.append('isActive', 'true');
      } else if (filters.status === 'inactive') {
        queryParams.append('isActive', 'false');
      }
      
      let sortParam = '-createdAt';
      switch (filters.sortBy) {
        case 'price_low':
          sortParam = 'price_asc';
          break;
        case 'price_high':
          sortParam = 'price_desc';
          break;
        case 'name_asc':
          sortParam = 'name_asc';
          break;
        case 'newest':
        default:
          sortParam = 'newest';
      }
      queryParams.append('sort', sortParam);

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
        
        const initialActiveIndex = {};
        (data.data || []).forEach(product => {
          if (product._id) {
            initialActiveIndex[product._id] = 0;
          }
        });
        setActiveImageIndex(initialActiveIndex);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      targetedCustomer: '',
      minPrice: '',
      maxPrice: '',
      status: 'all',
      sortBy: 'newest'
    });
    setCurrentPage(1);
  };

  const handleImageHover = (productId, imageIndex) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: imageIndex }));
  };

  const handleImageLeave = (productId) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };

 const handleEdit = (productId) => {
  router.push(`/admin/editProduct?id=${productId}`);
};

 const handleView = (productId) => {
  router.push(`/admin/productDetails?id=${productId}`);
};

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${deleteModal.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setDeleteModal({ show: false, id: null, name: '' });
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}/toggle`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Product ${currentStatus ? 'deactivated' : 'activated'} successfully`);
        fetchProducts();
      } else {
        toast.error(data.error || 'Failed to toggle product status');
      }
    } catch (error) {
      console.error('Error toggling product status:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.targetedCustomer) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.status !== 'all') count++;
    return count;
  };

  // Filter Bar Component
  const FilterBar = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#E39A65]" />
          Filters
        </h3>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium"
          >
            Clear All ({getActiveFilterCount()})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Category Filter */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Target Audience Filter */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Target Audience</label>
          <select
            value={filters.targetedCustomer}
            onChange={(e) => handleFilterChange('targetedCustomer', e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
          >
            <option value="">All</option>
            <option value="ladies">Ladies</option>
            <option value="gents">Gents</option>
            <option value="kids">Kids</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Min Price ($)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Max Price ($)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            placeholder="Any"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Product Card Component (Grid View)
  const ProductGridCard = ({ product }) => {
    const productImages = product.images || [];
    const activeIndex = activeImageIndex[product._id] || 0;
    const hasMultipleImages = productImages.length > 1;
    const firstTier = getFirstPricingTier(product.quantityBasedPricing);

    return (
      <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col h-full ${
        product.isActive ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
      } group`}>
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img
            src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
            alt={product.productName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Status Badge */}
          <span className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg ${
            product.isActive ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {product.isActive ? 'Active' : 'Inactive'}
          </span>
          
          {/* Category Badge */}
          <span className="absolute top-3 right-3 bg-[#E39A65] text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
            {product.category?.name || 'Uncategorized'}
          </span>
        </div>

        {/* Thumbnail Gallery */}
        {hasMultipleImages && (
          <div 
            className="flex justify-center gap-1 py-2 px-2 bg-gray-50 border-b border-gray-200"
            onMouseLeave={() => handleImageLeave(product._id)}
          >
            {productImages.slice(0, 4).map((image, idx) => (
              <div
                key={idx}
                className={`relative w-10 h-10 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                  activeIndex === idx 
                    ? 'border-[#E39A65] scale-110 shadow-md' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                onMouseEnter={() => handleImageHover(product._id, idx)}
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {productImages.length > 4 && (
              <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                +{productImages.length - 4}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[48px]" title={product.productName}>
            {truncateText(product.productName, 40)}
          </h3>

          <p className="text-xs text-gray-500 mb-2">
            ID: {product._id.slice(-6)} • {formatDate(product.createdAt)}
          </p>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-bold text-[#E39A65]">
              ${formatPrice(product.pricePerUnit)}
            </span>
            <span className="text-xs text-gray-500">/ pc</span>
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500">Colors:</span>
              <div className="flex gap-1">
                {product.colors.slice(0, 4).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.code }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Fabric */}
          {product.fabric && (
            <p className="text-xs text-gray-500 mb-2 line-clamp-1">
              {product.fabric}
            </p>
          )}

          {/* Targeted Customer */}
          {product.targetedCustomer && (
            <p className="text-xs text-gray-500 mb-2">
              For: <span className="font-medium text-gray-700">{capitalizeFirst(product.targetedCustomer)}</span>
            </p>
          )}

          {/* Bulk Pricing Preview */}
          {firstTier && (
            <div className="bg-orange-50 rounded-lg p-2 mt-2">
              <p className="text-xs text-[#E39A65] font-medium">
                Bulk: {firstTier.range} pcs - ${formatPrice(firstTier.price)}/pc
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons - At the end of card */}
        <div className="p-4 pt-0 border-t border-gray-200 mt-auto">
          {/* View Details Button - First Row */}
          <button
            onClick={() => handleView(product._id)}
            className="w-full mb-2 px-4 py-2 bg-[#E39A65] text-white text-sm font-medium rounded-lg hover:bg-[#d48b54] transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>

          {/* Edit and Delete Buttons - Second Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleEdit(product._id)}
              className="px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(product._id, product.productName)}
              className="px-3 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>

          {/* Toggle Status Button - Optional small button */}
          <button
            onClick={() => handleToggleStatus(product._id, product.isActive)}
            className={`w-full mt-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${
              product.isActive 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {product.isActive ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
            {product.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      </div>
    );
  };

  // Product Card Component (List View)
  const ProductListCard = ({ product }) => {
    const productImages = product.images || [];
    const activeIndex = activeImageIndex[product._id] || 0;
    const hasMultipleImages = productImages.length > 1;
    const firstTier = getFirstPricingTier(product.quantityBasedPricing);

    return (
      <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${
        product.isActive ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
      }`}>
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Images */}
          <div className="md:w-64 p-3 ">
            <div className="relative h-48 md:h-72 overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
              
              {/* Status Badge */}
              <span className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg ${
                product.isActive ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {product.isActive ? 'Active' : 'Inactive'}
              </span>

              {/* Category Badge */}
              <span className="absolute top-3 right-3 bg-[#E39A65] text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                {product.category?.name || 'Uncategorized'}
              </span>
            </div>

            {/* Thumbnail Gallery */}
            {hasMultipleImages && (
              <div 
                className="flex justify-center gap-2 py-2 px-2 bg-gray-50 border-t border-gray-200"
                onMouseLeave={() => handleImageLeave(product._id)}
              >
                {productImages.slice(0, 4).map((image, idx) => (
                  <div
                    key={idx}
                    className={`relative w-10 h-12 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                      activeIndex === idx 
                        ? 'border-[#E39A65] scale-110 shadow-md' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    onMouseEnter={() => handleImageHover(product._id, idx)}
                  >
                    <img
                      src={image.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {productImages.length > 4 && (
                  <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                    +{productImages.length - 4}
                  </div>
                )}
              </div>
            )}


                 {/* <p className="text-sm text-center mt-2 text-gray-600 mb-3 line-clamp-2">
                  {product.description?.replace(/<[^>]*>/g, '') || 'No description available'}
                </p> */}
          </div>

          {/* Right Column - Content */}
          <div className="flex-1 p-5">
            <div className="flex flex-col h-full">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.productName}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  ID: {product._id} • Created: {formatDate(product.createdAt)}
                </p>
                
                {/* <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description?.replace(/<[^>]*>/g, '') || 'No description available'}
                </p> */}

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="font-bold text-[#E39A65]">${formatPrice(product.pricePerUnit)}<span className="text-xs text-gray-500 ml-1">/pc</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">MOQ</p>
                    <p className="font-medium text-gray-900">{product.moq} pcs</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Target</p>
                    <p className="font-medium text-gray-900 capitalize">{product.targetedCustomer || 'Unisex'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Fabric</p>
                    <p className="font-medium text-gray-900 line-clamp-1">{product.fabric || 'N/A'}</p>
                  </div>
                </div>

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">Colors:</span>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 6).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-5 h-5 rounded-full border border-gray-200"
                          style={{ backgroundColor: color.code }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Bulk Pricing */}
                {firstTier && (
                  <div className="bg-orange-50 rounded-lg p-2 inline-block">
                    <p className="text-xs text-[#E39A65] font-medium">
                      Bulk: {firstTier.range} pcs - ${formatPrice(firstTier.price)}/pc
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons - At the end of card */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                {/* View Details Button - First Row */}
                <button
                  onClick={() => handleView(product._id)}
                  className="w-full mb-2 px-4 py-2 bg-[#E39A65] text-white text-sm font-medium rounded-lg hover:bg-[#d48b54] transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>

                {/* Edit and Delete Buttons - Second Row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product._id, product.productName)}
                    className="px-3 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>

                {/* Toggle Status Button */}
                <button
                  onClick={() => handleToggleStatus(product._id, product.isActive)}
                  className={`w-full mt-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    product.isActive 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {product.isActive ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                  {product.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                    Admin
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your product catalog • {totalProducts} total products
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchProducts}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <Link
                href="/admin/createProducts"
                className="flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, fabric, or category..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none transition"
            />
            {filters.search && (
              <button
                onClick={() => handleFilterChange('search', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* View Toggle and Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{products.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalProducts}</span> products
          </p>
          <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[#E39A65] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-[#E39A65] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
          </div>
        )}

        {/* Products Display */}
        {!loading && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No products found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products.map(product => (
                      <ProductGridCard key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map(product => (
                      <ProductListCard key={product._id} product={product} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === pageNum
                                ? 'bg-[#E39A65] text-white'
                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return <span key={i} className="text-gray-400">...</span>;
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Delete Product</h3>
              </div>
              
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete <span className="font-semibold">"{deleteModal.name}"</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The product and its images will be permanently removed.
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
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}