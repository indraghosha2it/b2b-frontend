// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import {
//   FileText,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Package,
//   Calendar,
//   MessageCircle,
//   Loader2,
//   AlertCircle,
//   ChevronRight,
//   FileSearch,
//   RefreshCw,
//   Filter,
//   TrendingUp,
//   ShoppingBag,
//   DollarSign,
//   Search,
//   ChevronDown,
//   MoreVertical,
//   Eye,
//   Download,
//   Send,
//   Building2,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Paperclip,
//   Edit,
//   Trash2,
//   FileOutput,
//   CheckSquare,
//   XSquare,
//   PlusCircle,
//   Ban,
//   ChevronLeft,
//   ChevronsLeft,
//   ChevronsRight,
//   BarChart3,
//   PieChart,
//   Activity
// } from 'lucide-react';
// import { toast } from 'sonner';

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
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// // Status Badge
// const StatusBadge = ({ status }) => {
//   const statusConfig = {
//     submitted: { 
//       bg: 'bg-amber-100', 
//       text: 'text-amber-700', 
//       label: 'Submitted',
//       dot: 'bg-amber-500'
//     },
//     quoted: { 
//       bg: 'bg-blue-100', 
//       text: 'text-blue-700', 
//       label: 'Quoted',
//       dot: 'bg-blue-500'
//     },
//     accepted: { 
//       bg: 'bg-emerald-100', 
//       text: 'text-emerald-700', 
//       label: 'Accepted',
//       dot: 'bg-emerald-500'
//     },
//     invoiced: { 
//       bg: 'bg-purple-100', 
//       text: 'text-purple-700', 
//       label: 'Invoiced',
//       dot: 'bg-purple-500'
//     },
//     paid: { 
//       bg: 'bg-green-100', 
//       text: 'text-green-700', 
//       label: 'Paid',
//       dot: 'bg-green-500'
//     },
//     cancelled: { 
//       bg: 'bg-rose-100', 
//       text: 'text-rose-700', 
//       label: 'Cancelled',
//       dot: 'bg-rose-500'
//     }
//   };

//   const config = statusConfig[status] || statusConfig.submitted;

//   return (
//     <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg}`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
//       <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
//     </div>
//   );
// };

// // Modern Stat Card Component
// const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => {
//   const colorClasses = {
//     amber: {
//       bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50',
//       iconBg: 'bg-amber-500',
//       text: 'text-amber-700',
//       border: 'border-amber-200',
//       icon: 'text-white'
//     },
//     blue: {
//       bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50',
//       iconBg: 'bg-blue-500',
//       text: 'text-blue-700',
//       border: 'border-blue-200',
//       icon: 'text-white'
//     },
//     emerald: {
//       bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
//       iconBg: 'bg-emerald-500',
//       text: 'text-emerald-700',
//       border: 'border-emerald-200',
//       icon: 'text-white'
//     },
//     purple: {
//       bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50',
//       iconBg: 'bg-purple-500',
//       text: 'text-purple-700',
//       border: 'border-purple-200',
//       icon: 'text-white'
//     },
//     rose: {
//       bg: 'bg-gradient-to-br from-rose-50 to-rose-100/50',
//       iconBg: 'bg-rose-500',
//       text: 'text-rose-700',
//       border: 'border-rose-200',
//       icon: 'text-white'
//     },
//     gray: {
//       bg: 'bg-gradient-to-br from-gray-50 to-gray-100/50',
//       iconBg: 'bg-gray-600',
//       text: 'text-gray-700',
//       border: 'border-gray-200',
//       icon: 'text-white'
//     }
//   };

//   const theme = colorClasses[color] || colorClasses.gray;

//   return (
//     <div className={`relative overflow-hidden rounded-2xl border ${theme.border} ${theme.bg} p-5 hover:shadow-lg transition-all duration-300 group`}>
//       {/* Decorative Elements */}
//       <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
//       <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
      
