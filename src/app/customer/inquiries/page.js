



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

// // Customer Inquiry Card with Expandable Details
// const InquiryCard = ({ inquiry, onRefresh }) => {
//   const [cancelling, setCancelling] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const router = useRouter();

//   const handleCancel = async () => {
//     if (!confirm('Are you sure you want to cancel this inquiry? This action cannot be undone.')) {
//       return;
//     }

//     setCancelling(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/inquiries/${inquiry._id}/cancel`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Inquiry cancelled successfully');
//         onRefresh();
//       } else {
//         toast.error(data.error || 'Failed to cancel');
//       }
//     } catch (error) {
//       toast.error('Failed to cancel inquiry');
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const handleAcceptQuote = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/inquiries/${inquiry._id}/accept`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Quote accepted successfully');
//         onRefresh();
//       } else {
//         toast.error(data.error || 'Failed to accept quote');
//       }
//     } catch (error) {
//       toast.error('Failed to accept quote');
//     }
//   };

// const handleViewInvoice = async () => {
//   try {
//     const token = localStorage.getItem('token');
    
//     // Fetch customer's invoices
//     const response = await fetch(`http://localhost:5000/api/invoices/my-invoices`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
    
//     const data = await response.json();
    
//     if (data.success && data.data) {
//       // Find the invoice that matches this inquiry ID
//       const matchingInvoice = data.data.find(inv => 
//         inv.inquiryId === inquiry._id || inv.inquiryId?.toString() === inquiry._id
//       );
      
//       if (matchingInvoice) {
//         // Navigate to the customer view invoice page with the correct invoice ID
//         router.push(`/customer/viewInvoice?invoiceId=${matchingInvoice._id}`);
//       } else {
//         toast.error('No invoice found for this inquiry');
//       }
//     } else {
//       toast.error('Failed to fetch invoices');
//     }
//   } catch (error) {
//     console.error('Error fetching invoice:', error);
//     toast.error('Failed to find invoice');
//   }
// };

//   const toggleDetails = () => {
//     setShowDetails(!showDetails);
//   };

//   // Render status-based action in top right
//   const renderTopRightAction = () => {
//     switch(inquiry.status) {
//       case 'submitted':
//         return (
//           <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">
//             <Clock className="w-3.5 h-3.5" />
//             <span>Awaiting quotation</span>
//           </div>
//         );
      
//       case 'quoted':
//         return (
//           <button
//             onClick={handleAcceptQuote}
//             className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
//           >
//             <CheckCircle className="w-3.5 h-3.5" />
//             Accept Quote
//           </button>
//         );
      
//       case 'accepted':
//         return (
//           <div className="flex items-center gap-2 text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg">
//             <FileOutput className="w-3.5 h-3.5" />
//             <span>Awaiting invoice</span>
//           </div>
//         );
      
//       case 'invoiced':
//         return (
//           <button
//             onClick={handleViewInvoice}
//             className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-purple-100 text-purple-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
//           >
//             <Eye className="w-3.5 h-3.5" />
//             View Invoice
//           </button>
//         );
      
//       case 'paid':
//         return (
//           <div className="flex items-center gap-2 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
//             <CheckCircle className="w-3.5 h-3.5" />
//             <span>Payment completed</span>
//           </div>
//         );
      
//       case 'cancelled':
//         return (
//           <div className="flex items-center gap-2 text-xs bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg">
//             <XCircle className="w-3.5 h-3.5" />
//             <span>Cancelled</span>
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//       {/* Header */}
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
          
//           <div className="flex items-center gap-2">
//             {/* View Details Button - Toggles expansion */}
//             <button
//               onClick={toggleDetails}
//               className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
//             >
//               <Eye className="w-3.5 h-3.5" />
//               {showDetails ? 'Hide Details' : 'View Details'}
//             </button>

//             {/* Status-based action in top right */}
//             {renderTopRightAction()}

//             {/* Cancel Button - Show for submitted/quoted status */}
//             {(inquiry.status === 'submitted' || inquiry.status === 'quoted') && (
//               <button
//                 onClick={handleCancel}
//                 disabled={cancelling}
//                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors font-medium"
//               >
//                 {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
//                 Cancel
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Expandable Details Section */}
//       {showDetails && (
//         <div className="p-4 border-b border-gray-100 bg-gray-50/30">
//           <h4 className="text-xs font-semibold text-gray-700 mb-3">Products</h4>
//           <div className="space-y-4">
//             {inquiry.items.map((product, idx) => (
//               <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
//                 <div className="flex items-start gap-2 mb-3">
//                   <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
//                     <img 
//                       src={product.productImage || 'https://via.placeholder.com/40'} 
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-900">{product.productName}</p>
//                     <p className="text-xs text-gray-500">
//                       Total: {product.totalQuantity} pcs • {formatPrice(product.totalQuantity * product.unitPrice)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Product-level special instructions */}
//                 {product.specialInstructions && (
//                   <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
//                     <p className="text-xs text-blue-700">
//                       <span className="font-medium">Product Note:</span> {product.specialInstructions}
//                     </p>
//                   </div>
//                 )}

//                 {/* Colors and sizes */}
//                 <div className="grid grid-cols-2 gap-3">
//      {product.colors.map((color, cIdx) => (
//   <div key={cIdx} className="flex items-center gap-1 border-l-2 border-[#E39A65] pl-2 py-1">
//     <div className="flex items-center gap-1 flex-shrink-0">
//       <div 
//         className="w-4 h-4 rounded-full border border-gray-300 shadow-sm flex-shrink-0" 
//         style={{ backgroundColor: color.color.code }} 
//         title={`${color.totalForColor} pcs`}
//       />
//     </div>
//     <div className="flex flex-wrap gap-1">
//       {color.sizeQuantities.map((sq, sIdx) => (
//         <span key={sIdx} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
//           {sq.size}:{sq.quantity}
//         </span>
//       ))}
//     </div>
//     <span className="text-xs font-medium text-gray-700 ml-1">
//       - {color.totalForColor}pcs
//     </span>
//   </div>
// ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Global Special Instructions */}
//           {inquiry.specialInstructions && (
//             <div className="mt-4">
//               <h4 className="text-xs font-semibold text-gray-700 mb-2">Special Instructions</h4>
//               <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
//                 <p className="text-xs text-amber-700">{inquiry.specialInstructions}</p>
//               </div>
//             </div>
//           )}

//           {/* Attachments */}
//           {inquiry.attachments && inquiry.attachments.length > 0 && (
//             <div className="mt-4">
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
//                     <a
//                       href={file.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                       title="Download"
//                     >
//                       <Download className="w-3.5 h-3.5" />
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Footer - Only WhatsApp Button */}
//       <div className="px-4 py-2 flex items-center justify-between bg-gray-50/30">
//         <div className="flex items-center gap-4 text-xs">
//           <span className="text-gray-500">Total Value:</span>
//           <span className="font-semibold text-[#E39A65]">{formatPrice(inquiry.subtotal)}</span>
//         </div>
        
