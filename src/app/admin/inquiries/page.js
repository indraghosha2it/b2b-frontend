



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Calendar,
  MessageCircle,
  Loader2,
  AlertCircle,
  ChevronRight,
  FileSearch,
  RefreshCw,
  Filter,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Search,
  ChevronDown,
  MoreVertical,
  Eye,
  Download,
  Send,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Paperclip,
  Edit,
  Trash2,
  FileOutput,
  CheckSquare,
  XSquare,
  PlusCircle,
  Ban,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  BarChart3,
  PieChart,
  Activity,
  CalendarRange,
  Inbox,
  AlertOctagon,
  ArrowRight,
  Zap,
  Receipt
} from 'lucide-react';
import { toast } from 'sonner';

// Helper function to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get month name
const getMonthName = (monthIndex) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
};

// Status Badge
const StatusBadge = ({ status }) => {
  const statusConfig = {
    submitted: { 
      bg: 'bg-amber-100', 
      text: 'text-amber-700', 
      label: 'Submitted',
      dot: 'bg-amber-500'
    },
    quoted: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-700', 
      label: 'Quoted',
      dot: 'bg-blue-500'
    },
    accepted: { 
      bg: 'bg-emerald-100', 
      text: 'text-emerald-700', 
      label: 'Accepted',
      dot: 'bg-emerald-500'
    },
    invoiced: { 
      bg: 'bg-purple-100', 
      text: 'text-purple-700', 
      label: 'Invoiced',
      dot: 'bg-purple-500'
    },
    paid: { 
      bg: 'bg-green-100', 
      text: 'text-green-700', 
      label: 'Paid',
      dot: 'bg-green-500'
    },
    cancelled: { 
      bg: 'bg-rose-100', 
      text: 'text-rose-700', 
      label: 'Cancelled',
      dot: 'bg-rose-500'
    }
  };

  const config = statusConfig[status] || statusConfig.submitted;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${config.bg}`}>
      <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${config.dot}`}></span>
      <span className={`text-[10px] sm:text-xs font-medium ${config.text}`}>{config.label}</span>
    </div>
  );
};

// Modern Stat Card Component - Compact Responsive
const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => {
  const colorClasses = {
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50',
      iconBg: 'bg-amber-500',
      text: 'text-amber-700',
      border: 'border-amber-200',
      icon: 'text-white'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50',
      iconBg: 'bg-blue-500',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: 'text-white'
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
      iconBg: 'bg-emerald-500',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: 'text-white'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50',
      iconBg: 'bg-purple-500',
      text: 'text-purple-700',
      border: 'border-purple-200',
      icon: 'text-white'
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50 to-rose-100/50',
      iconBg: 'bg-rose-500',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: 'text-white'
    },
    gray: {
      bg: 'bg-gradient-to-br from-gray-50 to-gray-100/50',
      iconBg: 'bg-gray-600',
      text: 'text-gray-700',
      border: 'border-gray-200',
      icon: 'text-white'
    }
  };

  const theme = colorClasses[color] || colorClasses.gray;

  return (
    <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl border ${theme.border} ${theme.bg} p-2 sm:p-4 hover:shadow-lg transition-all duration-300 group`}>
      <div className="absolute top-0 right-0 w-12 sm:w-20 h-12 sm:h-20 bg-white/20 rounded-full -translate-y-6 translate-x-6 group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-10 sm:w-14 h-10 sm:h-14 bg-white/10 rounded-full translate-y-6 -translate-x-6 group-hover:scale-110 transition-transform duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-1 sm:mb-2">
          <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${theme.iconBg} shadow-lg shadow-${color}-500/20`}>
            <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${theme.icon}`} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-white/60 backdrop-blur-sm ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              <TrendingUp className={`w-2 h-2 sm:w-3 sm:h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
              <span className="text-[8px] sm:text-xs font-medium">{trend > 0 ? '+' : ''}{trend}%</span>
            </div>
          )}
        </div>
        
        <p className="text-base sm:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">{value}</p>
        <p className={`text-[8px] sm:text-[10px] font-medium ${theme.text} uppercase tracking-wider`}>{title}</p>
        {subtitle && <p className="text-[7px] sm:text-[9px] text-gray-400 mt-0.5 sm:mt-1 line-clamp-1">{subtitle}</p>}
      </div>
    </div>
  );
};

