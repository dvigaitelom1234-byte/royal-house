import { fotoistoriya } from './dannye.js';
import { pokazatFoto } from './pokazat_foto.js';

export function vybratGod(year) {
  fotoistoriya.year = year;
  fotoistoriya.index = 0;
  document.querySelectorAll('[data-history-year]').forEach(button => {
    const active = Number(button.dataset.historyYear) === year.year;
    button.setAttribute('aria-pressed', String(active));
  });
  const empty = !year.photos.length;
  document.getElementById('history-gallery').hidden = empty;
  document.getElementById('history-controls').hidden = empty;
  const message = document.getElementById('history-empty');
  message.hidden = !empty;
  message.textContent = fotoistoriya.data.texts.year_empty;
  if (empty) {
    fotoistoriya.request += 1;
    document.getElementById('history-photo').removeAttribute('src');
    return;
  }
  pokazatFoto(0);
}
