import { dannye } from './dannye.js';
import { perelistnutPlan } from './perelistnut_plan.js';

export function nastroitSvaipPlanov() {
  const list = document.getElementById('plan-list');
  let start;
  let moved = false;
  list.addEventListener('pointerdown', event => {
    start = { x: event.clientX, y: event.clientY };
    moved = false;
  });
  list.addEventListener('pointerup', event => {
    if (!start) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    moved = Math.abs(x) >= dannye.planNavigation.swipeThreshold && Math.abs(x) > Math.abs(y);
    if (moved) perelistnutPlan(x < 0 ? 1 : -1, true);
    start = null;
  });
  list.addEventListener('pointercancel', () => { start = null; });
  list.addEventListener('click', event => {
    if (moved) { event.preventDefault(); event.stopPropagation(); moved = false; }
  }, true);
  list.addEventListener('dragstart', event => event.preventDefault());
}
