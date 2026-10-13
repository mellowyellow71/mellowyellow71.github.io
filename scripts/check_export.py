"""Validate hosted HTML URLs, media, anchors, and redirects in a werc export."""
import argparse
from collections import Counter
from html.parser import HTMLParser
import os
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit


def normalize_base_path(value):
    """Accept an empty/root path or a plain, absolute deployment path."""
    if value in ('', '/'):
        return ''
    if not isinstance(value, str) or not value.startswith('/') or '//' in value:
        raise ValueError('Base path must be empty or start with a single slash.')
    value = value.removesuffix('/')
    if not re.fullmatch(r'(?:/[A-Za-z0-9_-][A-Za-z0-9._-]*)+', value):
        raise ValueError('Base path must contain only safe, nonempty path segments.')
    return value


def refresh_target(value):
    match = re.fullmatch(r'\s*\d+(?:\.\d+)?\s*;\s*url\s*=\s*(.*?)\s*', value, re.I)
    if not match or not match.group(1):
        raise ValueError('Invalid meta-refresh destination: ' + value)
    target = match.group(1)
    if target.startswith(('"', "'")) or target.endswith(('"', "'")):
        if len(target) < 2 or target[0] not in ('"', "'") or target[-1] != target[0]:
            raise ValueError('Unmatched quotes in meta-refresh destination: ' + value)
        target = target[1:-1].strip()
    if not target:
        raise ValueError('Empty meta-refresh destination: ' + value)
    return target


class ExportPage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.urls = []
        self.canonical = []
        self.refresh = []
        self.openings, self.closings = Counter(), Counter()

    def handle_starttag(self, tag, attributes):
        self.openings[tag] += 1
        attributes = dict(attributes)
        if 'id' in attributes:
            if attributes['id'] in self.ids:
                raise ValueError('Duplicate HTML id: ' + attributes['id'])
            self.ids.add(attributes['id'])
        for name in ('href', 'src', 'poster'):
            if attributes.get(name):
                self.urls.append((tag + '[' + name + ']', attributes[name]))
        if tag == 'link' and 'canonical' in (attributes.get('rel') or '').lower().split():
            target = attributes.get('href', '')
            if not target or not target.strip():
                raise ValueError('Canonical link has no destination.')
            self.canonical.append(target)
        if tag == 'meta' and (attributes.get('http-equiv') or '').lower() == 'refresh':
            target = refresh_target(attributes.get('content', ''))
            self.refresh.append(target)
            self.urls.append(('meta[refresh]', target))

    def handle_endtag(self, tag):
        self.closings[tag] += 1


def check_export(directory, base_path=''):
    base_path = normalize_base_path(base_path)
    directory = Path(directory).resolve()
    if not (directory / 'index.html').is_file() or not (directory / '404.html').is_file():
        raise ValueError('Export must contain index.html and 404.html.')
    pages = {}
    for file in sorted(directory.rglob('*.html')):
        page = ExportPage()
        try:
            page.feed(file.read_text(encoding='utf-8'))
            page.close()
        except ValueError as error:
            raise ValueError(f'{file.relative_to(directory)}: {error}') from error
        for tag in ('html', 'head', 'body'):
            if page.openings[tag] != 1 or page.closings[tag] != 1:
                raise ValueError(f'{file.relative_to(directory)}: unbalanced {tag} document tags.')
        if len(page.canonical) > 1:
            raise ValueError(f'{file.relative_to(directory)}: multiple canonical links.')
        if page.refresh and (len(page.refresh) != 1 or page.canonical != page.refresh):
            raise ValueError(f'{file.relative_to(directory)}: refresh and canonical destinations differ.')
        pages[file.resolve()] = page

    checked_urls = 0
    for file, page in pages.items():
        relative = file.relative_to(directory)
        route = '/' + relative.as_posix()
        if relative.name == 'index.html':
            route = '/' if relative.parent == Path('.') else '/' + relative.parent.as_posix() + '/'
        page_url = 'https://export.invalid' + base_path + route
        for attribute, reference in page.urls:
            url = urlsplit(reference)
            if url.scheme or url.netloc:
                continue
            resolved = urlsplit(urljoin(page_url, reference))
            path = unquote(resolved.path)
            label = f'{relative}: {attribute}={reference!r}'
            if base_path:
                if path != base_path and not path.startswith(base_path + '/'):
                    raise ValueError(label + ' escapes the deployment base path.')
                path = path[len(base_path):] or '/'
            destination = (directory / path.lstrip('/')).resolve()
            if not destination.is_relative_to(directory):
                raise ValueError(label + ' escapes the export directory.')
            if destination.is_dir():
                destination /= 'index.html'
            if not destination.is_file():
                raise ValueError(label + ' has no exported target.')
            if resolved.fragment and destination in pages:
                if unquote(resolved.fragment) not in pages[destination].ids:
                    raise ValueError(label + ' has no matching target id.')
            checked_urls += 1
    print(f'{len(pages)} exported HTML files checked: {checked_urls} local URLs, '
          f'media, anchors, canonical links and refreshes; base path {base_path or "/"}.')
    return len(pages)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', nargs='?', type=Path,
                        default=Path(__file__).resolve().parents[1] / 'dist')
    parser.add_argument('--base-path', default=os.environ.get('SITE_BASE_PATH', ''))
    arguments = parser.parse_args()
    check_export(arguments.directory, arguments.base_path)
