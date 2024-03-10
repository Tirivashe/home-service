/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@import "./_mantine.scss";`,
  },
  images: {
    domains: ["us-east-1-shared-usea1-02.graphassets.com"],
  },
};

export default nextConfig;
