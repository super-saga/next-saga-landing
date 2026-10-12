// Signed, short-lived session tokens that gate the Sobi chat endpoint.
// A token is only issued after the lead form is submitted (/api/sobi/session),
// and /api/sobi/chat requires it in the Authorization header. This stops
// anonymous bots from brute-forcing the AI endpoint: no valid signature -> 401.
//
// Token format (mini-JWT): base64url(payload) "." base64url(HMAC-SHA256(payload)).

const SECRET =
  import.meta.env.SOBI_SESSION_SECRET ||
  (import.meta.env.DEV ? 'dev-insecure-sobi-secret' : '');

const TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export interface SobiSession {
  id: string;
  nama: string;
  exp: number;
}

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return b64urlEncode(new Uint8Array(sig));
}

// Constant-time string compare.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** True when a signing secret is configured (required in production). */
export const sessionConfigured = Boolean(SECRET);

export async function signSession(input: { id: string; nama: string }): Promise<string> {
  const payload: SobiSession = { id: input.id, nama: input.nama, exp: Date.now() + TTL_MS };
  const p = b64urlEncode(enc.encode(JSON.stringify(payload)));
  const sig = await hmac(p);
  return `${p}.${sig}`;
}

export async function verifySession(token: string | null | undefined): Promise<SobiSession | null> {
  if (!SECRET || !token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [p, sig] = parts;
  let expected: string;
  try {
    expected = await hmac(p);
  } catch {
    return null;
  }
  if (!safeEqual(sig, expected)) return null;
  try {
    const payload = JSON.parse(dec.decode(b64urlDecode(p))) as SobiSession;
    if (!payload?.exp || payload.exp < Date.now()) return null;
    if (typeof payload.id !== 'string' || typeof payload.nama !== 'string') return null;
    return payload;
  } catch {
    return null;
  }
}

/** Read a Bearer token from an Authorization header. */
export function bearerFrom(header: string | null): string | null {
  if (!header) return null;
  const m = /^Bearer\s+(.+)$/i.exec(header.trim());
  return m ? m[1] : null;
}
