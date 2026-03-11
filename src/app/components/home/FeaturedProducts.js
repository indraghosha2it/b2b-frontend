'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Loader2, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Flame, 
  Tag, 
  Zap, 
  Crown, 
  Sun, 
  Snowflake, 
  Star, 
  ChevronRight, 
  Users, 
  ChevronDown, 
  ChevronUp,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define your 8 tags
const TAGS = [
  { id: 'all', name: 'All Products', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'Top Ranking', name: 'Top Ranking', icon: <Crown className="w-4 h-4" /> },
  { id: 'New Arrival', name: 'New Arrival', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'Trending', name: 'Trending', icon: <Flame className="w-4 h-4" /> },
  { id: 'Top Deal', name: 'Top Deal', icon: <Zap className="w-4 h-4" /> },
  { id: 'Limited Edition', name: 'Limited', icon: <Star className="w-4 h-4" /> },
  { id: 'Summer Collection', name: 'Summer', icon: <Sun className="w-4 h-4" /> },
  { id: 'Winter Collection', name: 'Winter', icon: <Snowflake className="w-4 h-4" /> },
  { id: 'Best Seller', name: 'Best Seller', icon: <Award className="w-4 h-4" /> },
];

// Professional tag styling for badges
const getTagStyles = (tag) => {
  const styles = {
    'Top Ranking': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20',
    'New Arrival': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20',
    'Top Deal': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/20',
    'Best Seller': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20',
    'Summer Collection': 'bg-gradient-to-r from-yellow-500 to-orange-400 text-white shadow-lg shadow-yellow-500/20',
    'Winter Collection': 'bg-gradient-to-r from-indigo-500 to-blue-400 text-white shadow-lg shadow-indigo-500/20',
    'Limited Edition': 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/20',
    'Trending': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20',
  };
  return styles[tag] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
};

