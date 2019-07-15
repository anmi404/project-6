// migrating the appropriate contracts
var BeekeeperRole = artifacts.require("./BeekeeperRole.sol");
var MarketPlaceRole = artifacts.require("./MarketPlaceRole.sol");
var CourierRole = artifacts.require("./CourierRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(BeekeeperRole);
  deployer.deploy(MarketPlaceRole);
  deployer.deploy(CourierRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
};
