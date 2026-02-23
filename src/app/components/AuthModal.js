'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mail, Lock, User, Building, Phone, MapPin, 
  Eye, EyeOff, ShoppingBag, ArrowRight, CheckCircle,
  Truck, Shield, Clock, Star, Package
} from 'lucide-react';
import { toast } from 'sonner';

const AuthModal = ({ isOpen, onClose, initialTab = 'login', onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    businessType: 'Retailer',
    agreeToTerms: false
  });

  const businessTypes = [
    'Retailer', 'Wholesaler', 'Distributor', 'Manufacturer', 
    'E-commerce Store', 'Boutique', 'Fashion Brand'
  ];

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Login failed');
        setIsLoading(false);
        return;
      }

      // Store remember me preference
      if (loginData.rememberMe) {
        localStorage.setItem('rememberedEmail', loginData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      toast.success('Welcome back!', {
        description: `Successfully signed in as ${data.user.contactPerson || data.user.companyName}`,
      });
      
      // Call the success callback
      onAuthSuccess(data.user, data.token);
      
      // Dispatch custom event to notify other components (like Navbar)
      window.dispatchEvent(new Event('auth-change'));
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Connection error', {
        description: 'Please check your internet connection and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (registerData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    // Validate terms agreement
    if (!registerData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: registerData.companyName,
          contactPerson: registerData.contactPerson,
          email: registerData.email,
          phone: registerData.phone,
          whatsapp: registerData.whatsapp,
          country: registerData.country,
          address: registerData.address,
          city: registerData.city,
          zipCode: registerData.zipCode,
          password: registerData.password,
          businessType: registerData.businessType,
          role: 'customer'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      toast.success('Account created successfully!', {
        description: `Welcome to Asian Clothify, ${data.user.companyName}!`,
      });
      
      // Auto login after registration
      onAuthSuccess(data.user, data.token);
      
      // Dispatch custom event to notify other components (like Navbar)
      window.dispatchEvent(new Event('auth-change'));
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Connection error', {
        description: 'Please check your internet connection and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: <Truck className="w-4 h-4" />, text: 'Free shipping on orders $500+' },
    { icon: <Shield className="w-4 h-4" />, text: 'Secure payments' },
    { icon: <Clock className="w-4 h-4" />, text: '24/7 customer support' },
    { icon: <Package className="w-4 h-4" />, text: 'Bulk order discounts' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20 bg-white/80 backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left Side - Branding & Benefits */}
                <div className="md:w-2/5 bg-gradient-to-br from-[#E39A65] to-[#d48b54] p-8 text-white relative overflow-hidden">
                  {/* Decorative Pattern */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
                  
                  <div className="relative z-10">
                    {/* Logo/Brand */}
                        <div className="flex items-center justify-center gap-2 mb-4">
        <div className="relative w-56 h-20 overflow-hidden" style={{ background: 'transparent' }}>
            <img 
            src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
            alt="Asian Clothify Logo"
            className="w-full h-full object-contain"
            style={{ filter: 'none' }}
            />
        </div>
                </div>

                    <h3 className="text-2xl font-bold mb-2">
                      {activeTab === 'login' ? 'Welcome Back!' : 'Join Our Marketplace'}
                    </h3>
                    <p className="text-white/90 mb-8">
                      {activeTab === 'login' 
                        ? 'Sign in to access your wholesale dashboard and manage orders.'
                        : 'Create an account to start buying products at wholesale prices.'}
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="p-2 bg-white/20 rounded-lg">
                            {benefit.icon}
                          </div>
                          <span className="text-sm">{benefit.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold">500+</p>
                        <p className="text-xs text-white/80">Active Retailers</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">50+</p>
                        <p className="text-xs text-white/80">Countries</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Forms */}
                <div className="md:w-3/5 p-8">
                  {/* Tabs */}
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => setActiveTab('login')}
                      className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-all ${
                        activeTab === 'login'
                          ? 'border-[#E39A65] text-[#E39A65]'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setActiveTab('register')}
                      className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-all ${
                        activeTab === 'register'
                          ? 'border-[#E39A65] text-[#E39A65]'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* Login Form */}
                  {activeTab === 'login' ? (
                    <motion.form
                      key="login"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleLogin}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                          <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                            placeholder="your@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="rememberMe"
                            checked={loginData.rememberMe}
                            onChange={handleLoginChange}
                            className="rounded border-gray-300 text-[#E39A65] focus:ring-[#E39A65] cursor-pointer"
                          />
                          <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <button
                          type="button"
                          className="text-sm text-[#E39A65] hover:underline font-medium"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    /* Register Form */
                    <motion.form
                      key="register"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleRegister}
                      className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name <span className="text-[#E39A65]">*</span>
                          </label>
                          <div className="relative group">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                            <input
                              type="text"
                              name="companyName"
                              value={registerData.companyName}
                              onChange={handleRegisterChange}
                              required
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                              placeholder="Your company name"
                            />
                          </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Person <span className="text-[#E39A65]">*</span>
                          </label>
                          <div className="relative group">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                            <input
                              type="text"
                              name="contactPerson"
                              value={registerData.contactPerson}
                              onChange={handleRegisterChange}
                              required
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                              placeholder="Full name"
                            />
                          </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Business Type
                          </label>
                          <select
                            name="businessType"
                            value={registerData.businessType}
                            onChange={handleRegisterChange}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                          >
                            {businessTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-[#E39A65]">*</span>
                          </label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                            <input
                              type="email"
                              name="email"
                              value={registerData.email}
                              onChange={handleRegisterChange}
                              required
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                              placeholder="your@company.com"
                            />
                          </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone <span className="text-[#E39A65]">*</span>
                          </label>
                          <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                            <input
                              type="tel"
                              name="phone"
                              value={registerData.phone}
                              onChange={handleRegisterChange}
                              required
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                              placeholder="+1 234 567 8900"
                            />
                          </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            WhatsApp <span className="text-gray-400 text-xs">(Optional)</span>
                          </label>
                          <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                            <input
                              type="tel"
                              name="whatsapp"
                              value={registerData.whatsapp}
                              onChange={handleRegisterChange}
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                              placeholder="+1 234 567 8900"
                            />
                          </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country <span className="text-[#E39A65]">*</span>
                          </label>
                          <div className="relative group">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                            <input
                              type="text"
                              name="country"
                              value={registerData.country}
                              onChange={handleRegisterChange}
                              required
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                              placeholder="Your country"
                            />
                          </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City <span className="text-[#E39A65]">*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={registerData.city}
                            onChange={handleRegisterChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                            placeholder="City"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address <span className="text-[#E39A65]">*</span>
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={registerData.address}
                            onChange={handleRegisterChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                            placeholder="Street address"
                          />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code <span className="text-[#E39A65]">*</span>
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={registerData.zipCode}
                            onChange={handleRegisterChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                            placeholder="ZIP code"
                          />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password <span className="text-[#E39A65]">*</span>
                          </label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={registerData.password}
                              onChange={handleRegisterChange}
                              required
                              className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                              placeholder="Min. 8 characters"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password <span className="text-[#E39A65]">*</span>
                          </label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={registerData.confirmPassword}
                              onChange={handleRegisterChange}
                              required
                              className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
                              placeholder="Re-enter password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start mt-4">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          id="agreeToTerms"
                          checked={registerData.agreeToTerms}
                          onChange={handleRegisterChange}
                          required
                          className="mt-1 rounded border-gray-300 text-[#E39A65] focus:ring-[#E39A65] cursor-pointer"
                        />
                        <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
                          I agree to the <span className="text-[#E39A65] hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#E39A65] hover:underline cursor-pointer">Privacy Policy</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || !registerData.agreeToTerms}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;