// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import { 
//   Search, 
//   Users, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Building, 
//   Globe,
//   Trash2,
//   MoreVertical,
//   ChevronLeft,
//   ChevronRight,
//   RefreshCw,
//   AlertTriangle,
//   X,
//   UserX,
//   Eye,
//   Calendar,
//   ShoppingBag,
//   DollarSign
// } from 'lucide-react';

// export default function AllCustomers() {
//   const router = useRouter();
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState('all');
//   const [selectedBusinessType, setSelectedBusinessType] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [deleteModal, setDeleteModal] = useState({ isOpen: false, customerId: null, customerName: '' });
//   const [viewModal, setViewModal] = useState({ isOpen: false, customer: null });
//   const [countries, setCountries] = useState([]);
//   const [businessTypes, setBusinessTypes] = useState([]);

//   const customersPerPage = 10;

//   // Fetch customers on component mount
//   useEffect(() => {
//     fetchCustomers();
//   }, [currentPage, searchTerm, selectedCountry, selectedBusinessType]);

//   const fetchCustomers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       // Build query params
//       const params = new URLSearchParams({
//         page: currentPage,
//         limit: customersPerPage,
//         role: 'customer',
//         search: searchTerm,
//         country: selectedCountry !== 'all' ? selectedCountry : '',
//         businessType: selectedBusinessType !== 'all' ? selectedBusinessType : ''
//       });

//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/admin/customers?${params}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setCustomers(data.customers);
//         setTotalPages(data.totalPages);
        
//         // Extract unique countries and business types for filters
//         if (data.customers.length > 0) {
//           const uniqueCountries = [...new Set(data.customers.map(c => c.country).filter(Boolean))];
//           const uniqueBusinessTypes = [...new Set(data.customers.map(c => c.businessType).filter(Boolean))];
//           setCountries(uniqueCountries);
//           setBusinessTypes(uniqueBusinessTypes);
//         }
//       } else {
//         toast.error('Failed to fetch customers', {
//           description: data.error || 'Something went wrong'
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete customer
//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/admin/customers/${deleteModal.customerId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Customer Deleted', {
//           description: `${deleteModal.customerName} has been removed successfully`
//         });
//         fetchCustomers(); // Refresh the list
//         setDeleteModal({ isOpen: false, customerId: null, customerName: '' });
//       } else {
//         toast.error('Delete Failed', {
//           description: data.error || 'Something went wrong'
//         });
//       }
//     } catch (error) {
//       console.error('Error deleting customer:', error);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric'
//     });
//   };

//   // Get business type badge color
//   const getBusinessTypeBadge = (type) => {
//     switch(type) {
//       case 'Retailer':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'Wholesaler':
//         return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'Distributor':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'Manufacturer':
//         return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'E-commerce':
//         return 'bg-indigo-100 text-indigo-800 border-indigo-200';
//       case 'Boutique':
//         return 'bg-pink-100 text-pink-800 border-pink-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
//       <div className="container mx-auto px-4 max-w-7xl pt-6 pb-8">
//         {/* Header */}
//         <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <Users className="w-6 h-6" style={{ color: '#E39A65' }} />
//               All Customers
//             </h1>
//             <p className="text-sm text-gray-600 mt-1">
//               View and manage all customer accounts
//             </p>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <span className="text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
//               Total: <span className="font-semibold" style={{ color: '#E39A65' }}>{customers.length}</span>
//             </span>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
//           <div className="md:col-span-2 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name, email, phone, company..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
//             />
//           </div>
          
//           <select
//             value={selectedCountry}
//             onChange={(e) => setSelectedCountry(e.target.value)}
//             className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] bg-white text-sm"
//           >
//             <option value="all">All Countries</option>
//             {countries.map(country => (
//               <option key={country} value={country}>{country}</option>
//             ))}
//           </select>

//           <select
//             value={selectedBusinessType}
//             onChange={(e) => setSelectedBusinessType(e.target.value)}
//             className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] bg-white text-sm"
//           >
//             <option value="all">All Business Types</option>
//             {businessTypes.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>

