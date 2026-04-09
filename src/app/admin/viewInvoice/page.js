
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import {
//   FileText,
//   ArrowLeft,
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Clock,
//   DollarSign,
//   Calendar,
//   Building2,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Package,
//   TrendingUp,
//   TrendingDown,
//   Download,
//   Printer,
//   CreditCard,
//   Landmark,
//   Copy,
//   Check,
//   AlertTriangle,
//   ChevronUp,
//   ChevronDown,
//   Edit,
//   Send,
//   Trash2,
//   MoreVertical
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
//     month: 'long',
//     day: 'numeric'
//   });
// };

// // FIXED: Check if invoice is expired (due date passed) - Only for unpaid/partial invoices
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

// // FIXED: Calculate overdue days correctly
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

// // Payment Status Badge - Shows actual payment status only
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
//     <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${config.bg} border ${config.border}`}>
//       <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${config.iconColor}`} />
//       <span className={`text-xs sm:text-sm font-medium ${config.text}`}>{config.label}</span>
//     </div>
//   );
// };

// // Copy Button Component
// const CopyButton = ({ text, label }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     toast.success(`${label} copied to clipboard`);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <button
//       onClick={handleCopy}
//       className="p-0.5 sm:p-1 hover:bg-gray-100 rounded transition-colors"
//       title={`Copy ${label}`}
//     >
//       {copied ? <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-green-600" /> : <Copy className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400" />}
//     </button>
//   );
// };

// // Product Row Component with professional design
// const ProductRow = ({ product, index }) => {
//   const [expanded, setExpanded] = useState(true);
  
//   const totalQuantity = product.colors?.reduce((sum, color) => 
//     sum + (color.totalForColor || 0), 0) || 0;
  
//   const productTotal = product.total || (totalQuantity * product.unitPrice);

//   return (
//     <>
//       {/* Main Product Row */}
//       <tr key={`product-${index}`} className="border-b border-gray-200 hover:bg-gray-50/80 transition-colors">
//         <td className="px-2 sm:px-6 py-3 sm:py-4 w-6 sm:w-12">
//           <button
//             onClick={() => setExpanded(!expanded)}
//             className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors text-gray-500"
//             title={expanded ? "Hide details" : "Show details"}
//           >
//             {expanded ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
//           </button>
//          </td>
//         <td className="px-2 sm:px-6 py-3 sm:py-4" colSpan={2}>
//           <div className="flex items-center gap-2 sm:gap-4">
//             {/* Product Image */}
//             <div className="w-12 h-14 sm:w-16 sm:h-[88px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 overflow-hidden shadow-sm flex-shrink-0">
//               {product.productImage ? (
//                 <img 
//                   src={product.productImage} 
//                   alt={product.productName}
//                   className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                   <Package className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
//                 </div>
//               )}
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
//                 <h4 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{product.productName}</h4>
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <span className="text-[10px] sm:text-sm text-gray-500">SKU: {product.productId?.slice(-6) || 'N/A'}</span>
//                 </div>
//               </div>
//               <div className="flex flex-wrap items-center gap-1.5 sm:gap-4 mt-1 sm:mt-2">
//                 <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium">
//                   <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-500"></span>
//                   {product.colors?.length || 0} Colors
//                 </span>
//                 <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] sm:text-xs font-medium">
//                   <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500"></span>
//                   {totalQuantity} Units
//                 </span>
//                 {product.moq && (
//                   <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] sm:text-xs font-medium">
//                     MOQ: {product.moq}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//          </td>
//         <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
//           <div className="text-base sm:text-2xl font-bold text-gray-900">{totalQuantity}</div>
//           <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Total Units</div>
//          </td>
//         <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
//           <div className="text-sm sm:text-lg font-semibold text-gray-900">{formatPrice(product.unitPrice)}</div>
//           <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Per Unit</div>
//          </td>
//         <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
//           <div className="text-base sm:text-xl font-bold text-[#E39A65]">{formatPrice(productTotal)}</div>
//           <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Line Total</div>
//          </td>
//        </tr>

//       {/* Expanded Color Details */}
//       {expanded && product.colors?.map((color, colorIdx) => (
//         <tr key={`color-${index}-${colorIdx}`} className="bg-gray-50/30 border-b border-gray-100">
//           <td className="px-2 sm:px-6 py-2 sm:py-3"> </td>
//           <td className="px-2 sm:px-6 py-2 sm:py-3" colSpan={5}>
//             <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
//               {/* Color Swatch */}
//               <div className="relative flex-shrink-0">
//                 <div 
//                   className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-white shadow-md"
//                   style={{ backgroundColor: color.color.code }}
//                   title={color.color.name || color.color.code}
//                 />
//                 <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full border border-gray-200"></div>
//               </div>

//               {/* Size Breakdown */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-wrap items-center gap-1 sm:gap-2">
//                   {color.sizeQuantities?.map((sq, sqIdx) => sq.quantity > 0 && (
//                     <div 
//                       key={`size-${index}-${colorIdx}-${sqIdx}`} 
//                       className="inline-flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
//                     >
//                       <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-[10px] sm:text-xs font-medium text-gray-700 border-r border-gray-200">
//                         {sq.size}
//                       </span>
//                       <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-gray-900">
//                         {sq.quantity}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Color Summary */}
//               <div className="text-right flex-shrink-0">
//                 <div className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
//                   {color.totalForColor} pcs × {formatPrice(product.unitPrice)}
//                 </div>
//                 <div className="text-sm sm:text-base font-bold text-[#E39A65] mt-0.5 sm:mt-1 whitespace-nowrap">
//                   {formatPrice(color.totalForColor * product.unitPrice)}
//                 </div>
//               </div>
//             </div>
//            </td>
//          </tr>
//       ))}

//       {/* Special Instructions */}
//       {expanded && product.specialInstructions && (
//         <tr key={`note-${index}`} className="bg-amber-50/30 border-b border-gray-200">
//           <td className="px-2 sm:px-6 py-2 sm:py-3" colSpan={2}> </td>
//           <td className="px-2 sm:px-6 py-2 sm:py-3" colSpan={4}>
//             <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-200">
//               <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 mt-0.5 flex-shrink-0" />
//               <div>
//                 <span className="text-[10px] sm:text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-0.5 sm:mb-1">
//                   Special Instructions
//                 </span>
//                 <p className="text-xs sm:text-sm text-amber-700">{product.specialInstructions}</p>
//               </div>
//             </div>
//            </td>
//          </tr>
//       )}
//     </>
//   );
// };

// export default function AdminInvoiceViewPage() {
//   const [invoice, setInvoice] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isExpired, setIsExpired] = useState(false);
//   const [overdueDays, setOverdueDays] = useState(0);
//   const [showActions, setShowActions] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [updating, setUpdating] = useState(false);
//   const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
//   const [generatingPDF, setGeneratingPDF] = useState(false);
  
  
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const invoiceId = searchParams.get('invoiceId');

//   useEffect(() => {
//     if (!invoiceId) {
//       setError('No invoice ID provided');
//       setLoading(false);
//       return;
//     }

//     fetchInvoice();
//   }, [invoiceId]);

//   const fetchInvoice = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setInvoice(data.data);
        
//         // Check if expired using fixed function
//         const expired = isInvoiceExpired(data.data);
//         setIsExpired(expired);
        
//         if (expired) {
//           const days = getOverdueDays(data.data.dueDate);
//           setOverdueDays(days);
//         }
//       } else {
//         setError(data.error || 'Failed to load invoice');
//       }
//     } catch (error) {
//       setError('Failed to load invoice');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (newStatus) => {
//     setUpdating(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const updateData = { paymentStatus: newStatus };
      
//       if (newStatus === 'paid') {
//         updateData.amountPaid = invoice.finalTotal;
//         updateData.dueAmount = 0;
//       } else if (newStatus === 'cancelled') {
//         updateData.dueAmount = 0;
//       }

//       const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updateData)
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Invoice status updated to ${newStatus}`);
//         fetchInvoice();
//         setStatusDropdownOpen(false);
//       } else {
//         toast.error(data.error || 'Failed to update status');
//       }
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Invoice deleted successfully');
//         router.push('/admin/invoices');
//       } else {
//         toast.error(data.error || 'Failed to delete invoice');
//       }
//     } catch (error) {
//       toast.error('Failed to delete invoice');
//     } finally {
//       setDeleting(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   const handleEdit = () => {
//     router.push(`/admin/updateInvoice?invoiceId=${invoiceId}`);
//   };

//   const handleDownloadPDF = async () => {
//     if (!invoice) return;
    
//     setGeneratingPDF(true);
//     try {
//       toast.info('🖨️ Generating PDF invoice...');
//       await generateInvoicePDF(invoice);
//       toast.success('✅ PDF generated successfully!');
//     } catch (error) {
//       console.error('PDF Generation Error:', error);
//       toast.error('❌ Failed to generate PDF');
//     } finally {
//       setGeneratingPDF(false);
//     }
//   };

//   const handleGoBack = () => {
//     router.push('/admin/invoices');
//   };

//   // Get status options based on current status
//   const getStatusOptions = () => {
//     if (!invoice) return [];
    
//     // If paid or cancelled, no options
//     if (invoice.paymentStatus === 'paid' || invoice.paymentStatus === 'cancelled') {
//       return [];
//     }

//     // Status options based on current status (no special handling for expired)
//     switch (invoice.paymentStatus) {
//       case 'partial':
//         return [
//           { value: 'paid', label: 'Mark as Paid', icon: CheckCircle },
//           { value: 'cancelled', label: 'Cancel Invoice', icon: XCircle }
//         ];
//       case 'unpaid':
//         return [
//           { value: 'paid', label: 'Mark as Paid', icon: CheckCircle },
//           { value: 'cancelled', label: 'Cancel Invoice', icon: XCircle }
//         ];
//       case 'overpaid':
//         return [
//           { value: 'paid', label: 'Mark as Paid', icon: CheckCircle }
//         ];
//       default:
//         return [];
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[#E39A65] mx-auto mb-3 sm:mb-4" />
//           <p className="text-xs sm:text-sm text-gray-500">Loading invoice details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !invoice) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//         <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md text-center">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//             <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
//           </div>
//           <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Invoice Not Found</h2>
//           <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">{error || 'The invoice you are looking for does not exist.'}</p>
//           <button
//             onClick={handleGoBack}
//             className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-xs sm:text-sm"
//           >
//             <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
//             Back to Invoices
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const dueAmount = invoice.finalTotal - (invoice.amountPaid || 0);
//   const statusOptions = getStatusOptions();

//   return (
//     <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
//       <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
//         {/* Header with Navigation and Actions - Responsive */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
//           <button
//             onClick={handleGoBack}
//             className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-gray-900 transition-colors w-fit"
//           >
//             <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
//             <span className="text-xs sm:text-sm font-medium">Back to Invoices</span>
//           </button>
          
//           <div className="flex flex-wrap items-center gap-2">
//             {/* Status Dropdown */}
//             {statusOptions.length > 0 && (
//               <div className="relative">
//                 <button
//                   onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
//                   disabled={updating}
//                   className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
//                 >
//                   {updating ? <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> : 'Change Status'}
//                   <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
//                 </button>
                
//                 {statusDropdownOpen && (
//                   <div className="absolute right-0 mt-1 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
//                     {statusOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => handleStatusUpdate(option.value)}
//                         className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-left hover:bg-gray-50 flex items-center gap-2"
//                       >
//                         <option.icon className="w-3 h-3 sm:w-4 sm:h-4" />
//                         {option.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             <button
//               onClick={handleEdit}
//               className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
//               Edit
//             </button>
            
//             <button
//               onClick={handleDownloadPDF}
//               disabled={generatingPDF}
//               className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//             >
//               {generatingPDF ? (
//                 <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
//               ) : (
//                 <Download className="w-3 h-3 sm:w-4 sm:h-4" />
//               )}
//               {generatingPDF ? 'Generating...' : 'PDF'}
//             </button>
            
//             {/* Delete Button */}
//             <button
//               onClick={() => setShowDeleteConfirm(true)}
//               className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Invoice Header Card */}
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 sm:mb-6">
//           {/* Status Bar */}
//           <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//               <div className="flex items-center gap-2 sm:gap-4">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center shadow-md">
//                   <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-base sm:text-xl font-bold text-gray-900">{invoice.invoiceNumber}</h1>
//                   <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-[10px] sm:text-xs text-gray-500">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                       <span>Issued: {formatDate(invoice.invoiceDate)}</span>
//                     </div>
//                     <span className="hidden sm:inline">•</span>
//                     <div className="flex items-center gap-1">
//                       <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                       <span className={isExpired ? 'text-red-600 font-medium' : ''}>
//                         Due: {formatDate(invoice.dueDate)}
//                       </span>
//                     </div>
//                     {invoice.inquiryNumber && (
//                       <>
//                         <span className="hidden sm:inline">•</span>
//                         <div className="flex items-center gap-1">
//                           <FileText className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                           <span className="truncate max-w-[120px] sm:max-w-none">Inquiry: {invoice.inquiryNumber}</span>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <PaymentStatusBadge status={invoice.paymentStatus} />
//             </div>
//           </div>

//           {/* Overdue Warning */}
//           {isExpired && (
//             <div className="px-3 sm:px-6 py-2 sm:py-3 bg-red-50 border-b border-red-200 flex items-center gap-1.5 sm:gap-2">
//               <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
//               <span className="text-[10px] sm:text-sm text-red-700">
//                 This invoice is {overdueDays} day{overdueDays !== 1 ? 's' : ''} overdue.
//               </span>
//             </div>
//           )}

//           {/* Company and Customer Info */}
//           <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//             {/* From: Company */}
//             <div>
//               <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">From</h3>
//               <div className="space-y-1.5 sm:space-y-2">
//                 {invoice.company?.logo && (
//                   <div className="w-20 h-14 sm:w-28 sm:h-20 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden mb-2 sm:mb-3">
//                     <img 
//                       src={invoice.company.logo} 
//                       alt={invoice.company.companyName}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//                 <p className="font-semibold text-gray-900 text-sm sm:text-base">{invoice.company?.companyName || 'Asian Clothify'}</p>
//                 {invoice.company?.contactPerson && (
//                   <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
//                     <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
//                     {invoice.company.contactPerson}
//                   </p>
//                 )}
//                 <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2 break-all">
//                   <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
//                   <span className="break-words">{invoice.company?.email || 'info@asianclothify.com'}</span>
//                 </p>
//                 <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
//                   <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
//                   {invoice.company?.phone || '+8801305-785685'}
//                 </p>
//                 <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-1.5 sm:gap-2">
//                   <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                   <span className="break-words">{invoice.company?.address || '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'}</span>
//                 </p>
//               </div>
//             </div>

//             {/* To: Customer */}
//             <div>
//               <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">To</h3>
//               <div className="space-y-1.5 sm:space-y-2">
//                 <p className="font-semibold text-gray-900 text-sm sm:text-base">{invoice.customer?.companyName || 'N/A'}</p>
//                 <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
//                   <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
//                   {invoice.customer?.contactPerson || 'N/A'}
//                   <CopyButton text={invoice.customer?.contactPerson || ''} label="contact name" />
//                 </p>
//                 <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2 break-all">
//                   <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
//                   <span className="break-words">{invoice.customer?.email || 'N/A'}</span>
//                   <CopyButton text={invoice.customer?.email || ''} label="email" />
//                 </p>
//                 <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
//                   <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
//                   {invoice.customer?.phone || 'N/A'}
//                   <CopyButton text={invoice.customer?.phone || ''} label="phone" />
//                 </p>
                
//                 {/* Billing Address */}
//                 {(invoice.customer?.billingAddress || invoice.customer?.billingCity) && (
//                   <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
//                     <p className="text-[10px] sm:text-xs font-medium text-gray-500 mb-1 sm:mb-2">Billing Address</p>
//                     <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-1.5 sm:gap-2">
//                       <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                       <span className="break-words">
//                         {[
//                           invoice.customer.billingAddress,
//                           invoice.customer.billingCity,
//                           invoice.customer.billingZipCode,
//                           invoice.customer.billingCountry
//                         ].filter(Boolean).join(', ')}
//                       </span>
//                     </p>
//                   </div>
//                 )}

//                 {/* Shipping Address (if different) */}
//                 {invoice.customer?.shippingAddress && (
//                   <div className="mt-2 sm:mt-3">
//                     <p className="text-[10px] sm:text-xs font-medium text-gray-500 mb-1 sm:mb-2">Shipping Address</p>
//                     <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-1.5 sm:gap-2">
//                       <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                       <span className="break-words">
//                         {[
//                           invoice.customer.shippingAddress,
//                           invoice.customer.shippingCity,
//                           invoice.customer.shippingZipCode,
//                           invoice.customer.shippingCountry
//                         ].filter(Boolean).join(', ')}
//                       </span>
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Invoice Items Table */}
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 sm:mb-6">
//           <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h2 className="text-sm sm:text-lg font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
//                 <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#E39A65]" />
//                 Invoice Items
//               </h2>
//               <span className="text-[10px] sm:text-xs text-gray-500">
//                 {invoice.items?.length || 0} product(s)
//               </span>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[600px] sm:min-w-full">
//               <thead>
//                 <tr className="bg-gray-100/80 border-b border-gray-200">
//                   <th className="px-2 sm:px-6 py-2 sm:py-3 w-6 sm:w-12"></th>
//                   <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider" colSpan={2}>
//                     Product Details
//                   </th>
//                   <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Quantity
//                   </th>
//                   <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Unit Price
//                   </th>
//                   <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Total
//                   </th>
//                  </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {invoice.items?.map((product, index) => (
//                   <ProductRow key={index} product={product} index={index} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Invoice Summary and Payment Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 items-start">
//           {/* Bank Details */}
//           {invoice.bankDetails && Object.values(invoice.bankDetails).some(v => v) && (
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//               <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
//                 <h2 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
//                   <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />
//                   Bank Details
//                 </h2>
//               </div>
//               <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
//                 {invoice.bankDetails.bankName && (
//                   <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
//                     <span className="text-gray-500">Bank Name:</span>
//                     <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.bankName}</span>
//                   </div>
//                 )}
//                 {invoice.bankDetails.accountName && (
//                   <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
//                     <span className="text-gray-500">Account Name:</span>
//                     <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.accountName}</span>
//                   </div>
//                 )}
//                 {invoice.bankDetails.accountNumber && (
//                   <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
//                     <span className="text-gray-500">Account Number:</span>
//                     <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.accountNumber}</span>
//                   </div>
//                 )}
//                 {invoice.bankDetails.accountType && (
//                   <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
//                     <span className="text-gray-500">Account Type:</span>
//                     <span className="font-medium text-gray-900">{invoice.bankDetails.accountType}</span>
//                   </div>
//                 )}
//                 {invoice.bankDetails.routingNumber && (
//                   <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
//                     <span className="text-gray-500">Routing Number:</span>
//                     <span className="font-medium text-gray-900">{invoice.bankDetails.routingNumber}</span>
//                   </div>
//                 )}
//                 {invoice.bankDetails.swiftCode && (
//                   <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
//                     <span className="text-gray-500">SWIFT Code:</span>
//                     <span className="font-medium text-gray-900">{invoice.bankDetails.swiftCode}</span>
//                   </div>
//                 )}
//                 {invoice.bankDetails.iban && (
//                   <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
//                     <span className="text-gray-500">IBAN:</span>
//                     <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.iban}</span>
//                   </div>
//                 )}
//                 {invoice.bankDetails.bankAddress && (
//                   <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
//                     <span className="text-gray-500">Bank Address:</span>
//                     <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.bankAddress}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Invoice Summary */}
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//             <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
//               <h2 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
//                 <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Invoice Summary
//               </h2>
//             </div>
//             <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//               <div className="space-y-1.5 sm:space-y-2">
//                 <div className="flex justify-between text-xs sm:text-sm">
//                   <span className="text-gray-500">Subtotal:</span>
//                   <span className="font-medium text-gray-900">{formatPrice(invoice.subtotal)}</span>
//                 </div>
                
//                 {invoice.vatPercentage > 0 && (
//                   <div className="flex justify-between text-xs sm:text-sm">
//                     <span className="text-gray-500">VAT ({invoice.vatPercentage}%):</span>
//                     <span className="font-medium text-gray-900">{formatPrice(invoice.vatAmount)}</span>
//                   </div>
//                 )}
                
//                 {invoice.discountPercentage > 0 && (
//                   <div className="flex justify-between text-xs sm:text-sm">
//                     <span className="text-gray-500">Discount ({invoice.discountPercentage}%):</span>
//                     <span className="font-medium text-red-600">-{formatPrice(invoice.discountAmount)}</span>
//                   </div>
//                 )}
                
//                 {invoice.shippingCost > 0 && (
//                   <div className="flex justify-between text-xs sm:text-sm">
//                     <span className="text-gray-500">Shipping:</span>
//                     <span className="font-medium text-gray-900">{formatPrice(invoice.shippingCost)}</span>
//                   </div>
//                 )}
                
//                 <div className="border-t border-gray-200 my-2 sm:my-3 pt-2 sm:pt-3">
//                   <div className="flex justify-between font-semibold">
//                     <span className="text-gray-900 text-sm sm:text-base">Total:</span>
//                     <span className="text-[#E39A65] text-base sm:text-lg">{formatPrice(invoice.finalTotal)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Details with Percentages */}
//               <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
//                 <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
//                   <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
//                   Payment Details
//                 </h3>
                
//                 {/* Paid Section with Amount and Percentage */}
//                 <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
//                   <div className="flex justify-between items-center mb-1 sm:mb-2">
//                     <div className="flex items-center gap-1 sm:gap-2">
//                       <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
//                       <span className="text-xs sm:text-sm font-medium text-green-700">Paid</span>
//                     </div>
//                     <span className="text-xs sm:text-sm font-bold text-green-700">
//                       {formatPrice(invoice.amountPaid || 0)}
//                     </span>
//                   </div>
//                   <div className="space-y-1">
//                     <div className="flex justify-between text-[10px] sm:text-xs">
//                       <span className="text-green-600">Percentage</span>
//                       <span className="font-medium text-green-700">
//                         {invoice.finalTotal > 0 
//                           ? ((invoice.amountPaid / invoice.finalTotal) * 100).toFixed(1) 
//                           : '0'}%
//                       </span>
//                     </div>
//                     <div className="w-full h-1.5 sm:h-2 bg-green-100 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-green-500 rounded-full transition-all duration-300"
//                         style={{ 
//                           width: `${invoice.finalTotal > 0 
//                             ? Math.min((invoice.amountPaid / invoice.finalTotal) * 100, 100) 
//                             : 0}%` 
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Unpaid Section with Amount and Percentage */}
//                 <div className="bg-red-50 p-2 sm:p-3 rounded-lg border border-red-200">
//                   <div className="flex justify-between items-center mb-1 sm:mb-2">
//                     <div className="flex items-center gap-1 sm:gap-2">
//                       <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
//                       <span className="text-xs sm:text-sm font-medium text-red-700">Unpaid</span>
//                     </div>
//                     <span className="text-xs sm:text-sm font-bold text-red-700">
//                       {formatPrice(dueAmount)}
//                     </span>
//                   </div>
//                   <div className="space-y-1">
//                     <div className="flex justify-between text-[10px] sm:text-xs">
//                       <span className="text-red-600">Percentage</span>
//                       <span className="font-medium text-red-700">
//                         {invoice.finalTotal > 0 
//                           ? ((dueAmount / invoice.finalTotal) * 100).toFixed(1) 
//                           : '0'}%
//                       </span>
//                     </div>
//                     <div className="w-full h-1.5 sm:h-2 bg-red-100 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-red-500 rounded-full transition-all duration-300"
//                         style={{ 
//                           width: `${invoice.finalTotal > 0 
//                             ? Math.max(Math.min((dueAmount / invoice.finalTotal) * 100, 100), 0) 
//                             : 0}%` 
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Compact Summary */}
//                 <div className="flex justify-between text-[10px] sm:text-sm pt-1 sm:pt-2 border-t border-gray-200">
//                   <span className="text-gray-500">Payment Status:</span>
//                   <PaymentStatusBadge status={invoice.paymentStatus} />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs mt-1 sm:mt-2">
//                   <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
//                     <p className="text-gray-500">Paid Amount</p>
//                     <p className="font-semibold text-green-600 text-xs sm:text-sm">{formatPrice(invoice.amountPaid || 0)}</p>
//                     <p className="text-[8px] sm:text-[10px] text-gray-400 mt-0.5">
//                       {invoice.finalTotal > 0 
//                         ? ((invoice.amountPaid / invoice.finalTotal) * 100).toFixed(1) 
//                         : '0'}% of total
//                     </p>
//                   </div>
//                   <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
//                     <p className="text-gray-500">Unpaid Amount</p>
//                     <p className="font-semibold text-red-500 text-xs sm:text-sm">{formatPrice(dueAmount)}</p>
//                     <p className="text-[8px] sm:text-[10px] text-gray-400 mt-0.5">
//                       {invoice.finalTotal > 0 
//                         ? ((dueAmount / invoice.finalTotal) * 100).toFixed(1) 
//                         : '0'}% of total
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Dates */}
//               <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-xs">
//                 <div>
//                   <p className="text-gray-500">Invoice Date</p>
//                   <p className="font-medium text-gray-900 text-xs sm:text-sm">{formatDate(invoice.invoiceDate)}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">Due Date</p>
//                   <p className={`font-medium text-xs sm:text-sm ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
//                     {formatDate(invoice.dueDate)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Notes and Terms */}
//         {(invoice.notes || invoice.terms) && (
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 sm:mb-6">
//             <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
//               <h2 className="text-sm sm:text-base font-semibold text-gray-900">Additional Information</h2>
//             </div>
//             <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//               {invoice.notes && (
//                 <div>
//                   <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Notes</h3>
//                   <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg break-words">{invoice.notes}</p>
//                 </div>
//               )}
//               {invoice.terms && (
//                 <div>
//                   <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Terms & Conditions</h3>
//                   <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg break-words">{invoice.terms}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Custom Fields */}
//         {invoice.customFields && invoice.customFields.length > 0 && (
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 sm:mb-6">
//             <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
//               <h2 className="text-sm sm:text-base font-semibold text-gray-900">Additional Fields</h2>
//             </div>
//             <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {invoice.customFields.map((field, idx) => (
//                 <div key={idx}>
//                   <p className="text-[10px] sm:text-xs text-gray-500">{field.fieldName}</p>
//                   <p className="text-xs sm:text-sm font-medium text-gray-900 mt-0.5 sm:mt-1 break-words">{field.fieldValue}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Footer Note */}
//         <div className="text-center text-[10px] sm:text-xs text-gray-400 mt-6 sm:mt-8 mb-4">
//           Invoice generated by {
//             typeof invoice.createdBy === 'object' 
//               ? invoice.createdBy?.contactPerson || invoice.createdBy?.email || 'Admin' 
//               : invoice.createdBy || 'Admin'
//           } on {formatDate(invoice.createdAt)}
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center gap-2 sm:gap-3 text-rose-600 mb-3 sm:mb-4">
//                 <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//                 <h3 className="text-base sm:text-lg font-semibold">Delete Invoice</h3>
//               </div>
              
