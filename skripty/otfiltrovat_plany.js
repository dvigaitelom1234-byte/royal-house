import { sostoyanie } from './dannye.js';
import { pokazatPlan } from './pokazat_plan.js';
import { poluchitPlany } from './poluchit_plany.js';
export function otfiltrovatPlany(filter) {
  sostoyanie.filter = filter;
  const plans = poluchitPlany();
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  const buttons = plans.map(plan => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'plan-option'; button.dataset.plan = plan.id;
    const image = document.createElement('img'); image.src = plan.thumbnail; image.alt = ''; image.loading = 'lazy';
    const area = document.createElement('strong'); area.textContent = `${plan.area.toLocaleString('ru-RU')} м²`;
    const title = document.createElement('span'); title.textContent = plan.title;
    button.append(image, area, title);
    button.addEventListener('click', () => pokazatPlan(plan));
    return button;
  });
  document.getElementById('plan-list').replaceChildren(...buttons);
  pokazatPlan(plans.find(plan => plan.id === sostoyanie.active.id) || plans[0]);
}
