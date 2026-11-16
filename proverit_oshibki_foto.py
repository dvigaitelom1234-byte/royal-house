from playwright.sync_api import expect


def proverit_oshibki_foto(page, dannye):
    year = dannye['years'][-1]
    image = '**/' + year['photos'][0]['image']
    page.route(image, lambda route: route.abort())
    page.reload(wait_until='domcontentloaded')
    expect(page.locator('#history-status')).to_have_text(dannye['texts']['error'])
    assert page.locator('#history-enlarge').is_disabled()
    page.unroute(image)
    page.locator('#history-retry').click()
    expect(page.locator('#history-photo')).to_be_visible()
    assert page.locator('#history-enlarge').is_enabled()
    page.locator('#history-frame').focus()
    page.keyboard.press('End')
    page.keyboard.press('Home')
    expect(page.locator('#history-photo')).to_be_visible()
    assert page.locator('#history-photo').get_attribute('src') == year['photos'][0]['image']
