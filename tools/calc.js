'use strict';

const MathExpression = require('../dist/js/math-expression').default;

const argv = process.argv;
if (argv.length <= 2) {
  console.log('  node calc.js input [output]');
  process.exit(1);
}

const src = argv[2]
const out = argv.length <= 3 ? rename(src) : argv[3];

try {
  const t0 = Date.now();
  exe(src, out);
  const t1 = Date.now() - t0
  //console.log(`${t1} ms`);
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
    line = line.replace(/#.*$/g, '');
    line = line.trim();
    if (!line) { continue; }
    // console.log(line + ' =');
    line = line.replace(/\*\*/g, '^');
    const me = MathExpression.create(line);
    // console.log(me);
    const p = me.eval();
    // console.log(p);
    console.log(p.calc().toString());
  }
}
