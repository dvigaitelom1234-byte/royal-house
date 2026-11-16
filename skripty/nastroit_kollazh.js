import podklyuchitOtklik from './podklyuchit_otklik.js';

function nastroitKollazh() {
  const settings = JSON.parse(document.getElementById('collage-data').textContent);
  const motion = matchMedia(settings.motion_query);
  const photos = document.querySelectorAll(settings.selector);
  podklyuchitOtklik(photos, settings.pointer, motion);
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const photo = entry.target.querySelector('img');
      const ready = photo ? photo.decode() : Promise.resolve();
      ready.catch(() => {}).then(() => {
        if (!motion.matches) entry.target.classList.add(settings.active_class);
      });
      observer.unobserve(entry.target);
    }
  }, { threshold: settings.threshold, rootMargin: settings.root_margin });
  if (!motion.matches) photos.forEach(element => observer.observe(element));
  motion.addEventListener('change', event => {
    if (!event.matches) return photos.forEach(element => observer.observe(element));
    observer.disconnect();
    photos.forEach(element => element.classList.remove(settings.active_class));
  });
}
nastroitKollazh();
