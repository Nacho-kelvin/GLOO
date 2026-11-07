"""End-to-end checks for the HomeAFar site, run in a real Chromium via Playwright (pip install playwright; playwright install chromium).

  python3 tests/e2e.py            # BASE defaults to http://127.0.0.1:4173 (npm run build && npx vite preview --port 4173)
  MOCK=1 python3 tests/e2e.py   # also submits the forms; the Netlify Forms POST is intercepted, so nothing is really sent
"""
import os, sys, re
from urllib.parse import parse_qs
from playwright.sync_api import sync_playwright

BASE = os.environ.get('BASE', 'http://127.0.0.1:4173')
MOCK = os.environ.get('MOCK') == '1'
ROUTES = ['/', '/about', '/safe-landing', '/tourism-to-africa', '/protection-and-justice', '/womens-health', '/events', '/stories-from-afar',
          '/beyond-the-borders', '/opportunities', '/get-involved', '/contact', '/privacy', '/does-not-exist']
SIZES = {'mobile': (375, 780), 'tablet': (820, 1000), 'desktop': (1280, 800)}
results = []

def check(name, ok, detail=''):
    results.append((name, bool(ok), detail))
    print(('PASS ' if ok else 'FAIL ') + name + (f'  [{detail}]' if detail and not ok else ''))

def mock_backend(ctx, events=None, fail=False, log=None):
    # Intercepts the Netlify Forms POST (forms are only processed on Netlify itself, not by vite preview).
    def handler(route):
        req = route.request
        if req.method != 'POST': return route.continue_()
        if log is not None: log.append({k: v[0] for k, v in parse_qs(req.post_data or '').items()})
        return route.fulfill(status=500 if fail else 200, body='')
    ctx.route('**/__forms.html', handler)

def scroll_all(pg):
    h = pg.evaluate('document.documentElement.scrollHeight'); y = 0
    while y < h:
        pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(90); y += 500
    pg.wait_for_timeout(600)

