import {walk, walkAsync} from '../src/node/walk.ts';

async function main() {
    const argv = process.argv;
    const argc = argv.length;
    
    let path = '.';
    if (argc >= 3) {
        // help
        if (argv[2] === '-h' || argv[2] === '--help') {
            console.log('Usage: node walk-sample.js [path]');
            process.exit(1);
        }
        path = argv[2];
    }

    console.log('# walkAsync');
    for await (const p of walkAsync(path)) {
        console.log(p);
    }

    console.log('\n# walk');
    walk(path, (fp) => {
        console.log(fp);
    }, (e) => {
        console.error(e);
    });
}
main();
