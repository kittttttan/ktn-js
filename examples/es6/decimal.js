import {Decimal} from '../../es6/decimal';

function  basic() {
  const a = Decimal.num(7, -3);
  const b = Decimal.str('100.1');
  console.log(`a         = ${a}`);
  console.log(`b         = ${b}`);
  console.log(`a  +  b   = ${a.add(b)}`);
  console.log(`a  -  b   = ${a.sub(b)}`);
  console.log(`a  *  b   = ${a.mul(b)}`);
  console.log(`a  /  b   = ${a.div(b)}`);
}

const d = Date.now();

console.log('-- basic operations --');
basic();

console.log(`Time: ${Date.now() - d}ms`);
