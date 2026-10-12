# Sahabat Warga Landing, Production Deploy

Astro 5 (SSR) + Tailwind v4, deployed on **Vercel** (`@astrojs/vercel` adapter,
`output: 'server'`). Target domain: **saga.co.id**.

---

## 1. Environment variables (set in Vercel)

Vercel, Project, Settings, Environment Variables (scope: Production + Preview).
All are **server-side** (never shipped to the browser) except where noted.

| Variable | Value | Purpose |
|---|---|---|
| `GHOST_API_URL` | `https://saga.co.id/blog` | Ghost Content API origin (reads posts). |
| `GHOST_CONTENT_API_KEY` | *(from Ghost Admin → Integrations)* | Ghost Content API key. |
| `GHOST_SITE_URL` | `https://saga.co.id/blog` | Ghost members/portal origin for `/api/subscribe`. Defaults to `GHOST_API_URL` if unset. |
| `SLACK_WEBHOOK_URL` | *(your Slack incoming webhook)* | Waitlist + Sobi leads (`/api/waitlist`, `/api/sobi/session`). Must start with `https://hooks.slack.com/`. |
| `SOBI_SESSION_SECRET` | *(strong random, e.g. `openssl rand -hex 32`)* | **Required.** Signs the Sobi chat lead-gate token. If unset in prod, the chat fails closed (503). |
| `SOBI_AGENT_URL` | *(optional)* | Real Sobi agent endpoint. If unset, `/api/sobi/chat` streams a canned reply. |
| `SOBI_AGENT_KEY` | *(optional)* | Bearer token for `SOBI_AGENT_URL`. |
| `PUBLIC_UMKM_LIVE` | leave unset (defaults live) or `"false"` | Set `"false"` to show UMKM as "Segera hadir". |

Without `GHOST_*` set in production, the blog renders **empty** (it will NOT show
demo content). Locally, a gitignored `.env` holds the same values for dev.

---

## 2. CRITICAL: `/blog` routing (landing vs Ghost)

The landing now owns `/blog`, `/blog/[slug]`, `/blog/search`, reading content from
Ghost via the Content API. But the **Ghost instance itself lives at
`saga.co.id/blog`** and must stay reachable for:

- the Content API: `saga.co.id/blog/ghost/api/content/...`
- the subscribe flow: `saga.co.id/blog/members/api/...`
- Ghost Admin: `saga.co.id/blog/ghost/`

If Vercel serves `saga.co.id` at the root, these Ghost paths will collide with the
Astro `/blog` routes. Pick ONE:

**Option A (recommended): give Ghost its own origin.**
- Move/expose Ghost at e.g. `https://ghost.saga.co.id` (internal admin + API).
- Set `GHOST_API_URL` and `GHOST_SITE_URL` to `https://ghost.saga.co.id`.
- Vercel then owns all of `saga.co.id` including `/blog` (branded blog). No collision.

**Option B: keep Ghost at `/blog`, move the landing's blog to another path.**
- Rename the Astro routes `/blog*` to e.g. `/artikel*` and update nav/footer links.
- `saga.co.id/blog` keeps serving the raw Ghost site.
- (Small code change: rename `src/pages/blog/` to `src/pages/artikel/` and the
  `/blog` links in `src/data/content.id.ts`.)

**Option C: reverse-proxy split at the edge.**
- Keep both at `saga.co.id`, but route `/blog/ghost/*` and `/blog/members/*` (and
  `/blog/content/*`) to the Ghost upstream, everything else to Vercel. Most complex;
  only if infra already does path-based proxying.

Decide this before pointing the domain. The code supports A and C as-is (API origin
is env-driven); B needs the route rename above.

---

## 3. Ghost settings to change (for newsletter signup)

The blog currently is **invite-only**, which rejects public newsletter signups.
In Ghost Admin, Settings, Membership, Access, set **Subscription access** to
**"Anyone can sign up"**. Until then, `/api/subscribe` returns a friendly error.
(Reading posts works regardless.) Ghost uses double opt-in by default, so a
subscriber receives a confirmation email; the UI copy reflects that.

---

## 4. Deploy steps (Vercel)

1. Push this app (`landing/web`) to a Git repo Vercel can import, OR run the Vercel CLI from `landing/web`.
2. In Vercel, import the project. Framework preset: **Astro**. Root directory: the folder containing this `web/` app.
3. Build command `astro build`, output handled by the Vercel adapter (no manual output dir).
4. Add the env vars from section 1.
5. Deploy. Then add the custom domain `saga.co.id` (after resolving section 2).

Node runtime: the adapter targets Node 24 on Vercel (local Node 26 warning is harmless).

---

## 5. Pre-launch checklist

Build/health:
- [ ] `npm ci && npm run build` succeeds; `npx astro check` → 0 errors.
- [ ] Env vars set in Vercel (section 1); blog shows real posts, not demo.
- [ ] `/blog` routing decision applied (section 2); Ghost API + members reachable.
- [ ] Ghost membership set to public (section 3); test a real newsletter signup.
- [ ] `SLACK_WEBHOOK_URL` set; submit the waitlist dialog and confirm the Slack message.

Content/assets (owner-supplied, replace placeholders):
- [ ] Real app screenshots in `public/screens/` (currently exported from the design).
- [x] Social preview uses `public/social/sahabat-warga-demo.mp4` for Open Graph video and `public/og/social-preview.png` as the universal image fallback; metadata is set in `src/layouts/Base.astro`.
- [ ] Legal pages `/privasi` and `/ketentuan` reviewed by counsel (currently labeled "Draf").
- [ ] Testimonials on the landing are sample data ("CONTOH, ganti sebelum terbit") — replace with real ones or remove.
- [ ] Confirm the direct-settlement wording in the Trust section with the team.
- [ ] Real App Store / Play Store links when ready (currently all app CTAs open the waitlist; `STORE_LIVE=false` in `src/config.ts`).

SEO:
- [ ] `site` in `astro.config.mjs` = `https://saga.co.id` (already set); `sitemap-index.xml` + `robots.txt` emit on build.

---

## 6. Notes

- Secrets live only in Vercel env + a local gitignored `.env`. Nothing secret is committed.
- `/api/*` routes are server-rendered (`prerender = false`); pages are SSR via the Vercel adapter.
- The Sobi mascot is a static PNG (`public/mascots/sobi.png`). The `@rive-app/canvas`
  dependency is currently unused and can be removed in a cleanup pass.
