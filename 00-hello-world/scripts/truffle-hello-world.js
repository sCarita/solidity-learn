// import libraries.
var Web3 = require('web3');
var _ = require('lodash');

// initialize our web3 client.
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545/"));

// define helper functions to:
//  - getBalance: Retrieve balance of a given address.
//  - doTransfer: Do a transfer between 2 addresses using some amount.
//  - getAccounts: Retrieve all addresses for a given ETH blockchain.
const getBalance = async (address) => {
	const balance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether');
	return `${balance} ETH`; 
};
const doTransfer = async (from, to, amount) => {
	console.log(`>> 💵 sent ${amount} ETH from ${from} to ${to}`);
	web3.eth.sendTransaction({
		from,
		to,
		value: web3.utils.toWei(amount, 'ether')
	});
};
const getAccounts = async () => {
  return web3.eth.getAccounts();
}

// main proccess.
(async () => {
	var accounts = await getAccounts();
	// collect the balances of all accounts available.
 	await Promise.all(
	  	_.map(
			accounts,
			async (a) => {await console.log(`${a} has ${await getBalance(a)}`)}
	  	)
	);
	// make a dummy eth transfer.
	await doTransfer(accounts[0], accounts[1], '3');
	await doTransfer(accounts[2], accounts[3], '2');

	// collect the balances of all accounts available - after the transfer is complete.
	accounts = await getAccounts();
	await Promise.all(
		_.map(
			accounts,
			async (a) => {await console.log(`${a} has ${await getBalance(a)}`)}
		)
	);
})()