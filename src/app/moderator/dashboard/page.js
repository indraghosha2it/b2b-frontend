'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  Users,
  Eye,
  ArrowRight,
  RefreshCw,
  Loader2,
  Calendar,
  MessageCircle,
  PieChart,
  CreditCard,
  PlusCircle,
  FileOutput,
  Download,
  Mail,
  Phone,
  Building2,
  User,
  MapPin,
  Filter,
  Search,
  AlertTriangle,
  CheckSquare,
  XSquare,
  Inbox,
  Send,
  Settings,
  Star,
  Award,
  Target,
  Zap,
  Shield,
  Truck,
  Globe,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Layers,
  UploadCloud,
  Link as LinkIcon,
  ExternalLink,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Tag,
  Grid,
  List,
  Plus,
  Filter as FilterIcon,
  BarChart3,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';

// ==================== HELPER FUNCTIONS ====================

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
};

const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};

// Get month name
const getMonthName = (monthIndex) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
};

// ==================== STATUS BADGES ====================

const InquiryStatusBadge = ({ status }) => {
  const config = {
    submitted: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Submitted', dot: 'bg-amber-500' },
    quoted: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Quoted', dot: 'bg-blue-500' },
    accepted: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Accepted', dot: 'bg-emerald-500' },
    invoiced: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Invoiced', dot: 'bg-purple-500' },
    paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid', dot: 'bg-green-500' },
    cancelled: { bg: 'bg-rose-100', text: 'text-rose-700', label: 'Cancelled', dot: 'bg-rose-500' }
  };

  const statusKey = status?.toLowerCase() || 'submitted';
  const { bg, text, label, dot } = config[statusKey] || config.submitted;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
      <span className={`text-xs font-medium ${text}`}>{label}</span>
    </div>
  );
};

