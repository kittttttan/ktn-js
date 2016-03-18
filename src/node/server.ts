'use strict';

import * as fs from 'fs';
import * as http from 'http';
import * as qs from 'querystring';
import * as url from 'url';

const ROOT = __dirname;
const MIME = {
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
};
const HOST = '127.0.0.1';
const PORT = 1337;
const DEFAULT_PATH = '/index.html';
const DEFAULT_EXT = '.html';

/**
 * @param {string} str
 */
function logging(str: string): void {
  str = `${new Date().toLocaleString()} ' ${str}`;
  console.log(str);
  fs.appendFile('node.log', `${str}\n`, (err: NodeJS.ErrnoException): void => {
    if (err) { throw err; }
  });
}

/**
 * @param {string} a
 * @return {string}
 */
//function escapeHTML(a) {
//  return a.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
//          .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
//}

/**
 * @param req
 * @param res
 * @param query
 */
function proc(req: http.IncomingMessage, res: http.ServerResponse, query: string): void {
  const reqUrl: url.Url = url.parse(req.url);
  let statusCode: number = 500;
  let body: string = '';
  let pathname: string = reqUrl.pathname;

  if (!query) { query = qs.parse(reqUrl.query); }

  if (!pathname || pathname === '/') {
    pathname = DEFAULT_PATH;
  }

  let ext: string = '';
  const dot: number = pathname.lastIndexOf('.');
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
    } catch (e) {
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

http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
  logging(`${req.method} ${req.url}`);

  if (req.method === 'POST') {
    let data: string = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      proc(req, res, qs.parse(data));
    });
  } else {
    proc(req, res, null);
  }
}).listen(PORT, HOST);
console.log(`Server running at http://${HOST}:${PORT}`);
