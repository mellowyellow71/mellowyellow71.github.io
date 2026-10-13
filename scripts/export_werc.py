"""Export actual werc responses for hosts without Unix CGI support."""
import argparse
from html import escape
from html.parser import HTMLParser
import os
from pathlib import Path
import re
import shutil
import tempfile

from check_export import check_export, normalize_base_path, refresh_target
from werc_runtime import ROOT, SITE, prepare, render, routes


class RebasedHTML(HTMLParser):
    """Change deployment URLs without changing werc's authoring routes."""

    def __init__(self, base_path):
        super().__init__(convert_charrefs=False)
        self.base_path = base_path
        self.parts = []

    def url(self, value):
        return self.base_path + value if value.startswith('/') and not value.startswith('//') else value

    def tag(self, name, attributes, ending):
        attributes = list(attributes)
        is_refresh = name == 'meta' and (dict(attributes).get('http-equiv') or '').lower() == 'refresh'
        rendered = []
        for key, value in attributes:
            if value is not None:
                if key in ('href', 'src', 'poster'):
                    value = self.url(value)
                elif is_refresh and key == 'content':
                    target = refresh_target(value)
                    delay = re.match(r'\s*([^;]+);', value).group(1).strip()
                    value = f'{delay};url={self.url(target)}'
                rendered.append(f' {key}="{escape(value, quote=True)}"')
            else:
                rendered.append(' ' + key)
        self.parts.append('<' + name + ''.join(rendered) + ending)

    def handle_starttag(self, tag, attrs):
        self.tag(tag, attrs, '>')

    def handle_startendtag(self, tag, attrs):
        self.tag(tag, attrs, '/>')

    def handle_endtag(self, tag):
        self.parts.append('</' + tag + '>')

    def handle_data(self, data):
        self.parts.append(data)

    def handle_decl(self, decl):
        self.parts.append('<!' + decl + '>')

    def handle_comment(self, data):
        self.parts.append('<!--' + data + '-->')

    def handle_entityref(self, name):
        self.parts.append('&' + name + ';')

    def handle_charref(self, name):
        self.parts.append('&#' + name + ';')

    def handle_pi(self, data):
        self.parts.append('<?' + data + '>')


def rebase_html(body, base_path):
    if not base_path:
        return body
    parser = RebasedHTML(base_path)
    parser.feed(body.decode('utf-8'))
    parser.close()
    return ''.join(parser.parts).encode('utf-8')


def export(base_path):
    base_path = normalize_base_path(base_path)
    prepare()
    cache = ROOT / '.cache'
    cache.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='werc-export-', dir=cache) as temporary:
        stage = Path(temporary) / 'dist'
        stage.mkdir()
        shutil.copytree(SITE / 'assets', stage / 'assets')
        for route in routes():
            response = render(route)
            if response.status != 200 or b'<!doctype html>' not in response.body.lower():
                raise RuntimeError(f'Invalid werc response for {route}: {response.status}')
            destination = stage / route.lstrip('/') / 'index.html'
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(rebase_html(response.body, base_path))
            print('Rendered by werc: ' + route)
        missing = render('/not-a-page/')
        if missing.status != 404:
            raise RuntimeError('werc did not return a proper 404 response.')
        (stage / '404.html').write_bytes(rebase_html(missing.body, base_path))
        # Check the files that will be hosted, before replacing a valid build.
        check_export(stage, base_path)
        output = ROOT / 'dist'
        if output.is_symlink():
            raise RuntimeError('Refusing to replace a linked output directory.')
        previous = Path(temporary) / 'previous-dist'
        if output.exists():
            output.rename(previous)
        try:
            stage.rename(output)
        except OSError:
            if previous.exists():
                previous.rename(output)
            raise
    print(f'Exported werc pages to dist/ for base path {base_path or "/"}.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-path', default=os.environ.get('SITE_BASE_PATH', ''))
    export(parser.parse_args().base_path)
