// // app/privacy-policy/page.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   FaShieldAlt,
//   FaLock,
//   FaEye,
//   FaCookieBite,
//   FaUserSecret,
//   FaFileContract,
//   FaDatabase,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaCheckCircle,
//   FaRegClock,
//   FaGlobe,
//   FaServer,
//   FaUserLock,
//   FaCreditCard,
//   FaBell,
//   FaDownload,
//   FaShareAlt,
//   FaArrowRight,
//   FaLockOpen,
//   FaUserShield,
//   FaClipboardCheck,
//   FaGavel,
//   FaBalanceScale,
//   FaHandshake,
//   FaInfoCircle,
//   FaExclamationTriangle,
//   FaToggleOn,
//   FaBuilding
// } from 'react-icons/fa';
// import { MdPrivacyTip, MdSecurity, MdVerifiedUser, MdPolicy, MdUpdate } from 'react-icons/md';
// import { HiDocumentText, HiShieldCheck, HiOutlineRefresh } from 'react-icons/hi';
// import { BsShieldLock, BsShieldShaded, BsFileText } from 'react-icons/bs';
// import { RiFileShieldLine, RiGovernmentLine } from 'react-icons/ri';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';

// export default function PrivacyPolicyPage() {
//   const [activeSection, setActiveSection] = useState('introduction');
//   const [lastUpdated] = useState('March 15, 2026');
//   const [showCookieConsent, setShowCookieConsent] = useState(false);
//   const sectionRefs = useRef({});

//   useEffect(() => {
//     // Check if user has already accepted cookies
//     const cookieAccepted = localStorage.getItem('cookieConsent');
//     if (!cookieAccepted) {
//       setShowCookieConsent(true);
//     }

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id);
//           }
//         });
//       },
//       { threshold: 0.5, rootMargin: '-80px 0px -80px 0px' }
//     );

