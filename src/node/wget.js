'use strict';

const http = require('http'),
    https = require('https'),
    url = require('url'),
    fs = require('fs');

function wget(targetUrl, opt) {
  const target = url.parse(targetUrl);
  const req = (/https/.test(target.protocol) ? https : http).request({
    host: target.hostname,
    port: target.port,
    path: target.pathname + (target.search || ''),
    method: opt.method
  });
  console.log(req.method + ' ' + targetUrl);

  req.on('response', (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      console.log(res.statusCode + ' redirect ' + res.headers.location);
      wget(res.headers.location, opt);
    } else if (res.statusCode === 200) {
      let wstream, err = false;
      if (opt.filepath) {
        wstream = fs.createWriteStream(opt.filepath);
        wstream.on('error', (e) => {
          err = true;
          opt.callback(e);
        }).on('close', opt.callback);
      }
      res.on('data', (chunk) => {
        wstream.write(chunk, 'binary');
      }).on('end', () => {
        if (wstream) {
          if (!err) { wstream.end(); }
        }
        console.log(res.statusCode + ' OK');
      });
    } else {
      opt.callback(new Error('statusCode is ' + res.statusCode));
    }
  }).on('error', opt.callback);
  req.end();
}

exports.wget = wget;