//       <div className="relative z-10">
//         <div className="flex items-start justify-between mb-3">
//           <div className={`p-2.5 rounded-xl ${theme.iconBg} shadow-lg shadow-${color}-500/20`}>
//             <Icon className={`w-4 h-4 ${theme.icon}`} />
//           </div>
//           {trend && (
//             <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-white/60 backdrop-blur-sm ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
//               <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
//               <span className="text-xs font-medium">{trend > 0 ? '+' : ''}{trend}%</span>
//             </div>
//           )}
//         </div>
        
//         <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
//         <p className={`text-xs font-medium ${theme.text} uppercase tracking-wider`}>{title}</p>
//         {subtitle && <p className="text-[10px] text-gray-400 mt-2">{subtitle}</p>}
//       </div>
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
//     <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl mt-4">
//       <button
//         onClick={() => onPageChange(1)}
//         disabled={currentPage === 1}
//         className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         title="First page"
//       >
//         <ChevronsLeft className="w-4 h-4" />
//       </button>
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         title="Previous page"
//       >
//         <ChevronLeft className="w-4 h-4" />
//       </button>

//       <div className="flex items-center gap-1">
//         {getPageNumbers().map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
//               currentPage === page
//                 ? 'bg-[#E39A65] text-white shadow-md shadow-[#E39A65]/20'
//                 : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         title="Next page"
//       >
//         <ChevronRight className="w-4 h-4" />
//       </button>
//       <button
//         onClick={() => onPageChange(totalPages)}
//         disabled={currentPage === totalPages}
//         className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         title="Last page"
//       >
//         <ChevronsRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// // Moderator Inquiry Card - View Only + WhatsApp
// const ModeratorInquiryCard = ({ inquiry }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   const handleDownloadAttachment = async (file) => {
//     try {
//       toast.loading('Downloading file...', { id: 'download' });
      
//       const response = await fetch(file.fileUrl);
//       const blob = await response.blob();
      
//       const blobUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = file.fileName;
      
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       window.URL.revokeObjectURL(blobUrl);
//       toast.success('File downloaded successfully', { id: 'download' });
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download file', { id: 'download' });
//       window.open(file.fileUrl, '_blank');
//     }
//   };

//   const handleWhatsApp = () => {
//     if (!inquiry.userDetails?.whatsapp) {
//       toast.error('No WhatsApp number available');
//       return;
//     }
    
//     const productSummary = inquiry.items.map(p => 
//       `• ${p.productName}: ${p.colors.length} colors, ${p.totalQuantity} pcs`
//     ).join('\n');

//     const message = `*Inquiry #${inquiry.inquiryNumber}*\n` +
//       `Customer: ${inquiry.userDetails?.companyName}\n` +
//       `Contact: ${inquiry.userDetails?.contactPerson}\n` +
//       `Status: ${inquiry.status}\n` +
//       `Date: ${formatDate(inquiry.createdAt)}\n` +
//       `Total: ${formatPrice(inquiry.subtotal)}\n\n` +
//       `*Products:*\n${productSummary}`;

//     const cleanNumber = inquiry.userDetails.whatsapp.replace(/[^0-9+]/g, '');
//     window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//       {/* Header with Customer Info */}
//       <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center shadow-md">
//               <FileText className="w-4 h-4 text-white" />
//             </div>
//             <div>
//               <div className="flex items-center gap-2">
//                 <h3 className="font-semibold text-gray-900">{inquiry.inquiryNumber}</h3>
//                 <StatusBadge status={inquiry.status} />
//               </div>
//               <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
//                 <span>{formatDate(inquiry.createdAt)}</span>
//                 <span>•</span>
//                 <span>{inquiry.totalItems} products</span>
//                 <span>•</span>
//                 <span>{inquiry.totalQuantity} pcs</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Only View Details button - no action buttons */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setShowDetails(!showDetails)}
//               className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
//             >
//               <Eye className="w-3.5 h-3.5" />
//               {showDetails ? 'Hide Details' : 'View Details'}
//             </button>
//           </div>
//         </div>

