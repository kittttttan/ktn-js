if (typeof require !== 'undefined') {
  Util = require('../src/utils.js').Util;
  StringUtil = require('../src/string.js').StringUtil;
  uuid = require('../src/uuid.js').uuid;
  ArrayUtil = require('../src/array.js').ArrayUtil;
  StringConverter = require('../src/strconv.js').StringConverter;
  Random = require('../src/random.js').Random;
  DateUtil = require('../src/date.js').DateUtil;
}

var assert = Util.assert;
var range = ArrayUtil.range;
var genRandomString = StringUtil.genRandomString;
var proper = StringConverter.proper;
var toZenkaku = StringConverter.toZenkaku;
var sprintf = StringUtil.format;
var dateFormat = DateUtil.format;

if (typeof console == 'undefined') {
  console={
    log: function(a){
      document.writeln(a);
    }
  };
}

function uuidTest() {
  console.log('Test uuid ...');
  var u = uuid();
  console.log('version: '+ u.version());
  console.log('variant: '+ u.variant());
  var id = u.generate();
  console.log(id);
  u.fromString(id);
  console.log(u.toString());
  console.log('');
}

function sprintfTest() {
  console.log('Test sprintf ...');
  console.log(
    sprintf('%%02d, 7 -> %02d\n%%#x, 100 -> %#x\n%%+.2f, 6.789 -> %+.2f\n%%.3e, 12.3 -> %.3e\n',
        7, 100, 6.789, 12.3)
  );
}

function rangeTest() {
  console.log('Test range ...');
  console.log('range(7) = '+ range(7));
  console.log('range(3, 0, -0.5) = '+ range(3, 0, -0.5));
  console.log('');
}

function genRandomStringTest() {
  console.log('Test genRandomString ...');
  console.log('genRandomString(10) = '+ genRandomString(10));
  console.log('genRandomString(7, 48) = '+ genRandomString(7, 48));
  console.log('');
}

function strConvTest() {
  console.log('Test strConv ...');
  console.log('proper("sample test") = '+ proper('sample text'));
  console.log('toZenkaku("sample test") = '+ toZenkaku('sample text'));
  console.log('');
}

function dateFormatTest() {
  console.log('Test dateFormat ...');
  var d = new Date();
  console.log(dateFormat('yyyy-MM-dd E', d));
  console.log(dateFormat('M/d a hh:mm:ss.SZ', d));
  console.log(dateFormat('MMM, yy', d));
  console.log('');
}

function nativeDateTest() {
  console.log('Test Date#method ...');
  var d = new Date();
  console.log(d.toString());
  console.log(d.toUTCString());
  console.log(d.toLocaleString());
  console.log(d.toJSON && d.toJSON());
  console.log(d.getTime());
  console.log(d.getFullYear());
  console.log(d.getMonth());
  console.log(d.getDate());
  console.log(d.getDay());
  console.log(d.getHours());
  console.log(d.getMinutes());
  console.log(d.getSeconds());
  console.log(d.getMilliseconds());
  console.log(d.getTimezoneOffset());
  console.log('');
}

function randomTest() {
  var r = new Random();
  var arr1 = [];
  var arr2 = [];
  var arr3 = [];
  for (var i = 0; i < 7; ++i) {
    arr1.push(r.int32());
  }
  for (var i = 0; i < 4; ++i) {
    arr2.push(r.real2());
  }
  for (var i = 0; i < 37; ++i) {
    arr3.push((r.real2() * 7 | 0) + 1);
  }
  
  console.log(arr1.join(' '));
  console.log(arr2.join(' '));
  console.log(arr3.join(' '));
}

function mainTest() {
  var d = Date.now();
  
  uuidTest();
  sprintfTest();
  rangeTest();
  genRandomStringTest();
  strConvTest();
  dateFormatTest();
  randomTest();

  console.log((Date.now() - d) +'ms');
}

mainTest();
//assert(false, 'assert test');
