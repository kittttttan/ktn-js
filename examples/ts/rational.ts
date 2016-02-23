import Rational from '../../src/ts/rational';

function basic() {
  const a: Rational = Rational.num(7, -3);
  const b: Rational = Rational.str('-0.1/3');
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
