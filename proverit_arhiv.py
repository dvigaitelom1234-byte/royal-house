import json
from datetime import date
from pathlib import Path


def proverit_arhiv():
    koren = Path(__file__).parent
    dannye = json.loads((koren / 'dannye/fotoistoriya.json').read_text())
    gody = dannye['years']
    assert gody and all(god['photos'] for god in gody)
    assert len({god['year'] for god in gody}) == len(gody)
    for god in gody:
        assert isinstance(god['year'], int)
        for foto in god['photos']:
            assert foto['alt'].strip() and foto['caption'].strip(), foto
            put = (koren / foto['image']).resolve()
            assert koren.resolve() in put.parents and put.is_file(), put
            if foto.get('date'):
                data = foto['date']
                data = data + '-01' if len(data) == len('YYYY-MM') else data
                assert date.fromisoformat(data).year == god['year'], foto
