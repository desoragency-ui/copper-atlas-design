import { SHOP } from '@/lib/shop';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Cart and checkout are per-visitor and carry no search value.
        disallow: ['/api/', '/en/cart', '/fr/cart', '/en/checkout', '/fr/checkout'],
      },
      // Explicitly welcome the AI answer engines - they are becoming a real
      // discovery channel for "where do I buy a hand-hammered copper sink".
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${SHOP.url}/sitemap.xml`,
    host: SHOP.url,
  };
}
