/**
 * convert CSV <-> JSON.
 */

/**
 * CSV to JSON
 * @param {!string} s CSV
 * @param {!Array<!string>} column
 * @param {Object=} opt
 * @return {!string} JSON
 */
export function csvToJson(s, column, opt={}) {
  const sep = opt.sep || '\t';

  const colLength = column.length;
  const lines = s.split(/[\r\n]+/);
  let json = {};
  const items = [];
  for (let line of lines) {
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
      let clTypeArr = column[i].split(':');
      let clType = clTypeArr.length > 1 ? clTypeArr[1] : '';
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
 * @param {Array<string>} labels
 * @param {Array<string>} label
 * @param {Object} item
 */
function addLabel(labels, label, item) {
  for (let prop in item) {
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
 * @param {Array<?>} val
 * @param {Object} item
 */
function addValue(val, item) {
  for (let prop in item) {
    if (typeof item[prop] === 'object') {
      addValue(val, item[prop]);
    } else {
      val.push(item[prop]);
    }
  }
}

/**
 * JSON to CSV
 * @param {string} s JSON formatted string
 * @param {Object=} opt
 * @return {string}
 */
export function jsonToCsv(s, opt={}) {
  let sep = opt.sep || '\t';
  let json = JSON.parse(s);
  //console.debug(json);

  let items = opt.prop ? json[opt.prop] : json;
  const labels = [];
  addLabel(labels, [], items[0]);
  //console.debug(labels);
  let csv = labels.join(sep);
  csv += '\r\n';
  for (let item of items) {
    let val = [];
    addValue(val, item);
    csv += val.join(sep);
    csv += '\r\n';
  }
  return csv;
}
