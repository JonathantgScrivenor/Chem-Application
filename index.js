console.log('WS Server Started!');

//dependencies
const express = require ('express');
const WebSocket = require ('ws');
SocketServer = require('ws').Server;

//local host connection
const server = express().listen(3000);

//web socket server
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
    console.log('[server] client connected.')

    ws.on('close', () => { console.log ('[server] client disconnected')});

    //add chem functionality here
    ws.on('message', (message) => {

        console.log('[server] message recieved');

        //send message to all clients
        wss.clients.forEach(function each(client) {
            client.send(message);
        });
    });
});