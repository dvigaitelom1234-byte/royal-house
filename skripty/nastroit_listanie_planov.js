import { dannye } from './dannye.js';
import { perelistnutPlan } from './perelistnut_plan.js';
import { poluchitPlany } from './poluchit_plany.js';
import { obnovitListaniePlanov } from './obnovit_listanie_planov.js';
import { nastroitSvaipPlanov } from './nastroit_svaip_planov.js';

export function nastroitListaniePlanov() {
  const labels = dannye.planNavigation;
  const list = document.getElementById('plan-list');
  document.getElementById('plan-navigation').setAttribute('aria-label', labels.label);
  for (const [direction, step] of [['previous', -1], ['next', 1]]) {
    const button = document.getElementById(`plan-${direction}`);
    button.setAttribute('aria-label', labels[direction]);
    button.addEventListener('click', () => perelistnutPlan(step, true));
  }
  list.addEventListener('keydown', event => {
    const steps = { ArrowLeft: -1, ArrowRight: 1, Home: -poluchitPlany().length, End: poluchitPlany().length };
    if (!(event.key in steps)) return;
    event.preventDefault();
    perelistnutPlan(steps[event.key]);
    list.querySelector('[aria-pressed="true"]').focus({ preventScroll: true });
  });
  new ResizeObserver(obnovitListaniePlanov).observe(list);
  nastroitSvaipPlanov();
}
