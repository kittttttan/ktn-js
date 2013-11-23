(function(exports){
'use strict';

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
  return s
      .replace(/yyyy/g, function() { return d.getFullYear()+''; })
      .replace(/yy/g, function() { return (d.getFullYear() + '').substring(2, 4); })
      .replace(/M{3,}/g, function() {
        switch(d.getMonth()) {
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
        default: throw 'unexpected month';
        }
      })
      .replace(/MM/g, function() { return ('0' + (d.getMonth() + 1)).slice(-2); })
      .replace(/M/g, function() { return (d.getMonth() + 1)+''; })
      .replace(/dd/g, function() { return ('0' + d.getDate()).slice(-2); })
      .replace(/d/g, function() { return d.getDate()+''; })
      .replace(/HH/g, function() { return ('0' + d.getHours()).slice(-2); })
      .replace(/H/g, function() { return d.getHours()+''; })
      .replace(/hh/g, function() {
        var h = d.getHours();
        if (h > 12) { h -= 12; }
        return !h ? '12' : ('0' + h).slice(-2);
      })
      .replace(/h/g, function() {
        var h = d.getHours();
        if (h > 12) { h -= 12; }
        return !h ? '12' : h+'';
      })
      .replace(/a/g, function() { return d.getHours() < 12 ? 'AM' : 'PM'; })
      .replace(/mm/g, function() { return ('0' + d.getMinutes()).slice(-2); })
      .replace(/m/g, function() { return d.getMinutes()+''; })
      .replace(/ss/g, function() { return ('0' + d.getSeconds()).slice(-2); })
      .replace(/s/g, function() { return d.getSeconds()+''; })
      .replace(/S+/g, function() { return d.getMilliseconds()+''; })
      .replace(/Z+/g, function() {
        var t = d.getTimezoneOffset(), z = -t / 60, str;
        if (z < 0) {
          str = '-' + ('0' + (-z)).slice(-2);
        } else {
          str = '+' + ('0' + z).slice(-2);
        }
        return str + ('0' + t % 60).slice(-2);
      })
      .replace(/E+/g, function() {
        switch(d.getDay()) {
        case 0: return 'Sun';
        case 1: return 'Mon';
        case 2: return 'Tue';
        case 3: return 'Wed';
        case 4: return 'Thu';
        case 5: return 'Fri';
        case 6: return 'Sat';
        default: throw 'unexpected day';
        }
      });
}

/**
 * DateUtil
 * @class DateUtil
 */
var DateUtil = {
  isLeapYear: isLeapYear,
  getDaysInMonth: getDaysInMonth,
  format: dateFormat
};

// exports
exports.DateUtil = DateUtil;

}(typeof exports !== 'undefined' ? exports : this));
