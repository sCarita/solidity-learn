// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

import "./ContractOwner.sol";
import "./PartnersFn.sol";

contract ShareContract is ContractOwner {

	using PartnersFn for Partners;

	Partners partners;
	uint public total;
	uint public allocated;

	modifier onlyAccountOwner(address account) {
		require(
			partners.find(account) == -1,
			"Not permitted! Your account does not belong to our partners."
		);
        _;
    }

	constructor(uint _total) {
		require(_total > 0, "Supplied total must be > 0");
		total = _total;
	}

	function addPartner(address account, string memory info) 
	public onlyContractOwner {
		partners.add(account, info);
	}

	function transferToPartner(address account, uint amount) 
	public onlyContractOwner {
		require((amount > 0) && (amount <= total - allocated));
		partners.incBalance(account, amount);
		allocated += amount;
	}
 	// onlyAccountOwner(request)
	function getPartnerBalance(address account, address request) 
	public view 
	returns (uint) {
		return partners.getBalance(account);
	}
 
	function getPartnerInfo(address account, address request) 
	public view 
	returns (string memory) {
		return partners.getInfo(account);
	}

	function getPartnerLen(address account, address request) 
	public view 
	returns (string memory) {
		return partners.len();
	}
}
