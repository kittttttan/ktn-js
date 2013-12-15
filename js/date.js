/**
 * @method DateUtil.isLeapYear
 * @param {numer} y year
 * @return {boolean}
 */
function isLeapYear(y) {
  return !(y & 3) && (y % 100 || !(y % 400));
}

/**
 * @method DateUtil.getDaysInMonth
 * @param {number} y year
 * @param {number} m month
 * @return {number} number of days in month
 */
function getDaysInMonth(y, m) {
  switch (m) {
    case 2:
      return isLeapYear(y) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      break;
  }
  return 31;
}

/**
 * @method DateUtil.dateFormat
 * @param {string} s format string
 * @param {Date} d date
 * @return {string}
 */
function dateFormat(s, d) {
  return s.replace(
      /(a|dd?|E+|HH?|hh?|MM?M?|mm?|S+|ss?|yy(?:yy)?|Z+)/g,
      function(src, token) {
        if (token === 'yyyy') {
          return d.getFullYear()+'';
        }
        if (token === 'yy') {
          return (d.getFullYear() + '').substring(2, 4);
        }
        if (token === 'MMM') {
          switch (d.getMonth()) {
          case 0: return 'Jan';
          case 1: return 'Feb';
          case 2: return 'May';
          case 3: return 'Apr';
          case 4: return 'Mar';
          case 5: return 'Jun';
          case 6: return 'Jul';
          case 7: return 'Aug';
          case 8: return 'Sep';
          case 9: return 'Oct';
          case 10: return 'Nov';
          case 11: return 'Dec';
          }
        }
        if (token === 'MM') {
          return ('0' + (d.getMonth() + 1)).slice(-2);
        }
        if (token === 'M') {
          return (d.getMonth() + 1) + '';
        }
        if (token === 'dd') {
          return ('0' + d.getDate()).slice(-2);
        }
        if (token === 'd') {
          return d.getDate() + '';
        }
        if (token === 'HH') {
          return ('0' + d.getHours()).slice(-2);
        }
        if (token === 'H') {
          return d.getHours() + '';
        }
        var h = 0;
        if (token === 'hh') {
          h = d.getHours();
          if (h > 12) { h -= 12; }
          return !h ? '12' : ('0' + h).slice(-2);
        }
        if (token === 'h') {
          h = d.getHours();
          if (h > 12) { h -= 12; }
          return !h ? '12' : h + '';
        }
        if (token === 'a') {
          return d.getHours() < 12 ? 'AM' : 'PM';
        }
        if (token === 'mm') {
          return ('0' + d.getMinutes()).slice(-2);
        }
        if (token === 'm') {
          return d.getMinutes() + '';
        }
        if (token === 'ss') {
          return ('0' + d.getSeconds()).slice(-2);
        }
        if (token === 's') {
          return d.getSeconds()+'';
        }
        if (token === 'SS') {
          return ('0' + d.getMilliseconds()).substring(0, 2);
        }
        if (token === 'S') {
          return d.getMilliseconds() + '';
        }
        if (token.charAt(0) === 'S') {
          return ('00' + d.getMilliseconds()).slice(-3);
        }
        if (token.charAt(0) === 'Z') {
          var t = d.getTimezoneOffset(), z = -t / 60, str;
          if (z < 0) {
            str = '-' + ('0' + (-z)).slice(-2);
          } else {
            str = '+' + ('0' + z).slice(-2);
          }
          return str + ('0' + t % 60).slice(-2);
        }
        if (token.charAt(0) === 'E') {
          switch (d.getDay()) {
          case 0: return 'Sun';
          case 1: return 'Mon';
          case 2: return 'Tue';
          case 3: return 'Wed';
          case 4: return 'Thu';
          case 5: return 'Fri';
          case 6: return 'Sat';
          }
        }
      });
}

/**
 * DateUtil
 * @class DateUtil
 */
var DateUtil = Object.freeze({
  isLeapYear: isLeapYear,
  getDaysInMonth: getDaysInMonth,
  format: dateFormat
});

// exports
exports.DateUtil = DateUtil;
