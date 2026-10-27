// Builds the site, serves it, and saves screenshots to screenshots/:
//   hero.jpg    first screen at 1440×900
//   full.jpg    the whole page at 1440 wide, scaled down to 1000 wide
//   mobile.jpg  the whole page at 390 wide
// Needs Playwright with Chromium available (`npm i -g playwright && npx playwright install chromium`).
// Run: pnpm screenshot
import { createRequire } from 'node:module';
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const PORT = 4399;
const URL = `http://localhost:${PORT}/`;

execSync('pnpm build', { stdio: 'inherit' });
mkdirSync('screenshots', { recursive: true });

const server = spawn('pnpm', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore', detached: true });
await new Promise((resolve) => setTimeout(resolve, 3000));

const browser = await chromium.launch();
try {
  for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(URL, { waitUntil: 'networkidle' });
    // Load every image now, then scroll through once so anything else lazy shows up.
    await page.evaluate(async () => {
      const images = [...document.images];
      images.forEach((img) => (img.loading = 'eager'));
      await Promise.all(images.map((img) => img.decode().catch(() => {})));
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    if (name === 'desktop') {
      await sharp(await page.screenshot()).jpeg({ quality: 82 }).toFile('screenshots/hero.jpg');
      await sharp(await page.screenshot({ fullPage: true })).resize({ width: 1000 }).jpeg({ quality: 78 }).toFile('screenshots/full.jpg');
    } else {
      await sharp(await page.screenshot({ fullPage: true })).jpeg({ quality: 78 }).toFile('screenshots/mobile.jpg');
    }
    await page.close();
  }
} finally {
  await browser.close();
  process.kill(-server.pid);
}
console.log('Saved screenshots/hero.jpg, full.jpg, mobile.jpg');
