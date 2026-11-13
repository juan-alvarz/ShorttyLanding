// Saves Shortty's releases from GitHub to src/data/releases.json, the copy the page falls back to
// when GitHub can't be reached at build time. Run: pnpm releases (set GITHUB_TOKEN if rate limited).
import { writeFileSync } from 'node:fs';

const API = 'https://api.github.com/repos/juan-alvarz/Shortty/releases?per_page=20';
const headers = { Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const response = await fetch(API, { headers });
if (!response.ok) throw new Error(`GitHub answered ${response.status}`);
const releases = (await response.json()).map((r) => ({
  tag_name: r.tag_name,
  name: r.name,
  published_at: r.published_at,
  html_url: r.html_url,
  body: r.body,
  draft: r.draft,
  prerelease: r.prerelease,
  assets: r.assets.map((a) => ({ name: a.name, browser_download_url: a.browser_download_url })),
}));
writeFileSync('src/data/releases.json', `${JSON.stringify(releases, null, 2)}\n`);
console.log(`Saved ${releases.length} releases to src/data/releases.json`);
