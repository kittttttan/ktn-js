_random = Math.random

SHIFT = 16
BASE = 1 << SHIFT
MASK = BASE - 1

class @Integer
  constructor: ->
    @_d = new Uint32Array 3
    @_s = true
    @_l = 1

  @one: -> longNum 1
  @zero: -> new Integer()
  @num: (a) -> longNum a
  @str: (a) -> longStr a
  @exp: (a) -> longExp a
  @any: (a) -> any a
  @factorial: (n) ->
    n = n | 0
    if n < 1
      return Integer.one()
    factOdd(n).mul factEven n
  @random: (a) ->
    a = a | 0
    r = longAlloc a, true
    rd = r._d
    i = 0
    while i < a
      rd[i] = _random() * BASE | 0
      i = i + 1
    norm r

  digits: -> @_d
  capacity: -> @_d.length | 0
  arrayLength: -> @_l | 0
  sign: -> @_s

  clone: ->
    b = new Integer()
    b._s = @_s
    b._l = @_l
    b._d = new Uint32Array @_l
    b._d.set @_d.subarray 0, @_l
    return b

  valueOf: ->
    f = .0
    d = @_d
    i = @_l | 0
    while i--
      f = d[i] + BASE * f
    if !@_s
      f = -f
    return +f

  isOdd: -> !!(@_d[0] & 1)
  isEven: -> !(@_d[0] & 1)
  isNonZero: -> @_l > 1 || @_d[0] isnt 0

  abs: ->
    z = @clone()
    z._s = true
    return z

  neg: ->
    z = @clone()
    if z.isNonZero()
      z._s = !z._s
    return z

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
        j = (i << 3) + 2 | 0
        hbase = 0x10000
      when 8
        j = (i << 4) + 2 | 0
        hbase = 0x1000
      when 2
        j = (i << 4) + 2 | 0
        hbase = 0x10
      else
        j = (i * 241 / 50 | 0) + 2 | 0
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
        n = (n << SHIFT) | d[k]
        d[k] = n / hbase | 0
        n = n % hbase | 0
      if !d[i - 1]
        i = i - 1 | 0
      k = 4
      while k--
        s = digits.charAt(n % b | 0) + s
        j = j - 1 | 0
        n = n / b | 0
        if !i && !n
          break
    s = s.replace /^0+/, ''
    if !@_s
      s = '-' + s
    return s

  addZero: (b) ->
    b = b | 0
    zeros = ''
    z = '0'
    while b > 0
      if b & 1
        zeros = zeros + z
      b = b >>> 1
      z = z + z
    longStr @toString() + zeros

  leftShift: (b) ->
    b = b | 0
    a = this
    ad = a._d
    l = a._l | 0
    d = (b / SHIFT) | 0
    cl = l + d + 1 | 0
    bb = b % SHIFT
    c = longAlloc cl, a._s
    cd = c._d
    i = 0
    carry = 0
    while (i | 0) < (d | 0)
      cd[i] = 0
      i = i + 1 | 0
    t = 0
    i = 0
    while (i | 0) < (l | 0)
      t = (ad[i] << bb) + carry
      cd[i + d] = t & MASK
      carry = t >> SHIFT
      i = i + 1 | 0
    cd[i + d] = carry
    norm c

  rightShift: (b) ->
    a = this
    ad = a._d
    l = a._l
    d = (b / SHIFT) | 0
    if l <= d
      return new Integer()
    bb = b % SHIFT
    mask = (1 << bb) - 1
    cl = l - d
    c = longAlloc cl, a._s
    cd = c._d
    i = 0
    while i < cl - 1
      cd[i] = ((ad[i + d + 1] & mask) << (SHIFT - bb)) + (ad[i + d] >> bb)
      i = i + 1
    cd[i] = ad[i + d] >> bb
    norm c

  square: ->
    x = @_d
    t = @_l
    s = longAlloc t << 1, true
    w = s._d
    longFillZero s, s._l
    i = 0
    j = 0
    c = 0
    uv = 0
    u = 0
    v = 0
    while i < t
      uv = w[i << 1] + x[i] * x[i]
      u = uv >>> SHIFT
      v = uv & MASK
      w[i << 1] = v
      c = u
      j = i + 1
      while j < t
        # uv = w[i + j] + (x[j] * x[i] << 1) + c
        # can overflow.
        uv = x[j] * x[i]
        u = (uv >>> SHIFT) << 1
        v = (uv & MASK) << 1
        v += w[i + j] + c
        u += v >>> SHIFT
        v = v & MASK
        w[i + j] = v
        c = u
        j = j + 1
      w[i + t] = u
      i = i + 1
    norm s

  sqrt: ->
    if !@isNonZero()
      return this
    b = @clone()
    c = Integer.one()
    while 0 < b.cmp c
      longHalf b
      longDouble c
    loop
      b = c.clone()
      c = @divmod c, false
        .add c
      longHalf c
      break unless 0 < b.cmp c
    return b

  pow: (b) ->
    b = +b
    if !b
      return Integer.one()
    if b > 0 && b is (b | 0)
      b = b | 0
      p = Integer.one()
      a = @clone()
      while b > 0
        if b & 1 then p = p.mul a
        b >>= 1
        a = a.square()
      return p
    @valueOf() ** b

  gcd: (b) ->
    a = @abs()
    while (c = a.divmod b, true).isNonZero()
      a = b
      b = c
    return b

  gcdBin: (b) ->
    if 0 > @cmpAbs b
      return b.gcdBin this
    if !b.isNonZero()
      throw new Error 'Zero Division'
    g = Integer.one()
    a = @abs()
    b = b.abs()
    while !(a._d[0] & 1) && !(b._d[0] & 1)
      longHalf a
      longHalf b
      longDouble g
    while a.isNonZero()
      while !(a._d[0] & 1)
        longHalf a
      while !(b._d[0] & 1)
        longHalf b
      if 0 > a.cmpAbs b
        b = b.sub a
        longHalf b
      else
        a = a.sub b
        longHalf a
    g.mul b

  divmod: (b, modulus) ->
    a = this
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
      return new Integer()
    dd = 0
    t = 0
    i = 0
    if nb is 1
      dd = bd[0]
      z = a.clone()
      zd = z._d
      i = na
      while i--
        t = ((t << SHIFT) | zd[i]) >>> 0
        zd[i] = (t / dd) & MASK
        t %= dd
      if modulus
        if !a._s
          return longNum -t
        return longNum t
      z._s = a._s is b._s
      return norm(z)

    z = longAlloc (if albl then na + 2 else na + 1), a._s is b._s
    zd = z._d
    longFillZero z, z._l
    dd = BASE / (bd[nb - 1] + 1) & MASK

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
        td[j] = num & MASK
        num >>>= SHIFT
        j = j + 1
      bd = td
      j = num = 0
      while j < na
        num += ad[j] * dd
        zd[j] = num & MASK
        num >>>= SHIFT
        j = j + 1
      zd[j] = num & MASK

    q = 0
    ee = 0
    j = if albl then na + 1 else na
    loop
      if zd[j] is bd[nb - 1]
        q = MASK
      else
        q = (((zd[j] << SHIFT) | zd[j - 1]) >>> 0) / bd[nb - 1] & MASK
      if q
        i = num = t = 0
        loop
          t += bd[i] * q
          ee = (t & MASK) - num
          num = zd[j - nb + i] - ee
          if ee
            zd[j - nb + i] = num & MASK
          num >>= SHIFT
          t >>>= SHIFT
          break unless ++i < nb
        num += zd[j - nb + i] - t
        while num
          i = num = 0
          q = q - 1
          loop
            ee = num + bd[i]
            num = zd[j - nb + i] + ee
            if ee
               zd[j - nb + i] = num & MASK
            num >>= SHIFT
            break unless ++i < nb
          num = num - 1
      zd[j] = q
      break unless --j >= nb

    div = z.clone()
    zd = div._d
    if modulus
      if dd
        t = 0
        i = nb
        while i--
          t = ((t << SHIFT) | zd[i]) >>> 0
          zd[i] = (t / dd) & MASK
          t %= dd
      div._l = nb
      div._s = a._s
      return norm(div)

    j = (if albl then na + 2 else na + 1) - nb
    i = 0
    while i < j
      zd[i] = zd[i + nb]
      i = i + 1
    div._l = j
    return norm(div)

  div: (b) -> @divmod b, false
  mod: (b) -> @divmod b, true

  cmpAbs: (b) ->
    if this is b
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

  cmp: (b) ->
    if this is b
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

  eq: (b) ->
    if this is b
      return true
    b = any(b)
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
      i = i + 1
    return true

  equal: (b) ->
    if this is b
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
      i = i + 1
    return true

  addAbs: (b, sign) ->
    if @_l < b._l
      return b.addAbs this, sign
    ad = @_d
    bd = b._d
    al = @_l
    bl = b._l
    z = longAlloc al + 1, sign
    zd = z._d
    i = 0
    num = 0
    while i < bl
      num += ad[i] + bd[i]
      zd[i] = num & MASK
      num >>>= SHIFT
      i = i + 1
    while num && i < al
      num += ad[i]
      zd[i] = num & MASK
      num >>>= SHIFT
      i = i + 1
    while i < al
      zd[i] = ad[i]
      i = i + 1
    zd[i] = num & MASK
    norm z

  subAbs: (b, sign) ->
    ad = @_d
    bd = b._d
    al = @_l
    bl = b._l
    z = longAlloc al, sign
    zd = z._d
    i = 0
    c = 0
    while i < bl
      c = ad[i] - bd[i] - c
      if c < 0
        zd[i] = c & MASK
        c = 1
      else
        zd[i] = c
        c = 0
      i = i + 1
    while i < al
      c = ad[i] - c
      if c < 0
        zd[i] = c & MASK
        c = 1
      else
        zd[i] = c
        c = 0
      i = i + 1
    norm z

  add: (b) ->
    if @_s isnt b._s
      if 0 > @cmpAbs b
        return b.subAbs this, b._s
      return @subAbs b, @_s
    return @addAbs b, @_s

  sub: (b) ->
    if @_s is b._s
      if 0 > @cmpAbs b
          return b.subAbs this, !b._s
      return @subAbs b, @_s
    return @addAbs b, @_s

  mul: (b) ->
    # if @equal(b) then return @square()
    ad = @_d
    bd = b._d
    al = @_l | 0
    bl = b._l | 0
    # if al > 125 && bl > 125 then return longK(this, b)
    j = al + bl | 0
    z = longAlloc j, @_s is b._s
    longFillZero z, j
    i = 0
    n = 0
    d = 0
    e = 0
    zd = z._d
    while (i | 0) < (al | 0)
      d = ad[i]
      if !d then continue
      n = 0
      j = 0
      while (j | 0) < (bl | 0)
        e = n + d * bd[j]
        n = zd[i + j] + e
        if e then zd[i + j] = n & MASK
        n >>>= SHIFT
        j = j + 1 | 0
      if n then zd[i + j] = n | 0
      i = i + 1 | 0
    norm z

  kmul: (b) -> longK this, b

