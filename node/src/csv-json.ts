'use strict';

import * as fs from 'fs';

import {csvToJson, jsonToCsv} from '@ktn/enc';

try {
  const argv: string[] = process.argv;
  if (argv.length <= 2) {
    console.log('  node csv-json.js input');
    process.exit(1);
  }

  const src: string = argv[2];
  main(src);
} catch (e) {
  console.error(e);
}

function main(src: string) {
  const res: string = fs.readFileSync(src, 'utf8');
  const lines: string[] = res.split(/[\r\n]+/g);
  const firstLine: string = lines.shift();
  console.log(csvToJson(lines.join('\n'), firstLine.split(/\t/g)));
}
