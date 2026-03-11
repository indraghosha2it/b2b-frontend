
// 'use client';

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { ChevronDown, LogOut, Settings, User, LayoutDashboard, Users } from 'lucide-react';
// import { toast } from 'sonner';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Function to check and update user state
//   const checkUserState = () => {
//     if (typeof window !== 'undefined') {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//     }
//   };

//   // Fetch cart count
//   // const fetchCartCount = async () => {
//   //   const token = localStorage.getItem('token');
//   //   if (token) {
//   //     try {
//   //       const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//   //         headers: {
//   //           'Authorization': `Bearer ${token}`
//   //         }
//   //       });
//   //       const data = await response.json();
//   //       if (data.success) {
//   //         setCartCount(data.data.totalItems || 0);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching cart count:', error);
//   //     }
//   //   } else {
//   //     setCartCount(0);
//   //   }
//   // };
//   // Fetch cart count
// const fetchCartCount = async () => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       // Add timeout to prevent hanging requests
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
//       const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         signal: controller.signal
//       }).finally(() => clearTimeout(timeoutId));
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       if (data.success) {
//         setCartCount(data.data?.totalItems || 0);
//       } else {
//         console.error('API returned error:', data.error);
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.error('Error fetching cart count:', error);
//       setCartCount(0);
      
//       // Show user-friendly message
//       if (error.name === 'AbortError') {
//         toast?.error('Request timeout. Please check your connection.');
//       } else {
//         toast?.error('Failed to connect to server. Please try again.');
//       }
//     }
//   } else {
//     setCartCount(0);
//   }
// };

//   // Initial check
//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();

//     // Add event listener for storage changes
//     const handleStorageChange = (e) => {
//       if (e.key === 'user' || e.key === 'token') {
//         checkUserState();
//         fetchCartCount();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     // Custom event listener for auth changes
//     const handleAuthChange = () => {
//       checkUserState();
//       fetchCartCount();
//     };

//     window.addEventListener('auth-change', handleAuthChange);

//     // Custom event listener for cart updates
//     const handleCartUpdate = () => {
//       fetchCartCount();
//     };

//     window.addEventListener('cart-update', handleCartUpdate);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, []);

//   // Listen for route changes
//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();
//   }, [pathname]);

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Blog', href: '/blog' },
//   ];

//   const isActive = (path) => pathname === path;

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('rememberedEmail');
//     setUser(null);
//     setCartCount(0);
//     setUserMenuOpen(false);
    
//     // Dispatch custom event to notify other components
//     window.dispatchEvent(new Event('auth-change'));
    
//     router.push('/');
//   };

//   // Get dashboard link based on user role
//   const getDashboardLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/dashboard';
//       case 'moderator':
//         return '/moderator/dashboard';
//       case 'customer':
//         return '/customer/dashboard';
//       default:
//         return '/';
//     }
//   };

//   // Get settings link based on user role
//   const getSettingsLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/settings';
//       case 'moderator':
//         return '/moderator/settings';
//       case 'customer':
//         return '/customer/settings';
//       default:
//         return '/';
//     }
//   };

//   // Get role display name
//   const getRoleDisplay = () => {
//     if (!user) return '';
//     switch (user.role) {
//       case 'admin':
//         return 'Administrator';
//       case 'moderator':
//         return 'Moderator';
//       case 'customer':
//         return 'B2B Customer';
//       default:
//         return user.role;
//     }
//   };

//   // Get display name
//   const getDisplayName = () => {
//     if (!user) return '';
//     return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
//   };

//   // Get initials for avatar
//   const getInitials = () => {
//     if (!user) return 'U';
//     const name = user.companyName || user.contactPerson || user.email;
//     return name?.charAt(0).toUpperCase() || 'U';
//   };

//   return (
//     <div className="navbar fixed top-0 z-50 w-full shadow-lg" style={{ backgroundColor: '#2A2A2A' }}>
//       {/* Mobile Menu */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <label tabIndex={0} className="btn btn-ghost lg:hidden text-white hover:bg-[#E39A65] hover:text-gray-900">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </label>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52" style={{ backgroundColor: '#884F52', color: '#FBFFFF' }}>
//             {navItems.map((item) => (
//               <li key={item.name} className="w-full">
//                 <Link 
//                   href={item.href}
//                   style={{
//                     color: '#FBFFFF',
//                     backgroundColor: isActive(item.href) ? '#E39A65' : 'transparent',
//                   }}
//                   className={`hover:bg-[#E39A65] hover:text-gray-900 block w-full ${isActive(item.href) ? 'pointer-events-none' : ''}`}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
            
//             {/* Mobile menu user section */}
//             {user ? (
//               <>
//                 <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//                   <div className="flex flex-col px-2 py-1 text-sm text-[#FBFFFF] w-full items-start">
//                     <div className="font-semibold truncate text-left w-full">{getDisplayName()}</div>
//                     <div className="text-xs opacity-80 truncate text-left w-full">{user.email}</div>
//                     <div className="text-xs mt-1.5 text-left w-full">
//                       <span className="inline-block bg-[#E39A65] text-gray-900 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getDashboardLink()} 
//                     className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getSettingsLink()} 
//                     className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Settings className="h-4 w-4 flex-shrink-0" />
//                     <span>Settings</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <button
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full text-left px-2 py-2 justify-start"
//                   >
//                     <LogOut className="h-4 w-4 flex-shrink-0" />
//                     <span>Logout</span>
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//                   <Link href="/login" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
//                     <User className="h-4 w-4 flex-shrink-0" />
//                     <span>Sign In</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link href="/register" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
//                     <Users className="h-4 w-4 flex-shrink-0" />
//                     <span>Register (B2B)</span>
//                   </Link>
//                 </li>
//               </>
//             )}
            
//             <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//               <Link href="/inquiry-cart" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Inquiry Cart
//                 {cartCount > 0 && (
//                   <span className="badge badge-sm" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>{cartCount}</span>
//                 )}
//               </Link>
//             </li>
//           </ul>
//         </div>
        
//         {/* Logo/Brand */}
//         <Link 
//           href="/" 
//           className="btn btn-ghost normal-case text-xl font-bold flex items-center gap-2"
//           style={{ color: '#FBFFFF' }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.backgroundColor = 'transparent';
//             e.currentTarget.style.color = '#FBFFFF';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.backgroundColor = 'transparent';
//             e.currentTarget.style.color = '#FBFFFF';
//           }}
//         >
//           <div className="relative w-28 h-20 overflow-hidden" style={{ background: 'transparent' }}>
//             <img 
//               src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
//               alt="Asian Clothify Logo"
//               className="w-full h-full object-contain"
//               style={{ filter: 'none' }}
//             />
//           </div>
//         </Link>
//       </div>

//       {/* Desktop Menu - Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1" style={{ color: '#FBFFFF' }}>
//           {navItems.map((item) => (
//             <li key={item.name}>
//               <Link 
//                 href={item.href}
//                 style={{
//                   color: '#FBFFFF',
//                   backgroundColor: isActive(item.href) ? '#E39A65' : 'transparent',
//                 }}
//                 className={`hover:bg-[#E39A65] hover:text-gray-900 transition-colors duration-200 ${isActive(item.href) ? 'pointer-events-none' : ''}`}
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right side - Actions */}
//       <div className="navbar-end gap-2">
//         {/* Inquiry Cart - Desktop */}
//         <Link 
//           href="/inquiry-cart" 
//           className="btn btn-ghost btn-circle hidden lg:flex relative"
//           style={{ color: '#FBFFFF' }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.backgroundColor = '#E39A65';
//             e.currentTarget.style.color = '#1f1f1f';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.backgroundColor = 'transparent';
//             e.currentTarget.style.color = '#FBFFFF';
//           }}
//         >
//           <div className="indicator">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             {cartCount > 0 && (
//               <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>
//                 {cartCount}
//               </span>
//             )}
//           </div>
//         </Link>

