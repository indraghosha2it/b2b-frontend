// app/productDetails/MetadataUpdater.jsx
'use client';

import { useEffect } from 'react';

export default function MetadataUpdater({ product }) {
  useEffect(() => {
    if (!product) return;
    
    const updateMetadata = () => {
      try {
        // Get SEO data from product metaSettings or generate fallback
        const metaTitle = product.metaSettings?.metaTitle || `${product.productName} - Asian Clothify`;
        const metaDescription = product.metaSettings?.metaDescription || 
          `Shop ${product.productName}. ${product.fabric || 'Premium quality'} clothing. MOQ: ${product.moq} pieces.`;
        
        const metaKeywords = product.metaSettings?.metaKeywords || [
          product.productName,
          product.category?.name,
          product.fabric,
          'clothing',
          'fashion'
        ].filter(Boolean);
        
        // Get primary image
        const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
                             product.images?.[0]?.url || 
                             '/product-default-og.jpg';
        
        // Update document title
        document.title = metaTitle;
        
        // Helper function to update or create meta tags
        const updateOrCreateMetaTag = (name, content, isProperty = false) => {
          if (!content) return;
          
          let meta;
          if (isProperty) {
            meta = document.querySelector(`meta[property="${name}"]`);
          } else {
            meta = document.querySelector(`meta[name="${name}"]`);
          }
          
          if (meta) {
            meta.setAttribute('content', content);
          } else {
            meta = document.createElement('meta');
            if (isProperty) {
              meta.setAttribute('property', name);
            } else {
              meta.setAttribute('name', name);
            }
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
          }
        };
        
        // Update basic meta tags
        updateOrCreateMetaTag('description', metaDescription);
        updateOrCreateMetaTag('keywords', metaKeywords.join(', '));
        
        // Open Graph tags
        updateOrCreateMetaTag('og:title', metaTitle, true);
        updateOrCreateMetaTag('og:description', metaDescription, true);
        updateOrCreateMetaTag('og:url', `https://asianclothify.com/productDetails?id=${product._id}`, true);
        updateOrCreateMetaTag('og:image', primaryImage, true);
        updateOrCreateMetaTag('og:type', 'product', true);
        
        // Twitter tags
        updateOrCreateMetaTag('twitter:title', metaTitle);
        updateOrCreateMetaTag('twitter:description', metaDescription);
        updateOrCreateMetaTag('twitter:image', primaryImage);
        
        // Canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', `https://asianclothify.com/productDetails?id=${product._id}`);
        } else {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          canonical.setAttribute('href', `https://asianclothify.com/productDetails?id=${product._id}`);
          document.head.appendChild(canonical);
        }
        
        // Remove existing JSON-LD if any
        const existingJsonLd = document.querySelector('#product-json-ld');
        if (existingJsonLd) {
          existingJsonLd.remove();
        }
        
        // Add JSON-LD structured data for better SEO
        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.productName,
          "description": metaDescription,
          "image": primaryImage,
          "sku": product._id,
          "brand": {
            "@type": "Brand",
            "name": "Asian Clothify"
          },
          "offers": {
            "@type": "Offer",
            "price": product.pricePerUnit,
            "priceCurrency": "USD",
            "availability": product.isActive !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
          },
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "MOQ",
              "value": product.moq
            },
            {
              "@type": "PropertyValue",
              "name": "Fabric",
              "value": product.fabric || "Premium Quality"
            },
            {
              "@type": "PropertyValue",
              "name": "Target Audience",
              "value": product.targetedCustomer || "Unisex"
            }
          ]
        };
        
        // Add sizes if available
        if (product.sizes && product.sizes.length > 0) {
          jsonLd.size = product.sizes.filter(s => s.trim());
        }
        
        // Add colors if available
        if (product.colors && product.colors.length > 0) {
          jsonLd.color = product.colors.map(c => c.code);
        }
        
        // Add reviews if available
        if (product.reviewStats && product.reviewStats.totalReviews > 0) {
          jsonLd.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": product.reviewStats.averageRating,
            "reviewCount": product.reviewStats.totalReviews
          };
        }
        
        // Add price spec
        if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
          jsonLd.offers = product.quantityBasedPricing.map(tier => ({
            "@type": "Offer",
            "price": tier.price,
            "priceCurrency": "USD",
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "value": tier.range,
              "unitText": "Pieces"
            }
          }));
        }
        
        // Add the JSON-LD script to head
        const script = document.createElement('script');
        script.id = 'product-json-ld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
        
        console.log('Metadata updated for product:', product.productName);
        console.log('JSON-LD added for product:', product.productName);
        
      } catch (error) {
        console.error('Error updating metadata:', error);
      }
    };
    
    updateMetadata();
  }, [product]);
  
  return null;
}