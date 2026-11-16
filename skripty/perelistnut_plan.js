import { sostoyanie } from './dannye.js';
import { poluchitPlany } from './poluchit_plany.js';
import { pokazatPlan } from './pokazat_plan.js';
import { razmerStranicyPlanov } from './razmer_stranicy_planov.js';

export function perelistnutPlan(step, page = false) {
  const plans = poluchitPlany();
  const index = plans.findIndex(plan => plan.id === sostoyanie.active.id);
  const size = razmerStranicyPlanov();
  const target = page ? (Math.floor(index / size) + step) * size : index + step;
  pokazatPlan(plans[Math.max(0, Math.min(plans.length - 1, target))]);
}
