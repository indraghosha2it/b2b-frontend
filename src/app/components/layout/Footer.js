// 'use client';

// import Link from 'next/link';

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-slate-900 text-white">
//       {/* Main Footer */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
//           {/* Company Info */}
//           <div className="lg:col-span-1">
//             <Link href="/" className="text-2xl font-bold mb-4 inline-block">
//               <span className="text-blue-400">Trade</span>Threads
//               <span className="ml-2 text-xs bg-blue-600 px-2 py-1 rounded-full">B2B</span>
//             </Link>
//             <p className="text-gray-400 text-sm mb-4">
//               Premium wholesale apparel for businesses worldwide. Low MOQ, fast shipping, and custom branding options.
//             </p>
//             <div className="flex space-x-4">
//               {/* Social Links */}
//               <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                 </svg>
//               </a>
//               <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.56-4.336 13.91 13.91 0 001.55-5.752c0-.212-.005-.424-.015-.636A9.936 9.936 0 0024 4.59z"/>
//                 </svg>
//               </a>
//               <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.786-.602 1.48-1.168 2.007.008.166.012.334.012.503 0 5.15-3.92 11.089-11.089 11.089-2.2 0-4.248-.645-5.971-1.752.305.036.615.054.93.054 1.826 0 3.505-.623 4.84-1.668-1.707-.032-3.148-1.159-3.645-2.708.238.045.482.069.733.069.356 0 .701-.048 1.028-.138-1.783-.358-3.128-1.935-3.128-3.824v-.048c.526.293 1.128.469 1.768.49-1.048-.7-1.738-1.896-1.738-3.253 0-.716.192-1.389.528-1.967 1.924 2.36 4.799 3.912 8.041 4.077-.067-.287-.102-.586-.102-.893 0-2.155 1.747-3.902 3.902-3.902 1.122 0 2.136.474 2.848 1.232.888-.174 1.722-.499 2.475-.945-.291.91-.909 1.674-1.714 2.157.788-.094 1.539-.304 2.239-.614-.523.782-1.185 1.469-1.948 2.019z"/>
//                 </svg>
//               </a>
//               <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.174.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.59 0 11.954-5.366 11.954-11.987C23.97 5.367 18.606 0 12.017 0z"/>
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li><Link href="/products" className="hover:text-blue-400 transition-colors">All Products</Link></li>
//               <li><Link href="/new-arrivals" className="hover:text-blue-400 transition-colors">New Arrivals</Link></li>
//               <li><Link href="/best-sellers" className="hover:text-blue-400 transition-colors">Best Sellers</Link></li>
//               <li><Link href="/sale" className="hover:text-blue-400 transition-colors">Sale Items</Link></li>
//               <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li><Link href="/category/t-shirts" className="hover:text-blue-400 transition-colors">T-Shirts</Link></li>
//               <li><Link href="/category/hoodies" className="hover:text-blue-400 transition-colors">Hoodies & Sweatshirts</Link></li>
//               <li><Link href="/category/pants" className="hover:text-blue-400 transition-colors">Pants & Joggers</Link></li>
//               <li><Link href="/category/jackets" className="hover:text-blue-400 transition-colors">Jackets & Outerwear</Link></li>
//               <li><Link href="/category/accessories" className="hover:text-blue-400 transition-colors">Accessories</Link></li>
//             </ul>
//           </div>

//           {/* For Business */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-white">For Business</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li><Link href="/wholesale" className="hover:text-blue-400 transition-colors">Wholesale Program</Link></li>
//               <li><Link href="/custom-branding" className="hover:text-blue-400 transition-colors">Custom Branding</Link></li>
//               <li><Link href="/bulk-orders" className="hover:text-blue-400 transition-colors">Bulk Orders</Link></li>
//               <li><Link href="/size-chart" className="hover:text-blue-400 transition-colors">Size Chart</Link></li>
//               <li><Link href="/shipping-info" className="hover:text-blue-400 transition-colors">Shipping Information</Link></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
//             <ul className="space-y-3 text-gray-400">
//               <li className="flex items-start gap-3">
//                 <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
//                 </svg>
//                 <span>+1 (555) 123-4567</span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//                 </svg>
//                 <span>sales@tradethreads.com</span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
//                 </svg>
//                 <span>123 Fashion District,<br />New York, NY 10001</span>
//               </li>
//             </ul>

//             {/* WhatsApp Business Button */}
//             <a 
//               href="https://wa.me/1234567890?text=Hi%2C%20I'm%20interested%20in%20your%20B2B%20wholesale%20program" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.942 1.165-.174.198-.348.223-.645.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.174-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.174-1.414z"/>
//               </svg>
//               Chat with Sales
//             </a>
//           </div>
//         </div>

    

//         {/* Newsletter Signup */}
//         <div className="mt-12 pt-8 border-t border-slate-800">
//           <div className="max-w-2xl mx-auto text-center">
//             <h3 className="text-xl font-semibold mb-2">Subscribe to our B2B Newsletter</h3>
//             <p className="text-gray-400 mb-4">Get updates on new arrivals, bulk deals, and industry insights</p>
//             <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//               <input 
//                 type="email" 
//                 placeholder="Enter your business email" 
//                 className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-400 text-white"
//               />
//               <button 
//                 type="submit" 
//                 className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
//           <p>&copy; {currentYear} TradeThreads. All rights reserved. | B2B Wholesale Clothing Platform</p>
//           <div className="flex gap-6 mt-4 md:mt-0">
//             <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
//             <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
//             <Link href="/returns" className="hover:text-blue-400 transition-colors">Returns Policy</Link>
//             <Link href="/sitemap" className="hover:text-blue-400 transition-colors">Sitemap</Link>
//           </div>
//         </div>

//         {/* Payment Methods */}
//         <div className="mt-4 flex justify-center items-center gap-3 text-gray-400">
//           <span className="text-sm">Accepted Payments:</span>
//           <svg className="w-8 h-5" viewBox="0 0 24 16" fill="currentColor">Visa</svg>
//           <svg className="w-8 h-5" viewBox="0 0 24 16" fill="currentColor">Mastercard</svg>
//           <svg className="w-8 h-5" viewBox="0 0 24 16" fill="currentColor">Amex</svg>
//           <svg className="w-8 h-5" viewBox="0 0 24 16" fill="currentColor">PayPal</svg>
//           <svg className="w-8 h-5" viewBox="0 0 24 16" fill="currentColor">Stripe</svg>
//         </div>
//       </div>
//     </footer>
//   );
// }


'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-white" style={{ backgroundColor: '#2A2A2A' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <Link href="/" className="text-2xl font-bold mb-3 inline-block">
              <span className="text-blue-400">Trade</span>Threads
              <span className="ml-2 text-xs bg-blue-600 px-2 py-1 rounded-full">B2B</span>
            </Link>
            <p className="text-gray-400 text-sm mb-3">
              Premium wholesale apparel for businesses worldwide.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.56-4.336 13.91 13.91 0 001.55-5.752c0-.212-.005-.424-.015-.636A9.936 9.936 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.174.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.59 0 11.954-5.366 11.954-11.987C23.97 5.367 18.606 0 12.017 0z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1 text-gray-400">
              <li><Link href="/products" className="hover:text-blue-400">Products</Link></li>
              <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
              <li><Link href="/wholesale" className="hover:text-blue-400">Wholesale Program</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>sales@tradethreads.com</span>
              </li>
            </ul>
            
            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} TradeThreads. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-blue-400">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-400">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}