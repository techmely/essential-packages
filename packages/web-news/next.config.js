/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    swcFileReading: false,
  },
  typescript: {
    tsconfigPath: '../../tsconfig.json',
  },
};
