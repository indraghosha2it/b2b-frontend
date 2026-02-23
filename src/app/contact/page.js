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

export default function ContactPage() {
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
      response: '< 2 hours',
      icon: <FaBox />
    },
    {
      name: 'Customer Support',
      email: 'support@asianclothify.com',
      phone: '01305-785686',
      response: '< 4 hours',
      icon: <FaHeadset />
    },
    {
      name: 'Export & Shipping',
      email: 'export@asianclothify.com',
      phone: '01305-785687',
      response: '< 24 hours',
      icon: <FaTruck />
    },
    {
      name: 'Quality Control',
      email: 'quality@asianclothify.com',
      phone: '01305-785688',
      response: '< 48 hours',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, success: false, message: 'Sending...' });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you! Your inquiry has been sent. We\'ll contact you within 2 hours.'
      });
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
    }, 1500);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white mt-16" ref={sectionRef}>
        {/* HERO SECTION */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex items-center container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                <MdSupportAgent className="text-orange-400 text-xl" />
                <span className="text-white font-medium">Get in Touch</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Contact{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  {companyInfo.name}
                </span>
              </h1>

              <p className="text-xl text-gray-200 mb-8">
                Have questions about wholesale orders, pricing, or custom manufacturing? We're here to help!
              </p>

              {/* Response Time Badge */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 w-fit">
                <FaRegClock className="text-orange-400" />
                <span className="text-white">Average response time: </span>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  &lt; 2 hours
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUICK CONTACT CARDS */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-20">
              {/* WhatsApp Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <FaWhatsapp className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-4">Quickest way to reach us</p>
                <Link
                  href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
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
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <FaPhone className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600 mb-2">{companyInfo.phone}</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM</p>
              </motion.div>

              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <FaEnvelope className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 mb-2">{companyInfo.email}</p>
                <p className="text-sm text-gray-500">24/7 Support</p>
              </motion.div>

              {/* Visit Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-2 text-sm">{companyInfo.address}</p>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 text-sm"
                >
                  <span>Get Directions</span>
                  <span>→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MAIN CONTACT SECTION */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <div className="mb-8">
                  <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-2 rounded-full mb-4 inline-block">
                    📝 SEND INQUIRY
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Tell Us Your Requirements
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 2 hours
                  </p>
                </div>

                {formStatus.submitted && formStatus.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheckCircle className="text-green-500 text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-4">{formStatus.message}</p>
                    <button
                      onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                      className="text-orange-600 font-semibold hover:text-orange-700"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name <span className="text-orange-500">*</span>
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email <span className="text-orange-500">*</span>
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone / WhatsApp <span className="text-orange-500">*</span>
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="+880 1305-785685"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Name
                        </label>
                        <div className="relative">
                          <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option value="">Select Country</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="UAE">UAE</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Inquiry Type
                        </label>
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option value="wholesale">Wholesale Inquiry</option>
                          <option value="custom">Custom Manufacturing</option>
                          <option value="sample">Sample Request</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Interest (Optional)
                      </label>
                      <div className="relative">
                        <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="productInterest"
                          value={formData.productInterest}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                          placeholder="e.g., T-shirts, Jeans, Custom Hoodies"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message <span className="text-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <FaComment className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows="5"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                          placeholder="Tell us about your requirements, quantities, etc..."
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus.submitted}
                      className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus.submitted ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Send Inquiry
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                      We'll respond within 2 hours during business hours.
                    </p>
                  </form>
                )}
              </motion.div>

              {/* Right Column - Info & Map */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Department Contacts */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Department Contacts</h3>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                          {dept.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{dept.name}</h4>
                          <p className="text-sm text-gray-600 mb-1">{dept.email}</p>
                          <p className="text-sm text-gray-600 mb-1">{dept.phone}</p>
                          <p className="text-xs text-green-600">⏱ Response: {dept.response}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Map */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900">Our Location</h3>
                  </div>
                  <div className="h-[250px] relative">
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
                  <div className="p-6 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-orange-500 text-xl flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">{companyInfo.address}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          <FaClock className="inline mr-1 text-gray-400" />
                          Mon-Fri: 9AM-6PM | Sat: 10AM-4PM | Sun: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl shadow-xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">{companyInfo.hours.weekday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Saturday</span>
                      <span className="font-semibold">{companyInfo.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sunday</span>
                      <span className="font-semibold bg-white/20 px-3 py-1 rounded-full">{companyInfo.hours.sunday}</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-orange-100">* All times are in Bangladesh Standard Time (BST)</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-2 rounded-full">
                ❓ FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-4">
                Common Questions
              </h2>
              <p className="text-gray-600">
                Quick answers to questions we get asked often
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <span className="text-2xl text-orange-500">
                      {activeFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {activeFaq === index && (
                    <div className="px-6 pb-6 bg-gray-50">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
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
                Prefer{' '}
                <span className="text-orange-400">Instant Response?</span>
              </h2>

              <p className="text-xl text-gray-300 mb-8">
                Chat with us on WhatsApp for immediate assistance with your wholesale requirements
              </p>

              <Link
                href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 text-lg"
              >
                <FaWhatsapp className="text-2xl" />
                Start WhatsApp Chat
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-400">
                <span>⚡ Response within 2 hours</span>
                <span>🔒 Secure Communication</span>
                <span>📸 Share Product Photos</span>
                <span>📄 Get Quick Quotes</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <Link
          href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20Asian%20Clothify%2C%20I'm%20interested%20in%20your%20wholesale%20products`}
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