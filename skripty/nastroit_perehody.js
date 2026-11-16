export function nastroitPerehody() {
  document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const select = document.getElementById('selected-format');
    select.value = link.dataset.interest;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('kontakt').scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
    select.focus({ preventScroll: true });
  }));
}
