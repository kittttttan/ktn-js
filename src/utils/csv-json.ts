/**
 * convert CSV <-> JSON.
 */

export interface ToJsonOpt {
  sep?: string;
  prop?: string;
  space?: number|string;
}

export interface ToCsvOpt {
  sep?: string;
  prop?: string;
}

/**
 * CSV to JSON
 */
export function csvToJson(s: string, column: string[], opt: ToJsonOpt = {}): string {
  const sep = opt.sep || '\t';

  const colLength = column.length;
  const lines = s.split(/[\r\n]+/);
  let json: Record<string, any> = {};
  const items: Record<string, any>[] = [];
  for (const line of lines) {
    if (!line) {
      continue;
    }
    const item: Record<string, any> = {};
    const words = line.split(sep);
    for (let i = 0; i < colLength; ++i) {
      if (!column[i]) {
        throw new Error('Invalid CSV');
      }

      let word: any = words[i];
      let leaf: Record<string, any> = item;
      let doParseInt = false;
      let doParseFloat = false;
      const clTypeArr = column[i].split(':');
      const clType = clTypeArr.length > 1 ? clTypeArr[1] : '';
      if (clType === 'i') {
        doParseInt = true;
      } else if (clType === 'n') {
        doParseFloat = true;
      }

      const com = clTypeArr[0].split('.');
      const cl = com.length;
      let k = 0;
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

function addLabel(labels: string[], label: string[], item: any): void {
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

function addValue(val: any[], item: any): void {
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
 */
export function jsonToCsv(s: string, opt: ToCsvOpt = {}): string {
  const sep = opt.sep || '\t';
  const json: any = JSON.parse(s);
  // console.debug(json);

  const items: any[] = opt.prop ? json[opt.prop] : json;
  const labels: string[] = [];
  addLabel(labels, [], items[0]);
  // console.debug(labels);
  let csv = labels.join(sep);
  csv += '\r\n';
  for (const item of items) {
    const val: any[] = [];
    addValue(val, item);
    csv += val.join(sep);
    csv += '\r\n';
  }
  return csv;
}
