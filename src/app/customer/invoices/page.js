'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Eye,
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
  AlertTriangle,
  Hash,
  Package,
  CreditCard,
  Filter,
  Download,
  Printer
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

// Payment Status Badge Component (Read-only for customer)
const PaymentStatusBadge = ({ status, isExpired = false }) => {
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

// Stat Card Component for Customer
const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200'
  };

  return (
    <div className={`rounded-xl border p-4 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium opacity-75 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-2 rounded-lg bg-white bg-opacity-50`}>
          <Icon className="w-4 h-4" />
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
        placeholder="Search by invoice #, amount, or date..."
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

// Filter Bar with Date Range
const FilterBar = ({ 
  activeFilter, 
  setActiveFilter, 
  onFilter,
  onDateFilter,
  dateRange 
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
        value={dateRange}
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
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function CustomerInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    unpaid: 0,
    expired: 0
  });
  const [customerName, setCustomerName] = useState('');
  const router = useRouter();

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Get user info
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setCustomerName(user.companyName || user.name || 'Customer');
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }

      // Fetch customer's invoices
      const response = await fetch(`http://localhost:5000/api/invoices/my-invoices`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        // Add expired flag to invoices
        const invoicesWithExpiry = data.data.map(inv => ({
          ...inv,
          isExpired: isInvoiceExpired(inv)
        }));
        
        // Sort by date (newest first)
        const sortedInvoices = invoicesWithExpiry.sort((a, b) => 
          new Date(b.invoiceDate) - new Date(a.invoiceDate)
        );
        
        setInvoices(sortedInvoices);
        setFilteredInvoices(sortedInvoices);
        setTotalPages(Math.ceil(sortedInvoices.length / itemsPerPage));
        
        // Calculate stats
        const paid = sortedInvoices.filter(i => i.paymentStatus === 'paid').length;
        const unpaid = sortedInvoices.filter(i => i.paymentStatus === 'unpaid' || i.paymentStatus === 'partial').length;
        const expired = sortedInvoices.filter(i => isInvoiceExpired(i)).length;
        
        setStats({
          total: sortedInvoices.length,
          paid,
          unpaid,
          expired
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
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInvoices();
  };

  const handleSearch = (term) => {
    if (!term.trim()) {
      // If search is cleared, apply current filters
      applyFilters(activeFilter, dateRange, invoices);
    } else {
      const searched = invoices.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(term.toLowerCase()) ||
        invoice.finalTotal.toString().includes(term) ||
        formatDate(invoice.invoiceDate).toLowerCase().includes(term.toLowerCase())
      );
      // Apply current filters to search results
      applyFilters(activeFilter, dateRange, searched, term);
    }
    setCurrentPage(1);
  };

  const handleFilter = (status) => {
    setActiveFilter(status);
    applyFilters(status, dateRange, invoices);
    setCurrentPage(1);
  };

  const handleDateFilter = (range) => {
    setDateRange(range);
    applyFilters(activeFilter, range, invoices);
    setCurrentPage(1);
  };

  const applyFilters = (status, range, sourceInvoices, searchTerm = '') => {
    let filtered = [...sourceInvoices];

    // Apply date filter
    if (range !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch(range) {
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
      }
      
      filtered = filtered.filter(inv => new Date(inv.invoiceDate) >= startDate);
    }

    // Apply status filter
    if (status !== 'All') {
      if (status === 'Expired') {
        filtered = filtered.filter(inv => isInvoiceExpired(inv));
      } else {
        filtered = filtered.filter(inv => 
          inv.paymentStatus?.toLowerCase() === status.toLowerCase()
        );
      }
    }

    setFilteredInvoices(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById('invoices-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

const handleViewInvoice = (invoiceId) => {
  router.push(`/customer/viewInvoice?invoiceId=${invoiceId}`);
};

  const handleDownloadPDF = (invoiceId) => {
    window.open(`http://localhost:5000/api/invoices/${invoiceId}/pdf`, '_blank');
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
          <p className="text-sm text-gray-500">Loading your invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Invoices</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Welcome back, {customerName}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-3">
            <StatCard 
              title="Total Invoices" 
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
              title="Pending" 
              value={stats.unpaid} 
              icon={AlertCircle} 
              color="amber" 
            />
            <StatCard 
              title="Expired" 
              value={stats.expired} 
              icon={Clock} 
              color="rose" 
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
            dateRange={dateRange}
          />
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium">{filteredInvoices.length > 0 ? indexOfFirstInvoice + 1 : 0}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastInvoice, filteredInvoices.length)}</span> of{' '}
            <span className="font-medium">{filteredInvoices.length}</span> invoices
            {dateRange !== 'all' && (
              <span className="ml-1 text-[#E39A65]">
                • Filtered by: {dateRange}
              </span>
            )}
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
              <p className="text-sm text-gray-500">
                {invoices.length === 0 
                  ? "You don't have any invoices yet. They will appear here once created." 
                  : 'Try adjusting your filters'}
              </p>
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
                          <Calendar className="w-3.5 h-3.5" />
                          Date
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
                            <div className="text-sm text-gray-900">{formatDate(invoice.invoiceDate)}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Due: {formatDate(invoice.dueDate)}
                            </div>
                            {isExpired && (
                              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs">
                                <AlertTriangle className="w-3 h-3" />
                                {overdueDays} days overdue
                              </div>
                            )}
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-900">{invoice.items?.length || 0} products</div>
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
                            <PaymentStatusBadge 
                              status={invoice.paymentStatus} 
                              isExpired={isExpired} 
                            />
                          </td>
                          
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewInvoice(invoice._id)}
                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Invoice"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                             
                             
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

        {/* Footer Note */}
        <div className="mt-4 text-center text-xs text-gray-400">
          For any questions about your invoices, please contact our support team.
        </div>
      </div>
    </div>
  );
}