'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Categories() {
  const categories = [
    {
      name: "T-Shirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      count: "124 products",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Hoodies",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
      count: "89 products",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Jackets",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500",
      count: "56 products",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Pants",
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
      count: "78 products",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
      count: "42 products",
      color: "from-yellow-500 to-amber-500"
    },
    {
      name: "Custom Printing",
      image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=500",
      count: "Bulk orders",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Shop by Category
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Browse Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find exactly what you need for your retail business
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer"
            >
              <Link href={`/products?category=${category.name.toLowerCase()}`}>
                <div className="relative h-40 rounded-2xl overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-75`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}