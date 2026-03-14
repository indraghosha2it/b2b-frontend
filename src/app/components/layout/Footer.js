// app/components/layout/Footer.jsx
'use client';

import Link from 'next/link';
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
  FaHeadset
} from 'react-icons/fa';
import { MdVerified, MdEmail } from 'react-icons/md';
import { HiOutlineBadgeCheck } from 'react-icons/hi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Company info from your About page
  const companyInfo = {
    name: "Asian Clothify",
    tagline: "Premium B2B Wholesale Apparel Supplier",
    address: "49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh",
    phone: "01305-785685",
    email: "info@asianclothify.com",
    whatsapp: "8801305785685",
    hours: "Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM",
    social: {
      facebook: "asianclothify",
      instagram: "asianclothify",
      twitter: "AsianclothifyCo"
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
    { name: 'FAQs', href: '/faqs' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Returns Policy', href: '/returns' },
  ];

  const wholesaleFeatures = [
    { icon: <FaBox />, text: 'Low MOQ', desc: 'Starting from 100 pcs' },
    { icon: <FaTruck />, text: 'Global Shipping', desc: 'To 50+ countries' },
    { icon: <FaStar />, text: 'Premium Quality', desc: 'Certified materials' },
    { icon: <FaIndustry />, text: 'Custom Manufacturing', desc: 'Your branding' },
    { icon: <FaShip />, text: 'Bulk Orders', desc: 'Sea & air freight' },
    { icon: <FaHeadset />, text: '24/7 Support', desc: 'Via WhatsApp' },
  ];

  return (
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#1A1A1A' }}>
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E39A65] via-[#FBFFFF] to-[#E39A65]"></div>
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#E39A65] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#884F52] rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 lg:py-10 relative z-10">
        
        {/* Wholesale Features Grid - Enhanced */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {wholesaleFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#E39A65]/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E39A65]/0 to-[#E39A65]/0 group-hover:from-[#E39A65]/5 group-hover:to-[#884F52]/5 rounded-xl transition-all duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-2xl mb-2 text-[#E39A65] group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <span className="text-sm font-semibold text-white mb-1">{feature.text}</span>
                <span className="text-xs text-white/50">{feature.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid - 3 Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-4">
          
          {/* Column 1: Company Info (5 columns) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#E39A65] blur-md opacity-50 rounded-full"></div>
                <img 
                  src="https://i.ibb.co.com/fzkq5JRV/favicon.png"
                  alt="Asian Clothify - B2B Wholesale Apparel"
                  className="h-14 w-auto relative z-10"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#E39A65] to-[#FBFFFF] bg-clip-text text-transparent">
                  {companyInfo.name}
                </h2>
                <p className="text-xs text-white/60">Est. 2018 · Bangladesh</p>
              </div>
            </div>
            
            <p className="text-white/70 text-sm mb-6 leading-relaxed max-w-md">
              {companyInfo.tagline} — Premium wholesale apparel for businesses worldwide. Low MOQ, fast global shipping, and custom manufacturing options.
            </p>

            {/* Verified Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <HiOutlineBadgeCheck className="text-blue-400 text-lg" />
                <span className="text-xs font-medium">Verified Supplier</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <FaShieldAlt className="text-green-400 text-sm" />
                <span className="text-xs font-medium">Trade Assurance</span>
              </div>
            </div>

            {/* Contact Details - Enhanced */}
            <div className="space-y-4 mb-6">
              <motion.a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#E39A65]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/20 transition-colors">
                  <FaMapMarkerAlt className="text-[#E39A65] text-sm" />
                </div>
                <span className="text-sm">{companyInfo.address}</span>
              </motion.a>
              
              <motion.a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#E39A65]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/20 transition-colors">
                  <FaPhone className="text-[#E39A65] text-sm" />
                </div>
                <span className="text-sm">{companyInfo.phone}</span>
              </motion.a>
              
              <motion.a 
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#E39A65]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E39A65]/20 transition-colors">
                  <FaEnvelope className="text-[#E39A65] text-sm" />
                </div>
                <span className="text-sm">{companyInfo.email}</span>
              </motion.a>
              
              <div className="flex items-start gap-3 text-white/70">
                <div className="w-8 h-8 rounded-lg bg-[#E39A65]/10 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-[#E39A65] text-sm" />
                </div>
                <span className="text-sm">{companyInfo.hours}</span>
              </div>
            </div>

         
          </div>

          {/* Column 2: Quick Links & Support (3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Quick Links */}
              <div>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link 
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h4 className="text-sm font-semibold text-white/80 mb-3">Support</h4>
                <ul className="space-y-3">
                  {supportLinks.map((link, index) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link 
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-[#E39A65] transition-colors"></span>
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Links - Enhanced */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white/80 mb-4">Connect With Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: <FaFacebookF />, href: `https://facebook.com/${companyInfo.social.facebook}`, color: '#1877F2' },
                  { icon: <FaInstagram />, href: `https://instagram.com/${companyInfo.social.instagram}`, color: '#E4405F' },
                  { icon: <FaTwitter />, href: `https://twitter.com/${companyInfo.social.twitter}`, color: '#1DA1F2' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:scale-110 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ y: -3 }}
                    style={{ '--social-color': social.color }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${social.color}80 0%, ${social.color} 100%)` }}></div>
                    <span className="relative z-10 text-white/70 group-hover:text-white transition-colors">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
            <div className='mt-8'>
                    <motion.a 
              href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <FaWhatsapp className="text-white text-xl relative z-10" />
              <span className="text-white font-semibold relative z-10">Chat with Team</span>
              <FaArrowRight className="text-white text-sm relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            </div>
           
          </div>

          {/* Column 3: B2B Benefits (4 columns) */}
          <div className="lg:col-span-4">
  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10">
    <h3 className="text-lg font-semibold mb-6 relative inline-block">
      B2B Benefits
      <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#E39A65] to-transparent"></span>
    </h3>

    <div className="space-y-4">
      <motion.div 
        className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#E39A65]/20 transition-all duration-300"
        whileHover={{ x: 5 }}
      >
        <div className="w-10 h-10 rounded-lg bg-[#E39A65]/10 flex items-center justify-center flex-shrink-0">
          <FaBox className="text-[#E39A65]" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white">Low Minimum Order Quantity</h4>
          <p className="text-xs text-white/50">Start with as low as 100 pieces per design</p>
        </div>
      </motion.div>

      <motion.div 
        className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#E39A65]/20 transition-all duration-300"
        whileHover={{ x: 5 }}
      >
        <div className="w-10 h-10 rounded-lg bg-[#E39A65]/10 flex items-center justify-center flex-shrink-0">
          <FaStar className="text-[#E39A65]" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white">Tiered Bulk Pricing</h4>
          <p className="text-xs text-white/50">Better prices for larger quantities</p>
        </div>
      </motion.div>

      {/* <motion.div 
        className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#E39A65]/20 transition-all duration-300"
        whileHover={{ x: 5 }}
      >
        <div className="w-10 h-10 rounded-lg bg-[#E39A65]/10 flex items-center justify-center flex-shrink-0">
          <FaBuilding className="text-[#E39A65]" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white">Custom Manufacturing</h4>
          <p className="text-xs text-white/50">Your branding, labels, and packaging</p>
        </div>
      </motion.div> */}

      <motion.div 
        className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#E39A65]/20 transition-all duration-300"
        whileHover={{ x: 5 }}
      >
        <div className="w-10 h-10 rounded-lg bg-[#E39A65]/10 flex items-center justify-center flex-shrink-0">
          <FaGlobe className="text-[#E39A65]" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white">Global Shipping</h4>
          <p className="text-xs text-white/50">Express, air, and sea freight options</p>
        </div>
      </motion.div>
    </div>

    {/* Trust Badge */}
    <div className="mt-6 pt-6 border-t border-white/10">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">Trusted by 500+ businesses worldwide</span>
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map((star) => (
            <FaStar key={star} className="text-yellow-500 text-xs" />
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm">
              © {currentYear} <span className="text-white/60 font-medium">Asian Clothify</span>. All rights reserved. | B2B Wholesale Clothing Platform
            </p>
            
            {/* Payment Methods - Enhanced */}
            <div className="flex items-center gap-4">
              <span className="text-white/40 text-sm">Accepted Payments:</span>
              <div className="flex gap-2">
                {['Bank Transfer', 'L/C', 'Stripe'].map((method, index) => (
                  <div 
                    key={index}
                    className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-medium text-white/60 border border-white/10 hover:border-[#E39A65]/30 transition-colors"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-xs tracking-wide">
              Asian Clothify — Premium B2B Wholesale Apparel Supplier • Savar, Dhaka, Bangladesh • Serving Global Markets Since 2018
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}