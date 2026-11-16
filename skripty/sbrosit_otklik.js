export default function sbrositOtklik(photo, settings) {
  settings.properties.forEach(property => photo.style.removeProperty(property));
}
