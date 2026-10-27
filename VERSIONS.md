# Landing page versions

Goal: 20 distinct versions, each on its own branch `versions/NN-name`, each with its own pull request into `main`
and screenshots in `screenshots/`. All versions keep the same content (src/i18n/en.ts), Astro + pnpm, no analytics,
sharp corners, no card borders. Each version is a real design direction, not a recolor.

## How to make a version

1. `git fetch origin versions/01-cobalt && git checkout -B versions/NN-name origin/versions/01-cobalt`
2. Change tokens (named by role: --primary, --light, --dark, --accent), fonts and components for the direction
   below. Keep copy in `src/i18n/en.ts`.
3. `NODE_PATH=$(npm root -g) pnpm screenshot` (look at the screenshots and fix anything broken before committing)
4. Commit "Version NN: Name", `git push -u origin versions/NN-name`
5. Open a PR into `main` titled "Version NN: Name", with the direction and the three screenshots
   (`https://github.com/juan-alvarz/ShorttyLanding/blob/versions/NN-name/screenshots/hero.jpg?raw=true`, etc.)
6. Tick it below (on branch `claude/quirky-wright-0xirxd`) with the PR link, commit and push.

Gotchas:
- Some newer Fontsource packages export `./*` as `./*.css`; import them without `.css`
  (e.g. `@fontsource/big-shoulders-display/latin-800`) or the build fails to resolve them.
- `pnpm screenshot` forces all images to load; still look at full.jpg and mobile.jpg before committing.

## Directions

- [x] 01 cobalt: the approved design. Cobalt/paper/ink bands, Gloock + Plex Mono, viewfinder corners. https://github.com/juan-alvarz/ShorttyLanding/pull/1
- [x] 02 paper: light-first. Paper dominates, ink type, cobalt only as accent blocks. https://github.com/juan-alvarz/ShorttyLanding/pull/2
- [x] 03 heat: orange-dominant, loud Arc energy, ink type on orange. https://github.com/juan-alvarz/ShorttyLanding/pull/3
- [x] 04 terminal: Nous Hermes terminal. All mono (headlines too), ink, ASCII cat hero, prompt-style labels. https://github.com/juan-alvarz/ShorttyLanding/pull/4
- [x] 05 editorial: magazine. Big serif, full-bleed screenshots, generous whitespace. https://github.com/juan-alvarz/ShorttyLanding/pull/5
- [x] 06 split: 50/50 split-screen hero, sticky screenshot beside scrolling content. https://github.com/juan-alvarz/ShorttyLanding/pull/6
- [x] 07 neon: the icon's neon glow. Ink with glowing orange strokes and text. https://github.com/juan-alvarz/ShorttyLanding/pull/7
- [x] 08 pastel: Arc pastel bands (lilac, mint, peach), friendly display face. https://github.com/juan-alvarz/ShorttyLanding/pull/8
- [x] 09 swiss: grotesk, red/black/white, huge type, strict grid. https://github.com/juan-alvarz/ShorttyLanding/pull/9
- [x] 10 dither: Nous-style dithered imagery generated at build time. https://github.com/juan-alvarz/ShorttyLanding/pull/10
- [x] 11 ticker: kinetic type, marquees of capture modes and tools. https://github.com/juan-alvarz/ShorttyLanding/pull/11
- [x] 12 teal: deep teal with hot pink accents. https://github.com/juan-alvarz/ShorttyLanding/pull/12
- [x] 13 crt: scanlines, phosphor glow, pixel-terminal headings. https://github.com/juan-alvarz/ShorttyLanding/pull/13
- [x] 14 pixel: 8-bit pixel font, playful blocky UI. https://github.com/juan-alvarz/ShorttyLanding/pull/14
- [x] 15 minimal: white, black, one orange. Maximum whitespace. https://github.com/juan-alvarz/ShorttyLanding/pull/15
- [x] 16 monoblue: everything in tints of one blue. https://github.com/juan-alvarz/ShorttyLanding/pull/16
- [x] 17 cat: mascot-forward, the cat and its viewfinder ears everywhere. https://github.com/juan-alvarz/ShorttyLanding/pull/17
- [x] 18 story: sticky scroll storytelling, one feature per screen. https://github.com/juan-alvarz/ShorttyLanding/pull/18
- [x] 19 mesh: Arc-like gradient mesh backgrounds, frosted square panels. https://github.com/juan-alvarz/ShorttyLanding/pull/19
- [ ] 20 sunset: orange to pink to violet gradient bands, white type.
