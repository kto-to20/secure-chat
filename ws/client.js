const WebSocket = require('ws');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let ws = new WebSocket('ws://localhost:2953');

ws.on('open', () => {
    console.log('Connected to the server. Your client ID: ' + Date.now());
    rl.question('Enter your name: ', (name) => {
        ws.send(JSON.stringify({ type: 'setName', name }));
        console.log(`You set your name to: ${name}`);
        promptMessage();
    });
});

ws.on('message', (message) => {
    const msg = JSON.parse(message);
    if (msg.type === 'message') {
        console.log(`Message: ${msg.text}`); // Виводимо тільки текст повідомлення
    }
});

ws.on('close', () => {
    console.log('Connection closed. Trying to reconnect...');
    setTimeout(connect, 1000);
});

function promptMessage() {
    rl.question('Enter message: ', (text) => {
        ws.send(JSON.stringify({ type: 'message', text }));
        promptMessage(); // Запросити наступне повідомлення
    });
}

function connect() {
    ws = new WebSocket('ws://localhost:2953');
}
