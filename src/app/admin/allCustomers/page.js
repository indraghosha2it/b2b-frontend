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
  DollarSign
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
  const [countries, setCountries] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);

  const customersPerPage = 10;

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

      const response = await fetch(`http://localhost:5000/api/admin/customers?${params}`, {
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
      
      const response = await fetch(`http://localhost:5000/api/admin/customers/${deleteModal.customerId}`, {
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
                    Business Type
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
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3" />
                          {customer.businessType || 'N/A'}
                        </div>
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
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getBusinessTypeBadge(customer.businessType)}`}>
                          {customer.businessType || 'Other'}
                        </span>
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
              {/* Modal Header */}
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

              {/* Modal Content */}
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">
                  Are you sure you want to delete <span className="font-semibold">{deleteModal.customerName}</span>? 
                  This will permanently remove all customer data.
                </p>

                {/* Warning */}
                <div className="mb-4 p-2 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-800 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>This action cannot be undone. All customer history will be lost.</span>
                  </p>
                </div>

                {/* Actions */}
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
          <div className="fixed inset-0 bg-black/40  backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-2xl w-full shadow-xl overflow-hidden"
            >
              {/* Modal Header */}
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

              {/* Modal Content */}
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
                        {/* <div>
                          <p className="text-xs text-gray-500">Email Verified</p>
                          <p className="text-sm">
                            {viewModal.customer.emailVerified ? (
                              <span className="text-green-600">Yes</span>
                            ) : (
                              <span className="text-red-600">No</span>
                            )}
                          </p>
                        </div> */}
                        <div>
                          <p className="text-xs text-gray-500">Timezone</p>
                          <p className="text-sm text-gray-900">{viewModal.customer.timezone || 'UTC'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
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
      </div>
    </div>
  );
}