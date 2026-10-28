// Keeps the Releases section current without a rebuild. The page ships with the notes from build
// time; when a visitor gets near the section, it asks GitHub once for the latest releases, already
// rendered to HTML (and sanitized) by GitHub, and swaps in whatever changed. Anything going wrong
// (offline, GitHub's limit of 60 anonymous requests an hour per visitor) leaves the built notes.
export {};

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  published_at: string | null;
  html_url: string;
  body_html?: string;
  draft: boolean;
  prerelease: boolean;
  assets: { name: string; browser_download_url: string }[];
}

const list = document.querySelector<HTMLElement>('[data-releases]');
const template = document.querySelector<HTMLTemplateElement>('[data-release-template]');
// Answers are reused for a few minutes, so moving around the page doesn't spend the visitor's limit.
const CACHE_KEY = 'shortty:releases';
const CACHE_MS = 10 * 60 * 1000;

async function load(api: string): Promise<GitHubRelease[]> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null');
    if (cached && Date.now() - cached.at < CACHE_MS) return cached.releases;
  } catch {}
  const response = await fetch(api, { headers: { Accept: 'application/vnd.github.html+json' } });
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`);
  const releases: GitHubRelease[] = await response.json();
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), releases }));
  } catch {}
  return releases;
}

function render(release: GitHubRelease, latest: boolean, formatDate: Intl.DateTimeFormat): HTMLDetailsElement {
  const details = template!.content.firstElementChild!.cloneNode(true) as HTMLDetailsElement;
  const name = release.name || release.tag_name;
  details.dataset.tag = release.tag_name;
  details.querySelector('.version')!.textContent = name;

  const time = details.querySelector('time')!;
  if (release.published_at) {
    const date = new Date(release.published_at);
    time.dateTime = date.toISOString();
    time.textContent = formatDate.format(date);
  } else time.remove();
  if (!latest || release.prerelease) details.querySelector('[data-latest]')!.remove();
  if (!release.prerelease) details.querySelector('[data-prerelease]')!.remove();

  const notes = details.querySelector('.notes')!;
  notes.innerHTML = release.body_html ?? '';
  // GitHub adds a link icon next to each heading; on this page it's noise.
  notes.querySelectorAll('a.anchor').forEach((anchor) => anchor.remove());

  const dmg = release.assets.find((asset) => asset.name.endsWith('.dmg'));
  const download = details.querySelector<HTMLAnchorElement>('[data-download]')!;
  if (dmg) {
    download.href = dmg.browser_download_url;
    download.textContent = `${download.dataset.label} ${dmg.name} ↓`;
    download.setAttribute('aria-label', `${download.dataset.label} ${dmg.name}`);
  } else download.remove();
  const github = details.querySelector<HTMLAnchorElement>('[data-github]')!;
  github.href = release.html_url;
  github.setAttribute('aria-label', `${github.dataset.label}: ${name}`);
  return details;
}

// What a reader would notice changing: which releases, and the words in them.
const signature = (items: Element[]) =>
  items.map((item) => `${(item as HTMLElement).dataset.tag}:${item.textContent!.replace(/\s+/g, ' ').trim()}`).join('|');

async function refresh(list: HTMLElement) {
  const formatDate = new Intl.DateTimeFormat(list.dataset.lang, { dateStyle: 'medium', timeZone: 'UTC' });
  const releases = (await load(list.dataset.releases!))
    .filter((release) => !release.draft)
    .slice(0, Number(list.dataset.limit));
  if (!releases.length) return;

  const current = [...list.querySelectorAll<HTMLDetailsElement>(':scope > details')];
  const fresh = releases.map((release, i) => render(release, i === 0, formatDate));
  if (signature(fresh) === signature(current)) return;

  // Keep a release the visitor opened; if only the default (the first) is open, open the new latest.
  const openTag = current.find((item, i) => item.open && i > 0)?.dataset.tag;
  const keep = fresh.find((item) => item.dataset.tag === openTag) ?? fresh[0];
  keep.open = true;
  list.replaceChildren(...fresh);
}

if (list && template) {
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    refresh(list).catch((error) => console.info(`[releases] Keeping the built notes: ${error.message}`));
  }, { rootMargin: '800px 0px' });
  observer.observe(list);
}
