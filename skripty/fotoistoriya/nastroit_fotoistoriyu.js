import { fotoistoriya } from './dannye.js';
import { sozdatGody } from './sozdat_gody.js';
import { nastroitListanieFoto } from './nastroit_listanie_foto.js';
import { nastroitUvelichenie } from './nastroit_uvelichenie.js';

export async function nastroitFotoistoriyu() {
  const section = document.getElementById('stroitelstvo');
  try {
    const response = await fetch(section.dataset.history);
    if (!response.ok) throw new Error(response.status);
    fotoistoriya.data = await response.json();
    const { texts } = fotoistoriya.data;
    document.querySelectorAll('[data-history-text]').forEach(element => { element.textContent = texts[element.dataset.historyText]; });
    document.querySelectorAll('[data-history-label]').forEach(element => { element.setAttribute('aria-label', texts[element.dataset.historyLabel]); });
    section.hidden = false;
    sozdatGody();
    nastroitListanieFoto();
    nastroitUvelichenie();
    document.getElementById('history-nav').hidden = false;
    if (location.hash === `#${section.id}`) section.scrollIntoView({ behavior: 'instant' });
  } catch {
    section.hidden = true;
    document.getElementById('history-nav').hidden = true;
  }
}
