const timeit = require("./timeit");
const math = require("ktn/math");

timeit.timeit(() => {
    const ps = math.Primality.sieveMax(1000);
    for (const p of ps) {
        console.log(p);
    }
});
