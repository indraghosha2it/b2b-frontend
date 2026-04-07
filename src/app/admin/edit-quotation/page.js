'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  FileText,
  Package,
  Users,
  DollarSign,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit,
  Eye,
  MessageCircle,
  Send,
  MinusCircle,
  Ban,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

export default function EditQuotationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inquiryId = searchParams.get('id');
  
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [globalNote, setGlobalNote] = useState(''); // Customer instructions (read-only)
  const [adminNote, setAdminNote] = useState(''); // Internal admin note (editable)
  const [editedItems, setEditedItems] = useState([]);
  
  // Fetch inquiry data
  useEffect(() => {
    if (inquiryId) {
      fetchInquiry();
    } else {
      toast.error('No inquiry ID provided');
      router.push('/admin/inquiries');
    }
  }, [inquiryId]);
  
 const fetchInquiry = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiryId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (data.success) {
      setInquiry(data.data);
      // Initialize edited items with current data
      const itemsCopy = JSON.parse(JSON.stringify(data.data.items));
      // Initialize product and color availability
      itemsCopy.forEach(product => {
        // Set product availability (default to true if not set)
        if (product.isAvailable === undefined) {
          product.isAvailable = true;
        }
        product.colors.forEach(color => {
          // Set color availability (default to true if not set)
          if (color.isAvailable === undefined) {
            color.isAvailable = true;
          }
          // Initialize size isAvailable (default to true if not set)
          color.sizeQuantities.forEach(sq => {
            if (sq.isAvailable === undefined) {
              sq.isAvailable = true;
            }
          });
        });
      });
      setEditedItems(itemsCopy);
      setGlobalNote(data.data.specialInstructions || '');
      setAdminNote(data.data.adminNote || '');
    } else {
      toast.error('Failed to load inquiry');
      router.push('/admin/inquiries');
    }
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    toast.error('Failed to load inquiry');
  } finally {
    setLoading(false);
  }
};
  
 
  // Toggle entire product availability (without changing quantities)
  const toggleProductAvailability = (productIndex) => {
    const newItems = [...editedItems];
    const product = newItems[productIndex];
    product.isAvailable = !product.isAvailable;
    
    // DON'T change any quantities, just update totals based on availability
    if (product.isAvailable) {
      // If becoming available, recalculate totals from existing quantities
      product.totalQuantity = product.colors.reduce((sum, c) => {
        if (c.isAvailable === false) return sum;
        const colorTotal = c.sizeQuantities.reduce((s, sq) => {
          if (c.sizeAvailability && c.sizeAvailability[sq.size] === false) return s;
          return s + sq.quantity;
        }, 0);
        c.totalForColor = colorTotal;
        c.totalQuantity = colorTotal;
        return sum + colorTotal;
      }, 0);
    } else {
      // If becoming unavailable, set total to 0 but keep all quantities unchanged
      product.totalQuantity = 0;
      // Keep colors as they are - don't modify them
    }
    
    setEditedItems(newItems);
  };
  // Update color quantity
const updateColorQuantity = (productIndex, colorIndex, size, newQuantity) => {
  const newItems = [...editedItems];
  const product = newItems[productIndex];
  const color = product.colors[colorIndex];
  
  // If product is unavailable, don't allow changes
  if (product.isAvailable === false) {
    toast.error('This product is marked as unavailable. Please make it available first.');
    return;
  }
  
  const sizeIndex = color.sizeQuantities.findIndex(sq => sq.size === size);
  
  if (sizeIndex !== -1) {
    color.sizeQuantities[sizeIndex].quantity = parseInt(newQuantity) || 0;
  }
  
  // Recalculate total for this color (only include available sizes)
  color.totalForColor = color.sizeQuantities.reduce((sum, sq) => {
    // Skip quantities from unavailable sizes in calculation
    if (sq.isAvailable === false) return sum;
    return sum + sq.quantity;
  }, 0);
  color.totalQuantity = color.totalForColor;
  
  // Recalculate total for this product
  product.totalQuantity = product.colors.reduce(
    (sum, c) => sum + c.totalForColor, 0
  );
  
  setEditedItems(newItems);
};
  
