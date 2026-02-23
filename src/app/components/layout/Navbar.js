
// 'use client';

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { ChevronDown, LogOut, Settings, User, LayoutDashboard, Users } from 'lucide-react';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is logged in
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//       }
//     }
//   }, []);

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   const isActive = (path) => pathname === path;

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setUserMenuOpen(false);
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
//         {/* Mobile menu user section */}
// {/* Mobile menu user section */}
// {user ? (
//   <>
//     <li className="border-t border-[#E39A65] mt-2 pt-2 w-full ">
//       <div className="flex flex-col px-2 py-1 text-sm text-[#FBFFFF] w-full items-start">
//         <div className="font-semibold truncate text-left w-full">{getDisplayName()}</div>
//         <div className="text-xs opacity-80 truncate text-left w-full">{user.email}</div>
//         <div className="text-xs mt-1.5 text-left w-full">
//           <span className="inline-block bg-[#E39A65] text-gray-900 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
//             {getRoleDisplay()}
//           </span>
//         </div>
//       </div>
//     </li>
//     <li className="w-full">
//       <Link 
//         href={getDashboardLink()} 
//         className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
//       >
//         <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
//         <span>Dashboard</span>
//       </Link>
//     </li>
//     <li className="w-full">
//       <Link 
//         href={getSettingsLink()} 
//         className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start"
//       >
//         <Settings className="h-4 w-4 flex-shrink-0" />
//         <span>Settings</span>
//       </Link>
//     </li>
//     <li className="w-full">
//       <button
//         onClick={logout}
//         className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full text-left px-2 py-2 justify-start"
//       >
//         <LogOut className="h-4 w-4 flex-shrink-0" />
//         <span>Logout</span>
//       </button>
//     </li>
//   </>
// ) : (
//   <>
//     <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//       <Link href="/login" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
//         <User className="h-4 w-4 flex-shrink-0" />
//         <span>Sign In</span>
//       </Link>
//     </li>
//     <li className="w-full">
//       <Link href="/register" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full px-2 py-2 justify-start">
//         <Users className="h-4 w-4 flex-shrink-0" />
//         <span>Register (B2B)</span>
//       </Link>
//     </li>
//   </>
// )}
            
//             <li className="border-t border-[#E39A65] mt-2 pt-2 w-full">
//               <Link href="/inquiry-cart" className="flex items-center gap-2 text-[#FBFFFF] hover:bg-[#E39A65] hover:text-gray-900 w-full">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Inquiry Cart
//                 <span className="badge badge-sm" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>0</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
        
//         {/* Logo/Brand - NO hover effect whatsoever */}
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
//             <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>0</span>
//           </div>
//         </Link>

//         {/* User Menu or Auth Buttons */}
//         {user ? (
//           <div className="relative hover:bg-neutral-700">
//             <button
//               onClick={() => setUserMenuOpen(!userMenuOpen)}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg"
//               style={{ 
//                 color: '#FBFFFF',
//                 backgroundColor: 'transparent'
//               }}
//               // REMOVED ALL HOVER EFFECTS - No hover on user button
//             >
//               <div className="w-8 h-8 rounded-full bg-[#E39A65] flex items-center justify-center text-gray-900 font-semibold">
//                 {getInitials()}
//               </div>
//               <span className="hidden lg:inline max-w-[100px] truncate" style={{ color: '#FBFFFF' }}>
//                 {getDisplayName()}
//               </span>
//               <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} style={{ color: '#FBFFFF' }} />
//             </button>

//             {/* Dropdown Menu */}
//             {userMenuOpen && (
//               <>
//                 <div 
//                   className="fixed inset-0 z-40"
//                   onClick={() => setUserMenuOpen(false)}
//                 />
//                 <div className="absolute hover:  right-0 mt-2 w-64 bg-[#2A2A2A] rounded-xl shadow-xl border border-[#242323] py-2 z-50">
//                   {/* User Info */}
//                   <div className=" bg-neutral-700 px-4 py-3 border-b border-gray-200">
//                     <p className="text-sm font-semibold text-white ">{getDisplayName()}</p>
//                     <p className="text-xs text-gray-300 truncate mt-0.5">{user.email}</p>
//                     <div className="mt-2">
//                       <span className="px-2 py-0.5 text-xs   font-medium rounded-full" 
//                         style={{ 
//                           backgroundColor: '#faf1e9',
//                           color: '#E39A65'
//                         }}>
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
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-neutral-700 transition-colors w-full text-left border-t border-gray-100 mt-1 pt-2"
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
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, LogOut, Settings, User, LayoutDashboard, Users } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

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
    }
  };

  // Initial check
  useEffect(() => {
    checkUserState();

    // Add event listener for storage changes (in case user logs in from another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'token') {
        checkUserState();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event listener for auth changes within the same tab
    const handleAuthChange = () => {
      checkUserState();
    };

    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  // Listen for route changes to check auth state
  useEffect(() => {
    checkUserState();
  }, [pathname]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => pathname === path;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    setUser(null);
    setUserMenuOpen(false);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('auth-change'));
    
    router.push('/');
  };

  // Get dashboard link based on user role
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

  // Get settings link based on user role
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

  // Get role display name
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

  // Get display name
  const getDisplayName = () => {
    if (!user) return '';
    return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
  };

  // Get initials for avatar
  const getInitials = () => {
    if (!user) return 'U';
    const name = user.companyName || user.contactPerson || user.email;
    return name?.charAt(0).toUpperCase() || 'U';
  };

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
                <span className="badge badge-sm" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>0</span>
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Logo/Brand */}
        <Link 
          href="/" 
          className="btn btn-ghost normal-case text-xl font-bold flex items-center gap-2"
          style={{ color: '#FBFFFF' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#FBFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#FBFFFF';
          }}
        >
          <div className="relative w-28 h-20 overflow-hidden" style={{ background: 'transparent' }}>
            <img 
              src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
              alt="Asian Clothify Logo"
              className="w-full h-full object-contain"
              style={{ filter: 'none' }}
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
            <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#E39A65', color: '#1f1f1f' }}>0</span>
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