const { ethers } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("Notes");
  const deployedContract = await contractFactory.deploy();
  await deployedContract.deployed();

  //for testing we really need to have some signers
  const [owner, randomPerson] = await ethers.getSigners();

  console.log(`Contract is been deployed by ${owner.address}`); // getting the owners address
  console.log(" The contract is been deployed at ", deployedContract.address);

  //use let for reading from the contract and const for sending some data to contract not necessary but this is the way that i am using
  let allNotes;
  allNotes = await deployedContract.getTotalNotes();

  const gettingNotesTx = await deployedContract.gettingNotes(
    "This is title",
    "This will be Descriptions and you know it shoud work correctly"
  );
  await gettingNotesTx.wait(); // waiting foe the transactions to be mined.

  allNotes = await deployedContract.getTotalNotes();

  const getArray = await deployedContract.getNotesArr();
  console.log(allNotes);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
