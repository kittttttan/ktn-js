# @nodoc
Function::const_ ?= (prop, desc) ->
  Object.defineProperty @, prop, desc

Types =
  LOWER: 0x01
  UPPER: 0x02
  DIGITS: 0x04
  UNDERSCORE: 0x08
  SIGN: 0x10

Reg =
  URI: /\w+:\/\/[\w\-.\/?%&=:@;]*/g
  XMLTag: -> /<\/?\w+[^>]*>/g
  CComment: /\/\*[\s\S]*?\*\//gm
  LineComment: /\/\/.*$/gm
  DoubleQuote: /"([^\\"\n]|\\.)*"/g

###
StringUtil
###
class @StringUtil
  ###
  RegExp snippets

  @return {regexp}
  ###
  @const_ 'Reg',
    get: -> Reg

  ###
  types

  @return {number}
  @see {StringUtil.genRandomString}
  ###
  @const_ 'Types',
    get: -> Types

  ###
  repeat string

  @param {string} str
  @param {number} repeat
  @return {string}
  ###
  @repeat: (str, repeat) ->
    result = ''
    while repeat > 0
      if repeat & 1
        result += str
      repeat >>= 1
      str += str
    result

  ###
  sprintf

  @param {string} str
  @return {string}
  ###
  @format: (str) ->
    argv = arguments
    index = 1
    str.replace /%([+\-#0])?(\d+)?(?:\.(\d+))?([%defoxs])/g,
      (src, flag, width, prec, type) ->
        if type is '%'
          return '%'
        s = ''
        n = 0
        if type is 's'
          s = argv[index]
        else if type is 'd'
          n = argv[index] | 0
          s = (if flag is '+' && n > 0 then '+' else '') +
              n
        else if type is 'o'
          n = argv[index] | 0
          s = (if flag is '+' && n > 0 then '+' else '') +
              (if flag is '#' then '0' else '') +
              (n).toString 8
        else if type is 'x'
          n = argv[index] | 0
          s = (if flag is '+' && n > 0 then '+' else '') +
              (if flag is '#' then '0x' else '') +
              (n).toString 16
        else if type is 'e'
          s = (if flag is '+' && argv[index] > 0 then '+' else '') +
              (if prec then argv[index].toExponential(prec) else
                            argv[index].toString())
        else if type is 'f'
          s = (if flag is '+' && argv[index] > 0 then '+' else '') +
              (if prec then argv[index].toFixed(prec) else
                            argv[index].toString())
        ++index
        if width > s.length
          if flag is '-'
            s += repeatString (if flag is '0' then '0' else ' '), width - s.length
            return s
          s = repeatString((if flag is '0' then '0'else ' '), width) +
              s
          return s.slice -width
        s

  ###
  @param {string} s
  @return {string}
  ###
  @escapeHTML: (s) ->
    s
      .replace /&/g, '&amp;'
      .replace /</g, '&lt;'
      .replace />/g, '&gt;'
      .replace /'/g, '&apos;'
      .replace /"/g, '&quot;'

  ###
  @param {string} s
  @return {string}
  ###
  @escapeJS: (s) ->
    s
      .replace /\\/g, '\\\\'
      .replace /"/g, '\\"'
      .replace /'/g, '\\\''
      .replace /\//g, '\\/'
      #.replace /</g, '\\x3c'
      #.replace />/g, '\\x3e'

  ###
  @param {string} s
  @return {string}
  ###
  @trimLeft: (s) ->
    s.replace /^\s+/, ''

  ###
  @param {string} s
  @return {string}
  ###
  @trimRight: (s) ->
    s.replace /\s+$/, ''

  ###
  @param {string} s
  @return {string}
  ###
  @trim: (s) ->
    s.replace /^\s+|\s+$/g, ''

  ###
  @param {string} s
  @return {string}
  ###
  @nobr: (s) ->
    s.replace /[\r\n]+/g, ''

  ###
  @param {string} src
  @param {string} suffix
  @return {boolean}
  ###
  @startsWith: (src, suffix) ->
    !src.indexOf suffix

  ###
  @param {string} src
  @param {string} suffix
  @return {boolean}
  ###
  @endsWith: (src, suffix) ->
    len = suffix.length
    if src.length < len
      return false
    src.slice(-len) is suffix

  ###
  @param {number} len
  @param {number} opt_filter
  ###
  @genRandomString: (len, opt_filter) ->
    str = ''
    letter = ''
    if arguments.length < 2
      opt_filter = Types.LOWER | Types.UPPER | Types.DIGITS
    if opt_filter & Types.LOWER
      letter += 'abcdefghijklmnopqrstuvwxyz'
    if opt_filter & Types.UPPER
      letter += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if opt_filter & Types.DIGITS
      letter += '0123456789'
    if opt_filter & Types.UNDERSCORE
      letter += '_'
    if opt_filter & Types.SIGN
      letter += '!\"#$%&\'()=~|-^@[;:],./`{+*}>?'
    range = letter.length
    for i in [0...len] by 1
      str += letter.charAt Math.random() * range | 0
    str

# @nodoc
StringUtil = @StringUtil
# @nodoc
repeatString = StringUtil.repeat
# @nodoc
exports.StringUtil = StringUtil
