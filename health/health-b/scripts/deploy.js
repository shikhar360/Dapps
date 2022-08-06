const { ethers } = require("hardhat");

async function main() {
  const HealthContractFactory = await ethers.getContractFactory("Health");
  const deployContract = await HealthContractFactory.deploy();
  await deployContract.deployed();

  console.log("Contract Deployed to address ", deployContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
