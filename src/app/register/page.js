


// // app/register/page.jsx
// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';
// import OTPVerification from '../components/auth/OTPVerification';

// export default function RegisterPage() {
//   const router = useRouter();
//   const [step, setStep] = useState('form'); // 'form' or 'otp'
//   const [registeredEmail, setRegisteredEmail] = useState('');
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
//     businessType: 'Retailer',
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
//       toast.error('Password Mismatch', {
//         description: 'The passwords you entered do not match.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     // Validate password strength
//     if (formData.password.length < 8) {
//       toast.error('Weak Password', {
//         description: 'Password must be at least 8 characters long.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     // Show loading toast
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
//           role: 'customer',
//           password: formData.password,
//           businessType: formData.businessType
//         }),
//       });

//       const data = await response.json();

//       // Dismiss loading toast
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         // Error toast
//         toast.error('Registration Failed', {
//           description: data.error || 'Something went wrong. Please try again.',
//           duration: 5000,
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       // Success - Move to OTP verification
//       toast.success('OTP Sent!', {
//         description: 'Please check your email for verification code.',
//         duration: 5000,
//         icon: '📧',
//       });

//       setRegisteredEmail(formData.email);
//       setStep('otp');

//     } catch (err) {
//       // Dismiss loading toast
//       toast.dismiss(loadingToast);
      
//       // Error toast
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server. Please check your internet connection.',
//         duration: 5000,
//       });
      
//       setIsSubmitting(false);
//     }
//   };

//   const handleVerificationSuccess = (user) => {
//     toast.success('Registration Successful!', {
//       description: `Welcome to Asian Clothify , ${user.companyName || formData.companyName}!`,
//       duration: 5000,
//       icon: '🎉',
//     });

//     // Store token
//     if (user.token) {
//       localStorage.setItem('token', user.token);
//       localStorage.setItem('user', JSON.stringify(user));
//     }

//     // Redirect based on role
//     setTimeout(() => {
//       switch(user.role) {
//         case 'admin':
//           router.push('/admin/dashboard');
//           break;
//         case 'moderator':
//           router.push('/moderator/dashboard');
//           break;
//         default:
//           router.push('/customer/dashboard');
//       }
//     }, 2000);
//   };

//   const handleBackToForm = () => {
//     setStep('form');
//   };

//   const businessTypes = [
//     'Retailer', 'Wholesaler', 'Distributor', 'Manufacturer', 
//     'E-commerce Store', 'Boutique', 'Fashion Brand'
//   ];

//   // Simple Icons
//   const EyeIcon = ({ isVisible }) => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       {isVisible ? (
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//       ) : (
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//       )}
//     </svg>
//   );

//   return (
//     <>
//     <Navbar />
//     <div className="min-h-screen mt-12 bg-gradient-to-br from-orange-50 to-amber-50 py-16">
//       <div className="container mx-auto px-4 max-w-5xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Create Your <span style={{ color: '#d9884e' }}> Account</span>
//           </h1>
//           <p className="text-gray-600">Join thousands of retailers getting wholesale access</p>
//         </motion.div>

//         {/* Main Content - Two Column Layout */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Left Sidebar - Compact Benefits (Always Visible) */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="md:col-span-1"
//           >
//             <div className="bg-white rounded-xl shadow-lg p-5 sticky top-20">
//               <h3 className="font-semibold text-gray-900 mb-3 pb-2 border-b" style={{ borderColor: '#d9884e' }}>
//                 Member Benefits
//               </h3>
//               <div className="space-y-3">
//                 {[
//                   '💰 Wholesale pricing',
//                   '🚚 Free shipping $500+',
//                   '⭐ Quality guaranteed',
//                   '📦 Bulk discounts',
//                   '💬 24/7 support'
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-center gap-2 text-sm">
//                     <span style={{ color: '#d9884e' }}>✓</span>
//                     <span className="text-gray-600">{item}</span>
//                   </div>
//                 ))}
//                 <div className="mt-4 pt-3 border-t border-gray-100">
//                   <div className="flex justify-between text-center">
//                     <div>
//                       <div className="text-lg font-bold" style={{ color: '#d9884e' }}>500+</div>
//                       <div className="text-xs text-gray-500">Retailers</div>
//                     </div>
//                     <div>
//                       <div className="text-lg font-bold" style={{ color: '#d9884e' }}>50+</div>
//                       <div className="text-xs text-gray-500">Countries</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Column - Registration Form or OTP Verification */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="md:col-span-2"
//           >
//             {step === 'form' ? (
//               /* Registration Form - Your Exact Design */
//               <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 {/* Simple Header */}
//                 <div className="px-6 py-4" style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}>
//                   <h2 className="text-xl font-semibold text-white">Register</h2>
//                   <p className="text-orange-100 text-sm">All fields marked * are required</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-6">
//                   {/* Form Grid - 2 columns for better density */}
//                   <div className="grid grid-cols-2 gap-4">
//                     {/* Company Name */}
//                     <div className="col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Company Name <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="companyName"
//                         value={formData.companyName}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
//                         placeholder="Your registered company name"
//                       />
//                     </div>

