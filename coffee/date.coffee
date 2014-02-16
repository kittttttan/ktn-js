class @DateUtil
  ###
  @param {numer} y year
  @return {boolean}
  ###
  @isLeapYear: (y) ->
    !(y & 3) && (y % 100 || !(y % 400))

  ###
  @param {number} y year
  @param {number} m month
  @return {number} number of days in month
  ###
  @getDaysInMonth: (y, m) ->
    switch m
      when 2
        return if isLeapYear(y) then 29 else 28
      when 4, 6, 9, 11
        return 30
    31

  ###
  @param {string} s format string
  @param {date} d date
  @return {string}
  ###
  @format: (s, d) ->
    s
      .replace /(a|dd?|E+|HH?|hh?|MM?M?|mm?|S+|ss?|yy(?:yy)?|Z+)/g,
        (src, token) ->
          if token is 'yyyy'
            return d.getFullYear() + ''
          if token is 'yy'
            return (d.getFullYear() + '')
                .substring 2, 4
          if token is 'MMM'
            switch d.getMonth()
              when 0
                return 'Jan'
              when 1
                return 'Feb'
              when 2
                return 'May'
              when 3
                return 'Apr'
              when 4
                return 'Mar'
              when 5
                return 'Jun'
              when 6
                return 'Jul'
              when 7
                return 'Aug'
              when 8
                return 'Sep'
              when 9
                return 'Oct'
              when 10
                return 'Nov'
              when 11
                return 'Dec'
          if token is 'MM'
            return ('0' + (d.getMonth() + 1))
                .slice -2
          if token is 'M'
            return (d.getMonth() + 1) + ''
          if token is 'dd'
            return ('0' + d.getDate())
                .slice -2
          if token is 'd'
            return d.getDate() + ''
          if token is 'HH'
            return ('0' + d.getHours())
                .slice -2
          if token is 'H'
            return d.getHours() + ''
          h = 0
          if token is 'hh'
            h = d.getHours()
            if h > 12
              h -= 12
            return if !h then '12' else ('0' + h).slice(-2)
          if token is 'h'
            h = d.getHours()
            if h > 12
              h -= 12
            return if !h then '12' else h + ''
          if token is 'a'
            return if d.getHours() < 12 then 'AM' else 'PM'
          if token is 'mm'
            return ('0' + d.getMinutes())
                .slice -2
          if token is 'm'
            return d.getMinutes() + ''
          if token is 'ss'
            return ('0' + d.getSeconds())
                .slice -2
          if token is 's'
            return d.getSeconds() + ''
          if token is 'SS'
            return ('0' + d.getMilliseconds())
                .substring 0, 2
          if token is 'S'
            return d.getMilliseconds() + ''
          if token.charAt(0) is 'S'
            return ('00' + d.getMilliseconds())
                .slice -3
          if token.charAt(0) is 'Z'
            t = d.getTimezoneOffset()
            z = -t / 60
            if z < 0
              str = '-' + ('0' + (-z))
                  .slice -2
            else
              str = '+' + ('0' + z)
                  .slice -2
            return str + ('0' + t % 60)
                .slice -2
          if token.charAt(0) is 'E'
            switch d.getDay()
              when 0
                return 'Sun'
              when 1
                return 'Mon'
              when 2
                return 'Tue'
              when 3
                return 'Wed'
              when 4
                return 'Thu'
              when 5
                return 'Fri'
              when 6
                return 'Sat'

# @nodoc
DateUtil = @DateUtil
# @nodoc
isLeapYear = DateUtil.isLeapYear
# @nodoc
exports.DateUtil = DateUtil
