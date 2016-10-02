/// <reference path="./ktn.d.ts"/>
declare module '@ktn/strconv'{
  export default class StringConverter {
    public static toZenkaku(str: string): string;
    public static toZenkakuKatakana(str: string): string;
    public static toHankaku(str: string): string;
    public static toHankakuKatakana(str: string): string;
    public static toKatakana(str: string): string;
    public static toHiragana(str: string): string;
    public static proper(str: string): string;
    public static convert(str: string, option: int): string;
  }
}
