async function main() {
  const chainId = network.config.chainId;
  const CasinoContractFactory = await ethers.getContractFactory("Casino");

  const deployContract = await CasinoContractFactory.deploy(
    "0x7a1bac17ccc5b313516c5e16fb24f7659aa5ebed",
    ethers.utils.parseEther("0.01"),
    "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f",
    2032,
    200000,
    240
  );

  await deployContract.deployed();

  console.log("Casino contract is deployed to:", deployContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
