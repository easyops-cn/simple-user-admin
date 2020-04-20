#!/usr/bin/env python2
# -*- coding: UTF-8 -*-
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
import json
import urllib
import urllib2

PORT = 8000

users = [
    {
        "name": 'u1',
        "age": 16,
        "address": 'x',
        'valid': False
    },
    {
        "name": 'u2',
        "age": 17,
        "address": 'y',
        'valid': False
    },
    {
        "name": 'u3',
        "age": 18,
        "address": 'z',
        'valid': True
    },
]

def validate_permission(org, user, action):
    # 我们一般都会通过名字服务来获得 `permission` 组件的实际运行组件，这里为了 demo 简单，直接 hardcode 代码先
    # 假设当前主机有 permission 运行在 8085 端口
    host = 'http://127.0.0.1:8085'
    url = '/api/v1/permission/validate'
    params = dict(user=user, action=action)
    data = urllib.urlencode(params)
    request = urllib2.Request('%s%s?%s' % (host, url, data))
    request.add_header('user', 'defaultUser')
    request.add_header('org', org)
    response = urllib2.urlopen(request, timeout=3)
    data = response.read()
    response.close()
    return json.loads(data)


class ServerHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        login_user = self.headers.getheader('user')
        org = self.headers.getheader('org')
        if not login_user or not org:
          self.send_error(401)
          return

        # 判断当前用户是否有 `cmdb:_MYSQL_USER_instance_access` 权限点，即 `MySQL账号信息资源实例访问`
        data = validate_permission(org, login_user, 'cmdb:_MYSQL_USER_instance_access')
        if not data['data']['accepted']:
          self.send_error(403, 'permission deined')
          return

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
