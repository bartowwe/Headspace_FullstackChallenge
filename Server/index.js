const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const router = require('./router');

const server = express();
const port = 3000;

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: true}));
server.use(express.static(path.join(__dirname, '../Client/dist')));

server.use('/api', router);

server.listen(port, () => console.log('server is connected'));