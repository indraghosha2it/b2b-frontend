

// // app/components/layout/Footer.jsx
// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { 
//   FaFacebookF, 
//   FaInstagram, 
//   FaTwitter, 
//   FaWhatsapp,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaClock,
//   FaTruck,
//   FaShieldAlt,
//   FaStar,
//   FaCheckCircle,
//   FaBuilding,
//   FaGlobe,
//   FaBox,
//   FaArrowRight,
//   FaIndustry,
//   FaShip,
//   FaHeadset,
//   FaPinterest,
//   FaYoutube
// } from 'react-icons/fa';
// import { HiOutlineBadgeCheck } from 'react-icons/hi';

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   const companyInfo = {
//     name: "Asian Clothify",
//     tagline: "Premium B2B Wholesale Apparel Supplier",
//     address: "49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh",
//     phone: "01305-785685",
//     email: "info@asianclothify.com",
//     whatsapp: "8801305785685",
//     hours: "Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM",
//     social: {
//       facebook: "https://www.facebook.com/Asianclothify",
//       instagram: "https://www.instagram.com/asia.nclothify/",
//       twitter: "https://x.com/asianclothify",
//       pinterest: "https://www.pinterest.com/asianclothify/",
//       youtube: "https://www.youtube.com/@AsianclothifyCo",
//     }
//   };

//   const quickLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'About Us', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Blog', href: '/blog' },
//   ];

//   const supportLinks = [
//     { name: 'FAQs', href: '/faqs' },
//     { name: 'Privacy Policy', href: '/privacy' },
//     { name: 'Terms of Service', href: '/terms' },

//   ];

//   const openGmail = (email) => {
//     window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
//   };

//   return (
//     <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#1A1A1A' }}>
//       {/* Top Gradient Bar */}
//       <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#E39A65] via-[#FBFFFF] to-[#E39A65]"></div>
      
//       {/* Decorative Pattern Overlay */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-[#E39A65] rounded-full filter blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#884F52] rounded-full filter blur-3xl"></div>
//       </div>
      
//       {/* Main Footer - Reduced padding for smaller height */}
//       <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
        
//         {/* Main Grid - 4 Columns Layout for large, custom stack for mobile */}
//         <div className="lg:grid lg:grid-cols-4 lg:gap-8 flex flex-col space-y-6 lg:space-y-0 mb-2">
          
//           {/* Row 1 on Mobile: Column 1 - Company Info (full width) */}
//           <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
//             <div className="flex flex-col items-center lg:items-start gap-1 mb-2">
//               <div className="relative mb-1">
//                 <div className="absolute inset-0 rounded-full"></div>
//                 <img 
//                   src="https://i.ibb.co.com/fzkq5JRV/favicon.png"
//                   alt="Asian Clothify"
//                   className="h-12 w-auto relative z-10"
//                 />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold bg-gradient-to-r from-[#E39A65] to-[#FBFFFF] bg-clip-text text-transparent">
//                   {companyInfo.name}
//                 </h2>
//                 <p className="text-xs text-white/60">Est. 2018 · Bangladesh</p>
//               </div>
//             </div>
            
//             <p className="text-white/70 text-xs mb-3 leading-relaxed max-w-xs">
//               {companyInfo.tagline}
//             </p>

//             {/* Verified Badges */}
//             <div className="flex flex-wrap gap-1.5 mb-2 justify-center lg:justify-start">
//               <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
//                 <HiOutlineBadgeCheck className="text-blue-400 text-xs" />
//                 <span className="text-xs font-medium text-white/80">Verified</span>
//               </div>
//               <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
//                 <FaShieldAlt className="text-green-400 text-xs" />
//                 <span className="text-xs font-medium text-white/80">Trade Assurance</span>
//               </div>
//             </div>
//           </div>

//           {/* Row 2 on Mobile: Two columns - Quick Links (left) & Support (right) */}
//           <div className="grid grid-cols-2 gap-4 lg:hidden w-full">
//             {/* Quick Links - Left column on mobile */}
//             <div>
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//                 Quick Links
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {quickLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link 
//                       href={link.href}
//                       className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support - Right column on mobile */}
//             <div>
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//                 Support
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {supportLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link 
//                       href={link.href}
//                       className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Row 3 on Mobile: Contact Us (full width) */}
//           <div className="lg:hidden w-full">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//               Contact Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
//             </h3>
            
//             <div className="space-y-2">
//               <motion.a 
//                 href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-start gap-2 text-white/70 hover:text-[#E39A65] transition-colors group text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
//                   <FaMapMarkerAlt className="text-[#E39A65] text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.address}</span>
//               </motion.a>
              
//               <motion.a 
//                 href={`tel:${companyInfo.phone}`}
//                 className="flex items-center gap-2 text-white/70 hover:text-[#E39A65] transition-colors group text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
//                   <FaPhone className="text-[#E39A65] text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.phone}</span>
//               </motion.a>
              
//               <motion.button 
//                 onClick={() => openGmail(companyInfo.email)}
//                 className="flex items-center gap-2 text-white/70 hover:text-[#E39A65] transition-colors group w-full text-left text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
//                   <FaEnvelope className="text-[#E39A65] text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.email}</span>
//               </motion.button>
              
//               <div className="flex items-start gap-2 text-white/70 text-xs">
//                 <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0">
//                   <FaClock className="text-[#E39A65] text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.hours}</span>
//               </div>
//             </div>
//           </div>

//           {/* Row 4 on Mobile: Connect With Us (full width) */}
//           <div className="lg:hidden w-full">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//               Connect With Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
//             </h3>
            
//             {/* Social Links including WhatsApp */}
//             <div className="flex flex-wrap gap-1.5">
//               {[
//                 { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
//                 { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
//                 { icon: <FaTwitter />, href: companyInfo.social.twitter, label: 'Twitter' },
//                 { icon: <FaPinterest />, href: companyInfo.social.pinterest, label: 'Pinterest' },
//                 { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
//                 { icon: <FaWhatsapp />, href: `https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`, label: 'WhatsApp', target: '_blank', rel: 'noopener noreferrer' },
//                 { icon: <FaEnvelope />, onClick: () => openGmail(companyInfo.email), isButton: true, label: 'Gmail' },
//               ].map((social, index) => (
//                 social.isButton ? (
//                   <motion.button
//                     key={index}
//                     onClick={social.onClick}
//                     className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E39A65]/20 transition-all duration-300 group"
//                     whileHover={{ y: -1 }}
//                     title={social.label}
//                   >
//                     <span className="text-white/70 group-hover:text-[#E39A65] transition-colors text-xs">
//                       {social.icon}
//                     </span>
//                   </motion.button>
//                 ) : (
//                   <motion.a
//                     key={index}
//                     href={social.href}
//                     target={social.target || "_blank"}
//                     rel={social.rel || "noopener noreferrer"}
//                     className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E39A65]/20 transition-all duration-300 group"
//                     whileHover={{ y: -1 }}
//                     title={social.label}
//                   >
//                     <span className="text-white/70 group-hover:text-[#E39A65] transition-colors text-xs">
//                       {social.icon}
//                     </span>
//                   </motion.a>
//                 )
//               ))}
//             </div>
//           </div>

//           {/* Desktop Layout - Large screens (unchanged) */}
//           {/* Column 2: Quick Links (Desktop) */}
//           <div className="hidden lg:block">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//               Quick Links
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
//             </h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link 
//                     href={link.href}
//                     className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                   >
//                     <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3: Support & Connect With Us (Desktop) - NO GAP */}
//           <div className="hidden lg:block">
//             {/* Support Links */}
//             <div>
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//                 Support
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {supportLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link 
//                       href={link.href}
//                       className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Connect With Us - Immediately after Support with no gap */}
//             <div className="mt-0 pt-0">
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//                 Connect With Us
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
//               </h3>
              
//               {/* Social Links including WhatsApp */}
//               <div className="flex flex-wrap gap-1.5">
//                 {[
//                   { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
//                   { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
//                   { icon: <FaTwitter />, href: companyInfo.social.twitter, label: 'Twitter' },
//                   { icon: <FaPinterest />, href: companyInfo.social.pinterest, label: 'Pinterest' },
//                   { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
//                   { icon: <FaWhatsapp />, href: `https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`, label: 'WhatsApp', target: '_blank', rel: 'noopener noreferrer' },
//                   { icon: <FaEnvelope />, onClick: () => openGmail(companyInfo.email), isButton: true, label: 'Gmail' },
//                 ].map((social, index) => (
//                   social.isButton ? (
//                     <motion.button
//                       key={index}
//                       onClick={social.onClick}
//                       className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E39A65]/20 transition-all duration-300 group"
//                       whileHover={{ y: -1 }}
//                       title={social.label}
//                     >
//                       <span className="text-white/70 group-hover:text-[#E39A65] transition-colors text-xs">
//                         {social.icon}
//                       </span>
//                     </motion.button>
//                   ) : (
//                     <motion.a
//                       key={index}
//                       href={social.href}
//                       target={social.target || "_blank"}
//                       rel={social.rel || "noopener noreferrer"}
//                       className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E39A65]/20 transition-all duration-300 group"
//                       whileHover={{ y: -1 }}
//                       title={social.label}
//                     >
//                       <span className="text-white/70 group-hover:text-[#E39A65] transition-colors text-xs">
//                         {social.icon}
//                       </span>
//                     </motion.a>
//                   )
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Column 4: Contact Us (Desktop) */}
//           <div className="hidden lg:block">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//               Contact Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
//             </h3>
            
//             <div className="space-y-2">
//               <motion.a 
//                 href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-start gap-2 text-white/70 hover:text-[#E39A65] transition-colors group text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
//                   <FaMapMarkerAlt className="text-[#E39A65] text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.address}</span>
//               </motion.a>
              
//               <motion.a 
//                 href={`tel:${companyInfo.phone}`}
//                 className="flex items-center gap-2 text-white/70 hover:text-[#E39A65] transition-colors group text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
//                   <FaPhone className="text-[#E39A65] text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.phone}</span>
//               </motion.a>
              
//               <motion.button 
//                 onClick={() => openGmail(companyInfo.email)}
//                 className="flex items-center gap-2 text-white/70 hover:text-[#E39A65] transition-colors group w-full text-left text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
//                   <FaEnvelope className="text-[#E39A65] text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.email}</span>
//               </motion.button>
              
//               <div className="flex items-start gap-2 text-white/70 text-xs">
//                 <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0">
//                   <FaClock className="text-[#E39A65] text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.hours}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar - More compact */}
//         <div className="pt-3 mt-1 border-t border-white/10">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
//             <p className="text-white/40 text-xs">
//               © {currentYear} <span className="text-white/60 font-medium">Asian Clothify</span>. All rights reserved.
//             </p>
            
//             {/* Payment Methods - Compact */}
//             <div className="flex items-center gap-2">
//               <span className="text-white/40 text-xs">Payments:</span>
//               <div className="flex gap-1">
//                 {['Bank Transfer', 'L/C', 'Stripe'].map((method) => (
//                   <div 
//                     key={method}
//                     className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-medium text-white/60 border border-white/20"
//                   >
//                     {method}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


// app/components/layout/Footer.jsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
  FaBuilding,
  FaGlobe,
  FaBox,
  FaArrowRight,
  FaIndustry,
  FaShip,
  FaHeadset,
  FaPinterest,
  FaYoutube
} from 'react-icons/fa';
import { HiOutlineBadgeCheck } from 'react-icons/hi';

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const companyInfo = {
    name: "Asian Clothify",
    tagline: "Premium B2B Wholesale Apparel Supplier",
    address: "49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh",
    phone: "01305-785685",
    email: "info@asianclothify.com",
    whatsapp: "8801305785685",
    hours: "Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM",
    social: {
      facebook: "https://www.facebook.com/Asianclothify",
      instagram: "https://www.instagram.com/asian.clothify/",
      twitter: "https://x.com/asianclothify",
      pinterest: "https://www.pinterest.com/asianclothify/",
      youtube: "https://www.youtube.com/@AsianclothifyCo",
    }
  };

  // Handle FAQ click with smooth scroll
  const handleFaqClick = (e) => {
    e.preventDefault();
    
    // Check if we're already on the contact page
    if (window.location.pathname === '/contact') {
      // Scroll to FAQ section on current page
      const faqSection = document.getElementById('faq-section');
      if (faqSection) {
        const offset = 100;
        const elementPosition = faqSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to contact page with hash
      router.push('/contact#faq-section');
      
      // Small delay to ensure page loads before scrolling
      setTimeout(() => {
        const faqSection = document.getElementById('faq-section');
        if (faqSection) {
          const offset = 100;
          const elementPosition = faqSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  const supportLinks = [
    { name: 'FAQs', onClick: handleFaqClick, isButton: true },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const openGmail = (email) => {
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  };

  return (
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#1A1A1A' }}>
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#E39A65] via-[#FBFFFF] to-[#E39A65]"></div>
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#E39A65] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#884F52] rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Main Footer - Reduced padding for smaller height */}
      <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
        
        {/* Main Grid - 4 Columns Layout for large, custom stack for mobile */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 flex flex-col space-y-6 lg:space-y-0 mb-2">
          
          {/* Row 1 on Mobile: Column 1 - Company Info (full width) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <div className="flex flex-col items-center lg:items-start gap-1 mb-2">
              <div className="relative mb-1">
                <div className="absolute inset-0 rounded-full"></div>
                <img 
                  src="https://i.ibb.co.com/fzkq5JRV/favicon.png"
                  alt="Asian Clothify"
                  className="h-12 w-auto relative z-10"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#E39A65] to-[#FBFFFF] bg-clip-text text-transparent">
                  {companyInfo.name}
                </h2>
                <p className="text-xs text-white/60">Est. 2018 · Bangladesh</p>
              </div>
            </div>
            
            <p className="text-white/70 text-xs mb-3 leading-relaxed max-w-xs">
              {companyInfo.tagline}
            </p>

            {/* Verified Badges */}
            <div className="flex flex-wrap gap-1.5 mb-2 justify-center lg:justify-start">
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
                <HiOutlineBadgeCheck className="text-blue-400 text-xs" />
                <span className="text-xs font-medium text-white/80">Verified</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
                <FaShieldAlt className="text-green-400 text-xs" />
                <span className="text-xs font-medium text-white/80">Trade Assurance</span>
              </div>
            </div>
          </div>

          {/* Row 2 on Mobile: Two columns - Quick Links (left) & Support (right) */}
          <div className="grid grid-cols-2 gap-4 lg:hidden w-full">
            {/* Quick Links - Left column on mobile */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support - Right column on mobile */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    {link.isButton ? (
                      <button
                        onClick={link.onClick}
                        className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group w-full text-left"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
                        {link.name}
                      </button>
                    ) : (
                      <Link 
                        href={link.href}
                        className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 3 on Mobile: Contact Us (full width) */}
          <div className="lg:hidden w-full">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
            </h3>
            
            <div className="space-y-2">
              <motion.a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/70 hover:text-[#E39A65] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
                  <FaMapMarkerAlt className="text-[#E39A65] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.address}</span>
              </motion.a>
              
              <motion.a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-white/70 hover:text-[#E39A65] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
                  <FaPhone className="text-[#E39A65] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.phone}</span>
              </motion.a>
              
              <motion.button 
                onClick={() => openGmail(companyInfo.email)}
                className="flex items-center gap-2 text-white/70 hover:text-[#E39A65] transition-colors group w-full text-left text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
                  <FaEnvelope className="text-[#E39A65] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.email}</span>
              </motion.button>
              
              <div className="flex items-start gap-2 text-white/70 text-xs">
                <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-[#E39A65] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.hours}</span>
              </div>
            </div>
          </div>

          {/* Row 4 on Mobile: Connect With Us (full width) */}
          <div className="lg:hidden w-full">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Connect With Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
            </h3>
            
            {/* Social Links including WhatsApp */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
                { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
                { icon: <FaTwitter />, href: companyInfo.social.twitter, label: 'Twitter' },
                { icon: <FaPinterest />, href: companyInfo.social.pinterest, label: 'Pinterest' },
                { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
                { icon: <FaWhatsapp />, href: `https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`, label: 'WhatsApp', target: '_blank', rel: 'noopener noreferrer' },
                { icon: <FaEnvelope />, onClick: () => openGmail(companyInfo.email), isButton: true, label: 'Gmail' },
              ].map((social, index) => (
                social.isButton ? (
                  <motion.button
                    key={index}
                    onClick={social.onClick}
                    className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E39A65]/20 transition-all duration-300 group"
                    whileHover={{ y: -1 }}
                    title={social.label}
                  >
                    <span className="text-white/70 group-hover:text-[#E39A65] transition-colors text-xs">
                      {social.icon}
                    </span>
                  </motion.button>
                ) : (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.target || "_blank"}
                    rel={social.rel || "noopener noreferrer"}
                    className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E39A65]/20 transition-all duration-300 group"
                    whileHover={{ y: -1 }}
                    title={social.label}
                  >
                    <span className="text-white/70 group-hover:text-[#E39A65] transition-colors text-xs">
                      {social.icon}
                    </span>
                  </motion.a>
                )
              ))}
            </div>
          </div>

          {/* Desktop Layout - Large screens (unchanged) */}
          {/* Column 2: Quick Links (Desktop) */}
          <div className="hidden lg:block">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support & Connect With Us (Desktop) - NO GAP */}
          <div className="hidden lg:block">
            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    {link.isButton ? (
                      <button
                        onClick={link.onClick}
                        className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group w-full text-left"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
                        {link.name}
                      </button>
                    ) : (
                      <Link 
                        href={link.href}
                        className="text-white/60 hover:text-[#E39A65] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us - Immediately after Support with no gap */}
            <div className="mt-0 pt-0">
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Connect With Us
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
              </h3>
              
              {/* Social Links including WhatsApp */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
                  { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
                  { icon: <FaTwitter />, href: companyInfo.social.twitter, label: 'Twitter' },
                  { icon: <FaPinterest />, href: companyInfo.social.pinterest, label: 'Pinterest' },
                  { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
                  { icon: <FaWhatsapp />, href: `https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`, label: 'WhatsApp', target: '_blank', rel: 'noopener noreferrer' },
                  { icon: <FaEnvelope />, onClick: () => openGmail(companyInfo.email), isButton: true, label: 'Gmail' },
                ].map((social, index) => (
                  social.isButton ? (
                    <motion.button
                      key={index}
                      onClick={social.onClick}
                      className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E39A65]/20 transition-all duration-300 group"
                      whileHover={{ y: -1 }}
                      title={social.label}
                    >
                      <span className="text-white/70 group-hover:text-[#E39A65] transition-colors text-xs">
                        {social.icon}
                      </span>
                    </motion.button>
                  ) : (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={social.target || "_blank"}
                      rel={social.rel || "noopener noreferrer"}
                      className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E39A65]/20 transition-all duration-300 group"
                      whileHover={{ y: -1 }}
                      title={social.label}
                    >
                      <span className="text-white/70 group-hover:text-[#E39A65] transition-colors text-xs">
                        {social.icon}
                      </span>
                    </motion.a>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Contact Us (Desktop) */}
          <div className="hidden lg:block">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
            </h3>
            
            <div className="space-y-2">
              <motion.a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/70 hover:text-[#E39A65] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
                  <FaMapMarkerAlt className="text-[#E39A65] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.address}</span>
              </motion.a>
              
              <motion.a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-white/70 hover:text-[#E39A65] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
                  <FaPhone className="text-[#E39A65] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.phone}</span>
              </motion.a>
              
              <motion.button 
                onClick={() => openGmail(companyInfo.email)}
                className="flex items-center gap-2 text-white/70 hover:text-[#E39A65] transition-colors group w-full text-left text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/30 transition-colors">
                  <FaEnvelope className="text-[#E39A65] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.email}</span>
              </motion.button>
              
              <div className="flex items-start gap-2 text-white/70 text-xs">
                <div className="w-5 h-5 rounded-lg bg-[#E39A65]/20 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-[#E39A65] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - More compact */}
        <div className="pt-3 mt-1 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
            <p className="text-white/40 text-xs">
              © {currentYear} <span className="text-white/60 font-medium">Asian Clothify</span>. All rights reserved.
            </p>
            
            {/* Payment Methods - Compact */}
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">Payments:</span>
              <div className="flex gap-1">
                {['Bank Transfer', 'L/C', 'Stripe'].map((method) => (
                  <div 
                    key={method}
                    className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-medium text-white/60 border border-white/20"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}