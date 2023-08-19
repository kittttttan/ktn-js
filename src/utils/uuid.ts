const rnd: () => number = Math.random;

/**
 * A Universally Unique IDentifier (UUID) URN Namespace
 * @see http://www.ietf.org/rfc/rfc4122.txt
 */
export class Uuid {
  protected _timeLow: number;
  protected _timeMid: number;
  protected _version: number;
  protected _timeHi: number;
  protected _variant: number;
  protected _clockSeq: number;
  protected _node: number;

  constructor(ver = 4) {
    this._timeLow = 0;
    this._timeMid = 0;
    this._version = ver;
    this._timeHi = 0;
    this._variant = 8;
    this._clockSeq = 0;
    this._node = 0;
  }

  public static uuid(ver = 4): Uuid {
    if (1 <= ver && ver <= 5) {
      if (ver !== 4) { throw new Error(`Not implemented version: ${ver}`); }
      return new Uuid(ver);
    }

    throw new Error(`invalid version: ${ver}`);
  }

  public toString(): string {
    const timeLow: string = hex(this._timeLow, 8);
    const timeMid: string = hex(this._timeMid, 4);
    const version: string = hex((this._version << 12) | this._timeHi, 4);
    const variant: string = hex((this._variant << 12) | this._clockSeq, 4);
    const node: string = hex(this._node, 12);

    return `${timeLow}-${timeMid}-${version}-${variant}-${node}`;
  }

  public fromString(id: string): Uuid {
    if (id.charAt(0) === '{') {
      id = id.substring(1);
    }

    this._timeLow = parseInt(id.substring(0, 8), 16);
    this._timeMid = parseInt(id.substring(9, 13), 16);
    this._version = parseInt(id.substring(14, 15), 16);
    this._timeHi = parseInt(id.substring(15, 18), 16);
    this._variant = 8;
    this._clockSeq = parseInt(id.substring(19, 23), 16) - (this._variant << 12);
    this._node = parseInt(id.substring(24), 16);

    return this;
  }

  public generate(): string {
    switch (this._version) {
    case 4:
      this._timeLow = rand(32);
      this._timeMid = rand(16);
      this._version = 4;
      this._timeHi = rand(12);
      this._variant = 8;
      this._clockSeq = rand(14);
      this._node = rand(48);
      return this.toString();
    default:
      throw new Error(`invalid version: ${this._version}`);
    }
  }

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

  public equals(u: Uuid): boolean {
    return this._timeLow === u._timeLow &&
      this._timeMid === u._timeMid &&
      this._version === u._version &&
      this._timeHi === u._timeHi &&
      this._variant === u._variant &&
      this._clockSeq === u._clockSeq &&
      this._node === u._node;
  }

  get version(): number { return this._version; }
  get variant(): number { return this._variant; }
}

function hex(n: number, len: number): string {
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

function rand(n: number): number {
  if (n < 0) { return NaN; }
  if (n <= 30) { return (0 | rnd() * (1 << n)); }
  if (n <= 53) { return (0 | rnd() * (1 << 30))
                    + (0 | rnd() * (1 << (n - 30))) * (1 << 30); }
  return NaN;
}
