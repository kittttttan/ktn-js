'use strict';

/**
 * @private
 * @const
 * @type function(): number
 */
const rnd: () => number = Math.random;

/**
 * A Universally Unique IDentifier (UUID) URN Namespace
 * @see http://www.ietf.org/rfc/rfc4122.txt
 *
 * @class Uuid
 * @property {int} Uuid#_timeLow  0xFFFFFFFF00000000
 * @property {int} Uuid#_timeMid  0x00000000FFFF0000
 * @property {int} Uuid#_version  0x000000000000F000
 * @property {int} Uuid#_timeHi   0x0000000000000FFF
 * @property {int} Uuid#_variant  0xC000000000000000
 * @property {int} Uuid#_clockSeq 0x3FFF000000000000
 * @property {int} Uuid#_node     0x0000FFFFFFFFFFFF
 */
export default class Uuid {
  protected _timeLow: int;
  protected _timeMid: int;
  protected _version: int;
  protected _timeHi: int;
  protected _variant: int;
  protected _clockSeq: int;
  protected _node: int;

  /**
   * Initialize
   * @param {?int=} ver
   */
  constructor(ver: int = 4) {
    this._timeLow = 0;
    this._timeMid = 0;
    this._version = ver;
    this._timeHi = 0;
    this._variant = 8;
    this._clockSeq = 0;
    this._node = 0;
  }

  /**
   * @param {?int=} ver
   * @return {!Uuid}
   */
  public static uuid(ver: int = 4): Uuid {
    if (1 <= ver && ver <= 5) {
      if (ver !== 4) { throw new Error(`Not implemented version: ${ver}`); }
      return new Uuid(ver);
    }

    throw new Error(`invalid version: ${ver}`);
  }

  /**
   * @method Uuid#toString
   * @return {string}
   */
  public toString(): string {
    const timeLow: string = hex(this._timeLow, 8);
    const timeMid: string = hex(this._timeMid, 4);
    const version: string = hex((this._version << 12) | this._timeHi, 4);
    const variant: string = hex((this._variant << 12) | this._clockSeq, 4);
    const node: string = hex(this._node, 12);

    return `${timeLow}-${timeMid}-${version}-${variant}-${node}`;
  }

  /**
   * @method Uuid#fromString
   * @param {string} id
   * @return {Uuid}
   */
  public fromString(id: string): Uuid {
    if (id.charAt(0) === '{') {
      id = id.substring(1);
    }

    const u: Uuid = this;
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
   * @method Uuid#generate
   * @return {string}
   */
  public generate(): string {
    switch (this._version) {
    case 4:
      const u: Uuid = this;
      u._timeLow = rand(32);
      u._timeMid = rand(16);
      u._version = 4;
      u._timeHi = rand(12);
      u._variant = 8;
      u._clockSeq = rand(14);
      u._node = rand(48);
      return u.toString();
    default:
      throw new Error(`invalid version: ${this._version}`);
    }
  }

  /**
   * @method Uuid#clone
   * @return {Uuid}
   */
  public clone(): Uuid {
    const u: Uuid = new Uuid();
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
  public equals(u: Uuid): boolean {
    return this._timeLow === u._timeLow &&
      this._timeMid === u._timeMid &&
      this._version === u._version &&
      this._timeHi === u._timeHi &&
      this._variant === u._variant &&
      this._clockSeq === u._clockSeq &&
      this._node === u._node;
  }

  /**
   * @return {int}
   */
  get version(): int { return this._version; }

  /**
   * @return {int}
   */
  get variant(): int { return this._variant; }
}

/**
 * @private
 * @param {int} n
 * @param {int} len
 * @return {string}
 */
function hex(n: int, len: int): string {
  let z: string;

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
 * @param {int} n
 * @return {int}
 */
function rand(n: int): int {
  if (n < 0) { return NaN; }
  if (n <= 30) { return (0 | rnd() * (1 << n)); }
  if (n <= 53) { return (0 | rnd() * (1 << 30))
                    + (0 | rnd() * (1 << (n - 30))) * (1 << 30); }
  return NaN;
}
