import { dannye, sostoyanie } from './dannye.js';

export function poluchitPlany() {
  return dannye.plans.filter(plan => sostoyanie.filter === 'all' || plan.rooms === Number(sostoyanie.filter));
}