//         {/* Customer Info Row */}
//         <div className="grid grid-cols-4 gap-4 mt-3 text-xs">
//           <div className="flex items-center gap-1.5 text-gray-600">
//             <Building2 className="w-3.5 h-3.5 text-gray-400" />
//             <span className="truncate">{inquiry.userDetails?.companyName || 'N/A'}</span>
//           </div>
//           <div className="flex items-center gap-1.5 text-gray-600">
//             <User className="w-3.5 h-3.5 text-gray-400" />
//             <span className="truncate">{inquiry.userDetails?.contactPerson || 'N/A'}</span>
//           </div>
//           <div className="flex items-center gap-1.5 text-gray-600">
//             <Mail className="w-3.5 h-3.5 text-gray-400" />
//             <a href={`mailto:${inquiry.userDetails?.email}`} className="truncate hover:text-[#E39A65]">
//               {inquiry.userDetails?.email || 'N/A'}
//             </a>
//           </div>
//           <div className="flex items-center gap-1.5 text-gray-600">
//             <Phone className="w-3.5 h-3.5 text-gray-400" />
//             <span className="truncate">{inquiry.userDetails?.phone || 'N/A'}</span>
//           </div>
//         </div>

//         {/* Address Row */}
//         {(inquiry.userDetails?.address || inquiry.userDetails?.city || inquiry.userDetails?.country) && (
//           <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
//             <MapPin className="w-3.5 h-3.5 text-gray-400" />
//             <span>
//               {[inquiry.userDetails?.address, inquiry.userDetails?.city, inquiry.userDetails?.country]
//                 .filter(Boolean).join(', ')}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Collapsible Details */}
//       {showDetails && (
//         <div className="p-4 border-b border-gray-100 bg-gray-50/30">
//           {/* Products Section */}
//           <div className="mb-4">
//             <h4 className="text-xs font-semibold text-gray-700 mb-2">Products</h4>
//             <div className="space-y-3">
//               {inquiry.items.map((product, idx) => (
//                 <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
//                   <div className="flex items-start gap-2 mb-2">
//                     <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
//                       <img 
//                         src={product.productImage || 'https://via.placeholder.com/32'} 
//                         alt=""
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-xs font-medium text-gray-900">{product.productName}</p>
//                       <p className="text-xs text-gray-500">
//                         Total: {product.totalQuantity} pcs • {formatPrice(product.totalQuantity * product.unitPrice)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2">
//                     {product.colors.map((color, cIdx) => (
//                       <div key={cIdx} className="text-xs flex items-center gap-1">
//                         <div 
//                           className="w-4 h-4 rounded-full border border-gray-300 shadow-sm flex-shrink-0" 
//                           style={{ backgroundColor: color.color.code }} 
//                           title={`${color.totalForColor} pcs`}
//                         />
//                         <div className="flex flex-wrap gap-1">
//                           {color.sizeQuantities.map((sq, sIdx) => (
//                             <span key={sIdx} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">
//                               {sq.size}:{sq.quantity}
//                             </span>
//                           ))}
//                         </div>
//                         <span className="text-gray-500 ml-auto text-[10px]">{color.totalForColor}pcs</span>
//                       </div>
//                     ))}
//                   </div>

//                   {product.specialInstructions && (
//                     <div className="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
//                       📝 Product Note: {product.specialInstructions}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Special Instructions */}
//           {inquiry.specialInstructions && (
//             <div className="mb-4">
//               <h4 className="text-xs font-semibold text-gray-700 mb-2">Special Instructions</h4>
//               <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
//                 <p className="text-xs text-amber-700">{inquiry.specialInstructions}</p>
//               </div>
//             </div>
//           )}

