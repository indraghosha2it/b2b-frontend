


// app/about/page.jsx
import AboutClient from './AboutClient';

// Metadata for About page
export const metadata = {
  title: "About Us ",
  description: "Learn about Asian Clothify, a top clothing seller in Bangladesh. With 8+ years of experience, we provide premium wholesale clothing to global markets. Trusted by 500+ active clients worldwide.",
  keywords: [
    "about asian clothify",
    "clothing Shop bangladesh",
    "wholesale clothing company",
    "b2b clothing supplier",
    "bangladesh garment factory",
    "top clothing seller bangladesh"
  ],
  openGraph: {
    title: "About Asian Clothify - Leading Wholesale Clothing Manufacturer",
    description: "Discover our story, values, and commitment to quality. Leading B2B clothing supplier from Bangladesh serving global markets since 2016.",
    images: ['/about-og.jpg'],
    url: "https://asianclothify.com/about",
    siteName: "Asian Clothify",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Asian Clothify - Wholesale Clothing Manufacturer",
    description: "Leading B2B clothing supplier from Bangladesh. 8+ years of excellence, 500+ clients worldwide.",
    images: ['/about-og.jpg'],
    site: "@asianclothify",
  },
  alternates: {
    canonical: "/about"
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Simple server component that renders the client component
export default function AboutPage() {
  return <AboutClient />;
}