import { fotoistoriya } from './dannye.js';
import { pokazatFoto } from './pokazat_foto.js';

export function nastroitListanieFoto() {
  document.getElementById('history-previous').addEventListener('click', () => pokazatFoto(fotoistoriya.index - 1));
  document.getElementById('history-next').addEventListener('click', () => pokazatFoto(fotoistoriya.index + 1));
  document.getElementById('history-retry').addEventListener('click', () => pokazatFoto(fotoistoriya.index));
  const frame = document.getElementById('history-frame');
  frame.addEventListener('keydown', event => {
    const steps = { ArrowLeft: -1, ArrowRight: 1, Home: -fotoistoriya.year.photos.length, End: fotoistoriya.year.photos.length };
    if (!(event.key in steps)) return;
    event.preventDefault();
    pokazatFoto(fotoistoriya.index + steps[event.key]);
  });
  let start;
  frame.addEventListener('touchstart', event => { start = event.touches[0]; }, { passive: true });
  frame.addEventListener('touchend', event => {
    if (!start) return;
    const distance = event.changedTouches[0].clientX - start.clientX;
    const vertical = event.changedTouches[0].clientY - start.clientY;
    if (Math.abs(distance) >= fotoistoriya.data.settings.swipe_threshold && Math.abs(distance) > Math.abs(vertical)) {
      pokazatFoto(fotoistoriya.index + (distance < 0 ? 1 : -1));
    }
    start = null;
  }, { passive: true });
  frame.addEventListener('touchcancel', () => { start = null; });
}
