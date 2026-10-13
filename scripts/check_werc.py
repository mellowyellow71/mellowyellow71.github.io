"""Check real werc rendering and links against the authoring tree."""
from html.parser import HTMLParser
from collections import Counter
from urllib.parse import urlsplit, unquote
import subprocess
from werc_runtime import ROOT, SITE, prepare, render, routes

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links = set(), []
        self.openings, self.closings = Counter(), Counter()
    def handle_starttag(self, tag, attributes):
        self.openings[tag] += 1
        attributes = dict(attributes)
        if 'id' in attributes:
            self.ids.add(attributes['id'])
        for name in ('href', 'src'):
            if attributes.get(name):
                self.links.append(attributes[name])
    def handle_endtag(self, tag):
        self.closings[tag] += 1

prepare()
pages = {}
for route in routes():
    response = render(route)
    assert response.status == 200, (route, response.status)
    assert b'<!doctype html>' in response.body.lower(), route
    parser = Page()
    parser.feed(response.body.decode())
    for tag in ('html', 'head', 'body'):
        assert parser.openings[tag] == parser.closings[tag] == 1, (route, tag)
    pages[route] = parser
for route, page in pages.items():
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        target = unquote(url.path) or route
        if target.startswith('/assets/'):
            assert (SITE / target.lstrip('/')).is_file(), (route, link)
        else:
            assert target in pages, (route, link)
            if url.fragment:
                assert url.fragment in pages[target].ids, (route, link)
assert render('/not-a-page/').status == 404
assert render('/', 'HEAD').status == 200
for script in (SITE / 'assets').glob('*.js'):
    subprocess.run(['node', '--check', str(script)], check=True)
print(f'{len(pages)} pages rendered by real werc; internal links, assets, HEAD, 404 and JavaScript checks pass.')