longAlloc = (length, sign) ->
  length = length | 0
  a = new Integer
  a._s = if sign then true else false
  a._l = length
  a._d = new Uint32Array length
  return a

norm = (a) ->
  d = a._d
  l = a._l | 0
  loop
    l = l - 1 | 0
    break if !l || d[l]
  a._l = l + 1 | 0
  # -0 -> +0
  if !l && !d[l]
    a._s = true
  return a

longNum = (n) ->
  n = n | 0
  a = new Integer()
  if !n
    return a
  if n < 0
    n = -n
    a._s = false
  a._d[0] = n & MASK
  n = n >>> SHIFT
  if n
    a._d[1] = n & MASK
    a._l = 2
  return a

longStr = (str, base) ->
  base = base | 0
  if !base
    base = 10
  index = 0
  sign = true
  if '+' is str.charAt index
    index = index + 1
  else if '-' is str.charAt index
    sign = false
    index = index + 1

  # Ignore following zeros. '00102' is regarded as '102'.
  while '0' is str.charAt index
    index = index + 1
  if !str.charAt index
    return new Integer()

  len = 0
  if base is 8
    len = 3 * (str.length + 1 - index)
  else 
    if !str.charAt index
      index = index - 1
    len = (str.length + 1 - index) << 2
  len = (len >>> 4) + 1

  z = longAlloc len, sign
  longFillZero z, len

  zd = z._d
  bl = 1
  c = ''
  n = 0
  i = 0
  loop
    c = str.charAt index
    index = index + 1
    if !c then break

    n = parseInt c, base
    i = 0
    loop
      while i < bl
        n = n + zd[i] * base
        zd[i] = n & MASK
        n = n >>> SHIFT
        i = i + 1

      if !n then break

      bl = bl + 1

  norm z

