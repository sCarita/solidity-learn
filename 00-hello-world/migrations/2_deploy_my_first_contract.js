// SPDX-License-Identifier: GPL-3.0

var MyFirstContract = artifacts.require('./MyFirstContract.sol');

module.exports = function(deployer) {
  deployer.deploy(MyFirstContract);
};