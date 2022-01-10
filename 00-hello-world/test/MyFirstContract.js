const { assert } = require("chai");

const MyFirstContract = artifacts.require("./MyFirstContract");

require("chai")
	.use(require("chai-as-promised"))
	.should();

contract('MyFirstContract', ([contractOwner, secondAddress, thirdAddress]) => {

	before('deploy MyFirstContract', async() => {
        instance = await MyFirstContract.deployed();
    });

	// check if deployment goes smooth
	describe('deployment', () => {

		// check if the message is stored on deployment as expected
		it('has a message', async () => {
			const value = await instance.getValue();
			assert.equal(value, 'Hello World!');
		});
	});

	describe('message', () => {
	// check if owner can set new value, check if set works
		it('some address sets a value', async () => {
			// set new message
			await instance.set('Hi there!1', { from: contractOwner }) 
			// `from` helps us identify by any address in the test

			// check new message
			const value = await instance.getValue()
			assert.equal(value, 'Hi there!1')
		});

		// make sure only owner can set and no one else
		it('some other address sets a value', async () => {
			await instance.set('Hi there!2', { from: secondAddress })
				.should.be.fulfilled
			// this tells Chai that the test should pass if the set function fails.
			await instance.set('Hi there!3', { from: thirdAddress })
				.should.be.fulfilled

			const value = await instance.getValue()
			assert.equal(value, 'Hi there!3')
		});
	});
});