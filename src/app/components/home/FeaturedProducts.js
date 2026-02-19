'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState({}); // Track active image index for each product

  // Fetch products from DB
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch featured products from your API
      const response = await fetch('http://localhost:5000/api/products?limit=4&sort=-createdAt');
      const data = await response.json();
      
      if (data.success) {
        // Ensure each product has a unique key and initialize active image index
        const productsWithKeys = data.data.map(product => ({
          ...product,
          key: product._id?.toString() || `product-${Math.random()}`
        }));
        setProducts(productsWithKeys);
        
        // Initialize active image index for each product (default to 0)
        const initialActiveIndex = {};
        data.data.forEach(product => {
          if (product._id) {
            initialActiveIndex[product._id] = 0;
          }
        });
        setActiveImageIndex(initialActiveIndex);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get first pricing tier
  const getFirstPricingTier = (pricingTiers) => {
    if (!pricingTiers || pricingTiers.length === 0) return null;
    return pricingTiers[0];
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  // Helper function to truncate text
  const truncateText = (text, limit = 30) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  // Handle image hover
  const handleImageHover = (productId, imageIndex) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [productId]: imageIndex
    }));
  };

  // Reset to first image when mouse leaves the thumbnail area
  const handleMouseLeave = (productId) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [productId]: 0
    }));
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-[#E39A65] font-semibold text-sm uppercase tracking-wider">
              Shop Wholesale
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Featured Bulk Items
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Best-selling products with tiered pricing
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-[#E39A65] font-semibold text-sm uppercase tracking-wider">
              Shop Wholesale
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Featured Bulk Items
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No products available at the moment
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#E39A65] font-semibold text-sm uppercase tracking-wider">
            Shop Wholesale
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Featured Bulk Items
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Best-selling products with tiered pricing
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products && products.map((product) => {
            const firstTier = getFirstPricingTier(product.quantityBasedPricing);
            const productImages = product.images || [];
            const activeIndex = activeImageIndex[product._id] || 0;
            const hasMultipleImages = productImages.length > 1;
            
            // Ensure we have a valid key
            const productKey = product._id?.toString() || product.key || `product-${Math.random()}`;
            
            return (
              <div
                key={productKey}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={productImages[activeIndex]?.url || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
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

                  {/* Targeted Customer Badge (Optional) */}
                  {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
                   <span className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
  {product.targetedCustomer?.charAt(0).toUpperCase() + product.targetedCustomer?.slice(1).toLowerCase()}
</span>
                  )}

                  {/* Image Counter Badge (if multiple images) */}
                  {/* {hasMultipleImages && (
                    <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      {activeIndex + 1}/{productImages.length}
                    </span>
                  )} */}
                </div>

                {/* Thumbnail Gallery - Centered */}
                {hasMultipleImages && (
                  <div 
                    className="flex justify-center gap-1 py-3 px-2 bg-gray-50 border-t border-gray-100"
                    onMouseLeave={() => handleMouseLeave(product._id)}
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
                  <Link
                    href={`/products/${product._id || '#'}`}
                    className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-[#E39A65] transition-colors duration-300"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center text-[#E39A65] font-semibold hover:text-[#d48b54] transition-colors group"
          >
            Browse All Products
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}