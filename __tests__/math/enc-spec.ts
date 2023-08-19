import { encodeUnary, decodeUnary } from '../../src/utils/enc';

describe("Encode", () => {
  it("unary", () => {
    expect(encodeUnary(1)).toBe('10');
    expect(encodeUnary(3)).toBe('1110');
    expect(encodeUnary(1, true)).toBe('01');
    expect(encodeUnary(3, true)).toBe('0001');
  });
});

describe("Decode", () => {
  it("unary", () => {
    expect(decodeUnary('10').join('')).toBe('1');
    expect(decodeUnary('1110').join('')).toBe('3');
    expect(decodeUnary('01', true).join('')).toBe('1');
    expect(decodeUnary('0001', true).join('')).toBe('3');
  });
});
