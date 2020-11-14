'use strict';

export function isInt(s: string): boolean {
  return /^\+?(0|[1-9]\d*)$/.test(s);
}
