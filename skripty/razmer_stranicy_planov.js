export function razmerStranicyPlanov() {
  return Number(getComputedStyle(document.getElementById('plan-list')).getPropertyValue('--plan-page-size'));
}
