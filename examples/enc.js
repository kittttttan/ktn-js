var Enc = require('../js/enc.js');
Encode = Enc.Encode;
Decode = Enc.Decode;

var max = 7;
var i, j;
var bits;
var encs = [];

console.log('*** unary ***');
for (i = 0; i < max; ++i) {
  encs[i] = Encode.unary(i + 1);
  console.log((i + 1) +' -> '+ encs[i]);
}

bits = '';
for (i = 0; i < max; ++i) {
  console.log(encs[i] +' -> '+ Decode.unary(encs[i]));
  bits += encs[i];
}

console.log(bits +' -> '+ Decode.unary(bits));


console.log('*** Elias Gamma ***');
for (i = 0; i < max; ++i) {
  encs[i] = Encode.eliasGamma(i + 1);
  console.log((i + 1) +' -> '+ encs[i]);
}

bits = '';
for (i = 0; i < max; ++i) {
  console.log(encs[i] +' -> '+ Decode.eliasGamma(encs[i]));
  bits += encs[i];
}

console.log(bits +' -> '+ Decode.eliasGamma(bits));


console.log('*** Elias Delta ***');
for (i = 0; i < max; ++i) {
  encs[i] = Encode.eliasDelta(i + 1);
  console.log((i + 1) +' -> '+ encs[i]);
}

bits = '';
for (i = 0; i < max; ++i) {
  console.log(encs[i] +' -> '+ Decode.eliasDelta(encs[i]));
  bits += encs[i];
}

console.log(bits +' -> '+ Decode.eliasDelta(bits));


console.log('*** Elias Omega ***');
for (i = 0; i < max; ++i) {
  encs[i] = Encode.eliasOmega(i + 1);
  console.log((i + 1) +' -> '+ encs[i]);
}

bits = '';
for (i = 0; i < max; ++i) {
  console.log(encs[i] +' -> '+ Decode.eliasOmega(encs[i]));
  bits += encs[i];
}

console.log(bits +' -> '+ Decode.eliasOmega(bits));


console.log('*** Golomb ***');
for (j = 4; j < 7; ++j) {
  console.log('m='+ j);

  for (i = 0; i < 13; ++i) {
    encs[i] = Encode.golomb(i, j);
    console.log(i +' -> '+ encs[i]);
  }
  /*
  bits = '';
  for (i = 0; i < max; ++i) {
    console.log(encs[i] +' -> '+ Decode.golomb(encs[i]));
    bits += encs[i];
  }

  console.log(bits +' -> '+ Decode.golomb(bits));
  */
}
