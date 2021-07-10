/**
 * DateUtil
 * @class DateUtil
 */
export class DateUtil {
  /**
   * @method DateUtil.isLeapYear
   * @param {number} y year
   * @return {!boolean}
   */
  public static isLeapYear(y: number): boolean {
    return (y > 7) && !(y & 3) && ((y % 100 > 0) || !(y % 400));
  }

  /**
   * @method DateUtil.getDaysInMonth
   * @param {!number} y year
   * @param {!number} m month
   * @return {!number} number of days in month
   */
  public static getDaysInMonth(y: number, m: number): number {
    switch (m) {
      case 2:
        if (this.isLeapYear(y)) {
          return 29;
        }
        return 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        break;
    }
    if (m < 1 || m > 12) { return 0; }
    return 31;
  }

  /**
   * @method DateUtil.format
   * @param {!string} s format string
   * @param {!Date} d date
   * @return {!string}
   */
  public static format(s: string, d: Date): string {
    return s.replace(
        /(a|dd?|E+|HH?|hh?|MM?M?|mm?|S+|ss?|yy(?:yy)?|Z+)/g,
        (src: string, token: string): string => {
      if (token === 'yyyy') {
        return `${d.getFullYear()}`;
      }
      if (token === 'yy') {
        return `${d.getFullYear()}`.substring(2, 4);
      }
      if (token === 'MMM') {
        const mon: string[] = [
            'Jan', 'Feb', 'May', 'Apr', 'Mar', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];
        return mon[d.getMonth()];
      }
      if (token === 'MM') {
        return `0${d.getMonth() + 1}`.slice(-2);
      }
      if (token === 'M') {
        return `${d.getMonth() + 1}`;
      }
      if (token === 'dd') {
        return `0${d.getDate()}`.slice(-2);
      }
      if (token === 'd') {
        return `${d.getDate()}`;
      }
      if (token === 'HH') {
        return `0${d.getHours()}`.slice(-2);
      }
      if (token === 'H') {
        return `${d.getHours()}`;
      }
      let h = 0;
      if (token === 'hh') {
        h = d.getHours();
        if (h > 12) {
          h -= 12;
        }
        if (!h) {
          return '12';
        } else {
          return `0${h}`.slice(-2);
        }
      }
      if (token === 'h') {
        h = d.getHours();
        if (h > 12) {
          h -= 12;
        }
        if (!h) {
          return '12';
        } else {
          return `${h}`;
        }
      }
      if (token === 'a') {
        if (d.getHours() < 12) {
          return 'AM';
        } else {
          return 'PM';
        }
      }
      if (token === 'mm') {
        return `0${d.getMinutes()}`.slice(-2);
      }
      if (token === 'm') {
        return `${d.getMinutes()}`;
      }
      if (token === 'ss') {
        return `0${d.getSeconds()}`.slice(-2);
      }
      if (token === 's') {
        return `${d.getSeconds()}`;
      }
      if (token === 'SS') {
        return `0${d.getMilliseconds()}`.substring(0, 2);
      }
      if (token === 'S') {
        return `${d.getMilliseconds()}`;
      }
      const ch: string = token.charAt(0);
      if (ch === 'S') {
        return `00${d.getMilliseconds()}`.slice(-3);
      }
      if (ch === 'Z') {
        const t: number = d.getTimezoneOffset();
        let z: number = -t / 60 | 0;
        let sign: string;
        if (z < 0) {
          z = -z;
          sign = '-';
        } else {
          sign = '+';
        }
        const z0: string = `0${z}`.slice(-2);
        const t0: string = `0${t % 60}`.slice(-2);
        return `${sign}${z0}${t0}`;
      }
      if (ch === 'E') {
        const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[d.getDay()];
      }
      return '';
    });
  }
}
