// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

// Partner: Holds partner information
//  - account [address]: eth address
//	- info [string]: string containing some partner information
//  - balance [uint]: balance of the partner
struct Partner {
	address account;
	string info;
	uint balance;
}

// Partners: List of Partner Type
struct Partners {
	Partner[] a;
}

library PartnersFn {

	function find(
		Partners storage partners, 	// Array of type Partner[]
		address account 			// Account Address
	) internal view returns (
		int index 					// Returns: Index of the Partner[] for the given "account"
	) {
		uint length = partners.a.length;

		for (uint u = 0; u < length; u++) {
			if (partners.a[u].account == account) return int(u);
		}

		return -1;
	}

	function add(
		Partners storage partners,	// Array of type Partner[]
		address account, 			// Account Address
		string memory info			// String with Partner information
	) internal {
		require(find(partners, account) < 0, "Already added");

		partners.a.push(Partner(account, info, 0));
	}

	function incBalance(
		Partners storage partners,	// Array of type Partner[]
		address account,			// Account Address
		uint amount					// Uint representing the amount to be incremented
	) internal {
		int index = find(partners, account);

		require(index >= 0, "This partner account is unknown");

		partners.a[uint(index)].balance += amount;
	}

	function getBalance(
		Partners storage partners,	// Array of type Partner[]
		address account				// Account Address
	) internal view returns (
		uint						// Returns: Balance for a given Partner (address)
	) {
		int index = find(partners, account);

		require(index >= 0, "This partner account is unknown");

		return partners.a[uint(index)].balance;
	}

	function getInfo(
		Partners storage partners,	// Array of type Partner[]
		address account				// Account Address
	) public view returns (
		string memory				// Returns: Partner information for a given address
	) {
		int index = find(partners, account);
		require(index >= 0, "This partner account is unknown");

		return partners.a[uint(index)].info;
	}

	function len(
		Partners storage partners	// Array of type Partner[]
	) public view returns (
		uint						// Returns: Array length
	) {
		return partners.a.length;
	}
}