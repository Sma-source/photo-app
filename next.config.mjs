/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bmdmuceibswjcduchtnn.supabase.co",
      },
    ],
  },
};

export default nextConfig;