longExp = (a) ->
  i = a.indexOf 'e', 0
  if i < 0
    # 'e' is not found
    return longStr a
  s = a.substr 0, i
  e = parseInt (a.substr i + 1, a.length - (i + 1)), 10
  fpt = s.indexOf '.', 0
  if fpt >= 0
    # '.' is found
    np = s.length - (fpt + 1)
    s = (s.substr 0, fpt) + (s.substr fpt + 1, np)
    e = e - np
  if e < 0
    s = s.slice 0, e
  else
    while e > 0
      s = s + '0'
      e = e - 1
  longStr s

any = (a) ->
  if typeof a is 'object'
    if a instanceof Integer
      return a.clone()
    return new Integer()
  if typeof a is 'number'
    if -0x7fffffff <= a && a <= 0x7fffffff
      return longNum a
    a = a + ''
  if typeof a is 'string'
    return longExp a
  return new Integer()

factOdd = (n) ->
  n = n | 0
  m = Integer.one()
  mi = 0
  mj = 0
  i = 0
  j = 0
  l = 0
  limit = 1 << ((SHIFT - 1) << 1)

  loop
    l = (n / (1 << i)) | 0
    if l < 3
      break
    mi = 1
    mj = 1
    j = 3
    while (j | 0) <= (l | 0)
      mi = mi * j
      if mi > limit
        m = m.mul Integer.num mj
        mi = mj = j
      else
        mj = mi
      j = j + 2 | 0
    i = i + 1 | 0
    if (mj | 0) > 1
      m = m.mul Integer.num mj
  return m

