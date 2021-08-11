import {Server} from 'ws';

const argv = process.argv;
const PORT = argv.length > 2 ? parseInt(argv[2], 10) : 3000;

const wss = new Server({port: PORT});
wss.on('connection', (ws) => {
    console.log('connect');

    ws.on('message', (message) => {
        console.log(`receive: ${message}`);

        // echo
        wss.clients.forEach(client => {
            console.log(`send: ${message}`);
            client.send(message);
        });
    });

    ws.on('close', () => {
        console.log('close');
    });
});
console.log(`serving ${PORT}`);
