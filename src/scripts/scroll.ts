import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Smooth scrolling, a sticky nav that follows the section on screen, and a URL that does too
// (shortty.app/#edit opens on Edit), so any part of the page can be shared.
const root = document.documentElement;
const navbar = document.querySelector<HTMLElement>('[data-navbar]');
const where = document.querySelector<HTMLElement>('[data-where]');
const links = new Map(
  [...document.querySelectorAll<HTMLAnchorElement>('[data-navbar] a[data-nav]')].map((a) => [a.hash.slice(1), a]),
);
const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];

// Sticky things and in-page jumps leave room for the nav (see --nav-h in global.css).
const setNavHeight = () => root.style.setProperty('--nav-h', `${navbar?.offsetHeight ?? 0}px`);
setNavHeight();
if (navbar) new ResizeObserver(setNavHeight).observe(navbar);

// Eased wheel scrolling and in-page links. Skipped for people who ask for less motion:
// the browser then jumps, still leaving room for the nav through scroll-padding-top.
const lenis = matchMedia('(prefers-reduced-motion: reduce)').matches ? null : new Lenis({ autoRaf: true });

document.addEventListener('click', (e) => {
  const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
  const target = link && document.getElementById(decodeURIComponent(link.hash.slice(1)));
  if (!target || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  // Both honor scroll-padding-top, so the section lands just below the nav.
  if (lenis) lenis.scrollTo(target);
  else target.scrollIntoView();
  // Keyboard and screen reader users continue from the section they jumped to.
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

let current: string | null = location.hash.slice(1) || null;

function update(writeUrl: boolean) {
  navbar?.toggleAttribute('data-scrolled', scrollY > 8);

  // The section on screen is the last one whose top has passed a line a third of the way down.
  const line = innerHeight / 3;
  let id: string | null = null;
  for (const section of sections) if (section.getBoundingClientRect().top <= line) id = section.id;
  // At the very bottom, the last section counts even if it is too short to reach the line.
  if (sections.length && scrollY + innerHeight >= root.scrollHeight - 2) id = sections.at(-1)!.id;

  for (const [key, a] of links) {
    if (key === id) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  }
  if (where) where.textContent = (id && links.get(id)?.textContent) || '';

  if (!writeUrl || id === current) return;
  current = id;
  history.replaceState(history.state, '', id ? `#${id}` : location.pathname + location.search);
}

// The first pass only paints the nav: the browser may not have jumped to a shared #section yet.
update(false);
let queued = false;
addEventListener('scroll', () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; update(true); });
}, { passive: true });
