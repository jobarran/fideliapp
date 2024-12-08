/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 1500,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
