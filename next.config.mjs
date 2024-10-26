/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com'
    },
    {
      protocol: 'https',
      hostname: 'img.clerk.com'
    },
    {
      protocol: 'https',
      hostname: 't3.ftcdn.net'
    },
    {
      protocol: 'https',
      hostname: 'randomuser.me'
    }
    ]
  }
};

export default nextConfig;