//                     {/* Contact Person */}
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Contact Person <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={formData.contactPerson}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
//                         placeholder="Full name"
//                       />
//                     </div>

//                     {/* Business Type */}
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Business Type
//                       </label>
//                       <select
//                         name="businessType"
//                         value={formData.businessType}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
//                       >
//                         {businessTypes.map(type => (
//                           <option key={type} value={type}>{type}</option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Email */}
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
//                         placeholder="your@company.com"
//                       />
//                     </div>

//                     {/* Phone */}
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Phone <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
//                         placeholder="+1 (555) 000-0000"
//                       />
//                     </div>

//                     {/* WhatsApp */}
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         WhatsApp <span className="text-gray-400 text-xs">(Optional)</span>
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={formData.whatsapp}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
//                         placeholder="+1 (555) 000-0000"
//                       />
//                     </div>

//                     {/* Country */}
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Country <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
//                         placeholder="Your country"
//                       />
//                     </div>

//                     {/* City */}
//                     <div className="col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         City <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
//                         placeholder="City"
//                       />
//                     </div>

//                     {/* ZIP Code */}
//                     <div className="col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         ZIP Code <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         value={formData.zipCode}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
//                         placeholder="ZIP code"
//                       />
//                     </div>

//                     {/* Address */}
//                     <div className="col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Address <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
//                         placeholder="Street address"
//                       />
//                     </div>

//                     {/* Password */}
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Password <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] pr-10"
//                           placeholder="Min. 8 characters"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-2 top-1/2 -translate-y-1/2"
//                         >
//                           <EyeIcon isVisible={showPassword} />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Confirm Password */}
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Confirm Password <span style={{ color: '#d9884e' }}>*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={formData.confirmPassword}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] pr-10"
//                           placeholder="Re-enter password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-2 top-1/2 -translate-y-1/2"
//                         >
//                           <EyeIcon isVisible={showConfirmPassword} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Forgot Password Link */}
//                   <div className="text-right mt-2">
//                     <Link 
//                       href="/forgot-password" 
//                       className="text-sm hover:underline"
//                       style={{ color: '#d9884e' }}
//                     >
//                       Forgot password?
//                     </Link>
//                   </div>

//                   {/* Terms Checkbox */}
//                   <div className="flex items-start mt-4">
//                     <input
//                       type="checkbox"
//                       name="agreeToTerms"
//                       id="agreeToTerms"
//                       checked={formData.agreeToTerms}
//                       onChange={handleChange}
//                       required
//                       className="mt-0.5 mr-2 rounded"
//                       style={{ accentColor: '#d9884e' }}
//                     />
//                     <label htmlFor="agreeToTerms" className="text-xs text-gray-600">
//                       I agree to the{' '}
//                       <Link href="/terms" className="hover:underline" style={{ color: '#d9884e' }}>Terms</Link>
//                       {' & '}
//                       <Link href="/privacy" className="hover:underline" style={{ color: '#d9884e' }}>Privacy</Link>
//                     </label>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="mt-5">
//                     <button
//                       type="submit"
//                       disabled={isSubmitting || !formData.agreeToTerms}
//                       className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium text-sm disabled:opacity-50"
//                       style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}
//                     >
//                       {isSubmitting ? 'Creating Account...' : 'Create Account'}
//                     </button>
//                   </div>

//                   {/* Login Link */}
//                   <div className="text-center mt-4 text-sm">
//                     <span className="text-gray-600">Already have an account?</span>{' '}
//                     <Link href="/login" className="font-medium hover:underline" style={{ color: '#d9884e' }}>
//                       Sign in
//                     </Link>
//                   </div>
//                 </form>
//               </div>
//             ) : (
//               /* OTP Verification - Styled to Match Your Design */
//               <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 {/* Same Header as Registration Form */}
//                 <div className="px-6 py-4" style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}>
//                   <h2 className="text-xl font-semibold text-white">Verify Email</h2>
//                   <p className="text-orange-100 text-sm">Enter the OTP sent to your email</p>
//                 </div>

//                 <div className="p-8">
//                   <div className="text-center mb-6">
//                     <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <svg className="w-10 h-10" style={{ color: '#d9884e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                     <p className="text-gray-600">
//                       We've sent a 6-digit code to<br />
//                       <span className="font-semibold" style={{ color: '#d9884e' }}>{registeredEmail}</span>
//                     </p>
//                   </div>

//                   <OTPVerification 
//                     email={registeredEmail}
//                     onBack={handleBackToForm}
//                     onSuccess={handleVerificationSuccess}
//                   />
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
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

      // Success - show OTP verification message
      toast.success('Registration initiated!', {
        description: 'Please check your email for OTP verification code.',
        duration: 6000,
      });

      // Store email for OTP verification page
      localStorage.setItem('pendingVerificationEmail', formData.email);
      
      // Redirect to OTP verification page
      setTimeout(() => {
        router.push('/verify-otp');
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please try again.',
      });
      setIsSubmitting(false);
    }
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
              {/* Left Column - Member Benefits (Smaller) */}
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

              {/* Right Column - Registration Form (Larger) */}
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
      <Footer />
    </>
  );
}