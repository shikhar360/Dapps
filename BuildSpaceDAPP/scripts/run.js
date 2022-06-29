const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); // pulral signers
  const wavePortalFactory = await hre.ethers.getContractFactory("WavePortal");
  const wavePortalContract = await wavePortalFactory.deploy({
    value: hre.ethers.utils.parseEther("0.01"),
  }); // this means take 0.01 ethers from my account and put it in my contract
  await wavePortalContract.deployed();

  console.log(
    `WavePortal contract has beeen deployed at ${wavePortalContract.address}`
  );
  console.log(`This contract has beeen deployed by ${owner.address}`);

  //-----------------------------------------------------------
  // prize amount checking before
  let contractBalance = await hre.ethers.provider.getBalance(
    wavePortalContract.address
  ); // checking if the balance eached to our account or not
  console.log(
    " The balance BEFORE ",
    hre.ethers.utils.formatEther(contractBalance) //displaying the amount here
  );
  console.log("-----------------------------------------------------------");
  //-----------------------------------------------------------

  let waveCount;
  waveCount = await wavePortalContract.getTotalWavesCount();

  let waveTxn = await wavePortalContract.wave("Shikhar sends a Goodluck"); // wait for mining
  await waveTxn.wait(); // wait till the block is mined

  const waveTxn2 = await wavePortalContract.wave("This is wave #2"); //added another wave to see the randomness
  await waveTxn2.wait();

  /////////////////////////// random person to send the message
  //const [owner, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await wavePortalContract
    .connect(randomPerson)
    .wave("SomeoneElse sended some message");
  await waveTxn.wait();

  waveCount = await wavePortalContract.getTotalWavesCount();

  //making it so everyone can wave at us
  //  waveTxn = await wavePortalContract.connect(randomPerson).wave("");  //updated above
  // await waveTxn.wait();

  //-----------------------------------------------------------
  // prize amount checking After
  contractBalance = await hre.ethers.provider.getBalance(
    wavePortalContract.address
  ); //rechecking and displaying the amount.
  console.log(
    " The balance AFTER ",
    hre.ethers.utils.formatEther(contractBalance) //not formatEthers
  );
  console.log("-----------------------------------------------------------");
  // but when you will run ``yarn hardhat run scripts/run.js`` you will get error because our contract is
  //not yet allowed to pay anyone for that we have Add to the constructor "payable" keyword;
  //-----------------------------------------------------------

  waveCount = await wavePortalContract.getTotalWavesCount();
  let allWaves = await wavePortalContract.getWaves();
  console.log(allWaves);
};

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log("This is the error" + err);
    process.exit(1);
  }
}

runMain();

//``yarn hardhat run scripts/run.js``  this command has been initiated

// Before moving to frontend do these things
// 1. We need to deploy it again.

// 2. We need to update the contract address on our frontend.

// 3. We need to update the abi file on our frontend.
