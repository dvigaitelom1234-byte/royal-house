import json


def proverit_listanie_planov(page, nastroiki):
    plans = json.loads(page.locator('#site-data').inner_text())['plans']
    page.locator('#selected-format').select_option(plans[0]['id'])
    visible = page.locator('#plan-list [data-plan]:visible')
    size = int(page.locator('#plan-list').evaluate('(list) => getComputedStyle(list).getPropertyValue("--plan-page-size")'))
    assert page.locator('#plan-previous').is_disabled()
    for start in range(0, len(plans), size):
        assert visible.evaluate_all('(items) => items.map(item => item.dataset.plan)') == [plan['id'] for plan in plans[start:start + size]]
        assert page.locator('#active-plan-image').get_attribute('src') == plans[start]['image']
        if start + size < len(plans):
            page.locator('#plan-next').click()
    assert page.locator('#plan-next').is_disabled()
    page.locator('#plan-previous').click()
    assert visible.first.get_attribute('data-plan') == plans[len(plans) - size * 2]['id']
    page.locator('#plan-list [aria-pressed="true"]').focus()
    page.keyboard.press('Home')
    assert visible.first.get_attribute('data-plan') == plans[0]['id']
    page.keyboard.press('End')
    assert page.locator('#plan-list [aria-pressed="true"]').get_attribute('data-plan') == plans[-1]['id']
    page.locator('[data-filter="3"]').click()
    assert visible.count() == min(size, nastroiki['filters']['3'])
    assert page.locator('#plan-next').is_disabled() == (size >= nastroiki['filters']['3'])
    assert page.locator('#plan-list').evaluate('(list) => list.clientHeight < list.querySelector("button:not([hidden])").clientHeight * 2')
    page.locator('[data-filter="all"]').click()
