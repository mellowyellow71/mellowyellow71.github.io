"""A localhost HTTP adapter for werc CGI; content is rendered per request."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import PurePosixPath
from urllib.parse import unquote, urlsplit
import argparse
import mimetypes
from werc_runtime import DOMAIN, SITE, prepare, render

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.respond()

    def do_HEAD(self):
        self.respond(head_only=True)

    def respond(self, head_only=False):
        url = urlsplit(self.path)
        path = unquote(url.path)
        parts = PurePosixPath(path).parts
        if any(part.startswith(('.', '_')) for part in parts if part != '/'):
            self.send_error(404)
            return
        try:
            if path.startswith('/assets/'):
                asset = (SITE / path.lstrip('/')).resolve()
                if not asset.is_relative_to((SITE / 'assets').resolve()) or not asset.is_file():
                    self.send_error(404)
                    return
                body = asset.read_bytes()
                status = 200
                headers = {'Content-Type': mimetypes.guess_type(asset)[0] or 'application/octet-stream'}
            else:
                result = render(path, 'HEAD' if head_only else 'GET', url.query)
                body, status, headers = result.body, result.status, result.headers
            self.send_response(status)
            for name in ('Content-Type', 'Location', 'Cache-Control'):
                if name in headers:
                    value = headers[name]
                    if name == 'Location':
                        value = value.replace('http://' + DOMAIN + ':4173', '')
                    self.send_header(name, value)
            if not head_only:
                self.send_header('Content-Length', str(len(body)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            if not head_only:
                self.wfile.write(body)
        except (RuntimeError, TimeoutError) as error:
            self.send_error(500, str(error))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=4173)
    args = parser.parse_args()
    prepare()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(f'werc CGI preview: http://127.0.0.1:{args.port}/', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
