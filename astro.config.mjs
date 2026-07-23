import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [react()],
  // Add below to fix:
  // vite: {
  //   ssr: {
  //     optimizeDeps: {
  //       include: ['astro > @astrojs/internal-helpers > picomatch'],
  //     },
  //   },
  // },
});
