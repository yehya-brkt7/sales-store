/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["dev-nextjs-store.pantheonsite.io"],
  },
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production",
    removeConsole: true,
  },
};
