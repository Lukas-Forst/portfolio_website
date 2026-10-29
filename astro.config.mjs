// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// https://astro.build/config
export default defineConfig({
  // Production domain (used for sitemap, RSS, canonical URLs, Open Graph tags).
  site: 'https://lukasforst.dev',
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [[rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
})