//         {/* WhatsApp Button only in footer */}
//         <button
//           onClick={() => {
//             let message = `*Inquiry #${inquiry.inquiryNumber}*\n\n`;
            
//             inquiry.items.forEach((product, idx) => {
//               message += `*Product ${idx + 1}: ${product.productName}*\n`;
//               product.colors.forEach(color => {
//                 message += `  • Color\n`;
//                 color.sizeQuantities.forEach(sq => {
//                   message += `    - Size ${sq.size}: ${sq.quantity} pcs\n`;
//                 });
//                 message += `    Total: ${color.totalForColor} pcs\n`;
//                 if (color.specialInstructions) {
//                   message += `    📝 Note: ${color.specialInstructions}\n`;
//                 }
//               });
//               if (product.specialInstructions) {
//                 message += `  📝 Product Note: ${product.specialInstructions}\n`;
//               }
//             });
            
//             message += `\n*Summary*\n`;
//             message += `Total Value: ${formatPrice(inquiry.subtotal)}\n`;
//             message += `Status: ${inquiry.status}\n`;
            
//             if (inquiry.specialInstructions) {
//               message += `\n*Global Notes:*\n${inquiry.specialInstructions}\n`;
//             }

//             window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685'}?text=${encodeURIComponent(message)}`, '_blank');
//           }}
//           className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
//           title="Chat on WhatsApp"
//         >
//           <MessageCircle className="w-3.5 h-3.5" />
//           WhatsApp
//         </button>
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
//         placeholder="Search by inquiry number or product..."
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

// // Filter Bar - Status filters and date dropdown
// const FilterBar = ({ onFilter, activeFilter, setActiveFilter, onDateFilter, activeDateRange, setActiveDateRange }) => {
//   const filters = ['All', 'Submitted', 'Quoted', 'Accepted', 'Invoiced', 'Cancelled'];
//   const dateRanges = ['All Time', 'Today', 'This Week', 'This Month', 'This Year'];

//   return (
//     <div className="flex flex-wrap items-center gap-3">
//       {/* Status Filters */}
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

//       {/* Date Filter Dropdown */}
//       <select
//         value={activeDateRange}
//         onChange={(e) => {
//           setActiveDateRange(e.target.value);
//           onDateFilter(e.target.value);
//         }}
//         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//       >
//         {dateRanges.map((range) => (
//           <option key={range} value={range}>
//             {range}
//           </option>
//         ))}
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

// // Main Page Component
// export default function InquiriesPage() {
//   const [inquiries, setInquiries] = useState([]);
//   const [filteredInquiries, setFilteredInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [activeDateRange, setActiveDateRange] = useState('All Time');
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

//       const response = await fetch('http://localhost:5000/api/inquiries/my-inquiries', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setInquiries(data.data);
        
//         // Apply filters
//         let filtered = applyDateFilter(data.data, activeDateRange);
        
//         if (activeFilter !== 'All') {
//           filtered = filtered.filter(inquiry => 
//             inquiry.status === activeFilter.toLowerCase()
//           );
//         }
        
//         setFilteredInquiries(filtered);
//         setTotalInquiries(data.data.length);
//         setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        
//         // Calculate detailed stats (with cancelled)
//         const totalValue = data.data.reduce((sum, i) => sum + (i.subtotal || 0), 0);
        
//         setStats({
//           total: data.data.length,
//           submitted: data.data.filter(i => i.status === 'submitted').length,
//           quoted: data.data.filter(i => i.status === 'quoted').length,
//           accepted: data.data.filter(i => i.status === 'accepted').length,
//           invoiced: data.data.filter(i => i.status === 'invoiced').length,
//           cancelled: data.data.filter(i => i.status === 'cancelled').length,
//           totalValue
//         });
//       }
//     } catch (error) {
//       toast.error('Failed to load inquiries');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const applyDateFilter = (data, range) => {
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
//     switch(range) {
//       case 'Today':
//         return data.filter(inquiry => {
//           const inquiryDate = new Date(inquiry.createdAt);
//           return inquiryDate >= today;
//         });
      
//       case 'This Week':
//         const weekAgo = new Date(now.setDate(now.getDate() - 7));
//         return data.filter(inquiry => {
//           const inquiryDate = new Date(inquiry.createdAt);
//           return inquiryDate >= weekAgo;
//         });
      
//       case 'This Month':
//         const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
//         return data.filter(inquiry => {
//           const inquiryDate = new Date(inquiry.createdAt);
//           return inquiryDate >= monthAgo;
//         });
      
//       case 'This Year':
//         const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
//         return data.filter(inquiry => {
//           const inquiryDate = new Date(inquiry.createdAt);
//           return inquiryDate >= yearAgo;
//         });
      
//       default:
//         return data;
//     }
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, [activeFilter, activeDateRange]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchInquiries();
//   };

//   const handleSearch = (term) => {
//     if (!term.trim()) {
//       let filtered = applyDateFilter(inquiries, activeDateRange);
//       if (activeFilter !== 'All') {
//         filtered = filtered.filter(inquiry => 
//           inquiry.status === activeFilter.toLowerCase()
//         );
//       }
//       setFilteredInquiries(filtered);
//       setTotalPages(Math.ceil(filtered.length / itemsPerPage));
//     } else {
//       const filtered = inquiries.filter(inquiry => 
//         (inquiry.inquiryNumber.toLowerCase().includes(term.toLowerCase()) ||
//         inquiry.items.some(item => 
//           item.productName.toLowerCase().includes(term.toLowerCase())
//         )) &&
//         (activeFilter === 'All' || inquiry.status === activeFilter.toLowerCase()) &&
//         (activeDateRange === 'All Time' || isInDateRange(inquiry, activeDateRange))
//       );
//       setFilteredInquiries(filtered);
//       setTotalPages(Math.ceil(filtered.length / itemsPerPage));
//     }
//     setCurrentPage(1);
//   };

//   const isInDateRange = (inquiry, range) => {
//     const now = new Date();
//     const inquiryDate = new Date(inquiry.createdAt);
    
//     switch(range) {
//       case 'Today':
//         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//         return inquiryDate >= today;
//       case 'This Week':
//         const weekAgo = new Date(now.setDate(now.getDate() - 7));
//         return inquiryDate >= weekAgo;
//       case 'This Month':
//         const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
//         return inquiryDate >= monthAgo;
//       case 'This Year':
//         const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
//         return inquiryDate >= yearAgo;
//       default:
//         return true;
//     }
//   };

//   const handleFilter = (status) => {
//     setActiveFilter(status);
//     setCurrentPage(1);
//   };

