/// <reference path="../node_modules/@ktn/type/typings/complex.d.ts" />
import Complex from '@ktn/complex';

function main() {
  const c1: Complex = new Complex(1, 2);
  const c2: Complex = new Complex(-2, 3);
  console.log(`c1 = ${c1}`);
  console.log(`c2 = ${c2}`);
  console.log(`real c1 = ${c1.real}, imag c1 = ${c1.imag}`);
  console.log(`conj c1 = ${c1.conj()}`);
  console.log(`c1 + c2 = ${c1.add(c2)}`);
  console.log(`c1 - c2 = ${c1.sub(c2)}`);
  console.log(`c1 * c2 = ${c1.mul(c2)}`);
}

main();
