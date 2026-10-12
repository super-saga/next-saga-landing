import type { APIRoute } from 'astro';
import { getPosts, postUrl } from '../../lib/ghost';
import { SITE } from '../../config';

export const prerender = false;

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// RSS feed mirroring Ghost's /blog/rss/. Served at /blog/rss.xml;
// /blog/rss and /blog/rss/ redirect here (see vercel.json).
export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.toString().replace(/\/$/, '')) || SITE;
  const posts = (await getPosts('all')).slice(0, 50);

  const items = posts
    .map((p) => {
      const link = `${origin}${postUrl(p.slug)}`;
      const date = p.published_at ? new Date(p.published_at).toUTCString() : '';
      const desc = p.excerpt || '';
      return `    <item>
      <title>${esc(p.title ?? '')}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      ${date ? `<pubDate>${date}</pubDate>` : ''}
      <description>${esc(desc)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Sahabat Warga</title>
    <link>${origin}/blog/</link>
    <atom:link href="${origin}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Tips mengelola iuran, keamanan, dan kegiatan warga dari Sahabat Warga.</description>
    <language>id</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