//   const handleDateFilter = (range) => {
//     setActiveDateRange(range);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     document.getElementById('inquiries-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   // Pagination calculations
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-10 h-10 animate-spin text-[#E39A65] mx-auto mb-4" />
//           <p className="text-sm text-gray-500">Loading your inquiries...</p>
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
//               <h1 className="text-2xl font-bold text-gray-900">My Inquiries</h1>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 Total {totalInquiries} inquiries • {formatPrice(stats.totalValue)} total value
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

//           {/* Stats - Now with 7 columns including cancelled */}
//           <div className="grid grid-cols-6 gap-3">
//             <StatCard 
//               title="Total" 
//               value={stats.total} 
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
//             {/* <StatCard 
//               title="Value" 
//               value={formatPrice(stats.totalValue)} 
//               icon={DollarSign} 
//               color="blue" 
//             /> */}
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
//             activeDateRange={activeDateRange}
//             setActiveDateRange={setActiveDateRange}
//           />
//         </div>

//         {/* Results Summary */}
//         {filteredInquiries.length > 0 && (
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-xs text-gray-500">
//               Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
//               <span className="font-medium">
//                 {Math.min(indexOfLastItem, filteredInquiries.length)}
//               </span>{' '}
//               of <span className="font-medium">{filteredInquiries.length}</span> inquiries
//               {totalInquiries > itemsPerPage && (
//                 <> (Page {currentPage} of {totalPages})</>
//               )}
//               {activeDateRange !== 'All Time' && (
//                 <span className="ml-1 text-[#E39A65]">
//                   • {activeDateRange}
//                 </span>
//               )}
//             </p>
//           </div>
//         )}

//         {/* Inquiries List */}
//         <div id="inquiries-list">
//           {filteredInquiries.length === 0 ? (
//             <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
//               <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <FileSearch className="w-8 h-8 text-gray-400" />
//               </div>
//               <h2 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h2>
//               <p className="text-sm text-gray-500 mb-4">
//                 {inquiries.length === 0 ? "Start by adding products to your cart and submitting an inquiry" : "Try adjusting your filters"}
//               </p>
//               <Link
//                 href="/products"
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white text-sm rounded-lg hover:bg-[#d48b54] transition-colors"
//               >
//                 <ShoppingBag className="w-4 h-4" />
//                 Browse Products
//               </Link>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-3">
//                 {currentItems.map((inquiry) => (
//                   <InquiryCard 
//                     key={inquiry._id} 
//                     inquiry={inquiry} 
//                     onRefresh={handleRefresh}
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




// 2

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
//   Activity,
//   CalendarRange,
//   Inbox,
//   AlertOctagon,
//   ArrowRight,
//   Zap,
//   Receipt
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

// // Get month name
// const getMonthName = (monthIndex) => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   return months[monthIndex];
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

// // Customer Inquiry Card with Expandable Details
// const InquiryCard = ({ inquiry, onRefresh }) => {
//   const [cancelling, setCancelling] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const router = useRouter();

//   const handleCancel = async () => {
//     if (!confirm('Are you sure you want to cancel this inquiry? This action cannot be undone.')) {
//       return;
//     }

//     setCancelling(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/inquiries/${inquiry._id}/cancel`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Inquiry cancelled successfully');
//         onRefresh();
//       } else {
//         toast.error(data.error || 'Failed to cancel');
//       }
//     } catch (error) {
//       toast.error('Failed to cancel inquiry');
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const handleAcceptQuote = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/inquiries/${inquiry._id}/accept`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Quote accepted successfully');
//         onRefresh();
//       } else {
//         toast.error(data.error || 'Failed to accept quote');
//       }
//     } catch (error) {
//       toast.error('Failed to accept quote');
//     }
//   };

// const handleViewInvoice = async () => {
//   try {
//     const token = localStorage.getItem('token');
    
//     // Fetch customer's invoices
//     const response = await fetch(`http://localhost:5000/api/invoices/my-invoices`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
    
//     const data = await response.json();
    
//     if (data.success && data.data) {
//       // Find the invoice that matches this inquiry ID
//       const matchingInvoice = data.data.find(inv => 
//         inv.inquiryId === inquiry._id || inv.inquiryId?.toString() === inquiry._id
//       );
      
//       if (matchingInvoice) {
//         // Navigate to the customer view invoice page with the correct invoice ID
//         router.push(`/customer/viewInvoice?invoiceId=${matchingInvoice._id}`);
//       } else {
//         toast.error('No invoice found for this inquiry');
//       }
//     } else {
//       toast.error('Failed to fetch invoices');
//     }
//   } catch (error) {
//     console.error('Error fetching invoice:', error);
//     toast.error('Failed to find invoice');
//   }
// };

//   const toggleDetails = () => {
//     setShowDetails(!showDetails);
//   };

//   // Render status-based action in top right
//   const renderTopRightAction = () => {
//     switch(inquiry.status) {
//       case 'submitted':
//         return (
//           <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">
//             <Clock className="w-3.5 h-3.5" />
//             <span>Awaiting quotation</span>
//           </div>
//         );
      
//       case 'quoted':
//         return (
//           <button
//             onClick={handleAcceptQuote}
//             className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
//           >
//             <CheckCircle className="w-3.5 h-3.5" />
//             Accept Quote
//           </button>
//         );
      
//       case 'accepted':
//         return (
//           <div className="flex items-center gap-2 text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg">
//             <FileOutput className="w-3.5 h-3.5" />
//             <span>Awaiting invoice</span>
//           </div>
//         );
      
//       case 'invoiced':
//         return (
//           <button
//             onClick={handleViewInvoice}
//             className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-purple-100 text-purple-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
//           >
//             <Eye className="w-3.5 h-3.5" />
//             View Invoice
//           </button>
//         );
      
//       case 'paid':
//         return (
//           <div className="flex items-center gap-2 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
//             <CheckCircle className="w-3.5 h-3.5" />
//             <span>Payment completed</span>
//           </div>
//         );
      
//       case 'cancelled':
//         return (
//           <div className="flex items-center gap-2 text-xs bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg">
//             <XCircle className="w-3.5 h-3.5" />
//             <span>Cancelled</span>
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//       {/* Header */}
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
          
//           <div className="flex items-center gap-2">
//             {/* View Details Button - Toggles expansion */}
//             <button
//               onClick={toggleDetails}
//               className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
//             >
//               <Eye className="w-3.5 h-3.5" />
//               {showDetails ? 'Hide Details' : 'View Details'}
//             </button>

//             {/* Status-based action in top right */}
//             {renderTopRightAction()}

//             {/* Cancel Button - Show for submitted/quoted status */}
//             {(inquiry.status === 'submitted' || inquiry.status === 'quoted') && (
//               <button
//                 onClick={handleCancel}
//                 disabled={cancelling}
//                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors font-medium"
//               >
//                 {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
//                 Cancel
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Expandable Details Section */}
//       {showDetails && (
//         <div className="p-4 border-b border-gray-100 bg-gray-50/30">
//           <h4 className="text-xs font-semibold text-gray-700 mb-3">Products</h4>
//           <div className="space-y-4">
//             {inquiry.items.map((product, idx) => (
//               <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
//                 <div className="flex items-start gap-2 mb-3">
//                   <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
//                     <img 
//                       src={product.productImage || 'https://via.placeholder.com/40'} 
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-900">{product.productName}</p>
//                     <p className="text-xs text-gray-500">
//                       Total: {product.totalQuantity} pcs • {formatPrice(product.totalQuantity * product.unitPrice)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Product-level special instructions */}
//                 {product.specialInstructions && (
//                   <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
//                     <p className="text-xs text-blue-700">
//                       <span className="font-medium">Product Note:</span> {product.specialInstructions}
//                     </p>
//                   </div>
//                 )}

//                 {/* Colors and sizes */}
//                 <div className="grid grid-cols-2 gap-3">
//      {product.colors.map((color, cIdx) => (
//   <div key={cIdx} className="flex items-center gap-1 border-l-2 border-[#E39A65] pl-2 py-1">
//     <div className="flex items-center gap-1 flex-shrink-0">
//       <div 
//         className="w-4 h-4 rounded-full border border-gray-300 shadow-sm flex-shrink-0" 
//         style={{ backgroundColor: color.color.code }} 
//         title={`${color.totalForColor} pcs`}
//       />
//     </div>
//     <div className="flex flex-wrap gap-1">
//       {color.sizeQuantities.map((sq, sIdx) => (
//         <span key={sIdx} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
//           {sq.size}:{sq.quantity}
//         </span>
//       ))}
//     </div>
//     <span className="text-xs font-medium text-gray-700 ml-1">
//       - {color.totalForColor}pcs
//     </span>
//   </div>
// ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Global Special Instructions */}
//           {inquiry.specialInstructions && (
//             <div className="mt-4">
//               <h4 className="text-xs font-semibold text-gray-700 mb-2">Special Instructions</h4>
//               <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
//                 <p className="text-xs text-amber-700">{inquiry.specialInstructions}</p>
//               </div>
//             </div>
//           )}

//           {/* Attachments */}
//           {inquiry.attachments && inquiry.attachments.length > 0 && (
//             <div className="mt-4">
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
//                     <a
//                       href={file.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                       title="Download"
//                     >
//                       <Download className="w-3.5 h-3.5" />
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Footer - Only WhatsApp Button */}
//       <div className="px-4 py-2 flex items-center justify-between bg-gray-50/30">
//         <div className="flex items-center gap-4 text-xs">
//           <span className="text-gray-500">Total Value:</span>
//           <span className="font-semibold text-[#E39A65]">{formatPrice(inquiry.subtotal)}</span>
//         </div>
        
