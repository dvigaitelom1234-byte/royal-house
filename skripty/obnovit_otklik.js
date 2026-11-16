import sbrositOtklik from './sbrosit_otklik.js';

export default function obnovitOtklik(photo, point, settings) {
  const rect = photo.getBoundingClientRect();
  const x = (point.x - rect.left - rect.width / 2) / (rect.width / 2);
  const y = (point.y - rect.top - rect.height / 2) / (rect.height / 2);
  const outsideX = Math.max(rect.left - point.x, point.x - rect.right, 0);
  const outsideY = Math.max(rect.top - point.y, point.y - rect.bottom, 0);
  const strength = Math.max(0, 1 - Math.hypot(outsideX, outsideY) / settings.radius);
  if (!strength) return sbrositOtklik(photo, settings);
  const nx = Math.max(-1, Math.min(1, x));
  const ny = Math.max(-1, Math.min(1, y));
  const values = [nx * settings.travel, ny * settings.travel, nx * settings.turn].map(value => value * strength);
  settings.properties.forEach((property, index) => {
    const unit = index === values.length - 1 ? 'deg' : 'px';
    photo.style.setProperty(property, `${values[index].toFixed(settings.precision)}${unit}`);
  });
}
