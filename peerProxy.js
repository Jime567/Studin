const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
    //create websocket object
    const wss = new WebSocketServer({ noServer: true });

    //Upgrade from HTTP to Websocket
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });


    //track the communications
    let connections = [];

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);
        console.log("New WS Connection Established");

        //message forwarding
        ws.on('message', function message(data) {
            connections.forEach((c) => {
                if (c.id !== connection.id) {
                    c.ws.send(data);
                }
            });
        });

        //removed closed connections
        ws.on('close', () => {
            connections.findIndex((o, i) => {
                if (o.id === connection.id) {
                    connections.splice(i, 1);
                    return true;
                }
            });
        });

        //respond to pongs with connections of life
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    //enliven connections longer
    setInterval(() => {
        //kill nonresponsive connections
        connections.forEach((c) => {
            //eliminate connections that did not respond to last ping
            if (!c.alive) {
                c.ws.terminate();
            } else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000);
}

module.exports = { peerProxy };