/**
 * /api/sobi/chat — Sobi AI streaming endpoint
 *
 * SSE event shape:
 *   data: {"token":"<word>"}\n\n   — one per chunk
 *   data: [DONE]\n\n              — stream terminator
 *
 * Modes:
 *   STUB (SOBI_AGENT_URL unset): streams a canned Bahasa demo reply token-by-token.
 *   PROXY (SOBI_AGENT_URL set):  forwards messages to the upstream agent and pipes
 *                                 the response straight through. SOBI_AGENT_KEY is
 *                                 attached as Bearer if present. Neither var reaches
 *                                 the client response.
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { verifySession, bearerFrom, sessionConfigured } from '../../../lib/sobi-session';

// ---------------------------------------------------------------------------
// Rate limiting — simple in-memory token bucket keyed by client IP.
// Serverless cold starts reset the map; acceptable per spec.
// ---------------------------------------------------------------------------

const RATE_WINDOW_MS = 60_000; // 1 minute window
const RATE_MAX = 20;           // max requests per window per IP

type RateBucket = { count: number; windowStart: number };
const _rateBuckets = new Map<string, RateBucket>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = _rateBuckets.get(ip);
  if (!bucket || now - bucket.windowStart > RATE_WINDOW_MS) {
    _rateBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  if (bucket.count > RATE_MAX) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

function isValidMessages(val: unknown): val is ChatMessage[] {
  if (!Array.isArray(val) || val.length === 0) return false;
  return val.every(
    (m) =>
      m !== null &&
      typeof m === 'object' &&
      typeof (m as Record<string, unknown>).role === 'string' &&
      ['user', 'assistant', 'system'].includes((m as Record<string, unknown>).role as string) &&
      typeof (m as Record<string, unknown>).content === 'string',
  );
}

const SSE_HEADERS: Record<string, string> = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
  'X-Accel-Buffering': 'no',
};

// ---------------------------------------------------------------------------
// STUB mode — canned Bahasa Indonesia reply (used until the agent endpoint is wired)
// ---------------------------------------------------------------------------

const CANNED_REPLY =
  'Hai! Saya Sobi, asisten Sahabat Warga. Saya bisa bantu jelaskan soal iuran, ' +
  'pembayaran, pengumuman, dan keamanan lingkungan. Ada yang bisa saya bantu?';

function buildStubStream(): ReadableStream<Uint8Array> {
  const tokens = CANNED_REPLY.split(' ');
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const word of tokens) {
        const chunk = JSON.stringify({ token: word + ' ' });
        controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
        // Small delay so the client receives genuine streaming chunks.
        await new Promise<void>((resolve) => setTimeout(resolve, 60));
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
}

// ---------------------------------------------------------------------------
// PROXY mode — forward to upstream agent + pipe SSE through
// ---------------------------------------------------------------------------

async function buildProxyStream(
  agentUrl: string,
  agentKey: string | undefined,
  messages: ChatMessage[],
  identity: { id: string; nama: string; ip: string },
): Promise<Response | ReadableStream<Uint8Array>> {
  // SECURITY: validate URL — must be https: to prevent SSRF via file://, http://, etc.
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(agentUrl);
  } catch (err) {
    console.error('[sobi/chat] invalid SOBI_AGENT_URL:', err);
    return jsonError('Konfigurasi layanan Sobi tidak valid', 502);
  }
  if (parsedUrl.protocol !== 'https:') {
    console.error('[sobi/chat] SOBI_AGENT_URL must use https:, got:', parsedUrl.protocol);
    return jsonError('Konfigurasi layanan Sobi tidak valid', 502);
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'text/event-stream',
    // Forward the verified lead identity so the agent can enforce its own
    // per-user rate limiting / abuse protection. These come from the signed
    // session token, so they cannot be spoofed by the client.
    'X-Sobi-User-Id': identity.id,
    'X-Sobi-User-Name': encodeURIComponent(identity.nama),
    'X-Sobi-Client-Ip': identity.ip,
  };
  if (agentKey) {
    headers['Authorization'] = `Bearer ${agentKey}`;
  }

  let upstream: Response;
  try {
    upstream = await fetch(agentUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ messages, user: { id: identity.id, nama: identity.nama } }),
    });
  } catch (err) {
    console.error('[sobi/chat] upstream fetch error:', err);
    return jsonError('Gagal menghubungi layanan Sobi', 502);
  }

  // Only pipe through when upstream is ok AND content-type is event-stream.
  // Any other case (error status or unexpected content-type) must surface as a 502
  // so the client shows an error rather than silently discarding a JSON error payload.
  const upstreamCt = upstream.headers.get('content-type') ?? '';
  if (!upstream.ok || !upstreamCt.includes('text/event-stream') || !upstream.body) {
    console.error(
      '[sobi/chat] upstream returned status=%d content-type=%s',
      upstream.status,
      upstreamCt,
    );
    // Drain the upstream body so the connection is released cleanly.
    await upstream.body?.cancel().catch(() => {});
    return jsonError('Layanan Sobi tidak tersedia', 502);
  }

  // Pipe the upstream body straight through — confirmed SSE.
  return upstream.body;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export const POST: APIRoute = async ({ request }) => {
  // Reject non-JSON content types.
  const ct = request.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return jsonError('Content-Type must be application/json', 400);
  }

  // Gate: require a valid signed session token (issued by /api/sobi/session after
  // the lead form). No token / bad signature / expired -> 401. This blocks
  // anonymous brute-force of the AI endpoint.
  if (!sessionConfigured) {
    return jsonError('Chat belum dikonfigurasi.', 503);
  }
  const session = await verifySession(bearerFrom(request.headers.get('authorization')));
  if (!session) {
    return jsonError('Sesi tidak valid. Mulai lagi dari formulir.', 401);
  }

  // Cap body size at 32 KB.
  const raw = await request.text();
  if (raw.length > 32_768) {
    return jsonError('Request body too large', 400);
  }

  // Parse JSON.
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  // Validate messages array.
  const { messages } = body as { messages?: unknown };
  if (!isValidMessages(messages)) {
    return jsonError('messages must be a non-empty array of {role, content}', 400);
  }

  // Cap message count.
  if (messages.length > 50) {
    return jsonError('Too many messages', 400);
  }

  // Rate limit per identity (session id), falling back to client IP.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';
  const rateKey = `sid:${session.id}`;

  if (isRateLimited(rateKey) || isRateLimited(ip)) {
    return new Response(JSON.stringify({ ok: false, error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    });
  }

  // Determine mode from server-side env only — never expose to client.
  const agentUrl = import.meta.env.SOBI_AGENT_URL as string | undefined;
  const agentKey = import.meta.env.SOBI_AGENT_KEY as string | undefined;

  let stream: ReadableStream<Uint8Array>;

  if (agentUrl) {
    // PROXY mode.
    const result = await buildProxyStream(agentUrl, agentKey, messages, {
      id: session.id,
      nama: session.nama,
      ip,
    });
    if (result instanceof Response) return result; // error response
    stream = result;
  } else {
    // STUB mode.
    stream = buildStubStream();
  }

  return new Response(stream, { headers: SSE_HEADERS });
};
