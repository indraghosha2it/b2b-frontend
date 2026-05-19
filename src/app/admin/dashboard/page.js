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
  Ban,
  Copy,
  MoreVertical,
  Edit,
  Trash2,
  Settings,
  Bell,
  Printer,
  Share2,
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
  Inbox,
  Send,
  DownloadCloud,
  UploadCloud,
  Link as LinkIcon,
  ExternalLink,
  CalendarDays,
  Filter as FilterIcon,
  RefreshCw as RefreshIcon,
  CalendarRange,
  ChevronLeft,
  ChevronRight
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

// Helper function to check if invoice is expired
const isInvoiceExpired = (invoice) => {
  if (invoice.paymentStatus === 'paid' || invoice.paymentStatus === 'cancelled' || invoice.paymentStatus === 'overpaid') {
    return false;
  }
  const today = new Date();
  const dueDate = new Date(invoice.dueDate);
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < today;
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

const PaymentStatusBadge = ({ status }) => {
  const config = {
    paid: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Paid', icon: CheckCircle },
    partial: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Partial', icon: TrendingUp },
    unpaid: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Unpaid', icon: AlertCircle },
    overpaid: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Overpaid', icon: TrendingDown },
    cancelled: { bg: 'bg-rose-100', text: 'text-rose-700', label: 'Cancelled', icon: XCircle },
    expired: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Expired', icon: Clock }
  };

  const statusKey = status?.toLowerCase() || 'unpaid';
  const { bg, text, label, icon: Icon } = config[statusKey] || config.unpaid;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg}`}>
      <Icon className="w-3 h-3" />
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
  trend, 
  trendValue, 
  subtitle,
  onClick,
  link,
  loading = false,
  badge
}) => {
  const colors = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50',
      iconBg: 'bg-blue-500',
      iconColor: 'text-white',
      border: 'border-blue-200',
      text: 'text-blue-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
      iconBg: 'bg-emerald-500',
      iconColor: 'text-white',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50',
      iconBg: 'bg-amber-500',
      iconColor: 'text-white',
      border: 'border-amber-200',
      text: 'text-amber-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50',
      iconBg: 'bg-purple-500',
      iconColor: 'text-white',
      border: 'border-purple-200',
      text: 'text-purple-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50 to-rose-100/50',
      iconBg: 'bg-rose-500',
      iconColor: 'text-white',
      border: 'border-rose-200',
      text: 'text-rose-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100/50',
      iconBg: 'bg-orange-500',
      iconColor: 'text-white',
      border: 'border-orange-200',
      text: 'text-orange-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    gray: {
      bg: 'bg-gradient-to-br from-gray-50 to-gray-100/50',
      iconBg: 'bg-gray-600',
      iconColor: 'text-white',
      border: 'border-gray-200',
      text: 'text-gray-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
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
      <div className={`relative overflow-hidden rounded-2xl border ${theme.border} ${theme.bg} p-3 hover:shadow-lg transition-all duration-300 group h-full flex flex-col ${(link || onClick) ? 'hover:scale-[1.02]' : ''}`}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${theme.iconBg} shadow-lg shadow-${color}-500/20`}>
              <Icon className={`w-4 h-4 ${theme.iconColor}`} />
            </div>
            {badge && (
              <div className={`px-2 py-1 rounded-lg ${badge.bg} text-xs font-medium ${badge.text}`}>
                {badge.label}
              </div>
            )}
            {trend !== undefined && !badge && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-white/60 backdrop-blur-sm ${
                trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-rose-600' : 'text-gray-500'
              }`}>
                {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : 
                 trend < 0 ? <ArrowDownRight className="w-3 h-3" /> : 
                 <Minus className="w-3 h-3" />}
                <span className="text-xs font-medium">
                  {trend > 0 ? '+' : ''}{trendValue || `${trend}%`}
                </span>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="space-y-2 flex-1">
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-xl font-bold text-gray-900 mb-1">{value}</p>
              <p className={`text-xs font-medium ${theme.text} uppercase tracking-wider`}>{title}</p>
              {subtitle && <p className="text-[10px] text-gray-400 mt-2">{subtitle}</p>}
            </>
          )}
        </div>

        {(link || onClick) && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-4 h-4 text-gray-400" />
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
    rose: 'bg-rose-50 hover:bg-rose-100 text-rose-600',
    orange: 'bg-orange-50 hover:bg-orange-100 text-orange-600',
    gray: 'bg-gray-50 hover:bg-gray-100 text-gray-600'
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
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </Link>
  );
};

// ==================== RECENT INQUIRY ROW ====================

const RecentInquiryRow = ({ inquiry }) => {
  const router = useRouter();

  return (
    <div 
      
      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900 truncate">{inquiry.inquiryNumber}</p>
            <InquiryStatusBadge status={inquiry.status} />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
            <span>{inquiry.userDetails?.companyName || 'N/A'}</span>
            <span>•</span>
            <span>{inquiry.items?.length || 0} products</span>
            <span>•</span>
            <span>{getRelativeTime(inquiry.createdAt)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <span className="text-sm font-semibold text-[#E39A65]">
          {formatPrice(inquiry.subtotal || 0)}
        </span>
       
      </div>
    </div>
  );
};

// ==================== RECENT INVOICE ROW ====================

// ==================== RECENT INVOICE ROW ====================

const RecentInvoiceRow = ({ invoice }) => {
  const router = useRouter();
  const expired = isInvoiceExpired(invoice);

  return (
    <div 
      onClick={() => router.push(`/admin/viewInvoice?invoiceId=${invoice._id}`)}
      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
          <DollarSign className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900 truncate">{invoice.invoiceNumber}</p>
            {expired ? (
              <PaymentStatusBadge status="expired" />
            ) : (
              <PaymentStatusBadge status={invoice.paymentStatus} />
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
            <span>{invoice.customer?.companyName || 'N/A'}</span>
            <span>•</span>
            <span>Due {formatDate(invoice.dueDate)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <span className="text-sm font-semibold text-purple-600">
          {formatPrice(invoice.finalTotal || 0)}
        </span>
        <Eye className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

// ==================== MAIN DASHBOARD COMPONENT ====================

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Date filter state - Default to current month
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Current month (0-11)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterType, setFilterType] = useState('month'); // Changed from 'all' to 'month' for default current month
  
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalInquiries: 0,
      pendingQuotations: 0,
      unpaidInvoices: 0,
      partialInvoices: 0,
      expiredInvoices: 0,
      monthlyRevenue: 0,
      revenueGrowth: 0,
      totalInvoices: 0,
      paidInvoices: 0,
      pendingValue: 0,
      invoiceStatusCounts: {
        paid: 0,
        partial: 0,
        unpaid: 0,
        expired: 0,
        total: 0
      }
    },
    recentInquiries: [],
    recentInvoices: [],
    statusBreakdown: {}
  });

  const [stats, setStats] = useState({
    totalInquiries: 0,
    submitted: 0,
    quoted: 0,
    accepted: 0,
    invoiced: 0,
    cancelled: 0,
    paid: 0,
    partial: 0,
    unpaid: 0,
    overpaid: 0,
    expired: 0
  });

  const router = useRouter();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Build URL with date filters
      let url = `https://b2b-backend-rosy.vercel.app/api/admin/inquiries/stats/dashboard`;
      
      // Add query parameters based on filter type
      const params = new URLSearchParams();
      
      if (filterType === 'month') {
        params.append('month', selectedMonth + 1); // Convert to 1-12 for backend
        params.append('year', selectedYear);
      } else if (filterType === 'year') {
        params.append('year', selectedYear);
      }
      // For 'all', we don't add any params
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log('Fetching dashboard data from:', url);

      const statsResponse = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const statsData = await statsResponse.json();
      console.log('Dashboard API Response:', statsData);
      
      if (statsData.success) {
        setDashboardData(statsData.data);
        
        // Calculate stats from status breakdown
        const breakdown = statsData.data.statusBreakdown || {};
        
        setStats({
          totalInquiries: statsData.data.overview.totalInquiries || 0,
          submitted: breakdown.submitted?.count || 0,
          quoted: breakdown.quoted?.count || 0,
          accepted: breakdown.accepted?.count || 0,
          invoiced: breakdown.invoiced?.count || 0,
          cancelled: breakdown.cancelled?.count || 0,
          paid: statsData.data.overview.paidInvoices || 0,
          partial: statsData.data.overview.partialInvoices || 0,
          unpaid: statsData.data.overview.unpaidInvoices || 0,
          overpaid: statsData.data.overview.overpaidInvoices || 0,
          expired: statsData.data.overview.expiredInvoices || 0
        });
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

  // Get display text for current filter
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
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-10">
  <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-3 sm:py-4">
    {/* Mobile: Stacked layout, Desktop: Row layout */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
      {/* Title Section */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 flex items-center gap-1">
          <CalendarRange className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          Showing data for: <span className="font-medium text-[#E39A65] truncate">{getFilterDisplayText()}</span>
        </p>
      </div>
      
      {/* Actions Section - Wrap on mobile */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Filter Type Selector - Smaller on mobile */}
        <div className="flex items-center gap-0.5 sm:gap-1 border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => handleFilterTypeChange('all')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors ${
              filterType === 'all' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterTypeChange('year')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors ${
              filterType === 'year' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Year
          </button>
          <button
            onClick={() => handleFilterTypeChange('month')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors ${
              filterType === 'month' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
        </div>

        {/* Month/Year Navigation - Smaller on mobile */}
        {filterType === 'month' && (
          <div className="flex items-center gap-0.5 sm:gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => handleMonthChange(-1)}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium bg-white text-gray-700 border-x border-gray-200 whitespace-nowrap">
              {getMonthName(selectedMonth)} {selectedYear}
            </span>
            <button
              onClick={() => handleMonthChange(1)}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Next month"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}

        {filterType === 'year' && (
          <div className="flex items-center gap-0.5 sm:gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => handleYearChange(-1)}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Previous year"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium bg-white text-gray-700 border-x border-gray-200">
              {selectedYear}
            </span>
            <button
              onClick={() => handleYearChange(1)}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Next year"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}

        {/* Refresh Button - Smaller on mobile */}
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden xs:inline">Refresh</span>
        </button>
        
        {/* Settings Button - Smaller on mobile */}
        <button
          onClick={() => router.push('/admin/settings')}
          className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Settings"
        >
          <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-4">
        {/* Key Metrics Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#E39A65]" />
            Key Metrics {filterType !== 'all' && <span className="text-xs font-normal text-gray-400">(Filtered)</span>}
          </h2>
     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
  <StatCard
    title="Total Inquiries"
    value={dashboardData.overview.totalInquiries}
    icon={ShoppingBag}
    color="blue"
    link="/admin/inquiries"
  />
  <StatCard
    title="Pending Quotations"
    value={dashboardData.overview.pendingQuotations}
    icon={Clock}
    color="amber"
    subtitle="Awaiting response"
    link="/admin/inquiries?filter=submitted"
  />
  <StatCard
    title="Unpaid Invoices"
    value={dashboardData.overview.unpaidInvoices}
    icon={AlertCircle}
    color="rose"
    subtitle={`${dashboardData.overview.partialInvoices} partial`}
    link="/admin/invoices?filter=unpaid"
  />
  <StatCard
    title="Expired Invoices"
    value={stats.expired}
    icon={Clock}
    color="orange"
    subtitle="Payment overdue"
    link="/admin/invoices?filter=expired"
  />
  {/* Revenue Card - Takes 2 columns on mobile/small devices */}
  <div className="col-span-2 sm:col-span-2 lg:col-span-1">
    <StatCard
      title="Revenue"
      value={formatPrice(dashboardData.overview.monthlyRevenue)}
      icon={DollarSign}
      color="emerald"
      link="/admin/invoices?filter=paid"
    />
  </div>
</div>
        </div>

        {/* Status Breakdown & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Inquiry Status Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 h-full">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#E39A65]" />
              Inquiry Status
              {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Submitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.submitted}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInquiries > 0 
                      ? Math.round((stats.submitted / dashboardData.overview.totalInquiries) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Quoted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.quoted}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInquiries > 0 
                      ? Math.round((stats.quoted / dashboardData.overview.totalInquiries) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.accepted}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInquiries > 0 
                      ? Math.round((stats.accepted / dashboardData.overview.totalInquiries) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Invoiced</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.invoiced}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInquiries > 0 
                      ? Math.round((stats.invoiced / dashboardData.overview.totalInquiries) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Cancelled</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.cancelled}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInquiries > 0 
                      ? Math.round((stats.cancelled / dashboardData.overview.totalInquiries) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <Link 
                href="/admin/inquiries" 
                className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center justify-between"
              >
                View all inquiries
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Payment Status Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 h-full">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#E39A65]" />
              Payment Status
              {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Paid</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.paid}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInvoices > 0 
                      ? Math.round((stats.paid / dashboardData.overview.totalInvoices) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Partial</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.partial}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInvoices > 0 
                      ? Math.round((stats.partial / dashboardData.overview.totalInvoices) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Unpaid</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.unpaid}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInvoices > 0 
                      ? Math.round((stats.unpaid / dashboardData.overview.totalInvoices) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Expired</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.expired}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInvoices > 0 
                      ? Math.round((stats.expired / dashboardData.overview.totalInvoices) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Overpaid</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{stats.overpaid}</span>
                  <span className="text-xs text-gray-400">
                    ({dashboardData.overview.totalInvoices > 0 
                      ? Math.round((stats.overpaid / dashboardData.overview.totalInvoices) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <Link 
                href="/admin/invoices" 
                className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center justify-between"
              >
                View all invoices
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 h-full">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#E39A65]" />
              Performance Metrics
              {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-medium text-gray-900">
                    {dashboardData.overview.totalInquiries > 0 
                      ? Math.round((stats.accepted / dashboardData.overview.totalInquiries) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ 
                      width: `${dashboardData.overview.totalInquiries > 0 
                        ? (stats.accepted / dashboardData.overview.totalInquiries) * 100 
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Payment Collection</span>
                  <span className="font-medium text-gray-900">
                    {dashboardData.overview.totalInvoices > 0 
                      ? Math.round((stats.paid / dashboardData.overview.totalInvoices) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ 
                      width: `${dashboardData.overview.totalInvoices > 0 
                        ? (stats.paid / dashboardData.overview.totalInvoices) * 100 
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">On-Time Payment</span>
                  <span className="font-medium text-gray-900">
                    {dashboardData.overview.totalInvoices > 0 
                      ? Math.round(((stats.paid + stats.partial) / (dashboardData.overview.totalInvoices - stats.expired)) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ 
                      width: `${dashboardData.overview.totalInvoices > 0 
                        ? Math.min(((stats.paid + stats.partial) / (dashboardData.overview.totalInvoices - stats.expired)) * 100, 100)
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">Avg. Invoice</p>
                  <p className="text-sm font-bold text-gray-900">
                    {dashboardData.overview.paidInvoices > 0 
                      ? formatPrice(dashboardData.overview.monthlyRevenue / dashboardData.overview.paidInvoices)
                      : formatPrice(0)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">Pending Value</p>
                  <p className="text-sm font-bold text-amber-600">
                    {formatPrice(dashboardData.overview.pendingValue || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Inquiries */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 rounded-lg">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Recent Inquiries</h3>
                {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
              </div>
              <Link 
                href="/admin/inquiries" 
                className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-2">
              {dashboardData.recentInquiries && dashboardData.recentInquiries.length > 0 ? (
                dashboardData.recentInquiries.slice(0, 5).map((inquiry, index) => (
                  <RecentInquiryRow key={inquiry._id || index} inquiry={inquiry} />
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Inbox className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">No recent inquiries</p>
                  <p className="text-xs text-gray-400">New inquiries will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Recent Invoices</h3>
                {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
              </div>
              <Link 
                href="/admin/invoices" 
                className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-2">
              {dashboardData.recentInvoices && dashboardData.recentInvoices.length > 0 ? (
                dashboardData.recentInvoices.slice(0, 5).map((invoice, index) => (
                  <RecentInvoiceRow key={invoice._id || index} invoice={invoice} />
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">No recent invoices</p>
                  <p className="text-xs text-gray-400">Invoices will appear here once created</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-6 mt-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#E39A65]" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard
              title="Create Invoice"
              description="Convert inquiry to invoice"
              icon={FileOutput}
              href="/admin/inquiries?filter=accepted"
              color="purple"
            />
            <QuickActionCard
              title="Add Product"
              description="Add new products to catalog"
              icon={Package}
              href="/admin/create-products"
              color="blue"
            />
            <QuickActionCard
              title="View Inquiries"
              description="Manage customer inquiries"
              icon={Inbox}
              href="/admin/inquiries"
              color="amber"
            />
            <QuickActionCard
              title="View Invoices"
              description="Manage all invoices"
              icon={FileText}
              href="/admin/invoices"
              color="emerald"
            />
          </div>
        </div>
      </div>
    </div>
  );
}