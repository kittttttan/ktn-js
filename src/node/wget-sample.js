'use strict';

const argv = process.argv;
const argc = argv.length;

let url = 'https://kittttttan.info/';
if (argc >= 3) {
  // help
  if (argv[2] === '-h' || argv[2] === '--help') {
    console.log(`Usage: node wget-sample.js [url]`);
    process.exit(1);
  }

  url = argv[2];
}

function main() {
  const wget = require('./wget').wget;
  const opt = {
    method: 'GET',
    filepath: 'wget_res.log',
    callback: function(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('done! save as '+ opt.filepath);
    }
  };

  wget(url, opt);
}

main();
