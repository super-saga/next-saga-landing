import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const host = '127.0.0.1';
const port = 4329;
const origin = `http://${host}:${port}`;
let server;

before(async () => {
  server = spawn(
    process.execPath,
    [resolve('node_modules/astro/bin/astro.mjs'), 'dev', '--host', host, '--port', String(port), '--ignore-lock'],
    { detached: true, stdio: ['ignore', 'pipe', 'pipe'] },
  );

  let stderr = '';
  server.stderr.on('data', (chunk) => {
    stderr += chunk;
  });

  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Astro exited before startup:\n${stderr}`);
    }

    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, 100));
  }

  throw new Error(`Astro did not start within 5 seconds:\n${stderr}`);
});

after(() => {
  if (!server?.pid) return;
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
});

test('homepage exposes complete cross-platform social metadata', async () => {
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  const html = await response.text();

  const expectedTags = [
    '<meta property="og:site_name" content="Sahabat Warga">',
    '<meta property="og:locale" content="id_ID">',
    '<meta property="og:image" content="https://saga.co.id/og/social-preview.png">',
    '<meta property="og:image:secure_url" content="https://saga.co.id/og/social-preview.png">',
    '<meta property="og:image:type" content="image/png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="Tampilan aplikasi Sahabat Warga untuk mengelola lingkungan bersama">',
    '<meta property="og:video" content="https://saga.co.id/social/sahabat-warga-demo.mp4">',
    '<meta property="og:video:secure_url" content="https://saga.co.id/social/sahabat-warga-demo.mp4">',
    '<meta property="og:video:type" content="video/mp4">',
    '<meta property="og:video:width" content="1280">',
    '<meta property="og:video:height" content="720">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:image" content="https://saga.co.id/og/social-preview.png">',
    '<meta name="twitter:image:alt" content="Tampilan aplikasi Sahabat Warga untuk mengelola lingkungan bersama">',
  ];

  for (const tag of expectedTags) {
    assert.ok(html.includes(tag), `Missing metadata tag: ${tag}`);
  }
});

test('social preview is a 1200 by 630 PNG', async () => {
  const response = await fetch(`${origin}/og/social-preview.png`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^image\/png(?:;|$)/);

  const image = Buffer.from(await response.arrayBuffer());
  assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
});

test('social video is a web-optimized MP4', async () => {
  const response = await fetch(`${origin}/social/sahabat-warga-demo.mp4`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^video\/mp4(?:;|$)/);

  const video = Buffer.from(await response.arrayBuffer());
  assert.equal(video.subarray(4, 8).toString('ascii'), 'ftyp');
  assert.ok(video.length < 12_000_000, `Expected video below 12 MB, received ${video.length} bytes`);
});
