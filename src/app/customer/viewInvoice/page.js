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
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  TrendingUp,
  TrendingDown,
  Download,
  Printer,
  CreditCard,
  Landmark,
  Copy,
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronUp
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
    month: 'long',
    day: 'numeric'
  });
};

// Payment Status Badge
const PaymentStatusBadge = ({ status, isExpired = false }) => {
  const displayStatus = isExpired ? 'expired' : status;
  
  const statusConfig = {
    paid: { 
      bg: 'bg-emerald-100', 
      text: 'text-emerald-700', 
      border: 'border-emerald-200',
      label: 'Paid', 
      icon: CheckCircle 
    },
    partial: { 
      bg: 'bg-amber-100', 
      text: 'text-amber-700', 
      border: 'border-amber-200',
      label: 'Partial', 
      icon: TrendingUp 
    },
    unpaid: { 
      bg: 'bg-rose-100', 
      text: 'text-rose-700', 
      border: 'border-rose-200',
      label: 'Unpaid', 
      icon: AlertCircle 
    },
    expired: { 
      bg: 'bg-orange-100', 
      text: 'text-orange-700', 
      border: 'border-orange-200',
      label: 'Expired', 
      icon: Clock 
    },
    overpaid: { 
      bg: 'bg-purple-100', 
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
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg} border ${config.border}`}>
      <Icon className={`w-4 h-4 ${config.text}`} />
      <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>
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
      className="p-1 hover:bg-gray-100 rounded transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
    </button>
  );
};

// Product Row Component with nested colors
// Product Row Component with nested colors
// Product Row Component with professional design and product images
const ProductRow = ({ product, index }) => {
  const [expanded, setExpanded] = useState(true);
  
  const totalQuantity = product.colors?.reduce((sum, color) => 
    sum + (color.totalForColor || 0), 0) || 0;
  
  const productTotal = product.total || (totalQuantity * product.unitPrice);

  // Group sizes by color for better display
  const getSizeSummary = (color) => {
    return color.sizeQuantities
      ?.filter(sq => sq.quantity > 0)
      .map(sq => `${sq.size}: ${sq.quantity}`)
      .join(' • ') || 'No sizes';
  };

  return (
    <>
      {/* Main Product Row - Professional Card Style */}
      <tr key={`product-${index}`} className="border-b border-gray-200 hover:bg-gray-50/80 transition-colors">
        <td className="px-6 py-4 w-12">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors text-gray-500"
            title={expanded ? "Hide details" : "Show details"}
          >
            {expanded ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
            }
          </button>
        </td>
        <td className="px-6 py-4" colSpan={2}>
          <div className="flex items-center gap-4">
            {/* Product Image with better error handling */}
            <div className="w-16 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 overflow-hidden shadow-sm flex-shrink-0">
              {product.productImage ? (
                <img 
                  src={product.productImage} 
                  alt={product.productName}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    console.log('Image failed to load:', product.productImage);
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                  }}
                  onLoad={() => console.log('Image loaded successfully:', product.productImage)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 text-sm">{product.productName}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">SKU: {product.productId?.slice(-6) || 'N/A'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {product.colors?.length || 0} Colors
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  {totalQuantity} Units
                </span>
                {product.moq && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
                    MOQ: {product.moq}
                  </span>
                )}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          <div className="text-2xl font-bold text-gray-900">{totalQuantity}</div>
          <div className="text-xs text-gray-500 mt-1">Total Units</div>
        </td>
        <td className="px-6 py-4 text-right">
          <div className="text-lg font-semibold text-gray-900">{formatPrice(product.unitPrice)}</div>
          <div className="text-xs text-gray-500 mt-1">Per Unit</div>
        </td>
        <td className="px-6 py-4 text-right">
          <div className="text-xl font-bold text-[#E39A65]">{formatPrice(productTotal)}</div>
          <div className="text-xs text-gray-500 mt-1">Line Total</div>
        </td>
      </tr>

      {/* Expanded Color Details - Professional Grid Layout */}
   {expanded && product.colors?.map((color, colorIdx) => (
  <tr key={`color-${index}-${colorIdx}`} className="bg-gray-50/30 border-b border-gray-100">
    <td className="px-6 py-3"></td>
    <td className="px-6 py-3" colSpan={5}>
      <div className="flex items-center gap-4">
        {/* Color Swatch */}
        <div className="relative flex-shrink-0">
          <div 
            className="w-8 h-8 rounded-lg border-2 border-white shadow-md"
            style={{ backgroundColor: color.color.code }}
            title={color.color.name || color.color.code}
          />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border border-gray-200"></div>
        </div>

        {/* Size Breakdown - Takes remaining space */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {color.sizeQuantities?.map((sq, sqIdx) => sq.quantity > 0 && (
              <div 
                key={`size-${index}-${colorIdx}-${sqIdx}`} 
                className="inline-flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 border-r border-gray-200">
                  {sq.size}
                </span>
                <span className="px-2 py-1 text-xs font-semibold text-gray-900">
                  {sq.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Summary */}
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-medium text-gray-900 whitespace-nowrap">
            {color.totalForColor} pcs × {formatPrice(product.unitPrice)}
          </div>
          <div className="text-base font-bold text-[#E39A65] mt-1 whitespace-nowrap">
            {formatPrice(color.totalForColor * product.unitPrice)}
          </div>
        </div>
      </div>
    </td>
  </tr>
))}

      {/* Special Instructions - Professional Alert Style */}
      {expanded && product.specialInstructions && (
        <tr key={`note-${index}`} className="bg-amber-50/30 border-b border-gray-200">
          <td className="px-6 py-3" colSpan={2}></td>
          <td className="px-6 py-3" colSpan={4}>
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1">
                  Special Instructions
                </span>
                <p className="text-sm text-amber-700">{product.specialInstructions}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default function CustomerInvoiceViewPage() {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [overdueDays, setOverdueDays] = useState(0);
  
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
        
        // Check if expired
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(data.data.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        
        const expired = dueDate < today && 
                       data.data.paymentStatus !== 'paid' && 
                       data.data.paymentStatus !== 'cancelled' &&
                       data.data.paymentStatus !== 'overpaid';
        
        setIsExpired(expired);
        
        if (expired) {
          const diffTime = today - dueDate;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setOverdueDays(diffDays);
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

  const handleDownloadPDF = () => {
    window.open(`http://localhost:5000/api/invoices/${invoiceId}/pdf`, '_blank');
  };

  const handlePrint = () => {
    window.open(`/customer/invoices/print?invoiceId=${invoiceId}`, '_blank');
  };

  const handleGoBack = () => {
    router.push('/customer/invoices');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#E39A65] mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading invoice details...</p>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Invoice Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The invoice you are looking for does not exist.'}</p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#E39A65] text-white rounded-lg hover:bg-[#d48b54] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Invoices
          </button>
        </div>
      </div>
    );
  }

  const dueAmount = invoice.finalTotal - (invoice.amountPaid || 0);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Invoices</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        {/* Invoice Header Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          {/* Status Bar */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E39A65] to-[#d48b54] rounded-lg flex items-center justify-center shadow-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{invoice.invoiceNumber}</h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Issued on {formatDate(invoice.invoiceDate)}
                </p>
              </div>
            </div>
            <PaymentStatusBadge status={invoice.paymentStatus} isExpired={isExpired} />
          </div>

          {/* Overdue Warning */}
          {isExpired && (
            <div className="px-6 py-3 bg-red-50 border-b border-red-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">
                This invoice is {overdueDays} day(s) overdue. Please make the payment as soon as possible.
              </span>
            </div>
          )}

          {/* Company and Customer Info */}
          <div className="p-6 grid grid-cols-2 gap-6">
            {/* From: Company */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">From</h3>
              <div className="space-y-2">
                {invoice.company?.logo && (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden mb-3">
                    <img 
                      src={invoice.company.logo} 
                      alt={invoice.company.companyName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="font-semibold text-gray-900">{invoice.company?.companyName || 'Asian Clothify'}</p>
                {invoice.company?.contactPerson && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {invoice.company.contactPerson}
                  </p>
                )}
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {invoice.company?.email || 'info@asianclothify.com'}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {invoice.company?.phone || '+8801305-785685'}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {invoice.company?.address || '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'}
                </p>
              </div>
            </div>

            {/* To: Customer */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">To</h3>
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">{invoice.customer?.companyName || 'N/A'}</p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  {invoice.customer?.contactPerson || 'N/A'}
                  <CopyButton text={invoice.customer?.contactPerson || ''} label="contact name" />
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {invoice.customer?.email || 'N/A'}
                  <CopyButton text={invoice.customer?.email || ''} label="email" />
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {invoice.customer?.phone || 'N/A'}
                  <CopyButton text={invoice.customer?.phone || ''} label="phone" />
                </p>
                
                {/* Billing Address */}
                {(invoice.customer?.billingAddress || invoice.customer?.billingCity) && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-2">Billing Address</p>
                    <p className="text-sm text-gray-600 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span>
                        {invoice.customer.billingAddress}
                        {invoice.customer.billingCity && <>, {invoice.customer.billingCity}</>}
                        {invoice.customer.billingZipCode && <br />}
                        {invoice.customer.billingZipCode}
                        {invoice.customer.billingCountry && <>, {invoice.customer.billingCountry}</>}
                      </span>
                    </p>
                  </div>
                )}

                {/* Shipping Address (if different) */}
                {invoice.customer?.shippingAddress && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-2">Shipping Address</p>
                    <p className="text-sm text-gray-600 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span>
                        {invoice.customer.shippingAddress}
                        {invoice.customer.shippingCity && <>, {invoice.customer.shippingCity}</>}
                        {invoice.customer.shippingZipCode && <br />}
                        {invoice.customer.shippingZipCode}
                        {invoice.customer.shippingCountry && <>, {invoice.customer.shippingCountry}</>}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

   {/* Invoice Items Table - Professional Design */}
<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
  <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Package className="w-5 h-5 text-[#E39A65]" />
        Invoice Items
      </h2>
      <span className="text-xs text-gray-500">
        {invoice.items?.length || 0} product(s)
      </span>
    </div>
  </div>
  
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100/80 border-b border-gray-200">
          <th className="px-6 py-3 w-12"></th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" colSpan={2}>
            Product Details
          </th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Unit Price
          </th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
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

        {/* Invoice Summary and Payment Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Bank Details */}
          {invoice.bankDetails && Object.values(invoice.bankDetails).some(v => v) && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Landmark className="w-4 h-4" />
                  Bank Details
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {invoice.bankDetails.bankName && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bank Name:</span>
                    <span className="font-medium text-gray-900">{invoice.bankDetails.bankName}</span>
                  </div>
                )}
                {invoice.bankDetails.accountName && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account Name:</span>
                    <span className="font-medium text-gray-900">{invoice.bankDetails.accountName}</span>
                  </div>
                )}
                {invoice.bankDetails.accountNumber && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account Number:</span>
                    <span className="font-medium text-gray-900">{invoice.bankDetails.accountNumber}</span>
                  </div>
                )}
                {invoice.bankDetails.accountType && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account Type:</span>
                    <span className="font-medium text-gray-900">{invoice.bankDetails.accountType}</span>
                  </div>
                )}
                {invoice.bankDetails.routingNumber && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Routing Number:</span>
                    <span className="font-medium text-gray-900">{invoice.bankDetails.routingNumber}</span>
                  </div>
                )}
                {invoice.bankDetails.swiftCode && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">SWIFT Code:</span>
                    <span className="font-medium text-gray-900">{invoice.bankDetails.swiftCode}</span>
                  </div>
                )}
                {invoice.bankDetails.iban && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">IBAN:</span>
                    <span className="font-medium text-gray-900">{invoice.bankDetails.iban}</span>
                  </div>
                )}
                {invoice.bankDetails.bankAddress && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bank Address:</span>
                    <span className="font-medium text-gray-900">{invoice.bankDetails.bankAddress}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Invoice Summary */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Invoice Summary
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal:</span>
                  <span className="font-medium text-gray-900">{formatPrice(invoice.subtotal)}</span>
                </div>
                
                {invoice.vatPercentage > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">VAT ({invoice.vatPercentage}%):</span>
                    <span className="font-medium text-gray-900">{formatPrice(invoice.vatAmount)}</span>
                  </div>
                )}
                
                {invoice.discountPercentage > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount ({invoice.discountPercentage}%):</span>
                    <span className="font-medium text-red-600">-{formatPrice(invoice.discountAmount)}</span>
                  </div>
                )}
                
                {invoice.shippingCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping:</span>
                    <span className="font-medium text-gray-900">{formatPrice(invoice.shippingCost)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 my-3 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-[#E39A65] text-lg">{formatPrice(invoice.finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payment Details
                </h3>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount Paid:</span>
                  <span className="font-medium text-green-600">{formatPrice(invoice.amountPaid || 0)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Due Amount:</span>
                  <span className={`font-medium ${dueAmount > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {formatPrice(dueAmount)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-500">Payment Status:</span>
                  <PaymentStatusBadge status={invoice.paymentStatus} isExpired={isExpired} />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-500">Invoice Date</p>
                  <p className="font-medium text-gray-900">{formatDate(invoice.invoiceDate)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Due Date</p>
                  <p className={`font-medium ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                    {formatDate(invoice.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(invoice.notes || invoice.terms) && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Additional Information</h2>
            </div>
            <div className="p-6 space-y-4">
              {invoice.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{invoice.notes}</p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Terms & Conditions</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{invoice.terms}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Custom Fields */}
        {invoice.customFields && invoice.customFields.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Additional Fields</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {invoice.customFields.map((field, idx) => (
                <div key={idx}>
                  <p className="text-xs text-gray-500">{field.fieldName}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{field.fieldValue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center text-xs text-gray-400 mt-8">
          This is a computer generated invoice. No signature is required.
        </div>
      </div>
    </div>
  );
}