StringUtil = if require? then require('../coffee/string').StringUtil else @StringUtil

basic = ->
  return StringUtil.pyformat(
      '{0}, {1:^10}, {2:#b}, {4:>3}, {:*<3}, {:0^5}',
      1, 2, 3, 4, 5, 6)

d = Date.now()

console.log("""
#{basic()}
Time: #{Date.now() - d}ms
""")
