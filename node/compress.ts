/// <reference path="typings/node.d.ts" />
/**
 * @fileOverview compress.js remove spaces and linebreakes.
 * @example
 *   node compress.js foo.text
 */
'use strict';

import * as fs from 'fs';

try {
  const argv: string[] = process.argv;
  if (argv.length <= 2) {
    console.log('  node compress.js input [output]');
    process.exit(1);
  }

  const src: string = argv[2];
  const out: string = argv.length <= 3 ? rename(src) : argv[3];
  compress(src, out);
} catch (e) {
  console.error(e);
}

function rename(name: string): string {
  const i: number = name.lastIndexOf('.');
  return i < 0 ?
      `${name}_` :
      `${name.substring(0, i)}_${name.substring(i)}`;
}

function compress(src: string, out: string): void {
  const res: string = fs.readFileSync(src, 'utf8');
  const comp: string = res.replace(/[ \t]+/g, ' ').replace(/[\r\n]+/g, '');
  fs.writeFile(out, comp, (err: NodeJS.ErrnoException): void => {
    if (err) { throw err; }
  });
}
