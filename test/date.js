var DateUtil = require('../js/date.js').DateUtil;

describe("DateUtil", function() {

  it("format", function() {
    var dt = new Date(1980, 1-1, 21, 13, 2, 3);

    expect(DateUtil.format('yyyy-MM-dd HH:mm:ss.SSS', dt)).toEqual('1980-01-21 13:02:03.000');
    expect(DateUtil.format('yy-M-d H:m:s', dt)).toEqual('80-1-21 13:2:3');
    expect(DateUtil.format('MMM, E', dt)).toEqual('Jan, Mon');
    expect(DateUtil.format('h hh a', dt)).toEqual('1 01 PM');
  });

  it("getDaysInMonth", function() {
    expect(DateUtil.getDaysInMonth(1999, 2)).toEqual(28);
    expect(DateUtil.getDaysInMonth(2000, 1)).toEqual(31);
    expect(DateUtil.getDaysInMonth(2000, 2)).toEqual(29);
    expect(DateUtil.getDaysInMonth(2000, 4)).toEqual(30);
    expect(DateUtil.getDaysInMonth(2004, 2)).toEqual(29);
  });

});
