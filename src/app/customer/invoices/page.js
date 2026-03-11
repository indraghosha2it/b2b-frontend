
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import {
//   FileText,
//   Eye,
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Clock,
//   DollarSign,
//   Calendar,
//   Search,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Building2,
//   User,
//   Mail,
//   Phone,
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   Hash,
//   Package,
//   CreditCard,
//   Filter,
//   Download,
//   Printer
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { generateInvoicePDF } from '@/utils/invoicePDF';

// // Helper function to format currency
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

// // Check if invoice is expired (due date passed) - Only for unpaid/partial invoices
// const isInvoiceExpired = (invoice) => {
//   // Don't mark as expired if paid or cancelled or overpaid
//   if (invoice.paymentStatus === 'paid' || 
//       invoice.paymentStatus === 'cancelled' || 
//       invoice.paymentStatus === 'overpaid') {
//     return false;
//   }
  
//   const today = new Date();
//   const dueDate = new Date(invoice.dueDate);
  
//   // Reset time part to compare dates only
//   today.setHours(0, 0, 0, 0);
//   dueDate.setHours(0, 0, 0, 0);
  
//   return dueDate < today;
// };

// // Calculate overdue days
// const getOverdueDays = (dueDate) => {
//   const today = new Date();
//   const due = new Date(dueDate);
  
//   // Reset time part to compare dates only
//   today.setHours(0, 0, 0, 0);
//   due.setHours(0, 0, 0, 0);
  
//   // Calculate difference in milliseconds
//   const diffTime = today - due;
  
//   // Convert to days (1000 ms * 60 seconds * 60 minutes * 24 hours)
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
//   // Only return positive numbers (if due date is in the past)
//   return diffDays > 0 ? diffDays : 0;
// };

// // Payment Status Badge Component - Shows only actual payment status
// const PaymentStatusBadge = ({ status }) => {
//   const statusConfig = {
//     paid: { 
//       bg: 'bg-emerald-100', 
//       text: 'text-emerald-800', 
//       border: 'border-emerald-300',
//       label: 'Paid', 
//       icon: CheckCircle,
//       iconColor: 'text-emerald-600'
//     },
//     partial: { 
//       bg: 'bg-blue-100', 
//       text: 'text-blue-800', 
//       border: 'border-blue-300',
//       label: 'Partial', 
//       icon: TrendingUp,
//       iconColor: 'text-blue-600'
//     },
//     unpaid: { 
//       bg: 'bg-amber-100', 
//       text: 'text-amber-800', 
//       border: 'border-amber-300',
//       label: 'Unpaid', 
//       icon: AlertCircle,
//       iconColor: 'text-amber-600'
//     },
//     overpaid: { 
//       bg: 'bg-purple-100', 
//       text: 'text-purple-800', 
//       border: 'border-purple-300',
//       label: 'Overpaid', 
//       icon: TrendingDown,
//       iconColor: 'text-purple-600'
//     },
//     cancelled: { 
//       bg: 'bg-rose-100', 
//       text: 'text-rose-800', 
//       border: 'border-rose-300',
//       label: 'Cancelled', 
//       icon: XCircle,
//       iconColor: 'text-rose-600'
//     }
//   };

//   const normalizedStatus = status?.toLowerCase() || 'unpaid';
//   const config = statusConfig[normalizedStatus] || statusConfig.unpaid;
//   const Icon = config.icon;

//   return (
//     <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} border ${config.border}`}>
//       <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
//       <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
//     </div>
//   );
// };

// // Stat Card Component for Customer
// const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
//   const colorClasses = {
//     blue: 'bg-blue-50 text-blue-700 border-blue-200',
//     emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
//     amber: 'bg-amber-50 text-amber-700 border-amber-200',
//     rose: 'bg-rose-50 text-rose-700 border-rose-200',
//     purple: 'bg-purple-50 text-purple-700 border-purple-200',
//     gray: 'bg-gray-50 text-gray-700 border-gray-200',
//     orange: 'bg-orange-50 text-orange-700 border-orange-200'
//   };

//   return (
//     <div className={`rounded-xl border p-4 ${colorClasses[color]}`}>
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium opacity-75 mb-1">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className={`p-2 rounded-lg bg-white bg-opacity-50`}>
//           <Icon className="w-4 h-4" />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Search Bar
// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   return (
//     <div className="relative">
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//       <input
//         type="text"
//         placeholder="Search by invoice #, amount, or date..."
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           onSearch(e.target.value);
//         }}
//         className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//       />
//     </div>
//   );
// };

// // Filter Bar with Date Range - Updated to remove Expired from status filters
// const FilterBar = ({ 
//   activeFilter, 
//   setActiveFilter, 
//   onFilter,
//   onDateFilter,
//   dateRange,
//   onExpiredFilter,
//   showExpiredOnly
// }) => {
//   const paymentFilters = ['All', 'Paid', 'Partial', 'Unpaid', 'Overpaid', 'Cancelled'];

//   return (
//     <div className="flex flex-wrap items-center gap-3">
//       <div className="flex items-center gap-2">
//         <Filter className="w-4 h-4 text-gray-400" />
//         <span className="text-xs font-medium text-gray-500">Filter by:</span>
//       </div>
//       <div className="flex flex-wrap gap-2">
//         {paymentFilters.map((filter) => (
//           <button
//             key={filter}
//             onClick={() => {
//               setActiveFilter(filter);
//               onFilter(filter);
//             }}
//             className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
//               activeFilter === filter && !showExpiredOnly
//                 ? 'bg-[#E39A65] text-white shadow-md shadow-[#E39A65]/20'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {filter}
//           </button>
//         ))}
        
//         {/* Expired Filter Button - Separate from status filters */}
//         <button
//           onClick={onExpiredFilter}
//           className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
//             showExpiredOnly
//               ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
//               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//           }`}
//         >
//           <Clock className="w-3.5 h-3.5" />
//           Expired
//         </button>
//       </div>
      
//       <select
//         value={dateRange}
//         onChange={(e) => onDateFilter(e.target.value)}
//         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent ml-auto"
//       >
//         <option value="all">All Time</option>
//         <option value="today">Today</option>
//         <option value="week">This Week</option>
//         <option value="month">This Month</option>
//         <option value="year">This Year</option>
//       </select>
//     </div>
//   );
// };

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;
    
//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 5; i++) {
//           pages.push(i);
//         }
//       } else if (currentPage >= totalPages - 2) {
//         for (let i = totalPages - 4; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         for (let i = currentPage - 2; i <= currentPage + 2; i++) {
//           pages.push(i);
//         }
//       }
//     }
//     return pages;
//   };

//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl mt-4">
//       <div className="text-xs text-gray-500">
//         Page {currentPage} of {totalPages}
//       </div>
//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1}
//           className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           <ChevronsLeft className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </button>

//         <div className="flex items-center gap-1">
//           {getPageNumbers().map((page) => (
//             <button
//               key={page}
//               onClick={() => onPageChange(page)}
//               className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
//                 currentPage === page
//                   ? 'bg-[#E39A65] text-white shadow-md shadow-[#E39A65]/20'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           <ChevronRight className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages}
//           className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           <ChevronsRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function CustomerInvoicesPage() {
//   const [invoices, setInvoices] = useState([]);
//   const [filteredInvoices, setFilteredInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [showExpiredOnly, setShowExpiredOnly] = useState(false);
//   const [dateRange, setDateRange] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [stats, setStats] = useState({
//     total: 0,
//     paid: 0,
//     unpaid: 0,
//     expired: 0
//   });
//   const [customerName, setCustomerName] = useState('');
//   const router = useRouter();

//   const fetchInvoices = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       // Get user info
//       const userStr = localStorage.getItem('user');
//       if (userStr) {
//         try {
//           const user = JSON.parse(userStr);
//           setCustomerName(user.companyName || user.name || 'Customer');
//         } catch (e) {
//           console.error('Error parsing user data:', e);
//         }
//       }

//       // Fetch customer's invoices
//       const response = await fetch(`http://localhost:5000/api/invoices/my-invoices`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         // Add expired flag to invoices (only for display, not as status)
//         const invoicesWithExpiry = data.data.map(inv => ({
//           ...inv,
//           isExpired: isInvoiceExpired(inv)
//         }));
        
//         // Sort by date (newest first)
//         const sortedInvoices = invoicesWithExpiry.sort((a, b) => 
//           new Date(b.invoiceDate) - new Date(a.invoiceDate)
//         );
        
//         setInvoices(sortedInvoices);
        
//         // Apply expired filter if needed
//         let filtered = sortedInvoices;
//         if (showExpiredOnly) {
//           filtered = sortedInvoices.filter(inv => inv.isExpired);
//         } else if (activeFilter !== 'All') {
//           filtered = sortedInvoices.filter(inv => 
//             inv.paymentStatus?.toLowerCase() === activeFilter.toLowerCase()
//           );
//         }
        
//         setFilteredInvoices(filtered);
//         setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        
//         // Calculate stats
//         const paid = sortedInvoices.filter(i => i.paymentStatus === 'paid').length;
//         const unpaid = sortedInvoices.filter(i => i.paymentStatus === 'unpaid' || i.paymentStatus === 'partial').length;
//         const expired = sortedInvoices.filter(i => isInvoiceExpired(i)).length;
        
//         setStats({
//           total: sortedInvoices.length,
//           paid,
//           unpaid,
//           expired
//         });
//       }
//     } catch (error) {
//       toast.error('Failed to load invoices');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, [activeFilter, showExpiredOnly, dateRange]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchInvoices();
//   };

//   const handleSearch = (term) => {
//     if (!term.trim()) {
//       // If search is cleared, apply current filters
//       applyFilters(activeFilter, showExpiredOnly, dateRange, invoices);
//     } else {
//       const searched = invoices.filter(invoice => 
//         invoice.invoiceNumber.toLowerCase().includes(term.toLowerCase()) ||
//         invoice.finalTotal.toString().includes(term) ||
//         formatDate(invoice.invoiceDate).toLowerCase().includes(term.toLowerCase())
//       );
//       // Apply current filters to search results
//       applyFilters(activeFilter, showExpiredOnly, dateRange, searched, term);
//     }
//     setCurrentPage(1);
//   };

//   const handleFilter = (status) => {
//     setActiveFilter(status);
//     setShowExpiredOnly(false);
//     applyFilters(status, false, dateRange, invoices);
//     setCurrentPage(1);
//   };

//   const handleExpiredFilter = () => {
//     setShowExpiredOnly(!showExpiredOnly);
//     setActiveFilter('All');
//     applyFilters('All', !showExpiredOnly, dateRange, invoices);
//     setCurrentPage(1);
//   };

//   const handleDateFilter = (range) => {
//     setDateRange(range);
//     applyFilters(activeFilter, showExpiredOnly, range, invoices);
//     setCurrentPage(1);
//   };

//   const applyFilters = (status, expiredOnly, range, sourceInvoices, searchTerm = '') => {
//     let filtered = [...sourceInvoices];

//     // Apply date filter
//     if (range !== 'all') {
//       const now = new Date();
//       let startDate = new Date();
      
//       switch(range) {
//         case 'today':
//           startDate = new Date(now.setHours(0, 0, 0, 0));
//           break;
//         case 'week':
//           startDate = new Date(now.setDate(now.getDate() - 7));
//           break;
//         case 'month':
//           startDate = new Date(now.setMonth(now.getMonth() - 1));
//           break;
//         case 'year':
//           startDate = new Date(now.setFullYear(now.getFullYear() - 1));
//           break;
//       }
      
//       filtered = filtered.filter(inv => new Date(inv.invoiceDate) >= startDate);
//     }

//     // Apply expired filter
//     if (expiredOnly) {
//       filtered = filtered.filter(inv => inv.isExpired);
//     }
//     // Apply status filter
//     else if (status !== 'All') {
//       filtered = filtered.filter(inv => 
//         inv.paymentStatus?.toLowerCase() === status.toLowerCase()
//       );
//     }

//     setFilteredInvoices(filtered);
//     setTotalPages(Math.ceil(filtered.length / itemsPerPage));
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     document.getElementById('invoices-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   const handleViewInvoice = (invoiceId) => {
//     router.push(`/customer/viewInvoice?invoiceId=${invoiceId}`);
//   };
// const handleDownloadPDF = async (invoice) => {
//   if (!invoice) return;
  
//   try {
//     toast.info('🖨️ Generating PDF invoice...');
//     await generateInvoicePDF(invoice);
//     toast.success('✅ PDF generated successfully!');
//   } catch (error) {
//     console.error('PDF Generation Error:', error);
//     toast.error('❌ Failed to generate PDF');
//   }
// };

//   // Get current page invoices
//   const indexOfLastInvoice = currentPage * itemsPerPage;
//   const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
//   const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-10 h-10 animate-spin text-[#E39A65] mx-auto mb-4" />
//           <p className="text-sm text-gray-500">Loading your invoices...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="container mx-auto px-4 max-w-7xl py-4">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">My Invoices</h1>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 Welcome back, {customerName}
//                 {showExpiredOnly && (
//                   <span className="ml-2 text-orange-600 font-medium">
//                     • Showing expired invoices only
//                   </span>
//                 )}
//               </p>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//             >
//               <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
//               Refresh
//             </button>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-4 gap-3">
//             <StatCard 
//               title="Total Invoices" 
//               value={stats.total} 
//               icon={FileText} 
//               color="blue" 
//             />
//             <StatCard 
//               title="Paid" 
//               value={stats.paid} 
//               icon={CheckCircle} 
//               color="emerald" 
//             />
//             <StatCard 
//               title="Pending" 
//               value={stats.unpaid} 
//               icon={AlertCircle} 
//               color="amber" 
//             />
//             <StatCard 
//               title="Expired" 
//               value={stats.expired} 
//               icon={Clock} 
//               color="orange" 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 max-w-7xl py-4">
//         {/* Search and Filter */}
//         <div className="space-y-3 mb-4">
//           <SearchBar onSearch={handleSearch} />
//           <FilterBar 
//             activeFilter={activeFilter}
//             setActiveFilter={setActiveFilter}
//             onFilter={handleFilter}
//             onDateFilter={handleDateFilter}
//             onExpiredFilter={handleExpiredFilter}
//             showExpiredOnly={showExpiredOnly}
//             dateRange={dateRange}
//           />
//         </div>

//         {/* Results Summary */}
//         <div className="flex items-center justify-between mb-2">
//           <p className="text-xs text-gray-500">
//             Showing <span className="font-medium">{filteredInvoices.length > 0 ? indexOfFirstInvoice + 1 : 0}</span> to{' '}
//             <span className="font-medium">{Math.min(indexOfLastInvoice, filteredInvoices.length)}</span> of{' '}
//             <span className="font-medium">{filteredInvoices.length}</span> invoices
//             {showExpiredOnly && (
//               <span className="ml-1 text-orange-600">(Expired only)</span>
//             )}
//             {!showExpiredOnly && dateRange !== 'all' && (
//               <span className="ml-1 text-[#E39A65]">
//                 • Filtered by: {dateRange}
//               </span>
//             )}
//           </p>
//         </div>

//         {/* Invoices Table */}
//         <div id="invoices-table" className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//           {filteredInvoices.length === 0 ? (
//             <div className="p-12 text-center">
//               <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <FileText className="w-8 h-8 text-gray-400" />
//               </div>
//               <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                 {showExpiredOnly ? 'No Expired Invoices' : 'No Invoices Found'}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 {showExpiredOnly 
//                   ? 'No invoices have expired yet.' 
//                   : invoices.length === 0 
//                     ? "You don't have any invoices yet. They will appear here once created." 
//                     : 'Try adjusting your filters'}
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-gray-50 border-b border-gray-200">
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         <div className="flex items-center gap-1">
//                           <Hash className="w-3.5 h-3.5" />
//                           Invoice #
//                         </div>
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-3.5 h-3.5" />
//                           Date
//                         </div>
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         <div className="flex items-center gap-1">
//                           <Package className="w-3.5 h-3.5" />
//                           Items
//                         </div>
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         <div className="flex items-center gap-1">
//                           <DollarSign className="w-3.5 h-3.5" />
//                           Amount
//                         </div>
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         <div className="flex items-center gap-1">
//                           <CreditCard className="w-3.5 h-3.5" />
//                           Status
//                         </div>
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {currentInvoices.map((invoice) => {
//                       const dueAmount = invoice.finalTotal - (invoice.amountPaid || 0);
//                       const isExpired = invoice.isExpired;
//                       const overdueDays = isExpired ? getOverdueDays(invoice.dueDate) : 0;
                      
//                       return (
//                         <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
//                           <td className="px-4 py-3">
//                             <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
//                             {isExpired && (
//                               <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs">
//                                 <Clock className="w-3 h-3" />
//                                 {overdueDays} day{overdueDays !== 1 ? 's' : ''} overdue
//                               </div>
//                             )}
//                             {invoice.inquiryNumber && !isExpired && (
//                               <div className="text-xs text-gray-500 mt-0.5">
//                                 Ref: {invoice.inquiryNumber}
//                               </div>
//                             )}
//                           </td>
                          
//                           <td className="px-4 py-3">
//                             <div className="text-sm text-gray-900">{formatDate(invoice.invoiceDate)}</div>
//                             <div className="text-xs text-gray-500 mt-1">
//                               Due: {formatDate(invoice.dueDate)}
//                             </div>
//                           </td>
                          
//                           <td className="px-4 py-3">
//                             <div className="text-sm text-gray-900">{invoice.items?.length || 0} products</div>
//                             <div className="text-xs text-gray-500 mt-1">
//                               Qty: {invoice.items?.reduce((sum, item) => sum + (item.totalQuantity || 0), 0) || 0} pcs
//                             </div>
//                           </td>
                          
//                           <td className="px-4 py-3">
//                             <div className="font-bold text-gray-900">{formatPrice(invoice.finalTotal)}</div>
//                             <div className="text-xs text-green-600 mt-1">
//                               Paid: {formatPrice(invoice.amountPaid || 0)}
//                             </div>
//                             {dueAmount > 0 && invoice.paymentStatus !== 'cancelled' && (
//                               <div className={`text-xs font-medium ${isExpired ? 'text-red-600' : 'text-orange-600'}`}>
//                                 Due: {formatPrice(dueAmount)}
//                               </div>
//                             )}
//                           </td>
                          
//                           <td className="px-4 py-3">
//                             <PaymentStatusBadge status={invoice.paymentStatus} />
//                           </td>
                          
//                           <td className="px-4 py-3">
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() => handleViewInvoice(invoice._id)}
//                                 className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                 title="View Invoice"
//                               >
//                                 <Eye className="w-4 h-4" />
//                               </button>
//                                 <button
//         onClick={() => handleDownloadPDF(invoice)}
//         className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
//         title="Download PDF"
//       >
//         <Download className="w-4 h-4" />
//       </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
              
//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={handlePageChange}
//                 />
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer Note */}
//         <div className="mt-4 text-center text-xs text-gray-400">
//           For any questions about your invoices, please contact our support team.
//         </div>
//       </div>
//     </div>
//   );
// }

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
  Printer,
  CalendarRange,
  Inbox,
  ShoppingBag,
  AlertOctagon,
  ArrowRight,
  Zap,
  Receipt
} from 'lucide-react';
import { toast } from 'sonner';
import { generateInvoicePDF } from '@/utils/invoicePDF';

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

// Get month name
const getMonthName = (monthIndex) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
};

// Check if invoice is expired (due date passed) - Only for unpaid/partial invoices
const isInvoiceExpired = (invoice) => {
  // Don't mark as expired if paid or cancelled or overpaid
  if (invoice.paymentStatus === 'paid' || 
      invoice.paymentStatus === 'cancelled' || 
      invoice.paymentStatus === 'overpaid') {
    return false;
  }
  
  const today = new Date();
  const dueDate = new Date(invoice.dueDate);
  
  // Reset time part to compare dates only
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  
  return dueDate < today;
};

// Calculate overdue days
const getOverdueDays = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  
  // Reset time part to compare dates only
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  // Calculate difference in milliseconds
  const diffTime = today - due;
  
  // Convert to days (1000 ms * 60 seconds * 60 minutes * 24 hours)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Only return positive numbers (if due date is in the past)
  return diffDays > 0 ? diffDays : 0;
};

