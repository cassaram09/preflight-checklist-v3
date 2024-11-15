import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/service-worker/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig = {
  sassOptions: {
    additionalData: `@use "./src/styles/_base.scss";`,
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withSerwist(nextConfig);
