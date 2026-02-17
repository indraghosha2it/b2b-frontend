'use client';



import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import WhatsAppButton from './WhatsAppButton';
import Footer from './Footer';


export default function LayoutContent({ children }) {
  const pathname = usePathname();
  
  // Define paths that should NOT show navbar and footer
  const hideLayoutPaths = [
    '/admin',
    '/moderator',
    '/customer',
 
  ];
  
  // Check if current path starts with any of the hide paths
  const shouldHideLayout = hideLayoutPaths.some(path => 
    pathname?.startsWith(path)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      
      <main className={!shouldHideLayout ? "min-h-screen pt-16" : "min-h-screen"}>
        {children}
      </main>
      
      {!shouldHideLayout && <WhatsAppButton />}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
