'use strict';

const MathExpression = require('../dist/js/math-expression').MathExpression;

const argv = process.argv;
if (argv.length <= 2) {
  console.log('  node me.js input [output]');
  process.exit(1);
}

const src = argv[2]
const out = argv.length <= 3 ? rename(src) : argv[3];

try {
  // const t0 = Date.now();
  exe(src, out);
  // console.log(`${Date.now() - t0} ms\r`);
} catch (e) {
  console.log(e);
}

function rename(name) {
  let i = name.lastIndexOf('.');
  return i < 0 ?
      name + '_' :
      name.substring(0, i) + '_' + name.substring(i);
}

function exe(src, out) {
  const fs = require('fs');

  const res = fs.readFileSync(src, 'utf8');
  const lines = res.split(/[\r\n]+/g);
  for (let line of lines) {
    if (!line) { continue; }
    line = line.replace(/\*\*/g, '^');
    const me = MathExpression.create(line);
    // console.log(me);
    const p = me.parse();
    // console.log(p);
    console.log(p.calc().toString() + '\r');
  }
}