//         {/* User Menu or Auth Buttons */}
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={() => setUserMenuOpen(!userMenuOpen)}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-700 transition-colors"
//               style={{ color: '#FBFFFF' }}
//             >
//               <div className="w-8 h-8 rounded-full bg-[#E39A65] flex items-center justify-center text-gray-900 font-semibold">
//                 {getInitials()}
//               </div>
//               <span className="hidden lg:inline max-w-[100px] truncate">
//                 {getDisplayName()}
//               </span>
//               <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {/* Dropdown Menu */}
//             {userMenuOpen && (
//               <>
//                 <div 
//                   className="fixed inset-0 z-40"
//                   onClick={() => setUserMenuOpen(false)}
//                 />
//                 <div className="absolute right-0 mt-2 w-64 bg-[#2A2A2A] rounded-xl shadow-xl border border-gray-700 py-2 z-50">
//                   {/* User Info */}
//                   <div className="px-4 py-3 border-b border-gray-700">
//                     <p className="text-sm font-semibold text-white">{getDisplayName()}</p>
//                     <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
//                     <div className="mt-2">
//                       <span 
//                         className="px-2 py-0.5 text-xs font-medium rounded-full" 
//                         style={{ 
//                           backgroundColor: '#faf1e9',
//                           color: '#E39A65'
//                         }}
//                       >
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Menu Items */}
//                   <Link
//                     href={getDashboardLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-neutral-700 transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="w-4 h-4" style={{ color: '#E39A65' }} />
//                     <span>Dashboard</span>
//                   </Link>

//                   <Link
//                     href={getSettingsLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-neutral-700 transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <Settings className="w-4 h-4" style={{ color: '#E39A65' }} />
//                     <span>Settings</span>
//                   </Link>

//                   {/* Logout */}
//                   <button
//                     onClick={() => {
//                       setUserMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-neutral-700 transition-colors w-full text-left border-t border-gray-700 mt-1 pt-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* Sign In Button */}
//             <Link 
//               href="/login" 
//               className="btn btn-outline btn-sm hidden lg:flex"
//               style={{
//                 color: '#FBFFFF',
//                 borderColor: '#FBFFFF',
//                 backgroundColor: 'transparent'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#E39A65';
//                 e.currentTarget.style.borderColor = '#E39A65';
//                 e.currentTarget.style.color = '#1f1f1f';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = 'transparent';
//                 e.currentTarget.style.borderColor = '#FBFFFF';
//                 e.currentTarget.style.color = '#FBFFFF';
//               }}
//             >
//               <User className="h-4 w-4 mr-2" />
//               Sign In
//             </Link>

//             {/* Register Button */}
//             <Link 
//               href="/register" 
//               className="btn btn-sm hidden lg:flex"
//               style={{
//                 backgroundColor: '#E39A65',
//                 color: '#1f1f1f',
//                 borderColor: '#E39A65'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#FBFFFF';
//                 e.currentTarget.style.borderColor = '#FBFFFF';
//                 e.currentTarget.style.color = '#884F52';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = '#E39A65';
//                 e.currentTarget.style.borderColor = '#E39A65';
//                 e.currentTarget.style.color = '#1f1f1f';
//               }}
//             >
//               Register
//               <span className="ml-1 text-xs">(B2B)</span>
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }








// 2

// 'use client';

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { ChevronDown, LogOut, Settings, User, LayoutDashboard, Users } from 'lucide-react';
// import { toast } from 'sonner'; // ✅ IMPORT ADDED

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false); // Add loading state
//   const pathname = usePathname();
//   const router = useRouter();

//   // Function to check and update user state
//   const checkUserState = () => {
//     if (typeof window !== 'undefined') {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//     }
//   };

//   // Fetch cart count with better error handling
//   // const fetchCartCount = async () => {
//   //   const token = localStorage.getItem('token');
//   //   if (token) {
//   //     // Don't set loading if we already have a count
//   //     setIsLoading(true);
      
//   //     try {
//   //       // Add timeout to prevent hanging requests
//   //       const controller = new AbortController();
//   //       const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
        
//   //       console.log('🔍 Fetching cart from:', 'http://localhost:5000/api/inquiry-cart');
        
//   //       const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//   //         headers: {
//   //           'Authorization': `Bearer ${token}`,
//   //           'Content-Type': 'application/json'
//   //         },
//   //         signal: controller.signal,
//   //         mode: 'cors', // Explicitly set CORS mode
//   //         cache: 'no-cache' // Disable caching
//   //       }).finally(() => clearTimeout(timeoutId));
        
//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error! status: ${response.status}`);
//   //       }
        
