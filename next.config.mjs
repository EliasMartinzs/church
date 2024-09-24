/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com'
    },
    {
      protocol: 'https',
      hostname: 'img.clerk.com'
    }
    ]
  }
};

export default nextConfig;
