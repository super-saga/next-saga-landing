export const SITE = "https://saga.co.id";
export const SAGA_WA = "6285711187599"; // wa.me number, no + or spaces
export const WA_URL = `https://wa.me/${SAGA_WA}`;
export const STORE_LIVE = false; // App Store / Play Store not live yet -> CTAs open waitlist
// UMKM is a committed launch feature (owner decision), so it shows the real
// screen by default. Set PUBLIC_UMKM_LIVE="false" to force the "Segera hadir" state.
export const UMKM_LIVE = import.meta.env.PUBLIC_UMKM_LIVE !== "false";

// Sobi AI chat is not live yet. While off, the launcher opens a LEAD form only
// (still forwarded to Slack) and ends in a "coming soon" thank-you, with no chat
// composer. Flip on by setting PUBLIC_SOBI_AI_LIVE="true" when the agent is ready.
export const SOBI_AI_LIVE = import.meta.env.PUBLIC_SOBI_AI_LIVE === "true";