//   //       const data = await response.json();
//   //       console.log('📦 Cart data received:', data);
        
//   //       if (data.success) {
//   //         setCartCount(data.data?.totalItems || 0);
//   //       } else {
//   //         console.error('API returned error:', data.error);
//   //         setCartCount(0);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching cart count:', error);
//   //       setCartCount(0);
        
//   //       // Show user-friendly message only if it's a critical error
//   //       // Don't show toast for every error to avoid spamming
//   //       if (error.name === 'AbortError') {
//   //         console.warn('Request timeout - API might be slow');
//   //         // Silent fail - don't show toast for timeout
//   //       } else if (error.message.includes('Failed to fetch')) {
//   //         console.warn('Network error - API might be down or CORS issue');
//   //         // Silent fail for network errors
//   //       } else {
//   //         // Only show toast for other errors
//   //         toast?.error('Failed to fetch cart. Please refresh.');
//   //       }
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   } else {
//   //     setCartCount(0);
//   //   }
//   // };
//   // Fetch cart count with better error handling
// // Fetch cart count with better error handling
// const fetchCartCount = async () => {
//   const token = localStorage.getItem('token');
  
//   // Always reset cart count if no token
//   if (!token) {
//     setCartCount(0);
//     return;
//   }
  
//   try {
//     // Add timeout to prevent hanging requests
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
//     const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       signal: controller.signal,
//       mode: 'cors',
//       cache: 'no-cache'
//     }).finally(() => clearTimeout(timeoutId));
    
//     // Handle 401 Unauthorized - token expired or invalid
//     if (response.status === 401) {
//       console.log('🔐 Auth token expired or invalid, clearing local storage');
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       setUser(null);
//       setCartCount(0);
//       window.dispatchEvent(new Event('auth-change'));
//       return;
//     }
    
//     if (!response.ok) {
//       console.warn(`Cart fetch returned ${response.status}, setting cart to 0`);
//       setCartCount(0);
//       return;
//     }
    
//     const data = await response.json();
    
//     if (data.success) {
//       // FIX: Count number of items, not total quantity
//       const itemCount = data.data?.items?.length || 0;
//       setCartCount(itemCount);
//       console.log('📦 Cart item count:', itemCount);
//     } else {
//       console.warn('API returned error:', data.error);
//       setCartCount(0);
//     }
//   } catch (error) {
//     console.warn('Cart fetch failed (silent):', error.message);
//     setCartCount(0);
//   }
// };

//   // Test API connection on mount
//   useEffect(() => {
//     const testConnection = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/health');
//         const data = await response.json();
//         console.log('✅ Backend connection test:', data);
//       } catch (error) {
//         console.error('❌ Backend connection failed:', error);
//       }
//     };
    
//     testConnection();
//   }, []);

//   // Initial check
//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();

//     // Add event listener for storage changes
//     const handleStorageChange = (e) => {
//       if (e.key === 'user' || e.key === 'token') {
//         checkUserState();
//         fetchCartCount();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     // Custom event listener for auth changes
//     const handleAuthChange = () => {
//       checkUserState();
//       fetchCartCount();
//     };

//     window.addEventListener('auth-change', handleAuthChange);

//     // Custom event listener for cart updates
//     const handleCartUpdate = () => {
//       fetchCartCount();
//     };

//     window.addEventListener('cart-update', handleCartUpdate);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, []);

//   // Listen for route changes
//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();
//   }, [pathname]);

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Blog', href: '/blog' },
//   ];

//   const isActive = (path) => pathname === path;

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('rememberedEmail');
//     setUser(null);
//     setCartCount(0);
//     setUserMenuOpen(false);
    
//     // Dispatch custom event to notify other components
//     window.dispatchEvent(new Event('auth-change'));
    
//     toast.success('Logged out successfully');
//     router.push('/');
//   };

//   // Get dashboard link based on user role
//   const getDashboardLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/dashboard';
//       case 'moderator':
//         return '/moderator/dashboard';
//       case 'customer':
//         return '/customer/dashboard';
//       default:
//         return '/';
//     }
//   };

//   // Get settings link based on user role
//   const getSettingsLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/settings';
//       case 'moderator':
//         return '/moderator/settings';
//       case 'customer':
//         return '/customer/settings';
//       default:
//         return '/';
//     }
//   };

//   // Get role display name
//   const getRoleDisplay = () => {
//     if (!user) return '';
//     switch (user.role) {
//       case 'admin':
//         return 'Administrator';
//       case 'moderator':
//         return 'Moderator';
//       case 'customer':
//         return 'B2B Customer';
//       default:
//         return user.role;
//     }
//   };

//   // Get display name
//   const getDisplayName = () => {
//     if (!user) return '';
//     return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
//   };

//   // Get initials for avatar
//   const getInitials = () => {
//     if (!user) return 'U';
//     const name = user.companyName || user.contactPerson || user.email;
//     return name?.charAt(0).toUpperCase() || 'U';
//   };

//   return (
//     <div className="navbar fixed top-0 z-50 w-full shadow-lg" style={{ backgroundColor: '#2A2A2A' }}>
//       {/* Mobile Menu */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <label tabIndex={0} className="btn btn-ghost lg:hidden text-white hover:bg-[#E39A65] hover:text-gray-900">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </label>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52" style={{ backgroundColor: '#884F52', color: '#FBFFFF' }}>
//             {navItems.map((item) => (
//               <li key={item.name} className="w-full">
//                 <Link 
//                   href={item.href}
//                   style={{
//                     color: '#FBFFFF',
//                     backgroundColor: isActive(item.href) ? '#E39A65' : 'transparent',
//                   }}
//                   className={`hover:bg-[#E39A65] hover:text-gray-900 block w-full ${isActive(item.href) ? 'pointer-events-none' : ''}`}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
            
//             {/* Mobile menu user section */}
//             {user ? (
//               <>
//                 <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//                   <div className="flex flex-col px-2 py-1 text-sm text-[#FBFFFF] w-full items-start">
//                     <div className="font-semibold truncate text-left w-full">{getDisplayName()}</div>
//                     <div className="text-xs opacity-80 truncate text-left w-full">{user.email}</div>
//                     <div className="text-xs mt-1.5 text-left w-full">
//                       <span className="inline-block bg-[#E39A65] text-gray-900 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getDashboardLink()} 
//                     className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getSettingsLink()} 
//                     className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Settings className="h-4 w-4 flex-shrink-0" />
//                     <span>Settings</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <button
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full text-left px-2 py-2 justify-start"
//                   >
//                     <LogOut className="h-4 w-4 flex-shrink-0" />
//                     <span>Logout</span>
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//                   <Link href="/login" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
//                     <User className="h-4 w-4 flex-shrink-0" />
//                     <span>Sign In</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link href="/register" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
//                     <Users className="h-4 w-4 flex-shrink-0" />
//                     <span>Register (B2B)</span>
//                   </Link>
//                 </li>
//               </>
//             )}
            
//             <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//   <Link href="/inquiry-cart" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full">
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//     </svg>
//     Inquiry Cart
//     {cartCount > 0 && (
//       <span className="badge badge-sm" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>
//         {cartCount}
//       </span>
//     )}
//   </Link>
// </li>
//           </ul>
//         </div>
        
//         {/* Logo/Brand */}
//        <Link 
//   href="/" 
//   className="flex items-center gap-2"
//   style={{ color: '#FBFFFF' }}
// >
//   <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
//     <img 
//       src="https://i.ibb.co.com/fzkq5JRV/favicon.png"
//       alt="Asian Clothify Logo"
//       className="w-full h-full object-contain scale-125"
//     />
//   </div>
// </Link>
//       </div>

//       {/* Desktop Menu - Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1" style={{ color: '#FBFFFF' }}>
//           {navItems.map((item) => (
//             <li key={item.name}>
//               <Link 
//                 href={item.href}
//                 style={{
//                   color: '#FBFFFF',
//                   backgroundColor: isActive(item.href) ? '#E39A65' : 'transparent',
//                 }}
//                 className={`hover:bg-[#E39A65] hover:text-gray-900 transition-colors duration-200 ${isActive(item.href) ? 'pointer-events-none' : ''}`}
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right side - Actions */}
//       <div className="navbar-end gap-2">
//         {/* Inquiry Cart - Desktop */}
//        {/* Inquiry Cart - Desktop */}
// <Link 
//   href="/inquiry-cart" 
//   className="btn btn-ghost btn-circle hidden lg:flex relative"
//   style={{ color: '#FBFFFF' }}
//   onMouseEnter={(e) => {
//     e.currentTarget.style.backgroundColor = '#E39A65';
//     e.currentTarget.style.color = '#1f1f1f';
//   }}
//   onMouseLeave={(e) => {
//     e.currentTarget.style.backgroundColor = 'transparent';
//     e.currentTarget.style.color = '#FBFFFF';
//   }}
// >
//   <div className="indicator">
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//     </svg>
//     {cartCount > 0 && (
//       <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>
//         {cartCount}
//       </span>
//     )}
//   </div>
// </Link>

