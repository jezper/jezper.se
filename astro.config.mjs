import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jezper.se',
  integrations: [sitemap()],
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  markdown: {
    smartypants: true,
    gfm: true,
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-light' }
  }
});
