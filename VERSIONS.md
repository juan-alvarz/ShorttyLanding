# Landing page versions

Goal: 20 distinct versions, each on its own branch `versions/NN-name`, each with its own pull request into `main`
and screenshots in `screenshots/`. All versions keep the same content (src/i18n/en.ts), Astro + pnpm, no analytics,
sharp corners, no card borders. Each version is a real design direction, not a recolor.

## How to make a version

1. `git fetch origin versions/01-cobalt && git checkout -B versions/NN-name origin/versions/01-cobalt`
2. Change tokens, fonts and components for the direction below. Keep copy in `src/i18n/en.ts`.
3. `NODE_PATH=$(npm root -g) pnpm screenshot` (look at the screenshots and fix anything broken before committing)
4. Commit "Version NN: Name", `git push -u origin versions/NN-name`
5. Open a PR into `main` titled "Version NN: Name", with the direction and the three screenshots
   (`https://github.com/juan-alvarz/ShorttyLanding/blob/versions/NN-name/screenshots/hero.jpg?raw=true`, etc.)
6. Tick it below (on branch `claude/quirky-wright-0xirxd`) with the PR link, commit and push.

## Directions

- [x] 01 cobalt: the approved design. Cobalt/paper/ink bands, Gloock + Plex Mono, viewfinder corners. https://github.com/juan-alvarz/ShorttyLanding/pull/1
- [ ] 02 paper: light-first. Paper dominates, ink type, cobalt only as accent blocks.
- [ ] 03 heat: orange-dominant, loud Arc energy, ink type on orange.
- [ ] 04 terminal: Nous Hermes terminal. All mono (headlines too), ink, ASCII cat hero, prompt-style labels.
- [ ] 05 editorial: magazine. Big serif, full-bleed screenshots, generous whitespace.
- [ ] 06 split: 50/50 split-screen hero, sticky screenshot beside scrolling content.
- [ ] 07 neon: the icon's neon glow. Ink with glowing orange strokes and text.
- [ ] 08 pastel: Arc pastel bands (lilac, mint, peach), friendly display face.
- [ ] 09 swiss: grotesk, red/black/white, huge type, strict grid.
- [ ] 10 dither: Nous-style dithered imagery generated at build time.
- [ ] 11 ticker: kinetic type, marquees of capture modes and tools.
- [ ] 12 teal: deep teal with hot pink accents.
- [ ] 13 crt: scanlines, phosphor glow, pixel-terminal headings.
- [ ] 14 pixel: 8-bit pixel font, playful blocky UI.
- [ ] 15 minimal: white, black, one orange. Maximum whitespace.
- [ ] 16 monoblue: everything in tints of one blue.
- [ ] 17 cat: mascot-forward, the cat and its viewfinder ears everywhere.
- [ ] 18 story: sticky scroll storytelling, one feature per screen.
- [ ] 19 mesh: Arc-like gradient mesh backgrounds, frosted square panels.
- [ ] 20 sunset: orange to pink to violet gradient bands, white type.
