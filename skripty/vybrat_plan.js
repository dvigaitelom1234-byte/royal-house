export function vybratPlan(plan) {
  document.getElementById('selected-format').value = plan.id;
  document.getElementById('selected-format').dispatchEvent(new Event('change', { bubbles: true }));
  document.getElementById('form-status').hidden = true;
  document.getElementById('contact-form').dataset.plan = plan.id;
  document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
  document.getElementById('kontakt').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('input[name="name"]').focus({ preventScroll: true });
}
