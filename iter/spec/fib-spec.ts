import {Fibonacci} from '../src/fib';

describe("Fibonacci", ()=> {
  const expects = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
  ];
  it("top", ()=> {
    let index = 0;
    for (let i of Fibonacci.top(10)) {
      expect(i).toEqual(expects[index]);
      ++index;
    }
    expect(index).toEqual(10);
  });

  it("max", ()=> {
    let index = 0;
    for (let i of Fibonacci.max(100)) {
      expect(i).toEqual(expects[index]);
      ++index;
    }
    expect(index).toEqual(12);
  });

});
