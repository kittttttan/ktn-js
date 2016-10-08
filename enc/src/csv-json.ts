/// <reference path="../node_modules/@ktn/type/typings/ktn.d.ts" />
/**
 * convert CSV <-> JSON.
 */
'use strict';

/**
 * @typedef {Object} ToJsonOpt
 */
export interface ToJsonOpt {
  sep?: string;
  prop?: string;
  space?: number|string;
}

/**
 * @typedef {Object} ToCsvOpt
 */
export interface ToCsvOpt {
  sep?: string;
  prop?: string;
}

/**
 * CSV to JSON
 * @public
 * @param {!string} s CSV
 * @param {!Array<!string>} column
 * @param {ToJsonOpt=} opt
 * @return {!string} JSON
 */
export function csvToJson(s: string, column: string[], opt: ToJsonOpt = {}): string {
  const sep: string = opt.sep || '\t';

  const colLength: number = column.length;
  const lines: string[] = s.split(/[\r\n]+/);
  let json: Object = {};
  const items: Object[] = [];
  for (const line of lines) {
    if (!line) {
      continue;
    }
    const item: Object = {};
    const words: string[] = line.split(sep);
    for (let i: int = 0; i < colLength; ++i) {
      if (!column[i]) {
        throw new Error('Invalid CSV');
      }

      let word: any = words[i];
      let leaf: Object = item;
      let doParseInt: boolean = false;
      let doParseFloat: boolean = false;
      const clTypeArr: string[] = column[i].split(':');
      const clType: string = clTypeArr.length > 1 ? clTypeArr[1] : '';
      if (clType === 'i') {
        doParseInt = true;
      } else if (clType === 'n') {
        doParseFloat = true;
      }

      const com: string[] = clTypeArr[0].split('.');
      const cl: int = com.length;
      let k: int = 0;
      while (k < cl - 1) {
        if (typeof leaf[com[k]] === 'undefined') {
          leaf[com[k]] = {};
        }
        leaf = leaf[com[k]];
        ++k;
      }
      if (word.match(/^"[^"]*"$/)) {
        word = word.substring(1, word.length - 1);
      }
      if (doParseInt) {
        word = parseInt(word, 10);
      } else if (doParseFloat) {
        word = parseFloat(word);
      }
      leaf[com[k]] = word;
    }
    items.push(item);
  }
  if (opt.prop) {
    json[opt.prop] = items;
  } else {
    json = items;
  }
  return JSON.stringify(json, null, opt.space || undefined);
}

/**
 * @private
 * @param {Array<string>} labels
 * @param {Array<string>} label
 * @param {Object} item
 */
function addLabel(labels: string[], label: string[], item: Object): void {
  for (const prop in item) {
    label.push(prop);
    if (typeof item[prop] === 'object') {
      addLabel(labels, label, item[prop]);
    } else {
      labels.push(label.join('.'));
      label.pop();
    }
  }
  // console.debug(labels);
}

/**
 * @private
 * @param {Array<?>} val
 * @param {Object} item
 */
function addValue(val: any[], item: Object): void {
  for (const prop in item) {
    if (typeof item[prop] === 'object') {
      addValue(val, item[prop]);
    } else {
      val.push(item[prop]);
    }
  }
}

/**
 * JSON to CSV
 * @public
 * @param {string} s JSON formatted string
 * @param {ToCsvOpt=} opt
 * @return {string}
 */
export function jsonToCsv(s: string, opt: ToCsvOpt = {}): string {
  const sep: string = opt.sep || '\t';
  const json: Object = JSON.parse(s);
  // console.debug(json);

  const items: Object[] = opt.prop ? json[opt.prop] : json;
  const labels: string[] = [];
  addLabel(labels, [], items[0]);
  // console.debug(labels);
  let csv: string = labels.join(sep);
  csv += '\r\n';
  for (const item of items) {
    const val: any[] = [];
    addValue(val, item);
    csv += val.join(sep);
    csv += '\r\n';
  }
  return csv;
}
