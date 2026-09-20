import http.server
import socketserver
import socket
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.send_response(302)
            self.send_header('Location', '/visualizer/index.html')
            self.end_headers()
            return
        return super().do_GET()

class DualStackServer(http.server.ThreadingHTTPServer):
    address_family = socket.AF_INET6

    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except (AttributeError, OSError):
            pass
        super().server_bind()

if __name__ == '__main__':
    DualStackServer.allow_reuse_address = True
    try:
        httpd = DualStackServer(("::", PORT), CustomHandler)
    except Exception:
        # Fallback to IPv4 standard server if IPv6 unavailable
        httpd = http.server.ThreadingHTTPServer(("", PORT), CustomHandler)
        
    print(f"Server running at http://localhost:{PORT}/")
    print(f"Direct visualizer URL: http://localhost:{PORT}/visualizer/index.html")
    sys.stdout.flush()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
