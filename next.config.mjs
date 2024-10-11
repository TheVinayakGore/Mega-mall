/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React's Strict Mode
    images: {
      domains: ['cdn.sanity.io'], // Add 'cdn.sanity.io' to the allowed image domains
    },
  };
  
  export default nextConfig;