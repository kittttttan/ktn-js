/**
 * @fileOverview MT19937 for JavaScript
 * @see ported from http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
 * @example
 *   var r = new Random();
 *   r.int32(); // for integer
 *   r.real2(); // for real number
 *   (r.real2() * 7 | 0) + 1; // 1 to 7
 */

(function(exports){
'use strict';

/**
 * @const
 * @type number
 */
var N = 624;

/**
 * @const
 * @type number
 */
var M = 397;

/**
 * constant vector a
 * @const
 * @type number
 */
var MATRIX_A = 0x9908b0df;

/**
 * most significant w-r bits
 * @const
 * @type number
 */
var UPPER_MASK = 0x80000000;

/**
 * least significant r bits
 * @const
 * @type number
 */
var LOWER_MASK = 0x7fffffff;

/**
 * 2^32
 * @const
 * @type number
 */
var REV32 = 1.0 / 4294967296.0;

/**
 * 2^32-1
 * @const
 * @type number
 */
var REV32_1 = 1.0 / 4294967295.0;

/**
 * Random
 * @class Random
 */
function Random() {
  /**
   * @private
   * @property {number[]} Random#mt
   */
	this.mt = new Uint32Array(N);
	
  /**
   * mti==N+1 means mt[N] is not initialized
   * @private
   * @property {number} Random#mti
   */
	this.mti = N + 1;

	var seed = (new Date()).getTime()|0;
	this.init(seed);
	//this.initByArray([seed], 1);
}

/**
 * initializes mt[N] with a seed
 * @param {number} seed
 */
Random.prototype.init = function(seed) {
	seed = seed|0;
	
	var mt = this.mt;
	mt[0] = seed;
	
	var s = 0;
	for (var i = 1; i < N; i = i+1|0) {
		s = mt[i - 1] ^ (mt[i - 1] >>> 30);
		mt[i] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
		    (s & 0x0000ffff) * 1812433253) + i;
		mt[i] >>>= 0;
	}
	
	this.mti = N;
};

/**
 * initialize by an array with array-length
 * @param {number[]} init_key the array for initializing keys
 */
Random.prototype.initByArray = function(init_key) {
	this.init(19650218);
	
	var i = 1;
	var j = 0;
	var l = init_key.length;
	var k = N > l ? N : l;
	var s = 0;
	var mt = this.mt;
	for (; k; --k) {
		s = mt[i - 1] ^ (mt[i - 1] >>> 30);
		mt[i] = (mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) +
		    ((s & 0x0000ffff) * 1664525))) + init_key[j] + j; // non linear
		mt[i] >>>= 0; // for WORDSIZE > 32 machines
		++i;
		++j;
		if (i >= N) {
  		mt[0] = mt[N - 1];
  		i = 1;
		}
		if (j >= l) { j = 0; }
	}
	
	for (k = N - 1; k; --k) {
		s = mt[i - 1] ^ (mt[i - 1] >>> 30);
		mt[i] = (mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) +
		    (s & 0x0000ffff) * 1566083941)) - i; // non linear
		mt[i] >>>= 0; // for WORDSIZE > 32 machines
		++i;
		if (i >= N) { mt[0] = mt[N - 1]; i = 1; }
	}

	mt[0] = 0x80000000; // MSB is 1; assuring non-zero initial array
};
 
/**
 * @return a random number on [0,0xffffffff]-interval
 */
Random.prototype.int32 = function() {
	var mag01 = [];
	//var mag01 = new Uint32Array(2);
	mag01[0] = 0;
	mag01[1] = MATRIX_A;

	var y = 0;
	var kk = 0;
	var mt = this.mt;
	if (this.mti >= N) { /* generate N words at one time */
		if (this.mti === N + 1) {   /* if init() has not been called, */
			this.init(5489); /* a default initial seed is used */
		}

		for (kk = 0; kk < N - M; kk = kk+1|0) {
			y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
			mt[kk] = mt[kk + M] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		for (; kk < N - 1; kk = kk+1|0) {
			y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
			mt[kk] = mt[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);
		mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

		this.mti = 0;
	}

	y = mt[this.mti++];

	// Tempering
	y ^= (y >>> 11);
	y ^= (y << 7) & 0x9d2c5680;
	y ^= (y << 15) & 0xefc60000;
	y ^= (y >>> 18);

	return y >>> 0;
};

/**
 * @return a random number on [0,0x7fffffff]-interval
 */
Random.prototype.int31 = function() {
	return (this.int32() >>> 1);
};

/**
 * @return a random number on [0,1]-real-interval
 */
Random.prototype.real1 = function() {
	return this.int32() * REV32_1; 
};

/**
 * @return a random number on [0,1)-real-interval
 */
Random.prototype.real2 = function() {
  return this.int32() * REV32; 
};

/**
 * @return a random number on (0,1)-real-interval
 */
Random.prototype.real3 = function() {
	return (this.int32() + 0.5) * REV32; 
};

// exports
exports.Random = Random;

}(typeof exports !== 'undefined' ? exports : this));
