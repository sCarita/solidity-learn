var PrivateStorageContract = artifacts.require('./PrivateStorageContract.sol');

module.exports = function(deployer) {
	deployer.deploy(PrivateStorageContract);
};