//           {/* Attachments */}
//           {inquiry.attachments && inquiry.attachments.length > 0 && (
//             <div className="mb-4">
//               <h4 className="text-xs font-semibold text-gray-700 mb-2">Attachments</h4>
//               <div className="space-y-2">
//                 {inquiry.attachments.map((file, idx) => (
//                   <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-2 border border-gray-200">
//                     <div className="flex items-center gap-2">
//                       <Paperclip className="w-3.5 h-3.5 text-gray-400" />
//                       <span className="text-xs text-gray-600">{file.fileName}</span>
//                       <span className="text-[10px] text-gray-400">
//                         ({(file.fileSize / 1024).toFixed(1)} KB)
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => handleDownloadAttachment(file)}
//                       className="p-1 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
//                       title="Download"
//                     >
//                       <Download className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Footer with Total Value and WhatsApp */}
//       <div className="px-4 py-2 flex items-center justify-between bg-gray-50/30">
//         <div className="flex items-center gap-4 text-xs">
//           <span className="text-gray-500">Total Value:</span>
//           <span className="font-semibold text-[#E39A65]">{formatPrice(inquiry.subtotal)}</span>
//         </div>
        
//         {/* WhatsApp Button - Only show if customer has WhatsApp number */}
//         {inquiry.userDetails?.whatsapp ? (
//           <button
//             onClick={handleWhatsApp}
//             className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
//             title={`WhatsApp ${inquiry.userDetails.contactPerson || 'customer'}`}
//           >
//             <MessageCircle className="w-3.5 h-3.5" />
//             WhatsApp Customer
//           </button>
//         ) : (
//           <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">
//             No WhatsApp
//           </span>
//         )}
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
//         placeholder="Search by inquiry #, company, contact, product..."
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

// // Filter Bar
// const FilterBar = ({ onFilter, activeFilter, setActiveFilter, onDateFilter }) => {
//   const filters = ['All', 'Submitted', 'Quoted', 'Accepted', 'Invoiced', 'Cancelled'];

//   return (
//     <div className="flex flex-wrap items-center gap-2">
//       <div className="flex flex-wrap gap-2">
//         {filters.map((filter) => (
//           <button
//             key={filter}
//             onClick={() => {
//               setActiveFilter(filter);
//               onFilter(filter);
//             }}
//             className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
//               activeFilter === filter
//                 ? 'bg-[#E39A65] text-white shadow-md shadow-[#E39A65]/20'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>
      
//       <select
//         onChange={(e) => onDateFilter(e.target.value)}
//         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
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

// // Main Moderator Page Component
// export default function ModeratorInquiriesPage() {
//   const [inquiries, setInquiries] = useState([]);
//   const [filteredInquiries, setFilteredInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [dateRange, setDateRange] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [totalInquiries, setTotalInquiries] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [stats, setStats] = useState({
//     total: 0,
//     submitted: 0,
//     quoted: 0,
//     accepted: 0,
//     invoiced: 0,
//     cancelled: 0,
//     totalValue: 0
//   });
//   const router = useRouter();

//   const fetchInquiries = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       // Build query params - using the same admin endpoint but with moderator permissions
// let url = `https://b2b-backend-rosy.vercel.app/api/moderator/inquiries?page=${currentPage}&limit=${itemsPerPage}`;      
//       if (activeFilter !== 'All') {
//         url += `&status=${activeFilter.toLowerCase()}`;
//       }
      
//       if (dateRange !== 'all') {
//         const now = new Date();
//         let startDate;
        
//         switch(dateRange) {
//           case 'today':
//             startDate = new Date(now.setHours(0, 0, 0, 0));
//             break;
//           case 'week':
//             startDate = new Date(now.setDate(now.getDate() - 7));
//             break;
//           case 'month':
//             startDate = new Date(now.setMonth(now.getMonth() - 1));
//             break;
//           case 'year':
//             startDate = new Date(now.setFullYear(now.getFullYear() - 1));
//             break;
//           default:
//             startDate = null;
//         }
        
//         if (startDate) {
//           url += `&startDate=${startDate.toISOString()}`;
//         }
//       }