//         {/* WhatsApp Button only in footer */}
//         <button
//           onClick={() => {
//             let message = `*Inquiry #${inquiry.inquiryNumber}*\n\n`;
            
//             inquiry.items.forEach((product, idx) => {
//               message += `*Product ${idx + 1}: ${product.productName}*\n`;
//               product.colors.forEach(color => {
//                 message += `  • Color\n`;
//                 color.sizeQuantities.forEach(sq => {
//                   message += `    - Size ${sq.size}: ${sq.quantity} pcs\n`;
//                 });
//                 message += `    Total: ${color.totalForColor} pcs\n`;
//                 if (color.specialInstructions) {
//                   message += `    📝 Note: ${color.specialInstructions}\n`;
//                 }
//               });
//               if (product.specialInstructions) {
//                 message += `  📝 Product Note: ${product.specialInstructions}\n`;
//               }
//             });
            
//             message += `\n*Summary*\n`;
//             message += `Total Value: ${formatPrice(inquiry.subtotal)}\n`;
//             message += `Status: ${inquiry.status}\n`;
            
//             if (inquiry.specialInstructions) {
//               message += `\n*Global Notes:*\n${inquiry.specialInstructions}\n`;
//             }

//             window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685'}?text=${encodeURIComponent(message)}`, '_blank');
//           }}
//           className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
//           title="Chat on WhatsApp"
//         >
//           <MessageCircle className="w-3.5 h-3.5" />
//           WhatsApp
//         </button>
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
//         placeholder="Search by inquiry number or product..."
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

// // Filter Bar - Status filters on left, Month/Year filter on right
// const FilterBar = ({ 
//   onFilter, 
//   activeFilter, 
//   setActiveFilter,
//   filterType,
//   setFilterType,
//   selectedMonth,
//   setSelectedMonth,
//   selectedYear,
//   setSelectedYear,
//   onMonthChange,
//   onYearChange
// }) => {
//   const filters = ['All', 'Submitted', 'Quoted', 'Accepted', 'Invoiced', 'Cancelled'];

//   return (
//     <div className="flex flex-wrap items-center justify-between gap-3">
//       {/* Status Filters on Left */}
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

//       {/* Month/Year Filter on Right */}
//       <div className="flex items-center gap-2">
//         <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
//           <button
//             onClick={() => setFilterType('all')}
//             className={`px-3 py-1.5 text-xs font-medium transition-colors ${
//               filterType === 'all' 
//                 ? 'bg-[#E39A65] text-white' 
//                 : 'bg-white text-gray-600 hover:bg-gray-50'
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilterType('year')}
//             className={`px-3 py-1.5 text-xs font-medium transition-colors ${
//               filterType === 'year' 
//                 ? 'bg-[#E39A65] text-white' 
//                 : 'bg-white text-gray-600 hover:bg-gray-50'
//             }`}
//           >
//             Year
//           </button>
//           <button
//             onClick={() => setFilterType('month')}
//             className={`px-3 py-1.5 text-xs font-medium transition-colors ${
//               filterType === 'month' 
//                 ? 'bg-[#E39A65] text-white' 
//                 : 'bg-white text-gray-600 hover:bg-gray-50'
//             }`}
//           >
//             Month
//           </button>
//         </div>

//         {/* Month Navigation */}
//         {filterType === 'month' && (
//           <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
//             <button
//               onClick={() => onMonthChange(-1)}
//               className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
//               title="Previous month"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <span className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border-x border-gray-200">
//               {getMonthName(selectedMonth)} {selectedYear}
//             </span>
//             <button
//               onClick={() => onMonthChange(1)}
//               className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
//               title="Next month"
//             >
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         )}

//         {/* Year Navigation */}
//         {filterType === 'year' && (
//           <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
//             <button
//               onClick={() => onYearChange(-1)}
//               className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
//               title="Previous year"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <span className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border-x border-gray-200">
//               {selectedYear}
//             </span>
//             <button
//               onClick={() => onYearChange(1)}
//               className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
//               title="Next year"
//             >
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         )}
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