// Toggle size availability (without changing quantity)
const toggleSizeAvailability = (productIndex, colorIndex, size) => {
  const newItems = [...editedItems];
  const product = newItems[productIndex];
  const color = product.colors[colorIndex];
  
  // If product is unavailable, don't allow changes
  if (product.isAvailable === false) {
    toast.error('This product is marked as unavailable. Please make it available first.');
    return;
  }
  
  // Find the size in the sizeQuantities array
  const sizeIndex = color.sizeQuantities.findIndex(sq => sq.size === size);
  
  if (sizeIndex !== -1) {
    // Toggle the isAvailable flag directly on the size object
    color.sizeQuantities[sizeIndex].isAvailable = !color.sizeQuantities[sizeIndex].isAvailable;
  }
  
  // Recalculate total for this color (only include available sizes in calculation)
  color.totalForColor = color.sizeQuantities.reduce((sum, sq) => {
    // Skip quantities from unavailable sizes in calculation only
    if (sq.isAvailable === false) return sum;
    return sum + sq.quantity;
  }, 0);
  color.totalQuantity = color.totalForColor;
  
  // Recalculate total for this product
  product.totalQuantity = product.colors.reduce(
    (sum, c) => sum + c.totalForColor, 0
  );
  
  setEditedItems(newItems);
};


  
  // Update color unit price
  const updateColorUnitPrice = (productIndex, colorIndex, newPrice) => {
    const newItems = [...editedItems];
    const product = newItems[productIndex];
    
    if (product.isAvailable === false) {
      toast.error('This product is marked as unavailable. Please make it available first.');
      return;
    }
    
    newItems[productIndex].colors[colorIndex].unitPrice = parseFloat(newPrice) || 0;
    setEditedItems(newItems);
  };
  
  // Mark color as unavailable (without changing quantities)
  // Mark color as unavailable (without changing quantities)
const toggleColorAvailability = (productIndex, colorIndex) => {
  const newItems = [...editedItems];
  const product = newItems[productIndex];
  const color = product.colors[colorIndex];
  
  // If product is unavailable, don't allow changes
  if (product.isAvailable === false) {
    toast.error('This product is marked as unavailable. Please make it available first.');
    return;
  }
  
  // Just toggle the availability flag - DON'T change any quantities
  color.isAvailable = !color.isAvailable;
  
  // Update total calculation based on availability
  if (color.isAvailable) {
    // If becoming available, recalculate total from existing quantities (respecting size availability)
    color.totalForColor = color.sizeQuantities.reduce((sum, sq) => {
      if (sq.isAvailable === false) return sum;
      return sum + sq.quantity;
    }, 0);
    color.totalQuantity = color.totalForColor;
  } else {
    // If becoming unavailable, set total to 0 but keep quantities unchanged
    color.totalForColor = 0;
    color.totalQuantity = 0;
  }
  
  // Recalculate product total
  product.totalQuantity = product.colors.reduce((sum, c) => sum + c.totalForColor, 0);
  
  setEditedItems(newItems);
};
  
  // Calculate total after edits
  const calculateTotal = () => {
    return editedItems.reduce((total, product) => {
      // Skip if product is unavailable
      if (product.isAvailable === false) return total;
      
      const productTotal = product.colors.reduce((sum, color) => {
        if (color.isAvailable === false) return sum;
        const qty = color.totalForColor || 0;
        const price = color.unitPrice || 0;
        return sum + (qty * price);
      }, 0);
      return total + productTotal;
    }, 0);
  };
  
  // Calculate total quantity after edits
  const calculateTotalQuantity = () => {
    return editedItems.reduce((total, product) => {
      if (product.isAvailable === false) return total;
      return total + (product.totalQuantity || 0);
    }, 0);
  };
  
  // Submit quotation
