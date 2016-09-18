/**
 * @fileOverview stringify.js format json from file.
 * @example
 *   node stringify.js foo.json
 *   node stringify.js bar.json 2> out.json
 */
'use strict';

import * as fs from 'fs';

try {
  const argv: string[] = process.argv;
  const argc: number = argv.length;

  if (argc < 3) {
    console.log('Usage: node stringify.js filename [space]');
    process.exit(1);
  }

  const filename: string = argv[2];
  const space: number = argc > 3 ? parseInt(argv[3]) : 0;

  stringify(filename, space);
} catch (e) {
  console.error(e);
}

/**
 * @param {string} filename
 * @param {number|string} space
 */
function stringify(filename: string, space: number): void {
  fs.readFile(filename, 'utf8', (error: NodeJS.ErrnoException, data: string): void => {
    if (error) { throw error; }
    try {
      const obj: any = JSON.parse(data);
      const str: string = JSON.stringify(obj, null, space);
      console.log(str);
    } catch (e) {
      throw e;
    }
  });
}
