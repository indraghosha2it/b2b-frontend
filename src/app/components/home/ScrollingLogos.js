



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
      <div className=" py-8 bg-white">
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
      
    </div>
  );
}



