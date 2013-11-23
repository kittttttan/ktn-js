var Fft = this.Fft;
if (typeof require !== 'undefined') {
  Fft = require('../src/fft.js').Fft;
}
var fft = Fft.fftFloat;
var ifft = Fft.ifft;

var cos = Math.cos;

function test(size, show) {
  console.log('size: ' + size);
  var inputs = [];
  var i;
  for (i = 0; i < size; ++i) {
    inputs[i] = cos(i);
  }
  
  var cs = fft(inputs);
  var sc = ifft(cs);

  if (!show) { return; }

  for (i = 0; i < size; ++i) {
    console.log(inputs[i]);
  }
  console.log(' ---');
  for (i = 0; i < size; ++i) {
    console.log(cs[i].r_);
  }
  console.log(' ---');
  for (i = 0; i < size; ++i) {
    console.log(sc[i].r_);
  }
}

function test2(size) {
  var i;
  var a = [];
  var b = [];
  for (i = 0; i < size; ++i) {
    a[i] = 0;
    b[i] = 0;
  }
  for (i = size; i < (size << 1); ++i) {
    a[i] = i * 2;
    b[i] = 4;
  }
  
  var ca = fft(a);
  var cb = fft(b);
  var cc = [];
  for (i = 0; i < a.length; ++i) {
    cc[i] = ca[i].mul(cb[i]);
  }
  var cr = ifft(cc);
  for (i = 0; i < cc.length; ++i) {
    console.log(cr[i].r_);
  }
}

var t0 = Date.now();
test(4, true);
test(1024 * 8);
//test2(2);
console.log((Date.now() - t0) + 'ms');
