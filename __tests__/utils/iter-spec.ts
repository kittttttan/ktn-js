import {range, zip} from '../../src/utils/iter';

describe("iter", ()=> {
  it("range", ()=> {
    let index = 0;
    for (let i of range(7)) {
      expect(i).toBe(index);
      ++index;
    }
    expect(7).toBe(index);
    index = 3;
    for (let i of range(3, 7)) {
      expect(i).toBe(index);
      ++index;
    }
    expect(7).toBe(index);
    index = 7;
    for (let i of range(7, 0, -2)) {
      expect(i).toBe(index);
      index -= 2;
    }
    expect(-1).toBe(index);
  });

  it("zip", ()=> {
    let v1 = 0;
    let v2 = 7;
    for (let vs of zip(range(7), range(7, 0, -2))) {
      expect(v1).toBe(vs[0]);
      expect(v2).toBe(vs[1]);
      v1 += 1;
      v2 += -2;
    }
    expect(v1).toBe(4);
  });
});
