/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "randomuser.me",
          pathname: "/api/portraits/**",
        },
        {
          protocol: "https",
          hostname: "images.pexels.com",
        },
        {
          protocol: "https",
          hostname: "xnbbwfavkuvfdlnbixar.supabase.co",
        },
        {
          protocol: "https",
          hostname: "api.dicebear.com",
        }
      ],
    },
  };
  
  export default nextConfig;
  