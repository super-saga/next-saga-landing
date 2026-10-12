// /api/sobi/session — collects the lead identity that gates the Sobi chat.
// On success: forwards the lead to Slack (same as waitlist) and returns a signed
// session token the client must send on every /api/sobi/chat request.
import type { APIRoute } from 'astro';
import { signSession, sessionConfigured } from '../../../lib/sobi-session';

export const prerender = false;

const SLACK_WEBHOOK_URL = import.meta.env.SLACK_WEBHOOK_URL;
const waPattern = /^[0-9+()\-\s]{7,20}$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/[*_~`]/g, '');
}

function randomId(): string {
  const b = new Uint8Array(12);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
}

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: 'Format tidak valid.' }, 400);
  }

  const raw = await request.text();
  if (raw.length > 4096) return json({ ok: false, error: 'Permintaan terlalu besar.' }, 413);

  let body: { nama?: unknown; whatsapp?: unknown; peran?: unknown; website?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Format tidak valid.' }, 400);
  }

  // Honeypot: accept silently so bots think they succeeded, but issue nothing usable.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ ok: false, error: 'Gagal memverifikasi.' }, 400);
  }

  const nama = (typeof body.nama === 'string' ? body.nama : '').trim().slice(0, 80);
  const whatsapp = (typeof body.whatsapp === 'string' ? body.whatsapp : '').trim().slice(0, 25);
  const peran = (typeof body.peran === 'string' ? body.peran : '').trim().slice(0, 20);

  if (nama.length < 2) return json({ ok: false, error: 'Nama wajib diisi.' }, 400);
  if (!waPattern.test(whatsapp)) return json({ ok: false, error: 'Nomor WhatsApp tidak valid.' }, 400);

  // Forward the lead to Slack (best-effort; never blocks the token on Slack failure).
  if (SLACK_WEBHOOK_URL) {
    try {
      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `*Lead Tanya Sobi*\n• Nama: ${esc(nama)}\n• WhatsApp: ${esc(whatsapp)}${peran ? `\n• Peran: ${esc(peran)}` : ''}`,
        }),
      });
    } catch {
      // ignore Slack errors
    }
  }

  // Lead captured. Issue a chat token only when signing is configured; while the
  // AI is off (lead-hook phase) the client just needs ok=true, no token.
  const token = sessionConfigured ? await signSession({ id: randomId(), nama }) : null;
  return json({ ok: true, token, nama });
};
