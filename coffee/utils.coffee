###
@param {boolean} b
@param {string} s
###
if console? && console.assert?
  assert = (b, s) ->
    console.assert b, s
    return
else
  assert = (b, s) ->
    if !b
      err = new Error s
      err.name = 'AssertionFailed'
      throw err
    return

###
Count function called time in a while
@param {function} f
@param {number=} [opt_ms=1000] Interval
@return {number} loops/sec
###
bench = (f, opt_ms) ->
  b = Date.now()
  i = 0
  if !opt_ms
    opt_ms = 1000
  while Date.now() - b < opt_ms
    f()
    ++i
  i * 1000 / opt_ms

###
@param {function} f
@param {number=} [opt_ms=10000] times
@return {number} loops
###
timeit = (f, opt_times) ->
  t = Date.now()
  if !opt_times
    opt_times = 10000
  for i in [0...opt_times] by 1
    f()
  Date.now() - t

###
Util
###
class @Util
  @assert: assert
  @bench: bench
  @timeit: timeit

# @nodoc
exports.Util = @Util
