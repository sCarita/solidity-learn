# Install Solidity in MacOS environment

The goal of this document is to describe how to install everything necessary for solidity development.

## Guide

1. Install node: `$ brew install node`.
2. Use `npm` to install `solc`: `$ npm install solc`.
3. Now we are ready to install ethereum using HomeBrew: `$ brew tap ethereum/ethereum; brew install ethereum`.
4. Go to http://truffleframework.com/ganache/ and install Ganache as a regular mac application. Ganache will allow us to create our own ethereum blockchains to test smart contracts.
5. Verify that you have Truffle unistalled: `$ npm uninstall -g truffle`.
6. Install Truffle: `$ npm install -f truffle`.

## Usage

1. Create a new directory: `$ mkdir 00-hello-world`.
2. Change to our new directory and create a truffle project inside: `$ cd 00-hello-world;truffle init`.
	1. This will create a structure with:
		* `truffle.js` — Truffle configuration file
		* `test/` — Directory for test files for testing your application and contracts
		* `migrations/` — Directory for scriptable deployment files
		* `contracts/` — Directory for solidity contracts
3. Run `$ truffle develop`, after executing the above command you will see truffle created 10 default accounts and with initial balance 100 ethers each.
4. Now create a function to retrieve the balance on our truffle console:
	```
	$ truffle(develop)> const getBalance = async (address) => {
		const balance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether');
		return balance; 
	}
	>> undefined
	$ truffle(develop)> getBalance('0x...')
	>> '100'
	```
5. Let's create a function to transfer funds between wallets:
	```
	$ truffle(develop)> const doTransfer = async (from, to, amount) => {
		web3.eth.sendTransaction({
			from,
			to,
			value: web3.utils.toWei(amount, 'ether')
		})
	}
	$ doTransfer('0xeea3e44db62dcc63d20bebf633e14d6a54265d3c', '0xd69bd41bc3ce4ebe9b59379aa3b97a1fa745ddd8', '2')
	$ getBalance('0xeea3e44db62dcc63d20bebf633e14d6a54265d3c')
	>> '97.999958'
	$ getBalance('0xd69bd41bc3ce4ebe9b59379aa3b97a1fa745ddd8')
	>> '102'
	```
6. After this you should be able to test our dev ethereum network spinned via truffle.


