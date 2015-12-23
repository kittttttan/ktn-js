'use strict';
const Integer = require('./integer').Integer;

const basic = () => {
  const r = (Math.random() * 4 | 0) + 3;
  const a = Integer.random(r);
  const b = Integer.num(100000);
  console.log(`a         = ${a}`);
  console.log(`b         = ${b}`);
  console.log(`a  +  b   = ${a.add(b)}`);
  console.log(`a  -  b   = ${a.sub(b)}`);
  console.log(`a  *  b   = ${a.mul(b)}`);
  console.log(`a  /  b   = ${a.div(b)}`);
  console.log(`a  %  b   = ${a.mod(b)}`);
  console.log(`a >>  2   = ${a.rightShift(2)}`);
  console.log(`a <<  2   = ${a.leftShift(2)}`);
  console.log(`a >> 17   = ${a.rightShift(17)}`);
  console.log(`a << 17   = ${a.leftShift(17)}`);
  console.log(`a ^  2    = ${a.pow(2)}`);
  console.log(`a ^ 0.5   = ${a.pow(.5)}` );
  console.log(`          ~ ${a.sqrt()}`);
  console.log(`gcd(a, b) = ${a.gcd(b)}`);
  console.log(`          = ${a.gcdBin(b)}`);
};

const fib = (a) => {
  let b = Integer.zero;
  let i = 0;
  let c = Integer.one;
  while (i < a) {
    let d = b.clone();
    b = b.add(c);
    c = d;
    i = i + 1;
  }
  return b;
};

const pi = (a) => {
  if (!a) {
    a = 1;
  }
  const n = Integer.num(10).pow(a);
  const arccot = function(m) {
    var b, c, k, l2, s;
    c = n;
    a = c.div(m);
    b = a.clone();
    const m2 = m.square();
    k = Integer.one;
    s = true;
    l2 = Integer.num(2);
    while (c.isNonZero()) {
      b = b.div(m2);
      k = k.add(l2);
      c = b.div(k);
      s = !s;
      a = s ? a.add(c) : a.sub(c);
    }
    return a;
  };
  const a5 = arccot(Integer.num(5));
  const a239 = arccot(Integer.num(239));
  return a5.leftShift(2).sub(a239).leftShift(2);
};

const d = Date.now();

//console.log('-- basic operations --');
//basic();

const a0 = 7777;
console.log(`-- fibonacchi --
fib(${a0}) = ${fib(a0)}`);
//console.log(`-- pi --
//pi(${a0}) = ${pi(a0)}`);

console.log(`Time: ${Date.now() - d}ms`);
