// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from './components/layout/Navbar';
// import Footer from "./components/layout/Footer";
// import WhatsAppButton from "./components/layout/WhatsAppButton";
// import { Toaster } from "sonner";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "B2B Wholesale Clothing Platform ",
//   description: "B2B Wholesale Clothing Platform ",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Navbar />
            
//             {/* Main content */}
//             <main className="">
//               {children}
//             </main>

//              {/* Sonner Toaster - positioned top-right with rich colors */}
//         <Toaster 
//           position="top-right"
//           richColors
//           closeButton
//           expand={true}
//           duration={4000}
//           theme="light"
//           toastOptions={{
//             style: { 
//               background: 'white',
//               padding: '16px',
//               borderRadius: '12px',
//               boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
//               border: '1px solid #f0f0f0'
//             },
//             className: 'text-sm font-medium',
//             success: {
//               style: {
//                 borderLeft: '4px solid #10b981',
//               },
//             },
//             error: {
//               style: {
//                 borderLeft: '4px solid #ef4444',
//               },
//             },
//             loading: {
//               style: {
//                 borderLeft: '4px solid #3b82f6',
//               },
//             },
//           }}
//         />
            
//             {/* Footer appears on ALL pages by default */}
//               <WhatsAppButton />
//             <Footer/>
             
//       </body>
//     </html>
//   );
// }



import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LayoutContent from "./components/layout/LayoutContent";
import WhatsAppButton from "./components/layout/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: " Asian Clothify || B2B Wholesale Clothing Platform",
  description: "B2B Wholesale Clothing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <LayoutContent> */}
          {children}
        {/* </LayoutContent> */}
        
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={true}
          duration={4000}
          theme="light"
        />
        <WhatsAppButton />
      </body>
    </html>
  );
}