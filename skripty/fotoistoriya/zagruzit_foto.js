import { fotoistoriya } from './dannye.js';
import { pokazatStatusFoto } from './pokazat_status_foto.js';

export async function zagruzitFoto(photo) {
  const request = ++fotoistoriya.request;
  const image = document.getElementById('history-photo');
  pokazatStatusFoto('loading');
  image.src = photo.image;
  image.alt = photo.alt;
  try {
    await image.decode();
    if (request === fotoistoriya.request) pokazatStatusFoto('ready');
  } catch {
    if (request === fotoistoriya.request) pokazatStatusFoto('error');
  }
}