//               <p className="text-xs sm:text-sm text-gray-600 mb-2">
//                 Are you sure you want to delete invoice <span className="font-semibold">"{invoice?.invoiceNumber}"</span>?
//               </p>
//               <p className="text-[10px] sm:text-xs text-gray-500 mb-4 sm:mb-6">
//                 This action cannot be undone. All data associated with this invoice will be permanently removed.
//               </p>

//               <div className="flex items-center justify-end gap-2 sm:gap-3">
//                 <button
//                   onClick={() => setShowDeleteConfirm(false)}
//                   className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={deleting}
//                   className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 sm:gap-2"
//                 >
//                   {deleting ? <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> : <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />}
//                   Delete Invoice
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FileText,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  TrendingUp,
  TrendingDown,
  Download,
  CreditCard,
  Landmark,
  Copy,
  Check,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
  FileText as FileTextIcon
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
    month: 'long',
    day: 'numeric'
  });
};

// Check if invoice is expired
const isInvoiceExpired = (invoice) => {
  if (invoice.paymentStatus === 'paid' || 
      invoice.paymentStatus === 'cancelled' || 
      invoice.paymentStatus === 'overpaid') {
    return false;
  }
  
  const today = new Date();
  const dueDate = new Date(invoice.dueDate);
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  
  return dueDate < today;
};

