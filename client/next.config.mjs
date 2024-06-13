/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // webpack: (config, { isServer }) => {
  //   config.resolve.alias["~"] = path.join(__dirname, "src");
  //   return config;
  // },
  webpack: (config, { dev }) => {
    if (dev) {
      watchOptions: {
        poll: true;
      }
      return config;
    }
    return config;
  },
};

export default nextConfig;