//     Object.values(sectionRefs.current).forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const handleCookieAccept = () => {
//     localStorage.setItem('cookieConsent', 'accepted');
//     setShowCookieConsent(false);
//   };

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const offset = 100;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;
      
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const sections = [
//     {
//       id: 'introduction',
//       icon: <MdPrivacyTip className="text-2xl" />,
//       title: 'Introduction',
//       color: 'from-blue-500 to-blue-600',
//       bgColor: 'blue',
//       content: (
//         <div className="space-y-6">
//           <p className="text-lg text-gray-700 leading-relaxed">
//             At <span className="font-bold text-orange-600">Asian Clothify</span>, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our B2B wholesale services.
//           </p>
//           <p className="text-gray-700 leading-relaxed">
//             Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site. As a B2B platform, we are committed to protecting the privacy of our business partners, moderators, and customers.
//           </p>
//           <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl mt-6">
//             <div className="flex items-start gap-4">
//               <FaInfoCircle className="text-orange-500 text-xl flex-shrink-0 mt-1" />
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Quick Summary</h4>
//                 <ul className="space-y-2 text-gray-700">
//                   <li className="flex items-start gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm mt-1" />
//                     <span>We collect business information necessary for wholesale transactions</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm mt-1" />
//                     <span>Your data is used to process inquiries, invoices, and payments</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm mt-1" />
//                     <span>We never sell your personal information to third parties</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 'information-collection',
//       icon: <FaDatabase className="text-2xl" />,
//       title: 'Information We Collect',
//       color: 'from-purple-500 to-purple-600',
//       bgColor: 'purple',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">We collect several types of information from and about users of our B2B platform, including:</p>
          
//           <div className="grid md:grid-cols-2 gap-6 mt-4">
//             <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
//                 <FaBuilding className="text-xl" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-3">Business Information</h4>
//               <ul className="space-y-2 text-gray-600">
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
//                   <span>Company name and registration number</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
//                   <span>Business address and country</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
//                   <span>Tax ID / VAT number</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
//                   <span>Business type and size</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
//                 <FaUserSecret className="text-xl" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
//               <ul className="space-y-2 text-gray-600">
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
//                   <span>Contact person name</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
//                   <span>Business email address</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
//                   <span>Phone / WhatsApp number</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
//                   <span>Job title / position</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
//               <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
//                 <FaFileContract className="text-xl" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-3">Transaction Data</h4>
//               <ul className="space-y-2 text-gray-600">
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
//                   <span>Inquiry history and details</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
//                   <span>Invoice records</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
//                   <span>Payment information</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
//                   <span>Order quantities and preferences</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
//               <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4">
//                 <FaServer className="text-xl" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-3">Technical Data</h4>
//               <ul className="space-y-2 text-gray-600">
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
//                   <span>IP address and browser type</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
//                   <span>Device information</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
//                   <span>Usage data and cookies</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
//                   <span>Session information</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 'how-we-use',
//       icon: <FaEye className="text-2xl" />,
//       title: 'How We Use Your Information',
//       color: 'from-green-500 to-green-600',
//       bgColor: 'green',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">We use the information we collect for various business purposes, including:</p>
          
//           <div className="space-y-4 mt-4">
//             <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
//               <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
//                 <FaHandshake className="text-lg" />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-1">B2B Transaction Processing</h4>
//                 <p className="text-gray-600 text-sm">To process your inquiries, generate invoices, manage payments, and fulfill wholesale orders.</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
//               <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
//                 <FaEnvelope className="text-lg" />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-1">Communication</h4>
//                 <p className="text-gray-600 text-sm">To respond to your inquiries, send quotes, invoice updates, and important account notifications via email or WhatsApp.</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors">
//               <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
//                 <FaClipboardCheck className="text-lg" />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-1">Account Management</h4>
//                 <p className="text-gray-600 text-sm">To manage your B2B account, provide customer support, and verify your business credentials.</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
//               <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
//                 <FaBalanceScale className="text-lg" />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-1">Legal Compliance</h4>
//                 <p className="text-gray-600 text-sm">To comply with applicable laws, regulations, and legal processes, and to enforce our terms and conditions.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 'data-sharing',
//       icon: <FaShareAlt className="text-2xl" />,
//       title: 'Information Sharing & Disclosure',
//       color: 'from-orange-500 to-orange-600',
//       bgColor: 'orange',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">We may share your information in the following situations:</p>
          
//           <div className="grid gap-4 mt-4">
//             <div className="border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition-colors">
//               <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                 Service Providers
//               </h4>
//               <p className="text-gray-600">We may share your information with third-party vendors, service providers, and contractors who perform services for us or on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</p>
//             </div>

//             <div className="border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition-colors">
//               <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                 Business Transfers
//               </h4>
//               <p className="text-gray-600">If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that business transaction.</p>
//             </div>

//             <div className="border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition-colors">
//               <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                 Legal Requirements
//               </h4>
//               <p className="text-gray-600">We may disclose your information where required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</p>
//             </div>
//           </div>

//           <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-4">
//             <div className="flex items-start gap-3">
//               <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-1" />
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-1">What We Don't Do</h4>
//                 <p className="text-gray-600">We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 'data-security',
//       icon: <FaLock className="text-2xl" />,
//       title: 'Data Security',
//       color: 'from-red-500 to-red-600',
//       bgColor: 'red',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.</p>
          
//           <div className="grid md:grid-cols-2 gap-5 mt-4">
//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-3">
//                 <FaLock className="text-xl" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
//               <p className="text-gray-600 text-sm">All data transmitted between your browser and our servers is encrypted using SSL/TLS technology.</p>
//             </div>

//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-3">
//                 <FaUserShield className="text-xl" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Access Controls</h4>
//               <p className="text-gray-600 text-sm">Strict role-based access controls ensure that only authorized personnel can access sensitive data.</p>
//             </div>

//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-3">
//                 <FaServer className="text-xl" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Secure Infrastructure</h4>
//               <p className="text-gray-600 text-sm">Our servers are protected by firewalls, intrusion detection systems, and regular security audits.</p>
//             </div>

//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-3">
//                 <HiOutlineRefresh className="text-xl" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Regular Backups</h4>
//               <p className="text-gray-600 text-sm">We maintain secure, encrypted backups to prevent data loss and ensure business continuity.</p>
//             </div>
//           </div>

//           <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mt-4">
//             <p className="text-yellow-800 text-sm flex items-start gap-2">
//               <FaExclamationTriangle className="text-yellow-600 flex-shrink-0 mt-1" />
//               <span>While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</span>
//             </p>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 'cookies',
//       icon: <FaCookieBite className="text-2xl" />,
//       title: 'Cookies & Tracking',
//       color: 'from-yellow-500 to-yellow-600',
//       bgColor: 'yellow',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">We use cookies and similar tracking technologies to track activity on our website and hold certain information.</p>
          
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Type</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 <tr>
//                   <td className="px-6 py-4 text-sm text-gray-900">Essential Cookies</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">Required for basic site functionality, authentication, and security</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">Session / Persistent</td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 text-sm text-gray-900">Functional Cookies</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">Remember your preferences and settings</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">1 year</td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 text-sm text-gray-900">Analytics Cookies</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">Help us understand how visitors interact with our website</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">2 years</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <p className="text-gray-600 mt-4">
//             You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, some parts of the website may become inaccessible or not function properly.
//           </p>
//         </div>
//       )
//     },
//     {
//       id: 'your-rights',
//       icon: <FaUserLock className="text-2xl" />,
//       title: 'Your Rights',
//       color: 'from-indigo-500 to-indigo-600',
//       bgColor: 'indigo',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">Depending on your location, you may have the following rights regarding your personal information:</p>
          
//           <div className="grid sm:grid-cols-2 gap-4 mt-4">
//             <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
//               <FaCheckCircle className="text-indigo-500 text-lg" />
//               <span className="text-gray-700">Right to Access</span>
//             </div>
//             <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
//               <FaCheckCircle className="text-indigo-500 text-lg" />
//               <span className="text-gray-700">Right to Rectification</span>
//             </div>
//             <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
//               <FaCheckCircle className="text-indigo-500 text-lg" />
//               <span className="text-gray-700">Right to Erasure</span>
//             </div>
//             <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
//               <FaCheckCircle className="text-indigo-500 text-lg" />
//               <span className="text-gray-700">Right to Restrict Processing</span>
//             </div>
//             <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
//               <FaCheckCircle className="text-indigo-500 text-lg" />
//               <span className="text-gray-700">Right to Data Portability</span>
//             </div>
//             <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
//               <FaCheckCircle className="text-indigo-500 text-lg" />
//               <span className="text-gray-700">Right to Object</span>
//             </div>
//           </div>

//           <p className="text-gray-600 mt-4">
//             To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
//           </p>
//         </div>
//       )
//     },
//     {
//       id: 'children',
//       icon: <FaUserSecret className="text-2xl" />,
//       title: 'Children\'s Privacy',
//       color: 'from-pink-500 to-pink-600',
//       bgColor: 'pink',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">
//             Our B2B platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
//           </p>
//           <div className="bg-pink-50 border border-pink-200 rounded-xl p-5">
//             <p className="text-pink-800 text-sm">
//               <strong>Note:</strong> This is a business-to-business platform. All users must represent a registered business entity and be at least 18 years of age.
//             </p>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 'international',
//       icon: <FaGlobe className="text-2xl" />,
//       title: 'International Data Transfers',
//       color: 'from-teal-500 to-teal-600',
//       bgColor: 'teal',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">
//             Your information may be transferred to and maintained on servers located outside of your country of residence. We take appropriate safeguards to ensure that your information is protected in accordance with this privacy policy.
//           </p>
//           <p className="text-gray-700">
//             By using our platform, you consent to the transfer of your information to Bangladesh and other countries where our servers and service providers are located.
//           </p>
//         </div>
//       )
//     },
//     {
//       id: 'changes',
//       icon: <MdUpdate className="text-2xl" />,
//       title: 'Changes to This Policy',
//       color: 'from-cyan-500 to-cyan-600',
//       bgColor: 'cyan',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">
//             We may update our Privacy Policy from time to time. 
//           </p>
//           <p className="text-gray-700">
//             You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
//           </p>
//         </div>
//       )
//     },
//     {
//       id: 'contact',
//       icon: <FaEnvelope className="text-2xl" />,
//       title: 'Contact Us',
//       color: 'from-orange-500 to-orange-600',
//       bgColor: 'orange',
//       content: (
//         <div className="space-y-6">
//           <p className="text-gray-700">If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
          
//           <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl p-8 mt-4">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
//                   <FaBuilding className="text-xl" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-1">Asian Clothify</h4>
//                   <p className="text-gray-600 text-sm">49/10-C, Ground Floor, Genda</p>
//                   <p className="text-gray-600 text-sm">Savar, Dhaka, Bangladesh</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
//                     <FaEnvelope />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Email</p>
//                     <p className="font-semibold text-gray-900">privacy@asianclothify.com</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
//                     <FaPhone />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Phone</p>
//                     <p className="font-semibold text-gray-900">+880 1305-785685</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 pt-6 border-t border-orange-200">
//               <p className="text-gray-600 text-center">
//                 We typically respond to privacy inquiries within 48 hours.
//               </p>
//             </div>
//           </div>
//         </div>
//       )
//     }
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-white mt-16">
//         {/* HERO SECTION */}
//        <section className="relative h-[200px] md:h-[320px] overflow-hidden">
//   <div className="absolute inset-0">
//     <img
//       src="https://i.ibb.co.com/6JmNT1nT/Screenshot-2026-03-11-151221.png"
//       alt="Privacy Policy"
//       className="w-full h-full object-cover"
//     />
//     <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/40"></div>
//   </div>

//   <div className="relative z-10 h-full flex items-center container mx-auto px-4">
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="max-w-3xl"
//     >
//       <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 border border-white/20">
//         <FaShieldAlt className="text-orange-400 text-base md:text-xl" />
//         <span className="text-white font-medium text-xs md:text-sm">Your Privacy Matters</span>
//       </div>

//       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
//         Privacy{' '}
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
//           Policy
//         </span>
//       </h1>

//       <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-3 md:mb-1 max-w-2xl">
//         How we collect, use, and protect your business information
//       </p>
//     </motion.div>
//   </div>
// </section>

//         {/* MAIN CONTENT */}
//         <div className="container mx-auto px-4 py-12 max-w-7xl">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* SIDEBAR NAVIGATION */}
//             <div className="lg:w-1/4">
//               <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <BsFileText className="text-orange-500" />
//                   Policy Sections
//                 </h3>
//                 <nav className="space-y-1 max-h-[500px] overflow-y-auto pr-2">
//                   {sections.map((section) => (
//                     <button
//                       key={section.id}
//                       onClick={() => scrollToSection(section.id)}
//                       className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 group ${
//                         activeSection === section.id
//                           ? `bg-gradient-to-r ${section.color} text-white shadow-md`
//                           : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                       }`}
//                     >
//                       <span className={`text-lg ${
//                         activeSection === section.id ? 'text-white' : `text-${section.bgColor}-500 group-hover:text-${section.bgColor}-600`
//                       }`}>
//                         {section.icon}
//                       </span>
//                       <span className="flex-1 truncate">{section.title}</span>
//                       {activeSection === section.id && (
//                         <FaArrowRight className="text-white text-xs" />
//                       )}
//                     </button>
//                   ))}
//                 </nav>

//                 {/* Download Options */}
//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <p className="text-xs text-gray-500 mb-3">Download Policy</p>
//                   <div className="flex gap-2">
//                     <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors">
//                       <FaDownload className="text-xs" />
//                       PDF
//                     </button>
//                     <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors">
//                       <FaDownload className="text-xs" />
//                       DOC
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* CONTENT AREA */}
//             <div className="lg:w-3/4">
//               <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10">
//                 {sections.map((section) => (
//                   <section
//                     key={section.id}
//                     id={section.id}
//                     ref={(el) => (sectionRefs.current[section.id] = el)}
//                     className="mb-12 last:mb-0 scroll-mt-24"
//                   >
//                     <div className="flex items-center gap-4 mb-6">
//                       <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-lg`}>
//                         {section.icon}
//                       </div>
//                       <div>
//                         <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
//                         <div className={`h-1 w-20 bg-gradient-to-r ${section.color} rounded-full mt-2`}></div>
//                       </div>
//                     </div>
                    
