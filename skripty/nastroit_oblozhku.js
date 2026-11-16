export function nastroitOblozhku() {
  const building = document.querySelector('.hero-building');
  const image = building?.querySelector('img');
  if (!image) return;
  image.decode().then(() => building.classList.add('is-ready')).catch(() => {});
}
