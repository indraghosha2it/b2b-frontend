'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Banner slides data with clothing images
  const slides = [
    {
      id: 1,
      title: "Premium Wholesale Apparel",
      subtitle: "Factory-direct pricing for retailers worldwide",
      highlights: ["Low MOQ", "Fast Global Shipping", "Custom Branding"],
      // Bulk t-shirts / wholesale clothing
      image: "https://i.ibb.co.com/WvgNd004/photo-1567401893414-76b7b1e5a7a5.jpg",
      bgColor: "from-blue-900 to-purple-900",
      cta: "Start Your Inquiry",
      ctaLink: "/inquiry"
    },
    {
      id: 2,
      title: "Bulk Orders Made Easy",
      subtitle: "Get tiered pricing on 500+ products",
      highlights: ["Volume Discounts", "Sample Orders", "Quality Guaranteed"],
      // Stacked hoodies / bulk clothing
      image: "https://i.ibb.co.com/VWmB7V88/photo-1556905055-8f358a7a47b2.jpg",
      bgColor: "from-green-900 to-teal-900",
      cta: "Browse Collection",
      ctaLink: "/products"
    },
    {
      id: 3,
      title: "Global Shipping Partner",
      subtitle: "Delivering to 50+ countries worldwide",
      highlights: ["Express Delivery", "Trackable Shipments", "Customs Support"],
      // Fashion warehouse / shipping
      image: "https://i.ibb.co.com/k6VRrzL5/photo-1441986300917-64674bd600d8.jpg",
      bgColor: "from-orange-900 to-red-900",
      cta: "Contact Us",
      ctaLink: "/contact"
    }
  ];

  // Auto slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full mt-12 h-[430px] md:h-[490px] lg:h-[530px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-30 z-10`} />
          
          {/* Content - Adjusted for increased height */}
          <div className="relative z-20 h-full flex items-center justify-center text-white">
            <div className="container mx-auto px-4 text-center md:text-left md:px-8 lg:px-16">
              <div className="max-w-2xl mx-auto md:mx-0">
                {/* Title with animation - Slightly larger */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
                  {slide.title}
                </h1>
                
                {/* Subtitle - Slightly larger */}
                <p className="text-lg md:text-xl lg:text-2xl mb-6 text-gray-200 animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start animate-fade-in-up animation-delay-400">
                  {slide.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm md:text-base border border-white/30"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center px-8 py-4 bg-[#d9884e] text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-600"
                >
                  {slide.cta}
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#d9884e] w-8'
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}