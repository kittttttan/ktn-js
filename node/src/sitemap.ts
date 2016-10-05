
/// <reference path="../node_modules/@ktn/type/typings/date.d.ts" />
'use strict';

import * as fs from 'fs';
import DateUtil from '@ktn/date';

const dateFormat = DateUtil.format;
const domain = 'https://kittttttan.info';
let out = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n' +
          '<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n';

function ls(path) {
  const files: string[] = fs.readdirSync(path);
  const prefix: string = (path.length > 2 ? path + '/' : './');
  for (const file of files) {
    const fname: string = prefix + file;
    const stat: fs.Stats = fs.statSync(fname);
    if (stat.isFile()) {
      if (file.endsWith('.htm') ||
          file.endsWith('.html')) {
        const mtime: string = dateFormat('yyyy-MM-dd', stat.mtime);
        out += '<url><loc>' + domain + fname.substring(1) +
              '</loc><lastmod>' + mtime + '</lastmod></url>\n';
      }
    } else if (stat.isDirectory()) {
      ls(fname);
    }
  }
}

try {
  ls('./');
  out += '</urlset>';
  fs.writeFile('./sitemap.xml', out, (err: NodeJS.ErrnoException): void => {
    if (err) { throw err; }
  });
} catch (e) {
  console.error(e);
}
