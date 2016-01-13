/**
 * convert CSV <-> JSON.
 */

interface toJsonOpt {
  sep?: string;
  prop?: string;
  space?: number|string;
}

interface toCsvOpt {
  sep?: string;
  prop?: string;
}

/**
 * CSV to JSON
 * @public
 * @param {!string} s CSV
 * @param {!Array<!string>} column
 * @param {Object=} opt
 * @return {!string} JSON
 */
export function csvToJson(s, column, opt: toJsonOpt = {}) {
  const sep = opt.sep || '\t';

  const colLength = column.length;
  const lines = s.split(/[\r\n]+/);
  let json = {};
  const items = [];
  for (const line of lines) {
    if (!line) {
      continue;
    }
    const item = {};
    const words = line.split(sep);
    for (let i = 0; i < colLength; ++i) {
      if (!column[i]) {
        throw new Error('Invalid CSV');
      }

      let word = words[i];
      let leaf = item;
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
  return JSON.stringify(json, null, opt.space || null);
}

/**
 * @private
 * @param {Array<string>} labels
 * @param {Array<string>} label
 * @param {Object} item
 */
function addLabel(labels, label, item) {
  for (const prop in item) {
    label.push(prop);
    if (typeof item[prop] === 'object') {
      addLabel(labels, label, item[prop]);
    } else {
      labels.push(label.join('.'));
      label.pop();
    }
  }
  //console.debug(labels);
}

/**
 * @private
 * @param {Array<?>} val
 * @param {Object} item
 */
function addValue(val, item) {
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
 * @param {Object=} opt
 * @return {string}
 */
export function jsonToCsv(s, opt: toCsvOpt = {}) {
  const sep = opt.sep || '\t';
  const json = JSON.parse(s);
  //console.debug(json);

  const items = opt.prop ? json[opt.prop] : json;
  const labels = [];
  addLabel(labels, [], items[0]);
  //console.debug(labels);
  let csv = labels.join(sep);
  csv += '\r\n';
  for (const item of items) {
    const val = [];
    addValue(val, item);
    csv += val.join(sep);
    csv += '\r\n';
  }
  return csv;
}
