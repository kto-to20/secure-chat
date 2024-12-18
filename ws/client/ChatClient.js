const { WebSocket } = require('ws');

class ChatClient {
    constructor(options) {
        if (!options.url) {
            throw new Error('WebSocket URL is required');
        }

        this.ws = new WebSocket(options.url);
        this.sessionId = options.sessionId || null;
        this.username = options.username;
    }

    init() {
        this.ws.on('open', () => this.onOpen());
        this.ws.on('message', (data) => this.onMessage(data));
        this.ws.on('error', (error) => console.error('WebSocket error:', error));
        this.ws.on('close', () => console.log('Connection closed'));
    }

    onOpen() {
        console.log('Connected to the server');
        this.ws.send(
            JSON.stringify({
                type: 'options',
                sessionId: this.sessionId,
                data: {
                    username: this.username,
                },
            })
        );
    }

    onMessage(data) {
        let parsedData;
        try {
            parsedData = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing message:', e);
            return;
        }

        switch (parsedData.type) {
            case 'message':
                console.log(`${parsedData.data.sender} >>: ${parsedData.data.message}`);
                break;
            case 'options':
                this.setOptions(parsedData);
                break;
            default:
                console.log('Unknown message type:', parsedData.type);
        }
    }

    setOptions(msgObject) {
        this.sessionId = msgObject.sessionId;
        console.log('Your sessionId:', this.sessionId);
    }

    send(data) {
        const msgObject = {
            type: 'message',
            sessionId: this.sessionId,
            data: data,
        };

        if (this.ws.readyState === this.ws.OPEN) {
            this.ws.send(JSON.stringify(msgObject));
        } else {
            console.error('Cannot send message, WebSocket is not open');
        }
    }
}

module.exports = { ChatClient };
