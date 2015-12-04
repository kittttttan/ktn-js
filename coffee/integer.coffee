# @nodoc
_random = Math.random

# @nodoc
Function::property_ ?= (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

# @nodoc
Function::const_ ?= (prop, desc) ->
  Object.defineProperty @, prop, desc

SHIFT_ = 16
BASE_ = 1 << SHIFT_
MASK_ = BASE_ - 1

###
Integer
###
class @Integer
  constructor: ->
    ###
    @property {number} Integer#_d
    ###
    @_d = new Uint32Array 3

    ###
    @property {number} Integer#_s
    ###
    @_s = true

    ###
    @property {number} Integer#_l
    ###
    @_l = 1

  ###
  @property {Integer} Integer.zero
  ###
  @const_ 'zero',
    get: -> new Integer()

  ###
  @property {Integer} Integer.zero
  ###
  @const_ 'one',
    get: -> num_ 1

  ###
  @property {number[]} Integer#digits
  ###
  @property_ 'digits',
    get: -> @_d

  ###
  @property {number} Integer#capacity
  ###
  @property_ 'capacity',
    get: -> @_d.length

  ###
  @property {number} Integer#arrayLength
  ###
  @property_ 'arrayLength',
    get: -> @_l

  ###
  @property {boolean} Integer#sign
  ###
  @property_ 'sign',
    get: -> @_s

  ###
  @method Integer#isOdd
  @return {boolean}
  ###
  isOdd: -> !!(@_d[0] & 1)

  ###
  @return {boolean}
  ###
  isEven: -> !(@_d[0] & 1)

  ###
  @return {boolean}
  ###
  isNonZero: -> @_l > 1 || @_d[0] isnt 0

  ###
  @param {number} a
  @return {Integer}
  ###
  @num: (a) -> num_ a

  ###
  @param {string} a
  @return {Integer}
  ###
  @str: (a, b) -> str_ a, b

  ###
  @param {string} a
  @return {Integer}
  ###
  @exp: (a) -> exp_ a

  ###
  @param {object} a
  @return {Integer}
  ###
  @any: (a) -> any_ a

  ###
  @param {number} n
  @return {Integer}
  ###
  @factorial: (n) ->
    if n < 1
      Integer.one
    else
      factOdd_ n
        .mul factEven_ n

  ###
  @param {number} a
  @return {Integer}
  ###
  @random: (a) ->
    r = alloc_ a, true
    rd = r._d
    for i in [0...a] by 1
      rd[i] = _random() * BASE_ | 0
    norm_ r

  ###
  @return {Integer}
  ###
  clone: ->
    b = new Integer()
    b._s = @_s
    b._l = @_l
    b._d = new Uint32Array @_l
    b._d.set @_d.subarray 0, @_l
    b

  ###
  @return {number}
  ###
  valueOf: ->
    f = .0
    d = @_d
    i = @_l
    while i--
      f = d[i] + BASE_ * f
    if !@_s
      f = -f
    +f

  ###
  @return {Integer}
  ###
  abs: ->
    z = @clone()
    z._s = true
    z

  ###
  @return {Integer}
  ###
  neg: ->
    z = @clone()
    if z.isNonZero()
      z._s = !z._s
    z

  ###
  @param {number} b
  @return {string}
  ###
  toString: (b) ->
    b = b | 0
    if !b
      b = 10
    i = @_l
    if i < 2 && !@_d[0]
      return '0'
    j = 0
    hbase = 0
    switch b
      when 16
        j = (i << 3) + 2
        hbase = 0x10000
      when 8
        j = (i << 4) + 2
        hbase = 0x1000
      when 2
        j = (i << 4) + 2
        hbase = 0x10
      else
        j = (i * 241 / 50 | 0) + 2
        hbase = 10000
    t = @clone()
    d = t._d
    k = 0
    n = 0
    digits = '0123456789abcdef'
    s = ''
    while i && j
      k = i
      n = 0
      while k--
        n = (n << SHIFT_) | d[k]
        d[k] = n / hbase | 0
        n = n % hbase | 0
      if !d[i - 1]
        --i
      k = 4
      while k--
        s = digits.charAt(n % b | 0) + s
        --j
        n = n / b | 0
        if !i && !n
          break
    s = s.replace /^0+/, ''
    if !@_s
      s = '-' + s
    s

  ###
  @param {number} b
  @return {Integer}
  ###
  addZero: (b) ->
    zeros = ''
    z = '0'
    while b > 0
      if b & 1
        zeros = zeros + z
      b = b >>> 1
      z = z + z
    str_ @toString() + zeros

  ###
  @param {number} b
  @return {Integer}
  ###
  leftShift: (b) ->
    a = @
    ad = a._d
    l = a._l
    d = (b / SHIFT_) | 0
    cl = l + d + 1
    bb = b % SHIFT_
    c = alloc_ cl, a._s
    cd = c._d
    i = 0
    carry = 0
    while i < d
      cd[i] = 0
      ++i
    t = 0
    i = 0
    while i < l
      t = (ad[i] << bb) + carry
      cd[i + d] = t & MASK_
      carry = t >> SHIFT_
      ++i
    cd[i + d] = carry
    norm_ c

  ###
  @param {number} b
  @return {Integer}
  ###
  rightShift: (b) ->
    a = @
    ad = a._d
    l = a._l
    d = (b / SHIFT_) | 0
    if l <= d
      return Integer.zero
    bb = b % SHIFT_
    mask = (1 << bb) - 1
    cl = l - d
    c = alloc_ cl, a._s
    cd = c._d
    i = 0
    while i < cl - 1
      cd[i] = ((ad[i + d + 1] & mask) << (SHIFT_ - bb)) + (ad[i + d] >> bb)
      i = i + 1
    cd[i] = ad[i + d] >> bb
    norm_ c

  ###
  @return {Integer}
  ###
  square: ->
    xs = @_d
    t = @_l
    s = alloc_ t << 1, true
    w = s._d
    fillZero_ s, s._l
    for i in [0...t] by 1
      x = xs[i]
      uv = w[i << 1] + x * x
      u = uv >>> SHIFT_
      v = uv & MASK_
      w[i << 1] = v
      c = u
      for j in [i + 1...t] by 1
        # uv = w[i + j] + (x[j] * x[i] << 1) + c
        # can overflow.
        uv = xs[j] * x
        u = (uv >>> SHIFT_) << 1
        v = (uv & MASK_) << 1
        v += w[i + j] + c
        u += v >>> SHIFT_
        v = v & MASK_
        w[i + j] = v
        c = u
      w[i + t] = u
    norm_ s

  ###
  @return {Integer}
  ###
  sqrt: ->
    if !@isNonZero()
      return @
    b = @clone()
    c = Integer.one
    while 0 < b.cmp c
      half_ b
      double_ c
    loop
      b = c.clone()
      c = @divmod c, false
        .add c
      half_ c
      break unless 0 < b.cmp c
    b

  ###
  @param {Integer} b
  @return {Integer|number}
  ###
  pow: (b) ->
    if !b
      return Integer.one
    if b > 0 && b is (b | 0)
      b = b | 0
      p = Integer.one
      a = @clone()
      while b > 0
        if b & 1
          p = p.mul a
        b >>= 1
        a = a.square()
      return p
    @valueOf() ** b

  ###
  @param {Integer} b
  @return {Integer}
  ###
  gcd: (b) ->
    if !b.isNonZero()
      return @
    a = @abs()
    while (c = a.divmod b, true).isNonZero()
      a = b
      b = c
    b

  ###
  @param {Integer} b
  @return {Integer}
  ###
  gcdBin: (b) ->
    if 0 > @cmpAbs b
      return b.gcdBin @
    if !b.isNonZero()
      return @
    g = Integer.one
    a = @abs()
    b = b.abs()
    while !(a._d[0] & 1) && !(b._d[0] & 1)
      half_ a
      half_ b
      double_ g
    while a.isNonZero()
      while !(a._d[0] & 1)
        half_ a
      while !(b._d[0] & 1)
        half_ b
      if 0 > a.cmpAbs b
        b = b.sub a
        half_ b
      else
        a = a.sub b
        half_ a
    g.mul b

  ###
  @param {Integer} b
  @param {boolean} modulus
  @return {Integer}
  ###
  divmod: (b, modulus) ->
    a = @
    ad = a._d
    bd = b._d
    na = a._l
    nb = b._l
    if nb < 2 && !bd[0]
      # zero division
      throw new Error 'zero division'

    albl = na is nb
    if na < nb || (albl && ad[na - 1] < bd[nb - 1])
      if modulus
        return a
      return Integer.zero
    dd = 0
    t = 0
    i = 0
    if nb is 1
      dd = bd[0]
      z = a.clone()
      zd = z._d
      i = na
      while i--
        t = ((t << SHIFT_) | zd[i]) >>> 0
        zd[i] = (t / dd) & MASK_
        t %= dd
      if modulus
        if !a._s
          return num_ -t
        return num_ t
      z._s = a._s is b._s
      return norm_(z)

    z = alloc_ (if albl then na + 2 else na + 1), a._s is b._s
    zd = z._d
    fillZero_ z, z._l
    dd = BASE_ / (bd[nb - 1] + 1) & MASK_

    j = 0
    num = 0
    if dd is 1
      j = na
      while j--
        zd[j] = ad[j]
    else
      bb = b.clone()
      td = bb._d
      while j < nb
        num += bd[j] * dd
        td[j] = num & MASK_
        num >>>= SHIFT_
        j = j + 1
      bd = td
      j = num = 0
      while j < na
        num += ad[j] * dd
        zd[j] = num & MASK_
        num >>>= SHIFT_
        j = j + 1
      zd[j] = num & MASK_

    q = 0
    ee = 0
    j = if albl then na + 1 else na
    loop
      if zd[j] is bd[nb - 1]
        q = MASK_
      else
        q = (((zd[j] << SHIFT_) | zd[j - 1]) >>> 0) / bd[nb - 1] & MASK_
      if q
        i = num = t = 0
        loop
          t += bd[i] * q
          ee = (t & MASK_) - num
          num = zd[j - nb + i] - ee
          if ee
            zd[j - nb + i] = num & MASK_
          num >>= SHIFT_
          t >>>= SHIFT_
          break unless ++i < nb
        num += zd[j - nb + i] - t
        while num
          i = num = 0
          --q
          loop
            ee = num + bd[i]
            num = zd[j - nb + i] + ee
            if ee
               zd[j - nb + i] = num & MASK_
            num >>= SHIFT_
            break unless ++i < nb
          --num
      zd[j] = q
      break unless --j >= nb

    div = z.clone()
    zd = div._d
    if modulus
      if dd
        t = 0
        i = nb
        while i--
          t = ((t << SHIFT_) | zd[i]) >>> 0
          zd[i] = (t / dd) & MASK_
          t %= dd
      div._l = nb
      div._s = a._s
      return norm_(div)

    j = (if albl then na + 2 else na + 1) - nb
    i = 0
    while i < j
      zd[i] = zd[i + nb]
      i = i + 1
    div._l = j
    norm_(div)

  ###
  @param {Integer} b
  @return {Integer}
  ###
  div: (b) -> @divmod b, false

  ###
  @param {Integer} b
  @return {Integer}
  ###
  mod: (b) -> @divmod b, true

  ###
  @param {Integer} b
  @return {number} -1, 0, 1
  ###
  cmpAbs: (b) ->
    if @ is b
      return 0
    ad = @_d
    bd = b._d
    al = @_l
    bl = b._l
    if al < bl
      return -1
    if al > bl
      return 1
    loop
      al = al - 1
      break unless al && ad[al] is bd[al]
    if !al && ad[0] is bd[0]
      return 0
    return if ad[al] > bd[al] then 1 else -1

  ###
  @param {Integer} b
  @return {number} -1, 0, 1
  ###
  cmp: (b) ->
    if @ is b
      return 0
    if @_s isnt b._s
      return if @_s then 1 else -1
    ad = @_d
    bd = b._d
    al = @_l
    bl = b._l
    if al < bl
      return if @_s then -1 else 1
    if al > bl
      return if @_s then 1 else -1
    loop
      al = al - 1
      break unless al && ad[al] is bd[al]
    if !al && ad[0] is bd[0]
      return (if @_s then 1 else 0) - (if b._s then 1 else 0)
    if ad[al] > bd[al]
      return if @_s then 1 else -1
    return if @_s then -1 else 1

  ###
  @param {Integer} b
  @return {boolean}
  ###
  eq: (b) ->
    if @ is b
      return true
    b = any_ b
    if @_s isnt b._s
      return false
    ad = @_d
    bd = b._d
    l = @_l
    if l isnt b._l
      return false
    i = 0
    while i < l
      if ad[i] isnt bd[i]
        return false
      ++i
    return true

  ###
  @param {Integer} b
  @return {boolean}
  ###
  equal: (b) ->
    if @ is b
      return true
    if !(b instanceof Integer)
      return false
    if @_s isnt b._s
      return false
    ad = @_d
    bd = b._d
    l = @_l
    if l isnt b._l
      false
    i = 0
    while i < l
      if ad[i] isnt bd[i]
        return false
      ++i
    return true

  ###
  @param {Integer} b
  @param {boolean} sign
  @return {Integer}
  ###
  addAbs: (b, sign) ->
    if @_l < b._l
      return b.addAbs this, sign
    ad = @_d
    bd = b._d
    al = @_l
    bl = b._l
    z = alloc_ al + 1, sign
    zd = z._d
    i = 0
    num = 0
    while i < bl
      num += ad[i] + bd[i]
      zd[i] = num & MASK_
      num >>>= SHIFT_
      ++i
    while num && i < al
      num += ad[i]
      zd[i] = num & MASK_
      num >>>= SHIFT_
      ++i
    while i < al
      zd[i] = ad[i]
      ++i
    zd[i] = num & MASK_
    norm_ z

  ###
  @param {Integer} b
  @param {boolean} sign
  @return {Integer}
  ###
  subAbs: (b, sign) ->
    ad = @_d
    bd = b._d
    al = @_l
    bl = b._l
    z = alloc_ al, sign
    zd = z._d
    i = 0
    c = 0
    while i < bl
      c = ad[i] - bd[i] - c
      if c < 0
        zd[i] = c & MASK_
        c = 1
      else
        zd[i] = c
        c = 0
      ++i
    while i < al
      c = ad[i] - c
      if c < 0
        zd[i] = c & MASK_
        c = 1
      else
        zd[i] = c
        c = 0
      ++i
    norm_ z

  ###
  @param {Integer} b
  @return {Integer}
  ###
  add: (b) ->
    if @_s isnt b._s
      if 0 > @cmpAbs b
        return b.subAbs @, b._s
      return @subAbs b, @_s
    return @addAbs b, @_s

  ###
  @param {Integer} b
  @return {Integer}
  ###
  sub: (b) ->
    if @_s is b._s
      if 0 > @cmpAbs b
          return b.subAbs @, !b._s
      return @subAbs b, @_s
    return @addAbs b, @_s

  ###
  @param {Integer} b
  @return {Integer}
  ###
  mul: (b) ->
    # if @equal(b) then return @square()
    ad = @_d
    bd = b._d
    al = @_l
    bl = b._l
    # if al > 125 && bl > 125 then return kmul_ @, b
    j = al + bl
    z = alloc_ j, @_s is b._s
    fillZero_ z, j
    n = 0
    d = 0
    e = 0
    zd = z._d
    for i in [0...al] by 1
      d = ad[i]
      if !d
        continue
      n = 0
      j = 0
      while j < bl
        e = n + d * bd[j]
        n = zd[i + j] + e
        if e
          zd[i + j] = n & MASK_
        n >>>= SHIFT_
        ++j
      if n
        zd[i + j] = n
    norm_ z

  ###
  @param {Integer} b
  @return {Integer}
  ###
  kmul: (b) -> kmul_ @, b

###
@param {number} length
@param {boolean} sign
@return {Integer}
###
alloc_ = (length, sign) ->
  length = length | 0
  a = new Integer()
  a._s = if sign then true else false
  a._l = length
  a._d = new Uint32Array length
  a

###
@param {Integer} a
@return {Integer}
###
norm_ = (a) ->
  d = a._d
  l = a._l | 0
  loop
    --l
    break if !l || d[l]
  a._l = l + 1
  # -0 -> +0
  if !l && !d[l]
    a._s = true
  a

###
@param {number} n
@return {Integer}
###
num_ = (n) ->
  a = new Integer()
  if !n
    return a
  if n < 0
    n = -n
    a._s = false
  a._d[0] = n & MASK_
  n = n >>> SHIFT_
  if n
    a._d[1] = n & MASK_
    a._l = 2
  a

###
@param {string} str
@param {string} base
@return {Integer}
###
str_ = (str, base) ->
  base = base | 0
  if !base
    base = 10
  index = 0
  sign = true
  if '+' is str.charAt index
    ++index
  else if '-' is str.charAt index
    sign = false
    ++index
  # Ignore following zeros. '00102' is regarded as '102'.
  while '0' is str.charAt index
    ++index
  if !str.charAt index
    return Integer.zero
  len = 0
  if base is 8
    len = 3 * (str.length + 1 - index)
  else 
    if !str.charAt index
      --index
    len = (str.length + 1 - index) << 2
  len = (len >>> 4) + 1
  z = alloc_ len, sign
  fillZero_ z, len
  zd = z._d
  bl = 1
  c = ''
  n = 0
  i = 0
  loop
    c = str.charAt index
    ++index
    if !c
      break
    n = parseInt c, base
    i = 0
    loop
      while i < bl
        n = n + zd[i] * base
        zd[i] = n & MASK_
        n = n >>> SHIFT_
        ++i
      if !n
        break
      ++bl
  norm_ z

###
@param {string} a
@return {Integer}
###
exp_ = (a) ->
  i = a.indexOf 'e', 0
  if i < 0
    # 'e' is not found
    return str_ a
  s = a.substr 0, i
  e = parseInt (a.substr i + 1, a.length - (i + 1)), 10
  fpt = s.indexOf '.', 0
  if fpt >= 0
    # '.' is found
    np = s.length - (fpt + 1)
    s = (s.substr 0, fpt) + (s.substr fpt + 1, np)
    e -= np
  if e < 0
    s = s.slice 0, e
  else
    while e > 0
      s += '0'
      --e
  str_ s

###
@param {object} a
@return {Integer}
###
any_ = (a) ->
  if typeof a is 'object'
    if a instanceof Integer
      return a.clone()
    return Integer.zero
  if typeof a is 'number'
    if -0x7fffffff <= a && a <= 0x7fffffff
      return num_ a
    a = a + ''
  if typeof a is 'string'
    return exp_ a
  Integer.zero

###
@param {number} n
@return {Integer}
###
factOdd_ = (n) ->
  m = Integer.one
  mi = 0
  mj = 0
  i = 0
  j = 0
  l = 0
  limit = 1 << ((SHIFT_ - 1) << 1)

  loop
    l = (n / (1 << i)) | 0
    if l < 3
      break
    mi = 1
    mj = 1
    j = 3
    while j <= l
      mi = mi * j
      if mi > limit
        m = m.mul Integer.num mj
        mi = mj = j
      else
        mj = mi
      j += 2
    ++i
    if mj > 1
      m = m.mul Integer.num mj
  m

###
@param {number} n
@return {Integer}
###
factEven_ = (n) ->
  s = 0
  while n
    n = n >>> 1
    s += n
  Integer
    .one
    .leftShift s

###
@param {Integer} a
@param {number} b
@return {Integer}
###
fillZero_ = (a, b) ->
  d = a._d
  while b--
    d[b] = 0
  a

###
@param {Integer} a
@return {Integer}
###
half_ = (a) ->
  d = a._d
  l = a._l - 1
  for i in [0...l] by 1
    d[i] = (((d[i + 1] & 1) << SHIFT_) + d[i]) >>> 1
  d[l] >>>= 1
  norm_ a

###
@param {Integer} a
@return {Integer}
###
double_ = (a) ->
  d = a._d
  l = a._l
  c = 0
  t = 0
  for i in [0...l] by 1
    t = (d[i] << 1) + c
    d[i] = t & MASK_
    c = t >>> SHIFT_
  if c
    if l >= a._d.length
      ta = new Uint32Array l
      ta.set d
      ta[l] = c
      a._d = ta
    else
      d[l] = c
    ++a._l
  norm_ a

###
@param {number} a
@return {number}
###
bitLength_ = (a) ->
  ad = a._d
  l = a._l
  return ad[l - 1]
    .toString 2
    .length + ((l - 1) << 4)

###
@param {Integer} x
@param {Integer} y
@return {Integer}
###
kmul_ = (x, y) ->
  N = bitLength_ x
  l = bitLength_ y

  if N < l
    N = l
  if N < 2001
    return x.mul y

  # number of bits divided by 2, rounded up
  N = (N >>> 1) + (N & 1)

  # x = a + b 2^N, y = c + d 2^N
  b = x.rightShift N
  a = x.sub b.leftShift N
  d = y.rightShift N
  c = y.sub d.leftShift N
  ac = kmul_ a, c
  bd = kmul_ b, d
  abcd = kmul_(
    a.add b
    c.add d)

  # xy
  # = (a + 2^N b) (c + 2^N d)
  # = ac + 2^N ((a + b) (c + d) - ac - bd) + 2^(N + 1) bd
  ac
    .add(
      abcd
        .sub ac
        .sub bd
        .leftShift N
    )
    .add(
      bd
        .leftShift N << 1
    )

# @nodoc
Integer = @Integer
# @nodoc
exports.Integer = Integer
