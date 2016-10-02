/// <reference path="./ktn.d.ts"/>
declare module '@ktn/date'{
  export default class DateUtil {
    public static isLeapYear(y: int): boolean;
    public static getDaysInMonth(y: int, m: int): int;
    public static format(s: string, d: Date): string;
  }
}