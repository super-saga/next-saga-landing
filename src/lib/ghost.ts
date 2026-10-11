// Ghost Content API client for the Sahabat Warga blog (https://saga.co.id/blog).
// Credentials come from server-side env. In dev we fall back to Ghost's public
// demo so the blog is browsable without secrets. In PRODUCTION we never fall back
// to demo content: if GHOST_CONTENT_API_KEY is missing, the blog renders empty
// (and logs a warning) rather than showing someone else's posts.
import GhostContentAPI, { type PostOrPage, type Params } from '@tryghost/content-api';

const envUrl = import.meta.env.GHOST_API_URL;
const envKey = import.meta.env.GHOST_CONTENT_API_KEY;

// Demo fallback is dev-only.
const DEMO_URL = 'https://demo.ghost.io';
const DEMO_KEY = '22444f78447824223cefc48062';

const url = envUrl || (import.meta.env.DEV ? DEMO_URL : '');
const key = envKey || (import.meta.env.DEV ? DEMO_KEY : '');

const configured = Boolean(url && key);

if (!configured) {
  console.warn(
    '[ghost] GHOST_API_URL / GHOST_CONTENT_API_KEY not set. Blog will render empty. ' +
      'Set them in the environment to load real posts.',
  );
}

export const ghost = configured
  ? new GhostContentAPI({ url, key, version: 'v5.0' })
  : null;

export type GhostPost = PostOrPage;

/** Latest posts for the landing teaser / blog index. */
export async function getPosts(limit: number | 'all' = 'all'): Promise<GhostPost[]> {
  if (!ghost) return [];
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
  if (!ghost) return null;
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
