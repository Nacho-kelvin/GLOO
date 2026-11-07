"""Responsive navigation checks. Run with `python3 tests/navigation.py` against a running Vite preview."""
import os
from playwright.sync_api import sync_playwright

BASE = os.environ.get('BASE', 'http://127.0.0.1:4173')
NAV_LINKS = 12  # Home plus the 11 routes in NAV.
VIEWPORTS = [320, 375, 559, 560, 699, 700, 820, 1024, 1199, 1200, 1399, 1400, 1519, 1520, 1920]

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 375, "height": 640}, is_mobile=True, has_touch=True)
    page.goto(BASE, wait_until='networkidle')

    for width in VIEWPORTS:
        page.set_viewport_size({"width": width, "height": 640})
        page.wait_for_timeout(50)
        overflow = page.evaluate('document.documentElement.scrollWidth - window.innerWidth')
        assert overflow <= 0, f'{width}px viewport has {overflow}px horizontal overflow'
        menu = page.locator('#menu')
        burger = page.locator('.burger')

        if width < 1400:
            assert burger.is_visible(), f'burger should be visible at {width}px'
            assert not menu.is_visible(), f'menu should start closed at {width}px'
            burger.click()
            assert menu.is_visible(), f'menu did not open at {width}px'
            assert burger.get_attribute('aria-expanded') == 'true'
            assert page.locator('#menu a').count() == NAV_LINKS
            assert all(link.is_visible() for link in page.locator('#menu a').all()), f'a navigation link is hidden at {width}px'
            assert page.evaluate('getComputedStyle(document.body).overflow') == 'hidden'
            page.keyboard.press('Escape')
            assert not menu.is_visible(), f'Escape did not close the menu at {width}px'
            assert burger.get_attribute('aria-expanded') == 'false'
            assert page.evaluate('getComputedStyle(document.body).overflow') != 'hidden'
        else:
            assert not burger.is_visible(), f'burger should be hidden at {width}px'
            assert menu.is_visible(), f'desktop navigation should be visible at {width}px'
            assert page.locator('#menu a').count() == NAV_LINKS

    # Opening the compact menu and then resizing to desktop must release the scroll lock.
    page.set_viewport_size({"width": 1024, "height": 640})
    page.locator('.burger').click()
    page.set_viewport_size({"width": 1400, "height": 800})
    page.wait_for_timeout(100)
    assert page.locator('.burger').get_attribute('aria-expanded') == 'false'
    assert page.evaluate('getComputedStyle(document.body).overflow') != 'hidden'

    browser.close()
print(f'Navigation passed at {len(VIEWPORTS)} viewport widths.')
