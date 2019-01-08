'use strict'
const { Worker } = require('worker_threads');
const { Session } = require('inspector');

const worker = new Worker('./http-server.js');

const port = 8080;
let onServerStarted = null;
let onServerStarteFailed = null;

function onMessage({message}) {
  if (message === 'running') {
    onServerStarted && onServerStarted();
  }
}

async function startServer(port) {
  const startPromise = new Promise((resolve, reject) => {
    onServerStarted = resolve;
    onServerStarteFailed = reject;
  });
  worker.on('message', onMessage);
  worker.on('exit', () => console.log('Worker done'));

  worker.postMessage({message: 'start', arg: port});

  await startPromise;
}

const session = new Session();
session.on('Debugger.paused', () => {
  console.log('Paused!');
  startServer(8080);
  let a = 2;

  for (let i = 1; i > 0; i++) {
    a += i;
  }

});
session.connect();
session.post('Debugger.enable', () => {
  console.log('Enabled');
  debugger;
  console.log('Done!');
});

// startServer(8080);
