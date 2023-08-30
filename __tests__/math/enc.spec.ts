import { expect, test } from 'vitest'
import {
  encodeUnary,
  decodeUnary,
  encodeEliasGamma,
  decodeEliasGamma,
  encodeEliasDelta,
  decodeEliasDelta,
  encodeEliasOmega,
  decodeEliasOmega,
} from '../../src/utils/enc'

test("unary", () => {
  expect(encodeUnary(1)).toBe('10');
  expect(encodeUnary(2)).toBe('110');
  expect(encodeUnary(3)).toBe('1110');
  expect(encodeUnary(1, true)).toBe('01');
  expect(encodeUnary(2, true)).toBe('001');
  expect(encodeUnary(3, true)).toBe('0001');

  expect(decodeUnary('10').join('')).toBe('1');
  expect(decodeUnary('110').join('')).toBe('2');
  expect(decodeUnary('1110').join('')).toBe('3');
  expect(decodeUnary('01', true).join('')).toBe('1');
  expect(decodeUnary('001', true).join('')).toBe('2');
  expect(decodeUnary('0001', true).join('')).toBe('3');
});

test("eliasGamma", () => {
  expect(encodeEliasGamma(1)).toBe('1');
  expect(encodeEliasGamma(2)).toBe('010');
  expect(encodeEliasGamma(3)).toBe('011');
  expect(encodeEliasGamma(4)).toBe('00100');
  expect(encodeEliasGamma(5)).toBe('00101');

  expect(decodeEliasGamma('1').join('')).toBe('1');
  expect(decodeEliasGamma('010').join('')).toBe('2');
  expect(decodeEliasGamma('011').join('')).toBe('3');
  expect(decodeEliasGamma('00100').join('')).toBe('4');
  expect(decodeEliasGamma('00101').join('')).toBe('5');
});

test("eliasDelta", () => {
  expect(encodeEliasDelta(1)).toBe('1');
  expect(encodeEliasDelta(2)).toBe('0100');
  expect(encodeEliasDelta(3)).toBe('0101');
  expect(encodeEliasDelta(4)).toBe('01100');
  expect(encodeEliasDelta(5)).toBe('01101');

  expect(decodeEliasDelta('1').join('')).toBe('1');
  expect(decodeEliasDelta('0100').join('')).toBe('2');
  expect(decodeEliasDelta('0101').join('')).toBe('3');
  expect(decodeEliasDelta('01100').join('')).toBe('4');
  expect(decodeEliasDelta('01101').join('')).toBe('5');
});

test("eliasOmega", () => {
  expect(encodeEliasOmega(1)).toBe('0');
  expect(encodeEliasOmega(2)).toBe('100');
  expect(encodeEliasOmega(3)).toBe('110');
  expect(encodeEliasOmega(4)).toBe('101000');
  expect(encodeEliasOmega(5)).toBe('101010');

  expect(decodeEliasOmega('0').join('')).toBe('1');
  expect(decodeEliasOmega('100').join('')).toBe('2');
  expect(decodeEliasOmega('110').join('')).toBe('3');
  expect(decodeEliasOmega('101000').join('')).toBe('4');
  expect(decodeEliasOmega('101010').join('')).toBe('5');
});
