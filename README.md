# lukasforst.dev

Personal portfolio + blog, built with [Astro](https://astro.build).

Previously a Gatsby site (see git history for the old `main`); reworked onto
Astro with the content carried over and cleaned up.

## Stack

- **Astro 7** — static output, zero JS by default
- **MDX-ready content collections** — posts live in `src/content/blog/`
- **Shiki** dual-theme code highlighting (light/dark)
- Sitemap + RSS generated at build

## Writing

Create a new post by adding `src/content/blog/my-post.md`:

```markdown
---
title: "My post"
description: "One-line summary for list pages and RSS."
pubDate: 2026-08-30
heroImage: /images/my-hero.jpg
heroImageAlt: "describe the image"
heroImageCredit: "Photographer"
heroImageCreditUrl: "https://unsplash.com/@photographer"
tags: ["tag"]
---

Content in Markdown…
```

## Commands

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Deploy (Vercel)

1. Import the repo on Vercel — the Astro preset is detected automatically.
2. Build command `npm run build`, output directory `dist`.
3. Add your domain under *Settings → Domains* and point DNS at Vercel.

The canonical site URL lives in `astro.config.mjs` (`site:`) — update it if
the domain differs from `lukasforst.dev`; it feeds the sitemap, RSS, and
canonical tags.

## Credits

- Cover images from [Unsplash](https://unsplash.com) (see each post's credit
  line): Felix Mooneeram, Matthew Henry, Osman Rana, Jean van Wykh, Leon
  Rohrwild, Nubelson Fernandes.
- Icons from Flaticon (original Gatsby era) — attribution kept in git
  history on the pre-rework `main` branch README.