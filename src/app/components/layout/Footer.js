// app/components/layout/Footer.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
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
  FaPaperPlane,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
  FaBuilding,
  FaGlobe,
  FaBox
} from 'react-icons/fa';
import { MdVerified, MdEmail } from 'react-icons/md';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus(null), 3000);
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
    { name: 'Sitemap', href: '/sitemap' },
  ];

  const wholesaleFeatures = [
    { icon: <FaBox />, text: 'Low MOQ' },
    { icon: <FaTruck />, text: 'Global Shipping' },
    { icon: <FaStar />, text: 'Premium Quality' },
    { icon: <FaBuilding />, text: 'B2B Focused' },
    { icon: <FaGlobe />, text: 'Worldwide' },
    { icon: <FaCheckCircle />, text: 'Verified' },
  ];

  return (
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#2A2A2A' }}>
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #E39A65 0%, #FBFFFF 50%, #E39A65 100%)' }}></div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        
        {/* Wholesale Features Bar */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-12">
          {wholesaleFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="text-xl mb-1" style={{ color: '#E39A65' }}>{feature.icon}</div>
              <span className="text-xs font-medium text-white/90">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Main Grid - 3 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Company Info & Contact */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <img 
                src="https://i.ibb.co.com/fzkq5JRV/favicon.png"
                alt="Asian Clothify - B2B Wholesale Apparel"
                className="h-12 w-auto"
                style={{ filter: 'none' }} // Remove white filter to keep original colors
              />
            </Link>
            
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              {companyInfo.tagline} - Premium wholesale apparel for businesses worldwide. Low MOQ, fast global shipping, and custom manufacturing options.
            </p>

            {/* Verified B2B Badge */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 w-fit">
              <MdVerified className="text-blue-400" />
              <span className="text-xs font-medium">Verified B2B Wholesale Supplier</span>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 text-white/80 text-sm mb-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" style={{ color: '#E39A65' }} />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone style={{ color: '#E39A65' }} />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors">
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope style={{ color: '#E39A65' }} />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="mt-1 flex-shrink-0" style={{ color: '#E39A65' }} />
                <span>{companyInfo.hours}</span>
              </div>
            </div>

            {/* WhatsApp Business Button */}
            <a 
              href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              <FaWhatsapp className="text-white text-lg" />
              <span className="text-white font-medium">Chat with Wholesale Team</span>
            </a>
          </div>

          {/* Column 2: Quick Links & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5" style={{ backgroundColor: '#E39A65' }}></span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Quick Links */}
              <div>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <ul className="space-y-2">
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white/90">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href={`https://facebook.com/${companyInfo.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 hover:bg-[#E39A65]"
                >
                  <FaFacebookF className="text-white" />
                </a>
                <a 
                  href={`https://instagram.com/${companyInfo.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 hover:bg-[#E39A65]"
                >
                  <FaInstagram className="text-white" />
                </a>
                <a 
                  href={`https://twitter.com/${companyInfo.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 hover:bg-[#E39A65]"
                >
                  <FaTwitter className="text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter & B2B Benefits */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              B2B Newsletter
              <span className="absolute -bottom-1 left-0 w-8 h-0.5" style={{ backgroundColor: '#E39A65' }}></span>
            </h3>
            
            <p className="text-white/70 text-sm mb-4">
              Subscribe for wholesale updates, bulk deals, and new arrivals
            </p>

            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="relative mb-3">
                <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your business email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:border-[#E39A65] text-white placeholder-white/50 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{ backgroundColor: '#E39A65', color: '#2A2A2A' }}
              >
                <FaPaperPlane className="text-sm" />
                Subscribe to B2B Updates
              </button>
            </form>

            {subscriptionStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-2 rounded-lg text-sm text-center"
              >
                ✓ Successfully subscribed to B2B newsletter!
              </motion.div>
            )}

            {/* B2B Benefits */}
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(227,154,101,0.1)' }}>
              <h4 className="font-semibold mb-2 text-sm">Why B2B with us?</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-xs" style={{ color: '#E39A65' }} />
                  <span>Low MOQ starting from 100 pcs</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-xs" style={{ color: '#E39A65' }} />
                  <span>Bulk pricing tiers available</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-xs" style={{ color: '#E39A65' }} />
                  <span>Custom manufacturing & branding</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-xs" style={{ color: '#E39A65' }} />
                  <span>Global shipping to 50+ countries</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Asian Clothify. All rights reserved. | B2B Wholesale Clothing Platform
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-sm">Accepted Payments:</span>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-white/10 rounded text-xs font-medium">Bank Transfer</div>
                <div className="px-2 py-1 bg-white/10 rounded text-xs font-medium">L/C</div>
                <div className="px-2 py-1 bg-white/10 rounded text-xs font-medium">Stripe</div>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="mt-4 text-center text-white/40 text-xs">
            <p>Asian Clothify - Premium B2B Wholesale Apparel Supplier based in Savar, Dhaka, Bangladesh. Serving global markets with quality clothing since 2018.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}