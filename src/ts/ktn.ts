/**
 * Basic interface
 */

module Ktn {

export interface Field {
  clone();

  toString(): string;
  html?();
  tex?();

  sign: boolean;
  neg();
  abs();

  cmp(a): number;
  eq(a): boolean;
  equal(a): boolean;

  add(a);
  sub(a);
  mul(a);
  div(a);
  pow(a);
  inv?();
}

}