//         {/* User Menu or Auth Buttons */}
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={() => setUserMenuOpen(!userMenuOpen)}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-700 transition-colors"
//               style={{ color: '#FBFFFF' }}
//             >
//               <div className="w-8 h-8 rounded-full bg-[#E39A65] flex items-center justify-center text-gray-900 font-semibold">
//                 {getInitials()}
//               </div>
//               <span className="hidden lg:inline max-w-[100px] truncate">
//                 {getDisplayName()}
//               </span>
//               <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {/* Dropdown Menu */}
//             {userMenuOpen && (
//               <>
//                 <div 
//                   className="fixed inset-0 z-40"
//                   onClick={() => setUserMenuOpen(false)}
//                 />
//                 <div className="absolute right-0 mt-2 w-64 bg-[#2A2A2A] rounded-xl shadow-xl border border-gray-700 py-2 z-50">
//                   {/* User Info */}
//                   <div className="px-4 py-3 border-b border-gray-700">
//                     <p className="text-sm font-semibold text-white">{getDisplayName()}</p>
//                     <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
//                     <div className="mt-2">
//                       <span 
//                         className="px-2 py-0.5 text-xs font-medium rounded-full" 
//                         style={{ 
//                           backgroundColor: '#faf1e9',
//                           color: '#E39A65'
//                         }}
//                       >
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Menu Items */}
//                   <Link
//                     href={getDashboardLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-neutral-700 transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="w-4 h-4" style={{ color: '#E39A65' }} />
//                     <span>Dashboard</span>
//                   </Link>

//                   <Link
//                     href={getSettingsLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-neutral-700 transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <Settings className="w-4 h-4" style={{ color: '#E39A65' }} />
//                     <span>Settings</span>
//                   </Link>

//                   {/* Logout */}
//                   <button
//                     onClick={() => {
//                       setUserMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-neutral-700 transition-colors w-full text-left border-t border-gray-700 mt-1 pt-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* Sign In Button */}
//             <Link 
//               href="/login" 
//               className="btn btn-outline btn-sm hidden lg:flex"
//               style={{
//                 color: '#FBFFFF',
//                 borderColor: '#FBFFFF',
//                 backgroundColor: 'transparent'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#E39A65';
//                 e.currentTarget.style.borderColor = '#E39A65';
//                 e.currentTarget.style.color = '#1f1f1f';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = 'transparent';
//                 e.currentTarget.style.borderColor = '#FBFFFF';
//                 e.currentTarget.style.color = '#FBFFFF';
//               }}
//             >
//               <User className="h-4 w-4 mr-2" />
//               Sign In
//             </Link>

//             {/* Register Button */}
//             <Link 
//               href="/register" 
//               className="btn btn-sm hidden lg:flex"
//               style={{
//                 backgroundColor: '#E39A65',
//                 color: '#1f1f1f',
//                 borderColor: '#E39A65'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#FBFFFF';
//                 e.currentTarget.style.borderColor = '#FBFFFF';
//                 e.currentTarget.style.color = '#884F52';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = '#E39A65';
//                 e.currentTarget.style.borderColor = '#E39A65';
//                 e.currentTarget.style.color = '#1f1f1f';
//               }}
//             >
//               Register
//               <span className="ml-1 text-xs">(B2B)</span>
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }




// 2

// 'use client';

// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   ChevronDown, 
//   LogOut, 
//   Settings, 
//   User, 
//   LayoutDashboard, 
//   Users,
//   Search,
//   X,
//   Package,
//   FileText,
//   Tag,
//   Loader2
// } from 'lucide-react';
// import { toast } from 'sonner';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [user, setUser] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const searchRef = useRef(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Close search results when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Function to check and update user state
//   const checkUserState = () => {
//     if (typeof window !== 'undefined') {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//     }
//   };

//   // Fetch cart count
//   const fetchCartCount = async () => {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       setCartCount(0);
//       return;
//     }
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 5000);
      
//       const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         signal: controller.signal,
//         mode: 'cors',
//         cache: 'no-cache'
//       }).finally(() => clearTimeout(timeoutId));
      
//       if (response.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setUser(null);
//         setCartCount(0);
//         window.dispatchEvent(new Event('auth-change'));
//         return;
//       }
      
//       if (!response.ok) {
//         setCartCount(0);
//         return;
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         const itemCount = data.data?.items?.length || 0;
//         setCartCount(itemCount);
//       } else {
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.warn('Cart fetch failed:', error.message);
//       setCartCount(0);
//     }
//   };

//   // Search function
//   const performSearch = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     setSearchLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setSearchResults(data.data);
//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery) {
//         performSearch(searchQuery);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

//   const handleResultClick = (result) => {
//     let url = '';
//     switch (result.type) {
//       case 'product':
//         url = `/productDetails?id=${result._id}`;
//         break;
//       case 'blog':
//         url = `/blog/${result._id}`;
//         break;
//       case 'category':
//         url = `/products?category=${result._id}`;
//         break;
//       default:
//         url = `/search?q=${encodeURIComponent(result.title || result.name)}`;
//     }
//     router.push(url);
//     setSearchOpen(false);
//     setSearchQuery('');
//     setShowResults(false);
//   };

//   const handleViewAllResults = () => {
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

//   // Test API connection on mount
//   useEffect(() => {
//     const testConnection = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/health');
//         const data = await response.json();
//         console.log('✅ Backend connection test:', data);
//       } catch (error) {
//         console.error('❌ Backend connection failed:', error);
//       }
//     };
    
//     testConnection();
//   }, []);

//   // Initial check
//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();

//     const handleStorageChange = (e) => {
//       if (e.key === 'user' || e.key === 'token') {
//         checkUserState();
//         fetchCartCount();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     const handleAuthChange = () => {
//       checkUserState();
//       fetchCartCount();
//     };

//     window.addEventListener('auth-change', handleAuthChange);

//     const handleCartUpdate = () => {
//       fetchCartCount();
//     };

//     window.addEventListener('cart-update', handleCartUpdate);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, []);

//   // Listen for route changes
//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();
//   }, [pathname]);

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Blog', href: '/blog' },
//   ];

//   const isActive = (path) => pathname === path;

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('rememberedEmail');
//     setUser(null);
//     setCartCount(0);
//     setUserMenuOpen(false);
    
//     window.dispatchEvent(new Event('auth-change'));
    
//     toast.success('Logged out successfully');
//     router.push('/');
//   };

//   const getDashboardLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/dashboard';
//       case 'moderator':
//         return '/moderator/dashboard';
//       case 'customer':
//         return '/customer/dashboard';
//       default:
//         return '/';
//     }
//   };

//   const getSettingsLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/settings';
//       case 'moderator':
//         return '/moderator/settings';
//       case 'customer':
//         return '/customer/settings';
//       default:
//         return '/';
//     }
//   };

//   const getRoleDisplay = () => {
//     if (!user) return '';
//     switch (user.role) {
//       case 'admin':
//         return 'Administrator';
//       case 'moderator':
//         return 'Moderator';
//       case 'customer':
//         return 'B2B Customer';
//       default:
//         return user.role;
//     }
//   };

//   const getDisplayName = () => {
//     if (!user) return '';
//     return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
//   };

//   const getInitials = () => {
//     if (!user) return 'U';
//     const name = user.companyName || user.contactPerson || user.email;
//     return name?.charAt(0).toUpperCase() || 'U';
//   };

//   const getResultIcon = (type) => {
//     switch (type) {
//       case 'product':
//         return <Package className="w-4 h-4 text-[#E39A65]" />;
//       case 'blog':
//         return <FileText className="w-4 h-4 text-[#E39A65]" />;
//       case 'category':
//         return <Tag className="w-4 h-4 text-[#E39A65]" />;
//       default:
//         return <Search className="w-4 h-4 text-[#E39A65]" />;
//     }
//   };

//   return (
//     <div className="navbar fixed top-0 z-50 w-full shadow-lg" style={{ backgroundColor: '#2A2A2A' }}>
//       {/* Mobile Menu */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <label tabIndex={0} className="btn btn-ghost lg:hidden text-white hover:bg-[#E39A65] hover:text-gray-900">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </label>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52" style={{ backgroundColor: '#884F52', color: '#FBFFFF' }}>
//             {navItems.map((item) => (
//               <li key={item.name} className="w-full">
//                 <Link 
//                   href={item.href}
//                   style={{
//                     color: '#FBFFFF',
//                     backgroundColor: isActive(item.href) ? '#E39A65' : 'transparent',
//                   }}
//                   className={`hover:bg-[#E39A65] hover:text-gray-900 block w-full ${isActive(item.href) ? 'pointer-events-none' : ''}`}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
            
//             {/* Mobile Search */}
//             <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//               <form onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target);
//                 const query = formData.get('mobileSearch');
//                 if (query) {
//                   router.push(`/search?q=${encodeURIComponent(query)}`);
//                   setIsMenuOpen(false);
//                 }
//               }} className="px-2 py-1">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="mobileSearch"
//                     placeholder="Search..."
//                     className="w-full px-3 py-1.5 text-sm bg-[#2A2A2A] text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E39A65]"
//                   />
//                   <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
//                     <Search className="w-4 h-4 text-gray-400" />
//                   </button>
//                 </div>
//               </form>
//             </li>
            