// // Main Page Component
// export default function InquiriesPage() {
//   const [inquiries, setInquiries] = useState([]);
//   const [filteredInquiries, setFilteredInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('All');
  
//   // Date filter state
//   const [filterType, setFilterType] = useState('all'); // 'all', 'year', 'month'
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
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

//   // Filter inquiries by date
//   const filterByDate = (inquiriesList) => {
//     if (filterType === 'all') return inquiriesList;
    
//     return inquiriesList.filter(inquiry => {
//       const inquiryDate = new Date(inquiry.createdAt);
//       const inquiryYear = inquiryDate.getFullYear();
//       const inquiryMonth = inquiryDate.getMonth();
      
//       if (filterType === 'year') {
//         return inquiryYear === selectedYear;
//       } else if (filterType === 'month') {
//         return inquiryYear === selectedYear && inquiryMonth === selectedMonth;
//       }
//       return true;
//     });
//   };

//   // Apply all filters
//   const applyFilters = (inquiriesList, statusFilter, dateFilterType, searchTerm = '') => {
//     let filtered = [...inquiriesList];

//     // Apply date filter
//     filtered = filterByDate(filtered);

//     // Apply status filter
//     if (statusFilter !== 'All') {
//       filtered = filtered.filter(inquiry => 
//         inquiry.status === statusFilter.toLowerCase()
//       );
//     }

//     // Apply search filter
//     if (searchTerm && searchTerm.trim()) {
//       filtered = filtered.filter(inquiry => 
//         inquiry.inquiryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         inquiry.items.some(item => 
//           item.productName.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }

//     return filtered;
//   };

//   const fetchInquiries = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/inquiries/my-inquiries', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setInquiries(data.data);
        
//         // Apply filters
//         const filtered = applyFilters(data.data, activeFilter, filterType);
        
//         setFilteredInquiries(filtered);
//         setTotalInquiries(data.data.length);
//         setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        
//         // Calculate detailed stats (with cancelled)
//         const totalValue = data.data.reduce((sum, i) => sum + (i.subtotal || 0), 0);
        
//         setStats({
//           total: data.data.length,
//           submitted: data.data.filter(i => i.status === 'submitted').length,
//           quoted: data.data.filter(i => i.status === 'quoted').length,
//           accepted: data.data.filter(i => i.status === 'accepted').length,
//           invoiced: data.data.filter(i => i.status === 'invoiced').length,
//           cancelled: data.data.filter(i => i.status === 'cancelled').length,
//           totalValue
//         });
//       }
//     } catch (error) {
//       toast.error('Failed to load inquiries');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   // Update filtered inquiries when filters change
//   useEffect(() => {
//     const filtered = applyFilters(inquiries, activeFilter, filterType);
//     setFilteredInquiries(filtered);
//     setTotalPages(Math.ceil(filtered.length / itemsPerPage));
//     setCurrentPage(1);
//   }, [filterType, selectedMonth, selectedYear, activeFilter, inquiries]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchInquiries();
//   };

//   const handleSearch = (term) => {
//     const filtered = applyFilters(inquiries, activeFilter, filterType, term);
//     setFilteredInquiries(filtered);
//     setTotalPages(Math.ceil(filtered.length / itemsPerPage));
//     setCurrentPage(1);
//   };

//   const handleFilter = (status) => {
//     setActiveFilter(status);
//   };

//   const handleMonthChange = (increment) => {
//     let newMonth = selectedMonth + increment;
//     let newYear = selectedYear;
    
//     if (newMonth < 0) {
//       newMonth = 11;
//       newYear = selectedYear - 1;
//     } else if (newMonth > 11) {
//       newMonth = 0;
//       newYear = selectedYear + 1;
//     }
    
//     setSelectedMonth(newMonth);
//     setSelectedYear(newYear);
//     setFilterType('month');
//   };

//   const handleYearChange = (increment) => {
//     setSelectedYear(selectedYear + increment);
//     setFilterType('year');
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     document.getElementById('inquiries-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   const getFilterDisplayText = () => {
//     if (filterType === 'all') {
//       return 'All Time';
//     } else if (filterType === 'year') {
//       return `Year: ${selectedYear}`;
//     } else {
//       return `${getMonthName(selectedMonth)} ${selectedYear}`;
//     }
//   };

//   // Pagination calculations
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-10 h-10 animate-spin text-[#E39A65] mx-auto mb-4" />
//           <p className="text-sm text-gray-500">Loading your inquiries...</p>
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
//               <h1 className="text-2xl font-bold text-gray-900">My Inquiries</h1>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 Total {totalInquiries} inquiries • {formatPrice(stats.totalValue)} total value
//                 {filterType !== 'all' && (
//                   <span className="ml-2 text-[#E39A65] font-medium">
//                     • Showing: {getFilterDisplayText()}
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

//           {/* Stats - Now with 6 columns */}
//           <div className="grid grid-cols-6 gap-3">
//             <StatCard 
//               title="Total" 
//               value={stats.total} 
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
//             filterType={filterType}
//             setFilterType={setFilterType}
//             selectedMonth={selectedMonth}
//             setSelectedMonth={setSelectedMonth}
//             selectedYear={selectedYear}
//             setSelectedYear={setSelectedYear}
//             onMonthChange={handleMonthChange}
//             onYearChange={handleYearChange}
//           />
//         </div>

//         {/* Results Summary */}
//         {filteredInquiries.length > 0 && (
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-xs text-gray-500">
//               Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
//               <span className="font-medium">
//                 {Math.min(indexOfLastItem, filteredInquiries.length)}
//               </span>{' '}
//               of <span className="font-medium">{filteredInquiries.length}</span> inquiries
//               {totalInquiries > itemsPerPage && (
//                 <> (Page {currentPage} of {totalPages})</>
//               )}
//               {filterType !== 'all' && (
//                 <span className="ml-1 text-[#E39A65]">
//                   • {getFilterDisplayText()}
//                 </span>
//               )}
//             </p>
//           </div>
//         )}

//         {/* Inquiries List */}
//         <div id="inquiries-list">
//           {filteredInquiries.length === 0 ? (
//             <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
//               <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <FileSearch className="w-8 h-8 text-gray-400" />
//               </div>
//               <h2 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h2>
//               <p className="text-sm text-gray-500 mb-4">
//                 {inquiries.length === 0 
//                   ? "Start by adding products to your cart and submitting an inquiry" 
//                   : filterType !== 'all'
//                     ? `No inquiries found for ${getFilterDisplayText().toLowerCase()}`
//                     : "Try adjusting your filters"}
//               </p>
//               {filterType !== 'all' ? (
//                 <button
//                   onClick={() => setFilterType('all')}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white text-sm rounded-lg hover:bg-[#d48b54] transition-colors"
//                 >
//                   <CalendarRange className="w-4 h-4" />
//                   View All Time
//                 </button>
//               ) : (
//                 <Link
//                   href="/products"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white text-sm rounded-lg hover:bg-[#d48b54] transition-colors"
//                 >
//                   <ShoppingBag className="w-4 h-4" />
//                   Browse Products
//                 </Link>
//               )}
//             </div>
//           ) : (
//             <>
//               <div className="space-y-3">
//                 {currentItems.map((inquiry) => (
//                   <InquiryCard 
//                     key={inquiry._id} 
//                     inquiry={inquiry} 
//                     onRefresh={handleRefresh}
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
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      <span className={`text-[10px] sm:text-xs font-medium ${config.text}`}>{config.label}</span>
    </div>
  );
};