// Submit quotation
const handleSubmitQuotation = async () => {
  setSaving(true);
  try {
    const token = localStorage.getItem('token');
    
    // Prepare data for saving - DON'T remove any fields
    const quotationData = {
      items: editedItems,  // Send as is - includes isAvailable on each size
      specialInstructions: globalNote,
      adminNote: adminNote,
      status: 'quoted',
      quotedAt: new Date().toISOString()
    };
    
    const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiryId}/quotation`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quotationData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      toast.success('Quotation submitted successfully!');
      router.push('/admin/inquiries');
    } else {
      toast.error(data.error || 'Failed to submit quotation');
    }
  } catch (error) {
    console.error('Error submitting quotation:', error);
    toast.error('Failed to submit quotation');
  } finally {
    setSaving(false);
  }
};
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E39A65]" />
      </div>
    );
  }
  
  if (!inquiry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Inquiry not found</h2>
          <Link href="/admin/inquiries" className="text-[#E39A65] mt-2 inline-block">
            Back to Inquiries
          </Link>
        </div>
      </div>
    );
  }
  
  const totalAmount = calculateTotal();
  const totalQuantity = calculateTotalQuantity();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <Link 
              href="/admin/inquiries" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#E39A65] mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Inquiries
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Review & Quote</h1>
            <p className="text-sm text-gray-500">
              Inquiry: {inquiry.inquiryNumber} • Customer: {inquiry.userDetails?.companyName}
            </p>
          </div>
          <button
            onClick={handleSubmitQuotation}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit Quotation
          </button>
        </div>
        
        {/* Customer Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Customer Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Company:</span>
              <p className="font-medium">{inquiry.userDetails?.companyName || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500">Contact:</span>
              <p className="font-medium">{inquiry.userDetails?.contactPerson || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500">Email:</span>
              <p className="font-medium">{inquiry.userDetails?.email || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500">Phone:</span>
              <p className="font-medium">{inquiry.userDetails?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        {/* Products Edit Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Products & Pricing</h2>
          
          {editedItems.map((product, productIndex) => {
            const isProductAvailable = product.isAvailable !== false;
            
            return (
              <div key={productIndex} className={`bg-white rounded-xl border overflow-hidden transition-all ${
                isProductAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50/10'
              }`}>
                {/* Product Header with Availability Toggle */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={product.productImage || 'https://via.placeholder.com/48'} 
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{product.productName}</h3>
                          {!isProductAvailable && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                              Product Unavailable
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          MOQ: {product.moq} pcs per color | Original Total: {product.totalQuantity} pcs
                        </p>
                      </div>
                    </div>
                    
                    {/* Product Availability Toggle Button */}
                    <button
                      onClick={() => toggleProductAvailability(productIndex)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        isProductAvailable 
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                          : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                      }`}
                    >
                      {isProductAvailable ? (
                        <>
                          <Ban className="w-3.5 h-3.5" />
                          Make Product Unavailable
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          Make Product Available
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Colors Section - Only show if product is available */}
                {isProductAvailable && (
                  <div className="p-4 space-y-4">
                    {product.colors.map((color, colorIndex) => {
                      const isColorAvailable = color.isAvailable !== false;
                      
                      return (
                        <div 
                          key={colorIndex} 
                          className={`border rounded-lg p-3 transition-all ${
                            isColorAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-5 h-5 rounded-full border shadow-sm"
                                style={{ backgroundColor: color.color.code }}
                              />
                              <span className="font-medium text-gray-800">
                                {color.color.name || color.color.code}
                              </span>
                              {!isColorAvailable && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                  Color Unavailable
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Unit Price Input */}
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">$</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={color.unitPrice || 0}
                                  onChange={(e) => updateColorUnitPrice(productIndex, colorIndex, e.target.value)}
                                  disabled={!isColorAvailable}
                                  className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] disabled:bg-gray-100"
                                />
                                <span className="text-xs text-gray-500">/pc</span>
                              </div>
                              
                              {/* Color Availability Toggle */}
                              <button
                                onClick={() => toggleColorAvailability(productIndex, colorIndex)}
                                className={`flex items-center gap-1 px-2 py-1 text-xs rounded-lg transition-colors ${
                                  isColorAvailable 
                                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                                }`}
                              >
                                {isColorAvailable ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {isColorAvailable ? 'Available' : 'Unavailable'}
                              </button>
                            </div>
                          </div>
                          
                        {/* Size Quantities Grid with Availability Toggle */}
{isColorAvailable && (
  <>
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {color.sizeQuantities.map((sq, sqIndex) => {
        const isSizeAvailable = sq.isAvailable !== false;
        
        return (
          <div key={sqIndex} className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <label className={`text-[10px] ${isSizeAvailable ? 'text-gray-500' : 'text-gray-400 line-through'}`}>
                {sq.size}
              </label>
              <button
                onClick={() => toggleSizeAvailability(productIndex, colorIndex, sq.size)}
                className={`text-[9px] flex items-center gap-0.5 px-1 py-0.5 rounded ${
                  isSizeAvailable 
                    ? 'text-green-600 hover:bg-green-50' 
                    : 'text-red-600 hover:bg-red-50'
                }`}
                title={isSizeAvailable ? 'Mark as unavailable' : 'Mark as available'}
              >
                {isSizeAvailable ? (
                  <CheckCircle className="w-2.5 h-2.5" />
                ) : (
                  <MinusCircle className="w-2.5 h-2.5" />
                )}
                <span className="text-[8px]">
                  {isSizeAvailable ? 'Available' : 'Unavailable'}
                </span>
              </button>
            </div>
            <input
              type="number"
              min="0"
              value={sq.quantity}
              onChange={(e) => updateColorQuantity(productIndex, colorIndex, sq.size, e.target.value)}
              disabled={!isSizeAvailable}
              className={`w-full px-2 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-[#E39A65] ${
                isSizeAvailable 
                  ? 'border-gray-200 bg-white' 
                  : 'border-red-200 bg-red-50 text-gray-400 line-through'
              }`}
              placeholder="0"
            />
            {!isSizeAvailable && (
              <p className="text-[8px] text-red-500 mt-0.5">Excluded from total</p>
            )}
          </div>
        );
      })}
    </div>
    
    {/* Color Summary */}
    <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between text-xs">
      <div>
        <span className="text-gray-500">Total for this color:</span>
        {!isColorAvailable && (
          <span className="ml-2 text-red-500 text-[9px]">(Color excluded from total)</span>
        )}
      </div>
      <span className="font-semibold text-[#E39A65]">
        {color.totalForColor} pcs × {formatPrice(color.unitPrice)} = {formatPrice(color.totalForColor * color.unitPrice)}
      </span>
    </div>
  </>
)}
                          
                          {!isColorAvailable && (
                            <p className="text-xs text-red-600 mt-2">
                              This color has been marked as unavailable. It will be excluded from the quotation.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Product Unavailable Message */}
                {!isProductAvailable && (
                  <div className="p-8 text-center">
                    <Ban className="w-12 h-12 text-red-400 mx-auto mb-2" />
                    <p className="text-sm text-red-600">
                      This product has been marked as unavailable and will be excluded from the quotation.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Click "Make Product Available" above to restore this product.
                    </p>
                  </div>
                )}
                
                {/* Product Summary - Only show if product is available */}
                {isProductAvailable && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm text-gray-600">Product Total:</span>
                    <span className="text-base font-bold text-[#E39A65]">
                      {formatPrice(product.colors.reduce((sum, color) => {
                        if (color.isAvailable === false) return sum;
                        return sum + ((color.totalForColor || 0) * (color.unitPrice || 0));
                      }, 0))}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Customer Instructions - Read Only */}
        <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Customer Instructions (Read Only)
            </label>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 min-h-[80px]">
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {globalNote || 'No instructions provided by customer.'}
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            These instructions were provided by the customer and cannot be edited.
          </p>
        </div>
        
        {/* Internal Admin Note - Editable */}
        <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Internal Admin Note (Not visible to customer)
          </label>
          <textarea
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
            placeholder="Add internal notes for reference (these will not be shown to the customer)..."
          />
          <p className="text-xs text-gray-400 mt-1">
            This note is for internal use only and will not be visible to the customer.
          </p>
        </div>
        
        {/* Quotation Summary */}
        <div className="mt-6 bg-gradient-to-r from-[#E39A65]/10 to-transparent rounded-xl border border-[#E39A65]/20 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quotation Summary</h3>
              <p className="text-sm text-gray-500">
                Total Quantity: {totalQuantity} pcs
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-[#E39A65]">{formatPrice(totalAmount)}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <Link
            href="/admin/inquiries"
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmitQuotation}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit Quotation to Customer
          </button>
        </div>
      </div>
    </div>
  );
}