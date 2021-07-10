import {Encode, Decode} from '../../src/utils/enc';

describe("Encode", ()=> {
  it("unary", ()=> {
    expect(Encode.unary(1)).toBe('10');
    expect(Encode.unary(3)).toBe('1110');
    expect(Encode.unary(1, true)).toBe('01');
    expect(Encode.unary(3, true)).toBe('0001');
  });

});

describe("Decode", ()=> {
  it("unary", ()=> {
    expect(Decode.unary('10').join('')).toBe('1');
    expect(Decode.unary('1110').join('')).toBe('3');
    expect(Decode.unary('01', true).join('')).toBe('1');
    expect(Decode.unary('0001', true).join('')).toBe('3');
  });

});
