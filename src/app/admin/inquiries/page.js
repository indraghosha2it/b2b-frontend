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
//   Globe,
//   Paperclip,
//   Edit,
//   Trash2,
//   FileOutput,
//   CheckSquare,
//   XSquare
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

// // Stat Card
// const StatCard = ({ title, value, icon: Icon, color }) => {
//   const colorClasses = {
//     amber: 'bg-amber-50 text-amber-600',
//     blue: 'bg-blue-50 text-blue-600',
//     emerald: 'bg-emerald-50 text-emerald-600',
//     purple: 'bg-purple-50 text-purple-600',
//     green: 'bg-green-50 text-green-600',
//     rose: 'bg-rose-50 text-rose-600',
//     gray: 'bg-gray-50 text-gray-600'
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
//       <div className="flex items-center justify-between mb-2">
//         <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
//           <Icon className="w-4 h-4" />
//         </div>
//       </div>
//       <p className="text-2xl font-bold text-gray-900">{value}</p>
//       <p className="text-xs text-gray-500 mt-1">{title}</p>
//     </div>
//   );
// };

// // Admin Inquiry Card with Status-Based Actions
// const AdminInquiryCard = ({ inquiry, onRefresh }) => {
//   const [showDetails, setShowDetails] = useState(false);
//   const [updating, setUpdating] = useState(false);
//   const [internalNote, setInternalNote] = useState('');
//   const [savingNote, setSavingNote] = useState(false);
//   const router = useRouter();

