#!/usr/bin/env python2
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
import json

PORT = 8000

users = [
    {
        "name": 'u1',
        "age": 16,
        "address": 'x'
    },
    {
        "name": 'u2',
        "age": 17,
        "address": 'y'
    },
    {
        "name": 'u3',
        "age": 18,
        "address": 'z'
    },
]

class ServerHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if '/list' in self.path:
            data = { "list": users }
            message = json.dumps(data)
        elif '/detail' in self.path:
            user_id = self.path.split('/')[-1]
            if user_id not in ['u1', 'u2', 'u3']:
                user_id = 'u1'
            for u in users:
                if u['name'] == user_id:
                    user = u
                    break
            message = json.dumps(user)
        else:
            message = 'hello, world'
            
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(message)

    def do_POST(self):
        message = json.dumps(users[-1])
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(message)

    # preflight request
    # refs: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header('Access-Control-Allow-Headers', 'content-type')
        self.end_headers()


def run():
    httpd = HTTPServer(('', PORT), ServerHandler)
    print('started serving at: http://localhost:%s' % PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()


if __name__ == "__main__":
    run()
