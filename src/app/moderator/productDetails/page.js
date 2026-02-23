'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft,
  Edit,
  Package,
  DollarSign,
  Palette,
  Ruler,
  Users,
  Info,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  ChevronRight,
  Copy,
  Check,
  Maximize2,
  X,
  Clock,
  User,
  Mail,
  Building2,
  Truck,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

// Helper function to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to capitalize first letter
const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to truncate text
const truncateText = (text, limit = 30) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

// Loading Skeleton Component
const ProductDetailsSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 max-w-7xl py-8">
      <div className="h-4 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="flex gap-4">
            <div className="w-20 space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-200 rounded-lg h-20 animate-pulse"></div>
              ))}
            </div>
            <div className="flex-1 bg-gray-200 rounded-2xl h-[500px] animate-pulse"></div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Image Gallery Component
const ImageGallery = ({ images = [], productName }) => {
  const [mainImage, setMainImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 rounded-2xl h-[500px] flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="w-20 space-y-2">
        {images.slice(0, 4).map((image, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(idx)}
            onMouseEnter={() => setMainImage(idx)}
            className={`relative w-full h-20 rounded-lg overflow-hidden border-2 transition-all ${
              mainImage === idx 
                ? 'border-[#E39A65] shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image.url}
              alt={`${productName} - Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            {mainImage === idx && (
              <div className="absolute inset-0 bg-[#E39A65]/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#E39A65]" />
              </div>
            )}
          </button>
        ))}
        {images.length > 4 && (
          <div className="w-full h-20 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
            +{images.length - 4}
          </div>
        )}
      </div>

      <div 
        className="flex-1 relative bg-gray-100 rounded-2xl overflow-hidden group cursor-zoom-in"
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[mainImage]?.url || images[0]?.url}
          alt={`${productName} - Main view`}
          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-150"
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
          }}
        />
        
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Maximize2 className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
          <button
            onClick={() => setMainImage(prev => Math.max(0, prev - 1))}
            disabled={mainImage === 0}
            className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <img
            src={images[mainImage]?.url}
            alt={productName}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
          <button
            onClick={() => setMainImage(prev => Math.min(images.length - 1, prev + 1))}
            disabled={mainImage === images.length - 1}
            className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
            {mainImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

// Bulk Pricing Table Component
const BulkPricingTable = ({ pricing = [], unitPrice, moq }) => {
  const pricingData = pricing.length > 0 ? pricing : [{ range: `${moq}+`, price: unitPrice }];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Bulk Pricing</h3>
      </div>
      <div className="p-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantity Range</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price Per Unit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pricingData.map((tier, index) => {
              const tierPrice = tier.price || unitPrice;

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{tier.range || `${moq}+`}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#E39A65]">{formatPrice(tierPrice)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Colors Display Component
const ColorsDisplay = ({ colors }) => {
  if (!colors || colors.length === 0) {
    return <p className="text-gray-500 text-sm">No colors available</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color, index) => (
        <div
          key={index}
          className="relative group"
          title={color.name || color.code}
        >
          <div
            className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-110"
            style={{ backgroundColor: color.code }}
          />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {color.name || color.code}
          </span>
        </div>
      ))}
    </div>
  );
};

// Sizes Display Component
const SizesDisplay = ({ sizes }) => {
  const validSizes = sizes?.filter(s => s && s.trim() !== '') || [];
  
  if (validSizes.length === 0) {
    return <p className="text-gray-500 text-sm">No sizes available</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {validSizes.map((size, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
        >
          {size}
        </span>
      ))}
    </div>
  );
};

