"""Run the unmodified, vendored werc CGI with this repository's site."""
from dataclasses import dataclass
from pathlib import Path
import hashlib
import os
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site'
DOMAIN = 'revant.local'
CACHE_BASE = Path('/private/tmp') if Path('/private/tmp').is_dir() else Path(tempfile.gettempdir())
PLAN9 = Path(os.environ.get('WERC_PLAN9', os.environ.get('PLAN9', CACHE_BASE / 'revant-werc-plan9')))
RUNTIME = CACHE_BASE / ('revant-werc-' + hashlib.sha256(str(ROOT).encode()).hexdigest()[:10])
ENGINE = RUNTIME / 'werc'
REQUIRED_TOOLS = ('rc', 'awk', 'cat', 'sed', 'grep', 'test', 'ls', 'basename', 'tr', 'sort', 'date')

def prepare():
    missing = [name for name in REQUIRED_TOOLS if not (PLAN9 / 'bin' / name).is_file()]
    if missing:
        raise RuntimeError('Plan 9 tools are missing: ' + ', '.join(missing) + '. Run npm run setup.')
    # werc expects a root without spaces. Keep code in a cache and link to the
    # authoring tree, so edits to Markdown and templates take effect immediately.
    shutil.copytree(ROOT / 'vendor' / 'werc', ENGINE, dirs_exist_ok=True)
    sites = ENGINE / 'sites'
    sites.mkdir(exist_ok=True)
    link = sites / DOMAIN
    if link.is_symlink():
        if link.resolve() != SITE:
            raise RuntimeError('The runtime site link points to a different checkout.')
    elif link.exists():
        raise RuntimeError('The runtime site path is occupied.')
    else:
        link.symlink_to(SITE, target_is_directory=True)
    (ENGINE / 'etc' / 'initrc.local').write_text(
        "debug=()\nformatter=(awk -f bin/contrib/md2html.awk)\n"
    )

@dataclass
class Response:
    status: int
    headers: dict[str, str]
    body: bytes

def render(path: str, method: str = 'GET', query: str = '') -> Response:
    env = dict(os.environ)
    env.update({
        'PLAN9': str(PLAN9), 'SERVER_NAME': DOMAIN, 'SERVER_PORT': '4173',
        'REQUEST_METHOD': method, 'REQUEST_URI': path + ('?' + query if query else ''),
        'QUERY_STRING': query, 'CONTENT_LENGTH': '0', 'GATEWAY_INTERFACE': 'CGI/1.1',
        'SERVER_PROTOCOL': 'HTTP/1.1', 'SCRIPT_NAME': '/', 'HTTP_HOST': '127.0.0.1:4173',
    })
    try:
        result = subprocess.run(
            [str(PLAN9 / 'bin' / 'rc'), '-I', './werc.rc'], cwd=ENGINE / 'bin',
            env=env, input=b'', capture_output=True, timeout=20,
        )
    except subprocess.TimeoutExpired as error:
        raise RuntimeError('werc took too long to render this page.') from error
    if result.returncode:
        raise RuntimeError('werc exited unsuccessfully: ' + result.stderr.decode(errors='replace')[-1200:])
    normalized = result.stdout.replace(b'\r\n', b'\n')
    head, separator, body = normalized.partition(b'\n\n')
    if not separator:
        raise RuntimeError('werc did not return CGI headers: ' + result.stderr.decode(errors='replace')[-1200:])
    headers, status = {}, 200
    for line in head.decode('utf-8').splitlines():
        name, _, value = line.partition(':')
        if name.lower() == 'status':
            status = int(value.strip().split()[0])
        elif name:
            headers[name] = value.strip()
    if method != 'HEAD' and not body.strip():
        raise RuntimeError('werc returned an empty body: ' + result.stderr.decode(errors='replace')[-1200:])
    return Response(status, headers, body)

def routes():
    pages = set()
    for extension in ('md', 'tpl', 'html'):
        for page in SITE.rglob('index.' + extension):
            relative = page.parent.relative_to(SITE)
            if any(part.startswith(('_', '.')) for part in relative.parts):
                continue
            pages.add('/' if not relative.parts else '/' + relative.as_posix() + '/')
    return sorted(pages)
