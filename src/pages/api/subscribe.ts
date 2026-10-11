import type { APIRoute } from 'astro';

export const prerender = false;

// Ghost members "magic link" subscribe endpoint (same flow the Ghost portal uses).
// GHOST_SITE_URL is the public site root that serves /members/api/... . It defaults
// to GHOST_API_URL (the blog is at https://saga.co.id/blog). No secret needed: this
// is a public portal endpoint, but we proxy it server-side to avoid CORS.
const SITE_URL = (
  import.meta.env.GHOST_SITE_URL ||
  import.meta.env.GHOST_API_URL ||
  'https://saga.co.id/blog'
).replace(/\/$/, '');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: 'Format tidak valid.' }, 400);
  }

  // Cap body size.
  const raw = await request.text();
  if (raw.length > 4096) return json({ ok: false, error: 'Permintaan terlalu besar.' }, 413);

  let body: { email?: unknown; name?: unknown; website?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Format tidak valid.' }, 400);
  }

  // Honeypot: silently accept bots.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ ok: true });
  }

  const email = (typeof body.email === 'string' ? body.email : '').trim().toLowerCase();
  const name = (typeof body.name === 'string' ? body.name : '').trim().slice(0, 120);

  if (!emailPattern.test(email)) {
    return json({ ok: false, error: 'Masukkan alamat email yang valid.' }, 400);
  }

  const endpoint = `${SITE_URL}/members/api/send-magic-link/`;

  try {
    // Modern Ghost (5.87+) requires an integrity token for self-serve signup.
    // Fetch it first; older Ghost versions lack this endpoint, so skip gracefully.
    let integrityToken: string | undefined;
    try {
      const tokenRes = await fetch(`${SITE_URL}/members/api/integrity-token/`, {
        headers: { Accept: 'text/plain' },
      });
      if (tokenRes.ok) {
        const t = (await tokenRes.text()).trim();
        if (t) integrityToken = t;
      }
    } catch {
      // ignore — token not required on this Ghost version
    }

    const payload: Record<string, unknown> = {
      email,
      emailType: 'subscribe',
      name,
      labels: [],
      // newsletters: [] -> Ghost subscribes to the default newsletter.
    };
    if (integrityToken) payload.integrityToken = integrityToken;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Ghost returns 201 Created on success (and sends a confirmation email).
    if (res.ok) {
      return json({ ok: true });
    }

    // Surface a friendly message; never leak upstream internals.
    console.error('Ghost subscribe failed:', res.status);
    return json(
      { ok: false, error: 'Gagal berlangganan untuk saat ini. Coba lagi nanti.' },
      502,
    );
  } catch (error) {
    console.error('Ghost subscribe error:', error);
    return json(
      { ok: false, error: 'Gagal berlangganan untuk saat ini. Coba lagi nanti.' },
      502,
    );
  }
};
