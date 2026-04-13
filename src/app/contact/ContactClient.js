// app/contact/page.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGlobe,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaHeadset,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaRegClock,
  FaBuilding,
  FaUser,
  FaComment,
  FaBox,
  FaQuestionCircle,
  FaInfoCircle
} from 'react-icons/fa';
import { MdVerified, MdSupportAgent, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import WhatsAppButton from '../components/layout/WhatsAppButton';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    inquiryType: 'wholesale',
    message: '',
    productInterest: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [customInquiryText, setCustomInquiryText] = useState('');
const [showCustomInquiryField, setShowCustomInquiryField] = useState(false);


// Add this useEffect in your contact page component
useEffect(() => {
  // Check if URL has #inquiry-form hash
  if (window.location.hash === '#inquiry-form') {
    const formElement = document.getElementById('inquiry-form');
    if (formElement) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        // Get the top position of the form element
        const elementPosition = formElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset from top
        
        // Scroll to the form start with offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Optional: highlight the form header
        const formHeader = formElement.querySelector('.form-header') || formElement;
        formHeader.classList.add('ring-4', 'ring-[#E39A65]/20', 'transition-all', 'duration-1000');
        setTimeout(() => {
          formHeader.classList.remove('ring-4', 'ring-[#E39A65]/20');
        }, 2000);
      }, 100);
    }
  }
}, []);

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

  // Company contact info from Facebook
  const companyInfo = {
    name: "Asian Clothify",
    address: "49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh",
    phone: "01305-785685",
    phoneInternational: "+8801305-785685",
    email: "info@asianclothify.com",
    whatsapp: "8801305785685",
    website: "asianclothify.com",
    social: {
      facebook: "asianclothify",
      instagram: "asianclothify",
      twitter: "AsianclothifyCo",
      alibaba: "asianclothltd.trustpass.alibaba.com"
    },
    hours: {
      weekday: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    }
  };

  // Department contacts
  const departments = [
    {
      name: 'Sales & Inquiries',
      email: 'sales@asianclothify.com',
      phone: '01305-785685',
      
      icon: <FaBox />
    },
    {
      name: 'Customer Support',
      email: 'support@asianclothify.com',
      phone: '01305-785686',
     
      icon: <FaHeadset />
    },
    {
      name: 'Export & Shipping',
      email: 'export@asianclothify.com',
      phone: '01305-785687',
   
      icon: <FaTruck />
    },
    {
      name: 'Quality Control',
      email: 'quality@asianclothify.com',
      phone: '01305-785688',
   
      icon: <FaShieldAlt />
    }
  ];

  // FAQ items
  const faqs = [
    {
      question: "How can I place a bulk order?",
      answer: "You can browse our products, add items to inquiry cart, and submit your requirements. Our sales team will respond within 2 hours with pricing and MOQ details."
    },
    {
      question: "What is your minimum order quantity (MOQ)?",
      answer: "MOQ varies by product, typically starting from 100-300 pieces per design. You can see specific MOQ on each product page."
    },
    {
      question: "Do you offer custom branding?",
      answer: "Yes! We provide custom branding services including logo printing, label attachment, and custom packaging. Share your requirements in the inquiry form."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, Letter of Credit (L/C), and online payments via Stripe for verified buyers."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by destination: 3-5 days for local (Bangladesh), 7-15 days for international express, 20-35 days for sea freight."
    },
    {
      question: "Can I get samples before bulk order?",
      answer: "Yes, sample orders are available. Sample cost is applicable but refundable on bulk order placement."
    }
  ];

// In your ContactClient component, add a new state for custom inquiry type:



// Update handleInputChange to handle custom inquiry text:
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
  
  // Show/hide custom inquiry field based on selection
  if (name === 'inquiryType') {
    setShowCustomInquiryField(value === 'other');
    if (value !== 'other') {
      setCustomInquiryText('');
    }
  }
};

