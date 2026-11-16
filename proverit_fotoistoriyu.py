import json
from pathlib import Path
from playwright.sync_api import expect
from proverit_oshibki_foto import proverit_oshibki_foto
from proverit_upravlenie_foto import proverit_upravlenie_foto


def proverit_fotoistoriyu(browser, url, viewport, nastroiki):
    dannye = json.loads((Path(__file__).parent / 'dannye/fotoistoriya.json').read_text())
    page = browser.new_page(viewport=viewport, reduced_motion='reduce', has_touch=True)
    page.set_default_timeout(nastroiki['timeout'])
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.route('**/dannye/fotoistoriya.json*', lambda route: route.fulfill(json=dannye))
    dannye['years'] = []
    page.goto(url, wait_until='domcontentloaded')
    expect(page.locator('#history-empty')).to_be_visible()
    assert page.locator('#history-toolbar').is_hidden()
    dannye['years'] = nastroiki['history_fixture']
    page.reload(wait_until='domcontentloaded')
    expect(page.locator('#history-photo')).to_be_visible()
    assert page.locator('#history-years button').count() == len(dannye['years'])
    proverit_upravlenie_foto(page, dannye, nastroiki)
    proverit_oshibki_foto(page, dannye)
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    assert not errors, errors
    page.close()
