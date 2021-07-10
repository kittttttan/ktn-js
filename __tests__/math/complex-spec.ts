import {Complex} from '../../src/math/complex';

describe("Complex", ()=> {
  
  it("zero", ()=> {
    expect(Complex.zero.toString()).toBe('(0+0J)');
    expect(Complex.zero.eq(0)).toBe(true);
    expect(Complex.zero.equal(new Complex())).toBe(true);
  });

  it("one", ()=> {
    expect(Complex.one.toString()).toBe('(1+0J)');
    expect(Complex.one.eq(1)).toBe(true);
    expect(Complex.one.equal(new Complex(1))).toBe(true);
  });

  const a = new Complex(1, 2);
  const b = new Complex(3, -4);
  it("real", ()=> {
    expect(a.real).toBe(1);
    expect(b.real).toBe(3);
  });
  it("imag", ()=> {
    expect(a.imag).toBe(2);
    expect(b.imag).toBe(-4);
  });
  it("conj", ()=> {
    expect(a.conj().equal(new Complex(1, -2))).toBe(true);
    expect(b.conj().equal(new Complex(3, 4))).toBe(true);
  });
  it("scale", ()=> {
    expect(a.scale(2).equal(new Complex(2, 4))).toBe(true);
    expect(b.scale(-3).equal(new Complex(-9, 12))).toBe(true);
  });
  it("add", ()=> {
    expect(a.add(a.conj()).toString()).toBe('(2+0J)');
    expect(a.add(b).toString()).toBe('(4-2J)');
  });
  it("sub", ()=> {
    expect(a.sub(a.conj()).toString()).toBe('(0+4J)');
    expect(a.sub(b).toString()).toBe('(-2+6J)');
  });
  it("mul", ()=> {
    expect(a.mul(a.conj()).toString()).toBe('(5+0J)');
    expect(a.mul(b).toString()).toBe('(11+2J)');
  });

});
