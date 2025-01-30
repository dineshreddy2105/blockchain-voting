const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  const candidates = ["Deepak", "Sathwik", "SaiNivas", "karthik"]; // Initialize candidates
  deployer.deploy(Voting, candidates);
};