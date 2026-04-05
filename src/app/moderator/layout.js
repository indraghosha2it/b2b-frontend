


// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   ShoppingBag, 
//   PackagePlus,
//   Users, 
//   BarChart3, 
//   Settings, 
//   LogOut,
//   Menu,
//   X,
//   Bell,
//   ChevronDown,
//   MessageSquare,
//   Home,
//   ChevronRight,
//   Image,
//   Eye,
//   FileEdit,
//   ClipboardList,
//   HelpCircle,
//   FolderPlus,
//   Newspaper,
//   Edit,
//   Star
// } from 'lucide-react';

// export default function ModeratorLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     // Add global style to remove any body padding/margin
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
    
//     // Check if user is moderator
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (!token || !userData) {
//       logout();
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);
      
//       // IMMEDIATE LOGOUT if role is not moderator
//       if (parsedUser.role !== 'moderator') {
//         console.log('Unauthorized moderator access attempt by:', parsedUser.role);
//         logout();
//         return;
//       }

//       setUser(parsedUser);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);

//   const navigation = [
//     {
//       name: 'Dashboard',
//       href: '/moderator/dashboard',
//       icon: LayoutDashboard,
//       current: pathname === '/moderator/dashboard'
//     },

//     {
//       name: 'Create Categories',
//       href: '/moderator/createCategories',
//       icon: FolderPlus,
//       current: pathname.startsWith('/moderator/createCategories')
//     },
//     {
//       name: 'Create Products',
//       href: '/moderator/create-products',
//       icon: PackagePlus,
//       current: pathname.startsWith('/moderator/create-products'),
     
//     },
  
//     {
//       name: 'All Products ',
//       href: '/moderator/allProducts',
//       icon: Image,
//       current: pathname.startsWith('/moderator/allProducts')
//     },
//     {
//       name: 'Inquiries',
//       href: '/moderator/inquiries',
//       icon: MessageSquare,
//       current: pathname.startsWith('/moderator/inquiries')
//     },
//       {
//       name: 'Create Blog',
//       href: '/moderator/create-blog',
//       icon: Newspaper,
//       current: pathname.startsWith('/moderator/create-blog')
//     },
//       {
//       name: 'Manage Blogs',
//       href: '/moderator/manage-blogs',
//       icon: Edit,
//       current: pathname.startsWith('/moderator/manage-blogs')
//     },
//       {
//       name: 'Manage Reviews',
//       href: '/moderator/manage-reviews',
//       icon: Star,
//       current: pathname.startsWith('/moderator/manage-reviews')
//     },
    
   
//     {
//       name: 'Settings',
//       href: '/moderator/settings',
//       icon: Settings,
//       current: pathname.startsWith('/moderator/settings')
//     }
//   ];

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   // Show loading spinner while checking authentication
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f8f8' }}>
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#E39A65] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Global style to ensure no extra spacing */}
//       <style jsx global>{`
//         html, body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow-x: hidden;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
      
//       <div className="min-h-screen" style={{ backgroundColor: '#f8f8f8', margin: 0, padding: 0 }}>
//         {/* Mobile sidebar backdrop */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//           {/* Sidebar header with logo */}
//                   <div className="h-20 flex items-center justify-center px-6 border-b border-gray-200 relative" style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}>
//           <div className="flex items-center justify-center w-full">
//             <Link href="/">
//               <img 
//                 src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
//                 alt="Asian Clothify Logo" 
//                 className="h-20 w-auto object-contain drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.style.display = 'none';
//                   const parent = e.target.parentElement;
//                   parent.innerHTML = '<span class="text-5xl text-white drop-shadow-md">👕</span>';
//                 }}
//               />
//             </Link>
//           </div>
//         </div>

