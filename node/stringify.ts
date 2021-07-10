/**
 * @fileOverview stringify.js format json from file.
 * @example
 *   node stringify.js foo.json
 *   node stringify.js bar.json 2> out.json
 */
import {readFile} from 'fs';

try {
    const argv = process.argv;
    const argc = argv.length;
    if (argc < 3) {
        console.log('Usage: node stringify.js filename [space]');
        process.exit(1);
    }
    const filename = argv[2];
    const space = argc > 3 ? parseInt(argv[3]) : 0;
    stringify(filename, space);
} catch (e) {
    console.error(e);
}

/**
 * @param {string} filename
 * @param {number|string} space
 */
function stringify(filename, space) {
    readFile(filename, 'utf8', (error, data) => {
        if (error) {
            throw error;
        }
        try {
            const obj = JSON.parse(data);
            const str = JSON.stringify(obj, null, space);
            console.log(str);
        } catch (e) {
            throw e;
        }
    });
}
