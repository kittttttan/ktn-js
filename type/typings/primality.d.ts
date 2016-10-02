/// <reference path="./ktn.d.ts"/>
declare module '@ktn/primality'{
  export default class Primality {
    public static generate(): IterableIterator<int>;
    public static top(n: int): IterableIterator<int>;
    public static max(n: int): IterableIterator<int>;
    public static sieveMax(n: int): IterableIterator<int>;
    public static modMathPow(base: int, power: int, mod: int): int;
    public static mrpt(n: int): boolean;
  }
}
