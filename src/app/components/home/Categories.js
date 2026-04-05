'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Loader2, ArrowRight } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const scrollContainerRef = useRef(null);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/categories');
      const data = await response.json();
      
      if (data.success) {
        // Transform API data to match component format - removed product count
        const formattedCategories = data.data.map((cat, index) => ({
          _id: cat._id,
          name: cat.name,
          image: cat.image?.url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
          slug: cat.slug,
          gradient: getGradientByIndex(index) // Use index-based gradient instead of random
        }));
        setCategories(formattedCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Professional gradient system - consistent and elegant
  const getGradientByIndex = (index) => {
    const gradients = [
      'from-gray-900/80 to-gray-800/60',      // Classic Dark
      'from-slate-800/80 to-slate-700/60',    // Slate
      'from-neutral-900/80 to-neutral-800/60', // Neutral
      'from-stone-800/80 to-stone-700/60',    // Stone
      'from-zinc-900/80 to-zinc-800/60',      // Zinc
      'from-gray-800/80 to-gray-700/60',      // Medium Dark
      'from-slate-900/80 to-slate-800/60',    // Deep Slate
      'from-neutral-800/80 to-neutral-700/60'  // Soft Neutral
    ];
    return gradients[index % gradients.length];
  };

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll functions
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      
      window.addEventListener('load', checkScroll);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('load', checkScroll);
      };
    }
  }, [categories]);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Updated Header Section - Left Aligned */}
          <div className="mb-10 md:mb-12">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]"
            >
              Curated Collections
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-gray-900 mt-3 mb-3"
            >
              Shop by <span className="font-semibold">Category</span>
            </motion.h2>
         
          </div>
          
          {/* Loading Skeleton */}
          <div className="flex justify-center items-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-8 h-8 text-blue-600" />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Updated Header Section - Left Aligned */}
          <div className="mb-10 md:mb-12">
            <span className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]">
              Curated Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-3 mb-3">
              Shop by <span className="font-semibold">Category</span>
            </h2>
            <p className="text-base text-gray-500 max-w-2xl">
              No categories available at the moment
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-2 pb-2 md:pt-6 md:pb-4 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Updated Header Section - Left Aligned */}
        <div className="mb-8 md:mb-12">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]"
          >
            Curated Collections
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-gray-900 mt-3 mb-3"
          >
            Shop by <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd7332] to-[#c98250]">Category</span>
          </motion.h2>
       
        </div>

        {/* Categories Carousel */}
        <div className="relative group">
          {/* Left Arrow with animation */}
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 -ml-3 md:-ml-4 hover:scale-110"
              aria-label="Scroll left"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          )}

          {/* Right Arrow with animation */}
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 -mr-3 md:-mr-4 hover:scale-110"
              aria-label="Scroll right"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-3 md:gap-4 pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
              >
                <Link href={`/products?category=${category._id}`}>
                  <motion.div 
                    className="relative h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden cursor-pointer"
                    whileHover="hover"
                  >
                    {/* Image with zoom animation */}
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-2xl"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500';
                      }}
                      variants={{
                        hover: { scale: 1.1 }
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Professional gradient overlay */}
                    <motion.div 
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-t ${category.gradient}`}
                      initial={{ opacity: 0.75 }}
                      variants={{
                        hover: { opacity: 0.85 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Category name - bottom left with proper wrapping */}
                    <motion.div 
                      className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-5 z-10 max-w-[70%]"
                      variants={{
                        hover: { y: -3 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white leading-tight drop-shadow-lg">
                        {category.name.split(' ').map((word, i, arr) => (
                          <span key={i} className="block">
                            {i === arr.length - 1 ? (
                              <span className="font-semibold">{word}</span>
                            ) : (
                              word
                            )}
                          </span>
                        ))}
                      </h3>
                    </motion.div>

                    {/* Browse Now text - appears on hover */}
                    <motion.div 
                      className="absolute bottom-0 right-0 p-3 sm:p-4 md:p-5 z-10"
                      initial={{ opacity: 0, x: 20 }}
                      variants={{
                        hover: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="inline-flex items-center gap-1.5 text-white text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-[2px] px-3 py-1.5 shadow-lg">
                        <span className="hidden sm:inline">Browse</span>
                        <span className="sm:hidden">Go</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Hint with animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4 md:hidden"
        >
          <motion.p 
            animate={{ x: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-xs text-gray-500"
          >
            ← Swipe to see more categories →
          </motion.p>
        </motion.div>
      </div>

      {/* Hide scrollbar globally */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}






// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight, Loader2, ArrowRight } from 'lucide-react';

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const [hoveredCategory, setHoveredCategory] = useState(null);
//   const scrollContainerRef = useRef(null);

//   // Fetch categories from API
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('https://b2b-backend-rosy.vercel.app/api/categories');
//       const data = await response.json();
      
//       if (data.success) {
//         // Transform API data to match component format
//         const formattedCategories = data.data.map(cat => ({
//           _id: cat._id,
//           name: cat.name,
//           image: cat.image?.url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
//           slug: cat.slug,
//         }));
//         setCategories(formattedCategories);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Check scroll position to show/hide arrows
//   const checkScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftArrow(scrollLeft > 0);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
//     }
//   };

//   // Scroll functions
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 300;
//       const newScrollLeft = direction === 'left' 
//         ? scrollContainerRef.current.scrollLeft - scrollAmount
//         : scrollContainerRef.current.scrollLeft + scrollAmount;
      
//       scrollContainerRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Add scroll event listener
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       container.addEventListener('scroll', checkScroll);
//       checkScroll();
      
//       window.addEventListener('resize', checkScroll);
//       window.addEventListener('load', checkScroll);
      
//       return () => {
//         container.removeEventListener('scroll', checkScroll);
//         window.removeEventListener('resize', checkScroll);
//         window.removeEventListener('load', checkScroll);
//       };
//     }
//   }, [categories]);

//   if (isLoading) {
//     return (
//       <section className="py-16 md:py-20 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="text-center mb-10 md:mb-12">
//             <motion.span 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]"
//             >
//               Curated Collections
//             </motion.span>
//             <motion.h2 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-3xl md:text-4xl font-light text-gray-900 mt-3 mb-3"
//             >
//               Shop by <span className="font-semibold">Category</span>
//             </motion.h2>
//             <motion.p 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-base text-gray-500 max-w-2xl mx-auto"
//             >
//               Discover our carefully selected collections
//             </motion.p>
//           </div>
          
//           {/* Loading Skeleton */}
//           <div className="flex justify-center items-center py-12">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             >
//               <Loader2 className="w-8 h-8 text-gray-400" />
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (categories.length === 0) {
//     return (
//       <section className="py-16 md:py-20 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="text-center mb-10 md:mb-12">
//             <span className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]">
//               Curated Collections
//             </span>
//             <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-3 mb-3">
//               Shop by <span className="font-semibold">Category</span>
//             </h2>
//             <p className="text-base text-gray-500 max-w-2xl mx-auto">
//               No categories available at the moment
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-12 md:py-20 bg-white">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Header with responsive design */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-12">
//           <div>
//             <motion.span 
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]"
//             >
//               Curated Collections
//             </motion.span>
//             <motion.h2 
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mt-2"
//             >
//               Shop by <span className="font-semibold">Category</span>
//             </motion.h2>
//           </div>
          
//           {/* Desktop View All Link */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="hidden md:block"
//           >
//             <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group">
//               View All Categories
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>
//         </div>

//         {/* Categories Carousel */}
//         <div className="relative group">
//           {/* Left Arrow - hidden on mobile */}
//           {showLeftArrow && (
//             <motion.button
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               onClick={() => scroll('left')}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl text-gray-900 p-2.5 rounded-full transition-all opacity-0 group-hover:opacity-100 -ml-4 hover:scale-110 hidden md:block"
//               aria-label="Scroll left"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </motion.button>
//           )}

//           {/* Right Arrow - hidden on mobile */}
//           {showRightArrow && (
//             <motion.button
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               onClick={() => scroll('right')}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl text-gray-900 p-2.5 rounded-full transition-all opacity-0 group-hover:opacity-100 -mr-4 hover:scale-110 hidden md:block"
//               aria-label="Scroll right"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ChevronRight className="w-4 h-4" />
//             </motion.button>
//           )}

//           {/* Scrollable Container */}
//           <div
//             ref={scrollContainerRef}
//             className="flex overflow-x-auto scrollbar-hide gap-3 sm:gap-4 md:gap-5 pb-4 scroll-smooth"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//             onMouseLeave={() => setHoveredCategory(null)}
//           >
//             {categories.map((category, index) => (
//               <motion.div
//                 key={category._id || index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 onHoverStart={() => setHoveredCategory(category._id)}
//                 onHoverEnd={() => setHoveredCategory(null)}
//                 className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px]"
//               >
//                 <Link href={`/products?category=${category._id}`}>
//                   <motion.div 
//                     className="relative h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] overflow-hidden cursor-pointer bg-gray-100"
//                     whileHover="hover"
//                   >
//                     {/* Image with zoom animation */}
//                     <motion.img
//                       src={category.image}
//                       alt={category.name}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500';
//                       }}
//                       variants={{
//                         hover: { scale: 1.05 }
//                       }}
//                       transition={{ duration: 0.7 }}
//                     />
                    
//                     {/* Dark overlay on hover */}
//                     <motion.div 
//                       className="absolute inset-0 bg-black"
//                       initial={{ opacity: 0 }}
//                       variants={{
//                         hover: { opacity: 0.25 }
//                       }}
//                       transition={{ duration: 0.3 }}
//                     />
                    
//                     {/* Category name - left bottom */}
//                     <motion.div 
//                       className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-5 z-10"
//                       variants={{
//                         hover: { y: -3 }
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white leading-tight">
//                         {category.name.split(' ').map((word, i, arr) => (
//                           <span key={i} className="block">
//                             {i === arr.length - 1 ? (
//                               <span className="font-semibold">{word}</span>
//                             ) : (
//                               word
//                             )}
//                           </span>
//                         ))}
//                       </h3>
//                     </motion.div>

//                     {/* Browse Now text - appears on hover */}
//                     <motion.div 
//                       className="absolute bottom-0 right-0 p-3 sm:p-4 md:p-5 z-10"
//                       initial={{ opacity: 0, x: 20 }}
//                       variants={{
//                         hover: { opacity: 1, x: 0 }
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <span className="inline-flex items-center gap-1.5 text-white text-xs sm:text-sm font-medium">
//                         <span className="hidden sm:inline">Browse</span>
//                         <span className="sm:hidden">Go</span>
//                         <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
//                       </span>
//                     </motion.div>

//                     {/* Minimal line animation on hover */}
//                     <motion.div 
//                       className="absolute bottom-0 left-0 h-[2px] bg-white"
//                       initial={{ width: 0 }}
//                       variants={{
//                         hover: { width: '100%' }
//                       }}
//                       transition={{ duration: 0.4 }}
//                     />
//                   </motion.div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Mobile View All Link and Scroll Hint */}
//         <div className="flex flex-col items-center mt-6 md:hidden">
//           <motion.div 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.3 }}
//             className="mb-3"
//           >
//             <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
//               View All Categories
//               <ArrowRight className="w-4 h-4" />
//             </Link>
//           </motion.div>
          
//           <motion.div 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.5 }}
//           >
//             <p className="text-xs text-gray-400 tracking-wider">
//               ← SWIPE TO EXPLORE →
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       {/* Hide scrollbar globally */}
//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// }