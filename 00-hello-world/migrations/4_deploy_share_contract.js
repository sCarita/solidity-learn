var ShareContract = artifacts.require('./ShareContract.sol');
var PartnersFn = artifacts.require('./PartnersFn.sol');

module.exports = async (deployer) => {
	await deployer.deploy(PartnersFn);
	await deployer.link(PartnersFn, ShareContract);

	await deployer.deploy(ShareContract, 100);
};