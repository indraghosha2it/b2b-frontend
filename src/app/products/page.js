"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
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
  Sparkles
} from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    audience: true
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    targetedCustomer: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  // Available filter options
  const [categories, setCategories] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Price range input states
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');

  // Helper function to capitalize first letter
  const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Helper function to get first pricing tier
  const getFirstPricingTier = (pricingTiers) => {
    if (!pricingTiers || pricingTiers.length === 0) return null;
    return pricingTiers[0];
  };

  // Helper function to truncate text
  const truncateText = (text, limit = 30) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  // Fetch products and categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
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
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 6);
      
      if (filters.search) queryParams.append('search', filters.search);
      
      if (filters.categories.length > 0) {
        filters.categories.forEach(cat => queryParams.append('category', cat));
      }
      
      if (filters.targetedCustomer.length > 0) {
        filters.targetedCustomer.forEach(cust => queryParams.append('targetedCustomer', cust));
      }
      
      if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
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

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
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
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories };
    });
    setCurrentPage(1);
  };

  const handleTargetedCustomerChange = (customer) => {
    setFilters(prev => {
      const newCustomers = prev.targetedCustomer.includes(customer)
        ? prev.targetedCustomer.filter(c => c !== customer)
        : [...prev.targetedCustomer, customer];
      return { ...prev, targetedCustomer: newCustomers };
    });
    setCurrentPage(1);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setMinPriceInput(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setMaxPriceInput(value);
    }
  };

  const applyPriceRange = () => {
    setFilters(prev => ({
      ...prev,
      priceRange: { 
        min: minPriceInput || '', 
        max: maxPriceInput || '' 
      }
    }));
    setCurrentPage(1);
  };

  const clearPriceRange = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categories: [],
      targetedCustomer: [],
      priceRange: { min: '', max: '' },
      sortBy: 'newest'
    });
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleImageHover = (productId, imageIndex) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: imageIndex }));
  };

  const handleImageLeave = (productId) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };

  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.targetedCustomer.length > 0) count += filters.targetedCustomer.length;
    if (filters.priceRange.min || filters.priceRange.max) count += 1;
    return count;
  };

  // Filter Sidebar Component
  const FilterSidebar = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#E39A65]" />
          Filters
        </h3>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-[#E39A65] hover:text-[#d48b54] font-medium"
          >
            Clear All ({getActiveFilterCount()})
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#E39A65]" />
            Price Range
          </h4>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Min ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={minPriceInput}
                    onChange={handleMinPriceChange}
                    className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Max ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="∞"
                    value={maxPriceInput}
                    onChange={handleMaxPriceChange}
                    className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={applyPriceRange}
              disabled={!minPriceInput && !maxPriceInput}
              className="w-full py-2.5 bg-[#E39A65] text-white text-sm font-medium rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply Price Range
            </button>

            {(filters.priceRange.min || filters.priceRange.max) && (
              <div className="flex items-center justify-between bg-orange-50 p-2 rounded-lg">
                <span className="text-sm text-gray-700">
                  ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
                </span>
                <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#E39A65]" />
            Categories
          </h4>
          {expandedSections.categories ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {categories.map(category => (
              <label key={category._id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className="w-4 h-4 rounded border-gray-300 text-[#E39A65] focus:ring-[#E39A65]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#E39A65] transition-colors flex-1">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Target Audience */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection('audience')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#E39A65]" />
            Target Audience
          </h4>
          {expandedSections.audience ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.audience && (
          <div className="space-y-2">
            {[
              { value: 'ladies', label: 'Ladies' },
              { value: 'gents', label: 'Gents' },
              { value: 'kids', label: 'Kids' },
              { value: 'unisex', label: 'Unisex' }
            ].map(customer => (
              <label key={customer.value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.targetedCustomer.includes(customer.value)}
                  onChange={() => handleTargetedCustomerChange(customer.value)}
                  className="w-4 h-4 rounded border-gray-300 text-[#E39A65] focus:ring-[#E39A65]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#E39A65] transition-colors flex-1">
                  {customer.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Product Card Component (Grid View) - EXACT design from FeaturedProducts
  const ProductGridCard = ({ product }) => {
    const productImages = product.images || [];
    const activeIndex = activeImageIndex[product._id] || 0;
    const hasMultipleImages = productImages.length > 1;
    const firstTier = getFirstPricingTier(product.quantityBasedPricing);

    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
        <Link href={`/products/${product._id}`}>
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden bg-gray-100">
            <img
              src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
              alt={product.productName || 'Product image'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
              }}
            />
            
            {/* Category Badge - Left Top */}
            <span className="absolute top-4 left-4 bg-[#E39A65] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
              {product.category?.name || 'Uncategorized'}
            </span>
            
            {/* MOQ Badge - Right Top */}
            <span className="absolute top-4 right-4 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm shadow-lg">
              MOQ: {product.moq || 0}pcs
            </span>

            {/* Targeted Customer Badge */}
            {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
              <span className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                {capitalizeFirst(product.targetedCustomer)}
              </span>
            )}
          </div>

          {/* Thumbnail Gallery - Centered */}
          {hasMultipleImages && (
            <div 
              className="flex justify-center gap-1 py-3 px-2 bg-gray-50 border-t border-gray-100"
              onMouseLeave={() => handleImageLeave(product._id)}
            >
              {productImages.slice(0, 5).map((image, index) => (
                <div
                  key={`${product._id}-thumb-${index}`}
                  className={`relative w-10 h-10 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                    activeIndex === index 
                      ? 'border-[#E39A65] scale-110 shadow-md' 
                      : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  onMouseEnter={() => handleImageHover(product._id, index)}
                >
                  <img
                    src={image.url}
                    alt={`${product.productName} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100';
                    }}
                  />
                </div>
              ))}
              {productImages.length > 5 && (
                <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                  +{productImages.length - 5}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-5 pt-3">
            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[56px]" title={product.productName}>
              {truncateText(product.productName, 40)}
            </h3>

            {/* Price */}
            <div className="mb-3">
              <span className="text-2xl font-bold text-[#E39A65]">
                ${formatPrice(product.pricePerUnit)}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                per piece
              </span>
            </div>

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Colors:</span>
                <div className="flex gap-1.5">
                  {product.colors.slice(0, 5).map((color, i) => (
                    <div
                      key={`${product._id}-color-${i}-${color.code || i}`}
                      className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: color.code || '#CCCCCC' }}
                      title={`Color ${i + 1}`}
                    />
                  ))}
                  {product.colors.length > 5 && (
                    <span className="text-xs text-gray-500 ml-1">
                      +{product.colors.length - 5}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Bulk Pricing Preview - Shows first tier */}
            {firstTier && (
              <div className="bg-orange-50 rounded-lg p-3 mb-4 border border-orange-100">
                <p className="text-xs text-[#E39A65] font-medium mb-1">Bulk pricing:</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{firstTier.range || 'Bulk'} pcs</span>
                  <span className="font-semibold text-[#E39A65]">
                    ${formatPrice(firstTier.price)}/pc
                  </span>
                </div>
              </div>
            )}

            {/* Fabric/Material (Optional) */}
            {product.fabric && (
              <p className="text-xs text-gray-500 mb-3">
                Material: {product.fabric}
              </p>
            )}

            {/* View Details Button */}
            <div className="mt-3">
              <span className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-[#E39A65] transition-colors duration-300">
                View Details →
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  // Product Card Component (List View) - Adapted from FeaturedProducts design
  const ProductListCard = ({ product }) => {
    const productImages = product.images || [];
    const activeIndex = activeImageIndex[product._id] || 0;
    const hasMultipleImages = productImages.length > 1;
    const firstTier = getFirstPricingTier(product.quantityBasedPricing);

    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
        <Link href={`/products/${product._id}`}>
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Images */}
            <div className="md:w-80">
              {/* Main Image */}
              <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100">
                <img
                  src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
                  alt={product.productName}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-[#E39A65] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                  {product.category?.name || 'Uncategorized'}
                </span>

                {/* MOQ Badge */}
                <span className="absolute top-4 right-4 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm shadow-lg">
                  MOQ: {product.moq || 0}pcs
                </span>

                {/* Targeted Customer Badge */}
                {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
                  <span className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    {capitalizeFirst(product.targetedCustomer)}
                  </span>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {hasMultipleImages && (
                <div 
                  className="flex justify-center gap-2 py-3 px-2 bg-gray-50 border-t border-gray-100"
                  onMouseLeave={() => handleImageLeave(product._id)}
                >
                  {productImages.slice(0, 4).map((image, idx) => (
                    <div
                      key={idx}
                      className={`relative w-12 h-12 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                        activeIndex === idx 
                          ? 'border-[#E39A65] scale-110 shadow-md' 
                          : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                      onMouseEnter={() => handleImageHover(product._id, idx)}
                    >
                      <img
                        src={image.url}
                        alt={`${product.productName} - view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {productImages.length > 4 && (
                    <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                      +{productImages.length - 4}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Content */}
            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {product.productName}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {product.description?.replace(/<[^>]*>/g, '') || 'No description available'}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-2xl font-bold text-[#E39A65]">${formatPrice(product.pricePerUnit)}<span className="text-sm text-gray-500 ml-1">/pc</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">MOQ</p>
                      <p className="font-semibold text-gray-900">{product.moq} pcs</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Target</p>
                      <p className="font-semibold text-gray-900 capitalize">{product.targetedCustomer || 'Unisex'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fabric</p>
                      <p className="font-semibold text-gray-900">{product.fabric || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-gray-600">Available Colors:</span>
                      <div className="flex gap-1.5">
                        {product.colors.slice(0, 8).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: color.code }}
                            title={color.name || `Color ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                

                  {/* Bulk Pricing Preview */}
                  {/* {firstTier && (
                    <div className="bg-orange-50 rounded-lg p-3 mb-4 border border-orange-100 max-w-xs">
                      <p className="text-xs text-[#E39A65] font-medium mb-1">Bulk pricing:</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{firstTier.range || 'Bulk'} pcs</span>
                        <span className="font-semibold text-[#E39A65]">
                          ${formatPrice(firstTier.price)}/pc
                        </span>
                      </div>
                    </div>
                  )} */}
                </div>

                {/* View Details Button */}
               <div className="flex w-full gap-4">
  {/* Bulk Pricing - Takes half width */}
  <div className="flex-1">
    {firstTier && (
      <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 h-full flex flex-col justify-center">
        <p className="text-xs text-[#E39A65] font-medium mb-1">Bulk pricing:</p>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">{firstTier.range || 'Bulk'} pcs</span>
          <span className="font-semibold text-[#E39A65]">
            ${formatPrice(firstTier.price)}/pc
          </span>
        </div>
      </div>
    )}
  </div>

  {/* View Details Button - Takes half width */}
  <div className="flex-1">
    <span className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-[#E39A65] transition-colors duration-300 h-full">
      View Full Details
      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </span>
  </div>
</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <Link href="/" className="hover:text-[#E39A65] transition-colors">Home</Link>
              <span>•</span>
              <span className="text-white">Products</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              All Products
            </h1>
            <p className="text-lg text-gray-300">
              Browse our complete collection of {totalProducts}+ wholesale products
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          {/* Header with Search and View Toggle */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search Bar */}
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65]/20 focus:border-[#E39A65] outline-none transition bg-white shadow-sm"
                  />
                  {filters.search && (
                    <button
                      onClick={() => handleFilterChange('search', '')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort and View Toggle */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="md:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Filters</span>
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-[#E39A65] text-white text-xs rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>

                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#E39A65]/20 focus:border-[#E39A65] outline-none transition shadow-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>

                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-[#E39A65] text-white' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-[#E39A65] text-white' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    title="List View"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Filters */}
            <div className="hidden md:block md:w-80 flex-shrink-0">
              <FilterSidebar />
            </div>

            {/* Products Grid/List */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-4 flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{products.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{totalProducts}</span> products
                </p>
                {getActiveFilterCount() > 0 && (
                  <p className="text-sm text-[#E39A65] font-medium">
                    {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied
                  </p>
                )}
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
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-gray-500 mb-4">No products found</p>
                      <button
                        onClick={clearFilters}
                        className="px-6 py-2.5 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <>
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {products.map(product => (
                            <ProductGridCard key={product._id} product={product} />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-6">
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
                            className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
                          >
                            <ChevronLeft className="w-5 h-5" />
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
                                  className={`w-10 h-10 rounded-lg font-medium transition-colors shadow-sm ${
                                    currentPage === pageNum
                                      ? 'bg-[#E39A65] text-white'
                                      : 'bg-white border border-gray-200 hover:bg-gray-50'
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
                            className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar />
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-[#E39A65] text-white rounded-lg font-medium hover:bg-[#d48b54] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}