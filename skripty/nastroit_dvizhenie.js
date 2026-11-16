export function nastroitDvizhenie() {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  const scenes = [...document.querySelectorAll('[data-scene]')];
  const drifts = [...document.querySelectorAll('[data-drift]')].map(element => ({
    element, scene: element.closest('[data-scene]'), multiplier: Number(element.dataset.drift) || 0,
  }));
  const hero = document.querySelector('.hero-canvas');
  let frame = 0;
  let observer;
  const resetPointer = () => {
    hero?.style.setProperty('--pointer-x', '0px');
    hero?.style.setProperty('--pointer-y', '0px');
  };
  const pointerMove = event => {
    if (!finePointer.matches || motion.matches) return;
    const rect = hero.getBoundingClientRect();
    const limit = 12;
    const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    hero.style.setProperty('--pointer-x', `${x * limit}px`);
    hero.style.setProperty('--pointer-y', `${y * limit}px`);
  };
  const update = () => {
    frame = 0;
    const height = window.innerHeight;
    const measurements = scenes.map(scene => ({ scene, rect: scene.getBoundingClientRect() }));
    const progress = new Map(measurements.map(({ scene, rect }) => [
      scene, Math.max(0, Math.min(1, (height - rect.top) / (height + rect.height))),
    ]));
    for (const [scene, value] of progress) scene.style.setProperty('--scene-progress', value);
    for (const { element, scene, multiplier } of drifts) {
      element.style.setProperty('--drift-y', `${(0.5 - (progress.get(scene) ?? 0.5)) * multiplier}px`);
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const configure = () => {
    observer?.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    hero?.removeEventListener('pointermove', pointerMove);
    hero?.removeEventListener('pointerleave', resetPointer);
    cancelAnimationFrame(frame);
    frame = 0;
    resetPointer();
    if (motion.matches) {
      reveals.forEach(element => element.classList.add('in-view'));
      scenes.forEach(scene => scene.style.setProperty('--scene-progress', '0.5'));
      drifts.forEach(({ element }) => element.style.setProperty('--drift-y', '0px'));
      return;
    }
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }), { threshold: 0.1 });
      reveals.forEach(element => observer.observe(element));
    } else reveals.forEach(element => element.classList.add('in-view'));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    hero?.addEventListener('pointermove', pointerMove, { passive: true });
    hero?.addEventListener('pointerleave', resetPointer);
    schedule();
  };
  motion.addEventListener('change', configure);
  configure();
  return () => {
    motion.removeEventListener('change', configure);
    observer?.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    hero?.removeEventListener('pointermove', pointerMove);
    hero?.removeEventListener('pointerleave', resetPointer);
    cancelAnimationFrame(frame);
    resetPointer();
  };
}
