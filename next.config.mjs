/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  /* config options here */
   images: {
    domains: ['i.ibb.co.com', 'i.ibb.co', 'images.unsplash.com'],
     unoptimized: true,
  },
};

export default nextConfig;
