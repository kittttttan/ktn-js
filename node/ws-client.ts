import WebSocket from 'ws';

const argv = process.argv;
const PORT = argv.length > 2 ? parseInt(argv[2], 10) : 3000;

const ws = new WebSocket({port: PORT});

ws.on('open', () => {
    console.log('open');
    ws.send('hello');
});

ws.on('message', (message) => {
    console.log(`receive: ${message}`);
});

ws.on('close', () => {
    console.log('close');
});
