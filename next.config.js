const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./app/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  webpack: {},
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
});

module.exports = withNextIntl(nextConfig);
