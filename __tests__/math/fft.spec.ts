import { expect, test } from 'vitest'
import { Complex } from '../../src/math/complex'
import { Fft } from '../../src/math/fft'

test("fft2", () => {
  const inputs: number[] = [];
  const cos = Math.cos;
  const size: number = 2;
  for (let i: number = 0; i < size; ++i) {
    inputs[i] = cos(i);
  }

  const trans: Complex[] = Fft.fftFloat(inputs);
  const inverse: Complex[] = Fft.ifft(trans);

  const expectTr: number[] = [
    1.5403023058681398,
    0.45969769413186023
  ];
  const expectInv: number[] = [
    1,
    0.5403023058681398
  ];
  for (let i = 0; i < size; ++i) {
    expect(trans[i].real).toBeCloseTo(expectTr[i]);
    expect(inverse[i].real).toBeCloseTo(expectInv[i]);
  }
});

test("fft4", () => {
  const inputs: number[] = [];
  const cos = Math.cos;
  const size: number = 4;
  for (let i: number = 0; i < size; ++i) {
    inputs[i] = cos(i);
  }

  const trans: Complex[] = Fft.fftFloat(inputs);
  const inverse: Complex[] = Fft.ifft(trans);

  const expectTr: number[] = [
    0.134162972720552,
    1.4161468365471424,
    1.0335433541851633,
    1.4161468365471424
  ];
  const expectInv: number[] = [
    1,
    0.5403023058681398,
    -0.41614683654714235,
    -0.9899924966004454
  ];
  for (let i = 0; i < size; ++i) {
    expect(trans[i].real).toBeCloseTo(expectTr[i]);
    expect(inverse[i].real).toBeCloseTo(expectInv[i]);
  }
});

test("fft8", () => {
  const inputs: number[] = [];
  const cos = Math.cos;
  const size: number = 8;
  for (let i: number = 0; i < size; ++i) {
    inputs[i] = cos(i);
  }

  const trans: Complex[] = Fft.fftFloat(inputs);
  const inverse: Complex[] = Fft.ifft(trans);

  const expectTr: number[] = [
    1.4782540783138367,
    3.068235394394409,
    -0.1976670709668354,
    0.23905184733281448,
    0.3025055801653864,
    0.2390518473328147,
    -0.1976670709668355,
    3.068235394394409
  ];
  const expectInv: number[] = [
    1,
    0.5403023058681398,
    -0.41614683654714246,
    -0.9899924966004454,
    -0.6536436208636118,
    0.28366218546322614,
    0.960170286650366,
    0.7539022543433045
  ];
  for (let i: number = 0; i < size; ++i) {
    expect(trans[i].real).toBeCloseTo(expectTr[i]);
    expect(inverse[i].real).toBeCloseTo(expectInv[i]);
  }
});
