import {DateUtil} from '../../src/es6/date.js';

describe("DateUtil", ()=> {

  it("format", ()=> {
    let dt = new Date(1980, 1-1, 21, 13, 2, 3, 4);

    expect(DateUtil.format('yyyy-MM-dd HH:mm:ss.SSS', dt)).toEqual('1980-01-21 13:02:03.004');
    expect(DateUtil.format('yy-M-d H:m:s', dt)).toEqual('80-1-21 13:2:3');
    expect(DateUtil.format('MMM, E', dt)).toEqual('Jan, Mon');
    expect(DateUtil.format('h hh a', dt)).toEqual('1 01 PM');
    expect(DateUtil.format('SS S', dt)).toEqual('04 4');

    expect(DateUtil.format('h hh a', new Date(1980, 1-1, 21, 0, 2, 3, 4))).
        toEqual('12 12 AM');

    expect(DateUtil.format('MMM, E', new Date(1980, 2-1, 21))).
        toEqual('Feb, Thu');
    expect(DateUtil.format('MMM, E', new Date(1980, 3-1, 21))).
        toEqual('May, Fri');
    expect(DateUtil.format('MMM, E', new Date(1980, 4-1, 21))).
        toEqual('Apr, Mon');
    expect(DateUtil.format('MMM, E', new Date(1980, 5-1, 21))).
        toEqual('Mar, Wed');
    expect(DateUtil.format('MMM, E', new Date(1980, 6-1, 21))).
        toEqual('Jun, Sat');
    expect(DateUtil.format('MMM, E', new Date(1980, 7-1, 21))).
        toEqual('Jul, Mon');
    expect(DateUtil.format('MMM, E', new Date(1980, 8-1, 21))).
        toEqual('Aug, Thu');
    expect(DateUtil.format('MMM, E', new Date(1980, 9-1, 21))).
        toEqual('Sep, Sun');
    expect(DateUtil.format('MMM, E', new Date(1980, 10-1, 21))).
        toEqual('Oct, Tue');
    expect(DateUtil.format('MMM, E', new Date(1980, 11-1, 21))).
        toEqual('Nov, Fri');
    expect(DateUtil.format('MMM, E', new Date(1980, 12-1, 21))).
        toEqual('Dec, Sun');
  });

  it("getDaysInMonth", ()=> {
    expect(DateUtil.getDaysInMonth(1999, 2)).toEqual(28);
    expect(DateUtil.getDaysInMonth(2000, 1)).toEqual(31);
    expect(DateUtil.getDaysInMonth(2000, 2)).toEqual(29);
    expect(DateUtil.getDaysInMonth(2000, 4)).toEqual(30);
    expect(DateUtil.getDaysInMonth(2004, 2)).toEqual(29);
  });

});
