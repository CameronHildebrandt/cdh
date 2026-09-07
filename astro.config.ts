import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cameronhildebrandt.dev',
  output: 'static',
  // Emit optimized image files at build time. This keeps Cloudflare Pages
  // deployment fully static and avoids a Cloudflare Images binding / `/_image` runtime route.
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
