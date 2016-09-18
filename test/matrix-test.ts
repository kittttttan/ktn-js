/// <reference path="typings/jasmine.d.ts"/>
import Matrix from '../ts/matrix';

describe("Matrix", ()=> {

  it("gen", ()=> {
    let m = new Matrix(2, 2);
	m._mn[0][0] = 1;
	m._mn[1][1] = 1;
	let e = Matrix.E(2);
	expect(m.equal(e)).toBe(true);

	let n = Matrix.array([[1, 0], [0, 1]]);
	expect(m.equal(n)).toBe(true);

	let dg = Matrix.diag([1, 1]);
	expect(m.equal(dg)).toBe(true);

	m._mn[0][1] = 1;
	let u = Matrix.U(2);
	expect(m.equal(u)).toBe(true);

	m._mn[0][1] = 0;
	m._mn[1][0] = 1;
	let d = Matrix.D(2);
	expect(m.equal(d)).toBe(true);
  });

  it("add", ()=> {
	let m = Matrix.array([[1, 2], [3, 4]]);
	let n = Matrix.array([[1, -1], [0, 2]]);
	let a = Matrix.array([[2, 1], [3, 6]]);

    expect(m.add(n).equal(a)).toBe(true);
  });

  it("sub", ()=> {
	let m = Matrix.array([[1, 2], [3, 4]]);
	let n = Matrix.array([[1, -1], [0, 2]]);
	let a = Matrix.array([[0, 3], [3, 2]]);

    expect(m.sub(n).equal(a)).toBe(true);
  });

  it("mul", ()=> {
	let m = Matrix.array([[1, 2], [3, 4]]);
	let n = Matrix.array([[1, -1], [0, 2]]);
	let a = Matrix.array([[1, 3], [3, 5]]);

    expect(m.mul(n).equal(a)).toBe(true);
  });

});
