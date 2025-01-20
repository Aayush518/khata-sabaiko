import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [tailwind(), svelte()],
  i18n: {
    defaultLocale: 'ne',
    locales: ['ne', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  output: 'server'
});