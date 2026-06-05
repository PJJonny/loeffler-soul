/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ESLint ist in diesem schlanken Setup nicht installiert – Builds sollen dadurch nicht scheitern.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
