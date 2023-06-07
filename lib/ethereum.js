const Web3 = require('web3');
const web3 = new Web3("https://ethereum.publicnode.com");
const { parentPort } = require("worker_threads");

const fs = require('fs');

const createAccount = async () => {

  while (true) {
    const { address, privateKey } = web3.eth.accounts.create();
    const balance = await checkBalance(address);
    
    if (Number(balance) > 0) {
      saveAddress(address, privateKey);
    }

    parentPort.postMessage(1);
  }
}

const checkBalance = async (address) => {
  return await web3.eth.getBalance(address);
}

const saveAddress = (address, private) => {
  fs.writeFile('../wallets/' + address + '.txt', private, (err) => {
    throw new Error(err)
  });
}

createAccount();