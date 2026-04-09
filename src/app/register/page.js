

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import GoogleLoginButton from '../components/GoogleLoginButton';

// export default function RegisterPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     companyName: '',
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     password: '',
//     confirmPassword: '',
  
//     agreeToTerms: false
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Validate passwords match
//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       setIsSubmitting(false);
//       return;
//     }

//     // Validate terms agreement
//     if (!formData.agreeToTerms) {
//       toast.error('Please agree to the terms and conditions');
//       setIsSubmitting(false);
//       return;
//     }

//     const loadingToast = toast.loading('Creating your account...');


//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           companyName: formData.companyName,
//           contactPerson: formData.contactPerson,
//           email: formData.email,
//           phone: formData.phone,
//           whatsapp: formData.whatsapp,
//           country: formData.country,
//           address: formData.address,
//           city: formData.city,
//           zipCode: formData.zipCode,
//           password: formData.password,
         
//           role: 'customer'
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error(data.error || 'Registration failed');
//         setIsSubmitting(false);
//         return;
//       }

//       // Success - show OTP verification message
//       toast.success('Registration initiated!', {
//         description: 'Please check your email for OTP verification code.',
//         duration: 6000,
//       });

//       // Store email for OTP verification page
//       localStorage.setItem('pendingVerificationEmail', formData.email);
      
//       // Redirect to OTP verification page
//       setTimeout(() => {
//         router.push('/verify-otp');
//       }, 2000);

