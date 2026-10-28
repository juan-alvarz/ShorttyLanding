import { marked } from 'marked';
import { REPO_SLUG } from '../config';
import snapshot from '../data/releases.json';

// A release as GitHub's API returns it, trimmed to what the page uses.
export interface GitHubRelease {
  tag_name: string;
  name: string | null;
  published_at: string | null;
  html_url: string;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  assets: { name: string; browser_download_url: string }[];
}

export interface Release {
  tag: string;
  name: string;
  date: Date | null;
  url: string;
  prerelease: boolean;
  // The release notes from GitHub, rendered from Markdown.
  notes: string;
  download?: { name: string; url: string };
}

const LIMIT = 6;
export const API = `https://api.github.com/repos/${REPO_SLUG}/releases?per_page=20`;

export async function fetchReleases(): Promise<GitHubRelease[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  // Optional: a token raises GitHub's rate limit on shared CI machines.
  const token = import.meta.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(API, { headers });
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`);
  return response.json();
}

// The latest releases, read from GitHub when the site is built, so a rebuild picks up new ones.
// When GitHub can't be reached (offline, rate limited) the page uses src/data/releases.json,
// which `pnpm releases` refreshes.
export async function getReleases(): Promise<Release[]> {
  let releases: GitHubRelease[];
  try {
    releases = await fetchReleases();
  } catch (error) {
    console.warn(`[releases] ${(error as Error).message}; using src/data/releases.json`);
    releases = snapshot as GitHubRelease[];
  }
  return releases.filter((release) => !release.draft).slice(0, LIMIT).map(toRelease);
}

function toRelease(release: GitHubRelease): Release {
  const dmg = release.assets.find((asset) => asset.name.endsWith('.dmg'));
  return {
    tag: release.tag_name,
    name: release.name || release.tag_name,
    date: release.published_at ? new Date(release.published_at) : null,
    url: release.html_url,
    prerelease: release.prerelease,
    notes: marked.parse(release.body ?? '', { async: false }),
    download: dmg && { name: dmg.name, url: dmg.browser_download_url },
  };
}
