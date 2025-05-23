import { expect, test } from 'vitest'
import { MathExpression } from '../../src/math/expression/math-expression'

test("+", () => {
  const a = [
    ['1 + 2', 'add(1,2)', '3'],
    ['1+2+3+4+5+6+7+8+9+10', 'add(add(add(add(add(add(add(add(add(1,2),3),4),5),6),7),8),9),10)', '55'],
    ['111111111111111111111 + 100000000000000000000', 'add(111111111111111111111,100000000000000000000)', '211111111111111111111'],
    ['1.2 + 2.1', 'add(1.2,2.1)', '33/10']
  ];
  for (const i of a) {
    const p = MathExpression.create(i[0]).eval();
    expect(p.toString()).toBe(i[1]);
    expect(p.calc().toString()).toBe(i[2]);
  }
});

test("-", () => {
  const a = [
    ['1 - 2', 'add(1,-2)', '-1'],
    ['1-2-3-4-5-6-7-8-9-10', 'add(add(add(add(add(add(add(add(add(1,-2),-3),-4),-5),-6),-7),-8),-9),-10)', '-53'],
    ['111111111111111111111 - 100000000000000000000', 'add(111111111111111111111,-100000000000000000000)', '11111111111111111111']
  ];
  for (const i of a) {
    const p = MathExpression.create(i[0]).eval();
    expect(p.toString()).toBe(i[1]);
    expect(p.calc().toString()).toBe(i[2]);
  }
});

test("*", () => {
  const a = [
    ['2 * 3', '6'],
    ['1*2*3*4*5*6*7*8*9*10', '3628800'],
    ['111111111111111111111 * 100000000000000000000', '11111111111111111111100000000000000000000']
  ];
  for (const i of a) {
    const p = MathExpression.create(i[0]).eval();
    expect(p.calc().toString()).toBe(i[1]);
  }
});

test("/", () => {
  const a = [
    ['6 / 3', 'div(6,3)', '2'],
    ['3628800/2/3/4/5/6/7/8/9', 'div(div(div(div(div(div(div(div(3628800,2),3),4),5),6),7),8),9)', '10'],
    ['11111111111111111111100000000000000000000 / 100000000000000000000', 'div(11111111111111111111100000000000000000000,100000000000000000000)', '111111111111111111111']
  ];
  for (const i of a) {
    const p = MathExpression.create(i[0]).eval();
    expect(p.toString()).toBe(i[1]);
    expect(p.calc().toString()).toBe(i[2]);
  }
});

test("^", () => {
  const a = [
    ['2 ^ 3', '8'],
    ['2^3^4', '2417851639229258349412352']
  ];
  for (const i of a) {
    const p = MathExpression.create(i[0]).eval();
    expect(p.calc().toString()).toBe(i[1]);
  }
});

test("+-*/^", () => {
  const a = [
    ['1 + 2 - 3 * 4 / 5', 'add(add(1,2),div(mul(-3,4),5))', '3/5'],
    ['(1 + 2) * 3 ^ 2', 'mul(add(1,2),pow(3,2))', '27'],
    ['1 / (2 * 3)', 'div(1,mul(2,3))', '1/6'],
    ['1 / (2 + 3)', 'div(1,add(2,3))', '1/5']
  ];
  for (const i of a) {
    const p = MathExpression.create(i[0]).eval();
    expect(p.toString()).toBe(i[1]);
    expect(p.calc().toString()).toBe(i[2]);
  }
});

test("trigon", () => {
  const a = [
    ['sin(0)', ['sin','(','0',')'], 'sin(0)', '0'],
    ['cos(0)', ['cos','(','0',')'], 'cos(0)', '1'],
    ['tan(0)', ['tan','(','0',')'], 'tan(0)', '0'],
  ];
  for (const i of a) {
    const me = MathExpression.create(i[0] as string);
    const p = me.eval();
    expect(me.tokens).toEqual(i[1]);
    expect(p.toString()).toBe(i[2]);
    expect(p.calc().toString()).toBe(i[3]);
  }
});