// Payment Status Badge Component - Shows only actual payment status
const PaymentStatusBadge = ({ status, isExpired = false }) => {
  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100">
        <Clock className="w-3.5 h-3.5 text-orange-600" />
        <span className="text-xs font-medium text-orange-700">Overdue</span>
      </div>
    );
  }

  const statusConfig = {
    paid: { 
      bg: 'bg-emerald-100', 
      text: 'text-emerald-800', 
      border: 'border-emerald-300',
      label: 'Paid', 
      icon: CheckCircle,
      iconColor: 'text-emerald-600'
    },
    partial: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-800', 
      border: 'border-blue-300',
      label: 'Partial', 
      icon: TrendingUp,
      iconColor: 'text-blue-600'
    },
    unpaid: { 
      bg: 'bg-amber-100', 
      text: 'text-amber-800', 
      border: 'border-amber-300',
      label: 'Unpaid', 
      icon: AlertCircle,
      iconColor: 'text-amber-600'
    },
    overpaid: { 
      bg: 'bg-purple-100', 
      text: 'text-purple-800', 
      border: 'border-purple-300',
      label: 'Overpaid', 
      icon: TrendingDown,
      iconColor: 'text-purple-600'
    },
    cancelled: { 
      bg: 'bg-rose-100', 
      text: 'text-rose-800', 
      border: 'border-rose-300',
      label: 'Cancelled', 
      icon: XCircle,
      iconColor: 'text-rose-600'
    }
  };

  const normalizedStatus = status?.toLowerCase() || 'unpaid';
  const config = statusConfig[normalizedStatus] || statusConfig.unpaid;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} border ${config.border}`}>
      <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
      <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200'
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

// Filter Bar with Month/Year Navigation
const FilterBar = ({ 
  activeFilter, 
  setActiveFilter, 
  onFilter,
  filterType,
  setFilterType,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  onMonthChange,
  onYearChange,
  onExpiredFilter,
  showExpiredOnly
}) => {
  const paymentFilters = ['All', 'Paid', 'Partial', 'Unpaid', 'Overpaid', 'Cancelled'];

  return (
    <div className="space-y-3">
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
                activeFilter === filter && !showExpiredOnly
                  ? 'bg-[#E39A65] text-white shadow-md shadow-[#E39A65]/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
          
          {/* Expired Filter Button */}
          <button
            onClick={onExpiredFilter}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
              showExpiredOnly
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Overdue
          </button>
        </div>
      </div>

      {/* Month/Year Navigation */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              filterType === 'all' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('year')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              filterType === 'year' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Year
          </button>
          <button
            onClick={() => setFilterType('month')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
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
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onMonthChange(-1)}
              className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border-x border-gray-200">
              {getMonthName(selectedMonth)} {selectedYear}
            </span>
            <button
              onClick={() => onMonthChange(1)}
              className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Year Navigation */}
        {filterType === 'year' && (
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onYearChange(-1)}
              className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Previous year"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border-x border-gray-200">
              {selectedYear}
            </span>
            <button
              onClick={() => onYearChange(1)}
              className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Next year"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
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
  const [showExpiredOnly, setShowExpiredOnly] = useState(false);
  
  // Date filter state
  const [filterType, setFilterType] = useState('all'); // 'all', 'year', 'month'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    unpaid: 0,
    partial: 0,
    overpaid: 0,
    cancelled: 0,
    expired: 0,
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0
  });
  const [customerName, setCustomerName] = useState('');
  const router = useRouter();

  // Filter invoices by date
  const filterByDate = (invoicesList) => {
    if (filterType === 'all') return invoicesList;
    
    return invoicesList.filter(invoice => {
      const invoiceDate = new Date(invoice.invoiceDate);
      const invoiceYear = invoiceDate.getFullYear();
      const invoiceMonth = invoiceDate.getMonth();
      
      if (filterType === 'year') {
        return invoiceYear === selectedYear;
      } else if (filterType === 'month') {
        return invoiceYear === selectedYear && invoiceMonth === selectedMonth;
      }
      return true;
    });
  };

  // Filter by status and search
  const applyFilters = (invoicesList, statusFilter, expiredOnly, searchTerm = '') => {
    let filtered = [...invoicesList];

    // Apply date filter first
    filtered = filterByDate(filtered);

    // Apply search filter
    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.finalTotal.toString().includes(searchTerm) ||
        formatDate(invoice.invoiceDate).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply expired filter
    if (expiredOnly) {
      filtered = filtered.filter(inv => isInvoiceExpired(inv));
    }
    // Apply status filter
    else if (statusFilter !== 'All') {
      filtered = filtered.filter(inv => 
        inv.paymentStatus?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return filtered;
  };

  // Calculate stats
  const calculateStats = (invoicesList) => {
    const paid = invoicesList.filter(i => i.paymentStatus === 'paid').length;
    const unpaid = invoicesList.filter(i => i.paymentStatus === 'unpaid').length;
    const partial = invoicesList.filter(i => i.paymentStatus === 'partial').length;
    const overpaid = invoicesList.filter(i => i.paymentStatus === 'overpaid').length;
    const cancelled = invoicesList.filter(i => i.paymentStatus === 'cancelled').length;
    
    const expired = invoicesList.filter(i => isInvoiceExpired(i)).length;
    
    const totalAmount = invoicesList.reduce((sum, i) => sum + (i.finalTotal || 0), 0);
    const paidAmount = invoicesList
      .filter(i => i.paymentStatus === 'paid')
      .reduce((sum, i) => sum + (i.finalTotal || 0), 0);
    
    const pendingAmount = invoicesList
      .filter(i => i.paymentStatus === 'unpaid' || i.paymentStatus === 'partial')
      .reduce((sum, i) => {
        const dueAmount = (i.finalTotal || 0) - (i.amountPaid || 0);
        return sum + dueAmount;
      }, 0);

    setStats({
      total: invoicesList.length,
      paid,
      unpaid,
      partial,
      overpaid,
      cancelled,
      expired,
      totalAmount,
      paidAmount,
      pendingAmount
    });
  };

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
        
        // Apply filters
        const filtered = applyFilters(sortedInvoices, activeFilter, showExpiredOnly);
        setFilteredInvoices(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentPage(1);
        
        // Calculate stats
        calculateStats(sortedInvoices);
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

  // Update filtered invoices when filters change
  useEffect(() => {
    const filtered = applyFilters(invoices, activeFilter, showExpiredOnly);
    setFilteredInvoices(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [filterType, selectedMonth, selectedYear, activeFilter, showExpiredOnly, invoices]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInvoices();
  };

  const handleSearch = (term) => {
    const filtered = applyFilters(invoices, activeFilter, showExpiredOnly, term);
    setFilteredInvoices(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleFilter = (status) => {
    setActiveFilter(status);
    setShowExpiredOnly(false);
  };

  const handleExpiredFilter = () => {
    setShowExpiredOnly(!showExpiredOnly);
    setActiveFilter('All');
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
    document.getElementById('invoices-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleViewInvoice = (invoiceId) => {
    router.push(`/customer/viewInvoice?invoiceId=${invoiceId}`);
  };

  const handleDownloadPDF = async (invoice) => {
    if (!invoice) return;
    
    try {
      toast.info('🖨️ Generating PDF invoice...');
      await generateInvoicePDF(invoice);
      toast.success('✅ PDF generated successfully!');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      toast.error('❌ Failed to generate PDF');
    }
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 border border-blue-200">
              <p className="text-xs text-blue-600 mb-1">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                Value: {formatPrice(stats.totalAmount)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3 border border-emerald-200">
              <p className="text-xs text-emerald-600 mb-1">Paid</p>
              <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                Amount: {formatPrice(stats.paidAmount)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-3 border border-amber-200">
              <p className="text-xs text-amber-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.unpaid + stats.partial}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                Due: {formatPrice(stats.pendingAmount)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-3 border border-orange-200">
              <p className="text-xs text-orange-600 mb-1">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                Past due date
              </p>
            </div>
          </div>

          {/* Filter Info */}
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <CalendarRange className="w-3 h-3" />
            Showing invoices for: <span className="font-medium text-[#E39A65]">{getFilterDisplayText()}</span>
          </p>
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
            filterType={filterType}
            setFilterType={setFilterType}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            onExpiredFilter={handleExpiredFilter}
            showExpiredOnly={showExpiredOnly}
          />
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium">{filteredInvoices.length > 0 ? indexOfFirstInvoice + 1 : 0}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastInvoice, filteredInvoices.length)}</span> of{' '}
            <span className="font-medium">{filteredInvoices.length}</span> invoices
            {showExpiredOnly && (
              <span className="ml-1 text-orange-600">(Overdue only)</span>
            )}
            {!showExpiredOnly && filterType !== 'all' && (
              <span className="ml-1 text-[#E39A65]">
                • Filtered by: {getFilterDisplayText()}
              </span>
            )}
          </p>
        </div>

        {/* Invoices Table */}
        <div id="invoices-table" className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {filteredInvoices.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {showExpiredOnly ? 'No Overdue Invoices' : 'No Invoices Found'}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {showExpiredOnly 
                  ? 'No invoices are past their due date.' 
                  : filterType !== 'all'
                    ? `No invoices found for ${getFilterDisplayText().toLowerCase()}`
                    : invoices.length === 0 
                      ? "You don't have any invoices yet. They will appear here once created." 
                      : 'Try adjusting your filters'}
              </p>
              {filterType !== 'all' && !showExpiredOnly && (
                <button
                  onClick={() => setFilterType('all')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  <CalendarRange className="w-4 h-4" />
                  View All Invoices
                </button>
              )}
              {invoices.length === 0 && (
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Browse Products
                </Link>
              )}
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
                            {isExpired && (
                              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs">
                                <Clock className="w-3 h-3" />
                                {overdueDays} day{overdueDays !== 1 ? 's' : ''} overdue
                              </div>
                            )}
                            {invoice.inquiryNumber && !isExpired && (
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
                              <button
                                onClick={() => handleDownloadPDF(invoice)}
                                className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Download PDF"
                              >
                                <Download className="w-4 h-4" />
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