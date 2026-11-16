import functools
import http.server
import json
import os
import tempfile
import threading
from pathlib import Path
from playwright.sync_api import sync_playwright
from proverit_interfeis import proverit_interfeis
from proverit_arhiv import proverit_arhiv
from verzionirovat_resursy import verzionirovat_resursy


def pipeline():
    verzionirovat_resursy()
    proverit_arhiv()
    koren = Path(__file__).resolve().parent
    nastroiki = json.loads((koren / 'dannye/proverka.json').read_text())
    http.server.ThreadingHTTPServer.request_queue_size = nastroiki['request_queue']
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(koren))
    with tempfile.TemporaryDirectory(prefix=nastroiki['temporary_prefix'], dir=koren) as vremennye:
        predyduschii_tmp = os.environ.get('TMPDIR')
        os.environ['TMPDIR'] = vremennye
        with http.server.ThreadingHTTPServer((nastroiki['host'], 0), handler) as server:
            threading.Thread(target=server.serve_forever, daemon=True).start()
            try:
                with sync_playwright() as playwright:
                    browser = playwright.chromium.launch(channel=nastroiki['browser'])
                    url = f"http://{nastroiki['host']}:{server.server_port}"
                    for viewport in nastroiki['viewports']:
                        proverit_interfeis(browser, url, viewport, nastroiki)
                    browser.close()
            finally:
                server.shutdown()
                if predyduschii_tmp is None:
                    os.environ.pop('TMPDIR', None)
                else:
                    os.environ['TMPDIR'] = predyduschii_tmp
    print(nastroiki['success'])


if __name__ == '__main__':
    pipeline()
