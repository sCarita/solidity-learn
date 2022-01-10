// Here, we are using the Chai test framework to assert values and see if they stand true. 
// If you see the code, you’ll realize it’s similar to what you tried in the Truffle console,
// except this time you are pairing those lines of code with the Chai test framework.
const { assert } = require("chai");

const PrivateStorageContract = artifacts.require("./PrivateStorageContract");

require("chai")
	.use(require("chai-as-promised"))
	.should();

contract('PrivateStorageContract', ([contractOwner, secondAddress, thirdAddress]) => {

	// this would attach the deployed smart contract and its methods 
	// to the `PrivateStorageContract` variable before all other tests are run
	before('deploy PrivateStorageContract', async() => {
        instance = await PrivateStorageContract.deployed();
    });

	// check if deployment goes smooth
	describe('deployment', () => {
		// check if the smart contract is deployed 
		// by checking the address of the smart contract
		it('deploys successfully', async () => {
			const address = await instance.address;

			assert.notEqual(address, '');
			assert.notEqual(address, undefined);
			assert.notEqual(address, null);
			assert.notEqual(address, 0x0);
		});

		// check if the message is stored on deployment as expected
		it('has a message', async () => {
			const message = await instance.message();
			assert.equal(message, 'Hello World!');
		});
	});

	describe('message', () => {
	// check if owner can set new message, check if setMessage works
		it('contract owner sets a message', async () => {
			// set new message
			await instance.setMessage('Hi there!', { from: contractOwner }) 
			// `from` helps us identify by any address in the test

			// check new message
			const message = await instance.message()
			assert.equal(message, 'Hi there!')
		});

		// make sure only owner can setMessage and no one else
		it('address that is not the owner fails to set a message', async () => {
			await instance.setMessage('Hi there!', { from: secondAddress })
				.should.be.rejected
			// this tells Chai that the test should pass if the setMessage function fails.
			await instance.setMessage('Hi there!', { from: thirdAddress })
				.should.be.rejected
		});
	});
});