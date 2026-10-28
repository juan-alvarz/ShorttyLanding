// Releases open and close with a short slide and fade instead of jumping. Each <details> holds a
// summary and one .body; one release is open at a time, like the native name="release" group,
// which is dropped here so the closing one can animate too. Off for people who ask for less motion.
const DURATION = 320;
const EASING = 'cubic-bezier(.2, .8, .2, 1)';

const items = [...document.querySelectorAll<HTMLDetailsElement>('[data-accordion] details')];
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

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (const details of items) {
    details.removeAttribute('name');
    details.querySelector('summary')!.addEventListener('click', (e) => {
      e.preventDefault();
      const opening = !details.open || details.hasAttribute('data-closing');
      if (opening) {
        for (const other of items) if (other !== details && other.open && !other.hasAttribute('data-closing')) animate(other, false);
      }
      animate(details, opening);
    });
  }
}