// Helper for targeted audience badge styling
const getTargetedAudienceStyle = (audience) => {
  const styles = {
    'ladies': 'bg-gradient-to-r from-pink-400 to-rose-400 text-white',
    'gents': 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white',
    'kids': 'bg-gradient-to-r from-green-400 to-emerald-400 text-white',
    'unisex': 'bg-gradient-to-r from-purple-400 to-violet-400 text-white',
  };
  return styles[audience] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('all');
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 products initially
  const [isExpanding, setIsExpanding] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);

  // Fetch featured products from DB
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when active tag changes
  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.tags && product.tags.includes(activeTag)
      );
      setFilteredProducts(filtered);
    }
    setVisibleCount(5); // Reset to 5 when changing tabs
  }, [activeTag, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?isFeatured=true&limit=20&sort=-createdAt');
      const data = await response.json();
      
      if (data.success) {
        const productsWithKeys = data.data.map(product => ({
          ...product,
          key: product._id?.toString() || `product-${Math.random()}`
        }));
        setProducts(productsWithKeys);
        setFilteredProducts(productsWithKeys);
        
        const initialActiveIndex = {};
        data.data.forEach(product => {
          if (product._id) {
            initialActiveIndex[product._id] = 0;
          }
        });
        setActiveImageIndex(initialActiveIndex);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getFirstPricingTier = (pricingTiers) => {
    if (!pricingTiers || pricingTiers.length === 0) return null;
    return pricingTiers[0];
  };

  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  const truncateText = (text, limit = 25) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  // Image hover handlers
  const handleImageHover = (productId, imageIndex) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: imageIndex }));
  };

  const handleMouseLeave = (productId) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };

  // Show more products
  const handleShowMore = () => {
    setIsExpanding(true);
    setVisibleCount(prev => Math.min(prev + 5, filteredProducts.length));
    setTimeout(() => setIsExpanding(false), 500);
  };

  // Show less products
  const handleShowLess = () => {
    setIsCollapsing(true);
    setVisibleCount(prev => Math.max(5, prev - 5));
    setTimeout(() => setIsCollapsing(false), 500);
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const hasLess = visibleCount > 5;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  if (loading) {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center gap-2 bg-[#E39A65]/10 px-4 py-2 rounded-full mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#E39A65]" />
              <span className="text-[#E39A65] font-medium text-sm uppercase tracking-wider">
                Curated Selection
              </span>
            </motion.div>
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              Featured Collections
            </motion.h2>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Discover our hand-picked premium products
            </motion.p>
          </div>
          <div className="flex justify-center items-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-8 h-8 text-[#E39A65]" />
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header with Animations */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center gap-2 bg-[#E39A65]/10 px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#E39A65]" />
            <span className="text-[#E39A65] font-medium text-sm uppercase tracking-wider">
              Curated Selection
            </span>
          </motion.div>
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            Featured Collections
          </motion.h2>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Browse by category to find exactly what you need
          </motion.p>
        </div>

        {/* Modern Pill Tabs Design with Animations */}
        <div className="mb-10">
          {/* Scrollable Tabs Container */}
          <div className="relative">
            {/* Gradient fade for scroll indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none md:hidden" />
            
            {/* Tabs */}
            <div className="overflow-x-auto pb-4 hide-scrollbar">
              <motion.div 
                className="flex gap-2 min-w-max md:justify-center px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {TAGS.map((tag, index) => {
                  const isActive = activeTag === tag.id;
                  const productCount = tag.id === 'all' 
                    ? products.length 
                    : products.filter(p => p.tags?.includes(tag.id)).length;
                  
                  return (
                    <motion.button
                      key={tag.id}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTag(tag.id)}
                      className={`
                        relative group flex items-center gap-2 px-5 py-3 rounded-full
                        transition-all duration-300 whitespace-nowrap
                        ${isActive 
                          ? 'bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white shadow-lg shadow-amber-500/20' 
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80'
                        }
                      `}
                    >
                      {/* Icon */}
                      <motion.span
                        animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                        className={`
                          transition-colors duration-300
                          ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}
                        `}
                      >
                        {tag.icon}
                      </motion.span>
                      
                      {/* Name */}
                      <span className="font-medium text-sm">{tag.name}</span>
                      
                      {/* Count Badge */}
                      {productCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className={`
                            ml-1 px-2 py-0.5 rounded-full text-xs font-medium
                            ${isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                            }
                          `}
                        >
                          {productCount}
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Active Category Indicator with Animation */}
          <motion.div 
            className="flex justify-center mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <span className="text-xs text-gray-500">Showing:</span>
              <motion.span 
                key={activeTag}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-xs font-semibold text-gray-900"
              >
                {TAGS.find(t => t.id === activeTag)?.name}
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Products Grid - 5 per row with Animations */}
        {filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 bg-white rounded-2xl border border-gray-200"
          >
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4"
            >
              <Tag className="w-8 h-8 text-gray-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">No products available with this tag</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTag('all')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
            >
              View all products
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait">
                {visibleProducts.map((product) => {
                  const firstTier = getFirstPricingTier(product.quantityBasedPricing);
                  const productImages = product.images || [];
                  const activeIndex = activeImageIndex[product._id] || 0;
                  const hasMultipleImages = productImages.length > 1;
                  const primaryTag = product.tags?.[0];
                  const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';
                  const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';
                  
                  return (
                    <motion.div
                      key={product._id}
                      variants={itemVariants}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        layout: { type: "spring", stiffness: 100, damping: 15 },
                        opacity: { duration: 0.3 }
                      }}
                      whileHover={{ 
                        y: -8,
                        transition: { type: "spring", stiffness: 300, damping: 15 }
                      }}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100/80 hover:border-[#E39A65]/20"
                    >
                      {/* Image Container */}
                      <div className="relative h-40 overflow-hidden bg-gray-100">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                          whileHover={{ opacity: 1 }}
                        />
                        
                        <motion.img
                          src={productImages[activeIndex]?.url || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
                          }}
                        />
                        
                        {/* TOP LEFT - Category Badge */}
                        <motion.span 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-gray-900 text-[8px] px-1.5 py-0.5 rounded-full font-medium shadow-lg z-20"
                        >
                          {product.category?.name || 'Uncategorized'}
                        </motion.span>
                        
                        {/* TOP RIGHT - Tag Badge */}
                        {primaryTag && (
                          <motion.span 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`absolute top-2 right-2 ${tagStyle} text-[8px] px-1.5 py-0.5 rounded-full font-medium shadow-lg z-20 flex items-center gap-0.5`}
                          >
                            {primaryTag === 'Top Ranking' && <Crown className="w-2 h-2" />}
                            {primaryTag === 'New Arrival' && <Sparkles className="w-2 h-2" />}
                            {primaryTag === 'Top Deal' && <Zap className="w-2 h-2" />}
                            {primaryTag === 'Best Seller' && <Award className="w-2 h-2" />}
                            {primaryTag === 'Summer Collection' && <Sun className="w-2 h-2" />}
                            {primaryTag === 'Winter Collection' && <Snowflake className="w-2 h-2" />}
                            {primaryTag === 'Limited Edition' && <Star className="w-2 h-2" />}
                            {primaryTag === 'Trending' && <Flame className="w-2 h-2" />}
                            <span className="max-w-[40px] truncate">{primaryTag}</span>
                          </motion.span>
                        )}

                        {/* BOTTOM LEFT - Targeted Audience Badge */}
                        {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
                          <motion.span 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className={`absolute bottom-2 left-2 ${audienceStyle} text-[8px] px-1.5 py-0.5 rounded-full font-medium shadow-lg z-20 flex items-center gap-0.5`}
                          >
                            <Users className="w-2 h-2" />
                            {product.targetedCustomer?.charAt(0).toUpperCase() + product.targetedCustomer?.slice(1).toLowerCase()}
                          </motion.span>
                        )}

                        {/* BOTTOM RIGHT - MOQ Badge */}
                        <motion.span 
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute bottom-2 right-2 bg-gray-900/95 backdrop-blur-sm text-white text-[8px] px-1.5 py-0.5 rounded-full font-medium shadow-lg z-20"
                        >
                          MOQ: {product.moq || 0}
                        </motion.span>
                      </div>
                      {/* Thumbnail Gallery */}
                      {hasMultipleImages && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="flex justify-center gap-2 py-1.5 px-1 bg-gray-50/80 border-t border-gray-100"
                          onMouseLeave={() => handleMouseLeave(product._id)}
                        >
                          {productImages.slice(0, 4).map((image, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={`relative w-8 h-8 rounded-md overflow-hidden transition-all duration-300 ${
                                activeIndex === index 
                                  ? 'ring-1 ring-[#E39A65] ring-offset-1 scale-110 shadow-md' 
                                  : 'opacity-60 hover:opacity-100'
                              }`}
                              onMouseEnter={() => handleImageHover(product._id, index)}
                            >
                              <img
                                src={image.url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </motion.button>
                          ))}
                        </motion.div>
                      )}

                      {/* Content */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="p-3"
                      >
                        {/* Title and Price in same row */}
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 flex-1" title={product.productName}>
                            {truncateText(product.productName, 30)}
                          </h3>
                          <div className="flex-shrink-0 text-right">
                            <span className="text-base font-bold text-[#E39A65]">
                              ${formatPrice(product.pricePerUnit)}
                            </span>
                            <span className="text-gray-500 text-[8px] ml-1">/pc</span>
                          </div>
                        </div>

                        {/* Color Dots */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-1 mb-1.5">
                            {product.colors.slice(0, 3).map((color, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ scale: 1.2 }}
                                className="w-3 h-3 rounded-full border border-white shadow-sm"
                                style={{ backgroundColor: color.code }}
                                title={color.name || color.code}
                              />
                            ))}
                            {product.colors.length > 3 && (
                              <span className="text-[6px] text-gray-400">+{product.colors.length - 3}</span>
                            )}
                          </div>
                        )}

                        {/* Bulk Price */}
                        {firstTier && (
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-1.5 mb-1.5 border border-orange-100/80"
                          >
                            <div className="flex justify-between items-center text-[8px]">
                              <span className="text-gray-600 font-medium">{firstTier.range || 'Bulk'}</span>
                              <span className="font-bold text-[#E39A65]">${formatPrice(firstTier.price)}</span>
                            </div>
                          </motion.div>
                        )}

                        {/* View Details Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={`/productDetails?id=${product._id}`}
                            className="block w-full text-center bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white py-1.5 rounded-lg text-[10px] font-medium hover:opacity-90 transition-all duration-300 hover:shadow-md relative overflow-hidden"
                          >
                            View Details
                          </Link>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Show More/Less Buttons with Animations */}
            <div className="flex justify-center gap-4 mt-10">
              {hasMore && (
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleShowMore}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E39A65] to-[#d7691b] text-white shadow-lg shadow-amber-500/20 font-medium rounded-xl transition-all duration-300"
                >
                  <motion.span
                    animate={isExpanding ? { y: [0, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    Show More Products
                  </motion.span>
                  <motion.div
                    animate={isExpanding ? { y: [0, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              )}
              
              {hasLess && (
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleShowLess}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200 shadow-lg"
                >
                  <motion.span
                    animate={isCollapsing ? { y: [0, -5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    Show Less
                  </motion.span>
                  <motion.div
                    animate={isCollapsing ? { y: [0, -5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              )}
            </div>

            {/* Results Counter with Animation */}
            <motion.div 
              className="text-center mt-4 text-xs text-gray-500"
              key={visibleCount}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Showing {visibleCount} of {filteredProducts.length} products
            </motion.div>
          </>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.section>
  );
}