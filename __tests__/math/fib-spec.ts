import {fibonacci} from '../../src/math/fib';
import {take, takeWhile} from '../../src/utils/iter';

describe("Fibonacci", ()=> {
  const expects = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
  ];
  it("take", ()=> {
    let index = 0;
    for (const i of take(fibonacci(), 10)) {
      expect(i).toBe(expects[index]);
      ++index;
    }
    expect(index).toBe(10);
  });

  it("takeWhile", ()=> {
    let index = 0;
    for (const i of takeWhile(fibonacci(), (n) => n <= 100)) {
      expect(i).toBe(expects[index]);
      ++index;
    }
    expect(index).toBe(12);
  });

});
