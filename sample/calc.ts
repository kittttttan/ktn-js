import { MathExpression } from "../src/math/expression";

const samples = [
    '1 + 23',
    'cos(0)',
    'tan(0)',
];
for (const s of samples) {
    console.log(`# ${s}`);
    const me = MathExpression.create(s);
    const e = me.eval();
    console.log(me.tokens);
    console.log(e);
    const c = e.calc();
    console.log(c.toString(), c);
}