//       const response = await fetch(url, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setInquiries(data.data.inquiries);
//         setFilteredInquiries(data.data.inquiries);
//         setTotalInquiries(data.data.pagination.total);
//         setTotalPages(data.data.pagination.pages);
        
//         // Calculate stats from current page
//         const totalValue = data.data.inquiries.reduce((sum, i) => sum + (i.subtotal || 0), 0);
        
//         setStats({
//           total: data.data.pagination.total,
//           submitted: data.data.inquiries.filter(i => i.status === 'submitted').length,
//           quoted: data.data.inquiries.filter(i => i.status === 'quoted').length,
//           accepted: data.data.inquiries.filter(i => i.status === 'accepted').length,
//           invoiced: data.data.inquiries.filter(i => i.status === 'invoiced').length,
//           cancelled: data.data.inquiries.filter(i => i.status === 'cancelled').length,
//           totalValue
//         });
//       } else {
//         // If unauthorized, redirect
//         if (response.status === 403) {
//           toast.error('You do not have permission to view this page');
//           router.push('/dashboard');
//         }
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       toast.error('Failed to load inquiries');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, [currentPage, activeFilter, dateRange]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchInquiries();
//   };

//   const handleSearch = (term) => {
//     if (!term.trim()) {
//       fetchInquiries();
//     } else {
//       const filtered = inquiries.filter(inquiry => 
//         inquiry.inquiryNumber.toLowerCase().includes(term.toLowerCase()) ||
//         inquiry.userDetails?.companyName?.toLowerCase().includes(term.toLowerCase()) ||
//         inquiry.userDetails?.contactPerson?.toLowerCase().includes(term.toLowerCase()) ||
//         inquiry.userDetails?.email?.toLowerCase().includes(term.toLowerCase()) ||
//         inquiry.items.some(item => 
//           item.productName.toLowerCase().includes(term.toLowerCase())
//         )
//       );
//       setFilteredInquiries(filtered);
//       setTotalPages(1);
//     }
//     setCurrentPage(1);
//   };

//   const handleFilter = (status) => {
//     setActiveFilter(status);
//     setCurrentPage(1);
//   };

//   const handleDateFilter = (range) => {
//     setDateRange(range);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     document.getElementById('inquiries-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-10 h-10 animate-spin text-[#E39A65] mx-auto mb-4" />
//           <p className="text-sm text-gray-500">Loading inquiries...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-20 z-10">
//         <div className="container mx-auto px-4 max-w-7xl py-4">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Inquiry Management (Moderator View)</h1>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 Total {totalInquiries} inquiries • {formatPrice(stats.totalValue)} total value • View Only Mode
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

//           {/* Stats */}
//           <div className="grid grid-cols-6 gap-3">
//             <StatCard 
//               title="Total" 
//               value={totalInquiries} 
//               icon={ShoppingBag} 
//               color="gray" 
//             />
//             <StatCard 
//               title="Submitted" 
//               value={stats.submitted} 
//               icon={Clock} 
//               color="amber" 
//             />
//             <StatCard 
//               title="Quoted" 
//               value={stats.quoted} 
//               icon={FileText} 
//               color="blue" 
//             />
//             <StatCard 
//               title="Accepted" 
//               value={stats.accepted} 
//               icon={CheckSquare} 
//               color="emerald" 
//             />
//             <StatCard 
//               title="Invoiced" 
//               value={stats.invoiced} 
//               icon={FileOutput} 
//               color="purple" 
//             />
//             <StatCard 
//               title="Cancelled" 
//               value={stats.cancelled} 
//               icon={XCircle} 
//               color="rose" 
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
//             onFilter={handleFilter} 
//             activeFilter={activeFilter}
//             setActiveFilter={setActiveFilter}
//             onDateFilter={handleDateFilter}
//           />
//         </div>

