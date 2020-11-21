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

timeit.timeit(() => {
    console.log('ρ(ロー)法');
    const n = (1n << (1n << 6n)) + 1n;
    const max = BigInt(Number.MAX_SAFE_INTEGER) > n - 2n ?
        Number(n - 2n) : Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < 3; i++) {
        const r = BigInt((Math.random() * max | 0) + 1);
        console.log(`${math.BMath.rho(n, r)} | ${n.toString()}`);
    }
});
