def proverit_formu(page, nastroiki):
    form = page.locator('#contact-form')
    page.locator('#selected-format').select_option('')
    assert form.get_attribute('data-plan') is None
    form.locator('button[type="submit"]').click()
    assert not form.evaluate('(form) => form.checkValidity()')
    assert page.locator('#form-status').is_hidden()
    form.locator('[name="name"]').fill(nastroiki['test_name'])
    form.locator('[name="phone"]').fill(nastroiki['invalid_phone'])
    form.locator('[type="checkbox"]').check()
    assert not form.evaluate('(form) => form.checkValidity()')
    form.locator('[name="phone"]').fill(nastroiki['test_phone'])
    assert form.evaluate('(form) => form.checkValidity()')
    requests = []
    page.on('request', lambda request: requests.append(request.url) if request.method == 'POST' and request.frame == page.main_frame else None)
    original_url = page.url
    form.locator('button[type="submit"]').click()
    assert page.locator('#form-status').is_visible()
    assert page.url == original_url and not requests, {'before': original_url, 'after': page.url, 'requests': requests}
