export const prerender = false;

import type { APIRoute } from 'astro';

const VALID_PERAN = ['Pengurus', 'Warga'] as const;
type Peran = (typeof VALID_PERAN)[number];

function isValidPeran(value: unknown): value is Peran {
  return VALID_PERAN.includes(value as Peran);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  // Reject non-JSON content types.
  const ct = request.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return json({ ok: false, error: 'Content-Type must be application/json' }, 400);
  }

  // Cap body size at 8 KB.
  const raw = await request.text();
  if (raw.length > 8192) {
    return json({ ok: false, error: 'Request body too large' }, 400);
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const { nama, whatsapp, peran, email, komunitas, website } = body as {
    nama?: string;
    whatsapp?: string;
    peran?: string;
    email?: string;
    komunitas?: string;
    website?: string; // honeypot
  };

  // Honeypot: bots fill this field, humans leave it empty.
  if (website) {
    return json({ ok: true });
  }

  // Server-side validation.
  if (!nama || String(nama).trim() === '') {
    return json({ ok: false, error: 'Nama wajib diisi' }, 400);
  }
  if (!whatsapp || String(whatsapp).trim() === '') {
    return json({ ok: false, error: 'WhatsApp wajib diisi' }, 400);
  }
  if (!isValidPeran(peran)) {
    return json({ ok: false, error: 'Peran tidak valid' }, 400);
  }

  const webhookUrl = import.meta.env.SLACK_WEBHOOK_URL as string | undefined;
  if (!webhookUrl) {
    console.warn('[waitlist] SLACK_WEBHOOK_URL not configured — skipping Slack notification');
    return json({ ok: true, note: 'slack not configured' });
  }

  const ts = new Date().toISOString();
  const emailDisplay = email && String(email).trim() ? String(email).trim() : '-';
  const komunitasDisplay = komunitas && String(komunitas).trim() ? String(komunitas).trim() : '-';

  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Daftar Tunggu Baru: Sahabat Warga',
        emoji: false,
      },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Nama*\n${String(nama).trim()}` },
        { type: 'mrkdwn', text: `*WhatsApp*\n${String(whatsapp).trim()}` },
        { type: 'mrkdwn', text: `*Peran*\n${peran}` },
        { type: 'mrkdwn', text: `*Email*\n${emailDisplay}` },
        { type: 'mrkdwn', text: `*Nama Komunitas*\n${komunitasDisplay}` },
      ],
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Source: Sahabat Warga Landing - Waitlist | ${ts}`,
        },
      ],
    },
  ];

  try {
    const slackRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks }),
    });
    if (!slackRes.ok) {
      console.error('[waitlist] Slack returned', slackRes.status);
      return json({ ok: false, error: 'Gagal mengirim notifikasi, silakan coba lagi' }, 502);
    }
  } catch (err) {
    console.error('[waitlist] Slack fetch error:', err);
    return json({ ok: false, error: 'Gagal mengirim notifikasi, silakan coba lagi' }, 502);
  }

  return json({ ok: true });
};
