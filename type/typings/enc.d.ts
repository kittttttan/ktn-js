/// <reference path="./ktn.d.ts"/>

declare module '@ktn/enc'{
  export class Encode {
    public static unary(n: int, alt?: boolean): string;
    public static eliasGamma(n: int): string;
    public static eliasDelta(n: int): string;
    public static eliasOmega(n: int): string;
    public static golomb(n: int, m?: int): string;
  }

  export class Decode {
    public static unary(str: string, alt?: boolean): int[];
    public static eliasGamma(str: string): int[];
    public static eliasDelta(str: string): int[];
    public static eliasOmega(str: string): int[];
  }
}