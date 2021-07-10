import {createReadStream} from 'fs';
import * as readline from 'readline';

function getFilename(path) {
    return path.split('\\').pop();
}

function main() {
    const argv = process.argv;
    const argc = argv.length;
    
    let path = '.';
    if (argc >= 3) {
        // help
        if (argv[2] === '-h' || argv[2] === '--help') {
            console.log('Usage: node fileread.js [path]');
            process.exit(1);
        }
        path = argv[2];
    }

    const file = readline.createInterface({
        input: createReadStream(path),
        output: process.stdout,
        terminal: false
    });
    file.on('line', (line) => {
        console.log(getFilename(line));
    });
}
main();
