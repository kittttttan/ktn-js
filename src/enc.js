(function(exports){
'use strict';

var StringUtil = exports.StringUtil;
if (typeof require !== 'undefined') {
  StringUtil = require('./string.js').StringUtil;
}
var repeat = StringUtil.repeat;

/**
 * Encode
 * @class Encode
 */
var Encode = {
  /**
   * @method Encode.unary
   * @param {number}  n     natural number
   * @param {boolean} [alt]   
   * @return {string} unary coding
   */
  unary: function(n, alt) {
    if (n < 0) { return undefined; }
    
    var former;
    var latter;
    if (alt) {
      former = '0';
      latter = '1';
    } else {
      former = '1';
      latter = '0';
    }
    
    return repeat(former, n) + latter;
  },
  
  /**
   * @method Encode.eliasGamma
   * @param {number}  n     natural number
   * @return {string} Elias gamma coding
   */
  eliasGamma: function(n) {
    if (n < 1) { return undefined; }
    
    var bin = n.toString(2);
    return repeat('0', bin.length - 1) + bin;
  },
  
  /**
   * @method Encode.eliasDelta
   * @param {number} n natural number
   * @return {string} Elias delta coding
   */
  eliasDelta: function(n) {
    if (n < 1) { return undefined; }
    
    var bin = n.toString(2);
    var gamma = Encode.eliasGamma(bin.length);
    return gamma + bin.substring(1);
  },
  
  /**
   * @method Encode.eliasOmega
   * @param {number} n natural number
   * @return {string} Elias omega coding
   */
  eliasOmega: function(n) {
    if (n < 1) { return undefined; }
    
    var res = '0';
    var bin;
    while (n > 1) {
      bin = n.toString(2);
      res = bin + res;
      n = bin.length - 1;
    }
    
    return res;
  },
  
  /**
   * @method Encode.golomb
   * @param {number} n   natural number
   * @param {number} [m] 
   * @return {string} Golomb coding
   */
  golomb: function(n, m) {
    if (n < 0) { return undefined; }

    m = (m | 0) || 8;
    if (m < 1) { return undefined; }
    
    var q = n / m | 0;
    var r = n % m;
    var bin = m.toString(2);
    var b = bin.length - 1;
    var isBin = (b !== 1) && !(b & (b - 1));
    
    var res = Encode.unary(q, true);
    if (isBin) {
      res += (repeat('0', b) + r.toString(2)).slice(-b);
    } else {
      ++b;
      if (r < (1 << b) - m) {
        res += (repeat('0', b - 1) + r.toString(2)).slice(-(b - 1));
      } else {
        res += (repeat('0', b) + (r + (1 << b) - m).toString(2)).slice(-b);
      }
    }
    //console.log('m=%d, b=%d (bin=%s), 2^b-m=%d, r=%d',
    //    m, b, (isBin?'true':'false'), (1<<b)-m, r);
    
    return res;
  }
};

/**
 * Decode
 * @class Decode
 */
var Decode = {
  /**
   * @method Decode.unary
   * @param {string}  str
   * @param {boolean} alt
   * @return {number[]} natural number
   */
  unary: function(str, alt) {
    var res = [];
    if (!str) { return res; }
    
    var former;
    var latter;
    if (alt) {
      former = '0';
      latter = '1';
    } else {
      former = '1';
      latter = '0';
    }
    
    var cnt = 0;
    var l = str.length;
    for (var i = 0; i < l; ++i) {
      switch (str.charAt(i)) {
      case former:
        ++cnt;
        break;
      case latter:
        res.push(cnt);
        cnt = 0;
        break;
      default:
        throw new Error('Parse Error: '+ str +'  at '+ i);
      }
    }
    
    return res;
  },
  
  /**
   * @method Decode.eliasGamma
   * @param {string} str
   * @return {number[]} natural number
   */
  eliasGamma: function(str) {
    var res = [];
    if (!str) { return res; }
    
    var l = str.length;
    var cnt = 0;
    var bin = '';
    var i;
    //var j;
    for (i = 0; i < l; ++i) {
      if (str.charAt(i) === '0') {
        ++cnt;
      } else if (str.charAt(i) === '1') {
        bin = str.substr(i, cnt + 1);
        i += cnt + 1;
        /*
        bin = '';
        for (j = 0; j < cnt + 1; ++j) {
          bin += str.charAt(i);
          ++i;
        }
        */
        res.push(parseInt(bin, 2));
        cnt = 0;
        --i;
      } else {
        throw new Error('Parse Error: '+ str +'  at '+ i);
      }
    }
    
    return res;
  },
  
  /**
   * @method Decode.eliasDelta
   * @param {string} str
   * @return {number[]} natural number
   */
  eliasDelta: function(str) {
    var res = [];
    if (!str) { return res; }
    
    var l = str.length;
    var cnt = 0;
    var bin = '';
    var gamma;
    var i;
    //var j, k;
    for (i = 0; i < l; ++i) {
      if (str.charAt(i) === '0') {
        ++cnt;
      } else if (str.charAt(i) === '1') {
        bin = str.substr(i, cnt + 1);
        i += cnt + 1;
        /*
        bin = '';
        for (j = 0; j < cnt + 1; ++j) {
          bin += str.charAt(i);
          ++i;
        }
        */
        gamma = parseInt(bin, 2);
        
        bin = '1' + str.substr(i, gamma - 1);
        i += gamma - 1;
        /*
        bin = '1';
        for (k = 0; k < gamma - 1; ++k) {
          bin += str.charAt(i);
          ++i;
        }
        */
        res.push(parseInt(bin, 2));
        
        cnt = 0;
        --i;
      } else {
        throw new Error('Parse Error: '+ str +'  at '+ i);
      }
    }
    
    return res;
  },
  
  /**
   * @method Decode.eliasOmega
   * @param {string} str
   * @return {number[]} natural number
   */
  eliasOmega: function(str) {
    var res = [];
    if (!str) { return res; }
    
    var n = 1;
    var l = str.length;
    var bin = '';
    var i;
    //var j;
    for (i = 0; i < l; ++i) {
      if (str.charAt(i) === '0') {
        res.push(n);
        n = 1;
      } else {
        bin = str.substr(i, n + 1);
        i += n + 1;
        /*
        bin = '';
        for (j = 0; j < n + 1; ++j) {
          bin += str.charAt(i);
          ++i;
        }
        */
        n = parseInt(bin, 2);
        --i;
      }
    }
    
    return res;
  }
};

// exports
exports.Encode = Encode;
exports.Decode = Decode;

}(typeof exports !== 'undefined' ? exports : this));
