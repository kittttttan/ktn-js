var Fft = require('../js/fft.js').Fft;
var Complex = require('../js/complex.js').Complex;

describe("Fft", function() {

  it("fft2", function() {
    var inputs = [];
    var cos = Math.cos;
    var size = 2;
    for (var i = 0; i < size; ++i) {
      inputs[i] = cos(i);
    }

    var trans = Fft.fftFloat(inputs);
    var inverse = Fft.ifft(trans);

    var expectTr = [
      1.5403023058681398,
      0.45969769413186023
    ];
    var expectInv = [
      1,
      0.5403023058681398
    ];
    for (i = 0; i < size; ++i) {
      expect(trans[i].r_).toEqual(expectTr[i]);
      expect(inverse[i].r_).toEqual(expectInv[i]);
    }
  });

  it("fft4", function() {
    var inputs = [];
    var cos = Math.cos;
    var size = 4;
    for (var i = 0; i < size; ++i) {
      inputs[i] = cos(i);
    }

    var trans = Fft.fftFloat(inputs);
    var inverse = Fft.ifft(trans);

    var expectTr = [
      0.134162972720552,
      1.4161468365471424,
      1.0335433541851633,
      1.4161468365471424
    ];
    var expectInv = [
      1,
      0.5403023058681398,
      -0.41614683654714235,
      -0.9899924966004454
    ];
    for (i = 0; i < size; ++i) {
      expect(trans[i].r_).toEqual(expectTr[i]);
      expect(inverse[i].r_).toEqual(expectInv[i]);
    }
  });

  it("fft8", function() {
    var inputs = [];
    var cos = Math.cos;
    var size = 8;
    for (var i = 0; i < size; ++i) {
      inputs[i] = cos(i);
    }

    var trans = Fft.fftFloat(inputs);
    var inverse = Fft.ifft(trans);

    var expectTr = [
      1.4782540783138367,
      3.068235394394409,
      -0.1976670709668354,
      0.23905184733281448,
      0.3025055801653864,
      0.2390518473328147,
      -0.1976670709668355,
      3.068235394394409
    ];
    var expectInv = [
      1,
      0.5403023058681398,
      -0.41614683654714246,
      -0.9899924966004454,
      -0.6536436208636118,
      0.28366218546322614,
      0.960170286650366,
      0.7539022543433045
    ];
    for (i = 0; i < size; ++i) {
      expect(trans[i].r_).toEqual(expectTr[i]);
      expect(inverse[i].r_).toEqual(expectInv[i]);
    }
  });

});
