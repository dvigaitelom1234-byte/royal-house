import hashlib
import json
import re
from pathlib import Path


def verzionirovat_resursy():
    koren = Path(__file__).resolve().parent
    nastroiki = json.loads((koren / 'dannye/resursy.json').read_text())
    versii = {}
    for pattern in nastroiki['patterns']:
        for put in sorted(koren.glob(pattern)):
            imya = put.relative_to(koren).as_posix()
            versiya = hashlib.sha256(put.read_bytes()).hexdigest()
            versii[imya] = f"{imya}?{nastroiki['version_key']}={versiya}"
    karta = {'imports': {f'./{imya}': f'./{url}' for imya, url in versii.items() if imya.endswith('.js')}}
    dokument = koren / nastroiki['document']
    html = dokument.read_text()
    identifikator = nastroiki['import_map_id']
    html = re.sub(rf'<script type="importmap" id="{re.escape(identifikator)}">.*?</script>', '', html, flags=re.S)
    html = re.sub(r'((?:src|href|data-history)=")([^"?]+)(?:\?[^\"]*)?(")',
                  lambda match: match[1] + versii.get(match[2], match[0][len(match[1]):-1]) + match[3], html)
    skript = f'<script type="importmap" id="{identifikator}">{json.dumps(karta, ensure_ascii=False)}</script>'
    html = html.replace('<head>', '<head>' + skript, 1)
    if html != dokument.read_text():
        dokument.write_text(html)
