import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Static export: outputs HTML/CSS/JS bundle tanpa server (deploy ke Netlify/Vercel/Cloudflare Pages)
  output: "export",
  // Diperlukan untuk static export agar next/image bekerja tanpa Image Optimization API
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
