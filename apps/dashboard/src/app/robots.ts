import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/onboarding', '/roast'],
      disallow: ['/dashboard/', '/api/'],
    },
    sitemap: 'https://tryphantom.dev/sitemap.xml',
  };
}
