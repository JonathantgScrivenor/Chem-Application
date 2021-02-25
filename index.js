console.log('Client started.');

//websocket
const Html5WebSocket = require('html5-websocket');
const ReconnectionWebSocket = require('reconnecting-websocket');

//initialization
let ws_host = 'localhost';
let ws_port = '3000';
const options = { WebSocket: Html5WebSocket };
const rws = new ReconnectionWebSocket('ws://' + ws_host + ':' + ws_port + '/ws', undefined, options);
rws.timeout = 1000;

rws.addEventListener('open', () => {
    console.log('[client] connection established');
    rws.send('message from client')
    rws.send(JSON.stringify({
        method: 'set-background-color',
        params: {
            color: 'seagreen'
        }
    }))
});

rws.addEventListener('message', (e) => {
    console.log('[client] message recieved: ' + e.data);

    try {
        let m = JSON.parse(e.data);
        handleMessage(m);
    }
    catch (err) {
        console.log('[client] Message is not parsable to JSON.');
    }
});

rws.addEventListener('close', () => {
    console.log('[client] connection lost');
});

rws.onerror = (err) => {
    if(err.code == 'EHOSTDOWN') {
        console.log('[client] Error: Server down.');
        rws.send('message from client')
    }
};


//handlers

let handlers = {
    "set-background-color" : function(m) {
        console.log('[client] set-background-color handler.');
        console.log('[client] Color is ' + m.params.color);
    }

};

function handleMessage(m) {
    if (m.method == undefined) {
        return;
    }

    let method = m.method;
    if (method) {
        if(handlers[method]) {
            let handler = handlers[method];
            handler(m);
        } 
        else {
            console.log('[client] no handler defintiion: ' + method + '.');
        }
    }
}