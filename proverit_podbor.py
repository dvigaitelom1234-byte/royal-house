import json
from urllib.parse import urljoin


def proverit_podbor(page, nastroiki):
    plans = json.loads(page.locator('#site-data').inner_text())['plans']
    for value, count in nastroiki['filters'].items():
        button = page.locator(f'[data-filter="{value}"]')
        button.click()
        assert button.get_attribute('aria-pressed') == 'true'
        assert page.locator('#plan-list [data-plan]').count() == count
    page.locator('[data-filter="all"]').click()
    page.locator('#selected-format').select_option(plans[0]['id'])
    for plan in plans:
        while not page.locator(f'#plan-list [data-plan="{plan["id"]}"]').is_visible():
            page.locator('#plan-next').click()
        page.locator(f'#plan-list [data-plan="{plan["id"]}"]').click()
        assert page.locator('#active-plan-type').inner_text() == plan['title']
        assert page.request.get(urljoin(page.url, plan['image'])).ok
        page.locator('#select-plan').click()
        assert page.locator('#selected-format').input_value() == plan['id']
        assert page.locator('#contact-form').get_attribute('data-plan') == plan['id']
    page.locator('#enlarge-plan').click()
    assert page.locator('#plan-dialog').evaluate('(dialog) => dialog.open && dialog.matches(":modal")')
    assert page.locator('#dialog-image').get_attribute('src') == plans[-1]['image']
    with page.expect_download() as download:
        page.locator('#download-plan').click()
    assert download.value.failure() is None
    page.keyboard.press('Escape')
    assert not page.locator('#plan-dialog').evaluate('(dialog) => dialog.open')
    for plan in plans:
        page.locator('#selected-format').select_option(plan['id'])
        assert page.locator('#active-plan-type').inner_text() == plan['title']