//         {/* Customers Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Customer
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Company
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Location
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Business Type
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Joined
//                   </th>
//                   <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="px-4 py-12 text-center">
//                       <div className="flex justify-center items-center gap-2">
//                         <RefreshCw className="w-5 h-5 animate-spin" style={{ color: '#E39A65' }} />
//                         <span className="text-gray-500">Loading customers...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : customers.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="px-4 py-12 text-center">
//                       <div className="text-gray-500">
//                         <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                         <p className="text-lg font-medium">No customers found</p>
//                         <p className="text-sm mt-1">Try adjusting your search or filters</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   customers.map((customer) => (
//                     <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E39A65] to-[#f5b485] flex items-center justify-center text-white font-semibold text-sm">
//                             {customer.contactPerson?.charAt(0) || customer.companyName?.charAt(0)}
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900 text-sm">
//                               {customer.contactPerson}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               ID: {customer._id.slice(-6)}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="text-sm font-medium text-gray-900">{customer.companyName}</div>
//                         <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                           <Building className="w-3 h-3" />
//                           {customer.businessType || 'N/A'}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-1.5 text-xs text-gray-600">
//                             <Mail className="w-3 h-3" />
//                             <span className="truncate max-w-[120px]">{customer.email}</span>
//                           </div>
//                           <div className="flex items-center gap-1.5 text-xs text-gray-600">
//                             <Phone className="w-3 h-3" />
//                             <span>{customer.phone}</span>
//                           </div>
//                           {customer.whatsapp && (
//                             <div className="flex items-center gap-1.5 text-xs text-green-600">
//                               <span className="w-1 h-1 bg-green-500 rounded-full"></span>
//                               <span>WhatsApp</span>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-1.5 text-xs text-gray-600">
//                             <Globe className="w-3 h-3" />
//                             <span>{customer.country}</span>
//                           </div>
//                           <div className="flex items-center gap-1.5 text-xs text-gray-600">
//                             <MapPin className="w-3 h-3" />
//                             <span>{customer.city}</span>
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {customer.zipCode}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getBusinessTypeBadge(customer.businessType)}`}>
//                           {customer.businessType || 'Other'}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-1.5 text-xs text-gray-600">
//                           <Calendar className="w-3 h-3" />
//                           <span>{formatDate(customer.createdAt)}</span>
//                         </div>
                    
//                       </td>
//                       <td className="px-4 py-3 text-right">
//                         <div className="flex items-center justify-end gap-1">
//                           <button
//                             onClick={() => setViewModal({ isOpen: true, customer })}
//                             className="p-1.5 text-gray-600 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
//                             title="View details"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => setDeleteModal({ 
//                               isOpen: true, 
//                               customerId: customer._id, 
//                               customerName: customer.companyName || customer.contactPerson 
//                             })}
//                             className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             title="Delete customer"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
                       
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {!loading && customers.length > 0 && (
//             <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
//               <p className="text-xs text-gray-600">
//                 Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
//               </p>
//               <div className="flex items-center gap-1">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium">
//                   {currentPage}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Delete Confirmation Modal */}
//         {deleteModal.isOpen && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden"
//             >
//               {/* Modal Header */}
//               <div className="px-4 py-3 bg-red-50 border-b border-red-100 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
//                     <AlertTriangle className="w-4 h-4 text-red-600" />
//                   </div>
//                   <h3 className="text-sm font-semibold text-gray-900">Delete Customer</h3>
//                 </div>
//                 <button
//                   onClick={() => setDeleteModal({ isOpen: false, customerId: null, customerName: '' })}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Modal Content */}
//               <div className="p-4">
//                 <p className="text-sm text-gray-600 mb-3">
//                   Are you sure you want to delete <span className="font-semibold">{deleteModal.customerName}</span>? 
//                   This will permanently remove all customer data.
//                 </p>

//                 {/* Warning */}
//                 <div className="mb-4 p-2 bg-amber-50 rounded-lg border border-amber-200">
//                   <p className="text-xs text-amber-800 flex items-start gap-1.5">
//                     <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
//                     <span>This action cannot be undone. All customer history will be lost.</span>
//                   </p>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setDeleteModal({ isOpen: false, customerId: null, customerName: '' })}
//                     className="flex-1 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium flex items-center justify-center gap-1.5"
//                   >
//                     <UserX className="w-3.5 h-3.5" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* View Customer Details Modal */}
//         {viewModal.isOpen && viewModal.customer && (
//           <div className="fixed inset-0 bg-black/40  backdrop-blur-xs flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-2xl w-full shadow-xl overflow-hidden"
//             >
//               {/* Modal Header */}
//               <div className="px-5 py-3 bg-gradient-to-r from-[#E39A65] to-[#f5b485] flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
//                     <Eye className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="text-base font-semibold text-white">Customer Details</h3>
//                 </div>
//                 <button
//                   onClick={() => setViewModal({ isOpen: false, customer: null })}
//                   className="text-white/80 hover:text-white"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Modal Content */}
//               <div className="p-5 max-h-[70vh] overflow-y-auto">
//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Basic Information */}
//                   <div className="col-span-2">
//                     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Basic Information</h4>
//                     <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <p className="text-xs text-gray-500">Company Name</p>
//                           <p className="text-sm font-medium text-gray-900">{viewModal.customer.companyName}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">Contact Person</p>
//                           <p className="text-sm font-medium text-gray-900">{viewModal.customer.contactPerson}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">Business Type</p>
//                           <p className="text-sm">
//                             <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${getBusinessTypeBadge(viewModal.customer.businessType)}`}>
//                               {viewModal.customer.businessType || 'Other'}
//                             </span>
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">Status</p>
//                           <p className="text-sm">
//                             {viewModal.customer.isActive ? (
//                               <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs border border-green-200">
//                                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                                 Active
//                               </span>
//                             ) : (
//                               <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs border border-red-200">
//                                 <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
//                                 Inactive
//                               </span>
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div className="col-span-2 md:col-span-1">
//                     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Contact Information</h4>
//                     <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-2">
//                       <div className="flex items-center gap-2">
//                         <Mail className="w-4 h-4 text-gray-400" />
//                         <div>
//                           <p className="text-xs text-gray-500">Email</p>
//                           <p className="text-sm text-gray-900">{viewModal.customer.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone className="w-4 h-4 text-gray-400" />
//                         <div>
//                           <p className="text-xs text-gray-500">Phone</p>
//                           <p className="text-sm text-gray-900">{viewModal.customer.phone}</p>
//                         </div>
//                       </div>
//                       {viewModal.customer.whatsapp && (
//                         <div className="flex items-center gap-2">
//                           <span className="w-4 h-4 text-green-500">💬</span>
//                           <div>
//                             <p className="text-xs text-gray-500">WhatsApp</p>
//                             <p className="text-sm text-gray-900">{viewModal.customer.whatsapp}</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Address Information */}
//                   <div className="col-span-2 md:col-span-1">
//                     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Address</h4>
//                     <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-2">
//                       <div className="flex items-start gap-2">
//                         <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
//                         <div>
//                           <p className="text-xs text-gray-500">Address</p>
//                           <p className="text-sm text-gray-900">{viewModal.customer.address}</p>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-3 gap-2 pl-6">
//                         <div>
//                           <p className="text-xs text-gray-500">City</p>
//                           <p className="text-sm text-gray-900">{viewModal.customer.city}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">Country</p>
//                           <p className="text-sm text-gray-900">{viewModal.customer.country}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">ZIP</p>
//                           <p className="text-sm text-gray-900">{viewModal.customer.zipCode}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Account Information */}
//                   <div className="col-span-2">
//                     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account Information</h4>
//                     <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                       <div className="grid grid-cols-3 gap-3">
//                         <div>
//                           <p className="text-xs text-gray-500">Joined Date</p>
//                           <p className="text-sm text-gray-900 flex items-center gap-1">
//                             <Calendar className="w-3.5 h-3.5 text-gray-400" />
//                             {formatDate(viewModal.customer.createdAt)}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">Last Login</p>
//                           <p className="text-sm text-gray-900">
//                             {viewModal.customer.lastLogin ? formatDate(viewModal.customer.lastLogin) : 'Never'}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">Login Count</p>
//                           <p className="text-sm text-gray-900">{viewModal.customer.loginCount || 0}</p>
//                         </div>
//                         {/* <div>
//                           <p className="text-xs text-gray-500">Email Verified</p>
//                           <p className="text-sm">
//                             {viewModal.customer.emailVerified ? (
//                               <span className="text-green-600">Yes</span>
//                             ) : (
//                               <span className="text-red-600">No</span>
//                             )}
//                           </p>
//                         </div> */}
//                         <div>
//                           <p className="text-xs text-gray-500">Timezone</p>
//                           <p className="text-sm text-gray-900">{viewModal.customer.timezone || 'UTC'}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="px-5 py-3 border-t border-gray-200 flex justify-end">
//                 <button
//                   onClick={() => setViewModal({ isOpen: false, customer: null })}
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Search, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Globe,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  X,
  UserX,
  Eye,
  Calendar,
  ShoppingBag,
  DollarSign,
  UserPlus,
  CheckCircle
} from 'lucide-react';