//                     <div className="pl-4 md:pl-8 border-l-4 border-gray-100">
//                       {section.content}
//                     </div>
//                   </section>
//                 ))}

//                 {/* Policy Footer */}
//                 <div className="mt-12 pt-8 border-t border-gray-200">
//                   <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl p-8 text-center">
//                     <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <FaShieldAlt className="text-white text-2xl" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">We Value Your Trust</h3>
//                     <p className="text-gray-600 max-w-2xl mx-auto mb-6">
//                       At Asian Clothify, protecting your privacy and business information is our priority. 
//                       We're committed to transparency and maintaining the confidentiality of our B2B partners.
//                     </p>
//                     <div className="flex flex-wrap justify-center gap-4">
//                       <Link
//                         href="/contact"
//                         className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center gap-2"
//                       >
//                         <FaEnvelope />
//                         Privacy Questions?
//                       </Link>
//                       <Link
//                         href="/terms"
//                         className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 border border-gray-200 inline-flex items-center gap-2"
//                       >
//                         <FaGavel />
//                         View Terms of Service
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* COOKIE CONSENT BANNER */}
//         {showCookieConsent && (
//           <motion.div
//             initial={{ y: 100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
//           >
//             <div className="container mx-auto px-4 py-4">
//               <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                 <div className="flex items-start gap-3 flex-1">
//                   <FaCookieBite className="text-orange-500 text-2xl flex-shrink-0 mt-1" />
//                   <div>
//                     <h4 className="font-semibold text-gray-900 mb-1">Cookie Consent</h4>
//                     <p className="text-sm text-gray-600">
//                       We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
//                       By clicking "Accept", you consent to our use of cookies.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3 flex-shrink-0">
//                   <button
//                     onClick={handleCookieAccept}
//                     className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={handleCookieAccept}
//                     className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
//                   >
//                     Decline
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }


