/**
 * @private
 * @const
 * @type function(): number
 */
const rnd = Math.random;

/**
 * A Universally Unique IDentifier (UUID) URN Namespace
 * @see http://www.ietf.org/rfc/rfc4122.txt
 *
 * @class Uuid
 */
export class Uuid {
  /**
   * @param {?number=} ver
   * @return {!Uuid}
   */
  static uuid(ver) {
    ver = (ver | 0) || 4;
    if (1 <= ver && ver <= 5) {
      if (ver !== 4) { throw new Error(`Not implemented version: ${ver}`); }
      return new Uuid(ver);
    }

    throw new Error(`invalid version: ${ver}`);
  }

  /**
   * Initialize
   * @param {?number=} ver
   */
  constructor(ver) {
    /**
     * 0xFFFFFFFF00000000
     * @private
     * @property {number} Uuid#_timeLow
     */
    this._timeLow = 0;

    /**
     * 0x00000000FFFF0000
     * @private
     * @property {number} Uuid#_timeMid
     */
    this._timeMid = 0;

    /**
     * 0x000000000000F000
     * @private
     * @property {number} Uuid#_version
     */
    this._version = 4;

    /**
     * 0x0000000000000FFF
     * @private
     * @property {number} Uuid#_timeHi
     */
    this._timeHi = 0;

    /**
     * 0xC000000000000000
     * @private
     * @property {number} Uuid#_variant
     */
    this._variant = 8;

    /**
     * 0x3FFF000000000000
     * @private
     * @property {number} Uuid#_clockSeq
     */
    this._clockSeq = 0;

    /**
     * 0x0000FFFFFFFFFFFF
     * @private
     * @property {number} Uuid#_node
     */
    this._node = 0;
  }

  /**
   * @method Uuid#toString
   * @return {string}
   */
  toString() {
    const timeLow = hex(this._timeLow, 8);
    const timeMid = hex(this._timeMid, 4);
    const version = hex((this._version << 12) | this._timeHi, 4);
    const variant = hex((this._variant << 12) | this._clockSeq, 4);
    const node = hex(this._node, 12);

    return `${timeLow}-${timeMid}-${version}-${variant}-${node}`;
  }

  /**
   * @method Uuid#fromString
   * @param {string} id
   * @return {Uuid}
   */
  fromString(id) {
    uuidStr(this, id);
    return this;
  }

  /**
   * @method Uuid#generate
   * @return {string}
   */
  generate() {
    switch (this._version) {
    case 4: return uuid4(this);
    default: throw new Error(`invalid version: ${this._version}`);
    }
  }

  /**
   * @method Uuid#clone
   * @return {Uuid}
   */
  clone() {
    const u = new Uuid();
    u._timeLow = this._timeLow;
    u._timeMid = this._timeMid;
    u._version = this._version;
    u._timeHi = this._timeHi;
    u._variant = this._variant;
    u._clockSeq = this._clockSeq;
    u._node = this._node;

    return u;
  }

  /**
   * @method Uuid#equals
   * @param {Uuid} u
   * @return {boolean}
   */
  equals(u) {
    return this._timeLow === u._timeLow &&
      this._timeMid === u._timeMid &&
      this._version === u._version &&
      this._timeHi === u._timeHi &&
      this._variant === u._variant &&
      this._clockSeq === u._clockSeq &&
      this._node === u._node;
  }

  /**
   * @return {number}
   */
  get version() { return this._version; }

  /**
   * @return {number}
   */
  get variant() { return this._variant; }
}

/**
 * @private
 * @param {number} n
 * @param {number} len
 * @return {string}
 */
function hex(n, len) {
  let z;

  switch (len) {
  case 4: z = '0000'; break;
  case 8: z = '00000000'; break;
  case 12: z = '000000000000'; break;
  case 16: z = '0000000000000000'; break;
  default: throw new Error(`invalid value: ${len}`);
  }

  return (z + n.toString(16)).slice(-len);
}

/**
 * @private
 * @param {Uuid} u
 * @param {string} id
 * @return {Uuid}
 */
function uuidStr(u, id) {
  if (id.charAt(0) === '{') {
    id = id.substring(1);
  }

  u._timeLow = parseInt(id.substring(0, 8), 16);
  u._timeMid = parseInt(id.substring(9, 13), 16);
  u._version = parseInt(id.substring(14, 15), 16);
  u._timeHi = parseInt(id.substring(15, 18), 16);
  u._variant = 8;
  u._clockSeq = parseInt(id.substring(19, 23), 16) - (u._variant << 12);
  u._node = parseInt(id.substring(24), 16);

  return u;
}

/**
 * @private
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
 * @private
 * @param {Uuid} u
 * @return {string}
 */
function uuid4(u) {
  u._timeLow = rand(32);
  u._timeMid = rand(16);
  u._version = 4;
  u._timeHi = rand(12);
  u._variant = 8;
  u._clockSeq = rand(14);
  u._node = rand(48);

  return u.toString();
}
