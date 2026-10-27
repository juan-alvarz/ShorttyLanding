# Shortty landing page

Landing page for [Shortty](https://github.com/juan-alvarz/Shortty), built with [Astro](https://astro.build). No client-side framework. Uses [pnpm](https://pnpm.io) (run `corepack enable` once to get it).

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # output in dist/
```

## Where things are

- `src/pages/index.astro`: the page, a list of sections.
- `src/components/`: one file per section (Hero, Features, Gallery, Install, Footer).
- `src/config.ts`: links.
- `src/i18n/`: all page copy (`en.ts`). To add a language, copy `en.ts`, translate it, register it in `index.ts` and `astro.config.mjs`.
- `src/styles/global.css`: shared styles and colors (CSS variables, light and dark).
- `src/assets/`: screenshots copied from the Shortty repo's `Design/` folder; Astro optimizes them at build time.
- `astro.config.mjs`: i18n locales; set `site`/`base` when hosting.
