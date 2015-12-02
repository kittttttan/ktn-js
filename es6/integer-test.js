const Integer = require('./integer').Integer;

const basic = () => {
  const r = (Math.random() * 4 | 0) + 3;
  const a = Integer.random(r);
  const b = Integer.num(100000);
  console.log("a         = " + (a.toString()));
  console.log("b         = " + (b.toString()));
  console.log("a  +  b   = " + (a.add(b).toString()));
  console.log("a  -  b   = " + (a.sub(b).toString()));
  console.log("a  *  b   = " + (a.mul(b).toString()));
  console.log("a  /  b   = " + (a.div(b).toString()));
  console.log("a  %  b   = " + (a.mod(b).toString()));
  console.log("a >>  2   = " + (a.rightShift(2).toString()));
  console.log("a <<  2   = " + (a.leftShift(2).toString()));
  console.log("a >> 17   = " + (a.rightShift(17).toString()));
  console.log("a << 17   = " + (a.leftShift(17).toString()));
  console.log("a ^  2    = " + (a.pow(2).toString()));
  console.log("a ^ 0.5   = " + (a.pow(.5).toString()));
  console.log("          ~ " + (a.sqrt().toString()));
  console.log("gcd(a, b) = " + (a.gcd(b).toString()));
  console.log("          = " + (a.gcdBin(b).toString()));
};

const fib = (a) => {
  let b = Integer.zero;
  let i = 0;
  let c = Integer.one;
  while (i < a) {
    d = b.clone();
    b = b.add(c);
    c = d;
    ++i;
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

console.log('-- basic operations --');
basic();

console.log("-- fibonacchi --\nfib(77) = " + (fib(77).toString()));
console.log("-- pi --\npi(77) = " + (pi(77).toString()) + "\nTime: " + (Date.now() - d) + "ms");
