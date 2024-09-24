// // /** @type {import('next').NextConfig} */
// // const nextConfig = {};

// // export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['img.clerk.com'], // Allow images from this domain
//     },
//   };
  
//   export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com'], // Allow images from this domain
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
};

export default nextConfig;
