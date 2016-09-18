import {csvToJson, jsonToCsv} from 'ktn-js/ts/csv-json';

function main() {
  let json = {
    dummy: 0,
    items: [
      {
        i: 1,
        f: 0.1,
        s: 's1'
      },
      {
        i: 2,
        f: 0.2,
        s: 's2'
      }
    ]
  };
  let s: string = JSON.stringify(json);
  //let column = [
  //  'i',
  //  's'
  //];
  let opt = {
    sep: '\t',
    prop: 'items'
  };

  let res: string = jsonToCsv(s, opt);

  console.log('jsonToCsv');
  console.log(s);
  console.log(opt);
  console.log(res);
}

main();