// Handle custom inquiry text change
const handleCustomInquiryChange = (e) => {
  setCustomInquiryText(e.target.value);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Determine the final inquiry type value
  let finalInquiryType = formData.inquiryType;
  if (formData.inquiryType === 'other' && customInquiryText.trim()) {
    finalInquiryType = customInquiryText.trim();
  }
  
  setFormStatus({ submitted: true, success: false, message: 'Sending...' });

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        country: formData.country,
        inquiryType: finalInquiryType, // Send custom text if "other" was selected
        message: formData.message,
        productInterest: formData.productInterest
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send message');
    }

    setFormStatus({
      submitted: true,
      success: true,
      message: data.message || 'Thank you! Your inquiry has been sent. We\'ll contact you within 2 hours.'
    });
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      country: '',
      inquiryType: 'wholesale',
      message: '',
      productInterest: ''
    });
    setCustomInquiryText('');
    setShowCustomInquiryField(false);

  } catch (error) {
    console.error('Contact form error:', error);
    setFormStatus({
      submitted: true,
      success: false,
      message: error.message || 'Failed to send message. Please try again.'
    });
  }
};

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white mt-16" ref={sectionRef}>
        {/* HERO SECTION - Responsive */}
        <section className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex items-center container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl lg:max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 border border-white/20">
                <MdSupportAgent className="text-orange-400 text-base sm:text-xl" />
                <span className="text-white font-medium text-xs sm:text-sm">Get in Touch</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">
                Contact{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  {companyInfo.name}
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-4 sm:mb-6 lg:mb-8 max-w-lg lg:max-w-xl">
                Have questions about wholesale orders, pricing, or custom manufacturing? We're here to help!
              </p>

              {/* Response Time Badge - Responsive */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 w-fit">
                <FaRegClock className="text-orange-400 text-sm sm:text-base" />
                <span className="text-white text-xs sm:text-sm">Average response time: </span>
                <span className="bg-orange-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                  &lt; 2 hours
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUICK CONTACT CARDS - Responsive Grid */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 -mt-16 sm:-mt-20 relative z-20">
              {/* WhatsApp Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center text-green-600 mb-3 sm:mb-4 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <FaWhatsapp className="text-lg sm:text-xl md:text-2xl" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">WhatsApp</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">Quickest way to reach us</p>
                <Link
                  href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 sm:gap-2 text-green-600 font-semibold hover:text-green-700 text-xs sm:text-sm"
                >
                  <span>Chat Now</span>
                  <span>→</span>
                </Link>
              </motion.div>
{/* Phone Card */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
>
  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center text-blue-600 mb-3 sm:mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
    <FaPhone className="text-lg sm:text-xl md:text-2xl" />
  </div>
  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Phone</h3>
  <a 
    href={`tel:${companyInfo.phone}`}
    className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors block mb-1 sm:mb-2 break-words"
  >
    {companyInfo.phone}
  </a>
  <p className="text-[10px] sm:text-xs text-gray-500">Mon-Fri, 9AM-6PM</p>
</motion.div>

{/* Email Card */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
>
  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center text-orange-600 mb-3 sm:mb-4 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
    <FaEnvelope className="text-lg sm:text-xl md:text-2xl" />
  </div>
  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Email</h3>
  <button 
    onClick={() => window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${companyInfo.email}`}
    className="text-xs sm:text-sm text-gray-600 hover:text-orange-600 transition-colors block mb-1 sm:mb-2 break-words text-left w-full"
  >
    {companyInfo.email}
  </button>
  <p className="text-[10px] sm:text-xs text-gray-500">24/7 Support</p>
</motion.div>

              {/* Visit Card */}
             {/* Visit Card */}
{/* Visit Card */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
>
  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center text-purple-600 mb-3 sm:mb-4 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
    <FaMapMarkerAlt className="text-lg sm:text-xl md:text-2xl" />
  </div>
  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Visit Us</h3>
  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-2">{companyInfo.address}</p>
  <motion.a
    href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 sm:gap-2 text-purple-600 font-semibold hover:text-purple-700 text-xs sm:text-sm"
    whileHover={{ x: 2 }}
  >
    <span>Get Directions</span>
    <span>→</span>
  </motion.a>
</motion.div>
            </div>
          </div>
        </section>

     {/* MAIN CONTACT SECTION - Responsive - FIXED */}
<section className="py-12 sm:py-16 bg-gray-50 overflow-x-hidden">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
      {/* Contact Form - Responsive */}
      <motion.div
       id="inquiry-form"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-full overflow-hidden"
      >
        <div className="mb-4 sm:mb-6 md:mb-8">
          <span className="bg-orange-100 text-orange-600 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 inline-block">
            📝 SEND INQUIRY
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Tell Us Your Requirements
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Fill out the form below and we'll get back to you within 2 hours
          </p>
        </div>

        {formStatus.submitted && formStatus.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center w-full"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaCheckCircle className="text-green-500 text-xl sm:text-2xl md:text-3xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Thank You!</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{formStatus.message}</p>
            <button
              onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
              className="text-orange-600 font-semibold hover:text-orange-700 text-xs sm:text-sm"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="w-full">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative w-full">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm z-10" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Email <span className="text-orange-500">*</span>
                </label>
                <div className="relative w-full">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm z-10" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="w-full">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Phone / WhatsApp <span className="text-orange-500">*</span>
                </label>
                <div className="relative w-full">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm z-10" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="+880 1305-785685"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Company Name
                </label>
                <div className="relative w-full">
                  <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm z-10" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your Company"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
  <div className="w-full">
    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
      Country
    </label>
    <select
      name="country"
      value={formData.country}
      onChange={handleInputChange}
      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
    >
      <option value="">Select Country</option>
      <option value="Afghanistan">Afghanistan</option>
      <option value="Albania">Albania</option>
      <option value="Algeria">Algeria</option>
      <option value="Andorra">Andorra</option>
      <option value="Angola">Angola</option>
      <option value="Antigua and Barbuda">Antigua and Barbuda</option>
      <option value="Argentina">Argentina</option>
      <option value="Armenia">Armenia</option>
      <option value="Australia">Australia</option>
      <option value="Austria">Austria</option>
      <option value="Azerbaijan">Azerbaijan</option>
      <option value="Bahamas">Bahamas</option>
      <option value="Bahrain">Bahrain</option>
      <option value="Bangladesh">Bangladesh</option>
      <option value="Barbados">Barbados</option>
      <option value="Belarus">Belarus</option>
      <option value="Belgium">Belgium</option>
      <option value="Belize">Belize</option>
      <option value="Benin">Benin</option>
      <option value="Bhutan">Bhutan</option>
      <option value="Bolivia">Bolivia</option>
      <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
      <option value="Botswana">Botswana</option>
      <option value="Brazil">Brazil</option>
      <option value="Brunei">Brunei</option>
      <option value="Bulgaria">Bulgaria</option>
      <option value="Burkina Faso">Burkina Faso</option>
      <option value="Burundi">Burundi</option>
      <option value="Cabo Verde">Cabo Verde</option>
      <option value="Cambodia">Cambodia</option>
      <option value="Cameroon">Cameroon</option>
      <option value="Canada">Canada</option>
      <option value="Central African Republic">Central African Republic</option>
      <option value="Chad">Chad</option>
      <option value="Chile">Chile</option>
      <option value="China">China</option>
      <option value="Colombia">Colombia</option>
      <option value="Comoros">Comoros</option>
      <option value="Congo">Congo</option>
      <option value="Costa Rica">Costa Rica</option>
      <option value="Côte d'Ivoire">Côte d'Ivoire</option>
      <option value="Croatia">Croatia</option>
      <option value="Cuba">Cuba</option>
      <option value="Cyprus">Cyprus</option>
      <option value="Czech Republic">Czech Republic</option>
      <option value="Denmark">Denmark</option>
      <option value="Djibouti">Djibouti</option>
      <option value="Dominica">Dominica</option>
      <option value="Dominican Republic">Dominican Republic</option>
      <option value="Ecuador">Ecuador</option>
      <option value="Egypt">Egypt</option>
      <option value="El Salvador">El Salvador</option>
      <option value="Equatorial Guinea">Equatorial Guinea</option>
      <option value="Eritrea">Eritrea</option>
      <option value="Estonia">Estonia</option>
      <option value="Eswatini">Eswatini</option>
      <option value="Ethiopia">Ethiopia</option>
      <option value="Fiji">Fiji</option>
      <option value="Finland">Finland</option>
      <option value="France">France</option>
      <option value="Gabon">Gabon</option>
      <option value="Gambia">Gambia</option>
      <option value="Georgia">Georgia</option>
      <option value="Germany">Germany</option>
      <option value="Ghana">Ghana</option>
      <option value="Greece">Greece</option>
      <option value="Grenada">Grenada</option>
      <option value="Guatemala">Guatemala</option>
      <option value="Guinea">Guinea</option>
      <option value="Guinea-Bissau">Guinea-Bissau</option>
      <option value="Guyana">Guyana</option>
      <option value="Haiti">Haiti</option>
      <option value="Honduras">Honduras</option>
      <option value="Hungary">Hungary</option>
      <option value="Iceland">Iceland</option>
      <option value="India">India</option>
      <option value="Indonesia">Indonesia</option>
      <option value="Iran">Iran</option>
      <option value="Iraq">Iraq</option>
      <option value="Ireland">Ireland</option>
      <option value="Israel">Israel</option>
      <option value="Italy">Italy</option>
      <option value="Jamaica">Jamaica</option>
      <option value="Japan">Japan</option>
      <option value="Jordan">Jordan</option>
      <option value="Kazakhstan">Kazakhstan</option>
      <option value="Kenya">Kenya</option>
      <option value="Kiribati">Kiribati</option>
      <option value="Korea, North">Korea, North</option>
      <option value="Korea, South">Korea, South</option>
      <option value="Kosovo">Kosovo</option>
      <option value="Kuwait">Kuwait</option>
      <option value="Kyrgyzstan">Kyrgyzstan</option>
      <option value="Laos">Laos</option>
      <option value="Latvia">Latvia</option>
      <option value="Lebanon">Lebanon</option>
      <option value="Lesotho">Lesotho</option>
      <option value="Liberia">Liberia</option>
      <option value="Libya">Libya</option>
      <option value="Liechtenstein">Liechtenstein</option>
      <option value="Lithuania">Lithuania</option>
      <option value="Luxembourg">Luxembourg</option>
      <option value="Madagascar">Madagascar</option>
      <option value="Malawi">Malawi</option>
      <option value="Malaysia">Malaysia</option>
      <option value="Maldives">Maldives</option>
      <option value="Mali">Mali</option>
      <option value="Malta">Malta</option>
      <option value="Marshall Islands">Marshall Islands</option>
      <option value="Mauritania">Mauritania</option>
      <option value="Mauritius">Mauritius</option>
      <option value="Mexico">Mexico</option>
      <option value="Micronesia">Micronesia</option>
      <option value="Moldova">Moldova</option>
      <option value="Monaco">Monaco</option>
      <option value="Mongolia">Mongolia</option>
      <option value="Montenegro">Montenegro</option>
      <option value="Morocco">Morocco</option>
      <option value="Mozambique">Mozambique</option>
      <option value="Myanmar">Myanmar</option>
      <option value="Namibia">Namibia</option>
      <option value="Nauru">Nauru</option>
      <option value="Nepal">Nepal</option>
      <option value="Netherlands">Netherlands</option>
      <option value="New Zealand">New Zealand</option>
      <option value="Nicaragua">Nicaragua</option>
      <option value="Niger">Niger</option>
      <option value="Nigeria">Nigeria</option>
      <option value="North Macedonia">North Macedonia</option>
      <option value="Norway">Norway</option>
      <option value="Oman">Oman</option>
      <option value="Pakistan">Pakistan</option>
      <option value="Palau">Palau</option>
      <option value="Palestine">Palestine</option>
      <option value="Panama">Panama</option>
      <option value="Papua New Guinea">Papua New Guinea</option>
      <option value="Paraguay">Paraguay</option>
      <option value="Peru">Peru</option>
      <option value="Philippines">Philippines</option>
      <option value="Poland">Poland</option>
      <option value="Portugal">Portugal</option>
      <option value="Qatar">Qatar</option>
      <option value="Romania">Romania</option>
      <option value="Russia">Russia</option>
      <option value="Rwanda">Rwanda</option>
      <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
      <option value="Saint Lucia">Saint Lucia</option>
      <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
      <option value="Samoa">Samoa</option>
      <option value="San Marino">San Marino</option>
      <option value="Sao Tome and Principe">Sao Tome and Principe</option>
      <option value="Saudi Arabia">Saudi Arabia</option>
      <option value="Senegal">Senegal</option>
      <option value="Serbia">Serbia</option>
      <option value="Seychelles">Seychelles</option>
      <option value="Sierra Leone">Sierra Leone</option>
      <option value="Singapore">Singapore</option>
      <option value="Slovakia">Slovakia</option>
      <option value="Slovenia">Slovenia</option>
      <option value="Solomon Islands">Solomon Islands</option>
      <option value="Somalia">Somalia</option>
      <option value="South Africa">South Africa</option>
      <option value="South Sudan">South Sudan</option>
      <option value="Spain">Spain</option>
      <option value="Sri Lanka">Sri Lanka</option>
      <option value="Sudan">Sudan</option>
      <option value="Suriname">Suriname</option>
      <option value="Sweden">Sweden</option>
      <option value="Switzerland">Switzerland</option>
      <option value="Syria">Syria</option>
      <option value="Taiwan">Taiwan</option>
      <option value="Tajikistan">Tajikistan</option>
      <option value="Tanzania">Tanzania</option>
      <option value="Thailand">Thailand</option>
      <option value="Timor-Leste">Timor-Leste</option>
      <option value="Togo">Togo</option>
      <option value="Tonga">Tonga</option>
      <option value="Trinidad and Tobago">Trinidad and Tobago</option>
      <option value="Tunisia">Tunisia</option>
      <option value="Turkey">Turkey</option>
      <option value="Turkmenistan">Turkmenistan</option>
      <option value="Tuvalu">Tuvalu</option>
      <option value="Uganda">Uganda</option>
      <option value="Ukraine">Ukraine</option>
      <option value="United Arab Emirates">United Arab Emirates</option>
      <option value="United Kingdom">United Kingdom</option>
      <option value="United States">United States</option>
      <option value="Uruguay">Uruguay</option>
      <option value="Uzbekistan">Uzbekistan</option>
      <option value="Vanuatu">Vanuatu</option>
      <option value="Vatican City">Vatican City</option>
      <option value="Venezuela">Venezuela</option>
      <option value="Vietnam">Vietnam</option>
      <option value="Yemen">Yemen</option>
      <option value="Zambia">Zambia</option>
      <option value="Zimbabwe">Zimbabwe</option>
    </select>
  </div>

 <div className="w-full">
  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
    Inquiry Type
  </label>
  <select
    name="inquiryType"
    value={formData.inquiryType}
    onChange={handleInputChange}
    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
  >
    <option value="wholesale">Wholesale Inquiry</option>
    <option value="custom">Custom Manufacturing</option>
    <option value="sample">Sample Request</option>
    <option value="partnership">Partnership</option>
    <option value="other">Other</option>
  </select>
</div>

{/* Custom Inquiry Text Field - Shows only when "Other" is selected */}
{showCustomInquiryField && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
      Please specify your inquiry type <span className="text-orange-500">*</span>
    </label>
    <div className="relative w-full">
      <FaQuestionCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm z-10" />
      <input
        type="text"
        value={customInquiryText}
        onChange={handleCustomInquiryChange}
        required={showCustomInquiryField}
        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
        placeholder="e.g., Franchise Inquiry, Bulk Export, etc."
      />
    </div>
    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
      Please describe your inquiry type in detail
    </p>
  </motion.div>
)}



</div>

            <div className="w-full">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                Product Interest (Optional)
              </label>
              <div className="relative w-full">
                <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm z-10" />
                <input
                  type="text"
                  name="productInterest"
                  value={formData.productInterest}
                  onChange={handleInputChange}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., T-shirts, Jeans, Custom Hoodies"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                Message <span className="text-orange-500">*</span>
              </label>
              <div className="relative w-full">
                <FaComment className="absolute left-3 top-3 sm:top-3.5 text-gray-400 text-xs sm:text-sm z-10" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="Tell us about your requirements, quantities, etc..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={formStatus.submitted}
              className="w-full bg-orange-500 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {formStatus.submitted ? (
                <>Sending...</>
              ) : (
                <>
                  <FaPaperPlane className="text-xs sm:text-sm" />
                  Send Inquiry
                </>
              )}
            </button>

            <p className="text-[10px] sm:text-xs text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy and terms of service.
              We'll respond within 2 hours during business hours.
            </p>
          </form>
        )}
        
      </motion.div>
      
      
      

      {/* Right Column - Info & Map - Responsive */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4 sm:space-y-6 lg:space-y-8 w-full max-w-full overflow-hidden"
      >
        {/* Department Contacts - Responsive */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 w-full">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Department Contacts</h3>
          <div className="space-y-3 sm:space-y-4">
            {departments.map((dept, index) => (
              <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-orange-50 transition-colors w-full">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0 text-sm sm:text-base lg:text-lg">
                  {dept.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1 truncate">{dept.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1 break-all sm:break-words">{dept.email}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">{dept.phone}</p>
         
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Map - Responsive */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden w-full">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Our Location</h3>
          </div>
          <div className="h-[180px] sm:h-[200px] lg:h-[250px] relative w-full">
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
          <div className="p-4 sm:p-6 bg-gray-50 w-full">
            <div className="flex items-start gap-2 sm:gap-3">
              <FaMapMarkerAlt className="text-orange-500 text-base sm:text-xl flex-shrink-0 mt-0.5 sm:mt-1" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base break-words">{companyInfo.address}</p>
                <p className="text-[10px] sm:text-xs text-gray-600 mt-1 break-words">
                  <FaClock className="inline mr-1 text-gray-400 text-[10px] sm:text-xs" />
                  Mon-Fri: 9AM-6PM | Sat: 10AM-4PM | Sun: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

         {/* Business Hours Card - Responsive */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 text-white w-full">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Business Hours</h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span>Monday - Friday</span>
              <span className="font-semibold">{companyInfo.hours.weekday}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span>Saturday</span>
              <span className="font-semibold">{companyInfo.hours.saturday}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span>Sunday</span>
              <span className="font-semibold bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">{companyInfo.hours.sunday}</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
            <p className="text-[10px] sm:text-xs text-orange-100">* All times are in Bangladesh Standard Time (BST)</p>
          </div>
        </div>

       
      </motion.div>
    </div>
  </div>
</section>

        {/* FAQ SECTION - Responsive */}
        <section id="faq-section" className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12">
              <span className="bg-orange-100 text-orange-600 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                ❓ FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-4 sm:mt-6 mb-2 sm:mb-4">
                Common Questions
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                Quick answers to questions we get asked often
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 sm:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.question}</span>
                    <span className="text-xl sm:text-2xl text-orange-500">
                      {activeFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {activeFaq === index && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-gray-50">
                      <p className="text-xs sm:text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION - Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Prefer{' '}
                <span className="text-orange-400">Instant Response?</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
                Chat with us on WhatsApp for immediate assistance with your wholesale requirements
              </p>

              <Link
                href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-green-500 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base lg:text-lg"
              >
                <FaWhatsapp className="text-lg sm:text-xl lg:text-2xl" />
                Start WhatsApp Chat
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 sm:mt-12 text-[10px] sm:text-xs text-gray-400">
                <span>⚡ Response within 2 hours</span>
                <span className="hidden xs:inline">•</span>
                <span>🔒 Secure Communication</span>
                <span className="hidden xs:inline">•</span>
                <span>📸 Share Product Photos</span>
                <span className="hidden xs:inline">•</span>
                <span>📄 Get Quick Quotes</span>
              </div>
            </motion.div>
          </div>
        </section>

    
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}