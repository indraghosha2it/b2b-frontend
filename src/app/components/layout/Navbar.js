
// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { usePathname } from 'next/navigation';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   const isActive = (path) => pathname === path;

//   return (
// <div className="navbar bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg fixed top-0 z-50">      {/* Mobile Menu */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <label tabIndex={0} className="btn btn-ghost lg:hidden text-white hover:bg-slate-700">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </label>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-slate-800 rounded-box w-52 text-white">
//             {navItems.map((item) => (
//               <li key={item.name}>
//                 <Link 
//                   href={item.href}
//                   className={isActive(item.href) ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//             <li className="border-t border-slate-700 mt-2 pt-2">
//               <Link href="/inquiry-cart" className="flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Inquiry Cart
//                 <span className="badge badge-sm badge-primary">0</span>
//               </Link>
//             </li>
//             <li>
//               <Link href="/dashboard" className="flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 Account
//               </Link>
//             </li>
//           </ul>
//         </div>
        
//         {/* Logo/Brand */}
//       {/* Logo/Brand */}
// <Link href="/" className="btn btn-ghost normal-case text-xl font-bold text-white flex items-center gap-2">
//   {/* Logo Image */}
//   <div className="relative w-12 h-12 overflow-hidden">
//     <img 
//       src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
//       alt="Asian Clothify Logo"
//       className="w-full h-full object-contain"
//     />
//   </div>
 
// </Link>
//       </div>

//       {/* Desktop Menu - Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 text-white">
//           {navItems.map((item) => (
//             <li key={item.name}>
//               <Link 
//                 href={item.href}
//                 className={`${isActive(item.href) 
//                   ? 'bg-blue-600 text-white' 
//                   : 'hover:bg-slate-700 text-gray-200'
//                 } transition-colors duration-200`}
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}
          
//           {/* Categories Dropdown */}
//           <li>
//             <details>
//               <summary className="hover:bg-slate-700 text-gray-200">Categories</summary>
//               <ul className="p-2 bg-slate-800 w-48 z-50 shadow-xl rounded-lg">
//                 <li><Link href="/categories/t-shirts" className="hover:bg-slate-700">T-Shirts</Link></li>
//                 <li><Link href="/categories/hoodies" className="hover:bg-slate-700">Hoodies</Link></li>
//                 <li><Link href="/categories/pants" className="hover:bg-slate-700">Pants</Link></li>
//                 <li><Link href="/categories/jackets" className="hover:bg-slate-700">Jackets</Link></li>
//                 <li className="border-t border-slate-700 mt-2 pt-2">
//                   <Link href="/categories/all" className="text-blue-400">View All</Link>
//                 </li>
//               </ul>
//             </details>
//           </li>
//         </ul>
//       </div>

//       {/* Right side - Actions */}
//       <div className="navbar-end gap-2">
//         {/* Inquiry Cart - Desktop */}
//         <Link href="/inquiry-cart" className="btn btn-ghost btn-circle hidden lg:flex text-white hover:bg-slate-700 relative">
//           <div className="indicator">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             <span className="badge badge-sm badge-primary indicator-item">0</span>
//           </div>
//         </Link>

//         {/* WhatsApp Button - Always Visible */}
       

//         {/* Account/Login Button */}
//         <Link href="/login" className="btn btn-outline btn-sm hidden lg:flex text-white border-white hover:bg-white hover:text-slate-900">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//           </svg>
//           Sign In
//         </Link>

//         {/* Register Button - Desktop */}
//         <Link href="/register" className="btn btn-primary btn-sm hidden lg:flex">
//           Register
//           <span className="ml-1 text-xs">(B2B)</span>
//         </Link>

//         {/* Mobile Menu Button - Already handled in dropdown */}
//       </div>
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className=" navbar fixed top-0 z-50 w-full shadow-lg" style={{ backgroundColor: '#2A2A2A' /* muted brown/pink */ }}>
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-white hover:bg-[#E39A65] hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52" style={{ backgroundColor: '#884F52', color: '#FBFFFF' }}>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  style={{
                    color: '#FBFFFF',
                    backgroundColor: isActive(item.href) ? '#E39A65' : 'transparent',
                  }}
                  className={`hover:bg-[#E39A65] hover:text-gray-900 ${isActive(item.href) ? 'pointer-events-none' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="border-t border-[#E39A65] mt-2 pt-2">
              <Link href="/inquiry-cart" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Inquiry Cart
                <span className="badge badge-sm" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>0</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Logo/Brand - NO hover effect whatsoever */}
        <Link 
          href="/" 
          className="btn btn-ghost normal-case text-xl font-bold flex items-center gap-2"
          style={{ color: '#FBFFFF' }}
          onMouseEnter={(e) => {
            // Completely prevent any hover effect on logo
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#FBFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#FBFFFF';
          }}
        >
          {/* Logo Image */}
          <div className="relative w-28 h-20 overflow-hidden" style={{ background: 'transparent' }}>
            <img 
              src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
              alt="Asian Clothify Logo"
              className="w-full h-full object-contain"
              style={{ filter: 'none' }} /* prevent any automatic hover effects */
            />
          </div>
        </Link>
      </div>

      {/* Desktop Menu - Center - NO DROPDOWNS */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1" style={{ color: '#FBFFFF' }}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                style={{
                  color: '#FBFFFF',
                  backgroundColor: isActive(item.href) ? '#E39A65' : 'transparent',
                }}
                className={`hover:bg-[#E39A65] hover:text-gray-900 transition-colors duration-200 ${isActive(item.href) ? 'pointer-events-none' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          
          {/* NO CATEGORIES DROPDOWN - completely removed as requested */}
        </ul>
      </div>

      {/* Right side - Actions */}
      <div className="navbar-end gap-2">
        {/* Inquiry Cart - Desktop */}
        <Link 
          href="/inquiry-cart" 
          className="btn btn-ghost btn-circle hidden lg:flex relative"
          style={{ color: '#FBFFFF' }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.classList.contains('btn-ghost')) return;
            e.currentTarget.style.backgroundColor = '#E39A65';
            e.currentTarget.style.color = '#1f1f1f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#FBFFFF';
          }}
        >
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>0</span>
          </div>
        </Link>

        {/* Account/Login Button */}
        <Link 
          href="/login" 
          className="btn btn-outline btn-sm hidden lg:flex"
          style={{
            color: '#FBFFFF',
            borderColor: '#FBFFFF',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E39A65';
            e.currentTarget.style.borderColor = '#E39A65';
            e.currentTarget.style.color = '#1f1f1f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '#FBFFFF';
            e.currentTarget.style.color = '#FBFFFF';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Sign In
        </Link>

        {/* Register Button - Desktop */}
        <Link 
          href="/register" 
          className="btn btn-sm hidden lg:flex"
          style={{
            backgroundColor: '#E39A65',
            color: '#1f1f1f',
            borderColor: '#E39A65'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FBFFFF';
            e.currentTarget.style.borderColor = '#FBFFFF';
            e.currentTarget.style.color = '#884F52';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#E39A65';
            e.currentTarget.style.borderColor = '#E39A65';
            e.currentTarget.style.color = '#1f1f1f';
          }}
        >
          Register
          <span className="ml-1 text-xs">(B2B)</span>
        </Link>
      </div>
    </div>
  );
}