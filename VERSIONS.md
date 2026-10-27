# Landing page versions

Status: all 20 versions are done, each with its own PR into `main` (PRs 1 to 20). Every version also has a phone fix so
the headline size tag never overlaps the next line. Remaining scheduled work is QA only (see below).

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
- [x] 20 sunset: orange to pink to violet gradient bands, white type. https://github.com/juan-alvarz/ShorttyLanding/pull/20

## QA pass (scheduled check-ins)

For each version branch: look at screenshots/hero.jpg, full.jpg and mobile.jpg, and check desktop 1440 and phone 390
for overlaps, clipped text, low-contrast text, horizontal scroll, broken images or fonts. Fix only real defects, keep the
version's direction, re-run `NODE_PATH=$(npm root -g) pnpm screenshot`, commit "Fix: ..." on that branch, push.
Log what was checked and fixed here.

## Disk image window (Shortty repo)

Five styled install windows for the release `.dmg`, each a PR into `main` of juan-alvarz/Shortty, sharing
`Scripts/make-dmg.sh`: https://github.com/juan-alvarz/Shortty/pull/2 (cobalt), /pull/3 (neon), /pull/4 (minimal),
/pull/5 (pastel), /pull/6 (blueprint). Not run on macOS yet; needs one real `Scripts/make-dmg.sh` run to confirm.

## QA log

### Check-in 1 (2026-10-27, ~10:00 UTC): versions 01–10

Checked each branch at 1440 and 390 wide: horizontal overflow, broken images, failed fonts, elements past the page
edge and text contrast (automated, Playwright), plus a visual pass over every phone screenshot.

- No overflow, broken images or font failures on any of 01–10.
- Fixed on all 20 versions: on phones, long install commands ran underneath the Copy button and were clipped
  (`xattr …`, the `git clone` URL). Code blocks now wrap.
- 04 terminal: the `--layout=` prefix on the layout tabs was nearly invisible; now a readable dim grey.
- 08 pastel, 10 dither: the headline size tag was white on orange (about 2.8:1); now dark text on orange.
- 09 swiss: unselected layout tabs were light grey on white (1.7:1); now mid grey (3.4:1, large bold text).

Left for check-in 2: the same checks for 11–20 (their install fix is already in).