//           {/* User info */}
//           {user && (
//             <div className="px-4 py-4 border-b border-gray-200" style={{ backgroundColor: '#faf1e9' }}>
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md" style={{ background: '#E39A65' }}>
//                   {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold truncate" style={{ color: '#2A2A2A' }}>
//                     {user.contactPerson || 'Moderator'}
//                   </p>
//                   <p className="text-xs text-gray-600 truncate mt-0.5">
//                     {user.email}
//                   </p>
//                   <div className="flex items-center gap-1.5 mt-1.5">
//                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                     <span className="text-xs font-medium" style={{ color: '#E39A65' }}>
//                       Moderator
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//         <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24">          
//       <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">MODERATOR MENU</p>
//             <div className="space-y-1">
//               {navigation.map((item) => (
//                 <div key={item.name}>
//                   <Link
//                     href={item.href}
//                     className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
//                       item.current
//                         ? 'text-white shadow-md'
//                         : 'hover:bg-orange-50' 
//                     }`}
//                     style={item.current ? { background: '#E39A65' } : { color: '#2A2A2A' }}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className={`w-5 h-5 ${
//                         item.current ? 'text-white' : 'text-gray-400'
//                       }`} />
//                       <span>{item.name}</span>
//                     </div>
//                     {item.current && <ChevronRight className="w-4 h-4 text-white" />}
//                   </Link>
                  
//                   {/* Sub-items for Products */}
//                   {item.name === 'Products' && item.current && (
//                     <div className="ml-11 mt-1 space-y-1">
//                       {item.subItems?.map((subItem) => (
//                         <Link
//                           key={subItem.name}
//                           href={subItem.href}
//                           className={`block px-4 py-2 text-sm rounded-lg ${
//                             pathname === subItem.href
//                               ? 'font-medium'
//                               : 'text-gray-600 hover:text-orange-600'
//                           }`}
//                           style={pathname === subItem.href ? { color: '#E39A65' } : {}}
//                         >
//                           {subItem.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </nav>

//           {/* Logout button */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
//             <button
//               onClick={logout}
//               className="flex items-center gap-3 px-4 py-3 text-sm font-medium w-full transition-all group rounded-xl"
//               style={{ color: '#2A2A2A' }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#fee7e0';
//                 e.currentTarget.style.color = '#E39A65';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = 'transparent';
//                 e.currentTarget.style.color = '#2A2A2A';
//               }}
//             >
//               <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-orange-100 flex items-center justify-center">
//                 <LogOut className="w-4 h-4 text-gray-500 group-hover:text-[#E39A65]" />
//               </div>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="lg:ml-72 min-h-screen">
//           {/* Top header */}
//           <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm" style={{ margin: 0, borderBottomColor: '#E39A65' }}>
//             <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
//               <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
//                 {/* Left section */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setSidebarOpen(true)}
//                     className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
//                     style={{ color: '#2A2A2A' }}
//                   >
//                     <Menu className="w-5 h-5" />
//                   </button>
                  
//                   {/* Welcome Message */}
//                   {user && (
//                     <div>
//                       <span className="text-2xl font-bold" style={{ color: '#2A2A2A' }}>Welcome back,</span>
//                       <span className="text-2xl font-bold ml-2" style={{ color: '#E39A65' }}>{user.contactPerson || 'Moderator'}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right section */}
//                 <div className="flex items-center gap-3">
//                   <Link 
//                     href="/" 
//                     className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
//                     style={{ color: '#2A2A2A' }}
//                     title="Go to Homepage"
//                   >
//                     <Home className="w-5 h-5" />
//                   </Link>

                 

                

//                   {/* User Dropdown */}
//                   {user && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setUserMenuOpen(!userMenuOpen)}
//                         className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="text-right hidden md:block">
//                           <p className="text-sm font-medium" style={{ color: '#2A2A2A' }}>{user.contactPerson || 'Moderator'}</p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                         <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm" style={{ background: '#E39A65' }}>
//                           {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                         </div>
//                         <ChevronDown className={`w-4 h-5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} style={{ color: '#2A2A2A' }} />
//                       </button>

//                       {/* Dropdown Menu */}
//                       {userMenuOpen && (
//                         <>
//                           <div 
//                             className="fixed inset-0 z-40"
//                             onClick={() => setUserMenuOpen(false)}
//                           />
//                           <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
//                             <div className="px-4 py-3 border-b border-gray-200">
//                               <p className="text-sm font-semibold" style={{ color: '#2A2A2A' }}>{user.contactPerson || 'Moderator'}</p>
//                               <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="px-2 py-0.5 text-xs font-medium rounded-full" 
//                                   style={{ 
//                                     backgroundColor: '#faf1e9',
//                                     color: '#E39A65'
//                                   }}>
//                                   Moderator
//                                 </span>
//                               </div>
//                             </div>
                            
