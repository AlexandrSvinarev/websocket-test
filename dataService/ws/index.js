const WebSocket = require("ws");

class WebSocketServer {
  constructor() {
    this.clients = {};
    this.openConnectionMessage = null;
  }

  send(message) {
    Object.values(this.clients).forEach(({ ws }) => {
      ws.send(message);
    });
  }

  setMessageOnOpen(f) {
    this.openConnectionMessage = f;
  }

  start(port) {
    const wss = new WebSocket.Server({ port });

    wss.on("connection", (ws) => {
      const id = new Date().getTime();
      this.clients[id] = { ws };

      if (this.openConnectionMessage) {
        ws.send(JSON.stringify(this.openConnectionMessage()));
      }

      console.log(`Active clients: ${Object.keys(this.clients).length}`);

      ws.on("message", (message) => {
        console.log("received: %s", message);
      });

      ws.on("close", () => {
        delete this.clients[id];
        console.log(`Active clients: ${Object.keys(this.clients).length}`);
      });
    });
  }
}

module.exports = new WebSocketServer();
