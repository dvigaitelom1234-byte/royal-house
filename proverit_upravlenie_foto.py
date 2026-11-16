from playwright.sync_api import expect


def proverit_upravlenie_foto(page, dannye, nastroiki):
    year = dannye['years'][-1]
    assert page.locator('[data-history-year][aria-pressed="true"]').inner_text() == str(year['year'])
    assert page.locator('#history-previous').is_disabled()
    page.locator('#history-next').click()
    expect(page.locator('#history-photo')).to_be_visible()
    assert page.locator('#history-photo').get_attribute('src') == year['photos'][-1]['image']
    assert page.locator('#history-next').is_disabled()
    page.locator('#history-frame').focus()
    page.keyboard.press('Home')
    expect(page.locator('#history-photo')).to_be_visible()
    assert page.locator('#history-position').inner_text() == f"1 / {len(year['photos'])}"
    page.locator('#history-enlarge').click()
    assert page.locator('#history-dialog').evaluate('(dialog) => dialog.open && dialog.matches(":modal")')
    assert page.locator('#history-dialog-image').get_attribute('src') == year['photos'][0]['image']
    page.keyboard.press('Escape')
    expect(page.locator('#history-enlarge')).to_be_focused()
    page.locator('#history-frame').evaluate('(target, swipe) => { for (const [type, points] of Object.entries(swipe)) { const touch = new Touch({identifier: 0, target, clientX: points[0], clientY: points[1]}); target.dispatchEvent(new TouchEvent(type, {touches: [touch], changedTouches: [touch]})); } }', nastroiki['history_swipe'])
    expect(page.locator('#history-photo')).to_be_visible()
    assert page.locator('#history-next').is_disabled()
    page.locator('[data-history-year]').first.click()
    expect(page.locator('#history-empty')).to_be_visible()
    assert page.locator('#history-gallery').is_hidden()
    page.locator('[data-history-year]').nth(1).click()
    expect(page.locator('#history-photo')).to_be_visible()
    assert page.locator('#history-previous').is_disabled() and page.locator('#history-next').is_disabled()
