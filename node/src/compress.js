/**
 * @fileOverview compress.js remove spaces and linebreakes.
 * @example
 *   node compress.js foo.text
 */

const fs = require("fs");
try {
    const argv = process.argv;
    if (argv.length <= 2) {
        console.log('  node compress.js input [output]');
        process.exit(1);
    }
    const src = argv[2];
    const out = argv.length <= 3 ? rename(src) : argv[3];
    compress(src, out);
}
catch (e) {
    console.error(e);
}
function rename(name) {
    const i = name.lastIndexOf('.');
    return i < 0 ?
        `${name}_` :
        `${name.substring(0, i)}_${name.substring(i)}`;
}
function compress(src, out) {
    const res = fs.readFileSync(src, 'utf8');
    const comp = res.replace(/[ \t]+/g, ' ').replace(/[\r\n]+/g, '');
    fs.writeFile(out, comp, (err) => {
        if (err) {
            throw err;
        }
    });
}
