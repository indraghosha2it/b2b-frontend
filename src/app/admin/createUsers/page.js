'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CreateUsers() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    password: '',
    confirmPassword: '',
    role: 'moderator' // Default role
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    // Validate required fields
    if (!formData.contactPerson || !formData.email || !formData.phone || !formData.password) {
      toast.error('Missing Fields', {
        description: 'Please fill in all required fields.',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading('Creating user account...');

    try {
      // Get the admin token from localStorage
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp || '',
          role: formData.role,
          password: formData.password,
          // Default values for required fields in the schema
          companyName: formData.contactPerson, // Using contact person as company name for admins
          country: 'Not Specified',
          address: 'Not Specified',
          city: 'Not Specified',
          zipCode: 'Not Specified',
          businessType: 'Other'
        }),
      });

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (!response.ok) {
        // Error toast
        toast.error('Creation Failed', {
          description: data.error || 'Something went wrong. Please try again.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Success toast
      toast.success('User Created Successfully!', {
        description: `${formData.role === 'admin' ? 'Admin' : 'Moderator'} account for ${formData.contactPerson} has been created.`,
        duration: 5000,
        icon: '👤',
      });

      // Reset form
      setFormData({
        contactPerson: '',
        email: '',
        phone: '',
        whatsapp: '',
        password: '',
        confirmPassword: '',
        role: 'moderator'
      });

      // Redirect to users list after 2 seconds (if you have a users list page)
      setTimeout(() => {
        router.push('/admin/manageUsers'); // Adjust this route as needed
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

  // Icons with updated colors
  const EyeIcon = ({ isVisible }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {isVisible ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      )}
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5" style={{ color: '#E39A65' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const MailIcon = () => (
    <svg className="w-5 h-5" style={{ color: '#E39A65' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="w-5 h-5" style={{ color: '#E39A65' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg className="w-5 h-5" style={{ color: '#E39A65' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const CartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with back button - E-commerce style */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/admin/manageUsers" 
            className="inline-flex items-center text-gray-600 hover:text-[#E39A65] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 group-hover:bg-[#E39A65] group-hover:text-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-medium">Back to Users</span>
          </Link>
          
          {/* E-commerce badge */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <CartIcon />
            <span className="text-sm font-medium" style={{ color: '#E39A65' }}>User Creation</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Header with e-commerce gradient */}
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #E39A65 0%, #f5b485 100%)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <UserIcon />
                  Create New User
                </h1>
                <p className="text-orange-100 text-sm mt-1">
                  Create admin or moderator accounts for platform management
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <ShieldIcon />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Role Selection - E-commerce style cards */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select User Role <span className="text-[#E39A65]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`
                  relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all
                  ${formData.role === 'admin' 
                    ? 'border-[#E39A65] bg-orange-50' 
                    : 'border-gray-200 hover:border-[#E39A65] hover:bg-orange-50/30'}
                `}>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      formData.role === 'admin' ? 'bg-[#E39A65] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <ShieldIcon />
                    </div>
                    <div>
                      <div className={`text-lg font-semibold ${formData.role === 'admin' ? 'text-[#E39A65]' : 'text-gray-700'}`}>
                        Admin
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Full system access</div>
                    </div>
                  </div>
                </label>

                <label className={`
                  relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all
                  ${formData.role === 'moderator' 
                    ? 'border-[#E39A65] bg-orange-50' 
                    : 'border-gray-200 hover:border-[#E39A65] hover:bg-orange-50/30'}
                `}>
                  <input
                    type="radio"
                    name="role"
                    value="moderator"
                    checked={formData.role === 'moderator'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      formData.role === 'moderator' ? 'bg-[#E39A65] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <div className={`text-lg font-semibold ${formData.role === 'moderator' ? 'text-[#E39A65]' : 'text-gray-700'}`}>
                        Moderator
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Limited management access</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Fields - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Person / Name */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-[#E39A65]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] transition-all group-hover:border-[#E39A65]"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-[#E39A65]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] transition-all group-hover:border-[#E39A65]"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-[#E39A65]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] transition-all group-hover:border-[#E39A65]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* WhatsApp (Optional) */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <WhatsAppIcon />
                  </div>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] transition-all group-hover:border-[#E39A65]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-[#E39A65]">*</span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] pr-10 transition-all group-hover:border-[#E39A65]"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E39A65] transition-colors"
                  >
                    <EyeIcon isVisible={showPassword} />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-[#E39A65]">*</span>
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-[#E39A65] pr-10 transition-all group-hover:border-[#E39A65]"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E39A65] transition-colors"
                  >
                    <EyeIcon isVisible={showConfirmPassword} />
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Indicator - Styled with E39A65 */}
            {formData.password && (
              <div className="mt-6 p-4 bg-orange-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-2 flex-1 rounded-full ${
                    formData.password.length >= 8 ? 'bg-[#E39A65]' : 'bg-gray-200'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-[#E39A65]' : 'bg-gray-200'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[0-9]/.test(formData.password) ? 'bg-[#E39A65]' : 'bg-gray-200'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[^A-Za-z0-9]/.test(formData.password) ? 'bg-[#E39A65]' : 'bg-gray-200'
                  }`} />
                </div>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E39A65]"></span>
                  Password must be at least 8 characters with uppercase, lowercase, number and special character
                </p>
              </div>
            )}

          

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 text-white font-semibold rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E39A65] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #E39A65 0%, #f5b485 100%)' }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating User...
                  </span>
                ) : (
                  `Create ${formData.role === 'admin' ? 'Admin' : 'Moderator'} Account`
                )}
              </button>
            </div>
          </form>
        </motion.div>

       
      </div>
    </div>
  );
}