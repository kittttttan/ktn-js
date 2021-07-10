import {DateUtil} from '../../src/utils/date';

describe("DateUtil", ()=> {

  it("format", ()=> {
    let dt = new Date(1980, 1-1, 21, 13, 2, 3, 4);

    expect(DateUtil.format('yyyy-MM-dd HH:mm:ss.SSS', dt)).toBe('1980-01-21 13:02:03.004');
    expect(DateUtil.format('yy-M-d H:m:s', dt)).toBe('80-1-21 13:2:3');
    expect(DateUtil.format('MMM, E', dt)).toBe('Jan, Mon');
    expect(DateUtil.format('h hh a', dt)).toBe('1 01 PM');
    expect(DateUtil.format('SS S', dt)).toBe('04 4');

    expect(DateUtil.format('h hh a', new Date(1980, 1-1, 21, 0, 2, 3, 4))).
        toBe('12 12 AM');

    expect(DateUtil.format('MMM, E', new Date(1980, 2-1, 21))).
        toBe('Feb, Thu');
    expect(DateUtil.format('MMM, E', new Date(1980, 3-1, 21))).
        toBe('May, Fri');
    expect(DateUtil.format('MMM, E', new Date(1980, 4-1, 21))).
        toBe('Apr, Mon');
    expect(DateUtil.format('MMM, E', new Date(1980, 5-1, 21))).
        toBe('Mar, Wed');
    expect(DateUtil.format('MMM, E', new Date(1980, 6-1, 21))).
        toBe('Jun, Sat');
    expect(DateUtil.format('MMM, E', new Date(1980, 7-1, 21))).
        toBe('Jul, Mon');
    expect(DateUtil.format('MMM, E', new Date(1980, 8-1, 21))).
        toBe('Aug, Thu');
    expect(DateUtil.format('MMM, E', new Date(1980, 9-1, 21))).
        toBe('Sep, Sun');
    expect(DateUtil.format('MMM, E', new Date(1980, 10-1, 21))).
        toBe('Oct, Tue');
    expect(DateUtil.format('MMM, E', new Date(1980, 11-1, 21))).
        toBe('Nov, Fri');
    expect(DateUtil.format('MMM, E', new Date(1980, 12-1, 21))).
        toBe('Dec, Sun');
  });

  it("getDaysInMonth", ()=> {
    expect(DateUtil.getDaysInMonth(1999, 2)).toBe(28);
    expect(DateUtil.getDaysInMonth(2000, 1)).toBe(31);
    expect(DateUtil.getDaysInMonth(2000, 2)).toBe(29);
    expect(DateUtil.getDaysInMonth(2000, 4)).toBe(30);
    expect(DateUtil.getDaysInMonth(2004, 2)).toBe(29);
  });

});
