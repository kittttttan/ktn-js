/// <reference path="../node_modules/@types/node/index.d.ts" />
'use strict';

import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as url from 'url';

export interface wgetOption {
  filepath: string;
  callback: (Error) => any;
  method: any;
}

export function wget(targetUrl: string, opt: wgetOption) {
  const target: url.Url = url.parse(targetUrl);
  const protocol: any = (/https/.test(target.protocol) ? https : http);
  const req: any = protocol.request({
    host: target.hostname,
    port: parseInt(target.port),
    path: `${target.pathname}${(target.search || '')}`,
    method: opt.method,
  });
  console.log(`${(<any>req).method} ${targetUrl}`);

  req.on('response', (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      console.log(`${res.statusCode} redirect ${res.headers.location}`);
      wget(res.headers.location, opt);
    } else if (res.statusCode === 200) {
      let wstream: fs.WriteStream;
      let err: boolean = false;
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
