// 'use client';

// import { useEffect, useRef } from 'react';
// import Image from 'next/image';

// export default function ScrollingLogos() {
//   const scrollRef = useRef(null);

//   // Company/client logos (using placeholder images - replace with your actual client logos)
//   const companies = [
//     { id: 1, name: 'Fashion Hub', logo: 'https://i.ibb.co.com/logo-placeholder1.png', bgColor: 'bg-white' },
//     { id: 2, name: 'Style Studio', logo: 'https://i.ibb.co.com/logo-placeholder2.png', bgColor: 'bg-white' },
//     { id: 3, name: 'Urban Outfitters', logo: 'https://i.ibb.co.com/logo-placeholder3.png', bgColor: 'bg-white' },
//     { id: 4, name: 'Retail Pro', logo: 'https://i.ibb.co.com/logo-placeholder4.png', bgColor: 'bg-white' },
//     { id: 5, name: 'Fashion Forward', logo: 'https://i.ibb.co.com/logo-placeholder5.png', bgColor: 'bg-white' },
//     { id: 6, name: 'Style Square', logo: 'https://i.ibb.co.com/logo-placeholder6.png', bgColor: 'bg-white' },
//     { id: 7, name: 'Metro Fashion', logo: 'https://i.ibb.co.com/logo-placeholder7.png', bgColor: 'bg-white' },
//     { id: 8, name: 'City Styles', logo: 'https://i.ibb.co.com/logo-placeholder8.png', bgColor: 'bg-white' },
//   ];

//   // Duplicate companies for seamless infinite scroll
//   const duplicatedCompanies = [...companies, ...companies];

//   return (
//     <div className="w-full bg-gray-50 py-8 border-y border-gray-200">
//       <div className="container mx-auto px-4">
//         {/* Section Title */}
//         <div className="text-center mb-6">
//           <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
//             Trusted by Leading Retailers
//           </h3>
//         </div>

//         {/* Scrolling Logos Container */}
//         <div className="relative overflow-hidden">
//           {/* Gradient Fade Left */}
//           <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          
//           {/* Gradient Fade Right */}
//           <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
//           {/* Auto-scrolling logos */}
//           <div className="flex animate-scroll-logos">
//             {duplicatedCompanies.map((company, index) => (
//               <div
//                 key={`${company.id}-${index}`}
//                 className="flex-shrink-0 mx-6"
//               >
//                 <div className={`w-32 h-16 ${company.bgColor} rounded-lg shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-shadow duration-300`}>
//                   {/* Placeholder for actual logo - replace with your client logos */}
//                   <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
//                     <span className="text-xs text-gray-600 font-medium text-center">
//                       {company.name}
//                     </span>
//                   </div>
                  
//                   {/* Uncomment when you have actual logo images */}
//                   {/* <Image
//                     src={company.logo}
//                     alt={company.name}
//                     width={120}
//                     height={60}
//                     className="max-w-full max-h-full object-contain"
//                   /> */}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Stats Counter */}
//         <div className="flex justify-center gap-8 mt-6 text-sm text-gray-600">
//           <div className="text-center">
//             <span className="font-bold text-xl text-gray-800">500+</span>
//             <span className="block text-xs">Active Clients</span>
//           </div>
//           <div className="text-center">
//             <span className="font-bold text-xl text-gray-800">50+</span>
//             <span className="block text-xs">Countries</span>
//           </div>
//           <div className="text-center">
//             <span className="font-bold text-xl text-gray-800">10k+</span>
//             <span className="block text-xs">Orders Shipped</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ScrollingLogos() {
  const scrollRef = useRef(null);

  // Company/client logos with actual image URLs
  const companies = [
    { 
      id: 1, 
      name: 'ZARA', 
      logo: 'https://i.ibb.co.com/tM2LG51b/images-1.png',
      width: 100,
      height: 40
    },
    { 
      id: 2, 
      name: 'H&M', 
      logo: 'https://i.ibb.co.com/3mNjX1rQ/HM-Logo.png',
      width: 80,
      height: 40
    },
    { 
      id: 3, 
      name: 'NIKE', 
      logo: 'https://i.ibb.co.com/jZMhZSCN/images.png',
      width: 80,
      height: 40
    },
    { 
      id: 4, 
      name: 'ADIDAS', 
      logo: 'https://i.ibb.co.com/tPX9C6Y8/Adidas-Logo-wine.png',
      width: 90,
      height: 40
    },
    { 
      id: 5, 
      name: 'PUMA', 
      logo: 'https://i.ibb.co.com/SXYYnjfd/Puma-Logo.png',
      width: 90,
      height: 40
    },
    { 
      id: 6, 
      name: 'GAP', 
      logo: 'https://i.ibb.co.com/nqG1fnsq/gap-logo-png-seeklogo-490183.png',
      width: 70,
      height: 40
    },
    { 
      id: 7, 
      name: "LEVI'S", 
      logo: 'https://i.ibb.co.com/gb7YqsMT/Levi-s-logo-svg.png',
      width: 90,
      height: 40
    },
    { 
      id: 8, 
      name: 'CALVIN KLEIN', 
      logo: 'https://i.ibb.co.com/WWrQVcgT/images-2.png',
      width: 120,
      height: 40
    },
    { 
      id: 9, 
      name: 'HUGO-BOSS', 
      logo: 'https://i.ibb.co/8D1N4LCz/Hugo-Boss-Logo-Download-Free-PNG.png',
      width: 110,
      height: 40
    },
    // { 
    //   id: 10, 
    //   name: 'RALPH LAUREN', 
    //   logo: 'https://i.ibb.co.com/logo-placeholder10.png',
    //   width: 110,
    //   height: 40
    // },
  ];

  // Duplicate companies for seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies];

  // Stats data
  const stats = [
    { value: '$100B+', label: 'Wholesale transactions' },
    { value: '14,000+', label: 'Brands' },
    { value: '675,000+', label: 'Buyers' },
    { value: '2.5M+', label: 'Connections' },
  ];

  return (
    <div className="w-full bg-white">
      {/* Scrolling Logos Section - With actual logo images */}
      <div className="border-y border-gray-200 py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden">
            {/* Gradient Fade Left */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
            
            {/* Gradient Fade Right */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            {/* Auto-scrolling logos - Actual images */}
            <div className="flex animate-scroll-logos items-center">
              {duplicatedCompanies.map((company, index) => (
                <div
                  key={`${company.id}-${index}`}
                  className="flex-shrink-0 mx-8"
                >
                  <div className="h-16 flex items-center justify-center">
                    {/* Logo Image */}
                    <div className="relative grayscale-0 hover:grayscale-0 transition-all duration-300 opacity-100 hover:opacity-100">
                      {/* <Image
                        src={company.logo}
                        alt={company.name}
                        width={company.width}
                        height={company.height}
                        className="object-contain max-h-12 w-auto"
                        style={{ 
                          width: 'auto',
                          height: 'auto',
                          maxHeight: '48px'
                        }}
                      /> */}
                                  <img
              src={company.logo}
              alt={company.name}
              width={company.width}
              height={company.height}
              className="object-contain max-h-12 w-auto"
              style={{ 
                width: 'auto',
                height: 'auto',
                maxHeight: '48px'
              }}
              loading="lazy" // Optional: adds lazy loading
            />

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            The industry's largest curated B2B network
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connecting global brands with verified retailers
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="text-2xl md:text-3xl font-bold text-[#d78347] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Subtle CTA */}
        <div className="text-center mt-10">
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Trusted by leading retailers worldwide
          </span>
        </div>
      </div>
    </div>
  );
}