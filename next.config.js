/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
    localeDetection: false
  },
  images: {
    domains: ["pasteboard.co","images.unsplash.com", "s3-alpha-sig.figma.com", "res.cloudinary.com"]
  },
  async redirects() {
    return [
      // إعادة توجيه جميع الروابط غير الموجودة للصفحة الرئيسية
      {
        source: '/:path*',
        destination: '/',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'x-middleware-rewrite',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
