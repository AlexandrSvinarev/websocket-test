const express = require("express");

function start(WebSocketServer, storage, port) {
  const app = express();

  app.use(express.json());

  app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    res.send();
  });

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    next();
  });

  app.post("/", (req, res) => {
    WebSocketServer.send(JSON.stringify(req.body));

    storage.updateData(req.body);

    res.json({ result: "success" });
  });

  app.listen(port, () => {
    console.log(`App listen on ${port}!`);
  });
}

module.exports = { start };
