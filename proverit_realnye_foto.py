import json
from pathlib import Path
from playwright.sync_api import expect


def proverit_realnye_foto(page):
    data = json.loads((Path(__file__).parent / 'dannye/fotoistoriya.json').read_text())
    assert data['years'] and all(year['photos'] for year in data['years'])
    expect(page.locator('#history-gallery')).to_be_visible()
    for year in data['years']:
        page.locator(f'[data-history-year="{year["year"]}"]').click()
        expect(page.locator('#history-photo')).to_be_visible()
        assert page.locator('#history-photo').get_attribute('src') == year['photos'][0]['image']
        assert page.locator('#history-photo').evaluate('(image) => image.naturalWidth > 0')
        assert page.locator('#history-empty').is_hidden()
        if len(year['photos']) > 1:
            page.locator('#history-next').click()
            expect(page.locator('#history-photo')).to_be_visible()
            assert page.locator('#history-photo').get_attribute('src') == year['photos'][1]['image']
    page.locator('#history-enlarge').click()
    assert page.locator('#history-dialog').evaluate('(dialog) => dialog.open')
    page.keyboard.press('Escape')
    expect(page.locator('#history-enlarge')).to_be_focused()
