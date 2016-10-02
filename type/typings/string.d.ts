/// <reference path="./ktn.d.ts"/>
declare module '@ktn/string'{
  class Types {
    static LOWER: number;
    static UPPER: number;
    static DIGITS: number;
    static UNDERSCORE: number;
    static SIGN: number;
  }

  class Reg {
    static URI: RegExp;
    static XMLTag: RegExp;
    static CComment: RegExp;
    static LineComment: RegExp;
    static DoubleQuote: RegExp;
  }

  export default class StringUtil {
    static Types: Types;
    static Reg: Reg;

    public static format(str: string, ...argv: any[]): string;
    public static pyformat(str: string, ...argv: any[]): string;
    public static escapeHTML(s: string): string;
    public static escapeJS(s: string): string;
    public static trimLeft(s: string): string;
    public static trimRight(s: string): string;
    public static nobr(s: string): string;
    public static random(len: int, optFilter?: int): string;
  }
}
