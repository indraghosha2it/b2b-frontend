'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function AlibabaTrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // Stats data
  const stats = [
    { label: 'Years on Alibaba', value: '8+', icon: '📅', subtext: 'Gold Supplier' },
    { label: 'Transactions', value: '15K+', icon: '📦', subtext: 'Successful deals' },
    { label: 'Response Rate', value: '98%', icon: '⚡', subtext: 'Within 2 hours' },
    { label: 'Happy Clients', value: '500+', icon: '😊', subtext: 'Worldwide' },
  ];

  // Featured products
  const featuredItems = [
    {
      id: 1,
      name: "High Quality Spring Famous Brand Designer Luxury Sweatshirts",
      price: "$17.89",
      moq: "10 pcs",
      image: "https://i.ibb.co.com/PZZ9vvCr/H4d5f244f6765473f8a752284f942313fs.jpg",
    },
    {
      id: 2,
      name: "Custom Logo Wholesale Sweaters",
      price: "$4.40 -5.30",
      moq: "2 pcs",
      image: "https://i.ibb.co.com/MykjVrB1/He2657cedaf1648b6a43a8d008740bc85g.jpg",
    },
    {
      id: 3,
      name: "Premium Quality Fashionable T-shirt for Women",
      price: "$2.86-3.46",
      moq: "1000 pcs",
      image: "https://i.ibb.co.com/39vfrscX/Ab2eed3d93e194a909a56591c8c29fe51b.jpg",
    },
    {
      id: 4,
      name: "Denim Jacket",
      price: "$12.90",
      moq: "100 pcs",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300&h=300&fit=crop",
    }
  ];

  // Trust badges
  const badges = [
    { name: 'Gold Supplier', icon: '⭐', desc: '8+ Years Verified' },
    { name: 'Trade Assurance', icon: '🛡️', desc: 'Secure payments' },
    { name: 'Onsite Checked', icon: '✓', desc: 'Verified facility' },
    { name: 'Fast Response', icon: '⚡', desc: '98% response rate' },
  ];

  return (
    <section ref={sectionRef} className="pt-10 pb-0 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Partner Badge */}
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Verified Alibaba Partner</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trusted Seller on{' '}
            <span className="text-orange-500">Alibaba.com</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            8+ years of excellence in wholesale apparel manufacturing
          </p>
        </div>

        {/* Stats Grid */}
        {/* <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-gray-500">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div> */}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Store Preview */}
          <div className={`space-y-5 transition-all duration-700 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {/* Alibaba Store Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Store Header */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-5 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-orange-500 rounded-lg px-2 py-1 flex-shrink-0">
                        <span className="text-white font-bold text-xs">Alibaba</span>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Gold Supplier
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-0.5 truncate">Asian Clothify.</h3>
                    <p className="text-xs text-gray-600 truncate">Wholesale Apparel Manufacturer</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="flex items-center gap-0.5 mb-1">
                      {[1,2,3,4,5].map(star => (
                        <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-600 whitespace-nowrap">4.9 (1.2k reviews)</span>
                  </div>
                </div>
              </div>

              {/* Store Stats */}
              <div className="grid grid-cols-3 divide-x divide-gray-200">
                {[
                  { label: 'Products', value: '280+' },
                  { label: 'Response Rate', value: '98%' },
                  { label: 'Response Time', value: '2h' }
                ].map((stat, index) => (
                  <div key={index} className="text-center py-3">
                    <div className="font-bold text-gray-900 text-sm">{stat.value}</div>
                    <div className="text-[10px] text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-gray-200 space-y-2">
                <Link
                  href="https://asianclothltd.m.trustpass.alibaba.com/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-orange-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all duration-300"
                >
                  Visit Our Alibaba Store →
                </Link>
                <Link
                  href="/contact#inquiry-form"
                  className="block w-full text-center bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Request Sample Order
                </Link>
              </div>
            </div>

            {/* Trust Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {badges.map((badge, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-xl mb-1">{badge.icon}</div>
                  <div className="font-semibold text-gray-900 text-xs mb-0.5">{badge.name}</div>
                  <div className="text-[9px] text-gray-500">{badge.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Featured Products */}
          <div className={`space-y-5 transition-all duration-700 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">🔥 Featured on Alibaba</h3>
                <Link 
                  href="https://asianclothltd.m.trustpass.alibaba.com/index.html" 
                  className="text-xs text-orange-500 font-medium hover:text-orange-600 transition-colors duration-300 flex items-center gap-1 group flex-shrink-0"
                >
                  View All 
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {featuredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="relative h-24 bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2">
                      <h4 className="font-medium text-gray-900 text-xs mb-1 truncate">{item.name}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-orange-500 font-bold text-xs">{item.price}</span>
                        <span className="text-[8px] text-gray-500">MOQ: {item.moq}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-8 text-center p-6 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-700 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Ready to start your wholesale order?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Contact us directly or browse our complete catalog on Alibaba
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/products"
              className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Browse All Products
            </Link>
            <Link
              href="https://asianclothltd.m.trustpass.alibaba.com/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-gray-900 rounded-lg text-sm font-semibold border border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
            >
              View on Alibaba
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}