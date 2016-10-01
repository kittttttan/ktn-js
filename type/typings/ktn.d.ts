/// <reference path="./polyfill.d.ts" />
/**
 * Basic type and interface
 */

/**
 * @typedef {number} int
 * @typedef {number} double
 * @typedef {number} float
 */
declare type int = number;
declare type double = number;
declare type float = number;

/**
 * for @ktn modules
 */
declare namespace ktn {

  interface Field {
    sign: boolean;
    neg(): any;
    abs(): any;

    clone(): any;

    toString(): string;
    html?(): string;
    tex?(): string;

    cmp(a: any): number;
    eq(a: any): boolean;
    equal(a: any): boolean;

    add(a: any): any;
    sub(a: any): any;
    mul(a: any): any;
    div(a: any): any;
    pow(a: any): any;
    inv?(): any;
  }
}