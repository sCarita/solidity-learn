// SPDX-License-Identifier: GPL-3.0

// pragma defines the solidity version desired to run our contract.
pragma solidity >=0.4.22 <0.9.0;

// solidity is a statically typed language, so every variable must have a defined type.
contract MyFirstContract  {

	// global values are stored on the blockchain.
	string value;

	// constructor - called everytime the smart contract is created or instancianted in the blockchain.
	constructor() {
		value = "Hello World!";
	}

	// function in solidity (with public access) that fetches our public stored value.
	// >> (visibility) public method that returns a string.
	function getValue() public view returns(string memory){
		return value;
	}

	// 
	function set(string memory _value) public returns(string memory) {
		// references our state variable "value" declared in our blockchain.
		value = _value;
		return value;
	}
}
