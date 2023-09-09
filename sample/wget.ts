import {wget} from '../src/node/wget.ts';

function main() {
    const argv = process.argv;
    const argc = argv.length;
    let url = 'https://kittttttan.info/';
    if (argc >= 3) {
        // help
        if (argv[2] === '-h' || argv[2] === '--help') {
            console.log('Usage: node wget-sample.js [url]');
            process.exit(1);
        }
        url = argv[2];
    }

    const opt = {
        method: 'GET',
        filepath: 'wget_res.log',
        callback: (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`done! save as ${opt.filepath}`);
        }
    };
    wget(url, opt);
}

main();
