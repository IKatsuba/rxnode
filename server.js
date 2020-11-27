const { createServer } = require('@rxnode/http');
const express = require('express');
const app = express();

const server = createServer();

app.get('/', (req, res) => {
  res.send('hello world');
});

server.subscribe((reqs) => app(...reqs));

server.listen(3000).subscribe();
