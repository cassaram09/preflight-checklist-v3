import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "./src/styles/_base.scss";`,
  },
};

export default nextConfig;
