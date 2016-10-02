/// <reference path="./ktn.d.ts"/>
declare module '@ktn/iter'{
  export default class Iter {
    public static range(start: double, end?: double, step?: double): IterableIterator<double>;
    public static zip(...iterables: Iterable<any>[]): IterableIterator<any>;
  }
}
