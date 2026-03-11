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
  Edit,
  ShoppingCart,
  Receipt,
  Bell,
  HelpCircle,
  LogOut,
  Home,
  Copy,
  Check,
  X,
  AlertOctagon,
  TrendingUp as TrendUp,
  TrendingDown as TrendDown,
  Clock as ClockIcon,
  FileCheck,
  FileClock,
  FileSearch,
  BadgeCheck,
  BadgeX,
  Banknote,
  CalendarDays,
  Sparkles
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

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
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

// Check if invoice is expired
const isInvoiceExpired = (invoice) => {
  if (invoice.paymentStatus === 'paid' || invoice.paymentStatus === 'cancelled') {
    return false;
  }
  const today = new Date();
  const dueDate = new Date(invoice.dueDate);
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < today;
};

// Calculate due amount
const getDueAmount = (invoice) => {
  return (invoice.finalTotal || 0) - (invoice.amountPaid || 0);
};

// ==================== STATUS BADGES ====================

const InquiryStatusBadge = ({ status }) => {
  const config = {
    submitted: { 
      bg: 'bg-amber-100', 
      text: 'text-amber-700', 
      label: 'Submitted', 
      icon: Clock,
      iconColor: 'text-amber-600'
    },
    quoted: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-700', 
      label: 'Quoted', 
      icon: FileText,
      iconColor: 'text-blue-600'
    },
    accepted: { 
      bg: 'bg-emerald-100', 
      text: 'text-emerald-700', 
      label: 'Accepted', 
      icon: CheckCircle,
      iconColor: 'text-emerald-600'
    },
    invoiced: { 
      bg: 'bg-purple-100', 
      text: 'text-purple-700', 
      label: 'Invoiced', 
      icon: Receipt,
      iconColor: 'text-purple-600'
    },
    paid: { 
      bg: 'bg-green-100', 
      text: 'text-green-700', 
      label: 'Paid', 
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    cancelled: { 
      bg: 'bg-rose-100', 
      text: 'text-rose-700', 
      label: 'Cancelled', 
      icon: XCircle,
      iconColor: 'text-rose-600'
    }
  };

  const statusKey = status?.toLowerCase() || 'submitted';
  const { bg, text, label, icon: Icon, iconColor } = config[statusKey] || config.submitted;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg}`}>
      <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
      <span className={`text-xs font-medium ${text}`}>{label}</span>
    </div>
  );
};

const PaymentStatusBadge = ({ status, isExpired = false }) => {
  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100">
        <Clock className="w-3.5 h-3.5 text-orange-600" />
        <span className="text-xs font-medium text-orange-700">Overdue</span>
      </div>
    );
  }

  const config = {
    paid: { 
      bg: 'bg-emerald-100', 
      text: 'text-emerald-700', 
      label: 'Paid', 
      icon: CheckCircle,
      iconColor: 'text-emerald-600'
    },
    partial: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-700', 
      label: 'Partial', 
      icon: TrendingUp,
      iconColor: 'text-blue-600'
    },
    unpaid: { 
      bg: 'bg-amber-100', 
      text: 'text-amber-700', 
      label: 'Unpaid', 
      icon: AlertCircle,
      iconColor: 'text-amber-600'
    },
    overpaid: { 
      bg: 'bg-purple-100', 
      text: 'text-purple-700', 
      label: 'Overpaid', 
      icon: TrendingDown,
      iconColor: 'text-purple-600'
    },
    cancelled: { 
      bg: 'bg-rose-100', 
      text: 'text-rose-700', 
      label: 'Cancelled', 
      icon: XCircle,
      iconColor: 'text-rose-600'
    }
  };

  const statusKey = status?.toLowerCase() || 'unpaid';
  const { bg, text, label, icon: Icon, iconColor } = config[statusKey] || config.unpaid;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg}`}>
      <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
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
  trend,
  trendValue,
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
            {trend !== undefined && (
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

// ==================== INQUIRY CARD ====================

const InquiryCard = ({ inquiry, onCancel, onAccept, onView }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [accepting, setAccepting] = useState(false);

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this inquiry?')) return;
    setCancelling(true);
    await onCancel(inquiry._id);
    setCancelling(false);
  };

  const handleAccept = async () => {
    setAccepting(true);
    await onAccept(inquiry._id);
    setAccepting(false);
  };

  const getTotalQuantity = () => {
    return inquiry.items?.reduce((sum, item) => sum + (item.totalQuantity || 0), 0) || 0;
  };

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
                <h3 className="font-semibold text-gray-900">{inquiry.inquiryNumber}</h3>
                <InquiryStatusBadge status={inquiry.status} />
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                <span>{formatDateTime(inquiry.createdAt)}</span>
                <span>•</span>
                <span>{inquiry.items?.length || 0} products</span>
                <span>•</span>
                <span>{getTotalQuantity()} pcs</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              {showDetails ? 'Hide' : 'View'}
            </button>
            
            {inquiry.status === 'submitted' && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors"
              >
                {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                Cancel
              </button>
            )}

            {inquiry.status === 'quoted' && (
              <button
                onClick={handleAccept}
                disabled={accepting}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                {accepting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                Accept Quote
              </button>
            )}

            {inquiry.status === 'accepted' && (
              <div className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                Ready for invoice
              </div>
            )}

            {inquiry.status === 'invoiced' && (
              <button
                onClick={() => onView(inquiry._id, 'invoice')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Receipt className="w-3.5 h-3.5" />
                View Invoice
              </button>
            )}
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="p-4 bg-gray-50/30 border-t border-gray-100">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Products</h4>
          <div className="space-y-2">
            {inquiry.items?.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
                <div className="flex items-start gap-2">
                  {item.productImage && (
                    <img 
                      src={item.productImage} 
                      alt={item.productName}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>Qty: {item.totalQuantity} pcs</span>
                      {item.colors && item.colors.length > 0 && (
                        <span>Colors: {item.colors.length}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-[#E39A65]">
                    {formatPrice(item.totalQuantity * (item.unitPrice || 0))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {inquiry.specialInstructions && (
            <div className="mt-3 p-3 bg-amber-50 rounded-lg">
              <p className="text-xs font-medium text-amber-700">Special Instructions:</p>
              <p className="text-xs text-amber-600 mt-1">{inquiry.specialInstructions}</p>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500">Total Value:</span>
            <span className="text-lg font-bold text-[#E39A65]">{formatPrice(inquiry.subtotal || 0)}</span>
          </div>
        </div>
      )}

      {inquiry.userDetails?.whatsapp && (
        <div className="px-4 py-2 bg-gray-50/50 flex justify-end">
          <button
            onClick={() => window.open(`https://wa.me/${inquiry.userDetails.whatsapp.replace(/[^0-9+]/g, '')}`, '_blank')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Contact Support
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== INVOICE CARD ====================

const InvoiceCard = ({ invoice, onPay, onDownload, onView }) => {
  const [paying, setPaying] = useState(false);
  const expired = isInvoiceExpired(invoice);
  const dueAmount = getDueAmount(invoice);

  const handlePay = async () => {
    setPaying(true);
    await onPay(invoice._id);
    setPaying(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Receipt className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{invoice.invoiceNumber}</h3>
                <PaymentStatusBadge status={invoice.paymentStatus} isExpired={expired} />
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                <span>Issued: {formatDate(invoice.invoiceDate)}</span>
                <span>•</span>
                <span>Due: {formatDate(invoice.dueDate)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView(invoice._id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </button>
            
            <button
              onClick={() => onDownload(invoice._id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>

            {invoice.paymentStatus !== 'paid' && invoice.paymentStatus !== 'cancelled' && (
              <button
                onClick={handlePay}
                disabled={paying}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                {paying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Amount</p>
            <p className="text-lg font-bold text-gray-900">{formatPrice(invoice.finalTotal || 0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Amount Paid</p>
            <p className="text-lg font-bold text-green-600">{formatPrice(invoice.amountPaid || 0)}</p>
          </div>
          {dueAmount > 0 && invoice.paymentStatus !== 'cancelled' && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500">Due Amount</p>
              <p className={`text-lg font-bold ${expired ? 'text-red-600' : 'text-orange-600'}`}>
                {formatPrice(dueAmount)}
              </p>
            </div>
          )}
        </div>

        {invoice.items && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">
              {invoice.items.length} product{invoice.items.length !== 1 ? 's' : ''}
            </p>
            <p className="text-xs text-gray-600">
              Total Quantity: {invoice.items.reduce((sum, item) => sum + (item.totalQuantity || 0), 0)} pcs
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== MAIN CUSTOMER DASHBOARD ====================

export default function CustomerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  
  // Date filter state
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterType, setFilterType] = useState('month'); // Default to current month
  
  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [stats, setStats] = useState({
    totalInquiries: 0,
    submitted: 0,
    quoted: 0,
    accepted: 0,
    invoiced: 0,
    paid: 0,
    cancelled: 0,
    totalInvoices: 0,
    paidInvoices: 0,
    unpaidInvoices: 0,
    partialInvoices: 0,
    overdueInvoices: 0,
    totalSpent: 0,
     expiredInvoices: 0,
    pendingAmount: 0
  });

  const router = useRouter();

  const filterDataByDate = (items, type) => {
    if (filterType === 'all') return items;
    
    return items.filter(item => {
      const itemDate = new Date(type === 'inquiry' ? item.createdAt : item.invoiceDate);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth();
      
      if (filterType === 'year') {
        return itemYear === selectedYear;
      } else if (filterType === 'month') {
        return itemYear === selectedYear && itemMonth === selectedMonth;
      }
      return true;
    });
  };

  const calculateStats = (inquiriesList, invoicesList) => {
    // Inquiry stats
    const submitted = inquiriesList.filter(i => i.status === 'submitted').length;
    const quoted = inquiriesList.filter(i => i.status === 'quoted').length;
    const accepted = inquiriesList.filter(i => i.status === 'accepted').length;
    const invoiced = inquiriesList.filter(i => i.status === 'invoiced').length;
    const paid = inquiriesList.filter(i => i.status === 'paid').length;
    const cancelled = inquiriesList.filter(i => i.status === 'cancelled').length;

    // Invoice stats
    const paidInvoices = invoicesList.filter(i => i.paymentStatus === 'paid').length;
    const unpaidInvoices = invoicesList.filter(i => i.paymentStatus === 'unpaid').length;
    const partialInvoices = invoicesList.filter(i => i.paymentStatus === 'partial').length;
    const overdueInvoices = invoicesList.filter(i => {
      if (i.paymentStatus === 'paid' || i.paymentStatus === 'cancelled') return false;
      const today = new Date();
      const dueDate = new Date(i.dueDate);
      today.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    }).length;

    // Financial stats
    const totalSpent = invoicesList
      .filter(i => i.paymentStatus === 'paid')
      .reduce((sum, i) => sum + (i.finalTotal || 0), 0);

    const pendingAmount = invoicesList
      .filter(i => i.paymentStatus === 'unpaid' || i.paymentStatus === 'partial')
      .reduce((sum, i) => {
        const dueAmount = (i.finalTotal || 0) - (i.amountPaid || 0);
        return sum + dueAmount;
      }, 0);
        const expiredInvoices = invoicesList.filter(inv => {
    // Don't mark as expired if paid or cancelled or overpaid
    if (inv.paymentStatus === 'paid' || 
        inv.paymentStatus === 'cancelled' || 
        inv.paymentStatus === 'overpaid') {
      return false;
    }
    
    const today = new Date();
    const dueDate = new Date(inv.dueDate);
    
    // Reset time part to compare dates only
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  }).length;

    setStats({
      totalInquiries: inquiriesList.length,
      submitted,
      quoted,
      accepted,
      invoiced,
      paid,
      cancelled,
      totalInvoices: invoicesList.length,
      paidInvoices,
      unpaidInvoices,
      partialInvoices,
      overdueInvoices,
      totalSpent,
      expiredInvoices,
      pendingAmount
    });
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Get user data
      const userStr = localStorage.getItem('user');
      if (userStr) {
        setUser(JSON.parse(userStr));
      }

      // Fetch user's inquiries
      const inquiriesResponse = await fetch('http://localhost:5000/api/inquiries/my-inquiries', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const inquiriesData = await inquiriesResponse.json();
      
      // Fetch user's invoices
      const invoicesResponse = await fetch('http://localhost:5000/api/invoices/my-invoices', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const invoicesData = await invoicesResponse.json();

      // Initialize variables
      let inquiriesList = [];
      let invoicesList = [];

      if (inquiriesData.success) {
        inquiriesList = inquiriesData.data || [];
        setInquiries(inquiriesList);
        
        // Apply date filter
        const filtered = filterDataByDate(inquiriesList, 'inquiry');
        setFilteredInquiries(filtered);
      }

      if (invoicesData.success) {
        invoicesList = invoicesData.data || [];
        setInvoices(invoicesList);
        
        // Apply date filter
        const filtered = filterDataByDate(invoicesList, 'invoice');
        setFilteredInvoices(filtered);
      }

      // Calculate stats with filtered data
      calculateStats(
        filterDataByDate(inquiriesList, 'inquiry'),
        filterDataByDate(invoicesList, 'invoice')
      );

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
  }, []);

  // Update filtered data and stats when filter changes
  useEffect(() => {
    const filteredInq = filterDataByDate(inquiries, 'inquiry');
    const filteredInv = filterDataByDate(invoices, 'invoice');
    
    setFilteredInquiries(filteredInq);
    setFilteredInvoices(filteredInv);
    calculateStats(filteredInq, filteredInv);
  }, [filterType, selectedMonth, selectedYear, inquiries, invoices]);

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

  const handleCancelInquiry = async (inquiryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inquiries/${inquiryId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Inquiry cancelled successfully');
        fetchDashboardData();
      } else {
        toast.error(data.error || 'Failed to cancel inquiry');
      }
    } catch (error) {
      toast.error('Failed to cancel inquiry');
    }
  };

  const handleAcceptQuote = async (inquiryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inquiries/${inquiryId}/accept`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Quote accepted successfully');
        fetchDashboardData();
      } else {
        toast.error(data.error || 'Failed to accept quote');
      }
    } catch (error) {
      toast.error('Failed to accept quote');
    }
  };

  const handleViewInquiry = (inquiryId) => {
    router.push(`/customer/inquiry/${inquiryId}`);
  };

  const handleViewInvoice = (invoiceId) => {
    router.push(`/customer/invoice/${invoiceId}`);
  };

  const handlePayInvoice = async (invoiceId) => {
    router.push(`/customer/pay/${invoiceId}`);
  };

  const handleDownloadInvoice = async (invoiceId) => {
    try {
      toast.loading('Generating PDF...', { id: 'pdf' });
      
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Invoice downloaded successfully', { id: 'pdf' });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice', { id: 'pdf' });
    }
  };

  const handleContactSupport = () => {
    const phone = user?.whatsapp || user?.phone;
    if (phone) {
      window.open(`https://wa.me/${phone.replace(/[^0-9+]/g, '')}`, '_blank');
    } else {
      toast.error('No WhatsApp number available');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
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
          <p className="text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-xl flex items-center justify-center shadow-md">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Welcome back, {user?.companyName || user?.contactPerson || 'Customer'}!
                </p>
              </div>
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
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <CalendarRange className="w-3 h-3" />
            Showing data for: <span className="font-medium text-[#E39A65]">{getFilterDisplayText()}</span>
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-3 border border-amber-200">
              <p className="text-xs text-amber-600 mb-1">Total Inquiries</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
              <p className="text-[10px] text-gray-500 mt-1">{stats.submitted} pending</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 border border-blue-200">
              <p className="text-xs text-blue-600 mb-1">Quotes Received</p>
              <p className="text-2xl font-bold text-gray-900">{stats.quoted}</p>
              <p className="text-[10px] text-gray-500 mt-1">{stats.accepted} accepted</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-3 border border-purple-200">
              <p className="text-xs text-purple-600 mb-1">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInvoices}</p>
              <p className="text-[10px] text-gray-500 mt-1">{stats.paidInvoices} paid</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3 border border-emerald-200">
              <p className="text-xs text-emerald-600 mb-1">Total Full Paid</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalSpent)}</p>
              <p className="text-[10px] text-gray-500 mt-1">Pending: {formatPrice(stats.pendingAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-6">
        {/* Activity Summary Section - Moved before Quick Actions */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-[#E39A65]/10 rounded-lg">
              <Activity className="w-4 h-4 text-[#E39A65]" />
            </div>
            <h2 className="text-sm font-semibold text-gray-700">Activity Summary</h2>
            {filterType !== 'all' && (
              <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                Filtered
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Inquiry Status Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-amber-100/30 border-b border-amber-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500 rounded-lg">
                    <FileText className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">Inquiry Status</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-amber-50/50 rounded-lg p-3 border border-amber-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-xs text-gray-600">Submitted</span>
                    </div>
                    <p className="text-xl font-bold text-amber-600">{stats.submitted}</p>
                  </div>
                  <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs text-gray-600">Quoted</span>
                    </div>
                    <p className="text-xl font-bold text-blue-600">{stats.quoted}</p>
                  </div>
                  <div className="bg-emerald-50/50 col-span-2 rounded-lg p-3 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs text-gray-600">Accepted</span>
                    </div>
                    <p className="text-xl font-bold text-emerald-600">{stats.accepted}</p>
                  </div>
                  <div className="bg-purple-50/50 col-span-2 rounded-lg p-3 border border-purple-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Receipt className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-xs text-gray-600">Invoiced</span>
                    </div>
                    <p className="text-xl font-bold text-purple-600">{stats.invoiced}</p>
                  </div>
                
                  <div className="bg-rose-50/50 col-span-2 rounded-lg p-3 border border-rose-100">
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span className="text-xs text-gray-600">Cancelled</span>
                    </div>
                    <p className="text-xl font-bold text-rose-600">{stats.cancelled}</p>
                  </div>
                </div>
              </div>
            </div>

        {/* Payment Status Card */}
<div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
  <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-100/30 border-b border-purple-100">
    <div className="flex items-center gap-2">
      <div className="p-1.5 bg-purple-500 rounded-lg">
        <CreditCard className="w-3.5 h-3.5 text-white" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900">Payment Status</h3>
    </div>
  </div>
  <div className="p-4">
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs text-gray-600">Paid</span>
        </div>
        <p className="text-xl font-bold text-emerald-600">{stats.paidInvoices}</p>
      </div>
      <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs text-gray-600">Partial</span>
        </div>
        <p className="text-xl font-bold text-blue-600">{stats.partialInvoices}</p>
      </div>
      <div className="bg-amber-50/50 rounded-lg p-3 border border-amber-100">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-xs text-gray-600">Unpaid</span>
        </div>
        <p className="text-xl font-bold text-amber-600">{stats.unpaidInvoices}</p>
      </div>
      <div className="bg-orange-50/50 rounded-lg p-3 border border-orange-100">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-3.5 h-3.5 text-orange-600" />
          <span className="text-xs text-gray-600">Overdue</span>
        </div>
        <p className="text-xl font-bold text-orange-600">{stats.overdueInvoices}</p>
      </div>
      {/* Expired Count - Using same logic as customer invoice page */}
      <div className="col-span-2 bg-red-50/50 rounded-lg p-3 border border-red-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-100 rounded-full">
              <AlertOctagon className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">Expired Invoices</p>
              <p className="text-[10px] text-gray-500">Payment deadline passed</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.expiredInvoices}</p>
        </div>
        {stats.expiredInvoices > 0 && (
          <p className="text-[10px] text-red-600 mt-1">
            {stats.expiredInvoices} invoice{stats.expiredInvoices !== 1 ? 's' : ''} past due date
          </p>
        )}
      </div>
    </div>

    {/* Financial Summary */}
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Total Full Paid</p>
          <p className="text-lg font-bold text-emerald-600">{formatPrice(stats.totalSpent)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Pending Amount</p>
          <p className="text-lg font-bold text-amber-600">{formatPrice(stats.pendingAmount)}</p>
        </div>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>


        {/* Recent Inquiries */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <FileText className="w-4 h-4 text-amber-600" />
              </div>
              <h2 className="text-sm font-semibold text-gray-700">Recent Inquiries</h2>
            </div>
            <Link 
              href="/customer/inquiries" 
              className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center gap-1"
            >
              View all ({stats.totalInquiries})
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {filteredInquiries.slice(0, 3).map((inquiry) => (
              <InquiryCard
                key={inquiry._id}
                inquiry={inquiry}
                onCancel={handleCancelInquiry}
                onAccept={handleAcceptQuote}
                onView={handleViewInvoice}
              />
            ))}
            {filteredInquiries.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Inbox className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {filterType !== 'all' 
                    ? `No inquiries found for ${getFilterDisplayText().toLowerCase()}`
                    : 'Start browsing our products and create your first inquiry'}
                </p>
                {filterType !== 'all' ? (
                  <button
                    onClick={() => handleFilterTypeChange('all')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                  >
                    <CalendarRange className="w-4 h-4" />
                    View All Time
                  </button>
                ) : (
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Browse Products
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <Receipt className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-sm font-semibold text-gray-700">Recent Invoices</h2>
            </div>
            <Link 
              href="/customer/invoices" 
              className="text-xs text-[#E39A65] hover:text-[#d48b54] font-medium flex items-center gap-1"
            >
              View all ({stats.totalInvoices})
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {filteredInvoices.slice(0, 3).map((invoice) => (
              <InvoiceCard
                key={invoice._id}
                invoice={invoice}
                onPay={handlePayInvoice}
                onDownload={handleDownloadInvoice}
                onView={handleViewInvoice}
              />
            ))}
            {filteredInvoices.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
                <p className="text-sm text-gray-500">
                  {filterType !== 'all' 
                    ? `No invoices found for ${getFilterDisplayText().toLowerCase()}`
                    : 'Invoices will appear here once your inquiries are processed'}
                </p>
                {filterType !== 'all' && (
                  <button
                    onClick={() => handleFilterTypeChange('all')}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                  >
                    <CalendarRange className="w-4 h-4" />
                    View All Time
                  </button>
                )}
              </div>
            )}
          </div>
        </div>


        
        {/* Quick Actions */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-[#E39A65]/10 rounded-lg">
              <Zap className="w-4 h-4 text-[#E39A65]" />
            </div>
            <h2 className="text-sm font-semibold text-gray-700">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard
              title="Browse Products"
              description="Shop our collection"
              icon={ShoppingBag}
              href="/products"
              color="blue"
            />
            <QuickActionCard
              title="View Inquiries"
              description="Check your cart"
              icon={ShoppingCart}
              href="/customer/inquiries"
              color="amber"
            />
            <QuickActionCard
              title="My Invoices"
              description="Check order status"
              icon={Package}
              href="/customer/invoices"
              color="purple"
            />
            <QuickActionCard
              title="My Reviews"
              description="View payment records"
              icon={CreditCard}
              href="/customer/myReviews"
              color="emerald"
            />
          </div>
        </div>
      </div>
    </div>
  );
}