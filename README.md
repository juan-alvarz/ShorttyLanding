# Shortty landing page

Landing page for [Shortty](https://github.com/juan-alvarz/Shortty), built with [Astro](https://astro.build). No client-side framework.

```bash
npm install
npm run dev      # http://localhost:4321/ShorttyLanding
npm run build    # output in dist/
```

## Where things are

- `src/pages/index.astro`: the page, a list of sections.
- `src/components/`: one file per section (Hero, Features, Gallery, Install, Footer).
- `src/config.ts`: links, title and description.
- `src/styles/global.css`: shared styles and colors (CSS variables, light and dark).
- `src/assets/`: screenshots copied from the Shortty repo's `Design/` folder; Astro optimizes them at build time.
- `astro.config.mjs`: `site` and `base` for GitHub Pages.
- `.github/workflows/deploy.yml`: deploys to GitHub Pages on push to `main`.
