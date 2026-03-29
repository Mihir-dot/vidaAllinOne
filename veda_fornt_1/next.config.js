/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backend = process.env.BACKEND_PUBLIC_URL?.replace(/\/$/, "");
    const beforeFiles = [];
    if (backend) {
      beforeFiles.push(
        { source: "/api/:path*", destination: `${backend}/api/:path*` },
        { source: "/get/image", destination: `${backend}/get/image` }
      );
    }
    return {
      beforeFiles,
      fallback: [
        { source: "/vidaAdmin", destination: "/vidaAdmin/index.html" },
        { source: "/vidaAdmin/", destination: "/vidaAdmin/index.html" },
        { source: "/vidaAdmin/:path*", destination: "/vidaAdmin/index.html" },
      ],
    };
  },
};

module.exports = nextConfig;