//         {/* Results Summary */}
//         <div className="flex items-center justify-between mb-2">
//           <p className="text-xs text-gray-500">
//             Showing <span className="font-medium">{filteredInquiries.length}</span> inquiries 
//             {totalInquiries > itemsPerPage && (
//               <> (Page {currentPage} of {totalPages})</>
//             )}
//             {dateRange !== 'all' && (
//               <span className="ml-1 text-[#E39A65]">
//                 • Filtered by: {dateRange}
//               </span>
//             )}
//           </p>
//           <p className="text-xs text-gray-500">
//             Total Inquiries: <span className="font-semibold text-[#E39A65]">{totalInquiries}</span>
//           </p>
//         </div>

//         {/* Inquiries List */}
//         <div id="inquiries-list">
//           {filteredInquiries.length === 0 ? (
//             <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
//               <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <FileSearch className="w-8 h-8 text-gray-400" />
//               </div>
//               <h2 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h2>
//               <p className="text-sm text-gray-500 mb-4">
//                 {totalInquiries === 0 ? "No inquiries have been submitted yet" : "Try adjusting your filters"}
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-3">
//                 {filteredInquiries.map((inquiry) => (
//                   <ModeratorInquiryCard 
//                     key={inquiry._id} 
//                     inquiry={inquiry} 
//                   />
//                 ))}
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
//       </div>
//     </div>
//   );
// }



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
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
    </div>
  );
};

// Modern Stat Card Component
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
    <div className={`relative overflow-hidden rounded-2xl border ${theme.border} ${theme.bg} p-5 hover:shadow-lg transition-all duration-300 group`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-xl ${theme.iconBg} shadow-lg shadow-${color}-500/20`}>
            <Icon className={`w-4 h-4 ${theme.icon}`} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-white/60 backdrop-blur-sm ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
              <span className="text-xs font-medium">{trend > 0 ? '+' : ''}{trend}%</span>
            </div>
          )}
        </div>
        
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        <p className={`text-xs font-medium ${theme.text} uppercase tracking-wider`}>{title}</p>
        {subtitle && <p className="text-[10px] text-gray-400 mt-2">{subtitle}</p>}
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
    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl mt-4">
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
  );
};

// Moderator Inquiry Card - View Only + WhatsApp
const ModeratorInquiryCard = ({ inquiry }) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const handleWhatsApp = () => {
    if (!inquiry.userDetails?.whatsapp) {
      toast.error('No WhatsApp number available');
      return;
    }
    
    const productSummary = inquiry.items.map(p => 
      `• ${p.productName}: ${p.colors.length} colors, ${p.totalQuantity} pcs`
    ).join('\n');

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

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header with Customer Info */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center shadow-md">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{inquiry.inquiryNumber}</h3>
                <StatusBadge status={inquiry.status} />
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                <span>{formatDate(inquiry.createdAt)}</span>
                <span>•</span>
                <span>{inquiry.totalItems} products</span>
                <span>•</span>
                <span>{inquiry.totalQuantity} pcs</span>
              </div>
            </div>
          </div>
          
          {/* Only View Details button - no action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Eye className="w-3.5 h-3.5" />
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
          </div>
        </div>

        {/* Customer Info Row */}
        <div className="grid grid-cols-4 gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Building2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{inquiry.userDetails?.companyName || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{inquiry.userDetails?.contactPerson || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            <a href={`mailto:${inquiry.userDetails?.email}`} className="truncate hover:text-[#E39A65]">
              {inquiry.userDetails?.email || 'N/A'}
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{inquiry.userDetails?.phone || 'N/A'}</span>
          </div>
        </div>

        {/* Address Row */}
        {(inquiry.userDetails?.address || inquiry.userDetails?.city || inquiry.userDetails?.country) && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>
              {[inquiry.userDetails?.address, inquiry.userDetails?.city, inquiry.userDetails?.country]
                .filter(Boolean).join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Collapsible Details */}
      {showDetails && (
        <div className="p-4 border-b border-gray-100 bg-gray-50/30">
          {/* Products Section */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Products</h4>
            <div className="space-y-3">
              {inquiry.items.map((product, idx) => (
                <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={product.productImage || 'https://via.placeholder.com/32'} 
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900">{product.productName}</p>
                      <p className="text-xs text-gray-500">
                        Total: {product.totalQuantity} pcs • {formatPrice(product.totalQuantity * product.unitPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {product.colors.map((color, cIdx) => (
                      <div key={cIdx} className="text-xs flex items-center gap-1">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-sm flex-shrink-0" 
                          style={{ backgroundColor: color.color.code }} 
                          title={`${color.totalForColor} pcs`}
                        />
                        <div className="flex flex-wrap gap-1">
                          {color.sizeQuantities.map((sq, sIdx) => (
                            <span key={sIdx} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">
                              {sq.size}:{sq.quantity}
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-500 ml-auto text-[10px]">{color.totalForColor}pcs</span>
                      </div>
                    ))}
                  </div>

                  {product.specialInstructions && (
                    <div className="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                      📝 Product Note: {product.specialInstructions}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          {inquiry.specialInstructions && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">Special Instructions</h4>
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <p className="text-xs text-amber-700">{inquiry.specialInstructions}</p>
              </div>
            </div>
          )}

          {/* Attachments */}
          {inquiry.attachments && inquiry.attachments.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">Attachments</h4>
              <div className="space-y-2">
                {inquiry.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-2 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-600">{file.fileName}</span>
                      <span className="text-[10px] text-gray-400">
                        ({(file.fileSize / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      onClick={() => handleDownloadAttachment(file)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer with Total Value and WhatsApp */}
      <div className="px-4 py-2 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-4 text-xs">
          <span className="text-gray-500">Total Value:</span>
          <span className="font-semibold text-[#E39A65]">{formatPrice(inquiry.subtotal)}</span>
        </div>
        
        {/* WhatsApp Button - Only show if customer has WhatsApp number */}
        {inquiry.userDetails?.whatsapp ? (
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
            title={`WhatsApp ${inquiry.userDetails.contactPerson || 'customer'}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Customer
          </button>
        ) : (
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">
            No WhatsApp
          </span>
        )}
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
        placeholder="Search by inquiry #, company, contact, product..."
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

