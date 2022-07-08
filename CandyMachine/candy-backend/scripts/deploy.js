const { ethers } = require("hardhat");

async function main() {
  const CandyFactory = await ethers.getContractFactory("CandyMachine");
  const contract = await CandyFactory.deploy();
  await contract.deployed();

  console.log("Contract is deployed at ", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
