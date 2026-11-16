import { dannye } from './dannye.js';
import { otfiltrovatPlany } from './otfiltrovat_plany.js';
import { pokazatPlan } from './pokazat_plan.js';
import { primenitInteres } from './primenit_interes.js';
export function nastroitVybor() {
  const select = document.getElementById('selected-format');
  const form = document.getElementById('contact-form');
  for (const plan of dannye.plans) {
    select.add(new Option(`${plan.title} · ${plan.area.toLocaleString('ru-RU')} м²`, plan.id));
  }
  for (const interest of dannye.interests) select.add(new Option(interest.label, interest.id));
  select.addEventListener('change', () => {
    primenitInteres(select.value);
    const plan = dannye.plans.find(item => item.id === select.value);
    if (plan) {
      form.dataset.plan = plan.id;
      otfiltrovatPlany('all');
      pokazatPlan(plan);
    } else delete form.dataset.plan;
    document.getElementById('form-status').hidden = true;
  });
}
