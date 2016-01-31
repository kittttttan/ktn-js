'use strict';

const http = require('http'),
    fs = require('fs'),
    qs = require('querystring'),
    url = require('url'),

    ROOT = __dirname,
    MIME = {
      '.htm': 'text/html',
      '.html': 'text/html',
      '.txt': 'text/plain',
      '.ico': 'image/vnd.microsoft.icon',
      '.bmp': 'image/bmp',
      '.gif': 'image/gif',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.xml': 'application/xml',
      '.zip': 'application/zip'
    },
    HOST = '127.0.0.1',
    PORT = 1337,
    DEFAULT_PATH = '/index.html',
    DEFAULT_EXT = '.html';

/**
 * @param {string} str
 */
function logging(str) {
  str = new Date().toLocaleString() + ' ' + str;
  console.log(str);
  fs.appendFile('node.log', str + '\n', function (err) {
    if (err) throw err;
  });
}

/**
 * @param {string} a
 * @return {string}
 */
function escapeHTML(a) {
  return a.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

/**
 * 
 */
function proc(req, res, query) {
  var statusCode = 500,
      body = '',
      reqUrl = url.parse(req.url),
      pathname = reqUrl.pathname;
  
  if (!query) { query = qs.parse(reqUrl.query); }
  
  if (!pathname || pathname === '/') {
    pathname = DEFAULT_PATH;
  }

  var ext = '',
      dot = pathname.lastIndexOf('.');
  if (dot < 0) {
    ext = DEFAULT_EXT;
    pathname += ext;
  } else {
    ext = pathname.substring(dot);
  }

  if (ext in MIME) {
    try {
      body = fs.readFileSync(ROOT + pathname).toString();

      body = body.replace(/%\{query\}/g, JSON.stringify(query));
      body = body.replace(/%\{method\}/g, req.method);

      statusCode = 200;
      res.writeHead(statusCode, {'Content-type': MIME[ext],
                                 'Content-length': body.length});
      res.write(body);
      res.end();
    } catch(e) {
      logging(e.message);
      statusCode = 404;
      res.writeHead(statusCode, {'Content-type': 'text/plain'});
      res.end('404 not found\n');
    }
  } else {
    statusCode = 403;
    res.writeHead(statusCode, {'Content-type': 'text/plain'});
    res.end('403 forbidden\n');        
  }
}

http.createServer(function(req, res) {
  logging(req.method +' '+ req.url);

  if (req.method === 'POST') {
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      proc(req, res, qs.parse(data));
    });
  } else {
    proc(req, res, null);
  }
}).listen(PORT, HOST);
console.log('Server running at http://' + HOST + ':' + PORT);