//             {/* Mobile menu user section */}
//             {user ? (
//               <>
//                 <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//                   <div className="flex flex-col px-2 py-1 text-sm text-[#FBFFFF] w-full items-start">
//                     <div className="font-semibold truncate text-left w-full">{getDisplayName()}</div>
//                     <div className="text-xs opacity-80 truncate text-left w-full">{user.email}</div>
//                     <div className="text-xs mt-1.5 text-left w-full">
//                       <span className="inline-block bg-[#E39A65] text-gray-900 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getDashboardLink()} 
//                     className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getSettingsLink()} 
//                     className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Settings className="h-4 w-4 flex-shrink-0" />
//                     <span>Settings</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <button
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full text-left px-2 py-2 justify-start"
//                   >
//                     <LogOut className="h-4 w-4 flex-shrink-0" />
//                     <span>Logout</span>
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//                   <Link href="/login" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
//                     <User className="h-4 w-4 flex-shrink-0" />
//                     <span>Sign In</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link href="/register" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
//                     <Users className="h-4 w-4 flex-shrink-0" />
//                     <span>Register (B2B)</span>
//                   </Link>
//                 </li>
//               </>
//             )}
            
//             <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//               <Link href="/inquiry-cart" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Inquiry Cart
//                 {cartCount > 0 && (
//                   <span className="badge badge-sm" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </li>
//           </ul>
//         </div>
        
//         {/* Logo/Brand */}
//         <Link 
//           href="/" 
//           className="flex items-center gap-2"
//           style={{ color: '#FBFFFF' }}
//         >
//           <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
//             <img 
//               src="https://i.ibb.co.com/fzkq5JRV/favicon.png"
//               alt="Asian Clothify Logo"
//               className="w-full h-full object-contain scale-125"
//             />
//           </div>
//         </Link>
//       </div>

//       {/* Desktop Menu - Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1" style={{ color: '#FBFFFF' }}>
//           {navItems.map((item) => (
//             <li key={item.name}>
//               <Link 
//                 href={item.href}
//                 style={{
//                   color: '#FBFFFF',
//                   backgroundColor: isActive(item.href) ? '#E39A65' : 'transparent',
//                 }}
//                 className={`hover:bg-[#E39A65] hover:text-gray-900 transition-colors duration-200 ${isActive(item.href) ? 'pointer-events-none' : ''}`}
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right side - Actions */}
//       <div className="navbar-end gap-2">
//         {/* Desktop Search */}
//        {/* Desktop Search */}
// <div className="hidden lg:block relative" ref={searchRef}>


// {searchOpen ? (
//   <form 
//     onSubmit={(e) => {
//       e.preventDefault(); // Important: prevent default form submission
//       e.stopPropagation(); // Stop event from bubbling
//       if (searchQuery.trim()) {
//         router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//         setSearchOpen(false);
//         setSearchQuery('');
//         setShowResults(false);
//       }
//     }} 
//     className="relative flex items-center"
//   >
//     <div className="relative">
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search products, categories..."
//         className="w-80 px-4 py-2 pr-10 text-sm bg-[#3A3A3A] text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E39A65]"
//         autoFocus
//         onKeyDown={(e) => {
//           if (e.key === 'Enter') {
//             e.preventDefault();
//             if (searchQuery.trim()) {
//               router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//               setSearchOpen(false);
//               setSearchQuery('');
//               setShowResults(false);
//             }
//           }
//         }}
//       />
//       {searchLoading ? (
//         <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
//       ) : (
//         <button 
//           type="submit" 
//           className="absolute right-3 top-1/2 -translate-y-1/2"
//         >
//           <Search className="w-4 h-4 text-gray-400 hover:text-[#E39A65]" />
//         </button>
//       )}
//     </div>
//     <button
//       type="button"
//       onClick={() => {
//         setSearchOpen(false);
//         setSearchQuery('');
//         setShowResults(false);
//       }}
//       className="ml-2 p-1.5 hover:bg-[#3A3A3A] rounded-full transition-colors"
//       title="Close search"
//     >
//       <X className="w-4 h-4 text-gray-400 hover:text-white" />
//     </button>

//     {/* Search Results Dropdown */}
//     {showResults && searchResults.length > 0 && (
//       <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50 w-full">
//         {searchResults.map((result, index) => (
//           <button
//             key={`${result.type}-${result._id}`}
//             onClick={() => handleResultClick(result)}
//             className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b border-gray-100 last:border-0 flex items-start gap-3"
//           >
//             <div className="mt-1">{getResultIcon(result.type)}</div>
//             <div className="flex-1">
//               <p className="text-sm font-medium text-gray-900">
//                 {result.title || result.name}
//               </p>
//               <p className="text-xs text-gray-500 mt-0.5 capitalize">
//                 {result.type}
//               </p>
//             </div>
//           </button>
//         ))}
//         <button
//           onClick={handleViewAllResults}
//           className="w-full px-4 py-3 text-center text-sm text-[#E39A65] hover:bg-orange-50 font-medium border-t border-gray-200"
//         >
//           View all results for "{searchQuery}"
//         </button>
//       </div>
//     )}
//   </form>
// ) : (
//   <button
//     onClick={() => setSearchOpen(true)}
//     className="p-2 hover:bg-[#3A3A3A] rounded-lg transition-colors"
//     title="Open search"
//   >
//     <Search className="w-5 h-5 text-gray-400 hover:text-[#E39A65]" />
//   </button>
// )}
// </div>

//         {/* Inquiry Cart - Desktop */}
//         <Link 
//           href="/inquiry-cart" 
//           className="btn btn-ghost btn-circle hidden lg:flex relative"
//           style={{ color: '#FBFFFF' }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.backgroundColor = '#E39A65';
//             e.currentTarget.style.color = '#1f1f1f';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.backgroundColor = 'transparent';
//             e.currentTarget.style.color = '#FBFFFF';
//           }}
//         >
//           <div className="indicator">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             {cartCount > 0 && (
//               <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>
//                 {cartCount}
//               </span>
//             )}
//           </div>
//         </Link>

