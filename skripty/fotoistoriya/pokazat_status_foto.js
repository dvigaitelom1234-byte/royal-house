import { fotoistoriya } from './dannye.js';

export function pokazatStatusFoto(status) {
  const { texts } = fotoistoriya.data;
  const message = document.getElementById('history-status');
  const ready = status === 'ready';
  message.textContent = ready ? '' : texts[status];
  message.hidden = ready;
  document.getElementById('history-retry').hidden = status !== 'error';
  document.getElementById('history-photo').hidden = !ready;
  document.getElementById('history-enlarge').disabled = !ready;
  document.getElementById('history-frame').setAttribute('aria-busy', String(status === 'loading'));
}