//                             <Link
//                               href="/moderator/settings"
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors"
//                               style={{ color: '#2A2A2A' }}
//                               onClick={() => setUserMenuOpen(false)}
//                             >
//                               <Settings className="w-4 h-4" style={{ color: '#E39A65' }} />
//                               <span>Settings</span>
//                             </Link>
                            
                           
                            
//                             <button
//                               onClick={() => {
//                                 setUserMenuOpen(false);
//                                 logout();
//                               }}
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors w-full text-left border-t border-gray-100 mt-1 pt-2"
//                               style={{ color: '#E39A65' }}
//                             >
//                               <LogOut className="w-4 h-4" style={{ color: '#E39A65' }} />
//                               <span>Logout</span>
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page content */}
//          <main className="" style={{ margin: 0, padding: 0 }}>
//         {children}
//         </main>
//         </div>
//       </div>
//     </>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PackagePlus,
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  MessageSquare,
  Home,
  ChevronRight,
  Image,
  Eye,
  FileEdit,
  ClipboardList,
  HelpCircle,
  FolderPlus,
  Newspaper,
  Edit,
  Star
} from 'lucide-react';

export default function ModeratorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Helper function to normalize pathname (remove trailing slash)
  const normalizePath = (path) => {
    if (path && path !== '/' && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  // Helper function to check if a route is active
  const isActive = (href) => {
    const currentPath = normalizePath(pathname);
    
    // Dashboard
    if (href === '/moderator/dashboard') {
      return currentPath === '/moderator/dashboard';
    }
    
    // Create Categories
    if (href === '/moderator/create-categories') {
      return currentPath === '/moderator/create-categories' || 
             currentPath === '/moderator/createCategory' ||
             currentPath.startsWith('/moderator/create-categories/');
    }
    
    // Create Products
    if (href === '/moderator/create-products') {
      return currentPath === '/moderator/create-products' || 
             currentPath === '/moderator/createProduct' ||
             currentPath.startsWith('/moderator/create-products/');
    }
    
    // All Products
    if (href === '/moderator/all-roducts') {
      return currentPath === '/moderator/all-products' || 
             currentPath === '/moderator/editProduct' ||
             currentPath === '/moderator/viewProduct' ||
             currentPath.startsWith('/moderator/all-products/') ||
             currentPath.startsWith('/moderator/products/');
    }
    
    // Inquiries
    if (href === '/moderator/inquiries') {
      return currentPath === '/moderator/inquiries' || 
             currentPath.startsWith('/moderator/inquiries/');
    }
    
    // Create Blog
    if (href === '/moderator/create-blog') {
      return currentPath === '/moderator/create-blog';
    }
    
    // Manage Blogs
    if (href === '/moderator/manage-blogs') {
      return currentPath === '/moderator/manage-blogs' || 
             currentPath === '/moderator/editBlog' ||
             currentPath.startsWith('/moderator/manage-blogs/') ||
             currentPath.startsWith('/moderator/allBlogs/');
    }
    
    // Manage Reviews
    if (href === '/moderator/manage-reviews') {
      return currentPath === '/moderator/manage-reviews' || 
             currentPath.startsWith('/moderator/manage-reviews/');
    }
    
    // Settings
    if (href === '/moderator/settings') {
      return currentPath === '/moderator/settings' || 
             currentPath.startsWith('/moderator/settings/');
    }
    
    return false;
  };

  useEffect(() => {
    // Add global style to remove any body padding/margin
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Check if user is moderator
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      logout();
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      
      // IMMEDIATE LOGOUT if role is not moderator
      if (parsedUser.role !== 'moderator') {
        console.log('Unauthorized moderator access attempt by:', parsedUser.role);
        logout();
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/moderator/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Create Categories',
      href: '/moderator/create-categories',
      icon: FolderPlus,
    },
    {
      name: 'Create Products',
      href: '/moderator/create-products',
      icon: PackagePlus,
    },
    {
      name: 'All Products',
      href: '/moderator/all-products',
      icon: Image,
    },
    {
      name: 'Inquiries',
      href: '/moderator/inquiries',
      icon: MessageSquare,
    },
    {
      name: 'Create Blog',
      href: '/moderator/create-blog',
      icon: Newspaper,
    },
    {
      name: 'Manage Blogs',
      href: '/moderator/manage-blogs',
      icon: Edit,
    },
    {
      name: 'Manage Reviews',
      href: '/moderator/manage-reviews',
      icon: Star,
    },
    {
      name: 'Settings',
      href: '/moderator/settings',
      icon: Settings,
    }
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E39A65] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Global style to ensure no extra spacing */}
      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      
      <div className="min-h-screen" style={{ backgroundColor: '#f8f8f8', margin: 0, padding: 0 }}>
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar header with logo */}
          <div className="h-20 flex items-center justify-center px-6 border-b border-gray-200 relative" style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}>
            <div className="flex items-center justify-center w-full">
              <Link href="/">
                <img 
                  src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
                  alt="Asian Clothify Logo" 
                  className="h-20 w-auto object-contain drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    parent.innerHTML = '<span class="text-5xl text-white drop-shadow-md">👕</span>';
                  }}
                />
              </Link>
            </div>
          </div>

          {/* User info */}
          {user && (
            <div className="px-4 py-4 border-b border-gray-200" style={{ backgroundColor: '#faf1e9' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md" style={{ background: '#E39A65' }}>
                  {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: '#2A2A2A' }}>
                    {user.contactPerson || 'Moderator'}
                  </p>
                  <p className="text-xs text-gray-600 truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-xs font-medium" style={{ color: '#E39A65' }}>
                      Moderator
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24">          
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">MODERATOR MENU</p>
            <div className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      active
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:bg-orange-50'
                    }`}
                    style={active ? { background: '#E39A65' } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${
                        active ? 'text-white' : 'text-gray-400'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-white" />}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium w-full transition-all group rounded-xl"
              style={{ color: '#2A2A2A' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fee7e0';
                e.currentTarget.style.color = '#E39A65';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#2A2A2A';
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-orange-100 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-gray-500 group-hover:text-[#E39A65]" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 min-h-screen">
          {/* Top header */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm" style={{ margin: 0, borderBottomColor: '#E39A65' }}>
            <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
              <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    style={{ color: '#2A2A2A' }}
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  
                  {/* Welcome Message */}
                  {user && (
                    <div>
                      <span className="text-2xl font-bold" style={{ color: '#2A2A2A' }}>Welcome back,</span>
                      <span className="text-2xl font-bold ml-2" style={{ color: '#E39A65' }}>{user.contactPerson || 'Moderator'}</span>
                    </div>
                  )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                  <Link 
                    href="/" 
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    style={{ color: '#2A2A2A' }}
                    title="Go to Homepage"
                  >
                    <Home className="w-5 h-5" />
                  </Link>

                  {/* User Dropdown */}
                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-medium" style={{ color: '#2A2A2A' }}>{user.contactPerson || 'Moderator'}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm" style={{ background: '#E39A65' }}>
                          {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <ChevronDown className={`w-4 h-5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} style={{ color: '#2A2A2A' }} />
                      </button>

                      {/* Dropdown Menu */}
                      {userMenuOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                            <div className="px-4 py-3 border-b border-gray-200">
                              <p className="text-sm font-semibold" style={{ color: '#2A2A2A' }}>{user.contactPerson || 'Moderator'}</p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full" 
                                  style={{ 
                                    backgroundColor: '#faf1e9',
                                    color: '#E39A65'
                                  }}>
                                  Moderator
                                </span>
                              </div>
                            </div>
                            
                            <Link
                              href="/moderator/settings"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors"
                              style={{ color: '#2A2A2A' }}
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4" style={{ color: '#E39A65' }} />
                              <span>Settings</span>
                            </Link>
                            
                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                logout();
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors w-full text-left border-t border-gray-100 mt-1 pt-2"
                              style={{ color: '#E39A65' }}
                            >
                              <LogOut className="w-4 h-4" style={{ color: '#E39A65' }} />
                              <span>Logout</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="" style={{ margin: 0, padding: 0 }}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}