// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

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
//     role: 'customer',
//     password: '',
//     confirmPassword: '',
//     businessType: 'Retailer',
//     agreeToTerms: false
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear errors when user types
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');
//     setSuccess('');

//     // Validate passwords match
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setIsSubmitting(false);
//       return;
//     }

//     // Validate password strength
//     if (formData.password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       setIsSubmitting(false);
//       return;
//     }

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
//           role: formData.role,
//           password: formData.password,
//           businessType: formData.businessType
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed');
//       }

//       setSuccess('Registration successful! Redirecting to login...');
      
//       // Store token if you want auto-login
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//       }

//       // Redirect to login after 2 seconds
//       setTimeout(() => {
//         router.push('/login');
//       }, 2000);

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const roles = [
//     { value: 'customer', label: 'Customer', description: 'Browse and purchase products' },
//     { value: 'moderator', label: 'Moderator', description: 'Review and manage content' },
//     { value: 'admin', label: 'Admin', description: 'Full system access' }
//   ];

//   const businessTypes = [
//     'Retailer', 'Wholesaler', 'Distributor', 'Manufacturer', 
//     'E-commerce', 'Boutique', 'Other'
//   ];

//   // SVG Icons (same as before)
//   const BuildingIcon = () => (
//     <svg className="w-5 h-5 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//     </svg>
//   );

//   const UserIcon = () => (
//     <svg className="w-5 h-5 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     </svg>
//   );

//   const EnvelopeIcon = () => (
//     <svg className="w-5 h-5 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//     </svg>
//   );

//   const PhoneIcon = () => (
//     <svg className="w-5 h-5 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//     </svg>
//   );

//   const GlobeIcon = () => (
//     <svg className="w-5 h-5 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
//   );

//   const MapPinIcon = () => (
//     <svg className="w-5 h-5 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//     </svg>
//   );

//   const ShieldIcon = () => (
//     <svg className="w-5 h-5 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//     </svg>
//   );

//   const BriefcaseIcon = () => (
//     <svg className="w-5 h-5 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//     </svg>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pt-24 pb-12">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             B2B <span className="text-blue-600">Registration</span>
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Join TradeThreads B2B platform to access wholesale pricing and connect with verified suppliers
//           </p>
//         </div>

//         {/* Registration Form */}
//         <div className="max-w-2xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             {/* Form Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
//               <h2 className="text-2xl font-bold text-white">Create Your B2B Account</h2>
//               <p className="text-blue-100 mt-1">Fill in the details below to get started</p>
//             </div>

//             <form onSubmit={handleSubmit} className="p-8">
//               {/* Error/Success Messages */}
//               {error && (
//                 <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}
              
//               {success && (
//                 <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                   <p className="text-green-600 text-sm">{success}</p>
//                 </div>
//               )}

//               <div className="space-y-6">
//                 {/* Company Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <BuildingIcon />
//                     Company Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Enter your registered company name"
//                   />
//                 </div>

//                 {/* Contact Person */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <UserIcon />
//                     Contact Person <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="contactPerson"
//                     value={formData.contactPerson}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Full name of primary contact"
//                   />
//                 </div>

//                 {/* Role Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <ShieldIcon />
//                     Account Role <span className="text-red-500">*</span>
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
//                     {roles.map((role) => (
//                       <label
//                         key={role.value}
//                         className={`relative flex flex-col p-3 border rounded-lg cursor-pointer transition-all
//                           ${formData.role === role.value 
//                             ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' 
//                             : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
//                           }`}
//                       >
//                         <input
//                           type="radio"
//                           name="role"
//                           value={role.value}
//                           checked={formData.role === role.value}
//                           onChange={handleChange}
//                           className="sr-only"
//                           required
//                         />
//                         <span className="font-medium text-gray-900">{role.label}</span>
//                         <span className="text-xs text-gray-500 mt-1">{role.description}</span>
//                         {formData.role === role.value && (
//                           <div className="absolute top-2 right-2 text-blue-600">
//                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                         )}
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Business Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <BriefcaseIcon />
//                     Business Type
//                   </label>
//                   <select
//                     name="businessType"
//                     value={formData.businessType}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   >
//                     {businessTypes.map(type => (
//                       <option key={type} value={type}>{type}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <EnvelopeIcon />
//                     Email Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="your@company.com"
//                   />
//                 </div>

//                 {/* Phone / WhatsApp */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <PhoneIcon />
//                       Phone <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="+1 (555) 000-0000"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <PhoneIcon />
//                       WhatsApp (Optional)
//                     </label>
//                     <input
//                       type="tel"
//                       name="whatsapp"
//                       value={formData.whatsapp}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="+1 (555) 000-0000"
//                     />
//                   </div>
//                 </div>

//                 {/* Country */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <GlobeIcon />
//                     Country <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Enter your country"
//                   />
//                 </div>

//                 {/* Address */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <MapPinIcon />
//                     Street Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Street address, P.O. box"
//                   />
//                 </div>

//                 {/* City and Zip Code */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       City <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="City"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       ZIP / Postal Code <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="zipCode"
//                       value={formData.zipCode}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="ZIP code"
//                     />
//                   </div>
//                 </div>

//                 {/* Password Fields */}
//                 <div className="border-t border-gray-200 pt-6 mt-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Password <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                         placeholder="Create a strong password"
//                       />
//                       <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm Password <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="password"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                         placeholder="Re-enter your password"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Terms Agreement */}
//                 <div className="flex items-start">
//                   <input
//                     type="checkbox"
//                     name="agreeToTerms"
//                     checked={formData.agreeToTerms}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 mr-3"
//                   />
//                   <label className="text-sm text-gray-600">
//                     I agree to the{' '}
//                     <Link href="/terms" className="text-blue-600 hover:underline">
//                       Terms of Service
//                     </Link>{' '}
//                     and{' '}
//                     <Link href="/privacy" className="text-blue-600 hover:underline">
//                       Privacy Policy
//                     </Link>
//                     . I confirm that the information provided is accurate.
//                   </label>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="mt-8">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || !formData.agreeToTerms}
//                   className={`w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center justify-center gap-2 font-medium text-lg
//                     ${(isSubmitting || !formData.agreeToTerms) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Creating Account...
//                     </>
//                   ) : (
//                     'Create B2B Account'
//                   )}
//                 </button>
//               </div>

//               {/* Login Link */}
//               <div className="text-center mt-6">
//                 <p className="text-gray-600">
//                   Already have an account?{' '}
//                   <Link href="/login" className="text-blue-600 hover:underline font-medium">
//                     Sign in here
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

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
    businessType: 'Retailer',
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
      toast.error('Password Mismatch', {
        description: 'The passwords you entered do not match.',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      toast.error('Weak Password', {
        description: 'Password must be at least 8 characters long.',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    // Show loading toast
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
          role: 'customer',
          password: formData.password,
          businessType: formData.businessType
        }),
      });

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (!response.ok) {
        // Error toast
        toast.error('Registration Failed', {
          description: data.error || 'Something went wrong. Please try again.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Success toast
      toast.success('Registration Successful!', {
        description: `Welcome to B2B Marketplace, ${data.user?.companyName || formData.companyName}!`,
        duration: 5000,
        icon: '🎉',
      });

      // Store token if you want auto-login
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Error toast
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please check your internet connection.',
        duration: 5000,
      });
      
      setIsSubmitting(false);
    }
  };

  const businessTypes = [
    'Retailer', 'Wholesaler', 'Distributor', 'Manufacturer', 
    'E-commerce Store', 'Boutique', 'Fashion Brand'
  ];

  // Simple Icons
  const EyeIcon = ({ isVisible }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {isVisible ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      )}
    </svg>
  );

  return (
    <>
    <Navbar />
    <div className="min-h-screen mt-12 bg-gradient-to-br from-orange-50 to-amber-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your <span style={{ color: '#d9884e' }}>B2B Account</span>
          </h1>
          <p className="text-gray-600">Join thousands of retailers getting wholesale access</p>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Sidebar - Compact Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-5 sticky top-20">
              <h3 className="font-semibold text-gray-900 mb-3 pb-2 border-b" style={{ borderColor: '#d9884e' }}>
                Member Benefits
              </h3>
              <div className="space-y-3">
                {[
                  '💰 Wholesale pricing',
                  '🚚 Free shipping $500+',
                  '⭐ Quality guaranteed',
                  '📦 Bulk discounts',
                  '💬 24/7 support'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span style={{ color: '#d9884e' }}>✓</span>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-center">
                    <div>
                      <div className="text-lg font-bold" style={{ color: '#d9884e' }}>500+</div>
                      <div className="text-xs text-gray-500">Retailers</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold" style={{ color: '#d9884e' }}>50+</div>
                      <div className="text-xs text-gray-500">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Registration Form - Compact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Simple Header */}
              <div className="px-6 py-4" style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}>
                <h2 className="text-xl font-semibold text-white">Register</h2>
                <p className="text-orange-100 text-sm">All fields marked * are required</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {/* Form Grid - 2 columns for better density */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
                      placeholder="Your registered company name"
                    />
                  </div>

                  {/* Contact Person */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Person <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
                      placeholder="Full name"
                    />
                  </div>

                  {/* Business Type */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
                    >
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Email */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
                      placeholder="your@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* WhatsApp - Added Back */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Country */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
                      placeholder="Your country"
                    />
                  </div>

                  {/* City */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
                      placeholder="City"
                    />
                  </div>

                  {/* ZIP Code */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
                      placeholder="ZIP code"
                    />
                  </div>

                  {/* Address */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e]"
                      placeholder="Street address"
                    />
                  </div>

                  {/* Password */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] pr-10"
                        placeholder="Min. 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <EyeIcon isVisible={showPassword} />
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password <span style={{ color: '#d9884e' }}>*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] pr-10"
                        placeholder="Re-enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <EyeIcon isVisible={showConfirmPassword} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right mt-2">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm hover:underline"
                    style={{ color: '#d9884e' }}
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start mt-4">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-0.5 mr-2 rounded"
                    style={{ accentColor: '#d9884e' }}
                  />
                  <label htmlFor="agreeToTerms" className="text-xs text-gray-600">
                    I agree to the{' '}
                    <Link href="/terms" className="hover:underline" style={{ color: '#d9884e' }}>Terms</Link>
                    {' & '}
                    <Link href="/privacy" className="hover:underline" style={{ color: '#d9884e' }}>Privacy</Link>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="mt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreeToTerms}
                    className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium text-sm disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-4 text-sm">
                  <span className="text-gray-600">Already have an account?</span>{' '}
                  <Link href="/login" className="font-medium hover:underline" style={{ color: '#d9884e' }}>
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}