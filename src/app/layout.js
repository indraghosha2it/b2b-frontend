



// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";
// import LayoutContent from "./components/layout/LayoutContent";
// import WhatsAppButton from "./components/layout/WhatsAppButton";
// import ScrollToTop from "./components/layout/ScrollToTop";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: " Asian Clothify || B2B Wholesale Clothing Platform",
//   description: "B2B Wholesale Clothing Platform",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en"  data-theme="light" style={{ colorScheme: 'light' }}>
//        <head>
//         <meta name="color-scheme" content="light only" />
//         <style>{`
//           :root {
//             color-scheme: light only;
//           }
//         `}</style>
//       </head>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {/* <LayoutContent> */}
//           {children}
//         {/* </LayoutContent> */}
        
//         <Toaster 
//           position="top-right"
//           richColors
//           closeButton
//           expand={true}
//           duration={4000}
//           theme="light"
//         />
//         <WhatsAppButton />
//         <ScrollToTop />
//       </body>
//     </html>
//   );
// }



// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LayoutContent from "./components/layout/LayoutContent";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import ScrollToTop from "./components/layout/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default metadata for the entire site
export const metadata = {
  title: {
    default: "Asian Clothify || Top clothing seller in Bangladesh",
    template: "%s || Asian Clothify"
  },
  description: " Top clothing seller in Bangladesh - Premium wholesale clothing for businesses",
  keywords: ["wholesale clothing", "b2b clothing", "bulk clothing", "fashion wholesale"],
  authors: [{ name: "Asian Clothify" }],
  creator: "Asian Clothify",
  publisher: "Asian Clothify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Asian Clothify - Wholesale Clothing Platform",
  description: "Premium wholesale clothing from Bangladesh. Bulk orders, custom manufacturing, and ready-to-ship collections for global businesses.",    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    siteName: "Asian Clothify",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Asian Clothify',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Asian Clothify",
    description: "B2B Wholesale Clothing Platform",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" data-theme="light" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          :root {
            color-scheme: light only;
          }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
      >
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={true}
          duration={4000}
          theme="light"
        />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  );
}