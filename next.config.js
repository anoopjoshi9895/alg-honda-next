/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const { withPlaiceholder } = require("@plaiceholder/next");
const path = require("path");
module.exports = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: [
      "alg-honda-staging-s3.s3.eu-central-1.amazonaws.com",
      "alghanim-cheverolet-dev-s3.s3.eu-west-2.amazonaws.com",
      "d6a6oh4buo40k.cloudfront.net",
      "images.unsplash.com"
    ],
  },
  i18n,
});

