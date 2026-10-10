// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://saga.co.id',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});