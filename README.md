# Shortty landing page

Landing page for [Shortty](https://github.com/juan-alvarz/Shortty), built with [Astro](https://astro.build) and
[pnpm](https://pnpm.io) (run `corepack enable` once to get it). No client-side framework; two small scripts.

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # output in dist/
pnpm screenshot  # build, then save screenshots/ (needs Playwright with Chromium)
```

## Where things are

- `src/pages/index.astro`: the page, a list of sections in order.
- `src/components/`: one file per section. Each has its markup, a scoped `<style>` and, where needed, a `<script>`.
  - `Hero.astro`: nav, headline and the drag-to-select demo.
  - `Specs.astro`, `Capture.astro`, `Edit.astro`, `Extras.astro`, `Layouts.astro`, `Install.astro`, `Footer.astro`.
- `src/i18n/`: all page copy (`en.ts`). To add a language, copy `en.ts`, translate it, and register it in
  `src/i18n/index.ts` and `astro.config.mjs`.
- `src/config.ts`: GitHub links.
- `src/styles/global.css`: colors, fonts, type sizes, and the shared pieces: `.band`, `.label`, `.button`,
  `.viewfinder` (orange corners) and `.selection` (selection frame with handles and a size tag).
- `src/lib/ascii.ts`: turns the app icon into the ASCII cat in the footer, at build time.
- `src/assets/`: screenshots and icon, copied from the Shortty repo's `Design/` folder. Astro optimizes them at build time.

## Design

Flat color bands (cobalt, paper, ink), sharp corners, no card borders. The orange viewfinder corners and selection
frames come from the app icon and the app's own selection UI. Fonts are self-hosted from Fontsource: Gloock for
headings, IBM Plex Mono for everything else. No analytics.