// Calculate overdue days
const getOverdueDays = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diffTime = today - due;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Payment Status Badge
const PaymentStatusBadge = ({ status }) => {
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
    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${config.bg} border ${config.border}`}>
      <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${config.iconColor}`} />
      <span className={`text-xs sm:text-sm font-medium ${config.text}`}>{config.label}</span>
    </div>
  );
};

// Copy Button Component
const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-0.5 sm:p-1 hover:bg-gray-100 rounded transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-green-600" /> : <Copy className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400" />}
    </button>
  );
};

// Function to wrap long text
const wrapText = (text, maxLength = 60) => {
  if (!text || typeof text !== 'string') return [''];
  if (text.length <= maxLength) return [text];
  
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (let word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxLength) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  
  return lines.length > 0 ? lines : [text];
};

// Product Row Component
const ProductRow = ({ product, index }) => {
  const [expanded, setExpanded] = useState(true);
  
  const totalQuantity = product.colors?.reduce((sum, color) => 
    sum + (color.totalForColor || 0), 0) || 0;
  
  const productTotal = product.total || (totalQuantity * product.unitPrice);
  const productNameLines = wrapText(product.productName, 50);

  return (
    <React.Fragment key={`product-${index}`}>
      {/* Main Product Row */}
      <tr className="border-b border-gray-200 hover:bg-gray-50/80 transition-colors">
        <td className="px-2 sm:px-6 py-3 sm:py-4 w-6 sm:w-12">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors text-gray-500"
            title={expanded ? "Hide details" : "Show details"}
          >
            {expanded ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
          </button>
        </td>
        <td className="px-2 sm:px-6 py-3 sm:py-4" colSpan={2}>
          <div className="flex items-start gap-2 sm:gap-4">
            {/* Product Image */}
            <div className="w-12 h-14 sm:w-16 sm:h-[88px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 overflow-hidden shadow-sm flex-shrink-0">
              {product.productImage ? (
                <img 
                  src={product.productImage} 
                  alt={product.productName}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Package className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {/* Product Name - Multi-line */}
              <div className="mb-1 sm:mb-2">
                {productNameLines && productNameLines.length > 1 ? (
                  <div className="space-y-0.5">
                    {productNameLines.map((line, idx) => (
                      <h4 
                        key={idx} 
                        className="font-semibold text-gray-900 text-xs sm:text-sm break-words"
                        style={{ wordBreak: 'break-word' }}
                      >
                        {line}
                      </h4>
                    ))}
                  </div>
                ) : (
                  <h4 className="font-semibold text-gray-900 text-xs sm:text-sm break-words">
                    {product.productName || 'N/A'}
                  </h4>
                )}
              </div>
              
             
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-4 mt-1 sm:mt-2">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-500"></span>
                  {product.colors?.length || 0} Colors
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] sm:text-xs font-medium">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500"></span>
                  {totalQuantity} Units
                </span>
                {product.moq && (
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] sm:text-xs font-medium">
                    MOQ: {product.moq}
                  </span>
                )}
              </div>
            </div>
          </div>
        </td>
        <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
          <div className="text-base sm:text-2xl font-bold text-gray-900">{totalQuantity}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Total Units</div>
        </td>
        <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
          <div className="text-sm sm:text-lg font-semibold text-gray-900">{formatPrice(product.unitPrice)}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Per Unit</div>
        </td>
        <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
          <div className="text-base sm:text-xl font-bold text-[#E39A65]">{formatPrice(productTotal)}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Line Total</div>
        </td>
      </tr>

      {/* Expanded Color Details */}
    {expanded && product.colors?.map((color, colorIdx) => {
  // Get per-color unit price (use color.unitPrice, fallback to product.unitPrice)
  const colorUnitPrice = color.unitPrice || product.unitPrice || 0;
  const colorSubtotal = (color.totalForColor || 0) * colorUnitPrice;
  
  return (
    <tr key={`color-${index}-${colorIdx}`} className="bg-gray-50/30 border-b border-gray-100">
      <td className="px-2 sm:px-6 py-2 sm:py-3"></td>
      <td className="px-2 sm:px-6 py-2 sm:py-3" colSpan={5}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          {/* Color Swatch */}
          <div className="relative flex-shrink-0">
            <div 
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-white shadow-md"
              style={{ backgroundColor: color.color.code }}
              title={color.color.name || color.color.code}
            />
            <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full border border-gray-200"></div>
          </div>

          {/* Size Breakdown */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              {color.sizeQuantities?.map((sq, sqIdx) => sq.quantity > 0 && (
                <div 
                  key={`size-${index}-${colorIdx}-${sqIdx}`} 
                  className="inline-flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-[10px] sm:text-xs font-medium text-gray-700 border-r border-gray-200">
                    {sq.size}
                  </span>
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-gray-900">
                    {sq.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Color Summary with Per-Color Unit Price */}
          <div className="text-right flex-shrink-0">
            <div className="text-[10px] sm:text-xs font-medium text-gray-500 whitespace-nowrap">
              {color.totalForColor} pcs × {formatPrice(colorUnitPrice)}/pc
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#E39A65] mt-0.5 sm:mt-1 whitespace-nowrap">
              = {formatPrice(colorSubtotal)}
            </div>
          </div>
        </div>
      </td>
     </tr>
  );
})}

      {/* Special Instructions */}
      {expanded && product.specialInstructions && (
        <tr className="bg-amber-50/30 border-b border-gray-200">
          <td className="px-2 sm:px-6 py-2 sm:py-3" colSpan={2}></td>
          <td className="px-2 sm:px-6 py-2 sm:py-3" colSpan={4}>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[10px] sm:text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-0.5 sm:mb-1">
                  Special Instructions
                </span>
                <p className="text-xs sm:text-sm text-amber-700">{product.specialInstructions}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

// Product Row Component - CORRECTED
// const ProductRow = ({ product, index }) => {
//   const [expanded, setExpanded] = useState(true);
  
//   const totalQuantity = product.colors?.reduce((sum, color) => 
//     sum + (color.totalForColor || 0), 0) || 0;
  
//   const productTotal = product.total || (totalQuantity * product.unitPrice);
//   const productNameLines = wrapText(product.productName, 50);

//   return (
//     <React.Fragment key={`product-${index}`}>
//       {/* Main Product Row */}
//       <tr className="border-b border-gray-200 hover:bg-gray-50/80 transition-colors">
//         <td className="px-2 sm:px-6 py-3 sm:py-4 w-6 sm:w-12">
//           <button
//             onClick={() => setExpanded(!expanded)}
//             className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors text-gray-500"
//             title={expanded ? "Hide details" : "Show details"}
//           >
//             {expanded ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
//           </button>
//         </td>
//         <td className="px-2 sm:px-6 py-3 sm:py-4" colSpan={2}>
//           <div className="flex items-start gap-2 sm:gap-4">
//             {/* Product Image */}
//             <div className="w-12 h-14 sm:w-16 sm:h-[88px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 overflow-hidden shadow-sm flex-shrink-0">
//               {product.productImage ? (
//                 <img 
//                   src={product.productImage} 
//                   alt={product.productName}
//                   className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                   <Package className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
//                 </div>
//               )}
//             </div>
//             <div className="flex-1 min-w-0">
//               {/* Product Name - Multi-line */}
//               <div className="mb-1 sm:mb-2">
//                 {productNameLines && productNameLines.length > 1 ? (
//                   <div className="space-y-0.5">
//                     {productNameLines.map((line, idx) => (
//                       <h4 
//                         key={idx} 
//                         className="font-semibold text-gray-900 text-xs sm:text-sm break-words"
//                         style={{ wordBreak: 'break-word' }}
//                       >
//                         {line}
//                       </h4>
//                     ))}
//                   </div>
//                 ) : (
//                   <h4 className="font-semibold text-gray-900 text-xs sm:text-sm break-words">
//                     {product.productName || 'N/A'}
//                   </h4>
//                 )}
//               </div>
              
//               <div className="flex flex-wrap items-center gap-1.5 sm:gap-4 mt-1 sm:mt-2">
//                 <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium">
//                   <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-500"></span>
//                   {product.colors?.length || 0} Colors
//                 </span>
//                 <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] sm:text-xs font-medium">
//                   <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500"></span>
//                   {totalQuantity} Units
//                 </span>
//                 {product.moq && (
//                   <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] sm:text-xs font-medium">
//                     MOQ: {product.moq}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </td>
//         <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
//           <div className="text-base sm:text-2xl font-bold text-gray-900">{totalQuantity}</div>
//           <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Total Units</div>
//         </td>
//         <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
//           <div className="text-sm sm:text-lg font-semibold text-gray-900">{formatPrice(product.unitPrice)}</div>
//           <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Per Unit</div>
//         </td>
//         <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
//           <div className="text-base sm:text-xl font-bold text-[#E39A65]">{formatPrice(productTotal)}</div>
//           <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Line Total</div>
//         </td>
//       </table>

//       {/* Expanded Color Details with Per-Color Unit Price */}
//       {expanded && product.colors?.map((color, colorIdx) => {
//         // Get per-color unit price (use color.unitPrice, fallback to product.unitPrice)
//         const colorUnitPrice = color.unitPrice || product.unitPrice || 0;
//         const colorSubtotal = (color.totalForColor || 0) * colorUnitPrice;
        
//         return (
//           <tr key={`color-${index}-${colorIdx}`} className="bg-gray-50/30 border-b border-gray-100">
//             <td className="px-2 sm:px-6 py-2 sm:py-3"></td>
//             <td className="px-2 sm:px-6 py-2 sm:py-3" colSpan={5}>
//               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
//                 {/* Color Swatch */}
//                 <div className="relative flex-shrink-0">
//                   <div 
//                     className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-white shadow-md"
//                     style={{ backgroundColor: color.color.code }}
//                     title={color.color.name || color.color.code}
//                   />
//                   <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full border border-gray-200"></div>
//                 </div>

//                 {/* Size Breakdown */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex flex-wrap items-center gap-1 sm:gap-2">
//                     {color.sizeQuantities?.map((sq, sqIdx) => sq.quantity > 0 && (
//                       <div 
//                         key={`size-${index}-${colorIdx}-${sqIdx}`} 
//                         className="inline-flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
//                       >
//                         <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-[10px] sm:text-xs font-medium text-gray-700 border-r border-gray-200">
//                           {sq.size}
//                         </span>
//                         <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-gray-900">
//                           {sq.quantity}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Color Summary with Per-Color Unit Price */}
//                 <div className="text-right flex-shrink-0">
//                   <div className="text-[10px] sm:text-xs font-medium text-gray-500 whitespace-nowrap">
//                     {color.totalForColor} pcs × {formatPrice(colorUnitPrice)}/pc
//                   </div>
//                   <div className="text-xs sm:text-sm font-semibold text-[#E39A65] mt-0.5 sm:mt-1 whitespace-nowrap">
//                     = {formatPrice(colorSubtotal)}
//                   </div>
//                 </div>
//               </div>
//             </td>
//             </tr>
//           );
//         }
//       )}

//       {/* Special Instructions */}
//       {expanded && product.specialInstructions && (
//         <tr className="bg-amber-50/30 border-b border-gray-200">
//           <td className="px-2 sm:px-6 py-2 sm:py-3" colSpan={2}></td>
//           <td className="px-2 sm:px-6 py-2 sm:py-3" colSpan={4}>
//             <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-200">
//               <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 mt-0.5 flex-shrink-0" />
//               <div>
//                 <span className="text-[10px] sm:text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-0.5 sm:mb-1">
//                   Special Instructions
//                 </span>
//                 <p className="text-xs sm:text-sm text-amber-700">{product.specialInstructions}</p>
//               </div>
//             </div>
//           </td>
//         </tr>
//       )}
//     </React.Fragment>
//   );
// };

// Banking Terms Component
const BankingTermsSection = ({ bankingTerms }) => {
  if (!bankingTerms || bankingTerms.length === 0) return null;
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
          <FileTextIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          Banking Terms
        </h2>
      </div>
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {bankingTerms.map((term, idx) => (
          <div key={idx} className="border-b border-gray-100 last:border-0 pb-2 sm:pb-3 last:pb-0">
            {term.title && (
              <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">
                {term.title}
              </h3>
            )}
            {term.value && (
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                {term.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AdminInvoiceViewPage() {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [overdueDays, setOverdueDays] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get('invoiceId');

  useEffect(() => {
    if (!invoiceId) {
      setError('No invoice ID provided');
      setLoading(false);
      return;
    }

    fetchInvoice();
  }, [invoiceId]);

  const fetchInvoice = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setInvoice(data.data);
        const expired = isInvoiceExpired(data.data);
        setIsExpired(expired);
        if (expired) {
          const days = getOverdueDays(data.data.dueDate);
          setOverdueDays(days);
        }
      } else {
        setError(data.error || 'Failed to load invoice');
      }
    } catch (error) {
      setError('Failed to load invoice');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const updateData = { paymentStatus: newStatus };
      
      if (newStatus === 'paid') {
        updateData.amountPaid = invoice.finalTotal;
        updateData.dueAmount = 0;
      } else if (newStatus === 'cancelled') {
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
        fetchInvoice();
        setStatusDropdownOpen(false);
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
      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Invoice deleted successfully');
        router.push('/admin/invoices');
      } else {
        toast.error(data.error || 'Failed to delete invoice');
      }
    } catch (error) {
      toast.error('Failed to delete invoice');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleEdit = () => {
    router.push(`/admin/updateInvoice?invoiceId=${invoiceId}`);
  };

  const handleDownloadPDF = async () => {
    if (!invoice) return;
    setGeneratingPDF(true);
    try {
      toast.info('🖨️ Generating PDF invoice...');
      await generateInvoicePDF(invoice);
      toast.success('✅ PDF generated successfully!');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      toast.error('❌ Failed to generate PDF');
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleGoBack = () => {
    router.push('/admin/invoices');
  };

  const getStatusOptions = () => {
    if (!invoice) return [];
    if (invoice.paymentStatus === 'paid' || invoice.paymentStatus === 'cancelled') {
      return [];
    }
    switch (invoice.paymentStatus) {
      case 'partial':
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[#E39A65] mx-auto mb-3 sm:mb-4" />
          <p className="text-xs sm:text-sm text-gray-500">Loading invoice details...</p>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Invoice Not Found</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">{error || 'The invoice you are looking for does not exist.'}</p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors text-xs sm:text-sm"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to Invoices
          </button>
        </div>
      </div>
    );
  }

  const dueAmount = invoice.finalTotal - (invoice.amountPaid || 0);
  const statusOptions = getStatusOptions();

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-gray-900 transition-colors w-fit"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Back to Invoices</span>
          </button>
          
          <div className="flex flex-wrap items-center gap-2">
            {statusOptions.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                  disabled={updating}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
                >
                  {updating ? <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> : 'Change Status'}
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                
                {statusDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleStatusUpdate(option.value)}
                        className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <option.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleEdit}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
              Edit
            </button>
            
            <button
              onClick={handleDownloadPDF}
              disabled={generatingPDF}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {generatingPDF ? (
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
              ) : (
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              {generatingPDF ? 'Generating...' : 'PDF'}
            </button>
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Rest of your invoice display code remains the same... */}
        {/* Invoice Header Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 sm:mb-6">
          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center shadow-md">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-xl font-bold text-gray-900">{invoice.invoiceNumber}</h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-[10px] sm:text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      <span>Issued: {formatDate(invoice.invoiceDate)}</span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      <span className={isExpired ? 'text-red-600 font-medium' : ''}>
                        Due: {formatDate(invoice.dueDate)}
                      </span>
                    </div>
                    {invoice.inquiryNumber && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1">
                          <FileText className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                          <span className="truncate max-w-[120px] sm:max-w-none">Inquiry: {invoice.inquiryNumber}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <PaymentStatusBadge status={invoice.paymentStatus} />
            </div>
          </div>

          {isExpired && (
            <div className="px-3 sm:px-6 py-2 sm:py-3 bg-red-50 border-b border-red-200 flex items-center gap-1.5 sm:gap-2">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              <span className="text-[10px] sm:text-sm text-red-700">
                This invoice is {overdueDays} day{overdueDays !== 1 ? 's' : ''} overdue.
              </span>
            </div>
          )}

          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">From</h3>
              <div className="space-y-1.5 sm:space-y-2">
                {invoice.company?.logo && (
                  <div className="w-20 h-14 sm:w-28 sm:h-20 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden mb-2 sm:mb-3">
                    <img src={invoice.company.logo} alt={invoice.company.companyName} className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{invoice.company?.companyName || 'Asian Clothify'}</p>
                {invoice.company?.contactPerson && (
                  <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    {invoice.company.contactPerson}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2 break-all">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="break-words">{invoice.company?.email || 'info@asianclothify.com'}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  {invoice.company?.phone || '+8801305-785685'}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-1.5 sm:gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{invoice.company?.address || '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'}</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">To</h3>
              <div className="space-y-1.5 sm:space-y-2">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{invoice.customer?.companyName || 'N/A'}</p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  {invoice.customer?.contactPerson || 'N/A'}
                  <CopyButton text={invoice.customer?.contactPerson || ''} label="contact name" />
                </p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2 break-all">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="break-words">{invoice.customer?.email || 'N/A'}</span>
                  <CopyButton text={invoice.customer?.email || ''} label="email" />
                </p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  {invoice.customer?.phone || 'N/A'}
                  <CopyButton text={invoice.customer?.phone || ''} label="phone" />
                </p>
                
                {(invoice.customer?.billingAddress || invoice.customer?.billingCity) && (
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <p className="text-[10px] sm:text-xs font-medium text-gray-500 mb-1 sm:mb-2">Billing Address</p>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-1.5 sm:gap-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="break-words">
                        {[
                          invoice.customer.billingAddress,
                          invoice.customer.billingCity,
                          invoice.customer.billingZipCode,
                          invoice.customer.billingCountry
                        ].filter(Boolean).join(', ')}
                      </span>
                    </p>
                  </div>
                )}

                {invoice.customer?.shippingAddress && (
                  <div className="mt-2 sm:mt-3">
                    <p className="text-[10px] sm:text-xs font-medium text-gray-500 mb-1 sm:mb-2">Shipping Address</p>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-1.5 sm:gap-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="break-words">
                        {[
                          invoice.customer.shippingAddress,
                          invoice.customer.shippingCity,
                          invoice.customer.shippingZipCode,
                          invoice.customer.shippingCountry
                        ].filter(Boolean).join(', ')}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 sm:mb-6">
          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-lg font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#E39A65]" />
                Invoice Items
              </h2>
              <span className="text-[10px] sm:text-xs text-gray-500">
                {invoice.items?.length || 0} product(s)
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] sm:min-w-full">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200">
                  <th className="px-2 sm:px-6 py-2 sm:py-3 w-6 sm:w-12"></th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider" colSpan={2}>
                    Product Details
                  </th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoice.items?.map((product, index) => (
                  <ProductRow key={index} product={product} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Summary and Payment Details with Banking Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 items-start">
          {/* Left Column - Bank Details and Banking Terms */}
          <div className="space-y-4 sm:space-y-6">
            {/* Bank Details */}
            {invoice.bankDetails && Object.values(invoice.bankDetails).some(v => v) && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                    <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />
                    Bank Details
                  </h2>
                </div>
                <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                  {invoice.bankDetails.bankName && (
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                      <span className="text-gray-500">Bank Name:</span>
                      <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.bankName}</span>
                    </div>
                  )}
                  {invoice.bankDetails.accountName && (
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                      <span className="text-gray-500">Account Name:</span>
                      <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.accountName}</span>
                    </div>
                  )}
                  {invoice.bankDetails.accountNumber && (
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                      <span className="text-gray-500">Account Number:</span>
                      <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.accountNumber}</span>
                    </div>
                  )}
                  {invoice.bankDetails.accountType && (
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                      <span className="text-gray-500">Account Type:</span>
                      <span className="font-medium text-gray-900">{invoice.bankDetails.accountType}</span>
                    </div>
                  )}
                  {invoice.bankDetails.routingNumber && (
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                      <span className="text-gray-500">Routing Number:</span>
                      <span className="font-medium text-gray-900">{invoice.bankDetails.routingNumber}</span>
                    </div>
                  )}
                  {invoice.bankDetails.swiftCode && (
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                      <span className="text-gray-500">SWIFT Code:</span>
                      <span className="font-medium text-gray-900">{invoice.bankDetails.swiftCode}</span>
                    </div>
                  )}
                  {invoice.bankDetails.iban && (
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                      <span className="text-gray-500">IBAN:</span>
                      <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.iban}</span>
                    </div>
                  )}
                  {invoice.bankDetails.bankAddress && (
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                      <span className="text-gray-500">Bank Address:</span>
                      <span className="font-medium text-gray-900 break-words">{invoice.bankDetails.bankAddress}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Banking Terms */}
            <BankingTermsSection bankingTerms={invoice.bankingTerms} />
          </div>

          {/* Right Column - Invoice Summary */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                Invoice Summary
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Subtotal:</span>
                  <span className="font-medium text-gray-900">{formatPrice(invoice.subtotal)}</span>
                </div>
                
                {invoice.vatPercentage > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">VAT ({invoice.vatPercentage}%):</span>
                    <span className="font-medium text-gray-900">{formatPrice(invoice.vatAmount)}</span>
                  </div>
                )}
                
                {invoice.discountPercentage > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Discount ({invoice.discountPercentage}%):</span>
                    <span className="font-medium text-red-600">-{formatPrice(invoice.discountAmount)}</span>
                  </div>
                )}
                
                {invoice.shippingCost > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Shipping:</span>
                    <span className="font-medium text-gray-900">{formatPrice(invoice.shippingCost)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 my-2 sm:my-3 pt-2 sm:pt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900 text-sm sm:text-base">Total:</span>
                    <span className="text-[#E39A65] text-base sm:text-lg">{formatPrice(invoice.finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                  <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                  Payment Details
                </h3>
                
                <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      <span className="text-xs sm:text-sm font-medium text-green-700">Paid</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-green-700">
                      {formatPrice(invoice.amountPaid || 0)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] sm:text-xs">
                      <span className="text-green-600">Percentage</span>
                      <span className="font-medium text-green-700">
                        {invoice.finalTotal > 0 ? ((invoice.amountPaid / invoice.finalTotal) * 100).toFixed(1) : '0'}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-green-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${invoice.finalTotal > 0 ? Math.min((invoice.amountPaid / invoice.finalTotal) * 100, 100) : 0}%` }} />
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-2 sm:p-3 rounded-lg border border-red-200">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                      <span className="text-xs sm:text-sm font-medium text-red-700">Unpaid</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-red-700">{formatPrice(dueAmount)}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] sm:text-xs">
                      <span className="text-red-600">Percentage</span>
                      <span className="font-medium text-red-700">
                        {invoice.finalTotal > 0 ? ((dueAmount / invoice.finalTotal) * 100).toFixed(1) : '0'}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full transition-all duration-300" style={{ width: `${invoice.finalTotal > 0 ? Math.max(Math.min((dueAmount / invoice.finalTotal) * 100, 100), 0) : 0}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-[10px] sm:text-sm pt-1 sm:pt-2 border-t border-gray-200">
                  <span className="text-gray-500">Payment Status:</span>
                  <PaymentStatusBadge status={invoice.paymentStatus} />
                </div>
                
                <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs mt-1 sm:mt-2">
                  <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                    <p className="text-gray-500">Paid Amount</p>
                    <p className="font-semibold text-green-600 text-xs sm:text-sm">{formatPrice(invoice.amountPaid || 0)}</p>
                    <p className="text-[8px] sm:text-[10px] text-gray-400 mt-0.5">
                      {invoice.finalTotal > 0 ? ((invoice.amountPaid / invoice.finalTotal) * 100).toFixed(1) : '0'}% of total
                    </p>
                  </div>
                  <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                    <p className="text-gray-500">Unpaid Amount</p>
                    <p className="font-semibold text-red-500 text-xs sm:text-sm">{formatPrice(dueAmount)}</p>
                    <p className="text-[8px] sm:text-[10px] text-gray-400 mt-0.5">
                      {invoice.finalTotal > 0 ? ((dueAmount / invoice.finalTotal) * 100).toFixed(1) : '0'}% of total
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-xs">
                <div>
                  <p className="text-gray-500">Invoice Date</p>
                  <p className="font-medium text-gray-900 text-xs sm:text-sm">{formatDate(invoice.invoiceDate)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Due Date</p>
                  <p className={`font-medium text-xs sm:text-sm ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                    {formatDate(invoice.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(invoice.notes || invoice.terms) && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 sm:mb-6">
            <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">Additional Information</h2>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {invoice.notes && (
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Notes</h3>
                  <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg break-words">{invoice.notes}</p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Terms & Conditions</h3>
                  <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg break-words">{invoice.terms}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {invoice.customFields && invoice.customFields.length > 0 && (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 sm:mb-6">
    
    <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
      <h2 className="text-sm sm:text-base font-semibold text-gray-900">
        Additional Fields
      </h2>
    </div>

    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
      {invoice.customFields.map((field, idx) => (
        <div
          key={idx}
          className="flex justify-between items-start border-b border-gray-100 pb-2"
        >
          {/* Left: Title */}
          <p className="text-xs sm:text-sm text-gray-500">
            {field.fieldName}
          </p>

          {/* Right: Value */}
          <p className="text-xs sm:text-sm font-medium text-gray-900 text-right max-w-[60%] break-words">
            {field.fieldValue}
          </p>
        </div>
      ))}
    </div>

  </div>
)}

        {/* Footer Note */}
        <div className="text-center text-[10px] sm:text-xs text-gray-400 mt-6 sm:mt-8 mb-4">
          Invoice generated by {typeof invoice.createdBy === 'object' ? invoice.createdBy?.contactPerson || invoice.createdBy?.email || 'Admin' : invoice.createdBy || 'Admin'} on {formatDate(invoice.createdAt)}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 text-rose-600 mb-3 sm:mb-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">Delete Invoice</h3>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Are you sure you want to delete invoice <span className="font-semibold">"{invoice?.invoiceNumber}"</span>?
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-4 sm:mb-6">
                This action cannot be undone. All data associated with this invoice will be permanently removed.
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