// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { FaCheckCircle, FaShippingFast, FaTag, FaPalette, FaGlobe, FaShieldAlt, FaStar, FaRocket } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// export default function WhyChooseUs() {
//   const features = [
//     {
//       icon: <FaTag className="w-5 h-5" />,
//       title: "Low MOQ",
//       description: "Start with as low as 100 pieces",
//       color: "bg-emerald-500",
//       gradient: "from-emerald-500 to-teal-500"
//     },
//     {
//       icon: <FaShippingFast className="w-5 h-5" />,
//       title: "Fast Global Shipping",
//       description: "5-7 day delivery worldwide",
//       color: "bg-blue-500",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <FaPalette className="w-5 h-5" />,
//       title: "Custom Branding",
//       description: "Your labels, your tags",
//       color: "bg-amber-500",
//       gradient: "from-amber-500 to-orange-500"
//     },
//     {
//       icon: <FaGlobe className="w-5 h-5" />,
//       title: "Worldwide Sourcing",
//       description: "Premium materials globally",
//       color: "bg-green-600",
//       gradient: "from-green-600 to-emerald-600"
//     },
//     {
//       icon: <FaShieldAlt className="w-5 h-5" />,
//       title: "Quality Guaranteed",
//       description: "100% inspection guarantee",
//       color: "bg-red-500",
//       gradient: "from-red-500 to-rose-500"
//     },
//     {
//       icon: <FaCheckCircle className="w-5 h-5" />,
//       title: "24/7 Support",
//       description: "Dedicated account manager",
//       color: "bg-blue-600",
//       gradient: "from-blue-600 to-indigo-600"
//     }
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
//       <div className="container mx-auto px-4 max-w-7xl"> {/* Added max-w-7xl to limit width */}
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
          
//           {/* LEFT COLUMN - Text + Features */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="space-y-8"
//           >
//             {/* Badge */}
//             <div className="inline-block">
//               <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full">
//                 ⚡ WHY THOUSANDS CHOOSE US
//               </span>
//             </div>

//             {/* Heading */}
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//               Your Trusted
//               <span className="relative ml-3">
//                 <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#e1813d] to-[#dc8b52]">
//                   Wholesale Partner
//                 </span>
//                 <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
//                   <path d="M0 0L300 12" stroke="url(#gradient)" strokeWidth="4" strokeDasharray="6 6"/>
//                   <defs>
//                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                       <stop offset="0%" stopColor="#2563EB" />
//                       <stop offset="100%" stopColor="#06B6D4" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//               </span>
//             </h2>

//             {/* Description */}
//             <p className="text-xl text-gray-600 max-w-lg">
//               We're not just a supplier – we're your growth partner. Join 500+ retailers who trust us for their wholesale needs.
//             </p>

//             {/* Features Grid */}
//             <div className="grid grid-cols-2 gap-4 pt-4">
//               {features.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="flex items-start space-x-3 group"
//                 >
//                   <div className={`${feature.color} p-2 rounded-lg text-white group-hover:scale-110 transition-transform shadow-lg`}>
//                     {feature.icon}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">{feature.title}</h4>
//                     <p className="text-sm text-gray-500">{feature.description}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-4 pt-4">
//               <button className="px-8 py-4 bg-gradient-to-r from-[#b85712] to-[#d18956] text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
//                 Start Your Inquiry
//               </button>
//               <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
//                 View Success Stories →
//               </button>
//             </div>

//             {/* Trust indicators */}
//             <div className="flex items-center gap-4 pt-2">
//               <div className="flex -space-x-2">
//                 {[1,2,3,4].map((i) => (
//                   <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d6610e] to-[#cc8756] border-2 border-white"></div>
//                 ))}
//               </div>
//               <p className="text-sm text-gray-500">
//                 <span className="font-semibold text-gray-700">500+</span> retailers trust us
//               </p>
//             </div>
//           </motion.div>

//           {/* RIGHT COLUMN - Image/Animation */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="relative"
//           >
//             {/* Main Image Container with Animation */}
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Animated background */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 animate-pulse opacity-20"></div>
              
//               {/* Main Image */}
//               <img
//                 src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070"
//                 alt="Wholesale Clothing"
//                 className="w-full h-[500px] object-cover"
//               />

//               {/* Floating Cards Animation - Adjusted positioning to avoid overlap */}
//               <motion.div
//                 animate={{ y: [0, -20, 0] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl border-l-4 border-emerald-500 z-20"
//               >
//                 <div className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0">
//                     <FaRocket className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Orders Shipped</p>
//                     <p className="text-lg font-bold text-gray-900">10k+</p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 animate={{ y: [0, 20, 0] }}
//                 transition={{ duration: 5, repeat: Infinity }}
//                 className="absolute bottom-16 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl border-l-4 border-blue-500 z-20"
//               >
//                 <div className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0">
//                     <FaGlobe className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Countries</p>
//                     <p className="text-lg font-bold text-gray-900">50+</p>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Animated Circles */}
//               <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
//               <div className="absolute bottom-20 left-20 w-32 h-32 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
//               <div className="absolute top-40 left-40 w-24 h-24 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
//             </div>