//         {/* User Menu or Auth Buttons */}
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={() => setUserMenuOpen(!userMenuOpen)}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-700 transition-colors"
//               style={{ color: '#FBFFFF' }}
//             >
//               <div className="w-8 h-8 rounded-full bg-[#E39A65] flex items-center justify-center text-gray-900 font-semibold">
//                 {getInitials()}
//               </div>
//               <span className="hidden lg:inline max-w-[100px] truncate">
//                 {getDisplayName()}
//               </span>
//               <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {/* Dropdown Menu */}
//             {userMenuOpen && (
//               <>
//                 <div 
//                   className="fixed inset-0 z-40"
//                   onClick={() => setUserMenuOpen(false)}
//                 />
//                 <div className="absolute right-0 mt-2 w-64 bg-[#2A2A2A] rounded-xl shadow-xl border border-gray-700 py-2 z-50">
//                   {/* User Info */}
//                   <div className="px-4 py-3 border-b border-gray-700">
//                     <p className="text-sm font-semibold text-white">{getDisplayName()}</p>
//                     <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
//                     <div className="mt-2">
//                       <span 
//                         className="px-2 py-0.5 text-xs font-medium rounded-full" 
//                         style={{ 
//                           backgroundColor: '#faf1e9',
//                           color: '#E39A65'
//                         }}
//                       >
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Menu Items */}
//                   <Link
//                     href={getDashboardLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-neutral-700 transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="w-4 h-4" style={{ color: '#E39A65' }} />
//                     <span>Dashboard</span>
//                   </Link>

//                   <Link
//                     href={getSettingsLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-neutral-700 transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <Settings className="w-4 h-4" style={{ color: '#E39A65' }} />
//                     <span>Settings</span>
//                   </Link>

//                   {/* Logout */}
//                   <button
//                     onClick={() => {
//                       setUserMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-neutral-700 transition-colors w-full text-left border-t border-gray-700 mt-1 pt-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* Sign In Button */}
//             <Link 
//               href="/login" 
//               className="btn btn-outline btn-sm hidden lg:flex"
//               style={{
//                 color: '#FBFFFF',
//                 borderColor: '#FBFFFF',
//                 backgroundColor: 'transparent'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#E39A65';
//                 e.currentTarget.style.borderColor = '#E39A65';
//                 e.currentTarget.style.color = '#1f1f1f';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = 'transparent';
//                 e.currentTarget.style.borderColor = '#FBFFFF';
//                 e.currentTarget.style.color = '#FBFFFF';
//               }}
//             >
//               <User className="h-4 w-4 mr-2" />
//               Sign In
//             </Link>

