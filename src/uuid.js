(function(exports){
'use strict';

var rnd = Math.random;

/**
 * @param {number} n
 * @param {number} len
 * @return {string}
 */
function hex(n, len) {
  var z;
  
  switch (len) {
  case 4: z = '0000'; break;
  case 8: z = '00000000'; break;
  case 12: z = '000000000000'; break;
  case 16: z = '0000000000000000'; break;
  default: throw new Error('invalid value: '+ len);
  }
  
  return (z + n.toString(16)).slice(-len);
}

/**
 * @param {Uuid} u
 * @param {string} id
 * @return {Uuid}
 */
function uuidStr(u, id) {
  if (id.charAt(0) === '{') {
    id = id.substring(1);
  }
  
  u._time_low = parseInt(id.substring(0, 8), 16);
  u._time_mid = parseInt(id.substring(9, 13), 16);
  u._version = parseInt(id.substring(14, 15), 16);
  u._time_hi = parseInt(id.substring(15, 18), 16);
  u._variant = 8;
  u._clock_seq = parseInt(id.substring(19, 23), 16) - (u._variant << 12);
  u._node = parseInt(id.substring(24), 16);
  
  return u;
}

/**
 * @param {number} n
 * @return {number}
 */
function rand(n) {
  if (n < 0) { return NaN; }
  if (n <= 30) { return (0 | rnd() * (1 << n)); }
  if (n <= 53) { return (0 | rnd() * (1 << 30))
                    + (0 | rnd() * (1 << (n - 30))) * (1 << 30); }
  return NaN;
}

/**
 * @param {Uuid} u
 * @return {string}
 */
function uuid4(u) {  
  u._time_low = rand(32);
  u._time_mid = rand(16);
  u._version = 4;
  u._time_hi = rand(12);
  u._variant = 8;
  u._clock_seq = rand(14);
  u._node = rand(48);
  
  return u.toString();
}

/**
 * A Universally Unique IDentifier (UUID) URN Namespace
 * @see http://www.ietf.org/rfc/rfc4122.txt
 *
 * @class Uuid
 */
function Uuid() {
  /**
   * 0xFFFFFFFF00000000
   * @private
   * @property {number} Uuid#_time_low
   */
  this._time_low = 0;
  
  /**
   * 0x00000000FFFF0000
   * @private
   * @property {number} Uuid#_time_mid
   */
  this._time_mid = 0;
  
  /**
   * 0x000000000000F000
   * @private
   * @property {number} Uuid#_version
   */
  this._version = 4;
  
  /**
   * 0x0000000000000FFF
   * @private
   * @property {number} Uuid#_time_hi
   */
  this._time_hi = 0;
  
  /**
   * 0xC000000000000000
   * @private
   * @property {number} Uuid#_variant
   */
  this._variant = 8;
  
  /**
   * 0x3FFF000000000000
   * @private
   * @property {number} Uuid#_clock_seq
   */
  this._clock_seq = 0;
  
  /**
   * 0x0000FFFFFFFFFFFF
   * @private
   * @property {number} Uuid#_node
   */
  this._node = 0;
}

Uuid.prototype = {
  /**
   * @const
   * @property Uuid#constructor
   * @type Uuid
   */
  constructor: Uuid,

  /**
   * @method Uuid#toString
   * @return {string}
   */
  toString: function() {
    return hex(this._time_low, 8) +'-'+ hex(this._time_mid, 4) +'-'+
      hex((this._version << 12) | this._time_hi, 4) +'-'+
      hex((this._variant << 12) | this._clock_seq, 4) +'-'+
      hex(this._node, 12);
  },

  /**
   * @method Uuid#fromString
   * @param {string} id
   * @return {Uuid}
   */
  fromString: function(id) {
    uuidStr(this, id);
    return this;
  },
  
  /**
   * @method Uuid#generate
   * @return {string}
   */
  generate: function() {
    switch (this._version) {
    case 4: return uuid4(this);
    default: throw new Error('invalid version: '+ this._version);
    }
  },
  
  /**
   * @method Uuid#clone
   * @return {Uuid}
   */
  clone: function() {
    var u = new Uuid();
    u._time_low = this._time_low;
    u._time_mid = this._time_mid;
    u._version = this._version;
    u._time_hi = this._time_hi;
    u._variant = this._variant;
    u._clock_seq = this._clock_seq;
    u._node = this._node;
    
    return u;
  },

  /**
   * @method Uuid#equals
   * @param {Uuid} u
   * @return {boolean}
   */
  equals: function(u) {
    return this._time_low === u._time_low &&
      this._time_mid === u._time_mid &&
      this._version === u._version &&
      this._time_hi === u._time_hi &&
      this._variant === u._variant &&
      this._clock_seq === u._clock_seq &&
      this._node === u._node;
  },
  
  /**
   * @return {number}
   */
  version: function() { return this._version; },
  
  /**
   * @return {number}
   */
  variant: function() { return this._variant; }
};

/**
 * @param {number} version
 * @return {Uuid}
 */
function uuid(ver) {
  ver = (ver | 0) || 4;
  if (1 <= ver && ver <= 5) {
    if (ver !== 4) { throw new Error('Not implemented version: '+ ver); }
    return new Uuid(ver);
  }
  
  throw new Error('invalid version: '+ ver);
}

// exports
exports.uuid = uuid;

}(typeof exports !== 'undefined' ? exports : this));