/// <reference path="typings/jasmine.d.ts"/>
import {Fft} from '../../src/ts/fft';
import {Complex} from '../../src/ts/complex';

describe("Fft", ()=> {

  it("fft2", ()=> {
    const inputs = [];
    const cos = Math.cos;
    const size = 2;
    for (let i = 0; i < size; ++i) {
      inputs[i] = cos(i);
    }

    const trans = Fft.fftFloat(inputs);
    const inverse = Fft.ifft(trans);

    const expectTr = [
      1.5403023058681398,
      0.45969769413186023
    ];
    const expectInv = [
      1,
      0.5403023058681398
    ];
    for (let i = 0; i < size; ++i) {
      expect(trans[i]._r).toEqual(expectTr[i]);
      expect(inverse[i]._r).toEqual(expectInv[i]);
    }
  });

  it("fft4", ()=> {
    const inputs = [];
    const cos = Math.cos;
    const size = 4;
    for (let i = 0; i < size; ++i) {
      inputs[i] = cos(i);
    }

    const trans = Fft.fftFloat(inputs);
    const inverse = Fft.ifft(trans);

    const expectTr = [
      0.134162972720552,
      1.4161468365471424,
      1.0335433541851633,
      1.4161468365471424
    ];
    const expectInv = [
      1,
      0.5403023058681398,
      -0.41614683654714235,
      -0.9899924966004454
    ];
    for (let i = 0; i < size; ++i) {
      expect(trans[i]._r).toEqual(expectTr[i]);
      expect(inverse[i]._r).toEqual(expectInv[i]);
    }
  });

  it("fft8", ()=> {
    const inputs = [];
    const cos = Math.cos;
    const size = 8;
    for (let i = 0; i < size; ++i) {
      inputs[i] = cos(i);
    }

    const trans = Fft.fftFloat(inputs);
    const inverse = Fft.ifft(trans);

    const expectTr = [
      1.4782540783138367,
      3.068235394394409,
      -0.1976670709668354,
      0.23905184733281448,
      0.3025055801653864,
      0.2390518473328147,
      -0.1976670709668355,
      3.068235394394409
    ];
    const expectInv = [
      1,
      0.5403023058681398,
      -0.41614683654714246,
      -0.9899924966004454,
      -0.6536436208636118,
      0.28366218546322614,
      0.960170286650366,
      0.7539022543433045
    ];
    for (let i = 0; i < size; ++i) {
      expect(trans[i]._r).toEqual(expectTr[i]);
      expect(inverse[i]._r).toEqual(expectInv[i]);
    }
  });

});
