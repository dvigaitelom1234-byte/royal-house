from proverit_podbor import proverit_podbor
from proverit_formu import proverit_formu
from proverit_razdely import proverit_razdely
from proverit_kollazh import proverit_kollazh
from proverit_listanie_planov import proverit_listanie_planov
from proverit_fotoistoriyu import proverit_fotoistoriyu
from proverit_realnye_foto import proverit_realnye_foto
from proverit_svaip_planov import proverit_svaip_planov


def proverit_interfeis(browser, url, viewport, nastroiki):
    page = browser.new_page(viewport=viewport, reduced_motion='reduce')
    page.set_default_timeout(nastroiki['timeout'])
    errors, missing = [], []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('response', lambda response: missing.append(response.url) if response.url.startswith(url + '/') and response.status >= 400 else None)
    page.on('requestfailed', lambda request: missing.append(request.url) if request.url.startswith(url + '/') else None)
    page.goto(url, wait_until='domcontentloaded')
    assert not errors and not missing, {'javascript': errors, 'resources': missing}
    page.locator('img[src]').evaluate_all('(items) => Promise.all(items.map(i => { i.loading="eager"; return i.decode(); }))')
    assert page.locator('img[src]').evaluate_all('(items) => items.every(i => i.complete && i.naturalWidth > 0)')
    for font in nastroiki['required_fonts']:
        assert page.evaluate('async font => (await document.fonts.load(`20px "${font}"`)).length > 0', font), font
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    assert page.locator('main section').count() == nastroiki['sections']
    proverit_podbor(page, nastroiki)
    proverit_listanie_planov(page, nastroiki)
    proverit_svaip_planov(page, nastroiki)
    proverit_formu(page, nastroiki)
    proverit_razdely(page, nastroiki)
    proverit_realnye_foto(page)
    if viewport['width'] <= nastroiki['mobile_width']:
        page.locator('.menu-button').click()
        assert page.locator('#navigation').is_visible()
        page.keyboard.press('Escape')
        assert not page.locator('#navigation').is_visible()
    if viewport == nastroiki['viewports'][0]:
        proverit_kollazh(page, nastroiki['collage'])
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    assert not errors and not missing, {'javascript': errors, 'resources': missing}
    proverit_fotoistoriyu(browser, url, viewport, nastroiki)
    page.close()
