import {MathExpression} from '../../src/ts/math-expression';

function main() {
  const s: string[] = [
    '1 + 2 * 3 / 4 - 5'
    ,'-0.1 * (1 + 1.5)'
    ,'10^2 - 2'
    ,'(123/456)^10 * 7777777'
    //,'(-7+3/2)*3^2+$sin($p)'
  ];
  let t0: number = 0;
  for (const e of s) {
    t0 = Date.now();

    const me: MathExpression = MathExpression.create(e);
    console.log(me);

    const p = me.eval();
    console.log(me.tokens);
    console.log(me.ast);
    console.log(p);
    console.log(`${p} = ${p.calc()}`);
 
    console.log(`${Date.now() - t0} ms`);
  }
}

main();
