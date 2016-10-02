/// <reference path="./ktn.d.ts"/>

declare module '@ktn/enc/csv-json'{
  interface ToJsonOpt {
    sep?: string;
    prop?: string;
    space?: number|string;
  }

  interface ToCsvOpt {
    sep?: string;
    prop?: string;
  }

  export function csvToJson(s: string, column: string[], opt?: ToJsonOpt): string;
  function addLabel(labels: string[], label: string[], item: Object): void;
  function addValue(val: any[], item: Object): void;
  export function jsonToCsv(s: string, opt?: ToCsvOpt): string;
}