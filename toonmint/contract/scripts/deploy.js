
const { ethers } = require("hardhat");

async function main() {
  const toonContractFactory = await ethers.getContractFactory("ToonMint");
  const deployContract = await toonContractFactory.deploy();
  await deployContract.deployed();

  console.log(deployContract.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
