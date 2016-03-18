/**
 * indent size
 * @example
 *   node indent.js dir
 */
'use strict';

import * as fs from 'fs';

try {
  const argv: string[] = process.argv;
  if (argv.length <= 2) {
    console.log('  node indent.js dir');
    process.exit(1);
  }

  const src: string = argv[2];
  //const out = src;

  exe(src);
} catch (e) {
  console.log(e);
}

function exe(src: string): void {
  fs.readdir(src, (err: NodeJS.ErrnoException, files: string[]): void => {
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
