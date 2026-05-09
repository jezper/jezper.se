import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import wikiLinkPlugin from 'remark-wiki-link';

export default defineConfig({
  site: 'https://jezper.se',
  integrations: [sitemap()],
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    smartypants: true,
    gfm: true,
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-light' },
    remarkPlugins: [
      [wikiLinkPlugin, {
        pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
        hrefTemplate: (perm) => `/notes/${perm}/`,
        aliasDivider: '|',
      }],
    ],
  },
});
