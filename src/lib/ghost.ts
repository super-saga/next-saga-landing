// Ghost Content API client for the Sahabat Warga blog (https://saga.co.id/blog).
// Credentials come from server-side env; a demo fallback keeps builds/dev working
// before the real GHOST_CONTENT_API_KEY is provided.
import GhostContentAPI, { type PostOrPage, type Params } from '@tryghost/content-api';

const url = import.meta.env.GHOST_API_URL || 'https://demo.ghost.io';
const key = import.meta.env.GHOST_CONTENT_API_KEY || '22444f78447824223cefc48062';

export const ghost = new GhostContentAPI({
  url,
  key,
  version: 'v5.0',
});

export type GhostPost = PostOrPage;

/** Latest posts for the landing teaser / blog index. */
export async function getPosts(limit: number | 'all' = 'all'): Promise<GhostPost[]> {
  try {
    return await ghost.posts.browse({
      limit,
      include: ['tags', 'authors'],
    } as Params);
  } catch (error) {
    console.error('Ghost API Error (getPosts):', error);
    return [];
  }
}

/** A single post by slug for /blog/[slug]. */
export async function getSinglePost(slug: string): Promise<GhostPost | null> {
  try {
    return await ghost.posts.read({ slug }, { include: ['tags', 'authors'] } as Params);
  } catch (error) {
    console.error('Ghost API Error (getSinglePost):', error);
    return null;
  }
}

/** Format an ISO date as Indonesian long date, e.g. "12 Oktober 2026". */
export function formatTanggal(iso?: string | null): string {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

/** Rough reading-time label in Bahasa, from reading_time or word count fallback. */
export function readingTime(post: GhostPost): string {
  const mins = (post as GhostPost & { reading_time?: number }).reading_time;
  if (mins && mins > 0) return `${mins} menit baca`;
  return '';
}
