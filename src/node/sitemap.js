'use strict';

const fs = require('fs'),
    DateUtil = require('../js/date').DateUtil,
    dateFormat = DateUtil.format,
    domain = 'https://kittttttan.info';
let out = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n' +
          '<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n';

function ls(path) {
  const files = fs.readdirSync(path),
      l = files.length,
      prefix = (path.length > 2 ? path + '/' : './');
  for (let i = 0; i < l; ++i) {
    const fname = prefix + files[i];
    const stat = fs.statSync(fname);
    if (stat.isFile()) {
      if (files[i].endsWith('.htm') ||
          files[i].endsWith('.html')) {
        const mtime = dateFormat('yyyy-MM-dd', stat.mtime);
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
  fs.writeFile('./sitemap.xml', out, (err) => {
    if (err) { throw err; }
  });
} catch (e) {
  console.error(e);
}
