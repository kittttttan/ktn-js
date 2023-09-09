import {timeit} from "../src/utils/timeit.ts";

function tarai(x, y, z) {
    if (x <= y) {
        return y;
    }
    return tarai_lazy(tarai(x - 1, y, z), tarai(y - 1, z, x), z - 1, x, y);
}

function tarai_lazy(x, y, xx, yy, zz) {
    if (x <= y) {
        return y;
    }
    var z = tarai(xx, yy, zz);
    return tarai_lazy(tarai(x - 1, y, z), tarai(y - 1, z, x), z - 1, x, y);
}

function tarai_normal(x, y, z) {
    if (x <= y) {
        return y;
    }
    return tarai_normal(tarai_normal(x - 1, y, z), tarai_normal(y - 1, z, x), tarai_normal(z - 1, x, y));
}

timeit(() => {
    tarai_normal(14, 7, 0);
}, 'tarai_normal');
timeit(() => {
    tarai(14, 7, 0);
}, 'tarai');