//   const handleStatusUpdate = async (newStatus) => {
//     setUpdating(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiry._id}/status`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ status: newStatus })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Status updated to ${newStatus}`);
//         onRefresh();
//       } else {
//         toast.error(data.error || 'Failed to update status');
//       }
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleAddInternalNote = async () => {
//     if (!internalNote.trim()) return;
    
//     setSavingNote(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiry._id}/notes`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ note: internalNote })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Note added successfully');
//         setInternalNote('');
//         onRefresh();
//       } else {
//         toast.error(data.error || 'Failed to add note');
//       }
//     } catch (error) {
//       toast.error('Failed to add note');
//     } finally {
//       setSavingNote(false);
//     }
//   };

//   const handleCreateInvoice = () => {
//     router.push(`/admin/invoices/create?inquiryId=${inquiry._id}`);
//   };

//   const handleViewInvoice = () => {
//     router.push(`/admin/invoices/${inquiry._id}`);
//   };

//   const handleWhatsApp = (phone) => {
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

//     const whatsappNumber = phone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685';
//     const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
//     window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
//   };

//   const handleDownloadAttachment = (file) => {
//     window.open(file.fileUrl, '_blank');
//   };

//   // Render action buttons based on status
//   const renderActionButtons = () => {
//     switch(inquiry.status) {
//       case 'submitted':
//         return (
//           <>
//             <button
//               onClick={() => handleStatusUpdate('quoted')}
//               disabled={updating}
//               className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//               title="Mark as Quoted"
//             >
//               <FileText className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => handleStatusUpdate('cancelled')}
//               disabled={updating}
//               className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
//               title="Cancel Inquiry"
//             >
//               <XCircle className="w-4 h-4" />
//             </button>
//           </>
//         );
      
//       case 'accepted':
//         return (
//           <button
//             onClick={handleCreateInvoice}
//             className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
//             title="Create Invoice"
//           >
//             <FileOutput className="w-4 h-4" />
//           </button>
//         );
      
//       case 'invoiced':
//         return (
//           <button
//             onClick={() => handleStatusUpdate('paid')}
//             disabled={updating}
//             className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
//             title="Mark as Paid"
//           >
//             <CheckCircle className="w-4 h-4" />
//           </button>
//         );
      
//       case 'paid':
//         return (
//           <button
//             onClick={handleViewInvoice}
//             className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//             title="View Invoice"
//           >
//             <Eye className="w-4 h-4" />
//           </button>
//         );
      
//       case 'quoted':
//         return (
//           <span className="text-xs text-gray-400 px-2 py-1">
//             Awaiting customer acceptance
//           </span>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//       {/* Header with Customer Info */}
//       <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center">
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
          
//           <div className="flex items-center gap-1">
//             {/* View/Expand Button */}
//             <button
//               onClick={() => setShowDetails(!showDetails)}
//               className="p-1.5 text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
//               title={showDetails ? "Collapse" : "View Details"}
//             >
//               <Eye className="w-4 h-4" />
//             </button>

//             {/* Status-based Action Buttons */}
//             {renderActionButtons()}
//           </div>
//         </div>

//         {/* Customer Info Row */}
//         <div className="grid grid-cols-4 gap-4 mt-2 text-xs">
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
//                       className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                       title="Download"
//                     >
//                       <Download className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Internal Notes */}
//           <div>
//             <h4 className="text-xs font-semibold text-gray-700 mb-2">Internal Notes</h4>
            
//             {/* Existing Notes */}
//             {inquiry.internalNotes && inquiry.internalNotes.length > 0 && (
//               <div className="mb-2 space-y-2">
//                 {inquiry.internalNotes.map((note, idx) => (
//                   <div key={idx} className="bg-white rounded-lg p-2 border border-gray-200">
//                     <p className="text-xs text-gray-600">{note.note}</p>
//                     <p className="text-[10px] text-gray-400 mt-1">
//                       Added on {formatDate(note.addedAt)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Add Note Input */}
//             <div className="flex gap-2">
//               <textarea
//                 value={internalNote}
//                 onChange={(e) => setInternalNote(e.target.value)}
//                 placeholder="Add internal note..."
//                 className="flex-1 text-xs border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
//                 rows="2"
//               />
//               <button
//                 onClick={handleAddInternalNote}
//                 disabled={savingNote || !internalNote.trim()}
//                 className="px-3 py-1 bg-[#E39A65] text-white text-xs rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {savingNote ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Add'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer with Actions */}
//       <div className="px-4 py-2 flex items-center justify-between bg-gray-50/30">
//         <div className="flex items-center gap-4 text-xs">
//           <span className="text-gray-500">Total Value:</span>
//           <span className="font-semibold text-[#E39A65]">{formatPrice(inquiry.subtotal)}</span>
//         </div>
        
//         <div className="flex items-center gap-2">
//           {/* WhatsApp Button */}
//           <button
//             onClick={() => handleWhatsApp(inquiry.userDetails?.whatsapp || inquiry.userDetails?.phone)}
//             className="flex items-center gap-1 px-2 py-1 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
//           >
//             <MessageCircle className="w-3.5 h-3.5" />
//             WhatsApp
//           </button>
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
//   const filters = ['All', 'Submitted', 'Quoted', 'Accepted', 'Invoiced', 'Paid', 'Cancelled'];

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
//                 ? 'bg-[#E39A65] text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>
      
//       <select
//         onChange={(e) => onDateFilter(e.target.value)}
//         className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
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

// // Main Admin Page Component
// export default function AdminInquiriesPage() {
//   const [inquiries, setInquiries] = useState([]);
//   const [filteredInquiries, setFilteredInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [stats, setStats] = useState({
//     total: 0,
//     submitted: 0,
//     quoted: 0,
//     accepted: 0,
//     invoiced: 0,
//     paid: 0,
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

//       const response = await fetch('http://localhost:5000/api/admin/inquiries', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setInquiries(data.data.inquiries);
//         setFilteredInquiries(data.data.inquiries);
        
//         const totalValue = data.data.inquiries.reduce((sum, i) => sum + (i.subtotal || 0), 0);
        
//         setStats({
//           total: data.data.inquiries.length,
//           submitted: data.data.inquiries.filter(i => i.status === 'submitted').length,
//           quoted: data.data.inquiries.filter(i => i.status === 'quoted').length,
//           accepted: data.data.inquiries.filter(i => i.status === 'accepted').length,
//           invoiced: data.data.inquiries.filter(i => i.status === 'invoiced').length,
//           paid: data.data.inquiries.filter(i => i.status === 'paid').length,
//           cancelled: data.data.inquiries.filter(i => i.status === 'cancelled').length,
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

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchInquiries();
//   };

//   const handleSearch = (term) => {
//     if (!term.trim()) {
//       setFilteredInquiries(inquiries);
//       return;
//     }
    
//     const filtered = inquiries.filter(inquiry => 
//       inquiry.inquiryNumber.toLowerCase().includes(term.toLowerCase()) ||
//       inquiry.userDetails?.companyName?.toLowerCase().includes(term.toLowerCase()) ||
//       inquiry.userDetails?.contactPerson?.toLowerCase().includes(term.toLowerCase()) ||
//       inquiry.userDetails?.email?.toLowerCase().includes(term.toLowerCase()) ||
//       inquiry.items.some(item => 
//         item.productName.toLowerCase().includes(term.toLowerCase())
//       )
//     );
//     setFilteredInquiries(filtered);
//   };

//   const handleFilter = (status) => {
//     if (status === 'All') {
//       setFilteredInquiries(inquiries);
//     } else {
//       const filtered = inquiries.filter(inquiry => 
//         inquiry.status === status.toLowerCase()
//       );
//       setFilteredInquiries(filtered);
//     }
//   };

//   const handleDateFilter = (range) => {
//     const now = new Date();
//     const filtered = inquiries.filter(inquiry => {
//       const date = new Date(inquiry.createdAt);
//       switch(range) {
//         case 'today':
//           return date.toDateString() === now.toDateString();
//         case 'week':
//           const weekAgo = new Date(now.setDate(now.getDate() - 7));
//           return date >= weekAgo;
//         case 'month':
//           return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
//         case 'year':
//           return date.getFullYear() === now.getFullYear();
//         default:
//           return true;
//       }
//     });
//     setFilteredInquiries(filtered);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
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
//               <h1 className="text-xl font-bold text-gray-900">Inquiry Management</h1>
//               <p className="text-xs text-gray-500 mt-0.5">Manage and process customer inquiries</p>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//             >
//               <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
//               Refresh
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-7 gap-3">
//             <StatCard title="Total" value={stats.total} icon={ShoppingBag} color="gray" />
//             <StatCard title="Submitted" value={stats.submitted} icon={Clock} color="amber" />
//             <StatCard title="Quoted" value={stats.quoted} icon={FileText} color="blue" />
//             <StatCard title="Accepted" value={stats.accepted} icon={CheckSquare} color="emerald" />
//             <StatCard title="Invoiced" value={stats.invoiced} icon={FileOutput} color="purple" />
//             <StatCard title="Paid" value={stats.paid} icon={CheckCircle} color="green" />
//             <StatCard title="Value" value={formatPrice(stats.totalValue)} icon={DollarSign} color="blue" />
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

//         {/* Inquiries List */}
//         {filteredInquiries.length === 0 ? (
//           <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
//             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//               <FileSearch className="w-5 h-5 text-gray-400" />
//             </div>
//             <h2 className="text-sm font-semibold text-gray-900 mb-1">No inquiries found</h2>
//             <p className="text-xs text-gray-500 mb-3">
//               {inquiries.length === 0 ? "No inquiries have been submitted yet" : "Try adjusting your filters"}
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {filteredInquiries.map((inquiry) => (
//               <AdminInquiryCard 
//                 key={inquiry._id} 
//                 inquiry={inquiry} 
//                 onRefresh={handleRefresh}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* WhatsApp Button */}
//       <div className="fixed bottom-4 right-4 z-50">
//         <a
//           href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685'}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
//         >
//           <MessageCircle className="w-5 h-5" />
//         </a>
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
  ChevronsRight
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

// Stat Card - Updated to remove Paid stat
const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    rose: 'bg-rose-50 text-rose-600',
    gray: 'bg-gray-50 text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{title}</p>
    </div>
  );
};

// Pagination Component - Fixed arrow spacing
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
                ? 'bg-[#E39A65] text-white'
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

// Admin Inquiry Card with Status-Based Actions
const AdminInquiryCard = ({ inquiry, onRefresh }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiry._id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Status updated to ${newStatus}`);
        onRefresh();
      } else {
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
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

  const handleCreateInvoice = () => {
    router.push(`/admin/invoices/create?inquiryId=${inquiry._id}`);
  };

  const handleViewInvoice = () => {
    router.push(`/admin/invoices/${inquiry._id}`);
  };

  const handleWhatsApp = () => {
    // Only proceed if WhatsApp number exists
    if (!inquiry.userDetails?.whatsapp) return;
    
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

    // Clean the WhatsApp number (remove any non-numeric characters except +)
    const cleanNumber = inquiry.userDetails.whatsapp.replace(/[^0-9+]/g, '');
    
    // Open WhatsApp with the customer's number
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDownloadAttachment = async (file) => {
    try {
      // Show loading toast
      toast.loading('Downloading file...', { id: 'download' });
      
      // Fetch the file
      const response = await fetch(file.fileUrl);
      const blob = await response.blob();
      
      // Create blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = file.fileName; // This forces download with the correct filename
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(blobUrl);
      
      // Success toast
      toast.success('File downloaded successfully', { id: 'download' });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file', { id: 'download' });
      
      // Fallback: open in new tab
      window.open(file.fileUrl, '_blank');
    }
  };

  // Render action buttons based on status with text labels
  const renderActionButtons = () => {
    switch(inquiry.status) {
      case 'submitted':
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStatusUpdate('quoted')}
              disabled={updating}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              Mark as Quoted
            </button>
            <button
              onClick={() => handleStatusUpdate('cancelled')}
              disabled={updating}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors font-medium"
            >
              <XCircle className="w-3.5 h-3.5" />
              Cancel
            </button>
          </div>
        );
      
      case 'accepted':
        return (
          <button
            onClick={handleCreateInvoice}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium"
          >
            <FileOutput className="w-3.5 h-3.5" />
            Create Invoice
          </button>
        );
      
      case 'invoiced':
        return (
          <button
            onClick={() => handleStatusUpdate('paid')}
            disabled={updating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Mark as Paid
          </button>
        );
      
      case 'paid':
        return (
          <button
            onClick={handleViewInvoice}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            <Eye className="w-3.5 h-3.5" />
            View Invoice
          </button>
        );
      
      case 'quoted':
        return (
          <span className="text-xs text-[#E39A65] bg-gray-100 px-3 py-1.5 rounded-lg">
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
        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center">
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
            
            {/* All buttons on top right side */}
            <div className="flex items-center gap-2">
              {/* View/Expand Button */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <Eye className="w-3.5 h-3.5" />
                {showDetails ? 'Hide Details' : 'View Details'}
              </button>

              {/* Status Action Buttons */}
              {renderActionButtons()}

              {/* Delete Button */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
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
          {inquiry.userDetails?.whatsapp && (
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
              title={`WhatsApp ${inquiry.userDetails.contactPerson || 'customer'}`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Customer
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 text-rose-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Delete Inquiry</h3>
              </div>
              
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete inquiry <span className="font-semibold">"{inquiry.inquiryNumber}"</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. All data associated with this inquiry will be permanently removed.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Delete Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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

// Filter Bar - Removed 'Paid' from filters
const FilterBar = ({ onFilter, activeFilter, setActiveFilter, onDateFilter }) => {
  const filters = ['All', 'Submitted', 'Quoted', 'Accepted', 'Invoiced', 'Cancelled'];

  return (
    <div className="flex flex-wrap items-center gap-2">
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
                ? 'bg-[#E39A65] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <select
        onChange={(e) => onDateFilter(e.target.value)}
        className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E39A65]"
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

// Main Admin Page Component
// Main Admin Page Component
export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [dateRange, setDateRange] = useState('all');
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

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Build query params
      let url = `http://localhost:5000/api/admin/inquiries?page=${currentPage}&limit=${itemsPerPage}`;
      
      if (activeFilter !== 'All') {
        url += `&status=${activeFilter.toLowerCase()}`;
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
        setInquiries(data.data.inquiries);
        setFilteredInquiries(data.data.inquiries);
        setTotalInquiries(data.data.pagination.total);
        setTotalPages(data.data.pagination.pages);
        
        // Calculate stats from current page
        const totalValue = data.data.inquiries.reduce((sum, i) => sum + (i.subtotal || 0), 0);
        
        setStats({
          total: data.data.pagination.total,
          submitted: data.data.inquiries.filter(i => i.status === 'submitted').length,
          quoted: data.data.inquiries.filter(i => i.status === 'quoted').length,
          accepted: data.data.inquiries.filter(i => i.status === 'accepted').length,
          invoiced: data.data.inquiries.filter(i => i.status === 'invoiced').length,
          cancelled: data.data.inquiries.filter(i => i.status === 'cancelled').length,
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
  }, [currentPage, activeFilter, dateRange]); // Add dateRange to dependencies

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

  const handleDateFilter = (range) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById('inquiries-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
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
              <h1 className="text-xl font-bold text-gray-900">Inquiry Management</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Total {totalInquiries} inquiries in database
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-6 gap-3">
            <StatCard title="Total" value={totalInquiries} icon={ShoppingBag} color="gray" />
            <StatCard title="Submitted" value={stats.submitted} icon={Clock} color="amber" />
            <StatCard title="Quoted" value={stats.quoted} icon={FileText} color="blue" />
            <StatCard title="Accepted" value={stats.accepted} icon={CheckSquare} color="emerald" />
            <StatCard title="Invoiced" value={stats.invoiced} icon={FileOutput} color="purple" />
            <StatCard title="Value" value={formatPrice(stats.totalValue)} icon={DollarSign} color="blue" />
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
            onDateFilter={handleDateFilter}
          />
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium">{filteredInquiries.length}</span> inquiries 
            {totalInquiries > itemsPerPage && (
              <> (Page {currentPage} of {totalPages})</>
            )}
            {dateRange !== 'all' && (
              <span className="ml-1 text-[#E39A65]">
                • Filtered by: {dateRange}
              </span>
            )}
          </p>
          <p className="text-xs text-gray-500">
            Total in database: <span className="font-semibold text-[#E39A65]">{totalInquiries}</span>
          </p>
        </div>

        {/* Inquiries List */}
        <div id="inquiries-list">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileSearch className="w-5 h-5 text-gray-400" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900 mb-1">No inquiries found</h2>
              <p className="text-xs text-gray-500 mb-3">
                {totalInquiries === 0 ? "No inquiries have been submitted yet" : "Try adjusting your filters"}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
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