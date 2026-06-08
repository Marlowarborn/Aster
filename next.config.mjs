/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Tous les visuels servis via next/image sont des fichiers raster (png/jpg) :
  // pas besoin de dangerouslyAllowSVG (plus sûr de le laisser désactivé).
};

export default nextConfig;