// ==================== STAT CARD COMPONENT ====================

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue', 
  subtitle,
  onClick,
  link,
  loading = false
}) => {
  const colors = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50',
      iconBg: 'bg-blue-500',
      iconColor: 'text-white',
      border: 'border-blue-200',
      text: 'text-blue-700'
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
      iconBg: 'bg-emerald-500',
      iconColor: 'text-white',
      border: 'border-emerald-200',
      text: 'text-emerald-700'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50',
      iconBg: 'bg-amber-500',
      iconColor: 'text-white',
      border: 'border-amber-200',
      text: 'text-amber-700'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50',
      iconBg: 'bg-purple-500',
      iconColor: 'text-white',
      border: 'border-purple-200',
      text: 'text-purple-700'
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50 to-rose-100/50',
      iconBg: 'bg-rose-500',
      iconColor: 'text-white',
      border: 'border-rose-200',
      text: 'text-rose-700'
    }
  };

  const theme = colors[color] || colors.blue;

  const CardWrapper = ({ children }) => {
    if (link) {
      return (
        <Link href={link} className="block cursor-pointer h-full">
          {children}
        </Link>
      );
    }
    if (onClick) {
      return (
        <button onClick={onClick} className="w-full text-left cursor-pointer h-full">
          {children}
        </button>
      );
    }
    return <div className="h-full">{children}</div>;
  };

  return (
    <CardWrapper>
      <div className={`relative overflow-hidden rounded-2xl border ${theme.border} ${theme.bg} p-5 hover:shadow-lg transition-all duration-300 group h-full flex flex-col ${(link || onClick) ? 'hover:scale-[1.02]' : ''}`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${theme.iconBg} shadow-lg shadow-${color}-500/20`}>
              <Icon className={`w-4 h-4 ${theme.iconColor}`} />
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-2 flex-1">
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
              <p className={`text-xs font-medium ${theme.text} uppercase tracking-wider`}>{title}</p>
              {subtitle && <p className="text-[10px] text-gray-400 mt-2">{subtitle}</p>}
            </>
          )}
        </div>

        {(link || onClick) && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

// ==================== QUICK ACTION CARD ====================

const QuickActionCard = ({ title, icon: Icon, description, href, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
    emerald: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-50 hover:bg-amber-100 text-amber-600',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
    rose: 'bg-rose-50 hover:bg-rose-100 text-rose-600'
  };

  return (
    <Link href={href} className="block">
      <div className={`flex items-center gap-3 p-3 rounded-xl ${colors[color]} transition-all duration-200 hover:shadow-md`}>
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 truncate">{description}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400" />
      </div>
    </Link>
  );
};

// ==================== PRODUCT CARD ====================

const ProductCard = ({ product, onEdit }) => {
  const getProductName = () => {
    return product.productName || 'Unnamed Product';
  };

  const getProductCategory = () => {
    if (product.category && typeof product.category === 'object') {
      return product.category.name || 'Uncategorized';
    }
    return 'Uncategorized';
  };

  const getProductImage = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url || product.images[0];
    }
    return null;
  };

  const getProductPrice = () => {
    return product.pricePerUnit || 0;
  };

  const getProductMOQ = () => {
    return product.moq || 100;
  };

  const productName = getProductName();
  const productCategory = getProductCategory();
  const productImage = getProductImage();
  const productPrice = getProductPrice();
  const productMOQ = getProductMOQ();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="aspect-square bg-gray-100 relative">
        {productImage ? (
          <img 
            src={productImage} 
            alt={productName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/200?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate" title={productName}>
          {productName}
        </h3>
        <p className="text-xs text-gray-500 mt-1 truncate" title={productCategory}>
          {productCategory}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="font-semibold text-[#E39A65]">{formatPrice(productPrice)}</p>
          </div>
          <p className="text-xs text-gray-500">MOQ: {productMOQ} pcs</p>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Edit className="w-3 h-3" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== INQUIRY CARD (MODERATOR VIEW) ====================

const ModeratorInquiryCard = ({ inquiry }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getCompanyName = () => {
    return inquiry.userDetails?.companyName || 
           inquiry.customer?.companyName || 
           'N/A';
  };

  const getContactPerson = () => {
    return inquiry.userDetails?.contactPerson || 
           inquiry.customer?.contactPerson || 
           'N/A';
  };

  const getWhatsApp = () => {
    return inquiry.userDetails?.whatsapp || 
           inquiry.customer?.whatsapp || 
           null;
  };

  const getItems = () => {
    return inquiry.items || [];
  };

  const getTotalQuantity = () => {
    if (inquiry.totalQuantity) return inquiry.totalQuantity;
    const items = getItems();
    return items.reduce((sum, item) => sum + (item.totalQuantity || 0), 0);
  };

  const getSubtotal = () => {
    return inquiry.subtotal || 0;
  };

  const items = getItems();
  const totalQuantity = getTotalQuantity();
  const subtotal = getSubtotal();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center shadow-md">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{inquiry.inquiryNumber || 'N/A'}</h3>
                <InquiryStatusBadge status={inquiry.status} />
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                <span>{formatDate(inquiry.createdAt)}</span>
                <span>•</span>
                <span>{items.length} products</span>
                <span>•</span>
                <span>{totalQuantity} pcs</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Building2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{getCompanyName()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{getContactPerson()}</span>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="p-4 border-b border-gray-100 bg-gray-50/30">
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Products</h4>
            <div className="space-y-2">
              {items.map((product, idx) => (
                <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
                  <p className="text-xs font-medium text-gray-900">
                    {product.productName || 'Product'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Quantity: {product.totalQuantity || 0} pcs
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-4 py-2 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-4 text-xs">
          <span className="text-gray-500">Total Value:</span>
          <span className="font-semibold text-[#E39A65]">{formatPrice(subtotal)}</span>
        </div>
        
        {getWhatsApp() && (
          <button
            onClick={() => window.open(`https://wa.me/${getWhatsApp().replace(/[^0-9+]/g, '')}`, '_blank')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Customer
          </button>
        )}
      </div>
    </div>
  );
};

// ==================== MAIN MODERATOR DASHBOARD ====================

export default function ModeratorDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Date filter state
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterType, setFilterType] = useState('month'); // Default to current month
  
  // Data states
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInquiries: 0,
    pendingQuotations: 0,
    pendingInvoices: 0,
    submitted: 0,
    quoted: 0,
    accepted: 0,
    invoiced: 0,
    cancelled: 0
  });

  const router = useRouter();



