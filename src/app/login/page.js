'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load remembered email on component mount (client-side only)
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading('Signing in...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (!response.ok) {
        // Error toast
        toast.error(data.error || 'Login failed', {
          description: 'Please check your credentials and try again.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Success toast
      toast.success('Login successful!', {
        description: `Welcome back, ${data.user.contactPerson || data.user.companyName}!`,
        duration: 4000,
      });

      // Store token and user data (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Store in session storage if remember me is checked
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
      }

      // Redirect based on role
      setTimeout(() => {
        switch(data.user.role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'moderator':
            router.push('/moderator/dashboard');
            break;
          default:
            router.push('/customer/dashboard');
        }
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      
      // Error toast
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please try again.',
        duration: 5000,
      });
      
      setIsSubmitting(false);
    }
  };

  // Custom Icons with Peach Theme
  const EnvelopeIcon = () => (
    <svg className="w-5 h-5" style={{ color: '#d9884e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="w-5 h-5" style={{ color: '#d9884e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const EyeIcon = ({ isVisible }) => (
    <svg className="w-5 h-5" style={{ color: '#d9884e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {isVisible ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      )}
    </svg>
  );

  const ShoppingBagIcon = () => (
    <svg className="w-16 h-16" style={{ color: '#d9884e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );

  const CartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  return (
  
       <>
       <Navbar />
    <div className="min-h-screen mt-12 bg-gradient-to-br from-orange-50 to-amber-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Welcome to{' '}
            <span style={{ color: '#d9884e' }}>B2B Marketplace</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Your one-stop destination for wholesale fashion and accessories
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Column - E-commerce Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full" style={{ backgroundColor: '#d9884e20' }}>
                    <ShoppingBagIcon />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                  Why Shop With Us?
                </h2>

                <div className="space-y-5">
                  {[
                    { icon: '🚀', title: 'Bulk Order Discounts', desc: 'Special pricing for orders above 100 pieces' },
                    { icon: '✨', title: 'Quality Guaranteed', desc: '100% inspection before shipping' },
                    { icon: '🌍', title: 'Global Shipping', desc: 'Fast delivery to 50+ countries' },
                    { icon: '🏷️', title: 'Wholesale Prices', desc: 'Factory direct pricing, no middlemen' },
                 
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors"
                    >
                      <div className="text-3xl">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: '#d9884e' }}>500+</p>
                    <p className="text-xs text-gray-500">Active Retailers</p>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <p className="text-2xl font-bold" style={{ color: '#d9884e' }}>50+</p>
                    <p className="text-xs text-gray-500">Countries</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: '#d9884e' }}>10k+</p>
                    <p className="text-xs text-gray-500">Orders</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Form Header */}
                <div className="px-8 py-6 text-center" style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}>
                  <div className="flex justify-center mb-3">
                    <CartIcon />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Account Login</h2>
                  <p className="text-orange-100 mt-1">Sign in to manage your wholesale orders</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                  <div className="space-y-5">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span style={{ color: '#d9884e' }}>*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <EnvelopeIcon />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e] transition-colors"
                          placeholder="your@company.com"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password <span style={{ color: '#d9884e' }}>*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LockIcon />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e] transition-colors"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <EyeIcon isVisible={showPassword} />
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    

                 
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-medium text-lg"
                      style={{ 
                        background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)',
                        opacity: isSubmitting ? 0.7 : 1
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </>
                      ) : (
                        'Sign In to B2B Account'
                      )}
                    </button>
                  </div>

                  {/* Register Link */}
                  <div className="text-center mt-6">
                    <p className="text-gray-600">
                      New to our B2B marketplace?{' '}
                      <Link href="/register" className="font-medium hover:underline" style={{ color: '#d9884e' }}>
                        Create account
                      </Link>
                    </p>
                  </div>

                  {/* Terms */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      By signing in, you agree to our{' '}
                      <Link href="/terms" className="hover:underline" style={{ color: '#d9884e' }}>
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="hover:underline" style={{ color: '#d9884e' }}>
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              {/* Support Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-gray-500">
                  Need help with your account?{' '}
                  <Link href="/contact" className="hover:underline font-medium" style={{ color: '#d9884e' }}>
                    Contact B2B Support
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}