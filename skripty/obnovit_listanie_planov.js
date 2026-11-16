import { dannye, sostoyanie } from './dannye.js';
import { poluchitPlany } from './poluchit_plany.js';
import { razmerStranicyPlanov } from './razmer_stranicy_planov.js';

export function obnovitListaniePlanov() {
  const plans = poluchitPlany();
  const index = plans.findIndex(plan => plan.id === sostoyanie.active.id);
  const size = razmerStranicyPlanov();
  const start = Math.floor(index / size) * size;
  const end = Math.min(start + size, plans.length);
  const position = document.getElementById('plan-position');
  position.textContent = `${start + 1}${end > start + 1 ? `–${end}` : ''} / ${plans.length}`;
  position.setAttribute('aria-label', dannye.planNavigation.position.replace('{start}', start + 1).replace('{end}', end).replace('{total}', plans.length));
  document.getElementById('plan-previous').disabled = start === 0;
  document.getElementById('plan-next').disabled = end === plans.length;
  const list = document.getElementById('plan-list');
  list.querySelectorAll('button').forEach((button, item) => {
    button.hidden = item < start || item >= end;
    button.tabIndex = item === index ? 0 : -1;
  });
}
