import { defineMiddleware } from 'astro:middleware';

// TEMPORARY DIAGNOSTIC: surface SSR runtime errors in the response body so we can
// read the real stack trace on Vercel (runtime logs aren't reachable with the
// project-scoped token). Remove once the FUNCTION_INVOCATION_FAILED is fixed.
export const onRequest = defineMiddleware(async (_ctx, next) => {
  try {
    return await next();
  } catch (e: unknown) {
    const err = e as { stack?: string; message?: string };
    const body = 'SSR_ERROR\n' + (err?.stack || err?.message || String(e));
    return new Response(body, { status: 500, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
});
