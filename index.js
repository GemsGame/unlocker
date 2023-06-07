#!/usr/bin/env node

const { Worker } = require("worker_threads");
const package = require('./package.json');
const yargs = require('yargs');

yargs.version(package.version);
yargs.command({
  command: 'run',
  describe: 'main command',
  builder: {
    network: {
      type: 'string',
      demandOption: true,
      describe: 'Networks: ethereum, bitcoin'
    },
    threads: {
      type: 'number',
      demandOption: true,
      describe: '1-100'
    }
  },
  handler({ network, threads }) {
    const workers = [];
    let count = 0;

    if (network === 'ethereum' || network === 'eth') {
      for (let i = 0; i < threads; i++) {
        const worker = new Worker(__dirname + '/lib/ethereum.js');
        const worker_obj = {
          worker,
          worker_message: worker.on('message', msg => {
            count += msg;
            console.log(count)
          })
        }
        workers.push(worker_obj);
      }
    }

    if (network === 'bitcoin') { }
  }
});

yargs.parse();