with sync_playwright() as p:
    b = p.chromium.launch()

    # 1. Every route at three sizes: loads, no console errors, no failed requests, no horizontal overflow, every image decodes
    for label, (w, h) in SIZES.items():
        ctx = b.new_context(viewport={'width': w, 'height': h}); mock_backend(ctx, events=[]) if MOCK else None
        for r in ROUTES:
            pg = ctx.new_page(); errs, bad = [], []
            pg.on('console', lambda m, e=errs: e.append(m.text) if m.type == 'error' and 'Failed to load resource' not in m.text else None)
            pg.on('pageerror', lambda e, l=errs: l.append(str(e)))
            pg.on('requestfailed', lambda q, l=bad: l.append(q.url))
            pg.on('response', lambda rs, l=bad: l.append(f'{rs.status} {rs.url}') if rs.status >= 400 and not rs.url.endswith('/does-not-exist') else None)
            resp = pg.goto(BASE + r, wait_until='networkidle'); scroll_all(pg)
            ok_status = (resp.status == 404) if r == '/does-not-exist' else (resp.status == 200)
            overflow = pg.evaluate('document.documentElement.scrollWidth - window.innerWidth')
            broken = pg.evaluate("[...document.images].filter(i=>!(i.complete&&i.naturalWidth>0)&&i.currentSrc).map(i=>i.currentSrc)")
            check(f'[{label}] {r} loads (HTTP {resp.status})', ok_status)
            check(f'[{label}] {r} no console errors / failed requests', not errs and not bad, str(errs + bad)[:200])
            check(f'[{label}] {r} no horizontal overflow', overflow <= 0, f'{overflow}px')
            check(f'[{label}] {r} all images load', not broken, str(broken)[:200])
            pg.close()
        ctx.close()

    # 2. Navigation: desktop links, mobile menu, browser back/forward
    ctx = b.new_context(viewport={'width': 1280, 'height': 800}); pg = ctx.new_page(); pg.goto(BASE + '/', wait_until='networkidle')
    links = pg.eval_on_selector_all('#menu a', 'els=>els.map(e=>[e.getAttribute("href"),e.textContent])')
    check('desktop nav has 11 links', len(links) == 11, str(len(links)))
    for href, _ in links:
        pg.click(f'#menu a[href="{href}"]'); pg.wait_for_url(BASE + href); pg.wait_for_selector('h1')
        check(f'nav {href} opens its page', pg.locator('h1').first.inner_text().strip() != '')
    pg.go_back(); pg.wait_for_timeout(300); pg.go_back(); pg.wait_for_timeout(300)
    check('browser back works', pg.url.endswith(links[-3][0]), pg.url)
    pg.go_forward(); pg.wait_for_timeout(300)
    check('browser forward works', pg.url.endswith(links[-2][0]), pg.url)
    ctx.close()
    ctx = b.new_context(viewport={'width': 375, 'height': 780}, has_touch=True, is_mobile=True); pg = ctx.new_page(); pg.goto(BASE + '/', wait_until='networkidle')
    check('mobile menu closed initially', not pg.locator('#menu').is_visible())
    pg.click('.burger'); check('burger opens menu', pg.locator('#menu').is_visible() and pg.get_attribute('.burger', 'aria-expanded') == 'true')
    pg.keyboard.press('Escape'); check('Escape closes menu', not pg.locator('#menu').is_visible())
    pg.click('.burger'); pg.click('#menu a[href="/events"]'); pg.wait_for_url(BASE + '/events')
    check('menu link navigates and closes menu', not pg.locator('#menu').is_visible())
    ctx.close()

    # 3. Brand, brief requirements visible on the pages
    ctx = b.new_context(viewport={'width': 1280, 'height': 800}); pg = ctx.new_page(); pg.goto(BASE + '/about', wait_until='networkidle')
    body = pg.inner_text('body')
    check('About names Murugi Njiru as Chief Executive Officer', re.search(r'Murugi Njiru\s*\n\s*Chief Executive Officer', body) is not None)
    check('About names Eunice Wangui as Events and Experiences Lead', re.search(r'Eunice Wangui\s*\n\s*Events and Experiences Lead', body) is not None)
    check('wordmark exposes one accessible name', pg.get_attribute('.header .wordmark', 'aria-label') == 'HomeAFar')
    col = pg.evaluate("getComputedStyle(document.querySelector('.header .wordmark')).color"); cola = pg.evaluate("getComputedStyle(document.querySelector('.header .wm-a')).color")
    check('wordmark is gold with a distinct A', col == 'rgb(148, 106, 15)' and cola == 'rgb(181, 128, 15)', f'{col} / {cola}')
    check('Instagram link is the verified profile', pg.get_attribute('.footer a[href*="instagram"]', 'href') == 'https://www.instagram.com/home.a.far/')
    check('no invented Facebook URL', pg.locator('a[href*="facebook"]').count() == 0)
    pg.goto(BASE + '/', wait_until='networkidle')
    btn = pg.locator('.hero .btn').first
    check('buttons are rectangular with an arrow', btn.locator('svg.btn-arrow').count() == 1 and float(btn.evaluate("e=>parseFloat(getComputedStyle(e).borderRadius)")) <= 8)
    x0 = btn.locator('svg').evaluate('e=>e.getBoundingClientRect().x'); btn.hover(); pg.wait_for_timeout(500); x1 = btn.locator('svg').evaluate('e=>e.getBoundingClientRect().x')
    check('button arrow shifts right on hover', x1 - x0 >= 3, f'{x1 - x0}px')
    pg.keyboard.press('Tab'); pg.keyboard.press('Tab')
    ctx.close()

    # 4. Events album + lightbox
    ctx = b.new_context(viewport={'width': 1280, 'height': 800}); mock_backend(ctx, events=[]) if MOCK else None
    pg = ctx.new_page(); pg.goto(BASE + '/events', wait_until='networkidle'); pg.locator('.album-spread').scroll_into_view_if_needed(); pg.wait_for_timeout(500)
    cnt = lambda: pg.inner_text('.lb-count').strip()
    check('album shows 6 real photographs', pg.locator('.album-item').count() == 6)
    check('every album photo has alt text', pg.evaluate("[...document.querySelectorAll('.album-item img')].every(i=>i.alt.length>10)"))
    pg.click('.album-main .album-btn'); pg.wait_for_selector('.lb')
    check('lightbox opens on photo 01 with focus on Close', cnt() == '01 / 06' and pg.evaluate("document.activeElement.classList.contains('lb-close')"), cnt())
    pg.click('.lb-next'); check('next goes to 02', cnt() == '02 / 06', cnt())
    pg.click('.lb-prev'); pg.click('.lb-prev'); check('previous wraps to 06', cnt() == '06 / 06', cnt())
    pg.keyboard.press('ArrowRight'); check('ArrowRight wraps to 01', cnt() == '01 / 06', cnt())
    box = pg.locator('.lb-fig img').bounding_box(); cy = box['y'] + box['height'] / 2
    pg.mouse.move(box['x'] + box['width'] * .8, cy); pg.mouse.down(); pg.mouse.move(box['x'] + box['width'] * .2, cy, steps=8); pg.mouse.up(); pg.wait_for_timeout(200)
    check('swipe left advances', cnt() == '02 / 06', cnt())
    for _ in range(4): pg.keyboard.press('Tab')
    check('focus stays inside the lightbox', pg.evaluate("!!document.activeElement.closest('.lb')"))
    pg.keyboard.press('Escape'); pg.wait_for_timeout(200)
    check('Escape closes and returns focus to the photo', pg.locator('.lb').count() == 0 and pg.evaluate("document.activeElement.classList.contains('album-btn')"))
    pg.click('.chapter >> nth=0 >> .album-btn'); check('timeline photo opens the lightbox', pg.locator('.lb').count() == 1); pg.keyboard.press('Escape')
    ctx.close()
    ctx = b.new_context(viewport={'width': 1280, 'height': 800}, reduced_motion='reduce'); mock_backend(ctx, events=[]) if MOCK else None
    pg = ctx.new_page(); pg.goto(BASE + '/events', wait_until='networkidle')
    scroll_all(pg)
    check('reduced motion: content fully visible', pg.evaluate("[...document.querySelectorAll('main .sec')].every(e=>getComputedStyle(e).opacity==='1')"))
    check('reduced motion: border animation off', pg.evaluate("getComputedStyle(document.querySelector('.tile'),'::before').display==='none'"))
    ctx.close()

    # 5. Animated borders run when motion is allowed
    ctx = b.new_context(viewport={'width': 1280, 'height': 800}); pg = ctx.new_page(); pg.goto(BASE + '/about', wait_until='networkidle'); scroll_all(pg)
    pg.locator('.grid2 .tile').first.scroll_into_view_if_needed(); pg.wait_for_timeout(1200)
    an = pg.evaluate("getComputedStyle(document.querySelector('.grid2 .tile'),'::before').animationName"); check('animated border is applied to bordered tiles', an == 'ring-once', an)
    w0 = pg.evaluate("document.querySelector('.grid2 .tile').getBoundingClientRect().width"); pg.hover('.grid2 .tile >> nth=0'); pg.wait_for_timeout(400)
    w1 = pg.evaluate("document.querySelector('.grid2 .tile').getBoundingClientRect().width"); check('border animation causes no size change', abs(w0 - w1) < .5)
    ctx.close()

    # 6. Contact form
    ctx = b.new_context(viewport={'width': 375, 'height': 780}, has_touch=True, is_mobile=True); log = []
    if MOCK: mock_backend(ctx, log=log)
    pg = ctx.new_page(); pg.goto(BASE + '/contact', wait_until='networkidle')
    pg.click('form.form >> text=Send'); pg.wait_for_timeout(300)
    errs = pg.locator('.form .err').all_inner_texts()
    check('empty submit shows 4 validation messages', len(errs) == 4, str(errs))
    check('first invalid field receives focus', pg.evaluate("document.activeElement.id")=='contact-name')
    check('required fields are announced (aria-required)', pg.locator('.form [aria-required=true]').count() >= 4)
    pg.fill('#contact-name', 'Test Person'); pg.fill('#contact-email', 'not-an-email'); pg.fill('#contact-message', 'Hello'); pg.check('#contact-consent'); pg.click('form.form >> text=Send'); pg.wait_for_timeout(300)
    check('invalid email is rejected', 'valid email' in pg.inner_text('.form'))
    if MOCK:
        pg.fill('#contact-email', 'test@example.com'); pg.click('form.form >> text=Send'); pg.wait_for_selector('.status.sent', timeout=4000)
        check('valid submit shows success only after the request succeeds', 'received your message' in pg.inner_text('.status.sent') and len(log) == 1 and log[0]['email'] == 'test@example.com' and log[0]['consent'] == 'yes' and log[0]['form-name'] == 'contact', str(log))
        pg.fill('#contact-name', 'Test Person'); check('form resets after success', pg.input_value('#contact-email') == '')
        ctx.close()
        ctx = b.new_context(viewport={'width': 375, 'height': 780}); mock_backend(ctx, fail=True); pg = ctx.new_page(); pg.goto(BASE + '/contact', wait_until='networkidle')
        pg.fill('#contact-name', 'Test Person'); pg.fill('#contact-email', 'test@example.com'); pg.fill('#contact-message', 'Hello'); pg.check('#contact-consent'); pg.click('form.form >> text=Send')
        pg.wait_for_selector('.status.error', timeout=4000)
        check('failed request shows an honest error, not success', 'nothing was sent' in pg.inner_text('.status.error') and pg.locator('.status.sent').count() == 0)
    else:
        print('SKIP form submit/failure tests (need MOCK=1)')
    ctx.close()

    # 7. All internal links on every page resolve; #hash links reach their section
    ctx = b.new_context(viewport={'width': 1280, 'height': 800}); pg = ctx.new_page(); seen = set(); bad = []
    for r in ROUTES[:-1]:
        pg.goto(BASE + r, wait_until='networkidle')
        for h in pg.eval_on_selector_all('a[href^="/"]', 'e=>e.map(a=>a.getAttribute("href"))'): seen.add(h.split('#')[0])
    for h in sorted(seen):
        s = ctx.request.get(BASE + h).status
        if s != 200: bad.append((h, s))
    check(f'all {len(seen)} internal link targets return 200', not bad, str(bad))
    pg.goto(BASE + '/events', wait_until='networkidle'); pg.click('text=Get event updates >> nth=0'); pg.wait_for_timeout(2000)
    check('Events "Get event updates" link scrolls to the form on Get Involved', pg.url.endswith('/get-involved#subscribe') and pg.evaluate("document.getElementById('subscribe').getBoundingClientRect().top < 400"), pg.url)
    ctx.close()
    b.close()

fails = [r for r in results if not r[1]]
print(f'\n{len(results) - len(fails)} passed, {len(fails)} failed of {len(results)}')
sys.exit(1 if fails else 0)
