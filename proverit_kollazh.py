import json


def proverit_kollazh(page, nastroiki):
    motion = json.loads(page.locator('#collage-data').inner_text())
    assert page.locator('.chapter-photo > img').count() == nastroiki['photos']
    assert page.locator('.chapter-photo > img').evaluate_all('(items) => items.every(i => i.src.includes("/gazeta/"))')
    page.emulate_media(reduced_motion='no-preference')
    page.reload(wait_until='domcontentloaded')
    photo = page.locator(nastroiki['selector'])
    photo.scroll_into_view_if_needed()
    page.wait_for_function('([selector, active]) => document.querySelector(selector).classList.contains(active)', arg=[nastroiki['selector'], motion['active_class']])
    bounds = photo.bounding_box()
    page.mouse.move(bounds['x'] + bounds['width'] * nastroiki['pointer_ratio'], bounds['y'] + bounds['height'] * nastroiki['pointer_ratio'])
    property_name = motion['pointer']['properties'][0]
    page.wait_for_function('([selector, property]) => !!document.querySelector(selector).style.getPropertyValue(property)', arg=[nastroiki['selector'], property_name])
    page.emulate_media(reduced_motion='reduce')
    page.wait_for_function('([selector, property]) => !document.querySelector(selector).style.getPropertyValue(property)', arg=[nastroiki['selector'], property_name])
    assert photo.locator('img').evaluate('(i) => getComputedStyle(i).animationName') == 'none'
