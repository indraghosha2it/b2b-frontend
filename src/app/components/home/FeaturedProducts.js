'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from DB
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Replace with your actual API call
      // const response = await fetch('/api/products/featured');
      // const data = await response.json();
      // setProducts(data);
      
      // Mock data for now
      setProducts([
        {
          id: 1,
          name: "Premium Cotton T-Shirt",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
          price: 3.20,
          moq: 100,
          colors: ["#000000", "#FFFFFF", "#0000FF", "#808080"],
          category: "T-Shirts"
        },
        {
          id: 2,
          name: "Heavy Weight Hoodie",
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
          price: 8.50,
          moq: 100,
          colors: ["#000000", "#808080", "#800020"],
          category: "Hoodies"
        },
        {
          id: 3,
          name: "Athletic Joggers",
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
          price: 5.75,
          moq: 100,
          colors: ["#000000", "#000080", "#36454F"],
          category: "Pants"
        },
        {
          id: 4,
          name: "Denim Jacket",
          image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500",
          price: 12.90,
          moq: 100,
          colors: ["#000080", "#000000"],
          category: "Jackets"
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Shop Wholesale
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Featured Bulk Items
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Best-selling products with tiered pricing
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {/* MOQ Badge */}
                <span className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  MOQ: {product.moq}pcs
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    per piece
                  </span>
                </div>

                {/* Color Options */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex gap-1">
                    {product.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={`Color ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bulk Pricing Preview */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Bulk pricing:</p>
                  <div className="flex justify-between text-sm">
                    <span>{product.moq}+ pcs</span>
                    <span className="font-semibold">${product.price}/pc</span>
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  href={`/products/${product.id}`}
                  className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
          >
            Browse All Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}