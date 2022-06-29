const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(`Deploying contract with ACCOUNT ${deployer.address}`);
  console.log(` ACCOUNT balance is  ${accountBalance.toString()}`);

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const deployedContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"), //added
  });
  await deployedContract.deployed();

  console.log(
    `WavePortal contract is deployed to ADDRESS ${deployedContract.address}`
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(`This is a error ${err}`);
    process.exit(1);
  }
};

runMain();