//             {/* Register Button */}
//             <Link 
//               href="/register" 
//               className="btn btn-sm hidden lg:flex"
//               style={{
//                 backgroundColor: '#E39A65',
//                 color: '#1f1f1f',
//                 borderColor: '#E39A65'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#FBFFFF';
//                 e.currentTarget.style.borderColor = '#FBFFFF';
//                 e.currentTarget.style.color = '#884F52';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = '#E39A65';
//                 e.currentTarget.style.borderColor = '#E39A65';
//                 e.currentTarget.style.color = '#1f1f1f';
//               }}
//             >
//               Register
//               <span className="ml-1 text-xs">(B2B)</span>
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ChevronDown, 
  LogOut, 
  Settings, 
  User, 
  LayoutDashboard, 
  Users,
  Search,
  X,
  Package,
  FileText,
  Tag,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Add auth loading state
  const [authLoading, setAuthLoading] = useState(true);
  const searchRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to check and update user state
  const checkUserState = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      // Set auth loading to false after checking
      setAuthLoading(false);
    }
  };

  // Fetch cart count
  const fetchCartCount = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setCartCount(0);
      return;
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('http://localhost:5000/api/inquiry-cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        mode: 'cors',
        cache: 'no-cache'
      }).finally(() => clearTimeout(timeoutId));
      
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setCartCount(0);
        window.dispatchEvent(new Event('auth-change'));
        return;
      }
      
      if (!response.ok) {
        setCartCount(0);
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        const itemCount = data.data?.items?.length || 0;
        setCartCount(itemCount);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.warn('Cart fetch failed:', error.message);
      setCartCount(0);
    }
  };

  // Search function
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  const handleResultClick = (result) => {
    let url = '';
    switch (result.type) {
      case 'product':
        url = `/productDetails?id=${result._id}`;
        break;
      case 'blog':
        url = `/blog/${result._id}`;
        break;
      case 'category':
        url = `/products?category=${result._id}`;
        break;
      default:
        url = `/search?q=${encodeURIComponent(result.title || result.name)}`;
    }
    router.push(url);
    setSearchOpen(false);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  // Test API connection on mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        const data = await response.json();
        console.log('✅ Backend connection test:', data);
      } catch (error) {
        console.error('❌ Backend connection failed:', error);
      }
    };
    
    testConnection();
  }, []);

  // Initial check
  useEffect(() => {
    checkUserState();
    fetchCartCount();

    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'token') {
        checkUserState();
        fetchCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const handleAuthChange = () => {
      checkUserState();
      fetchCartCount();
    };

    window.addEventListener('auth-change', handleAuthChange);

    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cart-update', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, []);

  // Listen for route changes - but don't reset auth loading
  useEffect(() => {
    // Only fetch cart count, don't reset auth state
    fetchCartCount();
  }, [pathname]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  const isActive = (path) => pathname === path;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    setUser(null);
    setCartCount(0);
    setUserMenuOpen(false);
    
    window.dispatchEvent(new Event('auth-change'));
    
    toast.success('Logged out successfully');
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'moderator':
        return '/moderator/dashboard';
      case 'customer':
        return '/customer/dashboard';
      default:
        return '/';
    }
  };

  const getSettingsLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/settings';
      case 'moderator':
        return '/moderator/settings';
      case 'customer':
        return '/customer/settings';
      default:
        return '/';
    }
  };

  const getRoleDisplay = () => {
    if (!user) return '';
    switch (user.role) {
      case 'admin':
        return 'Administrator';
      case 'moderator':
        return 'Moderator';
      case 'customer':
        return 'B2B Customer';
      default:
        return user.role;
    }
  };

  const getDisplayName = () => {
    if (!user) return '';
    return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
  };

  const getInitials = () => {
    if (!user) return 'U';
    const name = user.companyName || user.contactPerson || user.email;
    return name?.charAt(0).toUpperCase() || 'U';
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'product':
        return <Package className="w-4 h-4 text-[#E39A65]" />;
      case 'blog':
        return <FileText className="w-4 h-4 text-[#E39A65]" />;
      case 'category':
        return <Tag className="w-4 h-4 text-[#E39A65]" />;
      default:
        return <Search className="w-4 h-4 text-[#E39A65]" />;
    }
  };

  // Show nothing while auth is loading to prevent flashing
  if (authLoading) {
    return (
      <div className="navbar fixed top-0 z-50 w-full shadow-lg" style={{ backgroundColor: '#2A2A2A' }}>
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2" style={{ color: '#FBFFFF' }}>
            <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
              <img 
                src="https://i.ibb.co.com/fzkq5JRV/favicon.png"
                alt="Asian Clothify Logo"
                className="w-full h-full object-contain scale-125"
              />
            </div>
          </Link>
        </div>
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
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {/* Placeholder for right side to maintain layout */}
          <div className="w-8 h-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar fixed top-0 z-50 w-full shadow-lg" style={{ backgroundColor: '#2A2A2A' }}>
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
              <li key={item.name} className="w-full">
                <Link 
                  href={item.href}
                  style={{
                    color: '#FBFFFF',
                    backgroundColor: isActive(item.href) ? '#E39A65' : 'transparent',
                  }}
                  className={`hover:bg-[#E39A65] hover:text-gray-900 block w-full ${isActive(item.href) ? 'pointer-events-none' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            {/* Mobile Search */}
            <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const query = formData.get('mobileSearch');
                if (query) {
                  router.push(`/search?q=${encodeURIComponent(query)}`);
                  setIsMenuOpen(false);
                }
              }} className="px-2 py-1">
                <div className="relative">
                  <input
                    type="text"
                    name="mobileSearch"
                    placeholder="Search..."
                    className="w-full px-3 py-1.5 text-sm bg-[#2A2A2A] text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E39A65]"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Search className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </form>
            </li>
            
            {/* Mobile menu user section */}
            {user ? (
              <>
                <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
                  <div className="flex flex-col px-2 py-1 text-sm text-[#FBFFFF] w-full items-start">
                    <div className="font-semibold truncate text-left w-full">{getDisplayName()}</div>
                    <div className="text-xs opacity-80 truncate text-left w-full">{user.email}</div>
                    <div className="text-xs mt-1.5 text-left w-full">
                      <span className="inline-block bg-[#E39A65] text-gray-900 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                        {getRoleDisplay()}
                      </span>
                    </div>
                  </div>
                </li>
                <li className="w-full">
                  <Link 
                    href={getDashboardLink()} 
                    className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link 
                    href={getSettingsLink()} 
                    className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 flex-shrink-0" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full text-left px-2 py-2 justify-start"
                  >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
                  <Link href="/login" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span>Sign In</span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link href="/register" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
                    <Users className="h-4 w-4 flex-shrink-0" />
                    <span>Register (B2B)</span>
                  </Link>
                </li>
              </>
            )}
            
            <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
              <Link href="/inquiry-cart" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Inquiry Cart
                {cartCount > 0 && (
                  <span className="badge badge-sm" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Logo/Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-2"
          style={{ color: '#FBFFFF' }}
        >
          <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
            <img 
              src="https://i.ibb.co.com/fzkq5JRV/favicon.png"
              alt="Asian Clothify Logo"
              className="w-full h-full object-contain scale-125"
            />
          </div>
        </Link>
      </div>

      {/* Desktop Menu - Center */}
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
        </ul>
      </div>

      {/* Right side - Actions */}
      <div className="navbar-end gap-2">
        {/* Desktop Search */}
        <div className="hidden lg:block relative" ref={searchRef}>
          {searchOpen ? (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (searchQuery.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                  setSearchOpen(false);
                  setSearchQuery('');
                  setShowResults(false);
                }
              }} 
              className="relative flex items-center"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="w-80 px-4 py-2 pr-10 text-sm bg-[#3A3A3A] text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E39A65]"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (searchQuery.trim()) {
                        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                        setSearchOpen(false);
                        setSearchQuery('');
                        setShowResults(false);
                      }
                    }
                  }}
                />
                {searchLoading ? (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                ) : (
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Search className="w-4 h-4 text-gray-400 hover:text-[#E39A65]" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                  setShowResults(false);
                }}
                className="ml-2 p-1.5 hover:bg-[#3A3A3A] rounded-full transition-colors"
                title="Close search"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50 w-full">
                  {searchResults.map((result, index) => (
                    <button
                      key={`${result.type}-${result._id}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b border-gray-100 last:border-0 flex items-start gap-3"
                    >
                      <div className="mt-1">{getResultIcon(result.type)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {result.title || result.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 capitalize">
                          {result.type}
                        </p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={handleViewAllResults}
                    className="w-full px-4 py-3 text-center text-sm text-[#E39A65] hover:bg-orange-50 font-medium border-t border-gray-200"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              )}
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-[#3A3A3A] rounded-lg transition-colors"
              title="Open search"
            >
              <Search className="w-5 h-5 text-gray-400 hover:text-[#E39A65]" />
            </button>
          )}
        </div>

        {/* Inquiry Cart - Desktop */}
        <Link 
          href="/inquiry-cart" 
          className="btn btn-ghost btn-circle hidden lg:flex relative"
          style={{ color: '#FBFFFF' }}
          onMouseEnter={(e) => {
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
            {cartCount > 0 && (
              <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        {/* User Menu or Auth Buttons */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-700 transition-colors"
              style={{ color: '#FBFFFF' }}
            >
              <div className="w-8 h-8 rounded-full bg-[#E39A65] flex items-center justify-center text-gray-900 font-semibold">
                {getInitials()}
              </div>
              <span className="hidden lg:inline max-w-[100px] truncate">
                {getDisplayName()}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-[#2A2A2A] rounded-xl shadow-xl border border-gray-700 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-semibold text-white">{getDisplayName()}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                    <div className="mt-2">
                      <span 
                        className="px-2 py-0.5 text-xs font-medium rounded-full" 
                        style={{ 
                          backgroundColor: '#faf1e9',
                          color: '#E39A65'
                        }}
                      >
                        {getRoleDisplay()}
                      </span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <Link
                    href={getDashboardLink()}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-neutral-700 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" style={{ color: '#E39A65' }} />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href={getSettingsLink()}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-neutral-700 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" style={{ color: '#E39A65' }} />
                    <span>Settings</span>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-neutral-700 transition-colors w-full text-left border-t border-gray-700 mt-1 pt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Sign In Button */}
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
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Link>

            {/* Register Button */}
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
          </>
        )}
      </div>
    </div>
  );
}