



// "use client";

// import CountUp from 'react-countup';
// import { useInView } from 'framer-motion';
// import { useRef } from 'react';
// import { motion } from 'framer-motion';

// export default function StatsSection() {
//   const statsRef = useRef(null);
//   const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

//   const stats = [
//     { value: 100, label: 'Total transactions', suffix: 'B+', prefix: '$' },
//     { value: 14, label: 'Brands', suffix: 'K+' },
//     { value: 675, label: 'Buyers', suffix: 'K+' },
//     { value: 2.5, label: 'Connections', suffix: 'M+' },
//   ];

//   return (
//     <div className="container mx-auto px-4 pt-20 pb-0" ref={statsRef}>
//       {/* Headline with refined typography */}
//       <div className="text-center mb-0">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-4">
//           The industry's largest curated{' '}
//           <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd7332] to-[#c98250]">
//             B2B network
//           </span>
//         </h2>
//         <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
//           Connecting global brands with verified retailers across 150+ countries
//         </p>
        
//         {/* Decorative line with peach gradient */}
//         <div className="flex justify-center mt-6">
//           <div className="w-16 h-0.5 bg-gradient-to-r from-[#cd7332] to-[#e6a87c] rounded-full"></div>
//         </div>
//       </div>

//       {/* Stats Grid with 4 in one row - original sizing, updated colors */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
//         {stats.map((stat, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={statsInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             className="group relative"
//           >
//             {/* Card with peach theme accent */}
//             <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#d78347]/20 overflow-hidden">
//               {/* Background gradient on hover - peach theme */}
//               <div className="absolute inset-0 bg-gradient-to-br from-[#d78347]/0 to-[#e6a87c]/0 group-hover:from-[#d78347]/5 group-hover:to-[#e6a87c]/10 transition-all duration-500"></div>
              
//               {/* Content */}
//               <div className="relative z-10 text-center">
//                 <div className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-2 tracking-tight">
//                   {statsInView ? (
//                     <CountUp
//                       start={0}
//                       end={stat.value}
//                       duration={2.5}
//                       delay={index * 0.2}
//                       separator=","
//                       prefix={stat.prefix || ''}
//                       suffix={stat.suffix || ''}
//                       decimals={stat.value % 1 !== 0 ? 1 : 0}
//                     >
//                       {({ countUpRef }) => (
//                         <span ref={countUpRef} className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd7332] to-[#c98250]" />
//                       )}
//                     </CountUp>
//                   ) : (
//                     <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd7332] to-[#c98250]">
//                       0{stat.suffix}
//                     </span>
//                   )}
//                 </div>
//                 <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   {stat.label}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Professional trust indicator */}
//       <motion.div 
//         className="text-center mt-16"
//         initial={{ opacity: 0 }}
//         animate={statsInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.6, delay: 0.8 }}
//       >
//         {/* Empty div removed */}
//       </motion.div>
//     </div>
//   );
// }


"use client";

import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const [counts, setCounts] = useState({
    transactions: 0,
    brands: 0,
    buyers: 0,
    connections: 0
  });

  const stats = [
    { key: 'transactions', value: 100, label: 'Total transactions', suffix: 'B+', prefix: '$', isDecimal: false },
    { key: 'brands', value: 14, label: 'Brands', suffix: 'K+', isDecimal: false },
    { key: 'buyers', value: 675, label: 'Buyers', suffix: 'K+', isDecimal: false },
    { key: 'connections', value: 2.5, label: 'Connections', suffix: 'M+', isDecimal: true },
  ];

  // Custom countup animation
  useEffect(() => {
    if (!statsInView) return;

    const duration = 2500; // 2.5 seconds
    const stepTime = 20; // Update every 20ms
    const steps = duration / stepTime;
    
    const startTimes = {
      transactions: 0,
      brands: 200,
      buyers: 400,
      connections: 600
    };
    
    const intervals = {};
    
    stats.forEach((stat, index) => {
      setTimeout(() => {
        let current = 0;
        const target = stat.value;
        const increment = target / steps;
        
        intervals[stat.key] = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(intervals[stat.key]);
          }
          
          setCounts(prev => ({
            ...prev,
            [stat.key]: current
          }));
        }, stepTime);
      }, startTimes[stat.key] || index * 200);
    });
    
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [statsInView]);

  // Format the display value
  const formatValue = (stat, value) => {
    let displayValue = value;
    
    if (stat.isDecimal) {
      displayValue = value.toFixed(1);
    } else {
      displayValue = Math.floor(value);
    }
    
    return `${stat.prefix || ''}${displayValue}${stat.suffix || ''}`;
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-0" ref={statsRef}>
      {/* Headline with refined typography */}
      <div className="text-center mb-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-4">
          The industry's largest curated{' '}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd7332] to-[#c98250]">
            B2B network
          </span>
        </h2>
        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Connecting global brands with verified retailers across 150+ countries
        </p>
        
        {/* Decorative line with peach gradient */}
        <div className="flex justify-center mt-6">
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#cd7332] to-[#e6a87c] rounded-full"></div>
        </div>
      </div>

      {/* Stats Grid with 4 in one row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            {/* Card with peach theme accent */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#d78347]/20 overflow-hidden">
              {/* Background gradient on hover - peach theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d78347]/0 to-[#e6a87c]/0 group-hover:from-[#d78347]/5 group-hover:to-[#e6a87c]/10 transition-all duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-2 tracking-tight">
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd7332] to-[#c98250]">
                    {formatValue(stat, counts[stat.key])}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}