// Pagination Component - Responsive
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-xl mt-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-1 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="First page"
      >
        <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Previous page"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      <div className="flex items-center gap-0.5 sm:gap-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-6 h-6 sm:w-8 sm:h-8 text-[10px] sm:text-sm font-medium rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-[#E39A65] text-white shadow-md shadow-[#E39A65]/20'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Next page"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-1 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Last page"
      >
        <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};

// Replace the AdminInquiryCard component in your admin inquiries page with this:

const AdminInquiryCard = ({ inquiry, onRefresh }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [updatingMarkQuoted, setUpdatingMarkQuoted] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const router = useRouter();

  // Check if product has any unavailable items
  const hasUnavailableItems = () => {
    return inquiry.items.some(product => 
      product.isAvailable === false || 
      product.colors.some(color => color.isAvailable === false ||
        color.sizeQuantities.some(size => size.isAvailable === false)
      )
    );
  };

  const handleMarkAsQuoted = async () => {
    setUpdatingMarkQuoted(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiry._id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'quoted' })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Status updated to quoted');
        onRefresh();
      } else {
        toast.error(data.error || 'Failed to update status');
        setUpdatingMarkQuoted(false);
      }
    } catch (error) {
      toast.error('Failed to update status');
      setUpdatingMarkQuoted(false);
    }
  };

  const handleCancelInquiry = async () => {
    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiry._id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Inquiry cancelled');
        onRefresh();
      } else {
        toast.error(data.error || 'Failed to cancel inquiry');
      }
    } catch (error) {
      toast.error('Failed to cancel inquiry');
    } finally {
      setDeleting(false);
      setShowCancelConfirm(false);
    }
  };
  
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiry._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Inquiry deleted successfully');
        onRefresh();
      } else {
        toast.error(data.error || 'Failed to delete inquiry');
      }
    } catch (error) {
      toast.error('Failed to delete inquiry');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

// const handleCreateInvoice = () => {
//   try {
//     if (!inquiry._id) {
//       toast.error('Inquiry ID is missing');
//       return;
//     }

//     let userId = '';
    
//     if (typeof inquiry.userId === 'string') {
//       userId = inquiry.userId;
//     } else if (inquiry.userId && typeof inquiry.userId === 'object') {
//       if (inquiry.userId._id) {
//         userId = inquiry.userId._id.toString();
//       } else if (inquiry.userId.id) {
//         userId = inquiry.userId.id.toString();
//       }
//     }
    
//     if (!userId || userId === '[object Object]' || userId.includes('[object')) {
//       if (inquiry.userDetails?.userId) {
//         userId = inquiry.userDetails.userId.toString();
//       } else if (inquiry.customerId) {
//         userId = inquiry.customerId.toString();
//       } else {
//         toast.error('Unable to extract valid user ID. Please contact support.');
//         return;
//       }
//     }

//     if (userId === '[object Object]' || userId.includes('[object')) {
//       toast.error('User ID format error. Cannot create invoice.');
//       return;
//     }

//     // IMPORTANT: Include isAvailable flags when creating items data
//     const itemsData = inquiry.items.map(item => ({
//       productId: item.productId,
//       productName: item.productName,
//       totalQuantity: item.totalQuantity || 0,
//       unitPrice: item.unitPrice || 0,
//       productImage: item.productImage || '',
//       isAvailable: item.isAvailable !== false, // ← ADD PRODUCT AVAILABILITY
//       colors: (item.colors || []).map(c => ({
//         color: {
//           code: c.color?.code || '#CCCCCC',
//           name: c.color?.name || c.color?.code || 'Color'
//         },
//         sizeQuantities: (c.sizeQuantities || []).map(sq => ({
//           size: sq.size || '',
//           quantity: sq.quantity || 0,
//           isAvailable: sq.isAvailable !== false // ← ADD SIZE AVAILABILITY
//         })),
//         totalForColor: c.totalForColor || 0,
//         isAvailable: c.isAvailable !== false // ← ADD COLOR AVAILABILITY
//       }))
//     }));

//     const customerData = {
//       companyName: inquiry.userDetails?.companyName || '',
//       contactPerson: inquiry.userDetails?.contactPerson || '',
//       email: inquiry.userDetails?.email || '',
//       phone: inquiry.userDetails?.phone || '',
//       whatsapp: inquiry.userDetails?.whatsapp || '',
//       address: inquiry.userDetails?.address || '',
//       city: inquiry.userDetails?.city || '',
//       country: inquiry.userDetails?.country || '',
//       zipCode: inquiry.userDetails?.zipCode || ''
//     };

//     const params = new URLSearchParams();
//     params.append('inquiryId', inquiry._id);
//     params.append('inquiryNumber', inquiry.inquiryNumber || '');
//     params.append('userId', userId);
//     params.append('totalAmount', (inquiry.subtotal || 0).toString());
//     params.append('items', JSON.stringify(itemsData)); // Now includes availability data
//     params.append('specialInstructions', inquiry.specialInstructions || '');
//     params.append('createdAt', inquiry.createdAt || new Date().toISOString());
//     params.append('companyName', customerData.companyName);
//     params.append('contactPerson', customerData.contactPerson);
//     params.append('email', customerData.email);
//     params.append('phone', customerData.phone);
//     params.append('whatsapp', customerData.whatsapp);
//     params.append('address', customerData.address);
//     params.append('city', customerData.city);
//     params.append('country', customerData.country);
//     params.append('zipCode', customerData.zipCode);

//     router.push(`/admin/createInvoice?${params.toString()}`);
//   } catch (error) {
//     console.error('Error preparing invoice data:', error);
//     toast.error('Failed to prepare invoice data');
//   }
// };


const handleCreateInvoice = () => {
  try {
    if (!inquiry._id) {
      toast.error('Inquiry ID is missing');
      return;
    }

    let userId = '';
    
    if (typeof inquiry.userId === 'string') {
      userId = inquiry.userId;
    } else if (inquiry.userId && typeof inquiry.userId === 'object') {
      if (inquiry.userId._id) {
        userId = inquiry.userId._id.toString();
      } else if (inquiry.userId.id) {
        userId = inquiry.userId.id.toString();
      }
    }
    
    if (!userId || userId === '[object Object]' || userId.includes('[object')) {
      if (inquiry.userDetails?.userId) {
        userId = inquiry.userDetails.userId.toString();
      } else if (inquiry.customerId) {
        userId = inquiry.customerId.toString();
      } else {
        toast.error('Unable to extract valid user ID. Please contact support.');
        return;
      }
    }

    if (userId === '[object Object]' || userId.includes('[object')) {
      toast.error('User ID format error. Cannot create invoice.');
      return;
    }

    // IMPORTANT: Include per-color unit prices when creating items data
    const itemsData = inquiry.items.map(item => ({
      productId: item.productId,
      productName: item.productName,
      totalQuantity: item.totalQuantity || 0,
      unitPrice: item.unitPrice || 0,
      productImage: item.productImage || '',
      isAvailable: item.isAvailable !== false,
      colors: (item.colors || []).map(c => ({
        color: {
          code: c.color?.code || '#CCCCCC',
          name: c.color?.name || c.color?.code || 'Color'
        },
        sizeQuantities: (c.sizeQuantities || []).map(sq => ({
          size: sq.size || '',
          quantity: sq.quantity || 0,
          isAvailable: sq.isAvailable !== false
        })),
        totalForColor: c.totalForColor || 0,
        totalQuantity: c.totalQuantity || c.totalForColor || 0,
        unitPrice: c.unitPrice || 0,  // ← CRITICAL: Include per-color unit price
        isAvailable: c.isAvailable !== false
      }))
    }));

    const customerData = {
      companyName: inquiry.userDetails?.companyName || '',
      contactPerson: inquiry.userDetails?.contactPerson || '',
      email: inquiry.userDetails?.email || '',
      phone: inquiry.userDetails?.phone || '',
      whatsapp: inquiry.userDetails?.whatsapp || '',
      address: inquiry.userDetails?.address || '',
      city: inquiry.userDetails?.city || '',
      country: inquiry.userDetails?.country || '',
      zipCode: inquiry.userDetails?.zipCode || ''
    };

    const params = new URLSearchParams();
    params.append('inquiryId', inquiry._id);
    params.append('inquiryNumber', inquiry.inquiryNumber || '');
    params.append('userId', userId);
    params.append('totalAmount', (inquiry.subtotal || 0).toString());
    params.append('items', JSON.stringify(itemsData));
    params.append('specialInstructions', inquiry.specialInstructions || '');
    params.append('createdAt', inquiry.createdAt || new Date().toISOString());
    params.append('companyName', customerData.companyName);
    params.append('contactPerson', customerData.contactPerson);
    params.append('email', customerData.email);
    params.append('phone', customerData.phone);
    params.append('whatsapp', customerData.whatsapp);
    params.append('address', customerData.address);
    params.append('city', customerData.city);
    params.append('country', customerData.country);
    params.append('zipCode', customerData.zipCode);

    router.push(`/admin/createInvoice?${params.toString()}`);
  } catch (error) {
    console.error('Error preparing invoice data:', error);
    toast.error('Failed to prepare invoice data');
  }
};
  const handleViewInvoice = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/invoices?inquiryId=${inquiry._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success && data.data.invoices && data.data.invoices.length > 0) {
        const invoice = data.data.invoices[0];
        router.push(`/admin/viewInvoice?invoiceId=${invoice._id}`);
      } else {
        toast.error('No invoice found for this inquiry');
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
      toast.error('Failed to find invoice');
    }
  };

  const handleWhatsApp = () => {
    if (!inquiry.userDetails?.whatsapp) return;
    
    const productSummary = inquiry.items.map(p => {
      let status = '';
      if (p.isAvailable === false) status = ' [PRODUCT UNAVAILABLE]';
      return `• ${p.productName}${status}: ${p.colors.length} colors, ${p.totalQuantity} pcs`;
    }).join('\n');

    const message = `*Inquiry #${inquiry.inquiryNumber}*\n` +
      `Customer: ${inquiry.userDetails?.companyName}\n` +
      `Contact: ${inquiry.userDetails?.contactPerson}\n` +
      `Status: ${inquiry.status}\n` +
      `Date: ${formatDate(inquiry.createdAt)}\n` +
      `Total: ${formatPrice(inquiry.subtotal)}\n\n` +
      `*Products:*\n${productSummary}`;

    const cleanNumber = inquiry.userDetails.whatsapp.replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDownloadAttachment = async (file) => {
    try {
      toast.loading('Downloading file...', { id: 'download' });
      const response = await fetch(file.fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success('File downloaded successfully', { id: 'download' });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file', { id: 'download' });
      window.open(file.fileUrl, '_blank');
    }
  };

  const renderActionButtons = () => {
    switch(inquiry.status) {
      case 'submitted':
        return (
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={`/admin/edit-quotation?id=${inquiry._id}`}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              <Eye className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              Review for Quotation
            </Link>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors font-medium"
            >
              <XCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              <span className=" xs:inline">Cancel</span>
            </button>
          </div>
        );
      
      case 'accepted':
        return (
          <button
            onClick={handleCreateInvoice}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium"
          >
            <FileOutput className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            <span className=" xs:inline">Create Invoice</span>
          </button>
        );
      
      case 'invoiced':
        return (
          <button
            onClick={handleViewInvoice}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-purple-100 text-purple-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            <Eye className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            <span className=" xs:inline">View Invoice</span>
          </button>
        );
      
      case 'quoted':
        return (
          <span className="text-[10px] sm:text-xs text-[#E39A65] bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
            Awaiting customer acceptance
          </span>
        );
      
      default:
        return null;
    }
  };
 
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Header with Customer Info */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center shadow-md">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">{inquiry.inquiryNumber}</h3>
                  <StatusBadge status={inquiry.status} />
                  {hasUnavailableItems() && (
                    <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
                      Has Unavailable Items
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500 mt-0.5">
                  <span>{formatDate(inquiry.createdAt)}</span>
                  <span>•</span>
                  <span>{inquiry.totalItems} products</span>
                  <span>•</span>
                  <span>{inquiry.totalQuantity} pcs</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <Eye className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                {showDetails ? 'Hide' : 'View'}
              </button>

              {renderActionButtons()}

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors font-medium"
              >
                <Trash2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                <span className=" xs:inline">Delete</span>
              </button>
            </div>
          </div>

          {/* Customer Info Row */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-2 sm:mt-3 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
              <span className="truncate">{inquiry.userDetails?.companyName || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
              <span className="truncate">{inquiry.userDetails?.contactPerson || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
              <a href={`mailto:${inquiry.userDetails?.email}`} className="truncate hover:text-[#E39A65]">
                {inquiry.userDetails?.email || 'N/A'}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
              <span className="truncate">{inquiry.userDetails?.phone || 'N/A'}</span>
            </div>
          </div>

          {/* Address Row */}
          {(inquiry.userDetails?.address || inquiry.userDetails?.city || inquiry.userDetails?.country) && (
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2">
              <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400" />
              <span className="truncate">
                {[inquiry.userDetails?.address, inquiry.userDetails?.city, inquiry.userDetails?.country]
                  .filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Collapsible Details with Availability Display */}
        {showDetails && (
          <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50/30">
            {/* Products Section */}
            <div className="mb-3 sm:mb-4">
              <h4 className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2">Products</h4>
              <div className="space-y-2 sm:space-y-3">
                {inquiry.items.map((product, idx) => {
                  const isProductAvailable = product.isAvailable !== false;
                  
                  return (
                    <div key={idx} className={`bg-white rounded-lg p-2 sm:p-3 border ${isProductAvailable ? 'border-gray-100' : 'border-red-200 bg-red-50/20'}`}>
                      {/* Product Header */}
                      <div className="flex items-start gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={product.productImage || 'https://via.placeholder.com/32'} 
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 flex-wrap">
                            <p className={`text-[10px] sm:text-xs font-medium ${isProductAvailable ? 'text-gray-900' : 'text-red-600 line-through'}`}>
                              {product.productName}
                            </p>
                            {!isProductAvailable && (
                              <span className="text-[8px] bg-red-100 text-red-700 px-1 py-0.5 rounded-full">
                                Unavailable
                              </span>
                            )}
                          </div>
                          <p className={`text-[8px] sm:text-[10px] ${isProductAvailable ? 'text-gray-500' : 'text-red-400'}`}>
                            Total: {product.totalQuantity} pcs • {formatPrice(product.totalQuantity * product.unitPrice)}
                          </p>
                          {product.adminNote && (
                            <p className="text-[7px] sm:text-[9px] text-blue-600 mt-0.5">
                              📝 Note: {product.adminNote}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Colors Section */}
                      <div className="grid grid-cols-1 gap-1.5 sm:gap-2 mt-1">
                        {product.colors.map((color, cIdx) => {
                          const isColorAvailable = color.isAvailable !== false;
                          const colorSubtotal = (color.totalForColor || 0) * (color.unitPrice || 0);
                          
                          return (
                            <div key={cIdx} className={`pl-2 border-l-2 ${isColorAvailable ? 'border-gray-200' : 'border-red-300'}`}>
                              <div className="flex items-center justify-between mb-0.5">
                                <div className="flex items-center gap-1">
                                  <div 
                                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-gray-300 shadow-sm flex-shrink-0" 
                                    style={{ backgroundColor: color.color.code }} 
                                    title={`${color.totalForColor} pcs @ ${formatPrice(color.unitPrice)}/pc`}
                                  />
                                  <span className={`text-[8px] sm:text-[9px] font-medium ${isColorAvailable ? 'text-gray-700' : 'text-red-600 line-through'}`}>
                                    {color.color.name || color.color.code}
                                  </span>
                                  {!isColorAvailable && (
                                    <span className="text-[7px] bg-red-100 text-red-700 px-1 py-0.5 rounded-full">Unavailable</span>
                                  )}
                                  <span className={`text-[7px] sm:text-[8px] ${isColorAvailable ? 'text-gray-400' : 'text-red-400'}`}>
                                    {color.totalForColor} pcs × {formatPrice(color.unitPrice)} = {formatPrice(colorSubtotal)}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Sizes Grid */}
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {color.sizeQuantities.map((sq, sIdx) => {
                                  const isSizeAvailable = sq.isAvailable !== false;
                                  
                                  return (
                                    <span 
                                      key={sIdx} 
                                      className={`text-[7px] sm:text-[8px] px-1 py-0.5 rounded ${
                                        isSizeAvailable 
                                          ? 'bg-gray-100 text-gray-600' 
                                          : 'bg-red-100 text-red-600 line-through'
                                      }`}
                                    >
                                      {sq.size}:{sq.quantity}
                                      {!isSizeAvailable && ' (Unavailable)'}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Product Special Instructions */}
                      {product.specialInstructions && (
                        <div className="mt-1.5 text-[7px] sm:text-[8px] text-blue-600 bg-blue-50 p-1 rounded">
                          📝 Product Note: {product.specialInstructions}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer Special Instructions */}
           {/* Customer Special Instructions */}
{inquiry.specialInstructions && (
  <div className="mb-3 sm:mb-4">
    <h4 className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2">Customer Instructions</h4>
    <div className="bg-amber-50 rounded-lg p-2 sm:p-3 border border-amber-100">
      <p className="text-[8px] sm:text-[10px] text-amber-700">{inquiry.specialInstructions}</p>
    </div>
  </div>
)}

{/* Admin Note - Show for all statuses, with status indicator */}
{inquiry.adminNote && (
  <div className="mb-3 sm:mb-4">
    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
      <h4 className="text-[10px] sm:text-xs font-semibold text-gray-700">Admin Note</h4>
    
      {inquiry.status === 'quoted' && (
        <span className="text-[8px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
          Sent to customer
        </span>
      )}
    </div>
    <div className="bg-blue-50 rounded-lg p-2 sm:p-3 border border-blue-200">
      <p className="text-[8px] sm:text-[10px] text-blue-800 whitespace-pre-wrap">{inquiry.adminNote}</p>
    </div>
    {inquiry.status !== 'quoted' && inquiry.status !== 'submitted' && (
      <p className="text-[7px] text-gray-400 mt-1">
        Note: This note was sent to the customer with the quotation
      </p>
    )}
  </div>
)}

            {/* Attachments */}
            {inquiry.attachments && inquiry.attachments.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <h4 className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2">Attachments</h4>
                <div className="space-y-1.5 sm:space-y-2">
                  {inquiry.attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-1.5 sm:p-2 border border-gray-200">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Paperclip className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400" />
                        <span className="text-[8px] sm:text-[10px] text-gray-600 truncate max-w-[120px] sm:max-w-none">{file.fileName}</span>
                        <span className="text-[7px] sm:text-[9px] text-gray-400">
                          ({(file.fileSize / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        onClick={() => handleDownloadAttachment(file)}
                        className="p-0.5 sm:p-1 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-0.5"
                        title="Download"
                      >
                        <Download className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer with Total Value and WhatsApp */}
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 bg-gray-50/30">
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
            <span className="text-gray-500">Total Value:</span>
            <span className="font-semibold text-[#E39A65] text-xs sm:text-sm">{formatPrice(inquiry.subtotal)}</span>
            {hasUnavailableItems() && (
              <span className="text-red-500 text-[8px]">(Some items unavailable)</span>
            )}
          </div>
          
          {inquiry.userDetails?.whatsapp && (
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1.5 text-[10px] sm:text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
              title={`WhatsApp ${inquiry.userDetails.contactPerson || 'customer'}`}
            >
              <MessageCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              <span className=" xs:inline">WhatsApp</span>
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 text-rose-600 mb-3 sm:mb-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">Delete Inquiry</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                Are you sure you want to delete inquiry <span className="font-semibold">"{inquiry.inquiryNumber}"</span>?
              </p>
              <p className="text-xs text-gray-500 mb-4 sm:mb-6">
                This action cannot be undone. All data associated with this inquiry will be permanently removed.
              </p>

              <div className="flex items-center justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 sm:gap-2"
                >
                  {deleting ? <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> : <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                  Delete Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 text-rose-600 mb-3 sm:mb-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">Cancel Inquiry</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                Are you sure you want to cancel inquiry <span className="font-semibold">"{inquiry.inquiryNumber}"</span>?
              </p>
              <p className="text-xs text-gray-500 mb-4 sm:mb-6">
                This will mark the inquiry as cancelled. This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Keep Inquiry
                </button>
                <button
                  onClick={handleCancelInquiry}
                  disabled={deleting}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 sm:gap-2"
                >
                  {deleting ? <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> : <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />}
                  Cancel Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Search Bar - Responsive
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="relative">
      <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search by inquiry #, company, contact, product..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
      />
    </div>
  );
};

// Filter Bar - Responsive
const FilterBar = ({ 
  onFilter, 
  activeFilter, 
  setActiveFilter,
  filterType,
  setFilterType,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  onMonthChange,
  onYearChange
}) => {
  const filters = ['All', 'Submitted', 'Quoted', 'Accepted', 'Invoiced', 'Cancelled'];

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-2 sm:gap-3">
      {/* Status Filters */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              onFilter(filter);
            }}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-lg transition-colors ${
              activeFilter === filter
                ? 'bg-[#E39A65] text-white shadow-md shadow-[#E39A65]/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Month/Year Filter */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <div className="flex items-center gap-0.5 sm:gap-1 border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors ${
              filterType === 'all' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('year')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors ${
              filterType === 'year' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Year
          </button>
          <button
            onClick={() => setFilterType('month')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors ${
              filterType === 'month' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
        </div>

        {/* Month Navigation */}
        {filterType === 'month' && (
          <div className="flex items-center gap-0.5 sm:gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onMonthChange(-1)}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium bg-white text-gray-700 border-x border-gray-200 whitespace-nowrap">
              {getMonthName(selectedMonth)} {selectedYear}
            </span>
            <button
              onClick={() => onMonthChange(1)}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Next month"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}

        {/* Year Navigation */}
        {filterType === 'year' && (
          <div className="flex items-center gap-0.5 sm:gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onYearChange(-1)}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Previous year"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium bg-white text-gray-700 border-x border-gray-200">
              {selectedYear}
            </span>
            <button
              onClick={() => onYearChange(1)}
              className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Next year"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Admin Page Component
export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [filterType, setFilterType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  const [allStats, setAllStats] = useState({
    total: 0,
    submitted: 0,
    quoted: 0,
    accepted: 0,
    invoiced: 0,
    cancelled: 0,
    totalValue: 0
  });

  const router = useRouter();

  const filterByDate = (inquiriesList) => {
    if (filterType === 'all') return inquiriesList;
    
    return inquiriesList.filter(inquiry => {
      const inquiryDate = new Date(inquiry.createdAt);
      const inquiryYear = inquiryDate.getFullYear();
      const inquiryMonth = inquiryDate.getMonth();
      
      if (filterType === 'year') {
        return inquiryYear === selectedYear;
      } else if (filterType === 'month') {
        return inquiryYear === selectedYear && inquiryMonth === selectedMonth;
      }
      return true;
    });
  };

  const calculateAllStats = (allInquiries) => {
    const totalValue = allInquiries.reduce((sum, i) => sum + (i.subtotal || 0), 0);
    
    setAllStats({
      total: allInquiries.length,
      submitted: allInquiries.filter(i => i.status === 'submitted').length,
      quoted: allInquiries.filter(i => i.status === 'quoted').length,
      accepted: allInquiries.filter(i => i.status === 'accepted').length,
      invoiced: allInquiries.filter(i => i.status === 'invoiced').length,
      cancelled: allInquiries.filter(i => i.status === 'cancelled').length,
      totalValue
    });
  };

  const applyFilters = (inquiriesList, statusFilter, dateFilterType, searchTerm = '') => {
    let filtered = [...inquiriesList];
    filtered = filterByDate(filtered);

    if (statusFilter !== 'All') {
      filtered = filtered.filter(inquiry => 
        inquiry.status === statusFilter.toLowerCase()
      );
    }

    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(inquiry => 
        inquiry.inquiryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.userDetails?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.userDetails?.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.userDetails?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.items.some(item => 
          item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  };

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const allInquiriesResponse = await fetch(`http://localhost:5000/api/admin/inquiries/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const allInquiriesData = await allInquiriesResponse.json();
      
      if (allInquiriesData.success) {
        const dateFilteredAll = filterByDate(allInquiriesData.data);
        calculateAllStats(dateFilteredAll);
      }

      let url = `http://localhost:5000/api/admin/inquiries?page=${currentPage}&limit=${itemsPerPage}`;
      
      if (activeFilter !== 'All') {
        url += `&status=${activeFilter.toLowerCase()}`;
      }
      
      if (filterType === 'year') {
        url += `&year=${selectedYear}`;
      } else if (filterType === 'month') {
        url += `&month=${selectedMonth + 1}&year=${selectedYear}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setInquiries(data.data.inquiries);
        setFilteredInquiries(data.data.inquiries);
        setTotalInquiries(data.data.pagination.total);
        setTotalPages(data.data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [currentPage, activeFilter, filterType, selectedMonth, selectedYear]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInquiries();
  };

  const handleSearch = (term) => {
    if (!term.trim()) {
      fetchInquiries();
    } else {
      const filtered = inquiries.filter(inquiry => 
        inquiry.inquiryNumber.toLowerCase().includes(term.toLowerCase()) ||
        inquiry.userDetails?.companyName?.toLowerCase().includes(term.toLowerCase()) ||
        inquiry.userDetails?.contactPerson?.toLowerCase().includes(term.toLowerCase()) ||
        inquiry.userDetails?.email?.toLowerCase().includes(term.toLowerCase()) ||
        inquiry.items.some(item => 
          item.productName.toLowerCase().includes(term.toLowerCase())
        )
      );
      setFilteredInquiries(filtered);
      setTotalPages(1);
    }
    setCurrentPage(1);
  };

  const handleFilter = (status) => {
    setActiveFilter(status);
    setCurrentPage(1);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById('inquiries-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[#E39A65] mx-auto mb-3 sm:mb-4" />
          <p className="text-xs sm:text-sm text-gray-500">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-10">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Inquiry Management</h1>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 flex flex-wrap items-center gap-1">
                Total {allStats.total} inquiries • {formatPrice(allStats.totalValue)} total value
                {filterType !== 'all' && (
                  <span className="text-[#E39A65] font-medium">
                    • Showing: {getFilterDisplayText()}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">Refresh</span>
            </button>
          </div>

          {/* Stats - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            <StatCard title="Total" value={allStats.total} icon={ShoppingBag} color="gray" />
            <StatCard title="Submitted" value={allStats.submitted} icon={Clock} color="amber" />
            <StatCard title="Quoted" value={allStats.quoted} icon={FileText} color="blue" />
            <StatCard title="Accepted" value={allStats.accepted} icon={CheckSquare} color="emerald" />
            <StatCard title="Invoiced" value={allStats.invoiced} icon={FileOutput} color="purple" />
            <StatCard title="Cancelled" value={allStats.cancelled} icon={XCircle} color="rose" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-3 sm:py-4">
        {/* Search and Filter */}
        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
          <SearchBar onSearch={handleSearch} />
          <FilterBar 
            onFilter={handleFilter} 
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filterType={filterType}
            setFilterType={setFilterType}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
        </div>

        {/* Results Summary */}
        <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 mb-2 sm:mb-3">
          <p className="text-[9px] sm:text-xs text-gray-500">
            Showing <span className="font-medium">{filteredInquiries.length}</span> inquiries 
            {totalInquiries > itemsPerPage && (
              <> (Page {currentPage} of {totalPages})</>
            )}
            {filterType !== 'all' && (
              <span className="text-[#E39A65]">
                • {getFilterDisplayText()}
              </span>
            )}
          </p>
          <p className="text-[9px] sm:text-xs text-gray-500">
            Filtered Total: <span className="font-semibold text-[#E39A65]">{totalInquiries}</span>
          </p>
        </div>

        {/* Inquiries List */}
        <div id="inquiries-list">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FileSearch className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">No inquiries found</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                {allStats.total === 0 
                  ? "No inquiries have been submitted yet" 
                  : filterType !== 'all'
                    ? `No inquiries found for ${getFilterDisplayText().toLowerCase()}`
                    : "Try adjusting your filters"}
              </p>
              {filterType !== 'all' && allStats.total > 0 && (
                <button
                  onClick={() => setFilterType('all')}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E39A65] text-white text-[10px] sm:text-sm rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  <CalendarRange className="w-3 h-3 sm:w-4 sm:h-4" />
                  View All Time
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-2 sm:space-y-3">
                {filteredInquiries.map((inquiry) => (
                  <AdminInquiryCard 
                    key={inquiry._id} 
                    inquiry={inquiry} 
                    onRefresh={handleRefresh}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}