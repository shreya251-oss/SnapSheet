/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://snapsheet.heyadrsh.tech',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/preview/*', '/_next/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/preview/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://snapsheet.heyadrsh.tech/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }

    // Higher priority for main pages
    if (path === '/') {
      customConfig.priority = 1.0
      customConfig.changefreq = 'daily'
    }

    if (path.includes('/api-docs') || path.includes('/guides')) {
      customConfig.priority = 0.8
      customConfig.changefreq = 'weekly'
    }

    return customConfig
  },
}
