var Quaternion = require('../src/quaternion.js').Quaternion;

var PI = Math.PI;
var q = Quaternion.create(1, 2, 3);
console.log(q.toString());

console.log(q.conjugate().toString());
console.log(q.normalize().toString());
console.log(q.inverse().toString());

console.log('rotate pi/2');
var rx = q.rotate(PI / 2, 1, 0, 0);
console.log(rx.toString());

var ry = q.rotate(PI / 2, 0, 1, 0);
console.log(ry.toString());

var rz = q.rotate(PI / 2, 0, 0, 1);
console.log(rz.toString());

console.log('rotate pi/4');
rx = q.rotate(PI / 4, 1, 0, 0);
console.log(rx.toString());

ry = q.rotate(PI / 4, 0, 1, 0);
console.log(ry.toString());

rz = q.rotate(PI / 4, 0, 0, 1);
console.log(rz.toString());
