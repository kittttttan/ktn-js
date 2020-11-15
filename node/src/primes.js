const timeit = require("./timeit");
const math = require("ktn/math");

timeit.timeit(() => {
    console.log('メルセンヌ数 Mn = 2^n - 1');
    for (let i = 1n; i < 21n; i++) {
        const m = (1n << i) - 1n;
        console.log(m.toString(), math.Primality.bmrpt(m));
    }
});

timeit.timeit(() => {
    console.log('フェルマー数 Fn = 2^{2^n} + 1');
    for (let i = 1n; i < 8n; i++) {
        const m = (1n << (1n << i)) + 1n;
        console.log(m.toString(), math.Primality.bmrpt(m));
    }
});
