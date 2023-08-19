export interface ConstItem {
  toString: () => string;
  calc: () => number;
}

export function PI(): ConstItem {
  return Object.freeze({
    calc: (): number => Math.PI,
    toString: (): string => 'pi',
  });
}

export function E(): ConstItem {
  return Object.freeze({
    calc: (): number => Math.E,
    toString: (): string => 'e',
  });
}
