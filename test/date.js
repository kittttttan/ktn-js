var DateUtil = require('../js/date.js').DateUtil;

describe("DateUtil", function() {

  it("format", function() {
    var dt = new Date(1980, 1-1, 21, 1, 2, 3);

    expect(DateUtil.format('yyyy-MM-dd HH:mm:ss', dt)).toEqual('1980-01-21 01:02:03');
    expect(DateUtil.format('yy-M-d H:m:s', dt)).toEqual('1980-1-21 1:2:3');
    expect(DateUtil.format('MMM d yy, E', dt)).toEqual('Jan, Mon');
    expect(DateUtil.format('h a', dt)).toEqual('1 AM');
  });

});
