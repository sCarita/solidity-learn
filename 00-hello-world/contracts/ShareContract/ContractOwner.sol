// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract ContractOwner {
    address private contractOwner = msg.sender;

    modifier onlyContractOwner() {
        require(msg.sender == contractOwner, "Not permitted");
        _;
    }
}