function tarai(x, y, z) {
  if (x <= y) { return y; }
  return tarai_lazy(tarai(x - 1, y, z), tarai(y - 1, z, x), z - 1, x, y);
}

function tarai_lazy(x, y, xx, yy, zz) {
  if (x <= y) { return y; }
  var z = tarai(xx, yy, zz);
  return tarai_lazy(tarai(x - 1, y, z), tarai(y - 1, z, x), z - 1, x, y);
}

function tarai_normal(x, y, z) {
  if (x <= y) { return y; }
  return tarai_normal(tarai_normal(x - 1, y, z), tarai_normal(y - 1, z, x), tarai_normal(z - 1, x, y));
}

var t0 = Date.now();
var t = tarai_normal(14, 7, 0);
var t1 = Date.now();
console.log('%d %dms', t, t1 - t0);

t = tarai(14, 7, 0);
console.log('%d %dms', t, Date.now() - t1);
