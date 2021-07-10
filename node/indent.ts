/**
 * indent size
 * @example
 *   node indent.js dir
 */

import * as fs from "fs";
try {
    const argv = process.argv;
    if (argv.length <= 2) {
        console.log('  node indent.js dir');
        process.exit(1);
    }
    const src = argv[2];
    //const out = src;
    exe(src);
}
catch (e) {
    console.log(e);
}
function exe(src) {
    fs.readdir(src, (err, files) => {
        for (const f of files) {
            console.log(f);
            /*
            const res = fs.readFileSync(src, 'utf8');
            const comp = res.replace(/[ \t]+/g, ' ').replace(/[\r\n]+/g, '');
            fs.writeFile(out, comp, function(err) {
              if (err) { throw err; }
            });
            */
        }
    });
}
