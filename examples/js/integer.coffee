Integer = if require? then require('../../coffee/integer').Integer else @Integer

basic = ->
  r = (Math.random() * 4 | 0) + 3
  a = Integer.random r
  b = Integer.num 100000
  console.log """
a         = #{a.toString()}
b         = #{b.toString()}
a  +  b   = #{a.add(b).toString()}
a  -  b   = #{a.sub(b).toString()}
a  *  b   = #{a.mul(b).toString()}
a  /  b   = #{a.div(b).toString()}
a  %  b   = #{a.mod(b).toString()}
a >>  2   = #{a.rightShift(2).toString()}
a <<  2   = #{a.leftShift(2).toString()}
a >> 17   = #{a.rightShift(17).toString()}
a << 17   = #{a.leftShift(17).toString()}
a ^  2    = #{a.pow(2).toString()}
a ^ 0.5   = #{a.pow(.5).toString()}
          ~ #{a.sqrt().toString()}
gcd(a, b) = #{a.gcd(b).toString()}
          = #{a.gcdBin(b).toString()}
"""

fib = (a) ->
  b = Integer.zero
  i = 0
  c = Integer.one
  while i < a
    d = b.clone()
    b = b.add c
    c = d
    ++i
  return b

pi = (a) ->
  if !a
    a = 1
  n = Integer
    .num 10
    .pow a

  arccot = (m) ->
    c = n
    a = c.div m
    b = a.clone()
    m2 = m.square()
    k = Integer.one
    s = true
    l2 = Integer.num 2
    while c.isNonZero()
      b = b.div m2
      k = k.add l2
      c = b.div k
      s = !s
      a = if s then a.add c else a.sub c
    return a

  a5 = arccot Integer.num 5
  a239 = arccot Integer.num 239
  # print(a5)
  # print(a239)
  return a5
    .leftShift 2
    .sub a239
    .leftShift 2

d = Date.now()
console.log('-- basic operations --')
basic()

console.log("""
-- fibonacchi --
fib(77) = #{fib(77).toString()}
""")

console.log("""
-- pi --
pi(77) = #{pi(77).toString()}
Time: #{Date.now() - d}ms
""")
