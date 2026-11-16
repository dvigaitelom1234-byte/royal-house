import { dannye } from './dannye.js';
export function primenitInteres(value) {
  const interest = dannye.interests.find(item => item.id === value);
  const texts = dannye.texts;
  const content = interest || {
    title: texts.contact_title, text: texts.contact_text, needs_label: texts.needs_label,
    placeholder: texts.needs_placeholder, submit: texts.submit,
  };
  const form = document.getElementById('contact-form');
  if (interest) form.dataset.interest = value;
  else delete form.dataset.interest;
  document.getElementById('contact-title').innerHTML = content.title;
  document.getElementById('contact-text').textContent = content.text;
  document.getElementById('needs-label').textContent = content.needs_label;
  document.querySelector('[name="needs"]').placeholder = content.placeholder;
  document.getElementById('submit-label').textContent = content.submit;
}
