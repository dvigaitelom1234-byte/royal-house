import { fotoistoriya } from './dannye.js';
import { vybratGod } from './vybrat_god.js';

export function sozdatGody() {
  const { years, settings } = fotoistoriya.data;
  const list = document.getElementById('history-years');
  for (const year of [...years].sort((first, second) => first.year - second.year)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = year.year;
    button.dataset.historyYear = year.year;
    button.setAttribute('aria-controls', 'history-gallery');
    button.addEventListener('click', () => vybratGod(year));
    list.append(button);
  }
  document.getElementById('history-toolbar').hidden = !years.length;
  if (!years.length) return;
  const available = years.filter(year => year.photos.length);
  const latest = [...(available.length ? available : years)].sort((first, second) => second.year - first.year)[0];
  vybratGod(years.find(year => year.year === settings.initial_year) || latest);
  const active = list.querySelector('[aria-pressed="true"]');
  list.scrollLeft = active.offsetLeft - list.offsetLeft;
}