// Filter Bar - Status filters on left, Month/Year filter on right
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
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Status Filters on Left */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
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

      {/* Month/Year Filter on Right */}
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

// Main Moderator Page Component
export default function ModeratorInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Date filter state
  const [filterType, setFilterType] = useState('all'); // 'all', 'year', 'month'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    quoted: 0,
    accepted: 0,
    invoiced: 0,
    cancelled: 0,
    totalValue: 0
  });
  const router = useRouter();

  // Filter inquiries by date
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

const fetchInquiries = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Build query params for paginated inquiries
    let url = `https://b2b-backend-rosy.vercel.app/api/moderator/inquiries?page=${currentPage}&limit=${itemsPerPage}`;
    
    if (activeFilter !== 'All') {
      url += `&status=${activeFilter.toLowerCase()}`;
    }
    
    // Add date filter for paginated results
    if (filterType === 'year') {
      url += `&year=${selectedYear}`;
    } else if (filterType === 'month') {
      url += `&month=${selectedMonth + 1}&year=${selectedYear}`; // month+1 because JS months are 0-indexed
    }

    console.log('Fetching moderator inquiries from:', url);

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
      
      // Calculate stats from ALL inquiries using the stats array from the response
      if (data.data.stats && Array.isArray(data.data.stats)) {
        const submitted = data.data.stats.find(s => s._id === 'submitted')?.count || 0;
        const quoted = data.data.stats.find(s => s._id === 'quoted')?.count || 0;
        const accepted = data.data.stats.find(s => s._id === 'accepted')?.count || 0;
        const invoiced = data.data.stats.find(s => s._id === 'invoiced')?.count || 0;
        const paid = data.data.stats.find(s => s._id === 'paid')?.count || 0;
        const cancelled = data.data.stats.find(s => s._id === 'cancelled')?.count || 0;
        
        // Calculate total value from ALL invoices
        const totalValue = data.data.totalValue || data.data.stats.reduce((sum, stat) => sum + (stat.totalValue || 0), 0);
        
        setStats({
          total: data.data.pagination.total, // This is the total count from ALL pages
          submitted,
          quoted,
          accepted,
          invoiced,
          paid,
          cancelled,
          totalValue
        });
      } else {
        // Fallback: calculate stats from current page only (less accurate)
        const totalValue = data.data.inquiries.reduce((sum, i) => sum + (i.subtotal || 0), 0);
        
        setStats({
          total: data.data.pagination.total,
          submitted: data.data.inquiries.filter(i => i.status === 'submitted').length,
          quoted: data.data.inquiries.filter(i => i.status === 'quoted').length,
          accepted: data.data.inquiries.filter(i => i.status === 'accepted').length,
          invoiced: data.data.inquiries.filter(i => i.status === 'invoiced').length,
          paid: data.data.inquiries.filter(i => i.status === 'paid').length,
          cancelled: data.data.inquiries.filter(i => i.status === 'cancelled').length,
          totalValue
        });
      }
    } else {
      // If unauthorized, redirect
      if (response.status === 403) {
        toast.error('You do not have permission to view this page');
        router.push('/dashboard');
      }
    }
  } catch (error) {
    console.error('Fetch error:', error);
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
          <Loader2 className="w-10 h-10 animate-spin text-[#E39A65] mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading inquiries...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Inquiry Management (Moderator View)</h1>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                Total {totalInquiries} inquiries • {formatPrice(stats.totalValue)} total value • View Only Mode
                {filterType !== 'all' && (
                  <span className="ml-2 text-[#E39A65] font-medium">
                    • Showing: {getFilterDisplayText()}
                  </span>
                )}
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

          {/* Stats */}
          <div className="grid grid-cols-6 gap-3">
            <StatCard 
              title="Total" 
              value={totalInquiries} 
              icon={ShoppingBag} 
              color="gray" 
            />
            <StatCard 
              title="Submitted" 
              value={stats.submitted} 
              icon={Clock} 
              color="amber" 
            />
            <StatCard 
              title="Quoted" 
              value={stats.quoted} 
              icon={FileText} 
              color="blue" 
            />
            <StatCard 
              title="Accepted" 
              value={stats.accepted} 
              icon={CheckSquare} 
              color="emerald" 
            />
            <StatCard 
              title="Invoiced" 
              value={stats.invoiced} 
              icon={FileOutput} 
              color="purple" 
            />
            <StatCard 
              title="Cancelled" 
              value={stats.cancelled} 
              icon={XCircle} 
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
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium">{filteredInquiries.length}</span> inquiries 
            {totalInquiries > itemsPerPage && (
              <> (Page {currentPage} of {totalPages})</>
            )}
            {filterType !== 'all' && (
              <span className="ml-1 text-[#E39A65]">
                • {getFilterDisplayText()}
              </span>
            )}
          </p>
          <p className="text-xs text-gray-500">
            Total Inquiries: <span className="font-semibold text-[#E39A65]">{totalInquiries}</span>
          </p>
        </div>

        {/* Inquiries List */}
        <div id="inquiries-list">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h2>
              <p className="text-sm text-gray-500 mb-4">
                {totalInquiries === 0 
                  ? "No inquiries have been submitted yet" 
                  : filterType !== 'all'
                    ? `No inquiries found for ${getFilterDisplayText().toLowerCase()}`
                    : "Try adjusting your filters"}
              </p>
              {filterType !== 'all' && totalInquiries > 0 && (
                <button
                  onClick={() => setFilterType('all')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  <CalendarRange className="w-4 h-4" />
                  View All Time
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {filteredInquiries.map((inquiry) => (
                  <ModeratorInquiryCard 
                    key={inquiry._id} 
                    inquiry={inquiry} 
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