//             {/* Stats Strip - Moved further down with more spacing */}
//             <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] bg-white rounded-2xl shadow-xl p-6 grid grid-cols-3 gap-4 border-t-4 border-[#d2722d] z-30">
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                   500+
//                 </p>
//                 <p className="text-xs text-gray-500">Active Retailers</p>
//               </div>
//               <div className="text-center border-x border-gray-200">
//                 <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
//                   50+
//                 </p>
//                 <p className="text-xs text-gray-500">Countries</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
//                   100%
//                 </p>
//                 <p className="text-xs text-gray-500">Satisfaction</p>
//               </div>
//             </div>

//             {/* Decorative elements */}
//             <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
//             <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import React from 'react';
import Image from 'next/image';
import { FaCheckCircle, FaShippingFast, FaTag, FaPalette, FaGlobe, FaShieldAlt, FaStar, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaTag className="w-5 h-5" />,
      title: "Low MOQ",
      description: "Start with as low as 100 pieces",
      color: "bg-emerald-500",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <FaShippingFast className="w-5 h-5" />,
      title: "Fast Global Shipping",
      description: "5-7 day delivery worldwide",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaPalette className="w-5 h-5" />,
      title: "Custom Branding",
      description: "Your labels, your tags",
      color: "bg-amber-500",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <FaGlobe className="w-5 h-5" />,
      title: "Worldwide Sourcing",
      description: "Premium materials globally",
      color: "bg-green-600",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      icon: <FaShieldAlt className="w-5 h-5" />,
      title: "Quality Guaranteed",
      description: "100% inspection guarantee",
      color: "bg-red-500",
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: <FaCheckCircle className="w-5 h-5" />,
      title: "24/7 Support",
      description: "Dedicated account manager",
      color: "bg-blue-600",
      gradient: "from-blue-600 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-orange-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT COLUMN - Text + Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-orange-100 text-[#d9884e] text-sm font-semibold px-4 py-2 rounded-full">
                ⚡ WHY THOUSANDS CHOOSE US
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your Trusted
              <span className="relative ml-3">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#cd7332] to-[#c98250]">
                  Wholesale Partner
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M0 0L300 12" stroke="url(#gradient)" strokeWidth="4" strokeDasharray="6 6"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#d9884e" />
                      <stop offset="100%" stopColor="#e6a87c" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 max-w-lg">
              We're not just a supplier – we're your growth partner. Join 500+ retailers who trust us for their wholesale needs.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 group"
                >
                  <div className={`${feature.color} p-2 rounded-lg text-white group-hover:scale-110 transition-transform shadow-lg`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-[#d2722d] to-[#e6a87c] text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Your Inquiry
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold border-2 border-gray-200 hover:border-[#d9884e] hover:text-[#d9884e] transition-all duration-300">
                View Success Stories →
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d9884e] to-[#e6a87c] border-2 border-white"></div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">500+</span> retailers trust us
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Image/Animation with Peach/Orange Theme */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image Container with Animation */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Animated background - changed to peach/orange */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d9884e] to-[#e6a87c] animate-pulse opacity-20"></div>
              
              {/* Main Image */}
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070"
                alt="Wholesale Clothing"
                className="w-full h-[500px] object-cover"
              />

              {/* Floating Cards Animation - Adjusted positioning */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl border-l-4 border-[#d9884e] z-20"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#d9884e] to-[#e6a87c] rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <FaRocket className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Orders Shipped</p>
                    <p className="text-lg font-bold text-gray-900">10k+</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-16 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl border-l-4 border-[#e6a87c] z-20"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#e6a87c] to-[#d9884e] rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <FaGlobe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Countries</p>
                    <p className="text-lg font-bold text-gray-900">50+</p>
                  </div>
                </div>
              </motion.div>

              {/* Animated Circles - changed to peach/orange shades */}
              <div className="absolute top-20 right-20 w-32 h-32 bg-[#d9884e] rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
              <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#e6a87c] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
              <div className="absolute top-40 left-40 w-24 h-24 bg-[#f2c1a0] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Stats Strip - Updated with peach theme */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] bg-white rounded-2xl shadow-xl p-6 grid grid-cols-3 gap-4 border-t-4 border-[#d9884e] z-30">
              <div className="text-center">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9884e] to-[#e6a87c]">
                  500+
                </p>
                <p className="text-xs text-gray-500">Active Retailers</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e6a87c] to-[#d9884e]">
                  50+
                </p>
                <p className="text-xs text-gray-500">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9884e] to-[#e6a87c]">
                  100%
                </p>
                <p className="text-xs text-gray-500">Satisfaction</p>
              </div>
            </div>

            {/* Decorative elements - updated to peach shades */}
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-[#d9884e] rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-[#e6a87c] rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Add custom animation keyframes if not already in global CSS */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}