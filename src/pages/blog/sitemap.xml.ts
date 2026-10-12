import type { APIRoute } from 'astro';
import { getPosts, getTags, postUrl, tagUrl } from '../../lib/ghost';
import { SITE } from '../../config';

export const prerender = false;

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Blog sitemap mirroring Ghost's /blog/sitemap.xml: all posts + tag archives +
// the blog index. (The root @astrojs/sitemap only covers static landing pages
// and can't enumerate these dynamic SSR routes.)
export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.toString().replace(/\/$/, '')) || SITE;
  const posts = await getPosts('all');
  const tags = await getTags();

  const urls: { loc: string; lastmod?: string }[] = [
    { loc: `${origin}/blog/` },
    ...posts.map((p) => ({
      loc: `${origin}${postUrl(p.slug)}`,
      lastmod: (p.updated_at || p.published_at || undefined) as string | undefined,
    })),
    ...tags
      .filter((t) => t.slug)
      .map((t) => ({ loc: `${origin}${tagUrl(t.slug)}` })),
  ];

  const body = urls
    .map(
      (u) =>
        `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ''}</url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