//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server. Please try again.',
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const handleGoogleSuccess = (data) => {
//     if (data.isNewUser) {
//       toast.success('Account created successfully!', {
//         description: 'Please complete your profile.',
//       });
//     }
//   };

//   const handleGoogleError = (error) => {
//     toast.error(error);
//   };

//   // Icons for benefits
//   const ShoppingBagIcon = () => (
//     <svg className="w-12 h-12" style={{ color: '#d9884e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//     </svg>
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen md:mt-12 mt-4 bg-gradient-to-br from-orange-50 to-amber-50 pt-24 pb-12">
//         <div className="container mx-auto px-4">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-8"
//           >
//             <h1 className="text-2xl md:text-4xl font-bold text-gray-900 md:mb-3 mb-1">
//               Join{' '}
//               <span style={{ color: '#d9884e' }}>Asian Clothify</span>
//             </h1>
//             <p className="text-gray-600 md:text-lg max-w-2xl mx-auto text-sm">
//               Create your wholesale account and start ordering bulk fashion
//             </p>
//           </motion.div>

//           <div className="max-w-5xl mx-auto">
//             <div className="grid md:grid-cols-12 gap-6 items-start">
//               {/* Left Column - Member Benefits (Smaller) */}
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 className="hidden md:block md:col-span-4"
//               >
//                 <div className="bg-white rounded-xl shadow-lg p-5 border border-orange-100 sticky top-24">
//                   <div className="flex justify-center mb-4">
//                     <div className="p-3 rounded-full" style={{ backgroundColor: '#d9884e20' }}>
//                       <ShoppingBagIcon />
//                     </div>
//                   </div>
                  
//                   <h2 className="text-lg font-bold text-gray-900 text-center mb-3">
//                     Member Benefits
//                   </h2>

//                   <div className="space-y-2">
//                     {[
//                       { icon: '🚀', title: 'Bulk Discounts', desc: 'Special pricing for bulk orders' },
//                       { icon: '✨', title: 'Quality Guaranteed', desc: '100% inspection guaranteed' },
//                       { icon: '🌍', title: 'Global Shipping', desc: 'Fast delivery worldwide' },
//                       { icon: '🏷️', title: 'Wholesale Prices', desc: 'Factory direct pricing' },
//                     ].map((item, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.3 + index * 0.1 }}
//                         className="flex items-start gap-2 p-2 rounded-lg hover:bg-orange-50 transition-colors"
//                       >
//                         <div className="text-xl">{item.icon}</div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
//                           <p className="text-xs text-gray-600">{item.desc}</p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Stats */}
//                   <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-200">
//                     <div className="text-center">
//                       <p className="text-lg font-bold" style={{ color: '#d9884e' }}>500+</p>
//                       <p className="text-xs text-gray-500">Members</p>
//                     </div>
//                     <div className="text-center border-x border-gray-200">
//                       <p className="text-lg font-bold" style={{ color: '#d9884e' }}>50+</p>
//                       <p className="text-xs text-gray-500">Countries</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-lg font-bold" style={{ color: '#d9884e' }}>10k+</p>
//                       <p className="text-xs text-gray-500">Orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Right Column - Registration Form (Larger) */}
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 className="md:col-span-8"
//               >
//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                   {/* Form Header */}
//                   <div className="px-6 py-4 text-center" style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}>
//                     <h2 className="text-xl font-bold text-white">Create Account</h2>
//                     <p className="text-orange-100 text-xs mt-0.5">Start your wholesale journey today</p>
//                   </div>

//                   <form onSubmit={handleSubmit} className="p-6">
//                     <div className="grid md:grid-cols-2 gap-3">
//                       {/* Company Name */}
//                       <div className="col-span-2 md:col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Company Name <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="companyName"
//                           value={formData.companyName}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                           placeholder="Your company name"
//                         />
//                       </div>

//                       {/* Contact Person */}
//                       <div className="col-span-2 md:col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Contact Person <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="contactPerson"
//                           value={formData.contactPerson}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                           placeholder="Full name"
//                         />
//                       </div>

//                       {/* Email */}
//                       <div className="col-span-2">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Email Address <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                           placeholder="your@company.com"
//                         />
//                       </div>

//                       {/* Phone */}
//                       <div className="col-span-2 md:col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Phone Number <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                           placeholder="+1 234 567 8900"
//                         />
//                       </div>

//                       {/* WhatsApp */}
//                       <div className="col-span-2 md:col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           WhatsApp Number <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <input
//                           type="tel"
//                           name="whatsapp"
//                           value={formData.whatsapp}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                           placeholder="+1 234 567 8900"
//                         />
//                       </div>

//                       {/* Country */}
//                       <div className="col-span-2 md:col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Country <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="country"
//                           value={formData.country}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                           placeholder="United States"
//                         />
//                       </div>

//                       {/* City */}
//                       <div className="col-span-2 md:col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           City <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="city"
//                           value={formData.city}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                           placeholder="New York"
//                         />
//                       </div>

//                       {/* Address */}
//                       <div className="col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Street Address <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                           placeholder="123 Business St"
//                         />
//                       </div>

//                       {/* Zip Code */}
//                       <div className="col-span-2 md:col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Zip Code <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="zipCode"
//                           value={formData.zipCode}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                           placeholder="10001"
//                         />
//                       </div>

                   

//                       {/* Password */}
//                       <div className="col-span-2 md:col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Password <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             minLength="8"
//                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                             placeholder="Min. 8 characters"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm"
//                           >
//                             {showPassword ? '👁️' : '👁️‍🗨️'}
//                           </button>
//                         </div>
//                       </div>

//                       {/* Confirm Password */}
//                       <div className="col-span-2 md:col-span-1">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Confirm Password <span style={{ color: '#d9884e' }}>*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                             minLength="8"
//                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                             placeholder="Re-enter password"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm"
//                           >
//                             {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
//                           </button>
//                         </div>
//                       </div>

//                       {/* Terms Agreement */}
//                       <div className="col-span-2">
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="checkbox"
//                             name="agreeToTerms"
//                             checked={formData.agreeToTerms}
//                             onChange={handleChange}
//                             className="rounded border-gray-300 text-[#d9884e] focus:ring-[#d9884e]"
//                           />
//                           <span className="text-xs text-gray-600">
//                             I agree to the{' '}
//                             <Link href="/terms" className="text-[#d9884e] hover:underline">
//                               Terms
//                             </Link>{' '}
//                             and{' '}
//                             <Link href="/privacy" className="text-[#d9884e] hover:underline">
//                               Privacy
//                             </Link>
//                           </span>
//                         </label>
//                       </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="mt-4">
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full px-6 py-2.5 text-sm text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-medium"
//                         style={{ 
//                           background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)',
//                           opacity: isSubmitting ? 0.7 : 1
//                         }}
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Creating Account...
//                           </>
//                         ) : (
//                           'Create Account'
//                         )}
//                       </button>
//                     </div>

//                     {/* Divider */}
//                     <div className="relative my-3">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-300" />
//                       </div>
//                       <div className="relative flex justify-center text-xs">
//                         <span className="px-2 bg-white text-gray-500">Or sign up with</span>
//                       </div>
//                     </div>

//                     {/* Google Sign Up Button */}
//                     <GoogleLoginButton 
//                       mode="signup"
//                       onSuccess={handleGoogleSuccess}
//                       onError={handleGoogleError}
//                     />

//                     {/* Login Link */}
//                     <div className="text-center mt-3">
//                       <p className="text-xs text-gray-600">
//                         Already have an account?{' '}
//                         <Link href="/login" className="font-medium hover:underline" style={{ color: '#d9884e' }}>
//                           Sign in
//                         </Link>
//                       </p>
//                     </div>
//                   </form>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GoogleLoginButton from '../components/GoogleLoginButton';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // OTP Modal States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [registrationData, setRegistrationData] = useState(null);

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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('Creating your account...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          password: formData.password,
          role: 'customer'
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }

      // Success - Show OTP modal instead of redirecting
      toast.success('Registration initiated!', {
        description: 'Please enter the OTP sent to your email.',
        duration: 4000,
      });

      // Store email and show OTP modal
      setOtpEmail(formData.email);
      setRegistrationData(data);
      setShowOtpModal(true);
      setOtp('');
      setIsSubmitting(false);

      // Start countdown for resend button
      startCountdown();

    } catch (error) {
      console.error('Registration error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    const verifyingToast = toast.loading('Verifying OTP...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: otpEmail,
          otp: otp
        }),
      });

      const data = await response.json();
      toast.dismiss(verifyingToast);

      if (!response.ok) {
        toast.error(data.error || 'Invalid OTP');
        setIsVerifying(false);
        return;
      }

      // Success - store token and redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success('Email verified successfully!', {
        description: 'Welcome to Asian Clothify!',
      });

      setShowOtpModal(false);
      
      // Redirect based on role
      setTimeout(() => {
        if (data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (data.user.role === 'moderator') {
          router.push('/moderator/dashboard');
        } else {
          router.push('/customer/dashboard');
        }
      }, 1500);

    } catch (error) {
      console.error('OTP verification error:', error);
      toast.dismiss(verifyingToast);
      toast.error('Verification failed', {
        description: 'Please try again',
      });
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    const resendToast = toast.loading('Resending OTP...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: otpEmail
        }),
      });

      const data = await response.json();
      toast.dismiss(resendToast);

      if (!response.ok) {
        toast.error(data.error || 'Failed to resend OTP');
        return;
      }

      toast.success('OTP resent successfully!', {
        description: 'Please check your email.',
      });

      // Reset countdown
      startCountdown();

    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.dismiss(resendToast);
      toast.error('Failed to resend OTP');
    }
  };

  const startCountdown = () => {
    setResendDisabled(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGoogleSuccess = (data) => {
    if (data.isNewUser) {
      toast.success('Account created successfully!', {
        description: 'Please complete your profile.',
      });
    }
  };

  const handleGoogleError = (error) => {
    toast.error(error);
  };

  // Icons for benefits
  const ShoppingBagIcon = () => (
    <svg className="w-12 h-12" style={{ color: '#d9884e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen md:mt-12 mt-4 bg-gradient-to-br from-orange-50 to-amber-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 md:mb-3 mb-1">
              Join{' '}
              <span style={{ color: '#d9884e' }}>Asian Clothify</span>
            </h1>
            <p className="text-gray-600 md:text-lg max-w-2xl mx-auto text-sm">
              Create your wholesale account and start ordering bulk fashion
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-6 items-start">
              {/* Left Column - Member Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:block md:col-span-4"
              >
                <div className="bg-white rounded-xl shadow-lg p-5 border border-orange-100 sticky top-24">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: '#d9884e20' }}>
                      <ShoppingBagIcon />
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-bold text-gray-900 text-center mb-3">
                    Member Benefits
                  </h2>

                  <div className="space-y-2">
                    {[
                      { icon: '🚀', title: 'Bulk Discounts', desc: 'Special pricing for bulk orders' },
                      { icon: '✨', title: 'Quality Guaranteed', desc: '100% inspection guaranteed' },
                      { icon: '🌍', title: 'Global Shipping', desc: 'Fast delivery worldwide' },
                      { icon: '🏷️', title: 'Wholesale Prices', desc: 'Factory direct pricing' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-2 p-2 rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        <div className="text-xl">{item.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: '#d9884e' }}>500+</p>
                      <p className="text-xs text-gray-500">Members</p>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <p className="text-lg font-bold" style={{ color: '#d9884e' }}>50+</p>
                      <p className="text-xs text-gray-500">Countries</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: '#d9884e' }}>10k+</p>
                      <p className="text-xs text-gray-500">Orders</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Registration Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-8"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Form Header */}
                  <div className="px-6 py-4 text-center" style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}>
                    <h2 className="text-xl font-bold text-white">Create Account</h2>
                    <p className="text-orange-100 text-xs mt-0.5">Start your wholesale journey today</p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid md:grid-cols-2 gap-3">
                      {/* Company Name */}
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Company Name <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                          placeholder="Your company name"
                        />
                      </div>

                      {/* Contact Person */}
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Contact Person <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                          placeholder="Full name"
                        />
                      </div>

                      {/* Email */}
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Email Address <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                          placeholder="your@company.com"
                        />
                      </div>

                      {/* Phone */}
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Phone Number <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                          placeholder="+1 234 567 8900"
                        />
                      </div>

                      {/* WhatsApp */}
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          WhatsApp Number <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                          placeholder="+1 234 567 8900"
                        />
                      </div>

                      {/* Country */}
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Country <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                          placeholder="United States"
                        />
                      </div>

                      {/* City */}
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          City <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                          placeholder="New York"
                        />
                      </div>

                      {/* Address */}
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Street Address <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                          placeholder="123 Business St"
                        />
                      </div>

                      {/* Zip Code */}
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Zip Code <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                          placeholder="10001"
                        />
                      </div>

                      {/* Password */}
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Password <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="8"
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                            placeholder="Min. 8 characters"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm"
                          >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Confirm Password <span style={{ color: '#d9884e' }}>*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="8"
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                            placeholder="Re-enter password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm"
                          >
                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                      </div>

                      {/* Terms Agreement */}
                      <div className="col-span-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-[#d9884e] focus:ring-[#d9884e]"
                          />
                          <span className="text-xs text-gray-600">
                            I agree to the{' '}
                            <Link href="/terms" className="text-[#d9884e] hover:underline">
                              Terms
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-[#d9884e] hover:underline">
                              Privacy
                            </Link>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-2.5 text-sm text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-medium"
                        style={{ 
                          background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)',
                          opacity: isSubmitting ? 0.7 : 1
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                      </div>
                    </div>

                    {/* Google Sign Up Button */}
                    <GoogleLoginButton 
                      mode="signup"
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                    />

                    {/* Login Link */}
                    <div className="text-center mt-3">
                      <p className="text-xs text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium hover:underline" style={{ color: '#d9884e' }}>
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
     {/* OTP Verification Modal */}
<AnimatePresence>
  {showOtpModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ 
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      onClick={() => !isVerifying && setShowOtpModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setShowOtpModal(false)}
          disabled={isVerifying}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#d9884e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Your Email</h3>
          <p className="text-sm text-gray-600">
            We've sent a verification code to <br />
            <span className="font-semibold text-[#d9884e]">{otpEmail}</span>
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter OTP Code
          </label>
          <div className="flex justify-center gap-2">
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full px-4 py-3 text-center text-2xl tracking-wider border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e] focus:outline-none transition-all"
              autoFocus
              disabled={isVerifying}
            />
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <button
          onClick={handleVerifyOTP}
          disabled={isVerifying || otp.length !== 6}
          className="w-full py-3 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}
        >
          {isVerifying ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </span>
          ) : (
            'Verify & Continue'
          )}
        </button>

        <div className="mt-4 text-center">
          <button
            onClick={handleResendOTP}
            disabled={resendDisabled}
            className="text-sm text-[#d9884e] hover:text-[#c9773e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowOtpModal(false)}
            disabled={isVerifying}
            className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      <Footer />
    </>
  );
}