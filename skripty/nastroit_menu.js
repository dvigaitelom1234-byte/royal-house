export function nastroitMenu() {
  const button = document.querySelector('.menu-button');
  const navigation = document.getElementById('navigation');
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? button.dataset.close : button.dataset.open;
    navigation.classList.toggle('open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a') && navigation.classList.contains('open')) button.click();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      button.click();
      button.focus();
    }
  });
}