export default function AllCustomers() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedBusinessType, setSelectedBusinessType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, customerId: null, customerName: '' });
  const [viewModal, setViewModal] = useState({ isOpen: false, customer: null });
  const [createModal, setCreateModal] = useState({ isOpen: false });
  const [countries, setCountries] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const customersPerPage = 10;

  // Form data for creating customer
  const [createForm, setCreateForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    businessType: 'Retailer'
  });

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, [currentPage, searchTerm, selectedCountry, selectedBusinessType]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Build query params
      const params = new URLSearchParams({
        page: currentPage,
        limit: customersPerPage,
        role: 'customer',
        search: searchTerm,
        country: selectedCountry !== 'all' ? selectedCountry : '',
        businessType: selectedBusinessType !== 'all' ? selectedBusinessType : ''
      });

      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/admin/customers?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setCustomers(data.customers);
        setTotalPages(data.totalPages);
        
        // Extract unique countries and business types for filters
        if (data.customers.length > 0) {
          const uniqueCountries = [...new Set(data.customers.map(c => c.country).filter(Boolean))];
          const uniqueBusinessTypes = [...new Set(data.customers.map(c => c.businessType).filter(Boolean))];
          setCountries(uniqueCountries);
          setBusinessTypes(uniqueBusinessTypes);
        }
      } else {
        toast.error('Failed to fetch customers', {
          description: data.error || 'Something went wrong'
        });
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Connection Error', {
        description: 'Unable to connect to server'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle delete customer
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://b2b-backend-rosy.vercel.app/api/admin/customers/${deleteModal.customerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Customer Deleted', {
          description: `${deleteModal.customerName} has been removed successfully`
        });
        fetchCustomers(); // Refresh the list
        setDeleteModal({ isOpen: false, customerId: null, customerName: '' });
      } else {
        toast.error('Delete Failed', {
          description: data.error || 'Something went wrong'
        });
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Connection Error', {
        description: 'Unable to connect to server'
      });
    }
  };

  // Handle create customer form changes
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle create customer submission
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (createForm.password !== createForm.confirmPassword) {
      toast.error('Password Mismatch', {
        description: 'The passwords you entered do not match.'
      });
      return;
    }

    // Validate password strength
    if (createForm.password.length < 8) {
      toast.error('Weak Password', {
        description: 'Password must be at least 8 characters long.'
      });
      return;
    }

    // Validate required fields
    const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'country', 'address', 'city', 'zipCode'];
    const missingFields = requiredFields.filter(field => !createForm[field]);
    
    if (missingFields.length > 0) {
      toast.error('Missing Fields', {
        description: `Please fill in: ${missingFields.join(', ')}`
      });
      return;
    }

    setIsCreating(true);
    
    const loadingToast = toast.loading('Creating customer account...');

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          companyName: createForm.companyName,
          contactPerson: createForm.contactPerson,
          email: createForm.email,
          phone: createForm.phone,
          whatsapp: createForm.whatsapp || '',
          country: createForm.country,
          address: createForm.address,
          city: createForm.city,
          zipCode: createForm.zipCode,
          password: createForm.password,
          businessType: createForm.businessType,
          role: 'customer'
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success('Customer Created Successfully!', {
          description: `Customer account for ${createForm.contactPerson} has been created.`,
          duration: 5000,
        });

        // Reset form and close modal
        setCreateForm({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          whatsapp: '',
          country: '',
          address: '',
          city: '',
          zipCode: '',
          password: '',
          confirmPassword: '',
          businessType: 'Retailer'
        });
        setCreateModal({ isOpen: false });
        
        // Refresh customer list
        fetchCustomers();
      } else {
        toast.error('Creation Failed', {
          description: data.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please check your internet connection.'
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Get business type badge color
  const getBusinessTypeBadge = (type) => {
    switch(type) {
      case 'Retailer':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Wholesaler':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Distributor':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Manufacturer':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'E-commerce':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Boutique':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="container mx-auto px-4 max-w-7xl pt-6 pb-8">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6" style={{ color: '#E39A65' }} />
              All Customers
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              View and manage all customer accounts
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreateModal({ isOpen: true })}
              className="flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              Add Customer
            </button>
            <span className="text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
              Total: <span className="font-semibold" style={{ color: '#E39A65' }}>{customers.length}</span>
            </span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
            />
          </div>
          
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] bg-white text-sm"
          >
            <option value="all">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <select
            value={selectedBusinessType}
            onChange={(e) => setSelectedBusinessType(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] bg-white text-sm"
          >
            <option value="all">All Business Types</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-12 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" style={{ color: '#E39A65' }} />
                        <span className="text-gray-500">Loading customers...</span>
                      </div>
                    </td>
                  </tr>
                ) : customers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-12 text-center">
                      <div className="text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-lg font-medium">No customers found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E39A65] to-[#f5b485] flex items-center justify-center text-white font-semibold text-sm">
                            {customer.contactPerson?.charAt(0) || customer.companyName?.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {customer.contactPerson}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {customer._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{customer.companyName}</div>
                       
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-[120px]">{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{customer.phone}</span>
                          </div>
                          {customer.whatsapp && (
                            <div className="flex items-center gap-1.5 text-xs text-green-600">
                              <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                              <span>WhatsApp</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Globe className="w-3 h-3" />
                            <span>{customer.country}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{customer.city}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {customer.zipCode}
                          </div>
                        </div>
                      </td>
                   
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(customer.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewModal({ isOpen: true, customer })}
                            className="p-1.5 text-gray-600 hover:text-[#E39A65] hover:bg-orange-50 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteModal({ 
                              isOpen: true, 
                              customerId: customer._id, 
                              customerName: customer.companyName || customer.contactPerson 
                            })}
                            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete customer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && customers.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <p className="text-xs text-gray-600">
                Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden"
            >
              <div className="px-4 py-3 bg-red-50 border-b border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">Delete Customer</h3>
                </div>
                <button
                  onClick={() => setDeleteModal({ isOpen: false, customerId: null, customerName: '' })}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">
                  Are you sure you want to delete <span className="font-semibold">{deleteModal.customerName}</span>? 
                  This will permanently remove all customer data.
                </p>

                <div className="mb-4 p-2 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-800 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>This action cannot be undone. All customer history will be lost.</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDeleteModal({ isOpen: false, customerId: null, customerName: '' })}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium flex items-center justify-center gap-1.5"
                  >
                    <UserX className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* View Customer Details Modal */}
        {viewModal.isOpen && viewModal.customer && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-2xl w-full shadow-xl overflow-hidden"
            >
              <div className="px-5 py-3 bg-gradient-to-r from-[#E39A65] to-[#f5b485] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Customer Details</h3>
                </div>
                <button
                  onClick={() => setViewModal({ isOpen: false, customer: null })}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  {/* Basic Information */}
                  <div className="col-span-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Basic Information</h4>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Company Name</p>
                          <p className="text-sm font-medium text-gray-900">{viewModal.customer.companyName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Contact Person</p>
                          <p className="text-sm font-medium text-gray-900">{viewModal.customer.contactPerson}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Business Type</p>
                          <p className="text-sm">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${getBusinessTypeBadge(viewModal.customer.businessType)}`}>
                              {viewModal.customer.businessType || 'Other'}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <p className="text-sm">
                            {viewModal.customer.isActive ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs border border-green-200">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs border border-red-200">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                Inactive
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="col-span-2 md:col-span-1">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Contact Information</h4>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm text-gray-900">{viewModal.customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm text-gray-900">{viewModal.customer.phone}</p>
                        </div>
                      </div>
                      {viewModal.customer.whatsapp && (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 text-green-500">💬</span>
                          <div>
                            <p className="text-xs text-gray-500">WhatsApp</p>
                            <p className="text-sm text-gray-900">{viewModal.customer.whatsapp}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="col-span-2 md:col-span-1">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Address</h4>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm text-gray-900">{viewModal.customer.address}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pl-6">
                        <div>
                          <p className="text-xs text-gray-500">City</p>
                          <p className="text-sm text-gray-900">{viewModal.customer.city}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Country</p>
                          <p className="text-sm text-gray-900">{viewModal.customer.country}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">ZIP</p>
                          <p className="text-sm text-gray-900">{viewModal.customer.zipCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="col-span-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account Information</h4>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Joined Date</p>
                          <p className="text-sm text-gray-900 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {formatDate(viewModal.customer.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Login</p>
                          <p className="text-sm text-gray-900">
                            {viewModal.customer.lastLogin ? formatDate(viewModal.customer.lastLogin) : 'Never'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Login Count</p>
                          <p className="text-sm text-gray-900">{viewModal.customer.loginCount || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Timezone</p>
                          <p className="text-sm text-gray-900">{viewModal.customer.timezone || 'UTC'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setViewModal({ isOpen: false, customer: null })}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Create Customer Modal */}
        {createModal.isOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-3xl w-full shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-5 py-3 bg-gradient-to-r from-[#E39A65] to-[#f5b485] flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Create New Customer</h3>
                </div>
                <button
                  onClick={() => setCreateModal({ isOpen: false })}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-5">
                <form onSubmit={handleCreateCustomer}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company Name */}
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={createForm.companyName}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
                        placeholder="Enter company name"
                      />
                    </div>

                    {/* Contact Person */}
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={createForm.contactPerson}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
                        placeholder="Full name"
                      />
                    </div>

                    {/* Email */}
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={createForm.email}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
                        placeholder="customer@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={createForm.phone}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={createForm.whatsapp}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    {/* Country */}
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={createForm.country}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
                        placeholder="Country"
                      />
                    </div>

                    {/* City */}
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={createForm.city}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
                        placeholder="City"
                      />
                    </div>

                    {/* Address */}
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={createForm.address}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
                        placeholder="Street address"
                      />
                    </div>

                    {/* Zip Code */}
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={createForm.zipCode}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65]"
                        placeholder="ZIP code"
                      />
                    </div>

               

                    {/* Password */}
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={createForm.password}
                          onChange={handleCreateChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] pr-10"
                          placeholder="Min. 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E39A65]"
                        >
                          {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={createForm.confirmPassword}
                          onChange={handleCreateChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] pr-10"
                          placeholder="Re-enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E39A65]"
                        >
                          {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Info Banner */}
                  {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-blue-800">Account Information</p>
                        <p className="text-xs text-blue-600 mt-0.5">
                          Customer will receive a welcome email with their login credentials. 
                          They can login immediately with the provided email and password.
                        </p>
                      </div>
                    </div>
                  </div> */}

                  {/* Modal Footer */}
                  <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setCreateModal({ isOpen: false })}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="px-4 py-2 bg-[#E39A65] text-white rounded-lg text-sm font-medium hover:bg-[#d48b54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isCreating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Create Customer
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}