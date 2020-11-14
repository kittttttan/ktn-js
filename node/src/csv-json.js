const fs = require("fs");
const utils = require("ktn/utils");
try {
    const argv = process.argv;
    if (argv.length <= 2) {
        console.log('  node csv-json.js input');
        process.exit(1);
    }
    const src = argv[2];
    main(src);
}
catch (e) {
    console.error(e);
}
function main(src) {
    const res = fs.readFileSync(src, 'utf8');
    const lines = res.split(/[\r\n]+/g);
    const firstLine = lines.shift();
    console.log(utils.csvToJson(lines.join('\n'), firstLine.split(/\t/g)));
}
