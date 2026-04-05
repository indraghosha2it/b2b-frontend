// // app/product/[id]/page.js
// import ProductClient from './ProductClient';

// // This runs at BUILD TIME - generates static pages for all products
// export async function generateStaticParams() {
//   console.log('🔄 Generating static params for all products...');
  
//   try {
//     const response = await fetch('http://localhost:5000/api/products?limit=1000', {
//       cache: 'no-store'
//     });
    
//     const data = await response.json();
    
//     if (data.success && data.data) {
//       const products = data.data;
//       console.log(`✅ Found ${products.length} products to generate static pages`);
      
//       return products.map(product => ({
//         id: product._id.toString()
//       }));
//     }
//   } catch (error) {
//     console.error('Error fetching products for static params:', error);
//   }
  
//   return [];
// }

// // This runs at BUILD TIME for each product
// export async function generateMetadata({ params }) {
//   // In Next.js 16, params is a Promise
//   const { id } = await params;
  
//   console.log(`🔍 Generating metadata for product: ${id}`);
  
//   try {
//     const response = await fetch(`http://localhost:5000/api/products/${id}`, {
//       cache: 'force-cache'
//     });
    
//     const data = await response.json();
    
//     if (data.success && data.data) {
//       const product = data.data;
      
//       const metaTitle = product.metaSettings?.metaTitle || `${product.productName} - Asian Clothify`;
//       const metaDescription = product.metaSettings?.metaDescription || 
//         `Shop ${product.productName}. ${product.fabric || 'Premium quality'} clothing. MOQ: ${product.moq} pieces.`;
      
//       const primaryImage = product.images?.[0]?.url || '/product-default-og.jpg';
      
//       return {
//         title: metaTitle,
//         description: metaDescription,
//         keywords: product.metaSettings?.metaKeywords?.join(', ') || product.productName,
//         openGraph: {
//           title: metaTitle,
//           description: metaDescription,
//           url: `https://asianclothify.com/product/${id}`,
//           siteName: "Asian Clothify",
//           images: [
//             {
//               url: primaryImage,
//               width: 1200,
//               height: 630,
//               alt: product.productName,
//             }
//           ],
//           locale: "en_US",
//           type: "website", // Changed from "product" to "website" - valid OpenGraph type
//         },
//         twitter: {
//           card: "summary_large_image",
//           title: metaTitle,
//           description: metaDescription,
//           images: [primaryImage],
//           site: "@asianclothify",
//         },
//         alternates: {
//           canonical: `/product/${id}`
//         },
//         robots: {
//           index: product.isActive !== false,
//           follow: true,
//         },
//       };
//     }
//   } catch (error) {
//     console.error(`Error generating metadata for product ${id}:`, error);
//   }
  
//   return {
//     title: "Product Details - Asian Clothify",
//     description: "View detailed product information",
//   };
// }



// // Main page component
// export default function ProductPage({ params }) {
//   return <ProductClient params={params} />;
// }



// good

// src/app/product/[id]/page.js
import { Suspense } from 'react';
import ProductClient from './productClient';

// Helper function to fetch product for metadata
async function getProductForMetadata(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product for metadata:', error);
    return null;
  }
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    const response = await fetch('http://localhost:5000/api/products?limit=1000');
    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data.map((product) => ({
        id: product._id,
      }));
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }
  
  return [];
}

// Generate metadata for the product page
export async function generateMetadata({ params }) {
  // Await params in Next.js 15+
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  const product = await getProductForMetadata(productId);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  // Use metaSettings from backend if available
  const metaTitle = product.metaSettings?.metaTitle || 
    `${product.productName} | Asian Clothify - Premium Wholesale Clothing`;
  
  const metaDescription = product.metaSettings?.metaDescription || 
    `${product.productName} - Available in ${product.colors?.length || 0} colors, ${product.sizes?.length || 0} sizes. MOQ: ${product.moq || 0} pieces. Perfect for wholesale and bulk orders.`;
  
  const metaKeywords = product.metaSettings?.metaKeywords || [
    product.productName,
    product.fabric,
    'wholesale clothing',
    'bulk order',
    'b2b fashion',
    'Bangladesh clothing manufacturer',
    product.category?.name
  ].filter(Boolean);

  const productImage = product.images?.[0]?.url || '/og-image.jpg';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://asianclothify.com';

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords.join(', '),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${baseUrl}/product/${product.slug || product._id}`,
      siteName: 'Asian Clothify',
      images: [
        {
          url: productImage,
          width: 800,
          height: 600,
          alt: product.productName,
        },
      ],
      // ✅ FIXED: Use 'website' instead of 'product' for OpenGraph
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [productImage],
    },
    alternates: {
      canonical: `/product/${product.slug || product._id}`,
    },
    robots: {
      index: product.isActive !== false,
      follow: product.isActive !== false,
      googleBot: {
        index: product.isActive !== false,
        follow: product.isActive !== false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // ✅ Add additional meta tags for better SEO
    other: {
      'og:type': 'product',
      'product:retailer_item_id': product._id,
      'product:availability': product.isActive ? 'in stock' : 'out of stock',
      'product:price:amount': product.pricePerUnit,
      'product:price:currency': 'USD',
    }
  };
}

// Main page component
export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductClient productId={productId} />
    </Suspense>
  );
}

// Skeleton component
function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl py-4 sm:py-6 md:py-8 mt-16 sm:mt-20">
        <div className="h-4 bg-gray-200 rounded w-32 sm:w-48 mb-4 sm:mb-6 animate-pulse"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
              <div className="flex-1 bg-gray-200 rounded-xl sm:rounded-2xl h-[300px] sm:h-[400px] lg:h-[500px] animate-pulse order-1 sm:order-2"></div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-16 sm:h-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-48 sm:h-56 lg:h-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-40 sm:h-44 lg:h-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}