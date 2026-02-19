// app/about/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaHandshake, 
  FaShippingFast, 
  FaChartLine, 
  FaWhatsapp,
  FaCheckCircle,
  FaGlobe,
  FaUsers,
  FaIndustry,
  FaStar,
  FaShieldAlt,
  FaAward,
  FaRegClock,
  FaRegHeart,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTruck,
  FaClock,
  FaBoxOpen,
  FaStore,
  FaBuilding,
  FaRoad,
  FaBus,
  FaCar
} from 'react-icons/fa';
import { MdVerified, MdSecurity, MdSupportAgent, MdStore, MdDirections } from 'react-icons/md';
import { BsFillShopIcon, BsGeoAltFill } from 'react-icons/bs';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Company info from Facebook
  const companyInfo = {
    name: "Asian Clothify",
    tagline: "Top Clothing Seller in Bangladesh",
    description: "Asian Clothify is a top clothing seller in Bangladesh, offering a wide range of stylish, high-quality apparel. With a focus on craftsmanship, affordability, and modern designs, we proudly serve global markets, delivering elegance and value in every piece.",
    category: "Clothing company · Wholesale and supply shop",
    address: "49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh",
    phone: "01305-785685",
    email: "info@asianclothify.com",
    social: {
      facebook: "asianclothify",
      instagram: "asianclothify",
      twitter: "AsianclothifyCo"
    },
    website: "asia.nclothify"
  };

  // Team members
  const teamMembers = [
    { name: 'Rafiq Ahmed', role: 'Founder & CEO', image: 'https://i.ibb.co.com/team/ceo.jpg', experience: '15+ years' },
    { name: 'Fatima Begum', role: 'Production Head', image: 'https://i.ibb.co.com/team/production.jpg', experience: '12+ years' },
    { name: 'Shahid Khan', role: 'Export Manager', image: 'https://i.ibb.co.com/team/export.jpg', experience: '10+ years' },
    { name: 'Nasrin Akter', role: 'Quality Control', image: 'https://i.ibb.co.com/team/quality.jpg', experience: '8+ years' },
  ];

  // Values
  const values = [
    {
      icon: <FaIndustry className="w-6 h-6" />,
      title: 'Craftsmanship',
      desc: 'Every piece is crafted with attention to detail and quality materials'
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: 'Affordability',
      desc: 'Premium quality at competitive prices for global markets'
    },
    {
      icon: <FaShippingFast className="w-6 h-6" />,
      title: 'Global Reach',
      desc: 'Proudly serving international markets with efficient shipping'
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: 'Modern Designs',
      desc: 'Contemporary styles that keep you ahead of fashion trends'
    },
  ];

  // Stats
  const stats = [
    { value: '8+', label: 'Years in Business', icon: <FaRegClock /> },
    { value: '500+', label: 'Active Clients', icon: <FaUsers /> },
    { value: '50+', label: 'Countries', icon: <FaGlobe /> },
    { value: '15K+', label: 'Orders Shipped', icon: <FaShippingFast /> },
    { value: '98%', label: 'Client Retention', icon: <FaRegHeart /> },
    { value: '⭐ 4.9', label: 'Customer Rating', icon: <FaStar /> },
  ];

  // Alibaba Stats - No years mentioned
  const alibabaStats = [
    { value: 'Gold', label: 'Supplier Status', icon: <FaAward /> },
    { value: '98%', label: 'Response Rate', icon: <FaCheckCircle /> },
    { value: '<2h', label: 'Response Time', icon: <FaClock /> },
    { value: '15K+', label: 'Transactions', icon: <FaBoxOpen /> },
    { value: '4.9', label: 'Seller Rating', icon: <FaStar /> },
    { value: '✓', label: 'Trade Assurance', icon: <FaShieldAlt /> },
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white mt-16" ref={sectionRef}>
      
      {/* HERO SECTION */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070"
            alt="Garment Factory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Company Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <MdVerified className="text-blue-400 text-xl" />
              <span className="text-white font-medium">Top Clothing Seller in Bangladesh</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {companyInfo.name}
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8">
              {companyInfo.tagline} - Offering stylish, high-quality apparel for global markets
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <FaIndustry className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">Premium Quality</p>
                  <p className="text-gray-300 text-sm">Craftsmanship</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <FaGlobe className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">Global Markets</p>
                  <p className="text-gray-300 text-sm">Worldwide Shipping</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* COMPANY INFO SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4 inline-block">
                  ABOUT US
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {companyInfo.name}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {companyInfo.description}
                </p>
                <p className="text-gray-600">
                  {companyInfo.category}
                </p>
              </div>
              
              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-md flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-orange-500 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Visit Us</h4>
                    <p className="text-gray-600">{companyInfo.address}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-md flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-orange-500 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Call Us</h4>
                    <p className="text-gray-600">{companyInfo.phone}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-md flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-orange-500 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Us</h4>
                    <p className="text-gray-600">{companyInfo.email}</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mt-4">
                  <a href={`https://facebook.com/${companyInfo.social.facebook}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <FaFacebook />
                  </a>
                  <a href={`https://instagram.com/${companyInfo.social.instagram}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <FaInstagram />
                  </a>
                  <a href={`https://twitter.com/${companyInfo.social.twitter}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070"
                  alt="Our Facility"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Location Badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl">
                  <p className="font-semibold text-gray-900">📍 Savar, Dhaka</p>
                  <p className="text-sm text-gray-600">Bangladesh</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block">
                <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-2 rounded-full">
                  OUR STORY
                </span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Delivering Elegance & Value{' '}
                <span className="text-orange-500">Worldwide</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Based in Savar, Dhaka, {companyInfo.name} has established itself as a premier clothing 
                seller in Bangladesh, known for offering a wide range of stylish, high-quality apparel 
                to customers around the globe.
              </p>

              <p className="text-gray-600 leading-relaxed">
                With an unwavering focus on craftsmanship, affordability, and modern designs, we take 
                pride in serving international markets. Every piece we create reflects our commitment 
                to elegance and value, ensuring our clients receive nothing but the best.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-orange-500 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Craftsmanship</h4>
                    <p className="text-sm text-gray-600">Attention to detail in every piece</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-orange-500 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Affordability</h4>
                    <p className="text-sm text-gray-600">Premium quality, competitive prices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-orange-500 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Modern Designs</h4>
                    <p className="text-sm text-gray-600">Contemporary fashion trends</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-orange-500 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Global Reach</h4>
                    <p className="text-sm text-gray-600">Serving international markets</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="text-3xl mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-orange-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ALIBABA TRUST SECTION - No years mentioned */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-2 rounded-full">
              🤝 TRUSTED PARTNER
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-4">
              Verified Alibaba Seller
            </h2>
            <p className="text-gray-600">
              We're proud to be a trusted seller on Alibaba.com, serving global buyers with confidence and reliability
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Alibaba Info */}
              <div>
                {/* Alibaba Badge */}
                <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full mb-6">
                  <MdVerified className="text-xl" />
                  <span className="font-semibold">Gold Supplier</span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Trusted Excellence on Alibaba
                </h3>

                <p className="text-gray-600 mb-6">
                  Our partnership with Alibaba.com ensures secure transactions, verified quality, 
                  and trusted service for buyers worldwide. We maintain the highest standards of 
                  professionalism and reliability.
                </p>

                {/* Alibaba Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {alibabaStats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-orange-500 text-xl mb-2">{stat.icon}</div>
                      <div className="font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Trust Features */}
                <ul className="space-y-3 mb-8">
                  {[
                    'Trade Assurance - Your payments are protected',
                    'Onsite Checked - Facility verified by Alibaba',
                    'Quick Response - 98% response rate within 2 hours',
                    '15,000+ Successful Transactions',
                    'Gold Supplier Status'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <FaCheckCircle className="text-orange-500 text-lg flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="https://asianclothltd.m.trustpass.alibaba.com/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Visit Our Alibaba Store</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Right Column - Alibaba Store Preview */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Store Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-orange-500 font-bold text-xl">AC</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Asian Clothify Ltd.</h4>
                          <p className="text-sm text-orange-100">Gold Supplier</p>
                        </div>
                      </div>
                      <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐ 4.9
                      </div>
                    </div>
                  </div>

                  {/* Store Stats */}
                  <div className="grid grid-cols-3 divide-x divide-gray-200 p-4">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">98%</div>
                      <div className="text-xs text-gray-500">Response Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">&lt;2h</div>
                      <div className="text-xs text-gray-500">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">15K+</div>
                      <div className="text-xs text-gray-500">Transactions</div>
                    </div>
                  </div>

                  {/* Products Preview */}
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Featured Products</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[1,2,3].map((item) => (
                        <div key={item} className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-xs text-gray-400">
                          Product
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Trade Assurance</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Onsite Checked</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Quick Responder</span>
                  </div>
                </div>

                {/* Floating Rating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold text-gray-900 ml-1">4.9</span>
                  </div>
                  <p className="text-xs text-gray-500">1,234 reviews</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-2 rounded-full">
              💎 OUR VALUES
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-gray-600">
              These core principles guide every piece we create and every relationship we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED LOCATION SECTION WITH BETTER DESIGN */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-2 rounded-full">
              📍 VISIT OUR FACILITY
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-4">
              Find Us at Savar, Dhaka
            </h2>
            <p className="text-gray-600">
              Come visit our manufacturing facility and showroom - we'd love to meet you!
            </p>
          </div>

          {/* Main Map Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Map Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Our Location</h3>
                    <p className="text-orange-100">Come visit our facility</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <FaClock className="inline mr-2" />
                  Mon-Fri: 9AM - 6PM
                </div>
              </div>
            </div>

            {/* Map and Details Grid */}
            <div className="grid lg:grid-cols-3">
              {/* Map - Takes 2 columns */}
              <div className="lg:col-span-2 h-[450px] relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d116763.38334044382!2d90.2138113824893!3d23.859256251368727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s49%2F10-C%2C%20Ground%20Floor%20%20Genda%2C%20Savar%20%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1771326250091!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
             
              </div>

              {/* Location Details - Enhanced Design */}
              <div className="p-8 bg-gradient-to-br from-orange-50 to-white">
                <div className="space-y-6">
                  {/* Address Card */}
                  <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-500">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaBuilding className="text-orange-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Full Address</p>
                        <p className="font-semibold text-gray-900">49/10-C, Ground Floor</p>
                        <p className="text-gray-700">Genda, Savar</p>
                        <p className="text-gray-700">Dhaka, Bangladesh</p>
                      </div>
                    </div>
                  </div>

              

                  {/* Contact Card */}
                  <div className="bg-white p-5 rounded-xl shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-3">Need Directions?</h4>
                    <p className="flex items-center gap-2 text-gray-700 mb-3">
                      <FaPhone className="text-orange-500 text-sm" />
                      {companyInfo.phone}
                    </p>
                    <Link
                      href={`https://www.google.com/maps/dir/?api=1&destination=49%2F10-C%2C+Genda%2C+Savar%2C+Dhaka%2C+Bangladesh`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <MdDirections className="inline mr-2 text-lg" />
                      Get Directions →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Footer */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaClock className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Weekdays</p>
                    <p className="font-semibold">Mon-Fri: 9AM - 6PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaClock className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Saturday</p>
                    <p className="font-semibold">10AM - 4PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaClock className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sunday</p>
                    <p className="font-semibold text-red-500">Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
        </div>
      </section>

    

      {/* CTA SECTION */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience{' '}
              <span className="text-orange-400">Premium Quality?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of satisfied clients who trust us for stylish, high-quality apparel
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                Browse Products
              </Link>
              
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <FaWhatsapp className="text-green-500 text-xl" />
                Chat on WhatsApp
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-400">
              <span>⚡ Quick Response</span>
              <span>🔒 Secure Payments</span>
              <span>🌍 Global Shipping</span>
              <span>✓ Quality Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <Link
        href="https://wa.me/8801305785685?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp className="text-2xl" />
      </Link>
    </div>
    <Footer />
    </>
  );
}