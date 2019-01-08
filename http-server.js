'use strict'

const http = require('http');
const { parentPort } = require('worker_threads');

let num = 1;

parentPort.on('message', onMessage);

function onRequest(req, res) {
  res.end(`Still here ${num++}`);
}

function onMessage({message, arg}) {
  if (message === 'start') {
    const server = http.createServer(onRequest);
    server.listen(arg, function(err) {
      if (!err) {
        console.log(`Listening on port ${arg}`);
        parentPort.postMessage({message: 'running'});
      } else {
        console.error(err);
      }
    });
  }
}
