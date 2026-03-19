import type { MetadataRoute } from 'next';
import { getDealer, getVehicles } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smart-dealer-website.vercel.app';

// Dealer slugs to generate sitemaps for.
// In a full multi-tenant setup this would come from the DB.
const DEALER_SLUGS: string[] = [];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  for (const slug of DEALER_SLUGS) {
    const dealer = await getDealer(slug);
    if (!dealer) continue;

    const base = `${BASE_URL}/d/${slug}`;

    // Static pages
    routes.push(
      { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      { url: `${base}/inventory`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      { url: `${base}/financing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
      { url: `${base}/trade-in`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
      { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    );

    // Vehicle detail pages
    try {
      const data = await getVehicles(slug, { pageSize: '200', sort: 'newest' });
      if (data?.vehicles) {
        for (const v of data.vehicles) {
          routes.push({
            url: `${base}/inventory/${v.slug}`,
            lastModified: v.publishedAt ? new Date(v.publishedAt) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    } catch {
      // Silently skip vehicle pages if API unavailable
    }
  }

  return routes;
}
