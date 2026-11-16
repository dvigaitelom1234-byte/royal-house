import json


def proverit_razdely(page, nastroiki):
    form = page.locator('#contact-form')
    select = page.locator('#selected-format')
    needs = form.locator('[name="needs"]')
    needs.fill(nastroiki['test_needs'])
    for link in page.locator('.chapter-action a').all():
        page.locator('[data-filter]').last.click()
        interest = link.get_attribute('data-interest')
        link.click()
        if interest:
            assert select.input_value() == interest
            assert form.get_attribute('data-interest') == interest
            assert form.get_attribute('data-plan') is None
        elif link.get_attribute('data-plan-filter'):
            assert page.locator('[data-filter="all"]').get_attribute('aria-pressed') == 'true'
        assert needs.input_value() == nastroiki['test_needs']
    page.locator('#select-plan').click()
    assert form.get_attribute('data-interest') is None
    assert form.get_attribute('data-plan') == select.input_value()
    assert page.locator('#submit-label').inner_text() == json.loads(page.locator('#site-data').inner_text())['texts']['submit']
