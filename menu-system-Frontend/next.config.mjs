/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'shadcnblocks.com',//allow nextJs to load images from this url.
          }
        ],
      },
};

export default nextConfig;