factEven = (n) ->
  n = n | 0
  s = 0
  while n
    n = n >>> 1
    s = s + n
  Integer
    .one()
    .leftShift s

longFillZero = (a, b) ->
  b = b | 0
  d = a._d
  while b--
    d[b] = 0
  return a

longHalf = (a) ->
  d = a._d
  l = a._l - 1
  i = 0
  while i < l
    d[i] = (((d[i + 1] & 1) << SHIFT) + d[i]) >>> 1
    i = i + 1
  d[l] >>>= 1
  norm a

longDouble = (a) ->
  d = a._d
  l = a._l
  c = 0
  i = 0
  t = 0
  while i < l
    t = (d[i] << 1) + c
    d[i] = t & MASK
    c = t >>> SHIFT
    i = i + 1
  if c
    if l >= a._d.length
      ta = new Uint32Array l
      ta.set(d)
      ta[l] = c
      a._d = ta
    else
      d[l] = c
    a._l = a._l + 1
  norm a

longBitLength = (a) ->
  ad = a._d
  l = a._l
  return ad[l - 1]
    .toString 2
    .length + ((l - 1) << 4)

longK = (x, y) ->
  N = longBitLength x
  l = longBitLength y

  if N < l
    N = l
  if N < 2001
    return x.mul y

  # number of bits divided by 2, rounded up
  N = (N >>> 1) + (N & 1)

  # x = a + b 2^N, y = c + d 2^N
  b = x.rightShift N
  a = x.sub b
      .leftShift N
  d = y.rightShift N
  c = y.sub d
      .leftShift N
  ac = longK a, c
  bd = longK b, d
  abcd = longK a.add b, c.add d

  # xy
  # = (a + 2^N b) (c + 2^N d)
  # = ac + 2^N ((a + b) (c + d) - ac - bd) + 2^(N + 1) bd
  return ac.add(
    abcd
      .sub ac
      .sub bd
      .leftShift N)
    .add bd
    .leftShift N << 1

Integer = @Integer

if exports?
  exports.Integer = Integer
