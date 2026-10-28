// Releases open and close with a short slide and fade instead of jumping. Each <details> holds a
// summary and one .body; one release is open at a time, like the native name="release" group,
// which is dropped here so the closing one can animate too. Off for people who ask for less motion.
export {};

const DURATION = 320;
const EASING = 'cubic-bezier(.2, .8, .2, 1)';

const list = document.querySelector<HTMLElement>('[data-accordion]');
const running = new WeakMap<HTMLDetailsElement, Animation>();

function animate(details: HTMLDetailsElement, opening: boolean) {
  const body = details.querySelector<HTMLElement>('.body')!;
  running.get(details)?.cancel();
  if (opening) details.open = true;
  details.toggleAttribute('data-closing', !opening);
  const height = `${body.scrollHeight}px`;
  const frames = [
    { height: '0px', opacity: 0 },
    { height, opacity: 1 },
  ];
  body.style.overflow = 'hidden';
  const animation = body.animate(opening ? frames : frames.reverse(), { duration: DURATION, easing: EASING });
  running.set(details, animation);
  animation.onfinish = () => {
    body.style.overflow = '';
    running.delete(details);
    if (!opening) {
      details.open = false;
      details.removeAttribute('data-closing');
    }
  };
}

// One listener on the list, so releases swapped in later (src/scripts/releases.ts) work too.
if (list && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  list.addEventListener('click', (e) => {
    const summary = (e.target as Element).closest('summary');
    const details = summary?.parentElement;
    if (!(details instanceof HTMLDetailsElement) || details.parentElement !== list) return;
    e.preventDefault();
    const items = [...list.querySelectorAll<HTMLDetailsElement>(':scope > details')];
    items.forEach((item) => item.removeAttribute('name'));
    const opening = !details.open || details.hasAttribute('data-closing');
    if (opening) {
      for (const other of items) if (other !== details && other.open && !other.hasAttribute('data-closing')) animate(other, false);
    }
    animate(details, opening);
  });
}
