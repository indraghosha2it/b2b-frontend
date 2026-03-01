'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Eye,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Building2,
  User,
  Mail,
  Phone,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  ChevronDown,
  AlertTriangle,
  Hash,
  Package,
  CreditCard,
  Filter,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon,
  Activity,
  BarChart3,
  PieChart
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
    day: 'numeric'
  });
};

// Check if invoice is expired (due date passed)
const isInvoiceExpired = (invoice) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(invoice.dueDate);
  dueDate.setHours(0, 0, 0, 0);
  
  return dueDate < today && 
         invoice.paymentStatus !== 'paid' && 
         invoice.paymentStatus !== 'cancelled' &&
         invoice.paymentStatus !== 'overpaid';
};

// Calculate overdue days
const getOverdueDays = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = today - due;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Payment Status Badge Component
const PaymentStatusBadge = ({ status, isExpired = false }) => {
  // If expired and status is not paid/cancelled/overpaid, show as expired
  const displayStatus = isExpired ? 'expired' : status;
  
  const statusConfig = {
    paid: { 
      bg: 'bg-emerald-50', 
      text: 'text-emerald-700', 
      border: 'border-emerald-200',
      label: 'Paid', 
      icon: CheckCircle 
    },
    partial: { 
      bg: 'bg-amber-50', 
      text: 'text-amber-700', 
      border: 'border-amber-200',
      label: 'Partial', 
      icon: TrendingUp 
    },
    unpaid: { 
      bg: 'bg-rose-50', 
      text: 'text-rose-700', 
      border: 'border-rose-200',
      label: 'Unpaid', 
      icon: AlertCircle 
    },
    expired: { 
      bg: 'bg-orange-50', 
      text: 'text-orange-700', 
      border: 'border-orange-200',
      label: 'Expired', 
      icon: Clock 
    },
    overpaid: { 
      bg: 'bg-purple-50', 
      text: 'text-purple-700', 
      border: 'border-purple-200',
      label: 'Overpaid', 
      icon: TrendingDown 
    },
    cancelled: { 
      bg: 'bg-gray-100', 
      text: 'text-gray-700', 
      border: 'border-gray-300',
      label: 'Cancelled', 
      icon: XCircle 
    }
  };

  const normalizedStatus = displayStatus?.toLowerCase() || 'unpaid';
  const config = statusConfig[normalizedStatus] || statusConfig.unpaid;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} border ${config.border}`}>
      <Icon className={`w-3.5 h-3.5 ${config.text}`} />
      <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
    </div>
  );
};

// Modern, Compact Stat Card Component
const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'blue' }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-500',
      iconColor: 'text-white',
      text: 'text-blue-700',
      border: 'border-blue-200',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    emerald: {
      bg: 'bg-emerald-50',
      iconBg: 'bg-emerald-500',
      iconColor: 'text-white',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    amber: {
      bg: 'bg-amber-50',
      iconBg: 'bg-amber-500',
      iconColor: 'text-white',
      text: 'text-amber-700',
      border: 'border-amber-200',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    rose: {
      bg: 'bg-rose-50',
      iconBg: 'bg-rose-500',
      iconColor: 'text-white',
      text: 'text-rose-700',
      border: 'border-rose-200',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-500',
      iconColor: 'text-white',
      text: 'text-purple-700',
      border: 'border-purple-200',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    orange: {
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-500',
      iconColor: 'text-white',
      text: 'text-orange-700',
      border: 'border-orange-200',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    gray: {
      bg: 'bg-gray-50',
      iconBg: 'bg-gray-600',
      iconColor: 'text-white',
      text: 'text-gray-700',
      border: 'border-gray-200',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    }
  };

  const theme = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`relative overflow-hidden rounded-xl border ${theme.border} ${theme.bg} p-4 hover:shadow-md transition-all duration-300 group`}>
      {/* Decorative gradient line */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.iconBg.replace('bg-', 'from-')} to-transparent opacity-50`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' ? (
                  <TrendUpIcon className={`w-3 h-3 ${theme.trendUp}`} />
                ) : trend === 'down' ? (
                  <TrendDownIcon className={`w-3 h-3 ${theme.trendDown}`} />
                ) : null}
                <span className={`text-xs font-medium ${trend === 'up' ? theme.trendUp : trend === 'down' ? theme.trendDown : 'text-gray-500'}`}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          
          <div className={`p-2.5 rounded-lg ${theme.iconBg} bg-opacity-90 shadow-sm`}>
            <Icon className={`w-4 h-4 ${theme.iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Search Bar
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search by invoice #, company, contact, email..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
      />
    </div>
  );
};

// Filter Bar
const FilterBar = ({ 
  activeFilter, 
  setActiveFilter, 
  onFilter,
  onDateFilter 
}) => {
  const paymentFilters = ['All', 'Paid', 'Partial', 'Unpaid', 'Expired', 'Overpaid', 'Cancelled'];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400" />
        <span className="text-xs font-medium text-gray-500">Filter by:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {paymentFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              onFilter(filter);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeFilter === filter
                ? 'bg-[#E39A65] text-white shadow-md shadow-[#E39A65]/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <select
        onChange={(e) => onDateFilter(e.target.value)}
        className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent ml-auto"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl mt-4">
      <div className="text-xs text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="First page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
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
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Main Admin Invoices Page Component
export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [userRole, setUserRole] = useState('admin');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  
  // Delete modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingInvoice, setDeletingInvoice] = useState(null);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    partial: 0,
    unpaid: 0,
    expired: 0,
    overpaid: 0,
    cancelled: 0
  });
  const router = useRouter();

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Get user role from localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserRole(user.role || 'admin');
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }

      // Build query params
      let url = `http://localhost:5000/api/invoices?page=${currentPage}&limit=${itemsPerPage}`;
      
      if (activeFilter !== 'All') {
        const filterMap = {
          'Paid': 'paid',
          'Partial': 'partial',
          'Unpaid': 'unpaid',
          'Expired': 'overdue',
          'Overpaid': 'overpaid',
          'Cancelled': 'cancelled'
        };
        const apiFilter = filterMap[activeFilter];
        if (apiFilter) {
          url += `&paymentStatus=${apiFilter}`;
        }
      }
      
      if (dateRange !== 'all') {
        const now = new Date();
        let startDate;
        
        switch(dateRange) {
          case 'today':
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
          case 'week':
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case 'month':
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
          case 'year':
            startDate = new Date(now.setFullYear(now.getFullYear() - 1));
            break;
          default:
            startDate = null;
        }
        
        if (startDate) {
          url += `&startDate=${startDate.toISOString()}`;
        }
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        // Add expired flag to invoices
        const invoicesWithExpiry = data.data.invoices.map(inv => ({
          ...inv,
          isExpired: isInvoiceExpired(inv)
        }));
        
        setInvoices(invoicesWithExpiry);
        setFilteredInvoices(invoicesWithExpiry);
        setTotalInvoices(data.data.pagination.total);
        setTotalPages(data.data.pagination.pages);
        
        // Calculate stats
        const paid = data.data.invoices.filter(i => i.paymentStatus === 'paid').length;
        const partial = data.data.invoices.filter(i => i.paymentStatus === 'partial').length;
        const unpaid = data.data.invoices.filter(i => i.paymentStatus === 'unpaid').length;
        const overpaid = data.data.invoices.filter(i => i.paymentStatus === 'overpaid').length;
        const cancelled = data.data.invoices.filter(i => i.paymentStatus === 'cancelled').length;
        const expired = data.data.invoices.filter(i => isInvoiceExpired(i)).length;
        
        setStats({
          total: data.data.pagination.total,
          paid,
          partial,
          unpaid,
          expired,
          overpaid,
          cancelled
        });
      }
    } catch (error) {
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [currentPage, activeFilter, dateRange]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInvoices();
  };

  const handleSearch = (term) => {
    if (!term.trim()) {
      fetchInvoices();
    } else {
      const filtered = invoices.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(term.toLowerCase()) ||
        invoice.customer?.companyName?.toLowerCase().includes(term.toLowerCase()) ||
        invoice.customer?.contactPerson?.toLowerCase().includes(term.toLowerCase()) ||
        invoice.customer?.email?.toLowerCase().includes(term.toLowerCase()) ||
        invoice.inquiryNumber?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredInvoices(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }
    setCurrentPage(1);
  };

  const handleFilter = (status) => {
    setActiveFilter(status);
    setCurrentPage(1);
  };

  const handleDateFilter = (range) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById('invoices-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleView = (invoiceId) => {
    router.push(`/admin/viewInvoice?invoiceId=${invoiceId}`);
    
  };

  const handleEdit = (invoiceId) => {
    router.push(`/admin/invoices/edit/${invoiceId}`);
  };

  const handleDeleteClick = (invoice) => {
    setInvoiceToDelete(invoice);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!invoiceToDelete) return;
    
    setDeletingInvoice(invoiceToDelete._id);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Invoice deleted successfully');
        fetchInvoices();
        setShowDeleteConfirm(false);
        setInvoiceToDelete(null);
      } else {
        toast.error(data.error || 'Failed to delete invoice');
      }
    } catch (error) {
      toast.error('Failed to delete invoice');
    } finally {
      setDeletingInvoice(null);
    }
  };

  const handleStatusUpdate = async (invoiceId, newStatus) => {
    setUpdatingStatus(invoiceId);
    try {
      const token = localStorage.getItem('token');
      
      // Prepare update data
      const updateData = { paymentStatus: newStatus };
      
      // If marking as paid, set amountPaid to finalTotal
      const invoice = invoices.find(i => i._id === invoiceId);
      if (newStatus === 'paid' && invoice) {
        updateData.amountPaid = invoice.finalTotal;
        updateData.dueAmount = 0;
      }
      // If cancelling, set dueAmount to 0
      else if (newStatus === 'cancelled') {
        updateData.dueAmount = 0;
      }

      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Invoice status updated to ${newStatus}`);
        fetchInvoices();
        setStatusDropdownOpen(null);
      } else {
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Get available status options based on current status
  const getStatusOptions = (invoice) => {
    const isExpired = invoice.isExpired;
    
    // If paid or cancelled, no options
    if (invoice.paymentStatus === 'paid' || invoice.paymentStatus === 'cancelled') {
      return [];
    }

    // If expired
    if (isExpired) {
      return [
        { value: 'paid', label: 'Mark as Paid', icon: CheckCircle },
        { value: 'cancelled', label: 'Cancel Invoice', icon: XCircle }
      ];
    }

    // Based on current status
    switch (invoice.paymentStatus) {
      case 'partial':
        return [
          { value: 'paid', label: 'Mark as Paid', icon: CheckCircle },
          { value: 'cancelled', label: 'Cancel Invoice', icon: XCircle }
        ];
      case 'unpaid':
        return [
          { value: 'paid', label: 'Mark as Paid', icon: CheckCircle },
          { value: 'cancelled', label: 'Cancel Invoice', icon: XCircle }
        ];
      case 'overpaid':
        return [
          { value: 'paid', label: 'Mark as Paid', icon: CheckCircle }
        ];
      default:
        return [];
    }
  };

  // Get current page invoices
  const indexOfLastInvoice = currentPage * itemsPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#E39A65] mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-10">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Total {totalInvoices} invoices
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
        <Link
  href="/admin/inquiries?filter=accepted"
  className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
>
  <PlusCircle className="w-3.5 h-3.5" />
  Create Invoice from Inquiry
</Link>
            </div>
          </div>

          {/* Stats Cards - Compact Grid - Removed Revenue and Overpaid */}
          <div className="grid grid-cols-6 gap-2">
            <StatCard 
              title="Total" 
              value={stats.total} 
              icon={FileText} 
              color="blue" 
            />
            <StatCard 
              title="Paid" 
              value={stats.paid} 
              icon={CheckCircle} 
              color="emerald" 
            />
            <StatCard 
              title="Partial" 
              value={stats.partial} 
              icon={TrendingUp} 
              color="amber" 
            />
            <StatCard 
              title="Unpaid" 
              value={stats.unpaid} 
              icon={AlertCircle} 
              color="rose" 
            />
            <StatCard 
              title="Expired" 
              value={stats.expired} 
              icon={Clock} 
              color="orange" 
            />
            {/* <StatCard 
              title="Overpaid" 
              value={stats.overpaid} 
              icon={TrendingDown} 
              color="purple" 
            /> */}
            <StatCard 
              title="Cancelled" 
              value={stats.cancelled} 
              icon={XCircle} 
              color="gray" 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-4">
        {/* Search and Filter */}
        <div className="space-y-3 mb-4">
          <SearchBar onSearch={handleSearch} />
          <FilterBar 
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onFilter={handleFilter}
            onDateFilter={handleDateFilter}
          />
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium">{filteredInvoices.length > 0 ? indexOfFirstInvoice + 1 : 0}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastInvoice, filteredInvoices.length)}</span> of{' '}
            <span className="font-medium">{filteredInvoices.length}</span> invoices
          </p>
        </div>

        {/* Invoices Table */}
        <div id="invoices-table" className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {filteredInvoices.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">No Invoices Found</h2>
              <p className="text-sm text-gray-500 mb-4">
                {totalInvoices === 0 ? 'No invoices have been created yet' : 'Try adjusting your filters'}
              </p>
              <Link
                href="/admin/createInvoice?new=true"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Create First Invoice
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <Hash className="w-3.5 h-3.5" />
                          Invoice #
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          Customer
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Dates
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <Package className="w-3.5 h-3.5" />
                          Items
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5" />
                          Amount
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5" />
                          Status
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentInvoices.map((invoice) => {
                      const dueAmount = invoice.finalTotal - (invoice.amountPaid || 0);
                      const isExpired = invoice.isExpired;
                      const overdueDays = isExpired ? getOverdueDays(invoice.dueDate) : 0;
                      const statusOptions = getStatusOptions(invoice);
                      
                      return (
                        <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
                            {invoice.inquiryNumber && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                Ref: {invoice.inquiryNumber}
                              </div>
                            )}
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{invoice.customer?.companyName || 'N/A'}</div>
                            <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {invoice.customer?.contactPerson || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {invoice.customer?.email || 'N/A'}
                            </div>
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className="text-sm">
                              <span className="text-gray-600">Issued:</span>
                              <span className="ml-1 text-gray-900">{formatDate(invoice.invoiceDate)}</span>
                            </div>
                            <div className="text-sm mt-1">
                              <span className="text-gray-600">Due:</span>
                              <span className={`ml-1 ${isExpired ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                                {formatDate(invoice.dueDate)}
                              </span>
                            </div>
                            {isExpired && (
                              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs">
                                <AlertTriangle className="w-3 h-3" />
                                {overdueDays} days overdue
                              </div>
                            )}
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{invoice.items?.length || 0} products</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Qty: {invoice.items?.reduce((sum, item) => sum + (item.totalQuantity || 0), 0) || 0} pcs
                            </div>
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className="font-bold text-gray-900">{formatPrice(invoice.finalTotal)}</div>
                            <div className="text-xs text-green-600 mt-1">
                              Paid: {formatPrice(invoice.amountPaid || 0)}
                            </div>
                            {dueAmount > 0 && invoice.paymentStatus !== 'cancelled' && (
                              <div className={`text-xs font-medium ${isExpired ? 'text-red-600' : 'text-orange-600'}`}>
                                Due: {formatPrice(dueAmount)}
                              </div>
                            )}
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className="relative">
                              <button
                                onClick={() => statusOptions.length > 0 && setStatusDropdownOpen(
                                  statusDropdownOpen === invoice._id ? null : invoice._id
                                )}
                                disabled={statusOptions.length === 0 || updatingStatus === invoice._id}
                                className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                                  PaymentStatusBadge({ 
                                    status: invoice.paymentStatus, 
                                    isExpired 
                                  }).props.className
                                } ${statusOptions.length === 0 ? 'cursor-default' : 'cursor-pointer hover:shadow-sm'}`}
                              >
                                <div className="flex items-center gap-2">
                                  {invoice.paymentStatus === 'paid' && <CheckCircle className="w-3.5 h-3.5" />}
                                  {invoice.paymentStatus === 'partial' && <TrendingUp className="w-3.5 h-3.5" />}
                                  {invoice.paymentStatus === 'unpaid' && <AlertCircle className="w-3.5 h-3.5" />}
                                  {invoice.paymentStatus === 'overpaid' && <TrendingDown className="w-3.5 h-3.5" />}
                                  {invoice.paymentStatus === 'cancelled' && <XCircle className="w-3.5 h-3.5" />}
                                  {isExpired && <Clock className="w-3.5 h-3.5" />}
                                  <span className="text-xs font-medium capitalize">
                                    {isExpired ? 'Expired' : invoice.paymentStatus}
                                  </span>
                                </div>
                                {statusOptions.length > 0 && (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                                {updatingStatus === invoice._id && (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                )}
                              </button>
                              
                              {/* Status Dropdown */}
                              {statusDropdownOpen === invoice._id && statusOptions.length > 0 && (
                                <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                  {statusOptions.map((option) => (
                                    <button
                                      key={option.value}
                                      onClick={() => handleStatusUpdate(invoice._id, option.value)}
                                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                                    >
                                      <option.icon className="w-4 h-4" />
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleView(invoice._id)}
                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Invoice"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(invoice._id)}
                                className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Edit Invoice"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              {userRole === 'admin' && (
                                <button
                                  onClick={() => handleDeleteClick(invoice)}
                                  className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete Invoice"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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

      {/* Delete Confirmation Modal - Same style as inquiries page */}
      {showDeleteConfirm && invoiceToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 text-rose-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Delete Invoice</h3>
              </div>
              
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete invoice <span className="font-semibold">"{invoiceToDelete.invoiceNumber}"</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. All data associated with this invoice will be permanently removed.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setInvoiceToDelete(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deletingInvoice === invoiceToDelete._id}
                  className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  {deletingInvoice === invoiceToDelete._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}