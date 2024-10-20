const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 2953 });

wss.on('connection', (ws) => {
    const clientId = Date.now();
    console.log('New connection. Client ID:', clientId);

    ws.on('message', (message) => {
        const msg = JSON.parse(message);
        if (msg.type === 'setName') {
            console.log(`Client ${clientId} set name: ${msg.name}`);
        } else if (msg.type === 'message') {
            console.log(`Message from client: ${msg.text}`);
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'message', text: msg.text })); // Відправляємо всім клієнтам
                }
            });
        }
    });

    ws.on('close', () => {
        console.log(`Client ${clientId} disconnected.`);
    });
});
