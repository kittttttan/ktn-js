interface String {
  repeat(n: number): string;
}

interface Array {
  includes(a: any): boolean;
}

declare class Reflect {
  static apply(a: any, b: any, c: any): any;
}
