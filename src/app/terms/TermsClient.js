
// app/terms/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaGavel,
  FaFileContract,
  FaHandshake,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
  FaMoneyBillWave,
  FaFileInvoice,
  FaUserTie,
  FaUsers,
  FaBuilding,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaBan,
  FaLock,
  FaGlobe,
  FaBalanceScale,
  FaScaleBalanced,
  FaCalendarAlt,
  FaUserShield,
  FaClipboardList,
  FaFileSignature,
  FaStamp,
  FaBoxOpen,
  FaCreditCard,
  FaUndo,
  FaShippingFast
} from 'react-icons/fa';
import { MdGavel, MdPolicy, MdVerifiedUser, MdWarning, MdUpdate } from 'react-icons/md';
import { HiDocumentText, HiShieldCheck } from 'react-icons/hi';
import { BsFileText, BsFileRichtext } from 'react-icons/bs';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import { RiGovernmentLine } from 'react-icons/ri';
import WhatsAppButton from '../components/layout/WhatsAppButton';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [lastUpdated] = useState('March 15, 2026');
  const [effectiveDate] = useState('January 1, 2026');
  const sectionRefs = useRef({});

 useEffect(() => {
  const handleScroll = () => {
    const sections = Object.values(sectionRefs.current);
    const scrollPosition = window.scrollY + 120; // Offset for fixed header
    
    let currentSection = '';
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (!section) continue;
      
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = section.id;
        break;
      }
    }
    
    // If no section found, keep the last active or set to first
    if (currentSection && currentSection !== activeSection) {
      setActiveSection(currentSection);
    } else if (!currentSection && sections.length > 0 && activeSection === '') {
      setActiveSection(sections[0]?.id || 'acceptance');
    }
  };
  
  // Initial call to set active section
  handleScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Cleanup
  return () => window.removeEventListener('scroll', handleScroll);
}, [activeSection]);

  const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 100; // Offset for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

  const sections = [
    {
      id: 'acceptance',
      icon: <FaFileSignature className="text-2xl" />,
      title: 'Acceptance of Terms',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'blue',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to <span className="font-bold text-orange-600">Asian Clothify</span>. By accessing or using our Asian Clothify platform, you agree to be bound by these Terms and Conditions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Please read these terms carefully before using our services. If you do not agree to all the terms and conditions, you may not access the website or use our services. These terms apply to all visitors, users, and others who access or use the Platform.
          </p>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl mt-6">
            <div className="flex items-start gap-4">
              <FaHandshake className="text-orange-500 text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">By using our Platform, you confirm that:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 text-sm mt-1" />
                    <span>You are at least 18 years of age</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 text-sm mt-1" />
                    <span>You represent a legally registered business entity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 text-sm mt-1" />
                    <span>You have the authority to bind your company to these terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 text-sm mt-1" />
                    <span>All information you provide is accurate and complete</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'definitions',
      icon: <BsFileRichtext className="text-2xl" />,
      title: 'Definitions',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'purple',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">For the purpose of these Terms:</p>
          
          <div className="grid gap-4 mt-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                "Platform" or "Website"
              </h4>
              <p className="text-gray-600">Refers to Asian Clothify's website, including all subdomains and associated services.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                "User", "You", "Your"
              </h4>
              <p className="text-gray-600">Refers to the individual or business entity accessing or using the Platform.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                "Admin"
              </h4>
              <p className="text-gray-600">Refers to authorized personnel with full access to manage the Platform, including pricing, invoices, and payments.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                "Moderator"
              </h4>
              <p className="text-gray-600">Refers to authorized personnel responsible for product posting and editing without pricing or payment access.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                "Customer" or "Buyer"
              </h4>
              <p className="text-gray-600">Refers customers/retailers who browse products, submit inquiries, and make purchases through the Platform.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                "Inquiry"
              </h4>
              <p className="text-gray-600">Refers to a request submitted by a customer to purchase products, which may be converted to an invoice by Admin.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                "MOQ"
              </h4>
              <p className="text-gray-600">Minimum Order Quantity - the smallest quantity of a product that a customer can purchase.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                "Invoice"
              </h4>
              <p className="text-gray-600">A commercial document issued by Admin to a customer, indicating the products, quantities, and agreed prices for a transaction.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'user-obligations',
      icon: <FaUsers className="text-2xl" />,
      title: 'User Obligations',
      color: 'from-green-500 to-green-600',
      bgColor: 'green',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">As a user of our Asian Clothify platform, you agree to:</p>
          
          <div className="grid md:grid-cols-2 gap-5 mt-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Provide Accurate Information</h4>
                <p className="text-gray-600 text-sm">Submit true, accurate, current, and complete information about your business.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Maintain Account Security</h4>
                <p className="text-gray-600 text-sm">Keep your password secure and notify us of any unauthorized use.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Comply with Laws</h4>
                <p className="text-gray-600 text-sm">Use the Platform in compliance with all applicable laws and regulations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Respect Intellectual Property</h4>
                <p className="text-gray-600 text-sm">Not infringe upon the intellectual property rights of others.</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mt-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FaBan className="text-red-500" />
              Prohibited Activities
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <FaTimesCircle className="text-red-500 text-sm mt-1" />
                <span>Impersonating any person or entity</span>
              </li>
              <li className="flex items-start gap-2">
                <FaTimesCircle className="text-red-500 text-sm mt-1" />
                <span>Interfering with the proper functioning of the Platform</span>
              </li>
              <li className="flex items-start gap-2">
                <FaTimesCircle className="text-red-500 text-sm mt-1" />
                <span>Attempting to gain unauthorized access to other accounts</span>
              </li>
              <li className="flex items-start gap-2">
                <FaTimesCircle className="text-red-500 text-sm mt-1" />
                <span>Using the Platform for any illegal or unauthorized purpose</span>
              </li>
              <li className="flex items-start gap-2">
                <FaTimesCircle className="text-red-500 text-sm mt-1" />
                <span>Reverse engineering any aspect of the Platform</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'inquiry-process',
      icon: <FaClipboardList className="text-2xl" />,
      title: 'Inquiry & Order Process',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'orange',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">Our platform uses an inquiry-based sales process:</p>
          
          <div className="space-y-6 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">1</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Browse Products</h4>
                <p className="text-gray-600">Customers browse our product catalog with bulk pricing information and MOQ displayed.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">2</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Submit Inquiry</h4>
                <p className="text-gray-600">Customers select products, specify quantities, add special instructions, and submit an inquiry through the inquiry cart.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">3</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Admin Review</h4>
                <p className="text-gray-600">Admin reviews the inquiry, adds internal notes, and prepares a quotation.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">4</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Invoice Generation</h4>
                <p className="text-gray-600">Admin converts the inquiry to an invoice with unit prices, shipping costs, and taxes.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">5</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Payment & Fulfillment</h4>
                <p className="text-gray-600">Customer receives the invoice, makes payment (if applicable), and order is fulfilled.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-4">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Inquiries are not binding orders until confirmed by Admin and converted to an invoice. 
              Prices shown on product pages are estimates and may be adjusted based on quantities, customization, and current market conditions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'pricing',
      icon: <FaMoneyBillWave className="text-2xl" />,
      title: 'Pricing & Payments',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'yellow',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">Our pricing and payment terms are as follows:</p>
          
          <div className="grid gap-5 mt-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaBalanceScale className="text-yellow-600" />
                Bulk Pricing Tiers
              </h4>
              <p className="text-gray-600">Product prices are displayed in tiered format (e.g., 100-299 units: $X, 300-999 units: $Y, 1000+ units: $Z). Final pricing is confirmed by Admin on invoice.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaBoxOpen className="text-yellow-600" />
                Minimum Order Quantity (MOQ)
              </h4>
              <p className="text-gray-600">Each product has a specified MOQ. Orders cannot be placed below the MOQ. MOQ may be negotiated on a case-by-case basis.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaCreditCard className="text-yellow-600" />
                Payment Methods
              </h4>
              <p className="text-gray-600 mb-3">We accept the following payment methods:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-sm" />
                  Bank Transfer (TT / Wire Transfer)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-sm" />
                  Letter of Credit (L/C)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-sm" />
                  Stripe (Online Payment - where available)
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaFileInvoice className="text-yellow-600" />
                Invoicing
              </h4>
              <p className="text-gray-600">Invoices are generated by Admin and include unit prices, shipping costs, and applicable taxes. Invoices have statuses: Draft, Sent, and Paid.</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 italic mt-4">
            * All prices are in USD unless otherwise specified. Prices are subject to change without notice.
          </p>
        </div>
      )
    },
    {
      id: 'shipping',
      icon: <FaShippingFast className="text-2xl" />,
      title: 'Shipping & Delivery',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'teal',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">Our shipping terms include:</p>
          
          <div className="grid md:grid-cols-2 gap-5 mt-4">
            <div className="bg-teal-50 p-5 rounded-xl">
              <FaTruck className="text-teal-600 text-2xl mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Shipping Methods</h4>
              <p className="text-gray-600 text-sm">We offer air freight, sea freight, and express courier services depending on order size and destination.</p>
            </div>

            <div className="bg-teal-50 p-5 rounded-xl">
              <FaGlobe className="text-teal-600 text-2xl mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">International Shipping</h4>
              <p className="text-gray-600 text-sm">We ship worldwide. Shipping costs and delivery times vary by destination and are confirmed on the invoice.</p>
            </div>

            <div className="bg-teal-50 p-5 rounded-xl">
              <FaClock className="text-teal-600 text-2xl mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Delivery Time</h4>
              <p className="text-gray-600 text-sm">Production typically takes 15-25 days after order confirmation. Shipping adds 3-35 days depending on method.</p>
            </div>

            <div className="bg-teal-50 p-5 rounded-xl">
              <FaUndo className="text-teal-600 text-2xl mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Shipping Damage</h4>
              <p className="text-gray-600 text-sm">Claims for damaged goods must be reported within 48 hours of receipt with photographic evidence.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'roles',
      icon: <FaUserTie className="text-2xl" />,
      title: 'User Roles & Responsibilities',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'indigo',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">The Platform has three distinct user roles:</p>
          
          <div className="grid gap-6 mt-4">
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 p-6 rounded-xl border-l-4 border-indigo-500">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                <FaUserShield className="text-indigo-600" />
                Admin
              </h4>
              <p className="text-gray-700 mb-2 font-medium">Full access including:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Final pricing control</li>
                <li>• Invoice management</li>
                <li>• Payment oversight</li>
                <li>• Product approval</li>
                <li>• Full system configuration</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 p-6 rounded-xl border-l-4 border-purple-500">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                <FaUsers className="text-purple-600" />
                Moderator
              </h4>
              <p className="text-gray-700 mb-2 font-medium">Limited access:</p>
              <ul className="space-y-1 text-gray-600">
                <li>✓ Product posting and editing</li>
                <li>✓ Image uploads</li>
                <li>✓ Color and size management</li>
                <li>✓ Add internal notes</li>
                <li className="text-red-500 mt-2">✗ Cannot edit prices</li>
                <li className="text-red-500">✗ Cannot create invoices</li>
                <li className="text-red-500">✗ Cannot view payments</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100/50 p-6 rounded-xl border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                <FaBuilding className="text-green-600" />
                 Customer
              </h4>
              <p className="text-gray-700 mb-2 font-medium">Access includes:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Browse products</li>
                <li>• Submit inquiries</li>
                <li>• View inquiry history</li>
                <li>• View/download invoices</li>
                <li>• Make payments (where enabled)</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'whatsapp',
      icon: <FaWhatsapp className="text-2xl" />,
      title: 'WhatsApp Communication',
      color: 'from-green-500 to-green-600',
      bgColor: 'green',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">WhatsApp is a primary communication channel:</p>
          
          <div className="bg-green-50 rounded-xl p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-green-600 text-xl flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Floating WhatsApp Button</h4>
                  <p className="text-gray-600">Available on all pages for quick access to customer support.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-green-600 text-xl flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Product Page Integration</h4>
                  <p className="text-gray-600">"Chat on WhatsApp" buttons auto-fill product details for quick inquiries.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-green-600 text-xl flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Admin Communication</h4>
                  <p className="text-gray-600">Admins can contact buyers via WhatsApp directly from inquiry details pages.</p>
                </div>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              Note: WhatsApp communication is URL-based; we do not store your WhatsApp messages on our servers.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'liability',
      icon: <FaExclamationTriangle className="text-2xl" />,
      title: 'Limitation of Liability',
      color: 'from-red-500 to-red-600',
      bgColor: 'red',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">To the maximum extent permitted by law:</p>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <FaTimesCircle className="text-red-500 text-sm mt-1" />
                <span>Asian Clothify shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaTimesCircle className="text-red-500 text-sm mt-1" />
                <span>Our total liability shall not exceed the amount paid by you for the products or services in question.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaTimesCircle className="text-red-500 text-sm mt-1" />
                <span>We are not responsible for delays caused by circumstances beyond our reasonable control.</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <p className="text-yellow-800 text-sm">
              <strong>Disclaimer:</strong> The Platform and all products and services are provided "AS IS" without warranty of any kind.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'termination',
      icon: <FaBan className="text-2xl" />,
      title: 'Termination',
      color: 'from-gray-600 to-gray-700',
      bgColor: 'gray',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">We may terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason, including breach of these Terms.</p>
          
          <p className="text-gray-700">Upon termination:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li>Your right to use the Platform will immediately cease</li>
            <li>Any pending inquiries or orders will be handled on a case-by-case basis</li>
            <li>Sections that by their nature should survive termination shall survive</li>
          </ul>
        </div>
      )
    },
    {
      id: 'governing-law',
      icon: <FaGavel className="text-2xl" />,
      title: 'Governing Law',
      color: 'from-amber-600 to-amber-700',
      bgColor: 'amber',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            These Terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.
          </p>
          
          <p className="text-gray-700">
            Any legal disputes arising out of or related to these Terms or the Platform shall be subject to the exclusive jurisdiction of the courts in Dhaka, Bangladesh.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
            <div className="flex items-start gap-3">
              <RiGovernmentLine className="text-amber-600 text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Dispute Resolution</h4>
                <p className="text-gray-600 text-sm">
                  Before initiating legal proceedings, parties agree to attempt to resolve disputes through good-faith negotiations. 
                  If negotiations fail, disputes shall be resolved through arbitration in accordance with the Arbitration Act of Bangladesh.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'changes-to-terms',
      icon: <MdUpdate className="text-2xl" />,
      title: 'Changes to Terms',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'cyan',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>
          
          <p className="text-gray-700">
            By continuing to access or use our Platform after those revisions become effective, you agree to be bound by the revised terms.
          </p>

          <div className="bg-cyan-50 rounded-xl p-5 flex items-center gap-4">
            <FaCalendarAlt className="text-cyan-600 text-2xl" />
            <div>
              <p className="font-semibold text-gray-900">Effective Date</p>
              <p className="text-gray-600">{effectiveDate}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contact-terms',
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Contact Us',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'orange',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">If you have any questions about these Terms, please contact us:</p>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl p-8 mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <FaBuilding className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Asian Clothify</h4>
                  <p className="text-gray-600 text-sm">49/10-C, Ground Floor, Genda</p>
                  <p className="text-gray-600 text-sm">Savar, Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <FaEnvelope />
                  </div>
                  <span className="text-gray-700">legal@asianclothify.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <FaPhone />
                  </div>
                  <span className="text-gray-700">+880 1305-785685</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <FaWhatsapp />
                  </div>
                  <span className="text-gray-700">+880 1305-785685</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white mt-16">
        {/* HERO SECTION */}
        <section className="relative h-[250px] sm:h-[280px] md:h-[310px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://i.ibb.co.com/d4jGDTFv/businessman-holding-pen-signs-important-contract-document-generated-by-ai.jpg"
              alt="Terms and Conditions"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/40"></div>
          </div>

          <div className="relative z-10 h-full flex items-center container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-6 border border-white/20">
                <FaFileContract className="text-orange-400 text-base md:text-xl" />
                <span className="text-white font-medium text-xs md:text-sm">Legal Agreement</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-1 md:mb-4">
                Terms &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Conditions
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200">
                The rules and guidelines for using our Asian Clothify wholesale platform
              </p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* SIDEBAR NAVIGATION - ONLY SHOW ON LARGE DEVICES */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BsFileText className="text-orange-500" />
                  Terms Sections
                </h3>
                <nav className="space-y-1 max-h-[500px] overflow-y-auto pr-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 group ${
                        activeSection === section.id
                          ? `bg-gradient-to-r ${section.color} text-white shadow-md`
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className={`text-lg ${
                        activeSection === section.id ? 'text-white' : `text-${section.bgColor}-500 group-hover:text-${section.bgColor}-600`
                      }`}>
                        {section.icon}
                      </span>
                      <span className="flex-1 truncate">{section.title}</span>
                      {activeSection === section.id && (
                        <FaArrowRight className="text-white text-xs" />
                      )}
                    </button>
                  ))}
                </nav>

                {/* Acknowledge Button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => alert('Thank you for acknowledging our Terms & Conditions.')}
                    className="w-full px-4 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle />
                    I Acknowledge
                  </button>
                </div>
              </div>
            </div>

            {/* CONTENT AREA - FULL WIDTH ON MOBILE, 3/4 ON DESKTOP */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg md:shadow-xl border border-gray-200 p-5 md:p-8 lg:p-10">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => {
                      if (el) {
                        sectionRefs.current[section.id] = el;
                      }
                    }}
                    className="mb-8 md:mb-10 lg:mb-12 last:mb-0 scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-lg`}>
                        {section.icon}
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{section.title}</h2>
                        <div className={`h-0.5 md:h-1 w-12 md:w-16 lg:w-20 bg-gradient-to-r ${section.color} rounded-full mt-1 md:mt-2`}></div>
                      </div>
                    </div>
                    
                    <div className="pl-3 md:pl-6 lg:pl-8 border-l-2 md:border-l-4 border-gray-100">
                      {section.content}
                    </div>
                  </section>
                ))}

                {/* Terms Footer - Responsive */}
                <div className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <FaHandshake className="text-white text-xl md:text-2xl" />
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2">Agreement to Terms</h3>
                    <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-4 md:mb-6">
                      By using Asian Clothify's platform, you acknowledge that you have read, understood, 
                      and agree to be bound by these Terms and Conditions.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                      <Link
                        href="/register"
                        className="px-4 md:px-6 py-2.5 md:py-3 bg-orange-500 text-white rounded-lg md:rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <FaBuilding />
                        Create Account
                      </Link>
                      <Link
                        href="/privacy-policy"
                        className="px-4 md:px-6 py-2.5 md:py-3 bg-white text-gray-700 rounded-lg md:rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 border border-gray-200 inline-flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <FaShieldAlt />
                        Read Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STICKY ACCEPTANCE BAR - Responsive */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="container mx-auto px-4 py-2 md:py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-3">
              <p className="text-xs md:text-sm text-gray-600 flex items-center gap-1.5 md:gap-2">
                <FaGavel className="text-orange-500 text-xs md:text-sm" />
                By continuing to use our platform, you agree to our Terms & Conditions.
              </p>
              <div className="flex gap-2 md:gap-3">
                <Link
                  href="/privacy"
                  className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Privacy Policy
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
        <WhatsAppButton />
    </>
  );
}




