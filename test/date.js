describe("DateUtil", function() {

  it("format", function() {
    var dt = new Date(1980, 1-1, 21, 1, 2, 3);
    expect(DateUtil.format('yyyy-MM-dd HH:mm:ss', dt)).toEqual('1980-01-21 01:02:03');
    expect(DateUtil.format('MMM, E', dt)).toEqual('Jan, Mon');
  });

});
