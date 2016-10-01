interface Array<T> {
  includes(a: any): boolean;
}

interface String {
  includes(searchString: string, position?: number): boolean;
  repeat(count: number): string;
}