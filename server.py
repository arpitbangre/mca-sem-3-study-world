#!/usr/bin/env python3
"""
Study World — MCA Sem 3 Local HTTP Server
Created by Arpit Manoj Bangre
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class StudyWorldHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable caching for instant updates
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), StudyWorldHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print(f"🚀 Study World (MCA Sem 3 Hub) is running!")
        print(f"👤 Created by: Arpit Manoj Bangre")
        print(f"🌐 Local URL: {url}")
        print("=" * 60)
        print("Press Ctrl+C to stop the server.\n")
        try:
            webbrowser.open(url)
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped gracefully.")
            sys.exit(0)
