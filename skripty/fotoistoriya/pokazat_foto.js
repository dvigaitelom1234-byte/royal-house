import { fotoistoriya } from './dannye.js';
import { zagruzitFoto } from './zagruzit_foto.js';

export function pokazatFoto(index) {
  const { year, data } = fotoistoriya;
  if (!year.photos.length) return;
  fotoistoriya.index = Math.max(0, Math.min(year.photos.length - 1, index));
  const photo = year.photos[fotoistoriya.index];
  const counter = document.getElementById('history-position');
  counter.textContent = `${fotoistoriya.index + 1} / ${year.photos.length}`;
  counter.setAttribute('aria-label', data.texts.position.replace('{current}', fotoistoriya.index + 1).replace('{total}', year.photos.length));
  document.getElementById('history-previous').disabled = fotoistoriya.index === 0;
  document.getElementById('history-next').disabled = fotoistoriya.index === year.photos.length - 1;
  const date = document.getElementById('history-date');
  date.dateTime = photo.date || String(year.year);
  date.textContent = photo.date ? new Intl.DateTimeFormat(data.settings.locale, data.settings.date_format).format(new Date(photo.date)) : year.year;
  zagruzitFoto(photo);
}
