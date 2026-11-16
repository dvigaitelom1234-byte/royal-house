import obnovitOtklik from './obnovit_otklik.js';
import sbrositOtklik from './sbrosit_otklik.js';

export default function podklyuchitOtklik(photos, settings, motion) {
  const pointer = matchMedia(settings.query);
  let frame, point;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = point = null;
    photos.forEach(photo => sbrositOtklik(photo, settings));
  };
  const update = () => {
    if (!point || frame || motion.matches || !pointer.matches) return;
    frame = requestAnimationFrame(() => {
      photos.forEach(photo => obnovitOtklik(photo, point, settings));
      frame = null;
    });
  };
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || motion.matches || !pointer.matches) return;
    point = { x: event.clientX, y: event.clientY };
    update();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', reset);
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', reset);
  motion.addEventListener('change', reset);
  pointer.addEventListener('change', reset);
}
