/**
 * indent size
 * @example
 *   node indent.js dir
 */
'use strict';

const argv = process.argv;
if (argv.length <= 2) {
  console.log('  node indent.js dir');
  process.exit(1);
}

const src = argv[2]
const out = src;

try {
  exe(src, out);
} catch (e) {
  console.log(e);
}

function exe(src, out) {
  const fs = require('fs');
  
  fs.readdir(src, (err, files) => {
    for (const f of files) {
      console.log(f);
      /*
      const res = fs.readFileSync(src, 'utf8');
      const comp = res.replace(/[ \t]+/g, ' ').replace(/[\r\n]+/g, '');
      fs.writeFile(out, comp, function(err) {
        if (err) { throw err; }
      });
      */
    }
  });
}
