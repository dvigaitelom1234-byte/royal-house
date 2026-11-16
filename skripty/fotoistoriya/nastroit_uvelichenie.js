import { fotoistoriya } from './dannye.js';

export function nastroitUvelichenie() {
  const dialog = document.getElementById('history-dialog');
  document.getElementById('history-enlarge').addEventListener('click', () => {
    const photo = fotoistoriya.year.photos[fotoistoriya.index];
    const image = document.getElementById('history-dialog-image');
    image.src = photo.image;
    image.alt = photo.alt;
    document.getElementById('history-dialog-title').textContent = document.getElementById('history-date').textContent;
    dialog.showModal();
  });
  document.getElementById('history-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}