// Additional Info Display Component
const AdditionalInfoDisplay = ({ additionalInfo }) => {
  if (!additionalInfo || additionalInfo.length === 0) {
    return <p className="text-gray-500 text-sm">No additional information available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {additionalInfo.map((info, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">{info.fieldName}</p>
          <p className="text-sm font-medium text-gray-900">{info.fieldValue}</p>
        </div>
      ))}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ isActive }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
    isActive 
      ? 'bg-green-100 text-green-700' 
      : 'bg-red-100 text-red-700'
  }`}>
    {isActive ? (
      <>
        <CheckCircle className="w-3.5 h-3.5" />
        Active
      </>
    ) : (
      <>
        <XCircle className="w-3.5 h-3.5" />
        Inactive
      </>
    )}
  </span>
);

// Key Attributes Component
const KeyAttributes = ({ product }) => {
  const attributes = [
    { label: 'MOQ', value: `${product.moq} pieces` },
    { label: 'Fabric', value: product.fabric || 'Standard' },
    { label: 'Target Audience', value: capitalizeFirst(product.targetedCustomer || 'Unisex') },
    { label: 'Category', value: product.category?.name || 'Uncategorized' },
    ...(product.additionalInfo || []).map(info => ({
      label: info.fieldName,
      value: info.fieldValue
    }))
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Key Attributes</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {attributes.map((attr, index) => (
            <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
              <p className="text-sm text-gray-500 mb-1">{attr.label}</p>
              <p className="text-sm font-medium text-gray-900">{attr.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Description Component
const Description = ({ product }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
      </div>
      <div className="p-6">
        <div 
          className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: product.description || 'No description available.' 
          }}
        />
      </div>
    </div>
  );
};

// Shipping Info Component
const ShippingInfo = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Shipping Information</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Truck className="w-6 h-6 text-[#E39A65] flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Global Shipping Available</h4>
              <p className="text-sm text-gray-600">
                We ship worldwide with reliable carriers. Shipping costs calculated based on destination and order volume.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Clock className="w-6 h-6 text-[#E39A65] flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Estimated Delivery Time</h4>
              <p className="text-sm text-gray-600">
                Domestic: 3-5 business days<br />
                International: 7-15 business days
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Package className="w-6 h-6 text-[#E39A65] flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Bulk Order Shipping</h4>
              <p className="text-sm text-gray-600">
                Special shipping rates available for bulk orders. Contact us for a customized quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function ModeratorProductDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');
  const [activeTab, setActiveTab] = useState('attributes');

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
      } else {
        toast.error('Product not found');
        router.push('/moderator/allProducts');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/moderator/editProduct?id=${productId}`);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(product._id);
    setCopySuccess('ID copied!');
    setTimeout(() => setCopySuccess(''), 2000);
    toast.success('Product ID copied to clipboard');
  };

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/moderator/allProducts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/moderator/allProducts" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900" title={product.productName}>
                    {truncateText(product.productName, 30)}
                  </h1>
                  <StatusBadge isActive={product.isActive} />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-500">
                    ID: {product._id}
                  </p>
                  <button
                    onClick={handleCopyId}
                    className="p-1 hover:bg-gray-100 rounded transition-colors relative group"
                    title="Copy ID"
                  >
                    <Copy className="w-3.5 h-3.5 text-gray-400" />
                    {copySuccess && (
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
                        {copySuccess}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Edit className="w-4 h-4" />
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Breadcrumb */}
       <div className="mb-6">
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <Link href="/moderator/dashboard" className="hover:text-[#E39A65] transition-colors">Dashboard</Link>
    <span>/</span>
    <Link href="/moderator/allProducts" className="hover:text-[#E39A65] transition-colors">All Products</Link>
    <span>/</span>
    <span className="text-gray-900 font-medium max-w-[200px] truncate" title={product.productName}>
      {product.productName}
    </span>
  </div>
</div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <ImageGallery images={product.images} productName={product.productName} />
              
              {/* Colors and Sizes directly below image */}
              <div className="mt-6 space-y-6">
                {/* Colors */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#E39A65]" />
                    Colors
                  </h3>
                  <ColorsDisplay colors={product.colors} />
                </div>

                {/* Sizes */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-[#E39A65]" />
                    Sizes
                  </h3>
                  <SizesDisplay sizes={product.sizes} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Product Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#E39A65] text-white text-sm rounded-full">
                    {product.category?.name || 'Uncategorized'}
                  </span>
                  {product.targetedCustomer && product.targetedCustomer !== 'unisex' && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {capitalizeFirst(product.targetedCustomer)}
                    </span>
                  )}
                </div>
                
                {/* Full Product Name */}
                <h1 className="text-2xl font-bold text-gray-900 mb-3" title={product.productName}>
                  {product.productName}
                </h1>
                
                {/* Product Description */}
                {product.description && (
                  <div 
                    className="text-gray-600 text-sm mb-4 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: product.description || 'No description available.' 
                    }}
                  />
                )}
              </div>

              <div className="flex items-baseline justify-between p-4 bg-orange-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">Price Per Unit</span>
                  <div className="text-3xl font-bold text-[#E39A65]">
                    {formatPrice(product.pricePerUnit)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">MOQ</span>
                  <div className="text-xl font-semibold text-gray-900">{product.moq} pieces</div>
                </div>
              </div>

              {/* Fabric Detail */}
              {product.fabric && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Fabric: </span>
                  <span className="text-sm text-gray-600">{product.fabric}</span>
                </div>
              )}

              {/* Timestamps */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Created
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatDate(product.createdAt)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    Last Updated
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatDate(product.updatedAt)}</p>
                </div>
              </div>

            </div>

            {/* Bulk Pricing */}
            <BulkPricingTable 
              pricing={product.quantityBasedPricing} 
              unitPrice={product.pricePerUnit}
              moq={product.moq}
            />

            {/* Additional Information */}
            {product.additionalInfo && product.additionalInfo.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#E39A65]" />
                  Additional Information
                </h3>
                <AdditionalInfoDisplay additionalInfo={product.additionalInfo} />
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section at Bottom */}
        <div className="mt-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab('attributes')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'attributes'
                    ? 'border-[#E39A65] text-[#E39A65]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Key Attributes
              </button>
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'description'
                    ? 'border-[#E39A65] text-[#E39A65]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'pricing'
                    ? 'border-[#E39A65] text-[#E39A65]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Bulk Pricing
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'shipping'
                    ? 'border-[#E39A65] text-[#E39A65]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Shipping Info
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'attributes' && <KeyAttributes product={product} />}
            {activeTab === 'description' && <Description product={product} />}
            {activeTab === 'pricing' && (
              <BulkPricingTable 
                pricing={product.quantityBasedPricing} 
                unitPrice={product.pricePerUnit}
                moq={product.moq}
              />
            )}
            {activeTab === 'shipping' && <ShippingInfo />}
          </div>
        </div>
      </div>
    </div>
  );
}