// app/privacy-policy/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaShieldAlt,
  FaLock,
  FaEye,
  FaCookieBite,
  FaUserSecret,
  FaFileContract,
  FaDatabase,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaRegClock,
  FaGlobe,
  FaServer,
  FaUserLock,
  FaCreditCard,
  FaBell,
  FaDownload,
  FaShareAlt,
  FaArrowRight,
  FaLockOpen,
  FaUserShield,
  FaClipboardCheck,
  FaGavel,
  FaBalanceScale,
  FaHandshake,
  FaInfoCircle,
  FaExclamationTriangle,
  FaToggleOn,
  FaBuilding,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { MdPrivacyTip, MdSecurity, MdVerifiedUser, MdPolicy, MdUpdate } from 'react-icons/md';
import { HiDocumentText, HiShieldCheck, HiOutlineRefresh } from 'react-icons/hi';
import { BsShieldLock, BsShieldShaded, BsFileText } from 'react-icons/bs';
import { RiFileShieldLine, RiGovernmentLine } from 'react-icons/ri';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [lastUpdated] = useState('March 15, 2026');
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieAccepted = localStorage.getItem('cookieConsent');
    if (!cookieAccepted) {
      setShowCookieConsent(true);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Close mobile menu when section changes on mobile
            if (window.innerWidth < 1024) {
              setMobileMenuOpen(false);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -80px 0px' }
    );

    // Observe all section refs
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Handle click outside to close mobile menu
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Handle resize to close mobile menu on larger screens
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const handleCookieDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowCookieConsent(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const sections = [
    {
      id: 'introduction',
      icon: <MdPrivacyTip className="text-xl md:text-2xl" />,
      title: 'Introduction',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'blue',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            At <span className="font-bold text-orange-600">Asian Clothify</span>, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our B2B wholesale services.
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site. As a B2B platform, we are committed to protecting the privacy of our business partners, moderators, and customers.
          </p>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 md:p-5 rounded-r-xl mt-4 md:mt-6">
            <div className="flex items-start gap-3 md:gap-4">
              <FaInfoCircle className="text-orange-500 text-lg md:text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Quick Summary</h4>
                <ul className="space-y-1.5 md:space-y-2 text-gray-700 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 text-xs md:text-sm mt-1" />
                    <span>We collect business information necessary for wholesale transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 text-xs md:text-sm mt-1" />
                    <span>Your data is used to process inquiries, invoices, and payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 text-xs md:text-sm mt-1" />
                    <span>We never sell your personal information to third parties</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'information-collection',
      icon: <FaDatabase className="text-xl md:text-2xl" />,
      title: 'Information We Collect',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'purple',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">We collect several types of information from and about users of our B2B platform, including:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3 md:mb-4">
                <FaBuilding className="text-lg md:text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Business Information</h4>
              <ul className="space-y-1.5 md:space-y-2 text-gray-600 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>Company name and registration number</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>Business address and country</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>Tax ID / VAT number</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>Business type and size</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-3 md:mb-4">
                <FaUserSecret className="text-lg md:text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Contact Information</h4>
              <ul className="space-y-1.5 md:space-y-2 text-gray-600 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <span>Contact person name</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <span>Business email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <span>Phone / WhatsApp number</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <span>Job title / position</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-3 md:mb-4">
                <FaFileContract className="text-lg md:text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Transaction Data</h4>
              <ul className="space-y-1.5 md:space-y-2 text-gray-600 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span>Inquiry history and details</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span>Invoice records</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span>Payment information</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span>Order quantities and preferences</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-3 md:mb-4">
                <FaServer className="text-lg md:text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Technical Data</h4>
              <ul className="space-y-1.5 md:space-y-2 text-gray-600 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>IP address and browser type</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Device information</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Usage data and cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Session information</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'how-we-use',
      icon: <FaEye className="text-xl md:text-2xl" />,
      title: 'How We Use Your Information',
      color: 'from-green-500 to-green-600',
      bgColor: 'green',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">We use the information we collect for various business purposes, including:</p>
          
          <div className="space-y-3 md:space-y-4 mt-4">
            <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                <FaHandshake className="text-base md:text-lg" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">B2B Transaction Processing</h4>
                <p className="text-gray-600 text-xs md:text-sm">To process your inquiries, generate invoices, manage payments, and fulfill wholesale orders.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                <FaEnvelope className="text-base md:text-lg" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Communication</h4>
                <p className="text-gray-600 text-xs md:text-sm">To respond to your inquiries, send quotes, invoice updates, and important account notifications via email or WhatsApp.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                <FaClipboardCheck className="text-base md:text-lg" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Account Management</h4>
                <p className="text-gray-600 text-xs md:text-sm">To manage your B2B account, provide customer support, and verify your business credentials.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                <FaBalanceScale className="text-base md:text-lg" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Legal Compliance</h4>
                <p className="text-gray-600 text-xs md:text-sm">To comply with applicable laws, regulations, and legal processes, and to enforce our terms and conditions.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-sharing',
      icon: <FaShareAlt className="text-xl md:text-2xl" />,
      title: 'Information Sharing & Disclosure',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'orange',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">We may share your information in the following situations:</p>
          
          <div className="grid gap-3 md:gap-4 mt-4">
            <div className="border border-gray-200 rounded-xl p-4 md:p-5 hover:border-orange-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full"></div>
                Service Providers
              </h4>
              <p className="text-gray-600 text-xs md:text-sm">We may share your information with third-party vendors, service providers, and contractors who perform services for us or on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 md:p-5 hover:border-orange-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full"></div>
                Business Transfers
              </h4>
              <p className="text-gray-600 text-xs md:text-sm">If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that business transaction.</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 md:p-5 hover:border-orange-300 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full"></div>
                Legal Requirements
              </h4>
              <p className="text-gray-600 text-xs md:text-sm">We may disclose your information where required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 md:p-5 mt-4">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-500 text-lg md:text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">What We Don't Do</h4>
                <p className="text-gray-600 text-xs md:text-sm">We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      icon: <FaLock className="text-xl md:text-2xl" />,
      title: 'Data Security',
      color: 'from-red-500 to-red-600',
      bgColor: 'red',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-5 rounded-xl">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-3">
                <FaLock className="text-lg md:text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Encryption</h4>
              <p className="text-gray-600 text-xs md:text-sm">All data transmitted between your browser and our servers is encrypted using SSL/TLS technology.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-5 rounded-xl">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-3">
                <FaUserShield className="text-lg md:text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Access Controls</h4>
              <p className="text-gray-600 text-xs md:text-sm">Strict role-based access controls ensure that only authorized personnel can access sensitive data.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-5 rounded-xl">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-3">
                <FaServer className="text-lg md:text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Secure Infrastructure</h4>
              <p className="text-gray-600 text-xs md:text-sm">Our servers are protected by firewalls, intrusion detection systems, and regular security audits.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-5 rounded-xl">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-3">
                <HiOutlineRefresh className="text-lg md:text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Regular Backups</h4>
              <p className="text-gray-600 text-xs md:text-sm">We maintain secure, encrypted backups to prevent data loss and ensure business continuity.</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-5 mt-4">
            <p className="text-yellow-800 text-xs md:text-sm flex items-start gap-2">
              <FaExclamationTriangle className="text-yellow-600 flex-shrink-0 mt-1 text-sm md:text-base" />
              <span>While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</span>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      icon: <FaCookieBite className="text-xl md:text-2xl" />,
      title: 'Cookies & Tracking',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'yellow',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">We use cookies and similar tracking technologies to track activity on our website and hold certain information.</p>
          
          <div className="overflow-x-auto -mx-4 md:mx-0 mt-4">
            <div className="inline-block min-w-full align-middle px-4 md:px-0">
              <table className="min-w-full bg-white border border-gray-200 rounded-xl text-xs md:text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Type</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900">Essential Cookies</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-600">Required for basic site functionality, authentication, and security</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-600">Session / Persistent</td>
                  </tr>
                  <tr>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900">Functional Cookies</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-600">Remember your preferences and settings</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-600">1 year</td>
                  </tr>
                  <tr>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900">Analytics Cookies</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-600">Help us understand how visitors interact with our website</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-600">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-gray-600 text-xs md:text-sm mt-4">
            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, some parts of the website may become inaccessible or not function properly.
          </p>
        </div>
      )
    },
    {
      id: 'your-rights',
      icon: <FaUserLock className="text-xl md:text-2xl" />,
      title: 'Your Rights',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'indigo',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">Depending on your location, you may have the following rights regarding your personal information:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-4">
            <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-indigo-50 rounded-lg">
              <FaCheckCircle className="text-indigo-500 text-base md:text-lg flex-shrink-0" />
              <span className="text-gray-700 text-xs md:text-sm">Right to Access</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-indigo-50 rounded-lg">
              <FaCheckCircle className="text-indigo-500 text-base md:text-lg flex-shrink-0" />
              <span className="text-gray-700 text-xs md:text-sm">Right to Rectification</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-indigo-50 rounded-lg">
              <FaCheckCircle className="text-indigo-500 text-base md:text-lg flex-shrink-0" />
              <span className="text-gray-700 text-xs md:text-sm">Right to Erasure</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-indigo-50 rounded-lg">
              <FaCheckCircle className="text-indigo-500 text-base md:text-lg flex-shrink-0" />
              <span className="text-gray-700 text-xs md:text-sm">Right to Restrict Processing</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-indigo-50 rounded-lg">
              <FaCheckCircle className="text-indigo-500 text-base md:text-lg flex-shrink-0" />
              <span className="text-gray-700 text-xs md:text-sm">Right to Data Portability</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-indigo-50 rounded-lg">
              <FaCheckCircle className="text-indigo-500 text-base md:text-lg flex-shrink-0" />
              <span className="text-gray-700 text-xs md:text-sm">Right to Object</span>
            </div>
          </div>

          <p className="text-gray-600 text-xs md:text-sm mt-4">
            To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
          </p>
        </div>
      )
    },
    {
      id: 'children',
      icon: <FaUserSecret className="text-xl md:text-2xl" />,
      title: 'Children\'s Privacy',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'pink',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">
            Our B2B platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
          </p>
          <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 md:p-5">
            <p className="text-pink-800 text-xs md:text-sm">
              <strong>Note:</strong> This is a business-to-business platform. All users must represent a registered business entity and be at least 18 years of age.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'international',
      icon: <FaGlobe className="text-xl md:text-2xl" />,
      title: 'International Data Transfers',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'teal',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">
            Your information may be transferred to and maintained on servers located outside of your country of residence. We take appropriate safeguards to ensure that your information is protected in accordance with this privacy policy.
          </p>
          <p className="text-sm md:text-base text-gray-700">
            By using our platform, you consent to the transfer of your information to Bangladesh and other countries where our servers and service providers are located.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      icon: <MdUpdate className="text-xl md:text-2xl" />,
      title: 'Changes to This Policy',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'cyan',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">
            We may update our Privacy Policy from time to time. 
          </p>
          <p className="text-sm md:text-base text-gray-700">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      icon: <FaEnvelope className="text-xl md:text-2xl" />,
      title: 'Contact Us',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'orange',
      content: (
        <div className="space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-700">If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl md:rounded-2xl p-5 md:p-8 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <FaBuilding className="text-base md:text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Asian Clothify</h4>
                  <p className="text-gray-600 text-xs md:text-sm">49/10-C, Ground Floor, Genda</p>
                  <p className="text-gray-600 text-xs md:text-sm">Savar, Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <FaEnvelope className="text-sm md:text-base" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900 text-xs md:text-sm">privacy@asianclothify.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <FaPhone className="text-sm md:text-base" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900 text-xs md:text-sm">+880 1305-785685</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-orange-200">
              <p className="text-gray-600 text-center text-xs md:text-sm">
                We typically respond to privacy inquiries within 48 hours.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white mt-16 overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative h-[200px] md:h-[280px] lg:h-[320px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://i.ibb.co.com/6JmNT1nT/Screenshot-2026-03-11-151221.png"
              alt="Privacy Policy"
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
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-4 lg:mb-6 border border-white/20">
                <FaShieldAlt className="text-orange-400 text-sm md:text-base lg:text-xl" />
                <span className="text-white font-medium text-xs md:text-sm">Your Privacy Matters</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-1 md:mb-2 lg:mb-4">
                Privacy{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Policy
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 max-w-2xl">
                How we collect, use, and protect your business information
              </p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* MOBILE MENU BUTTON */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md border border-gray-200"
              >
                <span className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                  <BsFileText className="text-orange-500 text-base" />
                  Policy Sections
                </span>
                {mobileMenuOpen ? <FaTimes className="text-gray-500" /> : <FaBars className="text-gray-500" />}
              </button>
            </div>

            {/* SIDEBAR NAVIGATION - Mobile Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden w-full mb-4"
                  ref={mobileMenuRef}
                >
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                    <nav className="space-y-1 max-h-[400px] overflow-y-auto">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                            activeSection === section.id
                              ? `bg-gradient-to-r ${section.color} text-white shadow-md`
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <span className={`text-sm ${
                            activeSection === section.id ? 'text-white' : `text-${section.bgColor}-500`
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
                    
                    {/* Download Options - Mobile */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Download Policy</p>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-gray-100 rounded-lg text-xs text-gray-700 hover:bg-gray-200 transition-colors">
                          <FaDownload className="text-xs" />
                          PDF
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-gray-100 rounded-lg text-xs text-gray-700 hover:bg-gray-200 transition-colors">
                          <FaDownload className="text-xs" />
                          DOC
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SIDEBAR NAVIGATION - Desktop */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BsFileText className="text-orange-500" />
                  Policy Sections
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

                {/* Download Options - Desktop */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-3">Download Policy</p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                      <FaDownload className="text-xs" />
                      PDF
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                      <FaDownload className="text-xs" />
                      DOC
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg md:shadow-xl border border-gray-200 p-5 md:p-8 lg:p-10">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
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

                {/* Policy Footer */}
                <div className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <FaShieldAlt className="text-white text-xl md:text-2xl" />
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2">We Value Your Trust</h3>
                    <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-4 md:mb-6">
                      At Asian Clothify, protecting your privacy and business information is our priority. 
                      We're committed to transparency and maintaining the confidentiality of our B2B partners.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                      <Link
                        href="/contact"
                        className="px-4 md:px-6 py-2.5 md:py-3 bg-orange-500 text-white rounded-lg md:rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <FaEnvelope />
                        Privacy Questions?
                      </Link>
                      <Link
                        href="/terms"
                        className="px-4 md:px-6 py-2.5 md:py-3 bg-white text-gray-700 rounded-lg md:rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 border border-gray-200 inline-flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <FaGavel />
                        View Terms of Service
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COOKIE CONSENT BANNER */}
        {showCookieConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-3 md:py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
                <div className="flex items-start gap-2 md:gap-3 flex-1">
                  <FaCookieBite className="text-orange-500 text-xl md:text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Cookie Consent</h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      We use cookies to enhance your browsing experience. By clicking "Accept", you consent to our use of cookies.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 md:gap-3 flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={handleCookieAccept}
                    className="flex-1 sm:flex-none px-4 md:px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleCookieDecline}
                    className="flex-1 sm:flex-none px-4 md:px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}