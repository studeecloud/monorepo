const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

console.log("this is http object", http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