// In your fetchDashboardData function, update the stats calculations:
const fetchDashboardData = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Build URL with date filters for inquiries - REMOVE the limit to get ALL data for counts
    // But keep limit for recent inquiries display
    let statsUrl = `http://localhost:5000/api/moderator/inquiries?limit=1000`; // Get more for accurate counts
    let recentUrl = `http://localhost:5000/api/moderator/inquiries?limit=10`; // For display only
    
    if (filterType === 'month') {
      const startDate = new Date(selectedYear, selectedMonth, 1);
      const endDate = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59);
      const dateParam = `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      statsUrl += dateParam;
      recentUrl += dateParam;
    } else if (filterType === 'year') {
      const startDate = new Date(selectedYear, 0, 1);
      const endDate = new Date(selectedYear, 11, 31, 23, 59, 59);
      const dateParam = `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      statsUrl += dateParam;
      recentUrl += dateParam;
    }

    // Fetch ALL inquiries for stats (with higher limit to get all)
    const statsResponse = await fetch(statsUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const statsData = await statsResponse.json();
    
    // Fetch recent inquiries for display (only 10)
    const recentResponse = await fetch(recentUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const recentData = await recentResponse.json();
    
    // Fetch ALL products (including inactive) - NO LIMIT to get all products
    const productsResponse = await fetch('http://localhost:5000/api/products?limit=1000&includeInactive=true', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const productsData = await productsResponse.json();
    console.log('Products API Response:', productsData);

    // Process stats data - USE PAGINATION TOTAL FOR ACCURATE COUNTS
    if (statsData.success) {
      // Get the TOTAL count from pagination, not just the returned list length
      const totalInquiries = statsData.data?.pagination?.total || 0;
      
      // For status breakdown, we need the actual list to count statuses
      // But if the API returns all items, we can use the list
      const allInquiries = statsData.data?.inquiries || [];
      
      // If we have all inquiries, count directly; otherwise, we might need a separate API call
      // For now, assuming the API returns all items when limit is high enough
      const submitted = allInquiries.filter(i => i.status === 'submitted').length;
      const quoted = allInquiries.filter(i => i.status === 'quoted').length;
      const accepted = allInquiries.filter(i => i.status === 'accepted').length;
      const invoiced = allInquiries.filter(i => i.status === 'invoiced').length;
      const paid = allInquiries.filter(i => i.status === 'paid').length;
      const cancelled = allInquiries.filter(i => i.status === 'cancelled').length;

      console.log('Stats from ALL data:', {
        total: totalInquiries,
        totalFromList: allInquiries.length,
        submitted,
        quoted,
        accepted,
        invoiced,
        paid,
        cancelled
      });

      setStats(prev => ({
        ...prev,
        totalInquiries,
        pendingQuotations: submitted,
        pendingInvoices: accepted,
        submitted,
        quoted,
        accepted,
        invoiced,
        paid,
        cancelled
      }));
    }

    // Set recent inquiries for display (these are just 10 items)
    if (recentData.success) {
      const recentInquiries = recentData.data?.inquiries || [];
      setInquiries(recentInquiries);
    }

    // Process products data
    if (productsData.success) {
      // Use pagination total for accurate product count
      const totalProductsCount = productsData.pagination?.total || productsData.data?.length || 0;
      const productsList = productsData.data || [];
      
      setProducts(productsList);
      setStats(prev => ({
        ...prev,
        totalProducts: totalProductsCount
      }));

      console.log('Total products count (including inactive):', totalProductsCount);
    }

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    toast.error('Failed to load dashboard data');
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, [filterType, selectedMonth, selectedYear]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const handleMonthChange = (increment) => {
    let newMonth = selectedMonth + increment;
    let newYear = selectedYear;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear = selectedYear - 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear = selectedYear + 1;
    }
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setFilterType('month');
  };

  const handleYearChange = (increment) => {
    setSelectedYear(selectedYear + increment);
    setFilterType('year');
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
  };

const handleEditProduct = (product) => {
  router.push(`/moderator/editProduct?id=${product._id}`);
};

  const handleAddProduct = () => {
    router.push('/moderator/products/new');
  };

  const getFilterDisplayText = () => {
    if (filterType === 'all') {
      return 'All Time';
    } else if (filterType === 'year') {
      return `Year: ${selectedYear}`;
    } else {
      return `${getMonthName(selectedMonth)} ${selectedYear}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#E39A65] mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading moderator dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-10">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Moderator Dashboard</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage products and view inquiries
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Filter Type Selector */}
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleFilterTypeChange('all')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    filterType === 'all' 
                      ? 'bg-[#E39A65] text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterTypeChange('year')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    filterType === 'year' 
                      ? 'bg-[#E39A65] text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Year
                </button>
                <button
                  onClick={() => handleFilterTypeChange('month')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    filterType === 'month' 
                      ? 'bg-[#E39A65] text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Month
                </button>
              </div>

              {/* Month/Year Navigation */}
              {filterType === 'month' && (
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleMonthChange(-1)}
                    className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                    title="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border-x border-gray-200">
                    {getMonthName(selectedMonth)} {selectedYear}
                  </span>
                  <button
                    onClick={() => handleMonthChange(1)}
                    className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                    title="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {filterType === 'year' && (
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleYearChange(-1)}
                    className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                    title="Previous year"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border-x border-gray-200">
                    {selectedYear}
                  </span>
                  <button
                    onClick={() => handleYearChange(1)}
                    className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                    title="Next year"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => router.push('/moderator/settings')}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <CalendarRange className="w-3 h-3" />
            Showing data for: <span className="font-medium text-[#E39A65]">{getFilterDisplayText()}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-4">
        {/* Stats Cards */}
       {/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
  <StatCard
    title="Total Products"
    value={stats.totalProducts}
    icon={Package}
    color="blue"
    subtitle="In catalog"
    link="/moderator/products"
  />
  <StatCard
    title="Total Inquiries"
    value={stats.totalInquiries}
    icon={Inbox}
    color="purple"
    subtitle={`${filterType !== 'all' ? getFilterDisplayText() : 'All time'}`}
    link="/moderator/inquiries"
  />
  <StatCard
    title="Pending Quotations"
    value={stats.pendingQuotations}  // This is submitted count
    icon={Clock}
    color="amber"
    subtitle="Awaiting quote"
    link="/moderator/inquiries?filter=submitted"
  />
  <StatCard
    title="Quoted"
    value={stats.quoted}
    icon={FileText}
    color="blue"
    subtitle="Awaiting customer"
    link="/moderator/inquiries?filter=quoted"
  />
  <StatCard
    title="Pending Invoices"
    value={stats.pendingInvoices}  // This is accepted count
    icon={CreditCard}
    color="rose"
    subtitle="Ready to invoice"
    link="/moderator/inquiries?filter=accepted"
  />
  <StatCard
    title="Invoiced"
    value={stats.invoiced}
    icon={CheckCircle}
    color="emerald"
    subtitle="Invoices sent"
    link="/moderator/inquiries?filter=invoiced"
  />
</div>

       

        {/* Recent Products */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#E39A65]" />
              Recent Products
            </h2>
            <Link 
              href="/moderator/allProducts" 
              className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {products.slice(0, 5).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleEditProduct}
              />
            ))}
            {products.length === 0 && (
              <div className="col-span-full p-8 text-center bg-white rounded-xl border border-gray-200">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No products yet</p>
                <button
                  onClick={handleAddProduct}
                  className="mt-2 text-xs text-[#E39A65] hover:text-[#d48b54] font-medium"
                >
                  Add your first product
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#E39A65]" />
              Recent Inquiries
            </h2>
            <Link 
              href="/moderator/inquiries" 
              className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {inquiries.slice(0, 5).map((inquiry) => (
              <ModeratorInquiryCard
                key={inquiry._id}
                inquiry={inquiry}
              />
            ))}
            {inquiries.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No inquiries yet</p>
              </div>
            )}
          </div>
        </div>

         {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#E39A65]" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard
              title="Add New Product"
              description="Create product listing"
              icon={PlusCircle}
              href="/moderator/createProducts"
              color="blue"
            />
            <QuickActionCard
              title="Manage Products"
              description="Edit or update products"
              icon={Package}
              href="/moderator/allProducts"
              color="emerald"
            />
            <QuickActionCard
              title="View Inquiries"
              description="Check customer requests"
              icon={Inbox}
              href="/moderator/inquiries"
              color="amber"
            />
            <QuickActionCard
              title="Create Blog"
              description= "create blogs "
              icon={Clock}
              href="/moderator/createBlog"
              color="purple"
            />
          </div>
        </div>

      </div>
    </div>
  );
}