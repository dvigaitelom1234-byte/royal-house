import { sostoyanie } from './dannye.js';
import { obnovitListaniePlanov } from './obnovit_listanie_planov.js';
export function pokazatPlan(plan) {
  sostoyanie.active = plan;
  const image = document.getElementById('active-plan-image');
  image.src = plan.image;
  image.alt = plan.title;
  document.getElementById('active-plan-type').textContent = plan.title;
  document.getElementById('active-plan-area').textContent = plan.area.toLocaleString('ru-RU');
  document.getElementById('active-plan-description').textContent = plan.description;
  document.getElementById('active-plan-features').replaceChildren(...plan.features.map(text => {
    const item = document.createElement('li'); item.textContent = text; return item;
  }));
  document.querySelectorAll('.plan-option').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.plan === plan.id)));
  obnovitListaniePlanov();
}
