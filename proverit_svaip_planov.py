import json


def proverit_svaip_planov(page, nastroiki):
    plans = json.loads(page.locator('#site-data').inner_text())['plans']
    page.locator('#selected-format').select_option(plans[0]['id'])
    list = page.locator('#plan-list')
    size = int(list.evaluate('(element) => getComputedStyle(element).getPropertyValue("--plan-page-size")'))
    start, end = nastroiki['history_swipe'].values()
    list.dispatch_event('pointerdown', {'clientX': start[0], 'clientY': start[1], 'pointerType': 'touch'})
    list.dispatch_event('pointerup', {'clientX': end[0], 'clientY': end[1], 'pointerType': 'touch'})
    assert page.locator('#plan-list button:visible').first.get_attribute('data-plan') == plans[size]['id']
    page.locator('#selected-format').select_option(plans[0]['id'])
