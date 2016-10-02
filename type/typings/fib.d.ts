/// <reference path="./ktn.d.ts"/>
declare module '@ktn/fib'{
  export default class Fibonacci {
    public static _fib(n: int): int;
    public static fib(n: int): int;
    public static top(n: int): IterableIterator<int>;
    public static max(n: int): IterableIterator<int>;
  }
}