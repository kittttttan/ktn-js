import * as fs from 'fs';
import * as http from 'http';
import * as qs from 'querystring';
// import {URL} from 'url';
import * as url from 'url';

const argv = process.argv;
const ROOT = argv.length > 2 ? argv[2] : __dirname;
const HOST = '127.0.0.1';
const PORT = 1337;
const DEFAULT_PATH = '/index.html';
const DEFAULT_EXT = '.html';

const MIME = new Map([
    ['.avif', 'image/avif'],
    ['.bmp', 'image/bmp'],
    ['.css', 'text/css'],
    ['.csv', 'text/csv'],
    ['.gif', 'image/gif'],
    ['.gz', 'application/gzip'],
    ['.htm', 'text/html'],
    ['.html', 'text/html'],
    ['.ico', 'image/vnd.microsoft.icon'],
    ['.jpeg', 'image/jpeg'],
    ['.jpg', 'image/jpeg'],
    ['.js', 'text/javascript'],
    ['.json', 'application/json'],
    ['.mjs', 'text/javascript'],
    ['.pdf', 'application/pdf'],
    ['.png', 'image/png'],
    ['.svg', 'image/svg+xml'],
    ['.tar', 'application/x-tar'],
    ['.ttf', 'font/ttf'],
    ['.txt', 'text/plain'],
    ['.webp', 'image/webp'],
    ['.woff', 'font/woff'],
    ['.woff2', 'font/woff2'],
    ['.xml', 'application/xml'],
    ['.wasm', 'application/wasm'],
    ['.zip', 'application/zip']
]);

/**
 * @param {string} str
 */
function logging(str) {
    str = `${new Date().toLocaleString()} ' ${str}`;
    console.log(str);
    fs.appendFile('server.log', `${str}\n`, (err) => {
        if (err) {
            throw err;
        }
    });
}

/**
 * @param req
 * @param res
 * @param query
 */
function proc(req, res, query) {
    // const reqUrl = new URL(req.url);
    const reqUrl = url.parse(req.url);
    let statusCode = 500;
    let body = '';
    let pathname = reqUrl.pathname;
    if (!query) {
        query = qs.parse(reqUrl.search || '');
    }
    if (!pathname || pathname === '/') {
        pathname = DEFAULT_PATH;
    }
    let ext = '';
    const dot = pathname.lastIndexOf('.');
    if (dot < 0) {
        ext = DEFAULT_EXT;
        pathname += ext;
    }
    else {
        ext = pathname.substring(dot);
    }
    if (MIME.has(ext)) {
        try {
            body = fs.readFileSync(ROOT + pathname).toString();
            body = body.replace(/%\{query\}/g, JSON.stringify(query));
            body = body.replace(/%\{method\}/g, req.method);
            statusCode = 200;
            res.writeHead(statusCode, {
                'Content-type': MIME.get(ext),
                'Content-length': body.length
            });
            res.write(body);
            res.end();
        }
        catch (e) {
            logging(e.message);
            statusCode = 404;
            res.writeHead(statusCode, {'Content-type': 'text/plain'});
            res.end('404 not found\n');
        }
    }
    else {
        statusCode = 403;
        res.writeHead(statusCode, {'Content-type': 'text/plain'});
        res.end('403 forbidden\n');
    }
}
http.createServer((req, res) => {
    logging(`${req.method} ${req.url}`);
    if (req.method === 'POST') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            proc(req, res, qs.parse(data));
        });
    }
    else {
        proc(req, res, null);
    }
}).listen(PORT, HOST);
console.log(`Serve ${ROOT} at http://${HOST}:${PORT}`);
