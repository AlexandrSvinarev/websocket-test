const WebSocketServer = require("./ws");
const api = require("./api");

const storage = require("./storage");

WebSocketServer.setMessageOnOpen(() => storage.getAll());

new Promise(() => WebSocketServer.start(8080));

api.start(WebSocketServer, storage, 3005);
