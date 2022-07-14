const { ethers } = require("hardhat");

async function main() {
  const VoteContractFactory = await ethers.getContractFactory("Voting");
  const deployContract = await VoteContractFactory.deploy();
  await deployContract.deployed();

  console.log("Contract deployed at", deployContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