// Modern Stat Card Component - Responsive
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
    <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl border ${theme.border} ${theme.bg} p-3 sm:p-5 hover:shadow-lg transition-all duration-300 group`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl ${theme.iconBg} shadow-lg shadow-${color}-500/20`}>
            <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${theme.icon}`} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-white/60 backdrop-blur-sm ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              <TrendingUp className={`w-2 h-2 sm:w-3 sm:h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
              <span className="text-[8px] sm:text-xs font-medium">{trend > 0 ? '+' : ''}{trend}%</span>
            </div>
          )}
        </div>
        
        <p className="text-xl sm:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-1">{value}</p>
        <p className={`text-[8px] sm:text-xs font-medium ${theme.text} uppercase tracking-wider`}>{title}</p>
        {subtitle && <p className="text-[8px] text-gray-400 mt-1 sm:mt-2">{subtitle}</p>}
      </div>
    </div>
  );
};



// Update the InquiryCard component inside your customer inquiries page

// Update the InquiryCard component in your customer inquiries page with this:

const InquiryCard = ({ inquiry, onRefresh }) => {
  const [cancelling, setCancelling] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [viewingInvoice, setViewingInvoice] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  // Helper function to check if any item is unavailable
  const hasUnavailableItems = () => {
    if (inquiry.status !== 'quoted') return false;
    return inquiry.items.some(product => 
      product.isAvailable === false || 
      product.colors.some(color => color.isAvailable === false ||
        color.sizeQuantities.some(size => size.isAvailable === false)
      )
    );
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this inquiry? This action cannot be undone.')) {
      return;
    }

    setCancelling(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inquiries/${inquiry._id}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Inquiry cancelled successfully');
        onRefresh();
      } else {
        toast.error(data.error || 'Failed to cancel');
      }
    } catch (error) {
      toast.error('Failed to cancel inquiry');
    } finally {
      setCancelling(false);
    }
  };

  const handleAcceptQuote = async () => {
    setAccepting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inquiries/${inquiry._id}/accept`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Quote accepted successfully');
        onRefresh();
      } else {
        toast.error(data.error || 'Failed to accept quote');
      }
    } catch (error) {
      toast.error('Failed to accept quote');
    } finally {
      setAccepting(false);
    }
  };

  const handleViewInvoice = async () => {
    setViewingInvoice(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/invoices/my-invoices`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success && data.data) {
        const matchingInvoice = data.data.find(inv => 
          inv.inquiryId === inquiry._id || inv.inquiryId?.toString() === inquiry._id
        );
        
        if (matchingInvoice) {
          router.push(`/customer/viewInvoice?invoiceId=${matchingInvoice._id}`);
        } else {
          toast.error('No invoice found for this inquiry');
        }
      } else {
        toast.error('Failed to fetch invoices');
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
      toast.error('Failed to find invoice');
    } finally {
      setViewingInvoice(false);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Calculate total using per-color pricing (only counting available items)
  const calculateTotalWithPerColorPricing = () => {
    let total = 0;
    inquiry.items.forEach(product => {
      // Skip if product is unavailable
      if (product.isAvailable === false) return;
      
      product.colors.forEach(color => {
        // Skip if color is unavailable
        if (color.isAvailable === false) return;
        
        let colorTotal = 0;
        color.sizeQuantities.forEach(sq => {
          // Only count available sizes
          if (sq.isAvailable !== false) {
            colorTotal += sq.quantity || 0;
          }
        });
        total += colorTotal * (color.unitPrice || 0);
      });
    });
    return total;
  };

  const renderTopRightAction = () => {
    switch(inquiry.status) {
      case 'submitted':
        return (
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs bg-amber-50 text-amber-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg whitespace-nowrap">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Awaiting quotation</span>
            <span className="sm:hidden">Awaiting</span>
          </div>
        );
      
      case 'quoted':
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptQuote}
              disabled={accepting}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-emerald-50 text-emerald-700 rounded-md sm:rounded-lg hover:bg-emerald-100 transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {accepting ? (
                <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
              ) : (
                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              )}
              <span className="hidden sm:inline">Accept Quote</span>
              <span className="sm:hidden">Accept</span>
            </button>
            {hasUnavailableItems() && (
              <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
                Some items unavailable
              </span>
            )}
          </div>
        );
      
      case 'accepted':
        return (
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs bg-purple-50 text-purple-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg whitespace-nowrap">
            <FileOutput className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Awaiting invoice</span>
            <span className="sm:hidden">Awaiting</span>
          </div>
        );
      
      case 'invoiced':
        return (
          <button
            onClick={handleViewInvoice}
            disabled={viewingInvoice}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-purple-100 text-purple-700 rounded-md sm:rounded-lg hover:bg-blue-100 transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {viewingInvoice ? (
              <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
            ) : (
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            )}
            <span className="hidden sm:inline">View Invoice</span>
            <span className="sm:hidden">View</span>
          </button>
        );
      
      case 'paid':
        return (
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs bg-green-50 text-green-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg whitespace-nowrap">
            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Payment completed</span>
            <span className="sm:hidden">Paid</span>
          </div>
        );
      
      case 'cancelled':
        return (
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs bg-rose-50 text-rose-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg whitespace-nowrap">
            <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Cancelled</span>
            <span className="sm:hidden">Cancelled</span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-md sm:rounded-lg flex items-center justify-center shadow-sm sm:shadow-md flex-shrink-0">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate max-w-[120px] sm:max-w-none">
                  {inquiry.inquiryNumber}
                </h3>
                <StatusBadge status={inquiry.status} />
                {inquiry.status === 'quoted' && hasUnavailableItems() && (
                  <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
                    Some items unavailable
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1 sm:gap-3 text-[8px] sm:text-xs text-gray-500 mt-0.5">
                <span className="whitespace-nowrap">{formatDate(inquiry.createdAt)}</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">{inquiry.totalItems} products</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">{inquiry.totalQuantity} pcs</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 ml-auto sm:ml-0">
            <button
              onClick={toggleDetails}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-blue-50 text-blue-700 rounded-md sm:rounded-lg hover:bg-blue-100 transition-colors font-medium whitespace-nowrap"
            >
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{showDetails ? 'Hide Details' : 'View Details'}</span>
              <span className="sm:hidden">{showDetails ? 'Hide' : 'View'}</span>
            </button>

            {renderTopRightAction()}

            {(inquiry.status === 'submitted' || inquiry.status === 'quoted') && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-rose-50 text-rose-700 rounded-md sm:rounded-lg hover:bg-rose-100 transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? (
                  <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
                ) : (
                  <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
                <span className="hidden sm:inline">Cancel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Details Section - Updated with availability display */}
      {showDetails && (
        <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50/30">
          <h4 className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-2 sm:mb-3">Products</h4>
          <div className="space-y-3 sm:space-y-4">
            {inquiry.items.map((product, idx) => {
              const isProductAvailable = product.isAvailable !== false;
              const productTotalFromColors = product.colors.reduce((sum, color) => {
                if (color.isAvailable === false) return sum;
                let colorTotal = 0;
                color.sizeQuantities.forEach(sq => {
                  if (sq.isAvailable !== false) {
                    colorTotal += sq.quantity || 0;
                  }
                });
                return sum + (colorTotal * (color.unitPrice || 0));
              }, 0);
              
              return (
                <div key={idx} className={`bg-white rounded-lg p-2 sm:p-3 border ${isProductAvailable ? 'border-gray-100' : 'border-red-200 bg-red-50/20'}`}>
                  <div className="flex items-start gap-2 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={product.productImage || 'https://via.placeholder.com/40'} 
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <p className={`text-xs sm:text-sm font-medium ${isProductAvailable ? 'text-gray-900' : 'text-red-600 line-through'}`}>
                          {product.productName}
                        </p>
                        {!isProductAvailable && (
                          <span className="text-[8px] bg-red-100 text-red-700 px-1 py-0.5 rounded-full">
                            Unavailable
                          </span>
                        )}
                      </div>
                      <p className={`text-[10px] sm:text-xs ${isProductAvailable ? 'text-gray-500' : 'text-red-400'}`}>
                        Total: {product.totalQuantity} pcs • {formatPrice(productTotalFromColors)}
                      </p>
                      {product.adminNote && inquiry.status === 'quoted' && (
                        <p className="text-[8px] sm:text-[9px] text-blue-600 mt-0.5">
                          📝 Seller note: {product.adminNote}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Product-level special instructions */}
                  {product.specialInstructions && (
                    <div className="mb-2 sm:mb-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-[10px] sm:text-xs text-blue-700">
                        <span className="font-medium">Product Note:</span> {product.specialInstructions}
                      </p>
                    </div>
                  )}

                  {/* Colors and sizes - WITH AVAILABILITY DISPLAY */}
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {product.colors.map((color, cIdx) => {
                      const isColorAvailable = color.isAvailable !== false;
                      let colorTotal = 0;
                      color.sizeQuantities.forEach(sq => {
                        if (sq.isAvailable !== false) {
                          colorTotal += sq.quantity || 0;
                        }
                      });
                      const colorSubtotal = colorTotal * (color.unitPrice || 0);
                      const colorUnitPrice = color.unitPrice || 0;
                      
                      return (
                        <div key={cIdx} className={`border-l-2 pl-2 py-1 ${isColorAvailable ? 'border-[#E39A65]' : 'border-red-400'}`}>
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                            <div className="flex items-center gap-1">
                              <div 
                                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border shadow-sm flex-shrink-0 ${!isColorAvailable ? 'opacity-50' : ''}`}
                                style={{ backgroundColor: color.color.code }} 
                                title={color.color.name || color.color.code}
                              />
                              <span className={`text-[10px] sm:text-xs font-medium ${isColorAvailable ? 'text-gray-700' : 'text-red-600 line-through'}`}>
                                {color.color.name || color.color.code}
                              </span>
                              {!isColorAvailable && (
                                <span className="text-[7px] bg-red-100 text-red-700 px-1 py-0.5 rounded-full">Unavailable</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={`text-[9px] sm:text-[10px] ${isColorAvailable ? 'text-gray-500' : 'text-red-400 line-through'}`}>
                                {colorTotal} pcs × {formatPrice(colorUnitPrice)}/pc
                              </span>
                              <span className={`text-[10px] sm:text-xs font-semibold ${isColorAvailable ? 'text-[#E39A65]' : 'text-red-500'}`}>
                                = {formatPrice(colorSubtotal)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {color.sizeQuantities.map((sq, sIdx) => {
                              const isSizeAvailable = sq.isAvailable !== false;
                              return (
                                <span 
                                  key={sIdx} 
                                  className={`text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded whitespace-nowrap ${
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
                </div>
              );
            })}
          </div>

          {/* Global Special Instructions */}
          {inquiry.specialInstructions && (
            <div className="mt-3 sm:mt-4">
              <h4 className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-1 sm:mb-2">Special Instructions</h4>
              <div className="bg-amber-50 rounded-lg p-2 sm:p-3 border border-amber-100">
                <p className="text-[10px] sm:text-xs text-amber-700">{inquiry.specialInstructions}</p>
              </div>
            </div>
          )}

          {/* Admin Note (if quoted) */}
         {/* Message from Seller - Show for all statuses after quoted */}
{inquiry.adminNote && (inquiry.status === 'quoted' || inquiry.status === 'accepted' || inquiry.status === 'invoiced' ) && (
  <div className="mt-3 sm:mt-4">
    <h4 className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-1 sm:mb-2">
      Message from Seller
    </h4>
    <div className={`rounded-lg p-2 sm:p-3 border ${
      inquiry.status === 'quoted' 
        ? 'bg-blue-50 border-blue-100 text-blue-700'
        : 'bg-emerald-50 border-emerald-100 text-emerald-700'
    }`}>
      <p className="text-[10px] sm:text-xs whitespace-pre-wrap">{inquiry.adminNote}</p>
    </div>
    {inquiry.status !== 'quoted' && (
      <p className="text-[8px] text-gray-400 mt-1">
        This message was included in your quotation
      </p>
    )}
  </div>
)}

          {/* Attachments */}
          {inquiry.attachments && inquiry.attachments.length > 0 && (
            <div className="mt-3 sm:mt-4">
              <h4 className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-1 sm:mb-2">Attachments</h4>
              <div className="space-y-1 sm:space-y-2">
                {inquiry.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-1.5 sm:p-2 border border-gray-200">
                    <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                      <Paperclip className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-[8px] sm:text-xs text-gray-600 truncate max-w-[100px] sm:max-w-[200px]">{file.fileName}</span>
                      <span className="text-[6px] sm:text-[10px] text-gray-400 flex-shrink-0">
                        ({(file.fileSize / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-0.5 sm:p-1 text-blue-600 hover:bg-blue-50 rounded flex-shrink-0"
                      title="Download"
                    >
                      <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer - Total with per-color pricing */}
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
          <span className="text-gray-500">Total:</span>
          <span className="font-semibold text-[#E39A65]">
            {formatPrice(calculateTotalWithPerColorPricing())}
          </span>
          {inquiry.status === 'quoted' && hasUnavailableItems() && (
            <span className="text-red-500 text-[8px]">(Some items excluded from total)</span>
          )}
        </div>
        
        {/* WhatsApp Button */}
        <button
          onClick={() => {
            let message = `*Inquiry #${inquiry.inquiryNumber}*\n\n`;
            
            inquiry.items.forEach((product, idx) => {
              const productStatus = product.isAvailable === false ? ' [PRODUCT UNAVAILABLE]' : '';
              message += `*Product ${idx + 1}: ${product.productName}${productStatus}*\n`;
              product.colors.forEach(color => {
                const colorStatus = color.isAvailable === false ? ' [COLOR UNAVAILABLE]' : '';
                let colorTotal = 0;
                color.sizeQuantities.forEach(sq => {
                  if (sq.isAvailable !== false) {
                    colorTotal += sq.quantity || 0;
                  }
                });
                const colorSubtotal = colorTotal * (color.unitPrice || 0);
                message += `  • ${color.color.name || color.color.code}${colorStatus}\n`;
                message += `    Price: ${formatPrice(color.unitPrice || 0)}/pc\n`;
                color.sizeQuantities.forEach(sq => {
                  const sizeStatus = sq.isAvailable === false ? ' (UNAVAILABLE)' : '';
                  message += `    - Size ${sq.size}: ${sq.quantity} pcs${sizeStatus}\n`;
                });
                message += `    Color Total: ${colorTotal} pcs = ${formatPrice(colorSubtotal)}\n`;
              });
              if (product.specialInstructions) {
                message += `  📝 Product Note: ${product.specialInstructions}\n`;
              }
            });
            
            message += `\n*Summary*\n`;
            message += `Total Value: ${formatPrice(calculateTotalWithPerColorPricing())}\n`;
            message += `Status: ${inquiry.status}\n`;
            
            if (inquiry.specialInstructions) {
              message += `\n*Global Notes:*\n${inquiry.specialInstructions}\n`;
            }
            if (inquiry.adminNote && inquiry.status === 'quoted') {
              message += `\n*Seller Message:*\n${inquiry.adminNote}\n`;
            }

            window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685'}?text=${encodeURIComponent(message)}`, '_blank');
          }}
          className="flex items-center gap-1 px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-green-50 text-green-700 rounded-md sm:rounded-lg hover:bg-green-100 transition-colors font-medium whitespace-nowrap"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

// Search Bar - Responsive
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search by inquiry number or product..."
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Status Filters */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              onFilter(filter);
            }}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
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
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
        <div className="flex items-center gap-px sm:gap-1 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
              filterType === 'all' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('year')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
              filterType === 'year' 
                ? 'bg-[#E39A65] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Year
          </button>
          <button
            onClick={() => setFilterType('month')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
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
          <div className="flex items-center gap-px sm:gap-1 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
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
          <div className="flex items-center gap-px sm:gap-1 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
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

// Pagination Component - Responsive
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = window.innerWidth < 640 ? 3 : 5; // Show fewer pages on mobile
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - (maxVisible - 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          if (i >= 1 && i <= totalPages) {
            pages.push(i);
          }
        }
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl mt-4">
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

// Main Page Component
export default function InquiriesPage() {
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

  // Apply all filters
  const applyFilters = (inquiriesList, statusFilter, dateFilterType, searchTerm = '') => {
    let filtered = [...inquiriesList];

    // Apply date filter
    filtered = filterByDate(filtered);

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(inquiry => 
        inquiry.status === statusFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(inquiry => 
        inquiry.inquiryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.items.some(item => 
          item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  };

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/inquiries/my-inquiries', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setInquiries(data.data);
        
        // Apply filters
        const filtered = applyFilters(data.data, activeFilter, filterType);
        
        setFilteredInquiries(filtered);
        setTotalInquiries(data.data.length);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        
        // Calculate detailed stats (with cancelled)
        const totalValue = data.data.reduce((sum, i) => sum + (i.subtotal || 0), 0);
        
        setStats({
          total: data.data.length,
          submitted: data.data.filter(i => i.status === 'submitted').length,
          quoted: data.data.filter(i => i.status === 'quoted').length,
          accepted: data.data.filter(i => i.status === 'accepted').length,
          invoiced: data.data.filter(i => i.status === 'invoiced').length,
          cancelled: data.data.filter(i => i.status === 'cancelled').length,
          totalValue
        });
      }
    } catch (error) {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Update filtered inquiries when filters change
  useEffect(() => {
    const filtered = applyFilters(inquiries, activeFilter, filterType);
    setFilteredInquiries(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [filterType, selectedMonth, selectedYear, activeFilter, inquiries]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInquiries();
  };

  const handleSearch = (term) => {
    const filtered = applyFilters(inquiries, activeFilter, filterType, term);
    setFilteredInquiries(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleFilter = (status) => {
    setActiveFilter(status);
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

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[#E39A65] mx-auto mb-3 sm:mb-4" />
          <p className="text-xs sm:text-sm text-gray-500">Loading your inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-10">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">My Inquiries</h1>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                Total {totalInquiries} inquiries • {formatPrice(stats.totalValue)} total value
                {filterType !== 'all' && (
                  <span className="ml-1 sm:ml-2 text-[#E39A65] font-medium">
                    • Showing: {getFilterDisplayText()}
                  </span>
                )}
              </p>
            </div>
          
          </div>

          {/* Stats - Responsive grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3">
            <StatCard 
              title="Total" 
              value={stats.total} 
              icon={ShoppingBag} 
              color="gray" 
            />
            <StatCard 
              title="New" 
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
        {filteredInquiries.length > 0 && (
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] sm:text-xs text-gray-500">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredInquiries.length)}
              </span>{' '}
              of <span className="font-medium">{filteredInquiries.length}</span> inquiries
              {totalInquiries > itemsPerPage && (
                <> (Page {currentPage} of {totalPages})</>
              )}
            </p>
          </div>
        )}

        {/* Inquiries List */}
        <div id="inquiries-list">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-6 sm:p-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FileSearch className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">No inquiries found</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                {inquiries.length === 0 
                  ? "Start by adding products to your cart and submitting an inquiry" 
                  : filterType !== 'all'
                    ? `No inquiries found for ${getFilterDisplayText().toLowerCase()}`
                    : "Try adjusting your filters"}
              </p>
              {filterType !== 'all' ? (
                <button
                  onClick={() => setFilterType('all')}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E39A65] text-white text-xs sm:text-sm rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  <CalendarRange className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  View All Time
                </button>
              ) : (
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E39A65] text-white text-xs sm:text-sm rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Browse Products
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-2 sm:space-y-3">
                {currentItems.map((inquiry) => (
                  <InquiryCard 
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