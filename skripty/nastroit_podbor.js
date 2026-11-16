import { sostoyanie } from './dannye.js';
import { otfiltrovatPlany } from './otfiltrovat_plany.js';
import { vybratPlan } from './vybrat_plan.js';
import { nastroitListaniePlanov } from './nastroit_listanie_planov.js';
export function nastroitPodbor() {
  nastroitListaniePlanov();
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => otfiltrovatPlany(button.dataset.filter)));
  document.querySelectorAll('[data-plan-filter]').forEach(link => link.addEventListener('click', () => otfiltrovatPlany(link.dataset.planFilter)));
  document.getElementById('select-plan').addEventListener('click', () => vybratPlan(sostoyanie.active));
  document.getElementById('enlarge-plan').addEventListener('click', () => {
    const plan = sostoyanie.active;
    document.getElementById('dialog-title').textContent = `${plan.title} · ${plan.area.toLocaleString('ru-RU')} м²`;
    const image = document.getElementById('dialog-image'); image.src = plan.image; image.alt = plan.title;
    document.getElementById('download-plan').href = plan.image;
    document.getElementById('plan-dialog').showModal();
  });
  document.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.getElementById('contact-form').addEventListener('submit', event => {
    event.preventDefault(); document.getElementById('form-status').hidden = false;
  });
  otfiltrovatPlany('all');
}
