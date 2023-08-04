/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')('./src/i18n.ts')

const nextConfig = {
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

        config.module.rules.push(
          {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/,
          },
          {
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
            use: ['@svgr/webpack'],
          }
        );
      
        fileLoaderRule.exclude = /\.svg$/i;
      
        return config;
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    experimental: {
        serverActions: true,
        appDir: true,
    },
    trailingSlash: false,
}

module.exports = withNextIntl(nextConfig)
